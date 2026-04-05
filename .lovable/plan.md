

## Fix Navigation: Clickable Service Cards + "Безплатна оферта" Button Behavior

### Problem 1: Service card images are not clickable
The entire card area (image + text) is not wrapped in a link. Only the "Безплатна оферта" button at the bottom links to the service page. Users expect clicking anywhere on the card (especially the image) to navigate to that service.

### Problem 2: "Безплатна оферта" button goes to the service page, not a contact form
The button currently links to the individual service page via `getPath(service.routeKey)`. For better conversion, it should scroll directly to the contact form or link to the contact page.

### Plan

**File: `src/components/Services.tsx`**

1. **Make the entire card clickable** — Wrap each `<Card>` in a `<Link to={getPath(service.routeKey)}>` so clicking anywhere on the card (image, title, description) navigates to the service page. Add `cursor-pointer` styling.

2. **Change "Безплатна оферта" button behavior** — Instead of linking to the service page (redundant now that the card is clickable), change the button to either:
   - Scroll to the `#contact` section on the homepage (if the user is on the homepage)
   - Link to `getPath('contact')` (the localized contact page)

   Since the contact form lives in a `Contact` component with `id="contact"` and service pages do NOT have an embedded form, the button will link to the localized contact page (`/bg/контакти`, `/en/contact`, etc.) for reliability across all contexts.

3. **Stop event propagation** on the button click so it doesn't trigger the card's navigation.

### Technical Detail

```text
Before:
  Card (not clickable)
    └─ Image (not clickable)
    └─ Text content
    └─ Button "Безплатна оферта" → /bg/ремонт-на-покриви (service page)

After:
  Link → /bg/ремонт-на-покриви (whole card clickable)
    └─ Card
        └─ Image
        └─ Text content
        └─ Button "Безплатна оферта" → /bg/контакти (contact page, stops propagation)
```

### Files Changed
- `src/components/Services.tsx` — wrap cards in Link, change button target to contact page

