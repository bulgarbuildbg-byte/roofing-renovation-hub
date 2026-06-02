import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Building2, Search, MapPin, Euro, Calendar } from "lucide-react";
import { format } from "date-fns";
import { bg } from "date-fns/locale";
import { PROJECT_SITE_STATUS_LABELS, serviceCategoryLabel } from "@/lib/serviceCategories";

const STATUS_COLORS: Record<string, string> = {
  pending_start: "#3b82f6",
  active: "#22c55e",
  paused: "#f59e0b",
  completed: "#8b5cf6",
  invoiced: "#14b8a6",
  problematic: "#ef4444",
};

const SitesListPage = () => {
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const { data } = await supabase
        .from("project_sites")
        .select("*")
        .order("created_at", { ascending: false });
      setRows(data || []);
      setLoading(false);
    };
    load();
  }, []);

  const filtered = useMemo(() => {
    return rows.filter((r) => {
      if (status !== "all" && r.status !== status) return false;
      if (search) {
        const q = search.toLowerCase();
        const hit =
          r.client_name?.toLowerCase().includes(q) ||
          r.address?.toLowerCase().includes(q) ||
          r.client_phone?.includes(q);
        if (!hit) return false;
      }
      return true;
    });
  }, [rows, status, search]);

  const totalValue = filtered.reduce((s, r) => s + Number(r.contract_value || 0), 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold flex items-center gap-2 text-foreground">
          <Building2 className="h-6 w-6" /> Обекти / Проекти
        </h1>
        <div className="text-right">
          <p className="text-xs text-muted-foreground">Обща стойност (филтрирани)</p>
          <p className="text-xl font-bold text-green-500">{totalValue.toLocaleString("bg-BG")} €</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Търсене по клиент, адрес, телефон..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="w-full sm:w-56">
            <SelectValue placeholder="Статус" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Всички статуси</SelectItem>
            {Object.entries(PROJECT_SITE_STATUS_LABELS).map(([k, v]) => (
              <SelectItem key={k} value={k}>{v}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {loading ? (
        <div className="text-center py-12 text-muted-foreground">Зареждане...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          Няма обекти. Те се създават автоматично, когато маркирате договор като „подписан" и натиснете „Създай обект".
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          {filtered.map((r) => {
            const color = STATUS_COLORS[r.status] || "#3b82f6";
            return (
              <Link
                key={r.id}
                to={`/admin/sites/${r.id}`}
                className="bg-card rounded-xl border border-border p-4 hover:border-primary transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <p className="font-semibold text-sm">{r.client_name}</p>
                  <Badge style={{ background: `${color}22`, color }} className="border-0 text-[10px]">
                    {PROJECT_SITE_STATUS_LABELS[r.status]}
                  </Badge>
                </div>
                {r.address && (
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mb-2">
                    <MapPin className="h-3 w-3" /> <span className="truncate">{r.address}</span>
                  </p>
                )}
                {r.service_categories?.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-2">
                    {r.service_categories.slice(0, 3).map((c: string) => (
                      <span key={c} className="text-[10px] bg-muted px-1.5 py-0.5 rounded">
                        {serviceCategoryLabel(c)}
                      </span>
                    ))}
                  </div>
                )}
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {r.signed_date && format(new Date(r.signed_date), "dd.MM.yyyy", { locale: bg })}
                  </span>
                  <span className="flex items-center gap-1 font-semibold text-foreground">
                    <Euro className="h-3 w-3" />
                    {Number(r.contract_value || 0).toLocaleString("bg-BG")}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SitesListPage;
