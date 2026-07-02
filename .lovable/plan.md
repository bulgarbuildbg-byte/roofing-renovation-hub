## Финално решение: React/Vite + Puppeteer пълен HTML prerender с SEO gate

Приемаме всичките пет уточнения. Никакви `setTimeout` shortcuts, никакво разчитане само на `networkidle0`, задължителна валидация на съдържанието и build-fail при провал.

---

## 1. Как се активира `data-prerender-ready` (детерминистично, не по време)

Създаваме `src/lib/prerender-signal.ts` с broker, който брои задължителни SEO зависимости за текущия route. Сигналът се вдига **само** когато всички са изпълнени:

**Задължителни gate-ове (route-specific):**

- **DOM primitives** (глобални): H1 присъства, canonical link присъства, поне един JSON-LD script.
- **i18n**: `i18next.isInitialized === true` и преводите за активния namespace са заредени (проверка чрез `i18next.hasResourceBundle(lang, ns)`).
- **Route data ready**: всеки page component регистрира своите data-зависимости чрез хук `useSeoDataReady(key)`. Broker знае кои ключове очаква за текущия pathname:
  - City × service pages → `cityServices`, `cityMeta`, `faqContent`
  - Blog article → `article` (Supabase fetch)
  - Homepage → `services`, `testimonials`, `projects` (ако са в initial HTML)
  - Global (about, faq, contact) → само i18n
- **FAQ mounted**: `[data-seo-faq-ready="true"]` — сетва се от `HomeFAQ` / `CityFaq` след като въпросите се renderнат в DOM (използваме `forceMount` на Radix `AccordionContent` за prerender build).
- **Images resolved**: всички `<img>` с `data-seo-critical` имат `complete === true` или `naturalWidth > 0` (H1 hero image, service hero image).

Едва след като всички очаквани gate-ове са `true`, broker-ът сетва `document.documentElement.setAttribute("data-prerender-ready", "true")`. При невъзможност — атрибутът си остава `"false"` и Puppeteer wait fail-ва (URL се маркира като FAILED в report).

**Anti-shortcut защита:** ако някой page не регистрира зависимостите си, broker блокира по default вместо да пусне сигнал. По-добре build fail отколкото празен HTML.

## 2. Puppeteer wait стратегия (без networkidle0)

```js
await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });
await page.waitForFunction(
  () => document.documentElement.getAttribute("data-prerender-ready") === "true",
  { timeout: 20000, polling: 100 }
);
const html = await page.content();
```

- **Няма `networkidle0`** → GTM, Clarity, Google Ads pixels не блокират.
- **Block-list за третистрани скриптове по време на prerender** (request interception): `googletagmanager.com`, `clarity.ms`, `google-analytics.com`, `doubleclick.net` → `route.abort()`. Реални потребители продължават да ги виждат — блокирани са само по време на build.
- Supabase заявките остават разрешени (нужни за blog/services data).

## 3. Какво реално влиза в prerender-натия HTML

Валидираме след всеки render, че DOM съдържа:

| Елемент | Селектор за валидация |
|---|---|
| H1 | `document.querySelector("h1")?.textContent.length > 10` |
| H2/H3 | поне 3 `h2, h3` елемента |
| Основен SEO текст | `<main>` или `<article>` съдържа > 800 chars visible text |
| Услуги (city × service pages) | контейнер `[data-seo="services-list"]` с > 0 children |
| Град (breadcrumb / H1) | `[data-seo="city-name"]` присъства |
| FAQ | `[data-seo="faq"] [data-seo="faq-question"]` count > 3 |
| Вътрешни линкове | `main a[href^="/"]` count > 5 |
| Изображения | всички `img` в `main` имат непразен `src` и `alt` |
| Canonical | `link[rel="canonical"][href]` |
| Hreflang | `link[rel="alternate"][hreflang]` count >= 10 |
| JSON-LD | поне 1 `script[type="application/ld+json"]` с parse-able JSON |

Тези проверки се изпълняват вътре в page context преди `html = await page.content()`. Всяка липсваща точка → URL се маркира като FAILED с конкретна причина.

**За да е сигурно, че FAQ съдържанието е в DOM:** Radix `AccordionContent` рендерира съдържанието само когато е отворено, освен ако не се използва `forceMount`. Ще подадем `forceMount` глобално и ще скрием визуално със CSS през `data-state="closed"` (Radix pattern). Потребителят вижда сгънат accordion; Google вижда пълен текст.

## 4. Верификация след deploy (реални проверки)

Ще стартираме автоматичен post-deploy skрипт `scripts/verify-prerender.sh` който изпълнява:

