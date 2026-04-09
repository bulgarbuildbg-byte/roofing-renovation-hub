

## Зелени бутони с цени + правилно вътрешно линкване

### Какво се променя

Три промени в два файла: `src/components/Services.tsx` и `src/pages/PricingPage.tsx`.

### 1. Стил на ценовите бутони — целият текст зелен, светлозелен фон

**И в двата файла** — премахване на `highlightPrice` функцията. Вместо нея целият badge текст е зелен.

Нов стил на badge:
- Фон: `bg-green-50` (много светло зелено)
- Бордер: `border-green-200`
- Текст: `text-green-700 font-extrabold` (целият текст — "от 9 €/м²" — е наситено зелен)
- Hover: `hover:bg-green-100`

### 2. Линкване от началната страница → страница с цени (без промяна)

Бутоните на картичките в `Services.tsx` вече водят към pricing страницата — това остава.

### 3. Линкване от pricing страницата → конкретна услуга

**Файл: `src/pages/PricingPage.tsx`**

Добавяне на `routeKey` към масива `pricingServices`:
```
{ key: "roofRepair", routeKey: "roofRepair", price: "19 €/м²" },
{ key: "waterproofing", routeKey: "waterproofing", price: "9 €/м²" },
...
```

Обвиване на всяка карта в pricing grid в `<Link to={getPath(svc.routeKey)}>`, така че клик върху картата отвежда към конкретната страница за услугата.

### Файлове

| Файл | Промяна |
|---|---|
| `src/components/Services.tsx` | Зелен фон + зелен текст на badge, премахване на highlightPrice |
| `src/pages/PricingPage.tsx` | Зелен стил на badge, добавяне на routeKey + Link към конкретни услуги, премахване на highlightPrice |

