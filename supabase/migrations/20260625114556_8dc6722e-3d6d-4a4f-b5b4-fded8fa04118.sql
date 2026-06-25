
ALTER TABLE public.analytics_events
  ADD COLUMN IF NOT EXISTS device_type TEXT,
  ADD COLUMN IF NOT EXISTS viewport_w INTEGER,
  ADD COLUMN IF NOT EXISTS viewport_h INTEGER,
  ADD COLUMN IF NOT EXISTS time_on_page_ms INTEGER,
  ADD COLUMN IF NOT EXISTS is_exit BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS utm_source TEXT,
  ADD COLUMN IF NOT EXISTS utm_medium TEXT,
  ADD COLUMN IF NOT EXISTS utm_campaign TEXT,
  ADD COLUMN IF NOT EXISTS clarity_session_id TEXT;

CREATE INDEX IF NOT EXISTS idx_analytics_events_session_id ON public.analytics_events (session_id);
CREATE INDEX IF NOT EXISTS idx_analytics_events_created_at ON public.analytics_events (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_analytics_events_device_type ON public.analytics_events (device_type);

ALTER TABLE public.inquiries
  ADD COLUMN IF NOT EXISTS clarity_session_id TEXT,
  ADD COLUMN IF NOT EXISTS device_type TEXT;

CREATE INDEX IF NOT EXISTS idx_inquiries_session_id ON public.inquiries (session_id);
