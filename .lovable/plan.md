

## Преструктуриране на TileReplacementPage за Google Ads конверсия

### Текущ ред на секциите
1. Hero → 2. Problem (Кога е необходима) → 3. Consequences → 4. Solution → 5. HowWeWork → 6. Mid CTA → 7. Calculator → 8. Tile Types → 9. Detailed Process → 10. Pricing → 11. Why Choose Us → 12. Service Areas → 13. FAQ → 14. Final CTA + LearnMoreLinks + RelatedServices

### Нов ред (конверсионен)
1. **Hero** (без промяна)
2. **Как решаваме проблема** — съкратен до bullet points + CTA бутон
3. **Портфолио carousel** — import `CompletedProjects` от началната страница + CTA
4. **Защо да изберете нас** (benefits) — преместена нагоре
5. **Процес на смяна на керемиди** (6-стъпков с снимки)
6. **Цялостна смяна на керемиди** — съкратен текст (3-4 реда макс, от `services` масива)
7. **Нова секция Цени** — само 3 реда (частична/пренареждане/пълна) + 1 изречение + CTA
8. **Отзиви** — import `Testimonials` от началната страница
9. **PriceCalculator**
10. **Видове керемиди** (tile types)
11. **Кога е необходима смяна** (problem) + **Какво се случва ако се отложи** (consequences) — преместени надолу
12. **Факти и доверие** — нова секция (гаранции, материали, КСБ) + CTA
13. **FAQ**
14. **Финален CTA** (CTASection — форма + телефон)

### Промени
- Премахване на `LearnMoreLinks` и `RelatedServices` (без външни линкове)
- Премахване на `HowWeWork` компонента (заменен от detailed process)
- Премахване на Service Areas секцията (или преместване в самия край преди FAQ)
- Добавяне на `import CompletedProjects` и `import Testimonials`
- Нова inline секция „Цени" с 3 реда от `priceRanges` (единична, частична, пълна)
- Нова inline секция „Факти и доверие" с trust badges
- Минимум 4 CTA бутона разпределени в секциите

### Засегнат файл

| Файл | Промяна |
|---|---|
| `src/pages/services/TileReplacementPage.tsx` | Пълно пренареждане на секциите + нови секции + съкращаване на текстове |

