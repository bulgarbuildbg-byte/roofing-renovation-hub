

## New "Our Completed Projects" Carousel Section

### What We'll Build
A new homepage section with a horizontal carousel showing 4 project cards at a time on desktop, with left/right navigation arrows and a "View All Projects" button below.

### Changes

**1. New component: `src/components/CompletedProjects.tsx`**
- Carousel using Embla (already installed via `embla-carousel-react`) showing project cards
- Shows 4 cards per row on desktop, 2 on tablet, 1 on mobile
- Each card: project image, title, location badge, service type
- Left/right arrow buttons (always visible, not just on hover)
- "View All Projects" button centered below, linking to localized projects page
- Reuses same project images from `src/assets/portfolio/`

**2. `src/pages/Index.tsx`**
- Import and place `<CompletedProjects />` immediately after `<HowWeWork />`
- Lazy-loaded via `React.lazy`

**3. i18n keys (all 10 locale files)**
- Add `completedProjectsSection.title`, `completedProjectsSection.subtitle`, `completedProjectsSection.viewAll` to each locale file

### Files to Change

| File | Action |
|---|---|
| `src/components/CompletedProjects.tsx` | New — carousel section component |
| `src/pages/Index.tsx` | Insert section after HowWeWork |
| `src/i18n/locales/bg.ts` | Add 3 translation keys |
| `src/i18n/locales/en.ts` | Add 3 translation keys |
| `src/i18n/locales/de.ts` | Add 3 translation keys |
| `src/i18n/locales/fi.ts` | Add 3 translation keys |
| `src/i18n/locales/fr.ts` | Add 3 translation keys |
| `src/i18n/locales/nl.ts` | Add 3 translation keys |
| `src/i18n/locales/no.ts` | Add 3 translation keys |
| `src/i18n/locales/ru.ts` | Add 3 translation keys |
| `src/i18n/locales/sv.ts` | Add 3 translation keys |
| `src/i18n/locales/ua.ts` | Add 3 translation keys |

