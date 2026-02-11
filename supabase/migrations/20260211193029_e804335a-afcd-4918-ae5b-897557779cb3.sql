
-- Allow admins to insert roles
CREATE POLICY "Admins can insert roles" ON public.user_roles
  FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Allow admins to delete roles
CREATE POLICY "Admins can delete roles" ON public.user_roles
  FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Allow admin/staff to read profiles (for staff list, assignments)
CREATE POLICY "Admin/staff can view all profiles" ON public.profiles
  FOR SELECT TO authenticated
  USING (public.is_admin_or_staff(auth.uid()));
