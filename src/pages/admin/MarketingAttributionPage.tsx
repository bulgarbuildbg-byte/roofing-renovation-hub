import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Loader2, Megaphone, TrendingUp, Phone, Inbox, Percent } from "lucide-react";
import { format, subDays, startOfDay, endOfDay, eachDayOfInterval } from "date-fns";
import { bg } from "date-fns/locale";
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, Legend,
  BarChart, Bar, Cell,
} from "recharts";
import { ALL_CHANNELS, CHANNEL_LABELS, CHANNEL_COLORS, type Channel } from "@/lib/attribution";

type Row = { created_at: string; session_id: string; channel: string | null; utm_source: string | null; utm_campaign: string | null; utm_medium: string | null };
type Inq = Row & { id: string };
type Call = Row & { id: string; source: string | null; client_phone: string };

const rangeOptions = [
  { key: 7,  label: "7 дни"  },
  { key: 30, label: "30 дни" },
  { key: 90, label: "90 дни" },
];

const channelKey = (c: string | null): Channel => (ALL_CHANNELS as string[]).includes(c || "") ? (c as Channel) : "direct";

const MarketingAttributionPage = () => {
  const [days, setDays] = useState(30);
  const [channelFilter, setChannelFilter] = useState<Channel | "all" | "paid">("all");
  const [events, setEvents] = useState<Row[]>([]);
  const [inquiries, setInquiries] = useState<Inq[]>([]);
  const [calls, setCalls] = useState<Call[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const from = startOfDay(subDays(new Date(), days - 1)).toISOString();
      const to = endOfDay(new Date()).toISOString();
      const [{ data: ev }, { data: inq }, { data: cl }] = await Promise.all([
        supabase.from("analytics_events" as any)
          .select("created_at, session_id, channel, utm_source, utm_campaign, utm_medium")
          .eq("event_type", "page_view").eq("is_bot", false)
          .gte("created_at", from).lte("created_at", to).limit(50000),
        supabase.from("inquiries" as any)
          .select("id, created_at, session_id, channel, utm_source, utm_campaign, utm_medium")
          .gte("created_at", from).lte("created_at", to),
        supabase.from("call_log" as any)
          .select("id, created_at, session_id, channel, utm_source, utm_campaign, utm_medium, source, client_phone")
          .gte("created_at", from).lte("created_at", to),
      ]);
      setEvents((ev || []) as any); setInquiries((inq || []) as any); setCalls((cl || []) as any);
      setLoading(false);
    };
    load();
  }, [days]);

  // Only "web" calls that carry attribution show in charts; manual admin-entered
  // calls are excluded from channel attribution but still counted in the total below.
  const attributedCalls = useMemo(() => calls.filter(c => c.channel), [calls]);

  const matchFilter = (c: Channel) => {
    if (channelFilter === "all") return true;
    if (channelFilter === "paid") return c === "google_ads" || c === "meta_ads" || c === "tiktok_ads" || c === "paid_other";
    return c === channelFilter;
  };

  // Sessions grouped by first-touch channel (one row per session, latest wins)
  const sessionsByChannel = useMemo(() => {
    const first: Record<string, Channel> = {};
    const sorted = [...events].sort((a, b) => +new Date(a.created_at) - +new Date(b.created_at));
    for (const e of sorted) if (!first[e.session_id]) first[e.session_id] = channelKey(e.channel);
    const acc: Record<Channel, number> = Object.fromEntries(ALL_CHANNELS.map(c => [c, 0])) as any;
    for (const c of Object.values(first)) acc[c] += 1;
    return { first, totals: acc };
  }, [events]);

  const channelTable = useMemo(() => {
    const inqByCh: Record<Channel, number> = Object.fromEntries(ALL_CHANNELS.map(c => [c, 0])) as any;
    const callByCh: Record<Channel, number> = Object.fromEntries(ALL_CHANNELS.map(c => [c, 0])) as any;
    for (const i of inquiries) inqByCh[channelKey(i.channel)] += 1;
    for (const c of attributedCalls) callByCh[channelKey(c.channel)] += 1;
    return ALL_CHANNELS.filter(matchFilter).map(ch => {
      const sessions = sessionsByChannel.totals[ch];
      const leads = inqByCh[ch] + callByCh[ch];
      const conv = sessions > 0 ? +(leads / sessions * 100).toFixed(2) : 0;
      return { channel: ch, sessions, inquiries: inqByCh[ch], calls: callByCh[ch], leads, conversion: conv };
    }).sort((a, b) => b.sessions - a.sessions);
  }, [sessionsByChannel, inquiries, attributedCalls, channelFilter]);

  // Stacked history per day per channel
  const history = useMemo(() => {
    const dayList = eachDayOfInterval({ start: startOfDay(subDays(new Date(), days - 1)), end: endOfDay(new Date()) });
    // Build per-day session-first-touch map
    const perDay: Record<string, Record<Channel, Set<string>>> = {};
    for (const d of dayList) {
      const k = format(d, "yyyy-MM-dd");
      perDay[k] = Object.fromEntries(ALL_CHANNELS.map(c => [c, new Set()])) as any;
    }
    // sort by time and take first event per session per day
    const sorted = [...events].sort((a, b) => +new Date(a.created_at) - +new Date(b.created_at));
    const seenSessionsDay: Record<string, string> = {}; // sessionId+day -> ch
    for (const e of sorted) {
      const day = format(new Date(e.created_at), "yyyy-MM-dd");
      const key = e.session_id + "|" + day;
      if (seenSessionsDay[key]) continue;
      const ch = channelKey(e.channel);
      seenSessionsDay[key] = ch;
      if (perDay[day]) perDay[day][ch].add(e.session_id);
    }
    return dayList.map(d => {
      const k = format(d, "yyyy-MM-dd");
      const row: any = { date: format(d, "dd MMM", { locale: bg }) };
      for (const ch of ALL_CHANNELS) row[ch] = perDay[k][ch].size;
      return row;
    });
  }, [events, days]);



  const campaignTable = useMemo(() => {
    const key = (r: Row) => `${channelKey(r.channel)}|${r.utm_source || "-"}|${r.utm_campaign || "-"}`;
    type Cell = { channel: Channel; source: string; campaign: string; sessions: Set<string>; inquiries: number; calls: number };
    const map: Record<string, Cell> = {};
    for (const e of events) {
      const k = key(e); if (!map[k]) map[k] = { channel: channelKey(e.channel), source: e.utm_source || "-", campaign: e.utm_campaign || "-", sessions: new Set(), inquiries: 0, calls: 0 };
      map[k].sessions.add(e.session_id);
    }
    for (const i of inquiries) { const k = key(i); if (!map[k]) map[k] = { channel: channelKey(i.channel), source: i.utm_source || "-", campaign: i.utm_campaign || "-", sessions: new Set(), inquiries: 0, calls: 0 }; map[k].inquiries += 1; }
    for (const c of attributedCalls) { const k = key(c); if (!map[k]) map[k] = { channel: channelKey(c.channel), source: c.utm_source || "-", campaign: c.utm_campaign || "-", sessions: new Set(), inquiries: 0, calls: 0 }; map[k].calls += 1; }
    return Object.values(map)
      .filter(r => matchFilter(r.channel))
      .map(r => {
        const sessions = r.sessions.size;
        const leads = r.inquiries + r.calls;
        return { ...r, sessions, leads, conversion: sessions > 0 ? +(leads / sessions * 100).toFixed(2) : 0 };
      })
      .sort((a, b) => b.leads - a.leads || b.sessions - a.sessions);
  }, [events, inquiries, attributedCalls, channelFilter]);

  const totals = useMemo(() => {
    const sessions = Object.values(sessionsByChannel.totals).reduce((s, v) => s + v, 0);
    const leads = inquiries.length + attributedCalls.length;
    const paidLeads = channelTable.filter(r => ["google_ads", "meta_ads", "tiktok_ads", "paid_other"].includes(r.channel)).reduce((s, r) => s + r.leads, 0);
    const conv = sessions > 0 ? +(leads / sessions * 100).toFixed(2) : 0;
    return { sessions, leads, paidLeads, conv, calls: attributedCalls.length, inquiries: inquiries.length };
  }, [sessionsByChannel, inquiries, attributedCalls, channelTable]);

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2 text-foreground">
            <Megaphone className="h-6 w-6 text-primary" />
            Маркетинг Атрибуция
          </h1>
          <p className="text-sm text-muted-foreground">
            Откъде идват посетителите, запитванията и обажданията — разграничавайки платена реклама (Google Ads, Meta, TikTok) от органичен трафик.
          </p>
        </div>
        <div className="flex gap-2 flex-wrap">
          {rangeOptions.map(o => (
            <button key={o.key} onClick={() => setDays(o.key)}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold border transition-colors ${days === o.key ? "bg-primary text-primary-foreground border-primary shadow-sm" : "bg-card text-foreground border-border hover:bg-accent hover:text-accent-foreground"}`}>
              {o.label}
            </button>
          ))}
        </div>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <KpiCard icon={TrendingUp} label="Сесии" value={totals.sessions} color="hsl(215 80% 55%)" />
        <KpiCard icon={Inbox} label="Запитвания" value={totals.inquiries} color="#f59e0b" />
        <KpiCard icon={Phone} label="Обаждания (web)" value={totals.calls} color="#22c55e" />
        <KpiCard icon={Megaphone} label="Лидове от реклама" value={totals.paidLeads} color="#ff0050" />
        <KpiCard icon={Percent} label="Конверсия" value={`${totals.conv}%`} color="#8b5cf6" />
      </div>

      {loading && <div className="flex items-center gap-2 text-sm text-muted-foreground"><Loader2 className="h-4 w-4 animate-spin" /> Зарежда...</div>}

      {/* Filter chips */}
      <div className="flex flex-wrap gap-2">
        {(["all", "paid", ...ALL_CHANNELS] as const).map(ch => {
          const label = ch === "all" ? "Всички" : ch === "paid" ? "Само платена реклама" : CHANNEL_LABELS[ch];
          const active = channelFilter === ch;
          return (
            <button key={ch} onClick={() => setChannelFilter(ch)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${active ? "bg-primary text-primary-foreground border-primary shadow-sm" : "bg-card text-foreground border-border hover:bg-accent hover:text-accent-foreground"}`}>
              {label}
            </button>
          );
        })}
      </div>

      {/* Historical stacked area */}
      <Card>
        <CardHeader><CardTitle>Трафик по канал (история)</CardTitle></CardHeader>
        <CardContent style={{ height: 340 }}>
          <ResponsiveContainer>
            <AreaChart data={history} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="date" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              {ALL_CHANNELS.filter(matchFilter).map(ch => (
                <Area key={ch} type="monotone" dataKey={ch} stackId="1"
                  stroke={CHANNEL_COLORS[ch]} fill={CHANNEL_COLORS[ch]} name={CHANNEL_LABELS[ch]} fillOpacity={0.65} />
              ))}
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Channel table */}
      <Card>
        <CardHeader><CardTitle>Резултати по канал</CardTitle></CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-muted-foreground border-b border-border">
                  <th className="py-2 pr-4">Канал</th>
                  <th className="py-2 pr-4 text-right">Сесии</th>
                  <th className="py-2 pr-4 text-right">Запитвания</th>
                  <th className="py-2 pr-4 text-right">Обаждания</th>
                  <th className="py-2 pr-4 text-right">Общо лидове</th>
                  <th className="py-2 pr-4 text-right">Конверсия</th>
                </tr>
              </thead>
              <tbody>
                {channelTable.map(r => (
                  <tr key={r.channel} className="border-b border-border/50">
                    <td className="py-2 pr-4">
                      <div className="flex items-center gap-2">
                        <span className="inline-block w-2.5 h-2.5 rounded-full" style={{ background: CHANNEL_COLORS[r.channel] }} />
                        <span className="font-medium text-foreground">{CHANNEL_LABELS[r.channel]}</span>
                      </div>
                    </td>
                    <td className="py-2 pr-4 text-right">{r.sessions}</td>
                    <td className="py-2 pr-4 text-right">{r.inquiries}</td>
                    <td className="py-2 pr-4 text-right">{r.calls}</td>
                    <td className="py-2 pr-4 text-right font-semibold">{r.leads}</td>
                    <td className="py-2 pr-4 text-right">
                      <Badge variant={r.conversion >= 3 ? "default" : r.conversion >= 1 ? "secondary" : "outline"}>{r.conversion}%</Badge>
                    </td>
                  </tr>
                ))}
                {channelTable.length === 0 && <tr><td colSpan={6} className="py-6 text-center text-muted-foreground">Няма данни за избрания филтър.</td></tr>}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Campaign breakdown */}
      <Card>
        <CardHeader><CardTitle>Кампании (UTM source / campaign)</CardTitle></CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-muted-foreground border-b border-border">
                  <th className="py-2 pr-4">Канал</th>
                  <th className="py-2 pr-4">Източник</th>
                  <th className="py-2 pr-4">Кампания</th>
                  <th className="py-2 pr-4 text-right">Сесии</th>
                  <th className="py-2 pr-4 text-right">Лидове</th>
                  <th className="py-2 pr-4 text-right">Конв.</th>
                </tr>
              </thead>
              <tbody>
                {campaignTable.slice(0, 40).map((r, i) => (
                  <tr key={i} className="border-b border-border/50">
                    <td className="py-2 pr-4">
                      <span className="inline-flex items-center gap-1.5 text-xs">
                        <span className="inline-block w-2 h-2 rounded-full" style={{ background: CHANNEL_COLORS[r.channel] }} />
                        {CHANNEL_LABELS[r.channel]}
                      </span>
                    </td>
                    <td className="py-2 pr-4 text-muted-foreground">{r.source}</td>
                    <td className="py-2 pr-4 text-foreground font-medium">{r.campaign}</td>
                    <td className="py-2 pr-4 text-right">{r.sessions}</td>
                    <td className="py-2 pr-4 text-right font-semibold">{r.leads}</td>
                    <td className="py-2 pr-4 text-right">{r.conversion}%</td>
                  </tr>
                ))}
                {campaignTable.length === 0 && <tr><td colSpan={6} className="py-6 text-center text-muted-foreground">Няма данни. Добавете UTM параметри към рекламите си: <code className="text-xs">?utm_source=facebook&utm_medium=paid&utm_campaign=proleten_promo</code></td></tr>}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Leads-per-channel bar */}
      <Card>
        <CardHeader><CardTitle>Лидове по канал</CardTitle></CardHeader>
        <CardContent style={{ height: 260 }}>
          <ResponsiveContainer>
            <BarChart data={channelTable} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="channel" tickFormatter={(v) => CHANNEL_LABELS[v as Channel] || v} tick={{ fontSize: 10 }} interval={0} angle={-15} textAnchor="end" height={60} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }} labelFormatter={(v) => CHANNEL_LABELS[v as Channel] || String(v)} />
              <Bar dataKey="leads" name="Лидове">
                {channelTable.map(r => <Cell key={r.channel} fill={CHANNEL_COLORS[r.channel]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <p className="text-xs text-muted-foreground">
        <strong>Как да проследите реклами:</strong> добавете UTM параметри към всеки рекламен линк.
        Пример за Facebook: <code>?utm_source=facebook&amp;utm_medium=paid&amp;utm_campaign=promo_janury</code>.
        Google Ads автоматично добавя <code>gclid</code>. Meta Ads — <code>fbclid</code>. TikTok — <code>ttclid</code>. Атрибуцията се пази 90 дни за връщащи се посетители.
      </p>
    </div>
  );
};

const KpiCard = ({ icon: Icon, label, value, color }: { icon: any; label: string; value: number | string; color: string }) => (
  <Card>
    <CardContent className="p-4">
      <div className="flex items-center gap-2 mb-1"><Icon className="h-4 w-4" style={{ color }} /><span className="text-xs text-muted-foreground">{label}</span></div>
      <p className="text-2xl font-bold" style={{ color }}>{value}</p>
    </CardContent>
  </Card>
);

export default MarketingAttributionPage;
