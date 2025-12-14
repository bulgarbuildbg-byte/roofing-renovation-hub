import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCallButton from "@/components/FloatingCallButton";
import CTASection from "@/components/CTASection";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, CheckCircle, Layers, Shield, Ruler, Palette } from "lucide-react";
import { Link } from "react-router-dom";

const tileTypes = [
  { name: "Керемиди тип Марсилски", desc: "Класически вид, издръжливи и естетични" },
  { name: "Бетонови керемиди", desc: "Икономичен вариант с дълъг живот" },
  { name: "Глинени керемиди", desc: "Традиционен материал с отлична издръжливост" },
  { name: "Метални керемиди", desc: "Модерен вид с лека конструкция" }
];

const services = [
  "Смяна на единични счупени керемиди",
  "Частична подмяна на покривното покритие",
  "Пълна смяна на всички керемиди",
  "Подмяна на ламарина и капаци",
  "Ремонт на билото и ръбовете",
  "Смяна на снегозадържатели"
];

const TileReplacementPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Смяна на Керемиди Варна | Ремонт и Подмяна на Покривно Покритие</title>
        <meta name="description" content="Професионална смяна на керемиди във Варна. Подмяна на счупени, стари или повредени керемиди. Качествени материали и гаранция. Безплатен оглед." />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Смяна на керемиди",
            "provider": {
              "@type": "LocalBusiness",
              "name": "RemontNaPokriviVarna",
              "telephone": "+359892701176",
              "areaServed": "Варна"
            },
            "areaServed": "Варна, България",
            "description": "Професионална смяна и подмяна на керемиди във Варна."
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
                Смяна на Керемиди във Варна
              </h1>
              <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl">
                Професионална подмяна на счупени, стари или повредени керемиди. 
                Използваме само качествени материали с дълготрайна гаранция.
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
              Какво Предлагаме
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

        {/* Tile Types */}
        <section className="py-16 bg-secondary">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">
              Видове Керемиди
            </h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              Работим с всички популярни типове керемиди
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {tileTypes.map((tile, index) => (
                <Card key={index} className="bg-background">
                  <CardContent className="p-6 text-center">
                    <Layers className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h3 className="font-semibold text-foreground mb-2">{tile.name}</h3>
                    <p className="text-muted-foreground text-sm">{tile.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
              Защо Да Изберете Нас
            </h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <Palette className="w-14 h-14 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-foreground mb-2">Широк Избор</h3>
                <p className="text-muted-foreground">Подбираме керемиди, които да паснат на съществуващия ви покрив</p>
              </div>
              <div className="text-center">
                <Ruler className="w-14 h-14 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-foreground mb-2">Прецизен Монтаж</h3>
                <p className="text-muted-foreground">Внимателна работа за перфектно прилягане</p>
              </div>
              <div className="text-center">
                <Shield className="w-14 h-14 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-foreground mb-2">Гаранция</h3>
                <p className="text-muted-foreground">Писмена гаранция на материали и труд</p>
              </div>
            </div>
          </div>
        </section>

        <CTASection 
          title="Нуждаете се от Смяна на Керемиди?"
          subtitle="Получете безплатна оценка и оферта"
        />
      </main>
      
      <Footer />
      <FloatingCallButton />
    </div>
  );
};

export default TileReplacementPage;
