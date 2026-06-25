## Цел
Поправяме 5-те критични SEO/UX дефекта: чуждоезични мета тагове, structured data, hreflang, soft 404, непреведени UI бутони.

## 1) Чуждоезични мета тагове (критично)
**Проблем:** `bg.ts` има `meta.homeTitle/homeDesc`, останалите 9 езика — не. `Index.tsx` извиква `t('meta.homeTitle')` → fallback връща българския низ. Същото за всички страници, които ползват `t('meta.*')` и за `CityServiceTemplate` (там заглавието е директно hard-coded на български в ред 36).

**Решение:**
- Добавяме пълен `meta` namespace (homeTitle, homeDesc, homeKeywords + per-page titles/descriptions за services/about/projects/reviews/contact/calculator/blog/faq/inspection/howWeWork/pricing/quote/financing/solar*) във всички 9 локала (`en, de, fi, sv, no, fr, nl, ru, ua`). Уникални, native, ≤60 chars title / ≤155 chars description.
- `CityServiceTemplate.tsx`: премахваме hard-coded BG title; четем от `t('city.serviceMeta', { service, city })` шаблон, добавяме същия namespace в 10-те локала. Същото за `metaDesc`, `ogTitle`, `twitterTitle`.
- Премахваме статичния `<meta property="og:locale" content="bg_BG">` от `index.html` — `HreflangTags` вече го сетва per-route.

## 2) Hreflang в `<head>` на всички страници
**Статус:** `HreflangTags` вече се mount-ва в `LanguageLayout` (покрива целия `/:lang/*` дървовид). Проверката потвърждава, че всеки маршрут получава `<link rel="alternate" hreflang>` + `x-default`. **Не е счупено в код-а, а в crawler-perception** заради soft-404 (т.4) и липсата на prerender за не-BG (вж. долу).
- **Разширяваме `scripts/prerender-seo.mjs`** да генерира статични stub HTML файлове и за останалите 9 езика (home + ключови global pages + city/varna home + 4 топ услуги в /varna/). Това дава на social/SEO crawler-ите static `<title>`, `og:*`, `canonical`, `og:locale` и hreflang блока на правилния език.

## 3) Structured data (Schema.org)
**Проблем:** `Index.tsx` има богат JSON-LD, но е само на BG home. Липсва на останалите страници.

**Решение:**
- `CityServiceTemplate`: добавяме `Service` + `FAQPage` + `BreadcrumbList` + `AggregateRating` (4.9/127) JSON-LD, локализиран през `t()`.
- `Index.tsx`: AggregateRating вече е там; добавяме `FAQPage` (от `HomeFAQ`) и `BreadcrumbList`.
- За не-BG home (city home pages, global pages): емит-ваме същите JSON-LD с локализирани имена.

## 4) Soft 404
**Проблем:** Грешен слъг → `CityPageRouter` рендерира `NotFound`, но HTTP статус остава 200 и `<title>` пада обратно към статичния в `index.html` (BG).

**Решение в `src/pages/NotFound.tsx`:**
- Добавяме `<Helmet>` с `<meta name="robots" content="noindex, nofollow">`, `<title>404 — Страницата не е намерена</title>` (локализирано през `t()`), `<meta name="prerender-status-code" content="404">` (за prerender services / Vercel edge).
- Превеждаме съдържанието на NotFound през `t('notFound.*')` за всички 10 езика.
- Бележка: реален 404 HTTP status в SPA изисква server config — добавяме `prerender-status-code` мета, който се чете от prerender pipeline; за други crawler-и noindex е достатъчен сигнал.

## 5) Непреведени UI елементи
- Заменяме hard-coded `"Заявете оферта"` и `"Изчисли цена"` в:
  `Header.tsx`, `Footer.tsx`, `MobileBottomBar.tsx`, `CalculatorDialog.tsx`, `CityServiceTemplate.tsx`, `MaintenancePage.tsx`, `SolarSystemsPage.tsx`, `PriceCalculator.tsx`
- с `t('cta.requestQuote')` / `t('cta.calculatePrice')` / `t('cta.requestInspection')`.
- Добавяме съответните ключове в 10-те локала.

## Технически детайли

```text
Файлове за промяна:
  src/i18n/locales/{en,de,fi,sv,no,fr,nl,ru,ua}.ts   ← добавени meta + cta + notFound + city namespace
  src/i18n/locales/bg.ts                              ← добавени липсващи cta/notFound ключове
  src/components/city/CityServiceTemplate.tsx        ← премахнат hard-code, JSON-LD, t() title
  src/pages/NotFound.tsx                              ← Helmet noindex + i18n
  src/components/Header.tsx                           ← t() за CTA
  src/components/Footer.tsx                           ← t() за CTA
  src/components/MobileBottomBar.tsx                  ← t() за CTA
  src/components/CalculatorDialog.tsx                 ← t() за CTA
  src/components/PriceCalculator.tsx                  ← t() за CTA
  src/pages/services/MaintenancePage.tsx              ← t() за CTA
  src/pages/services/SolarSystemsPage.tsx             ← t() за CTA
  src/pages/Index.tsx                                 ← добавен FAQPage + BreadcrumbList JSON-LD
  index.html                                          ← премахнат статичен og:locale
  scripts/prerender-seo.mjs                           ← разширен с 9 езика
```

## Извън скоп (изисква отделно решение)
- **Real HTTP 404 status**: SPA hosting не позволява без SSR или edge function. След тази задача crawler-ите ще виждат `noindex` + `prerender-status-code`, което Google третира като soft-404 → 404. За пълен HTTP 404 трябва Vercel edge middleware (отделна задача).
- **AI превод на дълги мета**: ще генерираме native преводи за заглавия/описания директно, без AI gateway call — достатъчно е за заглавия и кратки описания. Ако искате AI-генерирано дълго съдържание на 9 езика, кажете.
