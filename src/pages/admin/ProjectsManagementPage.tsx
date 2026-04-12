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
import { Plus, Pencil, Trash2, Upload, X, ArrowLeft, MapPin, Image } from "lucide-react";
import { Link } from "react-router-dom";

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
  title: "",
  location: "",
  date: new Date().getFullYear().toString(),
  category: "renovation",
  category_label: "Цялостна реконструкция",
  description: "",
  materials: "",
  image_urls: [] as string[],
  is_active: true,
  sort_order: 0,
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
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return data as Project[];
    },
  });

  const uploadImages = async (files: FileList): Promise<string[]> => {
    const urls: string[] = [];
    for (const file of Array.from(files)) {
      const ext = file.name.split(".").pop();
      const path = `${crypto.randomUUID()}.${ext}`;
      const { error } = await supabase.storage.from("project-images").upload(path, file);
      if (error) {
        toast.error(`Грешка при качване: ${file.name}`);
        continue;
      }
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
        title: values.title,
        location: values.location,
        date: values.date || null,
        category: values.category,
        category_label: values.category_label || null,
        description: values.description || null,
        materials: values.materials || null,
        image_urls: values.image_urls,
        is_active: values.is_active,
        sort_order: values.sort_order,
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

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setIsDialogOpen(false);
  };

  const openEdit = (p: Project) => {
    setEditingId(p.id);
    setForm({
      title: p.title,
      location: p.location,
      date: p.date || "",
      category: p.category,
      category_label: p.category_label || "",
      description: p.description || "",
      materials: p.materials || "",
      image_urls: p.image_urls || [],
      is_active: p.is_active,
      sort_order: p.sort_order,
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
    <div className="min-h-screen bg-secondary p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Link to="/admin">
            <Button variant="ghost" size="icon"><ArrowLeft className="w-5 h-5" /></Button>
          </Link>
          <h1 className="text-2xl font-bold text-foreground">Управление на проекти</h1>
          <Dialog open={isDialogOpen} onOpenChange={(o) => { if (!o) resetForm(); setIsDialogOpen(o); }}>
            <DialogTrigger asChild>
              <Button className="ml-auto"><Plus className="w-4 h-4 mr-2" />Добави проект</Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingId ? "Редактирай проект" : "Нов проект"}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label>Заглавие *</Label>
                  <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
                </div>
                <div>
                  <Label>Локация *</Label>
                  <Input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} required placeholder="кв. Аспарухово, Варна" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Категория</Label>
                    <Select value={form.category} onValueChange={handleCategoryChange}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {CATEGORIES.map(c => (
                          <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Година</Label>
                    <Input value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} placeholder="2024" />
                  </div>
                </div>
                <div>
                  <Label>Описание</Label>
                  <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} />
                </div>
                <div>
                  <Label>Материали</Label>
                  <Input value={form.materials} onChange={(e) => setForm({ ...form, materials: e.target.value })} placeholder="Tondach керемиди · Bauder мембрана" />
                </div>

                {/* Image Upload */}
                <div>
                  <Label>Снимки</Label>
                  <div className="mt-2">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={handleFileUpload}
                    />
                    <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()} disabled={uploading}>
                      <Upload className="w-4 h-4 mr-2" />
                      {uploading ? "Качване..." : "Качи снимки"}
                    </Button>
                  </div>
                  {form.image_urls.length > 0 && (
                    <div className="grid grid-cols-3 gap-2 mt-3">
                      {form.image_urls.map((url, i) => (
                        <div key={i} className="relative group">
                          <img src={url} alt="" className="w-full h-20 object-cover rounded-md" />
                          <button
                            type="button"
                            onClick={() => removeImage(i)}
                            className="absolute top-1 right-1 bg-destructive text-destructive-foreground rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Ред (sort order)</Label>
                    <Input type="number" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) })} />
                  </div>
                  <div className="flex items-end">
                    <div className="flex items-center gap-3">
                      <Switch checked={form.is_active} onCheckedChange={(c) => setForm({ ...form, is_active: c })} />
                      <Label>Активен (видим на сайта)</Label>
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

        {isLoading ? (
          <p className="text-muted-foreground">Зареждане...</p>
        ) : (
          <div className="space-y-3">
            {projects?.map((p) => (
              <Card key={p.id} className={`${!p.is_active ? "opacity-50" : ""}`}>
                <CardContent className="p-4 flex items-start gap-4">
                  <div className="w-20 h-14 rounded-md overflow-hidden shrink-0 bg-muted">
                    {p.image_urls?.[0] ? (
                      <img src={p.image_urls[0]} alt={p.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Image className="w-6 h-6 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-foreground">{p.title}</span>
                      {!p.is_active && <Badge variant="secondary">Скрит</Badge>}
                      <Badge variant="outline" className="text-xs">{p.category_label || p.category}</Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-3 h-3" /> {p.location}
                      {p.date && <span>· {p.date}</span>}
                      <span>· {p.image_urls?.length || 0} снимки</span>
                    </div>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <Button variant="ghost" size="icon" onClick={() => openEdit(p)}>
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => deleteMutation.mutate(p.id)}>
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
            {projects?.length === 0 && (
              <p className="text-center text-muted-foreground py-8">Няма добавени проекти. Натиснете "Добави проект" за да започнете.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectsManagementPage;
