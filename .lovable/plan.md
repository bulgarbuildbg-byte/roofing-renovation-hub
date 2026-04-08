

## Три подобрения за страницата за безплатен оглед

### 1. Линк в навигацията и Hero секцията

**`src/components/Header.tsx`:**
- Desktop: Бутонът "Безплатен оглед" (ред 282-294) вместо да скролва към `#contact`, ще навигира към `/bg/безплатен-оглед` чрез `Link` с `getPath('inspection')`
- Mobile Menu: Бутонът "Безплатен оглед" (ред 88-93) — също ще линква към inspection страницата
- Full Menu Panel: Добавяне на линк "Безплатен оглед" между "Контакти" и разделителя

**`src/components/Hero.tsx`:**
- Първият CTA бутон "Заявете безплатен оглед" (ред 57-63) — вместо `scrollToContact`, ще бъде `Link` към `getPath('inspection')`
- Ще използва `useLocalizedPath` hook

### 2. Schema.org Service markup за InspectionPage

**`src/pages/InspectionPage.tsx`:**
- Добавяне на `Service` schema с `serviceType: "Roof Inspection"`, `areaServed`, `provider`, `offers` (безплатно)
- Добавяне на `BreadcrumbList` schema (Начало → Безплатен Оглед)

### 3. Open Graph мета тагове

**`src/pages/InspectionPage.tsx`:**
- `og:title`, `og:description`, `og:type: website`, `og:url` (динамично по език)
- `og:image` (същия og-image.jpg)
- `twitter:card`, `twitter:title`, `twitter:description`
- `robots: index, follow`
- `canonical` URL

### Файлове за промяна
- `src/components/Header.tsx` — линкове към inspection
- `src/components/Hero.tsx` — CTA бутон линк
- `src/pages/InspectionPage.tsx` — Schema.org + OG tags

