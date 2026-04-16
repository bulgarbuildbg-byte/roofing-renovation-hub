

## План: SEO одит — поправки за навигация, метаданни и съдържание

### Обхват (8 промени, ~10 файла)

### 1. Навигация: соларни услуги като отделна категория

**Header.tsx** — Добавяне на втори dropdown „Соларни Системи" (между Услуги и Контакти) с 4 линка: solarSystems, solarHouse, solarBuildings, solarFarms. Премахване на solarSystems от serviceLinks (за да не се дублира). На mobile — добавяне на отделна секция със заглавие „Соларни Системи".

### 2. Дефолтен title в `index.html` → по-описателен

Промяна на `<title>` от generic към brand-rich fallback: **„Ремонт на Покриви Варна — Безплатен Оглед 24ч | 088 499 7659"**. Всички страници използват react-helmet и презаписват, но fallback-ът се вижда от crawlers преди JS hydration.

### 3. Уникални title/description за страници, които използват generic ключове

| Файл | Промяна |
|---|---|
| `src/pages/PricingPage.tsx` | hardcoded title: „Цени за Ремонт на Покриви Варна 2026 — Прозрачни Тарифи" + уникална desc |
| `src/pages/CalculatorPage.tsx` | title по-богат: „Калкулатор Цена Покрив Варна — Онлайн Оценка за 60 секунди" |
| `src/pages/services/RoofRepairPage.tsx` | Замяна на t() ключове с hardcoded стойности (i18n keys може да липсват) — fallback към ключовете остава |
| `src/pages/services/RoofLeakRepairPage.tsx` | Същото — hardcoded title/desc |

Допълнителна проверка: title-ите от audit-а (`/bg/hidroizolacia-na-pokriv`, `/bg/nov-pokriv`, `/bg/metalni-pokrivi` и др.) **вече са уникални** в кода — не се изисква промяна там.

### 4. H1 на калкулатор страницата

**`src/components/PriceCalculator.tsx`** (line 381) — Промяна на „Изчислете Ориентировъчна Цена" от `<h2>` на `<h1>`. Запазване на класовете. Където PriceCalculator се ползва вътре в други страници, h1 ще бъде второстепенен — приемливо, защото калкулаторът е централен компонент.

Алтернатива (по-чиста): добавяне на видим H1 в `CalculatorPage.tsx` преди компонента и оставяне на h2 в PriceCalculator. **Ще използвам тази алтернатива.**

### 5. Поправка на дублирания „Изчисли Цена" бутон на `/bg/solarni-sistemi`

**`src/pages/services/SolarSystemsPage.tsx`** — Има два бутона: anchor `<a href="#solar-calculator">Изчисли Цена</a>` (line 152) И `<CalculatorDialog type="solar" />` chip (line 162). Премахване на CalculatorDialog chip, тъй като anchor-ът е по-релевантен (води до вградения SolarCalculator на страницата).

### 6. Service Schema на покривни подстраници

**Файлове:** `WaterproofingPage.tsx`, `NewRoofPage.tsx`, `MetalRoofPage.tsx`, `FlatRoofPage.tsx`, `TileReplacementPage.tsx`, `MaintenancePage.tsx`, `RoofLeakRepairPage.tsx` — добавяне на JSON-LD `Service` schema в `<Helmet>`:

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "...",
  "provider": { "@type": "RoofingContractor", "name": "...", "telephone": "..." },
  "areaServed": "Варна",
  "offers": { "@type": "Offer", "price": "...", "priceCurrency": "EUR" }
}
```

### 7. Тестимониал гаранция

**`src/components/Testimonials.tsx`** (line 53) — текстът вече казва „15 години гаранция" — **поправено е**. Ако audit-ът отчита грешка, тя идва от Supabase БД. Ще добавим миграция: `UPDATE testimonials SET text = REPLACE(text, '5 години гаранция', '15 години гаранция') WHERE text LIKE '%5 години гаранция%' AND text NOT LIKE '%15 години%';`

### 8. Дублиран URL `hidroizolacia-varna` vs `hidroizolacia-na-pokriv`

В `routes.ts` `hidroizolacia-varna` е само в OLD_SLUG_REDIRECTS → 301 redirect. Това вече е коректно. **Премахване на `hidroizolacia-varna` от sitemap-ите**, ако присъства (проверих BG sitemap — само `hidroizolacia-na-pokriv` е там; ОК). Без промени.

### Засегнати файлове

| Файл | Действие |
|---|---|
| `src/components/Header.tsx` | + Solar dropdown, отделяне от Services |
| `index.html` | подобряване на fallback title |
| `src/pages/PricingPage.tsx` | hardcoded уникален title/desc |
| `src/pages/CalculatorPage.tsx` | + видим H1, по-богат title |
| `src/pages/services/RoofRepairPage.tsx` | hardcoded title/desc fallback |
| `src/pages/services/RoofLeakRepairPage.tsx` | hardcoded title/desc fallback |
| `src/pages/services/SolarSystemsPage.tsx` | премахване на дублиран CalculatorDialog |
| 7 service pages | + JSON-LD Service schema |
| Migration | UPDATE testimonials за 15г гаранция |

