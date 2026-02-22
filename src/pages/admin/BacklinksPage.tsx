import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2, Link2, ExternalLink, TrendingUp } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const BacklinksPage = () => {
  const { toast } = useToast();
  const [backlinks, setBacklinks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    url: "", anchor_text: "", referring_domain: "", target_page: "/",
    link_type: "external", follow_type: "follow", status: "active", notes: "",
  });

  const fetchBacklinks = async () => {
    const { data } = await supabase.from("backlinks").select("*").order("discovered_at", { ascending: false });
    setBacklinks(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchBacklinks(); }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from("backlinks").insert(form);
    if (error) {
      toast({ title: "Грешка", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Бекликът е добавен" });
      setShowForm(false);
      setForm({ url: "", anchor_text: "", referring_domain: "", target_page: "/", link_type: "external", follow_type: "follow", status: "active", notes: "" });
      fetchBacklinks();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Изтриване?")) return;
    await supabase.from("backlinks").delete().eq("id", id);
    fetchBacklinks();
  };

  const totalFollow = backlinks.filter(b => b.follow_type === "follow").length;
  const totalNofollow = backlinks.filter(b => b.follow_type === "nofollow").length;
  const totalExternal = backlinks.filter(b => b.link_type === "external").length;
  const totalInternal = backlinks.filter(b => b.link_type === "internal").length;
  const domains = new Set(backlinks.map(b => b.referring_domain));

  // Group by month for chart
  const monthlyData = backlinks.reduce((acc: any[], b) => {
    const month = b.discovered_at?.substring(0, 7) || "unknown";
    const existing = acc.find(a => a.month === month);
    if (existing) existing.count++;
    else acc.push({ month, count: 1 });
    return acc;
  }, []).sort((a, b) => a.month.localeCompare(b.month)).slice(-12);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2"><Link2 className="h-6 w-6" /> SEO & Бекликове</h1>
        <Button onClick={() => setShowForm(!showForm)}><Plus className="h-4 w-4 mr-2" /> Добави бекликa</Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
        {[
          { label: "Общо", value: backlinks.length },
          { label: "Домейни", value: domains.size },
          { label: "Follow", value: totalFollow },
          { label: "Nofollow", value: totalNofollow },
          { label: "Външни", value: totalExternal },
          { label: "Вътрешни", value: totalInternal },
        ].map(s => (
          <div key={s.label} className="bg-card rounded-xl border border-border p-4 text-center">
            <p className="text-2xl font-bold text-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Growth chart */}
      {monthlyData.length > 0 && (
        <div className="bg-card rounded-xl border border-border p-4 mb-6">
          <h3 className="font-semibold mb-3 flex items-center gap-2"><TrendingUp className="h-4 w-4" /> Растеж по месеци</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" fontSize={12} />
              <YAxis fontSize={12} />
              <Tooltip />
              <Bar dataKey="count" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Add form */}
      {showForm && (
        <div className="bg-card rounded-xl border border-border p-6 mb-6">
          <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><Label>URL</Label><Input value={form.url} onChange={e => setForm({...form, url: e.target.value})} required placeholder="https://example.com/page" /></div>
            <div><Label>Referring Domain</Label><Input value={form.referring_domain} onChange={e => setForm({...form, referring_domain: e.target.value})} required placeholder="example.com" /></div>
            <div><Label>Anchor Text</Label><Input value={form.anchor_text} onChange={e => setForm({...form, anchor_text: e.target.value})} /></div>
            <div><Label>Target Page</Label><Input value={form.target_page} onChange={e => setForm({...form, target_page: e.target.value})} /></div>
            <div>
              <Label>Тип линк</Label>
              <Select value={form.link_type} onValueChange={v => setForm({...form, link_type: v})}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent><SelectItem value="external">Външен</SelectItem><SelectItem value="internal">Вътрешен</SelectItem></SelectContent>
              </Select>
            </div>
            <div>
              <Label>Follow</Label>
              <Select value={form.follow_type} onValueChange={v => setForm({...form, follow_type: v})}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent><SelectItem value="follow">Follow</SelectItem><SelectItem value="nofollow">Nofollow</SelectItem></SelectContent>
              </Select>
            </div>
            <div className="md:col-span-2"><Label>Бележки</Label><Input value={form.notes} onChange={e => setForm({...form, notes: e.target.value})} /></div>
            <div className="md:col-span-2 flex gap-2">
              <Button type="submit">Запази</Button>
              <Button type="button" variant="outline" onClick={() => setShowForm(false)}>Отказ</Button>
            </div>
          </form>
        </div>
      )}

      {/* Table */}
      {loading ? (
        <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" /></div>
      ) : (
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Домейн</TableHead>
                <TableHead>Anchor Text</TableHead>
                <TableHead>Тип</TableHead>
                <TableHead>Follow</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead>Дата</TableHead>
                <TableHead className="w-16" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {backlinks.length === 0 ? (
                <TableRow><TableCell colSpan={7} className="text-center text-muted-foreground py-8">Няма добавени бекликове</TableCell></TableRow>
              ) : backlinks.map(b => (
                <TableRow key={b.id}>
                  <TableCell>
                    <a href={b.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-primary hover:underline">
                      {b.referring_domain} <ExternalLink className="h-3 w-3" />
                    </a>
                  </TableCell>
                  <TableCell className="max-w-[200px] truncate">{b.anchor_text || "—"}</TableCell>
                  <TableCell><Badge variant="outline">{b.link_type === "external" ? "Външен" : "Вътрешен"}</Badge></TableCell>
                  <TableCell><Badge variant={b.follow_type === "follow" ? "default" : "secondary"}>{b.follow_type}</Badge></TableCell>
                  <TableCell><Badge variant={b.status === "active" ? "default" : "destructive"}>{b.status}</Badge></TableCell>
                  <TableCell className="text-sm text-muted-foreground">{b.discovered_at}</TableCell>
                  <TableCell><Button variant="ghost" size="icon" onClick={() => handleDelete(b.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default BacklinksPage;
