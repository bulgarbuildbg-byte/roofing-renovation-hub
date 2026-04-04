

## Fix: Multilingual hreflang and canonical tags

### Problem
Google is flagging 84 translated pages as duplicates because:

1. **Hardcoded canonical URLs in every page** — All 25+ page components include their own `<link rel="canonical" href="...bg/...">` via `<Helmet>`, always pointing to the Bulgarian URL. When a Dutch user visits `/nl/diensten`, the canonical still says `remontnapokrivivarna.bg/bg/services` (or similar), telling Google "this is a duplicate of the BG page."

2. **Some pages have duplicate canonical tags** — e.g. `RoofRepairPage`, `MaintenancePage`, `MetalRoofPage` each emit TWO canonical links (one with `/bg/` prefix, one without), confusing Google further.

3. **The `HreflangTags` component works correctly** — it already generates proper hreflang alternates for all 10 languages. But the page-level hardcoded canonicals override its dynamic canonical, breaking the signal.

### Solution

**Remove all hardcoded `<link rel="canonical">` tags from individual page components.** The `HreflangTags` component (rendered by `LanguageLayout` on every page) already sets the correct canonical dynamically based on the current URL. Having page-level canonicals override it is the root cause.

Additionally, update the `Index.tsx` canonical which hardcodes `/bg` regardless of language.

### Files to Edit (remove `<link rel="canonical" .../>` lines)

All 25 files containing hardcoded canonicals:

- `src/pages/Index.tsx` — remove hardcoded canonical
- `src/pages/AboutPage.tsx`
- `src/pages/BlogPage.tsx`
- `src/pages/ContactPage.tsx`
- `src/pages/FAQPage.tsx`
- `src/pages/ProjectsPage.tsx`
- `src/pages/ReviewsPage.tsx`
- `src/pages/CalculatorPage.tsx`
- `src/pages/ServicesPage.tsx`
- `src/pages/services/RoofRepairPage.tsx` — also remove duplicate canonical
- `src/pages/services/RoofLeakRepairPage.tsx`
- `src/pages/services/WaterproofingPage.tsx`
- `src/pages/services/WaterproofingVarnaPage.tsx`
- `src/pages/services/NewRoofPage.tsx`
- `src/pages/services/TileReplacementPage.tsx`
- `src/pages/services/FlatRoofPage.tsx`
- `src/pages/services/MetalRoofPage.tsx` — also remove duplicate canonical
- `src/pages/services/MaintenancePage.tsx` — also remove duplicate canonical
- `src/pages/blog/SpringInspection.tsx`
- `src/pages/blog/CommonMistakes.tsx`
- `src/pages/blog/WaterproofingTypes.tsx`
- `src/pages/blog/WinterRoofPreparation.tsx`
- `src/pages/blog/RoofRepairSigns.tsx`
- `src/pages/blog/ChoosingTiles.tsx`
- `src/pages/blog/DynamicArticle.tsx`

### What stays unchanged
- `src/components/HreflangTags.tsx` — already correct: dynamically sets canonical to current URL and generates all 10 hreflang alternates + x-default
- `src/components/LanguageLayout.tsx` — already renders `HreflangTags` on every page

### Result
After this change, every page in every language will have:
- A canonical pointing to itself (e.g. `/nl/diensten` canonical = `https://www.remontnapokrivivarna.bg/nl/diensten`)
- hreflang alternates for all 10 languages
- `x-default` pointing to `/bg`

Google will recognize all translations as valid alternates rather than duplicates.

