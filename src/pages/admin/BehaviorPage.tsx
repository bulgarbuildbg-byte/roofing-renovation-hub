import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "react-router-dom";
import { ExternalLink, Video, Eye, MousePointerClick, Clock, ArrowUpRight } from "lucide-react";
import { format } from "date-fns";
import { bg } from "date-fns/locale";

const CLARITY_ID = import.meta.env.VITE_CLARITY_PROJECT_ID as string | undefined;
const SOURCES = ["all", "organic", "direct", "social", "referral", "email"] as const;
const DEVICES = ["all", "mobile", "tablet", "desktop"] as const;

type SessionRow = {
  session_id: string;
  events: number;
  pages: number;
  duration_s: number;
  device: string;
  source: string;
  first_page: string;
  exit_page: string;
  last_seen: string;
  score: number;
  inquiry?: { id: string; name: string } | null;
};

const todayISO = () => new Date().toISOString().slice(0, 10);
const ago = (days: number) => {
  const d = new Date(); d.setDate(d.getDate() - days);
  return d.toISOString().slice(0, 10);
};

const clarityUrl = (sessionId: string) =>
  CLARITY_ID
    ? `https://clarity.microsoft.com/projects/view/${CLARITY_ID}/impressions?filter=CustomSessionId%3A%3A${encodeURIComponent(sessionId)}`
    : null;

