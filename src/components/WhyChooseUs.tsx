import { Users, Hammer, Wallet, Clock, FileText, MapPin } from "lucide-react";

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
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Защо Да Изберете Нас
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Доверете се на професионалисти с доказан опит и отлична репутация
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {reasons.map((reason, index) => (
            <div 
              key={index} 
              className="flex items-start gap-4 p-6 rounded-xl bg-secondary hover:bg-secondary/80 transition-colors"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <reason.icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-foreground mb-1">{reason.title}</h3>
                <p className="text-muted-foreground text-sm">{reason.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
