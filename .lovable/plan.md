

## Преструктуриране на страница „Ремонт на покриви" + смяна на снимки в карусела с услуги

### Обхват

Две основни промени:

**А. Преструктуриране на RoofRepairPage.tsx** — нова подредба на секциите по модела на началната страница.

**Б. Смяна на снимките в Services.tsx** — карусела навсякъде да използва hero снимките вместо отделните service снимки.

---

### А. Нов ред на секциите в `src/pages/services/RoofRepairPage.tsx`

Текущ ред: Hero → Problem → Consequences → Solution → Process (4-step) → Mid CTA → Calculator → Service Details → Services List → Materials → Pricing → Trust → Areas → FAQ → Final CTA → Links → Related

**Нов ред:**

1. **Hero** (без промяна)
2. **TrustIndicators** — импорт на компонента от началната страница
3. **CertificationsBar** — импорт на компонента от началната страница
4. **Services** (карусел) — импорт на компонента от началната страница
5. **HowWeWork** — импорт на компонента от началната страница (заменя текущата compact 4-step секция)
6. **Problem** (текущата секция „Какви проблеми решаваме")
7. **Consequences** (текущата „Какво се случва, ако проблемът се отложи")
8. **Solution** (текущата „Как решаваме проблема")
9. **Mid CTA блок** — „Имате проблем с покрива?" с бутони „Заявете безплатен оглед" и „Обадете се"
10. **PriceCalculator** — преместен по-нагоре (преди подробния процес)
11. **Service Details** (6-стъпков процес със снимки)
12. **Services List** / **Materials** / **Pricing** / **Trust** / **Areas** / **FAQ**
13. **Final CTA** → Links → Related

Премахва се дублиращата „Как работим" compact секция (ред 299-317), тъй като се заменя с пълния HowWeWork компонент.

---

### Б. Смяна на снимки в `src/components/Services.tsx`

Заменяме import-ите от `src/assets/services/` с hero снимките за 6-те услуги (без Поддръжка и Метални покриви, тези остават със старите снимки):

| Услуга | Стара снимка | Нова снимка |
|---|---|---|
| Ремонт на покриви | `services/roof-repair.jpg` | `hero-roof-repair.jpg` |
| Хидроизолация | `services/waterproofing.jpg` | `hero-waterproofing.jpeg` |
| Нов покрив | `services/new-roof.jpg` | `hero-new-roof.jpg` |
| Смяна на керемиди | `services/tile-replacement.jpg` | `hero-tile-replacement.jpg` |
| Ремонт на теч | `services/leak-repair.jpg` | `hero-leak-repair.jpg` |
| Плоски покриви | `services/flat-roof.jpg` | `hero-flat-roof.jpeg` |
| Метални покриви | остава `services/metal-roof.jpg` | без промяна |
| Поддръжка | остава `services/maintenance.jpg` | без промяна |

---

### Технически детайли

| Файл | Промяна |
|---|---|
| `src/pages/services/RoofRepairPage.tsx` | Импорт на TrustIndicators, CertificationsBar, Services, HowWeWork; преподреждане на секциите; премахване на compact process секция |
| `src/components/Services.tsx` | Смяна на 6 import пътища от `services/` към `hero-` снимки |

