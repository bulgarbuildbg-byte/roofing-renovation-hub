# SEO корекции — remontnapokrivivarna.bg

URL структурата и слъговете НЕ се пипат. Само метаданни, JSON-LD, hreflang, 404 и i18n текстове.

## 1. Преведени метаданни за всички езици (КРИТИЧНО)

Проблем: `CityServiceTemplate.tsx` и градските home страници използват жъстко закодирани BG стрингове (`service.titlePrefix`, `service.metaDescription`, "— Безплатен Оглед 24ч") за всички езици. Затова `/en/varna/roof-waterproofing` сервира български `<title>` и `og:title`.

Действия:
- В `src/i18n/locales/*.ts` (10 файла) — да се добави/допълни namespace `cityMeta` с преведени `titlePrefix`, `metaDescription`, `schemaDescription`, `heroSubtitle`, `priceHint` за всички 10 услуги (roofRepair, leakRepair, waterproofing, newRoof, tileRoofRepair, flatRoof, metalRoof, maintenance, solarSystems и т.н.) + `titleSuffix` ("— Free Inspection 24h | …", "— Kostenlose Inspektion 24h | …" и пр.) и `cityHomeTitle/Desc` за `/lang/varna` тип страници.
- `src/components/city/CityServiceTemplate.tsx` — да чете през `t('cityMeta.<routeKey>.title')` с fallback към `service.titlePrefix`. Същото за description, schemaDescription, hero subtitle, breadcrumb labels ("Начало" → `t('nav.home')`). `og:site_name` и `og:locale` вече зависят от `currentLang`; canonical вече се self-references — да се запази.
- `src/pages/Index.tsx` — `meta.homeTitle/Desc/Keywords` вече се ползват през `t()`, но JSON-LD е чист BG. Да се изнесе `localBusinessSchema.description`, `name`, `address.addressRegion`, `areaServed[].name` и `breadcrumbSchema[].name` през `t('schema.*')` ключове добавени във всички локали.
- `src/pages/cities/VarnaHome.tsx`, `BurgasHome.tsx`, `DobrichHome.tsx`, `RuseHome.tsx` (които сега reuse Index) — да получат собствен `<Helmet>` блок с локализиран title/description за всеки език.

## 2. Структурирани данни (JSON-LD)

`Index.tsx` вече има `RoofingContractor`, `WebSite`, `Organization`, `BreadcrumbList`. Допълнения:
- Да се добави `FAQPage` JSON-LD на началната страница, четящ ЧЗВ масива от `HomeFAQ` (преместване на FAQ source в shared module / prop за да може Index да го serialize-не).
- Да се добави `Review` масив (топ 3–5 отзива) към `LocalBusiness.review[]` и да се остави `aggregateRating` (4.9/127).
- `CityServiceTemplate.tsx` вече emit-ва `Service + FAQPage + BreadcrumbList` — да се добави `priceRange` и `offers.priceCurrency=BGN` от `service.priceHint`.
- Всеки шаблон на услуга-страница (`src/pages/services/*.tsx` — RoofRepair, Waterproofing, NewRoof, Maintenance, MetalRoof, FlatRoof, TileReplacement, Solar*, Financing) да получи собствен `Service` JSON-LD с `provider` сочещ към `RoofingContractor` и `priceRange`.
- Глобален `LocalBusiness` (NAP + работно време + geo) да се добави и в `LanguageLayout.tsx` за да присъства на всеки маршрут, не само Index.

## 3. Hreflang

`HreflangTags.tsx` вече генерира 10 alternates + `x-default` и е mount-нат в `LanguageLayout`. Да се верифицира че layout-ът обвива и `/`, `/varna` и грешни/404 маршрути. Действия:
- Проверка че `LanguageLayout` се прилага за всеки `:lang/*` route в `App.tsx`.
- `x-default` href сега сочи към `${BASE_URL}/` — да се поправи към `/bg/<path>` (българската версия като default).
- Да се добави `<html lang>` управление през Helmet (вместо само през `i18n.changeLanguage`).

## 4. Soft 404

