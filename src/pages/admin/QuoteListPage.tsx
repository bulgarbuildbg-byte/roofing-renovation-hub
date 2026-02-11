import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from "date-fns";
import { bg } from "date-fns/locale";
import { Eye } from "lucide-react";

const statusLabels: Record<string, string> = {
  draft: "Чернова", sent: "Изпратена", accepted: "Приета", rejected: "Отказана",
};
const statusColors: Record<string, string> = {
  draft: "bg-gray-500", sent: "bg-blue-500", accepted: "bg-green-500", rejected: "bg-red-500",
};

const QuoteListPage = () => {
  const [quotes, setQuotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from("quotes")
        .select("*, inquiries(name, email)")
        .order("created_at", { ascending: false });
      setQuotes(data || []);
      setLoading(false);
    };
    fetch();
  }, []);

  if (loading) {
    return <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" /></div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-6">Оферти</h1>
      {quotes.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">Няма създадени оферти.</div>
      ) : (
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Дата</TableHead>
                <TableHead>Клиент</TableHead>
                <TableHead>Общо</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead className="w-12" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {quotes.map((q) => (
                <TableRow key={q.id}>
                  <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                    {format(new Date(q.created_at), "dd.MM.yyyy", { locale: bg })}
                  </TableCell>
                  <TableCell className="font-medium">{(q as any).inquiries?.name || "—"}</TableCell>
                  <TableCell className="font-semibold">{Number(q.total).toFixed(2)} лв</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={`${statusColors[q.status]} text-white text-xs`}>
                      {statusLabels[q.status] || q.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Link to={`/admin/inquiries/${q.inquiry_id}/quote`}>
                      <Eye className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default QuoteListPage;
