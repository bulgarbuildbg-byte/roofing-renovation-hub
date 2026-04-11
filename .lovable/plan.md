

## Подобряване на hero секцията — ясна снимка, фокус в центъра, четим текст

### Какво се променя

Файл: `src/pages/services/RoofRepairPage.tsx` — hero секцията (редове 174-221)

### Промени

**1. Overlay — от плътен синкав → radial vignette**
- Премахва се `bg-gradient-to-br from-primary/90 via-primary/75 to-primary/60`
- Заменя се с radial gradient: центърът е почти прозрачен, краищата потъмняват
- `bg-[radial-gradient(ellipse_at_center,_transparent_20%,_rgba(0,0,0,0.6)_80%,_rgba(0,0,0,0.8)_100%)]`
- Допълнително: лек linear gradient отдолу за текстовата зона: `bg-gradient-to-t from-black/70 via-black/30 to-transparent`

**2. Текстове — backdrop за четимост**
- Заглавието `h1` получава `[text-shadow:_0_2px_12px_rgba(0,0,0,0.7)]`
- Подзаглавието: същия text-shadow

**3. Бутони — полупрозрачен фон**
- Основен CTA: остава `bg-accent` (оранжев) — вече е контрастен, добавя се `shadow-lg`
- Втори бутон (обаждане): `bg-black/40 backdrop-blur-sm border-white/80` вместо напълно прозрачен

**4. Badges (Безплатен оглед и т.н.)**
- От `bg-primary-foreground/10` → `bg-black/40 backdrop-blur-sm` за по-добра четимост

### Файлове

| Файл | Промяна |
|---|---|
| `src/pages/services/RoofRepairPage.tsx` | Hero overlay → radial vignette, text-shadow, бутони с backdrop, badges с backdrop |

