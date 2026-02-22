import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Loader2, Pencil, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { bg } from "date-fns/locale";
import { toast } from "@/hooks/use-toast";

interface Campaign {
  id: string;
  name: string;
  platform: string;
  start_date: string;
  end_date: string | null;
  budget: number;
  notes: string | null;
  created_at: string;
}

const platformColors: Record<string, string> = {
  google: "bg-blue-100 text-blue-800",
  facebook: "bg-indigo-100 text-indigo-800",
  tiktok: "bg-pink-100 text-pink-800",
  organic: "bg-green-100 text-green-800",
  other: "bg-gray-100 text-gray-800",
};

const CampaignListPage = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [leadCounts, setLeadCounts] = useState<Record<string, number>>({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    const { data } = await supabase.from("campaigns" as any).select("*").order("created_at", { ascending: false });
    const camps = (data || []) as unknown as Campaign[];
    setCampaigns(camps);

    // Fetch lead counts per campaign
    if (camps.length > 0) {
      const { data: inquiries } = await supabase.from("inquiries").select("campaign_id").not("campaign_id", "is", null);
      const counts: Record<string, number> = {};
      (inquiries || []).forEach((i: any) => {
        if (i.campaign_id) counts[i.campaign_id] = (counts[i.campaign_id] || 0) + 1;
      });
      setLeadCounts(counts);
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Сигурни ли сте, че искате да изтриете тази кампания?")) return;
    await supabase.from("campaigns" as any).delete().eq("id", id);
    toast({ title: "Кампанията е изтрита" });
    fetchCampaigns();
  };

  if (loading) {
    return <div className="flex items-center justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Маркетинг кампании</h1>
        <Button onClick={() => navigate("/admin/campaigns/new")}>
          <Plus className="h-4 w-4 mr-1" /> Нова кампания
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Име</TableHead>
                <TableHead>Платформа</TableHead>
                <TableHead>Период</TableHead>
                <TableHead className="text-right">Бюджет</TableHead>
                <TableHead className="text-right">Лийдове</TableHead>
                <TableHead className="text-right">Цена/лийд</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {campaigns.map(c => {
                const leads = leadCounts[c.id] || 0;
                const cpl = leads > 0 ? (c.budget / leads).toFixed(2) : "—";
                return (
                  <TableRow key={c.id}>
                    <TableCell className="font-medium">{c.name}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={platformColors[c.platform] || platformColors.other}>
                        {c.platform}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {format(new Date(c.start_date), "d MMM yyyy", { locale: bg })}
                      {c.end_date && ` — ${format(new Date(c.end_date), "d MMM yyyy", { locale: bg })}`}
                    </TableCell>
                    <TableCell className="text-right">{c.budget.toFixed(2)} лв</TableCell>
                    <TableCell className="text-right font-medium">{leads}</TableCell>
                    <TableCell className="text-right">{cpl} {cpl !== "—" ? "лв" : ""}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center gap-1 justify-end">
                        <Button variant="ghost" size="icon" onClick={() => navigate(`/admin/campaigns/${c.id}/edit`)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(c.id)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
              {campaigns.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                    Няма създадени кампании
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default CampaignListPage;
