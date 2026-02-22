import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Mail, Eye, MousePointerClick } from "lucide-react";

const STATUS_LABELS: Record<string, string> = {
  draft: "Чернова",
  scheduled: "Насрочена",
  sending: "Изпраща се",
  sent: "Изпратена",
  failed: "Грешка",
};

const EmailCampaignListPage = () => {
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from("email_campaigns").select("*").order("created_at", { ascending: false })
      .then(({ data }) => { setCampaigns(data || []); setLoading(false); });
  }, []);

  // Summary stats
  const totalSent = campaigns.reduce((s, c) => s + (c.total_sent || 0), 0);
  const totalOpened = campaigns.reduce((s, c) => s + (c.total_opened || 0), 0);
  const totalClicked = campaigns.reduce((s, c) => s + (c.total_clicked || 0), 0);
  const openRate = totalSent > 0 ? ((totalOpened / totalSent) * 100).toFixed(1) : "0";
  const clickRate = totalSent > 0 ? ((totalClicked / totalSent) * 100).toFixed(1) : "0";

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2"><Mail className="h-6 w-6" /> Имейл маркетинг</h1>
        <Button asChild><Link to="/admin/email-campaigns/new"><Plus className="h-4 w-4 mr-2" /> Нова кампания</Link></Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <div className="bg-card rounded-xl border border-border p-4 text-center">
          <p className="text-2xl font-bold text-foreground">{campaigns.length}</p>
          <p className="text-xs text-muted-foreground">Кампании</p>
        </div>
        <div className="bg-card rounded-xl border border-border p-4 text-center">
          <p className="text-2xl font-bold text-foreground">{totalSent}</p>
          <p className="text-xs text-muted-foreground">Изпратени</p>
        </div>
        <div className="bg-card rounded-xl border border-border p-4 text-center flex flex-col items-center">
          <p className="text-2xl font-bold text-foreground flex items-center gap-1"><Eye className="h-4 w-4" /> {openRate}%</p>
          <p className="text-xs text-muted-foreground">Open Rate</p>
        </div>
        <div className="bg-card rounded-xl border border-border p-4 text-center flex flex-col items-center">
          <p className="text-2xl font-bold text-foreground flex items-center gap-1"><MousePointerClick className="h-4 w-4" /> {clickRate}%</p>
          <p className="text-xs text-muted-foreground">Click Rate</p>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" /></div>
      ) : (
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Кампания</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead>Получатели</TableHead>
                <TableHead>Отворени</TableHead>
                <TableHead>Кликове</TableHead>
                <TableHead>Дата</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {campaigns.length === 0 ? (
                <TableRow><TableCell colSpan={6} className="text-center text-muted-foreground py-8">Няма имейл кампании</TableCell></TableRow>
              ) : campaigns.map(c => (
                <TableRow key={c.id}>
                  <TableCell>
                    <Link to={`/admin/email-campaigns/${c.id}/edit`} className="font-medium text-primary hover:underline">{c.name}</Link>
                    <p className="text-xs text-muted-foreground truncate max-w-[200px]">{c.subject}</p>
                  </TableCell>
                  <TableCell><Badge variant={c.status === "sent" ? "default" : "secondary"}>{STATUS_LABELS[c.status] || c.status}</Badge></TableCell>
                  <TableCell>{c.total_recipients || 0}</TableCell>
                  <TableCell>{c.total_opened || 0}</TableCell>
                  <TableCell>{c.total_clicked || 0}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{new Date(c.created_at).toLocaleDateString("bg-BG")}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default EmailCampaignListPage;
