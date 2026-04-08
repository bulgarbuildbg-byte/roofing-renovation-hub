import { useState, useCallback, useEffect } from "react";
import { Star, Quote, Phone, BadgeCheck, ChevronLeft, ChevronRight, Wrench, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useTranslation } from "react-i18next";
import useEmblaCarousel from "embla-carousel-react";

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

const getInitials = (name: string) =>
  name.split(" ").map((n) => n[0]).join(".").toUpperCase();

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
  { id: "1", text: "Бърза реакция, ясни цени и отлично качество. Покривът беше ремонтиран за два дни. Горещо препоръчвам на всички!", author_name: "Иван Димитров", location: "кв. Левски, Варна", rating: 5, avatar_url: "https://i.pravatar.cc/200?img=12", is_verified: true, service_type: "repair" },
  { id: "2", text: "Много съм доволен от работата. Покривът вече не тече и получих 5 години гаранция. Професионално отношение от начало до край.", author_name: "Петър Стоянов", location: "кв. Чайка, Варна", rating: 5, avatar_url: "https://i.pravatar.cc/200?img=11", is_verified: true, service_type: "leak_repair" },
  { id: "3", text: "Професионална работа по хидроизолацията. Екипът беше точен, изряден и много вежлив. Ще ги препоръчам на приятели.", author_name: "Мария Колева", location: "кв. Аспарухово, Варна", rating: 5, avatar_url: "https://i.pravatar.cc/200?img=5", is_verified: true, service_type: "waterproofing" },
  { id: "4", text: "Отлична работа по ремонта на керемидите. Цената беше честна и работата беше свършена качествено. Благодаря!", author_name: "Георги Петров", location: "с. Константиново", rating: 5, avatar_url: "https://i.pravatar.cc/200?img=8", is_verified: true, service_type: "tiles" },
  { id: "5", text: "Бързо дойдоха за оглед и дадоха честна оценка. Ремонтът беше завършен преди обещаното. Препоръчвам без резерви!", author_name: "Елена Иванова", location: "кв. Младост, Варна", rating: 5, avatar_url: "https://i.pravatar.cc/200?img=9", is_verified: true, service_type: "replacement" },
  { id: "6", text: "Хидроизолацията на терасата беше направена перфектно. Вече няма течове дори при най-силните дъждове.", author_name: "Николай Василев", location: "кв. Владиславово, Варна", rating: 5, avatar_url: "https://i.pravatar.cc/200?img=14", is_verified: true, service_type: "flat_roof" },
  { id: "7", text: "Изградиха изцяло нов покрив на нашата вила. Работата е прецизна, материалите са качествени. Много доволни сме!", author_name: "Стоян Маринов", location: "гр. Аксаково", rating: 5, avatar_url: "https://i.pravatar.cc/200?img=7", is_verified: true, service_type: "new_construction" },
  { id: "8", text: "Поддръжката на покрива е редовна и качествена. Препоръчвам плана за годишна поддръжка – спестява много пари.", author_name: "Красимира Тодорова", location: "кв. Виница, Варна", rating: 5, avatar_url: "https://i.pravatar.cc/200?img=1", is_verified: true, service_type: "maintenance" },
];

const Testimonials = () => {
  const { t } = useTranslation();
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    slidesToScroll: 1,
    containScroll: "trimSnaps",
    breakpoints: {
      "(min-width: 1024px)": { slidesToScroll: 1 },
    },
  });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi, onSelect]);

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
        <div className="flex justify-end gap-2 mb-4 max-w-7xl mx-auto">
          <Button
            variant="outline"
            size="icon"
            onClick={() => emblaApi?.scrollPrev()}
            disabled={!canScrollPrev}
            className="rounded-full h-10 w-10 border-border disabled:opacity-30"
            aria-label="Предишен отзив"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => emblaApi?.scrollNext()}
            disabled={!canScrollNext}
            className="rounded-full h-10 w-10 border-border disabled:opacity-30"
            aria-label="Следващ отзив"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>

        {/* Embla Carousel */}
        <div className="max-w-7xl mx-auto">
          <div ref={emblaRef} className="overflow-hidden">
            <div className="flex gap-5">
              {displayTestimonials.map((testimonial) => {
                const serviceLabel = testimonial.service_type
                  ? serviceLabels[testimonial.service_type] || testimonial.service_type
                  : null;

                return (
                  <div
                    key={testimonial.id}
                    className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_48%] lg:flex-[0_0_31.5%]"
                  >
                    <Card className="bg-background border-border hover:shadow-lg transition-shadow h-full">
                      <CardContent className="p-0 flex flex-row h-full">
                        {/* Left: Photo */}
                        <div className="flex-shrink-0 w-28 md:w-36 relative overflow-hidden rounded-l-xl">
                          {testimonial.avatar_url ? (
                            <img
                              src={testimonial.avatar_url}
                              alt={testimonial.author_name}
                              className="w-full h-full object-cover min-h-[180px]"
                              loading="lazy"
                            />
                          ) : (
                            <div className="w-full h-full min-h-[180px] bg-primary/10 flex items-center justify-center">
                              <span className="text-2xl font-bold text-primary">
                                {getInitials(testimonial.author_name)}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Right: Content */}
                        <div className="flex flex-col justify-between p-4 md:p-5 flex-1 min-w-0">
                          {/* Stars */}
                          <div>
                            <div className="flex gap-0.5 mb-2">
                              {Array.from({ length: testimonial.rating }).map((_, i) => (
                                <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                              ))}
                            </div>

                            {/* Quote */}
                            <p className="text-foreground leading-relaxed text-sm line-clamp-4 mb-3">
                              "{testimonial.text}"
                            </p>
                          </div>

                          {/* Author info */}
                          <div className="border-t border-border pt-3 mt-auto">
                            <div className="flex items-center gap-1.5 mb-1">
                              <p className="font-bold text-foreground text-sm truncate">
                                {testimonial.author_name}
                              </p>
                              {testimonial.is_verified && (
                                <BadgeCheck className="w-4 h-4 text-accent shrink-0" aria-label={t('testimonials.verified')} />
                              )}
                            </div>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
                              <MapPin className="w-3 h-3 shrink-0" />
                              <span className="truncate">{testimonial.location}</span>
                            </div>
                            {serviceLabel && (
                              <span className="inline-flex items-center gap-1 bg-primary/8 text-primary text-xs font-semibold px-2.5 py-0.5 rounded-full border border-primary/15">
                                <Wrench className="w-3 h-3" />
                                {serviceLabel}
                              </span>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                );
              })}
            </div>
          </div>
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
