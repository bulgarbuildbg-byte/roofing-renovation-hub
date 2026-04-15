
CREATE TABLE public.admin_tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'todo',
  priority TEXT NOT NULL DEFAULT 'medium',
  assigned_to UUID,
  due_date DATE,
  created_by UUID NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.admin_tasks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin/staff can view tasks"
ON public.admin_tasks FOR SELECT
TO authenticated
USING (public.is_admin_or_staff(auth.uid()));

CREATE POLICY "Admin/staff can create tasks"
ON public.admin_tasks FOR INSERT
TO authenticated
WITH CHECK (public.is_admin_or_staff(auth.uid()));

CREATE POLICY "Admin/staff can update tasks"
ON public.admin_tasks FOR UPDATE
TO authenticated
USING (public.is_admin_or_staff(auth.uid()));

CREATE POLICY "Admin/staff can delete tasks"
ON public.admin_tasks FOR DELETE
TO authenticated
USING (public.is_admin_or_staff(auth.uid()));

CREATE TRIGGER update_admin_tasks_updated_at
BEFORE UPDATE ON public.admin_tasks
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
