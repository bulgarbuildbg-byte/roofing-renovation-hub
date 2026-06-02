import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, FileSignature } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { CURRENCIES } from "@/lib/serviceCategories";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  inquiry: any;
  /** Existing contract row, if any. If null, a new one will be created. */
  contract: any | null;
  onSaved: (contract: any) => void;
}

export default function SignContractDialog({ open, onOpenChange, inquiry, contract, onSaved }: Props) {
  const { toast } = useToast();
  const { user } = useAuth();
  const [saving, setSaving] = useState(false);

  const [value, setValue] = useState("");
  const [currency, setCurrency] = useState("EUR");
  const [signedDate, setSignedDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [contractNumber, setContractNumber] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (open) {
      setValue(contract?.contract_value ? String(contract.contract_value) : "");
      setCurrency(contract?.currency || "EUR");
      setSignedDate(contract?.signed_date || new Date().toISOString().slice(0, 10));
      setContractNumber(contract?.contract_number || "");
      setNotes(contract?.notes || "");
    }
  }, [open, contract]);

  const numericValue = Number(value);
  const valid = !isNaN(numericValue) && numericValue > 0 && !!signedDate;

  const save = async () => {
    if (!valid || !user) return;
    setSaving(true);

    let row = contract;
    if (!row) {
      const { data, error } = await supabase
        .from("contracts")
        .insert({
          inquiry_id: inquiry.id,
          quote_id: inquiry.id, // placeholder fallback; not enforced FK
          created_by: user.id,
          client_name: inquiry.name,
          client_phone: inquiry.phone,
          client_email: inquiry.email,
          client_address: inquiry.address,
          total_price: numericValue,
          contract_workflow_status: "signed",
          contract_value: numericValue,
          currency,
          signed_date: signedDate,
          contract_number: contractNumber || null,
          notes,
        } as any)
        .select()
        .single();
      if (error) {
        setSaving(false);
        toast({ title: "Грешка", description: error.message, variant: "destructive" });
        return;
      }
      row = data;
    } else {
      const { data, error } = await supabase
        .from("contracts")
        .update({
          contract_workflow_status: "signed",
          contract_value: numericValue,
          currency,
          signed_date: signedDate,
          contract_number: contractNumber || null,
          notes,
        })
        .eq("id", row.id)
        .select()
        .single();
      if (error) {
        setSaving(false);
        toast({ title: "Грешка", description: error.message, variant: "destructive" });
        return;
      }
      row = data;
    }

    await supabase.from("inquiries").update({ status: "contract_signed" as any }).eq("id", inquiry.id);

    setSaving(false);
    toast({ title: "Договорът е записан", description: "Сега можете да качите подписан договор, фактура и др." });
    onSaved(row);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileSignature className="h-5 w-5 text-green-500" />
            Подписан договор — въведете детайли
          </DialogTitle>
          <DialogDescription>
            За да отчетем lead-а като реален договор в секция „Договори" и в оборота, моля въведете стойност, валута и дата.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div>
            <Label>
              Стойност на договора <span className="text-destructive">*</span>
            </Label>
            <div className="flex gap-2">
              <Input
                type="number"
                min="0"
                step="100"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="напр. 12500"
                className={!valid && value !== "" ? "border-destructive" : ""}
                autoFocus
              />
              <Select value={currency} onValueChange={setCurrency}>
                <SelectTrigger className="w-32"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {CURRENCIES.map((c) => (
                    <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {!valid && value !== "" && (
              <p className="text-xs text-destructive mt-1">Стойността трябва да е по-голяма от 0.</p>
            )}
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label>
                Дата на подписване <span className="text-destructive">*</span>
              </Label>
              <Input type="date" value={signedDate} onChange={(e) => setSignedDate(e.target.value)} />
            </div>
            <div>
              <Label>Номер на договор</Label>
              <Input
                value={contractNumber}
                onChange={(e) => setContractNumber(e.target.value)}
                placeholder="напр. Д-2026-0042"
              />
            </div>
          </div>

          <div>
            <Label>Бележки</Label>
            <Textarea rows={2} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Аванс, срокове, условия..." />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={saving}>
            Отказ
          </Button>
          <Button onClick={save} disabled={!valid || saving} className="bg-green-600 hover:bg-green-700">
            {saving && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
            Запази договора
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
