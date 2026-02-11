import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, Plus, Trash2, Save, Eye, Download, Mail, MessageCircle, Phone as PhoneIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import logo from "@/assets/logo.png";

type LineItem = { description: string; qty: number; unit: string; unit_price: number };

const DEFAULT_TERMS = `1. Валидност на офертата: 30 дни от датата на издаване.
2. Начин на плащане: 50% аванс при подписване на договор, 50% при завършване на работата.
3. Гаранция: 5 години за извършените СМР дейности.
4. Материали: Гаранцията за материалите е съгласно гаранционните условия на производителя.
5. Срок за изпълнение: Уточнява се допълнително след подписване на договор.
6. Офертата не включва ДДС, освен ако изрично не е посочено.
7. Цените са валидни при нормални атмосферни условия за работа.
8. Допълнителни дейности, неупоменати в офертата, се договарят отделно.`;

const COMPANY_INFO = {
  name: "България Билд ЕООД",
  brand: "Ремонт на Покриви Варна",
  address: "ул. Уста Колю Фичето 25 А, Варна",
  phone: "088 499 7659",
  website: "remontnapokrivivarna.bg",
  parent: "bulgarbuild.com",
};

const QuoteEditorPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const printRef = useRef<HTMLIFrameElement>(null);

  const [inquiry, setInquiry] = useState<any>(null);
  const [existingQuote, setExistingQuote] = useState<any>(null);
  const [items, setItems] = useState<LineItem[]>([
    { description: "", qty: 1, unit: "бр.", unit_price: 0 },
  ]);
  const [discount, setDiscount] = useState(0);
  const [terms, setTerms] = useState(DEFAULT_TERMS);
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
        setTerms(q.terms || DEFAULT_TERMS);
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

  const generatePrintableHtml = () => {
    const date = new Date().toLocaleDateString("bg-BG");
    const itemRows = items.map((item) => `
      <tr>
        <td style="padding:8px;border-bottom:1px solid #ddd">${item.description}</td>
        <td style="padding:8px;border-bottom:1px solid #ddd;text-align:right">${item.qty}</td>
        <td style="padding:8px;border-bottom:1px solid #ddd;text-align:right">${item.unit}</td>
        <td style="padding:8px;border-bottom:1px solid #ddd;text-align:right">${Number(item.unit_price).toFixed(2)} лв</td>
        <td style="padding:8px;border-bottom:1px solid #ddd;text-align:right">${(item.qty * item.unit_price).toFixed(2)} лв</td>
      </tr>
    `).join("");

    return `<!DOCTYPE html><html lang="bg"><head><meta charset="UTF-8">
<style>
@media print { body { -webkit-print-color-adjust: exact; print-color-adjust: exact; } @page { margin: 20mm; size: A4; } }
body{font-family:'Helvetica Neue',Arial,sans-serif;color:#1a1a1a;margin:0;padding:40px;font-size:13px}
table{width:100%;border-collapse:collapse}
.header{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:30px;padding-bottom:20px;border-bottom:3px solid #ea580c}
.stamp{border:2px solid #333;border-radius:50%;width:100px;height:100px;display:flex;align-items:center;justify-content:center;text-align:center;font-size:10px;color:#333;margin-top:20px}
</style></head><body>
<div class="header">
  <div>
    <h1 style="margin:0;font-size:22px;color:#ea580c">${COMPANY_INFO.brand}</h1>
    <p style="color:#666;margin:4px 0;font-size:12px">Подразделение на ${COMPANY_INFO.name}</p>
    <p style="color:#666;margin:4px 0">${COMPANY_INFO.address}</p>
    <p style="color:#666;margin:4px 0">тел: ${COMPANY_INFO.phone}</p>
    <p style="color:#666;margin:4px 0">${COMPANY_INFO.website} | ${COMPANY_INFO.parent}</p>
  </div>
  <div style="text-align:right">
    <h2 style="margin:0;font-size:28px;color:#333">ОФЕРТА</h2>
    <p style="color:#666;margin:4px 0">Дата: ${date}</p>
    <p style="color:#666;margin:4px 0">Валидност: ${validityDays} дни</p>
  </div>
</div>

<div style="background:#f9fafb;border-radius:8px;padding:16px;margin-bottom:24px">
  <p style="font-weight:bold;margin:0 0 4px">Клиент:</p>
  <p style="margin:2px 0">${inquiry?.name || ""}</p>
  <p style="margin:2px 0">${inquiry?.email || ""}</p>
  <p style="margin:2px 0">${inquiry?.phone || ""}</p>
  ${inquiry?.address ? `<p style="margin:2px 0">Адрес: ${inquiry.address}</p>` : ""}
</div>

<table>
  <thead><tr style="border-bottom:2px solid #333">
    <th style="padding:8px;text-align:left">Описание</th>
    <th style="padding:8px;text-align:right">Кол.</th>
    <th style="padding:8px;text-align:right">Ед.</th>
    <th style="padding:8px;text-align:right">Ед. цена</th>
    <th style="padding:8px;text-align:right">Сума</th>
  </tr></thead>
  <tbody>
    ${itemRows}
    <tr><td colspan="4" style="padding:8px;text-align:right">Междинна сума:</td><td style="padding:8px;text-align:right">${subtotal.toFixed(2)} лв</td></tr>
    ${discount > 0 ? `<tr><td colspan="4" style="padding:8px;text-align:right;color:#16a34a">Отстъпка:</td><td style="padding:8px;text-align:right;color:#16a34a">-${discount.toFixed(2)} лв</td></tr>` : ""}
    <tr style="border-top:2px solid #333;font-size:16px;font-weight:bold"><td colspan="4" style="padding:12px 8px;text-align:right">Общо:</td><td style="padding:12px 8px;text-align:right">${total.toFixed(2)} лв</td></tr>
  </tbody>
</table>

${terms ? `<div style="margin-top:30px;padding-top:16px;border-top:1px solid #ddd">
  <h3 style="margin:0 0 8px;font-size:14px">Условия и правила:</h3>
  <p style="color:#555;white-space:pre-line;font-size:12px;line-height:1.6">${terms}</p>
</div>` : ""}

<div style="margin-top:40px;padding-top:16px;border-top:1px solid #ddd;display:flex;justify-content:space-between;align-items:flex-end">
  <div style="font-size:11px;color:#888">
    <p style="margin:2px 0"><strong>${COMPANY_INFO.name}</strong></p>
    <p style="margin:2px 0">${COMPANY_INFO.address}</p>
    <p style="margin:2px 0">тел: ${COMPANY_INFO.phone}</p>
    <p style="margin:2px 0">${COMPANY_INFO.website}</p>
  </div>
  <div class="stamp">Печат /<br/>Подпис</div>
</div>
</body></html>`;
  };

  const handleDownloadPdf = () => {
    const html = generatePrintableHtml();
    const iframe = document.createElement("iframe");
    iframe.style.position = "fixed";
    iframe.style.right = "0";
    iframe.style.bottom = "0";
    iframe.style.width = "0";
    iframe.style.height = "0";
    iframe.style.border = "0";
    document.body.appendChild(iframe);
    
    const doc = iframe.contentWindow?.document;
    if (doc) {
      doc.open();
      doc.write(html);
      doc.close();
      setTimeout(() => {
        iframe.contentWindow?.print();
        setTimeout(() => document.body.removeChild(iframe), 1000);
      }, 500);
    }
  };

  const getShareMessage = () => {
    return `Здравейте ${inquiry?.name}, изпращаме Ви оферта от ${COMPANY_INFO.brand} на стойност ${total.toFixed(2)} лв. За въпроси: ${COMPANY_INFO.phone}`;
  };

  const handleWhatsApp = () => {
    const phone = inquiry?.phone?.replace(/\s/g, "").replace(/^0/, "+359");
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(getShareMessage())}`, "_blank");
  };

  const handleViber = () => {
    const phone = inquiry?.phone?.replace(/\s/g, "").replace(/^0/, "+359");
    window.open(`viber://chat?number=${encodeURIComponent(phone)}&text=${encodeURIComponent(getShareMessage())}`, "_blank");
  };

  const handleEmail = () => {
    window.open(`mailto:${inquiry?.email}?subject=${encodeURIComponent(`Оферта от ${COMPANY_INFO.brand}`)}&body=${encodeURIComponent(getShareMessage())}`, "_blank");
  };

  if (!inquiry) {
    return <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" /></div>;
  }

  if (preview) {
    return (
      <div>
      <div className="flex flex-wrap gap-3 mb-4">
        <Button variant="ghost" onClick={() => setPreview(false)}>
          <ArrowLeft className="h-4 w-4 mr-2" /> Обратно към редакция
        </Button>
        <Button variant="outline" onClick={handleDownloadPdf} disabled={!existingQuote}>
          <Download className="h-4 w-4 mr-2" /> Изтегли PDF
        </Button>
        <Button variant="outline" onClick={handleEmail}>
          <Mail className="h-4 w-4 mr-2" /> Email
        </Button>
        <Button variant="outline" onClick={handleWhatsApp} className="text-green-600 border-green-600 hover:bg-green-50">
          <MessageCircle className="h-4 w-4 mr-2" /> WhatsApp
        </Button>
        <Button variant="outline" onClick={handleViber} className="text-purple-600 border-purple-600 hover:bg-purple-50">
          <PhoneIcon className="h-4 w-4 mr-2" /> Viber
        </Button>
      </div>
        <div className="bg-white text-black rounded-xl border p-8 max-w-3xl mx-auto print:shadow-none" id="quote-preview">
          <div className="flex items-start justify-between mb-8 pb-4 border-b-2 border-orange-500">
            <div>
              <img src={logo} alt="Logo" className="h-10 mb-2" />
              <p className="text-sm text-gray-500">Подразделение на {COMPANY_INFO.name}</p>
              <p className="text-sm text-gray-600">{COMPANY_INFO.address}</p>
              <p className="text-sm text-gray-600">тел: {COMPANY_INFO.phone}</p>
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
            {inquiry.address && <p>Адрес: {inquiry.address}</p>}
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
              <h3 className="font-semibold mb-2">Условия и правила:</h3>
              <p className="text-sm whitespace-pre-line text-gray-600">{terms}</p>
            </div>
          )}

          <div className="mt-8 pt-4 border-t flex justify-between items-end">
            <div className="text-xs text-gray-400">
              <p className="font-semibold text-gray-600">{COMPANY_INFO.name}</p>
              <p>{COMPANY_INFO.address}</p>
              <p>тел: {COMPANY_INFO.phone}</p>
              <p>{COMPANY_INFO.website}</p>
            </div>
            <div className="border-2 border-gray-400 rounded-full w-24 h-24 flex items-center justify-center text-xs text-gray-400 text-center">
              Печат /<br/>Подпис
            </div>
          </div>
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
          <label className="text-sm text-muted-foreground">Условия и правила</label>
          <Textarea value={terms} onChange={(e) => setTerms(e.target.value)} rows={8} />
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
