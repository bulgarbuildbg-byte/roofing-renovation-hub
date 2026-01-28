
# Plan: Replace Images on Homepage & Roof Repair Page

## Problem
Despite previous replacement attempts, images on the Homepage and Roof Repair page are showing incorrect content (animals, cats, unrelated visuals) instead of real roofing photographs.

## Scope

### Homepage Images (13 files)
| File | Location Used | Required Content |
|------|---------------|------------------|
| `hero-roofing.jpg` | Hero section background | Real roofer working on tile roof |
| `before-1.jpg` | Before/After Gallery | Damaged/old tile roof |
| `after-1.jpg` | Before/After Gallery + Projects | Completed tile roof renovation |
| `before-2.jpg` | Before/After Gallery | Rusty/damaged metal roof |
| `after-2.jpg` | Before/After Gallery | New metal roof |
| `before-3.jpg` | Before/After Gallery | Flat roof with damage |
| `after-3.jpg` | Before/After Gallery | Finished waterproofed flat roof |
| `project-1.jpg` | Gallery | Completed residential tile roof |
| `project-2.jpg` | Gallery | Commercial metal roof |
| `project-3.jpg` | Gallery | House with repaired roof |
| `project-4.jpg` | Gallery | Villa with new tiles |
| `project-5.jpg` | Gallery | Roof repair with scaffolding |

### Roof Repair Page Process Images (6 files)
| File | Step | Required Content |
|------|------|------------------|
| `roof-inspection.jpg` | Step 1: Inspection & Diagnosis | Inspector examining roof damage |
| `roof-assessment.jpg` | Step 2: Assessment & Quote | Contractor documenting/measuring |
| `roof-scaffolding.jpg` | Step 3: Work Area Preparation | Scaffolding on residential house |
| `tile-removal.jpg` | Step 4: Removing Damaged Materials | Worker removing old tiles |
| `tile-installation.jpg` | Step 5: Installing New Materials | Roofer laying new tiles |
| `completed-tile-roof.jpg` | Step 6: Final Inspection | Finished tile roof, clean site |

## Technical Details

### Implementation Method
1. Use `lov-download-to-repo` to download verified roofing images from Pexels/Unsplash
2. Each image URL will be carefully selected to match exact content requirements
3. Files will be saved to existing paths, overwriting current incorrect images
4. No code changes needed - all imports remain unchanged

### Image Selection Criteria
- Real photography only (no AI-generated images)
- Professional quality, well-lit
- Shows actual roofing work matching the step description
- European residential style where applicable
- Builds trust and credibility

### Files to Replace
```text
src/assets/
  hero-roofing.jpg     <- Roofer on tile roof
  before-1.jpg         <- Damaged tile roof
  after-1.jpg          <- Renovated tile roof
  before-2.jpg         <- Old metal roof
  after-2.jpg          <- New metal roof
  before-3.jpg         <- Damaged flat roof
  after-3.jpg          <- Waterproofed flat roof
  project-1.jpg        <- Tile roof project
  project-2.jpg        <- Metal roof project
  project-3.jpg        <- Repair project
  project-4.jpg        <- New tiles project
  project-5.jpg        <- Scaffolding project

src/assets/process/
  roof-inspection.jpg       <- Inspector on roof
  roof-assessment.jpg       <- Measuring/documenting
  roof-scaffolding.jpg      <- Scaffolding setup
  tile-removal.jpg          <- Removing old tiles
  tile-installation.jpg     <- Installing new tiles
  completed-tile-roof.jpg   <- Finished roof
```

## Execution Order
1. Replace Homepage hero image first (highest visibility)
2. Replace Before/After images (6 files)
3. Replace Project gallery images (5 files)
4. Replace Roof Repair page process images (6 files)

**Total: 18 image files to replace**
