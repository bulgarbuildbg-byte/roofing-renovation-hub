

# Plan: Global Image Fix Across All Website Pages

## Problem Identified

There are **two separate issues** causing incorrect images across the website:

### Issue 1: Downloaded Asset Files
The image files in `src/assets/` and `src/assets/process/` may contain incorrect content (animals, food, kitchens, etc.) from previous failed download attempts.

### Issue 2: Hardcoded External URLs
Many pages use direct `images.unsplash.com` URLs in the code instead of local assets. These external URLs are showing unrelated content (food, animals, people, etc.).

**Files using external Unsplash URLs (12 files):**
- `ProjectsPage.tsx` - 6 project images
- `BlogPage.tsx` - 6 blog article images  
- `WaterproofingPage.tsx` - 1 hero section image
- `MaintenancePage.tsx` - 1 hero section image
- `SpringInspection.tsx` - 1 blog hero image
- `ChoosingTiles.tsx` - 2 images
- Additional blog article pages

---

## Solution

### Part A: Replace All Downloaded Asset Files (57 files)

Replace all image files in `src/assets/` with verified roofing photographs:

| Category | Files | Required Content |
|----------|-------|-----------------|
| Hero | `hero-roofing.jpg` | Roofer working on tile roof |
| Before/After | `before-1.jpg` to `after-3.jpg` (6 files) | Roof damage and completed repairs |
| Projects | `project-1.jpg` to `project-5.jpg` (5 files) | Various completed roof projects |
| Roof Repair Process | 6 files | Inspection, scaffolding, tile work |
| Waterproofing Process | 6 files | Surface prep, primer, torch application |
| Flat Roof Process | 6 files | Flat roof inspection and membrane work |
| Maintenance Process | 6 files | Gutter cleaning, moss removal, inspection |
| Metal Roof Process | 6 files | Metal roof survey, installation, completion |
| New Roof Process | 6 files | Planning, frame construction, insulation |
| Leak Repair Process | 6 files | Leak detection, emergency tarp, patching |
| Tile Replacement | 6 files (shared with Roof Repair) | Tile removal and installation |

### Part B: Update Hardcoded External URLs in Code

Replace all Unsplash URLs in these files with local asset imports:

**1. ProjectsPage.tsx** - Replace 6 external URLs with local imports
```
Current: image: "https://images.unsplash.com/..."
Replace with: import from "@/assets/..."
```

**2. BlogPage.tsx** - Replace 6 blog thumbnail URLs with local imports

**3. WaterproofingPage.tsx** - Replace 1 hero section URL

**4. MaintenancePage.tsx** - Replace 1 hero section URL

**5. Blog article pages** - Replace hero images in:
- SpringInspection.tsx
- ChoosingTiles.tsx
- CommonMistakes.tsx
- RoofRepairSigns.tsx
- WaterproofingTypes.tsx
- WinterRoofPreparation.tsx

---

## Image Selection Criteria

Every image must be:
- Real photography (non-AI generated)
- Directly related to roofing/construction
- Matching the exact work type and process step
- Professional quality, well-lit
- European residential style where applicable

**Strictly forbidden:**
- Animals
- Food
- Kitchens or unrelated indoor environments
- Lifestyle photos
- Any images not connected to roofing/construction

---

## Technical Implementation

### Step 1: Download new asset files
Use `lov-download-to-repo` with verified Pexels URLs for all 57 asset files in `src/assets/`

### Step 2: Add new blog-specific images
Create new asset files for blog articles:
- `src/assets/blog/winter-preparation.jpg`
- `src/assets/blog/roof-repair-signs.jpg`
- `src/assets/blog/waterproofing-types.jpg`
- `src/assets/blog/spring-inspection.jpg`
- `src/assets/blog/common-mistakes.jpg`
- `src/assets/blog/choosing-tiles.jpg`

### Step 3: Update code files
Modify the following files to use local imports instead of external URLs:

**ProjectsPage.tsx:**
- Add imports for 6 project images
- Replace `image: "https://..."` with imported variables

**BlogPage.tsx:**
- Add imports for 6 blog thumbnail images
- Replace `image: "https://..."` with imported variables

**Service pages (WaterproofingPage.tsx, MaintenancePage.tsx):**
- Add hero image imports
- Replace inline `src="https://..."` with imported variables

**Blog article pages (6 files):**
- Add hero image imports
- Replace inline `src="https://..."` with imported variables

---

## Files to Modify (Code Changes)

| File | Changes |
|------|---------|
| `src/pages/ProjectsPage.tsx` | Add 6 imports, update 6 image references |
| `src/pages/BlogPage.tsx` | Add 6 imports, update 6 image references |
| `src/pages/services/WaterproofingPage.tsx` | Add 1 import, update 1 hero image |
| `src/pages/services/MaintenancePage.tsx` | Add 1 import, update 1 hero image |
| `src/pages/blog/SpringInspection.tsx` | Add 1 import, update 1 hero image |
| `src/pages/blog/ChoosingTiles.tsx` | Add 2 imports, update 2 images |
| `src/pages/blog/CommonMistakes.tsx` | Add 1 import, update 1 hero image |
| `src/pages/blog/RoofRepairSigns.tsx` | Add 1 import, update 1 hero image |
| `src/pages/blog/WaterproofingTypes.tsx` | Add 1 import, update 1 hero image |
| `src/pages/blog/WinterRoofPreparation.tsx` | Add 1 import, update 1 hero image |

---

## Expected Outcome

After implementation:
- All 57+ asset files will contain correct roofing photographs
- All pages will use local imports (no external Unsplash URLs)
- Every image will be directly relevant to its page topic and section
- No more animals, food, kitchens, or unrelated content anywhere on the site
- Website will visually represent professional roof repair and construction work

---

## Image Content Mapping

| Page/Section | Required Image Content |
|--------------|----------------------|
| Homepage Hero | Roofer installing tiles on residential roof |
| Before/After 1 | Damaged tile roof / Completed renovation |
| Before/After 2 | Rusty metal roof / New metal installation |
| Before/After 3 | Damaged flat roof / Waterproofed flat roof |
| Project Gallery | Various completed roofing projects |
| Roof Repair Process | Inspection, scaffolding, tile removal, installation |
| Waterproofing Process | Surface prep, primer, torch application, membrane |
| Flat Roof Process | Flat roof assessment, cleaning, membrane installation |
| Maintenance Process | Gutter cleaning, moss removal, minor repairs |
| Metal Roof Process | Survey, panel delivery, installation, ridge caps |
| New Roof Process | Planning, framing, insulation, tile laying |
| Leak Repair Process | Water damage inspection, emergency tarp, patching |
| Blog Articles | Contextual roofing images matching article topics |

