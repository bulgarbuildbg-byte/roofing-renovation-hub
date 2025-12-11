import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCallButton from "@/components/FloatingCallButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { CheckCircle, Settings, Calendar, Phone } from "lucide-react";

const MaintenancePage = () => {
  const services = [
    "Почистване на покриви от мъх и лишеи",
    "Почистване на улуци и водосточни тръби",
    "Профилактичен преглед на покрива",
    "Почистване на сняг през зимата",
    "Смяна на счупени керемиди",
    "Подмяна на уплътнения и фугиране",
    "Боядисване и защитни покрития"
  ];

  const packages = [
    {
      title: "Базов преглед",
      description: "Визуален преглед на покрива и доклад за състоянието",
      price: "от 60 лв",
      features: ["Визуална инспекция", "Доклад за състоянието", "Препоръки за поддръжка"]
    },
    {
      title: "Почистване на улуци",
      description: "Пълно почистване на улуци и водосточни тръби",
      price: "от 6 лв/м",
      features: ["Почистване от листа", "Промиване с вода", "Проверка за течове"]
    },
    {
      title: "Годишна поддръжка",
      description: "Пълен пакет за целогодишна грижа за покрива",
      price: "от 250 лв/год",
      features: ["2 прегледа годишно", "Почистване на улуци", "Дребни ремонти", "Приоритетно обслужване"]
    }
  ];

  const benefits = [
    "Удължава живота на покрива с до 50%",
    "Предотвратява скъпи аварийни ремонти",
    "Запазва гаранцията на покривните материали",
    "Подобрява енергийната ефективност",
    "Поддържа добрия външен вид на сградата",
    "Спестява пари в дългосрочен план"
  ];

  return (
    <>
      <Helmet>
        <title>Поддръжка на покриви Варна - Почистване от 5лв/м | RemontNaPokriviVarna</title>
        <meta name="description" content="Професионална поддръжка на покриви във Варна. Почистване на улуци, премахване на мъх, профилактични прегледи. Цени от 5лв/м. Обадете се: 089 270 1176" />
        <meta name="keywords" content="поддръжка покриви варна, почистване улуци варна, почистване покрив мъх, профилактика покрив, почистване сняг покрив" />
        <link rel="canonical" href="https://remontnapokrivivarna.com/поддръжка-на-покриви" />
        <meta property="og:title" content="Поддръжка на покриви Варна - Почистване от 5лв/м" />
        <meta property="og:description" content="Професионална поддръжка. Почистване на улуци и покриви." />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Поддръжка на покриви",
            "provider": {
              "@type": "RoofingContractor",
              "name": "RemontNaPokriviVarna",
              "telephone": "+359892701176"
            },
            "areaServed": { "@type": "City", "name": "Варна" },
            "description": "Поддръжка на покриви - почистване на улуци, премахване на мъх, профилактика",
            "offers": {
              "@type": "Offer",
              "priceSpecification": {
                "@type": "PriceSpecification",
                "price": "5",
                "priceCurrency": "BGN",
                "unitText": "м"
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
              Поддръжка на покриви Варна
            </h1>
            <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto text-center mb-8">
              Редовната поддръжка удължава живота на покрива и предотвратява скъпи ремонти
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <a href="tel:+359892701176">
                  <Phone className="w-5 h-5 mr-2" />
                  Обадете се сега
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
                <Link to="/контакти">Заявете преглед</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-foreground mb-8">Услуги по поддръжка</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {services.map((service, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 rounded-lg bg-muted/30">
                    <Settings className="w-6 h-6 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{service}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Packages */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-foreground text-center mb-12">Пакети за поддръжка</h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {packages.map((pkg, index) => (
                <Card key={index} className="border-border bg-card">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-card-foreground mb-2">{pkg.title}</h3>
                    <p className="text-muted-foreground mb-4">{pkg.description}</p>
                    <p className="text-2xl font-bold text-primary mb-4">{pkg.price}</p>
                    <ul className="space-y-2">
                      {pkg.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CheckCircle className="w-4 h-4 text-accent" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Ползи от редовната поддръжка</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3 p-4">
                    <CheckCircle className="w-6 h-6 text-accent flex-shrink-0" />
                    <span className="text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Schedule CTA */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <Calendar className="w-16 h-16 mx-auto mb-6 opacity-80" />
            <h2 className="text-3xl font-bold mb-6">Кога сте правили последния преглед?</h2>
            <p className="text-xl text-primary-foreground/90 mb-8">
              Препоръчваме преглед на покрива поне веднъж годишно
            </p>
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <a href="tel:+359892701176">Заявете преглед: 089 270 1176</a>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingCallButton />
    </>
  );
};

export default MaintenancePage;
