## Открити проблеми

Всичките 4 запитвания в базата идват от чатбота. Проверих кода в `src/hooks/useChatFunnel.ts` и админ панела за имейл кампании.

### 1. Защо всичко е "Поддръжка" (maintenance)?

В `useChatFunnel.ts` (ред 444):
- Flow `INSPECTION` ("Безплатен оглед") → `service_type = "maintenance"` ❌ грешно — огледът не е поддръжка.
- Flow `CALLBACK` ("Обади ми се") → `service_type = "other"`.
- Flow `QUOTE` със соларна система → `"other"` (не съществува `solar`).
- Flow `LEAK` → правилно `leak_repair`.
- Flow `ROOF_REPAIR` → винаги `repair`, без значение дали е "Теч"/"Смяна керемиди"/"Цялостен".

Резултат: всеки, който натисне „Безплатен оглед" в чатбота, се записва като „Поддръжка".

### 2. Защо описанието е само `[Chatbot]` (празно)?

Flow-овете `INSPECTION` и `CALLBACK` отиват директно към форма за контакт **без да събират** проблем/покрив/площ. В `submitLead` се прави `[Chatbot] ${desc}`, но `desc` е празен низ → записва се само `[Chatbot] `.

За `QUESTION` flow също не се записва темата/въпроса (`leadData.topic` никога не се set-ва от свободния текст).

### 3. Защо данните не отиват в Email Marketing?

Проверих `EmailCampaignEditorPage.tsx`: сегментацията филтрира `inquiries` по `email_consent = true`. Чатбот лидовете обаче се записват с **фалшив email** `chatbot@noemail.bg` (ред 95 в useChatFunnel). Същото важи и за:
- `QuoteRequestForm` → `noemail+<timestamp>@quote.local`
- `PriceCalculator` gate → `calculator-lead@noemail.bg`

Тези лидове **се броят** в сегментите (защото `email_consent` default = true), но реално нямат валиден имейл — кампанията „изпраща", но никой не получава нищо.

## План за поправка

### A. `src/hooks/useChatFunnel.ts` — правилен service_type

В `handleFormSubmit`:
```
INSPECTION     → "other" (огледът не е услуга сам по себе си; админът избира след оглед)
CALLBACK       → "other"
QUESTION       → "other"
ROOF_REPAIR    → зависи от data.problem:
                 "Теч" → "leak_repair"
                 "Смяна на керемиди" → "replacement"
                 "Цялостен ремонт" → "repair"
LEAK           → "leak_repair" (без промяна)
QUOTE/repair   → "repair"
QUOTE/waterproofing → "waterproofing"
QUOTE/solar    → "other" (няма solar enum)
```

### B. `src/hooks/useChatFunnel.ts` — пълно описание

В `submitLead`, разширявам описанието да включва и:
- `currentFlow` (човешки етикет: „Спешен теч", „Безплатен оглед", „Обаждане", „Въпрос", „Оферта", „Ремонт", „Соларна")
- `address` (вече се събира, но не се пише в desc)
- `serviceNeed` (от QUOTE flow)
- `propertyType` (тип имот)
- `topic` (за QUESTION — записвам последния user текст като topic при handleTextInput)

Ако всичко е празно → пише `Заявка през чатбот (без допълнителни детайли)` вместо празно.

### C. Email Marketing — изключи фалшиви имейли

В `EmailCampaignEditorPage.tsx` count query и при реалното изпращане (където и да е логиката за send), добавям филтър:
```
.not("email", "like", "%@noemail.bg")
.not("email", "like", "%@quote.local")
.not("email", "like", "%@chatbot%")
```

Плюс малка визуална пояснение в `ContactDatabasePage.tsx`: лидове с placeholder email да се показват като „Без имейл" (badge), за да е ясно че няма да получат кампании.

### D. (по избор) Чатбот да пита за имейл

В `ChatContactForm` (или където е inline form-ът на чатбота) — да направя поле „Email" задължително, ако flow-ът не е спешен (LEAK/CALLBACK остават само с телефон). Това ще увеличи реалните маркетинг лидове.

→ **Питам ви: искате ли да направя email задължителен в чатбот формата?** Иначе оставям email-а опционален и просто изключвам фалшивите от кампаниите.

## Файлове, които ще променя

- `src/hooks/useChatFunnel.ts` — service_type mapping + богато описание + capture на topic
- `src/pages/admin/EmailCampaignEditorPage.tsx` — изключи placeholder email домейни от count и сегменти
- (ако приложимо) edge function или клиентски код, който реално изпраща кампанията — същия филтър
- `src/pages/admin/ContactDatabasePage.tsx` — визуален badge „Без имейл" за placeholder адресите
- (опционално) `src/components/ChatBot.tsx` или съответната chat form — email поле

## Какво НЕ се променя

- Структурата на `inquiries` таблицата
- RLS политиките
- Дизайн системата
- PriceCalculator gate (вече работи — събира име+телефон+email)
- QuoteRequestForm (email-ът там си е опционален по дизайн)
