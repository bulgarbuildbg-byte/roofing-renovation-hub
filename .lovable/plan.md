## Връщане на домейна в sitemap-ите

Вашият реален домейн е `www.remontnapokrivivarna.bg`, а не препоръчания от SEO скенера `remont-roof-pros.lovable.app`. Ще върна обратно правилния домейн.

### Промени
- Замяна на `https://remont-roof-pros.lovable.app` с `https://www.remontnapokrivivarna.bg` във:
  - `public/sitemap.xml` (индекс)
  - `public/sitemap-bg.xml`, `-en.xml`, `-de.xml`, `-fi.xml`, `-sv.xml`, `-no.xml`, `-fr.xml`, `-nl.xml`, `-ru.xml`, `-ua.xml`
  - `public/robots.txt`
- SEO finding `http:sitemap` ще бъде игнорирано/маркирано — препоръката на скенера е грешна за вашия случай, защото имате собствен домейн.

Ще използвам единичен `sed` за бърза глобална подмяна и ще верифицирам с `rg`.
