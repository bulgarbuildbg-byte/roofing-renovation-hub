import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, FileText, Download, Phone, Mail, MapPin, Ruler, Layers, Box, Globe, Video, Activity, Smartphone } from "lucide-react";
import { format } from "date-fns";
import { bg } from "date-fns/locale";
import { useToast } from "@/hooks/use-toast";
import ContractWorkflowPanel from "@/components/admin/ContractWorkflowPanel";
import SignContractDialog from "@/components/admin/SignContractDialog";

import { INQUIRY_STATUS_LABELS, CONTRACT_RELEVANT_STATUSES } from "@/lib/serviceCategories";
import { useAuth } from "@/contexts/AuthContext";
import { clarityImpressionUrl } from "@/lib/clarity";
import { formatDuration } from "@/lib/format";
const statusLabels = INQUIRY_STATUS_LABELS;
const serviceLabels: Record<string, string> = {
  repair: "Ремонт", replacement: "Подмяна", new_construction: "Нов покрив", waterproofing: "Хидроизолация",
  tiles: "Керемиди", flat_roof: "Плосък покрив", metal_roof: "Метален покрив", maintenance: "Поддръжка",
  leak_repair: "Течове", other: "Друго",
};
const materialLabels: Record<string, string> = {
  tiles: "Керемиди", metal: "Метал", bitumen: "Битум", pvc_membrane: "PVC мембрана", shingles: "Шингли", other: "Друго",
};
const complexityLabels: Record<string, string> = {
  single_pitch: "Едноскатен", gable: "Двускатен", hip: "Четирискатен", complex: "Сложен",
};

const InquiryDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [inquiry, setInquiry] = useState<any>(null);
  const [files, setFiles] = useState<any[]>([]);
  const [timeline, setTimeline] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [signDialogOpen, setSignDialogOpen] = useState(false);
  const [pendingContract, setPendingContract] = useState<any>(null);
  

  useEffect(() => {
    const fetch = async () => {
      const [{ data: inq }, { data: f }] = await Promise.all([
        supabase.from("inquiries").select("*").eq("id", id).single(),
        supabase.from("inquiry_files").select("*").eq("inquiry_id", id),
      ]);
      setInquiry(inq);
      setFiles(f || []);
      if (inq?.session_id) {
        const { data: ev } = await supabase
          .from("analytics_events" as any)
          .select("event_type,event_name,page_path,device_type,referrer_source,duration_seconds,time_on_page_ms,is_exit,created_at")
          .eq("session_id", inq.session_id)
          .order("created_at", { ascending: true })
          .limit(200);
        setTimeline((ev || []) as any[]);
      }
      setLoading(false);
    };
    fetch();
  }, [id]);

  const ensureContract = async () => {
    const { data: existing } = await supabase
      .from("contracts")
      .select("*")
      .eq("inquiry_id", id)
      .order("created_at", { ascending: false })
      .limit(1);
    if (existing && existing.length > 0) return existing[0];
    if (!user || !inquiry) return null;
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
    if (error) {
      toast({ title: "Грешка", description: error.message, variant: "destructive" });
      return null;
    }
    return data;
  };

  const updateStatus = async (status: string) => {
    // For contract_signed -> require dialog (value, currency, date, number)
    if (status === "contract_signed") {
      const c = await ensureContract();
      setPendingContract(c);
      setSignDialogOpen(true);
      return;
    }
    // For other contract phases -> auto-create draft contract
    if (CONTRACT_RELEVANT_STATUSES.includes(status)) {
      await ensureContract();
    }
    await supabase.from("inquiries").update({ status: status as any }).eq("id", id);
    setInquiry({ ...inquiry, status });
    toast({ title: "Статусът е обновен" });
  };

  if (loading) {
    return <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" /></div>;
  }

  if (!inquiry) {
    return <div className="text-center py-12 text-muted-foreground">Запитването не е намерено.</div>;
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Button variant="ghost" size="icon" onClick={() => navigate("/admin/inquiries")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold text-foreground">Запитване от {inquiry.name}</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card rounded-xl border border-border p-6">
            <h2 className="font-semibold text-foreground mb-4">Контактна информация</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <a href={`tel:${inquiry.phone}`} className="text-accent hover:underline">{inquiry.phone}</a>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <a href={`mailto:${inquiry.email}`} className="text-accent hover:underline">{inquiry.email}</a>
              </div>
              {inquiry.address && (
                <div className="flex items-center gap-2 text-sm sm:col-span-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{inquiry.address}</span>
                </div>
              )}
            </div>
          </div>

          <div className="bg-card rounded-xl border border-border p-6">
            <h2 className="font-semibold text-foreground mb-4">Технически детайли</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Layers className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Услуга:</span>
                <span className="font-medium">{serviceLabels[inquiry.service_type]}</span>
              </div>
              {inquiry.area_sqm && (
                <div className="flex items-center gap-2">
                  <Ruler className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Площ:</span>
                  <span className="font-medium">{inquiry.area_sqm} кв.м</span>
                </div>
              )}
              {inquiry.preferred_material && (
                <div className="flex items-center gap-2">
                  <Box className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Материал:</span>
                  <span className="font-medium">{materialLabels[inquiry.preferred_material]}</span>
                </div>
              )}
              {inquiry.roof_complexity && (
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Тип покрив:</span>
                  <span className="font-medium">{complexityLabels[inquiry.roof_complexity]}</span>
                </div>
              )}
            </div>
            {inquiry.description && (
              <div className="mt-4 pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground mb-1">Допълнително описание:</p>
                <p className="text-sm">{inquiry.description}</p>
              </div>
            )}
          </div>

          <ContractWorkflowPanel inquiry={inquiry} />

          {files.length > 0 && (
            <div className="bg-card rounded-xl border border-border p-6">
              <h2 className="font-semibold text-foreground mb-4">Прикачени файлове</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {files.map((file) => (
                  <a
                    key={file.id}
                    href={file.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-3 rounded-lg border border-border hover:bg-muted transition-colors text-sm"
                  >
                    <Download className="h-4 w-4 text-muted-foreground shrink-0" />
                    <span className="truncate">{file.file_name}</span>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Activity Timeline (behavioural events tied to this lead's session) */}
          {inquiry.session_id && (
            <div className="bg-card rounded-xl border border-border p-6">
              <h2 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Activity className="h-4 w-4" /> Activity Timeline
              </h2>
              {timeline.length === 0 ? (
                <p className="text-sm text-muted-foreground">Няма записани действия за тази сесия.</p>
              ) : (
                <ol className="space-y-2 max-h-96 overflow-y-auto pr-2">
                  {timeline.map((ev, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm border-l-2 border-border pl-3">
                      <span className="text-xs text-muted-foreground w-24 shrink-0">
                        {format(new Date(ev.created_at), "dd MMM HH:mm:ss", { locale: bg })}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <Badge variant="outline" className="text-[10px]">{ev.event_type}</Badge>
                          {ev.event_name && <span className="text-xs text-muted-foreground">{ev.event_name}</span>}
                          {(ev.duration_seconds > 0 || ev.time_on_page_ms > 0) && (
                            <Badge variant="secondary" className="text-[10px]">
                              ⏱ {formatDuration(ev.duration_seconds || (ev.time_on_page_ms || 0) / 1000)}
                            </Badge>
                          )}
                          {ev.is_exit && <Badge variant="destructive" className="text-[10px]">EXIT</Badge>}
                        </div>
                        {ev.page_path && <div className="text-xs truncate" title={ev.page_path}>{ev.page_path}</div>}
                      </div>
                    </li>
                  ))}
                </ol>
              )}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <div className="bg-card rounded-xl border border-border p-6">
            <h2 className="font-semibold text-foreground mb-4">Управление</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Статус</p>
                <Select value={inquiry.status} onValueChange={updateStatus}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(statusLabels).map(([k, v]) => (
                      <SelectItem key={k} value={k}>{v}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Дата на подаване</p>
                <p className="text-sm font-medium">
                  {format(new Date(inquiry.created_at), "dd MMMM yyyy, HH:mm", { locale: bg })}
                </p>
              </div>
              {inquiry.referrer_source && (
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Източник на трафик</p>
                  <Badge variant="outline" className="gap-1">
                    <Globe className="h-3 w-3" />
                    {({ organic: "Органично", direct: "Директен", social: "Социални мрежи", referral: "Препращане", email: "Имейл" } as Record<string, string>)[inquiry.referrer_source] || inquiry.referrer_source}
                  </Badge>
                </div>
              )}
              {inquiry.device_type && (
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Устройство</p>
                  <Badge variant="outline" className="gap-1 capitalize">
                    <Smartphone className="h-3 w-3" /> {inquiry.device_type}
                  </Badge>
                </div>
              )}
            </div>
          </div>

          {/* Session recording deep-link */}
          {inquiry.session_id && (
            <a
              href={clarityImpressionUrl(inquiry.session_id)}
              target="_blank"
              rel="noreferrer"
              className="block"
            >
              <Button variant="outline" className="w-full" size="lg">
                <Video className="h-4 w-4 mr-2" />
                🎬 Виж запис в Clarity
              </Button>
            </a>
          )}

          <Link to={`/admin/inquiries/${id}/quote`}>
            <Button className="w-full" size="lg">
              <FileText className="h-4 w-4 mr-2" />
              Създай оферта
            </Button>
          </Link>

          <Link to={`/admin/inquiries/${id}/contract`}>
            <Button className="w-full mt-3" size="lg" variant="outline">
              <FileText className="h-4 w-4 mr-2" />
              Генерирай договор
            </Button>
          </Link>
        </div>
      </div>

      <SignContractDialog
        open={signDialogOpen}
        onOpenChange={setSignDialogOpen}
        inquiry={inquiry}
        contract={pendingContract}
        onSaved={(c) => {
          setInquiry({ ...inquiry, status: "contract_signed" });
          setPendingContract(c);
        }}
      />
    </div>
  );
};

export default InquiryDetailPage;
