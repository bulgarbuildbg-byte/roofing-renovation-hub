

## План: Badge/Chip стил за „Изчисли цена" бутона

### Промяна

**Файл: `src/components/CalculatorDialog.tsx`** — Redesign на trigger бутона от underline link към pill badge/chip.

Нов стил:
```
inline-flex items-center gap-1.5 
bg-[#F3F6FA] hover:bg-[#E8EDF4] 
text-slate-700 
border border-blue-300/60 hover:border-blue-400
rounded-full 
text-xs md:text-sm font-medium
h-8 md:h-9 px-3 md:px-3.5
transition-colors cursor-pointer
```

- Pill shape (`rounded-full`)
- Светъл фон (`#F3F6FA`), тъмен текст (`slate-700`)
- Лек outline в синьо (`border-blue-300/60`)
- Компактен: 32px mobile / 36px desktop
- Без underline, без сянка
- Hover: леко потъмняване на фона + по-видим border

Премахва се `mt-2` и `underline` класовете. Визуално ще изглежда като инструментален chip, не CTA.

Позицията в Hero.tsx остава непроменена — вече е отделен вдясно на desktop и центриран на mobile.

### Засегнат файл

| Файл | Промяна |
|---|---|
| `src/components/CalculatorDialog.tsx` | Нов badge/chip стил на trigger бутона |

