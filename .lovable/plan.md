## Диагноза на дублираните конверсии

Проверих сайта и намерих **точния източник на дублирането** — той е изцяло **вътре в платформата/сайта**, не е GTM, GA4 импорт или CRM.

### Какво се случва при изпращане на форма „Заявете оферта"

1. `QuoteRequestForm.tsx` (ред 106) извиква `fireLeadConversion("form", ...)` → изпраща `event: conversion` към `AW-17872435541/quote_submit` **и** `AW-18066399675/quote_submit`, плюс `generate_lead` (GA4).
2. Веднага след това (ред 109) прави `navigate(...)` към `/bg/blagodarim-vi`.
3. `ThankYouPage.tsx` (редове 20–37) при монтиране **отново** извиква:
   - `gtag("event","conversion", send_to: "AW-17872435541/quote_submit")`
   - `gtag("event","conversion", send_to: "AW-18066399675/quote_submit")`
   - `dataLayer.push({event:"quote_submitted"})`

Резултат: едно реално запитване = **2× Conversion hit** към същия AW-ID и същия label. Точно това вижда Tag Assistant.

### Втори (по-мек) източник на дублиране

`PriceCalculator.tsx` пуска `fireLeadConversion("calculator", ...)` **два пъти** в един поток:
- Ред 382 — при „отключване" на цената (потребителят въвежда телефон, за да види ориентировъчна цена) → 1× Conversion.
- Ред 320 — ако след това направи и пълно запитване → още 1× Conversion със същия label.

Един и същ потребител = 2 конверсии за Ads.

### Какво НЕ е причина

- Няма GTM контейнер в `index.html` — само директен gtag.js. Значи няма дублиране „сайт + GTM".
- Няма втори `AW-…/config`. И двата акаунта (`AW-17872435541`, `AW-18066399675`) имат по един `config`.
- CRM/Supabase не изпраща нищо към Google Ads — само записва в базата.
- Другите форми (`MultiStepInquiryForm`, `InspectionPage`, `useChatFunnel`, обажданията през `trackCallClick`) минават **само** през `fireLeadConversion` — те изпращат по 1× Conversion, коректно.

---

## План за поправка

### 1. `src/pages/ThankYouPage.tsx` — премахване на дублиращия conversion код
- Махам `useEffect`-а, който извиква `window.gtag("event","conversion", ...)` към двата AW акаунта и `dataLayer.push({event:"quote_submitted"})`.
- Оставям само `trackEvent("conversion", "quote_request_submitted")` за вътрешната аналитика в базата (не отива към Google).
- Причина: конверсията към Google Ads вече е изпратена от `QuoteRequestForm` при submit. Thank-you страницата не трябва да я изпраща повторно.

### 2. `src/components/PriceCalculator.tsx` — една конверсия на потребител
- Оставям `fireLeadConversion("calculator", ...)` **само** на unlock (ред 382) — това е реалният lead момент (телефонът е уловен).
- Премахвам повторния `fireLeadConversion(...)` от пълния submit (ред 320). Замествам го с обикновен `trackEvent(...)` за вътрешна CRM аналитика, за да продължим да виждаме „пълно запитване" отделно, но без втори hit към Google Ads.

### 3. Защита срещу бъдещо повторно въвеждане
- Добавям кратък коментар в началото на `src/lib/conversions.ts`, че **всяка** Google Ads конверсия трябва да минава само през `fireLeadConversion` и никога през директен inline `gtag("event","conversion", …)` в компонент/страница.
- Записвам правило в паметта на проекта: „Google Ads conversions се изпращат единствено през `fireLeadConversion`. Никакви inline `gtag conversion` извиквания в страници (включително thank-you). Конверсията се изпраща при момента на lead-а, не при показване на thank-you."

### 4. Проверка след поправката
- `rg -n "gtag\(.*conversion" src/` — трябва да върне резултати само от `src/lib/conversions.ts`. Ако върне нещо в страница или компонент — сигнал за нов дубликат.
- Тест с Tag Assistant за 4-те сценария, които поиска клиентът:
  - клик на телефон → 1× Conversion (`call_click`, и в двата AW акаунта — това е нормално, това са 2 отделни акаунта, не 2× за същия акаунт);
  - submit на форма „Заявете оферта" → 1× Conversion (`quote_submit`), thank-you страницата НЕ пали втора;
  - submit през чатбота → 1× Conversion (`quote_submit`);
  - зареждане без действие → 0 Conversion (само page_view/remarketing hit-ове, което е коректно).

### Какво остава като нормално поведение (не е дублиране)

- `Remarketing` hit при всяко зареждане на страница — това идва от `gtag("config","AW-…")` и е стандартно, не е конверсия.
- `User provided data` hit преди Conversion — това е Enhanced Conversions (хешираните email/phone). Един такъв hit преди един Conversion е коректно.
- `generate_lead` (GA4 event) — това е GA4, не Google Ads конверсия. Няма да го брои Ads, освен ако не е импортнат като конверсия. **Важно:** ако клиентът вече е импортнал `generate_lead` от GA4 в Google Ads като конверсия, ще получи трети дубликат. Препоръка към клиента: в Google Ads → Conversions да се остави активна **само** конверсията с action name `quote_submit` (директната от gtag) и `generate_lead` от GA4 импорт да се маркира като „Secondary" или да се изтрие. Аз мога да проверя това само в кода — настройките в Google Ads UI трябва да ги прегледа клиентът.
- Двата AW акаунта (`AW-17872435541` и `AW-18066399675`) получават по 1 Conversion всеки при едно действие. Ако клиентът иска само един от тях да отчита, кажи ми кой да махна.

## Обобщение

Дублирането идва от **сайта**: `QuoteRequestForm` пуска конверсия при submit и `ThankYouPage` я пуска отново при монтиране. Малко по-мек дубликат има и в `PriceCalculator` (unlock + full submit). Поправката е локална, в 2 файла, без промяна по GTM/GA4/CRM.