## Нова страница „Заявете оферта" — самостоятелен URL за конверсии

Изграждане на отделна продажбена страница за заявки/оферти с уникален URL, оптимизирана за Google Ads и проследяване на конверсии. Тя ще е различна от „Контакти" (фирмена информация) и от „Безплатен оглед" (вече съществуваща inspection страница).

### URL структура (всички 10 езика)

Нов `RouteKey: 'quote'` в `src/i18n/routes.ts`:

| Език | Slug |
|---|---|
| bg | `zayavete-oferta` |
| en | `request-quote` |
| de | `angebot-anfordern` |
| fr | `demander-devis` |
| nl | `offerte-aanvragen` |
| sv | `begar-offert` |
| no | `be-om-tilbud` |
| fi | `pyyda-tarjous` |
| ru | `zaprosit-predlozhenie` |
| ua | `zaprosyty-propozytsiyu` |

Това дава пълен URL: `https://www.remontnapokrivivarna.bg/bg/zayavete-oferta`

### Файлове за създаване/промяна

**Нови:**
- `src/pages/QuoteRequestPage.tsx` — страницата (Hero, форма, trust, телефон, FAQ кратко)
- `src/pages/ThankYouPage.tsx` — `/bg/blagodarim-vi` за Google Ads conversion fire
- `src/components/QuoteRequestForm.tsx` — едностъпкова форма (Име, Телефон*, Email, Град, Вид услуга, Описание, Снимки), различна от 5-стъпковата `MultiStepInquiryForm`

**Промени:**
- `src/i18n/routes.ts` — нови route keys `quote` и `thankYou` с localized slugs
- `src/components/LocalizedPageRouter.tsx` — регистрация в `PAGE_MAP`
- `src/components/Header.tsx` — добавяне на главен CTA „Заявете оферта" в навигацията (бутон с висок контраст)
- `src/components/MobileBottomBar.tsx` — линк към `/zayavete-oferta` като основен sticky CTA
- `src/components/Footer.tsx` — линк в полезни връзки
- `public/sitemap-*.xml` — добавяне на новия URL във всичките 10 sitemap-а + индекса с hreflang връзки

### Структура на страницата

1. **Hero** (тъмен фон, висок контраст)
   - H1: „Заявете оферта за ремонт на покрив"
   - Подзаглавие за безплатен оглед и бърза реакция
   - Dual CTA: „Изпрати запитване" (scroll до форма) + „Обади се сега" (`tel:0893971873`)
   - Видим телефон в hero

2. **Форма за запитване** (центрирана, фокус на страницата)
   - Име
   - Телефон (задължително)
   - Email (по желание)
   - Град / населено място (с default „Варна")
   - Вид услуга (Select с опции от спецификацията)
   - Кратко описание (Textarea)
   - Качване на снимки (multi-file, използваме съществуващия Supabase storage pattern от `MultiStepInquiryForm`)
   - Бутон „Изпрати запитване"
   - Помощен текст под формата

3. **Trust Strip** (6 предимства с икони)
   - Безплатен оглед · Писмена гаранция (15 г.) · Работа с договор · Бърза реакция · Опитни майстори · Варна и региона

4. **Видим телефон блок** — голям, sticky на мобилно
5. **Кратки отзиви** (2-3 testimonials за social proof)
6. **Кратко FAQ** (3-4 въпроса от готовите данни)

### Submission flow & Google Ads tracking

- Формата записва в `public.inquiries` (същата таблица като `MultiStepInquiryForm`) с `referrer_source` и `session_id` от `analytics.ts`
- Сet `lead_source = 'quote_request_page'` за сегментация в CRM
- При успех: **`navigate('/bg/blagodarim-vi')`** (Thank-you страница)
- Thank-you страница изстрелва:
  - `trackEvent('conversion', { type: 'quote_request' })` (custom analytics)
  - `window.gtag?.('event', 'conversion', { send_to: 'AW-XXX/YYY' })` — placeholder, който потребителят попълва когато достави Google Ads ID
  - `dataLayer.push({ event: 'quote_submitted' })` — за GTM
- Telephone tap използва съществуващия global tel: interceptor (виж memory: Google Ads Call Tracking)

### SEO

- Уникален `<title>`: „Заявете оферта за ремонт на покрив във Варна | Бърза реакция"
- Meta description ≤160 символа
- Canonical: `https://www.remontnapokrivivarna.bg/bg/zayavete-oferta`
- hreflang за всички 10 езика (през `HreflangTags`)
- JSON-LD: `ContactPage` + `Service` schema
- H1 единствен, semantic HTML, alt текст на иконите
- Латински slug за всички езици (по проектния стандарт)

### Какво НЕ се променя

- Съществуваща страница „Контакти" (`/bg/kontakti`) — остава както е (фирмена визитка)
- Страница „Безплатен оглед" (`/bg/bezplaten-ogled`) — остава, тя е 5-стъпков interactive funnel
- `MultiStepInquiryForm` компонент — остава да се ползва другаде
- Дизайн система, цветове, бизнес логика на CRM, RLS, други маршрути

### Отворен въпрос

Имате ли Google Ads Conversion ID (формат `AW-XXXXXXXXX/YYYYYYY`)? Ако да — ще го заложа директно. Ако не — оставям placeholder + коментар къде да се добави по-късно.