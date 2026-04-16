

## План: Модерен Sales Assistant Chat Widget

Пълно преструктуриране на ChatBot компонента от стандартен support чат в **conversion-focused sales assistant card** с аватар, CTA йерархия и scroll-triggered появяване.

### Промени

**1. `src/components/ChatBot.tsx`** — Пълен redesign

Три визуални състояния:

```text
[Collapsed]     → Chat bubble (долу дясно) с зелена online точка
[Prompt Card]   → Floating card над bubble-а с аватар + бутони
[Expanded Chat] → Пълен chat mode (както досега, бял фон)
```

**Prompt Card структура:**
- Бял фон, `rounded-2xl`, `shadow-xl`, макс ширина 340px
- Кръгъл аватар отгоре (64×64, мъж с работни дрехи — ще използваме placeholder URL от UI Faces или DiceBear с `adventurer` стил)
- Текст: „Здравейте! Имате нужда от оглед или оферта?"
- 2 оранжеви primary бутона (`bg-accent`): „Искам безплатен оглед" + „Искам оферта"
- 5 сини secondary бутона (`bg-primary`): Теч, Обадете ми се, Ремонт, Солар, Въпрос
- Close бутон (X) горе дясно

**Scroll-triggered появяване:**
- Prompt Card се показва след `scrollY > 300` (лек scroll)
- `animate-fade-in` + `translate-y` анимация
- При затваряне → `sessionStorage` flag, не се показва пак в сесията
- Chat bubble остава винаги видим (с online точка)

**Позициониране:**
- Desktop (lg+): `fixed bottom-[88px] right-6` — точно над FloatingCallButton
- Mobile (<lg): `fixed bottom-[72px] right-4` — над MobileBottomBar
- При expanded chat на mobile: почти fullscreen (`inset-2`)

**Chat bubble redesign:**
- Бял фон с primary border вместо solid primary
- MessageCircle икона
- Зелена точка (8×8, `bg-green-500`, `animate-pulse`) горе дясно на bubble-а
- При hover: лек scale

**2. `src/components/FloatingCallButton.tsx`** — Малка корекция

- Добавяне на `id="floating-call"` за позиционен контекст
- Намаляване на z-index до `z-40` (chatbot е `z-50`)

**3. `src/components/ChatMessage.tsx`** — Без промяна

Запазва се — вече поддържа бутони, форми и калкулатор карти.

**4. `src/hooks/useChatFunnel.ts`** — Без промяна

Цялата flow логика остава.

### Визуална йерархия на Prompt Card

```text
┌─────────────────────────┐
│              [X]        │
│       ┌──────┐          │
│       │avatar│          │
│       └──────┘          │
│  Здравейте! Имате нужда │
│  от оглед или оферта?   │
│                         │
│ ┌─────────────────────┐ │
│ │ 🔍 Безплатен оглед  │ │  ← orange
│ └─────────────────────┘ │
│ ┌─────────────────────┐ │
│ │ 📋 Искам оферта     │ │  ← orange
│ └─────────────────────┘ │
│                         │
│ ┌──────┐ ┌──────┐      │
│ │ Теч  │ │Обади │      │  ← blue, smaller
│ └──────┘ └──────┘      │
│ ┌──────┐ ┌──────┐      │
│ │Ремонт│ │Солар │      │
│ └──────┘ └──────┘      │
│ ┌──────────────────┐   │
│ │  Имам въпрос     │   │
│ └──────────────────┘   │
└─────────────────────────┘
          ┌────┐
          │ 💬 │ ● ← green dot
          └────┘
    ┌────────────────────┐
    │ 📞 088 499 7659    │  ← existing call button
    └────────────────────┘
```

### Засегнати файлове

| Файл | Промяна |
|---|---|
| `src/components/ChatBot.tsx` | Пълен redesign — 3 състояния, prompt card, scroll trigger |
| `src/components/FloatingCallButton.tsx` | z-index корекция |

### Аватар

Ще използвам DiceBear API за генериране на реалистичен мъжки аватар:
`https://api.dicebear.com/7.x/adventurer/svg?seed=constructor&backgroundColor=f5f5f5`

Или по-добре — статичен professional headshot от Unsplash (безплатен, без attribution):
`https://images.unsplash.com/photo-1560250097-0b93528c311a?w=128&h=128&fit=crop&crop=face`

