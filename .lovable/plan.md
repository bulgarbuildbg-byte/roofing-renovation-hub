

## Смяна на херо снимката на страница „Изграждане на нов покрив" + професионален стил

### Файлове

| Файл | Промяна |
|---|---|
| `src/assets/hero-new-roof.jpg` | Копиране на качената снимка |
| `src/pages/services/NewRoofPage.tsx` | Hero секция — нова снимка + визуален стил като RoofRepairPage и Hero.tsx |

### Промени в `NewRoofPage.tsx` (редове 183-230)

1. **Снимка**: `roofFrameConstruction` → `heroNewRoof` (качената дрон снимка с дървена конструкция)
2. **Import**: добавя се `import heroNewRoof from "@/assets/hero-new-roof.jpg";`
3. **Overlay**: Премахва се `opacity-30` + `bg-gradient-to-t from-slate-900 via-slate-900/80` и се заменя с:
   - Radial vignette: `bg-[radial-gradient(ellipse_at_center,_transparent_20%,_rgba(15,23,42,0.55)_70%,_rgba(15,23,42,0.85)_100%)]`
   - Bottom gradient: `bg-gradient-to-t from-[#0f172a]/70 via-[#0f172a]/30 to-transparent`
   - Снимката без `opacity-30` — пълна видимост
4. **Заглавие h1**: добавя се `[text-shadow:_0_3px_16px_rgba(0,0,0,0.9),_0_1px_4px_rgba(0,0,0,0.8)]`
5. **Подзаглавие p**: добавя се `[text-shadow:_0_2px_8px_rgba(0,0,0,0.6)]`
6. **Badges**: от `bg-white/10 border-white/20` → `bg-primary/70 backdrop-blur-sm` без border; иконите от `text-accent` → `text-green-400`
7. **Бутон „Безплатен оглед"**: добавя се `shadow-lg`
8. **Бутон втори**: от `bg-transparent border-white` → `bg-primary/40 backdrop-blur-sm border-white/80`

