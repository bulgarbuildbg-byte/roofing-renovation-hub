## Цел

В момента системата класифицира трафика само като `direct / organic / social / referral / email`. Всичко от Facebook Ads, Google Ads и TikTok Ads попада в `social` или `direct` без да знаем, че е платено. Този план въвежда пълна маркетинг атрибуция: **канал (channel) + източник (source) + кампания** — за всяка сесия, всяко запитване и всяко обаждане, с исторически графики.

---

## 1. Нов модел на канали (channel)

Всяка сесия ще получи 2 нива:
- **channel** (основно): `google_ads`, `meta_ads`, `tiktok_ads`, `organic`, `social_organic`, `direct`, `referral`, `email`
- **source / campaign**: конкретен източник (напр. `facebook / summer_promo`)

### Логика на класификация (по приоритет)
```
1. gclid в URL           -> google_ads
2. fbclid / utm_source=facebook|instagram + utm_medium=paid|cpc|ads -> meta_ads
3. ttclid / utm_source=tiktok + utm_medium=paid|cpc              -> tiktok_ads
4. utm_medium=cpc|ppc|paid|display                                -> paid_other (+ utm_source)
5. Referrer facebook/instagram/tiktok без UTM                     -> social_organic
6. Google/Bing/Yahoo referrer                                     -> organic
7. Друг referrer                                                  -> referral
8. Няма referrer, няма UTM                                        -> direct
```

**First-touch** атрибуция: първият канал за сесията се запазва в `sessionStorage` (както сега `analytics_first_referrer_source`) и се използва за запитването/обаждането.

---

## 2. Промени по базата данни (миграция)

Добавяне на нови колони (nullable, за да не счупим стари редове):

```sql
-- analytics_events
ALTER TABLE analytics_events
  ADD COLUMN channel text,
  ADD COLUMN utm_content text,
  ADD COLUMN utm_term text,
  ADD COLUMN gclid text,
  ADD COLUMN fbclid text,
  ADD COLUMN ttclid text,
  ADD COLUMN landing_page text;
CREATE INDEX idx_analytics_events_channel ON analytics_events(channel);

-- inquiries (first-touch на запитването)
ALTER TABLE inquiries
  ADD COLUMN channel text,
  ADD COLUMN utm_source text,
  ADD COLUMN utm_medium text,
  ADD COLUMN utm_campaign text,
  ADD COLUMN utm_content text,
  ADD COLUMN utm_term text,
  ADD COLUMN gclid text,
  ADD COLUMN fbclid text,
  ADD COLUMN ttclid text,
  ADD COLUMN landing_page text;

-- call_log (за обаждания от tel: линкове)
ALTER TABLE call_log
  ADD COLUMN session_id text,
  ADD COLUMN channel text,
  ADD COLUMN utm_source text,
  ADD COLUMN utm_medium text,
  ADD COLUMN utm_campaign text,
  ADD COLUMN referrer_source text,
  ADD COLUMN page_path text,
  ADD COLUMN source text DEFAULT 'manual'; -- 'manual' | 'web_click'
```
Публична INSERT политика за `call_log` за `source='web_click'` (за да могат анонимните tel: click-ове да пишат), + GRANT INSERT на `anon`. Съществуващите admin политики остават непроменени.

---

## 3. Frontend промени

### `src/lib/analytics.ts` — нова функция `classifyChannel()`
Заменя частично `classifyReferrer`. Приема URL params + referrer + запомнени click IDs → връща `{ channel, utm_*, gclid, fbclid, ttclid }`. Записва first-touch в sessionStorage (един обект вместо само referrer_source). Персистира `gclid/fbclid/ttclid` в `localStorage` за 90 дни (стандартна attribution window).

### `AnalyticsTracker.tsx`
Изпраща новите полета във всяко `page_view`. Landing page = първата страница в сесията.

### Записване на call clicks (нов ефект в `AnalyticsTracker`)
При `tel:` click освен `trackEvent`, прави INSERT в `call_log` с `source='web_click'`, атрибуцията от sessionStorage и телефонния номер. Така обажданията ще имат канал.

