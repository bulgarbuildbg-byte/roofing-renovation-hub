-- Add city column to testimonials for per-city filtering on city pages
ALTER TABLE public.testimonials
ADD COLUMN city text;

-- Index for efficient city-based filtering
CREATE INDEX idx_testimonials_city ON public.testimonials (city) WHERE is_active = true;

-- Backfill existing testimonials: infer city from location text where possible
UPDATE public.testimonials
SET city = 'varna'
WHERE city IS NULL AND (
  location ILIKE '%варна%' OR location ILIKE '%varna%'
);

UPDATE public.testimonials
SET city = 'burgas'
WHERE city IS NULL AND (
  location ILIKE '%бургас%' OR location ILIKE '%burgas%'
);

UPDATE public.testimonials
SET city = 'ruse'
WHERE city IS NULL AND (
  location ILIKE '%русе%' OR location ILIKE '%ruse%'
);