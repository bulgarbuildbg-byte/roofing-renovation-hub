

## Смяна на херо снимката на страница „Ремонт на покриви"

### Какво се променя

Добавяне на качената снимка като фоново изображение в hero секцията на `RoofRepairPage.tsx`.

### Промени

| Файл | Промяна |
|---|---|
| `src/assets/hero-roof-repair.jpg` | Копиране на качената снимка в assets |
| `src/pages/services/RoofRepairPage.tsx` | Import на новото изображение + добавяне на `<img>` елемент в hero секцията (подобно на главния Hero компонент) |

### Детайли

1. Копиране: `user-uploads://ремонт_на_покриви_херо.jpg` → `src/assets/hero-roof-repair.jpg`
2. Import: `import heroRoofRepair from "@/assets/hero-roof-repair.jpg";`
3. В hero секцията (ред 173-174) — добавяне на `<img>` с `object-cover` зад gradient overlay, идентично на подхода в `Hero.tsx`

