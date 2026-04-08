

## Testimonials Section — Design & Navigation Fix

### Changes to `src/components/Testimonials.tsx`

**1. Photos — Make visible & circular**
- The fallback photos (`i.pravatar.cc`) are already defined but may not render due to the rectangular container. Change photo container from rectangular (`w-28 md:w-36 rounded-l-xl`) to a **large circular avatar** (`w-20 h-20 md:w-24 md:h-24 rounded-full`) positioned prominently on the left side of each card with proper padding.
- Add `ring-2 ring-primary/20` for a polished border effect.
- Keep initials fallback for DB testimonials without `avatar_url`.

**2. Card layout — Cleaner horizontal structure**
- Wrap card content in a flex row with the circular photo on the left (vertically centered) and text on the right.
- Add internal padding (`p-5 md:p-6`) so the photo isn't clipped by the card edge.
- Remove the full-height photo strip approach (current `rounded-l-xl` style) — replace with a padded circular avatar.

**3. Navigation buttons — Move to sides of carousel**
- Remove the top-right arrow buttons block (lines 117-139).
- Add **left arrow** (absolute positioned, vertically centered, left of carousel) and **right arrow** (same, right side).
- Wrap the carousel in a `relative` container with horizontal padding (`px-12 md:px-14`) to make room for the arrows.
- Style: `absolute top-1/2 -translate-y-1/2`, left arrow at `left-0`, right arrow at `right-0`. Rounded-full, shadow, white background.

**4. No other file changes needed** — all i18n keys and data structures remain the same.

### Files to Change

| File | Action |
|---|---|
| `src/components/Testimonials.tsx` | Circular photos, side-positioned nav arrows, cleaner card layout |

