## 1. Проблем с контраст (бутоните и календарът)

Причината: филтърните "чипове" на страницата `Маркетинг атрибуция` и другите админ страници използват `bg-muted/40` + `text-muted-foreground` — сивo върху сиво, текстът се вижда чак при hover. Същото важи за неактивните дати в `DateRangePicker`/`Calendar` (shadcn `Calendar` използва `text-muted-foreground` за outside-month дни).

Ще оправя:
- Range chips (7/30/90 дни) и channel filter chips: неактивно състояние → `bg-card border-border text-foreground` вместо `text-muted-foreground` (WCAG AA контраст в тъмна тема).
- Ще прегледам всички chip/pill групи в `MarketingAttributionPage`, `AnalyticsPage`, `RevenuePage`, `CallLogPage`, `InquiryListPage` и ще заменя ниско‑контрастните комбинации с design‑system токени.
- Календарът (`src/components/ui/calendar.tsx`): днешната дата, избраната дата и hover state ще получат ясен primary фон с бял текст; outside‑month дните — `text-foreground/60` вместо `text-muted-foreground`.

## 2. По‑прецизен отчет "Лидове по канал"

Секцията ще стане отделен блок с 3 подредени изгледа (табове):

**A. Разбивка по канал × тип лид** — стакова бар диаграма с колони: Google Ads, Meta Ads, TikTok Ads, Друга платена, Органично Google, Директно, Реферали, Имейл, Соц. мрежи (organic). Всяка колона стакира: `Запитване през форма`, `Обаждане от бутон`, `Чатбот лид`. Веднага се вижда „Google Ads даде 12 обаждания + 5 форми, Meta — 8 форми, 2 обаждания".

**B. История ден‑по‑ден за платените канали** — линейна диаграма за 7/30/90 дни само за `google_ads`, `meta_ads`, `tiktok_ads`; отделни линии за брой лидове. Показва „кога дойдоха, колко на ден", което иска потребителят.

**C. Кампании UTM (вече съществува)** — остава, добавям колона „Обаждания" отделно от „Форми" (в момента са слети в „Лидове").

Обажданията в момента се пишат в `call_log` с `channel`, `utm_*`, `gclid`, `fbclid`, `ttclid` при клик върху `tel:` бутона — тази атрибуция вече работи; тук просто я визуализираме по‑добре. Ръчните записи от админа остават извън чарта (както сега).

## 3. Google Ads — проверка и допълване

Текущо в `index.html`: два акаунта `AW-17872435541` и `AW-18066399675` заредени коректно. Firing action labels които намерих: `call_click`, `quote_submit`, `inspection_form`. Липсва:

- `MultiStepInquiryForm` (главната форма за оглед от Контакти) → не праща conversion към Google.
- Чатбот лидове → не пращат.
- Калкулаторът праща `quote_submit` само на пълната форма, не на "unlock price" стъпката.
- GA4 (`G-…`) не е инсталиран — без него не можем да ползваме reports в GA4 → Google Ads import.

Ще направя:
- Един централен helper `fireLeadConversion(kind, value)` в `src/lib/analytics.ts` който:
  1. Праща `gtag('event', 'conversion', …)` към двата AW акаунта с label според типа (`quote_submit`, `call_click`, `chatbot_lead`, `calculator_lead`).
  2. **Enhanced Conversions**: подава `user_data: { email_address, phone_number, address: { first_name, ... } }` към `gtag('set', 'user_data', …)` преди conversion — Google хешира от страна на клиента и мачва back в Ads. Точно това е "актуалната информация към Google" която иска потребителят и подобрява ROAS отчитането.
  3. Праща `gclid` (ако има) в `transaction_id` за точен match.
  4. Дублира събитието в GA4 (нов property, вижте по‑долу) като `generate_lead`.
- Ще извикам helper‑а от: `MultiStepInquiryForm`, `QuoteRequestForm` (замества съществуващия ръчен код), `PriceCalculator` (и на unlock, и на пълна форма), `InspectionPage`, `useChatFunnel`, и `trackCallClick`.

## 4. GA4 property (за да работят reports "по‑канал" в Google)

Ще добавя GA4 tag в `index.html`. Нужен ми е `Measurement ID` (започва с `G-…`) — ще питам потребителя преди билд. GA4 позволява import на аудитории в Google Ads и е стандартът за атрибуция.

## 5. Meta Ads Pixel + Conversions API готовност

`fbclid` вече ловим за атрибуция, но нищо не се праща обратно към Meta. Ще добавя Meta Pixel `fbq('init', PIXEL_ID)` в `index.html` и `fbq('track', 'Lead', {value, currency})` от `fireLeadConversion`. Ще ми трябва Pixel ID от потребителя.

## 6. TikTok Pixel

Аналогично, `ttq.load(TIKTOK_PIXEL_ID)` + `ttq.track('SubmitForm')` от helper‑а. Ще ми трябва Pixel ID.

## 7. База‑данни — без промени в схемата
`call_log` вече има `channel`, `utm_*`, `gclid`, `fbclid`, `ttclid`, `source`. Достатъчно за всичко по‑горе.

## Технически детайли

```text
src/lib/conversions.ts (нов)
 └── fireLeadConversion(kind: 'form'|'call'|'chatbot'|'calculator', payload)
       ├── window.gtag('set','user_data',{sha256Email, sha256Phone})   ← Enhanced Conv
       ├── window.gtag('event','conversion',{send_to:'AW-…/label'})    ← Google Ads
       ├── window.gtag('event','generate_lead',{value,currency})       ← GA4
       ├── window.fbq('track','Lead',{value,currency})                 ← Meta
       └── window.ttq.track('SubmitForm',{value,currency})             ← TikTok

src/pages/admin/MarketingAttributionPage.tsx
 ├── + Tabs: „По канал × тип" | „История — платени" | „Кампании"
 ├── + стакова BarChart (форми/обаждания/чат)
 ├── + линейна LineChart само google_ads/meta_ads/tiktok_ads
 └── контраст: chips → bg-card + text-foreground

src/components/ui/calendar.tsx  ← контраст fix (day_today, day_outside)
index.html                       ← + GA4, Meta Pixel, TikTok Pixel (след потвърждение на IDs)
```

Хеширане за Enhanced Conversions ще стане с вградения `crypto.subtle.digest('SHA-256')` — без външни зависимости.

## Отворени въпроси преди билд
Ако имаш `G-…` (GA4), Meta Pixel ID и TikTok Pixel ID, дай ги и добавям и трите. Ако нямаш, ще направя точки 1, 2, 3 (само Google Ads + Enhanced Conversions за съществуващите AW акаунти) веднага и оставям 4–6 за когато ги вземеш.