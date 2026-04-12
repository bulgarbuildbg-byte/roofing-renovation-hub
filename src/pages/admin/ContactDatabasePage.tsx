import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Download, Users, Mail, Phone, CheckCircle } from "lucide-react";
import { format } from "date-fns";
import { bg } from "date-fns/locale";

const ContactDatabasePage = () => {
  const [search, setSearch] = useState("");

  const { data: inquiries = [], isLoading } = useQuery({
    queryKey: ["admin-contacts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("inquiries")
        .select("id, name, email, phone, created_at, email_consent, sms_consent, unsubscribed_at, status")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  // Deduplicate by email
  const uniqueContacts = useMemo(() => {
    const seen = new Map<string, typeof inquiries[0]>();
    for (const inq of inquiries) {
      const key = inq.email.toLowerCase();
      if (!seen.has(key)) seen.set(key, inq);
    }
    return Array.from(seen.values());
  }, [inquiries]);

  const filtered = useMemo(() =>
    uniqueContacts.filter(c =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search)
    ), [uniqueContacts, search]);

  const consentCount = filtered.filter(c => c.email_consent && !c.unsubscribed_at).length;

  const exportCSV = () => {
    const headers = ["Име", "Имейл", "Телефон", "Дата", "Съгласие имейл", "Отписан"];
    const rows = filtered.map(c => [
      c.name, c.email, c.phone,
      format(new Date(c.created_at), "yyyy-MM-dd"),
      c.email_consent ? "Да" : "Не",
      c.unsubscribed_at ? "Да" : "Не",
    ]);
    const csv = [headers.join(","), ...rows.map(r => r.map(v => `"${String(v).replace(/"/g, '""')}"`).join(","))].join("\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `contacts-${format(new Date(), "yyyy-MM-dd")}.csv`;
    a.click(); URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Контактна база</h1>
          <p className="text-sm text-muted-foreground">Всички уникални контакти от запитвания</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Търсене..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9 w-56" />
          </div>
          <Button variant="outline" size="sm" onClick={exportCSV}>
            <Download className="h-4 w-4 mr-1" /> CSV
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-1"><CardTitle className="text-xs font-medium text-muted-foreground flex items-center gap-1.5"><Users className="h-3.5 w-3.5 text-primary" /> Общо контакти</CardTitle></CardHeader>
          <CardContent><p className="text-3xl font-bold">{uniqueContacts.length}</p></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-1"><CardTitle className="text-xs font-medium text-muted-foreground flex items-center gap-1.5"><Mail className="h-3.5 w-3.5 text-blue-500" /> Уникални имейли</CardTitle></CardHeader>
          <CardContent><p className="text-3xl font-bold">{uniqueContacts.length}</p></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-1"><CardTitle className="text-xs font-medium text-muted-foreground flex items-center gap-1.5"><CheckCircle className="h-3.5 w-3.5 text-green-500" /> Със съгласие</CardTitle></CardHeader>
          <CardContent><p className="text-3xl font-bold">{consentCount}</p></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-1"><CardTitle className="text-xs font-medium text-muted-foreground flex items-center gap-1.5"><Phone className="h-3.5 w-3.5 text-amber-500" /> Общо запитвания</CardTitle></CardHeader>
          <CardContent><p className="text-3xl font-bold">{inquiries.length}</p></CardContent>
        </Card>
      </div>

      {/* Table */}
      {isLoading ? (
        <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" /></div>
      ) : (
        <div className="bg-card rounded-xl border border-border overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Име</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Имейл</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Телефон</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Дата</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Съгласие</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Статус</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(c => (
                <tr key={c.id} className="border-b border-border hover:bg-muted/30">
                  <td className="px-4 py-3 font-medium">{c.name}</td>
                  <td className="px-4 py-3">
                    <a href={`mailto:${c.email}`} className="text-primary hover:underline">{c.email}</a>
                  </td>
                  <td className="px-4 py-3">
                    <a href={`tel:${c.phone}`} className="text-accent hover:underline flex items-center gap-1">
                      <Phone className="h-3 w-3" /> {c.phone}
                    </a>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">{format(new Date(c.created_at), "dd MMM yyyy", { locale: bg })}</td>
                  <td className="px-4 py-3">
                    {c.unsubscribed_at ? (
                      <Badge variant="destructive" className="text-xs">Отписан</Badge>
                    ) : c.email_consent ? (
                      <Badge className="text-xs bg-green-500/10 text-green-600 border-green-500/20">Да</Badge>
                    ) : (
                      <Badge variant="secondary" className="text-xs">Не</Badge>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant="outline" className="text-xs">{c.status}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <p className="text-center text-muted-foreground py-8">Няма контакти</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ContactDatabasePage;
