## Диагноза с наличната инфо

Изключваме: bid strategy Max Conversions ❌, нов акаунт ❌, бюджет ❌ (€13/ден е ОК за Варна Search), disapproved ads ❌, локация ❌, billing ❌, landing page ❌ (проверено — 200 OK, prerender OK, robots.txt fix-нат).

Кампанията е **Search**, keywords са **Eligible**, но 0 impressions. Това стеснява реалните причини до **3 сценария**, всички в самия Google Ads акаунт (не в кода):

### Сценарий 1 — Bid strategy без реален bid (най-вероятно)
"Не знам точно" bid стратегията + 0 impressions често значи **eCPC / Enhanced CPC / Target Impression Share** с грешно зададен параметър:
- Target Impression Share с *max CPC limit €0.10* → Google просто не наддава
- Target CPA настроен на нереалистично ниска стойност (напр. €5 при пазарен €30) → нула аукциони
- Manual CPC с bid €0.05 → под минималния за аукциона

Keyword status **Eligible** ≠ достатъчен bid — Google не показва "Below first page bid" статус за всички bid strategies.

### Сценарий 2 — Match type + audience/keyword conflict
- Всички keywords са **[Exact match]** с ниски локални обеми (напр. `[ремонт покрив варна]` има 20 searches/месец) → math prevents impressions
- **Negative keyword list** случайно блокира главните думи (напр. добавена `-ремонт` от друг account)
- **Audience targeting = Targeting (not Observation)** с малка/грешна аудитория → зануляваме reach

### Сценарий 3 — Conversion tracking конфликт (по-рядко)
Ако кампанията е свързана с **Smart Bidding**, което разчита на conversion action, което наскоро е било **паузирано или преместено** (спомни си: наскоро махнахме `generate_lead` и `lead_engagement` от primary conversions) → алгоритъмът "губи" сигнала и спира да наддава. Ако primary conversion action е било едно от помощните и сега няма нищо, което да брои → системата чака данни и не наддава.

## Какво искам от теб — 4 конкретни screenshots

За да идентифицирам точния сценарий, вместо да гадая, ми трябва:

1. **Campaign settings → Bidding** — целия блок (стратегия + всички max/target стойности)
2. **Campaigns → Columns → Modify columns → Competitive metrics** → добави: `Search Impr. share`, `Search lost IS (rank)`, `Search lost IS (budget)`, `Search lost IS (top)`, `Search abs. top IS`. После screenshot на реда с кампанията.
3. **Keywords таб** — screenshot с колоните `Status`, `Max CPC`, `Quality Score`, `Match type` за топ 10 keywords
4. **Tools → Diagnostics → "Ad Preview and Diagnosis"** — въведи главна ключова дума + локация Варна и виж какво пише Google защо не показва обявата

Алтернативно: **Campaigns → click на кампанията → бутон "Recommendations"** — screenshot от там. Google обикновено директно казва какво липсва (най-често *"Fix ad strengths"*, *"Add responsive search ads"*, *"Raise bids"*).

## Какво НЕ мога да направя от кода

Impressions се управляват изцяло от Google Ads аукциона. От кода:
- ✅ Направено: `robots.txt` разрешава експлицитно AdsBot
- ✅ Проверено: landing pages 200 OK, prerender OK, няма noindex
- ✅ Проверено: conversion tracking работи (потвърдено с browser test)
- ❌ Не мога: да увеличавам bid, да променям match types, да пусна impressions

## План

**Стъпка 1 (ти):** Прати ми поне един от 4-те screenshot-a по-горе. Най-важен е #1 (Bidding) и #2 (Impression Share metrics) — те решават 90% от случаите на 0 impressions при Eligible кампания.

**Стъпка 2 (аз):** След като видя screenshot-ите, ще ти дам точна инструкция какво да смениш в Ads UI (bid стойност, match type, target CPA и т.н.) — 5 минути работа, не изисква никаква промяна в кода.

**Стъпка 3 (аз, ако се окаже сценарий 3):** Ако primary conversion action в Google Ads вече не съществува / не се тригерира, ще потвърдя от кода кой event стига до Ads и ще ти кажа кой да маркираш като Primary в **Tools → Conversions**.
