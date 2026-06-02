# План: Разширен CRM за продажби, договори и оборот

## 1. Нови статуси на запитванията

Към `inquiry_status` enum се добавят:

- `quote_prepared` — Оферта изготвена
- `contract_prepared` — Договор изготвен
- `contract_sent` — Договор изпратен
- `contract_signed` — Договор подписан
- `contract_rejected` — Договор отказан/неосъществен
- `project_active` — Обект активен
- `project_completed` — Обект завършен
- `invoiced` — Приключен/фактуриран

Запазваме съществуващите (`new`, `contacted`, `quote_sent`, `accepted`, `rejected`) за съвместимост със старите записи.

Във визуализацията статусите ще се групират в 3 фази с различни цветове:
- **Запитване** (синьо): new, contacted
- **Оферта** (лилаво): quote_prepared, quote_sent, accepted, rejected
- **Договор/Обект** (зелено): contract_prepared, contract_sent, contract_signed, project_active, project_completed, invoiced
- **Изгубено** (червено): contract_rejected

## 2. Разширение на таблица `contracts`

Добавяме полета:
- `contract_number` (text) — номер на договор (опционално)
- `currency` (text, default 'EUR') — EUR или BGN

(Полетата `contract_value`, `signed_date`, `service_categories`, `notes`, `contract_workflow_status` вече съществуват.)

## 3. Стойност на офертата

В таблица `quotes` вече има `total` (subtotal − discount). Това ще се използва като „Стойност на офертата" — не са нужни нови полета, само ще се показва в списъци и dashboard.

## 4. Нова таблица `contract_files`

За прикачване на договори (снимка, PDF, Word, анекс).

Полета: `contract_id`, `file_url`, `file_name`, `file_type`, `file_size`, `category` (contract, annex, scan, photo, other), `notes`, `uploaded_by`, `uploaded_at`.

Файловете се качват в съществуващия private bucket `project-documents` под префикс `contracts/{contract_id}/`.

## 5. UI промени

### `InquiryDetailPage` — секция „Договор"
Разширява се съществуващият `ContractWorkflowPanel`:
- Поле „Номер на договор"
- Поле „Валута" (EUR/BGN selector)
- Upload зона с drag&drop за договори (списък + бутон за изтриване)
- Категория за всеки файл (договор, анекс, скан, снимка, друго)
- Секцията е видима винаги когато статусът е contract_prepared / contract_sent / contract_signed

### `InquiryListPage` — нови колони/полета
- Бадж за статус с цвят според фазата (запитване/оферта/договор)
- Стойност на офертата (от `quotes.total`)
- Стойност на договора (от `contracts.contract_value` + валута)
- Дата на договор (`signed_date`)
- Източник (`referrer_source`)
- Икона за прикачен договор, ако има файлове
- Нов филтър по фаза (запитване / оферта / договор / изгубено)

### `ContractsListPage` — допълнения
- Колона „Номер на договор"
- Колона „Валута"
- Колона „Прикачени файлове" (брой)

## 6. Управленско табло `/admin/revenue` (CRM Анализи)

Преработка на съществуващата страница в пълен dashboard с табове:

### Таб „Месечно"
KPI карти за избран месец:
- Нови запитвания
- Изпратени оферти + обща потенциална стойност
- Договори изготвени / изпратени / подписани (брой)
- Обща стойност на подписаните договори
- Отказани оферти
- Конверсия запитване → оферта (%)
- Конверсия оферта → договор (%)

### Таб „Годишно"
- Общ брой запитвания, оферти, договори
- Обща потенциална стойност на офертите
- Общ оборот от договори
- Средна стойност на договор
- Най-силни и най-слаби месеци
- Топ услуги по брой договори
- Топ услуги по оборот

### Таб „Оферти vs Договори"
- Сравнителна графика: потенциална стойност (оферти) vs реализирана (договори)
- Win rate по услуга
- Списък изгубени оферти със стойност

### Филтри (важат за всички табове)
- Месец, година, статус (multi), услуга, клиент (search), стойност (range), град, източник (referrer_source)

### Графики (recharts)
- Bar: оборот по месеци (текуща година)
- Line: оферти vs договори по месеци
- Pie: оборот по категория услуга
- Bar: топ 10 услуги по брой и оборот

## 7. Бизнес логика

- При смяна на статуса на запитване на `contract_prepared`/`sent`/`signed` се проверява дали има свързан `contracts` запис; ако няма — създава се draft автоматично.
- При статус `contract_signed` се запазва автоматично `signed_date = today` ако не е попълнена.
- Стойностите за dashboard се извличат с агрегации директно от Supabase (`quotes.total`, `contracts.contract_value`, `inquiries.status`, `inquiries.created_at`, `contracts.signed_date`).
- Конвертиране BGN ↔ EUR не се прави — статистиките сумират по запис със знак за валутата (основно ще е EUR).

## Технически детайли

- Stack: React + Supabase + shadcn + recharts (както досега).
- Storage: reuse `project-documents` bucket, нов префикс `contracts/`. RLS вече е admin/staff only.
- RLS на `contract_files`: admin/staff (`is_admin_or_staff(auth.uid())`) за всички операции. GRANT за `authenticated` + `service_role`.
- Enum миграция: `ALTER TYPE inquiry_status ADD VALUE ...` за всеки нов статус.
- Types: след миграцията `src/integrations/supabase/types.ts` се регенерира автоматично.
- Локализация: етикетите на статусите — централно в `src/lib/serviceCategories.ts` (като сегашните `CONTRACT_WORKFLOW_LABELS`).

## Фази на изпълнение

**Фаза 1 — База данни и статуси**
- Миграция: нови enum стойности, нови полета в `contracts`, нова таблица `contract_files`.
- Централни константи за статуси с цветове.
- Обновен `InquiryListPage` (нови баджове, колони, филтър по фаза).

**Фаза 2 — Договори UI**
- Разширен `ContractWorkflowPanel`: номер, валута, upload на файлове, списък.
- Обновен `ContractsListPage` с новите полета.

**Фаза 3 — Управленско табло**
- Преработка на `/admin/revenue` с табове, всички KPI карти, графики и филтри.
- Линк „Продажби и договори" в admin sidebar (преименуване от „Оборот и справки").

Кажи дали да изпълня и трите фази последователно, или да спрем за преглед след всяка.
