import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCallButton from "@/components/FloatingCallButton";
import CTASection from "@/components/CTASection";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, CheckCircle, AlertTriangle, Droplets, Clock, Shield, Wrench } from "lucide-react";
import { Link } from "react-router-dom";

const signs = [
  "Петна по тавана или стените",
  "Капеща вода при дъжд",
  "Влага и мухъл в тавана",
  "Подути или напукани мазилки",
  "Мокри петна около комини",
  "Вода в таванското помещение"
];

const process = [
  { step: "1", title: "Спешен оглед", desc: "Реагираме в рамките на часове при аварийни течове" },
  { step: "2", title: "Диагностика", desc: "Откриваме точното място и причина за течa" },
  { step: "3", title: "Временна защита", desc: "При нужда поставяме временна защита веднага" },
  { step: "4", title: "Траен ремонт", desc: "Отстраняваме проблема с качествени материали" },
  { step: "5", title: "Гаранция", desc: "Предоставяме писмена гаранция на ремонта" }
];

const RoofLeakRepairPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Ремонт на Течове от Покрив Варна | Спешен Ремонт 24/7</title>
        <meta name="description" content="Спешен ремонт на течове от покрив във Варна. Бърза реакция, диагностика и траен ремонт. Безплатен оглед. Обадете се сега: 089 270 1176" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Ремонт на течове от покрив",
            "provider": {
              "@type": "LocalBusiness",
              "name": "RemontNaPokriviVarna",
              "telephone": "+359892701176",
              "areaServed": "Варна"
            },
            "areaServed": "Варна, България",
            "description": "Професионален ремонт на течове от покрив във Варна с бърза реакция и гаранция."
          })}
        </script>
      </Helmet>
      
      <Header />
      
      <main className="pt-24">
        {/* Hero Section */}
        <section className="bg-primary py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 bg-accent/20 text-accent-foreground px-4 py-2 rounded-full mb-6">
                <AlertTriangle className="w-5 h-5" />
                <span className="font-medium">Спешен Ремонт на Течове</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
                Течът от Покрива Причинява Щети Всяка Минута
              </h1>
              <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl">
                Не чакайте проблемът да стане по-голям. Нашият екип реагира в рамките на часове 
                при аварийни течове във Варна и региона.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8">
                  <a href="tel:+359892701176">
                    <Phone className="w-5 h-5 mr-2" />
                    Обадете се СЕГА
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
                  <Link to="/контакти">Безплатен Оглед</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Signs of Leak */}
        <section className="py-16 bg-secondary">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
              Признаци за Теч от Покрива
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {signs.map((sign, index) => (
                <div key={index} className="flex items-center gap-3 bg-background p-4 rounded-lg">
                  <Droplets className="w-6 h-6 text-accent flex-shrink-0" />
                  <span className="text-foreground">{sign}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">
              Как Работим при Течове
            </h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              Бърз и ефективен процес за спиране на течовете
            </p>
            <div className="grid md:grid-cols-5 gap-6">
              {process.map((item, index) => (
                <div key={index} className="text-center">
                  <div className="w-14 h-14 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 bg-secondary">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
              Защо Да Изберете Нас за Течове
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-background">
                <CardContent className="p-6 text-center">
                  <Clock className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold text-foreground mb-2">Бърза Реакция</h3>
                  <p className="text-muted-foreground text-sm">Реагираме в рамките на часове при спешни случаи</p>
                </CardContent>
              </Card>
              <Card className="bg-background">
                <CardContent className="p-6 text-center">
                  <Wrench className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold text-foreground mb-2">Точна Диагностика</h3>
                  <p className="text-muted-foreground text-sm">Откриваме истинската причина за теча</p>
                </CardContent>
              </Card>
              <Card className="bg-background">
                <CardContent className="p-6 text-center">
                  <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold text-foreground mb-2">Траен Ремонт</h3>
                  <p className="text-muted-foreground text-sm">Гарантираме, че проблемът няма да се повтори</p>
                </CardContent>
              </Card>
              <Card className="bg-background">
                <CardContent className="p-6 text-center">
                  <CheckCircle className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold text-foreground mb-2">Писмена Гаранция</h3>
                  <p className="text-muted-foreground text-sm">До 5 години гаранция на ремонта</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <CTASection 
          title="Имате Теч от Покрива?"
          subtitle="Не чакайте - обадете се сега за бърза помощ"
        />
      </main>
      
      <Footer />
      <FloatingCallButton />
    </div>
  );
};

export default RoofLeakRepairPage;
