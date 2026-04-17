

## План: Замяна на SVG картата с реална снимка на България

### Подход
Потребителят е качил професионална релефна карта на България (`bg_map.PNG`) с цветни pins за 4-те активни града (Варна, Бургас, Русе, Добрич) и 2-те "скоро" градове (София, Пловдив). Заменям текущия inline SVG в `CitiesHubPage.tsx` с тази снимка.

### Стъпки

**1. Копирам изображението в `src/assets/`**
- `user-uploads://бг_мап.PNG` → `src/assets/bulgaria-map.png`
- ES6 import в компонента (по стандарт на проекта)

**2. `src/pages/CitiesHubPage.tsx` — замяна на SVG секцията**
- Премахвам inline SVG (~120 реда — outline path, river, sea, pins)
- Заменям с `<img src={bulgariaMap} alt="Карта на България — обслужвани градове" />`
- Запазвам контейнера: `relative aspect-[16/9] rounded-2xl overflow-hidden border-2 border-border shadow-2xl bg-card`
- Premium стилизация: subtle gradient overlay отгоре + долу за дълбочина (опционално, само ако подобрява четимостта)
- Картата вече съдържа цветни pins и имена на градовете → не са нужни overlay pins

**3. SEO / accessibility**
- `alt` text: "Карта на България с обслужвани градове: Варна, Бургас, Русе, Добрич"
- `loading="lazy"` за performance
- Запазвам JSON-LD (BreadcrumbList + ItemList) непроменено

### Засегнати файлове (2)

| # | Файл | Промяна |
|---|------|---------|
| 1 | `src/assets/bulgaria-map.png` | нов файл (копирано от user upload) |
| 2 | `src/pages/CitiesHubPage.tsx` | премахнат inline SVG, добавен `<img>` с реалната карта |

### Резултат

✅ Cities Hub показва професионална релефна карта с реален географски силует на България  
✅ Pins за всички 4 активни града + 2 "скоро" — вече са вградени в изображението  
✅ Премахва ~120 реда inline SVG код → по-чист компонент  
✅ Запазва се целият останал layout (cards секция, CTA, breadcrumbs)

