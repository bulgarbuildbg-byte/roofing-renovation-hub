import { MapPin, Wrench } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { useLocalizedPath } from "@/hooks/useLocalizedPath";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const Gallery = () => {
  const { t } = useTranslation();
  const { getPath } = useLocalizedPath();

  const { data: projects = [] } = useQuery({
    queryKey: ["gallery-projects"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("is_active", true)
        .order("sort_order", { ascending: true })
        .limit(6);
      if (error) throw error;
      return data;
    },
  });

  return (
    <section id="gallery" className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">{t('gallery.title')}</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{t('gallery.subtitle')}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project.id} className="group bg-background rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
              <div className="relative overflow-hidden">
                {project.image_urls?.[0] ? (
                  <img src={project.image_urls[0]} alt={`${project.title} - ${project.category_label || project.category}`} loading="lazy" decoding="async" width={600} height={400} className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500" />
                ) : (
                  <div className="w-full h-64 bg-muted flex items-center justify-center text-muted-foreground">Няма снимка</div>
                )}
                <div className="absolute top-4 left-4 bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-medium">
                  {project.category_label || project.category}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-2">{project.title}</h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{project.description}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{project.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {projects.length > 0 && (
          <div className="text-center mt-12">
            <Link to={getPath('projects')}>
              <Button variant="outline" size="lg" className="text-lg px-8">{t('gallery.seeAll')}</Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;
