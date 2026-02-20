
# SEO Cross-Linking: RemontNaPokriviVarna + BulgarBuild

## Overview

Implement a professional, SEO-safe linking structure between the roofing niche site and the parent corporate site. All changes are on the RemontNaPokriviVarna side (this project). The BulgarBuild side (item 4 in the spec) must be done manually on the other website.

---

## 1. Footer Link (All Pages)

**File:** `src/components/Footer.tsx`

Add a corporate affiliation line below the copyright notice:

> "Ремонт на Покриви Варна е специализирано покривно подразделение на [BulgarBuild Construction Company](https://bulgarbuild.com/)."

- Brand anchor text only ("BulgarBuild Construction Company")
- Clean do-follow link
- Visible on every page via the global footer

Also add corporate details (EIK, address) to strengthen entity consistency.

---

## 2. About Page Enhancement

**File:** `src/pages/AboutPage.tsx`

Add a new "Corporate Structure" section between the existing "About Content" and "Values" sections:

- Heading: "Корпоративна Структура" (Corporate Structure)
- Paragraph explaining the division relationship, parent company's full construction capabilities, shared legal entity, EIK number, and years of experience
- Contextual in-text link to `https://bulgarbuild.com/about` using brand anchor "BulgarBuild" -- not a button, just a natural hyperlink within the paragraph
- Update the existing `parentOrganization` schema to include the `/about` URL reference

---

## 3. Blog Contextual Links (3 Articles)

Add a subtle contextual paragraph before the "Back to Blog" link in 3 static blog articles:

**Files:**
- `src/pages/blog/WinterRoofPreparation.tsx`
- `src/pages/blog/RoofRepairSigns.tsx`
- `src/pages/blog/WaterproofingTypes.tsx`

Each will get a short, natural sentence such as:

> "Покривните услуги са част от цялостните строителни решения, предлагани от [BulgarBuild](https://bulgarbuild.com/)."

- Different wording in each article to avoid repetitive patterns
- Brand anchor text only
- Placed contextually at the end of the article content

---

## 4. Reverse Link from BulgarBuild (Manual -- Outside This Project)

This project cannot modify BulgarBuild.com. You will need to manually add a "Specialized Divisions" section on bulgarbuild.com linking to `https://www.remontnapokrivivarna.bg/`. This can go on the homepage or a dedicated divisions page.

---

## 5. Corporate Consistency in Schema + Footer

Ensure identical corporate details appear on this site:
- Company name: "България Билд ЕООД"
- EIK displayed in footer
- Same address: ул. Уста Колю Фичето 25 А, Варна
- Same phone: 088 499 7659

The existing JSON-LD schema on the About page already has `parentOrganization` -- this will be kept and slightly enriched.

---

## 6. Technical SEO Summary

Total links from RemontNaPokriviVarna to BulgarBuild:
- 1 footer link (all pages) -- brand anchor
- 1 About page contextual link -- brand anchor to /about
- 3 blog article contextual links -- brand anchor to homepage

All do-follow, no `rel="nofollow"`, no `rel="noopener noreferrer"` (since these are trusted corporate links). No sidebar spam, no keyword-stuffed anchors.

---

## Files to Modify

| File | Change |
|------|--------|
| `src/components/Footer.tsx` | Add corporate affiliation line with BulgarBuild link + EIK |
| `src/pages/AboutPage.tsx` | Add "Corporate Structure" section with contextual link to bulgarbuild.com/about |
| `src/pages/blog/WinterRoofPreparation.tsx` | Add contextual BulgarBuild link before "Back to Blog" |
| `src/pages/blog/RoofRepairSigns.tsx` | Add contextual BulgarBuild link before "Back to Blog" |
| `src/pages/blog/WaterproofingTypes.tsx` | Add contextual BulgarBuild link before "Back to Blog" |
| `src/components/About.tsx` | Remove `rel="noopener noreferrer"` from existing BulgarBuild link (trusted corporate link) |
