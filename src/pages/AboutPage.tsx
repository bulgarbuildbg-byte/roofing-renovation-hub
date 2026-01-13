import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCallButton from "@/components/FloatingCallButton";
import { Shield, Award, Users, Clock, MapPin, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const AboutPage = () => {
  const values = [
    {
      icon: Shield,
      title: "Качество",
      description: "Използваме само висококачествени материали и доказани технологии за дълготраен резултат."
    },
    {
      icon: Award,
      title: "Опит",
      description: "Над 15 години опит в ремонта и изграждането на покриви във Варна и региона."
    },
    {
      icon: Users,
      title: "Професионализъм",
      description: "Екип от квалифицирани специалисти с богат практически опит."
    },
    {
      icon: Clock,
      title: "Надеждност",
      description: "Спазваме сроковете и предоставяме гаранция за всички извършени услуги."
    }
  ];

  const serviceAreas = [
    "Варна", "Аксаково", "Девня", "Провадия", "Долни чифлик", 
    "Бяла", "Аврен", "Белослав", "Суворово"
  ];

  return (
    <>
      <Helmet>
        <title>За Нас - Ремонт на Покриви Варна | 15+ Години</title>
        <meta name="description" content="Над 15 години опит в покривните услуги. Квалифициран екип, качествени материали, гаранция. Научете повече за нас." />
        <meta name="keywords" content="ремонт на покриви варна, покривни услуги варна, майстор покриви варна, хидроизолация варна" />
        <link rel="canonical" href="https://remontnapokrivivarna.com/за-нас" />
        <meta property="og:title" content="За Нас - Ремонт на Покриви Варна | 15+ Години" />
        <meta property="og:description" content="Над 15 години опит в покривните услуги. Квалифициран екип и качествени материали." />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "RoofingContractor",
            "name": "Ремонт на Покриви Варна",
            "description": "Професионални покривни услуги във Варна",
            "url": "https://remontnapokrivivarna.com",
            "telephone": "+359884997659",
            "email": "remontnapokrivivarna@abv.bg",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "ул. Уста Колю Фичето 25 А",
              "addressLocality": "Варна",
              "addressCountry": "BG"
            },
            "areaServed": serviceAreas.map(area => ({ "@type": "City", "name": area })),
            "priceRange": "$$"
          })}
        </script>
      </Helmet>

      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-primary text-primary-foreground py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
              За Нас - Покривни Специалисти Варна
            </h1>
            <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto text-center">
              RemontNaPokriviVarna е вашият надежден партньор за всички покривни услуги във Варна и региона
            </p>
          </div>
        </section>

        {/* About Content */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-foreground mb-6">15+ Години Опит в Ремонт на Покриви</h2>
              <p className="text-muted-foreground text-lg mb-6">
                С над 15 години опит в сферата на покривните услуги, RemontNaPokriviVarna се е утвърдила като водеща 
                компания за ремонт и изграждане на покриви във Варна. Започнахме като малък семеен бизнес с мисията 
                да предоставяме качествени и надеждни покривни решения на достъпни цени.
              </p>
              <p className="text-muted-foreground text-lg mb-6">
                Днес разполагаме с екип от квалифицирани специалисти, модерно оборудване и богат опит в работата 
                с всички видове покривни конструкции. Нашата цел е да осигурим дълготрайна защита на вашия дом 
                или бизнес сграда.
              </p>
              <p className="text-muted-foreground text-lg">
                Вярваме, че качеството не е лукс, а необходимост. Затова използваме само доказани материали от 
                водещи производители и прилагаме най-добрите практики в бранша.
              </p>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-foreground text-center mb-12">Защо Клиентите Ни Се Доверяват</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <Card key={index} className="border-border bg-card">
                  <CardContent className="p-6 text-center">
                    <value.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-card-foreground mb-3">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Service Area Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <MapPin className="w-8 h-8 text-primary" />
                <h2 className="text-3xl font-bold text-foreground">Райони на обслужване</h2>
              </div>
              <p className="text-muted-foreground text-lg mb-8">
                Предоставяме покривни услуги в следните райони:
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {serviceAreas.map((area, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-accent" />
                    <span className="text-foreground">{area}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Готови да започнем?</h2>
            <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              Свържете се с нас за безплатна консултация и оглед на вашия покрив
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <a href="tel:+359884997659">Обадете се сега</a>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
                <Link to="/контакти">Изпратете запитване</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingCallButton />
    </>
  );
};

export default AboutPage;
