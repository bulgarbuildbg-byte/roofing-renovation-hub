import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Save, Eye, Download, Mail, MessageCircle, Phone as PhoneIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const COMPANY_INFO = {
  name: "България Билд ЕООД",
  brand: "Ремонт на Покриви Варна",
  address: "ул. Уста Колю Фичето 25 А, Варна",
  phone: "088 499 7659",
  website: "remontnapokrivivarna.bg",
};

const DEFAULT_CLAUSES = `ДОГОВОР ЗА СТРОИТЕЛНО-РЕМОНТНИ ДЕЙНОСТИ

I. ПРЕДМЕТ НА ДОГОВОРА
Изпълнителят се задължава да извърши строително-ремонтни дейности на покрива на обекта, описан по-долу, съгласно одобрената оферта.

II. СРОК НА ИЗПЪЛНЕНИЕ
Срокът за изпълнение на дейностите е _____ работни дни от датата на подписване на настоящия договор и получаване на авансово плащане.

III. ЦЕНА И НАЧИН НА ПЛАЩАНЕ
3.1. Общата стойност на договора е съгласно приложената оферта.
3.2. Плащането се извършва на два етапа:
   - 50% аванс при подписване на договора
   - 50% при приемане на работата

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
6.1. Изпълнителят предоставя гаранция от 5 (пет) години за извършените СМР дейности.
6.2. Гаранцията за вложените материали е съгласно гаранционните условия на производителя.
6.3. Гаранцията не покрива повреди, причинени от непреодолима сила, неправилна експлоатация или намеса на трети лица.

VII. НЕУСТОЙКИ
7.1. При забава на Изпълнителя — 0.1% от стойността на договора за всеки просрочен ден.
7.2. При забава на плащане от Възложителя — 0.1% от дължимата сума за всеки просрочен ден.

VIII. ПРЕКРАТЯВАНЕ
Договорът може да бъде прекратен по взаимно съгласие или при съществено нарушение от една от страните.

IX. ЗАКЛЮЧИТЕЛНИ РАЗПОРЕДБИ
За всички неуредени в настоящия договор въпроси се прилагат разпоредбите на действащото българско законодателство.`;

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
  const [customClauses, setCustomClauses] = useState(DEFAULT_CLAUSES);

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
        setCustomClauses(c.custom_clauses || DEFAULT_CLAUSES);
      } else if (inq) {
        setClientName(inq.name);
        setClientAddress(inq.address || "");
        setClientPhone(inq.phone);
        setClientEmail(inq.email);
      }

      if (quotes && quotes.length > 0) {
        setQuote(quotes[0]);
        if (!contracts || contracts.length === 0) {
          setTotalPrice(quotes[0].total || 0);
          const items = (quotes[0].items as any[]) || [];
          setMaterialDetails(items.map((i) => `${i.description} (${i.qty} ${i.unit})`).join("\n"));
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

  const generatePrintableHtml = () => {
    const date = new Date().toLocaleDateString("bg-BG");
    return `<!DOCTYPE html><html lang="bg"><head><meta charset="UTF-8">
<style>
@media print { body { -webkit-print-color-adjust: exact; print-color-adjust: exact; } @page { margin: 20mm; size: A4; } }
body{font-family:'Helvetica Neue',Arial,sans-serif;color:#1a1a1a;margin:0;padding:40px;font-size:13px;line-height:1.6}
.header{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:30px;padding-bottom:20px;border-bottom:3px solid #ea580c}
.stamp{border:2px solid #333;border-radius:50%;width:90px;height:90px;display:flex;align-items:center;justify-content:center;text-align:center;font-size:10px;color:#333}
.signatures{display:flex;justify-content:space-between;margin-top:60px}
.sig-block{width:40%;text-align:center}
.sig-line{border-top:1px solid #333;margin-top:60px;padding-top:8px}
</style></head><body>
<div class="header">
  <div>
    <h1 style="margin:0;font-size:20px;color:#ea580c">${COMPANY_INFO.brand}</h1>
    <p style="color:#666;margin:4px 0;font-size:12px">Подразделение на ${COMPANY_INFO.name}</p>
    <p style="color:#666;margin:4px 0">${COMPANY_INFO.address}</p>
    <p style="color:#666;margin:4px 0">тел: ${COMPANY_INFO.phone}</p>
  </div>
  <div style="text-align:right">
    <h2 style="margin:0;font-size:24px;color:#333">ДОГОВОР</h2>
    <p style="color:#666;margin:4px 0">Дата: ${date}</p>
  </div>
</div>

<div style="background:#f9fafb;border-radius:8px;padding:16px;margin-bottom:24px">
  <div style="display:flex;gap:40px">
    <div>
      <p style="font-weight:bold;margin:0 0 4px">Изпълнител:</p>
      <p style="margin:2px 0">${COMPANY_INFO.name}</p>
      <p style="margin:2px 0">${COMPANY_INFO.address}</p>
      <p style="margin:2px 0">тел: ${COMPANY_INFO.phone}</p>
    </div>
    <div>
      <p style="font-weight:bold;margin:0 0 4px">Възложител:</p>
      <p style="margin:2px 0">${clientName}</p>
      <p style="margin:2px 0">${clientEmail}</p>
      <p style="margin:2px 0">${clientPhone}</p>
      ${clientAddress ? `<p style="margin:2px 0">Адрес: ${clientAddress}</p>` : ""}
    </div>
  </div>
</div>

<div style="margin-bottom:24px">
  <p style="font-weight:bold;margin:0 0 4px">Обща стойност: ${Number(totalPrice).toFixed(2)} лв</p>
</div>

${materialDetails ? `<div style="margin-bottom:24px">
  <p style="font-weight:bold;margin:0 0 4px">Описание на дейностите и материалите:</p>
  <p style="white-space:pre-line;color:#555">${materialDetails}</p>
</div>` : ""}

<div style="white-space:pre-line">${customClauses}</div>

<div class="signatures">
  <div class="sig-block">
    <p style="font-weight:bold">${COMPANY_INFO.name}</p>
    <div class="sig-line">Подпис и печат на Изпълнителя</div>
  </div>
  <div class="sig-block">
    <p style="font-weight:bold">${clientName}</p>
    <div class="sig-line">Подпис на Възложителя</div>
  </div>
</div>
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

  const getShareMessage = () => `Здравейте ${clientName}, изпращаме Ви договор от ${COMPANY_INFO.brand} на стойност ${Number(totalPrice).toFixed(2)} лв. За въпроси: ${COMPANY_INFO.phone}`;

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
          <Button variant="outline" onClick={handleEmail}>
            <Mail className="h-4 w-4 mr-2" /> Email
          </Button>
          <Button variant="outline" onClick={handleWhatsApp} className="text-green-600 border-green-600 hover:bg-green-50">
            <MessageCircle className="h-4 w-4 mr-2" /> WhatsApp
          </Button>
          <Button variant="outline" onClick={handleViber} className="text-purple-600 border-purple-600 hover:bg-purple-50">
            <PhoneIcon className="h-4 w-4 mr-2" /> Viber
          </Button>
        </div>
        <div className="bg-white text-black rounded-xl border p-8 max-w-3xl mx-auto">
          <div className="flex items-start justify-between mb-6 pb-4 border-b-2 border-orange-500">
            <div>
              <h1 className="text-xl font-bold text-orange-600">{COMPANY_INFO.brand}</h1>
              <p className="text-xs text-gray-500">Подразделение на {COMPANY_INFO.name}</p>
              <p className="text-sm text-gray-600">{COMPANY_INFO.address}</p>
              <p className="text-sm text-gray-600">тел: {COMPANY_INFO.phone}</p>
            </div>
            <div className="text-right">
              <h2 className="text-2xl font-bold">ДОГОВОР</h2>
              <p className="text-sm text-gray-500">Дата: {new Date().toLocaleDateString("bg-BG")}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-6 p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-semibold text-sm">Изпълнител:</p>
              <p className="text-sm">{COMPANY_INFO.name}</p>
              <p className="text-sm">{COMPANY_INFO.address}</p>
            </div>
            <div>
              <p className="font-semibold text-sm">Възложител:</p>
              <p className="text-sm">{clientName}</p>
              <p className="text-sm">{clientEmail}</p>
              <p className="text-sm">{clientPhone}</p>
              {clientAddress && <p className="text-sm">Адрес: {clientAddress}</p>}
            </div>
          </div>

          <p className="font-bold mb-4">Обща стойност: {Number(totalPrice).toFixed(2)} лв</p>

          {materialDetails && (
            <div className="mb-4">
              <p className="font-semibold text-sm mb-1">Описание на дейностите:</p>
              <p className="text-sm whitespace-pre-line text-gray-600">{materialDetails}</p>
            </div>
          )}

          <div className="whitespace-pre-line text-sm leading-relaxed">{customClauses}</div>

          <div className="flex justify-between mt-16">
            <div className="text-center w-2/5">
              <p className="font-semibold text-sm">{COMPANY_INFO.name}</p>
              <div className="border-t border-gray-400 mt-16 pt-2 text-xs text-gray-500">Подпис и печат на Изпълнителя</div>
            </div>
            <div className="text-center w-2/5">
              <p className="font-semibold text-sm">{clientName}</p>
              <div className="border-t border-gray-400 mt-16 pt-2 text-xs text-gray-500">Подпис на Възложителя</div>
            </div>
          </div>
        </div>
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

      <div className="bg-card rounded-xl border border-border p-6 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-muted-foreground">Име на клиент</label>
            <Input value={clientName} onChange={(e) => setClientName(e.target.value)} />
          </div>
          <div>
            <label className="text-sm text-muted-foreground">Адрес на обекта</label>
            <Input value={clientAddress} onChange={(e) => setClientAddress(e.target.value)} />
          </div>
          <div>
            <label className="text-sm text-muted-foreground">Телефон</label>
            <Input value={clientPhone} onChange={(e) => setClientPhone(e.target.value)} />
          </div>
          <div>
            <label className="text-sm text-muted-foreground">Имейл</label>
            <Input value={clientEmail} onChange={(e) => setClientEmail(e.target.value)} />
          </div>
        </div>

        <div>
          <label className="text-sm text-muted-foreground">Обща стойност (лв)</label>
          <Input type="number" value={totalPrice} onChange={(e) => setTotalPrice(Number(e.target.value))} className="w-48" />
        </div>

        <div>
          <label className="text-sm text-muted-foreground">Описание на дейностите и материалите</label>
          <Textarea value={materialDetails} onChange={(e) => setMaterialDetails(e.target.value)} rows={4} />
        </div>

        <div>
          <label className="text-sm text-muted-foreground">Клаузи на договора</label>
          <Textarea value={customClauses} onChange={(e) => setCustomClauses(e.target.value)} rows={20} className="font-mono text-sm" />
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

export default ContractEditorPage;
