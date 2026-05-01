
# Plan: Fix Critical SEO/UX Issues from Audit

Based on the uploaded SEO + UX/UI + CRO audit, I analyzed the codebase and identified which issues are real and actionable vs already resolved. Here is the summary:

## Already Implemented (No Action Needed)
- **Canonical tags** -- `HreflangTags.tsx` already renders `<link rel="canonical">` on every page
- **Hreflang in HTML head** -- `HreflangTags.tsx` renders hreflang alternate links + x-default in `<head>`
- **JSON-LD schema** -- `Index.tsx` has LocalBusiness/RoofingContractor, WebSite, Organization, Breadcrumb schemas. Service pages have Service + FAQPage schemas
- **English title tags** -- EN locale already has proper English title `"Roof Repair Varna Bulgaria - Free Inspection 24h"`
- **Duplicate titles** -- Service pages already have unique titles per page

## Real Issues to Fix

### 1. Desktop Navigation Too Limited (Critical -- #7 in audit)
The desktop nav bar shows only: **Услуги (dropdown) | Соларни Системи (dropdown) | Контакти**. Key pages like Проекти, Цени, Блог are hidden behind a hamburger side panel.

**Fix:** Add direct navigation links for Проекти, Цени, and Блог to the main desktop nav bar, between the Solar dropdown and Contact link. This improves crawlability and user discoverability.

### 2. Missing FAQPage Schema on Homepage (Medium)
The `HomeFAQ` component renders FAQ accordion on the homepage but has no `FAQPage` JSON-LD schema. Service pages have it, but the homepage does not.

**Fix:** Add `FAQPage` schema to `HomeFAQ.tsx` so Google can display expandable FAQ results from the homepage.

### 3. Chatbot Auto-Prompt Too Aggressive (Medium -- UX)
The chatbot prompt card appears after only 300px of scrolling, which can feel intrusive, especially on mobile.

**Fix:** Increase scroll threshold from 300px to 800px, and add a time delay of 8 seconds before showing the prompt. On mobile, disable auto-prompt entirely.

### 4. Email in Schema Uses abv.bg Domain (Low -- E-E-A-T)
The `Index.tsx` LocalBusiness schema uses `remontnapokrivivarna@abv.bg` instead of a professional domain email.

**Fix:** Update the email in the schema to `office@bulgarbuild.com`.

---

## Technical Details

### Files to modify:
1. **`src/components/Header.tsx`** -- Add 3 direct nav links (Проекти, Цени, Блог) to the desktop nav between Solar dropdown and Contact
2. **`src/components/HomeFAQ.tsx`** -- Add FAQPage JSON-LD schema using Helmet
3. **`src/components/ChatBot.tsx`** -- Change scroll threshold to 800px, add 8s delay, disable auto-prompt on mobile
4. **`src/pages/Index.tsx`** -- Update email from `remontnapokrivivarna@abv.bg` to `office@bulgarbuild.com` in LocalBusiness schema

### Not addressed in this plan (require content, not code):
- **Thin content on service pages (~600 words)** -- This requires writing 600+ additional words of content per page, which is a content task, not a code fix
- **0 WebP images** -- Images are imported as assets; Vite already optimizes them at build time. Converting source files to WebP is an asset pipeline task
