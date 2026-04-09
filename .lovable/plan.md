

## Визуални и UX подобрения на калкулатора

### Какво се променя

Един файл: `src/components/PriceCalculator.tsx` — визуален overhaul без промяна на логиката.

---

### Промени

**1. Цветова схема и фон**
- Секцията получава `bg-gradient-to-b from-slate-50 to-slate-100` вместо `bg-muted/30`
- Картата (Card) получава по-силен shadow (`shadow-xl`) и subtle border (`border-slate-200`)
- Progress bar: custom цвят с accent gradient indicator

**2. OptionCard redesign**
- По-големи картички с `p-5`, `rounded-2xl`, `shadow-sm`
- Hover: `hover:shadow-md hover:-translate-y-0.5 transition-all duration-200`
- Selected state: `border-accent bg-accent/10 shadow-accent/20 shadow-md` — ярко оранжев border + glow
- Иконките стават цветни: accent цвят при hover/selected, `w-7 h-7` по-големи
- Добавяне на цветни кръгчета зад иконките (`w-12 h-12 rounded-full bg-accent/10`)

**3. StepHeader redesign**
- По-голямо заглавие `text-xl font-bold`
- Подзаглавие с различен стил — `text-muted-foreground italic`
- Back бутон: `bg-slate-100 hover:bg-slate-200 rounded-full p-2`
- Номер на стъпка като badge: `bg-accent text-white w-8 h-8 rounded-full` пред заглавието

**4. Progress bar подобрения**
- Текст „Стъпка X от Y" + percentage badge
- Progress indicator: `bg-gradient-to-r from-accent to-accent/70` вместо default primary
- По-висок `h-3` за видимост

**5. CTA бутони**
- Основен CTA: `bg-accent hover:bg-accent/90 text-white` — оранжев, голям, `h-14 text-lg font-bold`
- `hover:scale-[1.02] active:scale-[0.98] transition-all duration-200`
- Телефон бутон: `bg-primary text-white` вместо outline

**6. Result стъпка**
- Ценовият блок: `bg-gradient-to-br from-primary to-primary/80 text-white rounded-2xl p-8`
- Цената: `text-4xl md:text-5xl font-extrabold text-white`
- Trust badges: бели иконки на тъмен фон

**7. Микроанимации**
- Всяка стъпка wrap в div с `animate-fade-in` (вече съществува в CSS)
- OptionCard: `transition-all duration-200` за hover/select
- Бутони: `transition-transform duration-150`

**8. Spacing**
- CardContent padding: `p-8 md:p-10`
- Gap между option cards: `gap-4`
- Секции: `space-y-8` вместо `space-y-6`

**9. Size стъпка**
- Slider с accent цвят
- Preset бутони: по-големи, с accent highlight при избор
- Access бутони с иконки (Truck, ArrowUpDown, Mountain от lucide)

---

### Файлове

| Файл | Промяна |
|---|---|
| `src/components/PriceCalculator.tsx` | Визуален overhaul — нова цветова схема, по-големи картички с shadow/hover, accent CTA, step badges, анимации, подобрен spacing |

