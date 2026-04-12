import { useState, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Star, BadgeCheck, Upload, Eye, EyeOff, ArrowUp, ArrowDown } from "lucide-react";

interface Testimonial {
  id: string;
  author_name: string;
  location: string;
  text: string;
  rating: number;
  avatar_url: string | null;
  service_type: string | null;
  review_date: string | null;
  is_verified: boolean;
  consent_received: boolean;
  is_active: boolean;
  sort_order: number;
}

const emptyForm = {
  author_name: "", location: "", text: "", rating: 5,
  avatar_url: "", service_type: "",
  review_date: new Date().toISOString().split("T")[0],
  is_verified: false, consent_received: false, is_active: true, sort_order: 0,
};

const TestimonialsManagementPage = () => {
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    setUploading(true);
    const file = e.target.files[0];
    const ext = file.name.split(".").pop();
    const path = `${crypto.randomUUID()}.${ext}`;
    const { error } = await supabase.storage.from("testimonial-avatars").upload(path, file);
    if (error) { toast.error("Грешка при качване"); setUploading(false); return; }
    const { data: urlData } = supabase.storage.from("testimonial-avatars").getPublicUrl(path);
    setForm(prev => ({ ...prev, avatar_url: urlData.publicUrl }));
    setUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const { data: testimonials, isLoading } = useQuery({
    queryKey: ["admin-testimonials"],
    queryFn: async () => {
      const { data, error } = await supabase.from("testimonials").select("*").order("sort_order", { ascending: true });
      if (error) throw error;
      return data as Testimonial[];
    },
  });

  const activeCount = testimonials?.filter(t => t.is_active).length || 0;
  const hiddenCount = (testimonials?.length || 0) - activeCount;
  const avgRating = testimonials && testimonials.length > 0
    ? (testimonials.reduce((s, t) => s + t.rating, 0) / testimonials.length).toFixed(1)
    : "0";

  const upsertMutation = useMutation({
    mutationFn: async (values: typeof emptyForm & { id?: string }) => {
      const payload = {
        author_name: values.author_name, location: values.location, text: values.text,
        rating: values.rating, avatar_url: values.avatar_url || null,
        service_type: values.service_type || null, review_date: values.review_date || null,
        is_verified: values.is_verified, consent_received: values.consent_received,
        is_active: values.is_active, sort_order: values.sort_order,
      };
      if (values.id) {
        const { error } = await supabase.from("testimonials").update(payload).eq("id", values.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("testimonials").insert(payload);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-testimonials"] });
      toast.success(editingId ? "Отзивът е обновен" : "Отзивът е добавен");
      resetForm();
    },
    onError: () => toast.error("Грешка при запазване"),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("testimonials").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-testimonials"] });
      toast.success("Отзивът е изтрит");
    },
  });

  const moveMutation = useMutation({
    mutationFn: async ({ id, direction }: { id: string; direction: "up" | "down" }) => {
      if (!testimonials) return;
      const idx = testimonials.findIndex(t => t.id === id);
      const swapIdx = direction === "up" ? idx - 1 : idx + 1;
      if (swapIdx < 0 || swapIdx >= testimonials.length) return;
      await Promise.all([
        supabase.from("testimonials").update({ sort_order: testimonials[swapIdx].sort_order }).eq("id", id),
        supabase.from("testimonials").update({ sort_order: testimonials[idx].sort_order }).eq("id", testimonials[swapIdx].id),
      ]);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-testimonials"] }),
  });

  const resetForm = () => { setForm(emptyForm); setEditingId(null); setIsDialogOpen(false); };

  const openEdit = (t: Testimonial) => {
    setEditingId(t.id);
    setForm({
      author_name: t.author_name, location: t.location, text: t.text,
      rating: t.rating, avatar_url: t.avatar_url || "",
      service_type: t.service_type || "", review_date: t.review_date || "",
      is_verified: t.is_verified, consent_received: t.consent_received,
      is_active: t.is_active, sort_order: t.sort_order,
    });
    setIsDialogOpen(true);
  };

  const getInitials = (name: string) => name.split(" ").map(n => n[0]).join(".").toUpperCase();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    upsertMutation.mutate(editingId ? { ...form, id: editingId } : form);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Управление на отзиви</h1>
          <p className="text-sm text-muted-foreground">Отзивите се показват автоматично на сайта</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={(o) => { if (!o) resetForm(); setIsDialogOpen(o); }}>
          <DialogTrigger asChild>
            <Button><Plus className="w-4 h-4 mr-2" />Добави отзив</Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader><DialogTitle>{editingId ? "Редактирай отзив" : "Нов отзив"}</DialogTitle></DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div><Label>Име на клиент *</Label><Input value={form.author_name} onChange={(e) => setForm({ ...form, author_name: e.target.value })} required /></div>
              <div><Label>Локация *</Label><Input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} required placeholder="кв. Левски, Варна" /></div>
              <div><Label>Текст на отзива *</Label><Textarea value={form.text} onChange={(e) => setForm({ ...form, text: e.target.value })} required rows={4} /></div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Рейтинг</Label>
                  <Select value={String(form.rating)} onValueChange={(v) => setForm({ ...form, rating: Number(v) })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>{[5, 4, 3, 2, 1].map(r => <SelectItem key={r} value={String(r)}>{r} ★</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div><Label>Ред (sort order)</Label><Input type="number" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) })} /></div>
              </div>
              <div>
                <Label>Снимка (аватар)</Label>
                <div className="flex items-center gap-3 mt-1">
                  {form.avatar_url && (
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={form.avatar_url} />
                      <AvatarFallback>{form.author_name?.[0] || "?"}</AvatarFallback>
                    </Avatar>
                  )}
                  <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} />
                  <Button type="button" variant="outline" size="sm" onClick={() => fileInputRef.current?.click()} disabled={uploading}>
                    <Upload className="w-4 h-4 mr-2" />{uploading ? "Качване..." : "Качи снимка"}
                  </Button>
                </div>
                <Input value={form.avatar_url} onChange={(e) => setForm({ ...form, avatar_url: e.target.value })} placeholder="или въведи URL" className="mt-2" />
              </div>
              <div>
                <Label>Тип услуга</Label>
                <Select value={form.service_type} onValueChange={(v) => setForm({ ...form, service_type: v })}>
                  <SelectTrigger><SelectValue placeholder="Изберете..." /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="repair">Ремонт</SelectItem>
                    <SelectItem value="waterproofing">Хидроизолация</SelectItem>
                    <SelectItem value="new_roof">Нов покрив</SelectItem>
                    <SelectItem value="tiles">Керемиди</SelectItem>
                    <SelectItem value="flat_roof">Плосък покрив</SelectItem>
                    <SelectItem value="metal_roof">Метален покрив</SelectItem>
                    <SelectItem value="maintenance">Поддръжка</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div><Label>Дата</Label><Input type="date" value={form.review_date} onChange={(e) => setForm({ ...form, review_date: e.target.value })} /></div>
              <div className="space-y-3">
                <div className="flex items-center gap-3"><Switch checked={form.is_verified} onCheckedChange={(c) => setForm({ ...form, is_verified: c })} /><Label>Верифициран клиент</Label></div>
                <div className="flex items-center gap-3"><Switch checked={form.consent_received} onCheckedChange={(c) => setForm({ ...form, consent_received: c })} /><Label>Получено съгласие</Label></div>
                <div className="flex items-center gap-3"><Switch checked={form.is_active} onCheckedChange={(c) => setForm({ ...form, is_active: c })} /><Label>Активен (видим на сайта)</Label></div>
              </div>
              <Button type="submit" className="w-full" disabled={upsertMutation.isPending}>
                {editingId ? "Запази промени" : "Добави отзив"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-1"><CardTitle className="text-xs font-medium text-muted-foreground flex items-center gap-1.5"><Star className="h-3.5 w-3.5 text-accent" /> Общо</CardTitle></CardHeader>
          <CardContent><p className="text-3xl font-bold">{testimonials?.length || 0}</p></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-1"><CardTitle className="text-xs font-medium text-muted-foreground flex items-center gap-1.5"><Eye className="h-3.5 w-3.5 text-green-500" /> Активни</CardTitle></CardHeader>
          <CardContent><p className="text-3xl font-bold">{activeCount}</p></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-1"><CardTitle className="text-xs font-medium text-muted-foreground flex items-center gap-1.5"><EyeOff className="h-3.5 w-3.5 text-muted-foreground" /> Скрити</CardTitle></CardHeader>
          <CardContent><p className="text-3xl font-bold">{hiddenCount}</p></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-1"><CardTitle className="text-xs font-medium text-muted-foreground flex items-center gap-1.5"><Star className="h-3.5 w-3.5 text-amber-500" /> Ср. рейтинг</CardTitle></CardHeader>
          <CardContent><p className="text-3xl font-bold">{avgRating}</p></CardContent>
        </Card>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" /></div>
      ) : (
        <div className="space-y-3">
          {testimonials?.map((t, idx) => (
            <Card key={t.id} className={`group hover:shadow-md transition-shadow ${!t.is_active ? "opacity-60" : ""}`}>
              <CardContent className="p-4 flex items-start gap-4">
                <Avatar className="h-12 w-12 shrink-0">
                  {t.avatar_url ? <AvatarImage src={t.avatar_url} alt={t.author_name} /> : null}
                  <AvatarFallback className="bg-primary/10 text-primary font-bold">{getInitials(t.author_name)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="font-bold text-foreground">{t.author_name}</span>
                    {t.is_verified && <BadgeCheck className="w-4 h-4 text-accent" />}
                    {!t.is_active && <Badge variant="secondary">Скрит</Badge>}
                    {!t.consent_received && <Badge variant="destructive" className="text-xs">Без съгласие</Badge>}
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">{t.location}</p>
                  <div className="flex gap-0.5 mb-1">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-accent text-accent" />
                    ))}
                  </div>
                  <p className="text-sm text-foreground line-clamp-2">"{t.text}"</p>
                </div>
                <div className="flex gap-1 shrink-0">
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => moveMutation.mutate({ id: t.id, direction: "up" })} disabled={idx === 0}>
                    <ArrowUp className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => moveMutation.mutate({ id: t.id, direction: "down" })} disabled={idx === (testimonials?.length || 0) - 1}>
                    <ArrowDown className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEdit(t)}>
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => { if (confirm("Изтриване на отзива?")) deleteMutation.mutate(t.id); }}>
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default TestimonialsManagementPage;
