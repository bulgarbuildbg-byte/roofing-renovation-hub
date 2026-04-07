-- Phase 1: Bot detection column
ALTER TABLE public.analytics_events ADD COLUMN is_bot boolean DEFAULT false;

-- Phase 2: Conversion tracking columns on inquiries
ALTER TABLE public.inquiries ADD COLUMN session_id text;
ALTER TABLE public.inquiries ADD COLUMN referrer_source text;

-- Phase 4: Call log table
CREATE TABLE public.call_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name text NOT NULL,
  client_phone text NOT NULL,
  client_email text,
  inquiry_id uuid REFERENCES public.inquiries(id) ON DELETE SET NULL,
  call_direction text NOT NULL DEFAULT 'inbound',
  call_date timestamptz NOT NULL DEFAULT now(),
  duration_minutes integer,
  notes text,
  created_by uuid NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.call_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin/staff can view call_log" ON public.call_log
  FOR SELECT TO authenticated USING (is_admin_or_staff(auth.uid()));

CREATE POLICY "Admin/staff can insert call_log" ON public.call_log
  FOR INSERT TO authenticated WITH CHECK (is_admin_or_staff(auth.uid()));

CREATE POLICY "Admin/staff can update call_log" ON public.call_log
  FOR UPDATE TO authenticated USING (is_admin_or_staff(auth.uid()));

CREATE POLICY "Admin/staff can delete call_log" ON public.call_log
  FOR DELETE TO authenticated USING (is_admin_or_staff(auth.uid()));