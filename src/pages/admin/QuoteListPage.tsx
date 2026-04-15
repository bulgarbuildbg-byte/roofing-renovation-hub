import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { bg } from "date-fns/locale";
import { Eye, FileText, Calendar } from "lucide-react";

const statusLabels: Record<string, string> = {
  draft: "Чернова", sent: "Изпратена", accepted: "Приета", rejected: "Отказана",
};
const statusStyles: Record<string, { bg: string; text: string }> = {
  draft: { bg: "hsl(215 15% 30% / 0.3)", text: "hsl(215 15% 60%)" },
  sent: { bg: "hsl(215 80% 50% / 0.15)", text: "#3b82f6" },
  accepted: { bg: "hsl(150 60% 40% / 0.15)", text: "#22c55e" },
  rejected: { bg: "hsl(0 80% 50% / 0.12)", text: "#ef4444" },
};

const glassCard = { background: "hsl(220 20% 10% / 0.7)", backdropFilter: "blur(16px)", border: "1px solid hsl(220 15% 18%)" };

const QuoteListPage = () => {
  const [quotes, setQuotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from("quotes").select("*, inquiries(name, email)").order("created_at", { ascending: false });
      setQuotes(data || []);
      setLoading(false);
    };
    fetch();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold flex items-center gap-2" style={{ color: "hsl(210 20% 95%)" }}>
        <div className="p-2 rounded-xl" style={{ background: "linear-gradient(135deg, hsl(215 80% 50%), hsl(260 60% 45%))" }}>
          <FileText className="h-5 w-5" style={{ color: "white" }} />
        </div>
        Оферти
      </h1>

      {loading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          {[1,2,3].map(i => (
            <div key={i} className="rounded-xl p-4 animate-pulse" style={glassCard}>
              <div className="h-4 w-32 rounded mb-3" style={{ background: "hsl(220 20% 16%)" }} />
              <div className="h-3 w-48 rounded" style={{ background: "hsl(220 20% 14%)" }} />
            </div>
          ))}
        </div>
      ) : quotes.length === 0 ? (
        <div className="text-center py-12" style={{ color: "hsl(215 15% 45%)" }}>Няма създадени оферти.</div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          {quotes.map((q) => {
            const st = statusStyles[q.status] || statusStyles.draft;
            return (
              <Link
                key={q.id}
                to={`/admin/inquiries/${q.inquiry_id}/quote`}
                className="rounded-xl p-4 transition-all duration-200 admin-card-hover group"
                style={glassCard}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-semibold text-sm" style={{ color: "hsl(210 20% 92%)" }}>
                      {(q as any).inquiries?.name || "—"}
                    </p>
                    <p className="text-lg font-bold mt-1" style={{ color: "hsl(215 80% 65%)" }}>
                      {Number(q.total).toFixed(2)} лв
                    </p>
                  </div>
                  <span className="text-[10px] font-semibold px-2 py-1 rounded-full" style={{ background: st.bg, color: st.text }}>
                    {statusLabels[q.status] || q.status}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-xs" style={{ color: "hsl(215 15% 50%)" }}>
                  <Calendar className="h-3 w-3" />
                  {format(new Date(q.created_at), "dd.MM.yyyy", { locale: bg })}
                </div>

                <div className="mt-3 flex items-center justify-end text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ color: "hsl(215 80% 65%)" }}>
                  Виж оферта <Eye className="h-3 w-3 ml-1" />
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default QuoteListPage;
