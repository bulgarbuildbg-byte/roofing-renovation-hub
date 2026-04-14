

## SEO Fix Plan — 6 проблема за решаване чрез код

Проблеми 1 (Sitemap в Search Console) и 8 (Backlinks) изискват ръчни действия в Google Search Console и маркетинг — не са кодови промени.

### Проблем 2 — Уникални мета описания за всяка BG страница

Всяка страница ще получи уникален `<meta name="description">` вместо дублиращия се текст от `index.html`.

**Засегнати файлове и нови описания:**

| Файл | Ново описание |
|---|---|
| `ServicesPage.tsx` | Покривни услуги във Варна — ремонт, хидроизолация, нов покрив, керемиди, плоски и метални покриви. Цени от 9 €/м². |
| `ReviewsPage.tsx` | Отзиви от клиенти за покривни услуги. 4.9/5 от 127+ оценки. Реални мнения за ремонт на покриви Варна. |
| `ProjectsPage.tsx` | Реални проекти и обекти — хидроизолация, смяна на керемиди, ремонт на течове. Снимки преди и след. |
| `FAQPage.tsx` | Често задавани въпроси за ремонт на покриви — цени, срокове, гаранции, материали. Варна. |
| `ContactPage.tsx` | Свържете се с нас за покривни услуги. Безплатен оглед до 24ч. ☎ 088 499 7659. Варна. |
| `BlogPage.tsx` | Полезни статии за покриви — поддръжка, хидроизолация, керемиди, сезонни съвети. Експертен блог. |
| `HowWeWorkPage.tsx` | Как работим — от оглед до завършен обект с гаранция. 5 стъпки за вашия покрив. |
| `CalculatorPage.tsx` | Вече има уникално — ОК |
| `InspectionPage.tsx` | Вече ползва t() — ОК |
| `PricingPage.tsx` | Вече ползва t() — ОК |
| `AboutPage.tsx` | Вече има уникално — ОК |

Също: проверка на `index.html` — дублиращият fallback `<meta name="description">` в `<head>` ще бъде запазен, но Helmet го override-ва per page, така че е ОК.

### Проблем 4 + 5 — Стари URL-и и редиректи в sitemaps

**Действия:**
- Преглед и почистване на `public/sitemap-bg.xml` — махане на URL-и които правят redirect (ако има такива)
- Проверка дали стари Cyrillic URL-и не са включени в sitemap файловете
- Проверка за `/en/metal-roofs-varna` — този slug не съществува в routes.ts (EN metalRoof = `metal-roof-installation`), значи е orphan страница; ако съществува в sitemap-en.xml, трябва да се махне

### Проблем 6 — og:url несъответствия (Cyrillic URL-и)

Множество страници имат `og:url` с **стари Cyrillic URL-и**. Трябва да се обновят с Latin slugs:

| Файл | Текущ og:url | Правилен og:url |
|---|---|---|
| `RoofRepairPage.tsx` | `/bg/ремонт-на-покриви` | `/bg/remont-na-pokrivi` |
| `RoofLeakRepairPage.tsx` | `/bg/ремонт-течове` | `/bg/remont-na-techove-pokriv` |
| `WaterproofingPage.tsx` | `/bg/хидроизолация` | `/bg/hidroizolacia-na-pokriv` |
| `WaterproofingVarnaPage.tsx` | `/bg/хидроизолация-варна` | `/bg/hidroizolacia-na-pokriv` |
| `NewRoofPage.tsx` | `/bg/изграждане-на-покрив` | `/bg/nov-pokriv` |
| `TileReplacementPage.tsx` | `/bg/смяна-керемиди` | `/bg/remont-na-keremideni-pokrivi` |
| `MetalRoofPage.tsx` | `/bg/метални-покриви` | `/bg/metalni-pokrivi` |
| `FlatRoofPage.tsx` | проверка | Latin slug |
| Blog статии (5 файла) | `/bg/блог/...` | `/bg/blog/...` |
| `DynamicArticle.tsx` | `/bg/блог/${slug}` | `/bg/blog/${slug}` |
| `Index.tsx` | `/bg` — ОК | ОК |

Също: `AboutPage.tsx` липсва `og:url` — ще се добави.

### Проблем 7 — Нелокализирани title тагове

`ReviewsPage.tsx` има hardcoded български title без i18n. Ще се добави `useTranslation()` и `t()` за title и description.

Други страници (`FAQPage`, `ContactPage`, `BlogPage`, `ProjectsPage`) също имат hardcoded BG titles — не е проблем за BG версията, но EN/DE/RU потребители ще виждат BG заглавия. Минимално ще обвием в `t()` за ReviewsPage като посочен конкретен проблем.

### Проблем 3 — Неиндексирани езикови версии

Това е частично Google поведение. Единственото кодово действие е да проверим, че всички езикови версии наистина имат преведено съдържание чрез `t()` ключовете. Повечето pages ползват hardcoded BG текст вместо `t()`, което означава че чуждоезичните версии показват български. Това е голяма задача и няма да влезе в тази итерация.

### Резюме на засегнатите файлове

| Файл | Промяна |
|---|---|
| `src/pages/ServicesPage.tsx` | Уникално meta description |
| `src/pages/ReviewsPage.tsx` | Уникално meta description + i18n title |
| `src/pages/ProjectsPage.tsx` | Уникално meta description |
| `src/pages/FAQPage.tsx` | Уникално meta description |
| `src/pages/ContactPage.tsx` | Уникално meta description |
| `src/pages/BlogPage.tsx` | Уникално meta description |
| `src/pages/HowWeWorkPage.tsx` | Уникално meta description |
| `src/pages/services/RoofRepairPage.tsx` | Fix og:url (Latin slug) |
| `src/pages/services/RoofLeakRepairPage.tsx` | Fix og:url |
| `src/pages/services/WaterproofingPage.tsx` | Fix og:url |
| `src/pages/services/WaterproofingVarnaPage.tsx` | Fix og:url |
| `src/pages/services/NewRoofPage.tsx` | Fix og:url |
| `src/pages/services/TileReplacementPage.tsx` | Fix og:url |
| `src/pages/services/MetalRoofPage.tsx` | Fix og:url |
| `src/pages/services/FlatRoofPage.tsx` | Fix og:url |
| `src/pages/blog/*.tsx` (5 статии) | Fix og:url (блог → blog) |
| `src/pages/blog/DynamicArticle.tsx` | Fix og:url |
| `src/pages/AboutPage.tsx` | Добави og:url |

