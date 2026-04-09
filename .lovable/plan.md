

## Service Cards Price Badge + New Pricing Page

### Summary
Two changes: (1) convert the plain-text price on service cards into a clickable badge linking to a new pricing page, and (2) create that pricing page with hero, intro, pricing table, SEO content, internal links, and CTA.

### Part 1 — Price Badge on Service Cards

**File: `src/components/Services.tsx`**

Replace the current `<p className="text-primary font-bold text-sm mb-2">` price line (lines 107-111) with a clickable badge element:

- Style: `inline-flex` rounded pill with `bg-primary/10 text-primary border border-primary/20 font-bold text-sm px-3 py-1 rounded-full hover:bg-primary/20 transition-colors`
- Wrapped in a `<Link>` to the pricing page route (`getPath('pricing')`)
- `onClick={(e) => e.stopPropagation()}` to prevent the parent card link from firing
- Text: `{t('services.startingFrom')} {service.price}`

Move the disclaimer note (`priceNote`) to directly below the badge (keep existing styling).

Adjust prices to be more realistic for 2026:
- Roof Repair: **€15 / m²** (was €13)
- Waterproofing: **€10 / m²** (was €8)
- New Roof: **€32 / m²** (was €28)
- Metal Roofing: **€9 / m²** (was €6)

### Part 2 — New Pricing Page

**New route key: `pricing`**

**File: `src/i18n/routes.ts`**
- Add `pricing` to `RouteKey` union
- Add localized slugs: bg: `цени-ремонт-покрив`, en: `roof-repair-prices`, de: `dachsanierung-preise`, etc.

**File: `src/components/LocalizedPageRouter.tsx`**
- Import and add `PricingPage` to `PAGE_MAP`

**File: `src/pages/PricingPage.tsx`** (new)

Structure:
1. **Hero**: Title "Цени за ремонт на покриви" / "Roof Repair Prices", subtitle about transparent pricing, two CTA buttons (Request Inspection → `getPath('inspection')`, Get a Quote → `getPath('contact')`)
2. **Intro paragraph**: Prices are starting points, every project differs, inspection required
3. **Pricing table/cards**: 8 services, each with name, starting price, short explanation. All services listed, prices for the 4 main ones plus estimates for the other 4 (Leak Repair ~€12/m², Tile Replacement ~€14/m², Flat Roof ~€11/m², Maintenance ~€5/m²)
4. **SEO content block**: What affects roof repair prices (size, condition, materials, complexity, access)
5. **Internal links**: Natural links to Roof Repair, Waterproofing, New Roof pages
6. **CTA section**: "Request a free inspection" with Inspection and Call buttons
7. **Helmet SEO**: title, description, JSON-LD (Service schema)

**i18n — all 10 locale files**

Add `pricing` key block with translations for: page title, subtitle, intro text, service price labels, SEO content paragraphs, CTA text, disclaimer.

### Files

| File | Action |
|---|---|
| `src/components/Services.tsx` | Price text → clickable badge, update prices |
| `src/i18n/routes.ts` | Add `pricing` route key + slugs |
| `src/components/LocalizedPageRouter.tsx` | Add PricingPage to PAGE_MAP |
| `src/pages/PricingPage.tsx` | New pricing page |
| `src/i18n/locales/bg.ts` | Add pricing page translations |
| `src/i18n/locales/en.ts` | Same |
| `src/i18n/locales/de.ts` | Same |
| `src/i18n/locales/fr.ts` | Same |
| `src/i18n/locales/nl.ts` | Same |
| `src/i18n/locales/sv.ts` | Same |
| `src/i18n/locales/no.ts` | Same |
| `src/i18n/locales/fi.ts` | Same |
| `src/i18n/locales/ru.ts` | Same |
| `src/i18n/locales/ua.ts` | Same |

