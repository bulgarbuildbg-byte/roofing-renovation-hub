

## Place 10 New Roof Photos on NewRoofPage

### Current State
The `NewRoofPage.tsx` has 6 process images imported (lines 16-21) but only 1 is actually rendered (as a hero background on line 176). The 6-step process timeline (lines 445-493) is text-only with no images — unlike other service pages (e.g., MetalRoofPage) which display images alongside each step.

### What This Batch Does
All 10 uploaded photos are for the **New Roof** service page, completing the set (2 were placed in the previous batch).

### Photo-to-Step Mapping

| Uploaded File | Process Step | Import Variable |
|---|---|---|
| `new-roof-wooden-structure-02.jpg` | Hero background | `roofFrameConstruction` (replaces current) |
| `new-roof-wooden-structure-01.jpg` | Step 3 - Frame construction | `woodenStructure1` (new) |
| `new-roof-wooden-structure-03.jpg` | Step 3 - secondary | `woodenStructure2` (new) |
| `new-roof-wooden-structure-04.jpg` | Step 3 - secondary | `woodenStructure3` (new) |
| `new-roof-wooden-decking-01.jpg` | Step 4 - Decking/sheathing | `woodenDecking` (new) |
| `new-roof-underlayment-battens-01.jpg` | Step 4 - Underlayment | `membraneBattens` (replaces current) |
| `new-roof-tile-preparation-01.jpg` | Step 5 - Tile preparation | `tilePreparation` (new) |
| `new-roof-tile-installation-01.jpg` | Step 5 - Tile installation | `tileInstallation` (replaces current) |
| `new-roof-tile-installation-02.jpg` | Step 5 - secondary | `tileInstallation2` (new) |
| `new-roof-tile-complete-01.jpg` | Step 6 - Completed roof | `roofInsulation` (replaces current) |

### Steps

1. **Copy all 10 images** from `user-uploads://` to `src/assets/process/`
2. **Update imports in `NewRoofPage.tsx`** — replace 4 existing import paths + add 6 new imports for the additional photos
3. **Add images to the process timeline** — enhance the text-only timeline (lines 445-493) to include photos alongside each step, matching the pattern used by MetalRoofPage. Each step gets 1-3 relevant photos displayed in a grid below the step description.

### Files Changed
- `src/pages/services/NewRoofPage.tsx` — update imports + add image grids to process steps

