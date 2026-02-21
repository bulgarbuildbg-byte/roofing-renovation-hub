
-- Create public storage bucket for AI-generated service images
INSERT INTO storage.buckets (id, name, public) VALUES ('service-images', 'service-images', true);

-- Allow public read access
CREATE POLICY "Service images are publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'service-images');

-- Allow authenticated users to upload (for edge function with service role)
CREATE POLICY "Service role can upload service images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'service-images');

-- Allow updates
CREATE POLICY "Service role can update service images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'service-images');
