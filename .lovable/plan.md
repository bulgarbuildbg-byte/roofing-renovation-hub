

## План: Добавяне на Добрич като 4-ти активен град

### Подход
Копирам Русе pattern-а — Добрич е логичен следващ град, тъй като е географски близо до Варна (45 км северно, ~90,000 жители, областен център).

### Промени

**1. `src/i18n/cities.ts`**
- Добавям `"dobrich"` към `CityKey` type
- Добавям пълен `CityData` запис: 
  - slug: `dobrich`, nameBg: `Добрич`, nameLatin: `Dobrich`, nameLocative: `в Добрич`
  - Phone/email/hours: същите като другите градове (единен контакт)
  - Квартали: `Балик`, `Дружба`, `Изгрев`, `Рилци`, `Запад`, `Север`, `Център`, `Добротица`, `Хр. Ботев`, `Русе`
  - Geo: `{ lat: 43.5667, lng: 27.8333 }`
  - Postal: `9300`, region: `Добрич`
- Добавям `"dobrich"` към `ACTIVE_CITIES` масива
- Премахвам Добрич от `COMING_SOON_CITIES` (не присъства, но проверявам)
- Update `isCityKey` и `getCityFromSlug` да включват `"dobrich"`

**2. `src/pages/cities/DobrichHome.tsx`** (нов файл)
- Копие на `RuseHome.tsx` pattern
- Hero с "Ремонт на покриви в Добрич"
- Local SEO meta tags + LocalBusiness JSON-LD с координатите на Добрич
- Списък с квартали, услуги, локални testimonials
- Линкове към `/bg/dobrich/[service]` за всички 8 услуги

**3. `src/components/LocalizedPageRouter.tsx`**
- Регистрирам `DobrichHome` в `PAGE_MAP`
- Routing: `/bg/dobrich` → DobrichHome, `/bg/dobrich/[service]` → CityServiceTemplate
- (Маршрутизацията вече трябва да работи автоматично през `CityPageRouter` ако е генеричен)

**4. `src/components/CityPageRouter.tsx`**
- Проверявам че dynamic routing работи за `dobrich` slug — добавям case ако е с switch statement

**5. `src/pages/CitiesHubPage.tsx`**
- Добавям Dobrich card в активната секция (от 3 на 4 активни)
- Добавям pin на картата на България: lng=27.83, lat=43.57 → x≈876, y≈131 (североизток, между Варна и Русе)
- Premium pin styling (същият като Варна/Бургас/Русе)

**6. `src/components/Testimonials.tsx`**
- Добавям fallback testimonials масив за `dobrich` (3-4 локални отзива с имена и квартали от Добрич)

**7. Sitemap (`public/sitemap-bg.xml`)**
- Добавям `/bg/dobrich/` (home)
- Добавям 8 service URLs: `/bg/dobrich/remont-na-pokrivi`, `/bg/dobrich/hidroizolacia-na-pokriv`, etc.

### Засегнати файлове (7)

| # | Файл | Промяна |
|---|------|---------|
| 1 | `src/i18n/cities.ts` | + Dobrich в CityKey, ACTIVE_CITIES, CITIES обект |
| 2 | `src/pages/cities/DobrichHome.tsx` | нов файл (копие на RuseHome) |
| 3 | `src/components/LocalizedPageRouter.tsx` | регистрация в PAGE_MAP |
| 4 | `src/components/CityPageRouter.tsx` | поддръжка на dobrich slug (ако е нужно) |
| 5 | `src/pages/CitiesHubPage.tsx` | + Dobrich card + pin на картата |
| 6 | `src/components/Testimonials.tsx` | + fallback отзиви за Dobrich |
| 7 | `public/sitemap-bg.xml` | + 9 нови URLs за Dobrich |

### Резултат

✅ `/bg/dobrich/` и 8 услугни страници работят  
✅ City Switcher показва Добрич като 4-та опция  
✅ Cities Hub показва 4 активни града + pin на картата на правилната географска позиция  
✅ Footer показва Добрич като активен pill  
✅ SEO: hreflang, canonical, sitemap, LocalBusiness schema готови  
✅ Тестимониали филтрирани по Добрич  

### Какво НЕ включва (по подразбиране)

- Превод на DobrichHome за 9-те други езика (засега BG-only, както е при другите градове)
- Sitemap entries за останалите 9 езика (могат да се добавят отделно)
- Истински testimonials в DB (използваме fallback засега)

