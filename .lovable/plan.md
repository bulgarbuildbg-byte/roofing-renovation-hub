

## План: Поправка на навигацията в блога + разширяване на 5 стари статии

### Проблем 1 — Линковете в блога не работят (3 бъга)

**Бъг A**: `BlogPage.tsx` линкове сочат към `/блог/${post.id}` (Cyrillic). В `App.tsx` ред 72, `/блог/:slug` прави redirect към `/bg/blog` **без slug-а**. Затова при клик → redirect обратно към блог листа.

**Бъг B**: `BlogArticle.tsx` чете `useParams<{ slug: string }>()`, но route pattern-ът е `/:lang/*` — няма `:slug` параметър. `slug` е винаги `undefined`.

**Бъг C**: Вътрешните линкове в самите статии (напр. „Обратно към блога") сочат към `/блог` вместо `/bg/blog`.

### Поправки за навигацията

| Файл | Промяна |
|---|---|
| `BlogPage.tsx` | Линкове от `/блог/${id}` → `/bg/blog/${id}` (ред 249 и 298) |
| `App.tsx` | Ред 72: `/блог/:slug` redirect → `/bg/blog/:slug` (запази slug) |
| `BlogArticle.tsx` | Извлечи slug от `*` wildcard param: `const { '*': restPath } = useParams(); const slug = restPath?.split('/').pop()` |
| 5-те стари статии | Вътрешни линкове: `/блог` → `/bg/blog` |

### Проблем 2 — 5 стари статии са кратки и непълни

Текущо: SpringInspection (178 реда), CommonMistakes (271), ChoosingTiles (286), RoofRepairSigns (358), WaterproofingTypes (402). Новите статии са 468+ реда.

Тези 5 статии трябва да се **пренапишат** по шаблона на новите 4 (RoofRepairCostVarna, TileReplacementGuide, RoofLeakCauses, RoofMaintenanceGuide):

| Статия | Нова структура |
|---|---|
| **RoofRepairSigns** — 5 признака за спешен ремонт | Hero + детайлни 5 признака с цени + FAQ 6-8 въпроса + JSON-LD + CTA |
| **WaterproofingTypes** — Видове хидроизолация | Hero + 4 типа с ценови таблици + сравнителна таблица + FAQ + CTA |
| **ChoosingTiles** — Избор на керемиди | Hero + 4 типа керемиди с цени + таблица за сравнение + FAQ + CTA |
| **CommonMistakes** — Грешки при ремонти | Hero + 8-10 грешки детайлно + как да ги избегнете + FAQ + CTA |
| **SpringInspection** — Пролетна инспекция | Hero + чеклист с цени + сезонни особености Варна + FAQ + CTA |

Всяка пренаписана статия ще съдържа:
- 3000+ думи реално съдържание
- JSON-LD schemas (BlogPosting, FAQPage, BreadcrumbList)
- Ценови таблици и реални примери от Варна
- 6-8 FAQ въпроса
- Вътрешни линкове към service pages (Latin slugs)
- Двоен CTA (безплатен оглед + телефон)
- og:url с Latin slug

### Slugs — миграция на Cyrillic към Latin

Старите Cyrillic slug-ове ще бъдат заменени с Latin:

| Стар slug | Нов slug |
|---|---|
| `5-признака-че-покривът-се-нуждае-от-ремонт` | `5-priznaka-remont-na-pokriv` |
| `видове-хидроизолация-и-кога-да-изберем-всяка` | `vidove-hidroizolacia-narachnik` |
| `избор-на-керемиди-за-нов-покрив` | `izbor-na-keremidi-za-pokriv` |
| `най-честите-грешки-при-покривни-ремонти` | `greshki-pri-remont-na-pokriv` |
| `пролетна-инспекция-на-покрива` | `proletna-inspekcia-na-pokriva` |
| `как-да-подготвим-покрива-за-зимата` | `podgotovka-pokriv-za-zimata` |

Mapping в `BlogArticle.tsx` ще включва и старите и новите slug-ове (старите за redirect).

### Засегнати файлове (общо ~15)

| Файл | Промяна |
|---|---|
| `src/App.tsx` | Fix redirect ред 72 |
| `src/pages/BlogPage.tsx` | Fix линкове + нови Latin slugs |
| `src/pages/blog/BlogArticle.tsx` | Fix slug extraction + нови mappings |
| `src/pages/blog/RoofRepairSigns.tsx` | Пренаписване 3000+ думи |
| `src/pages/blog/WaterproofingTypes.tsx` | Пренаписване 3000+ думи |
| `src/pages/blog/ChoosingTiles.tsx` | Пренаписване 3000+ думи |
| `src/pages/blog/CommonMistakes.tsx` | Пренаписване 3000+ думи |
| `src/pages/blog/SpringInspection.tsx` | Пренаписване 3000+ думи |
| `src/pages/blog/WinterRoofPreparation.tsx` | Fix вътрешни линкове + Latin slug |