const BehaviorPage = () => {
  const [from, setFrom] = useState(ago(1));
  const [to, setTo] = useState(todayISO());
  const [source, setSource] = useState<string>("all");
  const [device, setDevice] = useState<string>("all");
  const [pageFilter, setPageFilter] = useState("");
  const [sessions, setSessions] = useState<SessionRow[]>([]);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    let q = supabase
      .from("analytics_events" as any)
      .select("session_id,event_type,event_name,page_path,duration_seconds,time_on_page_ms,is_exit,device_type,referrer_source,created_at")
      .gte("created_at", `${from}T00:00:00`)
      .lte("created_at", `${to}T23:59:59`)
      .eq("is_bot", false)
      .order("created_at", { ascending: true })
      .limit(5000);

    if (source !== "all") q = q.eq("referrer_source", source);
    if (device !== "all") q = q.eq("device_type", device);
    if (pageFilter) q = q.ilike("page_path", `%${pageFilter}%`);

    const { data } = await q;
    const rows = (data || []) as any[];

    // group by session
    const map = new Map<string, any>();
    for (const r of rows) {
      const sid = r.session_id;
      if (!sid) continue;
      let s = map.get(sid);
      if (!s) {
        s = {
          session_id: sid, events: 0, pages: new Set<string>(),
          duration_s: 0, device: r.device_type || "desktop",
          source: r.referrer_source || "direct",
          first_page: r.page_path, exit_page: r.page_path,
          last_seen: r.created_at, clicks: 0, formSubmits: 0,
        };
        map.set(sid, s);
      }
      s.events += 1;
      if (r.page_path) s.pages.add(r.page_path);
      if (r.duration_seconds) s.duration_s += r.duration_seconds;
      if (r.event_type === "button_click") s.clicks += 1;
      if (r.event_type === "form_submit" || r.event_name === "submit") s.formSubmits += 1;
      if (r.is_exit) s.exit_page = r.page_path;
      s.last_seen = r.created_at;
    }

    // attach inquiries
    const sids = Array.from(map.keys());
    if (sids.length) {
      const { data: inqs } = await supabase
        .from("inquiries")
        .select("id,name,session_id")
        .in("session_id", sids);
      for (const i of inqs || []) {
        const s = map.get((i as any).session_id);
        if (s) s.inquiry = { id: i.id, name: i.name };
      }
    }

    const list: SessionRow[] = Array.from(map.values()).map((s) => ({
      ...s,
      pages: s.pages.size,
      score:
        s.pages.size * 5 +
        Math.min(s.duration_s, 600) / 10 +
        s.clicks * 3 +
        (s.inquiry ? 50 : 0) +
        s.formSubmits * 20,
    }));
    list.sort((a, b) => b.score - a.score);
    setSessions(list);
    setLoading(false);
  };

  useEffect(() => { load(); /* eslint-disable-next-line */ }, []);

  const top3 = sessions.slice(0, 3);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Поведение & Записи на сесии</h1>
          <p className="text-sm text-muted-foreground">
            Microsoft Clarity записи + heatmaps на потребителското поведение.
          </p>
        </div>
        {CLARITY_ID ? (
          <a href={`https://clarity.microsoft.com/projects/view/${CLARITY_ID}/dashboard`} target="_blank" rel="noreferrer">
            <Button variant="outline" size="sm" className="gap-2">
              <ExternalLink className="h-4 w-4" /> Отвори Clarity Dashboard
            </Button>
          </a>
        ) : (
          <Badge variant="destructive">Липсва VITE_CLARITY_PROJECT_ID</Badge>
        )}
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6 grid grid-cols-2 md:grid-cols-6 gap-3">
          <div>
            <label className="text-xs text-muted-foreground">От</label>
            <Input type="date" value={from} onChange={(e) => setFrom(e.target.value)} />
          </div>
          <div>
            <label className="text-xs text-muted-foreground">До</label>
            <Input type="date" value={to} onChange={(e) => setTo(e.target.value)} />
          </div>
          <div>
            <label className="text-xs text-muted-foreground">Източник</label>
            <Select value={source} onValueChange={setSource}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>{SOURCES.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-xs text-muted-foreground">Устройство</label>
            <Select value={device} onValueChange={setDevice}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>{DEVICES.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div className="md:col-span-1">
            <label className="text-xs text-muted-foreground">Страница</label>
            <Input placeholder="/bg/..." value={pageFilter} onChange={(e) => setPageFilter(e.target.value)} />
          </div>
          <div className="flex items-end">
            <Button className="w-full" onClick={load} disabled={loading}>
              {loading ? "Зарежда..." : "Приложи"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Top 3 today */}
      <div>
        <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <Video className="h-5 w-5" /> Топ 3 сесии за деня
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {top3.length === 0 && (
            <p className="text-sm text-muted-foreground col-span-3">Няма достатъчно данни за избрания период.</p>
          )}
          {top3.map((s) => (
            <Card key={s.session_id} className="border-primary/30">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center justify-between">
                  <span>Score: {Math.round(s.score)}</span>
                  <Badge variant="outline">{s.device}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Страници</span><span>{s.pages}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Време</span><span>{Math.round(s.duration_s)}s</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Източник</span><span>{s.source}</span></div>
                <div className="text-xs text-muted-foreground truncate" title={s.first_page}>Старт: {s.first_page}</div>
                <div className="text-xs text-muted-foreground truncate" title={s.exit_page}>Изход: {s.exit_page}</div>
                {s.inquiry && (
                  <Link to={`/admin/inquiries/${s.inquiry.id}`} className="text-xs text-accent hover:underline flex items-center gap-1">
                    Лийд: {s.inquiry.name} <ArrowUpRight className="h-3 w-3" />
                  </Link>
                )}
                {clarityUrl(s.session_id) && (
                  <a href={clarityUrl(s.session_id)!} target="_blank" rel="noreferrer">
                    <Button size="sm" variant="outline" className="w-full mt-2 gap-2">
                      <Video className="h-4 w-4" /> Гледай запис
                    </Button>
                  </a>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Full list */}
      <Card>
        <CardHeader><CardTitle>Всички сесии ({sessions.length})</CardTitle></CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-xs text-muted-foreground border-b">
              <tr>
                <th className="text-left py-2">Score</th>
                <th className="text-left">Устройство</th>
                <th className="text-left">Източник</th>
                <th className="text-left"><Eye className="h-3 w-3 inline" /> Стр.</th>
                <th className="text-left"><Clock className="h-3 w-3 inline" /> Време</th>
                <th className="text-left"><MousePointerClick className="h-3 w-3 inline" /> Клик</th>
                <th className="text-left">Изход</th>
                <th className="text-left">Лийд</th>
                <th className="text-left">Кога</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {sessions.map((s) => (
                <tr key={s.session_id} className="border-b border-border/50 hover:bg-muted/30">
                  <td className="py-2 font-medium">{Math.round(s.score)}</td>
                  <td>{s.device}</td>
                  <td>{s.source}</td>
                  <td>{s.pages}</td>
                  <td>{Math.round(s.duration_s)}s</td>
                  <td>{(s as any).clicks ?? 0}</td>
                  <td className="max-w-[180px] truncate" title={s.exit_page}>{s.exit_page}</td>
                  <td>
                    {s.inquiry ? (
                      <Link to={`/admin/inquiries/${s.inquiry.id}`} className="text-accent hover:underline">
                        {s.inquiry.name}
                      </Link>
                    ) : "—"}
                  </td>
                  <td className="text-xs text-muted-foreground">
                    {format(new Date(s.last_seen), "dd MMM HH:mm", { locale: bg })}
                  </td>
                  <td>
                    {clarityUrl(s.session_id) && (
                      <a href={clarityUrl(s.session_id)!} target="_blank" rel="noreferrer">
                        <Button size="sm" variant="ghost" className="h-7 px-2">
                          <Video className="h-3 w-3" />
                        </Button>
                      </a>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
};

export default BehaviorPage;
