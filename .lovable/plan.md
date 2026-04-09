

## Вградена форма за запитване в калкулатора

### Какво се променя

Един файл: `src/components/PriceCalculator.tsx`. След показване на резултата, бутоните „Заявете безплатен оглед" и „Обадете се сега" се заменят с inline форма вместо redirect.

---

### Промени

**Нов state**: `showForm` (boolean), `formData` (name, phone, address, city, description), `files` (File[]), `submitting`, `submitted`.

**Бутон „Заявете безплатен оглед"** → вместо `scrollToContact()` → `setShowForm(true)`.
**Бутон „Обадете се сега"** → остава `tel:` линк (без промяна).

**Форма (показва се в result стъпката когато showForm=true)**:
- Име (задължително)
- Телефон (задължително)
- Адрес / Град
- Кратко описание (опционално)
- Качване на файлове/снимки (drag & drop или бутон)
- Бутон „Изпрати запитване"

**Автоматично прикачени данни от калкулатора** (скрити, не се показват на потребителя):
- roofType, material, problem, scope, roofSize, access
- Изчислената ориентировъчна цена (min-max)

**Submit логика** (преизползва съществуващата от MultiStepInquiryForm):
1. Insert в `inquiries` таблицата с всички данни + `session_id` + `referrer_source`
2. Upload файлове в `inquiry-attachments` bucket
3. Insert в `inquiry_files` таблицата
4. Показване на success state с CheckCircle + телефон

**Mapping на калкулатор данни към inquiries колони**:
- problem → `service_type` (map: leak→leak_repair, repair→repair, new_roof→new_construction, etc.)
- roofSize → `area_sqm`
- material → `preferred_material` (map to existing enum values)
- scope/access/roofType → `description` (append като текст)

**UI**: Формата се показва като разширена секция под ценовия резултат (не modal), с плавна анимация. Ценовият диапазон остава видим отгоре.

---

### Файлове

| Файл | Промяна |
|---|---|
| `src/components/PriceCalculator.tsx` | Добавяне на inline форма в result стъпката, submit логика към Supabase, file upload |

