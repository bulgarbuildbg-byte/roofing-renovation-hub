
# Upgrade Services Section with Photorealistic Visuals

## Overview

Replace the flat Lucide icons in each service card with full-width, high-quality photographs from the existing asset library. Each card will feature a cropped photo header that gives a tangible, real-world feel to the service offering.

## Design Change

**Before:** Small 48px circular icon with a flat Lucide icon (Home, Wrench, etc.)

**After:** Full-width photo banner (aspect ratio ~16:9) at the top of each card showing a real roofing scene relevant to that service, with a subtle dark gradient overlay and the service title overlaid or placed just below.

## Photo Mapping

Each service will use an existing photo from `src/assets/process/`:

| Service | Photo File | Rationale |
|---------|-----------|-----------|
| Ремонт на Покриви | `tile-installation-worker.jpg` | Worker on roof, shows active repair |
| Ремонт на Течове | `leak-patching.jpg` | Leak repair in action |
| Хидроизолация | `waterproofing-torch.jpg` | Bitumen torch waterproofing |
| Нов Покрив | `roof-frame-construction.jpg` | New roof frame being built |
| Смяна на Керемиди | `single-tile-repair.jpg` | Individual tile replacement |
| Плоски Покриви | `flat-roof-waterproofing.jpg` | Flat roof work |
| Метални Покриви | `metal-installation.jpg` | Metal roof installation |
| Поддръжка | `roof-inspection-pro.jpg` | Professional inspection |

## Card Layout Update

Each service card will change from:

```text
+---------------------------+
| [icon circle]             |
| Title                     |
| Problem text              |
| - Includes list           |
| Benefit                   |
| [Button]                  |
+---------------------------+
```

To:

```text
+---------------------------+
| [  Full-width photo   ]   |
| [  with gradient      ]   |
+---------------------------+
| Title                     |
| Problem text              |
| - Includes list           |
| Benefit                   |
| [Button]                  |
+---------------------------+
```

- Photo area: ~160px height with `object-cover` for consistent cropping
- Subtle bottom gradient overlay for visual polish
- Rounded top corners matching the card border radius
- Card padding adjusted so photo is edge-to-edge at top, text content padded below

## Technical Details

**File modified:** `src/components/Services.tsx`

Changes:
1. Add ES6 image imports for all 8 photos at the top of the file
2. Replace `icon` property in each service object with `image` property pointing to the imported photo
3. Replace the icon circle `<div>` (lines 100-102) with an `<img>` element wrapped in a container with `overflow-hidden`, `rounded-t-xl`, and a fixed height
4. Remove unused Lucide icon imports (Home, Wrench, Shield, Hammer, Droplets)
5. Adjust `CardContent` padding so the image sits flush at the top and text content has normal padding below
6. Add a subtle overlay gradient on hover for interactivity

No new dependencies required. All photos already exist in the project assets.
