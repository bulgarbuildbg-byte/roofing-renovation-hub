## Проблем

При добавяне на нов член с роля „Маркетинг" от `/admin/staff` UI показва общата грешка „Edge Function returned a non-2xx status code". В логовете на `create-team-member` виждам само boot записи — няма log при заявката, значи функцията чупи преди да върне ясен error, или клиентът получава грешка, която не се показва пълна на потребителя.

Ролята `marketing` съществува в enum-а (`20260222163754_...sql`), така че причината не е невалидна стойност за enum.

## План

### 1. Добавяне на подробно логване в edge функцията
Файл: `supabase/functions/create-team-member/index.ts`
- Log при вход: получени полета (без парола), caller id.
- Log преди `createUser`, `insert user_roles`.
- Всеки error branch да логва `console.error` с реалното съобщение от Supabase (createUser често връща „User already registered" или „Password should be at least 6 characters" — сега това може да идва като HTTP 400 без да се вижда ясно на UI-я).
- Гарантирано връщане на JSON `{ error: "..." }` с точен текст.

### 2. Показване на реалната грешка в UI
Файл: `src/pages/admin/StaffManagementPage.tsx`
- При `supabase.functions.invoke`, ако response body съдържа `error`, да се показва целият текст в toast (сега `data?.error` може да е `undefined` когато статусът е non-2xx, защото `invoke` не парсва body при грешка). Ще прочета response през `error.context.response.json()` fallback.

### 3. Проверка на профилния trigger
`handle_new_user` вмъква в `profiles` при създаване на потребител. Ще проверя дали не се чупи (напр. NOT NULL нарушение), защото това би направило `createUser` да върне грешка и досегашното съобщение е неясно. Ако е нужно — правя `full_name` толерантно към празни стойности (вече е `COALESCE ... ''`).

### 4. Тест и потвърждение
След deploy на функцията:
- Пускам тестов POST през `curl_edge_functions` с валидна admin сесия и `role: "marketing"`.
- Ако грешката е „email already registered" (най-често при повторни опити с един и същ email), ще добавя специална обработка + ясно съобщение „Този имейл вече е регистриран".
- Проверявам, че новосъздаденият маркетинг потребител вижда очакваните секции (маркетинг/лидове/анализи) през съществуващите role guards.

### 5. Без промяна в обхвата
- Не пипам друга функционалност, конверсии, CRM таблици или трекинг.
- Ролята „marketing" вече дава достъп според `StaffManagementPage` описанието; ако при теста установя, че `ProtectedRoute`/sidebar филтрира маркетинг излишно строго, ще нанеса минимална корекция само за да види Analytics, Leads, Campaigns, Email marketing.

## Резултат
- Ясно error съобщение вместо генерично „Edge Function".
- Успешно добавяне на маркетинг потребител с достъп до статистики и лидове.