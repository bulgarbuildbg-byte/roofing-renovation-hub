

## План: Глобално позициониране на ChatBot + FloatingCallButton

### Проблем

- `ChatBot` е само в `Index.tsx` — не присъства на другите ~35 страници
- `FloatingCallButton` е импортиран поотделно във всяка страница (35+ файла)
- Двата компонента не са координирани позиционно

### Решение

Преместване на `ChatBot` и `FloatingCallButton` в `LanguageLayout.tsx` — общият wrapper за всички публични страници. Това ги прави глобални без промяна на отделните pages.

### Промени по файлове

| Файл | Действие |
|---|---|
| `src/components/LanguageLayout.tsx` | + import ChatBot, FloatingCallButton, MobileBottomBar; render глобално |
| `src/pages/Index.tsx` | - премахване на ChatBot, FloatingCallButton, MobileBottomBar imports и usage |
| 35+ service/blog/other pages | - премахване на `FloatingCallButton` import и usage от всяка страница |

### Детайли

**LanguageLayout.tsx** ще стане:
```tsx
<>
  <HreflangTags />
  <Outlet />
  <FloatingCallButton />
  <MobileBottomBar />
  <Suspense fallback={null}>
    <ChatBot />
  </Suspense>
</>
```

**Позициониране** (без промяна на CSS — текущото е коректно):
- ChatBot bubble: `bottom-[88px] right-4 lg:right-6` (над MobileBottomBar)
- FloatingCallButton: `bottom-6 right-6` (desktop only, `hidden lg:flex`)
- ChatBot prompt: `bottom-[88px] right-4 lg:right-6`
- На desktop двата са един до друг в долния десен ъгъл

**Поведение** остава същото — ChatBot се появява след scroll > 300px.

### Обхват на cleanup

Премахване на `FloatingCallButton` от ~35 файла + `ChatBot` и `MobileBottomBar` от Index.tsx. Самите компоненти не се променят.

