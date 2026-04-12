

## Уеднаквяване на секция „Как работим" във всички service страници

### Проблем

`RoofRepairPage` вече използва споделения `<HowWeWork />` компонент от началната страница. Останалите 5 service страници имат собствени hardcoded inline секции с различни текстове и дизайн.

### Решение

Замяна на inline секциите в 5 файла с `import HowWeWork` + `<HowWeWork />`:

| Файл | Промяна |
|---|---|
| `src/pages/services/MetalRoofPage.tsx` | Премахване на inline секция → `<HowWeWork />` |
| `src/pages/services/FlatRoofPage.tsx` | Премахване на inline секция → `<HowWeWork />` |
| `src/pages/services/RoofLeakRepairPage.tsx` | Премахване на inline секция → `<HowWeWork />` |
| `src/pages/services/TileReplacementPage.tsx` | Премахване на inline секция → `<HowWeWork />` |
| `src/pages/services/WaterproofingPage.tsx` | Премахване на inline секция → `<HowWeWork />` |

Всяка промяна е: добавяне на `import HowWeWork from "@/components/HowWeWork"` и замяна на `<section>...</section>` блока с `<HowWeWork />`.

