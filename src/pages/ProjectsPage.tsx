import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCallButton from "@/components/FloatingCallButton";
import BeforeAfterGallery from "@/components/BeforeAfterGallery";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { MapPin, Calendar, Wrench } from "lucide-react";

// Import project images - Portfolio building types
import project1 from "@/assets/portfolio/residential-tile-roof.jpg";
import project2 from "@/assets/portfolio/apartment-building.jpg";
import project3 from "@/assets/portfolio/family-house.jpg";
import project4 from "@/assets/portfolio/villa-roof.jpg";
import project5 from "@/assets/portfolio/commercial-building.jpg";
import after1 from "@/assets/portfolio/panel-block.jpg";

const ProjectsPage = () => {
  const featuredProjects = [
    {
      title: "Пълен ремонт на покрив",
      location: "кв. Левски, Варна",
      date: "2024",
      type: "Ремонт на покрив",
      description: "Цялостна подмяна на керемиди и хидроизолация на жилищна сграда.",
      image: project1
    },
    {
      title: "Хидроизолация на плосък покрив",
      location: "кв. Чайка, Варна",
      date: "2024",
      type: "Хидроизолация",
      description: "Професионална хидроизолация с PVC мембрана на търговски обект.",
      image: project2
    },
    {
      title: "Изграждане на нов покрив",
      location: "с. Приселци, Варна",
      date: "2023",
      type: "Нов покрив",
      description: "Проектиране и изграждане на нова покривна конструкция за еднофамилна къща.",
      image: project3
    },
    {
      title: "Ремонт след буря",
      location: "кв. Аспарухово, Варна",
      date: "2024",
      type: "Аварен ремонт",
      description: "Спешен ремонт на повредени от буря покривни елементи.",
      image: project4
    },
    {
      title: "Подмяна на улуци",
      location: "кв. Владиславово, Варна",
      date: "2024",
      type: "Поддръжка",
      description: "Демонтаж на стари и монтаж на нови водосточни тръби и улуци.",
      image: project5
    },
    {
      title: "Топлоизолация на таван",
      location: "гр. Аксаково",
      date: "2023",
      type: "Изолация",
      description: "Полагане на топлоизолация за подобряване на енергийната ефективност.",
      image: after1
    }
  ];

  return (
    <>
      <Helmet>
        <title>Проекти Покриви Варна - Преди и След | 500+</title>
        <meta name="description" content="Разгледайте 500+ завършени проекта за ремонт на покриви във Варна. Реални снимки преди и след ремонта." />
        <meta name="keywords" content="ремонт покриви варна снимки, проекти покриви варна, хидроизолация варна примери, преди след покрив" />
        <link rel="canonical" href="https://www.remontnapokrivivarna.bg/проекти" />
        <meta property="og:title" content="Проекти Покриви Варна - Преди и След | 500+" />
        <meta property="og:description" content="Разгледайте 500+ завършени проекта за ремонт на покриви във Варна." />
        <meta property="og:type" content="website" />
      </Helmet>

      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-primary text-primary-foreground py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
              Проекти Ремонт на Покриви Варна
            </h1>
            <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto text-center">
              Разгледайте нашите успешно завършени проекти и се убедете в качеството на нашата работа
            </p>
          </div>
        </section>

        {/* Before/After Gallery */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-foreground text-center mb-4">Преди и След Ремонт на Покрив</h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              Преместете плъзгача, за да видите трансформацията
            </p>
            <BeforeAfterGallery />
          </div>
        </section>

        {/* Featured Projects Grid */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-foreground text-center mb-12">Завършени Покривни Проекти във Варна</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProjects.map((project, index) => (
                <Card key={index} className="overflow-hidden border-border bg-card hover:shadow-lg transition-shadow">
                  <div className="aspect-video bg-muted relative overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={`${project.title} - ${project.location}`}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-3 right-3 bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-medium">
                      {project.type}
                    </span>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-card-foreground mb-3">{project.title}</h3>
                    <p className="text-muted-foreground mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {project.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {project.date}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">500+</div>
                <p className="text-muted-foreground">Завършени проекти</p>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">15+</div>
                <p className="text-muted-foreground">Години опит</p>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">98%</div>
                <p className="text-muted-foreground">Доволни клиенти</p>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">5</div>
                <p className="text-muted-foreground">Години гаранция</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Вашият проект може да бъде следващият</h2>
            <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              Свържете се с нас за безплатен оглед и оферта
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <a href="tel:+359884997659">Обадете се сега</a>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
                <Link to="/контакти">Запитване за оферта</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingCallButton />
    </>
  );
};

export default ProjectsPage;
