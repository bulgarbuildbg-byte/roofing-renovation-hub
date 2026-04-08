

## Смяна на логото — използване на 3 формата

### Какво ще се направи

Замяна на текущото `src/assets/logo.png` с трите нови версии на логото и използването им в правилния контекст.

### Файлове с ново лого (копиране от upload)

| Upload | Дестинация | Употреба |
|---|---|---|
| `Horizontal_Compact_Logo_Slim_Version.jpeg` | `src/assets/logo-horizontal.jpeg` | Header навигация (основно лого в сайта) |
| `Primary_Logo_Main_Version.jpeg` | `src/assets/logo-primary.jpeg` | Footer, Admin pages, маркетингови секции |
| `Square_Logo_Icon_Version.jpeg` | `src/assets/logo-square.jpeg` | Favicon (`public/favicon.png`), OG image fallback |

### Промени по файлове

**1. `src/components/Header.tsx`**
- Замяна на `import logo from "@/assets/logo.png"` с `import logo from "@/assets/logo-horizontal.jpeg"`
- Компактната хоризонтална версия е идеална за навигационната лента

**2. `src/components/Footer.tsx`**
- Замяна на `import logo from "@/assets/logo.png"` с `import logo from "@/assets/logo-primary.jpeg"`
- Footer-ът има достатъчно пространство за пълната версия на логото
- Премахване на `brightness-0 invert` филтъра, тъй като новото лого вече има подходящи цветове

**3. `src/pages/admin/AdminLoginPage.tsx`**
- Замяна с `logo-primary.jpeg`

**4. `src/pages/admin/AdminDashboardPage.tsx`**
- Замяна с `logo-horizontal.jpeg` (dashboard sidebar е компактно пространство)

**5. `public/favicon.png`**
- Генериране на favicon от квадратната версия на логото (resize до 32x32 и 180x180 за apple-touch-icon)

### Какво не се променя
- Routing, i18n, SEO schema markup — без промени
- Старият `src/assets/logo.png` ще бъде запазен за обратна съвместимост, но няма да се използва

