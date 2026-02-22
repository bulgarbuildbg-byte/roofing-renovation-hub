import { Star, Quote, Phone, BadgeCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useTranslation } from "react-i18next";

interface Testimonial {
  id: string;
  author_name: string;
  location: string;
  text: string;
  rating: number;
  avatar_url: string | null;
  is_verified: boolean;
}

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join(".")
    .toUpperCase();
};

// Fallback data if DB is empty
const fallbackTestimonials: Testimonial[] = [
  { id: "1", text: "Бърза реакция, ясни цени и отлично качество. Покривът беше ремонтиран за два дни. Горещо препоръчвам!", author_name: "Иван Димитров", location: "кв. Левски, Варна", rating: 5, avatar_url: null, is_verified: true },
  { id: "2", text: "Много съм доволен от работата. Покривът вече не тече и получих 5 години гаранция. Професионално отношение от начало до край.", author_name: "Петър Стоянов", location: "кв. Чайка, Варна", rating: 5, avatar_url: null, is_verified: true },
  { id: "3", text: "Професионална работа по хидроизолацията. Екипът беше точен, изряден и много вежлив. Ще ги препоръчам на приятели.", author_name: "Мария Колева", location: "кв. Аспарухово, Варна", rating: 5, avatar_url: null, is_verified: true },
  { id: "4", text: "Отлична работа по ремонта на керемидите. Цената беше честна и работата беше свършена качествено. Благодаря!", author_name: "Георги Петров", location: "с. Константиново", rating: 5, avatar_url: null, is_verified: true },
  { id: "5", text: "Бързо дойдоха за оглед и дадоха честна оценка. Ремонтът беше завършен преди обещаното. Препоръчвам!", author_name: "Елена Иванова", location: "кв. Младост, Варна", rating: 5, avatar_url: null, is_verified: true },
  { id: "6", text: "Хидроизолацията на терасата беше направена перфектно. Вече няма течове дори при най-силните дъждове.", author_name: "Николай Василев", location: "кв. Владиславово, Варна", rating: 5, avatar_url: null, is_verified: true },
];

const Testimonials = () => {
  const { t } = useTranslation();

  const { data: testimonials } = useQuery({
    queryKey: ["testimonials-public"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("testimonials")
        .select("id, author_name, location, text, rating, avatar_url, is_verified")
        .eq("is_active", true)
        .order("sort_order", { ascending: true });
      if (error || !data || data.length === 0) return fallbackTestimonials;
      return data as Testimonial[];
    },
  });

  const displayTestimonials = testimonials || fallbackTestimonials;

  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="py-12 md:py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 md:mb-16">
          {/* Rating Badge */}
          <div className="inline-flex items-center gap-3 bg-accent/10 px-5 py-3 rounded-full mb-6">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-accent text-accent" />
              ))}
            </div>
            <span className="text-lg font-bold text-foreground">4.9/5</span>
            <span className="text-muted-foreground">{t('testimonials.fromReviews')}</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 md:mb-4">
            {t('testimonials.title')}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('testimonials.subtitle')}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto">
          {displayTestimonials.map((testimonial) => (
            <Card key={testimonial.id} className="bg-background border-border hover:shadow-lg transition-shadow">
              <CardContent className="p-4 md:p-6">
                <Quote className="w-7 h-7 md:w-8 md:h-8 text-accent mb-3 md:mb-4" />
                <div className="flex gap-0.5 mb-3 md:mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 md:w-5 md:h-5 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-foreground mb-4 md:mb-6 leading-relaxed text-sm md:text-base">
                  "{testimonial.text}"
                </p>
                <div className="border-t border-border pt-3 md:pt-4 flex items-center gap-3">
                  <Avatar className="h-10 w-10 shrink-0">
                    {testimonial.avatar_url ? (
                      <AvatarImage
                        src={testimonial.avatar_url}
                        alt={testimonial.author_name}
                        loading="lazy"
                      />
                    ) : null}
                    <AvatarFallback className="bg-primary/10 text-primary font-bold text-sm">
                      {getInitials(testimonial.author_name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <p className="font-bold text-foreground truncate">{testimonial.author_name}</p>
                      {testimonial.is_verified && (
                        <BadgeCheck className="w-4 h-4 text-accent shrink-0" aria-label={t('testimonials.verified')} />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Section CTA */}
        <div className="mt-10 md:mt-12 text-center">
          <p className="text-lg text-foreground font-medium mb-4">{t('testimonials.beNext')}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button 
              asChild
              size="lg"
              className="h-14 bg-accent hover:bg-accent/90 text-accent-foreground text-lg font-bold px-8"
            >
              <a href="tel:0884997659" className="flex items-center justify-center gap-2">
                <Phone className="w-5 h-5" />
                {t('testimonials.callNow')}
              </a>
            </Button>
            <Button 
              onClick={scrollToContact}
              size="lg"
              variant="outline"
              className="h-14 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground text-lg font-bold px-8"
            >
              {t('testimonials.requestInspection')}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
