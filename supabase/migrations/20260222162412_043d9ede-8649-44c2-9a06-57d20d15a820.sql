
-- ============================================
-- CAMPAIGNS TABLE (Marketing Campaign Management)
-- ============================================
CREATE TABLE public.campaigns (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  platform TEXT NOT NULL DEFAULT 'organic',
  start_date DATE NOT NULL,
  end_date DATE,
  budget NUMERIC NOT NULL DEFAULT 0,
  notes TEXT,
  created_by UUID NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.campaigns ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin/staff can view campaigns" ON public.campaigns FOR SELECT USING (is_admin_or_staff(auth.uid()));
CREATE POLICY "Admin/staff can insert campaigns" ON public.campaigns FOR INSERT WITH CHECK (is_admin_or_staff(auth.uid()));
CREATE POLICY "Admin/staff can update campaigns" ON public.campaigns FOR UPDATE USING (is_admin_or_staff(auth.uid()));
CREATE POLICY "Admin/staff can delete campaigns" ON public.campaigns FOR DELETE USING (is_admin_or_staff(auth.uid()));

CREATE TRIGGER update_campaigns_updated_at BEFORE UPDATE ON public.campaigns FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================
-- ADD campaign_id AND admin_notes TO INQUIRIES
-- ============================================
ALTER TABLE public.inquiries ADD COLUMN campaign_id UUID REFERENCES public.campaigns(id) ON DELETE SET NULL;
ALTER TABLE public.inquiries ADD COLUMN admin_notes TEXT;

-- ============================================
-- COMMENTS TABLE (Article Discussion System)
-- ============================================
CREATE TABLE public.comments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  article_id UUID NOT NULL REFERENCES public.articles(id) ON DELETE CASCADE,
  parent_id UUID REFERENCES public.comments(id) ON DELETE CASCADE,
  author_name TEXT NOT NULL,
  author_email TEXT NOT NULL,
  content TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;

-- Public can view approved comments
CREATE POLICY "Anyone can view approved comments" ON public.comments FOR SELECT USING (status = 'approved');
-- Anyone can submit a comment (goes to pending)
CREATE POLICY "Anyone can submit comments" ON public.comments FOR INSERT WITH CHECK (true);
-- Admin/staff full access
CREATE POLICY "Admin/staff can view all comments" ON public.comments FOR SELECT USING (is_admin_or_staff(auth.uid()));
CREATE POLICY "Admin/staff can update comments" ON public.comments FOR UPDATE USING (is_admin_or_staff(auth.uid()));
CREATE POLICY "Admin/staff can delete comments" ON public.comments FOR DELETE USING (is_admin_or_staff(auth.uid()));

CREATE TRIGGER update_comments_updated_at BEFORE UPDATE ON public.comments FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Index for faster article comment lookups
CREATE INDEX idx_comments_article_id ON public.comments(article_id);
CREATE INDEX idx_comments_parent_id ON public.comments(parent_id);
CREATE INDEX idx_comments_status ON public.comments(status);

-- Index for campaign lookups on inquiries
CREATE INDEX idx_inquiries_campaign_id ON public.inquiries(campaign_id);
