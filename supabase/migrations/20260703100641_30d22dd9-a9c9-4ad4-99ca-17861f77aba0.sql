
-- Tighten existing DELETE policies from admin/staff to admin-only
DROP POLICY IF EXISTS "Admin/staff can delete tasks" ON public.admin_tasks;
CREATE POLICY "Admin can delete tasks" ON public.admin_tasks FOR DELETE TO authenticated USING (public.has_role(auth.uid(),'admin'));

DROP POLICY IF EXISTS "Admin/staff can delete articles" ON public.articles;
CREATE POLICY "Admin can delete articles" ON public.articles FOR DELETE TO authenticated USING (public.has_role(auth.uid(),'admin'));

DROP POLICY IF EXISTS "Admin/staff can delete backlinks" ON public.backlinks;
CREATE POLICY "Admin can delete backlinks" ON public.backlinks FOR DELETE TO authenticated USING (public.has_role(auth.uid(),'admin'));

DROP POLICY IF EXISTS "Admin/staff can delete call_log" ON public.call_log;
CREATE POLICY "Admin can delete call_log" ON public.call_log FOR DELETE TO authenticated USING (public.has_role(auth.uid(),'admin'));

DROP POLICY IF EXISTS "Admin/staff can delete campaigns" ON public.campaigns;
CREATE POLICY "Admin can delete campaigns" ON public.campaigns FOR DELETE TO authenticated USING (public.has_role(auth.uid(),'admin'));

DROP POLICY IF EXISTS "Admin/staff can delete comments" ON public.comments;
CREATE POLICY "Admin can delete comments" ON public.comments FOR DELETE TO authenticated USING (public.has_role(auth.uid(),'admin'));

DROP POLICY IF EXISTS "Admin/staff delete contract_files" ON public.contract_files;
CREATE POLICY "Admin delete contract_files" ON public.contract_files FOR DELETE TO authenticated USING (public.has_role(auth.uid(),'admin'));

DROP POLICY IF EXISTS "Admin/staff can delete contracts" ON public.contracts;
CREATE POLICY "Admin can delete contracts" ON public.contracts FOR DELETE TO authenticated USING (public.has_role(auth.uid(),'admin'));

DROP POLICY IF EXISTS "Admin/staff can delete email campaigns" ON public.email_campaigns;
CREATE POLICY "Admin can delete email campaigns" ON public.email_campaigns FOR DELETE TO authenticated USING (public.has_role(auth.uid(),'admin'));

DROP POLICY IF EXISTS "Admin/staff delete project_documents" ON public.project_documents;
CREATE POLICY "Admin delete project_documents" ON public.project_documents FOR DELETE TO authenticated USING (public.has_role(auth.uid(),'admin'));

DROP POLICY IF EXISTS "Admin/staff delete project_sites" ON public.project_sites;
CREATE POLICY "Admin delete project_sites" ON public.project_sites FOR DELETE TO authenticated USING (public.has_role(auth.uid(),'admin'));

DROP POLICY IF EXISTS "Admin/staff delete project_timeline" ON public.project_timeline;
CREATE POLICY "Admin delete project_timeline" ON public.project_timeline FOR DELETE TO authenticated USING (public.has_role(auth.uid(),'admin'));

DROP POLICY IF EXISTS "Admin/staff can delete projects" ON public.projects;
CREATE POLICY "Admin can delete projects" ON public.projects FOR DELETE TO authenticated USING (public.has_role(auth.uid(),'admin'));

DROP POLICY IF EXISTS "Admin/staff can delete quotes" ON public.quotes;
CREATE POLICY "Admin can delete quotes" ON public.quotes FOR DELETE TO authenticated USING (public.has_role(auth.uid(),'admin'));

DROP POLICY IF EXISTS "Admin/staff can delete testimonials" ON public.testimonials;
CREATE POLICY "Admin can delete testimonials" ON public.testimonials FOR DELETE TO authenticated USING (public.has_role(auth.uid(),'admin'));

-- Add admin-only DELETE for tables that previously had no delete policy
CREATE POLICY "Admin can delete inquiries" ON public.inquiries FOR DELETE TO authenticated USING (public.has_role(auth.uid(),'admin'));
CREATE POLICY "Admin can delete inquiry_files" ON public.inquiry_files FOR DELETE TO authenticated USING (public.has_role(auth.uid(),'admin'));
CREATE POLICY "Admin can delete analytics_events" ON public.analytics_events FOR DELETE TO authenticated USING (public.has_role(auth.uid(),'admin'));
CREATE POLICY "Admin can delete article_views" ON public.article_views FOR DELETE TO authenticated USING (public.has_role(auth.uid(),'admin'));
