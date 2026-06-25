## Проблеми и решения

### 1. „Липсва VITE_CLARITY_PROJECT_ID" — фалшива тревога
`ClarityTracker.tsx` вече има hardcoded fallback `xcjo8jfv0v`, така че записът на сесиите **работи**. Но админ страниците (`BehaviorPage.tsx`, `InquiryDetailPage.tsx`) четат само `import.meta.env.VITE_CLARITY_PROJECT_ID` — то е празно → бутоните и линковете към реалните клипове не се показват, а излиза червен Badge „Липсва...".

**Поправка:** да се изнесе общ конст. `CLARITY_PROJECT_ID = "xcjo8jfv0v"` (нов файл `src/lib/clarity.ts`) с fallback и да се ползва навсякъде:
- `BehaviorPage.tsx` — премахваме destructive badge, „Отвори Clarity Dashboard" винаги е активен; всеки ред със сесия има бутон „🎬 Виж запис" → отваря `https://clarity.microsoft.com/projects/view/xcjo8jfv0v/impressions?filter=CustomSessionId%3A%3A<session_id>`.
- `InquiryDetailPage.tsx` — бутонът „Виж запис в Clarity" винаги се показва, когато има `session_id`.
- `ClarityTracker.tsx` — ползва същата константа.

### 2. Къде се гледат самите видеа
Lovable Cloud / CRM **не съхранява видео файлове** — Microsoft Clarity ги държи на своя сървър (безплатно, до 30 дни ретенция). От нашия CRM пращаме линк (deep-link) с `CustomSessionId`, който отваря точния запис в Clarity. След поправка #1 ще има директни бутони „🎬 Виж запис" до всяко запитване и всяка сесия. Първият път Clarity ще поиска вход с акаунта, който управлява проект `xcjo8jfv0v` — после линковете водят директно към плейъра.

Допълнително ще добавя кратко указание в шапката на `/admin/behavior`:
> Записите се хостват в Microsoft Clarity. Кликнете „Виж запис" до сесията — нужен е достъп до Clarity проект `xcjo8jfv0v`.

### 3. Време в секунди → ч/мин/сек
Сега се изобразява като `2000s`. Ще въведа помощна функция `formatDuration(seconds)`:
- `< 60s` → `45с`
- `< 3600s` → `12м 05с`
- `≥ 3600s` → `1ч 23м 05с`

Прилагане:
- `BehaviorPage.tsx` колона/ред „Време" (2 места — карта на сесия и таблица).
- `DeviceAnalyticsPage.tsx` — ако там също се показва duration.
- `InquiryDetailPage.tsx` Activity Timeline — там, където пишем продължителност на сесия/време на страница.

### Технически детайли (за разработчик)

Нов модул `src/lib/clarity.ts`:
```ts
export const CLARITY_PROJECT_ID =
  (import.meta.env.VITE_CLARITY_PROJECT_ID as string | undefined) || "xcjo8jfv0v";
export const clarityImpressionUrl = (sessionId: string) =>
  `https://clarity.microsoft.com/projects/view/${CLARITY_PROJECT_ID}/impressions?filter=CustomSessionId%3A%3A${encodeURIComponent(sessionId)}`;
export const clarityDashboardUrl = () =>
  `https://clarity.microsoft.com/projects/view/${CLARITY_PROJECT_ID}/dashboard`;
```

Нов модул `src/lib/format.ts` (или `formatDuration` в съществуващ utils):
```ts
export const formatDuration = (s: number) => {
  s = Math.max(0, Math.round(s));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  if (h) return `${h}ч ${String(m).padStart(2,"0")}м ${String(sec).padStart(2,"0")}с`;
  if (m) return `${m}м ${String(sec).padStart(2,"0")}с`;
  return `${sec}с`;
};
```

Файлове, които ще се променят: `src/components/ClarityTracker.tsx`, `src/pages/admin/BehaviorPage.tsx`, `src/pages/admin/InquiryDetailPage.tsx`, `src/pages/admin/DeviceAnalyticsPage.tsx`, + 2 нови (`src/lib/clarity.ts`, `src/lib/format.ts`).

### Извън обхвата
- Не вграждаме плейъра в CRM-а (Clarity не дава публичен embed; нужен е техен login).
- Не променяме схемата на БД.
