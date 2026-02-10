
# Plan: Fix Image-to-Context Mismatches on Service Pages

## Problem Found
After visual inspection of the entire site, all images are roofing-related (no animals, office, or generic photos). However, several service pages use **wrong category images** -- for example, the Metal Roof page shows tile stack images instead of metal roof images, and the Maintenance page shows tile-laying instead of gutter cleaning.

The project has dedicated correctly-named images in `src/assets/process/` that are simply not being used on the right pages.

## Changes

### 1. MetalRoofPage.tsx -- Use metal-specific images
Currently uses tile/generic images. Will switch to the dedicated metal process images.

| Step | Current Image | New Image |
|------|--------------|-----------|
| Survey | `roof-measuring.jpg` | `metal-roof-survey.jpg` |
| Battens | `roof-underlayment.jpg` | `membrane-battens.jpg` (keep -- correct) |
| Materials | `roof-tiles-stack.jpg` (WRONG - tiles) | `metal-delivery.jpg` |
| Installation | `roof-frame-work.jpg` | `metal-installation.jpg` |
| Ridge cap | `tile-roof-construction.jpg` (WRONG - tiles) | `metal-ridge-cap.jpg` |
| Final | `commercial-building.jpg` | `completed-metal-roof.jpg` |

### 2. MaintenancePage.tsx -- Use maintenance-specific images
Currently uses tile-laying and cost-calculation images for maintenance steps.

| Step | Current Image | New Image |
|------|--------------|-----------|
| Ground inspection | `roof-inspection-pro.jpg` | Keep (correct) |
| Walking inspection | `roof-measuring.jpg` | `roof-walking-inspection.jpg` |
| Gutter cleaning | `tile-laying-process.jpg` (WRONG) | `gutter-cleaning.jpg` |
| Moss removal | `shingle-worker.jpg` (WRONG) | `moss-removal.jpg` |
| Tile repair | `tile-installation-worker.jpg` | `single-tile-repair.jpg` |
| Report | `cost-calculation.jpg` | `maintenance-report.jpg` |

### 3. RoofLeakRepairPage.tsx -- Use leak-specific images
| Step | Current Image | New Image |
|------|--------------|-----------|
| Inspection | `roof-leak-damage.jpg` | Keep (correct) |
| Emergency | `water-damage-ceiling.jpg` | `emergency-tarp.jpg` |
| Thermal scan | `roof-measuring.jpg` | `thermal-inspection.jpg` |
| Patching | `shingle-installation.jpg` (WRONG) | `leak-patching.jpg` |
| Testing | `tile-laying-process.jpg` (WRONG) | `leak-testing.jpg` |
| Warranty | `blueprint-calculation.jpg` | `warranty-handover.jpg` |

### 4. FlatRoofPage.tsx -- Minor fix
| Step | Current Image | New Image |
|------|--------------|-----------|
| Inspection | `flat-roof-overview.jpg` | `flat-roof-inspection.jpg` |
| Cleaning | `flat-roof-waterproofing.jpg` | `roof-pressure-washing.jpg` |
| Sealing | `roof-chimney-detail.jpg` | `ac-unit-sealing.jpg` |
| Torch | `bitumen-torch-application.jpg` | Keep (correct) |
| Membrane | `waterproofing-membrane.jpg` | `pvc-membrane.jpg` |
| Final | `panel-block.jpg` | `completed-flat-roof.jpg` |

## Technical Details

Each fix only changes the import paths at the top of the file. No structural changes needed. All replacement images already exist in `src/assets/process/`. All imports follow the ES6 module standard (`import x from "@/assets/..."`).

Files to modify:
- `src/pages/services/MetalRoofPage.tsx` (6 import changes)
- `src/pages/services/MaintenancePage.tsx` (4 import changes)
- `src/pages/services/RoofLeakRepairPage.tsx` (5 import changes)
- `src/pages/services/FlatRoofPage.tsx` (5 import changes)
