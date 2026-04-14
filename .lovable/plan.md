

## План: SEO блог оптимизация + 4 нови authority статии (3000+ думи)

### Нови статии (4 бр., всяка 3000+ думи)

| # | Файл | SEO заглавие (H1) | Основна ключова дума |
|---|---|---|---|
| 1 | `src/pages/blog/RoofRepairCostVarna.tsx` | Цена за ремонт на покрив във Варна 2026 — Пълен ценови наръчник | цена ремонт покрив Варна |
| 2 | `src/pages/blog/TileReplacementGuide.tsx` | Смяна на керемиди — Кога, как и колко струва | смяна на керемиди цена |
| 3 | `src/pages/blog/RoofLeakCauses.tsx` | Теч от покрива — Причини, решения и цени за ремонт | теч от покрив |
| 4 | `src/pages/blog/RoofMaintenanceGuide.tsx` | Поддръжка на покрив — Пълно ръководство за 2026 | поддръжка на покрив |

### Структура на всяка статия (единен шаблон)

1. **Hero** с cover image, breadcrumbs, дата, категория
2. **Въведение** — реален проблем, защо е важно (300+ думи)
3. **Основно съдържание** — детайлни секции с H2/H3 йерархия (1800+ думи)
4. **Ценова секция** — реални диапазони в EUR, таблици
5. **Реални примери** — 2-3 казуса от Варна с квартал и описание
6. **FAQ секция** — 6-8 въпроса с FAQPage JSON-LD schema
7. **CTA секция** — „Заяви безплатен оглед" + „Обади се: 088 499 7659"
8. Вътрешни линкове към service pages (`/bg/remont-na-pokrivi`, `/bg/hidroizolacia-na-pokriv`, etc.)

### LLMO оптимизация (във всяка статия)

- Директни отговори на въпроси в първите 2 изречения на всеки параграф
- Ясни числа и данни (цени, срокове, площи)
- Списъци и таблици за лесно извличане от AI
- Кратки, информативни изречения без празен маркетинг текст

### SEO meta за всяка статия

- Уникален `<title>` с ключова дума + „Варна 2026"
- Уникален `<meta description>` (150-160 символа)
- `og:url` с Latin slug (`/bg/blog/tsena-remont-pokriv-varna-2026`)
- BlogPosting + FAQPage + BreadcrumbList JSON-LD schemas

### Промени по BlogPage.tsx

- Добави 4-те нови статии в `blogPosts` масива
- Обнови категориите (добави „Цени")
- Обнови `og:url` на Latin slug
- Обнови schema URLs от Cyrillic на Latin

### Промени по BlogArticle.tsx

- Добави 4-те нови slug → component mapping-а в `staticArticles`

### Засегнати файлове

| Файл | Промяна |
|---|---|
| `src/pages/blog/RoofRepairCostVarna.tsx` | **НОВ** — 3000+ думи |
| `src/pages/blog/TileReplacementGuide.tsx` | **НОВ** — 3000+ думи |
| `src/pages/blog/RoofLeakCauses.tsx` | **НОВ** — 3000+ думи |
| `src/pages/blog/RoofMaintenanceGuide.tsx` | **НОВ** — 3000+ думи |
| `src/pages/blog/BlogArticle.tsx` | Добави 4 нови slug mapping-а |
| `src/pages/BlogPage.tsx` | Добави 4 нови записа + обнови URLs |

