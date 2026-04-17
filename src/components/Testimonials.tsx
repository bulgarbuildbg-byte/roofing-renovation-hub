import { useState, useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Star, Quote, Phone, BadgeCheck, ChevronLeft, ChevronRight, Wrench, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useTranslation } from "react-i18next";
import useEmblaCarousel from "embla-carousel-react";
import { isCityKey, type CityKey } from "@/i18n/cities";

interface Testimonial {
  id: string;
  author_name: string;
  location: string;
  text: string;
  rating: number;
  avatar_url: string | null;
  is_verified: boolean;
  service_type?: string | null;
  city?: string | null;
}

const getInitials = (name: string) =>
  name.split(" ").map((n) => n[0]).join(".").toUpperCase();

const maleAvatarIds = [3, 8, 13, 14, 51, 55, 56, 57, 58, 60];
const femaleAvatarIds = [5, 10, 16, 20, 21, 23, 25, 27, 28, 29, 31, 34, 38, 39, 40, 41, 43, 44, 45, 47, 48, 49];

const isFemale = (name: string) => {
  const first = name.split(" ")[0];
  return /а$/i.test(first);
};

const getAutoAvatar = (name: string, id: string, index: number) => {
  const pool = isFemale(name) ? femaleAvatarIds : maleAvatarIds;
  const hash = name.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0) + index * 7;
  return `https://i.pravatar.cc/200?img=${pool[hash % pool.length]}`;
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
  { id: "1", text: "Бърза реакция, ясни цени и отлично качество. Покривът беше ремонтиран за два дни. Горещо препоръчвам на всички!", author_name: "Иван Димитров", location: "кв. Левски, Варна", rating: 5, avatar_url: "https://i.pravatar.cc/200?img=12", is_verified: true, service_type: "repair", city: "varna" },
  { id: "2", text: "Много съм доволен от работата. Покривът вече не тече и получих 15 години гаранция. Професионално отношение от начало до край.", author_name: "Петър Стоянов", location: "кв. Чайка, Варна", rating: 5, avatar_url: "https://i.pravatar.cc/200?img=11", is_verified: true, service_type: "leak_repair", city: "varna" },
  { id: "3", text: "Професионална работа по хидроизолацията. Екипът беше точен, изряден и много вежлив. Ще ги препоръчам на приятели.", author_name: "Мария Колева", location: "кв. Аспарухово, Варна", rating: 5, avatar_url: "https://i.pravatar.cc/200?img=48", is_verified: true, service_type: "waterproofing", city: "varna" },
  { id: "4", text: "Отлична работа по ремонта на керемидите. Цената беше честна и работата беше свършена качествено. Благодаря!", author_name: "Георги Петров", location: "с. Константиново, Варна", rating: 5, avatar_url: "https://i.pravatar.cc/200?img=33", is_verified: true, service_type: "tiles", city: "varna" },
  { id: "5", text: "Бързо дойдоха за оглед и дадоха честна оценка. Ремонтът беше завършен преди обещаното. Препоръчвам без резерви!", author_name: "Елена Иванова", location: "кв. Младост, Варна", rating: 5, avatar_url: "https://i.pravatar.cc/200?img=9", is_verified: true, service_type: "replacement", city: "varna" },
  { id: "6", text: "Хидроизолацията на терасата беше направена перфектно. Вече няма течове дори при най-силните дъждове.", author_name: "Николай Василев", location: "кв. Владиславово, Варна", rating: 5, avatar_url: "https://i.pravatar.cc/200?img=52", is_verified: true, service_type: "flat_roof", city: "varna" },
  { id: "7", text: "Изградиха изцяло нов покрив на нашата вила. Работата е прецизна, материалите са качествени. Много доволни сме!", author_name: "Стоян Маринов", location: "гр. Аксаково, Варна", rating: 5, avatar_url: "https://i.pravatar.cc/200?img=7", is_verified: true, service_type: "new_construction", city: "varna" },
  { id: "8", text: "Поддръжката на покрива е редовна и качествена. Препоръчвам плана за годишна поддръжка – спестява много пари.", author_name: "Красимира Тодорова", location: "кв. Виница, Варна", rating: 5, avatar_url: "https://i.pravatar.cc/200?img=1", is_verified: true, service_type: "maintenance", city: "varna" },
  // Burgas
  { id: "b1", text: "Работихме с екипа за пълен ремонт на покрива на къщата ни в Сарафово. Изключително професионално отношение и качествена работа.", author_name: "Димитър Колев", location: "кв. Сарафово, Бургас", rating: 5, avatar_url: "https://i.pravatar.cc/200?img=14", is_verified: true, service_type: "repair", city: "burgas" },
  { id: "b2", text: "Хидроизолацията на терасата беше извършена бързо и качествено. Цената беше точно както бе оферирана, без скрити такси.", author_name: "Анна Стефанова", location: "кв. Лазур, Бургас", rating: 5, avatar_url: "https://i.pravatar.cc/200?img=21", is_verified: true, service_type: "waterproofing", city: "burgas" },
  { id: "b3", text: "Спешен ремонт на теч от покрива в Меден рудник — реагираха в същия ден. Спасиха таванския етаж от наводнение.", author_name: "Тодор Атанасов", location: "кв. Меден рудник, Бургас", rating: 5, avatar_url: "https://i.pravatar.cc/200?img=55", is_verified: true, service_type: "leak_repair", city: "burgas" },
  { id: "b4", text: "Подмяна на керемиди в Изгрев — отлична работа, чист терен след завършване. Препоръчвам ги без резерви!", author_name: "Иванка Петрова", location: "кв. Изгрев, Бургас", rating: 5, avatar_url: "https://i.pravatar.cc/200?img=25", is_verified: true, service_type: "tiles", city: "burgas" },
  // Ruse
  { id: "r1", text: "Изграждане на нов покрив в Здравец — целият процес от проектирането до завършването беше прозрачен и професионален.", author_name: "Васил Янков", location: "кв. Здравец, Русе", rating: 5, avatar_url: "https://i.pravatar.cc/200?img=8", is_verified: true, service_type: "new_construction", city: "ruse" },
  { id: "r2", text: "Хидроизолация на покрив във Възраждане — 15 години гаранция и безупречна работа. Препоръчвам на всеки в Русе.", author_name: "Светла Маринова", location: "кв. Възраждане, Русе", rating: 5, avatar_url: "https://i.pravatar.cc/200?img=44", is_verified: true, service_type: "waterproofing", city: "ruse" },
  { id: "r3", text: "Бърз и коректен ремонт на покрив в Чародейка. Цената беше изключително разумна за качеството.", author_name: "Пламен Иванов", location: "кв. Чародейка, Русе", rating: 5, avatar_url: "https://i.pravatar.cc/200?img=58", is_verified: true, service_type: "repair", city: "ruse" },
  { id: "r4", text: "Поддръжка на плосък покрив в Дружба — професионален екип, който работи прецизно. Много съм доволен.", author_name: "Кристина Тодорова", location: "кв. Дружба, Русе", rating: 5, avatar_url: "https://i.pravatar.cc/200?img=27", is_verified: true, service_type: "maintenance", city: "ruse" },
  // Dobrich
  { id: "d1", text: "Изключително професионален ремонт на покрива на къщата ни в Балик. Бърза реакция и качествена работа на разумна цена.", author_name: "Стефан Костов", location: "кв. Балик, Добрич", rating: 5, avatar_url: "https://i.pravatar.cc/200?img=13", is_verified: true, service_type: "repair", city: "dobrich" },
  { id: "d2", text: "Хидроизолация на терасата в кв. Дружба — без течове вече втора зима. Препоръчвам ги без колебание!", author_name: "Радостина Илиева", location: "кв. Дружба, Добрич", rating: 5, avatar_url: "https://i.pravatar.cc/200?img=29", is_verified: true, service_type: "waterproofing", city: "dobrich" },
  { id: "d3", text: "Подмяна на керемиди в Изгрев — точно в срок, чисто след работа и честна цена. Много доволни сме от екипа.", author_name: "Борислав Янев", location: "кв. Изгрев, Добрич", rating: 5, avatar_url: "https://i.pravatar.cc/200?img=51", is_verified: true, service_type: "tiles", city: "dobrich" },
  { id: "d4", text: "Нов покрив на вилата ни край Добрич — отлично качество на материалите и прецизна работа. 15 години гаранция!", author_name: "Татяна Николова", location: "кв. Център, Добрич", rating: 5, avatar_url: "https://i.pravatar.cc/200?img=40", is_verified: true, service_type: "new_construction", city: "dobrich" },
];

