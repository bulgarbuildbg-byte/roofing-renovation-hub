import { MapPin, Wrench } from "lucide-react"; // gallery v2
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { useLocalizedPath } from "@/hooks/useLocalizedPath";

import asparuhovoImg from "@/assets/portfolio/asparuhovo-varna.jpeg";
import kavarnaImg from "@/assets/portfolio/kavarna-hotel.jpeg";
import trakataImg from "@/assets/portfolio/trakata-varna.jpg";
import oblastImg from "@/assets/portfolio/oblast-varna.jpeg";
import makedoniaImg from "@/assets/portfolio/makedonia-25-varna.jpeg";
import podpolkovnikImg from "@/assets/portfolio/podpolkovnik-varna.jpeg";
import shoshkovaImg from "@/assets/portfolio/shoshkova-gradina-varna.jpeg";

const projects = [
  { image: asparuhovoImg, title: "Жилищен блок кв. Аспарухово", description: "Пълна реконструкция на покрива – демонтаж на стари материали, нова хидроизолация и покривно покритие.", location: "кв. Аспарухово, Варна", type: "Цялостна реконструкция", duration: "3 седмици" },
  { image: kavarnaImg, title: "Хотелска сграда Каварна", description: "Хидроизолация на хотелска сграда с PVC мембрана и укрепване на критични зони.", location: "гр. Каварна", type: "Хидроизолация", duration: "2 седмици" },
  { image: trakataImg, title: "Вила м-т Траката", description: "Смяна на стари керемиди и монтаж на нови с подобрена хидроизолация и вентилация.", location: "м-т Траката, Варна", type: "Подмяна на керемиди", duration: "1 седмица" },
  { image: oblastImg, title: "Жилищна сграда обл. Варна", description: "Спешен ремонт на течащ покрив – локализация на течовете и пълно отстраняване с гаранция.", location: "обл. Варна", type: "Течащ покрив", duration: "5 дни" },
  { image: makedoniaImg, title: "Плосък покрив ул. Македония 25", description: "Двуслойна PVC хидроизолация на плосък покрив с 10-годишна гаранция.", location: "ул. Македония 25, Варна", type: "Плосък покрив", duration: "1 седмица" },
  { image: podpolkovnikImg, title: "Ремонт на покрив ул. Подполковник", description: "Цялостна реконструкция – нова дървена конструкция, мембрана и керамични керемиди.", location: "ул. Подполковник, Варна", type: "Реконструкция", duration: "2 седмици" },
  { image: shoshkovaImg, title: "Пълна смяна на покрив Шошкова градина 7", description: "Демонтаж на стария покрив и изграждане на нов – греди, мембрана, керемиди.", location: "Шошкова градина 7, Варна", type: "Пълна реконструкция", duration: "3 седмици" },
];

const Gallery = () => {
  const { t } = useTranslation();
  const { getPath } = useLocalizedPath();

  return (
    <section id="gallery" className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">{t('gallery.title')}</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{t('gallery.subtitle')}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="group bg-background rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
              <div className="relative overflow-hidden">
                <img src={project.image} alt={`${project.title} - ${project.type}`} loading="lazy" decoding="async" width={600} height={400} className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute top-4 left-4 bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-medium">{project.type}</div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-2">{project.title}</h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{project.description}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{project.location}</span>
                  <span className="flex items-center gap-1"><Wrench className="w-4 h-4" />{project.duration}</span>
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
