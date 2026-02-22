import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Loader2, Save } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const platforms = [
  { value: "google", label: "Google Ads" },
  { value: "facebook", label: "Facebook / Instagram" },
  { value: "tiktok", label: "TikTok" },
  { value: "organic", label: "Органичен" },
  { value: "referral", label: "Референция" },
  { value: "other", label: "Друго" },
];

const CampaignEditorPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const isEdit = !!id && id !== "new";
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);

  const [name, setName] = useState("");
  const [platform, setPlatform] = useState("google");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [budget, setBudget] = useState("0");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (isEdit) fetchCampaign();
  }, [id]);

  const fetchCampaign = async () => {
    const { data } = await supabase.from("campaigns" as any).select("*").eq("id", id).single();
    if (data) {
      const c = data as any;
      setName(c.name);
      setPlatform(c.platform);
      setStartDate(c.start_date);
      setEndDate(c.end_date || "");
      setBudget(String(c.budget));
      setNotes(c.notes || "");
    }
    setLoading(false);
  };

  const handleSave = async () => {
    if (!name || !startDate) {
      toast({ title: "Моля попълнете име и начална дата", variant: "destructive" });
      return;
    }
    setSaving(true);
    const payload = {
      name,
      platform,
      start_date: startDate,
      end_date: endDate || null,
      budget: parseFloat(budget) || 0,
      notes: notes || null,
      created_by: user?.id,
    };

    if (isEdit) {
      await supabase.from("campaigns" as any).update(payload).eq("id", id);
      toast({ title: "Кампанията е обновена" });
    } else {
      await supabase.from("campaigns" as any).insert(payload);
      toast({ title: "Кампанията е създадена" });
    }
    setSaving(false);
    navigate("/admin/campaigns");
  };

  if (loading) {
    return <div className="flex items-center justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>;
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => navigate("/admin/campaigns")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold text-foreground">{isEdit ? "Редактиране" : "Нова кампания"}</h1>
      </div>

      <Card>
        <CardContent className="pt-6 space-y-4">
          <div className="space-y-2">
            <Label>Име на кампанията *</Label>
            <Input value={name} onChange={e => setName(e.target.value)} placeholder="напр. Google Ads - Покриви София" />
          </div>
          <div className="space-y-2">
            <Label>Платформа</Label>
            <Select value={platform} onValueChange={setPlatform}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {platforms.map(p => <SelectItem key={p.value} value={p.value}>{p.label}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Начална дата *</Label>
              <Input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Крайна дата</Label>
              <Input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Бюджет (лв)</Label>
            <Input type="number" min="0" step="0.01" value={budget} onChange={e => setBudget(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Бележки</Label>
            <Textarea value={notes} onChange={e => setNotes(e.target.value)} rows={3} />
          </div>
          <div className="flex gap-2 pt-2">
            <Button onClick={handleSave} disabled={saving}>
              {saving ? <Loader2 className="h-4 w-4 animate-spin mr-1" /> : <Save className="h-4 w-4 mr-1" />}
              {isEdit ? "Запази" : "Създай"}
            </Button>
            <Button variant="outline" onClick={() => navigate("/admin/campaigns")}>Отказ</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CampaignEditorPage;
