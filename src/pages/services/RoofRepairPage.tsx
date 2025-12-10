import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCallButton from "@/components/FloatingCallButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { CheckCircle, Wrench, Shield, Clock, Phone } from "lucide-react";

const RoofRepairPage = () => {
  const services = [
    "Подмяна на счупени или липсващи керемиди",
    "Ремонт на течове и пукнатини",
    "Поправка на повредени комини",
    "Ремонт на ламаринени покриви",
    "Подмяна на обшивки и капаци",
    "Ремонт след буря или градушка",
    "Аварийни ремонти 24/7"
  ];

  const benefits = [
    { icon: Shield, title: "5 години гаранция", description: "За всички извършени ремонти" },
    { icon: Wrench, title: "Качествени материали", description: "Използваме само доказани марки" },
    { icon: Clock, title: "Бърза реакция", description: "Оглед до 24 часа" },
  ];

  const priceRanges = [
    { service: "Ремонт на течове", price: "от 50 лв" },
    { service: "Подмяна на керемиди", price: "от 15 лв/бр" },
    { service: "Ремонт на комин", price: "от 150 лв" },
    { service: "Частичен ремонт на покрив", price: "от 20 лв/кв.м" },
    { service: "Цялостен ремонт", price: "от 45 лв/кв.м" },
  ];

  return (
    <>
      <Helmet>
        <title>Ремонт на покриви Варна - Цени от 20лв/кв.м | 5г. гаранция | RemontNaPokriviVarna</title>
        <meta name="description" content="Професионален ремонт на покриви във Варна. Течове, керемиди, комини. Цени от 20лв/кв.м. 5 години гаранция. Безплатен оглед. Обадете се: 089 270 1176" />
        <meta name="keywords" content="ремонт на покриви варна, ремонт покрив цена варна, течове покрив варна, подмяна керемиди варна, аварийни ремонти покриви" />
        <link rel="canonical" href="https://remontnapokrivivarna.com/ремонт-на-покриви" />
        <meta property="og:title" content="Ремонт на покриви Варна - Цени от 20лв/кв.м" />
        <meta property="og:description" content="Професионален ремонт на покриви. 5 години гаранция. Безплатен оглед." />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Ремонт на покриви",
            "provider": {
              "@type": "RoofingContractor",
              "name": "RemontNaPokriviVarna",
              "telephone": "+359892701176"
            },
            "areaServed": { "@type": "City", "name": "Варна" },
            "description": "Професионален ремонт на покриви във Варна - течове, керемиди, комини",
            "offers": {
              "@type": "Offer",
              "priceSpecification": {
                "@type": "PriceSpecification",
                "price": "20",
                "priceCurrency": "BGN",
                "unitText": "кв.м"
              }
            }
          })}
        </script>
      </Helmet>

      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-primary text-primary-foreground py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
              Ремонт на покриви Варна
            </h1>
            <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto text-center mb-8">
              Професионален ремонт на всички видове покриви с 5 години гаранция
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <a href="tel:+359892701176">
                  <Phone className="w-5 h-5 mr-2" />
                  Обадете се сега
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
                <Link to="/контакти">Безплатен оглед</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Services List */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-foreground mb-8">Какво включва услугата?</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {services.map((service, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 rounded-lg bg-muted/30">
                    <CheckCircle className="w-6 h-6 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{service}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-foreground text-center mb-12">Защо да изберете нас?</h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {benefits.map((benefit, index) => (
                <Card key={index} className="border-border bg-card">
                  <CardContent className="p-6 text-center">
                    <benefit.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-card-foreground mb-2">{benefit.title}</h3>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold text-foreground text-center mb-8">Ориентировъчни цени</h2>
              <div className="space-y-4">
                {priceRanges.map((item, index) => (
                  <div key={index} className="flex justify-between items-center p-4 rounded-lg bg-muted/30">
                    <span className="text-foreground font-medium">{item.service}</span>
                    <span className="text-primary font-bold text-lg">{item.price}</span>
                  </div>
                ))}
              </div>
              <p className="text-muted-foreground text-center mt-6">
                * Точната цена се определя след безплатен оглед
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Имате нужда от ремонт?</h2>
            <p className="text-xl text-primary-foreground/90 mb-8">
              Обадете се за безплатна консултация: <strong>089 270 1176</strong>
            </p>
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <a href="tel:+359892701176">Обадете се сега</a>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingCallButton />
    </>
  );
};

export default RoofRepairPage;
