import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { bg } from "date-fns/locale";
import { Eye, Search, Inbox, Phone, MapPin, Calendar } from "lucide-react";

const statusLabels: Record<string, string> = {
  new: "Ново", contacted: "Свързани", quote_sent: "Оферта изпратена", accepted: "Прието", rejected: "Отказано",
};
const statusStyles: Record<string, { bg: string; text: string; glow: string }> = {
  new: { bg: "hsl(215 80% 50% / 0.15)", text: "#3b82f6", glow: "0 0 8px hsl(215 80% 50% / 0.3)" },
  contacted: { bg: "hsl(45 100% 50% / 0.12)", text: "#f59e0b", glow: "0 0 8px hsl(45 100% 50% / 0.2)" },
  quote_sent: { bg: "hsl(270 60% 50% / 0.15)", text: "#8b5cf6", glow: "0 0 8px hsl(270 60% 50% / 0.2)" },
  accepted: { bg: "hsl(150 60% 40% / 0.15)", text: "#22c55e", glow: "0 0 8px hsl(150 60% 40% / 0.2)" },
  rejected: { bg: "hsl(0 80% 50% / 0.12)", text: "#ef4444", glow: "0 0 8px hsl(0 80% 50% / 0.2)" },
};
const serviceLabels: Record<string, string> = {
  repair: "Ремонт", replacement: "Подмяна", new_construction: "Нов покрив",
  waterproofing: "Хидроизолация", tiles: "Керемиди", flat_roof: "Плосък покрив",
  metal_roof: "Метален покрив", maintenance: "Поддръжка", leak_repair: "Течове", other: "Друго",
};

const glassCard = { background: "hsl(220 20% 10% / 0.7)", backdropFilter: "blur(16px)", border: "1px solid hsl(220 15% 18%)" };

const InquiryListPage = () => {
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const fetchInquiries = async () => {
    setLoading(true);
    let query = supabase.from("inquiries").select("*").order("created_at", { ascending: false });
    if (statusFilter !== "all") query = query.eq("status", statusFilter as any);
    const { data } = await query;
    setInquiries(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchInquiries(); }, [statusFilter]);

  const filtered = inquiries.filter((i) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return i.name?.toLowerCase().includes(q) || i.phone?.includes(q) || i.email?.toLowerCase().includes(q) || i.address?.toLowerCase().includes(q);
  });

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
          Запитвания
        </h1>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: "hsl(215 15% 45%)" }} />
          <Input
            placeholder="Търсене по име, телефон, имейл..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 border-0"
            style={{ background: "hsl(220 20% 12%)", color: "hsl(210 20% 90%)", borderColor: "hsl(220 15% 18%)" }}
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-48 border-0" style={{ background: "hsl(220 20% 12%)", color: "hsl(210 20% 90%)" }}>
            <SelectValue placeholder="Филтър по статус" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Всички</SelectItem>
            <SelectItem value="new">Нови</SelectItem>
            <SelectItem value="contacted">Свързани</SelectItem>
            <SelectItem value="quote_sent">Оферта изпратена</SelectItem>
            <SelectItem value="accepted">Приети</SelectItem>
            <SelectItem value="rejected">Отказани</SelectItem>
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
            const st = statusStyles[inquiry.status] || statusStyles.new;
            return (
              <Link
                key={inquiry.id}
                to={`/admin/inquiries/${inquiry.id}`}
                className="rounded-xl p-4 transition-all duration-200 admin-card-hover group"
                style={glassCard}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-semibold text-sm" style={{ color: "hsl(210 20% 92%)" }}>{inquiry.name}</p>
                    <p className="text-xs mt-0.5" style={{ color: "hsl(215 15% 50%)" }}>
                      {serviceLabels[inquiry.service_type] || inquiry.service_type}
                    </p>
                  </div>
                  <span className="text-[10px] font-semibold px-2 py-1 rounded-full"
                    style={{ background: st.bg, color: st.text, boxShadow: st.glow }}>
                    {statusLabels[inquiry.status] || inquiry.status}
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
