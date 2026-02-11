
-- Add modular text columns and photo_urls to quotes table
ALTER TABLE public.quotes ADD COLUMN work_description text;
ALTER TABLE public.quotes ADD COLUMN work_phases text;
ALTER TABLE public.quotes ADD COLUMN invoicing_schedule text;
ALTER TABLE public.quotes ADD COLUMN warranty_text text;
ALTER TABLE public.quotes ADD COLUMN force_majeure text;
ALTER TABLE public.quotes ADD COLUMN technical_notes text;
ALTER TABLE public.quotes ADD COLUMN manual_additions text;
ALTER TABLE public.quotes ADD COLUMN photo_urls text[] DEFAULT '{}';

-- Create document-photos storage bucket
INSERT INTO storage.buckets (id, name, public) VALUES ('document-photos', 'document-photos', true);

-- Storage policies for document-photos
CREATE POLICY "Admin/staff can upload document photos"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'document-photos' AND (SELECT is_admin_or_staff(auth.uid())));

CREATE POLICY "Anyone can view document photos"
ON storage.objects FOR SELECT
USING (bucket_id = 'document-photos');

CREATE POLICY "Admin/staff can delete document photos"
ON storage.objects FOR DELETE
USING (bucket_id = 'document-photos' AND (SELECT is_admin_or_staff(auth.uid())));
