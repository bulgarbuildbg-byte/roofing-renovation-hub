import { Phone, ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLocalizedPath } from "@/hooks/useLocalizedPath";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";

import roofRepairImg from "@/assets/services/roof-repair.jpg";
import leakRepairImg from "@/assets/services/leak-repair.jpg";
import waterproofingImg from "@/assets/services/waterproofing.jpg";
import newRoofImg from "@/assets/services/new-roof.jpg";
import tileReplacementImg from "@/assets/services/tile-replacement.jpg";
import flatRoofImg from "@/assets/services/flat-roof.jpg";
import metalRoofImg from "@/assets/services/metal-roof.jpg";
import maintenanceImg from "@/assets/services/maintenance.jpg";
import type { RouteKey } from "@/i18n/routes";

const serviceKeys: { image: string; key: string; routeKey: RouteKey }[] = [
  { image: roofRepairImg, key: "roofRepair", routeKey: "roofRepair" },
  { image: waterproofingImg, key: "waterproofing", routeKey: "waterproofing" },
  { image: newRoofImg, key: "newRoof", routeKey: "newRoof" },
  { image: tileReplacementImg, key: "tileReplacement", routeKey: "tileReplacement" },
  { image: leakRepairImg, key: "leakRepair", routeKey: "leakRepair" },
  { image: flatRoofImg, key: "flatRoof", routeKey: "flatRoof" },
  { image: metalRoofImg, key: "metalRoof", routeKey: "metalRoof" },
  { image: maintenanceImg, key: "maintenance", routeKey: "maintenance" },
];

const Services = () => {
  const { t } = useTranslation();
  const { getPath } = useLocalizedPath();

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: true,
    slidesToScroll: 1,
    containScroll: false,
  });

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

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

  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="services" className="py-12 md:py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 md:mb-4">
            {t('services.title')}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('services.subtitle')}
          </p>
        </div>

        <div className="relative px-12 md:px-16">
          {/* Soft gradient fade on edges */}
          <div className="absolute left-12 md:left-16 top-0 bottom-0 w-8 md:w-12 bg-gradient-to-r from-secondary/80 to-transparent z-[5] pointer-events-none" />
          <div className="absolute right-12 md:right-16 top-0 bottom-0 w-8 md:w-12 bg-gradient-to-l from-secondary/80 to-transparent z-[5] pointer-events-none" />
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex -ml-4">
              {serviceKeys.map((service, index) => (
                <div
                  key={index}
                  className="min-w-0 shrink-0 grow-0 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4 pl-4"
                >
                  <Link to={getPath(service.routeKey)} className="block group h-full">
                    <Card className="bg-background hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-border flex flex-col overflow-hidden cursor-pointer h-full">
                      <div className="relative h-40 md:h-44 overflow-hidden">
                        <img
                          src={service.image}
                          alt={t(`services.${service.key}.title`)}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      </div>
                      <CardContent className="p-4 md:p-6 flex flex-col flex-grow">
                        <h3 className="text-lg md:text-xl font-bold text-foreground mb-2">
                          {t(`services.${service.key}.title`)}
                        </h3>
                        <p className="text-accent font-medium text-sm mb-3">
                          {t(`services.${service.key}.problem`)}
                        </p>
                        <ul className="text-muted-foreground text-sm mb-4 space-y-1">
                          {(t(`services.${service.key}.includes`) as string).split(',').slice(0, 3).map((item: string, i: number) => (
                            <li key={i} className="flex items-center gap-2">
                              <span className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                        <p className="text-foreground text-sm font-medium mb-4 mt-auto">
                          ✓ {t(`services.${service.key}.benefits`)}
                        </p>
                        <Link
                          to={getPath('contact')}
                          className="block"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Button className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
                            {t('services.freeQuote')}
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation arrows */}
          <button
            onClick={scrollPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-background shadow-lg border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors disabled:opacity-30"
            disabled={!canScrollPrev}
            aria-label="Previous"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={scrollNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-background shadow-lg border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors disabled:opacity-30"
            disabled={!canScrollNext}
            aria-label="Next"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* View All Services button */}
        <div className="mt-8 text-center">
          <Button
            asChild
            size="lg"
            variant="outline"
            className="h-14 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground text-lg font-bold px-10"
          >
            <Link to={getPath('services')}>
              {t('nav.allServices')}
            </Link>
          </Button>
        </div>

        <div className="mt-10 md:mt-12 text-center bg-primary/5 rounded-2xl p-6 md:p-10">
          <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3">
            {t('services.notSure')}
          </h3>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            {t('services.notSureDesc')}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              asChild
              size="lg"
              className="h-14 bg-accent hover:bg-accent/90 text-accent-foreground text-lg font-bold px-8"
            >
              <a href="tel:0884997659" className="flex items-center justify-center gap-2">
                <Phone className="w-5 h-5" />
                088 499 7659
              </a>
            </Button>
            <Button
              onClick={scrollToContact}
              size="lg"
              variant="outline"
              className="h-14 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground text-lg font-bold px-8"
            >
              {t('services.requestInspection')}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
