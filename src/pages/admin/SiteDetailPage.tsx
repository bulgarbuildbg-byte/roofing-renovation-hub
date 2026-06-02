import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Save, Upload, Download, Trash2, Plus, FileText, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { format } from "date-fns";
import { bg } from "date-fns/locale";
import MultiServiceSelect from "@/components/admin/MultiServiceSelect";
import {
  PROJECT_SITE_STATUS_LABELS,
  PROJECT_DOC_CATEGORIES,
} from "@/lib/serviceCategories";

const SiteDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [site, setSite] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [docs, setDocs] = useState<any[]>([]);
  const [timeline, setTimeline] = useState<any[]>([]);

  // form
  const [form, setForm] = useState<any>({});

  // upload
  const [uploadCategory, setUploadCategory] = useState("contracts");
  const [uploading, setUploading] = useState(false);

  // new timeline event
  const [newEvent, setNewEvent] = useState("");

  const load = async () => {
    setLoading(true);
    const [{ data: s }, { data: d }, { data: t }] = await Promise.all([
      supabase.from("project_sites").select("*").eq("id", id).single(),
      supabase.from("project_documents").select("*").eq("project_site_id", id).order("uploaded_at", { ascending: false }),
      supabase.from("project_timeline").select("*").eq("project_site_id", id).order("event_date", { ascending: false }),
    ]);
    setSite(s);
    setForm(s || {});
    setDocs(d || []);
    setTimeline(t || []);
    setLoading(false);
  };

  useEffect(() => { load(); }, [id]);

  const save = async () => {
    setSaving(true);
    const update = {
      client_name: form.client_name,
      client_phone: form.client_phone,
      client_email: form.client_email,
      address: form.address,
      city: form.city,
      service_categories: form.service_categories || [],
      contract_value: Number(form.contract_value || 0),
      signed_date: form.signed_date || null,
      expected_start_date: form.expected_start_date || null,
      expected_end_date: form.expected_end_date || null,
      status: form.status,
      notes: form.notes,
    };
    const { error } = await supabase.from("project_sites").update(update).eq("id", id);
    setSaving(false);
    if (error) {
      toast({ title: "Грешка", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Запазено" });
    load();
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;
    setUploading(true);
    const path = `${id}/${Date.now()}-${file.name}`;
    const { error: upErr } = await supabase.storage.from("project-documents").upload(path, file);
    if (upErr) {
      setUploading(false);
      toast({ title: "Грешка при качване", description: upErr.message, variant: "destructive" });
      return;
    }
    const { error: dbErr } = await supabase.from("project_documents").insert({
      project_site_id: id!,
      category: uploadCategory as any,
      file_name: file.name,
      file_url: path,
      file_size: file.size,
      uploaded_by: user.id,
    });
    setUploading(false);
    e.target.value = "";
    if (dbErr) {
      toast({ title: "Грешка", description: dbErr.message, variant: "destructive" });
      return;
    }
    toast({ title: "Файлът е качен" });
    load();
  };

  const downloadDoc = async (doc: any) => {
    const { data, error } = await supabase.storage.from("project-documents").createSignedUrl(doc.file_url, 60);
    if (error) {
      toast({ title: "Грешка", description: error.message, variant: "destructive" });
      return;
    }
    window.open(data.signedUrl, "_blank");
  };

  const deleteDoc = async (doc: any) => {
    if (!confirm("Изтриване на файла?")) return;
    await supabase.storage.from("project-documents").remove([doc.file_url]);
    await supabase.from("project_documents").delete().eq("id", doc.id);
    load();
  };

  const addEvent = async () => {
    if (!newEvent.trim() || !user) return;
    await supabase.from("project_timeline").insert({
      project_site_id: id!,
      event_type: "note",
      description: newEvent.trim(),
      created_by: user.id,
    });
    setNewEvent("");
    load();
  };

  if (loading) return <div className="text-center py-12"><Loader2 className="h-6 w-6 animate-spin mx-auto" /></div>;
  if (!site) return <div className="text-center py-12 text-muted-foreground">Обектът не е намерен.</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => navigate("/admin/sites")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-foreground">{site.client_name}</h1>
          <p className="text-sm text-muted-foreground">{site.address}</p>
        </div>
        <Badge variant="outline">{PROJECT_SITE_STATUS_LABELS[site.status]}</Badge>
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Преглед</TabsTrigger>
          <TabsTrigger value="documents">Документи ({docs.length})</TabsTrigger>
          <TabsTrigger value="timeline">Хронология ({timeline.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="bg-card border border-border rounded-xl p-6 space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label>Име на клиента</Label>
                <Input value={form.client_name || ""} onChange={(e) => setForm({ ...form, client_name: e.target.value })} />
              </div>
              <div>
                <Label>Телефон</Label>
                <Input value={form.client_phone || ""} onChange={(e) => setForm({ ...form, client_phone: e.target.value })} />
              </div>
              <div>
                <Label>Имейл</Label>
                <Input value={form.client_email || ""} onChange={(e) => setForm({ ...form, client_email: e.target.value })} />
              </div>
              <div>
                <Label>Град</Label>
                <Input value={form.city || ""} onChange={(e) => setForm({ ...form, city: e.target.value })} />
              </div>
              <div className="sm:col-span-2">
                <Label>Адрес на обекта</Label>
                <Input value={form.address || ""} onChange={(e) => setForm({ ...form, address: e.target.value })} />
              </div>
              <div className="sm:col-span-2">
                <Label>Категории услуги</Label>
                <MultiServiceSelect
                  value={form.service_categories || []}
                  onChange={(v) => setForm({ ...form, service_categories: v })}
                />
              </div>
              <div>
                <Label>Стойност на договора (€)</Label>
                <Input type="number" value={form.contract_value || ""} onChange={(e) => setForm({ ...form, contract_value: e.target.value })} />
              </div>
              <div>
                <Label>Статус на обекта</Label>
                <Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {Object.entries(PROJECT_SITE_STATUS_LABELS).map(([k, v]) => (
                      <SelectItem key={k} value={k}>{v}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Дата на подписване</Label>
                <Input type="date" value={form.signed_date || ""} onChange={(e) => setForm({ ...form, signed_date: e.target.value })} />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label>Старт</Label>
                  <Input type="date" value={form.expected_start_date || ""} onChange={(e) => setForm({ ...form, expected_start_date: e.target.value })} />
                </div>
                <div>
                  <Label>Край</Label>
                  <Input type="date" value={form.expected_end_date || ""} onChange={(e) => setForm({ ...form, expected_end_date: e.target.value })} />
                </div>
              </div>
              <div className="sm:col-span-2">
                <Label>Бележки</Label>
                <Textarea rows={4} value={form.notes || ""} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
              </div>
            </div>
            <Button onClick={save} disabled={saving}>
              {saving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
              Запази
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="documents" className="space-y-4">
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex flex-wrap items-end gap-3 mb-6">
              <div className="flex-1 min-w-[180px]">
                <Label>Категория</Label>
                <Select value={uploadCategory} onValueChange={setUploadCategory}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {PROJECT_DOC_CATEGORIES.map((c) => (
                      <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button asChild disabled={uploading}>
                <label className="cursor-pointer">
                  {uploading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Upload className="h-4 w-4 mr-2" />}
                  Качи файл
                  <input type="file" className="hidden" onChange={handleUpload} disabled={uploading} />
                </label>
              </Button>
            </div>

            {PROJECT_DOC_CATEGORIES.map((cat) => {
              const items = docs.filter((d) => d.category === cat.value);
              if (items.length === 0) return null;
              return (
                <div key={cat.value} className="mb-4">
                  <p className="text-sm font-semibold text-muted-foreground mb-2">{cat.label}</p>
                  <div className="space-y-1.5">
                    {items.map((d) => (
                      <div key={d.id} className="flex items-center gap-2 p-2 rounded border border-border text-sm">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <span className="flex-1 truncate">{d.file_name}</span>
                        <span className="text-xs text-muted-foreground">
                          {format(new Date(d.uploaded_at), "dd.MM.yyyy", { locale: bg })}
                        </span>
                        <Button variant="ghost" size="icon" onClick={() => downloadDoc(d)}>
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => deleteDoc(d)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
            {docs.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-6">Няма качени документи.</p>
            )}
          </div>
        </TabsContent>

        <TabsContent value="timeline" className="space-y-4">
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex gap-2 mb-6">
              <Input
                placeholder="Опишете събитие (напр. 'Започнат обект', 'Доставени материали')..."
                value={newEvent}
                onChange={(e) => setNewEvent(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addEvent()}
              />
              <Button onClick={addEvent}>
                <Plus className="h-4 w-4 mr-1" /> Добави
              </Button>
            </div>

            {timeline.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-6">Все още няма събития.</p>
            ) : (
              <div className="space-y-3">
                {timeline.map((t) => (
                  <div key={t.id} className="flex gap-3 pb-3 border-b border-border last:border-0">
                    <div className="text-xs text-muted-foreground whitespace-nowrap pt-1 w-24">
                      {format(new Date(t.event_date), "dd.MM.yyyy HH:mm", { locale: bg })}
                    </div>
                    <div className="flex-1 text-sm">{t.description}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SiteDetailPage;
