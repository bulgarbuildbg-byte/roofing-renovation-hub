import { Users, Hammer, Wallet, Clock, FileText, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const reasons = [
  {
    icon: Users,
    title: "Опитни професионалисти",
    description: "Екип от сертифицирани специалисти с дългогодишен опит"
  },
  {
    icon: Hammer,
    title: "Само качествени материали",
    description: "Работим с водещи марки и доказани материали"
  },
  {
    icon: Wallet,
    title: "Прозрачно ценообразуване",
    description: "Ясни цени без скрити такси и изненади"
  },
  {
    icon: Clock,
    title: "Навременно изпълнение",
    description: "Спазваме договорените срокове винаги"
  },
  {
    icon: FileText,
    title: "Писмена гаранция",
    description: "До 10 години гаранция на всички ремонти"
  },
  {
    icon: MapPin,
    title: "Местна фирма с реални референции",
    description: "Варненска компания с доказан опит в региона"
  }
];

const WhyChooseUs = () => {
  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="py-12 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 md:mb-4">
            Защо Да Изберете Нас
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Доверете се на професионалисти с доказан опит и отлична репутация
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto">
          {reasons.map((reason, index) => (
            <div 
              key={index} 
              className="flex items-start gap-3 md:gap-4 p-4 md:p-6 rounded-xl bg-secondary hover:bg-secondary/80 transition-colors"
            >
              <div className="w-11 h-11 md:w-12 md:h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <reason.icon className="w-5 h-5 md:w-6 md:h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-foreground mb-1 text-base md:text-lg">{reason.title}</h3>
                <p className="text-muted-foreground text-sm">{reason.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Section CTA */}
        <div className="mt-10 md:mt-12 text-center">
          <Button 
            onClick={scrollToContact}
            size="lg"
            className="h-14 bg-accent hover:bg-accent/90 text-accent-foreground text-lg font-bold px-8"
          >
            <Phone className="w-5 h-5 mr-2" />
            Заявете Безплатен Оглед
          </Button>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
