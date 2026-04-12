import { useTranslation } from "react-i18next";
import { useLocalizedPath } from "@/hooks/useLocalizedPath";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";

import asparuhovoImg from "@/assets/portfolio/asparuhovo-varna.jpeg";
import kavarnaImg from "@/assets/portfolio/kavarna-hotel.jpeg";
import trakataImg from "@/assets/portfolio/trakata-varna.jpg";
import oblastImg from "@/assets/portfolio/oblast-varna.jpeg";
import makedoniaImg from "@/assets/portfolio/makedonia-25-varna.jpeg";
import podpolkovnikImg from "@/assets/portfolio/podpolkovnik-varna.jpeg";
import shoshkovaImg from "@/assets/portfolio/shoshkova-gradina-varna.jpeg";

const CompletedProjects = () => {
  const { t } = useTranslation();
  const { getPath } = useLocalizedPath();

  const projects = [
    { image: asparuhovoImg, titleKey: "completedProjects.project1Title", locationKey: "completedProjects.project1Location", serviceKey: "completedProjects.project1Service" },
    { image: kavarnaImg, titleKey: "completedProjects.project2Title", locationKey: "completedProjects.project2Location", serviceKey: "completedProjects.project2Service" },
    { image: trakataImg, titleKey: "completedProjects.project3Title", locationKey: "completedProjects.project3Location", serviceKey: "completedProjects.project3Service" },
    { image: oblastImg, titleKey: "completedProjects.project4Title", locationKey: "completedProjects.project4Location", serviceKey: "completedProjects.project4Service" },
    { image: makedoniaImg, titleKey: "completedProjects.project5Title", locationKey: "completedProjects.project5Location", serviceKey: "completedProjects.project5Service" },
    { image: podpolkovnikImg, titleKey: "completedProjects.project6Title", locationKey: "completedProjects.project6Location", serviceKey: "completedProjects.project6Service" },
    { image: shoshkovaImg, titleKey: "completedProjects.project7Title", locationKey: "completedProjects.project7Location", serviceKey: "completedProjects.project7Service" },
  ];

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: true,
    slidesToScroll: 1,
  });

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => {
      setCanScrollPrev(emblaApi.canScrollPrev());
      setCanScrollNext(emblaApi.canScrollNext());
    };
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi]);

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t("completedProjects.title")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("completedProjects.subtitle")}
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">
          {/* Navigation Arrows */}
          <Button
            variant="outline"
            size="icon"
            onClick={scrollPrev}
            disabled={!canScrollPrev}
            className="absolute -left-4 md:-left-6 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-background shadow-lg border-primary/20 hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={scrollNext}
            disabled={!canScrollNext}
            className="absolute -right-4 md:-right-6 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-background shadow-lg border-primary/20 hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            <ArrowRight className="h-5 w-5" />
          </Button>

          <div ref={emblaRef} className="overflow-hidden mx-6 md:mx-8">
            <div className="flex -ml-4">
              {projects.map((project, index) => (
                <div
                  key={index}
                  className="min-w-0 shrink-0 grow-0 basis-full sm:basis-1/2 lg:basis-1/4 pl-4"
                >
                  <Link to={getPath("projects")} className="block group rounded-xl overflow-hidden bg-background shadow-md hover:shadow-xl transition-all duration-300 border border-border/50">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={project.image}
                        alt={t(project.titleKey)}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-primary text-primary-foreground shadow-sm">
                          <MapPin className="h-3 w-3" />
                          {t(project.locationKey)}
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-foreground text-sm md:text-base mb-1">
                        {t(project.titleKey)}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {t(project.serviceKey)}
                      </p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* View All Button */}
        <div className="text-center mt-10">
          <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8">
            <Link to={getPath("projects")}>
              {t("completedProjects.viewAll")}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CompletedProjects;
