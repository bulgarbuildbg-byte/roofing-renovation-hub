import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCallButton from "@/components/FloatingCallButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { CheckCircle, Droplets, Shield, Clock, Phone } from "lucide-react";

const WaterproofingPage = () => {
  const services = [
    "Битумна хидроизолация",
    "PVC мембрани",
    "Течна хидроизолация",
    "Хидроизолация на плоски покриви",
    "Хидроизолация на скатни покриви",
    "Хидроизолация на тераси и балкони",
    "Ремонт на стара хидроизолация"
  ];

  const types = [
    {
      title: "Битумна хидроизолация",
      description: "Традиционно решение с доказана надеждност. Подходяща за повечето видове покриви.",
      price: "от 28 лв/кв.м"
    },
    {
      title: "PVC мембрана",
      description: "Модерно и дълготрайно решение. Идеална за плоски покриви и търговски сгради.",
      price: "от 40 лв/кв.м"
    },
    {
      title: "Течна хидроизолация",
      description: "Перфектна за труднодостъпни места, около комини и детайли.",
      price: "от 32 лв/кв.м"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Хидроизолация на покриви Варна - Цени от 25лв/кв.м | RemontNaPokriviVarna</title>
        <meta name="description" content="Професионална хидроизолация на покриви във Варна. Битумна, PVC мембрана, течна хидроизолация. Цени от 25лв/кв.м. 5г гаранция. Обадете се: 089 270 1176" />
        <meta name="keywords" content="хидроизолация покрив варна, хидроизолация цена варна, битумна хидроизолация варна, PVC мембрана покрив, течна хидроизолация" />
        <link rel="canonical" href="https://remontnapokrivivarna.com/хидроизолация" />
        <meta property="og:title" content="Хидроизолация на покриви Варна - Цени от 25лв/кв.м" />
        <meta property="og:description" content="Професионална хидроизолация. Битумна, PVC, течна. 5г гаранция." />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Хидроизолация на покриви",
            "provider": {
              "@type": "RoofingContractor",
              "name": "RemontNaPokriviVarna",
              "telephone": "+359892701176"
            },
            "areaServed": { "@type": "City", "name": "Варна" },
            "description": "Професионална хидроизолация на покриви - битумна, PVC мембрана, течна",
            "offers": {
              "@type": "Offer",
              "priceSpecification": {
                "@type": "PriceSpecification",
                "price": "25",
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
              Хидроизолация на покриви Варна
            </h1>
            <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto text-center mb-8">
              Защитете покрива си от влага с професионална хидроизолация
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
              <h2 className="text-3xl font-bold text-foreground mb-8">Видове хидроизолация</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {services.map((service, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 rounded-lg bg-muted/30">
                    <Droplets className="w-6 h-6 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{service}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Types & Pricing */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-foreground text-center mb-12">Методи и цени</h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {types.map((type, index) => (
                <Card key={index} className="border-border bg-card">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-card-foreground mb-3">{type.title}</h3>
                    <p className="text-muted-foreground mb-4">{type.description}</p>
                    <p className="text-2xl font-bold text-primary">{type.price}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <p className="text-muted-foreground text-center mt-8">
              * Точната цена се определя след безплатен оглед
            </p>
          </div>
        </section>

        {/* Why Waterproofing */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-foreground mb-8">Защо е важна хидроизолацията?</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-accent flex-shrink-0" />
                    <p className="text-foreground">Предотвратява течове и щети от влага</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-accent flex-shrink-0" />
                    <p className="text-foreground">Удължава живота на покривната конструкция</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-accent flex-shrink-0" />
                    <p className="text-foreground">Предпазва от мухъл и влага в помещенията</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-accent flex-shrink-0" />
                    <p className="text-foreground">Подобрява енергийната ефективност</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-accent flex-shrink-0" />
                    <p className="text-foreground">Намалява разходите за отопление и охлаждане</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-accent flex-shrink-0" />
                    <p className="text-foreground">Увеличава стойността на имота</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Нуждаете се от хидроизолация?</h2>
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

export default WaterproofingPage;
