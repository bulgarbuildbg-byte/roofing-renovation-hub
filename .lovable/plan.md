
# План: Поведенческа аналитика в CRM (Microsoft Clarity + вградена)

Подходът следва твоята препоръка: **Microsoft Clarity** за тежката работа (session recordings, heatmaps, clickmaps, scrollmaps) + **нашата собствена `analytics_events` таблица** за CRM таймлайна и Device Analytics. Така не преизмисляме видео-запис от нулата, а в CRM профила на всеки lead виждаме пълната картина и линк към записа на сесията в Clarity.

## Защо Clarity (не Hotjar/FullStory/PostHog)

- Безплатен без лимит на трафика (Hotjar/FullStory са скъпи на нашия обем).
- Има официално API за custom tags → можем да маркираме сесия със `session_id`, `inquiry_id`, услуга, град, източник. Това позволява **директен deep-link** от CRM към конкретния запис.
- GDPR-friendly, маскира текст по подразбиране (важно за телефони/имена във формите).
- Можем да embed-нем Clarity dashboard през iframe в CRM, но deep-link към сесия е по-надежден.

PostHog е алтернативата, ако искаш всичко self-hosted и feature flags — но е overkill за нуждата.

## Какво ще се построи

### 1. Clarity интеграция (frontend)
- Нов компонент `ClarityTracker` в `src/components/` — зарежда скрипта само в production (не в `/admin/*` и не в preview).
- Подава custom tags при всяка навигация: `session_id` (вече имаме от `analytics.ts`), `referrer_source`, `city`, `service`, `device_type`, `lang`.
- При submit на форма → `clarity("set", "inquiry_id", <id>)` + `clarity("event", "form_submit")`.
- `CLARITY_PROJECT_ID` в `.env` (публичен ключ, ОК в кода).

### 2. Разширяване на `analytics_events` (за Device Analytics и Activity Timeline)
Таблицата вече съществува (10 колони). Migration добавя:
- `device_type` (mobile/tablet/desktop), `viewport_w/h`, `time_on_page_ms`, `exit_page` boolean, `clarity_session_url` (deep-link), `referrer_source`, `utm_source/medium/campaign`.
- Индекси по `session_id`, `inquiry_id`, `created_at`.
- Backfill чрез `AnalyticsTracker.tsx` — вече тракваме pageview, разширяваме с device + time on page (visibilitychange/beforeunload).

### 3. Linking към CRM lead
- В `QuoteRequestForm` / `MultiStepInquiryForm` при submit записваме `session_id` в `inquiries.session_id` (вече има поле според memory).
- Edge function `link-session-to-inquiry` обновява всички `analytics_events` за тази сесия с `inquiry_id` → пълен timeline.

### 4. CRM UI (нови страници/секции)

**a) `InquiryDetailPage` → нов таб "Activity Timeline"**
- Първо/последно посещение, общо време, брой сесии, устройство, източник.
- Хронологичен списък: страница → време прекарано → действия (клик на tel:, форма, calculator step и т.н.).
- Бутон **"Гледай запис в Clarity"** (отваря deep-link в нов таб с filter по `session_id` tag).
- Heatmap thumbnail за най-посетените страници на lead-а (embed от Clarity).

**b) Нова страница `/admin/behavior` — "Поведение на посетители"**
- 3 секции:
  - **Daily Top Sessions** — топ 3 сесии за деня по "engagement score" (брой страници × време × близост до конверсия). Всяка с thumbnail + Clarity линк.
  - Филтри: дата, страница, услуга, източник (Google Ads/FB/Instagram/Organic/Direct/Referral), устройство.
  - Логика за scoring в edge function `daily-top-sessions` (cron всеки ден 06:00).

**c) Нова страница `/admin/device-analytics` — "Анализ по устройства"**
- % посетители mobile/tablet/desktop (pie chart).
- Запитвания и conversion rate по устройство (bar chart).
- Топ услуги по устройство (table).
- Страници с най-много exits от mobile (table) — за UX оптимизация.
- Данните идват от `analytics_events` + `inquiries` join.

### 5. Engagement score (за daily top sessions)
```
score = pages_viewed * 10
      + (total_time_sec / 10)
      + (calculator_started ? 30 : 0)
      + (form_opened ? 40 : 0)
      + (phone_clicked ? 25 : 0)
      + (return_visitor ? 20 : 0)
```
Сесии с попълнена форма се изключват (вече са leads с пълен timeline в InquiryDetail).

## Структура на промените

```text
Frontend
  src/components/ClarityTracker.tsx          (нов)
  src/components/AnalyticsTracker.tsx        (разширяване: device, time on page, exit)
  src/components/QuoteRequestForm.tsx        (clarity event + session_id)
  src/components/MultiStepInquiryForm.tsx    (същото)
  src/pages/admin/InquiryDetailPage.tsx      (нов таб Timeline)
  src/pages/admin/BehaviorPage.tsx           (нов)
  src/pages/admin/DeviceAnalyticsPage.tsx    (нов)
  src/components/admin/ActivityTimeline.tsx  (нов, използван в InquiryDetail)
  src/components/admin/SessionCard.tsx       (нов, thumbnail + Clarity линк)
  src/App.tsx                                (routes за новите admin страници)
  src/components/Header.tsx (admin nav)      (линкове)

Backend
  supabase/migrations/<ts>_extend_analytics_events.sql
  supabase/functions/daily-top-sessions/index.ts    (cron 06:00)
  supabase/functions/link-session-to-inquiry/index.ts

Config
  .env: VITE_CLARITY_PROJECT_ID
  index.html: (по избор) предварителен Clarity snippet за non-admin pages
```

## Какво НЕ влиза в този план (отделни тикети)
- Self-hosted session recording от нулата.
- A/B testing на база scoring.
- Email алерти при "горещ" lead (може да се добави по-късно като edge function trigger).

## Какво искам да потвърдиш преди да започна
1. **Clarity project ID** — трябва да го създадеш на clarity.microsoft.com (безплатно, 2 мин). Ще ти дам стъпките след одобрение на плана.
2. **Маскиране на лични данни** — да оставя ли Clarity strict masking (маскира телефони/имена във формите по подразбиране)? Препоръчвам "да" заради GDPR.
3. **Embed в CRM** — предпочиташ ли (а) deep-link бутон "Виж в Clarity" в нов таб, или (б) iframe на Clarity dashboard вътре в `/admin/behavior`? Препоръка: (а) — Clarity не разрешава добре iframe embed и често блокира със CSP.
