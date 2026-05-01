import { useTranslation } from "react-i18next";
import { useLocalizedPath } from "@/hooks/useLocalizedPath";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const CompletedProjects = () => {
  const { t } = useTranslation();
  const { getPath } = useLocalizedPath();

  const { data: projects = [] } = useQuery({
    queryKey: ["completed-projects"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("is_active", true)
        .order("sort_order", { ascending: true })
        .limit(10);
      if (error) throw error;
      return data;
    },
  });

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

  if (projects.length === 0) return null;

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t("completedProjects.title")}
          </p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("completedProjects.subtitle")}
          </p>
        </div>

        <div className="relative">
          <Button variant="outline" size="icon" onClick={scrollPrev} disabled={!canScrollPrev}
            className="absolute -left-4 md:-left-6 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-background shadow-lg border-primary/20 hover:bg-primary hover:text-primary-foreground transition-colors">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <Button variant="outline" size="icon" onClick={scrollNext} disabled={!canScrollNext}
            className="absolute -right-4 md:-right-6 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-background shadow-lg border-primary/20 hover:bg-primary hover:text-primary-foreground transition-colors">
            <ArrowRight className="h-5 w-5" />
          </Button>

          <div ref={emblaRef} className="overflow-hidden mx-6 md:mx-8">
            <div className="flex -ml-4">
              {projects.map((project) => (
                <div key={project.id} className="min-w-0 shrink-0 grow-0 basis-full sm:basis-1/2 lg:basis-1/4 pl-4">
                  <Link to={getPath("projects")} className="block group rounded-xl overflow-hidden bg-background shadow-md hover:shadow-xl transition-all duration-300 border border-border/50">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      {project.image_urls?.[0] ? (
                        <img src={project.image_urls[0]} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                      ) : (
                        <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground text-sm">Няма снимка</div>
                      )}
                      <div className="absolute top-3 left-3">
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-primary text-primary-foreground shadow-sm">
                          <MapPin className="h-3 w-3" />{project.location}
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="font-semibold text-foreground text-sm md:text-base mb-1">{project.title}</p>
                      <p className="text-xs text-muted-foreground">{project.category_label || project.category}</p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center mt-10">
          <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8">
            <Link to={getPath("projects")}>{t("completedProjects.viewAll")}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CompletedProjects;
