## Два бъга, две поправки

### Бъг 1 — „Could not find a relation between user_roles and profiles"
`StaffManagementPage.fetchMembers` използва embedded join:
```ts
supabase.from("user_roles").select("id, user_id, role, profiles(full_name, email, last_login)")
```
PostgREST търси foreign key между `user_roles` и `profiles`. Такъв няма — и двете таблици сочат към `auth.users(id)`, не една към друга. Затова гърми.

**Fix:** два отделни SELECT-а и merge в JS:
```ts
const { data: roles } = await supabase.from("user_roles").select("id, user_id, role");
const ids = [...new Set((roles ?? []).map(r => r.user_id))];
const { data: profs } = await supabase.from("profiles").select("id, full_name, email, last_login").in("id", ids);
const map = new Map(profs?.map(p => [p.id, p]));
setMembers((roles ?? []).map(r => ({ ...r, profile: map.get(r.user_id) })));
```
И в JSX сменям `m.profiles?.full_name` → `m.profile?.full_name`.

### Бъг 2 — маркетинг (и други не-admin/не-staff роли) не могат да влязат в админ панела
В `AuthContext.tsx`:
```ts
setIsStaff(data.some(r => r.role === "staff" || r.role === "admin"));
```
Всеки с роля `marketing`, `editor`, `seo`, `support` получава `isStaff = false` → `ProtectedRoute` го препраща към `/admin/login`. Затова маркетинг човекът няма достъп изобщо до CRM, аналитика, атрибуции и т.н.

**Fix:** всяка призната роля в `user_roles` дава достъп до админ панела:
```ts
setIsStaff((data ?? []).length > 0);
```
Sidebar-ът вече показва всички секции на всеки staff — само „Екип" остава под `isAdmin`. RLS на конкретните таблици контролира какво реално се вижда/променя, а бутоните за изтриване вече са скрити за не-админ.

Резултат за маркетинг ролята: достъп до Аналитика, Лийдове, Контакти, Запитвания, Оферти, Кампании, Имейл кампании, Атрибуции, Поведение, Устройства, Обаждания, Статии, Дискусии, Отзиви, Бекликове — точно каквото искаш. Изтриване, добавяне на членове и смяна на пароли остават само за админа.

### Проверка
- Playwright: логин с админ → отваряш „Управление на екипа" → таблицата показва 2 реда (админ + маркетинг), без грешка. Screenshot.
- Логин с `radnev.alexander@gmail.com` (marketing) → потвърждаване, че вижда CRM секциите и че бутоните „Изтрий" не се показват никъде.

### Извън обхват
- Не пипам RLS, edge функцията и sidebar структурата.
