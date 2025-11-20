import { CheckCircle } from "lucide-react";

const features = [
  "Над 15 години опит в бранша",
  "Лицензирани и застраховани специалисти",
  "Използване на висококачествени материали",
  "Гаранция за извършената работа",
  "Конкурентни цени",
  "Безплатни консултации и оглед"
];

const About = () => {
  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              За Нашата Компания
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              RemontNaPokriviVarna е водеща компания за покривни услуги във Варна и региона. 
              С години опит и стотици успешно реализирани проекти, ние сме вашият надежден 
              партньор за всички покривни нужди.
            </p>
            <p className="text-lg text-muted-foreground mb-8">
              Нашият екип от квалифицирани специалисти използва най-съвременните техники и 
              материали, за да гарантира дълготрайност и качество на всеки проект.
            </p>
            <div className="space-y-3">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-accent flex-shrink-0" />
                  <span className="text-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-primary/5 rounded-2xl p-8 border-2 border-primary/20">
              <div className="space-y-6">
                <div className="text-center p-6 bg-card rounded-xl border border-border">
                  <div className="text-5xl font-bold text-primary mb-2">500+</div>
                  <div className="text-muted-foreground">Завършени проекта</div>
                </div>
                <div className="text-center p-6 bg-card rounded-xl border border-border">
                  <div className="text-5xl font-bold text-primary mb-2">15+</div>
                  <div className="text-muted-foreground">Години опит</div>
                </div>
                <div className="text-center p-6 bg-card rounded-xl border border-border">
                  <div className="text-5xl font-bold text-primary mb-2">100%</div>
                  <div className="text-muted-foreground">Удовлетворени клиенти</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
