import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Phone, Plus, Search, Download, ArrowUpDown } from "lucide-react";
import { format } from "date-fns";
import { bg } from "date-fns/locale";

const CallLogPage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [calls, setCalls] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [sortAsc, setSortAsc] = useState(false);

  const [form, setForm] = useState({
    client_name: "", client_phone: "", client_email: "",
    call_direction: "inbound", duration_minutes: "",
    notes: "", inquiry_id: "",
  });

  const fetchCalls = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("call_log" as any)
      .select("*")
      .order("call_date", { ascending: false });
    setCalls(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchCalls(); }, []);

  const handleSave = async () => {
    if (!user || !form.client_name || !form.client_phone) return;
    const { error } = await supabase.from("call_log" as any).insert({
      client_name: form.client_name,
      client_phone: form.client_phone,
      client_email: form.client_email || null,
      call_direction: form.call_direction,
      duration_minutes: form.duration_minutes ? Number(form.duration_minutes) : null,
      notes: form.notes || null,
      inquiry_id: form.inquiry_id || null,
      created_by: user.id,
    });
    if (error) {
      toast({ title: "Грешка", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Обаждането е записано" });
      setForm({ client_name: "", client_phone: "", client_email: "", call_direction: "inbound", duration_minutes: "", notes: "", inquiry_id: "" });
      setDialogOpen(false);
      fetchCalls();
    }
  };

  const filtered = calls.filter(c =>
    c.client_name?.toLowerCase().includes(search.toLowerCase()) ||
    c.client_phone?.includes(search)
  );

  const sorted = sortAsc ? [...filtered].reverse() : filtered;

  const exportCSV = () => {
    const headers = ["Дата", "Име", "Телефон", "Имейл", "Посока", "Продължителност (мин)", "Бележки"];
    const rows = sorted.map(c => [
      format(new Date(c.call_date), "yyyy-MM-dd HH:mm"),
      c.client_name, c.client_phone, c.client_email || "",
      c.call_direction === "inbound" ? "Входящо" : "Изходящо",
      c.duration_minutes || "", c.notes || "",
    ]);
    const csv = [headers.join(","), ...rows.map(r => r.map(v => `"${String(v).replace(/"/g, '""')}"`).join(","))].join("\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url;
    a.download = `call-log-${format(new Date(), "yyyy-MM-dd")}.csv`;
    a.click(); URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-foreground">Телефонен дневник</h1>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Търсене..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9 w-56" />
          </div>
          <Button variant="outline" size="sm" onClick={() => setSortAsc(!sortAsc)}>
            <ArrowUpDown className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={exportCSV}>
            <Download className="h-4 w-4 mr-1" /> CSV
          </Button>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm"><Plus className="h-4 w-4 mr-1" /> Добави</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>Ново обаждане</DialogTitle></DialogHeader>
              <div className="space-y-3">
                <div><Label>Име на клиент *</Label><Input value={form.client_name} onChange={e => setForm({...form, client_name: e.target.value})} /></div>
                <div><Label>Телефон *</Label><Input value={form.client_phone} onChange={e => setForm({...form, client_phone: e.target.value})} /></div>
                <div><Label>Имейл</Label><Input value={form.client_email} onChange={e => setForm({...form, client_email: e.target.value})} /></div>
                <div>
                  <Label>Посока</Label>
                  <Select value={form.call_direction} onValueChange={v => setForm({...form, call_direction: v})}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="inbound">Входящо</SelectItem>
                      <SelectItem value="outbound">Изходящо</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div><Label>Продължителност (мин)</Label><Input type="number" value={form.duration_minutes} onChange={e => setForm({...form, duration_minutes: e.target.value})} /></div>
                <div><Label>Бележки</Label><Textarea value={form.notes} onChange={e => setForm({...form, notes: e.target.value})} rows={3} /></div>
                <Button onClick={handleSave} className="w-full">Запази</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" /></div>
      ) : sorted.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">Няма записани обаждания</div>
      ) : (
        <div className="bg-card rounded-xl border border-border overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Дата</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Име</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Телефон</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Посока</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Мин</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Бележки</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((c: any) => (
                <tr key={c.id} className="border-b border-border hover:bg-muted/30">
                  <td className="px-4 py-3 whitespace-nowrap">{format(new Date(c.call_date), "dd MMM yyyy, HH:mm", { locale: bg })}</td>
                  <td className="px-4 py-3 font-medium">{c.client_name}</td>
                  <td className="px-4 py-3">
                    <a href={`tel:${c.client_phone}`} className="text-accent hover:underline flex items-center gap-1">
                      <Phone className="h-3 w-3" /> {c.client_phone}
                    </a>
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant={c.call_direction === "inbound" ? "default" : "secondary"}>
                      {c.call_direction === "inbound" ? "Входящо" : "Изходящо"}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">{c.duration_minutes || "—"}</td>
                  <td className="px-4 py-3 max-w-xs truncate">{c.notes || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CallLogPage;