const Testimonials = () => {
  const { t } = useTranslation();
  const { "*": restPath } = useParams<{ "*": string }>();
  const firstSegment = (restPath || "").split("/")[0];
  const activeCity: CityKey = isCityKey(firstSegment) ? (firstSegment as CityKey) : "varna";

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "center",
    slidesToScroll: 1,
    containScroll: "trimSnaps",
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
    queryKey: ["testimonials-public", activeCity],
    queryFn: async () => {
      // Try city-filtered first
      const { data: cityData } = await supabase
        .from("testimonials")
        .select("id, author_name, location, text, rating, avatar_url, is_verified, service_type, city")
        .eq("is_active", true)
        .eq("city", activeCity)
        .order("sort_order", { ascending: true });

      if (cityData && cityData.length >= 3) return cityData as Testimonial[];

      // Fallback to all active (so cities without enough reviews still get social proof)
      const { data: allData, error } = await supabase
        .from("testimonials")
        .select("id, author_name, location, text, rating, avatar_url, is_verified, service_type, city")
        .eq("is_active", true)
        .order("sort_order", { ascending: true });

      if (error || !allData || allData.length === 0) {
        return fallbackTestimonials.filter((t) => t.city === activeCity).length >= 3
          ? fallbackTestimonials.filter((t) => t.city === activeCity)
          : fallbackTestimonials;
      }
      return allData as Testimonial[];
    },
  });

  // Apply city-priority sort: city-matched first, then others
  const displayTestimonials = (testimonials || fallbackTestimonials).slice().sort((a, b) => {
    const aMatch = a.city === activeCity ? 0 : 1;
    const bMatch = b.city === activeCity ? 0 : 1;
    return aMatch - bMatch;
  });

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
            <svg viewBox="0 0 24 24" className="w-6 h-6 shrink-0" aria-label="Google">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
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

        {/* Carousel with side arrows */}
        <div className="max-w-7xl mx-auto relative">
          {/* Left Arrow */}
          <Button
            variant="outline"
            size="icon"
            onClick={() => emblaApi?.scrollPrev()}
            disabled={!canScrollPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 rounded-full h-10 w-10 bg-background shadow-md border-border disabled:opacity-30 hidden md:flex"
            aria-label="Предишен отзив"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>

          {/* Right Arrow */}
          <Button
            variant="outline"
            size="icon"
            onClick={() => emblaApi?.scrollNext()}
            disabled={!canScrollNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 rounded-full h-10 w-10 bg-background shadow-md border-border disabled:opacity-30 hidden md:flex"
            aria-label="Следващ отзив"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>

          {/* Embla Carousel */}
          <div className="px-0 md:px-14">
            <div ref={emblaRef} className="overflow-hidden">
              <div className="flex gap-5">
                {displayTestimonials.map((testimonial, index) => {
                  const serviceLabel = testimonial.service_type
                    ? serviceLabels[testimonial.service_type] || testimonial.service_type
                    : null;

                  return (
                    <div
                      key={testimonial.id}
                      className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_48%] lg:flex-[0_0_31.5%]"
                    >
                      <Card className="bg-background border-border hover:shadow-lg transition-shadow h-full">
                        <CardContent className="p-5 md:p-6 flex flex-row items-start gap-4 h-full">
                          {/* Left: Circular Photo */}
                          <div className="flex-shrink-0">
                            <img
                              src={testimonial.avatar_url || getAutoAvatar(testimonial.author_name, testimonial.id, index)}
                              alt={testimonial.author_name}
                              className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover ring-2 ring-primary/20"
                              loading="lazy"
                              onError={(e) => {
                                const target = e.currentTarget;
                                target.onerror = null;
                                target.src = getAutoAvatar(testimonial.author_name, testimonial.id, index);
                              }}
                            />
                          </div>

                          {/* Right: Content */}
                          <div className="flex flex-col justify-between flex-1 min-w-0">
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
                                  <BadgeCheck className="w-4 h-4 text-blue-500 shrink-0" aria-label={t('testimonials.verified')} />
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
        </div>

        {/* Mobile arrows */}
        <div className="flex justify-center gap-3 mt-4 md:hidden">
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
