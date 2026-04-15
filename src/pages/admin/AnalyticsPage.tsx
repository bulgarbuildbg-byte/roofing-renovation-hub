import { useEffect, useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { supabase } from "@/integrations/supabase/client";
import {
  Users, Clock, MousePointer, Phone, Calculator, Loader2, CalendarIcon, Download,
  ArrowUpDown, TrendingUp, TrendingDown, Minus, Globe, Bot, ShieldCheck,
  AlertTriangle, CheckCircle2, Target, BarChart3, PhoneCall, Percent,
  Activity, Zap, ArrowRight, Inbox,
} from "lucide-react";
import { format, startOfDay, startOfWeek, startOfMonth, startOfYear, endOfDay, endOfWeek, endOfMonth, endOfYear, subHours } from "date-fns";
import { bg } from "date-fns/locale";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import type { DateRange } from "react-day-picker";

type PresetKey = "today" | "this_week" | "this_month" | "this_year" | "custom";

const presets: { key: PresetKey; label: string; getRange: () => { from: Date; to: Date } }[] = [
  { key: "today", label: "Днес", getRange: () => ({ from: startOfDay(new Date()), to: endOfDay(new Date()) }) },
  { key: "this_week", label: "Тази седмица", getRange: () => ({ from: startOfWeek(new Date(), { weekStartsOn: 1 }), to: endOfWeek(new Date(), { weekStartsOn: 1 }) }) },
  { key: "this_month", label: "Този месец", getRange: () => ({ from: startOfMonth(new Date()), to: endOfMonth(new Date()) }) },
  { key: "this_year", label: "Тази година", getRange: () => ({ from: startOfYear(new Date()), to: endOfYear(new Date()) }) },
];

const SOURCE_CONFIG: Record<string, { label: string; color: string }> = {
  organic:  { label: "Органично търсене", color: "#22c55e" },
  direct:   { label: "Директен достъп",   color: "#64748b" },
  referral: { label: "Препращане",         color: "#f59e0b" },
  social:   { label: "Социални мрежи",     color: "#8b5cf6" },
  email:    { label: "Имейл",              color: "#06b6d4" },
  unknown:  { label: "Непознат",           color: "#94a3b8" },
};

const PATH_LABELS: Record<string, string> = {
  "/bg": "Начало", "/bg/": "Начало",
  "/bg/remont-na-pokrivi": "Ремонт на покриви",
  "/bg/remont-na-techove-pokriv": "Ремонт на течове",
  "/bg/hidroizolacia-na-pokriv": "Хидроизолация",
  "/bg/nov-pokriv": "Нов покрив",
  "/bg/remont-na-keremideni-pokrivi": "Керемидени покриви",
  "/bg/remont-na-ploski-pokrivi": "Плоски покриви",
  "/bg/metalni-pokrivi": "Метални покриви",
  "/bg/poddruzhka-na-pokrivi": "Поддръжка",
  "/bg/za-nas": "За нас", "/bg/proekti": "Проекти",
  "/bg/otzyvi": "Отзиви", "/bg/kontakti": "Контакти",
  "/bg/vaprosi": "FAQ", "/bg/blog": "Блог",
  "/bg/kalkulator": "Калкулатор", "/bg/bezplaten-ogled": "Безплатен оглед",
  "/bg/kak-rabotim": "Как работим", "/bg/ceni": "Цени",
  "/bg/uslugi": "Услуги", "/en": "Home (EN)", "/en/": "Home (EN)",
};

const glassCard = {
  background: "hsl(220 20% 10% / 0.7)",
  backdropFilter: "blur(16px)",
  border: "1px solid hsl(220 15% 18%)",
};

const AnalyticsPage = () => {
  const [activePreset, setActivePreset] = useState<PresetKey>("this_month");
  const [dateRange, setDateRange] = useState<DateRange | undefined>(() => {
    const r = presets.find(p => p.key === "this_month")!.getRange();
    return { from: r.from, to: r.to };
  });
  const [compareEnabled, setCompareEnabled] = useState(false);
  const [filterBots, setFilterBots] = useState(true);
  const [events, setEvents] = useState<any[]>([]);
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [recentActivity, setRecentActivity] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const from = dateRange?.from;
  const to = dateRange?.to;

  const compRange = useMemo(() => {
    if (!from || !to || !compareEnabled) return null;
    const diff = to.getTime() - from.getTime();
    return { from: new Date(from.getTime() - diff - 86400000), to: new Date(from.getTime() - 86400000) };
  }, [from, to, compareEnabled]);

  useEffect(() => { if (from) fetchEvents(); }, [from, to, compareEnabled]);

  const fetchEvents = async () => {
    setLoading(true);
    const earliest = compRange ? compRange.from : from!;
    const latest = to || from!;
    const [{ data }, { data: inqData }, { data: activityData }] = await Promise.all([
      supabase.from("analytics_events" as any)
        .select("event_type, event_name, session_id, duration_seconds, created_at, page_path, referrer_source, referrer, is_bot")
        .gte("created_at", earliest.toISOString()).lte("created_at", endOfDay(latest).toISOString()),
      supabase.from("inquiries")
        .select("id, name, created_at, referrer_source, session_id, service_type, status")
        .gte("created_at", earliest.toISOString()).lte("created_at", endOfDay(latest).toISOString()),
      supabase.from("inquiries")
        .select("id, name, created_at, service_type, status")
        .order("created_at", { ascending: false }).limit(10),
    ]);
    setEvents(data || []);
    setInquiries(inqData || []);
    setRecentActivity(activityData || []);
    setLoading(false);
  };

  const filterByRange = (rows: any[], r: { from: Date; to: Date }) =>
    rows.filter(e => {
      const d = new Date(e.created_at);
      if (d < r.from || d > endOfDay(r.to)) return false;
      if (filterBots && e.is_bot) return false;
      return true;
    });

  const botCount = useMemo(() => {
    if (!from || !to) return 0;
    return events.filter(e => { const d = new Date(e.created_at); return d >= from && d <= endOfDay(to) && e.is_bot; }).length;
  }, [events, from, to]);

  const currentEvents = useMemo(() => from && to ? filterByRange(events, { from, to }) : [], [events, from, to, filterBots]);
  const compareEvents = useMemo(() => compRange ? filterByRange(events, compRange) : [], [events, compRange, filterBots]);
  const rangeInquiries = useMemo(() => {
    if (!from || !to) return [];
    return inquiries.filter(inq => { const d = new Date(inq.created_at); return d >= from && d <= endOfDay(to); });
  }, [inquiries, from, to]);

  const calcStats = (rows: any[], inqs: any[]) => {
    const visitors = new Set(rows.filter(r => r.event_type === "page_view").map(r => r.session_id)).size;
    const durations = rows.filter(r => r.event_type === "session_duration" && r.duration_seconds);
    const avgDuration = durations.length > 0
      ? Math.round(durations.reduce((s, r) => s + r.duration_seconds, 0) / durations.length / 60 * 10) / 10 : 0;
    const btnCount = (name: string) => rows.filter(r => r.event_type === "button_click" && r.event_name === name).length;
    const calcStarts = rows.filter(r => r.event_type === "calculator" && r.event_name === "calculator_start").length;
    const calcCompletes = rows.filter(r => r.event_type === "calculator" && r.event_name === "calculator_complete").length;
    const calls = btnCount("call_button");
    const leads = inqs.length;
    const conversionRate = visitors > 0 ? Math.round((leads / visitors) * 1000) / 10 : 0;
    const calcCompletionRate = calcStarts > 0 ? Math.round((calcCompletes / calcStarts) * 100) : 0;
    return { visitors, avgDuration, offers: btnCount("offer_button"), calls, calculator: btnCount("calculator_button"), calcStarts, calcCompletes, calcCompletionRate, leads, conversionRate };
  };

  const current = calcStats(currentEvents, rangeInquiries);
  const compare = compareEnabled ? calcStats(compareEvents, []) : null;

  const funnelData = useMemo(() => {
    const steps = [
      { name: "Посещения", value: current.visitors, fill: "#3b82f6" },
      { name: "Калкулатор", value: current.calcStarts || current.calculator, fill: "#8b5cf6" },
      { name: "Завършен калк.", value: current.calcCompletes, fill: "#a855f7" },
      { name: "Запитване", value: current.leads, fill: "#f59e0b" },
      { name: "Обаждане", value: current.calls, fill: "#22c55e" },
    ];
    return steps.map((s, i) => ({
      ...s,
      dropOff: i > 0 && steps[i - 1].value > 0 ? Math.round((1 - s.value / steps[i - 1].value) * 100) : 0,
      pct: steps[0].value > 0 ? Math.round((s.value / steps[0].value) * 100) : 0,
    }));
  }, [current]);

  const callsByPage = useMemo(() => {
    const callEvents = currentEvents.filter(e => e.event_type === "button_click" && e.event_name === "call_button");
    const counts: Record<string, number> = {};
    callEvents.forEach(e => { counts[e.page_path || "/"] = (counts[e.page_path || "/"] || 0) + 1; });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 10).map(([path, count]) => ({ path, count }));
  }, [currentEvents]);

  const callsBySource = useMemo(() => {
    const callEvents = currentEvents.filter(e => e.event_type === "button_click" && e.event_name === "call_button");
    const sessionSources: Record<string, string> = {};
    currentEvents.filter(e => e.event_type === "page_view").forEach(e => {
      if (!sessionSources[e.session_id]) sessionSources[e.session_id] = e.referrer_source || "direct";
    });
    const counts: Record<string, number> = {};
    callEvents.forEach(e => { const src = sessionSources[e.session_id] || "direct"; counts[src] = (counts[src] || 0) + 1; });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]).map(([source, count]) => ({
      source, count, label: SOURCE_CONFIG[source]?.label ?? source, color: SOURCE_CONFIG[source]?.color ?? "#94a3b8",
    }));
  }, [currentEvents]);

  const trafficSources = useMemo(() => {
    const pageViews = currentEvents.filter(e => e.event_type === "page_view");
    const sessionSource: Record<string, string> = {};
    const sorted = [...pageViews].sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
    for (const e of sorted) { if (!sessionSource[e.session_id]) sessionSource[e.session_id] = e.referrer_source || "unknown"; }
    const counts: Record<string, number> = {};
    for (const src of Object.values(sessionSource)) counts[src] = (counts[src] || 0) + 1;
    const total = Object.values(counts).reduce((s, v) => s + v, 0);
    const leadCounts: Record<string, number> = {};
    rangeInquiries.forEach(inq => { const src = inq.referrer_source || "direct"; leadCounts[src] = (leadCounts[src] || 0) + 1; });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]).map(([source, sessions]) => ({
      source, sessions, leads: leadCounts[source] || 0,
      pct: total > 0 ? Math.round((sessions / total) * 100) : 0,
      label: SOURCE_CONFIG[source]?.label ?? source, color: SOURCE_CONFIG[source]?.color ?? "#94a3b8",
    }));
  }, [currentEvents, rangeInquiries]);

  const chartData = useMemo(() => {
    if (!from || !to) return [];
    const days: Date[] = [];
    const d = new Date(from);
    while (d <= to) { days.push(new Date(d)); d.setDate(d.getDate() + 1); }
    return days.map(day => {
      const dayStart = startOfDay(day); const dayEnd = endOfDay(day);
      const dayEvents = currentEvents.filter(e => { const d = new Date(e.created_at); return d >= dayStart && d <= dayEnd; });
      const visitors = new Set(dayEvents.filter(e => e.event_type === "page_view").map(e => e.session_id)).size;
      const leads = dayEvents.filter(e => e.event_type === "button_click" && e.event_name === "offer_button").length;
      const calls = dayEvents.filter(e => e.event_type === "button_click" && e.event_name === "call_button").length;
      return { date: format(day, "dd MMM", { locale: bg }), visitors, leads, calls };
    });
  }, [currentEvents, from, to]);

  const topPages = useMemo(() => {
    const counts: Record<string, number> = {};
    currentEvents.filter(e => e.event_type === "page_view" && e.page_path).forEach(e => { counts[e.page_path] = (counts[e.page_path] || 0) + 1; });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 10).map(([path, views]) => ({ path, views }));
  }, [currentEvents]);

  const calcAnalytics = useMemo(() => ({
    starts: currentEvents.filter(e => e.event_type === "calculator" && e.event_name === "calculator_start").length,
    completes: currentEvents.filter(e => e.event_type === "calculator" && e.event_name === "calculator_complete").length,
    steps: currentEvents.filter(e => e.event_type === "calculator" && e.event_name === "calculator_step").length,
  }), [currentEvents]);

  const alerts = useMemo(() => {
    const list: { type: "error" | "warning" | "info"; title: string; message: string }[] = [];
    if (current.visitors > 10 && current.conversionRate < 1) list.push({ type: "error", title: "Нисък Conversion Rate", message: `Само ${current.conversionRate}% от посетителите стават лидове.` });
    const hours48ago = subHours(new Date(), 48);
    const recentLeads = rangeInquiries.filter(inq => new Date(inq.created_at) >= hours48ago).length;
    if (recentLeads === 0 && current.visitors > 20) list.push({ type: "warning", title: "Няма лидове 48ч", message: "Не са получени запитвания в последните 48 часа." });
    if (current.calcStarts > 5 && current.calcCompletionRate < 30) list.push({ type: "warning", title: "Нисък % завършване на калкулатора", message: `Само ${current.calcCompletionRate}% завършват калкулатора.` });
    return list;
  }, [current, rangeInquiries]);

  const handlePreset = (key: PresetKey) => {
    const r = presets.find(p => p.key === key)!.getRange();
    setActivePreset(key); setDateRange({ from: r.from, to: r.to });
  };

  const exportCSV = () => {
    const headers = ["Дата", "Тип", "Име", "Страница", "Сесия", "Продължителност", "Източник"];
    const rows = currentEvents.map(e => [
      format(new Date(e.created_at), "yyyy-MM-dd HH:mm:ss"), e.event_type, e.event_name, e.page_path || "", e.session_id, e.duration_seconds || "", e.referrer_source || ""
    ]);
    const csv = [headers.join(","), ...rows.map(r => r.map(v => `"${String(v).replace(/"/g, '""')}"`).join(","))].join("\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url;
    a.download = `analytics-${format(from!, "yyyy-MM-dd")}-${format(to || from!, "yyyy-MM-dd")}.csv`;
    a.click(); URL.revokeObjectURL(url);
  };

  const TrendIndicator = ({ current: c, previous }: { current: number; previous: number | null }) => {
    if (previous === null || previous === 0) return null;
    const pct = Math.round(((c - previous) / previous) * 100);
    if (pct === 0) return <span className="text-xs flex items-center gap-0.5" style={{ color: "hsl(215 15% 55%)" }}><Minus className="h-3 w-3" /> 0%</span>;
    return pct > 0
      ? <span className="text-xs flex items-center gap-0.5" style={{ color: "#22c55e" }}><TrendingUp className="h-3 w-3" /> +{pct}%</span>
      : <span className="text-xs flex items-center gap-0.5" style={{ color: "#ef4444" }}><TrendingDown className="h-3 w-3" /> {pct}%</span>;
  };

  const dateLabel = from && to
    ? `${format(from, "d MMM yyyy", { locale: bg })} — ${format(to, "d MMM yyyy", { locale: bg })}`
    : "Изберете период";

  const serviceLabels: Record<string, string> = {
    repair: "Ремонт", replacement: "Подмяна", new_construction: "Нов покрив",
    waterproofing: "Хидроизолация", tiles: "Керемиди", flat_roof: "Плосък покрив",
    metal_roof: "Метален покрив", maintenance: "Поддръжка", leak_repair: "Течове", other: "Друго",
  };

  const KpiCard = ({ icon: Icon, label, value, suffix, gradient, trend }: {
    icon: any; label: string; value: number | string; suffix?: string; gradient: string; trend?: number | null;
  }) => (
    <div className="rounded-xl p-[1px] admin-card-hover" style={{ background: gradient }}>
      <div className="rounded-xl p-4 h-full" style={{ background: "hsl(220 25% 8%)" }}>
        <div className="flex items-center gap-2 mb-2">
          <div className="p-1.5 rounded-lg" style={{ background: "hsl(220 20% 14%)" }}>
            <Icon className="h-3.5 w-3.5" style={{ color: "hsl(215 80% 65%)" }} />
          </div>
          <span className="text-[11px] font-medium" style={{ color: "hsl(215 15% 50%)" }}>{label}</span>
        </div>
        <p className="text-2xl font-bold animate-count" style={{ color: "hsl(210 20% 95%)" }}>
          {value}
          {suffix && <span className="text-sm font-normal ml-1" style={{ color: "hsl(215 15% 45%)" }}>{suffix}</span>}
        </p>
        {trend !== undefined && trend !== null && <TrendIndicator current={Number(value)} previous={trend} />}
      </div>
    </div>
  );

  const btnStyle = (active: boolean) => ({
    background: active ? "hsl(215 80% 50%)" : "hsl(220 20% 14%)",
    color: active ? "white" : "hsl(215 15% 60%)",
    border: "1px solid " + (active ? "hsl(215 80% 50%)" : "hsl(220 15% 20%)"),
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2" style={{ color: "hsl(210 20% 95%)" }}>
            <div className="p-2 rounded-xl" style={{ background: "linear-gradient(135deg, hsl(215 80% 50%), hsl(260 60% 45%))" }}>
              <BarChart3 className="h-5 w-5" style={{ color: "white" }} />
            </div>
            Dashboard
          </h1>
          <p className="text-sm mt-1" style={{ color: "hsl(215 15% 50%)" }}>Маркетинг, лидове и продажби — реално време</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {presets.map(p => (
            <button key={p.key} className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all" style={btnStyle(activePreset === p.key)} onClick={() => handlePreset(p.key)}>{p.label}</button>
          ))}
          <Popover>
            <PopoverTrigger asChild>
              <button className="px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1 transition-all" style={btnStyle(activePreset === "custom")}>
                <CalendarIcon className="h-3.5 w-3.5" /> Период
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar mode="range" selected={dateRange} onSelect={(range) => { setDateRange(range); setActivePreset("custom"); }} numberOfMonths={2} locale={bg} className="p-3 pointer-events-auto" />
            </PopoverContent>
          </Popover>
          <button className="px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1 transition-all" style={btnStyle(filterBots)} onClick={() => setFilterBots(!filterBots)}>
            <ShieldCheck className="h-3.5 w-3.5" /> {filterBots ? "Реални" : "Всички"}
          </button>
          <button className="px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1 transition-all" style={btnStyle(compareEnabled)} onClick={() => setCompareEnabled(!compareEnabled)}>
            <ArrowUpDown className="h-3.5 w-3.5" /> Сравнение
          </button>
          <button className="px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1 transition-all" style={btnStyle(false)} onClick={exportCSV}>
            <Download className="h-3.5 w-3.5" /> CSV
          </button>
        </div>
      </div>

      <div className="text-sm" style={{ color: "hsl(215 15% 50%)" }}>
        <span className="font-medium" style={{ color: "hsl(210 20% 85%)" }}>{dateLabel}</span>
        {compareEnabled && compRange && (
          <span className="ml-3">vs {format(compRange.from, "d MMM yyyy", { locale: bg })} — {format(compRange.to, "d MMM yyyy", { locale: bg })}</span>
        )}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin" style={{ color: "hsl(215 80% 55%)" }} />
        </div>
      ) : (
        <>
          {/* Alerts */}
          {alerts.length > 0 && (
            <div className="space-y-2">
              {alerts.map((a, i) => (
                <div key={i} className="rounded-xl p-3 flex items-start gap-3 text-sm"
                  style={{
                    background: a.type === "error" ? "hsl(0 84% 55% / 0.1)" : "hsl(45 100% 50% / 0.08)",
                    border: `1px solid ${a.type === "error" ? "hsl(0 84% 55% / 0.3)" : "hsl(45 100% 50% / 0.2)"}`,
                  }}>
                  <AlertTriangle className="h-4 w-4 mt-0.5 shrink-0" style={{ color: a.type === "error" ? "#ef4444" : "#f59e0b" }} />
                  <div>
                    <p className="font-semibold" style={{ color: "hsl(210 20% 90%)" }}>{a.title}</p>
                    <p style={{ color: "hsl(215 15% 55%)" }}>{a.message}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* KPI Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <KpiCard icon={Users} label="Посетители" value={current.visitors} gradient="linear-gradient(135deg, hsl(215 80% 50% / 0.5), hsl(215 80% 50% / 0.1))" trend={compare?.visitors ?? null} />
            <KpiCard icon={Target} label="Лидове" value={current.leads} gradient="linear-gradient(135deg, hsl(45 100% 50% / 0.5), hsl(45 100% 50% / 0.1))" trend={compare?.leads ?? null} />
            <KpiCard icon={Percent} label="Conversion" value={`${current.conversionRate}%`} gradient="linear-gradient(135deg, hsl(150 80% 40% / 0.5), hsl(150 80% 40% / 0.1))" />
            <KpiCard icon={Phone} label="Обаждания" value={current.calls} gradient="linear-gradient(135deg, hsl(120 60% 40% / 0.5), hsl(120 60% 40% / 0.1))" trend={compare?.calls ?? null} />
            <KpiCard icon={Calculator} label="Калк. старт" value={current.calcStarts || current.calculator} gradient="linear-gradient(135deg, hsl(260 60% 50% / 0.5), hsl(260 60% 50% / 0.1))" />
            <KpiCard icon={CheckCircle2} label="Калк. завършен" value={`${current.calcCompletionRate}%`} gradient="linear-gradient(135deg, hsl(280 60% 50% / 0.5), hsl(280 60% 50% / 0.1))" />
            <KpiCard icon={Clock} label="Ср. време" value={current.avgDuration} suffix="мин" gradient="linear-gradient(135deg, hsl(200 80% 50% / 0.5), hsl(200 80% 50% / 0.1))" trend={compare?.avgDuration ?? null} />
            {botCount > 0 && <KpiCard icon={Bot} label="Ботове (филтр.)" value={botCount} gradient="linear-gradient(135deg, hsl(0 80% 50% / 0.5), hsl(0 80% 50% / 0.1))" />}
          </div>

          {/* Activity feed + Pipeline */}
          <div className="grid md:grid-cols-3 gap-4">
            {/* Live activity */}
            <div className="rounded-xl p-4" style={glassCard}>
              <h3 className="text-sm font-semibold mb-3 flex items-center gap-2" style={{ color: "hsl(210 20% 90%)" }}>
                <Activity className="h-4 w-4" style={{ color: "#22c55e" }} />
                Последна активност
                <span className="w-2 h-2 rounded-full animate-pulse ml-auto" style={{ background: "#22c55e" }} />
              </h3>
              <div className="space-y-2.5 max-h-[250px] overflow-y-auto">
                {recentActivity.map((item) => (
                  <div key={item.id} className="flex items-start gap-2.5 text-xs p-2 rounded-lg" style={{ background: "hsl(220 20% 12%)" }}>
                    <Inbox className="h-3.5 w-3.5 mt-0.5 shrink-0" style={{ color: "#f59e0b" }} />
                    <div className="min-w-0">
                      <p className="font-medium truncate" style={{ color: "hsl(210 20% 88%)" }}>{item.name}</p>
                      <p style={{ color: "hsl(215 15% 45%)" }}>{serviceLabels[item.service_type] || item.service_type} · {format(new Date(item.created_at), "dd MMM, HH:mm", { locale: bg })}</p>
                    </div>
                  </div>
                ))}
                {recentActivity.length === 0 && <p className="text-xs" style={{ color: "hsl(215 15% 45%)" }}>Няма скорошна активност</p>}
              </div>
            </div>

            {/* Revenue pipeline */}
            <div className="md:col-span-2 rounded-xl p-4" style={glassCard}>
              <h3 className="text-sm font-semibold mb-3 flex items-center gap-2" style={{ color: "hsl(210 20% 90%)" }}>
                <Zap className="h-4 w-4" style={{ color: "#f59e0b" }} />
                Pipeline на конверсия
              </h3>
              <div className="flex items-center gap-2 overflow-x-auto pb-2">
                {funnelData.map((step, i) => (
                  <div key={step.name} className="flex items-center gap-2 shrink-0">
                    <div className="rounded-xl p-3 text-center min-w-[100px] admin-card-hover" style={{ background: "hsl(220 20% 12%)", border: `1px solid ${step.fill}33` }}>
                      <p className="text-lg font-bold" style={{ color: step.fill }}>{step.value}</p>
                      <p className="text-[10px] font-medium" style={{ color: "hsl(215 15% 50%)" }}>{step.name}</p>
                      <p className="text-[9px] mt-0.5" style={{ color: "hsl(215 15% 40%)" }}>{step.pct}%</p>
                    </div>
                    {i < funnelData.length - 1 && (
                      <div className="flex flex-col items-center">
                        <ArrowRight className="h-4 w-4" style={{ color: "hsl(215 15% 30%)" }} />
                        {step.dropOff > 0 && <span className="text-[9px]" style={{ color: "#ef4444" }}>-{funnelData[i + 1].dropOff}%</span>}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList className="rounded-xl p-1" style={{ background: "hsl(220 20% 10%)", border: "1px solid hsl(220 15% 18%)" }}>
              <TabsTrigger value="overview" className="rounded-lg text-xs data-[state=active]:bg-[hsl(215,80%,50%)] data-[state=active]:text-white">Общо</TabsTrigger>
              <TabsTrigger value="funnel" className="rounded-lg text-xs data-[state=active]:bg-[hsl(215,80%,50%)] data-[state=active]:text-white">Фуния</TabsTrigger>
              <TabsTrigger value="calculator" className="rounded-lg text-xs data-[state=active]:bg-[hsl(215,80%,50%)] data-[state=active]:text-white">Калкулатор</TabsTrigger>
              <TabsTrigger value="traffic" className="rounded-lg text-xs data-[state=active]:bg-[hsl(215,80%,50%)] data-[state=active]:text-white">Трафик</TabsTrigger>
              <TabsTrigger value="calls" className="rounded-lg text-xs data-[state=active]:bg-[hsl(215,80%,50%)] data-[state=active]:text-white">Обаждания</TabsTrigger>
            </TabsList>

            {/* Overview */}
            <TabsContent value="overview" className="space-y-4">
              <div className="rounded-xl p-4" style={glassCard}>
                <h3 className="text-sm font-semibold mb-3" style={{ color: "hsl(210 20% 90%)" }}>Дневна активност</h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 15% 18%)" />
                      <XAxis dataKey="date" tick={{ fill: 'hsl(215, 15%, 50%)', fontSize: 11 }} />
                      <YAxis tick={{ fill: 'hsl(215, 15%, 50%)', fontSize: 11 }} />
                      <Tooltip contentStyle={{ backgroundColor: 'hsl(220, 25%, 10%)', border: '1px solid hsl(220, 15%, 20%)', borderRadius: '12px', color: 'hsl(210, 20%, 90%)' }} />
                      <Bar dataKey="visitors" name="Посетители" fill="hsl(215, 80%, 50%)" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="leads" name="Оферти" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="calls" name="Обаждания" fill="#22c55e" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="rounded-xl p-4" style={glassCard}>
                  <h3 className="text-sm font-semibold mb-3" style={{ color: "hsl(210 20% 90%)" }}>Топ страници</h3>
                  <div className="space-y-2">
                    {topPages.map((p, i) => (
                      <div key={p.path} className="flex items-center justify-between text-sm p-2 rounded-lg" style={{ background: "hsl(220 20% 12%)" }}>
                        <span className="truncate max-w-[250px]" style={{ color: "hsl(215 15% 55%)" }}>{i + 1}. <span style={{ color: "hsl(210 20% 85%)" }}>{PATH_LABELS[p.path] || p.path}</span></span>
                        <span className="font-bold" style={{ color: "hsl(215 80% 65%)" }}>{p.views}</span>
                      </div>
                    ))}
                    {topPages.length === 0 && <p className="text-sm" style={{ color: "hsl(215 15% 45%)" }}>Няма данни</p>}
                  </div>
                </div>

                {current.visitors > 0 && (
                  <div className="rounded-xl p-4" style={glassCard}>
                    <h3 className="text-sm font-semibold mb-3" style={{ color: "hsl(210 20% 90%)" }}>Конверсии</h3>
                    <div className="grid grid-cols-2 gap-4 text-center">
                      {[
                        { v: `${current.conversionRate}%`, l: "Лидове / Посетители" },
                        { v: `${((current.calls / current.visitors) * 100).toFixed(1)}%`, l: "Обаждания / Посетители" },
                        { v: `${(((current.leads + current.calls) / current.visitors) * 100).toFixed(1)}%`, l: "Общо конверсия" },
                        { v: `${current.calcCompletionRate}%`, l: "Завършване калкулатор" },
                      ].map(item => (
                        <div key={item.l} className="p-3 rounded-lg" style={{ background: "hsl(220 20% 12%)" }}>
                          <p className="text-xl font-bold" style={{ color: "hsl(210 20% 95%)" }}>{item.v}</p>
                          <p className="text-[10px]" style={{ color: "hsl(215 15% 50%)" }}>{item.l}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Funnel */}
            <TabsContent value="funnel" className="space-y-4">
              <div className="rounded-xl p-4" style={glassCard}>
                <h3 className="text-sm font-semibold mb-4 flex items-center gap-2" style={{ color: "hsl(210 20% 90%)" }}>
                  <BarChart3 className="h-4 w-4" style={{ color: "hsl(215 80% 55%)" }} /> Фуния на конверсия
                </h3>
                <div className="space-y-3">
                  {funnelData.map((step, i) => (
                    <div key={step.name} className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium" style={{ color: "hsl(210 20% 88%)" }}>{step.name}</span>
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-lg" style={{ color: step.fill }}>{step.value}</span>
                          <span className="text-xs" style={{ color: "hsl(215 15% 50%)" }}>{step.pct}%</span>
                          {i > 0 && step.dropOff > 0 && <span className="text-xs flex items-center gap-0.5" style={{ color: "#ef4444" }}><TrendingDown className="h-3 w-3" /> -{step.dropOff}%</span>}
                        </div>
                      </div>
                      <div className="w-full rounded-full h-5 overflow-hidden" style={{ background: "hsl(220 20% 14%)" }}>
                        <div className="h-full rounded-full transition-all duration-700" style={{ width: `${Math.max(step.pct, 2)}%`, backgroundColor: step.fill, boxShadow: `0 0 10px ${step.fill}66` }} />
                      </div>
                    </div>
                  ))}
                </div>
                {funnelData[0].value > 0 && (
                  <div className="mt-6 p-4 rounded-xl" style={{ background: "hsl(220 20% 12%)", border: "1px solid hsl(220 15% 18%)" }}>
                    <h4 className="text-sm font-semibold mb-2" style={{ color: "hsl(210 20% 88%)" }}>Drop-off анализ</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                      {funnelData.slice(1).map(step => (
                        <div key={step.name} className="text-center p-2 rounded-lg" style={{ background: "hsl(220 20% 10%)" }}>
                          <p className="text-lg font-bold" style={{ color: step.dropOff > 70 ? "#ef4444" : step.dropOff > 50 ? "#f59e0b" : "#22c55e" }}>{step.dropOff}%</p>
                          <p className="text-[10px]" style={{ color: "hsl(215 15% 45%)" }}>загуба преди {step.name}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Calculator */}
            <TabsContent value="calculator" className="space-y-4">
              <div className="grid md:grid-cols-3 gap-3">
                {[
                  { l: "Започнали", v: calcAnalytics.starts || current.calculator, c: "#3b82f6" },
                  { l: "Завършили", v: calcAnalytics.completes, c: "#22c55e" },
                  { l: "Completion Rate", v: `${current.calcCompletionRate}%`, c: current.calcCompletionRate < 30 ? "#ef4444" : current.calcCompletionRate < 60 ? "#f59e0b" : "#22c55e" },
                ].map(item => (
                  <div key={item.l} className="rounded-xl p-4" style={glassCard}>
                    <p className="text-[11px] font-medium mb-1" style={{ color: "hsl(215 15% 50%)" }}>{item.l}</p>
                    <p className="text-3xl font-bold" style={{ color: item.c }}>{item.v}</p>
                  </div>
                ))}
              </div>
              <div className="rounded-xl p-4" style={glassCard}>
                <h3 className="text-sm font-semibold mb-2" style={{ color: "hsl(210 20% 90%)" }}>Стъпки в калкулатора</h3>
                <p className="text-sm" style={{ color: "hsl(215 15% 55%)" }}>
                  Регистрирани {calcAnalytics.steps} преминавания между стъпки.
                  {calcAnalytics.starts > 0 && calcAnalytics.completes === 0 && <span style={{ color: "#f59e0b" }}> ⚠ Никой не е завършил калкулатора.</span>}
                </p>
              </div>
            </TabsContent>

            {/* Traffic */}
            <TabsContent value="traffic" className="space-y-4">
              {trafficSources.length > 0 && (
                <div className="rounded-xl p-4" style={glassCard}>
                  <h3 className="text-sm font-semibold mb-3 flex items-center gap-2" style={{ color: "hsl(210 20% 90%)" }}>
                    <Globe className="h-4 w-4" style={{ color: "hsl(215 80% 55%)" }} /> Трафик по източници
                  </h3>
                  <div className="h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={trafficSources} layout="vertical" margin={{ top: 0, right: 40, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="hsl(220, 15%, 18%)" />
                        <XAxis type="number" tick={{ fill: 'hsl(215, 15%, 50%)', fontSize: 11 }} allowDecimals={false} />
                        <YAxis type="category" dataKey="label" width={140} tick={{ fill: 'hsl(210, 20%, 85%)', fontSize: 12 }} />
                        <Tooltip contentStyle={{ backgroundColor: 'hsl(220, 25%, 10%)', border: '1px solid hsl(220, 15%, 20%)', borderRadius: '12px', color: 'hsl(210, 20%, 90%)' }} />
                        <Bar dataKey="sessions" name="Сесии" radius={[0, 4, 4, 0]} maxBarSize={28}>
                          {trafficSources.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-4 pt-4" style={{ borderTop: "1px solid hsl(220 15% 18%)" }}>
                    <div className="grid grid-cols-4 text-[10px] font-semibold mb-2 px-2" style={{ color: "hsl(215 15% 45%)" }}>
                      <span>Източник</span><span className="text-right">Сесии</span><span className="text-right">Лидове</span><span className="text-right">Conv. %</span>
                    </div>
                    {trafficSources.map(s => (
                      <div key={s.source} className="grid grid-cols-4 text-sm px-2 py-1.5 rounded-lg" style={{ color: "hsl(210 20% 85%)" }}>
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: s.color }} />
                          <span className="text-xs">{s.label}</span>
                        </div>
                        <span className="text-right font-medium text-xs">{s.sessions}</span>
                        <span className="text-right font-bold text-xs" style={{ color: "#f59e0b" }}>{s.leads}</span>
                        <span className="text-right text-xs">{s.sessions > 0 ? ((s.leads / s.sessions) * 100).toFixed(1) : 0}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </TabsContent>

            {/* Calls */}
            <TabsContent value="calls" className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="rounded-xl p-4" style={glassCard}>
                  <h3 className="text-sm font-semibold mb-3 flex items-center gap-2" style={{ color: "hsl(210 20% 90%)" }}>
                    <PhoneCall className="h-4 w-4" style={{ color: "#22c55e" }} /> По страница
                  </h3>
                  {callsByPage.length > 0 ? (
                    <div className="space-y-2">
                      {callsByPage.map((p, i) => (
                        <div key={p.path} className="flex items-center justify-between text-sm p-2 rounded-lg" style={{ background: "hsl(220 20% 12%)" }}>
                          <span className="truncate max-w-[200px]" style={{ color: "hsl(215 15% 55%)" }}>{i + 1}. <span style={{ color: "hsl(210 20% 85%)" }}>{PATH_LABELS[p.path] || p.path}</span></span>
                          <span className="font-bold" style={{ color: "#22c55e" }}>{p.count}</span>
                        </div>
                      ))}
                    </div>
                  ) : <p className="text-sm" style={{ color: "hsl(215 15% 45%)" }}>Няма данни</p>}
                </div>
                <div className="rounded-xl p-4" style={glassCard}>
                  <h3 className="text-sm font-semibold mb-3 flex items-center gap-2" style={{ color: "hsl(210 20% 90%)" }}>
                    <Globe className="h-4 w-4" style={{ color: "hsl(215 80% 55%)" }} /> По източник
                  </h3>
                  {callsBySource.length > 0 ? (
                    <div className="space-y-2">
                      {callsBySource.map(s => (
                        <div key={s.source} className="flex items-center justify-between text-sm p-2 rounded-lg" style={{ background: "hsl(220 20% 12%)" }}>
                          <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: s.color }} />
                            <span style={{ color: "hsl(210 20% 85%)" }}>{s.label}</span>
                          </div>
                          <span className="font-bold" style={{ color: "#22c55e" }}>{s.count}</span>
                        </div>
                      ))}
                    </div>
                  ) : <p className="text-sm" style={{ color: "hsl(215 15% 45%)" }}>Няма данни</p>}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  );
};

export default AnalyticsPage;
