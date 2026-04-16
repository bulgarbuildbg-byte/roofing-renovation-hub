

## План: Пълни sitemaps за всички 10 езика + robots.txt оптимизация

### Проблем

BG sitemap-ът съдържа ~35 URL-а (всички услуги, блог, соларни, финансиране). Останалите 9 езикови sitemaps (EN, DE, RU, FI, SV, NO, FR, NL, UA) имат само ~13-15 URL-а и им липсват:

| Липсващи страници | Брой |
|---|---|
| projects, reviews, calculator, faq, howWeWork, pricing | 6 |
| solarSystems, solarHouse, solarBuildings, solarFarms | 4 |
| financing | 1 |
| contact (в EN, RU) | 1 |

### Решение

Пълно презаписване на всички 10 sitemaps + sitemap index с единна структура, генерирана от `routes.ts` slugs.

### Промени по файлове

| Файл | Действие |
|---|---|
| `public/sitemap.xml` | Update lastmod → 2026-04-16 |
| `public/sitemap-bg.xml` | Запазва се (вече е пълен), lastmod update |
| `public/sitemap-en.xml` | Пълно презаписване — добавяне на ~12 липсващи URL-а |
| `public/sitemap-de.xml` | Пълно презаписване — добавяне на ~12 липсващи URL-а |
| `public/sitemap-ru.xml` | Пълно презаписване — добавяне на ~13 липсващи URL-а |
| `public/sitemap-fi.xml` | Пълно презаписване — добавяне на ~12 липсващи URL-а |
| `public/sitemap-sv.xml` | Пълно презаписване — добавяне на ~12 липсващи URL-а |
| `public/sitemap-no.xml` | Пълно презаписване — добавяне на ~12 липсващи URL-а |
| `public/sitemap-fr.xml` | Пълно презаписване — добавяне на ~12 липсващи URL-а |
| `public/sitemap-nl.xml` | Пълно презаписване — добавяне на ~12 липсващи URL-а |
| `public/sitemap-ua.xml` | Пълно презаписване — добавяне на ~12 липсващи URL-а |
| `public/robots.txt` | Опростяване — само `Sitemap: sitemap.xml` (index вече сочи към всички sub-sitemaps) |

### Структура на всеки езиков sitemap

Всеки файл ще съдържа **25 URL-а** (всички routes от `routes.ts`), организирани по приоритет:

```text
1.0  homepage
0.9  services, roofRepair, tileRoofRepair, waterproofing, newRoof, inspection, solarSystems, financing, pricing
0.8  leakRepair, flatRoof, metalRoof, maintenance, solarHouse, solarBuildings, solarFarms, contact, calculator
0.7  about, projects, reviews, howWeWork, blog, faq
```

### Hreflang cross-references

Ключови страници с пълни 10-езикови `xhtml:link` алтернати:
- **homepage** — всички 10 езика + x-default=bg
- **inspection** — всички 10 езика + x-default=bg
- **financing** — всички 10 езика + x-default=bg

### Robots.txt оптимизация

```text
User-agent: *
Allow: /
Disallow: /admin/

Sitemap: https://www.remontnapokrivivarna.bg/sitemap.xml
```

Опростено — един Sitemap entry към index файла (който вече реферира всички 10 sub-sitemaps). Премахване на дублиращите се директни reference-и.

### Техническа бележка

Slugs-ите се вземат директно от `src/i18n/routes.ts` — няма ръчно въвеждане, без риск от грешки.

