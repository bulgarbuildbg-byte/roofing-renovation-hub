

## План: Поправка на 10 проблема от SEO одита

### Стъпка 1 — КРИТИЧНИ (3 бъга в `bg.ts`)

**Файл:** `src/i18n/locales/bg.ts` (ред 128-130)

| Проблем | Сега | Поправка |
|---|---|---|
| „115 години гаранция" | `с 115 години гаранция` | `с 15 години гаранция` |
| Грешна цена в title | `от 13 €/кв.м` | `от 19 €/кв.м` |
| Грешна гаранция в title | `5г` | `15г` |
| Грешен meta desc | `5г гаранция` | `15г гаранция` |
| Грешен og:title | `от 13 €/кв.м \| 5г` | `от 19 €/кв.м \| 15г` |

### Стъпка 2 — Цена на ServicesPage

**Файл:** `src/pages/ServicesPage.tsx`

Заглавието и title казват „от 35 €/м²" — това е цена за „Частичен ремонт" пакет, не за базовия ремонт. Промяна:
- Title: `Покривни Услуги Варна – Ремонт, Хидроизолация, Нов Покрив | 15г Гаранция`
- H1: `Покривни Услуги Варна – Пълен Спектър от Решения`
- Така няма конфликт с „от 19 €/м²" на другите страници

Също: поправка на blog линковете от Cyrillic `/блог/...` → `/bg/blog/...` с Latin slugs.

Добавяне на breadcrumb навигация и BreadcrumbList JSON-LD schema.

### Стъпка 3 — Уникални title/meta за TileReplacementPage

**Файл:** `src/pages/services/TileReplacementPage.tsx` (ред 94-95)

| Поле | Сега | Поправка |
|---|---|---|
| Title | `Смяна Керемиди Варна - от 4 €/бр \| 5г` | `Смяна на Керемиди Варна - от 4 €/бр \| 15г Гаранция` |
| Meta desc | `5г гаранция` | `15 години гаранция` |
| OG title | `5г Гаранция` | `15г Гаранция` |

### Стъпка 4 — MetalRoofPage title корекция

**Файл:** `src/pages/services/MetalRoofPage.tsx` (ред 119)

Title `от 6 €/кв.м` — твърде ниска цена спрямо pricing page `от 18 €/м²`. Промяна на:
- Title: `Метални Покриви Варна - от 18 €/кв.м | До 50г Гаранция`

### Стъпка 5 — Уникални meta descriptions за контакти/отзиви

Страниците вече имат уникални title и meta descriptions (потвърдих горе). Потребителят е посочил generic titles — вероятно е виждал cached версии. Ще проверя и добавя `og:url` и `og:title` където липсват.

### Стъпка 6 — Google Reviews линк на ReviewsPage

**Файл:** `src/pages/ReviewsPage.tsx`

Добавяне на видим бутон „Вижте ни в Google" с линк към Google Business Profile (или placeholder URL).

### Стъпка 7 — Breadcrumb на ServicesPage

**Файл:** `src/pages/ServicesPage.tsx`

Добавяне на визуален breadcrumb `Начало > Услуги` + JSON-LD BreadcrumbList schema.

### Стъпка 8 — Отзив „5 години"

Потвърдих, че отзивът на Петър Стоянов вече казва „15 години гаранция" — няма проблем. Няма промяна.

### Стъпка 9 — Sitemap езици

Потребителят казва, че ако няма реален превод, sitemap-овете за fi/sv/no/fr/nl/ua трябва да се премахнат. Но сайтът ИМА реални преводи (i18n файлове за всички 10 езика). Няма промяна — ще потвърдя на потребителя.

### Засегнати файлове

| Файл | Промяна |
|---|---|
| `src/i18n/locales/bg.ts` | Fix „115 г.", „13 €", „5г" → правилни стойности |
| `src/pages/ServicesPage.tsx` | Fix title/H1, breadcrumb, blog links |
| `src/pages/services/TileReplacementPage.tsx` | Fix „5г" → „15г" в title/meta |
| `src/pages/services/MetalRoofPage.tsx` | Fix цена в title от 6 → 18 €/м² |
| `src/pages/ReviewsPage.tsx` | Добави Google Reviews линк |

