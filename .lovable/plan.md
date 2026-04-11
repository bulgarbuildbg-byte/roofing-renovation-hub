

## Смяна на херо снимката на страница „Хидроизолация" + професионален визуален стил

### Файлове

| Файл | Промяна |
|---|---|
| `src/assets/hero-waterproofing.jpeg` | Копиране на качената снимка |
| `src/pages/services/WaterproofingPage.tsx` | Hero секция — нова снимка + визуален стил като RoofRepairPage и NewRoofPage |

### Промени в `WaterproofingPage.tsx` (редове 160-191)

**1. Import** — добавя се `import heroWaterproofing from "@/assets/hero-waterproofing.jpeg";`

**2. Hero секция** — от плосък `bg-primary` фон към снимков фон с overlay:
- Фоново изображение: `heroWaterproofing` с `object-cover w-full h-full`
- Radial vignette: `bg-[radial-gradient(ellipse_at_center,_transparent_20%,_rgba(15,23,42,0.55)_70%,_rgba(15,23,42,0.85)_100%)]`
- Bottom gradient: `bg-gradient-to-t from-[#0f172a]/70 via-[#0f172a]/30 to-transparent`

**3. Заглавие h1**: добавя се `[text-shadow:_0_3px_16px_rgba(0,0,0,0.9),_0_1px_4px_rgba(0,0,0,0.8)]`

**4. Подзаглавие p**: добавя се `[text-shadow:_0_2px_8px_rgba(0,0,0,0.6)]`

**5. Badges**: от `bg-primary-foreground/10` → `bg-primary/70 backdrop-blur-sm`; иконите от `text-accent` → `text-green-400`

**6. Бутон CTA**: добавя се `shadow-lg`

**7. Бутон втори**: от `bg-transparent border-white` → `bg-primary/40 backdrop-blur-sm border-white/80`

### Резултат
- Автентична снимка от реален обект (полагане на хидроизолация)
- Тъмно синьо vignette по краищата
- Текст със силна сянка без правоъгълен фон
- Консистентен стил с останалите service страници

