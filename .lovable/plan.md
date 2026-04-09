

## Пренареждане и оптимизация на 6 service pages

### Обхват

6 файла (НЕ се пипат ServicesPage и MaintenancePage):

| Файл | Линии |
|---|---|
| `src/pages/services/RoofRepairPage.tsx` | 414 |
| `src/pages/services/RoofLeakRepairPage.tsx` | 441 |
| `src/pages/services/WaterproofingPage.tsx` | 637 |
| `src/pages/services/TileReplacementPage.tsx` | 683 |
| `src/pages/services/FlatRoofPage.tsx` | 744 |
| `src/pages/services/MetalRoofPage.tsx` | 683 |

---

### Нова единна структура за всяка страница

Всяка страница ще следва точно тази последователност:

1. **HERO** — H1 + подзаглавие + 2 CTA бутона ("Заяви безплатен оглед" + "Обади се сега") + 4 trust checkmarks (Безплатен оглед, Работа по договор, Гаранция за изпълнение, Реални снимки от обекти). Breadcrumb навигация. Стил: gradient overlay, висококонтрастни бутони.

2. **PROBLEM** — 3-6 проблема със заглавие + описание + иконки (AlertTriangle). Заглавие: „Най-честите проблеми при [услугата]". Използват се съществуващите `commonProblems`/`signs`/`whyWaterproofing` данни, пренаредени визуално.

3. **CONSEQUENCES** (НОВА секция) — „Какво се случва, ако проблемът се отложи" + 4 реални последствия (по-големи щети, по-високи разходи, риск за конструкцията, влага и мухъл). Професионален тон, без паника.

4. **SOLUTION** — „Как решаваме проблема" + 4 конкретни стъпки (оглед, диагностика, избор на решение, качествени материали). Кратка, конкретна секция с CheckCircle иконки.

5. **PROCESS** — „Как работим" — 4 стъпки: Свързване → Оглед → Оферта → Изпълнение. Компактен формат с номерирани стъпки и иконки (Phone, Search, ClipboardCheck, Hammer). Без снимки (снимковият процес остава по-долу в Service Details).

6. **CTA (среден)** — „Заяви безплатен оглед" + „Вземи оферта". Gradient фон, 2 бутона.

7. **CALCULATOR** — Import на `PriceCalculator` компонент. Заглавие: „Изчислете ориентировъчна цена". Под калкулатора CTA: „Получи точна оферта".

8. **SERVICE DETAILS** — Обединява съществуващите секции: видове услуги/материали, списък услуги, ценови таблици, и подробния 6-стъпков процес със снимки. SEO текстът (intro) се премества тук. Всичко съществуващо съдържание остава, но слиза надолу.

9. **TRUST** — „Защо да изберете нас" — преизползва съществуващите `benefits` данни + добавя: опит 15+ години, работа по договор, реални обекти, КСБ членство (където е приложимо).

10. **PROJECTS** — Before/After секция с реални снимки. Използва съществуващите hero/process изображения като placeholder (ще се сменят по-късно).

11. **FINAL CTA** — Силен финален блок: телефон, 2 CTA бутона, линк към контакт формата.

12. **FAQ + LearnMore + RelatedServices** — остават в края.

---

### Какво НЕ се променя

- Helmet/SEO metadata — остава
- Schema.org JSON-LD — остава
- Breadcrumb schema — остава
- Всички i18n translations — остават (t() calls)
- Снимки — остават (ще се сменят по-късно чрез CSV mapping)
- Service areas (район на обслужване) — остава, премества се в Service Details

### Какво се добавя ново

- **Consequences секция** — нов масив `consequences` за всяка страница (4 елемента)
- **Solution секция** — нов масив `solutions` за всяка страница (4 елемента)
- **Компактен 4-стъпков процес** — нов, преди калкулатора
- **Trust checkmarks в hero** — 4 бадджа
- **PriceCalculator import** — във всяка страница
- **Среден CTA блок** — между процес и калкулатор

### Технически детайли

- Import `PriceCalculator from "@/components/PriceCalculator"` във всяка страница
- Trust checkmarks: `flex flex-wrap gap-3` с `CheckCircle` + текст, стил `text-primary-foreground/90`
- Consequences: червеникав/предупредителен стил — `bg-red-50 border-red-200` с `AlertTriangle` иконки
- Solution: зеленикав стил — `bg-green-50 border-green-200` с `CheckCircle`
- Среден CTA: `bg-gradient-to-r from-primary to-primary/80` с бели бутони

