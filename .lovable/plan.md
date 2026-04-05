

## Place 10 Uploaded Photos on Service Pages

This batch contains photos for 3 services: **Metal Roofs** (6 photos), **Maintenance** (2 photos), and **New Roof** (2 photos).

### Photo-to-Page Mapping (from Excel)

| Uploaded File | Service Page | Replaces Current Import |
|---|---|---|
| `metal-roof-tiles-before-after-01.jpg` | MetalRoofPage | `metalRoofSurvey` (step 1 - survey/inspection) |
| `metal-roof-sheet-installation-01.jpg` | MetalRoofPage | `metalInstallation` (step 4 - panel installation) |
| `metal-roof-tiles-installation-01.jpg` | MetalRoofPage | `membraneBattens` (step 2 - battens/membrane prep) |
| `metal-roof-trapezoidal-installation-01.jpg` | MetalRoofPage | `metalDelivery` (step 3 - delivery/materials) |
| `metal-roof-tiles-complete-01.jpg` | MetalRoofPage | `gutterInstallation` (step 6 - completed roof) |
| `metal-roof-ridge-installation-01.jpg` | MetalRoofPage | `metalRidgeCap` (step 5 - ridge cap) |
| `maintenance-inspection-attic-01.jpg` | MaintenancePage | `groundInspection` (step 1 - inspection) |
| `maintenance-inspection-attic-02.jpg` | MaintenancePage | `roofWalkingInspection` (step 2 - walking inspection) |
| `new-roof-design-plan-01.jpg` | NewRoofPage | `roofPlanning` (step 1 - planning) |
| `new-roof-structure-diagram-01.jpg` | NewRoofPage | `roofingMaterials` (step 2 - materials/structure) |

### Steps

1. **Copy all 10 images** from `user-uploads://` to `src/assets/process/` using their filenames from the Excel mapping
2. **Update `MetalRoofPage.tsx`** — replace 6 import paths (lines 14-19) to point to the new filenames
3. **Update `MaintenancePage.tsx`** — replace 2 import paths (lines 14-15) to point to the new filenames
4. **Update `NewRoofPage.tsx`** — replace 2 import paths (lines 16-17) to point to the new filenames

### Technical Detail

All images follow the existing ES6 import pattern (`import img from "@/assets/process/filename.jpg"`). Only the file paths in the import statements change; no layout, alt text, or component structure changes are needed. The old image files remain in the repo (they may be referenced elsewhere or removed in a future cleanup).

