

## Нова секция "Как работим" + нова страница

### Какво ще се направи

1. **Нова секция на началната страница** — `src/components/HowWeWork.tsx`
   - 4 карти в ред (responsive: 1 колона mobile, 2 tablet, 4 desktop)
   - Всяка карта: номер на стъпка, икона, заглавие, кратко описание, бутон "Научете повече"
   - Бутоните водят към новата страница `/как-работим`
   - Позиция: след `<Services />` (след "Не сте сигурни каква услуга ви трябва?"), преди `<Testimonials />`

2. **Нова страница** — `src/pages/HowWeWorkPage.tsx`
   - SEO-оптимизирана страница с 3000+ думи
   - Подробно описание на 4-те стъпки: Оглед и Консултация, Оферта, Изпълнение, Гаранция
   - Header, Footer, Helmet мета тагове, BreadcrumbList JSON-LD
   - FAQ секция за процеса

3. **Routing** — регистрация на новия маршрут
   - Добавяне на `howWeWork` към `RouteKey` в `src/i18n/routes.ts`
   - Локализирани slug-ове за всички 10 езика (bg: `как-работим`, en: `how-we-work`, de: `wie-wir-arbeiten`, etc.)
   - Добавяне в `PAGE_MAP` в `LocalizedPageRouter.tsx`

4. **i18n** — преводи за секцията и страницата
   - Добавяне на `howWeWork` ключове във всички 10 locale файла (bg, en, de, fi, sv, no, fr, nl, ru, ua)

### Стъпки (4 карти)

| # | Икона | Заглавие (BG) | Текст (BG) |
|---|---|---|---|
| 1 | Search | Оглед и Консултация | Безплатен оглед на място и експертна консултация |
| 2 | ClipboardCheck | Оферта | Ясна и прозрачна оферта без скрити разходи |
| 3 | Hammer | Изпълнение | Качествена работа, изпълнена в срок |
| 4 | Shield | Гаранция | Предаване на обекта с до 10–15 години гаранция |

### Файлове за промяна

| Файл | Действие |
|---|---|
| `src/components/HowWeWork.tsx` | Нов — секция с 4 карти |
| `src/pages/HowWeWorkPage.tsx` | Нов — подробна SEO страница |
| `src/i18n/routes.ts` | Добавяне на `howWeWork` RouteKey + slug-ове за 10 езика |
| `src/components/LocalizedPageRouter.tsx` | Добавяне в PAGE_MAP |
| `src/pages/Index.tsx` | Вмъкване на `<HowWeWork />` след `<Services />` |
| `src/i18n/locales/bg.ts` | Преводи за секцията и страницата |
| `src/i18n/locales/en.ts` | Преводи |
| `src/i18n/locales/de.ts` | Преводи |
| `src/i18n/locales/fi.ts` | Преводи |
| `src/i18n/locales/sv.ts` | Преводи |
| `src/i18n/locales/no.ts` | Преводи |
| `src/i18n/locales/fr.ts` | Преводи |
| `src/i18n/locales/nl.ts` | Преводи |
| `src/i18n/locales/ru.ts` | Преводи |
| `src/i18n/locales/ua.ts` | Преводи |

