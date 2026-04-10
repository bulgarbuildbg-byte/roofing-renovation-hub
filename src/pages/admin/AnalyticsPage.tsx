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
} from "lucide-react";
import { format, startOfDay, startOfWeek, startOfMonth, startOfYear, endOfDay, endOfWeek, endOfMonth, endOfYear, subHours } from "date-fns";
import { bg } from "date-fns/locale";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, FunnelChart, Funnel, LabelList } from "recharts";
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
  const [loading, setLoading] = useState(true);

  const from = dateRange?.from;
  const to = dateRange?.to;

  const compRange = useMemo(() => {
    if (!from || !to || !compareEnabled) return null;
    const diff = to.getTime() - from.getTime();
    return { from: new Date(from.getTime() - diff - 86400000), to: new Date(from.getTime() - 86400000) };
  }, [from, to, compareEnabled]);

  useEffect(() => {
    if (!from) return;
    fetchEvents();
  }, [from, to, compareEnabled]);

  const fetchEvents = async () => {
    setLoading(true);
    const earliest = compRange ? compRange.from : from!;
    const latest = to || from!;
    const [{ data }, { data: inqData }] = await Promise.all([
      supabase
        .from("analytics_events" as any)
        .select("event_type, event_name, session_id, duration_seconds, created_at, page_path, referrer_source, referrer, is_bot")
        .gte("created_at", earliest.toISOString())
        .lte("created_at", endOfDay(latest).toISOString()),
      supabase
        .from("inquiries")
        .select("id, created_at, referrer_source, session_id")
        .gte("created_at", earliest.toISOString())
        .lte("created_at", endOfDay(latest).toISOString()),
    ]);
    setEvents(data || []);
    setInquiries(inqData || []);
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
    return events.filter(e => {
      const d = new Date(e.created_at);
      return d >= from && d <= endOfDay(to) && e.is_bot;
    }).length;
  }, [events, from, to]);

  const currentEvents = useMemo(() => from && to ? filterByRange(events, { from, to }) : [], [events, from, to, filterBots]);
  const compareEvents = useMemo(() => compRange ? filterByRange(events, compRange) : [], [events, compRange, filterBots]);

  const rangeInquiries = useMemo(() => {
    if (!from || !to) return [];
    return inquiries.filter(inq => {
      const d = new Date(inq.created_at);
      return d >= from && d <= endOfDay(to);
    });
  }, [inquiries, from, to]);

  const calcStats = (rows: any[], inqs: any[]) => {
    const visitors = new Set(rows.filter(r => r.event_type === "page_view").map(r => r.session_id)).size;
    const durations = rows.filter(r => r.event_type === "session_duration" && r.duration_seconds);
    const avgDuration = durations.length > 0
      ? Math.round(durations.reduce((s, r) => s + r.duration_seconds, 0) / durations.length / 60 * 10) / 10
      : 0;
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

  // Funnel data
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

  // Call tracking by page
  const callsByPage = useMemo(() => {
    const callEvents = currentEvents.filter(e => e.event_type === "button_click" && e.event_name === "call_button");
    const counts: Record<string, number> = {};
    callEvents.forEach(e => { counts[e.page_path || "/"] = (counts[e.page_path || "/"] || 0) + 1; });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 10).map(([path, count]) => ({ path, count }));
  }, [currentEvents]);

  // Call tracking by source
  const callsBySource = useMemo(() => {
    const callEvents = currentEvents.filter(e => e.event_type === "button_click" && e.event_name === "call_button");
    const sessionSources: Record<string, string> = {};
    currentEvents.filter(e => e.event_type === "page_view").forEach(e => {
      if (!sessionSources[e.session_id]) sessionSources[e.session_id] = e.referrer_source || "direct";
    });
    const counts: Record<string, number> = {};
    callEvents.forEach(e => {
      const src = sessionSources[e.session_id] || "direct";
      counts[src] = (counts[src] || 0) + 1;
    });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]).map(([source, count]) => ({
      source, count,
      label: SOURCE_CONFIG[source]?.label ?? source,
      color: SOURCE_CONFIG[source]?.color ?? "#94a3b8",
    }));
  }, [currentEvents]);

  // Traffic sources with leads
  const trafficSources = useMemo(() => {
    const pageViews = currentEvents.filter(e => e.event_type === "page_view");
    const sessionSource: Record<string, string> = {};
    const sorted = [...pageViews].sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
    for (const e of sorted) {
      if (!sessionSource[e.session_id]) sessionSource[e.session_id] = e.referrer_source || "unknown";
    }
    const counts: Record<string, number> = {};
    for (const src of Object.values(sessionSource)) counts[src] = (counts[src] || 0) + 1;
    const total = Object.values(counts).reduce((s, v) => s + v, 0);

    // Count leads per source
    const leadCounts: Record<string, number> = {};
    rangeInquiries.forEach(inq => {
      const src = inq.referrer_source || "direct";
      leadCounts[src] = (leadCounts[src] || 0) + 1;
    });

    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .map(([source, sessions]) => ({
        source, sessions,
        leads: leadCounts[source] || 0,
        pct: total > 0 ? Math.round((sessions / total) * 100) : 0,
        label: SOURCE_CONFIG[source]?.label ?? source,
        color: SOURCE_CONFIG[source]?.color ?? "#94a3b8",
      }));
  }, [currentEvents, rangeInquiries]);

  // Daily chart data
  const chartData = useMemo(() => {
    if (!from || !to) return [];
    const days: Date[] = [];
    const d = new Date(from);
    while (d <= to) { days.push(new Date(d)); d.setDate(d.getDate() + 1); }
    return days.map(day => {
      const dayStart = startOfDay(day);
      const dayEnd = endOfDay(day);
      const dayEvents = currentEvents.filter(e => { const d = new Date(e.created_at); return d >= dayStart && d <= dayEnd; });
      const visitors = new Set(dayEvents.filter(e => e.event_type === "page_view").map(e => e.session_id)).size;
      const leads = dayEvents.filter(e => e.event_type === "button_click" && e.event_name === "offer_button").length;
      const calls = dayEvents.filter(e => e.event_type === "button_click" && e.event_name === "call_button").length;
      return { date: format(day, "dd MMM", { locale: bg }), visitors, leads, calls };
    });
  }, [currentEvents, from, to]);

  // Top pages
  const topPages = useMemo(() => {
    const counts: Record<string, number> = {};
    currentEvents.filter(e => e.event_type === "page_view" && e.page_path).forEach(e => { counts[e.page_path] = (counts[e.page_path] || 0) + 1; });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 10).map(([path, views]) => ({ path, views }));
  }, [currentEvents]);

  // Calculator analytics — most chosen options
  const calcAnalytics = useMemo(() => {
    const calcDetailEvents = currentEvents.filter(e => e.event_type === "calculator" || e.event_type === "calculator_detail");
    return {
      starts: currentEvents.filter(e => e.event_type === "calculator" && e.event_name === "calculator_start").length,
      completes: currentEvents.filter(e => e.event_type === "calculator" && e.event_name === "calculator_complete").length,
      steps: currentEvents.filter(e => e.event_type === "calculator" && e.event_name === "calculator_step").length,
    };
  }, [currentEvents]);

  // Alerts
  const alerts = useMemo(() => {
    const list: { type: "error" | "warning" | "info"; title: string; message: string }[] = [];
    if (current.visitors > 10 && current.conversionRate < 1) {
      list.push({ type: "error", title: "Нисък Conversion Rate", message: `Само ${current.conversionRate}% от посетителите стават лидове. Проверете формите и CTA елементите.` });
    }
    const hours48ago = subHours(new Date(), 48);
    const recentLeads = rangeInquiries.filter(inq => new Date(inq.created_at) >= hours48ago).length;
    if (recentLeads === 0 && current.visitors > 20) {
      list.push({ type: "warning", title: "Няма лидове 48ч", message: "Не са получени запитвания в последните 48 часа. Проверете формите и калкулатора." });
    }
    if (current.calcStarts > 5 && current.calcCompletionRate < 30) {
      list.push({ type: "warning", title: "Нисък % завършване на калкулатора", message: `Само ${current.calcCompletionRate}% от потребителите завършват калкулатора. Помислете за опростяване на стъпките.` });
    }
    return list;
  }, [current, rangeInquiries]);

  const handlePreset = (key: PresetKey) => {
    const r = presets.find(p => p.key === key)!.getRange();
    setActivePreset(key);
    setDateRange({ from: r.from, to: r.to });
  };

  const exportCSV = () => {
    const headers = ["Дата", "Тип", "Име", "Страница", "Сесия", "Продължителност (сек)", "Източник", "Препращач"];
    const rows = currentEvents.map(e => [
      format(new Date(e.created_at), "yyyy-MM-dd HH:mm:ss"),
      e.event_type, e.event_name, e.page_path || "", e.session_id, e.duration_seconds || "",
      e.referrer_source || "", e.referrer || ""
    ]);
    const csv = [headers.join(","), ...rows.map(r => r.map(v => `"${String(v).replace(/"/g, '""')}"`).join(","))].join("\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `analytics-${format(from!, "yyyy-MM-dd")}-${format(to || from!, "yyyy-MM-dd")}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const TrendIndicator = ({ current: c, previous }: { current: number; previous: number | null }) => {
    if (previous === null || previous === 0) return null;
    const pct = Math.round(((c - previous) / previous) * 100);
    if (pct === 0) return <span className="text-xs text-muted-foreground flex items-center gap-0.5"><Minus className="h-3 w-3" /> 0%</span>;
    return pct > 0
      ? <span className="text-xs text-green-600 flex items-center gap-0.5"><TrendingUp className="h-3 w-3" /> +{pct}%</span>
      : <span className="text-xs text-red-500 flex items-center gap-0.5"><TrendingDown className="h-3 w-3" /> {pct}%</span>;
  };

  const dateLabel = from && to
    ? `${format(from, "d MMM yyyy", { locale: bg })} — ${format(to, "d MMM yyyy", { locale: bg })}`
    : "Изберете период";

  const KpiCard = ({ icon: Icon, label, value, suffix, color, trend }: {
    icon: any; label: string; value: number | string; suffix?: string; color?: string; trend?: number | null;
  }) => (
    <Card className="border-border/50 shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="pb-1">
        <CardTitle className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
          <Icon className={`h-3.5 w-3.5 ${color || "text-primary"}`} /> {label}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-bold">
          {value}
          {suffix && <span className="text-sm font-normal text-muted-foreground ml-1">{suffix}</span>}
        </p>
        {trend !== undefined && trend !== null && <TrendIndicator current={Number(value)} previous={trend} />}
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">PRO Dashboard</h1>
          <p className="text-sm text-muted-foreground">Маркетинг, лидове и продажби</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {presets.map(p => (
            <Button key={p.key} variant={activePreset === p.key ? "default" : "outline"} size="sm" onClick={() => handlePreset(p.key)}>
              {p.label}
            </Button>
          ))}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant={activePreset === "custom" ? "default" : "outline"} size="sm">
                <CalendarIcon className="h-4 w-4 mr-1" /> Период
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar mode="range" selected={dateRange} onSelect={(range) => { setDateRange(range); setActivePreset("custom"); }} numberOfMonths={2} locale={bg} className="p-3 pointer-events-auto" />
            </PopoverContent>
          </Popover>
          <Button variant={filterBots ? "default" : "outline"} size="sm" onClick={() => setFilterBots(!filterBots)}>
            <ShieldCheck className="h-4 w-4 mr-1" /> {filterBots ? "Реални" : "Всички"}
          </Button>
          <Button variant="outline" size="sm" onClick={() => setCompareEnabled(!compareEnabled)}>
            <ArrowUpDown className="h-4 w-4 mr-1" /> {compareEnabled ? "Без сравнение" : "Сравнение"}
          </Button>
          <Button variant="outline" size="sm" onClick={exportCSV}>
            <Download className="h-4 w-4 mr-1" /> CSV
          </Button>
        </div>
      </div>

      <div className="text-sm text-muted-foreground">
        <span className="font-medium text-foreground">{dateLabel}</span>
        {compareEnabled && compRange && (
          <span className="ml-3">vs {format(compRange.from, "d MMM yyyy", { locale: bg })} — {format(compRange.to, "d MMM yyyy", { locale: bg })}</span>
        )}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <>
          {/* Alerts */}
          {alerts.length > 0 && (
            <div className="space-y-2">
              {alerts.map((a, i) => (
                <Alert key={i} variant={a.type === "error" ? "destructive" : "default"} className={a.type === "warning" ? "border-yellow-500/50 bg-yellow-50 dark:bg-yellow-950/20" : ""}>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>{a.title}</AlertTitle>
                  <AlertDescription>{a.message}</AlertDescription>
                </Alert>
              ))}
            </div>
          )}

          {/* KPI Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <KpiCard icon={Users} label="Посетители" value={current.visitors} trend={compare?.visitors ?? null} />
            <KpiCard icon={Target} label="Лидове" value={current.leads} color="text-amber-500" trend={compare?.leads ?? null} />
            <KpiCard icon={Percent} label="Conversion Rate" value={`${current.conversionRate}%`} color="text-emerald-500" />
            <KpiCard icon={Phone} label="Обаждания" value={current.calls} color="text-green-500" trend={compare?.calls ?? null} />
            <KpiCard icon={Calculator} label="Калкулатор старт" value={current.calcStarts || current.calculator} color="text-blue-500" />
            <KpiCard icon={CheckCircle2} label="Калк. завършен %" value={`${current.calcCompletionRate}%`} color="text-purple-500" />
            <KpiCard icon={Clock} label="Ср. време" value={current.avgDuration} suffix="мин" trend={compare?.avgDuration ?? null} />
            {botCount > 0 && <KpiCard icon={Bot} label="Ботове (филтр.)" value={botCount} color="text-destructive" />}
          </div>

          {/* Tabs */}
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">Общо</TabsTrigger>
              <TabsTrigger value="funnel">Фуния</TabsTrigger>
              <TabsTrigger value="calculator">Калкулатор</TabsTrigger>
              <TabsTrigger value="traffic">Трафик</TabsTrigger>
              <TabsTrigger value="calls">Обаждания</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-4">
              <Card>
                <CardHeader><CardTitle className="text-sm">Дневна активност</CardTitle></CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                        <XAxis dataKey="date" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }} />
                        <YAxis tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }} />
                        <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }} />
                        <Bar dataKey="visitors" name="Посетители" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="leads" name="Оферти" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="calls" name="Обаждания" fill="#22c55e" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <div className="grid md:grid-cols-2 gap-4">
                {/* Top Pages */}
                <Card>
                  <CardHeader><CardTitle className="text-sm">Топ страници</CardTitle></CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {topPages.map((p, i) => (
                        <div key={p.path} className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground truncate max-w-[200px]">{i + 1}. <span className="text-foreground">{p.path}</span></span>
                          <span className="font-medium">{p.views}</span>
                        </div>
                      ))}
                      {topPages.length === 0 && <p className="text-sm text-muted-foreground">Няма данни</p>}
                    </div>
                  </CardContent>
                </Card>

                {/* Conversions */}
                {current.visitors > 0 && (
                  <Card>
                    <CardHeader><CardTitle className="text-sm">Конверсии</CardTitle></CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div>
                          <p className="text-2xl font-bold">{current.conversionRate}%</p>
                          <p className="text-xs text-muted-foreground">Лидове / Посетители</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold">{((current.calls / current.visitors) * 100).toFixed(1)}%</p>
                          <p className="text-xs text-muted-foreground">Обаждания / Посетители</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold">{(((current.leads + current.calls) / current.visitors) * 100).toFixed(1)}%</p>
                          <p className="text-xs text-muted-foreground">Общо конверсия</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold">{current.calcCompletionRate}%</p>
                          <p className="text-xs text-muted-foreground">Завършване калкулатор</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>

            {/* Funnel Tab */}
            <TabsContent value="funnel" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm flex items-center gap-2">
                    <BarChart3 className="h-4 w-4 text-primary" /> Фуния на конверсия
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {funnelData.map((step, i) => (
                      <div key={step.name} className="space-y-1">
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-medium">{step.name}</span>
                          <div className="flex items-center gap-3">
                            <span className="font-bold text-lg">{step.value}</span>
                            <span className="text-xs text-muted-foreground">{step.pct}%</span>
                            {i > 0 && step.dropOff > 0 && (
                              <span className="text-xs text-red-500 flex items-center gap-0.5">
                                <TrendingDown className="h-3 w-3" /> -{step.dropOff}%
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="w-full bg-muted rounded-full h-6 overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{ width: `${Math.max(step.pct, 2)}%`, backgroundColor: step.fill }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {funnelData[0].value > 0 && (
                    <div className="mt-6 p-4 rounded-lg bg-muted/50 border border-border/50">
                      <h4 className="text-sm font-semibold mb-2">Drop-off анализ</h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                        {funnelData.slice(1).map(step => (
                          <div key={step.name} className="text-center">
                            <p className={`text-lg font-bold ${step.dropOff > 70 ? "text-red-500" : step.dropOff > 50 ? "text-amber-500" : "text-green-500"}`}>
                              {step.dropOff}%
                            </p>
                            <p className="text-xs text-muted-foreground">загуба преди {step.name}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Calculator Tab */}
            <TabsContent value="calculator" className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2"><CardTitle className="text-xs text-muted-foreground">Започнали</CardTitle></CardHeader>
                  <CardContent><p className="text-3xl font-bold">{calcAnalytics.starts || current.calculator}</p></CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2"><CardTitle className="text-xs text-muted-foreground">Завършили</CardTitle></CardHeader>
                  <CardContent><p className="text-3xl font-bold">{calcAnalytics.completes}</p></CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2"><CardTitle className="text-xs text-muted-foreground">Completion Rate</CardTitle></CardHeader>
                  <CardContent>
                    <p className={`text-3xl font-bold ${current.calcCompletionRate < 30 ? "text-red-500" : current.calcCompletionRate < 60 ? "text-amber-500" : "text-green-500"}`}>
                      {current.calcCompletionRate}%
                    </p>
                  </CardContent>
                </Card>
              </div>
              <Card>
                <CardHeader><CardTitle className="text-sm">Стъпки в калкулатора</CardTitle></CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Регистрирани {calcAnalytics.steps} преминавания между стъпки.
                    {calcAnalytics.starts > 0 && calcAnalytics.completes === 0 && (
                      <span className="text-amber-500 ml-2">⚠ Никой не е завършил калкулатора в този период.</span>
                    )}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Данните за най-избрани тип покрив, материал и проблем ще се натрупат с времето чрез новите analytics events.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Traffic Tab */}
            <TabsContent value="traffic" className="space-y-4">
              {trafficSources.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Globe className="h-4 w-4 text-primary" /> Трафик по източници (с лидове)
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[250px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={trafficSources} layout="vertical" margin={{ top: 0, right: 40, left: 0, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" horizontal={false} className="stroke-border" />
                          <XAxis type="number" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }} allowDecimals={false} />
                          <YAxis type="category" dataKey="label" width={140} tick={{ fill: 'hsl(var(--foreground))', fontSize: 12 }} />
                          <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }} />
                          <Bar dataKey="sessions" name="Сесии" radius={[0, 4, 4, 0]} maxBarSize={28}>
                            {trafficSources.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>

                    {/* Table with leads */}
                    <div className="mt-4 border-t border-border pt-4">
                      <div className="grid grid-cols-4 text-xs font-semibold text-muted-foreground mb-2 px-2">
                        <span>Източник</span><span className="text-right">Сесии</span><span className="text-right">Лидове</span><span className="text-right">Conv. %</span>
                      </div>
                      {trafficSources.map(s => (
                        <div key={s.source} className="grid grid-cols-4 text-sm px-2 py-1.5 hover:bg-muted/50 rounded">
                          <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: s.color }} />
                            <span>{s.label}</span>
                          </div>
                          <span className="text-right font-medium">{s.sessions}</span>
                          <span className="text-right font-bold text-amber-600">{s.leads}</span>
                          <span className="text-right">{s.sessions > 0 ? ((s.leads / s.sessions) * 100).toFixed(1) : 0}%</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Conversions by source */}
              {rangeInquiries.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Globe className="h-4 w-4 text-primary" /> Запитвания по източник
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {trafficSources.filter(s => s.leads > 0).map(s => (
                        <div key={s.source} className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: s.color }} />
                            <span>{s.label}</span>
                          </div>
                          <span className="font-bold">{s.leads}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Calls Tab */}
            <TabsContent value="calls" className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm flex items-center gap-2">
                      <PhoneCall className="h-4 w-4 text-green-500" /> Обаждания по страница
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {callsByPage.length > 0 ? (
                      <div className="space-y-2">
                        {callsByPage.map((p, i) => (
                          <div key={p.path} className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground truncate max-w-[250px]">{i + 1}. <span className="text-foreground">{p.path}</span></span>
                            <span className="font-bold">{p.count}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">Няма данни за обаждания</p>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Globe className="h-4 w-4 text-primary" /> Обаждания по източник
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {callsBySource.length > 0 ? (
                      <div className="space-y-2">
                        {callsBySource.map(s => (
                          <div key={s.source} className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2">
                              <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: s.color }} />
                              <span>{s.label}</span>
                            </div>
                            <span className="font-bold">{s.count}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">Няма данни за обаждания</p>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  );
};

export default AnalyticsPage;
