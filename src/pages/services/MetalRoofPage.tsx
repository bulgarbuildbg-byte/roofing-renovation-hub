import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCallButton from "@/components/FloatingCallButton";
import CTASection from "@/components/CTASection";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, CheckCircle, Shield, Zap, Clock, Palette, Layers, Wind } from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  "Монтаж на метални керемиди",
  "Монтаж на ламаринени покриви",
  "Монтаж на трапецовидна ламарина",
  "Ремонт на метални покриви",
  "Боядисване и антикорозионна защита",
  "Монтаж на водосточни системи"
];

const benefits = [
  { title: "Дълъг Живот", desc: "50+ години при правилна поддръжка", icon: Clock },
  { title: "Леки Конструкции", desc: "По-малко натоварване върху сградата", icon: Zap },
  { title: "Издръжливи", desc: "Устойчиви на вятър, градушка и огън", icon: Shield },
  { title: "Богат Избор", desc: "Много цветове и профили", icon: Palette },
  { title: "Бърз Монтаж", desc: "По-кратки срокове на изпълнение", icon: Wind },
  { title: "Икономични", desc: "Отлично съотношение цена-качество", icon: Layers }
];

const MetalRoofPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Метални Покриви Варна | Монтаж на Метални Керемиди и Ламарина</title>
        <meta name="description" content="Професионален монтаж на метални покриви във Варна. Метални керемиди, ламаринени покриви, трапецовидна ламарина. Гаранция до 50 години." />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Метални покриви",
            "provider": {
              "@type": "LocalBusiness",
              "name": "RemontNaPokriviVarna",
              "telephone": "+359892701176",
              "areaServed": "Варна"
            },
            "areaServed": "Варна, България",
            "description": "Професионален монтаж и ремонт на метални покриви във Варна."
          })}
        </script>
      </Helmet>
      
      <Header />
      
      <main className="pt-24">
        {/* Hero Section */}
        <section className="bg-primary py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
                Метални Покриви
              </h1>
              <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl">
                Модерни и издръжливи метални покривни решения с гаранция до 50 години. 
                Идеални за жилищни и промишлени сгради.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8">
                  <a href="tel:+359892701176">
                    <Phone className="w-5 h-5 mr-2" />
                    Обадете се
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
                  <Link to="/контакти">Безплатна Оферта</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
              Нашите Услуги
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {services.map((service, index) => (
                <div key={index} className="flex items-center gap-3 bg-secondary p-4 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0" />
                  <span className="text-foreground">{service}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16 bg-secondary">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">
              Предимства на Металните Покриви
            </h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              Защо все повече собственици избират метални покриви
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {benefits.map((benefit, index) => (
                <Card key={index} className="bg-background">
                  <CardContent className="p-6">
                    <benefit.icon className="w-10 h-10 text-primary mb-4" />
                    <h3 className="font-semibold text-foreground mb-2">{benefit.title}</h3>
                    <p className="text-muted-foreground text-sm">{benefit.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Types */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
                Видове Метални Покриви
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-secondary p-6 rounded-lg">
                  <h3 className="font-semibold text-foreground mb-3">Метални Керемиди</h3>
                  <p className="text-muted-foreground mb-4">
                    Имитират класическите керемиди, но са много по-леки и издръжливи. 
                    Предлагат се в много цветове и профили.
                  </p>
                  <p className="text-sm text-primary font-medium">Гаранция: до 50 години</p>
                </div>
                <div className="bg-secondary p-6 rounded-lg">
                  <h3 className="font-semibold text-foreground mb-3">Трапецовидна Ламарина</h3>
                  <p className="text-muted-foreground mb-4">
                    Идеална за промишлени сгради, халета и селскостопански постройки. 
                    Бърз монтаж и отлична цена.
                  </p>
                  <p className="text-sm text-primary font-medium">Гаранция: до 30 години</p>
                </div>
                <div className="bg-secondary p-6 rounded-lg">
                  <h3 className="font-semibold text-foreground mb-3">Стоящ Фалц</h3>
                  <p className="text-muted-foreground mb-4">
                    Премиум решение за модерни архитектурни проекти. 
                    Елегантен вид и изключителна водоустойчивост.
                  </p>
                  <p className="text-sm text-primary font-medium">Гаранция: до 50 години</p>
                </div>
                <div className="bg-secondary p-6 rounded-lg">
                  <h3 className="font-semibold text-foreground mb-3">Сандвич Панели</h3>
                  <p className="text-muted-foreground mb-4">
                    Комбинират покривно покритие и топлоизолация в едно. 
                    Бърз монтаж и отлични изолационни свойства.
                  </p>
                  <p className="text-sm text-primary font-medium">Гаранция: до 25 години</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <CTASection 
          title="Интересувате се от Метален Покрив?"
          subtitle="Получете безплатна консултация и оферта"
        />
      </main>
      
      <Footer />
      <FloatingCallButton />
    </div>
  );
};

export default MetalRoofPage;
