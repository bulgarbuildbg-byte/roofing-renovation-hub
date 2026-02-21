

# Generate Roofing Photos with AI (Nano Banana Pro)

## Overview

Create an edge function that uses the `google/gemini-3-pro-image-preview` model to generate photorealistic roofing images for all 36 process steps across 6 service pages. Images will be stored in Supabase Storage and referenced by URL in the service page components.

## Architecture

### 1. Supabase Storage Bucket

Create a public `service-images` bucket to store the generated images.

### 2. Edge Function: `generate-service-images`

A single edge function that:
- Accepts a list of image prompts (or generates all at once)
- Calls the Lovable AI gateway with `google/gemini-3-pro-image-preview`
- Decodes the base64 response and uploads each image to the storage bucket
- Returns the public URLs

### 3. Image Prompts (36 total)

Each prompt will be crafted to produce a photorealistic, European-style roofing photo matching the exact process step:

**Roof Repair (6 images):**
1. "Professional roofer inspecting ceramic tile roof with measuring tape, European residential house, daylight"
2. "Construction estimator writing cost calculation on clipboard on a rooftop, blueprints visible"
3. "Metal scaffolding erected around European house for roof repair work"
4. "Worker carefully removing old damaged clay roof tiles by hand, exposed battens visible"
5. "Roofer installing new terracotta ceramic tiles on wooden battens, European house"
6. "Completed repaired tile roof on European residential house, clean and pristine"

**Waterproofing (6 images):**
1. "Worker cleaning and preparing flat concrete roof surface for waterproofing, broom and tools"
2. "Roofer applying bitumen primer with roller on flat concrete roof surface"
3. "Worker applying torch-on bitumen waterproofing membrane with gas torch on flat roof, flames visible"
4. "Close-up of waterproofing detail work around chimney base with bitumen membrane and sealing tape"
5. "Worker laying second layer of bitumen waterproofing membrane perpendicular to first layer on flat roof"
6. "Completed flat roof waterproofing, smooth black bitumen surface, European apartment building"

**New Roof Construction (6 images):**
1. "Architect reviewing roof construction blueprints and plans on table, calculator and pencil"
2. "Stack of new ceramic roof tiles and timber battens delivered to construction site"
3. "Workers building wooden roof truss framework on European house, timber rafters and beams"
4. "Installing breathable membrane and counter-battens on roof structure, underlayment visible"
5. "Workers laying ceramic tiles on new roof, tile rows visible, European residential house"
6. "Worker installing mineral wool insulation between roof rafters from inside attic"

**Tile Replacement (6 images):**
1. "Professional roofer closely inspecting ceramic tile condition on sloped roof, checking for cracks"
2. "Various ceramic and concrete tile samples laid out for comparison, different colors and profiles"
3. "Scaffolding setup around European house with protective covers for tile replacement work"
4. "Worker removing old worn ceramic tiles from roof, exposing wooden battens underneath"
5. "Roofer mounting new ceramic tiles onto battens, precise alignment, European house"
6. "Beautifully completed tile roof on European villa, terracotta tiles gleaming in sunlight"

**Metal Roof (6 images):**
1. "Roofer measuring metal roof with tape measure, surveying slope and dimensions"
2. "Worker installing wooden battens and breathable membrane for metal roof preparation"
3. "Truck delivering stacks of colored metal roofing panels to construction site"
4. "Worker fastening metal roofing panel with power drill and self-tapping screws on roof"
5. "Installing metal ridge cap and flashing on metal roof peak, worker with tools"
6. "Completed modern metal roof with gutters and downpipes on European building"

**Maintenance (6 images):**
1. "Professional with binoculars inspecting residential roof from ground level, clipboard in hand"
2. "Roofer walking on tile roof doing close-up inspection, checking tiles and flashing"
3. "Worker cleaning roof gutter by hand, removing leaves and debris, ladder visible"
4. "Worker removing green moss from roof tiles with brush and spray, cleaning in progress"
5. "Roofer replacing single cracked ceramic tile on otherwise intact roof"
6. "Professional writing roof maintenance report on clipboard, pen and camera nearby"

### 4. Update Service Pages

Replace all static asset imports with dynamic image URLs from storage. Each page component will reference the public storage URL instead of importing from `src/assets/`.

## Implementation Steps

1. **Database migration**: Create `service-images` storage bucket with public access
2. **Edge function**: Create `generate-service-images` function that generates all 36 images in batches and uploads to storage
3. **Trigger generation**: Call the edge function to generate all images (may need to batch due to API limits -- likely 6 calls per batch, 6 batches)
4. **Update 6 service pages**: Replace asset imports with storage URLs

## Technical Details

- Model: `google/gemini-3-pro-image-preview` (Nano Banana Pro)
- Output: Base64 PNG images
- Storage: Public bucket `service-images` with folder structure like `roof-repair/step-1.png`
- Each generation call takes ~10-30 seconds, so the edge function will process images sequentially
- The function will be invoked from the admin panel or manually via curl

## Files to Create

| File | Purpose |
|------|---------|
| `supabase/functions/generate-service-images/index.ts` | Edge function for AI image generation + storage upload |

## Files to Modify

| File | Change |
|------|--------|
| `src/pages/services/RoofRepairPage.tsx` | Replace asset imports with storage URLs |
| `src/pages/services/WaterproofingPage.tsx` | Replace asset imports with storage URLs |
| `src/pages/services/NewRoofPage.tsx` | Replace asset imports with storage URLs |
| `src/pages/services/TileReplacementPage.tsx` | Replace asset imports with storage URLs |
| `src/pages/services/MetalRoofPage.tsx` | Replace asset imports with storage URLs |
| `src/pages/services/MaintenancePage.tsx` | Replace asset imports with storage URLs |

## Database Changes

- Create storage bucket `service-images` (public, for image hosting)

## Risk Considerations

- AI-generated images may not look 100% photorealistic -- they will be high quality but may have subtle AI artifacts
- Generation of 36 images will take several minutes total
- Edge function has a 60-second timeout, so we will need to generate images in batches (e.g., one service page per call = 6 images per call)

