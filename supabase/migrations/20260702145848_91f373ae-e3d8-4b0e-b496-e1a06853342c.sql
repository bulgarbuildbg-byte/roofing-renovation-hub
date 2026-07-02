
-- analytics_events attribution columns
ALTER TABLE public.analytics_events
  ADD COLUMN IF NOT EXISTS channel text,
  ADD COLUMN IF NOT EXISTS utm_content text,
  ADD COLUMN IF NOT EXISTS utm_term text,
  ADD COLUMN IF NOT EXISTS gclid text,
  ADD COLUMN IF NOT EXISTS fbclid text,
  ADD COLUMN IF NOT EXISTS ttclid text,
  ADD COLUMN IF NOT EXISTS landing_page text;
CREATE INDEX IF NOT EXISTS idx_analytics_events_channel ON public.analytics_events(channel);

-- inquiries attribution columns
ALTER TABLE public.inquiries
  ADD COLUMN IF NOT EXISTS channel text,
  ADD COLUMN IF NOT EXISTS utm_source text,
  ADD COLUMN IF NOT EXISTS utm_medium text,
  ADD COLUMN IF NOT EXISTS utm_campaign text,
  ADD COLUMN IF NOT EXISTS utm_content text,
  ADD COLUMN IF NOT EXISTS utm_term text,
  ADD COLUMN IF NOT EXISTS gclid text,
  ADD COLUMN IF NOT EXISTS fbclid text,
  ADD COLUMN IF NOT EXISTS ttclid text,
  ADD COLUMN IF NOT EXISTS landing_page text;

-- call_log attribution columns
ALTER TABLE public.call_log
  ADD COLUMN IF NOT EXISTS session_id text,
  ADD COLUMN IF NOT EXISTS channel text,
  ADD COLUMN IF NOT EXISTS utm_source text,
  ADD COLUMN IF NOT EXISTS utm_medium text,
  ADD COLUMN IF NOT EXISTS utm_campaign text,
  ADD COLUMN IF NOT EXISTS referrer_source text,
  ADD COLUMN IF NOT EXISTS page_path text,
  ADD COLUMN IF NOT EXISTS source text DEFAULT 'manual';

-- Allow anon inserts only for web-click sourced call events (never for other operations)
ALTER TABLE public.call_log ALTER COLUMN created_by DROP NOT NULL;
GRANT INSERT ON public.call_log TO anon;

DROP POLICY IF EXISTS "Anon can log web-clicked calls" ON public.call_log;
CREATE POLICY "Anon can log web-clicked calls"
ON public.call_log
FOR INSERT
TO anon
WITH CHECK (source = 'web_click' AND created_by IS NULL);

-- Back-fill channel from existing referrer_source so old rows appear in charts
UPDATE public.analytics_events
SET channel = CASE
  WHEN referrer_source = 'organic' THEN 'organic'
  WHEN referrer_source = 'social' THEN 'social_organic'
  WHEN referrer_source = 'email' THEN 'email'
  WHEN referrer_source = 'referral' THEN 'referral'
  ELSE 'direct'
END
WHERE channel IS NULL;

UPDATE public.inquiries
SET channel = CASE
  WHEN referrer_source = 'organic' THEN 'organic'
  WHEN referrer_source = 'social' THEN 'social_organic'
  WHEN referrer_source = 'email' THEN 'email'
  WHEN referrer_source = 'referral' THEN 'referral'
  ELSE 'direct'
END
WHERE channel IS NULL;
