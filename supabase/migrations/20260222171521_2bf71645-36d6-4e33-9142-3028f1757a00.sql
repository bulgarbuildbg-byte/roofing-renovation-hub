
-- Create testimonials table for admin management
CREATE TABLE public.testimonials (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  author_name TEXT NOT NULL,
  location TEXT NOT NULL,
  text TEXT NOT NULL,
  rating INTEGER NOT NULL DEFAULT 5,
  avatar_url TEXT,
  service_type TEXT,
  review_date DATE DEFAULT CURRENT_DATE,
  is_verified BOOLEAN NOT NULL DEFAULT false,
  consent_received BOOLEAN NOT NULL DEFAULT false,
  is_active BOOLEAN NOT NULL DEFAULT true,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

-- Public can view active testimonials
CREATE POLICY "Anyone can view active testimonials"
  ON public.testimonials FOR SELECT
  USING (is_active = true);

-- Admin/staff full access
CREATE POLICY "Admin/staff can view all testimonials"
  ON public.testimonials FOR SELECT
  USING (is_admin_or_staff(auth.uid()));

CREATE POLICY "Admin/staff can insert testimonials"
  ON public.testimonials FOR INSERT
  WITH CHECK (is_admin_or_staff(auth.uid()));

CREATE POLICY "Admin/staff can update testimonials"
  ON public.testimonials FOR UPDATE
  USING (is_admin_or_staff(auth.uid()));

CREATE POLICY "Admin/staff can delete testimonials"
  ON public.testimonials FOR DELETE
  USING (is_admin_or_staff(auth.uid()));

-- Trigger for updated_at
CREATE TRIGGER update_testimonials_updated_at
  BEFORE UPDATE ON public.testimonials
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Seed initial testimonials
INSERT INTO public.testimonials (author_name, location, text, rating, is_verified, is_active, sort_order) VALUES
('Иван Димитров', 'кв. Левски, Варна', 'Бърза реакция, ясни цени и отлично качество. Покривът беше ремонтиран за два дни. Горещо препоръчвам!', 5, true, true, 1),
('Петър Стоянов', 'кв. Чайка, Варна', 'Много съм доволен от работата. Покривът вече не тече и получих 5 години гаранция. Професионално отношение от начало до край.', 5, true, true, 2),
('Мария Колева', 'кв. Аспарухово, Варна', 'Професионална работа по хидроизолацията. Екипът беше точен, изряден и много вежлив. Ще ги препоръчам на приятели.', 5, true, true, 3),
('Георги Петров', 'с. Константиново', 'Отлична работа по ремонта на керемидите. Цената беше честна и работата беше свършена качествено. Благодаря!', 5, true, true, 4),
('Елена Иванова', 'кв. Младост, Варна', 'Бързо дойдоха за оглед и дадоха честна оценка. Ремонтът беше завършен преди обещаното. Препоръчвам!', 5, true, true, 5),
('Николай Василев', 'кв. Владиславово, Варна', 'Хидроизолацията на терасата беше направена перфектно. Вече няма течове дори при най-силните дъждове.', 5, true, true, 6);
