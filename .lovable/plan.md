

## Мобилни визуални подобрения — начална страница

### 1. Езиков бутон: видим само преди скрол, после — в менюто

**Файлове:** `src/components/MobileBottomBar.tsx`, `src/components/Header.tsx`

**MobileBottomBar.tsx:**
- Добавяне на `isScrolled` state (слушател за scroll > 100px)
- Когато `isScrolled === true`, LanguageSwitcher се скрива от bottom bar
- Когато е скрит, двата бутона (Обадете се / Безплатен оглед) заемат цялата ширина

**Header.tsx (MobileMenu):**
- LanguageSwitcher вече е в менюто (ред 72-74). Ще го преместим по-нагоре — непосредствено под „Услуги" секцията, за да е по-видим.

---

### 2. Hero бутони — по-добро разпределение на място

**Файл:** `src/components/Hero.tsx`

- Бутон „088 499 7659" — намаляване на `px-6` на `px-4` и `h-14` на `h-12` на мобилен
- Бутон „Заявете Безплатен Оглед" — леко увеличение на `px` и гарантиране, че текстът е на един ред с `whitespace-nowrap`

---

### 3. Лента „Част от България Билд ЕООД" — по-компактна на мобилен

**Файл:** `src/components/CertificationsBar.tsx`

- Текстът е грешен — „България Билд ЕООД" вместо „Булгар Билд ЕООД". Ще се поправи в `src/i18n/locales/bg.ts`
- Намаляване на `py-4` на `py-2` за секцията на мобилен
- Намаляване на текста от `text-sm` на `text-xs` на мобилен
- Иконите от `w-6 h-6` на `w-5 h-5` на мобилен
- По-малък padding: `py-2 px-2` вместо `py-3 px-4` на мобилен

---

### 4. Лента с лога — без застъпване

**Файл:** `src/components/BrandCarousel.tsx`

- Увеличаване на `px-6` на `px-8` за мобилен (повече разстояние между логата)
- Намаляване на `max-h-12` на `max-h-9` и `max-w-[140px]` на `max-w-[100px]` на мобилен
- Responsive класове: `px-5 md:px-10` и `max-h-9 md:max-h-12 max-w-[100px] md:max-w-[140px]`

---

### 5. Карусел „Нашите услуги" — peek ефект и видими стрелки

**Файл:** `src/components/Services.tsx`

- Промяна на `basis-full` на `basis-[85%]` за мобилен — така от дясно се вижда част от следващата карта (peek ефект)
- Намаляване на `px-12` на `px-4` за мобилен, за да има повече видима площ
- Стрелки: увеличаване на мобилен от `w-10 h-10` на `w-9 h-9`, промяна на позиция от `left-0`/`right-0` на `left-0`/`right-0` с `bg-primary text-white shadow-xl` за по-висок контраст
- Намаляване на fade ефекта: от `w-8` на `w-4` на мобилен за да не скрива толкова
- Добавяне на визуален „swipe" индикатор — малки dot indicators под каросела

### Технически детайли

| Файл | Промяна |
|---|---|
| `src/components/MobileBottomBar.tsx` | Scroll listener, условно показване на LanguageSwitcher |
| `src/components/Header.tsx` | Преместване на LanguageSwitcher по-нагоре в мобилното меню |
| `src/components/Hero.tsx` | Responsive padding за бутоните |
| `src/components/CertificationsBar.tsx` | По-компактни мобилни размери |
| `src/i18n/locales/bg.ts` | Поправка „България Билд" → „Булгар Билд" |
| `src/components/BrandCarousel.tsx` | По-голямо разстояние, по-малки лога на мобилен |
| `src/components/Services.tsx` | Peek ефект (basis-[85%]), по-контрастни стрелки, по-малък fade |

