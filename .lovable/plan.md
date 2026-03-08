
## Performance Optimization Plan

### What's Slow — Root Cause Analysis

After reviewing the full codebase, here are the main bottlenecks:

**1. All 10 language bundles loaded eagerly on every page visit**
`src/i18n/config.ts` imports all 10 locale files (bg, en, de, fi, sv, no, fr, nl, ru, ua) synchronously at app startup. 95%+ of visitors only need Bulgarian (bg). Every visitor downloads all 10 translations unnecessarily.

**2. No code splitting — entire app in one JS chunk**
`src/App.tsx` imports 20+ admin pages, all service pages, and all blog pages as static imports. Vite will bundle everything together, so even a visitor to the homepage downloads the ArticleEditorPage, ContractEditorPage, AdminDashboardPage, etc.

**3. Homepage loads too many components eagerly**
`src/pages/Index.tsx` renders 15+ heavy sections all at once: Gallery (6 images), BeforeAfterGallery, PriceCalculator, HomeFAQ, Testimonials, BrandCarousel, WhyChooseUs — none deferred with `React.lazy` or intersection observer.

**4. Hero image not preloaded**
`hero-roofing-new.png` is set as a CSS `backgroundImage` inside inline style, which means the browser only discovers it during CSS parsing, not during initial HTML scan. The hero is the LCP element — this is a critical delay.

**5. All service/blog page images imported eagerly**
Service pages like `NewRoofPage.tsx` import 6 local images at the top of the file even when users aren't on that page.

**6. No font preloading / no resource hints**
`index.html` has no `<link rel="preconnect">` or `<link rel="preload">` for fonts and critical assets.

**7. `scroll-behavior: smooth` on `html` element**
Global smooth scroll set in CSS causes jank on low-end mobile devices during navigation.

---

### What Will Be Changed (Zero SEO Compromise)

**A. Lazy-load all routes in App.tsx with React.lazy + Suspense**
Convert all `import X from "..."` to `const X = lazy(() => import(...))` for every page EXCEPT `Index`, `NotFound`, `AdminLoginPage`, and `ProtectedRoute`. This is pure code-splitting — no SEO impact since the HTML content is still server-renderable and all routes are still accessible. Admin pages (~40% of the bundle) deferred entirely.

**B. Lazy-load i18n locales — only load `bg` eagerly, others on demand**
Restructure `src/i18n/config.ts` to eager-load only `bg`, then use dynamic `import()` for the other 9 languages triggered by `i18n.changeLanguage()`. This uses i18next's `backend` pattern with a custom backend resolver (no new package needed — just dynamic imports). Saves ~60-80KB on initial load for Bulgarian users.

**C. Lazy-load below-the-fold homepage sections**
Wrap the following sections in `React.lazy` + `Suspense` in `Index.tsx`:
- `Gallery`, `BeforeAfterGallery`, `PriceCalculator`, `HomeFAQ`, `ChatBot`

Above-fold sections (Header, Hero, TrustIndicators, Services, BrandCarousel, Testimonials, CTASection) stay eagerly loaded to ensure fast LCP.

**D. Preload the hero image in index.html**
Add `<link rel="preload" as="image" href="/src/assets/hero-roofing-new.png">` — or better, move the hero image reference to a proper `<img>` tag with `fetchpriority="high"` in `Hero.tsx`. This directly improves LCP score.

**E. Add resource hints to index.html**
Add `<link rel="preconnect" href="https://vpsbqrxrjrwjmttnptfr.supabase.co">` and `<link rel="dns-prefetch">` for the Supabase domain. This reduces connection latency for the first Supabase request (testimonials, analytics).

**F. Add `loading="lazy"` and explicit `width`/`height` to all gallery images**
Gallery.tsx, BeforeAfterGallery.tsx — images currently have no `loading="lazy"` and no explicit dimensions, causing layout shift (CLS).

**G. Remove global `scroll-behavior: smooth` from html in CSS**
Replace with JS-only smooth scroll (already used in components). Global CSS smooth scroll causes input lag on mobile.

---

### Files to Change

```text
src/App.tsx                    — lazy() all page imports
src/i18n/config.ts             — lazy-load non-bg locales
src/pages/Index.tsx            — lazy() below-fold sections
src/components/Hero.tsx        — use <img fetchpriority="high"> instead of CSS background
src/components/Gallery.tsx     — add loading="lazy" + dimensions
src/components/BeforeAfterGallery.tsx — add loading="lazy"
index.html                     — preconnect + dns-prefetch hints
src/index.css                  — remove scroll-behavior: smooth from html
```

### What is NOT changed
- All Helmet meta tags, JSON-LD schemas, canonical URLs — untouched
- All visible content and UI — untouched
- All service page content — untouched
- SEO heading structure — untouched
- No new dependencies added
