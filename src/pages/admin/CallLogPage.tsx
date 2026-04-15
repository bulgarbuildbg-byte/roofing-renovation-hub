import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Phone, Plus, Search, Download, ArrowUpDown, PhoneCall, PhoneIncoming, PhoneOutgoing, Calendar, Clock } from "lucide-react";
import { format } from "date-fns";
import { bg } from "date-fns/locale";

const glassCard = { background: "hsl(220 20% 10% / 0.7)", backdropFilter: "blur(16px)", border: "1px solid hsl(220 15% 18%)" };

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
    call_direction: "inbound", duration_minutes: "", notes: "", inquiry_id: "",
  });

  const fetchCalls = async () => {
    setLoading(true);
    const { data } = await supabase.from("call_log" as any).select("*").order("call_date", { ascending: false });
    setCalls(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchCalls(); }, []);

  const handleSave = async () => {
    if (!user || !form.client_name || !form.client_phone) return;
    const { error } = await supabase.from("call_log" as any).insert({
      client_name: form.client_name, client_phone: form.client_phone,
      client_email: form.client_email || null, call_direction: form.call_direction,
      duration_minutes: form.duration_minutes ? Number(form.duration_minutes) : null,
      notes: form.notes || null, inquiry_id: form.inquiry_id || null, created_by: user.id,
    });
    if (error) { toast({ title: "Грешка", description: error.message, variant: "destructive" }); }
    else {
      toast({ title: "Обаждането е записано" });
      setForm({ client_name: "", client_phone: "", client_email: "", call_direction: "inbound", duration_minutes: "", notes: "", inquiry_id: "" });
      setDialogOpen(false); fetchCalls();
    }
  };

  const filtered = calls.filter(c => c.client_name?.toLowerCase().includes(search.toLowerCase()) || c.client_phone?.includes(search));
  const sorted = sortAsc ? [...filtered].reverse() : filtered;

  const exportCSV = () => {
    const headers = ["Дата", "Име", "Телефон", "Имейл", "Посока", "Продължителност", "Бележки"];
    const rows = sorted.map(c => [format(new Date(c.call_date), "yyyy-MM-dd HH:mm"), c.client_name, c.client_phone, c.client_email || "", c.call_direction === "inbound" ? "Входящо" : "Изходящо", c.duration_minutes || "", c.notes || ""]);
    const csv = [headers.join(","), ...rows.map(r => r.map(v => `"${String(v).replace(/"/g, '""')}"`).join(","))].join("\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url;
    a.download = `call-log-${format(new Date(), "yyyy-MM-dd")}.csv`;
    a.click(); URL.revokeObjectURL(url);
  };

  const btnStyle = { background: "hsl(220 20% 14%)", color: "hsl(215 15% 60%)", border: "1px solid hsl(220 15% 20%)" };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold flex items-center gap-2" style={{ color: "hsl(210 20% 95%)" }}>
          <div className="p-2 rounded-xl" style={{ background: "linear-gradient(135deg, hsl(150 60% 40%), hsl(180 60% 35%))" }}>
            <PhoneCall className="h-5 w-5" style={{ color: "white" }} />
          </div>
          Телефонен дневник
        </h1>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: "hsl(215 15% 45%)" }} />
            <Input placeholder="Търсене..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9 w-56 border-0"
              style={{ background: "hsl(220 20% 12%)", color: "hsl(210 20% 90%)" }} />
          </div>
          <button className="p-2 rounded-lg transition-colors" style={btnStyle} onClick={() => setSortAsc(!sortAsc)}>
            <ArrowUpDown className="h-4 w-4" />
          </button>
          <button className="p-2 rounded-lg flex items-center gap-1 text-xs transition-colors" style={btnStyle} onClick={exportCSV}>
            <Download className="h-4 w-4" /> CSV
          </button>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <button className="px-3 py-2 rounded-lg flex items-center gap-1 text-xs font-medium transition-colors"
                style={{ background: "hsl(215 80% 50%)", color: "white" }}>
                <Plus className="h-4 w-4" /> Добави
              </button>
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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          {[1,2,3].map(i => (
            <div key={i} className="rounded-xl p-4 animate-pulse" style={glassCard}>
              <div className="h-4 w-32 rounded mb-3" style={{ background: "hsl(220 20% 16%)" }} />
              <div className="h-3 w-48 rounded" style={{ background: "hsl(220 20% 14%)" }} />
            </div>
          ))}
        </div>
      ) : sorted.length === 0 ? (
        <div className="text-center py-12" style={{ color: "hsl(215 15% 45%)" }}>Няма записани обаждания</div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          {sorted.map((c: any) => (
            <div key={c.id} className="rounded-xl p-4 admin-card-hover" style={glassCard}>
              <div className="flex items-start justify-between mb-3">
                <p className="font-semibold text-sm" style={{ color: "hsl(210 20% 92%)" }}>{c.client_name}</p>
                <span className="text-[10px] font-semibold px-2 py-1 rounded-full flex items-center gap-1"
                  style={{
                    background: c.call_direction === "inbound" ? "hsl(150 60% 40% / 0.15)" : "hsl(215 80% 50% / 0.15)",
                    color: c.call_direction === "inbound" ? "#22c55e" : "#3b82f6",
                  }}>
                  {c.call_direction === "inbound" ? <PhoneIncoming className="h-3 w-3" /> : <PhoneOutgoing className="h-3 w-3" />}
                  {c.call_direction === "inbound" ? "Входящо" : "Изходящо"}
                </span>
              </div>

              <div className="space-y-1.5 text-xs" style={{ color: "hsl(215 15% 50%)" }}>
                <a href={`tel:${c.client_phone}`} className="flex items-center gap-1.5 hover:underline" style={{ color: "hsl(215 80% 65%)" }}>
                  <Phone className="h-3 w-3" /> {c.client_phone}
                </a>
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-3 w-3" /> {format(new Date(c.call_date), "dd MMM yyyy, HH:mm", { locale: bg })}
                </div>
                {c.duration_minutes && (
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-3 w-3" /> {c.duration_minutes} мин
                  </div>
                )}
              </div>

              {c.notes && (
                <p className="mt-2 text-xs truncate" style={{ color: "hsl(215 15% 45%)" }}>{c.notes}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CallLogPage;
