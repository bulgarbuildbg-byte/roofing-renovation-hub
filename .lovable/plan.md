
## Цел
1. Само администраторът да може да изтрива записи от целия админ панел.
2. Само администраторът да добавя нови членове на екипа и да сменя пароли.
3. Всички други роли (маркетинг, SEO, поддръжка, редактор, работник) виждат всичко в разрешените им секции, но нямат никакви бутони за изтриване или управление на пароли.
4. Да оправим грешката „Edge Function", която в момента блокира добавянето на нов член.

## Какво ще направя

### 1. Централен gate за админ права (frontend)
- Използвам вече наличния `isAdmin` от `useAuth()` (в `src/contexts/AuthContext.tsx`).
- Всеки бутон „Изтрий" / „Delete" в админ панела ще се рендерира само ако `isAdmin === true`.
- Немe-администраторите ще виждат данните в read-only вид (без бутоните).

### 2. Списък със страници, в които добавям admin-only Delete
Ще мина през всички админ списъци и ще скрия изтриването за не-админи:
- `InquiryListPage` + `InquiryDetailPage` (запитвания)
- `QuoteListPage` + `QuoteEditorPage` (оферти)
- `ContractsListPage` + `ContractEditorPage` (договори)
- `SitesListPage` + `SiteDetailPage` (обекти)
- `ProjectsManagementPage` (проекти/галерия)
- `CallLogPage` (обаждания)
- `LeadDatabasePage` + `ContactDatabasePage` (лийдове/контакти)
- `ArticleListPage` (блог статии)
- `CommentsModPage` (коментари)
- `CampaignListPage` (кампании)
- `EmailCampaignListPage` (имейл кампании)
- `TestimonialsManagementPage` (отзиви)
- `BacklinksPage` (бекликове)
- `StaffManagementPage` (екип — вече е admin-only чрез `ProtectedRoute requireAdmin`, ще потвърдя).

Където някоя страница все още няма бутон за изтриване (напр. запитване), ще добавя такъв — но **само видим за админа** — с потвърждение („Сигурни ли сте?"), soft feedback чрез toast и почистване на свързани записи (напр. при изтриване на inquiry → изтриване на свързани `inquiry_files`, `quotes`, `contracts` чрез cascade или в две стъпки).

### 3. RLS защита на ниво база данни (не разчитаме само на UI)
Ще добавя миграция, която за всяка от изброените таблици задава DELETE политика **само за admin** (чрез `public.has_role(auth.uid(), 'admin')`). Така дори ако някой не-админ извика Delete директно през API, базата ще откаже.

Таблици за които ще ограничим DELETE до admin:
`inquiries, inquiry_files, quotes, contracts, contract_files, project_sites, project_documents, project_timeline, projects, call_log, articles, comments, campaigns, email_campaigns, testimonials, backlinks, analytics_events, article_views, admin_tasks, user_roles`.

Съществуващите SELECT/INSERT/UPDATE политики няма да се пипат — маркетинг, SEO и т.н. продължават да четат и редактират каквото могат сега.

### 4. Поправка на „Edge Function" грешката при добавяне на член на екипа

От тестовете и логовете:
- Edge функцията `create-team-member` **не получава заявка** (няма логове след последния опит), значи проблемът е между клиента и функцията, не в самата логика.
- Вероятни причини: (а) фронтендът праща `Authorization` header, който функцията изисква, но при `verify_jwt = false` Supabase invoke понякога не добавя токена коректно; (б) CORS preflight пада; (в) функцията не е още преразгърната след последното редактиране.

Ще направя:
- В `supabase/functions/create-team-member/index.ts`: (1) добавям изричен CORS preflight отговор с `Access-Control-Max-Age`; (2) ако липсва `Authorization`, връщам ясно съобщение; (3) допълнителен `console.log` в самото начало на handler-а, за да сме сигурни, че заявката влиза.
- В `StaffManagementPage.handleAdd`: (1) вземам активната сесия с `supabase.auth.getSession()` и подавам `access_token` изрично като `headers: { Authorization: 'Bearer ...' }` към `functions.invoke`; (2) показвам целия HTTP статус + response body в toast-а при грешка, за да видим точния Edge отговор при следващия опит.
- Ако след това пак виси, ще направя browser test (Playwright) с реален админ логин и ще уловим network отговора от `/functions/v1/create-team-member`.

### 5. Проверка след промените
- Build + бърз Playwright тест: логин като админ → добавяне на нов член → успех.
- Логин като маркетинг/друга роля → потвърждаване, че бутоните „Изтрий" и „Управление на екипа" не се виждат никъде.

## Технически детайли (кратко)
- Frontend gate: `{isAdmin && <Button …>Изтрий</Button>}` навсякъде.
- RLS шаблон:
  ```sql
  DROP POLICY IF EXISTS "<old delete policy>" ON public.<table>;
  CREATE POLICY "Only admin can delete <table>"
    ON public.<table> FOR DELETE TO authenticated
    USING (public.has_role(auth.uid(), 'admin'));
  ```
- Edge функцията остава с `verify_jwt = false` (както е в `config.toml`); валидацията на потребителя се прави в кода чрез `getUser()` върху подадения Bearer token.

## Извън обхват
- Не пипам съществуващите SELECT/INSERT/UPDATE политики.
- Не променям кой има достъп до кои страници (това вече е настроено през `ProtectedRoute`).
- Не сменям съществуващи роли на потребителите.
