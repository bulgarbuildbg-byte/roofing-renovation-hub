

## Смяна на херо снимката на страница „Ремонт на теч" + професионален визуален стил

### Файлове

| Файл | Промяна |
|---|---|
| `src/assets/hero-leak-repair.jpg` | Копиране на качената снимка |
| `src/pages/services/RoofLeakRepairPage.tsx` | Hero секция — нова снимка + визуален стил като останалите service страници |

### Промени в `RoofLeakRepairPage.tsx` (редове 1-220)

**1. Import** — добавя се `import heroLeakRepair from "@/assets/hero-leak-repair.jpg";`

**2. Hero секция** (ред 175-176) — от плосък `bg-primary` фон към снимков фон с overlay:
- Фоново изображение: `heroLeakRepair` с `object-cover w-full h-full`
- Radial vignette: `bg-[radial-gradient(ellipse_at_center,_transparent_20%,_rgba(15,23,42,0.55)_70%,_rgba(15,23,42,0.85)_100%)]`
- Bottom gradient: `bg-gradient-to-t from-[#0f172a]/70 via-[#0f172a]/30 to-transparent`
- Премахва се `bg-gradient-to-br from-primary to-primary/80`

**3. Заглавие h1** (ред 192): добавя се `[text-shadow:_0_3px_16px_rgba(0,0,0,0.9),_0_1px_4px_rgba(0,0,0,0.8)]`

**4. Подзаглавие p** (ред 193): добавя се `[text-shadow:_0_2px_8px_rgba(0,0,0,0.6)]`

**5. Badges** (ред 210-216): от `bg-primary-foreground/10` → `bg-primary/70 backdrop-blur-sm`; иконите от `text-accent` → `text-green-400`; контейнер `flex-nowrap gap-3 text-xs md:text-sm`

**6. Бутон CTA** (ред 196): добавя се `shadow-lg`

**7. Бутон втори** (ред 202): от `bg-transparent border-white` → `bg-primary/40 backdrop-blur-sm border-white/80`

### Резултат
- Автентична снимка от реален обект (работник сменя керемиди с предпазно оборудване)
- Тъмно синьо vignette по краищата
- Текст със силна сянка без правоъгълен фон
- Консистентен стил с RoofRepairPage, NewRoofPage, WaterproofingPage, FlatRoofPage, TileReplacementPage

