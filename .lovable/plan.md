

## UI подобрения на "Как работим" — секция + страница

### Проблем
1. Build грешки в locale файлове (de, fi, fr, nl, no, ru, sv, ua) — файловете изглеждат коректни сега, вероятно stale cache; ще се наложи пълно пренаписване на проблемните файлове ако грешките продължат
2. CTA бутони на HowWeWorkPage — слаба видимост, бял текст върху бял фон на телефонния бутон
3. Стъпковите номера на homepage секцията — твърде малки
4. Липсват визуални индикатори (✔) под описанията
5. Иконите не са достатъчно професионални

### Промени

**1. `src/pages/HowWeWorkPage.tsx` — Бутони**
- CTA бутон "Заявете Безплатен Оглед" → `variant="default"` с `size="lg"` и `bg-primary` (силен оранжев/червен цвят)
- Телефонен бутон → тъмен фон с бял текст: `bg-white text-primary border-2 border-white` вместо `variant="outline"` с бели рамки. Телефонният номер винаги видим (без hover зависимост)

**2. `src/components/HowWeWork.tsx` — Стъпкови номера**
- Увеличаване на номерата: `w-8 h-8 text-sm` → `w-12 h-12 text-xl font-bold`
- По-силен цвят: solid `bg-primary text-white` с `shadow-lg`
- Преместване от ъгъла на картата в по-видима позиция (над иконата)

**3. `src/components/HowWeWork.tsx` — Визуални индикатори (✔)**
- Добавяне на нови i18n ключове `step1Benefit`, `step2Benefit`, `step3Benefits` (масив), `step4Benefit`
- Под текста на всяка карта: зелени checkmark икони (`CheckCircle` от lucide) + кратък текст
- Step 1: ✔ Безплатен оглед на място
- Step 2: ✔ Прозрачно ценообразуване
- Step 3: ✔ Договор включен · ✔ Качествено изпълнение · ✔ В срок
- Step 4: ✔ Гаранция до 10–15 години

**4. `src/components/HowWeWork.tsx` — Икони**
- Замяна на текущите Lucide икони с по-строителни/професионални варианти:
  - Step 1: `HardHat` (строителна каска) вместо `Search`
  - Step 2: `FileText` (документ/оферта) вместо `ClipboardCheck`
  - Step 3: `Wrench` (инструмент) вместо `Hammer`
  - Step 4: `ShieldCheck` (щит с отметка) вместо `Shield`
- По-голям размер: `w-8 h-8` → `w-10 h-10`

**5. i18n — нови ключове за benefits**
- Добавяне на `howWeWork.step1Benefit`, `step2Benefit`, `step3Benefits`, `step4Benefit` във всички 10 locale файла

### Файлове за промяна

| Файл | Действие |
|---|---|
| `src/components/HowWeWork.tsx` | Нови икони, по-големи номера, benefit checkmarks |
| `src/pages/HowWeWorkPage.tsx` | Fix CTA бутони — видимост и контраст |
| `src/i18n/locales/bg.ts` | Нови benefit ключове |
| `src/i18n/locales/en.ts` | Нови benefit ключове |
| `src/i18n/locales/de.ts` | Пренаписване (fix build) + benefit ключове |
| `src/i18n/locales/fi.ts` | Пренаписване (fix build) + benefit ключове |
| `src/i18n/locales/fr.ts` | Пренаписване (fix build) + benefit ключове |
| `src/i18n/locales/nl.ts` | Пренаписване (fix build) + benefit ключове |
| `src/i18n/locales/no.ts` | Пренаписване (fix build) + benefit ключове |
| `src/i18n/locales/ru.ts` | Пренаписване (fix build) + benefit ключове |
| `src/i18n/locales/sv.ts` | Пренаписване (fix build) + benefit ключове |
| `src/i18n/locales/ua.ts` | Пренаписване (fix build) + benefit ключове |

