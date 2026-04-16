

## План: UI/UX оптимизация на Hero бутони + Chat Widget мобилна версия

### 1. Hero секция — „Изчисли цена" бутон вдясно

**Файл:** `src/components/Hero.tsx`

Текущата структура е `flex-col sm:flex-row` с 2 бутона вляво. Промяната:

- Обвиване на целия CTA блок в `flex justify-between items-end` контейнер
- Лявата група (оглед + обади се) остава непроменена
- Дясно: нов compact outline бутон „Изчисли цена" с `Calculator` икона
- На mobile: бутонът пада под основните два (full width, по-лек стил)
- Използва `CalculatorDialog` компонента (вече съществува)

```text
Desktop layout:
[Заяви безплатен оглед] [Обади се]          [🧮 Изчисли цена]
←── primary group ──→                       ←── secondary ──→

Mobile layout:
[Заяви безплатен оглед]
[Обади се]
        🧮 Изчисли цена  ← link-style, centered
```

Стил на новия бутон: `border border-white/50 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20` — compact, outline, визуално secondary.

### 2. Chat Widget — мобилна компактност

**Файл:** `src/components/ChatBot.tsx`

**Prompt Card (mobile):**
- Ширина: `w-[280px]` на mobile вместо `w-[320px]` (макс ~60% от 375px екран)
- Аватар: намален до `w-12 h-12` на mobile, позициониран с `-mt-8` (50% извън картата) + `relative` wrapper с `pt-8` за padding
- Close (X): увеличен до `w-6 h-6` с `p-1` touch target, `bg-gray-100 rounded-full` за по-добър контраст
- Текст: по-компактен `text-xs` на mobile

**Prompt Card (desktop):**
- Аватар: `w-14 h-14`, също полу-излизащ с `-mt-9` за depth ефект
- Останалото без промяна

**Expanded Chat (mobile):**
- Запазва `inset-2` fullscreen поведение (необходимо за funnel flows)

### Засегнати файлове

| Файл | Промяна |
|---|---|
| `src/components/Hero.tsx` | Restructure CTA layout, add CalculatorDialog вдясно |
| `src/components/ChatBot.tsx` | Compact prompt card, half-protruding avatar, bigger X button |

