import { Helmet } from "react-helmet";
import { Phone, CheckCircle, Shield, FileText, Clock, Award, MapPin } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HreflangTags from "@/components/HreflangTags";
import QuoteRequestForm from "@/components/QuoteRequestForm";
import { Button } from "@/components/ui/button";

const TRUST_ITEMS = [
  { icon: CheckCircle, label: "Безплатен оглед" },
  { icon: Shield, label: "Писмена гаранция до 15 г." },
  { icon: FileText, label: "Работа с договор" },
  { icon: Clock, label: "Бърза реакция" },
  { icon: Award, label: "Опитни покривни майстори" },
  { icon: MapPin, label: "Варна и регионът" },
];

const QuoteRequestPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Заявете оферта за ремонт на покрив във Варна | Бърза реакция</title>
        <meta name="description" content="Заявете безплатна оферта за ремонт на покрив, хидроизолация или нов покрив във Варна. Бърза реакция, писмена гаранция и работа с договор." />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "name": "Заявете оферта за ремонт на покрив",
          "url": "https://www.remontnapokrivivarna.bg/bg/zayavete-oferta",
          "provider": {
            "@type": "RoofingContractor",
            "name": "Ремонт на покриви Варна",
            "telephone": "+359893971873",
            "areaServed": "Варна и регионът"
          }
        })}</script>
      </Helmet>
      <HreflangTags />
      <Header />

      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white pt-28 pb-16 lg:pt-32 lg:pb-20">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
            Заявете оферта за ремонт на покрив
          </h1>
          <p className="text-lg md:text-xl text-slate-200 mb-8 max-w-2xl mx-auto">
            Оставете данни за контакт и кратко описание на проблема. Ще се свържем с Вас за уточнение и оглед.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              size="lg"
              className="h-14 px-8 text-base font-bold bg-primary hover:bg-primary/90"
              onClick={() => document.getElementById("quote-form")?.scrollIntoView({ behavior: "smooth" })}
            >
              Изпрати запитване
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-14 px-8 text-base font-bold border-2 border-white text-white bg-transparent hover:bg-white hover:text-slate-900"
            >
              <a href="tel:0893971873">
                <Phone className="w-5 h-5 mr-2" /> Обади се сега: 089 397 1873
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Form section */}
      <section id="quote-form" className="py-12 lg:py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Форма за запитване</h2>
            <p className="text-muted-foreground">Попълнете формата по-долу — отговаряме в рамките на 24 часа.</p>
          </div>
          <QuoteRequestForm />
        </div>
      </section>

      {/* Trust strip */}
      <section className="py-12 bg-muted/30 border-y border-border">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {TRUST_ITEMS.map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center gap-2">
                <item.icon className="w-8 h-8 text-primary" />
                <span className="text-sm font-medium">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visible phone block */}
      <section className="py-12 bg-slate-900 text-white">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <p className="text-slate-300 mb-3">Предпочитате да говорите директно?</p>
          <a
            href="tel:0893971873"
            className="inline-flex items-center gap-3 text-3xl md:text-4xl font-bold text-accent hover:text-accent/80 transition-colors"
          >
            <Phone className="w-8 h-8" /> 089 397 1873
          </a>
          <p className="text-sm text-slate-400 mt-3">Работно време: Пон–Съб 08:00–19:00</p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default QuoteRequestPage;
