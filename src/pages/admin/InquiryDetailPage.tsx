import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, FileText, Download, Phone, Mail, MapPin, Ruler, Layers, Box } from "lucide-react";
import { format } from "date-fns";
import { bg } from "date-fns/locale";
import { useToast } from "@/hooks/use-toast";

const statusLabels: Record<string, string> = {
  new: "Ново", contacted: "Свързани", quote_sent: "Оферта изпратена", accepted: "Прието", rejected: "Отказано",
};
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
  const [inquiry, setInquiry] = useState<any>(null);
  const [files, setFiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const [{ data: inq }, { data: f }] = await Promise.all([
        supabase.from("inquiries").select("*").eq("id", id).single(),
        supabase.from("inquiry_files").select("*").eq("inquiry_id", id),
      ]);
      setInquiry(inq);
      setFiles(f || []);
      setLoading(false);
    };
    fetch();
  }, [id]);

  const updateStatus = async (status: "new" | "contacted" | "quote_sent" | "accepted" | "rejected") => {
    await supabase.from("inquiries").update({ status }).eq("id", id);
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
            </div>
          </div>

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
    </div>
  );
};

export default InquiryDetailPage;
