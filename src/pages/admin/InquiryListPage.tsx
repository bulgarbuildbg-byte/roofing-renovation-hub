import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from "date-fns";
import { bg } from "date-fns/locale";
import { Eye, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const statusLabels: Record<string, string> = {
  new: "Ново",
  contacted: "Свързани",
  quote_sent: "Оферта изпратена",
  accepted: "Прието",
  rejected: "Отказано",
};

const statusColors: Record<string, string> = {
  new: "bg-blue-500",
  contacted: "bg-yellow-500",
  quote_sent: "bg-purple-500",
  accepted: "bg-green-500",
  rejected: "bg-red-500",
};

const serviceLabels: Record<string, string> = {
  repair: "Ремонт",
  replacement: "Подмяна",
  new_construction: "Нов покрив",
  waterproofing: "Хидроизолация",
  tiles: "Керемиди",
  flat_roof: "Плосък покрив",
  metal_roof: "Метален покрив",
  maintenance: "Поддръжка",
  leak_repair: "Течове",
  other: "Друго",
};

const InquiryListPage = () => {
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const fetchInquiries = async () => {
    setLoading(true);
    let query = supabase
      .from("inquiries")
      .select("*")
      .order("created_at", { ascending: false });

    if (statusFilter !== "all") {
      query = query.eq("status", statusFilter as "new" | "contacted" | "quote_sent" | "accepted" | "rejected");
    }

    const { data } = await query;
    setInquiries(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchInquiries();
  }, [statusFilter]);

  const filtered = inquiries.filter((i) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return i.name?.toLowerCase().includes(q) || i.phone?.includes(q) || i.email?.toLowerCase().includes(q);
  });

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-6">Запитвания</h1>

      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Търсене по име, телефон, имейл..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Филтър по статус" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Всички</SelectItem>
            <SelectItem value="new">Нови</SelectItem>
            <SelectItem value="contacted">Свързани</SelectItem>
            <SelectItem value="quote_sent">Оферта изпратена</SelectItem>
            <SelectItem value="accepted">Приети</SelectItem>
            <SelectItem value="rejected">Отказани</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">Няма намерени запитвания.</div>
      ) : (
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Дата</TableHead>
                <TableHead>Име</TableHead>
                <TableHead>Телефон</TableHead>
                <TableHead className="hidden md:table-cell">Услуга</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead className="w-12" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((inquiry) => (
                <TableRow key={inquiry.id}>
                  <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                    {format(new Date(inquiry.created_at), "dd.MM.yyyy", { locale: bg })}
                  </TableCell>
                  <TableCell className="font-medium">{inquiry.name}</TableCell>
                  <TableCell>{inquiry.phone}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {serviceLabels[inquiry.service_type] || inquiry.service_type}
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={`${statusColors[inquiry.status]} text-white text-xs`}>
                      {statusLabels[inquiry.status] || inquiry.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Link to={`/admin/inquiries/${inquiry.id}`}>
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

export default InquiryListPage;
