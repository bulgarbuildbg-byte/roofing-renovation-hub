import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { UserPlus, Trash2, Shield } from "lucide-react";

const ROLE_LABELS: Record<string, string> = {
  admin: "Администратор",
  staff: "Работник",
  editor: "Редактор",
  marketing: "Маркетинг",
  support: "Поддръжка",
  seo: "SEO",
};

const StaffManagementPage = () => {
  const { toast } = useToast();
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("staff");
  const [adding, setAdding] = useState(false);

  const fetchMembers = async () => {
    const { data } = await supabase
      .from("user_roles")
      .select("id, user_id, role, profiles(full_name, email, last_login)");
    setMembers(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchMembers(); }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdding(true);

    const { data, error } = await supabase.functions.invoke("create-team-member", {
      body: { email, password, role, full_name: fullName },
    });

    if (error || data?.error) {
      toast({ title: "Грешка", description: data?.error || error?.message, variant: "destructive" });
    } else {
      toast({ title: "Потребителят е добавен успешно" });
      setFullName(""); setEmail(""); setPassword("");
      fetchMembers();
    }
    setAdding(false);
  };

  const handleDelete = async (userId: string, roleId: string) => {
    if (!confirm("Сигурни ли сте, че искате да премахнете този потребител?")) return;
    await supabase.from("user_roles").delete().eq("id", roleId);
    toast({ title: "Ролята е премахната" });
    fetchMembers();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
        <Shield className="h-6 w-6" /> Управление на екипа
      </h1>

      <div className="bg-card rounded-xl border border-border p-6 mb-6">
        <h2 className="font-semibold mb-4">Добави нов член на екипа</h2>
        <form onSubmit={handleAdd} className="grid grid-cols-1 sm:grid-cols-5 gap-3 items-end">
          <div>
            <Label>Име</Label>
            <Input value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Иван Иванов" required />
          </div>
          <div>
            <Label>Имейл</Label>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div>
            <Label>Парола</Label>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} />
          </div>
          <div>
            <Label>Роля</Label>
            <Select value={role} onValueChange={setRole}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {Object.entries(ROLE_LABELS).map(([val, label]) => (
                  <SelectItem key={val} value={val}>{label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" disabled={adding}>
            <UserPlus className="h-4 w-4 mr-2" /> {adding ? "Добавяне..." : "Добави"}
          </Button>
        </form>
      </div>

      {loading ? (
        <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" /></div>
      ) : (
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Име</TableHead>
                <TableHead>Имейл</TableHead>
                <TableHead>Роля</TableHead>
                <TableHead>Последен вход</TableHead>
                <TableHead className="w-16" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {members.length === 0 ? (
                <TableRow><TableCell colSpan={5} className="text-center text-muted-foreground py-8">Няма добавени членове</TableCell></TableRow>
              ) : members.map((m) => (
                <TableRow key={m.id}>
                  <TableCell className="font-medium">{(m as any).profiles?.full_name || "—"}</TableCell>
                  <TableCell>{(m as any).profiles?.email || m.user_id}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{ROLE_LABELS[m.role] || m.role}</Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {(m as any).profiles?.last_login
                      ? new Date((m as any).profiles.last_login).toLocaleDateString("bg-BG")
                      : "—"}
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(m.user_id, m.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <div className="mt-6 bg-card rounded-xl border border-border p-6">
        <h3 className="font-semibold mb-3">Права по роли</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
          <div className="p-3 bg-muted rounded-lg">
            <span className="font-medium">Администратор</span>
            <p className="text-muted-foreground">Пълен достъп до всички секции</p>
          </div>
          <div className="p-3 bg-muted rounded-lg">
            <span className="font-medium">Работник</span>
            <p className="text-muted-foreground">Запитвания, оферти, лийдове</p>
          </div>
          <div className="p-3 bg-muted rounded-lg">
            <span className="font-medium">Редактор</span>
            <p className="text-muted-foreground">Статии, дискусии</p>
          </div>
          <div className="p-3 bg-muted rounded-lg">
            <span className="font-medium">Маркетинг</span>
            <p className="text-muted-foreground">Кампании, лийдове, имейл маркетинг</p>
          </div>
          <div className="p-3 bg-muted rounded-lg">
            <span className="font-medium">SEO</span>
            <p className="text-muted-foreground">Бекликове, аналитика</p>
          </div>
          <div className="p-3 bg-muted rounded-lg">
            <span className="font-medium">Поддръжка</span>
            <p className="text-muted-foreground">Лийдове, чатове</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffManagementPage;
