

## Обновяване на sitemap и robots.txt

### Промени

**1. `public/robots.txt`** — Добавяне на липсващите 6 езикови sitemaps (fi, sv, no, fr, nl, ua):

Текущо има само: sitemap.xml, sitemap-bg.xml, sitemap-en.xml, sitemap-de.xml, sitemap-ru.xml.
Ще се добавят: sitemap-fi.xml, sitemap-sv.xml, sitemap-no.xml, sitemap-fr.xml, sitemap-nl.xml, sitemap-ua.xml.

**2. `public/sitemap.xml`** — Обновяване на lastmod от `2026-04-08` на `2026-04-14`.

**3. `public/sitemap-bg.xml`** — Добавяне на 9 блог статии + WaterproofingVarnaPage:

| URL | Priority |
|---|---|
| `/bg/blog/tsena-remont-pokriv-varna-2026` | 0.8 |
| `/bg/blog/smyana-na-keremidi-cena-i-narachnik` | 0.8 |
| `/bg/blog/tech-ot-pokriva-prichini-i-reshenia` | 0.8 |
| `/bg/blog/poddruzhka-na-pokriv-rakovodstvo-2026` | 0.8 |
| `/bg/blog/5-priznaka-remont-na-pokriv` | 0.7 |
| `/bg/blog/vidove-hidroizolacia-narachnik` | 0.7 |
| `/bg/blog/izbor-na-keremidi-za-pokriv` | 0.7 |
| `/bg/blog/greshki-pri-remont-na-pokriv` | 0.7 |
| `/bg/blog/proletna-inspekcia-na-pokriva` | 0.7 |

Обновяване на lastmod на всички URL-и на `2026-04-14`.

### Засегнати файлове

| Файл | Промяна |
|---|---|
| `public/robots.txt` | +6 Sitemap реда |
| `public/sitemap.xml` | lastmod → 2026-04-14 |
| `public/sitemap-bg.xml` | +9 блог URL-и, lastmod update |

