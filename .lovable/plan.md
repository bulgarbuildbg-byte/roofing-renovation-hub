

## Fix: Снимки на клиенти не се показват в секцията с отзиви

### Проблем
Кодът е правилен за fallback данните (с `i.pravatar.cc` URLs), но базата данни връща testimonials с `avatar_url: null`. Когато DB данните са налични, те заменят fallback-ите и снимките изчезват — показват се само инициали.

### Решение

**`src/components/Testimonials.tsx`** — две промени:

1. **`onError` handler на `<img>`** — ако снимка от DB не се зареди, показва pravatar fallback вместо счупена икона
2. **Fallback снимки за DB testimonials без `avatar_url`** — когато `avatar_url` е `null`, генерира детерминистичен pravatar URL базиран на `author_name` вместо да показва само инициали. Формула: `https://i.pravatar.cc/200?img=${(name.length + parseInt(id.slice(-4), 16)) % 50 + 1}`

Така всеки отзив винаги ще показва реалистична човешка снимка — независимо дали идва от DB или от fallback данни.

### Файлове

| Файл | Промяна |
|---|---|
| `src/components/Testimonials.tsx` | Добавяне на auto-generated avatar URL когато `avatar_url` е null + `onError` handler |

