

## Обновяване на формата в калкулатора — modal popup + нови полета

### Какво се променя

Един файл: `src/components/PriceCalculator.tsx`. Формата за запитване се извежда в **Dialog (modal popup)** вместо inline секция. Добавят се нови полета и подобрения.

---

### Промени

**1. Modal вместо inline форма**
- Import `Dialog, DialogContent, DialogHeader, DialogTitle` от `@/components/ui/dialog`
- При натискане на „Заявете безплатен оглед" → отваря modal (`setShowForm(true)`)
- Desktop и mobile — еднакво поведение (popup)
- Без скрол, без redirect

**2. Нови полета във формата**

| Поле | Задължително | Тип |
|---|---|---|
| Име | Да | text |
| Фамилия | Да | text (НОВО) |
| Телефон | Да | tel |
| Имейл | Да | email (НОВО) |
| Адрес / град / улица | Да | text (placeholder: „Напр. Варна, кв. Левски, ул. …") |
| Опишете проблема | Не | textarea |
| Снимки/файлове | Не | file upload |

**formData state** се обновява: `{ firstName, lastName, phone, email, address, description }`

**3. File upload подобрения**
- Лимит: до 8 файла, до 250 MB общо
- `accept="image/*,.pdf,.doc,.docx,.heic"` + `capture="environment"` за камера на мобилно
- Валидация при добавяне (брой + размер)
- Drag & drop зона с текст

**4. Submit логика**
- Валидация: firstName, lastName, phone, email, address — всички задължителни
- `name` в inquiries = `${firstName} ${lastName}`
- `email` = реалният имейл (вече не fake @calculator.local)
- Всички калкулаторни данни се прикачват в `description` автоматично
- Успешно изпращане → success state в modal → затваряне

**5. CTA бутоните на result стъпката остават**
- „Заявете безплатен оглед" → отваря modal
- „Обадете се сега" → `tel:` линк (без промяна)

---

### Файлове

| Файл | Промяна |
|---|---|
| `src/components/PriceCalculator.tsx` | Форма в Dialog modal, нови полета (фамилия, имейл), file upload лимити (8 файла / 250MB), валидация |

