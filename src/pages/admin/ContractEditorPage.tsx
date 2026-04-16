import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowLeft, Save, Eye, Download, Mail, MessageCircle, Phone as PhoneIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const COMPANY_INFO = {
  name: "Булгар Билд ЕООД",
  brand: "Булгар Билд",
  subtitle: "Ремонт на Покриви Варна",
  address: "ул. Уста Колю Фичето 25 А, Варна",
  phone: "088 499 7659",
  website: "remontnapokrivivarna.bg",
};

const DEFAULT_CONTRACT_CLAUSES = `ДОГОВОР ЗА СТРОИТЕЛНО-РЕМОНТНИ ДЕЙНОСТИ

I. ПРЕДМЕТ НА ДОГОВОРА
Изпълнителят се задължава да извърши строително-ремонтни дейности на покрива на обекта, описан по-долу, съгласно одобрената оферта.

II. СРОК НА ИЗПЪЛНЕНИЕ
Срокът за изпълнение на дейностите е _____ работни дни от датата на подписване на настоящия договор и получаване на авансово плащане.

III. ЦЕНА И НАЧИН НА ПЛАЩАНЕ
3.1. Общата стойност на договора е съгласно приложената оферта.
3.2. Плащането се извършва съгласно фактурния график от офертата.

IV. ЗАДЪЛЖЕНИЯ НА ИЗПЪЛНИТЕЛЯ
4.1. Да извърши дейностите качествено и в срок.
4.2. Да използва материали с доказано качество.
4.3. Да спазва всички норми за безопасност.
4.4. Да почисти обекта след приключване на работата.

V. ЗАДЪЛЖЕНИЯ НА ВЪЗЛОЖИТЕЛЯ
5.1. Да осигури достъп до обекта.
5.2. Да извърши плащанията в уговорените срокове.
5.3. Да приеме работата при нейното завършване.

VI. ГАРАНЦИЯ
6.1. Изпълнителят предоставя гаранция от 10 (десет) години за извършените СМР дейности.
6.2. Гаранцията за вложените материали е съгласно гаранционните условия на производителя.
6.3. Гаранцията не покрива повреди, причинени от непреодолима сила, неправилна експлоатация или намеса на трети лица.

VII. НЕУСТОЙКИ
7.1. При забава на Изпълнителя — 0.1% от стойността на договора за всеки просрочен ден.
7.2. При забава на плащане от Възложителя — 0.1% от дължимата сума за всеки просрочен ден.

VIII. ПРЕКРАТЯВАНЕ
Договорът може да бъде прекратен по взаимно съгласие или при съществено нарушение от една от страните.

IX. ЗАКЛЮЧИТЕЛНИ РАЗПОРЕДБИ
За всички неуредени в настоящия договор въпроси се прилагат разпоредбите на действащото българско законодателство.`;

const DEFAULT_GENERAL_TERMS = `ОБЩИ УСЛОВИЯ (ПРАВЕН ДОПЪЛНЕНИЕ)

1. Настоящият договор влиза в сила от датата на подписването му от двете страни.
2. Всякакви изменения и допълнения към настоящия договор се извършват в писмена форма и са валидни след подписването им от двете страни.
3. Спорове между страните се решават чрез преговори, а при невъзможност — от компетентния съд.
4. Договорът се изготвя в два еднообразни екземпляра — по един за всяка страна.
5. Неразделна част от договора е одобрената оферта с всичките й приложения.`;

const ContractEditorPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();

  const [inquiry, setInquiry] = useState<any>(null);
  const [quote, setQuote] = useState<any>(null);
  const [contract, setContract] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [preview, setPreview] = useState(false);

  const [clientName, setClientName] = useState("");
  const [clientAddress, setClientAddress] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [materialDetails, setMaterialDetails] = useState("");
  const [customClauses, setCustomClauses] = useState(DEFAULT_CONTRACT_CLAUSES);
  const [generalTerms, setGeneralTerms] = useState(DEFAULT_GENERAL_TERMS);
  const [manualAdditions, setManualAdditions] = useState("");

  useEffect(() => {
    const fetch = async () => {
      const [{ data: inq }, { data: quotes }, { data: contracts }] = await Promise.all([
        supabase.from("inquiries").select("*").eq("id", id).single(),
        supabase.from("quotes").select("*").eq("inquiry_id", id).order("created_at", { ascending: false }).limit(1),
        supabase.from("contracts").select("*").eq("inquiry_id", id).order("created_at", { ascending: false }).limit(1),
      ]);

      setInquiry(inq);

      if (contracts && contracts.length > 0) {
        const c = contracts[0];
        setContract(c);
        setClientName(c.client_name);
        setClientAddress(c.client_address || "");
        setClientPhone(c.client_phone);
        setClientEmail(c.client_email);
        setTotalPrice(c.total_price);
        setMaterialDetails(c.material_details || "");
        setCustomClauses(c.custom_clauses || DEFAULT_CONTRACT_CLAUSES);
      } else if (inq) {
        setClientName(inq.name);
        setClientAddress(inq.address || "");
        setClientPhone(inq.phone);
        setClientEmail(inq.email);
      }

      if (quotes && quotes.length > 0) {
        const q = quotes[0] as any;
        setQuote(q);
        if (!contracts || contracts.length === 0) {
          setTotalPrice(q.total || 0);
          const items = (q.items as any[]) || [];
          setMaterialDetails(items.map((i: any) => `${i.description} — ${(i.qty * i.unit_price).toFixed(2)} EUR`).join("\n"));
        }
      }

      setLoading(false);
    };
    fetch();
  }, [id]);

  const handleSave = async () => {
    setSaving(true);
    const payload = {
      inquiry_id: id!,
      quote_id: quote?.id || null,
      created_by: user!.id,
      client_name: clientName,
      client_address: clientAddress || null,
      client_phone: clientPhone,
      client_email: clientEmail,
      total_price: totalPrice,
      material_details: materialDetails || null,
      custom_clauses: customClauses,
    };

    if (contract) {
      await supabase.from("contracts").update(payload).eq("id", contract.id);
    } else {
      const { data } = await supabase.from("contracts").insert(payload).select().single();
      if (data) setContract(data);
    }
    toast({ title: "Договорът е запазен" });
    setSaving(false);
  };

  const pageHeader = (date: string) => `
    <div style="display:flex;justify-content:space-between;align-items:center;padding-bottom:14px;border-bottom:3px solid #ea580c;margin-bottom:24px">
      <div>
        <div style="font-size:20px;font-weight:800;color:#ea580c;letter-spacing:0.5px">${COMPANY_INFO.brand}</div>
        <div style="font-size:10px;color:#9ca3af">${COMPANY_INFO.subtitle} — ${COMPANY_INFO.name}</div>
      </div>
      <div style="text-align:right;font-size:11px;color:#6b7280">${date}</div>
    </div>`;

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

  const generatePrintableHtml = () => {
    const date = new Date().toLocaleDateString("bg-BG");
    return `<!DOCTYPE html><html lang="bg"><head><meta charset="UTF-8">
<style>
@media print {
  body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  @page { margin: 18mm 20mm; size: A4; }
}
body{font-family:'Helvetica Neue',Arial,sans-serif;color:#1a1a1a;margin:0;padding:36px 40px;font-size:13px;line-height:1.6}
.page-break{break-before:page}
</style></head><body>

<!-- PAGE 1: COVER -->
${pageHeader(date)}

<div style="text-align:center;margin:40px 0 30px">
  <h1 style="margin:0;font-size:32px;font-weight:800;color:#1f2937;letter-spacing:1px">ДОГОВОР</h1>
  <p style="margin:6px 0 0;font-size:14px;color:#6b7280">за строително-монтажни дейности</p>
</div>

<div style="display:flex;gap:24px;margin-bottom:28px">
  <div style="flex:1;background:#f9fafb;border-radius:8px;padding:16px;border-left:4px solid #ea580c">
    <p style="font-weight:700;margin:0 0 6px;font-size:13px;color:#ea580c">ВЪЗЛОЖИТЕЛ</p>
    <p style="margin:2px 0;font-size:12.5px">${clientName}</p>
    <p style="margin:2px 0;font-size:12.5px">${clientEmail}</p>
    <p style="margin:2px 0;font-size:12.5px">${clientPhone}</p>
    ${clientAddress ? `<p style="margin:2px 0;font-size:12.5px">${clientAddress}</p>` : ""}
  </div>
  <div style="flex:1;background:#f9fafb;border-radius:8px;padding:16px;border-left:4px solid #0d9488">
    <p style="font-weight:700;margin:0 0 6px;font-size:13px;color:#0d9488">ИЗПЪЛНИТЕЛ</p>
    <p style="margin:2px 0;font-size:12.5px">${COMPANY_INFO.name}</p>
    <p style="margin:2px 0;font-size:12.5px">${COMPANY_INFO.address}</p>
    <p style="margin:2px 0;font-size:12.5px">тел: ${COMPANY_INFO.phone}</p>
    <p style="margin:2px 0;font-size:12.5px">${COMPANY_INFO.website}</p>
  </div>
</div>

<div style="background:#f0fdf4;border-radius:8px;padding:16px;margin-bottom:28px;border-left:4px solid #16a34a">
  <p style="font-weight:700;margin:0 0 4px;font-size:15px;color:#16a34a">Обща стойност: ${Number(totalPrice).toFixed(2)} EUR</p>
  <p style="margin:0;font-size:11px;color:#6b7280">Сумата е без включен ДДС</p>
</div>

${materialDetails ? sidebarSection("ОПИСАНИЕ НА ДЕЙНОСТИТЕ И МАТЕРИАЛИТЕ", materialDetails, "#ea580c") : ""}

<!-- PAGE 2: CONTRACT CLAUSES -->
<div class="page-break">
${pageHeader(date)}
${sidebarSection("ДОГОВОРНИ КЛАУЗИ", customClauses, "#374151")}
</div>

<!-- PAGE 3: GENERAL TERMS & MANUAL ADDITIONS -->
<div class="page-break">
${pageHeader(date)}
${generalTerms ? sidebarSection("ОБЩИ УСЛОВИЯ", generalTerms, "#0d9488") : ""}
${manualAdditions ? sidebarSection("ДОПЪЛНИТЕЛНИ ДОГОВОРКИ", manualAdditions, "#7c3aed") : ""}

<div style="margin-top:50px;display:flex;justify-content:space-between">
  <div style="text-align:center;width:40%">
    <p style="font-weight:700;font-size:13px;margin:0 0 4px">${COMPANY_INFO.name}</p>
    <p style="font-size:11px;color:#6b7280;margin:0">Изпълнител</p>
    <div style="border-top:1px solid #374151;margin-top:60px;padding-top:8px;font-size:11px;color:#9ca3af">Подпис и печат</div>
  </div>
  <div style="text-align:center;width:40%">
    <p style="font-weight:700;font-size:13px;margin:0 0 4px">${clientName}</p>
    <p style="font-size:11px;color:#6b7280;margin:0">Възложител</p>
    <div style="border-top:1px solid #374151;margin-top:60px;padding-top:8px;font-size:11px;color:#9ca3af">Подпис</div>
  </div>
</div>
</div>

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

  const getShareMessage = () => `Здравейте ${clientName}, изпращаме Ви договор от ${COMPANY_INFO.brand} на стойност ${Number(totalPrice).toFixed(2)} EUR. За въпроси: ${COMPANY_INFO.phone}`;
  const handleWhatsApp = () => {
    const phone = clientPhone?.replace(/\s/g, "").replace(/^0/, "+359");
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(getShareMessage())}`, "_blank");
  };
  const handleViber = () => {
    const phone = clientPhone?.replace(/\s/g, "").replace(/^0/, "+359");
    window.open(`viber://chat?number=${encodeURIComponent(phone)}&text=${encodeURIComponent(getShareMessage())}`, "_blank");
  };
  const handleEmail = () => {
    window.open(`mailto:${clientEmail}?subject=${encodeURIComponent(`Договор от ${COMPANY_INFO.brand}`)}&body=${encodeURIComponent(getShareMessage())}`, "_blank");
  };

  if (loading) {
    return <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" /></div>;
  }

  if (preview) {
    return (
      <div>
        <div className="flex flex-wrap gap-3 mb-4">
          <Button variant="ghost" onClick={() => setPreview(false)}>
            <ArrowLeft className="h-4 w-4 mr-2" /> Обратно към редакция
          </Button>
          <Button variant="outline" onClick={handleDownloadPdf}>
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
          {contract ? "Редакция на договор" : "Нов договор"} — {clientName}
        </h1>
      </div>

      <div className="bg-card rounded-xl border border-border p-6 space-y-4">
        <Accordion type="multiple" defaultValue={["client", "clauses"]} className="space-y-2">

          <AccordionItem value="client" className="border rounded-lg px-4">
            <AccordionTrigger className="text-sm font-semibold">📋 Данни на клиента</AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-2">
                <div><label className="text-xs text-muted-foreground">Име</label><Input value={clientName} onChange={(e) => setClientName(e.target.value)} /></div>
                <div><label className="text-xs text-muted-foreground">Адрес</label><Input value={clientAddress} onChange={(e) => setClientAddress(e.target.value)} /></div>
                <div><label className="text-xs text-muted-foreground">Телефон</label><Input value={clientPhone} onChange={(e) => setClientPhone(e.target.value)} /></div>
                <div><label className="text-xs text-muted-foreground">Имейл</label><Input value={clientEmail} onChange={(e) => setClientEmail(e.target.value)} /></div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="price" className="border rounded-lg px-4">
            <AccordionTrigger className="text-sm font-semibold">💰 Стойност</AccordionTrigger>
            <AccordionContent>
              <div className="py-2">
                <label className="text-xs text-muted-foreground">Обща стойност (EUR)</label>
                <Input type="number" value={totalPrice} onChange={(e) => setTotalPrice(Number(e.target.value))} className="w-48" />
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="materials" className="border rounded-lg px-4">
            <AccordionTrigger className="text-sm font-semibold">🏗️ Описание на дейностите</AccordionTrigger>
            <AccordionContent>
              <Textarea value={materialDetails} onChange={(e) => setMaterialDetails(e.target.value)} rows={6} className="mt-2 font-mono text-sm" />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="clauses" className="border rounded-lg px-4">
            <AccordionTrigger className="text-sm font-semibold">📜 Договорни клаузи</AccordionTrigger>
            <AccordionContent>
              <Textarea value={customClauses} onChange={(e) => setCustomClauses(e.target.value)} rows={20} className="mt-2 font-mono text-sm" />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="general-terms" className="border rounded-lg px-4">
            <AccordionTrigger className="text-sm font-semibold">⚖️ Общи условия (правен допълнение)</AccordionTrigger>
            <AccordionContent>
              <Textarea value={generalTerms} onChange={(e) => setGeneralTerms(e.target.value)} rows={8} className="mt-2 font-mono text-sm" />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="manual" className="border rounded-lg px-4">
            <AccordionTrigger className="text-sm font-semibold">✏️ Допълнителни договорки</AccordionTrigger>
            <AccordionContent>
              <Textarea value={manualAdditions} onChange={(e) => setManualAdditions(e.target.value)} rows={4} placeholder="Специфични договорки за конкретния проект..." className="mt-2" />
            </AccordionContent>
          </AccordionItem>

        </Accordion>

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

export default ContractEditorPage;
