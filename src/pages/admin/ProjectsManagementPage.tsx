import { useState, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Upload, X, MapPin, Image, FolderOpen, Eye, EyeOff, ArrowUp, ArrowDown, Camera } from "lucide-react";

interface Project {
  id: string;
  title: string;
  location: string;
  date: string | null;
  category: string;
  category_label: string | null;
  description: string | null;
  materials: string | null;
  image_urls: string[];
  is_active: boolean;
  sort_order: number;
}

const CATEGORIES = [
  { value: "renovation", label: "Цялостна реконструкция" },
  { value: "waterproofing", label: "Хидроизолация" },
  { value: "tiles", label: "Подмяна на керемиди" },
  { value: "leak_repair", label: "Течащ покрив" },
  { value: "flat_roof", label: "Плосък покрив" },
  { value: "metal_roof", label: "Метален покрив" },
  { value: "new_roof", label: "Нов покрив" },
  { value: "maintenance", label: "Поддръжка" },
];

const emptyForm = {
  title: "", location: "", date: new Date().getFullYear().toString(),
  category: "renovation", category_label: "Цялостна реконструкция",
  description: "", materials: "", image_urls: [] as string[],
  is_active: true, sort_order: 0,
};

const ProjectsManagementPage = () => {
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data: projects, isLoading } = useQuery({
    queryKey: ["admin-projects"],
    queryFn: async () => {
      const { data, error } = await supabase.from("projects").select("*").order("sort_order", { ascending: true });
      if (error) throw error;
      return data as Project[];
    },
  });

  const activeCount = projects?.filter(p => p.is_active).length || 0;
  const hiddenCount = (projects?.length || 0) - activeCount;
  const withImages = projects?.filter(p => p.image_urls?.length > 0).length || 0;

  const uploadImages = async (files: FileList): Promise<string[]> => {
    const urls: string[] = [];
    for (const file of Array.from(files)) {
      const ext = file.name.split(".").pop();
      const path = `${crypto.randomUUID()}.${ext}`;
      const { error } = await supabase.storage.from("project-images").upload(path, file);
      if (error) { toast.error(`Грешка при качване: ${file.name}`); continue; }
      const { data: urlData } = supabase.storage.from("project-images").getPublicUrl(path);
      urls.push(urlData.publicUrl);
    }
    return urls;
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    setUploading(true);
    const newUrls = await uploadImages(e.target.files);
    setForm(prev => ({ ...prev, image_urls: [...prev.image_urls, ...newUrls] }));
    setUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeImage = (index: number) => {
    setForm(prev => ({ ...prev, image_urls: prev.image_urls.filter((_, i) => i !== index) }));
  };

  const upsertMutation = useMutation({
    mutationFn: async (values: typeof emptyForm & { id?: string }) => {
      const payload = {
        title: values.title, location: values.location, date: values.date || null,
        category: values.category, category_label: values.category_label || null,
        description: values.description || null, materials: values.materials || null,
        image_urls: values.image_urls, is_active: values.is_active, sort_order: values.sort_order,
      };
      if (values.id) {
        const { error } = await supabase.from("projects").update(payload).eq("id", values.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("projects").insert(payload);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-projects"] });
      toast.success(editingId ? "Проектът е обновен" : "Проектът е добавен");
      resetForm();
    },
    onError: () => toast.error("Грешка при запазване"),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("projects").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-projects"] });
      toast.success("Проектът е изтрит");
    },
  });

  const moveMutation = useMutation({
    mutationFn: async ({ id, direction }: { id: string; direction: "up" | "down" }) => {
      if (!projects) return;
      const idx = projects.findIndex(p => p.id === id);
      const swapIdx = direction === "up" ? idx - 1 : idx + 1;
      if (swapIdx < 0 || swapIdx >= projects.length) return;
      await Promise.all([
        supabase.from("projects").update({ sort_order: projects[swapIdx].sort_order }).eq("id", id),
        supabase.from("projects").update({ sort_order: projects[idx].sort_order }).eq("id", projects[swapIdx].id),
      ]);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-projects"] }),
  });

  const resetForm = () => { setForm(emptyForm); setEditingId(null); setIsDialogOpen(false); };

  const openEdit = (p: Project) => {
    setEditingId(p.id);
    setForm({
      title: p.title, location: p.location, date: p.date || "",
      category: p.category, category_label: p.category_label || "",
      description: p.description || "", materials: p.materials || "",
      image_urls: p.image_urls || [], is_active: p.is_active, sort_order: p.sort_order,
    });
    setIsDialogOpen(true);
  };

  const handleCategoryChange = (value: string) => {
    const cat = CATEGORIES.find(c => c.value === value);
    setForm(prev => ({ ...prev, category: value, category_label: cat?.label || value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    upsertMutation.mutate(editingId ? { ...form, id: editingId } : form);
  };

  return (
    <div className="space-y-6">
      {/* Hero header */}
      <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent rounded-2xl p-6 border border-primary/10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <FolderOpen className="h-6 w-6 text-primary" />
              Управление на проекти
            </h1>
            <p className="text-sm text-muted-foreground mt-1">Проектите се показват автоматично на сайта</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={(o) => { if (!o) resetForm(); setIsDialogOpen(o); }}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20">
                <Plus className="w-4 h-4 mr-2" />Добави проект
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingId ? "Редактирай проект" : "Нов проект"}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div><Label>Заглавие *</Label><Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required /></div>
                <div><Label>Локация *</Label><Input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} required placeholder="кв. Аспарухово, Варна" /></div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Категория</Label>
                    <Select value={form.category} onValueChange={handleCategoryChange}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>{CATEGORIES.map(c => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                  <div><Label>Година</Label><Input value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} placeholder="2024" /></div>
                </div>
                <div><Label>Описание</Label><Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} /></div>
                <div><Label>Материали</Label><Input value={form.materials} onChange={(e) => setForm({ ...form, materials: e.target.value })} placeholder="Tondach керемиди · Bauder мембрана" /></div>
                <div>
                  <Label>Снимки</Label>
                  <div className="mt-2">
                    <input ref={fileInputRef} type="file" accept="image/*" multiple className="hidden" onChange={handleFileUpload} />
                    <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()} disabled={uploading}>
                      <Upload className="w-4 h-4 mr-2" />{uploading ? "Качване..." : "Качи снимки"}
                    </Button>
                  </div>
                  {form.image_urls.length > 0 && (
                    <div className="grid grid-cols-3 gap-2 mt-3">
                      {form.image_urls.map((url, i) => (
                        <div key={i} className="relative group">
                          <img src={url} alt="" className="w-full h-20 object-cover rounded-md" />
                          <button type="button" onClick={() => removeImage(i)} className="absolute top-1 right-1 bg-destructive text-destructive-foreground rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div><Label>Ред (sort order)</Label><Input type="number" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) })} /></div>
                  <div className="flex items-end">
                    <div className="flex items-center gap-3">
                      <Switch checked={form.is_active} onCheckedChange={(c) => setForm({ ...form, is_active: c })} />
                      <Label>Активен</Label>
                    </div>
                  </div>
                </div>
                <Button type="submit" className="w-full" disabled={upsertMutation.isPending}>
                  {editingId ? "Запази промени" : "Добави проект"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3 mt-5">
          <div className="bg-card rounded-xl p-4 border border-border/50 shadow-sm">
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
              <FolderOpen className="h-3.5 w-3.5 text-primary" /> Общо проекти
            </div>
            <p className="text-2xl font-bold text-foreground">{projects?.length || 0}</p>
          </div>
          <div className="bg-card rounded-xl p-4 border border-border/50 shadow-sm">
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
              <Eye className="h-3.5 w-3.5 text-green-500" /> Активни
            </div>
            <p className="text-2xl font-bold text-green-600">{activeCount}</p>
          </div>
          <div className="bg-card rounded-xl p-4 border border-border/50 shadow-sm">
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
              <Camera className="h-3.5 w-3.5 text-blue-500" /> Със снимки
            </div>
            <p className="text-2xl font-bold text-blue-600">{withImages}</p>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" /></div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects?.map((p, idx) => (
            <Card key={p.id} className={`group overflow-hidden hover:shadow-lg transition-all duration-300 border-border/50 ${!p.is_active ? "opacity-60" : ""}`}>
              {/* Image */}
              <div className="relative aspect-video bg-muted overflow-hidden">
                {p.image_urls?.[0] ? (
                  <img src={p.image_urls[0]} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground gap-1">
                    <Image className="w-8 h-8" />
                    <span className="text-xs">Няма снимка</span>
                  </div>
                )}
                {/* Overlay buttons */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                  <Button size="sm" variant="secondary" className="h-8 shadow-lg" onClick={() => openEdit(p)}>
                    <Pencil className="w-3 h-3 mr-1" /> Редактирай
                  </Button>
                  <Button size="sm" variant="destructive" className="h-8 shadow-lg" onClick={() => { if (confirm("Изтриване на проекта?")) deleteMutation.mutate(p.id); }}>
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
                {/* Status badges */}
                <div className="absolute top-2 left-2 flex gap-1.5">
                  <Badge className={`text-[10px] ${p.is_active ? "bg-green-500/90 hover:bg-green-500" : "bg-muted-foreground/70"}`}>
                    {p.is_active ? "Активен" : "Скрит"}
                  </Badge>
                  <Badge variant="outline" className="bg-card/80 backdrop-blur text-[10px]">
                    {p.category_label || p.category}
                  </Badge>
                </div>
                {/* Image count */}
                {p.image_urls?.length > 0 && (
                  <span className="absolute top-2 right-2 bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded flex items-center gap-1">
                    <Camera className="w-3 h-3" /> {p.image_urls.length}
                  </span>
                )}
              </div>
              <CardContent className="p-4">
                <h3 className="font-bold text-foreground text-sm mb-1 line-clamp-1">{p.title}</h3>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-2">
                  <MapPin className="w-3 h-3" /> {p.location}
                  {p.date && <span>· {p.date}</span>}
                </div>
                {p.description && (
                  <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{p.description}</p>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-muted-foreground">Ред: {p.sort_order}</span>
                  <div className="flex gap-0.5">
                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => moveMutation.mutate({ id: p.id, direction: "up" })} disabled={idx === 0}>
                      <ArrowUp className="w-3 h-3" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => moveMutation.mutate({ id: p.id, direction: "down" })} disabled={idx === (projects?.length || 0) - 1}>
                      <ArrowDown className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          {projects?.length === 0 && (
            <p className="text-center text-muted-foreground py-8 col-span-full">Няма добавени проекти.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ProjectsManagementPage;
