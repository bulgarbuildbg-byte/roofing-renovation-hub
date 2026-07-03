import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { bg } from "date-fns/locale";
import { Eye, Search, Inbox, Phone, MapPin, Calendar, FileSignature, Paperclip, Euro, Trash2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import {
  INQUIRY_STATUS_LABELS,
  PHASE_LABELS,
  PHASE_COLORS,
  inquiryStatusPhase,
  currencySymbol,
} from "@/lib/serviceCategories";

const serviceLabels: Record<string, string> = {
  repair: "Ремонт", replacement: "Подмяна", new_construction: "Нов покрив",
  waterproofing: "Хидроизолация", tiles: "Керемиди", flat_roof: "Плосък покрив",
  metal_roof: "Метален покрив", maintenance: "Поддръжка", leak_repair: "Течове", other: "Друго",
};

const glassCard = { background: "hsl(220 20% 10% / 0.7)", backdropFilter: "blur(16px)", border: "1px solid hsl(220 15% 18%)" };

const InquiryListPage = () => {
  const { isAdmin } = useAuth();
  const { toast } = useToast();
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [quotesByInquiry, setQuotesByInquiry] = useState<Record<string, number>>({});
  const [contractsByInquiry, setContractsByInquiry] = useState<Record<string, { value: number; currency: string; files: number }>>({});
  const [loading, setLoading] = useState(true);
  const [phaseFilter, setPhaseFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const handleDelete = async (e: React.MouseEvent, inquiryId: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (!confirm("Сигурни ли сте, че искате да изтриете това запитване? Действието е необратимо.")) return;
    const { error } = await supabase.from("inquiries").delete().eq("id", inquiryId);
    if (error) {
      toast({ title: "Грешка при изтриване", description: error.message, variant: "destructive" });
      return;
    }
    setInquiries((prev) => prev.filter((i) => i.id !== inquiryId));
    toast({ title: "Запитването е изтрито" });
  };

  const fetchAll = async () => {
    setLoading(true);
    const { data: inq } = await supabase
      .from("inquiries")
      .select("*")
      .order("created_at", { ascending: false });
    setInquiries(inq || []);

    const ids = (inq || []).map((i: any) => i.id);
    if (ids.length > 0) {
      const [{ data: quotes }, { data: contracts }] = await Promise.all([
        supabase.from("quotes").select("inquiry_id, total").in("inquiry_id", ids),
        supabase.from("contracts").select("id, inquiry_id, contract_value, currency").in("inquiry_id", ids),
      ]);

      const qMap: Record<string, number> = {};
      (quotes || []).forEach((q: any) => {
        if (!qMap[q.inquiry_id] || Number(q.total) > qMap[q.inquiry_id]) qMap[q.inquiry_id] = Number(q.total || 0);
      });
      setQuotesByInquiry(qMap);

      const contractIds = (contracts || []).map((c: any) => c.id);
      let fileCountMap: Record<string, number> = {};
      if (contractIds.length > 0) {
        const { data: files } = await supabase
          .from("contract_files" as any)
          .select("contract_id")
          .in("contract_id", contractIds);
        (files || []).forEach((f: any) => {
          fileCountMap[f.contract_id] = (fileCountMap[f.contract_id] || 0) + 1;
        });
      }

      const cMap: Record<string, { value: number; currency: string; files: number }> = {};
      (contracts || []).forEach((c: any) => {
        const filesCount = fileCountMap[c.id] || 0;
        const existing = cMap[c.inquiry_id];
        if (!existing || Number(c.contract_value) > existing.value) {
          cMap[c.inquiry_id] = { value: Number(c.contract_value || 0), currency: c.currency || "EUR", files: filesCount };
        } else {
          existing.files += filesCount;
        }
      });
      setContractsByInquiry(cMap);
    }
    setLoading(false);
  };

  useEffect(() => { fetchAll(); }, []);

  const filtered = useMemo(() => {
    return inquiries.filter((i) => {
      if (phaseFilter !== "all" && inquiryStatusPhase(i.status) !== phaseFilter) return false;
      if (statusFilter !== "all" && i.status !== statusFilter) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const hit = i.name?.toLowerCase().includes(q) || i.phone?.includes(q) ||
          i.email?.toLowerCase().includes(q) || i.address?.toLowerCase().includes(q);
        if (!hit) return false;
      }
      return true;
    });
  }, [inquiries, phaseFilter, statusFilter, searchQuery]);

  const SkeletonCard = () => (
    <div className="rounded-xl p-4 animate-pulse" style={glassCard}>
      <div className="h-4 w-32 rounded mb-3" style={{ background: "hsl(220 20% 16%)" }} />
      <div className="h-3 w-48 rounded mb-2" style={{ background: "hsl(220 20% 14%)" }} />
      <div className="h-3 w-24 rounded" style={{ background: "hsl(220 20% 14%)" }} />
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold flex items-center gap-2" style={{ color: "hsl(210 20% 95%)" }}>
          <div className="p-2 rounded-xl" style={{ background: "linear-gradient(135deg, hsl(215 80% 50%), hsl(260 60% 45%))" }}>
            <Inbox className="h-5 w-5" style={{ color: "white" }} />
          </div>
          Запитвания ({filtered.length})
        </h1>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: "hsl(215 15% 45%)" }} />
          <Input
            placeholder="Търсене по име, телефон, имейл..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 border-0"
            style={{ background: "hsl(220 20% 12%)", color: "hsl(210 20% 90%)" }}
          />
        </div>
        <Select value={phaseFilter} onValueChange={setPhaseFilter}>
          <SelectTrigger className="w-full sm:w-44 border-0" style={{ background: "hsl(220 20% 12%)", color: "hsl(210 20% 90%)" }}>
            <SelectValue placeholder="Фаза" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Всички фази</SelectItem>
            {Object.entries(PHASE_LABELS).map(([k, v]) => (
              <SelectItem key={k} value={k}>{v}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-56 border-0" style={{ background: "hsl(220 20% 12%)", color: "hsl(210 20% 90%)" }}>
            <SelectValue placeholder="Статус" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Всички статуси</SelectItem>
            {Object.entries(INQUIRY_STATUS_LABELS).map(([k, v]) => (
              <SelectItem key={k} value={k}>{v}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {loading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          {[1,2,3,4,5,6].map(i => <SkeletonCard key={i} />)}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12" style={{ color: "hsl(215 15% 45%)" }}>Няма намерени запитвания.</div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          {filtered.map((inquiry) => {
            const phase = inquiryStatusPhase(inquiry.status);
            const st = PHASE_COLORS[phase];
            const quoteTotal = quotesByInquiry[inquiry.id];
            const contractInfo = contractsByInquiry[inquiry.id];
            return (
              <Link
                key={inquiry.id}
                to={`/admin/inquiries/${inquiry.id}`}
                className="rounded-xl p-4 transition-all duration-200 admin-card-hover group"
                style={glassCard}
              >
                <div className="flex items-start justify-between mb-3 gap-2">
                  <div className="min-w-0">
                    <p className="font-semibold text-sm truncate" style={{ color: "hsl(210 20% 92%)" }}>{inquiry.name}</p>
                    <p className="text-xs mt-0.5" style={{ color: "hsl(215 15% 50%)" }}>
                      {serviceLabels[inquiry.service_type] || inquiry.service_type}
                    </p>
                  </div>
                  <span className="text-[10px] font-semibold px-2 py-1 rounded-full shrink-0"
                    style={{ background: st.bg, color: st.text, boxShadow: st.glow }}>
                    {INQUIRY_STATUS_LABELS[inquiry.status] || inquiry.status}
                  </span>
                </div>

                <div className="space-y-1.5 text-xs" style={{ color: "hsl(215 15% 50%)" }}>
                  <div className="flex items-center gap-1.5">
                    <Phone className="h-3 w-3" /> {inquiry.phone}
                  </div>
                  {inquiry.address && (
                    <div className="flex items-center gap-1.5">
                      <MapPin className="h-3 w-3" /> <span className="truncate">{inquiry.address}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-3 w-3" /> {format(new Date(inquiry.created_at), "dd.MM.yyyy HH:mm", { locale: bg })}
                  </div>
                </div>

                {(quoteTotal || contractInfo) && (
                  <div className="mt-3 pt-2 border-t border-white/5 flex flex-wrap gap-2 text-[11px]">
                    {quoteTotal != null && quoteTotal > 0 && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md"
                        style={{ background: "hsl(270 60% 55% / 0.15)", color: "#a78bfa" }}>
                        <Euro className="h-3 w-3" /> Оферта: {quoteTotal.toLocaleString("bg-BG")} €
                      </span>
                    )}
                    {contractInfo && contractInfo.value > 0 && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md font-semibold"
                        style={{ background: "hsl(150 60% 40% / 0.18)", color: "#22c55e" }}>
                        <FileSignature className="h-3 w-3" /> Договор: {contractInfo.value.toLocaleString("bg-BG")} {currencySymbol(contractInfo.currency)}
                      </span>
                    )}
                    {contractInfo && contractInfo.files > 0 && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md"
                        style={{ background: "hsl(220 20% 18%)", color: "hsl(210 20% 80%)" }}>
                        <Paperclip className="h-3 w-3" /> {contractInfo.files}
                      </span>
                    )}
                  </div>
                )}

                <div className="mt-3 flex items-center justify-end text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ color: "hsl(215 80% 65%)" }}>
                  Виж детайли <Eye className="h-3 w-3 ml-1" />
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default InquiryListPage;
