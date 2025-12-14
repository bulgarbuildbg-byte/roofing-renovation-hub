import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCallButton from "@/components/FloatingCallButton";
import CTASection from "@/components/CTASection";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, CheckCircle, Layers, Shield, Droplets, Sun } from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  "Хидроизолация на плосък покрив",
  "Ремонт на течове и пукнатини",
  "Полагане на битумни мембрани",
  "PVC и TPO мембрани",
  "Течна хидроизолация",
  "Ремонт на тераси и балкони",
  "Топлоизолация на плосък покрив",
  "Отводняване и дренаж"
];

const materials = [
  { name: "Битумни мембрани", desc: "Традиционно решение с доказана ефективност", icon: Layers },
  { name: "PVC мембрани", desc: "Модерни, гъвкави и дълготрайни", icon: Shield },
  { name: "Течна хидроизолация", desc: "Безшевно покритие за сложни форми", icon: Droplets },
  { name: "Рефлектиращи покрития", desc: "Намаляват нагряването през лятото", icon: Sun }
];

const FlatRoofPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Плоски Покриви Варна | Хидроизолация и Ремонт на Плосък Покрив</title>
        <meta name="description" content="Професионален ремонт и хидроизолация на плоски покриви във Варна. Битумни и PVC мембрани, течна хидроизолация. До 10 години гаранция." />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Ремонт на плоски покриви",
            "provider": {
              "@type": "LocalBusiness",
              "name": "RemontNaPokriviVarna",
              "telephone": "+359892701176",
              "areaServed": "Варна"
            },
            "areaServed": "Варна, България",
            "description": "Професионална хидроизолация и ремонт на плоски покриви във Варна."
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
                Плоски Покриви и Тераси
              </h1>
              <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl">
                Специализирани решения за хидроизолация и ремонт на плоски покриви, 
                тераси и балкони. Гарантираме сухо и защитено пространство.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8">
                  <a href="tel:+359892701176">
                    <Phone className="w-5 h-5 mr-2" />
                    Обадете се
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
                  <Link to="/контакти">Безплатен Оглед</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
              Нашите Услуги за Плоски Покриви
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
              {services.map((service, index) => (
                <div key={index} className="flex items-center gap-3 bg-secondary p-4 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0" />
                  <span className="text-foreground">{service}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Materials */}
        <section className="py-16 bg-secondary">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">
              Материали и Технологии
            </h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              Използваме само доказани материали от водещи производители
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {materials.map((material, index) => (
                <Card key={index} className="bg-background">
                  <CardContent className="p-6 text-center">
                    <material.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h3 className="font-semibold text-foreground mb-2">{material.name}</h3>
                    <p className="text-muted-foreground text-sm">{material.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Problems We Solve */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
                Проблеми, Които Решаваме
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-secondary p-6 rounded-lg">
                  <h3 className="font-semibold text-foreground mb-3">Течове и Влага</h3>
                  <p className="text-muted-foreground">
                    Спираме течовете завинаги с качествена хидроизолация и 
                    правилно отводняване на плоския покрив.
                  </p>
                </div>
                <div className="bg-secondary p-6 rounded-lg">
                  <h3 className="font-semibold text-foreground mb-3">Стара Хидроизолация</h3>
                  <p className="text-muted-foreground">
                    Подменяме остаряла и компрометирана хидроизолация с 
                    нови, модерни материали.
                  </p>
                </div>
                <div className="bg-secondary p-6 rounded-lg">
                  <h3 className="font-semibold text-foreground mb-3">Лошо Отводняване</h3>
                  <p className="text-muted-foreground">
                    Изграждаме и ремонтираме системи за отводняване, 
                    които да предпазват покрива.
                  </p>
                </div>
                <div className="bg-secondary p-6 rounded-lg">
                  <h3 className="font-semibold text-foreground mb-3">Топлоизолация</h3>
                  <p className="text-muted-foreground">
                    Подобряваме топлоизолацията за по-ниски сметки и 
                    по-комфортно пространство.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <CTASection 
          title="Нуждаете се от Ремонт на Плосък Покрив?"
          subtitle="Получете безплатен оглед и честна оферта"
        />
      </main>
      
      <Footer />
      <FloatingCallButton />
    </div>
  );
};

export default FlatRoofPage;
