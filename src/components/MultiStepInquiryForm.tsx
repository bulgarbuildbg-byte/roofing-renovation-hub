import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, Phone, ArrowLeft, ArrowRight, Send, Upload, X, Loader2 } from "lucide-react";

const serviceOptions = [
  { value: "repair", label: "Ремонт на покрив (частичен)" },
  { value: "replacement", label: "Пълна подмяна на покрив" },
  { value: "new_construction", label: "Нов покрив (ново строителство)" },
  { value: "waterproofing", label: "Хидроизолация" },
  { value: "tiles", label: "Смяна на керемиди" },
  { value: "flat_roof", label: "Плосък покрив" },
  { value: "metal_roof", label: "Метален покрив" },
  { value: "maintenance", label: "Поддръжка" },
  { value: "leak_repair", label: "Ремонт на течове" },
  { value: "other", label: "Друго" },
];

const materialOptions = [
  { value: "tiles", label: "Керемиди" },
  { value: "metal", label: "Метални листове" },
  { value: "bitumen", label: "Битумни керемиди" },
  { value: "pvc_membrane", label: "PVC мембрана" },
  { value: "shingles", label: "Шингли" },
  { value: "other", label: "Не съм сигурен / Друго" },
];

const complexityOptions = [
  { value: "single_pitch", label: "Едноскатен" },
  { value: "gable", label: "Двускатен" },
  { value: "hip", label: "Четирискатен (вълмов)" },
  { value: "complex", label: "Сложен (мансарден, комбиниран)" },
];

const TOTAL_STEPS = 5;

