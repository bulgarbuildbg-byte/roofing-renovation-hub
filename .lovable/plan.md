

## Цялостно подобрение на админ панела: дизайн, проекти, отзиви, обаждания и имейл база

### Обобщение

Модернизация на админ панела с по-добър визуален дизайн, seed-ване на проектите в DB, автоматично логване на телефони/имейли от запитвания, и централизирана контактна база.

### 1. Seed на проектите в базата данни

Проектите от `ProjectsPage.tsx` (7 hardcoded проекта) все още не са в DB (0 записа). Ще се seed-нат чрез insert tool, за да се показват веднага в админа и на сайта.

### 2. Автоматично логване на телефони при ново запитване

При всяко ново запитване (от `MultiStepInquiryForm`, `PriceCalculator`, `InspectionPage`) телефонният номер автоматично ще се записва в `call_log` с `call_direction: 'inbound'` и бележка „Автоматично от запитване".

**Файлове:** `src/components/MultiStepInquiryForm.tsx`, `src/components/PriceCalculator.tsx`, `src/pages/InspectionPage.tsx`

### 3. Централизирана имейл база (нова секция „Контакти")

Нова секция в админ панела — „Контакти" (или „Имейл база") — която агрегира всички уникални имейли от `inquiries` таблицата. Показва: име, имейл, телефон, дата, статус на съгласие (email_consent). С бутон за CSV експорт за имейл маркетинг.

**Нов файл:** `src/pages/admin/ContactDatabasePage.tsx`
**Промени:** `src/pages/admin/AdminDashboardPage.tsx` (нов nav item), `src/App.tsx` (нов route)

### 4. Модерен дизайн на админ панела

Визуално подобрение на ProjectsManagementPage и TestimonialsManagementPage:
- Премахване на `min-h-screen bg-secondary` wrapper-а (вече е вътре в layout-а на AdminDashboard)
- Добавяне на stat карти в горната част (общо проекти, активни, скрити)
- По-модерни card-ове с gradient accent, hover ефекти, по-добра типография
- Drag-and-drop подредба (визуално с бутони нагоре/надолу)

**Файлове:** `src/pages/admin/ProjectsManagementPage.tsx`, `src/pages/admin/TestimonialsManagementPage.tsx`

### 5. Подобрения на аналитиките

- По-модерни KPI карти с gradient backgrounds
- По-ясни labels и tooltips на графиките
- Подобрен responsive layout

**Файл:** `src/pages/admin/AnalyticsPage.tsx`

### 6. Проверка на Call Log функционалността

CallLogPage работи — но uses `as any` cast за `call_log` таблицата (TypeScript workaround). Ще се провери и подобри визуално.

**Файл:** `src/pages/admin/CallLogPage.tsx`

---

### Общо засегнати файлове: ~10

| Файл | Промяна |
|---|---|
| DB insert | Seed 7 проекта в `projects` таблица |
| `src/components/MultiStepInquiryForm.tsx` | Auto-log phone to call_log after inquiry |
| `src/components/PriceCalculator.tsx` | Same |
| `src/pages/InspectionPage.tsx` | Same |
| `src/pages/admin/ContactDatabasePage.tsx` | Нова страница — агрегирани контакти |
| `src/pages/admin/AdminDashboardPage.tsx` | Нов nav item + модерен sidebar |
| `src/App.tsx` | Нов route /admin/contacts |
| `src/pages/admin/ProjectsManagementPage.tsx` | Визуално подобрение |
| `src/pages/admin/TestimonialsManagementPage.tsx` | Визуално подобрение |
| `src/pages/admin/AnalyticsPage.tsx` | Визуално подобрение |
| `src/pages/admin/CallLogPage.tsx` | Визуално подобрение |

