

## Смяна на херо снимката на страница „Плоски покриви" + професионален визуален стил

### Файлове

| Файл | Промяна |
|---|---|
| `src/assets/hero-flat-roof.jpeg` | Копиране на качената снимка |
| `src/pages/services/FlatRoofPage.tsx` | Hero секция — нова снимка + визуален стил като останалите service страници |

### Промени в `FlatRoofPage.tsx` (редове 147-167)

**1. Import** — добавя се `import heroFlatRoof from "@/assets/hero-flat-roof.jpeg";`

**2. Hero секция** (ред 147) — от плосък `bg-primary` фон към снимков фон с overlay:
- Фоново изображение: `heroFlatRoof` с `object-cover w-full h-full`
- Radial vignette: `bg-[radial-gradient(ellipse_at_center,_transparent_20%,_rgba(15,23,42,0.55)_70%,_rgba(15,23,42,0.85)_100%)]`
- Bottom gradient: `bg-gradient-to-t from-[#0f172a]/70 via-[#0f172a]/30 to-transparent`
- Премахва се `bg-gradient-to-br from-primary to-primary/80`

**3. Заглавие h1**: добавя се `[text-shadow:_0_3px_16px_rgba(0,0,0,0.9),_0_1px_4px_rgba(0,0,0,0.8)]`

**4. Подзаглавие p**: добавя се `[text-shadow:_0_2px_8px_rgba(0,0,0,0.6)]`

**5. Badges** (ред 162-164): от `bg-primary-foreground/10` → `bg-primary/70 backdrop-blur-sm`; иконите от `text-accent` → `text-green-400`; контейнер `flex-nowrap gap-3 text-xs md:text-sm`

**6. Бутон CTA**: добавя се `shadow-lg`

**7. Бутон втори**: от `bg-transparent border-white` → `bg-primary/40 backdrop-blur-sm border-white/80`

### Резултат
- Автентична снимка от реален обект (работник полага хидроизолация на плосък покрив)
- Тъмно синьо vignette по краищата
- Текст със силна сянка без правоъгълен фон
- Консистентен стил с RoofRepairPage, NewRoofPage, WaterproofingPage и Hero.tsx

