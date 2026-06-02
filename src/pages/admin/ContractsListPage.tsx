import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { FileSignature, Search, Calendar, Euro } from "lucide-react";
import { format } from "date-fns";
import { bg } from "date-fns/locale";
import {
  CONTRACT_WORKFLOW_LABELS,
  CONTRACT_WORKFLOW_COLORS,
  serviceCategoryLabel,
} from "@/lib/serviceCategories";

const ContractsListPage = () => {
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const { data } = await supabase
        .from("contracts")
        .select("*, inquiries(name, phone, address, referrer_source)")
        .order("created_at", { ascending: false });
      setRows(data || []);
      setLoading(false);
    };
    load();
  }, []);

  const filtered = useMemo(() => {
    return rows.filter((r) => {
      if (status !== "all" && r.contract_workflow_status !== status) return false;
      if (search) {
        const q = search.toLowerCase();
        const hit =
          r.client_name?.toLowerCase().includes(q) ||
          r.client_phone?.includes(q) ||
          r.client_email?.toLowerCase().includes(q) ||
          r.client_address?.toLowerCase().includes(q);
        if (!hit) return false;
      }
      return true;
    });
  }, [rows, status, search]);

  const totalValue = filtered
    .filter((r) => r.contract_workflow_status === "signed")
    .reduce((s, r) => s + Number(r.contract_value || 0), 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold flex items-center gap-2 text-foreground">
          <FileSignature className="h-6 w-6" /> Договори
        </h1>
        <div className="text-right">
          <p className="text-xs text-muted-foreground">Подписани (филтрирани)</p>
          <p className="text-xl font-bold text-green-500">{totalValue.toLocaleString("bg-BG")} €</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Търсене по име, телефон, адрес..."
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
            {Object.entries(CONTRACT_WORKFLOW_LABELS).map(([k, v]) => (
              <SelectItem key={k} value={k}>{v}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {loading ? (
        <div className="text-center py-12 text-muted-foreground">Зареждане...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">Няма намерени договори.</div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          {filtered.map((r) => {
            const st = CONTRACT_WORKFLOW_COLORS[r.contract_workflow_status] || CONTRACT_WORKFLOW_COLORS.prepared;
            return (
              <Link
                key={r.id}
                to={`/admin/inquiries/${r.inquiry_id}`}
                className="bg-card rounded-xl border border-border p-4 hover:border-primary transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-semibold text-sm">{r.client_name}</p>
                    <p className="text-xs text-muted-foreground">{r.client_phone}</p>
                  </div>
                  <Badge style={{ background: st.bg, color: st.text }} className="border-0 text-[10px]">
                    {CONTRACT_WORKFLOW_LABELS[r.contract_workflow_status]}
                  </Badge>
                </div>

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
                    {r.signed_date
                      ? format(new Date(r.signed_date), "dd.MM.yyyy", { locale: bg })
                      : format(new Date(r.created_at), "dd.MM.yyyy", { locale: bg })}
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

export default ContractsListPage;
