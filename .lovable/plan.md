

## План: Нова SEO страница „Финансиране на ремонт на покрив"

### Обхват

Нова 3000+ думи landing page с вграден финансов калкулатор, SEO/LLMO оптимизация, JSON-LD schema, и пълна routing интеграция.

### Промени по файлове

| Файл | Действие |
|---|---|
| `src/i18n/routes.ts` | + `financing` RouteKey + slugs за 10 езика |
| `src/components/LocalizedPageRouter.tsx` | + import + PAGE_MAP entry |
| `src/pages/services/FinancingPage.tsx` | НОВ — 3000+ думи SEO страница |
| `src/components/FinancingCalculator.tsx` | НОВ — вграден калкулатор за вноски |
| `src/i18n/locales/bg.ts` | + translation keys за financing |
| `public/sitemap-bg.xml` | + URL |

### 1. Routing

Нов RouteKey `financing` с BG slug `finansirane-remont-na-pokriv`. Localized slugs за всички 10 езика (EN: `roof-repair-financing`, DE: `dachsanierung-finanzierung`, и т.н.).

### 2. FinancingPage.tsx — Структура (13 секции)

Следва конверсионната йерархия от RoofRepairPage:

1. **Hero** — H1: „Ремонт на покрив на вноски – без голям първоначален разход", подзаглавие за партньорски банки, 2 CTA (Провери финансиране + Вземи оферта) + CalculatorDialog
2. **Trust Indicators** — компонент
3. **Как работи** — 5 стъпки (Запитване → Консултация → Оферти от банки → Избираш → Започва ремонт) с gradient step numbers
4. **Предимства** — 6 карти (няма обикаляне, няколко оферти, бързо одобрение, гъвкави вноски, без скрити такси, експертна помощ)
5. **Примери за вноски** — таблица с green highlights (10 000€ → ~150€/мес, 15 000€ → ~220€/мес, 20 000€ → ~290€/мес, 30 000€ → ~430€/мес)
6. **FinancingCalculator** — inline калкулатор (сума slider + срок selector → месечна вноска + обща сума + лихва)
7. **За какво може да се ползва** — 4 карти (покрив, хидроизолация, солар, цялостно строителство) с линкове към съответните страници
8. **Банки партньори** — TBI Bank, BNP Paribas, ДСК + „други институции"
9. **Важно обяснение (доверие)** — „Ние не сме банка. Не отпускаме кредити. Съдействаме чрез лицензирани партньори."
10. **FAQ** — 8 въпроса (SEO ключови думи: кредит за ремонт, разсрочено плащане, строителен кредит)
11. **CTA секция** — dual CTA (форма + телефон)
12. **Testimonials** — компонент
13. **Footer**

### 3. FinancingCalculator.tsx

Compact inline калкулатор:
- **Inputs**: сума (5 000–50 000€ slider), срок (12/24/36/48/60 месеца radio)
- **Output**: месечна вноска, обща сума, лихва (ориентировъчна ~5.9% APR)
- **CTA след резултат**: „Искате точна оферта?" → бутони „Да, свържете се" / „Обади ми се"
- Визуален стил: gradient card, green numeric highlights, 2×2 grid за резултати

### 4. SEO

- JSON-LD: `FinancialProduct` + `FAQPage` + `BreadcrumbList` schemas
- Meta: уникални title/description с ключови думи (кредит за ремонт на покрив, финансиране на ремонт, ремонт на покрив на изплащане)
- H1/H2 йерархия оптимизирана за featured snippets
- Първите 2 изречения — директни отговори за LLMO

### 5. Вътрешни връзки

Секция „За какво може да се ползва" линкува към:
- `roofRepair` (ремонт на покрив)
- `waterproofing` (хидроизолация)
- `solarSystems` (соларни системи)
- `calculator` (калкулатор)

