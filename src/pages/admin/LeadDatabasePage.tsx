import { useEffect, useState, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Download, Loader2, Search, CalendarIcon, Save, X } from "lucide-react";
import { format, startOfDay, endOfDay } from "date-fns";
import { bg } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import type { DateRange } from "react-day-picker";

const serviceLabels: Record<string, string> = {
  repair: "Ремонт", replacement: "Смяна", new_construction: "Нов покрив",
  waterproofing: "Хидроизолация", tiles: "Керемиди", flat_roof: "Плосък покрив",
  metal_roof: "Метален покрив", maintenance: "Поддръжка", leak_repair: "Течове", other: "Друго"
};

const statusLabels: Record<string, string> = {
  new: "Нов", contacted: "Свързан", quote_sent: "Оферта", accepted: "Приет", rejected: "Отказан"
};

const LeadDatabasePage = () => {
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [editingNotes, setEditingNotes] = useState<string | null>(null);
  const [notesValue, setNotesValue] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const [{ data: inq }, { data: camps }] = await Promise.all([
      supabase.from("inquiries").select("*").order("created_at", { ascending: false }),
      supabase.from("campaigns" as any).select("id, name"),
    ]);
    setInquiries(inq || []);
    setCampaigns(camps || []);
    setLoading(false);
  };

  const campaignMap = useMemo(() => new Map(campaigns.map((c: any) => [c.id, c.name])), [campaigns]);

  const filtered = useMemo(() => {
    let result = inquiries;
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(i => i.name.toLowerCase().includes(q) || i.email.toLowerCase().includes(q) || i.phone.includes(q));
    }
    if (dateRange?.from) {
      result = result.filter(i => {
        const d = new Date(i.created_at);
        return d >= startOfDay(dateRange.from!) && (!dateRange.to || d <= endOfDay(dateRange.to));
      });
    }
    return result;
  }, [inquiries, search, dateRange]);

  const saveNotes = async (id: string) => {
    await supabase.from("inquiries").update({ admin_notes: notesValue } as any).eq("id", id);
    setInquiries(prev => prev.map(i => i.id === id ? { ...i, admin_notes: notesValue } : i));
    setEditingNotes(null);
    toast({ title: "Бележката е запазена" });
  };

  const assignCampaign = async (inquiryId: string, campaignId: string) => {
    const val = campaignId === "none" ? null : campaignId;
    await supabase.from("inquiries").update({ campaign_id: val } as any).eq("id", inquiryId);
    setInquiries(prev => prev.map(i => i.id === inquiryId ? { ...i, campaign_id: val } : i));
    toast({ title: "Кампанията е присвоена" });
  };

  const exportCSV = () => {
    const headers = ["Име", "Email", "Телефон", "Услуга", "Статус", "Кампания", "Дата", "Бележки"];
    const rows = filtered.map(i => [
      i.name, i.email, i.phone, serviceLabels[i.service_type] || i.service_type,
      statusLabels[i.status] || i.status, campaignMap.get(i.campaign_id) || "",
      format(new Date(i.created_at), "yyyy-MM-dd HH:mm"),
      (i.admin_notes || "").replace(/,/g, ";")
    ]);
    const csv = [headers.join(","), ...rows.map(r => r.map(c => `"${c}"`).join(","))].join("\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `leads-${format(new Date(), "yyyy-MM-dd")}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return <div className="flex items-center justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-foreground">CRM — База лийдове ({filtered.length})</h1>
        <Button variant="outline" onClick={exportCSV}>
          <Download className="h-4 w-4 mr-1" /> Експорт CSV
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input className="pl-9" placeholder="Търси по име, email или телефон..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className={cn(!dateRange?.from && "text-muted-foreground")}>
              <CalendarIcon className="h-4 w-4 mr-1" />
              {dateRange?.from
                ? `${format(dateRange.from, "d MMM", { locale: bg })}${dateRange.to ? ` — ${format(dateRange.to, "d MMM", { locale: bg })}` : ""}`
                : "Филтър по дата"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="end">
            <Calendar mode="range" selected={dateRange} onSelect={setDateRange} numberOfMonths={2} locale={bg} className="p-3 pointer-events-auto" />
          </PopoverContent>
        </Popover>
        {dateRange?.from && (
          <Button variant="ghost" size="icon" onClick={() => setDateRange(undefined)}>
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      <Card>
        <CardContent className="p-0 overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Име</TableHead>
                <TableHead>Контакт</TableHead>
                <TableHead>Услуга</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead>Кампания</TableHead>
                <TableHead>Дата</TableHead>
                <TableHead>Бележки</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(i => (
                <TableRow key={i.id}>
                  <TableCell className="font-medium">{i.name}</TableCell>
                  <TableCell>
                    <div className="text-sm">{i.email}</div>
                    <div className="text-xs text-muted-foreground">{i.phone}</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{serviceLabels[i.service_type] || i.service_type}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{statusLabels[i.status] || i.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <Select value={i.campaign_id || "none"} onValueChange={v => assignCampaign(i.id, v)}>
                      <SelectTrigger className="w-[140px] h-8 text-xs">
                        <SelectValue placeholder="—" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">— Без —</SelectItem>
                        {campaigns.map((c: any) => (
                          <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                    {format(new Date(i.created_at), "d MMM yyyy", { locale: bg })}
                  </TableCell>
                  <TableCell>
                    {editingNotes === i.id ? (
                      <div className="flex gap-1">
                        <Textarea className="min-w-[150px] text-xs h-16" value={notesValue} onChange={e => setNotesValue(e.target.value)} />
                        <div className="flex flex-col gap-1">
                          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => saveNotes(i.id)}>
                            <Save className="h-3 w-3" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setEditingNotes(null)}>
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <button
                        className="text-xs text-muted-foreground hover:text-foreground cursor-pointer text-left max-w-[200px] truncate"
                        onClick={() => { setEditingNotes(i.id); setNotesValue(i.admin_notes || ""); }}
                      >
                        {i.admin_notes || "Добави бележка..."}
                      </button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-muted-foreground py-8">Няма намерени лийдове</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default LeadDatabasePage;
