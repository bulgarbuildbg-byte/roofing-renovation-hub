import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowLeft, Plus, Trash2, Save, Eye, Download, Mail, MessageCircle, Phone as PhoneIcon, Upload, X, Image } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type LineItem = { description: string; qty: number; unit: string; unit_price: number; notes: string };

const COMPANY_INFO = {
  name: "България Билд ЕООД",
  brand: "Булгар Билд",
  subtitle: "Ремонт на Покриви Варна",
  address: "ул. Уста Колю Фичето 25 А, Варна",
  phone: "088 499 7659",
  website: "remontnapokrivivarna.bg",
  parent: "bulgarbuild.com",
};

const DEFAULT_WORK_PHASES = `Първа стъпка: Подготвителни дейности
- Демонтаж на съществуващото покритие и инспекция на конструкцията
- Оценка на дървената конструкция и при необходимост подмяна на компрометирани елементи

Приоритети при изпълнение:
1. Хидроизолация и отводняване — основен приоритет за предотвратяване на течове
2. Покривна конструкция — укрепване и подмяна при необходимост
3. Полагане на нова хидроизолация и пароизолация
4. Монтаж на ново покривно покритие
5. Монтаж на водосточна система и аксесоари
6. Финални довършителни работи и почистване`;

const DEFAULT_INVOICING = `Фактуриране и етапи на плащане:

• 30% аванс — при подписване на договора и преди стартиране на дейностите
• 50% — при достигане на етап „груб монтаж" (завършена конструкция и хидроизолация)
• 80% — при завършване на покривното покритие и водосточната система
• 100% — при окончателно приемане на обекта и подписване на приемо-предавателен протокол`;

const DEFAULT_WARRANTY = `Гаранционни условия:

Изпълнителят предоставя гаранция от 10 (десет) години за извършените строително-монтажни дейности, считано от датата на подписване на приемо-предавателния протокол.

Гаранцията за вложените материали е съгласно гаранционните условия на съответния производител и е не по-малка от 15 години.

Гаранцията не покрива повреди, причинени от:
- Непреодолима сила (природни бедствия)
- Неправилна експлоатация
- Намеса на трети лица без съгласието на Изпълнителя`;

const DEFAULT_FORCE_MAJEURE = `Форсмажорни обстоятелства:

Страните не носят отговорност за забавяне или неизпълнение на задълженията си, причинено от обстоятелства извън техния контрол, включително, но не само:
- Неблагоприятни атмосферни условия (температури под 5°C, проливен дъжд, силен вятър)
- Природни бедствия
- Ограничения наложени от държавни органи
- Прекъсване на доставки на материали по независещи от Изпълнителя причини

При настъпване на форсмажорно обстоятелство, срокът за изпълнение се удължава съответно.`;

const DEFAULT_TECHNICAL_NOTES = `Техническа обосновка:

Последователността на строително-монтажните дейности е определена съгласно техническите изисквания и добрите строителни практики:

1. Отводнителната система се монтира преди покривното покритие, за да се осигури правилен отток на водата от самото начало.
2. Хидроизолацията се полага преди покривните материали за максимална защита на конструкцията.
3. Покривното покритие се монтира отгоре надолу, за правилно припокриване и водоплътност.`;

const DEFAULT_TERMS = `Общи условия:

1. Валидност на офертата: 1 (един) месец от датата на издаване.
2. Начин на плащане: Съгласно фактурния график, описан по-горе.
3. Срок за изпълнение: Уточнява се допълнително след подписване на договор.
4. Офертата не включва ДДС, освен ако изрично не е посочено.
5. Цените са валидни при нормални атмосферни условия за работа.
6. Допълнителни дейности, неупоменати в офертата, се договарят отделно.
7. Изпълнителят се задължава да спазва всички норми за безопасност.
8. При подписване на договор, клиентът осигурява достъп до обекта.`;

const QuoteEditorPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();

  const [inquiry, setInquiry] = useState<any>(null);
  const [existingQuote, setExistingQuote] = useState<any>(null);
  const [items, setItems] = useState<LineItem[]>([
    { description: "", qty: 1, unit: "бр.", unit_price: 0, notes: "" },
  ]);
  const [discount, setDiscount] = useState(0);
  const [validityDays, setValidityDays] = useState(30);
  const [preview, setPreview] = useState(false);
  const [saving, setSaving] = useState(false);

  // Modular text blocks
  const [workDescription, setWorkDescription] = useState("");
  const [workPhases, setWorkPhases] = useState(DEFAULT_WORK_PHASES);
  const [invoicingSchedule, setInvoicingSchedule] = useState(DEFAULT_INVOICING);
  const [warrantyText, setWarrantyText] = useState(DEFAULT_WARRANTY);
  const [forceMajeure, setForceMajeure] = useState(DEFAULT_FORCE_MAJEURE);
  const [technicalNotes, setTechnicalNotes] = useState(DEFAULT_TECHNICAL_NOTES);
  const [manualAdditions, setManualAdditions] = useState("");
  const [terms, setTerms] = useState(DEFAULT_TERMS);
  const [photoUrls, setPhotoUrls] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const [{ data: inq }, { data: quotes }] = await Promise.all([
        supabase.from("inquiries").select("*").eq("id", id).single(),
        supabase.from("quotes").select("*").eq("inquiry_id", id).order("created_at", { ascending: false }).limit(1),
      ]);
      setInquiry(inq);
      if (inq && !quotes?.length) {
        setWorkDescription(inq.description || "");
      }
      if (quotes && quotes.length > 0) {
        const q = quotes[0] as any;
        setExistingQuote(q);
        const loadedItems = (q.items as any[]) || [];
        setItems(loadedItems.map((i: any) => ({ ...i, notes: i.notes || "" })));
        setDiscount(q.discount || 0);
        setValidityDays(q.validity_days || 30);
        setTerms(q.terms || DEFAULT_TERMS);
        setWorkDescription(q.work_description || inq?.description || "");
        setWorkPhases(q.work_phases || DEFAULT_WORK_PHASES);
        setInvoicingSchedule(q.invoicing_schedule || DEFAULT_INVOICING);
        setWarrantyText(q.warranty_text || DEFAULT_WARRANTY);
        setForceMajeure(q.force_majeure || DEFAULT_FORCE_MAJEURE);
        setTechnicalNotes(q.technical_notes || DEFAULT_TECHNICAL_NOTES);
        setManualAdditions(q.manual_additions || "");
        setPhotoUrls(q.photo_urls || []);
      }
    };
    fetchData();
  }, [id]);

  const subtotal = items.reduce((sum, i) => sum + i.qty * i.unit_price, 0);
  const total = subtotal - discount;

  const updateItem = (index: number, field: keyof LineItem, value: any) => {
    const updated = [...items];
    (updated[index] as any)[field] = value;
    setItems(updated);
  };
  const addItem = () => setItems([...items, { description: "", qty: 1, unit: "бр.", unit_price: 0, notes: "" }]);
  const removeItem = (i: number) => setItems(items.filter((_, idx) => idx !== i));

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setUploading(true);
    const newUrls: string[] = [];
    for (const file of Array.from(files)) {
      const ext = file.name.split(".").pop();
      const path = `${id}/${Date.now()}-${Math.random().toString(36).substr(2, 9)}.${ext}`;
      const { error } = await supabase.storage.from("document-photos").upload(path, file);
      if (!error) {
        const { data } = supabase.storage.from("document-photos").getPublicUrl(path);
        newUrls.push(data.publicUrl);
      }
    }
    setPhotoUrls((prev) => [...prev, ...newUrls]);
    setUploading(false);
    toast({ title: `${newUrls.length} снимки качени успешно` });
  };

  const removePhoto = (index: number) => {
    setPhotoUrls((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    setSaving(true);
    const payload: any = {
      inquiry_id: id,
      created_by: user!.id,
      items: items as any,
      subtotal,
      discount,
      total,
      terms,
      validity_days: validityDays,
      status: "draft" as const,
      work_description: workDescription || null,
      work_phases: workPhases || null,
      invoicing_schedule: invoicingSchedule || null,
      warranty_text: warrantyText || null,
      force_majeure: forceMajeure || null,
      technical_notes: technicalNotes || null,
      manual_additions: manualAdditions || null,
      photo_urls: photoUrls,
    };

    if (existingQuote) {
      await supabase.from("quotes").update(payload).eq("id", existingQuote.id);
    } else {
      const { data } = await supabase.from("quotes").insert(payload).select().single();
      if (data) setExistingQuote(data);
    }
    toast({ title: "Офертата е запазена" });
    setSaving(false);
  };

  const generatePrintableHtml = () => {
    const date = new Date().toLocaleDateString("bg-BG");
    const itemRows = items.map((item, idx) => `
      <tr>
        <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb">${idx + 1}</td>
        <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb">${item.description}</td>
        <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;text-align:right">${Number(item.unit_price * item.qty).toFixed(2)} EUR</td>
        <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb">${item.notes || ""}</td>
      </tr>
    `).join("");

    const sidebarSection = (title: string, content: string, color = "#0d9488") => `
      <div style="margin-bottom:28px;page-break-inside:avoid">
        <div style="display:flex;gap:0">
          <div style="width:6px;background:${color};border-radius:3px;flex-shrink:0"></div>
          <div style="padding:12px 16px;flex:1">
            <h3 style="margin:0 0 10px;font-size:15px;font-weight:700;color:${color};text-transform:uppercase;letter-spacing:0.5px">${title}</h3>
            <div style="white-space:pre-line;color:#374151;font-size:12.5px;line-height:1.7">${content}</div>
          </div>
        </div>
      </div>`;

    const pageHeader = (d: string) => `
      <div style="display:flex;justify-content:space-between;align-items:center;padding-bottom:14px;border-bottom:3px solid #ea580c;margin-bottom:24px">
        <div>
          <div style="font-size:20px;font-weight:800;color:#ea580c;letter-spacing:0.5px">${COMPANY_INFO.brand}</div>
          <div style="font-size:10px;color:#9ca3af">${COMPANY_INFO.subtitle} — ${COMPANY_INFO.name}</div>
        </div>
        <div style="text-align:right;font-size:11px;color:#6b7280">${d}</div>
      </div>`;

    const photoSection = photoUrls.length > 0 ? `
      <div style="break-before:page">
        ${pageHeader(date)}
        <div style="margin-bottom:28px">
          <div style="display:flex;gap:0;margin-bottom:20px">
            <div style="width:6px;background:#0d9488;border-radius:3px;flex-shrink:0"></div>
            <div style="padding:12px 16px"><h3 style="margin:0;font-size:15px;font-weight:700;color:#0d9488;text-transform:uppercase;letter-spacing:0.5px">ФОТО ГАЛЕРИЯ</h3></div>
          </div>
          <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:16px">
            ${photoUrls.map((url) => `<img src="${url}" style="width:100%;height:200px;object-fit:cover;border-radius:8px;border:1px solid #e5e7eb" />`).join("")}
          </div>
        </div>
      </div>` : "";

    return `<!DOCTYPE html><html lang="bg"><head><meta charset="UTF-8">
<style>
@media print {
  body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  @page { margin: 18mm 20mm; size: A4; }
}
body{font-family:'Helvetica Neue',Arial,sans-serif;color:#1a1a1a;margin:0;padding:36px 40px;font-size:13px;line-height:1.6}
table{width:100%;border-collapse:collapse}
.page-break{break-before:page}
</style></head><body>

<!-- PAGE 1: COVER -->
${pageHeader(date)}

<div style="text-align:center;margin:40px 0 30px">
  <h1 style="margin:0;font-size:32px;font-weight:800;color:#1f2937;letter-spacing:1px">ОФЕРТА</h1>
  <p style="margin:6px 0 0;font-size:14px;color:#6b7280">за строително-монтажни дейности</p>
  <p style="margin:4px 0 0;font-size:12px;color:#9ca3af">Валидност: ${validityDays} дни от датата на издаване</p>
</div>

<div style="display:flex;gap:24px;margin-bottom:28px">
  <div style="flex:1;background:#f9fafb;border-radius:8px;padding:16px;border-left:4px solid #ea580c">
    <p style="font-weight:700;margin:0 0 6px;font-size:13px;color:#ea580c">ВЪЗЛОЖИТЕЛ</p>
    <p style="margin:2px 0;font-size:12.5px">${inquiry?.name || ""}</p>
    <p style="margin:2px 0;font-size:12.5px">${inquiry?.email || ""}</p>
    <p style="margin:2px 0;font-size:12.5px">${inquiry?.phone || ""}</p>
    ${inquiry?.address ? `<p style="margin:2px 0;font-size:12.5px">${inquiry.address}</p>` : ""}
  </div>
  <div style="flex:1;background:#f9fafb;border-radius:8px;padding:16px;border-left:4px solid #0d9488">
    <p style="font-weight:700;margin:0 0 6px;font-size:13px;color:#0d9488">ИЗПЪЛНИТЕЛ</p>
    <p style="margin:2px 0;font-size:12.5px">${COMPANY_INFO.name}</p>
    <p style="margin:2px 0;font-size:12.5px">${COMPANY_INFO.address}</p>
    <p style="margin:2px 0;font-size:12.5px">тел: ${COMPANY_INFO.phone}</p>
    <p style="margin:2px 0;font-size:12.5px">${COMPANY_INFO.website}</p>
  </div>
</div>

${workDescription ? sidebarSection("РАБОТЕН ПРОЕКТ", workDescription, "#ea580c") : ""}

<!-- PAGE 2: WORK PHASES & TECHNICAL NOTES -->
<div class="page-break">
${pageHeader(date)}
${workPhases ? sidebarSection("ЕТАПИ И ПРИОРИТЕТИ НА ИЗПЪЛНЕНИЕ", workPhases) : ""}
${technicalNotes ? sidebarSection("ТЕХНИЧЕСКА ОБОСНОВКА", technicalNotes, "#6366f1") : ""}
</div>

<!-- PAGE 3: ITEMIZED TABLE -->
<div class="page-break">
${pageHeader(date)}
<div style="margin-bottom:28px">
  <div style="display:flex;gap:0;margin-bottom:16px">
    <div style="width:6px;background:#ea580c;border-radius:3px;flex-shrink:0"></div>
    <div style="padding:12px 16px"><h3 style="margin:0;font-size:15px;font-weight:700;color:#ea580c;text-transform:uppercase;letter-spacing:0.5px">КОЛИЧЕСТВЕНО-СТОЙНОСТНА СМЕТКА</h3></div>
  </div>
  <table>
    <thead>
      <tr style="background:#f3f4f6">
        <th style="padding:10px 12px;text-align:left;font-size:11px;font-weight:700;color:#374151;text-transform:uppercase;border-bottom:2px solid #d1d5db;width:40px">№</th>
        <th style="padding:10px 12px;text-align:left;font-size:11px;font-weight:700;color:#374151;text-transform:uppercase;border-bottom:2px solid #d1d5db">Описание</th>
        <th style="padding:10px 12px;text-align:right;font-size:11px;font-weight:700;color:#374151;text-transform:uppercase;border-bottom:2px solid #d1d5db;width:120px">Цена EUR</th>
        <th style="padding:10px 12px;text-align:left;font-size:11px;font-weight:700;color:#374151;text-transform:uppercase;border-bottom:2px solid #d1d5db;width:160px">Забележки</th>
      </tr>
    </thead>
    <tbody>
      ${itemRows}
    </tbody>
  </table>
  <div style="display:flex;justify-content:flex-end;margin-top:16px">
    <div style="width:280px">
      <div style="display:flex;justify-content:space-between;padding:6px 0;font-size:13px"><span>Междинна сума:</span><span>${subtotal.toFixed(2)} EUR</span></div>
      ${discount > 0 ? `<div style="display:flex;justify-content:space-between;padding:6px 0;font-size:13px;color:#16a34a"><span>Отстъпка:</span><span>-${discount.toFixed(2)} EUR</span></div>` : ""}
      <div style="display:flex;justify-content:space-between;padding:10px 0;font-size:18px;font-weight:800;border-top:2px solid #1f2937;margin-top:4px"><span>Общо:</span><span>${total.toFixed(2)} EUR</span></div>
      <div style="text-align:right;font-size:11px;color:#6b7280;margin-top:2px">Сумата е без включен ДДС</div>
    </div>
  </div>
</div>
</div>

<!-- PAGE 4: INVOICING, WARRANTY, FORCE MAJEURE -->
<div class="page-break">
${pageHeader(date)}
${invoicingSchedule ? sidebarSection("ФАКТУРИРАНЕ", invoicingSchedule, "#d97706") : ""}
${warrantyText ? sidebarSection("ГАРАНЦИЯ", warrantyText, "#0d9488") : ""}
${forceMajeure ? sidebarSection("ФОРСМАЖОРНИ ОБСТОЯТЕЛСТВА", forceMajeure, "#6b7280") : ""}
</div>

<!-- PAGE 5: TERMS & MANUAL ADDITIONS -->
<div class="page-break">
${pageHeader(date)}
${terms ? sidebarSection("ОБЩИ УСЛОВИЯ", terms, "#374151") : ""}
${manualAdditions ? sidebarSection("ДОПЪЛНИТЕЛНИ БЕЛЕЖКИ", manualAdditions, "#7c3aed") : ""}

<div style="margin-top:50px;display:flex;justify-content:space-between">
  <div style="text-align:center;width:40%">
    <p style="font-weight:700;font-size:13px;margin:0 0 4px">${COMPANY_INFO.name}</p>
    <p style="font-size:11px;color:#6b7280;margin:0">Изпълнител</p>
    <div style="border-top:1px solid #374151;margin-top:60px;padding-top:8px;font-size:11px;color:#9ca3af">Подпис и печат</div>
  </div>
  <div style="text-align:center;width:40%">
    <p style="font-weight:700;font-size:13px;margin:0 0 4px">${inquiry?.name || ""}</p>
    <p style="font-size:11px;color:#6b7280;margin:0">Възложител</p>
    <div style="border-top:1px solid #374151;margin-top:60px;padding-top:8px;font-size:11px;color:#9ca3af">Подпис</div>
  </div>
</div>
</div>

${photoSection}

<div style="position:fixed;bottom:0;left:0;right:0;text-align:center;font-size:10px;color:#9ca3af;padding:8px">${COMPANY_INFO.brand} — ${COMPANY_INFO.name} | ${COMPANY_INFO.phone} | ${COMPANY_INFO.website}</div>

</body></html>`;
  };

  const handleDownloadPdf = () => {
    const html = generatePrintableHtml();
    const iframe = document.createElement("iframe");
    iframe.style.cssText = "position:fixed;right:0;bottom:0;width:0;height:0;border:0";
    document.body.appendChild(iframe);
    const doc = iframe.contentWindow?.document;
    if (doc) {
      doc.open();
      doc.write(html);
      doc.close();
      setTimeout(() => {
        iframe.contentWindow?.print();
        setTimeout(() => document.body.removeChild(iframe), 1000);
      }, 500);
    }
  };

  const getShareMessage = () => `Здравейте ${inquiry?.name}, изпращаме Ви оферта от ${COMPANY_INFO.brand} на стойност ${total.toFixed(2)} EUR. За въпроси: ${COMPANY_INFO.phone}`;
  const handleWhatsApp = () => {
    const phone = inquiry?.phone?.replace(/\s/g, "").replace(/^0/, "+359");
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(getShareMessage())}`, "_blank");
  };
  const handleViber = () => {
    const phone = inquiry?.phone?.replace(/\s/g, "").replace(/^0/, "+359");
    window.open(`viber://chat?number=${encodeURIComponent(phone)}&text=${encodeURIComponent(getShareMessage())}`, "_blank");
  };
  const handleEmail = () => {
    window.open(`mailto:${inquiry?.email}?subject=${encodeURIComponent(`Оферта от ${COMPANY_INFO.brand}`)}&body=${encodeURIComponent(getShareMessage())}`, "_blank");
  };

  if (!inquiry) {
    return <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" /></div>;
  }

  if (preview) {
    return (
      <div>
        <div className="flex flex-wrap gap-3 mb-4">
          <Button variant="ghost" onClick={() => setPreview(false)}>
            <ArrowLeft className="h-4 w-4 mr-2" /> Обратно към редакция
          </Button>
          <Button variant="outline" onClick={handleDownloadPdf} disabled={!existingQuote}>
            <Download className="h-4 w-4 mr-2" /> Изтегли PDF
          </Button>
          <Button variant="outline" onClick={handleEmail}><Mail className="h-4 w-4 mr-2" /> Email</Button>
          <Button variant="outline" onClick={handleWhatsApp} className="text-green-600 border-green-600 hover:bg-green-50">
            <MessageCircle className="h-4 w-4 mr-2" /> WhatsApp
          </Button>
          <Button variant="outline" onClick={handleViber} className="text-purple-600 border-purple-600 hover:bg-purple-50">
            <PhoneIcon className="h-4 w-4 mr-2" /> Viber
          </Button>
        </div>
        <div
          className="bg-white text-black rounded-xl border p-8 max-w-3xl mx-auto"
          dangerouslySetInnerHTML={{ __html: generatePrintableHtml().replace(/<!DOCTYPE.*?<body[^>]*>/s, "").replace(/<\/body>.*$/s, "") }}
        />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Button variant="ghost" size="icon" onClick={() => navigate(`/admin/inquiries/${id}`)}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold text-foreground">
          {existingQuote ? "Редакция на оферта" : "Нова оферта"} — {inquiry.name}
        </h1>
      </div>

      <div className="bg-card rounded-xl border border-border p-6 space-y-4">
        <Accordion type="multiple" defaultValue={["client", "items", "work-description"]} className="space-y-2">

          {/* CLIENT INFO */}
          <AccordionItem value="client" className="border rounded-lg px-4">
            <AccordionTrigger className="text-sm font-semibold">📋 Информация за клиента</AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-2">
                <div><label className="text-xs text-muted-foreground">Име</label><p className="font-medium">{inquiry.name}</p></div>
                <div><label className="text-xs text-muted-foreground">Телефон</label><p className="font-medium">{inquiry.phone}</p></div>
                <div><label className="text-xs text-muted-foreground">Имейл</label><p className="font-medium">{inquiry.email}</p></div>
                <div><label className="text-xs text-muted-foreground">Адрес</label><p className="font-medium">{inquiry.address || "—"}</p></div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* WORK DESCRIPTION */}
          <AccordionItem value="work-description" className="border rounded-lg px-4">
            <AccordionTrigger className="text-sm font-semibold">🏗️ Работен проект</AccordionTrigger>
            <AccordionContent>
              <Textarea value={workDescription} onChange={(e) => setWorkDescription(e.target.value)} rows={4} placeholder="Описание на проекта..." className="mt-2" />
            </AccordionContent>
          </AccordionItem>

          {/* WORK PHASES */}
          <AccordionItem value="work-phases" className="border rounded-lg px-4">
            <AccordionTrigger className="text-sm font-semibold">📐 Етапи и приоритети</AccordionTrigger>
            <AccordionContent>
              <Textarea value={workPhases} onChange={(e) => setWorkPhases(e.target.value)} rows={10} className="mt-2 font-mono text-sm" />
            </AccordionContent>
          </AccordionItem>

          {/* LINE ITEMS */}
          <AccordionItem value="items" className="border rounded-lg px-4">
            <AccordionTrigger className="text-sm font-semibold">📊 Количествено-стойностна сметка</AccordionTrigger>
            <AccordionContent>
              <div className="overflow-x-auto mt-2">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="min-w-[200px]">Описание</TableHead>
                      <TableHead className="w-20">Кол.</TableHead>
                      <TableHead className="w-20">Ед.</TableHead>
                      <TableHead className="w-28">Ед. цена (EUR)</TableHead>
                      <TableHead className="w-28">Сума</TableHead>
                      <TableHead className="min-w-[120px]">Забележки</TableHead>
                      <TableHead className="w-12" />
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {items.map((item, i) => (
                      <TableRow key={i}>
                        <TableCell><Input value={item.description} onChange={(e) => updateItem(i, "description", e.target.value)} placeholder="Описание" /></TableCell>
                        <TableCell><Input type="number" min={1} value={item.qty} onChange={(e) => updateItem(i, "qty", Number(e.target.value))} /></TableCell>
                        <TableCell><Input value={item.unit} onChange={(e) => updateItem(i, "unit", e.target.value)} /></TableCell>
                        <TableCell><Input type="number" min={0} step={0.01} value={item.unit_price} onChange={(e) => updateItem(i, "unit_price", Number(e.target.value))} /></TableCell>
                        <TableCell className="font-medium">{(item.qty * item.unit_price).toFixed(2)} EUR</TableCell>
                        <TableCell><Input value={item.notes} onChange={(e) => updateItem(i, "notes", e.target.value)} placeholder="Забележка" /></TableCell>
                        <TableCell>
                          {items.length > 1 && (
                            <Button variant="ghost" size="icon" onClick={() => removeItem(i)}>
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <Button variant="outline" size="sm" className="mt-3" onClick={addItem}>
                <Plus className="h-4 w-4 mr-1" /> Добави позиция
              </Button>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                <div><label className="text-sm text-muted-foreground">Междинна сума</label><p className="text-lg font-semibold">{subtotal.toFixed(2)} EUR</p></div>
                <div><label className="text-sm text-muted-foreground">Отстъпка (EUR)</label><Input type="number" min={0} value={discount} onChange={(e) => setDiscount(Number(e.target.value))} /></div>
                <div><label className="text-sm text-muted-foreground">Общо</label><p className="text-2xl font-bold text-accent">{total.toFixed(2)} EUR</p></div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* INVOICING */}
          <AccordionItem value="invoicing" className="border rounded-lg px-4">
            <AccordionTrigger className="text-sm font-semibold">💰 Фактуриране</AccordionTrigger>
            <AccordionContent>
              <Textarea value={invoicingSchedule} onChange={(e) => setInvoicingSchedule(e.target.value)} rows={8} className="mt-2 font-mono text-sm" />
            </AccordionContent>
          </AccordionItem>

          {/* WARRANTY */}
          <AccordionItem value="warranty" className="border rounded-lg px-4">
            <AccordionTrigger className="text-sm font-semibold">🛡️ Гаранция</AccordionTrigger>
            <AccordionContent>
              <Textarea value={warrantyText} onChange={(e) => setWarrantyText(e.target.value)} rows={8} className="mt-2 font-mono text-sm" />
            </AccordionContent>
          </AccordionItem>

          {/* FORCE MAJEURE */}
          <AccordionItem value="force-majeure" className="border rounded-lg px-4">
            <AccordionTrigger className="text-sm font-semibold">⚠️ Форсмажорни обстоятелства</AccordionTrigger>
            <AccordionContent>
              <Textarea value={forceMajeure} onChange={(e) => setForceMajeure(e.target.value)} rows={8} className="mt-2 font-mono text-sm" />
            </AccordionContent>
          </AccordionItem>

          {/* TECHNICAL NOTES */}
          <AccordionItem value="technical-notes" className="border rounded-lg px-4">
            <AccordionTrigger className="text-sm font-semibold">🔧 Техническа обосновка</AccordionTrigger>
            <AccordionContent>
              <Textarea value={technicalNotes} onChange={(e) => setTechnicalNotes(e.target.value)} rows={6} className="mt-2 font-mono text-sm" />
            </AccordionContent>
          </AccordionItem>

          {/* TERMS */}
          <AccordionItem value="terms" className="border rounded-lg px-4">
            <AccordionTrigger className="text-sm font-semibold">📜 Общи условия</AccordionTrigger>
            <AccordionContent>
              <Textarea value={terms} onChange={(e) => setTerms(e.target.value)} rows={10} className="mt-2 font-mono text-sm" />
            </AccordionContent>
          </AccordionItem>

          {/* MANUAL ADDITIONS */}
          <AccordionItem value="manual" className="border rounded-lg px-4">
            <AccordionTrigger className="text-sm font-semibold">✏️ Допълнителни бележки</AccordionTrigger>
            <AccordionContent>
              <Textarea value={manualAdditions} onChange={(e) => setManualAdditions(e.target.value)} rows={4} placeholder="Допълнителни бележки или специфични договорки..." className="mt-2" />
            </AccordionContent>
          </AccordionItem>

          {/* PHOTO GALLERY */}
          <AccordionItem value="photos" className="border rounded-lg px-4">
            <AccordionTrigger className="text-sm font-semibold">📸 Фото галерия</AccordionTrigger>
            <AccordionContent>
              <div className="mt-2 space-y-4">
                <label className="flex items-center gap-2 cursor-pointer border-2 border-dashed border-border rounded-lg p-6 justify-center hover:bg-muted/50 transition-colors">
                  <Upload className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{uploading ? "Качване..." : "Качи снимки"}</span>
                  <input type="file" multiple accept="image/*" onChange={handlePhotoUpload} className="hidden" disabled={uploading} />
                </label>
                {photoUrls.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {photoUrls.map((url, i) => (
                      <div key={i} className="relative group">
                        <img src={url} className="w-full h-24 object-cover rounded-lg border" alt="" />
                        <button onClick={() => removePhoto(i)} className="absolute top-1 right-1 bg-destructive text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>

        </Accordion>

        <div className="mt-2">
          <label className="text-sm text-muted-foreground">Валидност (дни)</label>
          <Input type="number" value={validityDays} onChange={(e) => setValidityDays(Number(e.target.value))} className="w-32" />
        </div>

        <div className="flex gap-3 pt-4 border-t border-border">
          <Button onClick={handleSave} disabled={saving}>
            <Save className="h-4 w-4 mr-2" /> {saving ? "Запазване..." : "Запази"}
          </Button>
          <Button variant="outline" onClick={() => setPreview(true)}>
            <Eye className="h-4 w-4 mr-2" /> Преглед
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuoteEditorPage;
