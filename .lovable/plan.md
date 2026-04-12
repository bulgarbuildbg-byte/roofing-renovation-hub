

## Смяна на снимките в BeforeAfterGallery (Преди/След) на главната страница

Секцията „Нашите завършени проекти" (CompletedProjects) вече използва новите 7 снимки. Но секцията „Преди и След" (BeforeAfterGallery) все още използва старите portfolio снимки като "след" изображения.

### Промяна

**Файл:** `src/components/BeforeAfterGallery.tsx`

Замяна на 3-те "after" снимки с нови от портфолиото:

| Слайд | Стара "after" снимка | Нова "after" снимка | Локация |
|---|---|---|---|
| 1 — Реконструкция с керемиди | `portfolio/residential-tile-roof.jpg` | `portfolio/asparuhovo-varna.jpeg` | кв. Аспарухово, Варна |
| 2 — Обновяване на покрив | `portfolio/villa-roof.jpg` | `portfolio/trakata-varna.jpg` | м-т Траката, Варна |
| 3 — Хидроизолация | `portfolio/apartment-building.jpg` | `portfolio/makedonia-25-varna.jpeg` | ул. Македония, Варна |

Ще се обновят и `location` полетата в масива `transformations`, за да съответстват на реалните локации.

"Before" снимките (`before-after-1.jpg`, `process/old-roof-removal.jpg`, `process/roof-leak-damage.jpg`) остават без промяна.

