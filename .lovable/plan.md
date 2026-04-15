

## План: Модерен "от бъдещето" редизайн на админ панела + нови функционалности

### Визуална концепция

Тъмен (dark mode) админ панел с glass-morphism ефекти, неонови акценти, smooth анимации и gradient карти — стил вдъхновен от модерни SaaS dashboard-и (Linear, Vercel, Raycast).

### 1. Нов dark-themed sidebar с glass ефект

**Файл:** `AdminDashboardPage.tsx`

- Тъмен sidebar с `backdrop-blur` и subtle gradient border
- Animated hover effects с glow на иконките
- Notification badges на Запитвания и Обаждания (live count от DB)
- Collapse/expand с smooth transition
- User avatar + role badge в долната секция
- Pulse dot на нови/непрочетени items

### 2. Welcome dashboard (нова начална страница `/admin/analytics`)

**Файл:** `AnalyticsPage.tsx` — пълен redesign

- **Hero stats row** — 4 glassmorphism KPI карти с animated counters и sparkline mini-графики
- **Gradient background** на заглавието с particle/mesh ефект
- **Live activity feed** — последни 10 действия (ново запитване, обаждане, нова оферта) в реално време
- **Revenue pipeline** — визуална Kanban-style фуния с drag-feel анимации
- **Heatmap** на трафик по часове (7-дневен grid)
- **AI insights panel** — автоматични съвети на база данните ("Трафикът от Google нарасна с 23% тази седмица")

### 3. Нови липсващи модули

| Модул | Описание |
|---|---|
| **Notification center** | Bell icon в header-а, dropdown с последни действия, mark as read |
| **Quick actions bar** | Command palette (Ctrl+K) за бърз достъп до всяка секция |
| **Activity timeline** | На dashboard-а — хронологичен feed на всички CRM действия |
| **Task/To-do system** | Вътрешни задачи за екипа (нова таблица `tasks`) |
| **Revenue tracker** | Pipeline от оферти → договори → плащания с визуална фуния |

### 4. Redesign на всички list pages

**Файлове:** `InquiryListPage.tsx`, `QuoteListPage.tsx`, `CallLogPage.tsx`, `ContactDatabasePage.tsx`

- Заменяне на plain `<Table>` с card-based grid layout + list toggle
- Animated status pills с gradient backgrounds
- Hover preview cards (quick peek без навигация)
- Bulk actions toolbar (multi-select)
- Skeleton loading states вместо spinner

### 5. Подобрен Login page

**Файл:** `AdminLoginPage.tsx`

- Animated gradient background
- Glassmorphism login card
- Typing animation на заглавието

### 6. Global design tokens за админа

**Файл:** `src/index.css`

- Добави admin-specific CSS custom properties за dark glass theme
- Нови utility класове за glow, glass, gradient-border ефекти

### 7. Database — нова таблица `admin_tasks`

Миграция за вътрешни задачи на екипа:

```sql
CREATE TABLE admin_tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'todo', -- todo, in_progress, done
  priority TEXT NOT NULL DEFAULT 'medium', -- low, medium, high, urgent
  assigned_to UUID REFERENCES auth.users(id),
  due_date DATE,
  created_by UUID NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

С RLS политики за admin/staff достъп.

### Засегнати файлове

| Файл | Промяна |
|---|---|
| `src/index.css` | +admin dark theme CSS tokens |
| `src/pages/admin/AdminDashboardPage.tsx` | Пълен redesign — dark glass sidebar + notification badges |
| `src/pages/admin/AnalyticsPage.tsx` | Пълен redesign — futuristic dashboard с live feed |
| `src/pages/admin/AdminLoginPage.tsx` | Animated gradient + glass card |
| `src/pages/admin/InquiryListPage.tsx` | Card-based redesign |
| `src/pages/admin/QuoteListPage.tsx` | Card-based redesign |
| `src/pages/admin/InquiryDetailPage.tsx` | Glass theme + timeline |
| DB migration | Нова таблица `admin_tasks` |

Поради обема на промените, ще направя на 2-3 стъпки: първо sidebar + dashboard + login redesign, после list pages и tasks модула.

