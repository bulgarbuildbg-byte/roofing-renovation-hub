

## Нова страница "Заявете Безплатен Оглед" — Landing Page

### Какво ще се създаде

Отделна страница за маркетинг на безплатния оглед с визуален избор на тип покрив и пълна контактна информация. Съществуващата страница "Контакти" остава непроменена.

### Промени по файлове

**1. `src/i18n/routes.ts`**
- Добавяне на нов `RouteKey`: `inspection`
- Локализирани slug-ове: `bg: 'безплатен-оглед'`, `en: 'free-inspection'`, `de: 'kostenlose-inspektion'`, etc.

**2. `src/pages/InspectionPage.tsx`** (НОВ)
- Hero секция с H1 "Заявете Безплатен Оглед на Покрива"
- Интерактивна форма с:
  - **Стъпка 1**: Визуален избор на тип покрив — две карти с икони (Flat Roof / Pitched Roof), кликваеми с highlight при избор
  - **Стъпка 2**: Контактни данни (име, телефон, email, адрес на обекта, бележки)
  - Submit → запис в `inquiries` таблицата с `service_type` базиран на избора
- Секция с контактна информация (телефон, email, адрес)
- Google Maps iframe (същия като в ContactPage)
- Работно време
- Trust indicators (години опит, гаранция)
- Schema.org structured data

**3. `src/components/LocalizedPageRouter.tsx`**
- Добавяне на `inspection: InspectionPage` в `PAGE_MAP`

**4. `src/i18n/locales/bg.ts`** — нови ключове в `inspection` секция (заглавие, подзаглавие, labels за формата, типове покрив)

**5. `src/i18n/locales/en.ts`, `de.ts`, `ru.ts`, etc.** — преводи на inspection ключовете за всички 10 езика

**6. `src/App.tsx`** — добавяне на backward-compat redirect: `/безплатен-оглед` → `/bg/безплатен-оглед`

### Детайли по формата

Визуалният избор ще използва две стилизирани карти:
- **Плосък покрив**: икона от Lucide (`Minus` или custom SVG), текст "Плосък покрив"
- **Покрив с наклон**: икона (`Triangle` или custom SVG), текст "Покрив с наклон"

При клик картата получава border highlight. След избор се показват полетата за контакт. Формата записва в `inquiries` с `roof_type` в `details` полето и `source: 'inspection_landing'`.

