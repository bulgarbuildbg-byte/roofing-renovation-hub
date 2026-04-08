

## Services Section — Carousel Redesign

### Summary
Convert the grid layout in `src/components/Services.tsx` to an Embla carousel showing 4 cards at a time, centered, with left/right navigation arrows and a "View All Services" button below.

### Changes — `src/components/Services.tsx`

**1. Reorder `serviceKeys` array for priority**
Move priority services to the front:
1. Roof Repair
2. Waterproofing
3. New Roof
4. Tile Replacement
5. Leak Repair, Flat Roof, Metal Roof, Maintenance

**2. Replace grid with Embla carousel**
- Import `useEmblaCarousel` (already used in the project)
- Config: `align: "center"`, `loop: true`, `slidesToScroll: 1`
- Each slide: `basis-1/4` on xl, `basis-1/3` on lg, `basis-1/2` on sm, `basis-full` on mobile
- Cards keep existing design (image, title, problem, includes, benefits, Free Quote button)

**3. Left/Right navigation arrows**
- Wrap carousel in `relative` container with horizontal padding
- Two round buttons (`ChevronLeft` / `ChevronRight`) positioned absolute at vertical center, left-0 / right-0
- White background, shadow, primary color on hover

**4. "View All Services" button**
- Below the carousel, centered
- Uses `Link` to `getPath('services')` — routes to the full services page
- Label from existing i18n key `nav.allServices` ("Всички услуги" in BG)
- Styled as outline variant with primary border

**5. Keep "Not sure?" CTA block** unchanged below the new button.

### i18n
No new keys needed — `nav.allServices` already exists in all 10 locales.

### Files

| File | Action |
|---|---|
| `src/components/Services.tsx` | Grid → Embla carousel, reorder services, add arrows + "View All" button |

