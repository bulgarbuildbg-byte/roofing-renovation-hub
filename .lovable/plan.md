

## План: Соларни системи — 4 нови страници + калкулатор + routing

### Обхват

Създаване на 4 нови високоефективни страници за услугата „Соларни системи" (3000+ думи всяка за основната), следвайки съществуващите patterns (RoofRepairPage, LocalizedPageRouter, routes.ts).

### 1. Routing — нови RouteKeys и slugs

**Файлове:** `src/i18n/routes.ts`, `src/components/LocalizedPageRouter.tsx`

Добавяне на 4 нови route keys:

| RouteKey | BG slug | EN slug |
|---|---|---|
| `solarSystems` | `solarni-sistemi` | `solar-systems` |
| `solarHouse` | `solarni-sistemi-za-kashta` | `solar-systems-for-homes` |
| `solarBuildings` | `solarni-sistemi-za-blokove` | `solar-systems-for-buildings` |
| `solarFarms` | `solarni-centrali` | `solar-farms` |

Добавяне на slug-ове за всичките 10 езика. Регистриране в `PAGE_MAP` в `LocalizedPageRouter.tsx`.

### 2. Основна страница — `SolarSystemsPage.tsx`

**Файл:** `src/pages/services/SolarSystemsPage.tsx` (~800 реда, 3000+ думи)

Структура (13 секции по образец на RoofRepairPage):

1. **Helmet** — SEO meta, OG, Service + FAQ + Breadcrumb JSON-LD schemas
2. **Hero** — „Соларни системи за къщи, сгради и инвестиции" + dual CTA (Изчисли цена + Обади се)
3. **TrustIndicators**
4. **Какво предлагаме** — 4 карти (Проектиране, Доставка, Монтаж, Пускане)
5. **Уникално предимство** — „Покрив + Солар = Всичко от една фирма" (ключов differentiator, подробен текст с иконки)
6. **3 типа решения** — карти с линкове към подстраниците
7. **Как работи системата** — опростена визуализация (слънце → панели → инвертор → дом/мрежа)
8. **Предимства** — 6 карти (по-ниски сметки, независимост, инвестиция, екология, стойност на имота, бърза възвръщаемост)
9. **HowWeWork** (процес)
10. **CompletedProjects**
11. **Testimonials**
12. **FAQ** — 8 въпроса за соларни системи
13. **CTA финал** — dual CTA

### 3. Подстраница за къщи — `SolarHousePage.tsx`

**Файл:** `src/pages/services/SolarHousePage.tsx` (~700 реда)

Секции:
1. **Hero** — „Соларна система за къща – до 80% по-ниски сметки"
2. **Проблем → Решение** — скъпи сметки → соларна система
3. **Конкретен продукт** — 8 kW система с батерия (спецификации, цена)
4. **Покрив + Солар** — отделна секция: стар покрив → ремонтираме; нов → защитаваме
5. **Ценови пакети** — 3 пакета (5kW, 8kW, 12kW) с карти
6. **Процес** — 6 стъпки (Запитване → Консултация → Оферта → Доставка → Монтаж → Пускане)
7. **Соларен калкулатор** — нов компонент `SolarCalculator.tsx`
8. **Гаранции** — панели, инвертор, монтаж
9. **FAQ** + **CTA**

### 4. Подстраница за блокове — `SolarBuildingsPage.tsx`

**Файл:** `src/pages/services/SolarBuildingsPage.tsx` (~500 реда)

Фокус: общи части, асансьори, намаляване разходи за вход. Секции: Hero, Проблем/Решение, Предимства за етажна собственост, Ценови модели, Покрив + Солар, Процес, CTA.

### 5. Подстраница за централи — `SolarFarmsPage.tsx`

**Файл:** `src/pages/services/SolarFarmsPage.tsx` (~500 реда)

Фокус: ROI, инвестиция, печалба, мащаб. Секции: Hero, Инвестиционен калкулатор, ROI таблица, Мащаби (50kW–1MW), Процес, CTA.

### 6. Нов компонент — `SolarCalculator.tsx`

**Файл:** `src/components/SolarCalculator.tsx` (~300 реда)

Вграден калкулатор (не модал, inline):

**Input:**
- Месечна сметка за ток (slider 50–500 лв)
- Квадратура на покрива (slider 30–300 м²)
- Тип покрив (скатен/плосък/метален)

**Output (real-time):**
- Препоръчана мощност (kW)
- Ориентировъчна цена (€)
- Годишно спестяване (€)
- Срок за изплащане (години)

Формула: мощност = месечна_сметка / 25; цена = мощност × 1100€; спестяване = месечна_сметка × 0.8 × 12 / 2; payback = цена / спестяване.

С CTA бутон „Получи точна оферта" → линк към контактна форма.

### 7. Обновяване на Services carousel

**Файл:** `src/components/Services.tsx`

Добавяне на „Соларни системи" като нов елемент в `serviceKeys[]` с подходящо placeholder изображение и цена „от 4 500 €".

### 8. Header навигация

**Файл:** `src/components/Header.tsx`

Добавяне на „Соларни системи" в dropdown менюто за услуги.

### 9. Sitemap

**Файл:** `public/sitemap-bg.xml`

Добавяне на 4 нови URL-а с priority 0.9/0.8.

### 10. i18n translations

**Файл:** `src/i18n/locales/bg.ts`

Добавяне на всички translation keys за 4-те соларни страници (meta, hero, sections, FAQ).

### Засегнати файлове

| Файл | Промяна |
|---|---|
| `src/i18n/routes.ts` | +4 RouteKeys, slugs за 10 езика |
| `src/components/LocalizedPageRouter.tsx` | +4 imports и PAGE_MAP entries |
| `src/pages/services/SolarSystemsPage.tsx` | НОВ — основна страница 3000+ думи |
| `src/pages/services/SolarHousePage.tsx` | НОВ — къщи |
| `src/pages/services/SolarBuildingsPage.tsx` | НОВ — блокове |
| `src/pages/services/SolarFarmsPage.tsx` | НОВ — централи |
| `src/components/SolarCalculator.tsx` | НОВ — inline калкулатор |
| `src/components/Services.tsx` | +1 service card |
| `src/components/Header.tsx` | +1 nav item |
| `src/i18n/locales/bg.ts` | +translation keys |
| `public/sitemap-bg.xml` | +4 URLs |

### Изпълнение

Поради обема (~3500 реда нов код), ще направя на 3 стъпки:
1. Routing + основна страница + калкулатор
2. 3 подстраници
3. Services carousel + Header + Sitemap + translations

