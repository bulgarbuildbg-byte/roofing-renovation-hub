import { Home, Wrench, Shield, Hammer, Droplets, Search } from "lucide-react";
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
    <section id="services" className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Нашите Услуги
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Предлагаме пълен спектър от покривни услуги с гаранция за качество
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="bg-background hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-border flex flex-col"
            >
              <CardContent className="p-6 flex flex-col flex-grow">
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <service.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {service.title}
                </h3>
                <p className="text-accent font-medium text-sm mb-3">
                  {service.problem}
                </p>
                <ul className="text-muted-foreground text-sm mb-4 space-y-1">
                  {service.includes.map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="text-foreground text-sm font-medium mb-4 mt-auto">
                  ✓ {service.benefits}
                </p>
                <Link to={service.link}>
                  <Button 
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    Безплатна Оферта
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button 
            onClick={scrollToContact}
            size="lg"
            className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8 py-6"
          >
            Заявете Безплатен Оглед
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Services;
