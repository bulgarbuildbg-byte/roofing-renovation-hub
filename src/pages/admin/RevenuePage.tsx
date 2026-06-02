import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { TrendingUp, FileSignature, Euro, Target, Loader2, FileText, Inbox, Trophy, TrendingDown } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, LineChart, Line,
} from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  serviceCategoryLabel,
  INQUIRY_STATUS_LABELS,
  inquiryStatusPhase,
  currencySymbol,
} from "@/lib/serviceCategories";

const COLORS = ["#3b82f6", "#22c55e", "#f59e0b", "#8b5cf6", "#ef4444", "#14b8a6", "#ec4899", "#84cc16"];

const RevenuePage = () => {
  const [loading, setLoading] = useState(true);
  const [contracts, setContracts] = useState<any[]>([]);
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [quotes, setQuotes] = useState<any[]>([]);

  // Filters
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth()); // 0-11
  const [serviceFilter, setServiceFilter] = useState<string>("all");
  const [sourceFilter, setSourceFilter] = useState<string>("all");
  const [cityFilter, setCityFilter] = useState<string>("");

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const [{ data: c }, { data: i }, { data: q }] = await Promise.all([
        supabase.from("contracts").select("*"),
        supabase.from("inquiries").select("id, status, created_at, address, referrer_source, service_type"),
        supabase.from("quotes").select("id, inquiry_id, total, status, created_at, sent_at"),
      ]);
      setContracts(c || []);
      setInquiries(i || []);
      setQuotes(q || []);
      setLoading(false);
    };
    load();
  }, []);

  // Apply filters
  const fContracts = useMemo(() => contracts.filter((c) => {
    if (serviceFilter !== "all" && !(c.service_categories || []).includes(serviceFilter)) return false;
    if (cityFilter && !c.client_address?.toLowerCase().includes(cityFilter.toLowerCase())) return false;
    return true;
  }), [contracts, serviceFilter, cityFilter]);

  const fInquiries = useMemo(() => inquiries.filter((i) => {
    if (sourceFilter !== "all" && i.referrer_source !== sourceFilter) return false;
    if (cityFilter && !i.address?.toLowerCase().includes(cityFilter.toLowerCase())) return false;
    return true;
  }), [inquiries, sourceFilter, cityFilter]);

  const fQuotes = quotes;

  const stats = useMemo(() => {
    const refDate = (c: any) => new Date(c.signed_date || c.updated_at || c.created_at);
    const signed = fContracts.filter((c) => c.contract_workflow_status === "signed");

    const monthStart = new Date(year, month, 1);
    const monthEnd = new Date(year, month + 1, 1);
    const yearStart = new Date(year, 0, 1);
    const yearEnd = new Date(year + 1, 0, 1);

    const inRange = (d: Date, a: Date, b: Date) => d >= a && d < b;
    const sumValue = (arr: any[]) => arr.reduce((s, c) => s + Number(c.contract_value || c.total || 0), 0);

    // === Monthly KPIs ===
    const newInqMonth = fInquiries.filter((i) => inRange(new Date(i.created_at), monthStart, monthEnd));
    const quotesSentMonth = fQuotes.filter((q) => {
      const d = new Date(q.sent_at || q.created_at);
      return inRange(d, monthStart, monthEnd) && (q.status === "sent" || q.status === "accepted" || q.sent_at);
    });
    const contractsPreparedMonth = fContracts.filter((c) =>
      inRange(new Date(c.created_at), monthStart, monthEnd) && c.contract_workflow_status === "prepared"
    );
    const contractsSentMonth = fContracts.filter((c) =>
      inRange(new Date(c.updated_at || c.created_at), monthStart, monthEnd) && c.contract_workflow_status === "sent"
    );
    const contractsSignedMonth = signed.filter((c) => inRange(refDate(c), monthStart, monthEnd));
    const quotesRejectedMonth = fInquiries.filter((i) =>
      inRange(new Date(i.created_at), monthStart, monthEnd) && (i.status === "rejected" || i.status === "contract_rejected")
    );

    // === Yearly KPIs ===
    const newInqYear = fInquiries.filter((i) => inRange(new Date(i.created_at), yearStart, yearEnd));
    const quotesSentYear = fQuotes.filter((q) => {
      const d = new Date(q.sent_at || q.created_at);
      return inRange(d, yearStart, yearEnd) && (q.status === "sent" || q.status === "accepted" || q.sent_at);
    });
    const contractsSignedYear = signed.filter((c) => inRange(refDate(c), yearStart, yearEnd));

    // === Monthly trend (12 months of selected year) ===
    const monthsTrend: { name: string; revenue: number; potential: number; signedCount: number; quotesCount: number }[] = [];
    for (let m = 0; m < 12; m++) {
      const a = new Date(year, m, 1);
      const b = new Date(year, m + 1, 1);
      const ms = signed.filter((c) => inRange(refDate(c), a, b));
      const mq = fQuotes.filter((q) => {
        const d = new Date(q.sent_at || q.created_at);
        return inRange(d, a, b) && (q.status === "sent" || q.status === "accepted" || q.sent_at);
      });
      monthsTrend.push({
        name: a.toLocaleDateString("bg-BG", { month: "short" }),
        revenue: sumValue(ms),
        potential: sumValue(mq),
        signedCount: ms.length,
        quotesCount: mq.length,
      });
    }

    // === By service category (year) ===
    const byCat = new Map<string, { count: number; value: number }>();
    contractsSignedYear.forEach((c) => {
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

    // === Best / worst months ===
    const sortedMonths = [...monthsTrend].sort((a, b) => b.revenue - a.revenue);
    const bestMonth = sortedMonths[0];
    const worstMonth = sortedMonths.filter((m) => m.revenue > 0).slice(-1)[0] || sortedMonths.slice(-1)[0];

    // === Conversions ===
    const monthConvInqQuote = newInqMonth.length > 0 ? (quotesSentMonth.length / newInqMonth.length) * 100 : 0;
    const monthConvQuoteContract = quotesSentMonth.length > 0 ? (contractsSignedMonth.length / quotesSentMonth.length) * 100 : 0;
    const yearConvInqQuote = newInqYear.length > 0 ? (quotesSentYear.length / newInqYear.length) * 100 : 0;
    const yearConvQuoteContract = quotesSentYear.length > 0 ? (contractsSignedYear.length / quotesSentYear.length) * 100 : 0;

    const yearRevenue = sumValue(contractsSignedYear);
    const avgValueYear = contractsSignedYear.length > 0 ? yearRevenue / contractsSignedYear.length : 0;

    // === Lost quotes ===
    const lostInquiryIds = new Set(
      fInquiries.filter((i) => i.status === "rejected" || i.status === "contract_rejected").map((i) => i.id)
    );
    const lostQuotes = fQuotes
      .filter((q) => lostInquiryIds.has(q.inquiry_id) && Number(q.total) > 0)
      .map((q) => ({ ...q, lostValue: Number(q.total) }))
      .sort((a, b) => b.lostValue - a.lostValue)
      .slice(0, 10);

    return {
      // monthly
      newInqMonth: newInqMonth.length,
      quotesSentMonthCount: quotesSentMonth.length,
      quotesSentMonthValue: sumValue(quotesSentMonth),
      contractsPreparedMonth: contractsPreparedMonth.length,
      contractsSentMonth: contractsSentMonth.length,
      contractsSignedMonthCount: contractsSignedMonth.length,
      contractsSignedMonthValue: sumValue(contractsSignedMonth),
      quotesRejectedMonth: quotesRejectedMonth.length,
      monthConvInqQuote,
      monthConvQuoteContract,
      // yearly
      newInqYear: newInqYear.length,
      quotesSentYearCount: quotesSentYear.length,
      quotesSentYearValue: sumValue(quotesSentYear),
      contractsSignedYearCount: contractsSignedYear.length,
      yearRevenue,
      avgValueYear,
      yearConvInqQuote,
      yearConvQuoteContract,
      // charts
      monthsTrend,
      byService,
      bestMonth,
      worstMonth,
      lostQuotes,
    };
  }, [fContracts, fInquiries, fQuotes, year, month]);

  const sources = useMemo(() => {
    const s = new Set<string>();
    inquiries.forEach((i) => i.referrer_source && s.add(i.referrer_source));
    return Array.from(s);
  }, [inquiries]);

  const allServiceCats = useMemo(() => {
    const s = new Set<string>();
    contracts.forEach((c) => (c.service_categories || []).forEach((cat: string) => s.add(cat)));
    return Array.from(s);
  }, [contracts]);

  if (loading) return <div className="text-center py-12"><Loader2 className="h-6 w-6 animate-spin mx-auto" /></div>;

  const monthLabel = new Date(year, month, 1).toLocaleDateString("bg-BG", { month: "long", year: "numeric" });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h1 className="text-2xl font-bold flex items-center gap-2 text-foreground">
          <TrendingUp className="h-6 w-6" /> Продажби, договори и оборот
        </h1>
      </div>

      {/* Filters */}
      <div className="bg-card border border-border rounded-xl p-4 grid grid-cols-2 md:grid-cols-5 gap-3">
        <div>
          <Label className="text-xs">Година</Label>
          <Select value={String(year)} onValueChange={(v) => setYear(Number(v))}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {[now.getFullYear(), now.getFullYear() - 1, now.getFullYear() - 2].map((y) => (
                <SelectItem key={y} value={String(y)}>{y}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="text-xs">Месец</Label>
          <Select value={String(month)} onValueChange={(v) => setMonth(Number(v))}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {Array.from({ length: 12 }, (_, i) => i).map((m) => (
                <SelectItem key={m} value={String(m)}>
                  {new Date(2000, m, 1).toLocaleDateString("bg-BG", { month: "long" })}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="text-xs">Услуга</Label>
          <Select value={serviceFilter} onValueChange={setServiceFilter}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Всички</SelectItem>
              {allServiceCats.map((c) => (
                <SelectItem key={c} value={c}>{serviceCategoryLabel(c)}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="text-xs">Източник</Label>
          <Select value={sourceFilter} onValueChange={setSourceFilter}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Всички</SelectItem>
              {sources.map((s) => (
                <SelectItem key={s} value={s}>{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="text-xs">Град / адрес</Label>
          <Input value={cityFilter} onChange={(e) => setCityFilter(e.target.value)} placeholder="напр. Варна" />
        </div>
      </div>

      <Tabs defaultValue="monthly" className="space-y-4">
        <TabsList>
          <TabsTrigger value="monthly">Месечно ({monthLabel})</TabsTrigger>
          <TabsTrigger value="yearly">Годишно ({year})</TabsTrigger>
          <TabsTrigger value="comparison">Оферти vs Договори</TabsTrigger>
        </TabsList>

        {/* ============ MONTHLY ============ */}
        <TabsContent value="monthly" className="space-y-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <StatCard icon={<Inbox />} label="Нови запитвания" value={stats.newInqMonth.toString()} />
            <StatCard icon={<FileText />} label="Изпратени оферти" value={stats.quotesSentMonthCount.toString()} sub={`${stats.quotesSentMonthValue.toLocaleString("bg-BG")} € потенциал`} />
            <StatCard icon={<FileSignature />} label="Договори: изготвени / изпратени" value={`${stats.contractsPreparedMonth} / ${stats.contractsSentMonth}`} />
            <StatCard icon={<FileSignature />} label="Договори подписани" value={stats.contractsSignedMonthCount.toString()} sub={`${stats.contractsSignedMonthValue.toLocaleString("bg-BG")} € оборот`} accent />
            <StatCard icon={<Euro />} label="Оборот за месеца" value={`${stats.contractsSignedMonthValue.toLocaleString("bg-BG")} €`} accent />
            <StatCard icon={<TrendingDown />} label="Отказани оферти/договори" value={stats.quotesRejectedMonth.toString()} />
            <StatCard icon={<Target />} label="Конверсия запитване → оферта" value={`${stats.monthConvInqQuote.toFixed(1)}%`} />
            <StatCard icon={<Target />} label="Конверсия оферта → договор" value={`${stats.monthConvQuoteContract.toFixed(1)}%`} accent />
          </div>
        </TabsContent>

        {/* ============ YEARLY ============ */}
        <TabsContent value="yearly" className="space-y-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <StatCard icon={<Inbox />} label="Запитвания общо" value={stats.newInqYear.toString()} />
            <StatCard icon={<FileText />} label="Изпратени оферти" value={stats.quotesSentYearCount.toString()} sub={`${stats.quotesSentYearValue.toLocaleString("bg-BG")} € потенциал`} />
            <StatCard icon={<FileSignature />} label="Подписани договори" value={stats.contractsSignedYearCount.toString()} accent />
            <StatCard icon={<Euro />} label="Оборот за годината" value={`${stats.yearRevenue.toLocaleString("bg-BG")} €`} accent />
            <StatCard icon={<TrendingUp />} label="Средна стойност на договор" value={`${Math.round(stats.avgValueYear).toLocaleString("bg-BG")} €`} />
            <StatCard icon={<Trophy />} label="Най-силен месец" value={stats.bestMonth?.name || "-"} sub={`${(stats.bestMonth?.revenue || 0).toLocaleString("bg-BG")} €`} />
            <StatCard icon={<TrendingDown />} label="Най-слаб месец" value={stats.worstMonth?.name || "-"} sub={`${(stats.worstMonth?.revenue || 0).toLocaleString("bg-BG")} €`} />
            <StatCard icon={<Target />} label="Конверсия оферта → договор" value={`${stats.yearConvQuoteContract.toFixed(1)}%`} />
          </div>

          {/* Monthly bar chart */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="font-semibold mb-4">Оборот по месеци ({year})</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={stats.monthsTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }} formatter={(v: any) => `${Number(v).toLocaleString("bg-BG")} €`} />
                <Bar dataKey="revenue" fill="#22c55e" radius={[4, 4, 0, 0]} name="Оборот" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* By service */}
          <div className="grid lg:grid-cols-2 gap-4">
            <div className="bg-card border border-border rounded-xl p-6">
              <h2 className="font-semibold mb-4">Оборот по услуги ({year})</h2>
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
              <h2 className="font-semibold mb-4">Топ услуги (брой и оборот)</h2>
              <div className="space-y-2">
                {stats.byService.slice(0, 10).map((s, i) => (
                  <div key={s.name} className="flex items-center gap-3 p-2 rounded bg-muted/30">
                    <div className="w-2 h-8 rounded" style={{ background: COLORS[i % COLORS.length] }} />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{s.name}</p>
                      <p className="text-xs text-muted-foreground">{s.count} договора</p>
                    </div>
                    <p className="font-bold text-green-500 whitespace-nowrap">{s.value.toLocaleString("bg-BG")} €</p>
                  </div>
                ))}
                {stats.byService.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-4">Няма данни.</p>
                )}
              </div>
            </div>
          </div>
        </TabsContent>

        {/* ============ COMPARISON ============ */}
        <TabsContent value="comparison" className="space-y-4">
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="font-semibold mb-4">Оферти (потенциал) vs Договори (реализиран оборот) — {year}</h2>
            <ResponsiveContainer width="100%" height={320}>
              <LineChart data={stats.monthsTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }} formatter={(v: any) => `${Number(v).toLocaleString("bg-BG")} €`} />
                <Legend />
                <Line type="monotone" dataKey="potential" stroke="#a78bfa" strokeWidth={2} name="Оферти" />
                <Line type="monotone" dataKey="revenue" stroke="#22c55e" strokeWidth={2} name="Договори" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="font-semibold mb-4">Брой оферти vs брой договори по месеци</h2>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={stats.monthsTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }} />
                <Legend />
                <Bar dataKey="quotesCount" fill="#a78bfa" name="Оферти" radius={[4, 4, 0, 0]} />
                <Bar dataKey="signedCount" fill="#22c55e" name="Договори" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="font-semibold mb-4">Топ 10 изгубени оферти</h2>
            {stats.lostQuotes.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-6">Няма изгубени оферти.</p>
            ) : (
              <ul className="divide-y divide-border">
                {stats.lostQuotes.map((q) => (
                  <li key={q.id} className="flex items-center justify-between py-2 text-sm">
                    <span className="text-muted-foreground">
                      {new Date(q.created_at).toLocaleDateString("bg-BG")}
                    </span>
                    <span className="font-semibold text-red-500">
                      {q.lostValue.toLocaleString("bg-BG")} €
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </TabsContent>
      </Tabs>
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
