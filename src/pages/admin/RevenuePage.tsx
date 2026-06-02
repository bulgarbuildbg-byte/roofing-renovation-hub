import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { TrendingUp, FileSignature, Euro, Target, Loader2 } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { serviceCategoryLabel } from "@/lib/serviceCategories";

const COLORS = ["#3b82f6", "#22c55e", "#f59e0b", "#8b5cf6", "#ef4444", "#14b8a6", "#ec4899", "#84cc16"];

const RevenuePage = () => {
  const [loading, setLoading] = useState(true);
  const [contracts, setContracts] = useState<any[]>([]);
  const [inquiriesCount, setInquiriesCount] = useState(0);
  const [quotesCount, setQuotesCount] = useState(0);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const [{ data: c }, { count: iq }, { count: qz }] = await Promise.all([
        supabase.from("contracts").select("*"),
        supabase.from("inquiries").select("*", { count: "exact", head: true }),
        supabase.from("quotes").select("*", { count: "exact", head: true }),
      ]);
      setContracts(c || []);
      setInquiriesCount(iq || 0);
      setQuotesCount(qz || 0);
      setLoading(false);
    };
    load();
  }, []);

  const stats = useMemo(() => {
    const signed = contracts.filter((c) => c.contract_workflow_status === "signed");
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const yearStart = new Date(now.getFullYear(), 0, 1);

    const refDate = (c: any) => new Date(c.signed_date || c.updated_at || c.created_at);

    const thisMonth = signed.filter((c) => refDate(c) >= monthStart);
    const thisYear = signed.filter((c) => refDate(c) >= yearStart);

    const sumValue = (arr: any[]) => arr.reduce((s, c) => s + Number(c.contract_value || 0), 0);

    // Monthly revenue (last 12 months)
    const months: { name: string; revenue: number; count: number }[] = [];
    for (let i = 11; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const next = new Date(d.getFullYear(), d.getMonth() + 1, 1);
      const inMonth = signed.filter((c) => {
        const x = refDate(c);
        return x >= d && x < next;
      });
      months.push({
        name: d.toLocaleDateString("bg-BG", { month: "short", year: "2-digit" }),
        revenue: sumValue(inMonth),
        count: inMonth.length,
      });
    }

    // By service category
    const byCat = new Map<string, { count: number; value: number }>();
    signed.forEach((c) => {
      (c.service_categories || []).forEach((cat: string) => {
        const cur = byCat.get(cat) || { count: 0, value: 0 };
        cur.count += 1;
        cur.value += Number(c.contract_value || 0);
        byCat.set(cat, cur);
      });
    });
    const byService = Array.from(byCat.entries())
      .map(([k, v]) => ({ name: serviceCategoryLabel(k), value: v.value, count: v.count }))
      .sort((a, b) => b.value - a.value);

    const avgValue = signed.length > 0 ? sumValue(signed) / signed.length : 0;
    const convInqQuote = inquiriesCount > 0 ? (quotesCount / inquiriesCount) * 100 : 0;
    const convQuoteContract = quotesCount > 0 ? (signed.length / quotesCount) * 100 : 0;

    return {
      monthCount: thisMonth.length,
      yearCount: thisYear.length,
      monthRevenue: sumValue(thisMonth),
      yearRevenue: sumValue(thisYear),
      avgValue,
      totalSigned: signed.length,
      months,
      byService,
      convInqQuote,
      convQuoteContract,
    };
  }, [contracts, inquiriesCount, quotesCount]);

  if (loading) return <div className="text-center py-12"><Loader2 className="h-6 w-6 animate-spin mx-auto" /></div>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold flex items-center gap-2 text-foreground">
        <TrendingUp className="h-6 w-6" /> Договори и оборот
      </h1>

      {/* KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard icon={<FileSignature />} label="Договори този месец" value={stats.monthCount.toString()} sub={`${stats.yearCount} за годината`} />
        <StatCard icon={<Euro />} label="Оборот този месец" value={`${stats.monthRevenue.toLocaleString("bg-BG")} €`} sub={`${stats.yearRevenue.toLocaleString("bg-BG")} € за годината`} accent />
        <StatCard icon={<TrendingUp />} label="Средна стойност" value={`${Math.round(stats.avgValue).toLocaleString("bg-BG")} €`} sub={`${stats.totalSigned} подписани общо`} />
        <StatCard icon={<Target />} label="Конверсия оферта→договор" value={`${stats.convQuoteContract.toFixed(1)}%`} sub={`Запитване→оферта: ${stats.convInqQuote.toFixed(1)}%`} />
      </div>

      {/* Monthly revenue chart */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h2 className="font-semibold mb-4">Оборот по месеци (последните 12)</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={stats.months}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }} formatter={(v: any) => `${Number(v).toLocaleString("bg-BG")} €`} />
            <Bar dataKey="revenue" fill="#22c55e" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* By service */}
      <div className="grid lg:grid-cols-2 gap-4">
        <div className="bg-card border border-border rounded-xl p-6">
          <h2 className="font-semibold mb-4">Оборот по услуги</h2>
          {stats.byService.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">Няма данни.</p>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={stats.byService} dataKey="value" nameKey="name" outerRadius={100} label={(e: any) => `${Number(e.value).toLocaleString("bg-BG")}€`}>
                  {stats.byService.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Legend />
                <Tooltip formatter={(v: any) => `${Number(v).toLocaleString("bg-BG")} €`} />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>

        <div className="bg-card border border-border rounded-xl p-6">
          <h2 className="font-semibold mb-4">Топ услуги (по брой и оборот)</h2>
          <div className="space-y-2">
            {stats.byService.slice(0, 10).map((s, i) => (
              <div key={s.name} className="flex items-center gap-3 p-2 rounded bg-muted/30">
                <div className="w-2 h-8 rounded" style={{ background: COLORS[i % COLORS.length] }} />
                <div className="flex-1">
                  <p className="font-medium text-sm">{s.name}</p>
                  <p className="text-xs text-muted-foreground">{s.count} договора</p>
                </div>
                <p className="font-bold text-green-500">{s.value.toLocaleString("bg-BG")} €</p>
              </div>
            ))}
            {stats.byService.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-4">Няма данни.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, label, value, sub, accent }: any) => (
  <div className={`bg-card border border-border rounded-xl p-4 ${accent ? "ring-1 ring-green-500/30" : ""}`}>
    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
      <span className="[&>svg]:h-4 [&>svg]:w-4">{icon}</span>
      {label}
    </div>
    <p className={`text-xl font-bold ${accent ? "text-green-500" : "text-foreground"}`}>{value}</p>
    {sub && <p className="text-xs text-muted-foreground mt-1">{sub}</p>}
  </div>
);

export default RevenuePage;
