-- 1. Add new inquiry status enum values
ALTER TYPE inquiry_status ADD VALUE IF NOT EXISTS 'quote_prepared';
ALTER TYPE inquiry_status ADD VALUE IF NOT EXISTS 'contract_prepared';
ALTER TYPE inquiry_status ADD VALUE IF NOT EXISTS 'contract_sent';
ALTER TYPE inquiry_status ADD VALUE IF NOT EXISTS 'contract_signed';
ALTER TYPE inquiry_status ADD VALUE IF NOT EXISTS 'contract_rejected';
ALTER TYPE inquiry_status ADD VALUE IF NOT EXISTS 'project_active';
ALTER TYPE inquiry_status ADD VALUE IF NOT EXISTS 'project_completed';
ALTER TYPE inquiry_status ADD VALUE IF NOT EXISTS 'invoiced';

-- 2. Extend contracts table
ALTER TABLE public.contracts
  ADD COLUMN IF NOT EXISTS contract_number TEXT,
  ADD COLUMN IF NOT EXISTS currency TEXT NOT NULL DEFAULT 'EUR';

-- 3. Create contract_files table
CREATE TABLE IF NOT EXISTS public.contract_files (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  contract_id UUID NOT NULL,
  file_url TEXT NOT NULL,
  file_name TEXT NOT NULL,
  file_type TEXT,
  file_size BIGINT,
  category TEXT NOT NULL DEFAULT 'contract',
  notes TEXT,
  uploaded_by UUID NOT NULL,
  uploaded_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.contract_files TO authenticated;
GRANT ALL ON public.contract_files TO service_role;

ALTER TABLE public.contract_files ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin/staff view contract_files"
  ON public.contract_files FOR SELECT TO authenticated
  USING (is_admin_or_staff(auth.uid()));

CREATE POLICY "Admin/staff insert contract_files"
  ON public.contract_files FOR INSERT TO authenticated
  WITH CHECK (is_admin_or_staff(auth.uid()));

CREATE POLICY "Admin/staff update contract_files"
  ON public.contract_files FOR UPDATE TO authenticated
  USING (is_admin_or_staff(auth.uid()));

CREATE POLICY "Admin/staff delete contract_files"
  ON public.contract_files FOR DELETE TO authenticated
  USING (is_admin_or_staff(auth.uid()));

CREATE INDEX IF NOT EXISTS idx_contract_files_contract_id ON public.contract_files(contract_id);