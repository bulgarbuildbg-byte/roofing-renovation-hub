import { Home, Wrench, Shield, Hammer } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const services = [
  {
    icon: Home,
    title: "Ремонт на Покриви",
    description: "Професионален ремонт на всички видове покриви - керемиди, метални, битумни"
  },
  {
    icon: Hammer,
    title: "Монтаж на Нови Покриви",
    description: "Изграждане на нови покривни конструкции с качествени материали"
  },
  {
    icon: Shield,
    title: "Хидроизолация",
    description: "Надеждна хидроизолация за дълготрайна защита на вашия покрив"
  },
  {
    icon: Wrench,
    title: "Поддръжка",
    description: "Редовна поддръжка и профилактика за запазване качеството"
  }
];

const Services = () => {
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

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="bg-background hover:bg-card hover:shadow-lg transition-all duration-300 hover:-translate-y-2 border-border"
            >
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <service.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {service.title}
                </h3>
                <p className="text-muted-foreground">
                  {service.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
