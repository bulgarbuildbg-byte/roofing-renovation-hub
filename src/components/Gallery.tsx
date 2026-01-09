import { MapPin, Wrench } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import project4 from "@/assets/project-4.jpg";
import project5 from "@/assets/project-5.jpg";
import after1 from "@/assets/after-1.jpg";

const projects = [
  {
    image: project1,
    title: "Жилищна Сграда - кв. Левски",
    description: "Пълна реконструкция на покрив с нови керемиди Bramac и хидроизолация. Подменена дървена конструкция и монтаж на нови улуци.",
    location: "кв. Левски, Варна",
    type: "Реконструкция на покрив",
    duration: "2 седмици"
  },
  {
    image: project2,
    title: "Търговски Обект - Център",
    description: "Монтаж на метален покрив с термоизолация за търговска сграда. Включва водоотводна система и снегозадържатели.",
    location: "Център, Варна",
    type: "Нов метален покрив",
    duration: "10 дни"
  },
  {
    image: project3,
    title: "Семейна Къща - кв. Чайка",
    description: "Ремонт на стар покрив и цялостна хидроизолация. Смяна на повредени керемиди и обновяване на улуци.",
    location: "кв. Чайка, Варна",
    type: "Ремонт и хидроизолация",
    duration: "1 седмица"
  },
  {
    image: project4,
    title: "Вила - с. Звездица",
    description: "Монтаж на нови керемиди на семейна вила. Включва подмяна на летви и пароизолация.",
    location: "с. Звездица, Варна",
    type: "Монтаж на керемиди",
    duration: "5 дни"
  },
  {
    image: project5,
    title: "Жилищна Сграда - кв. Аспарухово",
    description: "Детайлна работа по монтаж на керемиди с прецизно изпълнение. Качествени материали и професионална работа.",
    location: "кв. Аспарухово, Варна",
    type: "Ремонт на покрив",
    duration: "1 седмица"
  },
  {
    image: after1,
    title: "Панелен Блок - кв. Владиславово",
    description: "Цялостна подмяна на керемиден покрив с нови материали. Монтаж на водоотводна система.",
    location: "кв. Владиславово, Варна",
    type: "Пълна реконструкция",
    duration: "3 седмици"
  }
];

const Gallery = () => {
  return (
    <section id="gallery" className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Нашите Проекти
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Галерия от някои от нашите успешно завършени проекти във Варна
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div 
              key={index} 
              className="group bg-background rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
            >
              <div className="relative overflow-hidden">
                <img 
                  src={project.image} 
                  alt={`${project.title} - ${project.type} във Варна`}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-medium">
                  {project.type}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-2">{project.title}</h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                  {project.description}
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {project.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Wrench className="w-4 h-4" />
                    {project.duration}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/проекти">
            <Button variant="outline" size="lg" className="text-lg px-8">
              Вижте всички проекти
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