Проблем: грешен слъг като `/en/varna/hidroizolacia-na-pokriv` (BG слъг под EN) попада в `Index` или градски wrapper и връща 200 с BG H1.

Действия в `src/components/LocalizedPageRouter.tsx` и `CityPageRouter.tsx`:
- При резолюция на slug → ако `findRouteKeyBySlug(slug, currentLang)` върне `null` И slug-ът съществува в друг език → 301 redirect към `${currentLang}/${localizedSlugs[currentLang][routeKey]}`.
- Ако slug-ът не съществува никъде → render `NotFound` с `prerender-status-code=404` (вече има) + `<meta http-equiv="status" content="404">` и да се добави `<title>404` на текущия език (вече ползва `t('notFound.title')`).
- Списък от стари BG слъгове (`OLD_BG_SLUGS`) — extend logic за non-BG languages.

## 5. Преводи на UI

Аудит чрез `rg "[А-Яа-я]" src/components src/pages` за откриване на останали BG стрингове. Известни точки за поправка:
- `src/components/MultiStepInquiryForm.tsx:171` — "Заявете безплатен оглед"
- `src/components/PriceCalculator.tsx:728,741` — "Заявете безплатен оглед", "← Изчисли отново"
- `src/components/QuickContactForm.tsx:33` — "Заявете безплатен оглед"
- `src/components/city/CityServiceTemplate.tsx` — всички hardcoded BG надписи в hero бара ("Заяви безплатен оглед", "Обслужваме цял …", "Безплатен оглед 24ч", "Гаранция 15 години", "Работа по договор", breadcrumb "Начало"), benefits секцията и CTA "Заявете оферта"
- Бутоните и labels във форми, FAQ headers, ChatBot prompts.

Всички да минат през `t()` ключове, добавени в `ui`, `cta` или нови namespaces във всички 10 локали.

## 6. Тестване и потвърждение

След промените:
- Локален build → `node scripts/prerender-seo.mjs` за да се проверят генерираните stub-ове за EN/DE/FR/NL/RU/UA/SV/NO/FI.
- Playwright проверка: `/bg/varna`, `/en/varna`, `/en/varna/roof-waterproofing`, `/de/varna`, `/en/varna/hidroizolacia-na-pokriv` (трябва 404), `/bg/varna/hidroizolacia-na-pokriv` (трябва 200). Скрийншот + `<head>` dump.
- За всеки тестов URL — да се отпечатат `<title>`, `og:locale`, `canonical`, `<link rel="alternate">` count, JSON-LD `@type` списък.
- Линкове за ръчен тест да се споделят: Google Rich Results Test (`https://search.google.com/test/rich-results?url=…`) и Facebook Sharing Debugger (`https://developers.facebook.com/tools/debug/?q=…`) за по 3 URL.

## Файлове за промяна (overview)

```text
src/i18n/locales/{bg,en,de,fi,sv,no,fr,nl,ru,ua}.ts   # cityMeta + ui + schema keys
src/components/city/CityServiceTemplate.tsx           # t()-driven meta + JSON-LD
src/components/LanguageLayout.tsx                     # global LocalBusiness JSON-LD
src/components/HreflangTags.tsx                       # x-default → /bg, <html lang>
src/components/LocalizedPageRouter.tsx                # 301 cross-lang slug + 404
src/components/CityPageRouter.tsx                     # same
src/pages/Index.tsx                                   # FAQ JSON-LD, Review[]
src/pages/cities/{Varna,Burgas,Dobrich,Ruse}Home.tsx  # per-lang Helmet
src/pages/services/*.tsx                              # Service JSON-LD + priceRange
src/components/{MultiStepInquiryForm,PriceCalculator,QuickContactForm,
                ChatBot,HomeFAQ}.tsx                  # t() strings
src/pages/NotFound.tsx                                # add http-equiv status
scripts/prerender-seo.mjs                             # extend with new meta keys
```

## Не се пипат

- URL структурата, слъговете, рутингът, `i18n/routes.ts`.
- Бекенд / CRM / Supabase.
- Дизайн и layout.
