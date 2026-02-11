import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const features = [
  "Над 15 години опит в бранша",
  "Лицензирани и застраховани специалисти",
  "Специализирано подразделение на България Билд ЕООД",
  "Сертифицирана и напълно лицензирана компания-майка",
  "Гаранция за извършената работа",
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
              RemontNaPokriviVarna е специализирано подразделение на{" "}
              <a href="https://bulgarbuild.com" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline font-semibold">
                България Билд ЕООД (Bulgari Build EOOD)
              </a>{" "}
              — водеща строителна компания, напълно сертифицирана и лицензирана. 
              Създадохме този специализиран покривен бранш, за да предоставяме фокусирана 
              експертиза, по-високо качество и по-добро обслужване конкретно за покривни проекти.
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
            <div className="flex flex-wrap gap-4 mt-8">
              <Link to="/за-нас">
                <Button variant="outline">Научете повече за нас</Button>
              </Link>
              <Link to="/проекти">
                <Button variant="ghost" className="text-primary">Вижте нашите проекти →</Button>
              </Link>
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