### Форми (`MultiStepInquiryForm`, `QuoteRequestForm`, `PriceCalculator`, `QuickContactForm`, `Contact`)
Всяка вече праща `session_id` и `referrer_source`. Разширяваме payload-а с `channel`, всички UTM полета и click ID-та — четени от sessionStorage helper `getAttribution()`.

---

## 4. Нови/променени административни изгледи

### 4a. `AnalyticsPage.tsx` — разширение
- **KPI карти**: Сесии, Запитвания, Обаждания, Конверсия — по канал.
- **Голяма графика "Трафик по канал (исторически)"**: stacked area по дни за избран период (7/30/90 дни), с легенда за всеки от `google_ads`, `meta_ads`, `tiktok_ads`, `organic`, `social_organic`, `direct`, `referral`, `email`.
- **Таблица "Резултат по канал"**: канал | сесии | запитвания | обаждания | конв. % | лиди/ден.
- **Дриллдаун по кампания**: клик върху канал → таблица с `utm_source / utm_campaign` разбивка.

### 4b. Нова страница `MarketingAttributionPage.tsx` (`/admin/marketing-attribution`)
Специализирано табло за реклами:
- Филтри: период, канал (Google Ads / Meta / TikTok / All Paid).
- Таблица кампания-по-кампания: impressions (сесии), запитвания, обаждания, лиди общо, CPL-ready колона (ръчно въведен бюджет по-късно).
- Sparkline тренд на всяка кампания.
- Секция "Ефективни vs. слаби кампании" — авто-сортиране по конверсия.

### 4c. `InquiryListPage.tsx` + `InquiryDetailPage.tsx`
- Нова колона / badge "Канал" (цветен: жълт=Google Ads, син=Meta, розов=TikTok, зелен=organic, сив=direct).
- Филтър по канал в списъка.
- В детайла: пълен attribution блок (channel, utm_source, campaign, gclid, landing page, referrer).

### 4d. `CallLogPage.tsx`
- Колона "Канал" и филтър.
- Отделяне на web-clicked обаждания vs. ръчно въведени (icon).

---

## 5. Техническа секция

**Файлове за създаване/промяна:**
- `supabase/migrations/*_attribution.sql` — колони + политика/GRANT за анонимен `call_log` insert.
- `src/lib/attribution.ts` (нов) — `classifyChannel`, `getAttribution`, `persistClickIds`.
- `src/lib/analytics.ts` — интеграция с новите helpers, разширен `trackEvent` payload, `trackCallClick` пише в `call_log`.
- `src/components/AnalyticsTracker.tsx` — праща новите полета.
- 5-те форми — добавят attribution към INSERT.
- `src/pages/admin/AnalyticsPage.tsx` — нов channel breakdown + stacked history chart.
- `src/pages/admin/MarketingAttributionPage.tsx` (нов) + route в `App.tsx` + линк в admin sidebar.
- `src/pages/admin/InquiryListPage.tsx`, `InquiryDetailPage.tsx`, `CallLogPage.tsx` — колони, филтри, badges.

**Recharts:** използваме `AreaChart` (stacked) за история, `BarChart` за channel breakdown, `LineChart` за sparklines.

**Обратна съвместимост:** старите редове без `channel` ще се показват като `unknown` в графиките; един back-fill SQL ще ги мапне (organic/direct/social) от `referrer_source` при миграцията.

**Тестване:** ръчно посещение с `?utm_source=facebook&utm_medium=paid&utm_campaign=test` и `?gclid=abc` за верификация, че се появяват в правилен канал; тестово запитване + tel: click за проверка на end-to-end атрибуция.

---

## Извън обхвата (за по-късно)
- Автоматично издърпване на разходи от Google/Meta/TikTok API за реален CPL/ROAS (изисква API ключове).
- Multi-touch атрибуция (last-touch, linear). За сега: first-touch.
- Server-side conversion API за Meta/TikTok.
