ALTER TABLE public.analytics_events
  ADD COLUMN IF NOT EXISTS referrer_source text,
  ADD COLUMN IF NOT EXISTS referrer        text;