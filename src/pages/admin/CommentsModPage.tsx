import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Check, X, Trash2, Loader2, MessageSquare } from "lucide-react";
import { format } from "date-fns";
import { bg } from "date-fns/locale";
import { toast } from "@/hooks/use-toast";

interface Comment {
  id: string;
  article_id: string;
  parent_id: string | null;
  author_name: string;
  author_email: string;
  content: string;
  status: string;
  created_at: string;
  article_title?: string;
}

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  approved: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
};

const CommentsModPage = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    // Fetch comments
    const { data: commentsData } = await supabase
      .from("comments" as any)
      .select("*")
      .order("created_at", { ascending: false });

    // Fetch article titles
    const { data: articles } = await supabase.from("articles").select("id, title");
    const articleMap = new Map((articles || []).map(a => [a.id, a.title]));

    const enriched = ((commentsData || []) as any[]).map(c => ({
      ...c,
      article_title: articleMap.get(c.article_id) || "Неизвестна статия",
    }));

    setComments(enriched);
    setLoading(false);
  };

  const updateStatus = async (id: string, status: string) => {
    await supabase.from("comments" as any).update({ status }).eq("id", id);
    toast({ title: status === "approved" ? "Коментарът е одобрен" : "Коментарът е отхвърлен" });
    fetchComments();
  };

  const deleteComment = async (id: string) => {
    if (!confirm("Изтриване на коментара?")) return;
    await supabase.from("comments" as any).delete().eq("id", id);
    toast({ title: "Коментарът е изтрит" });
    fetchComments();
  };

  const filtered = filterStatus === "all" ? comments : comments.filter(c => c.status === filterStatus);
  const pendingCount = comments.filter(c => c.status === "pending").length;

  if (loading) {
    return <div className="flex items-center justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-foreground">Дискусии</h1>
          {pendingCount > 0 && (
            <Badge variant="destructive">{pendingCount} за одобрение</Badge>
          )}
        </div>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Филтър по статус" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Всички</SelectItem>
            <SelectItem value="pending">Чакащи</SelectItem>
            <SelectItem value="approved">Одобрени</SelectItem>
            <SelectItem value="rejected">Отхвърлени</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {filtered.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
            <p className="text-muted-foreground">Няма коментари</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {filtered.map(c => (
            <Card key={c.id}>
              <CardContent className="pt-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="font-medium text-sm">{c.author_name}</span>
                      <span className="text-xs text-muted-foreground">{c.author_email}</span>
                      <Badge variant="secondary" className={statusColors[c.status] || ""}>
                        {c.status === "pending" ? "Чакащ" : c.status === "approved" ? "Одобрен" : "Отхвърлен"}
                      </Badge>
                      {c.parent_id && <Badge variant="outline" className="text-xs">Отговор</Badge>}
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">
                      {c.article_title} · {format(new Date(c.created_at), "d MMM yyyy HH:mm", { locale: bg })}
                    </p>
                    <p className="text-sm text-foreground whitespace-pre-wrap">{c.content}</p>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    {c.status !== "approved" && (
                      <Button variant="ghost" size="icon" onClick={() => updateStatus(c.id, "approved")} title="Одобри">
                        <Check className="h-4 w-4 text-green-600" />
                      </Button>
                    )}
                    {c.status !== "rejected" && (
                      <Button variant="ghost" size="icon" onClick={() => updateStatus(c.id, "rejected")} title="Отхвърли">
                        <X className="h-4 w-4 text-orange-500" />
                      </Button>
                    )}
                    <Button variant="ghost" size="icon" onClick={() => deleteComment(c.id)} title="Изтрий">
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentsModPage;
