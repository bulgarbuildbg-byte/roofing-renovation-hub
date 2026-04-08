

## Redesign Reviews/Testimonials Section

### What Changes

**`src/components/Testimonials.tsx`** — Full layout redesign:

1. **Card layout**: Change from vertical (photo on top) to **horizontal** — large photo on the left, text content on the right
2. **Photo size**: Avatar from `h-11 w-11` → **`w-24 h-24 md:w-28 md:h-28`** with `rounded-xl` (rectangular, not circular)
3. **Carousel**: Switch from manual scroll div to **Embla carousel** (already installed), showing **3 cards on desktop**, 2 on tablet, 1 on mobile, with left/right arrow buttons
4. **Photos**: Use realistic stock portrait URLs from `randomuser.me` API for fallback testimonials (8 unique photos matching Bulgarian names — male/female appropriate). When DB testimonials have `avatar_url`, those are used instead
5. **Card structure** (left-to-right):
   - Left: Large client photo
   - Right: Stars row, quote text, name + BadgeCheck, location, service badge
6. **Arrows**: Positioned at top-right (existing pattern) or flanking the carousel

### Fallback Photos

For the 8 hardcoded fallback testimonials, use realistic portrait images. Since the project uses ES6 imports for assets, we'll use `https://i.pravatar.cc/` URLs with seeded IDs (deterministic, realistic faces). Each testimonial gets a unique seed matching the person's gender.

### Files to Change

| File | Action |
|---|---|
| `src/components/Testimonials.tsx` | Horizontal card layout, larger photos, Embla carousel (3 visible), arrows |

No i18n changes needed — all text keys already exist.

