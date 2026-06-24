## Текущо състояние (какво вече е оправено)

Проверих кода — част от исканите корекции вече са в проекта:

- **Per-route `<title>`, `meta description`, `og:title`, `og:description`, `og:image`, `og:url`, `canonical`** се генерират през `react-helmet-async` в `CityServiceTemplate.tsx` (град+услуга), `BurgasHome.tsx`, `RuseHome.tsx`, `DobrichHome.tsx`, `VarnaHome.tsx` и глобалните страници (About, Blog, Contact, FAQ, и т.н.).
- **`HreflangTags`** (mount-нат в `LanguageLayout`) добавя self-referencing `canonical` + `og:url` за всеки маршрут, включително правилния град.
- **`og:url`** беше премахнат от `index.html` (per-route override работи).
- **Текст „15 години"** беше уеднаквен в `index.html` og/twitter description и в `i18n/locales/bg.ts`.

**Защо link-preview-ите все още изглеждат еднакво:** Facebook / Messenger / Viber / LinkedIn ботовете **не изпълняват JavaScript**. Виждат само суровия `index.html`, който е един и същ за всички URL-и. Helmet тагове се появяват едва след hydration → невидими за тези crawlers. Googlebot изпълнява JS, така че за Google вече вижда правилните тагове, но social previews — не.

## Какво ще направя

Единственото истинско решение е **pre-rendering**: генерираме отделен статичен HTML за всеки публичен маршрут по време на build, така че всеки URL да връща суров HTML с правилните `<title>` / `og:*` / `canonical`.

### 1. Добавяне на pre-render плъгин

- Инсталирам `vite-plugin-prerender-spa` (използва Puppeteer headless да рендерира всеки маршрут след `vite build` и записва `<route>/index.html`).
- Конфигурирам в `vite.config.ts` списък от маршрути, който се чете от `public/sitemap-*.xml` (всички 10 езика × градове × услуги + блог + глобални) — около 400–500 URL-а.
- Build artifact-ите остават статични файлове → Lovable hosting/Vercel ги сервират директно. SPA fallback продължава да работи за непредвидени URL-и.

### 2. Корекция на pre-render-friendly OG за всяка страница

- Проверявам всеки от тези маршрути дали `<Helmet>` му е mount-нат **синхронно** при първи render (без `useEffect`/`Suspense`), за да го хване Puppeteer.
- За `CityServiceTemplate` потвърждавам, че описанието използва `{city}` (вече прави `interpolate(...)`).
- За `BurgasHome`/`RuseHome`/`DobrichHome` добавям изричен `og:url` + `canonical` в собствения `<Helmet>` (в момента разчитат само на `HreflangTags`; добавянето локално прави SEO одита по-четим и предпазва от грешки при бъдещ refactor).

### 3. Build & deploy промени

- В `package.json`: `"build": "vite build"` остава, но плъгинът се закача към `closeBundle` hook → pre-render тече автоматично.
- Pre-render-ът използва selectors `[data-prerender-ready]` или `setTimeout(2000)` за да изчака Helmet да попълни `<head>`.

### 4. Верификация

След merge, потвърждаваме с:

- `curl -A "facebookexternalhit/1.1" https://www.remontnapokrivivarna.bg/bg/varna/hidroizolacia-na-pokriv | grep og:title` — трябва да върне „Хидроизолация на покрив Варна…".
- `curl ... /bg/burgas | grep og:title` — трябва да върне „…Бургас".
- Facebook Sharing Debugger → Re-scrape за 4–5 URL-а (homepage, услуга-Варна, услуга-Бургас, блог статия, /bg/za-nas).

## Технически бележки

- **Алтернатива 1 (`react-snap`)**: по-стар, не се поддържа активно, но работи. Избирам `vite-plugin-prerender-spa` (нов, vite-native).
- **Алтернатива 2 (Next.js / SSR)**: пълно мигриране на app-а към Next — много по-голям scope (1–2 седмици), не препоръчвам за този проблем.
- **Build time**: с ~500 маршрута, очаквам +60–90 секунди към build. Pre-render-ът може да се ограничи до най-важните URL-и (homepage + 4 града × ~10 услуги + ~20 блог поста = ~80 URL-а) ако build стане твърде дълъг.
- **Puppeteer на Lovable hosting**: build-ът тече локално/в CI, не в runtime sandbox-а, така че Puppeteer-ът не утежнява hosting-а.

## Файлове, които ще променя

- `package.json` — добавям `vite-plugin-prerender-spa` + `puppeteer` като devDependency
- `vite.config.ts` — конфигурация на плъгина с route list
- `scripts/prerender-routes.ts` — нов helper, който чете `public/sitemap-*.xml` и връща списък URL-и
- `src/pages/cities/BurgasHome.tsx`, `RuseHome.tsx`, `DobrichHome.tsx` — добавям локален `og:url` + `canonical`
- (по желание) `index.html` — оставям като fallback с генеричен title; pre-render-ът ще го презапише per-route

## Какво остава за следваща итерация

- Различни `og:image` per услуга (изисква генериране на ~15 нови изображения; питам преди това).
- Преглед на дължината на title/description per услуга — fine-tuning след като pre-render-ът работи и виждаме реалните snippets.
