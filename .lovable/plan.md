

## Подобрения в административния панел — 4 модула

Това е мащабна задача с 4 отделни модула. Ще я разделим на фази за по-чиста имплементация.

---

### Фаза 1: Bot Detection и по-чиста аналитика

**Проблем:** Сега всички page_view събития се броят еднакво — включително ботове, crawlers, спам.

**Решение:**
- Добавяне на `is_bot` boolean колона в `analytics_events` таблицата
- В `AnalyticsTracker.tsx` — детекция на ботове чрез `navigator.userAgent` (известни bot patterns: Googlebot, bingbot, Yandex, etc.) и `navigator.webdriver`
- Запис на `is_bot: true/false` при всяко събитие
- В `AnalyticsPage.tsx` — филтър бутон "Само реални потребители" (по подразбиране вкл.), който изключва bot записите от всички статистики
- Добавяне на малък KPI "Ботове" показващ колко бот заявки има за периода

**DB миграция:** `ALTER TABLE analytics_events ADD COLUMN is_bot boolean DEFAULT false;`

---

### Фаза 2: Проследяване на реализации (Inquiry ↔ Traffic Source)

**Проблем:** Няма връзка между изпратено запитване и откъде е дошъл потребителят.

**Решение:**
- Добавяне на `session_id` и `referrer_source` колони в `inquiries` таблицата
- В `MultiStepInquiryForm.tsx` — при submit, запис на `session_id` (от analytics) и `referrer_source` (от първия page_view на сесията) в запитването
- В `AnalyticsPage.tsx` — нова секция "Конверсии по източник": таблица показваща колко запитвания идват от Organic / Social / Direct / Email / Referral
- В `InquiryDetailPage.tsx` — показване на източника на трафик за всяко запитване

**DB миграция:** `ALTER TABLE inquiries ADD COLUMN session_id text, ADD COLUMN referrer_source text;`

---

### Фаза 3: Email маркетинг — сегментиране от клиентска база

**Проблем:** Email кампаниите нямат интелигентно сегментиране, базирано на реални данни от запитвания.

**Решение:**
- В `EmailCampaignEditorPage.tsx` — разширяване на segment dropdown с опции:
  - "Всички с email consent"
  - "Изпратили запитване за оферта" (status = quote_sent | accepted)
  - "Нови клиенти (последните 30 дни)"
  - "По тип услуга" (repair, waterproofing, etc.)
- Динамично показване на броя получатели при избор на сегмент
- Синхронизацията вече съществува — всички inquiry данни вече са в базата

---

### Фаза 4: CRM — Телефонен дневник и история на клиента

**Проблем:** Няма възможност за логване на телефонни обаждания и няма обединен клиентски профил.

**Решение:**

**Нова таблица `call_log`:**
```
id, client_name, client_phone, client_email (nullable),
inquiry_id (nullable FK), call_direction (inbound/outbound),
call_date, duration_minutes, notes, created_by, created_at
```

**Нова страница `CallLogPage.tsx`:**
- Таблица с всички логнати обаждания (сортирани по дата)
- Бутон "Добави обаждане" — модал с: име, телефон, посока, бележки, връзка с inquiry (опционална)
- Търсене по телефон/име
- Експорт CSV

**Обновяване на `InquiryDetailPage.tsx`:**
- Нов таб "История" показващ хронология: inquiry създаден → статус промени → свързани обаждания → изпратени оферти
- Показване на всички call_log записи за този телефонен номер

**Навигация:** Добавяне на "Обаждания" линк в sidebar-а на AdminDashboardPage.

**DB миграция:**
```sql
CREATE TABLE call_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name text NOT NULL,
  client_phone text NOT NULL,
  client_email text,
  inquiry_id uuid REFERENCES inquiries(id),
  call_direction text NOT NULL DEFAULT 'inbound',
  call_date timestamptz NOT NULL DEFAULT now(),
  duration_minutes integer,
  notes text,
  created_by uuid NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE call_log ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admin/staff can manage call_log" ON call_log
  FOR ALL TO authenticated USING (is_admin_or_staff(auth.uid()))
  WITH CHECK (is_admin_or_staff(auth.uid()));
```

---

### Обобщение на промените по файлове

| Файл | Промяна |
|------|---------|
| **DB миграция** | Нови колони в `analytics_events` и `inquiries`, нова таблица `call_log` |
| `src/lib/analytics.ts` | Добавяне на `isBot()` функция |
| `src/components/AnalyticsTracker.tsx` | Запис на `is_bot` флаг |
| `src/pages/admin/AnalyticsPage.tsx` | Bot филтър, секция "Конверсии по източник" |
| `src/components/MultiStepInquiryForm.tsx` | Запис на `session_id` и `referrer_source` при submit |
| `src/pages/admin/InquiryDetailPage.tsx` | Показване на traffic source + история с обаждания |
| `src/pages/admin/EmailCampaignEditorPage.tsx` | Разширено сегментиране |
| `src/pages/admin/CallLogPage.tsx` | **Нов** — логване и преглед на обаждания |
| `src/pages/admin/AdminDashboardPage.tsx` | Нов навигационен линк "Обаждания" |
| `src/App.tsx` | Нов route за CallLogPage |

### Ред на имплементация
Фаза 1 → 2 → 3 → 4 (всяка надгражда предишната)

