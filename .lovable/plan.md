## Контекст

Кампанията е **Eligible**, върви от 1–3 дни, но всички колони са празни (0 импресии, 0 клика, без CTR). Конверсионният тракинг вече е потвърден и работи (обаждания и форми се броят коректно), т.е. `gtag` кодовете на сайта не са причината.

Важно разграничение: **импресии и CTR се генерират от Google Ads системата (аукциона), а НЕ от кода на сайта.** Кодът на сайта може само да *пречи* (напр. да блокира crawler-a на Google) или да развали *качеството* на обявата (напр. бавен/счупен landing page → нисък Ad Rank → 0 импресии). Не може да "включи" импресии сам по себе си.

## Част 1 — Технически одит на сайта (правя аз в кода)

Проверявам всичко, което може да блокира Google да покаже рекламата или да занули Ad Rank:

1. **`public/robots.txt`** — да не блокира `Googlebot` или `AdsBot-Google` / `AdsBot-Google-Mobile`. AdsBot **не се подчинява на `User-agent: *`** и трябва да е изрично разрешен, иначе landing page-ът се маркира като „destination not crawlable" и кампанията получава 0 импресии.
2. **`<meta name="robots">`** на landing страниците (най-вече `/bg/zayavete-oferta`, `/bg/varna`, service pages) — да няма `noindex` или `none` там, където се насочва рекламата.
3. **HTTP статус на final URL-a** — проверявам чрез curl, че рекламните destination URLs връщат `200`, не `301/302 → 404`, не редиректи между езици (`/` → `/bg` → `/bg/varna` може да се брои като „excessive redirects").
4. **Prerender output** — потвърждавам, че prerender-натият HTML на landing страниците съдържа реален title/description/H1 (Google Ads краулва статичния HTML, не React).
5. **Page speed / Core Web Vitals blockers** — бърз одит за очевидни regressions на LCP/CLS, които влизат в Quality Score.
6. **Проверка на `ads.txt` / `app-ads.txt`** — само ако се показват грешки за издателски одобрения (не е задължителен за Search кампании).
7. **Conflict check** — потвърждавам, че няма skрипт (например Cookie banner блокиращ render), който да прави страницата „празна" за AdsBot.

Резултат: списък с намерените проблеми + фиксовете, приложени в същата стъпка.

## Част 2 — Чеклист за Google Ads UI (правиш ти)

Най-честите причини за 0 импресии при Eligible кампания, които са **само в Ads панела** и не могат да се фиксат от кода:

### A. Бюджет и наддаване
- [ ] Дневен бюджет достатъчен за таргетирания пазар (за Варна: минимум €5–10/ден за Search)
- [ ] Стратегия за наддаване: ако е **Maximize Conversions** — има ли изобщо натрупани конверсии за обучение? В новите акаунти често трябва да се стартира с **Manual CPC** или **Maximize Clicks** за първите 2 седмици
- [ ] Ако е Target CPA / Target ROAS — цел, която е нереалистично ниска, спира показването

### B. Ключови думи и Ad Rank
- [ ] Ключовите думи имат ли статус „Rarely shown due to low quality score" / „Below first page bid"?
- [ ] Ако всички са **Exact match** и с ниски search volumes → малко импресии. Пусни поне 1 ad group с **Phrase match**
- [ ] Провери **Auction Insights** — има ли изобщо аукциони, в които участваш?

### C. Таргетиране
- [ ] Локация: „People **in** or regularly in your targeted locations" (не „interested in") — иначе не таргетираш реално Варна
- [ ] Language: включен **Български** И **Английски** (много Chrome-и в БГ имат EN default)
- [ ] Ad Schedule: не е ли ограничено само до определени часове?
- [ ] Device bid adjustments: няма ли -100% на mobile/desktop случайно?

### D. Обяви и активи
- [ ] Обявите статус **Approved** (не Under review, не Disapproved)? Отхвърлена обява → 0 импресии, дори кампанията да е Eligible
- [ ] Минимум 2 обяви на ad group + поне 4 sitelinks / callouts / structured snippets
- [ ] Final URL съвпада с показвания display URL домейн

### E. Плащане и акаунт
- [ ] Payment method валиден, няма отхвърлено плащане
- [ ] Акаунтът не е под review за billing/policy verification (в горния десен ъгъл има ⚠️)
- [ ] Ако е нов Google Ads акаунт → **първите 24–72ч** често има забавяне преди първи impressions

### F. Полезни диагностични изгледи в Ads UI
1. **Campaigns → Overview → Recommendations** — Google явно казва какво липсва
2. **Keywords → Status column** — ако е сиво „Eligible (Limited)" → hover-ни за причина
3. **Ads → Policy details** — за отхвърлени обяви
4. **Tools → Troubleshooter „Why are my ads not showing?"** — вграден wizard на Google

## Deliverables

1. Кратък technical audit report в чата (какво е намерено в сайта, какво е поправено)
2. Този чеклист по-горе като reference, който можеш да следваш в Ads UI
3. Ако след технически фикс проблемът е само в Ads UI — ясно го казвам, за да не търсим бъгове в кода
