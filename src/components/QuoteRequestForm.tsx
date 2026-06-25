import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { trackEvent, getSessionId, getFirstReferrerSource } from "@/lib/analytics";
import { Upload, X, Loader2, Send } from "lucide-react";

const SERVICE_OPTIONS = [
  { value: "tiles", label: "Ремонт на керемиден покрив" },
  { value: "repair", label: "Пренареждане на керемиди" },
  { value: "waterproofing", label: "Хидроизолация на покрив" },
  { value: "leak_repair", label: "Ремонт на теч" },
  { value: "new_construction", label: "Нов покрив" },
  { value: "maintenance", label: "Подмяна на улуци" },
  { value: "other", label: "Друго" },
];

const QuoteRequestForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { lang } = useParams<{ lang: string }>();
  const currentLang = lang || "bg";

  const [submitting, setSubmitting] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    city: "Варна",
    service_type: "",
    description: "",
  });

  const update = (field: string, value: string) => setForm((p) => ({ ...p, [field]: value }));

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setFiles((p) => [...p, ...Array.from(e.target.files!)]);
  };
  const removeFile = (i: number) => setFiles((p) => p.filter((_, idx) => idx !== i));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) {
      toast({ title: "Моля попълнете име и телефон", variant: "destructive" });
      return;
    }
    setSubmitting(true);

    const { data: inquiry, error } = await supabase
      .from("inquiries")
      .insert({
        name: form.name,
        phone: form.phone,
        email: form.email || `noemail+${Date.now()}@quote.local`,
        address: form.city || null,
        service_type: (form.service_type as any) || "other",
        description: form.description || null,
        session_id: getSessionId(),
        referrer_source: getFirstReferrerSource(),
        device_type: (typeof window !== "undefined" && window.innerWidth < 768) ? "mobile" : (window.innerWidth < 1024 ? "tablet" : "desktop"),
      } as any)
      .select()
      .single();

    if (error || !inquiry) {
      toast({ title: "Грешка", description: "Моля, опитайте отново.", variant: "destructive" });
      setSubmitting(false);
      return;
    }

    for (const file of files) {
      const path = `${inquiry.id}/${Date.now()}_${file.name}`;
      const { data: uploaded } = await supabase.storage.from("inquiry-attachments").upload(path, file);
      if (uploaded) {
        const { data: urlData } = supabase.storage.from("inquiry-attachments").getPublicUrl(uploaded.path);
        await supabase.from("inquiry_files").insert({
          inquiry_id: inquiry.id,
          file_url: urlData.publicUrl,
          file_name: file.name,
          file_type: file.type,
        });
      }
    }

    try {
      await supabase.from("call_log" as any).insert({
        client_name: form.name,
        client_phone: form.phone,
        client_email: form.email || null,
        call_direction: "inbound",
        notes: "Автоматично от страница „Заявете оферта“",
        inquiry_id: inquiry.id,
        created_by: "00000000-0000-0000-0000-000000000000",
      });
    } catch {}

    trackEvent("form_submit", "quote_request_page");
    setSubmitting(false);
    navigate(`/${currentLang}/blagodarim-vi`);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-card rounded-2xl p-6 md:p-8 shadow-xl border border-border space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="qr-name">Име *</Label>
          <Input id="qr-name" value={form.name} onChange={(e) => update("name", e.target.value)} required className="h-12" placeholder="Иван Иванов" />
        </div>
        <div>
          <Label htmlFor="qr-phone">Телефон *</Label>
          <Input id="qr-phone" type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} required className="h-12" placeholder="088 123 4567" />
        </div>
        <div>
          <Label htmlFor="qr-email">Имейл (по желание)</Label>
          <Input id="qr-email" type="email" value={form.email} onChange={(e) => update("email", e.target.value)} className="h-12" placeholder="ivan@example.com" />
        </div>
        <div>
          <Label htmlFor="qr-city">Град / населено място</Label>
          <Input id="qr-city" value={form.city} onChange={(e) => update("city", e.target.value)} className="h-12" placeholder="Варна" />
        </div>
      </div>

      <div>
        <Label>Вид услуга</Label>
        <Select value={form.service_type} onValueChange={(v) => update("service_type", v)}>
          <SelectTrigger className="h-12"><SelectValue placeholder="Изберете услуга" /></SelectTrigger>
          <SelectContent>
            {SERVICE_OPTIONS.map((o) => (
              <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="qr-desc">Кратко описание на проблема</Label>
        <Textarea id="qr-desc" value={form.description} onChange={(e) => update("description", e.target.value)} rows={4} placeholder="Опишете накратко какво се нуждае от ремонт..." />
      </div>

      <div>
        <Label>Качване на снимки (по желание)</Label>
        <label htmlFor="qr-files" className="mt-1 flex items-center justify-center gap-2 h-24 rounded-md border-2 border-dashed border-border bg-muted/30 cursor-pointer hover:bg-muted/50 transition-colors">
          <Upload className="w-5 h-5 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Добавете снимки на покрива</span>
          <input id="qr-files" type="file" accept="image/*" multiple onChange={handleFiles} className="hidden" />
        </label>
        {files.length > 0 && (
          <ul className="mt-2 space-y-1">
            {files.map((f, i) => (
              <li key={i} className="flex items-center justify-between text-sm bg-muted/30 rounded px-3 py-1.5">
                <span className="truncate">{f.name}</span>
                <button type="button" onClick={() => removeFile(i)} className="text-muted-foreground hover:text-destructive"><X className="w-4 h-4" /></button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <Button type="submit" disabled={submitting} className="w-full h-14 text-base font-bold bg-primary hover:bg-primary/90">
        {submitting ? <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Изпращане...</> : <><Send className="w-5 h-5 mr-2" /> Изпрати запитване</>}
      </Button>

      <p className="text-sm text-muted-foreground text-center">
        След изпращане на запитването наш представител ще се свърже с Вас за уточнение. При нужда ще насрочим оглед на място.
      </p>
    </form>
  );
};

export default QuoteRequestForm;
