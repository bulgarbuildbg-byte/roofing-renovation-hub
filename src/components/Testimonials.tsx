import { Star, Quote, Phone, BadgeCheck, ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useTranslation } from "react-i18next";
import { useRef } from "react";

interface Testimonial {
  id: string;
  author_name: string;
  location: string;
  text: string;
  rating: number;
  avatar_url: string | null;
  is_verified: boolean;
  service_type?: string | null;
}

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join(".")
    .toUpperCase();
};

const serviceLabels: Record<string, string> = {
  repair: "Ремонт на покрив",
  replacement: "Пълна реконструкция",
  new_construction: "Нов покрив",
  waterproofing: "Хидроизолация",
  tiles: "Смяна на керемиди",
  flat_roof: "Плосък покрив",
  metal_roof: "Метален покрив",
  maintenance: "Поддръжка",
  leak_repair: "Ремонт на течове",
  other: "Покривна услуга",
};

const fallbackTestimonials: Testimonial[] = [
  { id: "1", text: "Бърза реакция, ясни цени и отлично качество. Покривът беше ремонтиран за два дни. Горещо препоръчвам!", author_name: "Иван Димитров", location: "кв. Левски, Варна", rating: 5, avatar_url: null, is_verified: true, service_type: "repair" },
  { id: "2", text: "Много съм доволен от работата. Покривът вече не тече и получих 5 години гаранция. Професионално отношение от начало до край.", author_name: "Петър Стоянов", location: "кв. Чайка, Варна", rating: 5, avatar_url: null, is_verified: true, service_type: "leak_repair" },
  { id: "3", text: "Професионална работа по хидроизолацията. Екипът беше точен, изряден и много вежлив. Ще ги препоръчам на приятели.", author_name: "Мария Колева", location: "кв. Аспарухово, Варна", rating: 5, avatar_url: null, is_verified: true, service_type: "waterproofing" },
  { id: "4", text: "Отлична работа по ремонта на керемидите. Цената беше честна и работата беше свършена качествено. Благодаря!", author_name: "Георги Петров", location: "с. Константиново", rating: 5, avatar_url: null, is_verified: true, service_type: "tiles" },
  { id: "5", text: "Бързо дойдоха за оглед и дадоха честна оценка. Ремонтът беше завършен преди обещаното. Препоръчвам!", author_name: "Елена Иванова", location: "кв. Младост, Варна", rating: 5, avatar_url: null, is_verified: true, service_type: "replacement" },
  { id: "6", text: "Хидроизолацията на терасата беше направена перфектно. Вече няма течове дори при най-силните дъждове.", author_name: "Николай Василев", location: "кв. Владиславово, Варна", rating: 5, avatar_url: null, is_verified: true, service_type: "flat_roof" },
];

const Testimonials = () => {
  const { t } = useTranslation();
  const scrollRef = useRef<HTMLDivElement>(null);

  const { data: testimonials } = useQuery({
    queryKey: ["testimonials-public"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("testimonials")
        .select("id, author_name, location, text, rating, avatar_url, is_verified, service_type")
        .eq("is_active", true)
        .order("sort_order", { ascending: true });
      if (error || !data || data.length === 0) return fallbackTestimonials;
      return data as Testimonial[];
    },
  });

  const displayTestimonials = testimonials || fallbackTestimonials;

  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.8;
    scrollRef.current.scrollBy({ left: dir === "right" ? amount : -amount, behavior: "smooth" });
  };

  return (
    <section className="py-12 md:py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 md:mb-16">
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

        {/* Carousel navigation */}
        <div className="relative max-w-6xl mx-auto">
          <button
            onClick={() => scroll("left")}
            className="hidden md:flex absolute -left-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-background border border-border rounded-full shadow-md items-center justify-center hover:bg-muted transition-colors"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="hidden md:flex absolute -right-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-background border border-border rounded-full shadow-md items-center justify-center hover:bg-muted transition-colors"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5 text-foreground" />
          </button>

          {/* Scrollable track */}
          <div
            ref={scrollRef}
            className="flex gap-4 md:gap-6 overflow-x-auto scroll-smooth pb-4 snap-x snap-mandatory"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {displayTestimonials.map((testimonial) => (
              <Card
                key={testimonial.id}
                className="bg-background border-border hover:shadow-lg transition-shadow flex-shrink-0 w-[85vw] sm:w-[380px] md:w-[340px] lg:w-[360px] snap-start"
              >
                <CardContent className="p-5 md:p-6 flex flex-col h-full">
                  <Quote className="w-7 h-7 text-accent mb-3" />

                  {/* Service badge */}
                  {testimonial.service_type && (
                    <span className="inline-block bg-primary/10 text-primary text-xs font-semibold px-2.5 py-1 rounded-full mb-3 w-fit">
                      {serviceLabels[testimonial.service_type] ?? testimonial.service_type}
                    </span>
                  )}

                  <div className="flex gap-0.5 mb-3">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                    ))}
                  </div>
                  <p className="text-foreground mb-5 leading-relaxed text-sm flex-1">
                    "{testimonial.text}"
                  </p>
                  <div className="border-t border-border pt-4 flex items-center gap-3">
                    <Avatar className="h-11 w-11 shrink-0 ring-2 ring-accent/20">
                      {testimonial.avatar_url ? (
                        <AvatarImage src={testimonial.avatar_url} alt={testimonial.author_name} loading="lazy" />
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
                      <p className="text-xs text-muted-foreground">{testimonial.location}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Mobile scroll hint */}
        <p className="text-center text-xs text-muted-foreground mt-2 md:hidden">← Плъзнете за повече отзиви →</p>

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
