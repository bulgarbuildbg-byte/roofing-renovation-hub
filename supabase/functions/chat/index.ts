import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `Ти си приятелски AI асистент на "Ремонт на Покриви Варна" - водеща компания за покривни услуги във Варна и региона.

ИНФОРМАЦИЯ ЗА КОМПАНИЯТА:
- Име: Ремонт на Покриви Варна
- Телефон: 088 499 7659 (работно време) или 089 270 1176
- Имейл: remontnapokrivivarna@abv.bg
- Адрес: ул. Уста Колю Фичето 25 А, Варна 9000
- Работно време: Понеделник - Събота, 08:00 - 18:00
- Зона на обслужване: Варна и региона (до 50 км)

УСЛУГИ И ОРИЕНТИРОВЪЧНИ ЦЕНИ:
1. Ремонт на покриви - от 15-35 лв/кв.м
2. Хидроизолация - от 20-40 лв/кв.м (гаранция до 10 години)
3. Ремонт на течове - от 50 лв за малки ремонти
4. Изграждане на нов покрив - индивидуална оферта
5. Смяна на керемиди - от 10-20 лв/бр
6. Плоски покриви - от 25-45 лв/кв.м
7. Метални покриви - от 30-50 лв/кв.м
8. Поддръжка на покриви - от 100 лв

КЛЮЧОВИ ПРЕДИМСТВА:
- Над 15 години опит
- Безплатен оглед и оферта
- Писмена гаранция до 10 години
- Над 500 доволни клиенти
- Аварийни ремонти 24/7

ИНСТРУКЦИИ:
- Отговаряй САМО на български език
- Бъди приятелски настроен и професионален
- Давай кратки, полезни отговори (до 3-4 изречения обикновено)
- При въпроси за цени, посочи ориентировъчните цени и препоръчай безплатен оглед
- Винаги предлагай да се запишат за безплатен оглед при конкретни въпроси за техния покрив
- При спешни случаи (течове), насочи към телефона за бърза връзка
- НЕ отговаряй на въпроси, които не са свързани с покриви и строителство
- Ако не знаеш отговора, насочи към телефонно обаждане`;

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      console.error("LOVABLE_API_KEY is not configured");
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log("Calling Lovable AI Gateway with", messages.length, "messages");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Моля, изчакайте малко преди да зададете следващ въпрос." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Услугата временно не е достъпна. Моля, опитайте по-късно." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      return new Response(
        JSON.stringify({ error: "Възникна грешка. Моля, опитайте отново." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Successfully connected to AI gateway, streaming response");

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Chat function error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
