
-- Enums
CREATE TYPE public.service_type AS ENUM ('repair', 'replacement', 'new_construction', 'waterproofing', 'tiles', 'flat_roof', 'metal_roof', 'maintenance', 'leak_repair', 'other');
CREATE TYPE public.material_type AS ENUM ('tiles', 'metal', 'bitumen', 'pvc_membrane', 'shingles', 'other');
CREATE TYPE public.roof_complexity AS ENUM ('single_pitch', 'gable', 'hip', 'complex');
CREATE TYPE public.inquiry_status AS ENUM ('new', 'contacted', 'quote_sent', 'accepted', 'rejected');
CREATE TYPE public.quote_status AS ENUM ('draft', 'sent', 'accepted', 'rejected');
CREATE TYPE public.app_role AS ENUM ('admin', 'staff');

-- Profiles
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  email TEXT,
  phone TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name', ''), NEW.email);
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- User roles (separate table per security requirements)
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function for role checks
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Helper: check if user is admin or staff
CREATE OR REPLACE FUNCTION public.is_admin_or_staff(_user_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role IN ('admin', 'staff')
  )
$$;

-- RLS for user_roles: only admins can see roles
CREATE POLICY "Admins can view all roles" ON public.user_roles
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Inquiries
CREATE TABLE public.inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  service_type service_type NOT NULL DEFAULT 'other',
  area_sqm NUMERIC,
  preferred_material material_type,
  roof_complexity roof_complexity,
  description TEXT,
  status inquiry_status NOT NULL DEFAULT 'new',
  assigned_to UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

-- Public can insert (anyone submits a form)
CREATE POLICY "Anyone can submit inquiry" ON public.inquiries
  FOR INSERT WITH CHECK (true);

-- Only admin/staff can view
CREATE POLICY "Admin/staff can view inquiries" ON public.inquiries
  FOR SELECT TO authenticated
  USING (public.is_admin_or_staff(auth.uid()));

-- Only admin/staff can update
CREATE POLICY "Admin/staff can update inquiries" ON public.inquiries
  FOR UPDATE TO authenticated
  USING (public.is_admin_or_staff(auth.uid()));

-- Inquiry files
CREATE TABLE public.inquiry_files (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  inquiry_id UUID NOT NULL REFERENCES public.inquiries(id) ON DELETE CASCADE,
  file_url TEXT NOT NULL,
  file_name TEXT NOT NULL,
  file_type TEXT,
  uploaded_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.inquiry_files ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can upload inquiry files" ON public.inquiry_files
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admin/staff can view inquiry files" ON public.inquiry_files
  FOR SELECT TO authenticated
  USING (public.is_admin_or_staff(auth.uid()));

-- Quotes
CREATE TABLE public.quotes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  inquiry_id UUID NOT NULL REFERENCES public.inquiries(id) ON DELETE CASCADE,
  created_by UUID NOT NULL REFERENCES auth.users(id),
  items JSONB NOT NULL DEFAULT '[]'::jsonb,
  subtotal NUMERIC NOT NULL DEFAULT 0,
  discount NUMERIC NOT NULL DEFAULT 0,
  total NUMERIC NOT NULL DEFAULT 0,
  terms TEXT,
  validity_days INTEGER NOT NULL DEFAULT 30,
  sent_at TIMESTAMPTZ,
  status quote_status NOT NULL DEFAULT 'draft',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.quotes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin/staff can view quotes" ON public.quotes
  FOR SELECT TO authenticated
  USING (public.is_admin_or_staff(auth.uid()));

CREATE POLICY "Admin/staff can insert quotes" ON public.quotes
  FOR INSERT TO authenticated
  WITH CHECK (public.is_admin_or_staff(auth.uid()));

CREATE POLICY "Admin/staff can update quotes" ON public.quotes
  FOR UPDATE TO authenticated
  USING (public.is_admin_or_staff(auth.uid()));

CREATE POLICY "Admin/staff can delete quotes" ON public.quotes
  FOR DELETE TO authenticated
  USING (public.is_admin_or_staff(auth.uid()));

-- Updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER update_inquiries_updated_at
  BEFORE UPDATE ON public.inquiries
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_quotes_updated_at
  BEFORE UPDATE ON public.quotes
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Storage bucket for inquiry attachments
INSERT INTO storage.buckets (id, name, public) VALUES ('inquiry-attachments', 'inquiry-attachments', false);

-- Storage policies: anyone can upload to inquiry-attachments
CREATE POLICY "Anyone can upload inquiry attachments"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'inquiry-attachments');

-- Admin/staff can view attachments
CREATE POLICY "Admin/staff can view inquiry attachments"
  ON storage.objects FOR SELECT
  TO authenticated
  USING (bucket_id = 'inquiry-attachments' AND public.is_admin_or_staff(auth.uid()));
