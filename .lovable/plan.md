

## PRO Dashboard — Разширение на Analytics с бизнес инсайти

### Обхват

Заявката е мащабна. Разделям я на **реалистични фази**, като Фаза 1 покрива най-високата бизнес стойност.

---

### Фаза 1 (тази имплементация)

**Файл: `src/pages/admin/AnalyticsPage.tsx`** — пълно пренаписване

**1. Разширени KPI карти (8 карти вместо 5)**

| KPI | Източник |
|---|---|
| Посетители (днес/седмица/месец) | analytics_events page_view |
| Лидове | inquiries count |
| Conversion rate % | leads / visitors |
| Обаждания | button_click call_button |
| Калкулатор стартирания | button_click calculator_button |
| % завършване калкулатор | calculator_complete / calculator_button |
| Ср. време на сайта | session_duration |
| Нови запитвания (днес) | inquiries today |

**2. Funnel визуализация (НОВ компонент)**
- Хоризонтален funnel: Посещения → Калкулатор → Форма → Обаждане
- Всяка стъпка показва абсолютен брой + % drop-off спрямо предишната
- Визуален bar с намаляваща ширина
- Recharts AreaChart или custom CSS bars

**3. Калкулатор аналитика (НОВА секция)**
- Започнали vs завършили калкулатора
- Completion rate %
- Изисква нов analytics event `calculator_complete` да се emit-ва от PriceCalculator при показване на резултат
- Най-често избран тип покрив, проблем, материал — изисква нови event properties

**4. Call tracking секция**
- Брой кликове на телефон по период
- От коя страница (page_path от call_button events)
- От кой източник (cross-reference session_id → referrer_source)

**5. Traffic source с лидове**
- Разширение на текущата секция: добавя колона "Лидове" до "Сесии"
- Google Ads, Facebook, SEO, Direct — с брой лидове от всеки

**6. Alert система (визуални банери)**
- Проверка: ако conversion rate < 1% → червен банер
- Ако 0 лидове за последните 48ч → предупреждение
- Ако calculator completion < 30% → жълт банер
- Показва се в горната част на dashboard

**7. Tabs навигация**
- Разделяне на dashboard в tabs: Общо | Funnel | Калкулатор | Трафик | Обаждания
- Или vertical scroll с anchor sections

---

### Фаза 1 — допълнителни файлове

| Файл | Промяна |
|---|---|
| `src/pages/admin/AnalyticsPage.tsx` | Пълно пренаписване — tabs, funnel, calculator analytics, alerts, extended KPIs |
| `src/components/PriceCalculator.tsx` | Добавяне на analytics events: `calculator_start`, `calculator_complete`, `calculator_step` с данни за избор |
| `src/lib/analytics.ts` | Нова функция `trackCalculatorEvent(step, selections)` |

---

### Какво НЕ влиза във Фаза 1 (бъдещи подобрения)

- **ROI / цена на lead** — изисква ръчно въвеждане на разходи по канал (нова таблица)
- **Scroll %** — изисква нов scroll tracking в AnalyticsTracker
- **Кликове по бутони** — детайлен breakdown (частично вече се треква)
- **Leads таблица в dashboard** — вече съществува в LeadDatabasePage, няма да се дублира
- **Статус Спечелен/Загубен** — изисква schema migration за нови enum стойности

---

### Технически детайли

**Нови analytics events от PriceCalculator:**
```
calculator_start → при първи избор на стъпка 1
calculator_step → при всяка стъпка (event_name: "step_2", extras: { selection: "скатен" })
calculator_complete → при показване на резултат
```

**Funnel data computation:**
```
visitors = unique sessions with page_view
calculator_starts = events where event_name = "calculator_start"
calculator_completes = events where event_name = "calculator_complete"  
form_submits = inquiries count
calls = events where event_name = "call_button"
```

**Alert logic:** Pure frontend computation — no new tables needed. Thresholds hardcoded initially.

