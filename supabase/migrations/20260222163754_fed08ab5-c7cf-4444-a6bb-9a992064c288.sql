
-- 1. Expand app_role enum with new roles
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'editor';
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'marketing';
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'support';
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'seo';

-- 2. Backlinks table (manual entry for now)
CREATE TABLE public.backlinks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  url TEXT NOT NULL,
  anchor_text TEXT,
  referring_domain TEXT NOT NULL,
  target_page TEXT DEFAULT '/',
  link_type TEXT NOT NULL DEFAULT 'external' CHECK (link_type IN ('external', 'internal')),
  follow_type TEXT NOT NULL DEFAULT 'follow' CHECK (follow_type IN ('follow', 'nofollow')),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'lost', 'broken')),
  discovered_at DATE NOT NULL DEFAULT CURRENT_DATE,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.backlinks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin/staff can view backlinks" ON public.backlinks FOR SELECT USING (is_admin_or_staff(auth.uid()));
CREATE POLICY "Admin/staff can insert backlinks" ON public.backlinks FOR INSERT WITH CHECK (is_admin_or_staff(auth.uid()));
CREATE POLICY "Admin/staff can update backlinks" ON public.backlinks FOR UPDATE USING (is_admin_or_staff(auth.uid()));
CREATE POLICY "Admin/staff can delete backlinks" ON public.backlinks FOR DELETE USING (is_admin_or_staff(auth.uid()));

CREATE TRIGGER update_backlinks_updated_at BEFORE UPDATE ON public.backlinks FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 3. Article views tracking
CREATE TABLE public.article_views (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  article_id UUID NOT NULL REFERENCES public.articles(id) ON DELETE CASCADE,
  session_id TEXT NOT NULL,
  viewed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  reading_time_seconds INTEGER
);

ALTER TABLE public.article_views ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert article views" ON public.article_views FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin/staff can view article views" ON public.article_views FOR SELECT USING (is_admin_or_staff(auth.uid()));

CREATE INDEX idx_article_views_article_id ON public.article_views(article_id);
CREATE INDEX idx_article_views_viewed_at ON public.article_views(viewed_at);

-- 4. Email campaigns table
CREATE TABLE public.email_campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  subject TEXT NOT NULL,
  body_html TEXT NOT NULL DEFAULT '',
  body_text TEXT,
  segment_filter JSONB DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'scheduled', 'sending', 'sent', 'failed')),
  scheduled_at TIMESTAMPTZ,
  sent_at TIMESTAMPTZ,
  total_recipients INTEGER DEFAULT 0,
  total_sent INTEGER DEFAULT 0,
  total_opened INTEGER DEFAULT 0,
  total_clicked INTEGER DEFAULT 0,
  total_unsubscribed INTEGER DEFAULT 0,
  created_by UUID NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.email_campaigns ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin/staff can view email campaigns" ON public.email_campaigns FOR SELECT USING (is_admin_or_staff(auth.uid()));
CREATE POLICY "Admin/staff can insert email campaigns" ON public.email_campaigns FOR INSERT WITH CHECK (is_admin_or_staff(auth.uid()));
CREATE POLICY "Admin/staff can update email campaigns" ON public.email_campaigns FOR UPDATE USING (is_admin_or_staff(auth.uid()));
CREATE POLICY "Admin/staff can delete email campaigns" ON public.email_campaigns FOR DELETE USING (is_admin_or_staff(auth.uid()));

CREATE TRIGGER update_email_campaigns_updated_at BEFORE UPDATE ON public.email_campaigns FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 5. Lead consent / unsubscribe tracking
ALTER TABLE public.inquiries ADD COLUMN IF NOT EXISTS email_consent BOOLEAN DEFAULT true;
ALTER TABLE public.inquiries ADD COLUMN IF NOT EXISTS sms_consent BOOLEAN DEFAULT true;
ALTER TABLE public.inquiries ADD COLUMN IF NOT EXISTS unsubscribed_at TIMESTAMPTZ;

-- 6. Add last_login to profiles
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS last_login TIMESTAMPTZ;
