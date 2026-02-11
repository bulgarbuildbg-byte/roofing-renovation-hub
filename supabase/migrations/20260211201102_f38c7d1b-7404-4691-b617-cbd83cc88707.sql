
-- Add address column to inquiries
ALTER TABLE public.inquiries ADD COLUMN address text;

-- Create contract_status enum
CREATE TYPE public.contract_status AS ENUM ('draft', 'signed', 'completed');

-- Create contracts table
CREATE TABLE public.contracts (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  quote_id uuid NOT NULL REFERENCES public.quotes(id) ON DELETE CASCADE,
  inquiry_id uuid NOT NULL REFERENCES public.inquiries(id) ON DELETE CASCADE,
  created_by uuid NOT NULL,
  client_name text NOT NULL,
  client_address text,
  client_phone text NOT NULL,
  client_email text NOT NULL,
  total_price numeric NOT NULL DEFAULT 0,
  material_details text,
  custom_clauses text,
  status public.contract_status NOT NULL DEFAULT 'draft',
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.contracts ENABLE ROW LEVEL SECURITY;

-- RLS policies for contracts (admin/staff only)
CREATE POLICY "Admin/staff can view contracts" ON public.contracts FOR SELECT USING (is_admin_or_staff(auth.uid()));
CREATE POLICY "Admin/staff can insert contracts" ON public.contracts FOR INSERT WITH CHECK (is_admin_or_staff(auth.uid()));
CREATE POLICY "Admin/staff can update contracts" ON public.contracts FOR UPDATE USING (is_admin_or_staff(auth.uid()));
CREATE POLICY "Admin/staff can delete contracts" ON public.contracts FOR DELETE USING (is_admin_or_staff(auth.uid()));

-- Trigger for updated_at on contracts
CREATE TRIGGER update_contracts_updated_at
BEFORE UPDATE ON public.contracts
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
