import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TrustIndicators from "@/components/TrustIndicators";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CalculatorDialog from "@/components/CalculatorDialog";
import { Link } from "react-router-dom";
import { TrendingUp, Shield, Phone, ArrowRight, CheckCircle, Zap, Sun, DollarSign, BarChart3, Globe } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useLocalizedPath } from "@/hooks/useLocalizedPath";

const SolarFarmsPage = () => {
  const { getPath } = useLocalizedPath();

  const schemaData = {
    "@context": "https://schema.org", "@type": "Service",
    "name": "Соларни централи и фотоволтаични паркове Варна",
    "provider": { "@type": "RoofingContractor", "name": "RemontNaPokriviVarna", "telephone": "+359884997659" },
    "areaServed": { "@type": "City", "name": "Варна" },
    "description": "Проектиране и изграждане на соларни централи от 100 kW до 1 MW+. ROI 15-20% годишно. Инвестиция с гарантирана възвръщаемост.",
    "offers": { "@type": "AggregateOffer", "lowPrice": "80000", "highPrice": "800000", "priceCurrency": "EUR" }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Начало", "item": "https://www.remontnapokrivivarna.bg/bg" },
      { "@type": "ListItem", "position": 2, "name": "Соларни Системи", "item": "https://www.remontnapokrivivarna.bg/bg/solarni-sistemi" },
      { "@type": "ListItem", "position": 3, "name": "Соларни Централи", "item": "https://www.remontnapokrivivarna.bg/bg/solarni-centrali" },
    ]
  };

  const scales = [
    { name: "100 kW", investment: "от 80 000 €", annual: "~17 000 €/год", roi: "~21%", payback: "~5 години", area: "~500 м²" },
    { name: "250 kW", investment: "от 180 000 €", annual: "~42 000 €/год", roi: "~23%", payback: "~4.5 години", area: "~1 200 м²" },
    { name: "500 kW", investment: "от 340 000 €", annual: "~82 000 €/год", roi: "~24%", payback: "~4 години", area: "~2 500 м²" },
    { name: "1 MW", investment: "от 650 000 €", annual: "~160 000 €/год", roi: "~25%", payback: "~4 години", area: "~5 000 м²" },
  ];

  const advantages = [
    { icon: TrendingUp, title: "15-25% ROI Годишно", desc: "Фотоволтаичните централи осигуряват стабилна възвръщаемост, надминаваща повечето традиционни инвестиции." },
    { icon: DollarSign, title: "Пасивен Доход", desc: "След изплащането системата генерира чиста печалба 20+ години с минимална поддръжка." },
    { icon: Shield, title: "Нисък Риск", desc: "Слънцето свети безплатно. Технологията е доказана. Цената на тока само расте. Инвестицията е защитена." },
    { icon: Globe, title: "Мащабируемост", desc: "Започнете с 100 kW и разширявайте до 1 MW+. Модулната структура позволява поетапно инвестиране." },
  ];

  const faqs = [
    { q: "Какъв е минималният размер на инвестицията?", a: "Минималната инвестиция за рентабилна соларна централа е около 80 000 € за 100 kW система. При по-големи мащаби (250 kW+) цената на kW намалява и ROI расте." },
    { q: "Какъв е реалистичният ROI?", a: "При настоящите цени на електричеството в България, ROI варира от 15% до 25% годишно в зависимост от мащаба. По-големите системи постигат по-добра възвръщаемост благодарение на икономиите от мащаба." },
    { q: "Нужна ли е земя или може на покрив?", a: "И двете са възможни. Наземните централи изискват подходящ терен (незасенчен, южно изложение). Покривните системи използват съществуващата площ на промишлени сгради, складове или търговски центрове." },
    { q: "Какви разрешителни са необходими?", a: "За системи до 30 kW – опростена процедура. За по-големи – необходимо е становище от ЕРП, разрешително за строеж и присъединяване към мрежата. Ние поемаме цялата административна процедура." },
    { q: "Каква е ролята на покривната експертиза?", a: "При покривни централи нашата 15-годишна покривна експертиза е ключова. Проверяваме носимоспособността, ремонтираме при нужда и гарантираме, че покривът издържа тежестта на панелите 25+ години." },
  ];

  return (
    <>
      <Helmet>
        <title>Соларни Централи Варна – Инвестиция с 15-25% ROI | от 80 000 €</title>
        <meta name="description" content="Проектиране и изграждане на фотоволтаични централи от 100 kW до 1 MW+. ROI 15-25% годишно. Пасивен доход с гарантирана възвръщаемост. Безплатна консултация." />
        <meta property="og:title" content="Соларни Централи – Инвестиция с 15-25% ROI | Варна" />
        <meta property="og:url" content="https://www.remontnapokrivivarna.bg/bg/solarni-centrali" />
        <link rel="canonical" href="https://www.remontnapokrivivarna.bg/bg/solarni-centrali" />
        <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <Header />

      <div className="bg-secondary border-b border-border">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center text-sm text-muted-foreground">
            <Link to={getPath('home')} className="hover:text-primary transition-colors">Начало</Link>
            <span className="mx-2">/</span>
            <Link to={getPath('solarSystems')} className="hover:text-primary transition-colors">Соларни Системи</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground font-medium">Соларни Централи</span>
          </nav>
        </div>
      </div>

      {/* HERO */}
      <section className="relative py-16 md:py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-green-500/10 via-transparent to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl">
            <span className="inline-flex items-center gap-1.5 bg-green-500/20 text-green-300 px-3 py-1.5 rounded-full text-sm font-medium border border-green-500/30 mb-6">
              <TrendingUp className="w-4 h-4" /> Инвестиционни Проекти
            </span>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6">
              Соларни Централи – Инвестиция с 15-25% ROI Годишно
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-8 max-w-3xl">
              Изградете фотоволтаична централа от 100 kW до 1 MW+ и генерирайте стабилен пасивен доход за следващите 25+ години. Пълно обслужване от проектиране до експлоатация.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-amber-500 hover:bg-amber-600 text-black font-bold text-lg px-8 py-6">
                <Link to={getPath('contact')}>Безплатна Консултация <ArrowRight className="w-5 h-5 ml-2" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 text-lg px-8 py-6">
                <a href="tel:0884997659"><Phone className="w-5 h-5 mr-2" /> 088 499 7659</a>
              </Button>
            </div>
            <CalculatorDialog type="solar" />
          </div>
        </div>
      </section>

      <TrustIndicators />

      {/* Предимства */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Защо Соларна Централа?</h2>
            <p className="text-lg text-muted-foreground">Фотоволтаичните централи са сред най-сигурните инвестиции в България</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {advantages.map((adv, i) => (
              <Card key={i} className="border-border/50 hover:border-primary/30 transition-all">
                <CardContent className="pt-6">
                  <adv.icon className="w-10 h-10 text-primary mb-4" />
                  <h3 className="text-xl font-bold text-foreground mb-2">{adv.title}</h3>
                  <p className="text-muted-foreground text-sm">{adv.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ROI Таблица по мащаби */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Мащаби и Възвръщаемост</h2>
            <p className="text-lg text-muted-foreground">Сравнете различните мащаби и изберете оптималния за вас</p>
          </div>
          <div className="max-w-5xl mx-auto overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-border">
                  <th className="text-left py-4 px-4 font-bold text-foreground">Мощност</th>
                  <th className="text-left py-4 px-4 font-bold text-foreground">Инвестиция</th>
                  <th className="text-left py-4 px-4 font-bold text-foreground">Годишен доход</th>
                  <th className="text-left py-4 px-4 font-bold text-foreground">ROI</th>
                  <th className="text-left py-4 px-4 font-bold text-foreground">Изплащане</th>
                  <th className="text-left py-4 px-4 font-bold text-foreground">Площ</th>
                </tr>
              </thead>
              <tbody>
                {scales.map((s, i) => (
                  <tr key={i} className="border-b border-border hover:bg-muted/50 transition-colors">
                    <td className="py-4 px-4 font-bold text-primary">{s.name}</td>
                    <td className="py-4 px-4 text-foreground">{s.investment}</td>
                    <td className="py-4 px-4 font-bold text-green-600">{s.annual}</td>
                    <td className="py-4 px-4 font-bold text-green-600">{s.roi}</td>
                    <td className="py-4 px-4 text-foreground">{s.payback}</td>
                    <td className="py-4 px-4 text-muted-foreground">{s.area}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-center text-sm text-muted-foreground mt-6">* Стойностите са ориентировъчни при настоящите пазарни цени в България. Точната оферта се изготвя индивидуално.</p>
        </div>
      </section>

      {/* Процес */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Процесът за Инвеститори</h2>
          </div>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { step: "1", title: "Консултация", desc: "Обсъждаме бюджет, локация и очаквания. Анализираме терена или покрива." },
              { step: "2", title: "Идеен Проект", desc: "Изготвяме техническо решение с точна мощност, компоненти и ROI прогноза." },
              { step: "3", title: "Разрешителни", desc: "Поемаме цялата административна процедура – ЕРП, строително разрешение." },
              { step: "4", title: "Доставка", desc: "Tier 1 панели и промишлени инвертори от водещи европейски производители." },
              { step: "5", title: "Изграждане", desc: "Професионален монтаж от сертифициран екип. Покривни и наземни конструкции." },
              { step: "6", title: "Експлоатация", desc: "Присъединяване, мониторинг и опционална поддръжка. Вие получавате доход." },
            ].map((s, i) => (
              <Card key={i} className="border-border/50">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <span className="text-xl font-bold text-primary">{s.step}</span>
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{s.title}</h3>
                  <p className="text-sm text-muted-foreground">{s.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Въпроси за Инвеститори</h2>
          </div>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="bg-card border border-border rounded-lg px-6">
                  <AccordionTrigger className="text-left font-semibold text-foreground py-4">{faq.q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-4 leading-relaxed">{faq.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <TrendingUp className="w-16 h-16 text-green-400 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Готови ли сте да инвестирате?</h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            Свържете се с нас за безплатна консултация и индивидуална ROI прогноза за вашия инвестиционен проект.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-amber-500 hover:bg-amber-600 text-black font-bold text-lg px-8 py-6">
              <Link to={getPath('contact')}>Безплатна Консултация <ArrowRight className="w-5 h-5 ml-2" /></Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 text-lg px-8 py-6">
              <a href="tel:0884997659"><Phone className="w-5 h-5 mr-2" /> 088 499 7659</a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default SolarFarmsPage;
