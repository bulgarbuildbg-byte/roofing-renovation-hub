
-- 1. ENUMS
DO $$ BEGIN
  CREATE TYPE public.contract_workflow_status AS ENUM ('prepared','sent','signed','rejected');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE public.project_site_status AS ENUM ('pending_start','active','paused','completed','invoiced','problematic');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE public.project_document_category AS ENUM ('contracts','quotes','invoices','payments','photos','protocols','other');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- 2. EXTEND contracts
ALTER TABLE public.contracts
  ADD COLUMN IF NOT EXISTS contract_workflow_status public.contract_workflow_status NOT NULL DEFAULT 'prepared',
  ADD COLUMN IF NOT EXISTS signed_date date,
  ADD COLUMN IF NOT EXISTS contract_value numeric NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS service_categories text[] NOT NULL DEFAULT '{}'::text[],
  ADD COLUMN IF NOT EXISTS notes text;

-- 3. project_sites (CRM obects)
CREATE TABLE IF NOT EXISTS public.project_sites (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  contract_id uuid REFERENCES public.contracts(id) ON DELETE SET NULL,
  inquiry_id uuid REFERENCES public.inquiries(id) ON DELETE SET NULL,
  client_name text NOT NULL,
  client_phone text,
  client_email text,
  address text,
  city text,
  service_categories text[] NOT NULL DEFAULT '{}'::text[],
  contract_value numeric NOT NULL DEFAULT 0,
  signed_date date,
  expected_start_date date,
  expected_end_date date,
  status public.project_site_status NOT NULL DEFAULT 'pending_start',
  referrer_source text,
  notes text,
  created_by uuid NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.project_sites TO authenticated;
GRANT ALL ON public.project_sites TO service_role;
ALTER TABLE public.project_sites ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admin/staff view project_sites" ON public.project_sites FOR SELECT TO authenticated USING (public.is_admin_or_staff(auth.uid()));
CREATE POLICY "Admin/staff insert project_sites" ON public.project_sites FOR INSERT TO authenticated WITH CHECK (public.is_admin_or_staff(auth.uid()));
CREATE POLICY "Admin/staff update project_sites" ON public.project_sites FOR UPDATE TO authenticated USING (public.is_admin_or_staff(auth.uid()));
CREATE POLICY "Admin/staff delete project_sites" ON public.project_sites FOR DELETE TO authenticated USING (public.is_admin_or_staff(auth.uid()));
CREATE TRIGGER trg_project_sites_updated BEFORE UPDATE ON public.project_sites FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 4. project_documents
CREATE TABLE IF NOT EXISTS public.project_documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_site_id uuid NOT NULL REFERENCES public.project_sites(id) ON DELETE CASCADE,
  category public.project_document_category NOT NULL DEFAULT 'other',
  file_name text NOT NULL,
  file_url text NOT NULL,
  file_size bigint,
  notes text,
  uploaded_by uuid NOT NULL,
  uploaded_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.project_documents TO authenticated;
GRANT ALL ON public.project_documents TO service_role;
ALTER TABLE public.project_documents ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admin/staff view project_documents" ON public.project_documents FOR SELECT TO authenticated USING (public.is_admin_or_staff(auth.uid()));
CREATE POLICY "Admin/staff insert project_documents" ON public.project_documents FOR INSERT TO authenticated WITH CHECK (public.is_admin_or_staff(auth.uid()));
CREATE POLICY "Admin/staff update project_documents" ON public.project_documents FOR UPDATE TO authenticated USING (public.is_admin_or_staff(auth.uid()));
CREATE POLICY "Admin/staff delete project_documents" ON public.project_documents FOR DELETE TO authenticated USING (public.is_admin_or_staff(auth.uid()));

-- 5. project_timeline
CREATE TABLE IF NOT EXISTS public.project_timeline (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_site_id uuid NOT NULL REFERENCES public.project_sites(id) ON DELETE CASCADE,
  event_date timestamptz NOT NULL DEFAULT now(),
  event_type text NOT NULL DEFAULT 'note',
  description text NOT NULL,
  created_by uuid NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.project_timeline TO authenticated;
GRANT ALL ON public.project_timeline TO service_role;
ALTER TABLE public.project_timeline ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admin/staff view project_timeline" ON public.project_timeline FOR SELECT TO authenticated USING (public.is_admin_or_staff(auth.uid()));
CREATE POLICY "Admin/staff insert project_timeline" ON public.project_timeline FOR INSERT TO authenticated WITH CHECK (public.is_admin_or_staff(auth.uid()));
CREATE POLICY "Admin/staff update project_timeline" ON public.project_timeline FOR UPDATE TO authenticated USING (public.is_admin_or_staff(auth.uid()));
CREATE POLICY "Admin/staff delete project_timeline" ON public.project_timeline FOR DELETE TO authenticated USING (public.is_admin_or_staff(auth.uid()));

-- 6. Storage policies for project-documents bucket (bucket created via tool)
CREATE POLICY "Admin/staff read project-documents" ON storage.objects FOR SELECT TO authenticated USING (bucket_id = 'project-documents' AND public.is_admin_or_staff(auth.uid()));
CREATE POLICY "Admin/staff upload project-documents" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'project-documents' AND public.is_admin_or_staff(auth.uid()));
CREATE POLICY "Admin/staff update project-documents" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'project-documents' AND public.is_admin_or_staff(auth.uid()));
CREATE POLICY "Admin/staff delete project-documents" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'project-documents' AND public.is_admin_or_staff(auth.uid()));
