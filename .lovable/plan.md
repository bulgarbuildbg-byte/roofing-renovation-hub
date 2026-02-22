

## Fix Language Switching -- Wire All Components to Use Translations

### Problem
The language switcher changes the URL (e.g., `/bg` to `/en`) and updates the i18n language internally, but every component (Hero, Services, About, Footer, Contact, etc.) has all text hardcoded in Bulgarian. None of them call `t('key')` from `useTranslation()`, so the visible content never changes.

### Solution
Update all major components to replace hardcoded Bulgarian strings with `t('key')` calls using `react-i18next`. Also update internal links to use the `useLocalizedPath` hook so navigation stays within the correct language prefix.

### Components to Update

**Homepage components:**
1. `src/components/Hero.tsx` -- hero title, subtitle, trust badges, CTA buttons
2. `src/components/Services.tsx` -- service cards (titles, descriptions, links)
3. `src/components/About.tsx` -- about section text
4. `src/components/WhyChooseUs.tsx` -- feature list and headings
5. `src/components/CTASection.tsx` -- call-to-action text
6. `src/components/Contact.tsx` -- form labels, placeholders, headings
7. `src/components/Footer.tsx` -- footer links, company info, copyright
8. `src/components/Testimonials.tsx` -- section heading, labels
9. `src/components/HomeFAQ.tsx` -- FAQ questions and answers
10. `src/components/Gallery.tsx` -- gallery section heading
11. `src/components/BeforeAfterGallery.tsx` -- labels
12. `src/components/TrustIndicators.tsx` -- trust badge text
13. `src/components/PriceCalculator.tsx` -- form labels, options
14. `src/components/MobileBottomBar.tsx` -- button labels
15. `src/components/FloatingCallButton.tsx` -- tooltip text

**Service pages** (8 pages):
16. `src/pages/services/RoofRepairPage.tsx`
17. `src/pages/services/RoofLeakRepairPage.tsx`
18. `src/pages/services/WaterproofingPage.tsx`
19. `src/pages/services/NewRoofPage.tsx`
20. `src/pages/services/TileReplacementPage.tsx`
21. `src/pages/services/FlatRoofPage.tsx`
22. `src/pages/services/MetalRoofPage.tsx`
23. `src/pages/services/MaintenancePage.tsx`

**Other pages:**
24. `src/pages/Index.tsx` -- meta tags, structured data
25. `src/pages/AboutPage.tsx`
26. `src/pages/BlogPage.tsx`
27. `src/pages/ContactPage.tsx`
28. `src/pages/FAQPage.tsx`
29. `src/pages/ProjectsPage.tsx`
30. `src/pages/ReviewsPage.tsx`
31. `src/pages/CalculatorPage.tsx`
32. `src/pages/ServicesPage.tsx`
33. `src/pages/NotFound.tsx`

### Technical Approach

**Pattern for each component:**
```
// Before:
const Hero = () => {
  return <h1>Ремонт на Покриви Варна</h1>;
};

// After:
import { useTranslation } from "react-i18next";
const Hero = () => {
  const { t } = useTranslation();
  return <h1>{t('hero.title')}</h1>;
};
```

**Pattern for links:**
```
// Before:
<Link to="/ремонт-на-покриви">...</Link>

// After:
import { useLocalizedPath } from "@/hooks/useLocalizedPath";
const { getPath } = useLocalizedPath();
<Link to={getPath('roofRepair')}>...</Link>
```

**Translation keys** are already defined in all 10 locale files (`src/i18n/locales/*.ts`). The components just need to reference them.

### Translation File Updates
The existing locale files may need additional keys for content not yet covered (service page details, FAQ answers, calculator options, etc.). These will be added as needed during implementation.

### Implementation Order
1. Start with the most visible components: Hero, Services, Footer, Header nav (already done)
2. Then homepage sections: About, WhyChooseUs, Contact, Testimonials, FAQ
3. Then service pages and other pages
4. Finally utility components: MobileBottomBar, FloatingCallButton, PriceCalculator

This is a large change touching 30+ files, but each change follows the same simple pattern: import `useTranslation`, replace hardcoded strings with `t()` calls, and update links with `useLocalizedPath`.
