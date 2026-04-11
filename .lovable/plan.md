

## Смяна на херо снимката на началната страница + същият визуален стил

### Файлове

| Файл | Промяна |
|---|---|
| `src/assets/hero-homepage.jpg` | Копиране на качената снимка |
| `src/components/Hero.tsx` | Нова снимка + визуален стил като RoofRepairPage |

### Промени в `Hero.tsx`

1. **Снимка**: `hero-roofing-new.png` → `hero-homepage.jpg` (качената снимка с керемиди)
2. **Overlay**: Премахва се `bg-gradient-to-br from-primary/95 via-primary/80 to-primary/60` и се заменя с:
   - Radial vignette: `bg-[radial-gradient(ellipse_at_center,_transparent_20%,_rgba(15,23,42,0.55)_70%,_rgba(15,23,42,0.85)_100%)]`
   - Bottom gradient: `bg-gradient-to-t from-[#0f172a]/70 via-[#0f172a]/30 to-transparent`
3. **Заглавие h1**: добавя се `[text-shadow:_0_3px_16px_rgba(0,0,0,0.9),_0_1px_4px_rgba(0,0,0,0.8)]`
4. **Подзаглавие p**: добавя се `[text-shadow:_0_2px_8px_rgba(0,0,0,0.6)]`
5. **Badges**: от `bg-accent/20 text-accent` → `bg-primary/70 backdrop-blur-sm text-white/90` + зелени чекмаркове (`text-green-400`)
6. **Бутон "Обади се"**: от `bg-transparent border-primary-foreground` → `bg-primary/40 backdrop-blur-sm border-white/80`
7. **CTA бутон**: добавя се `shadow-lg`

