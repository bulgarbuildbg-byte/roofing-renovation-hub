

## Обновяване на цените навсякъде + зелени цифри

### Какво се променя

Два файла: `src/components/Services.tsx` и `src/pages/PricingPage.tsx`.

### 1. `src/components/Services.tsx` — масив `serviceKeys`

Промяна на `price` стойностите:

| key | Сега | Ново |
|---|---|---|
| roofRepair | `19 €/м²` | `19 €/м²` ✓ |
| waterproofing | `9 €/м²` | `9 €/м²` ✓ |
| newRoof | `68 €/м²` | `68 €/м²` ✓ |
| tileReplacement | `18 €/м²` | `18 €/м²` ✓ |
| leakRepair | `22 €/м²` | `22 €` (без /м²) |
| flatRoof | `9 €/м²` | `9 €/м²` ✓ |
| metalRoof | `18 €/м²` | `18 €/м²` ✓ |
| maintenance | `69 €/месец` | `69 €/месец` ✓ |

Единствена реална промяна в масива: `leakRepair` от `22 €/м²` → `22 €`.

**Зелени цифри**: В badge елемента (ред ~114), вместо да рендерира `{service.price}` директно, ще обвием числовата стойност в `<span className="text-green-600">`. Ще се направи с regex split: числата стават зелени, останалият текст остава `text-primary`.

### 2. `src/pages/PricingPage.tsx` — масив `pricingServices`

Обновяване на цените:

| key | Сега | Ново |
|---|---|---|
| roofRepair | `€15 / m²` | `19 €/м²` |
| waterproofing | `€10 / m²` | `9 €/м²` |
| newRoof | `€32 / m²` | `68 €/м²` |
| metalRoof | `€9 / m²` | `18 €/м²` |
| leakRepair | `€12 / m²` | `22 €` |
| tileReplacement | `€14 / m²` | `18 €/м²` |
| flatRoof | `€11 / m²` | `9 €/м²` |
| maintenance | `€5 / m²` | `69 €/месец` |

Същата зелена стилизация на цифрите в pricing grid badge (ред ~91).

### 3. Помощна функция за зелени цифри

Малка inline функция (или директно в JSX) за highlight на числата:

```tsx
const highlightPrice = (price: string) => {
  return price.split(/(\d+)/).map((part, i) =>
    /\d+/.test(part) ? <span key={i} className="text-green-600">{part}</span> : part
  );
};
```

Използва се и в двата файла в badge елементите.

### Файлове

| Файл | Промяна |
|---|---|
| `src/components/Services.tsx` | leakRepair price fix + зелени цифри в badge |
| `src/pages/PricingPage.tsx` | Всички 8 цени обновени + зелени цифри в badge |

