

## План: Guided Funnel Chatbot — Дигитален Търговец

Пълно преработване на ChatBot компонента от AI Q&A чат в **button-driven guided funnel** със 7 сценария, вграден калкулатор и автоматично събиране на лидове.

### Архитектура

Основната логика е **client-side state machine** (не AI). AI се използва САМО за flow "Имам въпрос". Всички останали flows са предефинирани стъпки с бутони.

```text
ChatBot.tsx (UI shell — header, scroll, input)
  └── useChatFunnel.ts (state machine hook)
        ├── Flow definitions (7 flows)
        ├── Step rendering logic  
        ├── Calculator logic (roof + solar)
        └── Lead submission (→ Supabase inquiries)
```

### Нови/променени файлове

| Файл | Промяна |
|---|---|
| `src/hooks/useChatFunnel.ts` | НОВ — state machine с 7 flows, calculator logic, lead submission |
| `src/components/ChatBot.tsx` | Пълен redesign — рендерира funnel стъпки, бутони, калкулатор панели, contact форми |
| `src/components/ChatMessage.tsx` | Добавяне на поддръжка за бутони, calculator cards, contact forms в съобщенията |
| `src/hooks/useChat.ts` | Запазва се — използва се само за flow "Имам въпрос" |
| `supabase/functions/chat/index.ts` | Без промяна |

### State Machine — `useChatFunnel.ts`

**Типове съобщения** (разширен Message):
```
type FunnelMessage = {
  role: "bot" | "user";
  content: string;
  buttons?: { label: string; value: string; icon?: string }[];
  calculator?: "roof" | "solar";
  contactForm?: "quick" | "full" | "callback";
  resultCard?: { kw?: number; price?: number; saving?: number; payback?: number };
}
```

**7 Flows:**

1. **LEAK** (Спешен проблем) → Тип покрив → Квадратура → Адрес → "Искате ли да ви се обадим?" → Да/Оферта → Lead capture
2. **QUOTE** (Оферта) → Какво трябва → Тип имот → Тип покрив → Квадратура → Адрес → Име/Телефон/Имейл → Потвърждение
3. **CALLBACK** (Обадете ми се) → Име → Телефон → За какво → Потвърждение (под 10 сек)
4. **INSPECTION** (Безплатен оглед) → Адрес → Тип имот → Проблем → Теч? → Име/Телефон → Потвърждение
5. **ROOF_REPAIR** (Ремонт) → Проблем → Тип покрив → Квадратура → Адрес → Inline калкулатор → "Искате точна оферта?" → Lead
6. **SOLAR** (Соларна система) → Тип проект → Състояние покрив → Месечна сметка → Адрес → Inline калкулатор → Lead
7. **QUESTION** (Свободен въпрос) → AI chat (useChat) → След отговор: "Искате оферта?" → Lead flow

### Калкулатор в чата

Вграден панел (не модал, не пренасочване) — показва се като разширено съобщение:

**Покривен калкулатор:** Използва priceMatrix от PriceCalculator.tsx (min/max € × м²).

**Соларен калкулатор:** Използва формулата от SolarCalculator.tsx (мощност = сметка/25, цена = kW × 1100€, спестяване = сметка × 0.8 × 12 / 2).

### Lead Submission

Всеки flow завършва с insert в `inquiries` таблицата с:
- `name`, `phone`, `email`, `address`, `description` (събрани данни)
- `service_type` (mapped от flow-а)
- `session_id`, `referrer_source` (от analytics)

### UI Design (ChatBot.tsx)

- **Начален екран:** "Как можем да ви помогнем?" + 7 бутона в grid (2 колони mobile)
- **Bot съобщения:** Bubble с текст + optional бутони отдолу
- **User отговори:** Показват избрания бутон като user bubble
- **Contact форми:** Inline в чата — име/телефон/имейл/адрес полета
- **Calculator панели:** Compact card с резултати (4 метрики в 2×2 grid)
- **Потвърждение:** Зелена карта с ✅ + "Ще се свържем с вас"
- **Input полето:** Скрито когато има бутони за избор, видимо само при свободен текст

### Стъпки на изпълнение

1. Създаване на `useChatFunnel.ts` — цялата flow логика
2. Redesign на `ChatBot.tsx` — нов UI с бутони, форми, калкулатори
3. Update на `ChatMessage.tsx` — поддръжка за rich content типове

