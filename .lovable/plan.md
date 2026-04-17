

## План: Multi-City архитектура — Етап 1 (Бургас)

### Стратегически контекст

Текущата архитектура е **single-city** (всичко = Варна) с language prefix `/bg/...`. Преходът към multi-city изисква нов URL pattern:
- **Сега:** `/bg/remont-na-pokrivi` (= Варна имплицитно)
- **Бъдеще:** `/bg/varna/remont-na-pokrivi`, `/bg/burgas/remont-na-pokrivi`

Това е голяма архитектурна промяна — ще я разделя на **2 етапа** за безопасност.

---

### Етап 1 (СЕГА): City registry + Бургас главна страница + City Switcher

Без да чупя съществуващите `/bg/*` URLs, добавям паралелна city-aware структура.

#### 1. City registry (`src/i18n/cities.ts` — нов файл)

```ts
export type CityKey = 'varna' | 'burgas';

export const CITIES: Record<CityKey, {
  slug: string;
  nameBg: string;
  nameLatin: string;
  phone: string;
  email: string;
  workingHours: string;
  neighborhoods: string[];
  geo: { lat: number; lng: number };
  defaultLang: SupportedLanguage;
}> = {
  varna: { slug: 'varna', nameBg: 'Варна', neighborhoods: [...], ... },
  burgas: { slug: 'burgas', nameBg: 'Бургас', neighborhoods: [
    'Сарафово','Лазур','Изгрев','Славейков','Меден рудник',
    'Ветрен','Братя Миладинови','Горно Езерово','Победа','Крайморие'
  ], geo: { lat: 42.5048, lng: 27.4626 }, ... }
};

export const DEFAULT_CITY: CityKey = 'varna';
```

#### 2. CityContext (`src/contexts/CityContext.tsx` — нов)

Provider който чете активния град от URL (`/[lang]/[city]/...`) или fallback към `varna`. Експозира `useCity()` hook → `{ city, cityData, setCity }`.

#### 3. Routing — нов pattern

В `App.tsx` добавям паралелен route **преди** съществуващия `/:lang/*`:

```tsx
{/* New city-aware routes */}
<Route path="/:lang/:city/*" element={<CityAwareLayout />}>
  <Route path="*" element={<CityPageRouter />} />
</Route>

{/* Legacy single-city (Варна implicit) — остава непроменен */}
<Route path="/:lang/*" element={<LanguageLayout />}>
  <Route path="*" element={<LocalizedPageRouter />} />
</Route>
```

`CityPageRouter` валидира че `:city` е известен, иначе → fallback към legacy router (за да не счупя `/bg/blog`, `/bg/services` и т.н.).

#### 4. Burgas Home Page (`src/pages/cities/BurgasHome.tsx` — нов)

Базиран на `Index.tsx`, но:
- H1: **„Ремонт на Покриви Бургас"**
- Title: **„Ремонт на Покриви Бургас — Безплатен Оглед 24ч | 088 499 7659"**
- Canonical: `https://www.remontnapokrivivarna.bg/bg/burgas/`
- JSON-LD `RoofingContractor` с `areaServed: Бургас`, `geo` Бургас координати
- Секция „Обслужваме всички квартали" с 10-те квартала
- Тел: `tel:0884997659`
- Email: `remontnapokrivivarna@abv.bg`
- Раб. време: Пон–Съб 08:00–18:00 · Аварии 24/7
- Reuse-ва компонентите: `Hero`, `TrustIndicators`, `Services`, `HowWeWork`, `Testimonials`, `Contact`, `Footer` — всички получават `cityData` via CityContext и показват „Бургас" вместо „Варна"

#### 5. City Switcher в Header (`src/components/CitySwitcher.tsx` — нов)

Малък dropdown в хедъра (до LanguageSwitcher):
- Показва текущия град (с икона MapPin)
- Опции: Варна, Бургас (+ „Скоро: Русе, Пловдив..." disabled)
- При клик → navigate към същата страница в новия град
- Pill-стил, h-11, консистентен с LanguageSwitcher

В `Header.tsx` добавям `<CitySwitcher />` преди `<LanguageSwitcher />`.

#### 6. Динамични nav линкове (city-aware)

Разширявам `useLocalizedPath()` хука:
```ts
const { getPath, currentLang, currentCity } = useLocalizedPath();
// getPath('roofRepair') → 
//   ако city='varna' (default): /bg/remont-na-pokrivi  (legacy URL)
//   ако city='burgas': /bg/burgas/remont-na-pokrivi  (нов pattern)
```

Това гарантира че когато потребителят е в `/bg/burgas/`, всички линкове в менюто водят към `/bg/burgas/[услуга]`.

**Важно:** За Етап 1 услугните страници за Бургас още не съществуват — ще водят към 404 placeholder с CTA „Поискай оглед в Бургас". Това ще се реши в Етап 2.

#### 7. SEO файлове

- **`public/sitemap-bg.xml`**: добавяне на `/bg/burgas/` като нов URL (priority 0.9)
- **`src/components/HreflangTags.tsx`**: city-aware canonical (URL винаги отразява активния град)

---

### Етап 2 (СЛЕДВАЩА СЕСИЯ — НЕ В ТАЗИ): Услугни страници за Бургас

След като Етап 1 работи, ще създам:
- 8-10 услугни страници за Бургас (`/bg/burgas/remont-na-pokrivi`, `/bg/burgas/hidroizolacia-na-pokriv`, ...)
- Reusable templates вместо дублиране (всяка услуга = 1 компонент който приема `cityData`)
- Обновяване на sitemap с всички 8 нови URL-а

---

### Засегнати файлове (Етап 1 — ~10 файла)

| # | Файл | Действие |
|---|------|----------|
| 1 | `src/i18n/cities.ts` | NEW — city registry |
| 2 | `src/contexts/CityContext.tsx` | NEW — provider + useCity() |
| 3 | `src/components/CityAwareLayout.tsx` | NEW — wrapper за city-aware routes |
| 4 | `src/components/CityPageRouter.tsx` | NEW — рутер за city pages |
| 5 | `src/pages/cities/BurgasHome.tsx` | NEW — главна страница Бургас |
| 6 | `src/components/CitySwitcher.tsx` | NEW — dropdown в хедъра |
| 7 | `src/hooks/useLocalizedPath.ts` | UPDATE — добавя `currentCity` + city-aware getPath |
| 8 | `src/components/Header.tsx` | UPDATE — добавя CitySwitcher |
| 9 | `src/App.tsx` | UPDATE — нов `/:lang/:city/*` route преди legacy |
| 10 | `public/sitemap-bg.xml` | UPDATE — добавя `/bg/burgas/` |

### Какво НЕ се променя (за безопасност)

- Съществуващите `/bg/*`, `/en/*` URLs продължават да работят непроменени
- Legacy `LanguageLayout` + `LocalizedPageRouter` остават
- Всички текущи SEO/canonical/sitemap entries за Варна остават валидни
- Когато city не е в URL → имплицитно = Варна (legacy behavior)

### Очакван резултат след Етап 1

✅ `/bg/burgas/` зарежда пълна главна страница за Бургас  
✅ City Switcher в хедъра показва „Варна" / „Бургас"  
✅ JSON-LD `RoofingContractor` за Бургас → Google Local Pack за Бургас заявки  
✅ Sitemap включва Бургас → Google ще го открие  
✅ Архитектура готова за добавяне на още градове (Русе, Пловдив) и държави (`/de/hamburg/`)

