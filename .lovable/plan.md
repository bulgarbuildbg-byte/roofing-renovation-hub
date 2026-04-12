

## Три промени: линкове към проекти, обновяване на ProjectsPage, видимост на скрити страници в менютата

### 1. Снимките в „Нашите завършени проекти" → линк към страница Проекти

**Файл:** `src/components/CompletedProjects.tsx`

- Обвиване на всяка карта (ред 97) в `<Link to={getPath('projects')}>` — при клик на снимка/карта отвежда към `/bg/проекти`

### 2. Обновяване на ProjectsPage с новите 7 снимки

**Файл:** `src/pages/ProjectsPage.tsx`

- Замяна на старите 6 import-а (`residential-tile-roof.jpg`, `apartment-building.jpg` и т.н.) с новите 7 от `portfolio/`
- Обновяване на масива `projects` — 7 проекта с реални заглавия, локации и описания, съответстващи на снимките:
  1. Аспарухово, Варна — ремонт на покрив
  2. Каварна — хотелска сграда
  3. м-т Траката — вила
  4. обл. Варна — жилищна сграда
  5. ул. Македония 25 — плосък покрив
  6. ул. Подполковник — ремонт на покрив
  7. Шошкова градина 7 — пълна смяна на покрив
- Добавяне на категория за филтриране, съответстваща на типа услуга
- Поправка на бутона „Безплатен оглед" — от `/контакти` на `getPath('inspection')` (с useLocalizedPath)

### 3. Скрити страници → добавяне в менютата

Проверка показва, че следните страници имат маршрути, но **не се виждат в нито едно меню**:

| Страница | RouteKey | В Header? | В Footer? |
|---|---|---|---|
| Цени ремонт покрив | `pricing` | ❌ | ❌ |
| Как работим | `howWeWork` | ❌ | ❌ |

**Промени:**

**Header.tsx** — `serviceLinks` масив (ред 193-203):
- Добавяне на `{ label: t('nav.pricing'), routeKey: 'pricing' }` след `maintenance`
- Добавяне на `{ label: t('nav.howWeWork'), routeKey: 'howWeWork' }` в секцията с линкове под услугите (и в MobileMenu, и в FullMenuPanel)

**Footer.tsx** — `companyRoutes` масив (ред 29-38):
- Добавяне на `{ key: "pricing", routeKey: "pricing" }`
- Добавяне на `{ key: "howWeWork", routeKey: "howWeWork" }`

**bg.ts** — добавяне на превод ключове `nav.pricing` и `nav.howWeWork` ако липсват

### Технически детайли

| Файл | Промяна |
|---|---|
| `src/components/CompletedProjects.tsx` | Обвиване на картите в `<Link to={getPath('projects')}>` |
| `src/pages/ProjectsPage.tsx` | Нови 7 import-а, обновен масив, useLocalizedPath за линкове |
| `src/components/Header.tsx` | Добавяне на pricing в serviceLinks; howWeWork в менютата |
| `src/components/Footer.tsx` | Добавяне на pricing и howWeWork в companyRoutes |
| `src/i18n/locales/bg.ts` | Добавяне на nav.pricing и nav.howWeWork ключове |

