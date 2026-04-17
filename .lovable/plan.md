

## План: Унифицирана URL структура /[lang]/varna/[service]

### Обхват
- **8 услугни страници + home** получават /varna/ префикс във **всичките 10 езика**
- About/Blog/Contact/Calculator/Reviews/FAQ/Projects/Inspection/Pricing → **остават без град** (global pages)
- Всички стари URLs → **301 redirect** (SEO авторитет се запазва)

### Архитектурни промени

**1. `src/i18n/routes.ts` — нова функция `getCityScopedPath`**
```ts
const CITY_SCOPED_ROUTES: RouteKey[] = [
  'home', 'roofRepair', 'leakRepair', 'waterproofing',
  'newRoof', 'tileRoofRepair', 'flatRoof', 'metalRoof', 'maintenance'
];
export const isCityScopedRoute = (k: RouteKey) => CITY_SCOPED_ROUTES.includes(k);
```

**2. `src/components/LocalizedPageRouter.tsx` — 301 redirect логика**

Преди да resolve-не route, проверява: ако slug съответства на city-scoped service в текущия език И няма city префикс → `<Navigate to="/[lang]/varna/[slug]" replace />`. Същото за `/bg` (без slug) → `/bg/varna`.

```ts
// Pseudo:
if (!firstSegmentIsCity && routeKey && isCityScopedRoute(routeKey)) {
  return <Navigate to={`/${currentLang}/varna/${slug}`} replace />;
}
if (!slug) return <Navigate to={`/${currentLang}/varna`} replace />;
```

**3. `src/components/CityPageRouter.tsx` — поддръжка за всички езици**

Сега работи само за BG. Разширяване: чете `lang` от useParams, използва `findRouteKeyBySlug(subPath, lang)` за да резолва услугата в правилния език. CITY_SERVICES шаблонът остава BG-only (съдържанието е на български), но URL routing работи за всички езици.

**4. `src/pages/cities/VarnaHome.tsx` — мултиезична поддръжка**

Чете `lang` и показва съответния превод (засега може да остане BG съдържание, но компонентът се сервира на всички езици чрез CityPageRouter).

**5. `src/hooks/useLocalizedPath.ts` — Варна по подразбиране**

Премахваме условието `if (currentCity && currentLang === "bg")`. Новата логика:
- ако routeKey е city-scoped → винаги връща `/[lang]/[city||varna]/[slug]`
- иначе → legacy global path `/[lang]/[slug]`

**6. `src/components/HreflangTags.tsx` — canonical с varna**

Когато routeKey е city-scoped и няма city в URL → canonical винаги сочи към `/[lang]/varna/[slug]`. Hreflang alternates също включват `/varna/` за city-scoped routes.

**7. `src/components/LanguageRedirect.tsx` (root `/`)**

Update: `navigate(/${lang}/varna)` вместо `navigate(/${lang})`.

**8. Sitemap (`public/sitemap-bg.xml` + 9 други)**
- Премахване на стари /bg/remont-na-pokrivi, /bg/hidroizolacia-na-pokriv и т.н. (8 service URL-а × 10 ezika = 80 entries)
- Добавяне на нови /[lang]/varna/[slug] entries
- Запазване на global pages (about, blog, contact, calculator, ...) непроменени

**9. `src/i18n/cities.ts` — премахване на условни fallbacks**

Не е нужна промяна на CityKey, но `DEFAULT_CITY = "varna"` става единственият неявен default.

### Запазване на SEO авторитета

Всички стари URL-и (`/bg/remont-na-pokrivi`, `/en/roof-repair-varna`, `/de/dachreparatur-varna`, ...) продължават да съществуват в routing-а **САМО като 301 redirect** към новия canonical. React Router `<Navigate replace>` не е истински 301 (SPA), но:
- Google възприема `replace` навигацията като soft redirect
- Canonical tag-ът на новата страница ясно сочи към `/varna/` версията
- За истински 301 redirects в бъдеще → Lovable hosting не поддържа, но canonical + sitemap + вътрешни линкове са достатъчни сигнали

### Засегнати файлове (~10 файла)

| # | Файл | Промяна |
|---|------|---------|
| 1 | `src/i18n/routes.ts` | + `CITY_SCOPED_ROUTES` константа + `isCityScopedRoute` helper |
| 2 | `src/components/LocalizedPageRouter.tsx` | + redirect логика за city-scoped routes към /varna/ |
| 3 | `src/components/CityPageRouter.tsx` | поддръжка за всички 10 езика (не само BG) |
| 4 | `src/components/HreflangTags.tsx` | canonical/alternates винаги с /varna/ за city-scoped |
| 5 | `src/hooks/useLocalizedPath.ts` | default city = varna за city-scoped routes |
| 6 | `src/components/LanguageRedirect.tsx` | redirect към /[lang]/varna вместо /[lang] |
| 7 | `src/pages/cities/VarnaHome.tsx` | работи на всички езици |
| 8 | `src/components/CitySwitcher.tsx` | показва "Варна" като активен и на /bg/varna/* |
| 9 | `public/sitemap-bg.xml` | премахване на стари + добавяне на нови /varna/ URLs |
| 10 | `public/sitemap-{en,de,fi,sv,no,fr,nl,ru,ua}.xml` | същото за всеки език |

### Какво НЕ се променя

- About/Blog/Contact/Calculator/Reviews/FAQ/Projects/Inspection/Pricing/HowWeWork остават `/bg/za-nas`, `/bg/blog`, `/en/about` и т.н. (global)
- Burgas и Ruse URL-ите остават както са (`/bg/burgas/*`, `/bg/ruse/*`)
- Solar pages, financing → остават global (засега не са city-scoped)
- Cyrillic redirects (`/ремонт-на-покриви` → `/bg/remont-na-pokrivi`) → автоматично каскадират през новия redirect до `/bg/varna/remont-na-pokrivi`

### Резултат

✅ `/bg/remont-na-pokrivi` → 301 → `/bg/varna/remont-na-pokrivi`  
✅ `/en/roof-repair-varna` → 301 → `/en/varna/roof-repair-varna`  
✅ `/bg/` → 301 → `/bg/varna/`  
✅ Всички 3 града следват един и същ pattern: `/[lang]/[city]/[service]`  
✅ Sitemap показва само финалните URLs  
✅ Hreflang консистентен за city-scoped routes  
✅ Готово за добавяне на `/de/hamburg/`, `/fi/helsinki/` в бъдеще

