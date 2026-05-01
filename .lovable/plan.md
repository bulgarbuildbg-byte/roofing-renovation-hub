
# Remaining SEO Audit Fixes

The previous session already fixed: desktop navigation expansion, FAQPage schema on HomeFAQ, chatbot auto-prompt timing, and email in schema. This plan addresses the remaining actionable issues.

## Issues to Fix

### 1. Garbled Warranty Numbers -- "1115" should be "15" (Critical)
Multiple locales (SV, NO) have "1115 års garanti" instead of "15 års garanti". EN and FI have "10–115" which should be "15". These are data corruption issues that display wrong warranty info to users.

**Files:** `src/i18n/locales/sv.ts`, `src/i18n/locales/no.ts`, `src/i18n/locales/en.ts`, `src/i18n/locales/fi.ts`

### 2. Warranty Inconsistency -- EN/FI say "10yr" instead of "15yr" (Critical -- #12 in audit)
The EN homeDesc says "up to 10yr warranty" but should be "15yr" (matching the brand standard). FI has the same issue with "jopa 10v takuu". Also EN service pages for Waterproofing and Flat Roofs say "10yr Warranty".

**Files:** `src/i18n/locales/en.ts`, `src/i18n/locales/fi.ts`

### 3. Reduce H3 Overuse on Homepage (Medium -- #9 in audit)
The audit found 44 H3 tags on the homepage (ideal is under 20). Service card names are rendered as `<h3>` in `Services.tsx` -- since there are ~10 services and each card uses H3, this inflates the count. Change service card titles from `<h3>` to a styled `<p>` or `<div>` to reduce semantic heading pollution.

**Files:** `src/components/Services.tsx`

## Technical Details

- **SV/NO locales:** Find-replace all instances of "1115" with "15"
- **EN locale:** Replace "up to 10yr" with "15yr", "10yr Warranty" with "15yr Warranty", "Up to 10 years warranty" with "15 years warranty", "10–115" with "15"
- **FI locale:** Replace "jopa 10v" with "15v", "jopa 10 vuotta" with "15 vuotta", "10–115" with "15"
- **Services.tsx:** Change `<h3>` to `<p>` with same styling classes for service card titles
