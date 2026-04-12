
-- Projects table
CREATE TABLE public.projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  location TEXT NOT NULL DEFAULT '',
  date TEXT,
  category TEXT NOT NULL DEFAULT 'roof_repair',
  category_label TEXT,
  description TEXT,
  materials TEXT,
  image_urls TEXT[] NOT NULL DEFAULT '{}',
  is_active BOOLEAN NOT NULL DEFAULT true,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active projects"
ON public.projects FOR SELECT
USING (is_active = true);

CREATE POLICY "Admin/staff can view all projects"
ON public.projects FOR SELECT
TO authenticated
USING (is_admin_or_staff(auth.uid()));

CREATE POLICY "Admin/staff can insert projects"
ON public.projects FOR INSERT
TO authenticated
WITH CHECK (is_admin_or_staff(auth.uid()));

CREATE POLICY "Admin/staff can update projects"
ON public.projects FOR UPDATE
TO authenticated
USING (is_admin_or_staff(auth.uid()));

CREATE POLICY "Admin/staff can delete projects"
ON public.projects FOR DELETE
TO authenticated
USING (is_admin_or_staff(auth.uid()));

CREATE TRIGGER update_projects_updated_at
BEFORE UPDATE ON public.projects
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Storage buckets
INSERT INTO storage.buckets (id, name, public) VALUES ('project-images', 'project-images', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('testimonial-avatars', 'testimonial-avatars', true);

-- Storage policies for project-images
CREATE POLICY "Project images are publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'project-images');

CREATE POLICY "Admin/staff can upload project images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'project-images' AND is_admin_or_staff(auth.uid()));

CREATE POLICY "Admin/staff can update project images"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'project-images' AND is_admin_or_staff(auth.uid()));

CREATE POLICY "Admin/staff can delete project images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'project-images' AND is_admin_or_staff(auth.uid()));

-- Storage policies for testimonial-avatars
CREATE POLICY "Testimonial avatars are publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'testimonial-avatars');

CREATE POLICY "Admin/staff can upload testimonial avatars"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'testimonial-avatars' AND is_admin_or_staff(auth.uid()));

CREATE POLICY "Admin/staff can update testimonial avatars"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'testimonial-avatars' AND is_admin_or_staff(auth.uid()));

CREATE POLICY "Admin/staff can delete testimonial avatars"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'testimonial-avatars' AND is_admin_or_staff(auth.uid()));
