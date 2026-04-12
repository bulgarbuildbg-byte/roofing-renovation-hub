

## Спешни поправки: снимки на проекти, аватари в админа, визуален редизайн

### Проблем 1: Липсващи снимки в проектите

Проектите в DB бяха seed-нати с празни `image_urls: []`. Снимките съществуват в `src/assets/portfolio/` но не са свързани с DB записите. Решението е двустранно:

**a) Обновяване на `image_urls` в DB** — чрез миграция, ще се попълни всеки запис с правилния URL от Vite (тъй като снимките са локални assets, не в storage). Но тъй като Vite bundler-ът хешира пътищата, по-добрият подход е:

**b) Качване на снимките в `project-images` storage bucket** и обновяване на DB записите с публичните URL-и. Алтернативно — използване на fallback подход в компонентите.

**Избран подход:** Ще добавя fallback mapping в `Gallery.tsx`, `CompletedProjects.tsx` и `ProjectsPage.tsx` — ако `image_urls` е празен, ще се използва локалната снимка от `src/assets/portfolio/` по mapping на заглавието. Също ще обновя seed данните в DB с правилни image URL-и чрез upload на снимките в storage bucket.

**Файлове:**
- Нов файл: `src/lib/projectImageMap.ts` — mapping заглавие → import path
- `src/components/Gallery.tsx` — fallback логика
- `src/components/CompletedProjects.tsx` — fallback логика  
- `src/pages/ProjectsPage.tsx` — fallback логика

### Проблем 2: Аватари на отзиви в админ панела

Testimonials в DB имат `avatar_url: null`. На сайта снимките идват от hardcoded fallback в `ReviewsPage.tsx`. В админа `AvatarImage` показва `null` src → показва fallback initials. Ще се добави визуално placeholder „Няма снимка" текст в списъка на отзивите, за да е ясно. Основната поправка е — при преглед на отзивите в админа да се покаже ясно кои имат снимка и кои нямат.

**Файл:** `src/pages/admin/TestimonialsManagementPage.tsx`

### Проблем 3: Визуален редизайн на админ панела

Текущият дизайн е функционален но базов. Ще се направят реални визуални промени:

**AdminDashboardPage.tsx (sidebar):**
- Gradient header вместо plain border
- Групиране на nav items с section headers (Основни, Маркетинг, Съдържание, Управление)
- Active state с gradient accent вместо solid primary
- По-малки, по-компактни nav items с hover анимации

**ProjectsManagementPage.tsx:**
- Hero-style header с gradient background и статистики
- Проектите показани като image cards вместо списък
- Grid layout 2-3 колони с thumbnail preview
- Hover overlay с бутони за edit/delete

**TestimonialsManagementPage.tsx:**
- Подобен gradient header
- По-модерни карти с по-добра типография
- Цветни badge-ове за статус

**AnalyticsPage.tsx:**
- Gradient KPI карти
- По-модерен layout

**Общо засегнати файлове: ~8**

| Файл | Промяна |
|---|---|
| `src/lib/projectImageMap.ts` | Нов — mapping проект → локална снимка |
| `src/components/Gallery.tsx` | Fallback за снимки от local assets |
| `src/components/CompletedProjects.tsx` | Fallback за снимки от local assets |
| `src/pages/ProjectsPage.tsx` | Fallback за снимки от local assets |
| `src/pages/admin/AdminDashboardPage.tsx` | Визуален редизайн на sidebar |
| `src/pages/admin/ProjectsManagementPage.tsx` | Image card grid + gradient header |
| `src/pages/admin/TestimonialsManagementPage.tsx` | По-модерен дизайн + avatar status |
| `src/pages/admin/AnalyticsPage.tsx` | Gradient KPI карти |

