import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Send, Users } from "lucide-react";

const SEGMENTS = [
  { value: "all", label: "Всички с email consent" },
  { value: "quote_sent", label: "Изпратили запитване за оферта" },
  { value: "new_30d", label: "Нови клиенти (последните 30 дни)" },
  { value: "repair", label: "Услуга: Ремонт на покрив" },
  { value: "waterproofing", label: "Услуга: Хидроизолация" },
  { value: "new_construction", label: "Услуга: Нов покрив" },
  { value: "maintenance", label: "Услуга: Поддръжка" },
  { value: "flat_roof", label: "Услуга: Плосък покрив" },
  { value: "metal_roof", label: "Услуга: Метален покрив" },
  { value: "tiles", label: "Услуга: Керемиди" },
  { value: "leak_repair", label: "Услуга: Течове" },
];

const EmailCampaignEditorPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isNew = !id || id === "new";

  const [form, setForm] = useState({
    name: "", subject: "", body_html: "", segment: "all",
  });
  const [saving, setSaving] = useState(false);
  const [sending, setSending] = useState(false);
  const [recipientCount, setRecipientCount] = useState<number | null>(null);
  const [countLoading, setCountLoading] = useState(false);

  useEffect(() => {
    if (!isNew) {
      supabase.from("email_campaigns").select("*").eq("id", id).single()
        .then(({ data }) => {
          if (data) {
            setForm({
              name: data.name, subject: data.subject,
              body_html: data.body_html, segment: (data.segment_filter as any)?.type || "all",
            });
          }
        });
    }
  }, [id, isNew]);

  // Count recipients when segment changes
  useEffect(() => {
    const countRecipients = async () => {
      setCountLoading(true);
      let query = supabase.from("inquiries").select("id", { count: "exact", head: true }).eq("email_consent", true);

      if (form.segment === "quote_sent") {
        query = query.in("status", ["quote_sent", "accepted"]);
      } else if (form.segment === "new_30d") {
        const d30 = new Date();
        d30.setDate(d30.getDate() - 30);
        query = query.gte("created_at", d30.toISOString());
      } else if (!["all"].includes(form.segment)) {
        query = query.eq("service_type", form.segment as any);
      }

      const { count } = await query;
      setRecipientCount(count || 0);
      setCountLoading(false);
    };
    countRecipients();
  }, [form.segment]);

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    const payload = {
      name: form.name, subject: form.subject, body_html: form.body_html,
      segment_filter: { type: form.segment },
      created_by: user.id,
    };

    if (isNew) {
      const { error } = await supabase.from("email_campaigns").insert(payload);
      if (error) toast({ title: "Грешка", description: error.message, variant: "destructive" });
      else { toast({ title: "Кампанията е запазена" }); navigate("/admin/email-campaigns"); }
    } else {
      const { error } = await supabase.from("email_campaigns").update(payload).eq("id", id);
      if (error) toast({ title: "Грешка", description: error.message, variant: "destructive" });
      else toast({ title: "Обновено" });
    }
    setSaving(false);
  };

  const handleSend = async () => {
    if (!confirm(`Ще изпратите имейл до ${recipientCount} получатели. Продължавате?`)) return;
    setSending(true);
    const { error } = await supabase.functions.invoke("send-email-campaign", {
      body: { campaign_id: id },
    });
    if (error) toast({ title: "Грешка при изпращане", description: error.message, variant: "destructive" });
    else toast({ title: "Кампанията е изпратена!" });
    setSending(false);
  };

  return (
    <div>
      <Button variant="ghost" onClick={() => navigate("/admin/email-campaigns")} className="mb-4">
        <ArrowLeft className="h-4 w-4 mr-2" /> Назад
      </Button>
      <h1 className="text-2xl font-bold text-foreground mb-6">{isNew ? "Нова имейл кампания" : "Редактиране"}</h1>

      <div className="bg-card rounded-xl border border-border p-6 space-y-4 max-w-3xl">
        <div><Label>Име на кампанията</Label><Input value={form.name} onChange={e => setForm({...form, name: e.target.value})} /></div>
        <div><Label>Тема (Subject)</Label><Input value={form.subject} onChange={e => setForm({...form, subject: e.target.value})} /></div>
        <div>
          <Label>Сегмент</Label>
          <Select value={form.segment} onValueChange={v => setForm({...form, segment: v})}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {SEGMENTS.map(s => (
                <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex items-center gap-1.5 mt-1.5 text-xs text-muted-foreground">
            <Users className="h-3 w-3" />
            {countLoading ? "Зареждане..." : `${recipientCount ?? 0} получатели`}
          </div>
        </div>
        <div>
          <Label>Съдържание (HTML)</Label>
          <p className="text-xs text-muted-foreground mb-1">Използвайте {"{{name}}"} за персонализация</p>
          <Textarea value={form.body_html} onChange={e => setForm({...form, body_html: e.target.value})} rows={12} className="font-mono text-sm" />
        </div>
        <div className="flex gap-3">
          <Button onClick={handleSave} disabled={saving}>{saving ? "Запазване..." : "Запази"}</Button>
          {!isNew && (
            <Button variant="outline" onClick={handleSend} disabled={sending}>
              <Send className="h-4 w-4 mr-2" /> {sending ? "Изпращане..." : "Изпрати"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmailCampaignEditorPage;
