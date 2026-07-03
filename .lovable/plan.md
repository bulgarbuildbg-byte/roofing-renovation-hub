## Какво намерих

Проверих директно базата (със сервисни права):

**`user_roles` таблицата съдържа и двамата:**
- `zhekoviliya@gmail.com` → `admin` ✅
- `radnev.alexander@gmail.com` → `marketing` ✅ (регистрацията му **е минала успешно** преди — затова сега при нов опит идва „email already registered")

**RLS политики на `user_roles`:**
```
SELECT → само has_role(auth.uid(), 'admin')
```
Тоест SELECT работи само ако `auth.uid()` вече е наличен в момента на заявката.

**Проблемът в `StaffManagementPage.tsx`:**
```ts
useEffect(() => { fetchMembers(); }, []);
```
`fetchMembers` се пуска веднага при mount, **преди `AuthContext` да е възстановил сесията**. В този момент `auth.uid()` е `null`, `has_role(...)` връща `false`, RLS блокира SELECT и получаваме празен масив → таблицата „Няма добавени членове", въпреки че данните са там.

Затова:
- Не се вижда нито Alexander, нито ти самият като админ.
- Данните обаче са коректно записани и „email already registered" при повторен опит е правилно.

## План за поправка

### 1. Изчакай auth сесията, преди да четеш `user_roles`
В `src/pages/admin/StaffManagementPage.tsx`:
- Взимам `user` и `loading` от `useAuth()`.
- Стартовият `useEffect` вече зависи от `user?.id`:
  ```ts
  useEffect(() => {
    if (loading) return;
    if (!user) { setLoading(false); return; }
    fetchMembers();
  }, [user?.id, loading]);
  ```
- Локалният `loading` state се преименува, за да не се бърка с auth loading (напр. `fetching`).
- След успешен `handleAdd` — извиквам `fetchMembers()` (вече ще работи, защото сесията е активна).

### 2. Fallback политика: всеки авторизиран потребител да вижда собствената си роля
Малка миграция, която добавя допълнителна `SELECT` политика на `user_roles`:
```sql
CREATE POLICY "Users can view own role"
  ON public.user_roles FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);
```
Това не пипа admin политиките (те продължават да виждат всичко) и е нужно, защото `AuthContext.checkRoles()` също чете `user_roles` за текущия user — ако някога сесията се възстанови по-бавно, admin-ът може да остане маркиран като не-admin и да не вижда бутоните.

### 3. Обяснение на „already registered"
Не е бъг — Alexander Radnev **вече е регистриран** в системата (auth user + `user_roles.role='marketing'`). След поправка №1 той ще се появи веднага в таблицата „Управление на екипа". Ако искаш да го премахнеш и регистрираш наново, ще го изтриеш от списъка (бутонът с кошчето) и после ще го добавиш пак — но иначе просто вече е там.

### 4. Проверка
- Playwright: логин като админ → отваряне на „Управление на екипа" → таблицата показва 2 реда (админ + маркетинг), с имена/имейли/роли.
- Screenshot за потвърждение.

## Извън обхват
- Не пипам edge функцията `create-team-member` — тя работи правилно (логът показва точния 422 от Supabase Auth: email вече е регистриран).
- Не променям други RLS политики.
