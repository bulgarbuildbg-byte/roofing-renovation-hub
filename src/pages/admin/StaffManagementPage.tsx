import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { UserPlus, Trash2 } from "lucide-react";

const StaffManagementPage = () => {
  const { toast } = useToast();
  const [roles, setRoles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<string>("staff");
  const [adding, setAdding] = useState(false);

  const fetchRoles = async () => {
    const { data } = await supabase.from("user_roles").select("*, profiles(full_name, email)");
    setRoles(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchRoles(); }, []);

  const handleAddStaff = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdding(true);

    // Sign up the user
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: window.location.origin },
    });

    if (signUpError || !signUpData.user) {
      toast({ title: "Грешка", description: signUpError?.message || "Неуспешно създаване", variant: "destructive" });
      setAdding(false);
      return;
    }

    // Add role - needs service role or admin policy; for now we insert directly
    const { error: roleError } = await supabase.from("user_roles").insert({
      user_id: signUpData.user.id,
      role: role as any,
    });

    if (roleError) {
      toast({ title: "Грешка при задаване на роля", description: roleError.message, variant: "destructive" });
    } else {
      toast({ title: "Потребителят е добавен" });
      setEmail("");
      setPassword("");
      fetchRoles();
    }
    setAdding(false);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-6">Управление на екипа</h1>

      <div className="bg-card rounded-xl border border-border p-6 mb-6">
        <h2 className="font-semibold mb-4">Добави нов потребител</h2>
        <form onSubmit={handleAddStaff} className="grid grid-cols-1 sm:grid-cols-4 gap-3 items-end">
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
                <SelectItem value="staff">Работник</SelectItem>
                <SelectItem value="admin">Администратор</SelectItem>
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
                <TableHead>Имейл</TableHead>
                <TableHead>Роля</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {roles.map((r) => (
                <TableRow key={r.id}>
                  <TableCell>{(r as any).profiles?.email || r.user_id}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{r.role === "admin" ? "Администратор" : "Работник"}</Badge>
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

export default StaffManagementPage;
