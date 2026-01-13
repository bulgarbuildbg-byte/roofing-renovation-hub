import { Home, Wrench, Shield, Hammer, Droplets, Phone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const services = [
  {
    icon: Home,
    title: "Ремонт на Покриви",
    problem: "Течове, повредени керемиди или щети от буря?",
    includes: ["Диагностика на проблема", "Смяна на керемиди", "Ремонт на течове", "Покривни улуци"],
    benefits: "Спрете течовете веднага и защитете дома си",
    link: "/ремонт-на-покриви"
  },
  {
    icon: Droplets,
    title: "Ремонт на Течове",
    problem: "Спешен проблем с теч от покрива?",
    includes: ["Бърза реакция", "Точна диагностика", "Временна защита", "Траен ремонт"],
    benefits: "Реагираме в рамките на часове при аварии",
    link: "/ремонт-течове"
  },
  {
    icon: Shield,
    title: "Хидроизолация",
    problem: "Влага и течове през покрива или терасата?",
    includes: ["Мембранна хидроизолация", "Битумни покрития", "Течна хидроизолация", "Ремонт на тераси"],
    benefits: "10 години гаранция и пълна защита от влага",
    link: "/хидроизолация"
  },
  {
    icon: Hammer,
    title: "Нов Покрив",
    problem: "Нуждаете се от нов покрив за вашия дом?",
    includes: ["Проектиране", "Дървена конструкция", "Покривно покритие", "Изолация"],
    benefits: "Модерен, издръжлив покрив с до 50 години живот",
    link: "/изграждане-на-покрив"
  },
  {
    icon: Home,
    title: "Смяна на Керемиди",
    problem: "Счупени или стари керемиди?",
    includes: ["Единични керемиди", "Частична подмяна", "Пълна смяна", "Капаци и ръбове"],
    benefits: "Качествени материали с дълготрайна гаранция",
    link: "/смяна-керемиди"
  },
  {
    icon: Home,
    title: "Плоски Покриви",
    problem: "Проблеми с плоския покрив или терасата?",
    includes: ["Хидроизолация", "PVC мембрани", "Битумни покрития", "Отводняване"],
    benefits: "Специализирани решения за плоски повърхности",
    link: "/плоски-покриви"
  },
  {
    icon: Shield,
    title: "Метални Покриви",
    problem: "Искате модерен и издръжлив покрив?",
    includes: ["Метални керемиди", "Ламаринени покриви", "Трапецовидна ламарина", "Боядисване"],
    benefits: "До 50 години гаранция, лека конструкция",
    link: "/метални-покриви"
  },
  {
    icon: Wrench,
    title: "Поддръжка",
    problem: "Искате покривът ви да издържи по-дълго?",
    includes: ["Сезонни инспекции", "Почистване", "Превантивен ремонт", "Профилактика"],
    benefits: "Удължете живота на покрива с 30%",
    link: "/поддръжка-на-покриви"
  }
];

const Services = () => {
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
            Нашите Услуги
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Пълен спектър от покривни услуги с гаранция за качество
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="bg-background hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-border flex flex-col"
            >
              <CardContent className="p-4 md:p-6 flex flex-col flex-grow">
                <div className="w-12 h-12 md:w-14 md:h-14 bg-primary/10 rounded-full flex items-center justify-center mb-3 md:mb-4">
                  <service.icon className="w-6 h-6 md:w-7 md:h-7 text-primary" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-foreground mb-2">
                  {service.title}
                </h3>
                <p className="text-accent font-medium text-sm mb-3">
                  {service.problem}
                </p>
                <ul className="text-muted-foreground text-sm mb-4 space-y-1">
                  {service.includes.slice(0, 3).map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="text-foreground text-sm font-medium mb-4 mt-auto">
                  ✓ {service.benefits}
                </p>
                <Link to={service.link} className="block">
                  <Button 
                    className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
                  >
                    Безплатна Оферта
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Section CTA */}
        <div className="mt-10 md:mt-12 text-center bg-primary/5 rounded-2xl p-6 md:p-10">
          <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3">
            Не сте сигурни каква услуга ви трябва?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Обадете ни се за безплатна консултация и оглед. Ще ви дадем честна оценка и препоръка.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button 
              asChild
              size="lg"
              className="h-14 bg-accent hover:bg-accent/90 text-accent-foreground text-lg font-bold px-8"
            >
              <a href="tel:0892701176" className="flex items-center justify-center gap-2">
                <Phone className="w-5 h-5" />
                089 270 1176
              </a>
            </Button>
            <Button 
              onClick={scrollToContact}
              size="lg"
              variant="outline"
              className="h-14 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground text-lg font-bold px-8"
            >
              Заявете Безплатен Оглед
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
