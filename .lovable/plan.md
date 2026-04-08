

## Services Carousel — Center Focus + Soft Edge Fade

### Summary
Add gradient fade overlays on left/right edges of the carousel and ensure the initial scroll position centers the first 4 priority services on load.

### Changes — `src/components/Services.tsx`

**1. Ensure 4 priority services are centered on load**
- Embla with `loop: true` and `align: "center"` already centers. With 8 slides showing 4 at XL, the first 4 are naturally visible. No `startIndex` change needed — current config is correct.

**2. Add soft gradient fade on left & right edges**
- Add two `pointer-events-none` overlay divs inside the `relative` carousel wrapper:
  - Left: `absolute left-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-r from-secondary to-transparent z-[5]`
  - Right: `absolute right-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-l from-secondary to-transparent z-[5]`
- The gradient color matches `bg-secondary` (the section background) so it fades seamlessly.
- `z-[5]` keeps them above cards but below the navigation arrows (arrows get `z-10`).

**3. Move arrow buttons outside the fade area**
- Increase outer padding from `px-10 md:px-14` to `px-12 md:px-16` so arrows sit cleanly outside the fade zone.

### Files

| File | Change |
|---|---|
| `src/components/Services.tsx` | Add 2 gradient overlay divs + adjust padding |

