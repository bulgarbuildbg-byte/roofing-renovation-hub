import { useEffect, useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { supabase } from "@/integrations/supabase/client";
import { Users, Clock, MousePointer, Phone, Calculator, Loader2, CalendarIcon, Download, ArrowUpDown, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { format, startOfDay, startOfWeek, startOfMonth, startOfYear, endOfDay, endOfWeek, endOfMonth, endOfYear, subWeeks, subMonths, isWithinInterval, eachDayOfInterval, eachWeekOfInterval, eachMonthOfInterval, parseISO } from "date-fns";
import { bg } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from "recharts";
import type { DateRange } from "react-day-picker";

type PresetKey = "today" | "this_week" | "this_month" | "this_year" | "custom";

const presets: { key: PresetKey; label: string; getRange: () => { from: Date; to: Date } }[] = [
  { key: "today", label: "Днес", getRange: () => ({ from: startOfDay(new Date()), to: endOfDay(new Date()) }) },
  { key: "this_week", label: "Тази седмица", getRange: () => ({ from: startOfWeek(new Date(), { weekStartsOn: 1 }), to: endOfWeek(new Date(), { weekStartsOn: 1 }) }) },
  { key: "this_month", label: "Този месец", getRange: () => ({ from: startOfMonth(new Date()), to: endOfMonth(new Date()) }) },
  { key: "this_year", label: "Тази година", getRange: () => ({ from: startOfYear(new Date()), to: endOfYear(new Date()) }) },
];

const AnalyticsPage = () => {
  const [activePreset, setActivePreset] = useState<PresetKey>("this_month");
  const [dateRange, setDateRange] = useState<DateRange | undefined>(() => {
    const p = presets.find(p => p.key === "this_month")!;
    const r = p.getRange();
    return { from: r.from, to: r.to };
  });
  const [compareEnabled, setCompareEnabled] = useState(false);
  const [events, setEvents] = useState<any[]>([]);
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
    const { data } = await supabase
      .from("analytics_events")
      .select("event_type, event_name, session_id, duration_seconds, created_at, page_path")
      .gte("created_at", earliest.toISOString())
      .lte("created_at", endOfDay(latest).toISOString());
    setEvents(data || []);
    setLoading(false);
  };

  const filterByRange = (rows: any[], r: { from: Date; to: Date }) =>
    rows.filter(e => {
      const d = new Date(e.created_at);
      return d >= r.from && d <= endOfDay(r.to);
    });

  const currentEvents = useMemo(() => from && to ? filterByRange(events, { from, to }) : [], [events, from, to]);
  const compareEvents = useMemo(() => compRange ? filterByRange(events, compRange) : [], [events, compRange]);

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
    const days = eachDayOfInterval({ start: from, end: to });
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

  const handlePreset = (key: PresetKey) => {
    const p = presets.find(p => p.key === key)!;
    const r = p.getRange();
    setActivePreset(key);
    setDateRange({ from: r.from, to: r.to });
  };

  const exportCSV = () => {
    const headers = ["Дата", "Тип", "Име", "Страница", "Сесия", "Продължителност (сек)"];
    const rows = currentEvents.map(e => [
      format(new Date(e.created_at), "yyyy-MM-dd HH:mm:ss"),
      e.event_type, e.event_name, e.page_path || "", e.session_id, e.duration_seconds || ""
    ]);
    const csv = [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
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

          {/* Chart */}
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
                    <Legend />
                    <Bar dataKey="visitors" name="Посетители" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="leads" name="Оферти" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="calls" name="Обаждания" fill="#22c55e" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

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
