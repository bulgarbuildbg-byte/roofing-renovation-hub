

## Смяна на марките в секцията "Работим с водещи световни производители"

### Какво ще се направи

Замяна на текущите 12 марки с 14 нови. Всяко лого ще бъде кликваемо и ще отваря сайта на производителя в нов таб.

### Нови марки

| Марка | URL |
|---|---|
| VELUX | velux.bg |
| Icopal | bmigroup.com/icopal |
| Bramac | bramac.bg |
| Tondach | wienerberger.bg/produkty/tondach.html |
| Sika | bul.sika.com |
| Rockwool | rockwool.com/bg |
| TechnoNICOL | technonicol.bg |
| Bilka | bilka.bg |
| Kebe | kebe.gr |
| Ceresit | ceresit.bg |
| Austrotherm | austrotherm.bg |
| Fibran | fibran.bg |
| Wienerberger | wienerberger.bg |
| Weber | bg.weber |

### Промени по файлове

**1. `src/assets/brands/` — нови SVG логота**
- Създаване на SVG placeholder файлове за всяка нова марка (velux, rockwool, technonicol, bilka, kebe, ceresit, austrotherm, fibran, wienerberger, weber)
- Запазване на съществуващите: bramac.svg, tondach.svg, sika.svg, icopal.svg
- Изтриване на неизползваните: bauder.svg, bmi.svg, braas.svg, creaton.svg, dorken.svg, fakro.svg, onduline.svg, vedag.svg

**2. `src/components/BrandCarousel.tsx`**
- Обновяване на `allBrands` масива с 14-те нови марки, всяка с `url` поле
- Обвиване на всяко лого в `<a href={brand.url} target="_blank" rel="noopener noreferrer">` за кликване към сайта
- Добавяне на `cursor-pointer` стил при hover

### Техническа бележка
SVG placeholder-ите ще съдържат текстово лого (името на марката). Ако имате официални лого файлове, те могат да бъдат заменени по-късно.

