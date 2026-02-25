import { useState } from "react";
import { MapPin, Wrench, Filter } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";
import { useLocalizedPath } from "@/hooks/useLocalizedPath";

import project1 from "@/assets/portfolio/residential-tile-roof.jpg";
import project2 from "@/assets/portfolio/apartment-building.jpg";
import project3 from "@/assets/portfolio/family-house.jpg";
import project4 from "@/assets/portfolio/villa-roof.jpg";
import project5 from "@/assets/portfolio/commercial-building.jpg";
import after1 from "@/assets/portfolio/panel-block.jpg";

type Category = "all" | "tiles" | "waterproofing" | "leak" | "flat" | "renovation";

interface Project {
  image: string;
  title: string;
  description: string;
  location: string;
  type: string;
  duration: string;
  materials: string;
  category: Category;
}

const projects: Project[] = [
  {
    image: project1,
    title: "Жилищна Сграда - кв. Левски",
    description: "Пълна реконструкция на покрив с нови керемиди Bramac и хидроизолация. Подменени над 2000 кв.м керемиди.",
    location: "кв. Левски, Варна",
    type: "Пълна реконструкция",
    duration: "2 седмици",
    materials: "Bramac керемиди, Sika хидроизолация",
    category: "renovation",
  },
  {
    image: project2,
    title: "Панелен Блок - Център",
    description: "Монтаж на метален покрив с термоизолация за търговска сграда. Използвани Bauder мембрани.",
    location: "Център, Варна",
    type: "Хидроизолация",
    duration: "10 дни",
    materials: "Bauder мембрани, Dörken Delta",
    category: "waterproofing",
  },
  {
    image: project3,
    title: "Семейна Къща - кв. Чайка",
    description: "Ремонт на стар покрив и цялостна хидроизолация. Отстранени множество течове.",
    location: "кв. Чайка, Варна",
    type: "Ремонт на течове",
    duration: "1 седмица",
    materials: "Vedag битумни мембрани",
    category: "leak",
  },
  {
    image: project4,
    title: "Вила - с. Звездица",
    description: "Монтаж на нови Tondach керамични керемиди на семейна вила. Цялостна подмяна.",
    location: "с. Звездица, Варна",
    type: "Смяна на керемиди",
    duration: "5 дни",
    materials: "Tondach керамични керемиди",
    category: "tiles",
  },
  {
    image: project5,
    title: "Търговски Обект - кв. Аспарухово",
    description: "Изграждане на нова плоска покривна система с PVC мембрани и термоизолация.",
    location: "кв. Аспарухово, Варна",
    type: "Плосък покрив",
    duration: "1 седмица",
    materials: "Icopal PVC мембрани",
    category: "flat",
  },
  {
    image: after1,
    title: "Панелен Блок - кв. Владиславово",
    description: "Цялостна подмяна на керемиден покрив с нови Creaton материали и ново дървено покритие.",
    location: "кв. Владиславово, Варна",
    type: "Пълна реконструкция",
    duration: "3 седмици",
    materials: "Creaton керемиди, Bramac аксесоари",
    category: "renovation",
  },
];

const filterLabels: Record<Category, string> = {
  all: "Всички проекти",
  tiles: "Смяна на керемиди",
  waterproofing: "Хидроизолация",
  leak: "Ремонт на течове",
  flat: "Плоски покриви",
  renovation: "Пълна реконструкция",
};

const categoryColors: Record<Category, string> = {
  all: "",
  tiles: "bg-amber-500/10 text-amber-700 border-amber-200",
  waterproofing: "bg-blue-500/10 text-blue-700 border-blue-200",
  leak: "bg-red-500/10 text-red-700 border-red-200",
  flat: "bg-slate-500/10 text-slate-700 border-slate-200",
  renovation: "bg-accent/10 text-accent border-accent/30",
};

const Gallery = () => {
  const { t } = useTranslation();
  const { getPath } = useLocalizedPath();
  const [activeFilter, setActiveFilter] = useState<Category>("all");

  const filtered = activeFilter === "all"
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  const filters: Category[] = ["all", "renovation", "tiles", "waterproofing", "leak", "flat"];

  return (
    <section id="gallery" className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">{t('gallery.title')}</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{t('gallery.subtitle')}</p>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          <Filter className="w-5 h-5 text-muted-foreground self-center mr-1 hidden sm:block" />
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all duration-200 ${
                activeFilter === f
                  ? "bg-primary text-primary-foreground border-primary shadow-md scale-105"
                  : "bg-background text-muted-foreground border-border hover:border-primary/50 hover:text-foreground"
              }`}
            >
              {filterLabels[f]}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((project, index) => (
            <div key={index} className="group bg-background rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={`${project.title} - ${project.type}`}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold border ${categoryColors[project.category]}`}>
                  {project.type}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-2">{project.title}</h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{project.description}</p>
                <div className="border-t border-border pt-3 flex flex-col gap-1.5 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                    {project.location}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Wrench className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                    {project.materials}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to={getPath('projects')}>
            <Button variant="outline" size="lg" className="text-lg px-8">{t('gallery.seeAll')}</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
