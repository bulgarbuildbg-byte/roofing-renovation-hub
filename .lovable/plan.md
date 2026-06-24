## Diagnosis

Audit-флаговете („дублирани title/description, липсва canonical и hreflang в `<head>`") идват от една и съща причина: проектът е чисто client-side SPA. Всеки URL връща `index.html` със статичния заглавен таг „Ремонт на Покриви Варна…". Кодът вече има `react-helmet` в `Index.tsx`, `CityServiceTemplate.tsx`, `HreflangTags.tsx` и попълва canonical, hreflang, JSON-LD — но това става **след** хидратация. Crawler-ите, които не изпълняват JS (вкл. одиторския бот), виждат само статичния `index.html` → всичко изглежда еднакво.

Затова поправките трябва да адресират два слоя: (1) направим главата уникална в сервираните HTML файлове, (2) изчистим вътрешните несъответствия, които съществуват и в JS-рендерираната глава.

## План

### 1. Превключи на `react-helmet-async` + `HelmetProvider`
- Замени `react-helmet` с `react-helmet-async` (по-надеждна дедупликация, готова за SSR/prerender).
- Обвий приложението в `<HelmetProvider>` в `src/main.tsx`.
- Премахни статичните `<title>`, `<meta name="description">`, `<meta property="og:*">` и `<meta name="twitter:*">` от `index.html`, които „печелят" срещу per-route Helmet тагове. Запази само brand fallback (site_name, og:image, locale) за social crawlers.

### 2. Pre-render всички публични маршрути (КРИТИЧНО за одита)
- Добави `vite-plugin-prerender` (или `react-snap` като алтернатива) към `vite.config.ts`.
- Списък със страници за prerender: генерира се от съществуващия `public/sitemap-*.xml` (всеки URL от 10-те езикови sitemap-а).
- Резултат: всеки маршрут получава собствен `dist/<path>/index.html` с уникален `<title>`, `<meta description>`, `<link rel="canonical">`, пълен `<link rel="alternate" hreflang>` блок и JSON-LD — точно това, което одитът търси.
- Vercel вече сервира статични файлове по path (`vercel.json`), така че не са нужни промени по hosting.

### 3. Уникален title/description за всяка комбинация град × услуга
- `CityServiceTemplate.tsx` вече генерира title по шаблон `${titlePrefix} ${cityName} — Безплатен Оглед 24ч`. Замени с по-конкретен шаблон, който включва **града + ползата** и пази длъжината 50–60 знака, напр. „Хидроизолация покрив Варна — 15г гаранция | 089 397 1873".
- `src/data/cityServices.ts`: ревизия на `titlePrefix` и `metaDescription` за всяка от ~10-те услуги така че да бъдат уникални (140–160 знака, с ключовата дума за услугата).
- За глобалните страници (`AboutPage`, `BlogPage`, `ContactPage`, `CalculatorPage`, `PricingPage`, `ServicesPage`, `FAQPage`, `HowWeWorkPage`, `InspectionPage`, `ProjectsPage`, `QuoteRequestPage`, `ReviewsPage`, `ThankYouPage`) — добави `<Helmet>` с уникален title/description там, където липсва.

### 4. Canonical + hreflang за всяка страница
- `HreflangTags` вече изчислява canonical и alternates правилно. Гарантирай, че се монтира на **всеки** route (в момента се рендерира през `LanguageLayout`/`LocalizedPageRouter`; ще проверим, че глобалните страници като `/bg/blog/...` също го получават). Добави и `<link rel="alternate" hreflang="x-default" href=".../bg/varna">`.

### 5. Добави липсващите JSON-LD блокове там, където ги няма
Главната страница вече има `RoofingContractor` + `WebSite`. Разшири с:
- **FAQPage** schema на всяка страница, която рендерира FAQ (CityServiceTemplate, HomeFAQ, FAQPage).
- **Service** schema с `offers.priceRange` за всяка услуга (CityServiceTemplate вече има Service — добави `offers`/`priceRange` от `cityServices.ts`).
- **BreadcrumbList** schema там, където визуално има breadcrumbs (city pages, blog articles).
- **AggregateRating** + няколко `Review` schema на главната (вече има aggregateRating; добави и Review елементи от Testimonials).

### 6. Уеднакви гаранцията на „15 години" навсякъде
- `index.html`: og:description и twitter:description казват „до 10г" → промени на „до 15г писмена гаранция".
- `src/components/HowWeWork.tsx`: „до 10–15 години" → „15 години".
- Бърза проверка с `rg "10г\|10 год\|10-15\|10–15"` за други случаи.

### 7. (Незадължително) Различни og:image по услуга
- Извън scope-а за тази итерация — само ако потвърдиш. Изисква генериране на 10+ нови OG изображения.

## Технически детайли
- Промени по файлове: `package.json`, `vite.config.ts`, `src/main.tsx`, `index.html`, `src/components/HreflangTags.tsx` (импорт), `src/pages/Index.tsx` (импорт), `src/components/city/CityServiceTemplate.tsx` (импорт + FAQ/Breadcrumb/Offers schema), `src/data/cityServices.ts` (уникални titles/descriptions), `src/components/HomeFAQ.tsx` (FAQPage schema), `src/components/HowWeWork.tsx` (warranty текст), + добавяне на `<Helmet>` в глобалните pages, които нямат.
- Prerender output остава в `dist/` и се обслужва от Vercel без други промени.
- Sitemap-ите и `robots.txt` остават както са.

## Какво НЕ се пипа
Чистите URL-и, alt текстовете, H1 структурата, `lang="bg"`, robots.txt и sitemap index-а — всичко това вече е наред според одита.
