import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { quote_id } = await req.json();
    if (!quote_id) throw new Error("quote_id is required");

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, serviceKey);

    const { data: quote, error: qErr } = await supabase.from("quotes").select("*").eq("id", quote_id).single();
    if (qErr || !quote) throw new Error("Quote not found");

    const { data: inquiry } = await supabase.from("inquiries").select("*").eq("id", quote.inquiry_id).single();
    if (!inquiry) throw new Error("Inquiry not found");

    const items = (quote.items || []) as Array<{ description: string; qty: number; unit: string; unit_price: number }>;
    const date = new Date().toLocaleDateString("bg-BG");

    const itemRows = items.map((item) => `
      <tr>
        <td style="padding:8px;border-bottom:1px solid #eee">${item.description}</td>
        <td style="padding:8px;border-bottom:1px solid #eee;text-align:right">${item.qty}</td>
        <td style="padding:8px;border-bottom:1px solid #eee;text-align:right">${item.unit}</td>
        <td style="padding:8px;border-bottom:1px solid #eee;text-align:right">${Number(item.unit_price).toFixed(2)} лв</td>
        <td style="padding:8px;border-bottom:1px solid #eee;text-align:right">${(item.qty * item.unit_price).toFixed(2)} лв</td>
      </tr>
    `).join("");

    const discountRow = quote.discount > 0
      ? `<tr><td colspan="4" style="padding:8px;text-align:right;color:#16a34a">Отстъпка:</td><td style="padding:8px;text-align:right;color:#16a34a">-${Number(quote.discount).toFixed(2)} лв</td></tr>`
      : "";

    const html = `<!DOCTYPE html>
<html lang="bg">
<head><meta charset="UTF-8"><style>
body{font-family:'Helvetica Neue',Arial,sans-serif;color:#1a1a1a;margin:0;padding:40px}
table{width:100%;border-collapse:collapse}
.header{display:flex;justify-content:space-between;margin-bottom:40px}
.total-row{font-size:18px;font-weight:bold;border-top:2px solid #333}
</style></head>
<body>
<div class="header">
  <div>
    <h1 style="margin:0;font-size:20px;color:#ea580c">Ремонт Руф Прос</h1>
    <p style="color:#666;margin:4px 0">тел: 088 499 7659</p>
    <p style="color:#666;margin:4px 0">remontnapokrivivarna.bg</p>
  </div>
  <div style="text-align:right">
    <h2 style="margin:0;font-size:28px">ОФЕРТА</h2>
    <p style="color:#666;margin:4px 0">Дата: ${date}</p>
    <p style="color:#666;margin:4px 0">Валидност: ${quote.validity_days} дни</p>
  </div>
</div>

<div style="background:#f9fafb;border-radius:8px;padding:16px;margin-bottom:24px">
  <p style="font-weight:bold;margin:0 0 4px">Клиент:</p>
  <p style="margin:2px 0">${inquiry.name}</p>
  <p style="margin:2px 0">${inquiry.email}</p>
  <p style="margin:2px 0">${inquiry.phone}</p>
</div>

<table>
  <thead>
    <tr style="border-bottom:2px solid #333">
      <th style="padding:8px;text-align:left">Описание</th>
      <th style="padding:8px;text-align:right">Кол.</th>
      <th style="padding:8px;text-align:right">Ед.</th>
      <th style="padding:8px;text-align:right">Ед. цена</th>
      <th style="padding:8px;text-align:right">Сума</th>
    </tr>
  </thead>
  <tbody>
    ${itemRows}
    <tr><td colspan="4" style="padding:8px;text-align:right">Междинна сума:</td><td style="padding:8px;text-align:right">${Number(quote.subtotal).toFixed(2)} лв</td></tr>
    ${discountRow}
    <tr class="total-row"><td colspan="4" style="padding:12px 8px;text-align:right">Общо:</td><td style="padding:12px 8px;text-align:right">${Number(quote.total).toFixed(2)} лв</td></tr>
  </tbody>
</table>

${quote.terms ? `<div style="margin-top:32px;padding-top:16px;border-top:1px solid #ddd">
  <h3 style="margin:0 0 8px">Условия:</h3>
  <p style="color:#666;white-space:pre-line">${quote.terms}</p>
</div>` : ""}
</body></html>`;

    return new Response(JSON.stringify({ html }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
