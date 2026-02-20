import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { Users, Clock, MousePointer, Phone, Calculator, Loader2 } from "lucide-react";
import { startOfDay, startOfWeek, startOfMonth, startOfYear } from "date-fns";

interface Stats {
  visitorsToday: number;
  visitorsWeek: number;
  visitorsMonth: number;
  visitorsYear: number;
  avgDuration: number;
  offerToday: number;
  offerWeek: number;
  offerMonth: number;
  offerYear: number;
  callToday: number;
  callWeek: number;
  callMonth: number;
  callYear: number;
  calcToday: number;
  calcWeek: number;
  calcMonth: number;
  calcYear: number;
}

const AnalyticsPage = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    const now = new Date();
    const today = startOfDay(now).toISOString();
    const week = startOfWeek(now, { weekStartsOn: 1 }).toISOString();
    const month = startOfMonth(now).toISOString();
    const year = startOfYear(now).toISOString();

    const table = "analytics_events" as any;

    // Fetch all events for this year (covers all periods)
    const { data: events } = await supabase
      .from(table)
      .select("event_type, event_name, session_id, duration_seconds, created_at")
      .gte("created_at", year);

    const rows = events || [];

    const uniqueSessions = (since: string) =>
      new Set(rows.filter((r: any) => r.event_type === "page_view" && r.created_at >= since).map((r: any) => r.session_id)).size;

    const buttonCount = (name: string, since: string) =>
      rows.filter((r: any) => r.event_type === "button_click" && r.event_name === name && r.created_at >= since).length;

    const durations = rows.filter((r: any) => r.event_type === "session_duration" && r.duration_seconds);
    const avgDuration = durations.length > 0
      ? Math.round(durations.reduce((s: number, r: any) => s + r.duration_seconds, 0) / durations.length / 60 * 10) / 10
      : 0;

    setStats({
      visitorsToday: uniqueSessions(today),
      visitorsWeek: uniqueSessions(week),
      visitorsMonth: uniqueSessions(month),
      visitorsYear: uniqueSessions(year),
      avgDuration,
      offerToday: buttonCount("offer_button", today),
      offerWeek: buttonCount("offer_button", week),
      offerMonth: buttonCount("offer_button", month),
      offerYear: buttonCount("offer_button", year),
      callToday: buttonCount("call_button", today),
      callWeek: buttonCount("call_button", week),
      callMonth: buttonCount("call_button", month),
      callYear: buttonCount("call_button", year),
      calcToday: buttonCount("calculator_button", today),
      calcWeek: buttonCount("calculator_button", week),
      calcMonth: buttonCount("calculator_button", month),
      calcYear: buttonCount("calculator_button", year),
    });
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!stats) return null;

  const StatCard = ({ title, icon: Icon, values, iconColor }: { title: string; icon: any; values: { label: string; value: number }[]; iconColor?: string }) => (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
          <Icon className={`h-4 w-4 ${iconColor || "text-primary"}`} />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {values.map((v) => (
            <div key={v.label}>
              <p className="text-2xl font-bold text-foreground">{v.value}</p>
              <p className="text-xs text-muted-foreground">{v.label}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Аналитика</h1>

      {/* Visitors */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard
          title="Посетители"
          icon={Users}
          values={[
            { label: "Днес", value: stats.visitorsToday },
            { label: "Тази седмица", value: stats.visitorsWeek },
            { label: "Този месец", value: stats.visitorsMonth },
            { label: "Тази година", value: stats.visitorsYear },
          ]}
        />

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              Средно време на сайта
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-foreground">{stats.avgDuration}</p>
            <p className="text-sm text-muted-foreground">минути</p>
          </CardContent>
        </Card>
      </div>

      {/* Button clicks */}
      <h2 className="text-lg font-semibold text-foreground">Натискания на бутони</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          title="Заявки за оферта"
          icon={MousePointer}
          iconColor="text-accent"
          values={[
            { label: "Днес", value: stats.offerToday },
            { label: "Тази седмица", value: stats.offerWeek },
            { label: "Този месец", value: stats.offerMonth },
            { label: "Тази година", value: stats.offerYear },
          ]}
        />
        <StatCard
          title="Обаждания"
          icon={Phone}
          iconColor="text-green-500"
          values={[
            { label: "Днес", value: stats.callToday },
            { label: "Тази седмица", value: stats.callWeek },
            { label: "Този месец", value: stats.callMonth },
            { label: "Тази година", value: stats.callYear },
          ]}
        />
        <StatCard
          title="Калкулатор"
          icon={Calculator}
          iconColor="text-blue-500"
          values={[
            { label: "Днес", value: stats.calcToday },
            { label: "Тази седмица", value: stats.calcWeek },
            { label: "Този месец", value: stats.calcMonth },
            { label: "Тази година", value: stats.calcYear },
          ]}
        />
      </div>
    </div>
  );
};

export default AnalyticsPage;
