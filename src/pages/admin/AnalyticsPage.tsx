import { useEffect, useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { supabase } from "@/integrations/supabase/client";
import { Users, Clock, MousePointer, Phone, Calculator, Loader2, CalendarIcon, Download, ArrowUpDown, TrendingUp, TrendingDown, Minus, Globe, Bot, ShieldCheck } from "lucide-react";
import { format, startOfDay, startOfWeek, startOfMonth, startOfYear, endOfDay, endOfWeek, endOfMonth, endOfYear } from "date-fns";
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
  organic:  { label: "Органично търсене", color: "hsl(var(--primary))" },
  direct:   { label: "Директен достъп",   color: "hsl(var(--muted-foreground))" },
  referral: { label: "Препращане",         color: "#f59e0b" },
  social:   { label: "Социални мрежи",     color: "#8b5cf6" },
  email:    { label: "Имейл",              color: "#06b6d4" },
  unknown:  { label: "Непознат",           color: "hsl(var(--border))" },
};

const AnalyticsPage = () => {
  const [activePreset, setActivePreset] = useState<PresetKey>("this_month");
  const [dateRange, setDateRange] = useState<DateRange | undefined>(() => {
    const p = presets.find(p => p.key === "this_month")!;
    const r = p.getRange();
    return { from: r.from, to: r.to };
  });
  const [compareEnabled, setCompareEnabled] = useState(false);
  const [filterBots, setFilterBots] = useState(true);
  const [events, setEvents] = useState<any[]>([]);
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const from = dateRange?.from;
  const to = dateRange?.to;

  // Comparison range (same duration, immediately before)
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

  // Conversions by source
  const conversionsBySource = useMemo(() => {
    if (!from || !to) return [];
    const rangeInquiries = inquiries.filter(inq => {
      const d = new Date(inq.created_at);
      return d >= from && d <= endOfDay(to);
    });
    const counts: Record<string, number> = {};
    for (const inq of rangeInquiries) {
      const src = inq.referrer_source || "direct";
      counts[src] = (counts[src] || 0) + 1;
    }
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .map(([source, count]) => ({
        source,
        count,
        label: SOURCE_CONFIG[source]?.label ?? source,
        color: SOURCE_CONFIG[source]?.color ?? "hsl(var(--border))",
      }));
  }, [inquiries, from, to]);

  const calcStats = (rows: any[]) => {
    const visitors = new Set(rows.filter(r => r.event_type === "page_view").map(r => r.session_id)).size;
    const durations = rows.filter(r => r.event_type === "session_duration" && r.duration_seconds);
    const avgDuration = durations.length > 0
      ? Math.round(durations.reduce((s, r) => s + r.duration_seconds, 0) / durations.length / 60 * 10) / 10
      : 0;
    const btnCount = (name: string) => rows.filter(r => r.event_type === "button_click" && r.event_name === name).length;
    return { visitors, avgDuration, offers: btnCount("offer_button"), calls: btnCount("call_button"), calculator: btnCount("calculator_button") };
  };

  const current = calcStats(currentEvents);
  const compare = compareEnabled ? calcStats(compareEvents) : null;

  // Daily chart data
  const chartData = useMemo(() => {
    if (!from || !to) return [];
    const days: Date[] = [];
    const d = new Date(from);
    while (d <= to) {
      days.push(new Date(d));
      d.setDate(d.getDate() + 1);
    }
    return days.map(day => {
      const dayStart = startOfDay(day);
      const dayEnd = endOfDay(day);
      const dayEvents = currentEvents.filter(e => {
        const d = new Date(e.created_at);
        return d >= dayStart && d <= dayEnd;
      });
      const visitors = new Set(dayEvents.filter(e => e.event_type === "page_view").map(e => e.session_id)).size;
      const leads = dayEvents.filter(e => e.event_type === "button_click" && e.event_name === "offer_button").length;
      const calls = dayEvents.filter(e => e.event_type === "button_click" && e.event_name === "call_button").length;
      return { date: format(day, "dd MMM", { locale: bg }), visitors, leads, calls };
    });
  }, [currentEvents, from, to]);

  // Top pages
  const topPages = useMemo(() => {
    const counts: Record<string, number> = {};
    currentEvents.filter(e => e.event_type === "page_view" && e.page_path).forEach(e => {
      counts[e.page_path] = (counts[e.page_path] || 0) + 1;
    });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 10).map(([path, views]) => ({ path, views }));
  }, [currentEvents]);

  // Traffic sources — first-touch attribution per session
  const trafficSources = useMemo(() => {
    const pageViews = currentEvents.filter(e => e.event_type === "page_view");
    // Build first-touch source per session (earliest event wins)
    const sessionSource: Record<string, string> = {};
    const sorted = [...pageViews].sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
    for (const e of sorted) {
      if (!sessionSource[e.session_id]) {
        sessionSource[e.session_id] = e.referrer_source || "unknown";
      }
    }
    // Count sessions per source
    const counts: Record<string, number> = {};
    for (const src of Object.values(sessionSource)) {
      counts[src] = (counts[src] || 0) + 1;
    }
    const total = Object.values(counts).reduce((s, v) => s + v, 0);
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .map(([source, sessions]) => ({
        source,
        sessions,
        pct: total > 0 ? Math.round((sessions / total) * 100) : 0,
        label: SOURCE_CONFIG[source]?.label ?? source,
        color: SOURCE_CONFIG[source]?.color ?? "hsl(var(--border))",
      }));
  }, [currentEvents]);

  const handlePreset = (key: PresetKey) => {
    const p = presets.find(p => p.key === key)!;
    const r = p.getRange();
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

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-foreground">Аналитика</h1>
        <div className="flex items-center gap-2 flex-wrap">
          {presets.map(p => (
            <Button
              key={p.key}
              variant={activePreset === p.key ? "default" : "outline"}
              size="sm"
              onClick={() => handlePreset(p.key)}
            >
              {p.label}
            </Button>
          ))}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant={activePreset === "custom" ? "default" : "outline"} size="sm">
                <CalendarIcon className="h-4 w-4 mr-1" />
                Период
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                mode="range"
                selected={dateRange}
                onSelect={(range) => {
                  setDateRange(range);
                  setActivePreset("custom");
                }}
                numberOfMonths={2}
                locale={bg}
                className="p-3 pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
          <Button variant="outline" size="sm" onClick={() => setCompareEnabled(!compareEnabled)}>
            <ArrowUpDown className="h-4 w-4 mr-1" />
            {compareEnabled ? "Без сравнение" : "Сравнение"}
          </Button>
          <Button variant="outline" size="sm" onClick={exportCSV}>
            <Download className="h-4 w-4 mr-1" />
            CSV
          </Button>
        </div>
      </div>

      {/* Date range display */}
      <div className="text-sm text-muted-foreground">
        <span className="font-medium text-foreground">{dateLabel}</span>
        {compareEnabled && compRange && (
          <span className="ml-3">
            vs {format(compRange.from, "d MMM yyyy", { locale: bg })} — {format(compRange.to, "d MMM yyyy", { locale: bg })}
          </span>
        )}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <>
          {/* KPI Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <Card>
              <CardHeader className="pb-1">
                <CardTitle className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
                  <Users className="h-3.5 w-3.5 text-primary" /> Посетители
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{current.visitors}</p>
                <TrendIndicator current={current.visitors} previous={compare?.visitors ?? null} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-1">
                <CardTitle className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-primary" /> Ср. време
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{current.avgDuration}<span className="text-sm font-normal text-muted-foreground ml-1">мин</span></p>
                <TrendIndicator current={current.avgDuration} previous={compare?.avgDuration ?? null} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-1">
                <CardTitle className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
                  <MousePointer className="h-3.5 w-3.5 text-accent" /> Оферти
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{current.offers}</p>
                <TrendIndicator current={current.offers} previous={compare?.offers ?? null} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-1">
                <CardTitle className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
                  <Phone className="h-3.5 w-3.5 text-green-500" /> Обаждания
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{current.calls}</p>
                <TrendIndicator current={current.calls} previous={compare?.calls ?? null} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-1">
                <CardTitle className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
                  <Calculator className="h-3.5 w-3.5 text-blue-500" /> Калкулатор
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{current.calculator}</p>
                <TrendIndicator current={current.calculator} previous={compare?.calculator ?? null} />
              </CardContent>
            </Card>
          </div>

          {/* Daily activity chart */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Дневна активност</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                    <XAxis dataKey="date" className="text-xs" tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                    <YAxis className="text-xs" tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                    <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }} />
                    <Bar dataKey="visitors" name="Посетители" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="leads" name="Оферти" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="calls" name="Обаждания" fill="#22c55e" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Traffic Sources */}
          {trafficSources.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  <Globe className="h-4 w-4 text-primary" />
                  Трафик по източници
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[220px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={trafficSources}
                      layout="vertical"
                      margin={{ top: 0, right: 40, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} className="stroke-border" />
                      <XAxis
                        type="number"
                        tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
                        allowDecimals={false}
                      />
                      <YAxis
                        type="category"
                        dataKey="label"
                        width={130}
                        tick={{ fill: 'hsl(var(--foreground))', fontSize: 12 }}
                      />
                      <Tooltip
                        contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }}
                        formatter={(value: number, _name: string, entry: any) => [
                          `${value} сесии (${entry.payload.pct}%)`,
                          entry.payload.label,
                        ]}
                      />
                      <Bar dataKey="sessions" radius={[0, 4, 4, 0]} maxBarSize={28}>
                        {trafficSources.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                {/* Legend row */}
                <div className="flex flex-wrap gap-x-5 gap-y-2 mt-3 pt-3 border-t border-border">
                  {trafficSources.map(s => (
                    <div key={s.source} className="flex items-center gap-1.5 text-xs">
                      <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: s.color }} />
                      <span className="text-muted-foreground">{s.label}</span>
                      <span className="font-semibold text-foreground">{s.sessions}</span>
                      <span className="text-muted-foreground">({s.pct}%)</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Top Pages */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Топ страници</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {topPages.map((p, i) => (
                  <div key={p.path} className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{i + 1}. <span className="text-foreground">{p.path}</span></span>
                    <span className="font-medium">{p.views}</span>
                  </div>
                ))}
                {topPages.length === 0 && <p className="text-sm text-muted-foreground">Няма данни за периода</p>}
              </div>
            </CardContent>
          </Card>

          {/* Conversion rate */}
          {current.visitors > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Конверсии</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold">{((current.offers / current.visitors) * 100).toFixed(1)}%</p>
                    <p className="text-xs text-muted-foreground">Оферти / Посетители</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{((current.calls / current.visitors) * 100).toFixed(1)}%</p>
                    <p className="text-xs text-muted-foreground">Обаждания / Посетители</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{(((current.offers + current.calls) / current.visitors) * 100).toFixed(1)}%</p>
                    <p className="text-xs text-muted-foreground">Общо конверсия</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  );
};

export default AnalyticsPage;
