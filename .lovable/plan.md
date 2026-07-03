# Правилна tracking структура: 1 реален lead = 1 Ads Conversion

## Проблем

Текущата логика в `src/lib/conversions.ts` изпраща `conversion` event **към двата Google Ads акаунта** (`AW-17872435541` и `AW-18066399675`) за едно действие. Ако и в двата акаунта е конфигуриран `call_click` като Primary conversion → 1 обаждане = **2 конверсии**. Същият риск съществува и за `quote_submit`.

Освен това при последната редакция премахнахме напълно `generate_lead` и не сме имали remarketing audience event, което обяснява защо в Google Ads/GA4 вече не се виждат тези помощни събития.

## Решение

Един източник на истина: `src/lib/conversions.ts`. Всички реални Ads conversions отиват само в `AW-18066399675`. GA4 получава помощни събития. `user_data` остава прикачен към реалната Ads conversion (Enhanced Conversions), не като отделно събитие.

### 1. `src/lib/conversions.ts` — пренаписване на логиката

- Заменям масива `GOOGLE_ADS_ACCOUNTS` с една константа `PRIMARY_ADS_ACCOUNT = "AW-18066399675"`. `AW-17872435541` спира да получава conversion events — остава активен в `index.html` само за page views / remarketing аудитории.
- `gtag("set", "user_data", {...})` продължава да се извиква преди conversion event-а (Enhanced Conversions). Без промяна в структурата на хешираните данни (email/phone SHA-256, city в чист вид).
- Един `gtag("event", "conversion", { send_to: "AW-18066399675/<label>", ... })` на действие. `transaction_id` остава за дедупликация.
- След реалната Ads conversion добавям **GA4-only** помощни събития — без `send_to`, така Google Ads не може да ги внесе като Primary:
  - `gtag("event", "generate_lead", { value, currency, lead_source: kind })` — за формите (`form`, `calculator`, `chatbot`, `inspection`).
  - `gtag("event", "lead_engagement", { lead_source: kind })` — универсално remarketing audience event и за форми, и за обаждания. Използва се в GA4 → Google Ads като Audience trigger, не като conversion.
- Meta Pixel (`fbq("track", "Lead", ...)`) и TikTok Pixel остават без промяна — по 1 event на действие.

### 2. Проверка, че няма други места, които палят Ads conversions

Бърза ревизия на:
- `src/lib/analytics.ts` — `trackCallClick` вече минава само през `fireLeadConversion("call", ...)`. Оставя се както е.
- `src/pages/ThankYouPage.tsx` — вече не пали conversion. Оставя се както е.
- `src/components/PriceCalculator.tsx` — вече пали само веднъж (на unlock). Оставя се както е.
- `src/components/QuoteRequestForm.tsx` и `src/components/MultiStepInquiryForm.tsx` — `submitting` guard-ът е на място, без промяна.
- `index.html` — `gtag('config', 'AW-17872435541')` и `gtag('config', 'AW-18066399675')` остават (нужни за page view / remarketing / auto-tagging). Не се добавя inline conversion snippet.

### 3. Резултат в Google Ads / GA4

| Действие | Google Ads (AW-18066399675) | Google Ads (AW-17872435541) | GA4 |
|---|---|---|---|
| Попълнена форма | 1× `quote_submit` (Primary) + Enhanced Conv user_data | — | `generate_lead` + `lead_engagement` |
| Обаждане (tel: click) | 1× `call_click` (Primary) + Enhanced Conv user_data | — | `lead_engagement` |
| Chatbot lead | 1× `quote_submit` + user_data | — | `generate_lead` + `lead_engagement` |
| Заявка за оглед | 1× `inspection_form` + user_data | — | `generate_lead` + `lead_engagement` |

**Primary conversions** (Google Ads настройка от твоя страна, не в кода):
- `quote_submit` — форма
- `call_click` — обаждане
- `inspection_form` — оглед

**Secondary / audience** (стой като Secondary или Audience-only в Google Ads):
- Всичко импортнато от GA4 (`generate_lead`, `lead_engagement`) → използвай за ремаркетинг списъци, **не** го маркирай като Primary conversion, иначе се връща дублирането.

## За твоя страна в Google Ads (извън кода)

1. В `AW-17872435541` → Goals → Conversions: увери се, че `call_click` и `quote_submit` са изключени / не Primary. Кодът вече няма да им праща събития, но старите настройки могат да продължат да броят исторически.
2. В `AW-18066399675` → провери, че `call_click`, `quote_submit`, `inspection_form` съществуват като Primary conversion actions с точно тези имена (те са labels, не conversion IDs — трябва да съвпадат с това, което вече е конфигурирано).
3. Ако импортираш GA4 events в Ads (`generate_lead`, `lead_engagement`) → задължително ги остави на **Secondary**, за да не се броят като реални leads.

## Технически файлове за промяна

- `src/lib/conversions.ts` — единствен реален code change.

Не пипам компоненти, форми, `analytics.ts`, `index.html`, edge functions или база данни.
