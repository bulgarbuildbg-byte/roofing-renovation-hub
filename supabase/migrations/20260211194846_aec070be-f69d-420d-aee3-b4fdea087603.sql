
-- Create articles table
CREATE TABLE public.articles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content TEXT NOT NULL DEFAULT '',
  excerpt TEXT,
  cover_image_url TEXT,
  category TEXT NOT NULL DEFAULT 'general',
  tags TEXT[] DEFAULT '{}',
  published BOOLEAN NOT NULL DEFAULT false,
  author_id UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  published_at TIMESTAMP WITH TIME ZONE
);

-- Enable RLS
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;

-- Public can read published articles
CREATE POLICY "Anyone can view published articles"
ON public.articles FOR SELECT
USING (published = true);

-- Admin/staff can view all articles
CREATE POLICY "Admin/staff can view all articles"
ON public.articles FOR SELECT
USING (is_admin_or_staff(auth.uid()));

-- Admin/staff can insert articles
CREATE POLICY "Admin/staff can insert articles"
ON public.articles FOR INSERT
WITH CHECK (is_admin_or_staff(auth.uid()));

-- Admin/staff can update articles
CREATE POLICY "Admin/staff can update articles"
ON public.articles FOR UPDATE
USING (is_admin_or_staff(auth.uid()));

-- Admin/staff can delete articles
CREATE POLICY "Admin/staff can delete articles"
ON public.articles FOR DELETE
USING (is_admin_or_staff(auth.uid()));

-- Trigger for updated_at
CREATE TRIGGER update_articles_updated_at
BEFORE UPDATE ON public.articles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create article-images storage bucket (public read)
INSERT INTO storage.buckets (id, name, public) VALUES ('article-images', 'article-images', true);

-- Storage policies for article-images
CREATE POLICY "Anyone can view article images"
ON storage.objects FOR SELECT
USING (bucket_id = 'article-images');

CREATE POLICY "Admin/staff can upload article images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'article-images' AND is_admin_or_staff(auth.uid()));

CREATE POLICY "Admin/staff can update article images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'article-images' AND is_admin_or_staff(auth.uid()));

CREATE POLICY "Admin/staff can delete article images"
ON storage.objects FOR DELETE
USING (bucket_id = 'article-images' AND is_admin_or_staff(auth.uid()));
