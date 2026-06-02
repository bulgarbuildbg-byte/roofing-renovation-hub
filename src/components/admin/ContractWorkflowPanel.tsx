import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { FileSignature, FolderPlus, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import MultiServiceSelect from "./MultiServiceSelect";
import {
  CONTRACT_WORKFLOW_LABELS,
  CONTRACT_WORKFLOW_COLORS,
} from "@/lib/serviceCategories";

interface Props {
  inquiry: any;
}

export default function ContractWorkflowPanel({ inquiry }: Props) {
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [creatingSite, setCreatingSite] = useState(false);
  const [contract, setContract] = useState<any>(null);
  const [existingSite, setExistingSite] = useState<any>(null);

  const [status, setStatus] = useState("prepared");
  const [signedDate, setSignedDate] = useState("");
  const [contractValue, setContractValue] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const { data: contracts } = await supabase
        .from("contracts")
        .select("*")
        .eq("inquiry_id", inquiry.id)
        .order("created_at", { ascending: false })
        .limit(1);
      const c = contracts?.[0] || null;
      setContract(c);
      if (c) {
        setStatus(c.contract_workflow_status || "prepared");
        setSignedDate(c.signed_date || "");
        setContractValue(c.contract_value ? String(c.contract_value) : "");
        setCategories(c.service_categories || []);
        setNotes(c.notes || "");
      }
      const { data: site } = await supabase
        .from("project_sites")
        .select("id, status")
        .eq("inquiry_id", inquiry.id)
        .maybeSingle();
      setExistingSite(site);
      setLoading(false);
    };
    load();
  }, [inquiry.id]);

  const save = async () => {
    if (!contract) {
      toast({
        title: "Няма договор",
        description: "Първо генерирайте договор от бутона 'Генерирай договор'.",
        variant: "destructive",
      });
      return;
    }
    setSaving(true);
    const update: any = {
      contract_workflow_status: status,
      signed_date: signedDate || null,
      contract_value: contractValue ? Number(contractValue) : 0,
      service_categories: categories,
      notes,
    };
    const { error } = await supabase.from("contracts").update(update).eq("id", contract.id);
    setSaving(false);
    if (error) {
      toast({ title: "Грешка", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Запазено" });
    setContract({ ...contract, ...update });
  };

  const createSite = async () => {
    if (!user) return;
    setCreatingSite(true);
    const { data, error } = await supabase
      .from("project_sites")
      .insert({
        contract_id: contract?.id,
        inquiry_id: inquiry.id,
        client_name: inquiry.name,
        client_phone: inquiry.phone,
        client_email: inquiry.email,
        address: inquiry.address,
        service_categories: categories,
        contract_value: contractValue ? Number(contractValue) : 0,
        signed_date: signedDate || new Date().toISOString().slice(0, 10),
        status: "pending_start",
        referrer_source: inquiry.referrer_source,
        notes,
        created_by: user.id,
      })
      .select()
      .single();
    if (!error && data) {
      await supabase.from("project_timeline").insert({
        project_site_id: data.id,
        event_type: "contract_signed",
        description: `Договор подписан. Стойност: ${contractValue || 0} €`,
        created_by: user.id,
      });
    }
    setCreatingSite(false);
    if (error) {
      toast({ title: "Грешка при създаване на обект", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Обектът е създаден" });
    navigate(`/admin/sites/${data.id}`);
  };

  if (loading) {
    return (
      <div className="bg-card rounded-xl border border-border p-6">
        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const st = CONTRACT_WORKFLOW_COLORS[status] || CONTRACT_WORKFLOW_COLORS.prepared;

  return (
    <div className="bg-card rounded-xl border border-border p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-foreground flex items-center gap-2">
          <FileSignature className="h-4 w-4" />
          Договор
        </h2>
        <Badge style={{ background: st.bg, color: st.text }} className="border-0">
          {CONTRACT_WORKFLOW_LABELS[status]}
        </Badge>
      </div>

      {!contract && (
        <p className="text-sm text-muted-foreground">
          Все още няма генериран договор. Използвайте бутона „Генерирай договор" по-долу,
          за да създадете такъв, след което можете да го управлявате тук.
        </p>
      )}

      {contract && (
        <>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label>Статус на договора</Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {Object.entries(CONTRACT_WORKFLOW_LABELS).map(([k, v]) => (
                    <SelectItem key={k} value={k}>{v}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Стойност на договора (€)</Label>
              <Input
                type="number"
                min="0"
                step="100"
                value={contractValue}
                onChange={(e) => setContractValue(e.target.value)}
                placeholder="напр. 12500"
              />
            </div>
            <div>
              <Label>Дата на подписване</Label>
              <Input type="date" value={signedDate} onChange={(e) => setSignedDate(e.target.value)} />
            </div>
            <div>
              <Label>Категории услуги</Label>
              <MultiServiceSelect value={categories} onChange={setCategories} />
            </div>
          </div>
          <div>
            <Label>Бележки</Label>
            <Textarea rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} />
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            <Button onClick={save} disabled={saving}>
              {saving && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              Запази
            </Button>

            {status === "signed" && !existingSite && (
              <Button variant="default" onClick={createSite} disabled={creatingSite} className="bg-green-600 hover:bg-green-700">
                {creatingSite ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <FolderPlus className="h-4 w-4 mr-2" />}
                Създай обект/проект
              </Button>
            )}

            {existingSite && (
              <Button variant="outline" onClick={() => navigate(`/admin/sites/${existingSite.id}`)}>
                <FolderPlus className="h-4 w-4 mr-2" />
                Виж обекта
              </Button>
            )}
          </div>
        </>
      )}
    </div>
  );
}
