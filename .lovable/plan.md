
# Audit Fixes (без изображения)

## 1. Replace abv.bg email globally (E-E-A-T fix)
Replace all 24 instances of `remontnapokrivivarna@abv.bg` with `office@bulgarbuild.com` across 17 files:
- `src/components/Footer.tsx` (2)
- `src/components/Contact.tsx` (2)
- `src/i18n/cities.ts` (4)
- `src/pages/InspectionPage.tsx` (3)
- 11 service/page files (1 each)

## 2. Reduce H2/H3 heading inflation on homepage

Homepage currently has **15 H2** and **37 H3**. Target: 5-6 H2, <15 H3.

Components on homepage contributing H2 tags:
- Services (1 H2) -- keep
- HowWeWork (1 H2) -- keep
- Testimonials (1 H2) -- keep
- WhyChooseUs (1 H2) -- keep
- HomeFAQ (1 H2) -- keep
- Contact (1 H2) -- keep
- About (1 H2) -- change to `<p>` styled as heading (not critical section)
- CTASection x3 (3 H2) -- change to `<p>` styled as heading (promotional, not semantic)
- PriceCalculator (1 H2) -- keep
- SolarCalculator (1 H2) -- keep (separate page too)
- CompletedProjects (1 H2) -- change to `<p>` (similar to Testimonials)
- Gallery (1 H2) -- change to `<p>` (duplicate of CompletedProjects concept)
- BeforeAfterGallery (1 H2) -- change to `<p>` (visual gallery, not key section)

H3 reductions:
- CompletedProjects project titles (h3 -> p)
- Gallery project titles (h3 -> p)
- Contact info labels (h3 -> p)
- BeforeAfterGallery titles (h3 -> p)
- HowWeWork step titles -- keep (semantic sub-items)

**Result:** ~7 H2, ~15 H3

## 3. Sync OG meta -- already done
The warranty was already fixed to 15г across all locales in the previous session. LocalBusiness schema already uses `office@bulgarbuild.com`. This step is complete.

## Files to edit
- `src/components/CTASection.tsx` -- h2 -> p
- `src/components/About.tsx` -- h2 -> p
- `src/components/CompletedProjects.tsx` -- h2,h3 -> p
- `src/components/Gallery.tsx` -- h2,h3 -> p
- `src/components/BeforeAfterGallery.tsx` -- h2,h3 -> p
- `src/components/Contact.tsx` -- h3 -> p (info labels)
- Global sed for email replacement across 17 files
