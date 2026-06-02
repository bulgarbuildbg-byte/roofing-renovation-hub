import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { FileSignature, FolderPlus, Loader2, Upload, Trash2, FileText, Paperclip } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import MultiServiceSelect from "./MultiServiceSelect";
import SignContractDialog from "./SignContractDialog";
import {
  CONTRACT_WORKFLOW_LABELS,
  CONTRACT_WORKFLOW_COLORS,
  CURRENCIES,
  CONTRACT_FILE_CATEGORIES,
  contractFileCategoryLabel,
} from "@/lib/serviceCategories";
import { format } from "date-fns";
import { bg } from "date-fns/locale";

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
  const [files, setFiles] = useState<any[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadCategory, setUploadCategory] = useState("contract");
  const [creatingDraft, setCreatingDraft] = useState(false);
  const [signDialogOpen, setSignDialogOpen] = useState(false);

  const [status, setStatus] = useState("prepared");
  const [contractNumber, setContractNumber] = useState("");
  const [currency, setCurrency] = useState("EUR");
  const [signedDate, setSignedDate] = useState("");
  const [contractValue, setContractValue] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [notes, setNotes] = useState("");

  const loadFiles = async (contractId: string) => {
    const { data } = await supabase
      .from("contract_files" as any)
      .select("*")
      .eq("contract_id", contractId)
      .order("uploaded_at", { ascending: false });
    setFiles(data || []);
  };

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
        setContractNumber((c as any).contract_number || "");
        setCurrency((c as any).currency || "EUR");
        setSignedDate(c.signed_date || "");
        setContractValue(c.contract_value ? String(c.contract_value) : "");
        setCategories(c.service_categories || []);
        setNotes(c.notes || "");
        await loadFiles(c.id);
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

  const createDraft = async (): Promise<any | null> => {
    if (!user) return null;
    setCreatingDraft(true);
    const { data, error } = await supabase
      .from("contracts")
      .insert({
        inquiry_id: inquiry.id,
        created_by: user.id,
        client_name: inquiry.name,
        client_phone: inquiry.phone,
        client_email: inquiry.email,
        client_address: inquiry.address || null,
        total_price: 0,
        contract_workflow_status: "prepared",
        currency: "EUR",
      } as any)
      .select()
      .single();
    setCreatingDraft(false);
    if (error || !data) {
      toast({ title: "Грешка при създаване", description: error?.message, variant: "destructive" });
      return null;
    }
    setContract(data);
    setStatus(data.contract_workflow_status || "prepared");
    return data;
  };

  // When user picks "signed" in the inline select, force the dialog
  const onStatusChange = (next: string) => {
    if (next === "signed") {
      setSignDialogOpen(true);
      return;
    }
    setStatus(next);
  };

  const handleSignedSaved = (saved: any) => {
    setContract(saved);
    setStatus("signed");
    setContractValue(saved.contract_value ? String(saved.contract_value) : "");
    setCurrency(saved.currency || "EUR");
    setSignedDate(saved.signed_date || "");
    setContractNumber(saved.contract_number || "");
    setNotes(saved.notes || "");
    if (saved.id) loadFiles(saved.id);
  };

  const save = async () => {
    let row = contract;
    if (!row) {
      row = await createDraft();
      if (!row) return;
    }
    if (status === "signed" && (!contractValue || Number(contractValue) <= 0)) {
      setSignDialogOpen(true);
      return;
    }
    setSaving(true);
    const update: any = {
      contract_workflow_status: status,
      contract_number: contractNumber || null,
      currency,
      signed_date: signedDate || (status === "signed" ? new Date().toISOString().slice(0, 10) : null),
      contract_value: contractValue ? Number(contractValue) : 0,
      service_categories: categories,
      notes,
    };
    const { error } = await supabase.from("contracts").update(update).eq("id", row.id);

    if (!error) {
      const inquiryStatusMap: Record<string, string> = {
        prepared: "contract_prepared",
        sent: "contract_sent",
        signed: "contract_signed",
        rejected: "contract_rejected",
      };
      const newInqStatus = inquiryStatusMap[status];
      if (newInqStatus && inquiry.status !== newInqStatus) {
        await supabase.from("inquiries").update({ status: newInqStatus as any }).eq("id", inquiry.id);
      }
    }

    setSaving(false);
    if (error) {
      toast({ title: "Грешка", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Запазено" });
    setContract({ ...row, ...update });
    if (signedDate === "" && update.signed_date) setSignedDate(update.signed_date);
  };

  const uploadFile = async (file: File) => {
    if (!contract || !user) return;
    setUploading(true);
    try {
      const ext = file.name.split(".").pop();
      const path = `contracts/${contract.id}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
      const { error: upErr } = await supabase.storage
        .from("project-documents")
        .upload(path, file, { contentType: file.type });
      if (upErr) throw upErr;
      const { data: signed } = await supabase.storage
        .from("project-documents")
        .createSignedUrl(path, 60 * 60 * 24 * 365 * 5);
      const { error: insErr } = await supabase.from("contract_files" as any).insert({
        contract_id: contract.id,
        file_url: signed?.signedUrl || path,
        file_name: file.name,
        file_type: file.type,
        file_size: file.size,
        category: uploadCategory,
        uploaded_by: user.id,
      });
      if (insErr) throw insErr;
      await loadFiles(contract.id);
      toast({ title: "Файлът е качен" });
    } catch (e: any) {
      toast({ title: "Грешка при качване", description: e.message, variant: "destructive" });
    } finally {
      setUploading(false);
    }
  };

  const deleteFile = async (fileId: string) => {
    if (!confirm("Изтриване на файла?")) return;
    await supabase.from("contract_files" as any).delete().eq("id", fileId);
    if (contract) await loadFiles(contract.id);
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
        description: `Договор подписан. Стойност: ${contractValue || 0} ${currency}`,
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
  const currencyLabel = CURRENCIES.find((c) => c.value === currency)?.symbol || "€";

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
              <Label>Номер на договор</Label>
              <Input
                value={contractNumber}
                onChange={(e) => setContractNumber(e.target.value)}
                placeholder="напр. Д-2026-0042"
              />
            </div>
            <div>
              <Label>Стойност на договора</Label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  min="0"
                  step="100"
                  value={contractValue}
                  onChange={(e) => setContractValue(e.target.value)}
                  placeholder="напр. 12500"
                />
                <Select value={currency} onValueChange={setCurrency}>
                  <SelectTrigger className="w-28"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {CURRENCIES.map((c) => (
                      <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label>Дата на подписване</Label>
              <Input type="date" value={signedDate} onChange={(e) => setSignedDate(e.target.value)} />
            </div>
            <div className="sm:col-span-2">
              <Label>Категории услуги</Label>
              <MultiServiceSelect value={categories} onChange={setCategories} />
            </div>
          </div>
          <div>
            <Label>Бележки (аванс, срокове, специфични условия)</Label>
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

          {/* Contract files */}
          <div className="pt-4 border-t border-border space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h3 className="text-sm font-semibold flex items-center gap-2">
                <Paperclip className="h-4 w-4" />
                Прикачени документи ({files.length})
              </h3>
              <div className="flex items-center gap-2">
                <Select value={uploadCategory} onValueChange={setUploadCategory}>
                  <SelectTrigger className="w-40 h-9 text-xs"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {CONTRACT_FILE_CATEGORIES.map((c) => (
                      <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Label htmlFor="contract-file-upload" className="cursor-pointer">
                  <div className="inline-flex items-center gap-2 px-3 h-9 rounded-md bg-primary text-primary-foreground text-xs font-medium hover:opacity-90">
                    {uploading ? <Loader2 className="h-3 w-3 animate-spin" /> : <Upload className="h-3 w-3" />}
                    Качи файл
                  </div>
                  <input
                    id="contract-file-upload"
                    type="file"
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.heic,.webp"
                    className="hidden"
                    disabled={uploading}
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) uploadFile(f);
                      e.target.value = "";
                    }}
                  />
                </Label>
              </div>
            </div>
            {files.length === 0 ? (
              <p className="text-xs text-muted-foreground">Няма качени документи. Качете договор, скан, анекс или снимка.</p>
            ) : (
              <ul className="space-y-1.5">
                {files.map((f) => (
                  <li
                    key={f.id}
                    className="flex items-center gap-2 p-2 rounded-md border border-border bg-muted/30 text-sm"
                  >
                    <FileText className="h-4 w-4 text-muted-foreground shrink-0" />
                    <a
                      href={f.file_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 truncate hover:underline"
                    >
                      {f.file_name}
                    </a>
                    <Badge variant="secondary" className="text-[10px]">
                      {contractFileCategoryLabel(f.category)}
                    </Badge>
                    <span className="text-[10px] text-muted-foreground">
                      {format(new Date(f.uploaded_at), "dd.MM.yyyy", { locale: bg })}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => deleteFile(f.id)}
                    >
                      <Trash2 className="h-3 w-3 text-destructive" />
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {contractValue && (
            <div className="text-xs text-muted-foreground pt-2 border-t border-border">
              Текуща стойност:{" "}
              <span className="font-semibold text-foreground">
                {Number(contractValue).toLocaleString("bg-BG")} {currencyLabel}
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
}
