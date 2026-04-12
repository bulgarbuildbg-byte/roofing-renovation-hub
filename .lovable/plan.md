

## SEO преструктуриране: нова URL структура с латиница, без дублиране

### Обобщение

Пълна промяна на URL структурата: от кирилица към латинска транслитерация за BG, нови SEO-оптимизирани slug-ове за EN, премахване на дублирани/припокриващи се страници, 301 redirect-и от стари URL-и.

### 1. Нова slug карта (routes.ts)

**Премахване на `tileReplacement` и `waterproofingVarna`** — съдържанието им се влива в `roofRepair` (сега = ремонт на керемидени покриви) и `waterproofing`.

**Нов RouteKey `tileRoofRepair`** заменя `tileReplacement` с ново съдържание.

**Нови BG slug-ове (латиница):**

| RouteKey | Стар BG slug | Нов BG slug |
|---|---|---|
| roofRepair | ремонт-на-покриви | remont-na-pokrivi |
| tileRoofRepair (нов) | смяна-керемиди | remont-na-keremideni-pokrivi |
| leakRepair | ремонт-течове | remont-na-techove-pokriv |
| waterproofing | хидроизолация | hidroizolacia-na-pokriv |
| newRoof | изграждане-на-покрив | nov-pokriv |
| flatRoof | плоски-покриви | remont-na-ploski-pokrivi |
| metalRoof | метални-покриви | metalni-pokrivi |
| maintenance | поддръжка-на-покриви | poddruzhka-na-pokrivi |

Останалите (about, projects, blog, faq, contact, etc.) също минават на латиница:
`za-nas`, `proekti`, `blog`, `vaprosi`, `kontakti`, `otzyvi`, `kalkulator`, `bezplaten-ogled`, `kak-rabotim`, `tseni-remont-pokriv`

**Нови EN slug-ове:**

| RouteKey | Нов EN slug |
|---|---|
| roofRepair | roof-repair-varna |
| tileRoofRepair | tile-roof-repair-varna |
| leakRepair | roof-leak-repair |
| waterproofing | roof-waterproofing |
| newRoof | new-roof-construction |
| flatRoof | flat-roof-repair |
| metalRoof | metal-roof-installation |
| maintenance | roof-maintenance |

**Премахва се:** `waterproofingVarna` (RouteKey) — сливане с `waterproofing`.

### 2. Redirect-и (App.tsx)

Всички стари кирилски URL-и → нови латински:
```
/ремонт-на-покриви → /bg/remont-na-pokrivi
/смяна-керемиди → /bg/remont-na-keremideni-pokrivi
/хидроизолация → /bg/hidroizolacia-na-pokriv
/хидроизолация-варна → /bg/hidroizolacia-na-pokriv
```
И вътрешни redirect-и за стари /:lang/ URL-и (LanguageLayout ще ги хваща автоматично).

### 3. Компонент промени

| Файл | Промяна |
|---|---|
| `src/i18n/routes.ts` | Нова slug карта; премахване на `waterproofingVarna`, `tileReplacement` → `tileRoofRepair`; slug-ове на латиница за всички 10 езика |
| `src/components/LocalizedPageRouter.tsx` | Премахване на `WaterproofingVarnaPage` import; `tileReplacement` → `tileRoofRepair` с `TileReplacementPage` (пренаименуван) |
| `src/App.tsx` | Обновяване на redirect-ите от стари кирилски URL-и към нови латински |
| `src/components/Header.tsx` | Обновяване на `serviceLinks` — `tileReplacement` → `tileRoofRepair`, премахване на `waterproofingVarna` |
| `src/components/Footer.tsx` | Същото — обновяване на `serviceRoutes` |
| `src/components/HreflangTags.tsx` | Без промяна (работи динамично от routes.ts) |
| `src/i18n/locales/bg.ts` | Преименуване на ключове `tileReplacement` → `tileRoofRepair`; сливане на `waterproofingVarna` съдържание в `waterproofing` |
| `src/i18n/locales/en.ts` | Същото |
| `public/sitemap-bg.xml` | Обновяване на всички URL-и с новите латински slug-ове |
| `public/sitemap-en.xml` | Обновяване с новите EN slug-ове |
| Останалите 8 sitemap-а | Обновяване на slug-ове за съответните езици |

### 4. Вътрешно линкване

- `roofRepair` (главна услуга) линква към: tileRoofRepair, leakRepair, waterproofing, newRoof
- Всяка подстраница линква обратно към roofRepair + 2-3 свързани услуги
- Вече е реализирано чрез `RelatedServices` компонент — ще се обновят routeKey-овете

### 5. Какво се премахва

- `waterproofingVarna` страница и RouteKey — съдържанието се влива в `waterproofing`
- Стари кирилски slug-ове (остават само като redirect-и)
- URL-и без `/bg/` или `/en/` префикс (вече не съществуват директно)

### Технически детайли

Общо ~15 файла ще бъдат променени. Промените са предимно в slug конфигурацията и redirect-ите. Компонентите на страниците остават, само се пренасочват чрез новата slug карта. HreflangTags и canonical-ите работят автоматично от routes.ts.

