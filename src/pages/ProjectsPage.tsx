import { useState } from "react";
import { Helmet } from "react-helmet";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BeforeAfterGallery from "@/components/BeforeAfterGallery";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { MapPin, Calendar, Package, ChevronRight, Phone } from "lucide-react";
import { useLocalizedPath } from "@/hooks/useLocalizedPath";

const FILTER_CATEGORIES = [
  { id: "all", label: "Всички проекти" },
  { id: "tiles", label: "Подмяна на керемиди" },
  { id: "waterproofing", label: "Хидроизолация" },
  { id: "leak_repair", label: "Течащ покрив" },
  { id: "flat_roof", label: "Плосък покрив" },
  { id: "renovation", label: "Цялостна реконструкция" },
];

const ProjectsPage = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const { getPath } = useLocalizedPath();

  const { data: projects = [] } = useQuery({
    queryKey: ["public-projects"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("is_active", true)
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return data;
    },
  });

  const filtered = activeFilter === "all"
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  return (
    <>
      <Helmet>
        <title>Реални Проекти – Ремонт на Покриви Варна | Преди и След</title>
        <meta name="description" content="500+ завършени покривни проекта. Реални снимки преди и след, материали, локации. Хидроизолации, керемиди, нови покриви – Варна и областта." />
        <meta name="keywords" content="проекти покриви варна, преди след покрив, хидроизолация варна примери, реконструкция покрив варна" />
        <meta property="og:title" content="Реални Проекти – Ремонт на Покриви Варна | Преди и След" />
        <meta property="og:description" content="500+ завършени покривни проекта. Реални снимки преди и след." />
        <meta property="og:type" content="website" />
      </Helmet>

      <Header />

      <main className="pt-20">
        {/* Hero */}
        <section className="bg-primary text-primary-foreground py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 bg-accent/20 text-accent-foreground px-4 py-2 rounded-full text-sm font-semibold mb-6">
              500+ завършени проекта
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Реални Проекти – Покриви Варна</h1>
            <p className="text-xl text-primary-foreground/85 max-w-3xl mx-auto mb-8">
              Разгледайте реално завършени проекти на нашия екип. Снимки преди и след ремонта, използвани материали и местоположение на всеки обект.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold px-8">
                <a href="tel:+359884997659" className="flex items-center gap-2">
                  <Phone className="w-5 h-5" />Обадете се сега
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary-foreground/50 text-primary-foreground hover:bg-primary-foreground/10 font-bold px-8">
                <Link to={getPath('inspection')}>Безплатен оглед</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Before / After */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-foreground mb-3">Преди и След – Трансформации на Покриви</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">Плъзнете плъзгача, за да видите разликата между стария и новия покрив</p>
            </div>
            <BeforeAfterGallery />
          </div>
        </section>

        {/* Filter + Project Cards */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-foreground mb-3">Завършени Покривни Проекти</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">Филтрирайте по вид услуга и вижте детайли за всеки проект</p>
            </div>

            <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-10">
              {FILTER_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveFilter(cat.id)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all duration-200 ${
                    activeFilter === cat.id
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background text-foreground border-border hover:border-primary/50 hover:text-primary"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {filtered.map((project) => (
                <Card key={project.id} className="overflow-hidden border-border bg-card hover:shadow-xl transition-all duration-300 group">
                  <div className="aspect-video bg-muted relative overflow-hidden">
                    {project.image_urls?.[0] ? (
                      <img
                        src={project.image_urls[0]}
                        alt={`${project.title} – ${project.location}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground">Няма снимка</div>
                    )}
                    <span className="absolute top-3 right-3 bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                      {project.category_label || project.category}
                    </span>
                  </div>
                  <CardContent className="p-5 md:p-6">
                    <h3 className="text-lg font-bold text-card-foreground mb-2">{project.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">{project.description}</p>
                    {project.materials && (
                      <div className="flex items-start gap-2 mb-4 bg-muted/50 rounded-lg px-3 py-2">
                        <Package className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <p className="text-xs text-muted-foreground">{project.materials}</p>
                      </div>
                    )}
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{project.location}</span>
                      {project.date && <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{project.date}</span>}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filtered.length === 0 && (
              <p className="text-center text-muted-foreground py-8">Няма проекти в тази категория.</p>
            )}
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 text-center max-w-4xl mx-auto">
              {[
                { value: "500+", label: "Завършени проекти" },
                { value: "15+", label: "Години опит" },
                { value: "98%", label: "Доволни клиенти" },
                { value: "15г.", label: "Гаранция за работата" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-4xl md:text-5xl font-bold text-primary mb-2">{stat.value}</div>
                  <p className="text-muted-foreground text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Вашият проект може да бъде следващият</h2>
            <p className="text-xl text-primary-foreground/85 mb-8 max-w-2xl mx-auto">Свържете се с нас за безплатен оглед и оферта без ангажимент</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold px-8">
                <a href="tel:+359884997659" className="flex items-center gap-2">
                  <Phone className="w-5 h-5" />Обадете се: 0884 997 659
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary-foreground/60 text-primary-foreground hover:bg-primary-foreground/10 font-bold px-8">
                <Link to={getPath('inspection')} className="flex items-center gap-2">
                  Запитване за оферта<ChevronRight className="w-5 h-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default ProjectsPage;
