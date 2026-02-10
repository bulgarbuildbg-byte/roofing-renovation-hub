

# SEO Audit and Sitemap Update Plan

## Issues Found

### 1. Sitemap - Outdated lastmod dates
All URLs show `2026-01-14` but the site has been actively updated. The `/калкулатор` page exists in routes but is missing proper dating.

### 2. Sitemap - Missing the `/калкулатор` page
The calculator page IS in the sitemap already - good. But the `lastmod` dates should be updated to `2026-02-10`.

### 3. Domain inconsistency (CRITICAL)
- **Sitemap and robots.txt** use: `remontnapokrivivarna.bg`
- **Canonical URLs in pages** use: `remontnapokrivivarna.com`
- This confuses search engines. All URLs must use one consistent domain.

### 4. `index.html` - Wrong `lang` attribute
Currently `lang="en"` but the site is entirely in Bulgarian. Should be `lang="bg"`.

### 5. `index.html` - Generic OG image
OG image points to `lovable.dev/opengraph-image-p98pqg.png` instead of a branded image. Same for Twitter card image and `twitter:site` says `@Lovable`.

### 6. ServicesPage canonical URL mismatch
The canonical says `/услуги` but the actual route is `/services`. This is a mismatch that hurts SEO.

### 7. Missing `og:url` on most pages
Pages have `og:title`, `og:description`, `og:type` but no `og:url` meta tag.

### 8. Phone number inconsistency
- Index page schema: `+359892701176` (089 270 1176)
- Header/Footer/Contact: `0884997659` (088 499 7659)
- About page schema: `+359884997659`
- Two different phone numbers used across the site

---

## Changes to Make

### File 1: `public/sitemap.xml`
- Update all `lastmod` dates to `2026-02-10`
- Fix domain: use `remontnapokrivivarna.bg` consistently (matching robots.txt)

### File 2: `index.html`
- Change `lang="en"` to `lang="bg"`
- Remove `twitter:site` pointing to `@Lovable`
- Update OG image and Twitter image to use the site's own branding (or remove the Lovable placeholder)

### File 3: `src/pages/Index.tsx`
- Fix canonical URL domain from `.com` to `.bg`
- Fix all service URLs in schema from `.com` to `.bg`

### File 4: `src/pages/ServicesPage.tsx`
- Fix canonical from `/услуги` to `/services` (matching actual route)
- Fix domain from `.com` to `.bg`

### File 5: `src/pages/AboutPage.tsx`
- Fix canonical and schema URL domain from `.com` to `.bg`

### File 6: `src/pages/ContactPage.tsx`
- Fix canonical and schema URL domain from `.com` to `.bg`

### File 7: `src/pages/ReviewsPage.tsx`
- Fix canonical URL domain from `.com` to `.bg`

### File 8: `src/pages/CalculatorPage.tsx`
- Fix canonical URL domain from `.com` to `.bg`

### File 9: `src/pages/BlogPage.tsx` (if it has canonical)
- Fix domain

### File 10: All service subpages (`RoofRepairPage`, `WaterproofingPage`, etc.)
- Fix canonical URL domains from `.com` to `.bg`

---

## Summary of SEO Improvements

| Issue | Impact | Fix |
|-------|--------|-----|
| Domain mismatch (.com vs .bg) | HIGH - confuses Google indexing | Unify all to `.bg` |
| `lang="en"` on Bulgarian site | HIGH - wrong language signal | Change to `lang="bg"` |
| Lovable branding in OG/Twitter | MEDIUM - unprofessional sharing | Remove/replace |
| ServicesPage wrong canonical | MEDIUM - points to non-existent URL | Fix to `/services` |
| Outdated sitemap dates | LOW - signals stale content | Update to current date |
| Phone number inconsistency | MEDIUM - confuses schema validation | Standardize across site |