```bash
BASE="https://www.remontnapokrivivarna.bg"

for URL in \
  "/bg/varna" \
  "/bg/varna/remont-na-pokriv" \
  "/bg/varna/hidroizolacia-na-pokriv" \
  "/en/varna/roof-repair" \
  "/bg/blog/cena-remont-pokriv-varna" \
; do
  echo "=== $URL ==="
  HTML=$(curl -sL "$BASE$URL")
  echo "$HTML" | grep -q "<h1"                      && echo "✓ H1"       || echo "✗ H1 MISSING"
  echo "$HTML" | grep -q 'rel="canonical"'          && echo "✓ canonical" || echo "✗ canonical MISSING"
  echo "$HTML" | grep -q 'application/ld+json'      && echo "✓ JSON-LD"   || echo "✗ JSON-LD MISSING"
  echo "$HTML" | grep -q 'hreflang'                 && echo "✓ hreflang"  || echo "✗ hreflang MISSING"
  echo "$HTML" | grep -qi "гаранция\|warranty\|garantie" && echo "✓ body text" || echo "✗ body text MISSING"
  # Character count sanity
  BYTES=$(echo -n "$HTML" | wc -c)
  echo "size: $BYTES bytes"
done
```

Плюс ръчни проверки (в отчета към user-а):
- View Source в браузър → пълен HTML, не `<div id="root"></div>`.
- Google Search Console → URL Inspection → "View crawled page" → HTML tab.
- Rich Results Test → JSON-LD validation.
- PageSpeed Insights → SEO score = 100.

## 5. Build-time SEO gate (fail on missing content)

`scripts/prerender-seo.mjs` build отчет:

```
Prerender report — 2026-XX-XX
─────────────────────────────
Total URLs:         748
Succeeded:          744
Failed:               4

FAILED URLs:
  /ua/dobrich/metalni-pokrivi     — timeout waiting data-prerender-ready
  /no/ruse/nov-pokriv             — no H1 detected
  /fi/burgas/poddruzhka-na-pokrivi — JSON-LD parse error
  /bg/blog/xyz                    — Supabase 500

Content audit:
  Missing H1:            0
  Missing canonical:     0
  Missing hreflang:      0
  Missing JSON-LD:       1  (/fi/burgas/poddruzhka-na-pokrivi)
  Body text < 800 chars: 0
```

**Gate logic:**

- Списък `CRITICAL_ROUTES` = всички BG homepage + BG city × service (top 20 revenue-generating URL-а).
- Ако **която и да е** critical route е FAILED → `process.exit(1)` → deploy pipeline спира.
- Non-critical failures (напр. отделна блог статия на украински) → warning, deploy продължава.
- JSON отчет се записва в `dist/prerender-report.json` за history.

Fallback за не-critical fail: старите meta-only stubs се генерират като backup, така че URL-ът поне има правилен title/description/canonical и не 404-ва.

---

## Технически детайли

**Нови/променени файлове:**

- `scripts/prerender-seo.mjs` — пълно rewrite: Puppeteer, конкурентност 5, request interception, content validation, JSON report, exit code gate.
- `scripts/verify-prerender.sh` — post-deploy curl проверки.
- `src/lib/prerender-signal.ts` — broker за gate система.
- `src/hooks/useSeoDataReady.ts` — хук за page components да декларират зависимости.
- `src/App.tsx` — mount на broker.
- `src/components/HomeFAQ.tsx`, `src/components/city/CityServiceTemplate.tsx`, blog pages — регистрират зависимости + `data-seo="*"` атрибути + `forceMount` на Accordion.
- `src/components/Hero.tsx` и hero images в city templates — `data-seo-critical` на LCP image.
- `src/pages/Index.tsx` — fix стар телефон в JSON-LD (`+359-89-397-1873`).
- `index.html` — премахване на static canonical (вече през Helmet).
- `package.json` — добавяне `puppeteer` devDependency; build хук остава.
- OG images per-service: 13 нови файла в `public/og/` (генерирани с imagegen premium 1200×630).
- Root `/` redirect stub с canonical към `/bg/varna`.

**Concurrency & време:** 5 паралелни Puppeteer страници × ~4s/URL за 748 URL-а ≈ 10 мин build. Приемливо за CI.

**Auto-rebuild trigger:** Supabase Edge Function `trigger-rebuild` на INSERT/UPDATE в `articles`. Ръчен бутон в `/admin` за незабавен rebuild.

---

## План на изпълнение

1. `bun add -D puppeteer`
2. `src/lib/prerender-signal.ts` + `useSeoDataReady` хук.
3. Инструментиране на page components (city × service, home, blog, FAQ) с `data-seo="*"` атрибути + gate регистрация.
4. `forceMount` на всички Accordion FAQ, скриване през CSS.
5. Rewrite на `scripts/prerender-seo.mjs`:
   - Стартира `vite preview` на 4173.
   - Puppeteer с request interception (блок GTM/Clarity/GA).
   - Wait for `data-prerender-ready="true"` (20s timeout).
   - Content validation в page context.
   - Записва HTML + fallback meta-stub при fail.
   - JSON report + exit code gate за CRITICAL_ROUTES.
6. Fix стар телефон `+359-88-499-7659` → `+359-89-397-1873` в JSON-LD (homepage + city templates + priceRange `$$` → `€€`).
7. Генериране на 13 per-service OG изображения (imagegen premium).
8. `scripts/verify-prerender.sh` за post-deploy sanity.
9. Edge function `trigger-rebuild` + admin бутон.
10. Тестови build локално → проверка на `dist/bg/varna/remont-na-pokriv/index.html` съдържа H1, FAQ, JSON-LD, > 800 chars body → deploy → curl verification → GSC re-index request.

**Estimation:** 1–1.5 работни дни. Deploy dry-run преди production.