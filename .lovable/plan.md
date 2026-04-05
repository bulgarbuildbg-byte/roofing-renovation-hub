

## Fix Language System on Service Pages

### Root Cause
All 9 service pages (6,200 lines total) have **every string hardcoded in Bulgarian**. They don't use `useTranslation()` or `useLocalizedPath()`. When a user switches language, the URL changes correctly but the page content stays in Bulgarian.

Two distinct problems:
1. **Content not translated** — pages render Bulgarian regardless of active language
2. **Internal links hardcoded** — links like `href="/хидроизолация"` don't use language prefix, breaking navigation

### Affected Pages
| Page | Lines | File |
|------|-------|------|
| FlatRoofPage | 741 | `src/pages/services/FlatRoofPage.tsx` |
| WaterproofingVarnaPage | 792 | `src/pages/services/WaterproofingVarnaPage.tsx` |
| NewRoofPage | 710 | `src/pages/services/NewRoofPage.tsx` |
| MetalRoofPage | 680 | `src/pages/services/MetalRoofPage.tsx` |
| TileReplacementPage | 680 | `src/pages/services/TileReplacementPage.tsx` |
| MaintenancePage | 679 | `src/pages/services/MaintenancePage.tsx` |
| RoofLeakRepairPage | 665 | `src/pages/services/RoofLeakRepairPage.tsx` |
| WaterproofingPage | 644 | `src/pages/services/WaterproofingPage.tsx` |
| RoofRepairPage | 600 | `src/pages/services/RoofRepairPage.tsx` |

### Plan (per page)

1. **Extract all Bulgarian text strings** into translation keys under a new `pages.{serviceName}` namespace in each locale file
2. **Add `useTranslation()` and `useLocalizedPath()`** hooks to each page component
3. **Replace all hardcoded strings** with `t('pages.serviceName.keyName')` calls
4. **Fix internal links** — replace hardcoded paths like `"/хидроизолация"` with `getPath('waterproofing')`
5. **Add translations** to all 10 locale files (bg, en, de, fi, sv, no, fr, nl, ru, ua)

### Scope and Approach
Given the scale (~6,200 lines across 9 pages, 10 languages), this will be done in batches of 2-3 pages per iteration. Each page has roughly 80-120 unique text strings that need extraction.

**Batch 1:** RoofRepairPage + RoofLeakRepairPage (smallest, ~1,265 lines)
**Batch 2:** WaterproofingPage + NewRoofPage (~1,354 lines)
**Batch 3:** TileReplacementPage + MetalRoofPage (~1,360 lines)
**Batch 4:** FlatRoofPage + MaintenancePage (~1,420 lines)
**Batch 5:** WaterproofingVarnaPage (~792 lines)

### Files Changed
- `src/pages/services/*.tsx` — all 9 service pages (add hooks, replace hardcoded text and links)
- `src/i18n/locales/bg.ts` — add `pages.*` keys with existing Bulgarian text
- `src/i18n/locales/en.ts` — English translations
- `src/i18n/locales/de.ts` — German translations
- `src/i18n/locales/fi.ts` — Finnish translations
- `src/i18n/locales/sv.ts` — Swedish translations
- `src/i18n/locales/no.ts` — Norwegian translations
- `src/i18n/locales/fr.ts` — French translations
- `src/i18n/locales/nl.ts` — Dutch translations
- `src/i18n/locales/ru.ts` — Russian translations
- `src/i18n/locales/ua.ts` — Ukrainian translations

