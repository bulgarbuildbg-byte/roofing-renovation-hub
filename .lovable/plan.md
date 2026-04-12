

## Преструктуриране на RoofRepairPage за Google Ads конверсия

### Текущ ред
1. Hero → 2. TrustIndicators → 3. CertificationsBar → 4. Services (с цени) → 5. HowWeWork → 6. Problems → 7. Consequences → 8. Solution → 9. Mid CTA → 10. Calculator → 11. Detailed Process → 12. Services List → 13. Materials → 14. Pricing (отделна) → 15. Why Choose Us → 16. Service Areas → 17. FAQ → 18. Final CTA → LearnMoreLinks → RelatedServices

### Нов ред (конверсионен)
1. **Hero** (без промяна — два CTA бутона)
2. **TrustIndicators + CertificationsBar** (без промяна)
3. **Services carousel** (с цени в картичките — основна секция) + двоен CTA под нея
4. **CompletedProjects** (портфолио carousel от началната) + двоен CTA
5. **HowWeWork** (как работим)
6. CTA разделителна лента (`bg-slate-800`)
7. **Защо да изберете нас** (benefits + trust badges)
8. **„Получете точна цена"** — нова кратка секция с текст + двоен CTA
9. **Testimonials** (отзиви от началната)
10. **PriceCalculator**
11. CTA разделителна лента
12. **Detailed Process** (6-стъпков с снимки) — образователно
13. **Problems** + **Consequences** — образователно
14. **Materials** — образователно
15. **Факти и доверие** — нова секция (гаранции, опит, обекти, КСБ) + CTA
16. **FAQ**
17. **Финален CTA** (bg-primary)

### Какво се премахва
- Отделна секция „Pricing" (ред 401–418) — цените са в Services картичките
- Секция „Solution" (ред 286–309) — заменена от „Получете точна цена"
- Секция „Services List" (ред 359–374) — дублира Services carousel
- Service Areas (ред 447–479) — преместена в долната част или премахната
- `LearnMoreLinks` и `RelatedServices` — минимизиране на изходни точки

### Какво се добавя
- `import CompletedProjects` и `import Testimonials`
- Нова секция „Получете точна цена" — 2-3 реда текст + двоен CTA
- Нова секция „Факти и доверие" — 4 trust badges + CTA
- 2 CTA разделителни ленти между секциите
- Двойни CTA бутони (оглед + телефон) след Services, Portfolio, и в лентите

### Засегнат файл

| Файл | Промяна |
|---|---|
| `src/pages/services/RoofRepairPage.tsx` | Пълно пренареждане, нови секции, премахване на дублирани |

