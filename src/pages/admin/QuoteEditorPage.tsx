import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, Plus, Trash2, Save, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import logo from "@/assets/logo.png";

type LineItem = { description: string; qty: number; unit: string; unit_price: number };

const QuoteEditorPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();

  const [inquiry, setInquiry] = useState<any>(null);
  const [existingQuote, setExistingQuote] = useState<any>(null);
  const [items, setItems] = useState<LineItem[]>([
    { description: "", qty: 1, unit: "бр.", unit_price: 0 },
  ]);
  const [discount, setDiscount] = useState(0);
  const [terms, setTerms] = useState("Валидност на офертата: 30 дни.\nНачин на плащане: 50% аванс, 50% при завършване.\nГаранция: 5 години.");
  const [validityDays, setValidityDays] = useState(30);
  const [preview, setPreview] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      const [{ data: inq }, { data: quotes }] = await Promise.all([
        supabase.from("inquiries").select("*").eq("id", id).single(),
        supabase.from("quotes").select("*").eq("inquiry_id", id).order("created_at", { ascending: false }).limit(1),
      ]);
      setInquiry(inq);
      if (quotes && quotes.length > 0) {
        const q = quotes[0];
        setExistingQuote(q);
        setItems((q.items as any) || []);
        setDiscount(q.discount || 0);
        setTerms(q.terms || "");
        setValidityDays(q.validity_days || 30);
      }
    };
    fetch();
  }, [id]);

  const subtotal = items.reduce((sum, i) => sum + i.qty * i.unit_price, 0);
  const total = subtotal - discount;

  const updateItem = (index: number, field: keyof LineItem, value: any) => {
    const updated = [...items];
    (updated[index] as any)[field] = value;
    setItems(updated);
  };

  const addItem = () => setItems([...items, { description: "", qty: 1, unit: "бр.", unit_price: 0 }]);
  const removeItem = (i: number) => setItems(items.filter((_, idx) => idx !== i));

  const handleSave = async () => {
    setSaving(true);
    const payload = {
      inquiry_id: id,
      created_by: user!.id,
      items: items as any,
      subtotal,
      discount,
      total,
      terms,
      validity_days: validityDays,
      status: "draft" as const,
    };

    if (existingQuote) {
      await supabase.from("quotes").update(payload).eq("id", existingQuote.id);
    } else {
      const { data } = await supabase.from("quotes").insert(payload).select().single();
      if (data) setExistingQuote(data);
    }
    toast({ title: "Офертата е запазена" });
    setSaving(false);
  };

  if (!inquiry) {
    return <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" /></div>;
  }

  if (preview) {
    return (
      <div>
        <Button variant="ghost" onClick={() => setPreview(false)} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" /> Обратно към редакция
        </Button>
        <div className="bg-white text-black rounded-xl border p-8 max-w-3xl mx-auto print:shadow-none" id="quote-preview">
          <div className="flex items-start justify-between mb-8">
            <div>
              <img src={logo} alt="Logo" className="h-10 mb-2" />
              <p className="text-sm text-gray-600">Ремонт Руф Прос</p>
              <p className="text-sm text-gray-600">тел: 088 499 7659</p>
            </div>
            <div className="text-right">
              <h2 className="text-2xl font-bold">ОФЕРТА</h2>
              <p className="text-sm text-gray-500">
                Дата: {new Date().toLocaleDateString("bg-BG")}
              </p>
              <p className="text-sm text-gray-500">Валидност: {validityDays} дни</p>
            </div>
          </div>

          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <p className="font-semibold">Клиент:</p>
            <p>{inquiry.name}</p>
            <p>{inquiry.email}</p>
            <p>{inquiry.phone}</p>
          </div>

          <table className="w-full mb-6 text-sm">
            <thead>
              <tr className="border-b-2 border-gray-300">
                <th className="text-left py-2">Описание</th>
                <th className="text-right py-2">Кол.</th>
                <th className="text-right py-2">Ед.</th>
                <th className="text-right py-2">Ед. цена</th>
                <th className="text-right py-2">Сума</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, i) => (
                <tr key={i} className="border-b border-gray-200">
                  <td className="py-2">{item.description}</td>
                  <td className="text-right py-2">{item.qty}</td>
                  <td className="text-right py-2">{item.unit}</td>
                  <td className="text-right py-2">{item.unit_price.toFixed(2)} лв</td>
                  <td className="text-right py-2">{(item.qty * item.unit_price).toFixed(2)} лв</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-end">
            <div className="w-64 space-y-1 text-sm">
              <div className="flex justify-between"><span>Междинна сума:</span><span>{subtotal.toFixed(2)} лв</span></div>
              {discount > 0 && <div className="flex justify-between text-green-600"><span>Отстъпка:</span><span>-{discount.toFixed(2)} лв</span></div>}
              <div className="flex justify-between font-bold text-lg border-t pt-2"><span>Общо:</span><span>{total.toFixed(2)} лв</span></div>
            </div>
          </div>

          {terms && (
            <div className="mt-8 pt-4 border-t">
              <h3 className="font-semibold mb-2">Условия:</h3>
              <p className="text-sm whitespace-pre-line text-gray-600">{terms}</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Button variant="ghost" size="icon" onClick={() => navigate(`/admin/inquiries/${id}`)}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold text-foreground">
          {existingQuote ? "Редакция на оферта" : "Нова оферта"} — {inquiry.name}
        </h1>
      </div>

      <div className="bg-card rounded-xl border border-border p-6 space-y-6">
        <div>
          <h2 className="font-semibold text-foreground mb-3">Позиции</h2>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[200px]">Описание</TableHead>
                  <TableHead className="w-20">Кол.</TableHead>
                  <TableHead className="w-20">Ед.</TableHead>
                  <TableHead className="w-28">Ед. цена</TableHead>
                  <TableHead className="w-28">Сума</TableHead>
                  <TableHead className="w-12" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <Input value={item.description} onChange={(e) => updateItem(i, "description", e.target.value)} placeholder="Описание на услугата" />
                    </TableCell>
                    <TableCell>
                      <Input type="number" min={1} value={item.qty} onChange={(e) => updateItem(i, "qty", Number(e.target.value))} />
                    </TableCell>
                    <TableCell>
                      <Input value={item.unit} onChange={(e) => updateItem(i, "unit", e.target.value)} />
                    </TableCell>
                    <TableCell>
                      <Input type="number" min={0} step={0.01} value={item.unit_price} onChange={(e) => updateItem(i, "unit_price", Number(e.target.value))} />
                    </TableCell>
                    <TableCell className="font-medium">{(item.qty * item.unit_price).toFixed(2)} лв</TableCell>
                    <TableCell>
                      {items.length > 1 && (
                        <Button variant="ghost" size="icon" onClick={() => removeItem(i)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <Button variant="outline" size="sm" className="mt-3" onClick={addItem}>
            <Plus className="h-4 w-4 mr-1" /> Добави позиция
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="text-sm text-muted-foreground">Междинна сума</label>
            <p className="text-lg font-semibold">{subtotal.toFixed(2)} лв</p>
          </div>
          <div>
            <label className="text-sm text-muted-foreground">Отстъпка (лв)</label>
            <Input type="number" min={0} value={discount} onChange={(e) => setDiscount(Number(e.target.value))} />
          </div>
          <div>
            <label className="text-sm text-muted-foreground">Общо</label>
            <p className="text-2xl font-bold text-accent">{total.toFixed(2)} лв</p>
          </div>
        </div>

        <div>
          <label className="text-sm text-muted-foreground">Условия</label>
          <Textarea value={terms} onChange={(e) => setTerms(e.target.value)} rows={4} />
        </div>

        <div>
          <label className="text-sm text-muted-foreground">Валидност (дни)</label>
          <Input type="number" value={validityDays} onChange={(e) => setValidityDays(Number(e.target.value))} className="w-32" />
        </div>

        <div className="flex gap-3 pt-4 border-t border-border">
          <Button onClick={handleSave} disabled={saving}>
            <Save className="h-4 w-4 mr-2" /> {saving ? "Запазване..." : "Запази"}
          </Button>
          <Button variant="outline" onClick={() => setPreview(true)}>
            <Eye className="h-4 w-4 mr-2" /> Преглед
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuoteEditorPage;
