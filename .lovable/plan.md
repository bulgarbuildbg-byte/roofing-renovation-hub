

## План: Решаване на 118 неиндексирани страници (SEO критични поправки)

### Анализ на проблемите

Прегледах кода и идентифицирах причините:

**Проблем 1 — 77 страници с грешен canonical (НАЙ-КРИТИЧНО):**
В `src/components/HreflangTags.tsx` се вижда, че canonical се генерира от `location.pathname`. На пръв поглед изглежда коректно, но проблемът е, че на различните езикови страници canonical-ът работи правилно. **Истинският проблем** е, че всяка страница (Index.tsx, ServicesPage.tsx, и др.) ползва `<Helmet>` с `og:url` сочещ към `/bg` версията, докато потребителят е на `/en` или друга — и това обърква Google.

Освен това в `src/pages/Index.tsx` (line 99): `og:url` = `${BASE_URL}/bg` — hardcoded. Това означава, че английската версия има og:url към BG версията.

**Проблем 2 — Дубликати без www / с www / с /bg:**
- `https://remontnapokrivivarna.bg/` (без www)
- `https://www.remontnapokrivivarna.bg/` (root, без /bg)
- `https://www.remontnapokrivivarna.bg/bg`

Lovable hosting обработва всички три, но няма 301 redirect от root към `/bg`. В `App.tsx` вероятно има редирект, но не е сървърен. Не може директно да направим 301 на ниво хостинг, но можем да добавим canonical към `/bg` от root и meta refresh.

**Проблем 3 — 14 redirect URLs в sitemap:**
Старите Cyrillic slugs (от `OLD_SLUG_REDIRECTS` в routes.ts) вероятно все още присъстват в някои sitemaps. Трябва пълна проверка.

**Проблем 4 — Hero image performance:**
В `src/components/Hero.tsx` (line 18-19): `fetchPriority="high"` ВЕЧЕ Е ЗАДАДЕН. Но в `index.html` няма `<link rel="preload">` за hero изображението. Логото (в Header) може да няма fetchpriority. Трябва проверка.

**Проблем 5 — Грешен legalName:**
В `src/pages/Index.tsx` (line 41): `"legalName": "България Билд ЕООД"` → трябва **„Булгар Билд ЕООД"** и EIK **207210238** (не 207189805).

**Проблем 6 — x-default hreflang:**
В `HreflangTags.tsx` (line 36): `${BASE_URL}/bg` → трябва `${BASE_URL}/` (root).

**Проблем 7 — UA hreflang код:**
URL-ът е `/ua` но lang код е `uk`. Промяна на URL-а на `/uk` е голяма миграция (засяга 100+ места). По-добре оставяме `/ua` URL и `hreflang="uk"` (което Google приема), но добавяме `<meta http-equiv="content-language" content="uk">` за украинската версия.

---

### Промени по файлове (8 файла + 1 миграция)

| # | Файл | Промяна |
|---|------|---------|
| 1 | `src/components/HreflangTags.tsx` | x-default → root (`/`); добавяне на dynamic og:url съответствие; canonical винаги per-language |
| 2 | `src/pages/Index.tsx` | Fix legalName → „Булгар Билд ЕООД", EIK → 207210238; og:url динамичен per-lang |
| 3 | `src/components/Footer.tsx` (ако има EIK) | Update EIK 207189805 → 207210238 |
| 4 | `index.html` | + `<link rel="preload" as="image" href="/src/assets/hero-homepage.jpg" fetchpriority="high">`; обновяване на `og:url` |
| 5 | `src/components/Header.tsx` | Logo `<img>` → добавяне на `fetchpriority="high"` и `loading="eager"` |
| 6 | `public/sitemap-bg.xml` + 9 други | Премахване на всички URL-и от `OLD_SLUG_REDIRECTS` (Cyrillic slugs) |
| 7 | `src/App.tsx` или нов `RootRedirect.tsx` | На route `/` — client-side redirect към `/bg` (за SPA), вече е имплементиран чрез `LanguageRedirect` — verify |
| 8 | Всички страници с hardcoded `og:url={BASE_URL}/bg` | Замяна с динамичен per-language URL чрез useParams |

### Проблем 7 (UA) — отделно решение

Промяна на URL slug `/ua` → `/uk` би изисквала:
- Update на `SUPPORTED_LANGUAGES` в `i18n/config.ts`
- Преименуване на `src/i18n/locales/ua.ts` → `uk.ts`
- Update на всички `localizedSlugs.ua` → `localizedSlugs.uk`
- Update на `sitemap-ua.xml` → `sitemap-uk.xml`
- 301 redirect от `/ua/*` → `/uk/*`

**Препоръка:** Тази промяна е скъпа и рискова. Оставяме URL `/ua` с hreflang `uk` (Google поддържа това разминаване от години). Не е блокер за индексиране.

### Какво НЕ можем да направим директно

- **Сървърен 301 redirect** от non-www → www: Lovable хостингът автоматично пренасочва, но ако не работи — изисква DNS/Cloudflare настройка от потребителя. Документирам в съобщение.
- **301 от root `/` към `/bg`**: SPA-та правят client-side redirect (LanguageRedirect.tsx вече прави това). За истински 301 нужен е CDN/хостинг конфиг — не е възможно.

### Очакван резултат

- ~77 неиндексирани страници → индексирани (правилни per-language canonical-и)
- ~14 redirect URL-и → премахнати от sitemaps
- Schema.org достоверност → коректен legalName/EIK за rich snippets
- LCP подобрение → preload hero image
- Конистентност og:url ↔ canonical → по-добър SEO авторитет

### Засегнат обем

~10 файла + 1 SQL миграция (ако EIK е в DB някъде). Без breaking changes, без promenq на routing.

