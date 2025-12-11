import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCallButton from "@/components/FloatingCallButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { CheckCircle, Home, Shield, Phone } from "lucide-react";

const NewRoofPage = () => {
  const services = [
    "Проектиране на покривна конструкция",
    "Изграждане на дървена конструкция",
    "Монтаж на керемиди",
    "Монтаж на метални покриви",
    "Изграждане на плоски покриви",
    "Монтаж на капандури и прозорци",
    "Топло и хидроизолация"
  ];

  const roofTypes = [
    {
      title: "Керемиден покрив",
      description: "Класическо и естетично решение с дълъг живот. Подходящ за къщи и вили.",
      price: "от 90 лв/кв.м"
    },
    {
      title: "Метален покрив",
      description: "Икономично и издръжливо решение. Идеално за промишлени и селскостопански сгради.",
      price: "от 50 лв/кв.м"
    },
    {
      title: "Плосък покрив",
      description: "Модерно решение за съвременни сгради. Възможност за зелен покрив или тераса.",
      price: "от 65 лв/кв.м"
    }
  ];

  const process = [
    { step: "1", title: "Консултация", description: "Безплатен оглед и обсъждане на вашите нужди" },
    { step: "2", title: "Проектиране", description: "Изготвяне на план и избор на материали" },
    { step: "3", title: "Оферта", description: "Подробна оферта с фиксирана цена" },
    { step: "4", title: "Изпълнение", description: "Професионален монтаж от нашия екип" },
    { step: "5", title: "Гаранция", description: "10 години гаранция за конструкцията" },
  ];

  return (
    <>
      <Helmet>
        <title>Изграждане на нов покрив Варна - Цени от 45лв/кв.м | 10г гаранция | RemontNaPokriviVarna</title>
        <meta name="description" content="Изграждане на нови покриви във Варна. Керемидени, метални, плоски покриви. Цени от 45лв/кв.м. 10 години гаранция. Безплатен оглед. Обадете се: 089 270 1176" />
        <meta name="keywords" content="нов покрив варна, изграждане покрив варна, покривна конструкция варна, керемиден покрив цена, метален покрив варна" />
        <link rel="canonical" href="https://remontnapokrivivarna.com/изграждане-на-покрив" />
        <meta property="og:title" content="Изграждане на нов покрив Варна - Цени от 45лв/кв.м" />
        <meta property="og:description" content="Нови покриви с 10г гаранция. Керемидени, метални, плоски." />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Изграждане на нов покрив",
            "provider": {
              "@type": "RoofingContractor",
              "name": "RemontNaPokriviVarna",
              "telephone": "+359892701176"
            },
            "areaServed": { "@type": "City", "name": "Варна" },
            "description": "Изграждане на нови покриви - керемидени, метални, плоски",
            "offers": {
              "@type": "Offer",
              "priceSpecification": {
                "@type": "PriceSpecification",
                "price": "45",
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
              Изграждане на нов покрив Варна
            </h1>
            <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto text-center mb-8">
              Професионално проектиране и изграждане на покривни конструкции с 10 години гаранция
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <a href="tel:+359892701176">
                  <Phone className="w-5 h-5 mr-2" />
                  Обадете се сега
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
                <Link to="/контакти">Безплатна консултация</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-foreground mb-8">Какво включва услугата?</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {services.map((service, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 rounded-lg bg-muted/30">
                    <Home className="w-6 h-6 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{service}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Roof Types */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-foreground text-center mb-12">Видове покриви</h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {roofTypes.map((type, index) => (
                <Card key={index} className="border-border bg-card">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-card-foreground mb-3">{type.title}</h3>
                    <p className="text-muted-foreground mb-4">{type.description}</p>
                    <p className="text-2xl font-bold text-primary">{type.price}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-foreground text-center mb-12">Как работим?</h2>
            <div className="max-w-4xl mx-auto">
              <div className="space-y-6">
                {process.map((item, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                      {item.step}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Планирате нов покрив?</h2>
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

export default NewRoofPage;