const MultiStepInquiryForm = () => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    service_type: "",
    area_sqm: "",
    preferred_material: "",
    roof_complexity: "",
    description: "",
  });

  const update = (field: string, value: string) => setForm({ ...form, [field]: value });

  const canNext = () => {
    if (step === 1) return form.name && form.phone && form.email;
    if (step === 2) return form.service_type;
    return true;
  };

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles([...files, ...Array.from(e.target.files)]);
    }
  };

  const removeFile = (i: number) => setFiles(files.filter((_, idx) => idx !== i));

  const handleSubmit = async () => {
    setSubmitting(true);

    // Insert inquiry
    const { data: inquiry, error } = await supabase
      .from("inquiries")
      .insert({
        name: form.name,
        phone: form.phone,
        email: form.email,
        service_type: form.service_type as any || "other",
        area_sqm: form.area_sqm ? Number(form.area_sqm) : null,
        preferred_material: form.preferred_material as any || null,
        roof_complexity: form.roof_complexity as any || null,
        description: form.description || null,
      })
      .select()
      .single();

    if (error || !inquiry) {
      toast({ title: "Грешка", description: "Моля, опитайте отново.", variant: "destructive" });
      setSubmitting(false);
      return;
    }

    // Upload files
    for (const file of files) {
      const path = `${inquiry.id}/${Date.now()}_${file.name}`;
      const { data: uploaded } = await supabase.storage
        .from("inquiry-attachments")
        .upload(path, file);

      if (uploaded) {
        const { data: urlData } = supabase.storage
          .from("inquiry-attachments")
          .getPublicUrl(uploaded.path);

        await supabase.from("inquiry_files").insert({
          inquiry_id: inquiry.id,
          file_url: urlData.publicUrl,
          file_name: file.name,
          file_type: file.type,
        });
      }
    }

    setSubmitted(true);
    setSubmitting(false);
  };

  if (submitted) {
    return (
      <div className="bg-card rounded-2xl p-6 md:p-8 shadow-xl border border-border text-center">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-foreground mb-2">Заявката е изпратена!</h3>
        <p className="text-muted-foreground">Ще се свържем с вас в рамките на 24 часа.</p>
        <div className="mt-6 pt-6 border-t border-border">
          <p className="text-muted-foreground text-sm mb-3">Или ни се обадете директно:</p>
          <a href="tel:0884997659" className="inline-flex items-center gap-2 text-xl font-bold text-accent hover:text-accent/80 transition-colors">
            <Phone className="w-5 h-5" /> 088 499 7659
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-2xl p-6 md:p-8 shadow-xl border border-border">
      <div className="flex items-center gap-2 mb-4">
        <CheckCircle className="w-5 h-5 text-accent" />
        <span className="text-sm font-medium text-foreground">Отговаряме до 24 часа</span>
      </div>

      <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2">Заявете безплатен оглед</h3>

      {/* Progress */}
      <div className="flex gap-1 mb-6">
        {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
          <div key={i} className={`h-1 flex-1 rounded-full transition-colors ${i < step ? "bg-accent" : "bg-border"}`} />
        ))}
      </div>

      {/* Step 1: Contact */}
      {step === 1 && (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground mb-2">Стъпка 1 от 5 — Контактна информация</p>
          <div>
            <Label>Вашето име *</Label>
            <Input value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="Иван Иванов" required className="h-12" />
          </div>
          <div>
            <Label>Телефон *</Label>
            <Input type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="088 123 4567" required className="h-12" />
          </div>
          <div>
            <Label>Имейл *</Label>
            <Input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="ivan@example.com" required className="h-12" />
          </div>
        </div>
      )}

      {/* Step 2: Service type */}
      {step === 2 && (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground mb-2">Стъпка 2 от 5 — Тип услуга</p>
          <RadioGroup value={form.service_type} onValueChange={(v) => update("service_type", v)} className="space-y-2">
            {serviceOptions.map((opt) => (
              <label key={opt.value} className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors
                ${form.service_type === opt.value ? "border-accent bg-accent/5" : "border-border hover:bg-muted"}`}>
                <RadioGroupItem value={opt.value} />
                <span className="text-sm font-medium">{opt.label}</span>
              </label>
            ))}
          </RadioGroup>
        </div>
      )}

      {/* Step 3: Technical details */}
      {step === 3 && (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground mb-2">Стъпка 3 от 5 — Технически детайли</p>
          <div>
            <Label>Приблизителна площ (кв.м)</Label>
            <Input type="number" value={form.area_sqm} onChange={(e) => update("area_sqm", e.target.value)} placeholder="напр. 120" className="h-12" />
          </div>
          <div>
            <Label>Предпочитан материал</Label>
            <Select value={form.preferred_material} onValueChange={(v) => update("preferred_material", v)}>
              <SelectTrigger className="h-12"><SelectValue placeholder="Изберете материал" /></SelectTrigger>
              <SelectContent>
                {materialOptions.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Тип на покрива</Label>
            <Select value={form.roof_complexity} onValueChange={(v) => update("roof_complexity", v)}>
              <SelectTrigger className="h-12"><SelectValue placeholder="Изберете тип" /></SelectTrigger>
              <SelectContent>
                {complexityOptions.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      {/* Step 4: Files & description */}
      {step === 4 && (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground mb-2">Стъпка 4 от 5 — Снимки и описание</p>
          <div>
            <Label>Прикачете снимки или документи</Label>
            <label className="flex flex-col items-center gap-2 p-6 border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-muted transition-colors">
              <Upload className="h-8 w-8 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Натиснете за да качите файлове</span>
              <input type="file" multiple accept="image/*,.pdf,.doc,.docx" onChange={handleFiles} className="hidden" />
            </label>
            {files.length > 0 && (
              <div className="mt-2 space-y-1">
                {files.map((f, i) => (
                  <div key={i} className="flex items-center justify-between text-sm p-2 bg-muted rounded">
                    <span className="truncate">{f.name}</span>
                    <button onClick={() => removeFile(i)}><X className="h-4 w-4 text-muted-foreground" /></button>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div>
            <Label>Допълнително описание</Label>
            <Textarea value={form.description} onChange={(e) => update("description", e.target.value)} placeholder="Опишете проблема или желаната услуга..." rows={4} />
          </div>
        </div>
      )}

      {/* Step 5: Review */}
      {step === 5 && (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground mb-2">Стъпка 5 от 5 — Преглед и изпращане</p>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between p-3 bg-muted rounded-lg">
              <span className="text-muted-foreground">Име:</span><span className="font-medium">{form.name}</span>
            </div>
            <div className="flex justify-between p-3 bg-muted rounded-lg">
              <span className="text-muted-foreground">Телефон:</span><span className="font-medium">{form.phone}</span>
            </div>
            <div className="flex justify-between p-3 bg-muted rounded-lg">
              <span className="text-muted-foreground">Имейл:</span><span className="font-medium">{form.email}</span>
            </div>
            <div className="flex justify-between p-3 bg-muted rounded-lg">
              <span className="text-muted-foreground">Услуга:</span>
              <span className="font-medium">{serviceOptions.find((s) => s.value === form.service_type)?.label || "—"}</span>
            </div>
            {form.area_sqm && (
              <div className="flex justify-between p-3 bg-muted rounded-lg">
                <span className="text-muted-foreground">Площ:</span><span className="font-medium">{form.area_sqm} кв.м</span>
              </div>
            )}
            {form.preferred_material && (
              <div className="flex justify-between p-3 bg-muted rounded-lg">
                <span className="text-muted-foreground">Материал:</span>
                <span className="font-medium">{materialOptions.find((m) => m.value === form.preferred_material)?.label}</span>
              </div>
            )}
            {files.length > 0 && (
              <div className="p-3 bg-muted rounded-lg">
                <span className="text-muted-foreground">Файлове: </span>
                <span className="font-medium">{files.length} файл(а)</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between mt-6 pt-4 border-t border-border">
        {step > 1 ? (
          <Button variant="outline" onClick={() => setStep(step - 1)}>
            <ArrowLeft className="h-4 w-4 mr-1" /> Назад
          </Button>
        ) : <div />}

        {step < TOTAL_STEPS ? (
          <Button onClick={() => setStep(step + 1)} disabled={!canNext()} className="bg-accent hover:bg-accent/90 text-accent-foreground">
            Напред <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        ) : (
          <Button onClick={handleSubmit} disabled={submitting} className="bg-accent hover:bg-accent/90 text-accent-foreground">
            {submitting ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Изпращане...</> : <><Send className="h-4 w-4 mr-2" /> Изпрати заявка</>}
          </Button>
        )}
      </div>

      <div className="mt-6 pt-6 border-t border-border text-center">
        <p className="text-muted-foreground text-sm mb-3">Или ни се обадете директно:</p>
        <a href="tel:0884997659" className="inline-flex items-center gap-2 text-xl font-bold text-accent hover:text-accent/80 transition-colors">
          <Phone className="w-5 h-5" /> 088 499 7659
        </a>
      </div>
    </div>
  );
};

export default MultiStepInquiryForm;
