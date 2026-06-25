import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Smartphone, Tablet, Monitor } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from "recharts";

const DEVICES = ["mobile", "tablet", "desktop"] as const;
const COLORS: Record<string, string> = { mobile: "#06b6d4", tablet: "#8b5cf6", desktop: "#22c55e" };
const ICONS: Record<string, any> = { mobile: Smartphone, tablet: Tablet, desktop: Monitor };

const ago = (days: number) => {
  const d = new Date(); d.setDate(d.getDate() - days);
  return d.toISOString().slice(0, 10);
};

const DeviceAnalyticsPage = () => {
  const [from, setFrom] = useState(ago(30));
  const [to, setTo] = useState(new Date().toISOString().slice(0, 10));
  const [visits, setVisits] = useState<any[]>([]);
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const [{ data: v }, { data: i }] = await Promise.all([
        supabase
          .from("analytics_events" as any)
          .select("session_id,device_type,page_path,event_type,is_exit")
          .eq("event_type", "page_view")
          .eq("is_bot", false)
          .gte("created_at", `${from}T00:00:00`)
          .lte("created_at", `${to}T23:59:59`)
          .limit(20000),
        supabase
          .from("inquiries")
          .select("id,device_type,session_id,service_type")
          .gte("created_at", `${from}T00:00:00`)
          .lte("created_at", `${to}T23:59:59`),
      ]);
      setVisits((v || []) as any[]);
      setInquiries((i || []) as any[]);
      setLoading(false);
    };
    load();
  }, [from, to]);

  const stats = useMemo(() => {
    const sessions: Record<string, Set<string>> = { mobile: new Set(), tablet: new Set(), desktop: new Set() };
    const pageViewsByDevice: Record<string, Record<string, number>> = { mobile: {}, tablet: {}, desktop: {} };
    const exitsByDevice: Record<string, Record<string, number>> = { mobile: {}, tablet: {}, desktop: {} };

    for (const v of visits) {
      const d = (v.device_type || "desktop") as keyof typeof sessions;
      if (!sessions[d]) continue;
      sessions[d].add(v.session_id);
      pageViewsByDevice[d][v.page_path] = (pageViewsByDevice[d][v.page_path] || 0) + 1;
      if (v.is_exit && v.page_path) {
        exitsByDevice[d][v.page_path] = (exitsByDevice[d][v.page_path] || 0) + 1;
      }
    }

    const inquiriesByDevice: Record<string, number> = { mobile: 0, tablet: 0, desktop: 0 };
    const servicesByDevice: Record<string, Record<string, number>> = { mobile: {}, tablet: {}, desktop: {} };
    for (const i of inquiries) {
      const d = (i.device_type || "desktop") as string;
      if (inquiriesByDevice[d] === undefined) continue;
      inquiriesByDevice[d] += 1;
      if (i.service_type) servicesByDevice[d][i.service_type] = (servicesByDevice[d][i.service_type] || 0) + 1;
    }

    const totalSessions = DEVICES.reduce((acc, d) => acc + sessions[d].size, 0) || 1;

    const summary = DEVICES.map((d) => {
      const sessCount = sessions[d].size;
      const inqCount = inquiriesByDevice[d];
      return {
        device: d,
        sessions: sessCount,
        percent: Math.round((sessCount / totalSessions) * 100),
        inquiries: inqCount,
        conversion: sessCount > 0 ? +(inqCount / sessCount * 100).toFixed(2) : 0,
      };
    });

    const topExits = DEVICES.map((d) => ({
      device: d,
      pages: Object.entries(exitsByDevice[d])
        .sort((a, b) => b[1] - a[1]).slice(0, 5)
        .map(([p, c]) => ({ page: p, count: c })),
    }));

    const topServices = DEVICES.map((d) => ({
      device: d,
      services: Object.entries(servicesByDevice[d])
        .sort((a, b) => b[1] - a[1]).slice(0, 5)
        .map(([s, c]) => ({ service: s, count: c })),
    }));

    return { summary, topExits, topServices };
  }, [visits, inquiries]);

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Анализ по устройства</h1>
          <p className="text-sm text-muted-foreground">Mobile / Tablet / Desktop — трафик, конверсия и поведение.</p>
        </div>
        <div className="flex gap-2">
          <Input type="date" value={from} onChange={(e) => setFrom(e.target.value)} className="w-40" />
          <Input type="date" value={to} onChange={(e) => setTo(e.target.value)} className="w-40" />
        </div>
      </div>

      {/* KPI */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.summary.map((s) => {
          const Icon = ICONS[s.device];
          return (
            <Card key={s.device}>
              <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <CardTitle className="capitalize">{s.device}</CardTitle>
                <Icon className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold" style={{ color: COLORS[s.device] }}>{s.percent}%</div>
                <div className="text-xs text-muted-foreground">{s.sessions} сесии · {s.inquiries} запитвания</div>
                <div className="text-xs mt-1">Конверсия: <span className="font-medium">{s.conversion}%</span></div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {loading && <p className="text-sm text-muted-foreground">Зарежда...</p>}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Distribution */}
        <Card>
          <CardHeader><CardTitle>Разпределение на трафика</CardTitle></CardHeader>
          <CardContent style={{ height: 260 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie data={stats.summary} dataKey="sessions" nameKey="device" outerRadius={90} label>
                  {stats.summary.map((s) => <Cell key={s.device} fill={COLORS[s.device]} />)}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Conversion */}
        <Card>
          <CardHeader><CardTitle>Конверсия по устройство (%)</CardTitle></CardHeader>
          <CardContent style={{ height: 260 }}>
            <ResponsiveContainer>
              <BarChart data={stats.summary}>
                <XAxis dataKey="device" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="conversion">
                  {stats.summary.map((s) => <Cell key={s.device} fill={COLORS[s.device]} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Top exits */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {stats.topExits.map((t) => (
          <Card key={t.device}>
            <CardHeader><CardTitle className="text-base capitalize">Топ изход — {t.device}</CardTitle></CardHeader>
            <CardContent>
              {t.pages.length === 0 && <p className="text-xs text-muted-foreground">Няма данни.</p>}
              <ul className="space-y-1 text-sm">
                {t.pages.map((p) => (
                  <li key={p.page} className="flex justify-between gap-2">
                    <span className="truncate" title={p.page}>{p.page}</span>
                    <span className="text-muted-foreground">{p.count}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Top services */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {stats.topServices.map((t) => (
          <Card key={t.device}>
            <CardHeader><CardTitle className="text-base capitalize">Услуги — {t.device}</CardTitle></CardHeader>
            <CardContent>
              {t.services.length === 0 && <p className="text-xs text-muted-foreground">Няма запитвания.</p>}
              <ul className="space-y-1 text-sm">
                {t.services.map((s) => (
                  <li key={s.service} className="flex justify-between">
                    <span>{s.service}</span>
                    <span className="text-muted-foreground">{s.count}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DeviceAnalyticsPage;
