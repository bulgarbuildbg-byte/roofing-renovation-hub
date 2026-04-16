

## План: Добавяне на „Изчисли цена" бутон в Hero секцията на всички service страници

### Какво се прави

Добавяне на трети, визуално по-лек бутон „Изчисли цена" под двата основни CTA бутона във всяка service страница. При натискане отваря PriceCalculator като dialog/popup директно, без пренасочване.

### Подход

**1. PriceCalculator — expose external trigger**

Компонентът `PriceCalculator.tsx` вече работи като Dialog. Ще добавя `open` и `onOpenChange` props, за да може да се управлява отвън (от hero бутона).

**2. Нов бутон във всяка Hero секция**

Под съществуващия `flex` ред с двата бутона, ще се добави:

```text
[Заяви безплатен оглед]  [Обади се сега]     ← запазват се
           ⌊ 🧮 Изчисли цена ⌋               ← нов, link-style
```

- Стил: `text-white/80 underline hover:text-white` (text link, не пълен бутон)
- Икона: `Calculator` (малка, 4×4)
- Не е равностоен на primary/secondary CTA

**3. Засегнати файлове (13 service страници)**

| Файл | Hero промяна |
|---|---|
| `RoofRepairPage.tsx` | + калкулатор бутон + PriceCalculator dialog |
| `WaterproofingPage.tsx` | + калкулатор бутон |
| `NewRoofPage.tsx` | + калкулатор бутон |
| `MetalRoofPage.tsx` | + калкулатор бутон |
| `RoofLeakRepairPage.tsx` | + калкулатор бутон |
| `TileReplacementPage.tsx` | + калкулатор бутон |
| `FlatRoofPage.tsx` | + калкулатор бутон |
| `MaintenancePage.tsx` | + калкулатор бутон |
| `WaterproofingVarnaPage.tsx` | + калкулатор бутон |
| `SolarSystemsPage.tsx` | + SolarCalculator dialog |
| `SolarHousePage.tsx` | + SolarCalculator dialog |
| `SolarBuildingsPage.tsx` | + SolarCalculator dialog |
| `SolarFarmsPage.tsx` | + SolarCalculator dialog |
| `PriceCalculator.tsx` | + `open`/`onOpenChange` props |
| `SolarCalculator.tsx` | + Dialog wrapper с external trigger |

### Поведение

1. Потребител натиска „Изчисли цена"
2. Отваря се PriceCalculator (за покривни) или SolarCalculator (за соларни) като overlay
3. Калкулаторът задава тип покрив → квадратура → състояние
4. Показва ориентировъчна цена + препоръка
5. След резултата: „Искате ли точна оферта?" с бутони „Да" и „Обади ми се"

Стъпка 5 вече е имплементирана в PriceCalculator (inquiry form след калкулация).

