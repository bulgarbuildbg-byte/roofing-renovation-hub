import { useState, useRef } from "react";
import { Star, Quote, Phone, BadgeCheck, ChevronLeft, ChevronRight, Wrench } from "lucide-react";
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
  service_type?: string | null;
}

const getInitials = (name: string) => {
  return name.split(" ").map((n) => n[0]).join(".").toUpperCase();
};

const serviceLabels: Record<string, string> = {
  repair: "Ремонт на покрив",
  waterproofing: "Хидроизолация",
  tiles: "Подмяна на керемиди",
  flat_roof: "Плосък покрив",
  metal_roof: "Метален покрив",
  maintenance: "Поддръжка",
  leak_repair: "Течащ покрив",
  new_construction: "Нов покрив",
  replacement: "Реконструкция",
  other: "Покривни услуги",
};

const fallbackTestimonials: Testimonial[] = [
  {
    id: "1",
    text: "Бърза реакция, ясни цени и отлично качество. Покривът беше ремонтиран за два дни. Горещо препоръчвам на всички!",
    author_name: "Иван Димитров",
    location: "кв. Левски, Варна",
    rating: 5,
    avatar_url: null,
    is_verified: true,
    service_type: "repair",
  },
  {
    id: "2",
    text: "Много съм доволен от работата. Покривът вече не тече и получих 5 години гаранция. Професионално отношение от начало до край.",
    author_name: "Петър Стоянов",
    location: "кв. Чайка, Варна",
    rating: 5,
    avatar_url: null,
    is_verified: true,
    service_type: "leak_repair",
  },
  {
    id: "3",
    text: "Професионална работа по хидроизолацията. Екипът беше точен, изряден и много вежлив. Ще ги препоръчам на приятели.",
    author_name: "Мария Колева",
    location: "кв. Аспарухово, Варна",
    rating: 5,
    avatar_url: null,
    is_verified: true,
    service_type: "waterproofing",
  },
  {
    id: "4",
    text: "Отлична работа по ремонта на керемидите. Цената беше честна и работата беше свършена качествено. Благодаря!",
    author_name: "Георги Петров",
    location: "с. Константиново",
    rating: 5,
    avatar_url: null,
    is_verified: true,
    service_type: "tiles",
  },
  {
    id: "5",
    text: "Бързо дойдоха за оглед и дадоха честна оценка. Ремонтът беше завършен преди обещаното. Препоръчвам без резерви!",
    author_name: "Елена Иванова",
    location: "кв. Младост, Варна",
    rating: 5,
    avatar_url: null,
    is_verified: true,
    service_type: "replacement",
  },
  {
    id: "6",
    text: "Хидроизолацията на терасата беше направена перфектно. Вече няма течове дори при най-силните дъждове.",
    author_name: "Николай Василев",
    location: "кв. Владиславово, Варна",
    rating: 5,
    avatar_url: null,
    is_verified: true,
    service_type: "flat_roof",
  },
  {
    id: "7",
    text: "Изградиха изцяло нов покрив на нашата вила. Работата е прецизна, материалите са качествени. Много доволни сме!",
    author_name: "Стоян Маринов",
    location: "гр. Аксаково",
    rating: 5,
    avatar_url: null,
    is_verified: true,
    service_type: "new_construction",
  },
  {
    id: "8",
    text: "Поддръжката на покрива е редовна и качествена. Препоръчвам плана за годишна поддръжка – спестява много пари.",
    author_name: "Красимира Тодорова",
    location: "кв. Виница, Варна",
    rating: 5,
    avatar_url: null,
    is_verified: true,
    service_type: "maintenance",
  },
];

const Testimonials = () => {
  const { t } = useTranslation();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

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

  const scroll = (direction: "left" | "right") => {
    const container = scrollRef.current;
    if (!container) return;
    const amount = 380;
    container.scrollBy({ left: direction === "left" ? -amount : amount, behavior: "smooth" });
  };

  const handleScroll = () => {
    const container = scrollRef.current;
    if (!container) return;
    setCanScrollLeft(container.scrollLeft > 0);
    setCanScrollRight(container.scrollLeft + container.clientWidth < container.scrollWidth - 4);
  };

  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-12 md:py-20 bg-secondary overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10 md:mb-14">
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

        {/* Carousel controls */}
        <div className="flex justify-end gap-2 mb-4 max-w-6xl mx-auto">
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className="rounded-full h-10 w-10 border-border disabled:opacity-30"
            aria-label="Предишен отзив"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className="rounded-full h-10 w-10 border-border disabled:opacity-30"
            aria-label="Следващ отзив"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>

        {/* Horizontal scrollable carousel */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-4 md:gap-6 overflow-x-auto scroll-smooth pb-4 snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {displayTestimonials.map((testimonial) => {
            const serviceLabel = testimonial.service_type
              ? serviceLabels[testimonial.service_type] || testimonial.service_type
              : null;

            return (
              <Card
                key={testimonial.id}
                className="flex-shrink-0 w-[320px] md:w-[380px] snap-start bg-background border-border hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-5 md:p-6 flex flex-col h-full">
                  {/* Top row: service badge + stars */}
                  <div className="flex items-center justify-between mb-4">
                    {serviceLabel ? (
                      <span className="inline-flex items-center gap-1.5 bg-primary/8 text-primary text-xs font-semibold px-3 py-1 rounded-full border border-primary/15">
                        <Wrench className="w-3 h-3" />
                        {serviceLabel}
                      </span>
                    ) : (
                      <span />
                    )}
                    <div className="flex gap-0.5">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                      ))}
                    </div>
                  </div>

                  {/* Quote */}
                  <Quote className="w-6 h-6 text-accent/50 mb-3 flex-shrink-0" />
                  <p className="text-foreground leading-relaxed text-sm md:text-base flex-1 mb-5">
                    "{testimonial.text}"
                  </p>

                  {/* Author */}
                  <div className="border-t border-border pt-4 flex items-center gap-3">
                    <Avatar className="h-11 w-11 shrink-0 ring-2 ring-primary/10">
                      {testimonial.avatar_url ? (
                        <AvatarImage src={testimonial.avatar_url} alt={testimonial.author_name} loading="lazy" />
                      ) : null}
                      <AvatarFallback className="bg-primary/10 text-primary font-bold text-sm">
                        {getInitials(testimonial.author_name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <p className="font-bold text-foreground truncate text-sm">{testimonial.author_name}</p>
                        {testimonial.is_verified && (
                          <BadgeCheck className="w-4 h-4 text-accent shrink-0" aria-label={t('testimonials.verified')} />
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">{testimonial.location}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Scroll hint on mobile */}
        <p className="text-center text-xs text-muted-foreground mt-3 md:hidden">← Плъзнете за повече →</p>

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
