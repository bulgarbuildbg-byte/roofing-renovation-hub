import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TrustIndicators from "@/components/TrustIndicators";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CalculatorDialog from "@/components/CalculatorDialog";
import { Link } from "react-router-dom";
import { Building, Shield, Phone, ArrowRight, CheckCircle, Zap, Users, TrendingDown, Wrench, Sun, DollarSign } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useLocalizedPath } from "@/hooks/useLocalizedPath";

const SolarBuildingsPage = () => {
  const { getPath } = useLocalizedPath();

  const schemaData = {
    "@context": "https://schema.org", "@type": "Service",
    "name": "Соларни системи за блокове и сгради Варна",
    "provider": { "@type": "RoofingContractor", "name": "RemontNaPokriviVarna", "telephone": "+359884997659" },
    "areaServed": { "@type": "City", "name": "Варна" },
    "description": "Фотоволтаични системи за етажна собственост – 30 до 100 kW. Намалете разходите за общи части, асансьори и осветление.",
    "offers": { "@type": "AggregateOffer", "lowPrice": "25000", "highPrice": "80000", "priceCurrency": "EUR" }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Начало", "item": "https://www.remontnapokrivivarna.bg/bg" },
      { "@type": "ListItem", "position": 2, "name": "Соларни Системи", "item": "https://www.remontnapokrivivarna.bg/bg/solarni-sistemi" },
      { "@type": "ListItem", "position": 3, "name": "За Блокове", "item": "https://www.remontnapokrivivarna.bg/bg/solarni-sistemi-za-blokove" },
    ]
  };

  const advantages = [
    { icon: TrendingDown, title: "По-ниски Такси за Вход", desc: "Намалете месечната такса за общи части с 40-60%. Асансьорите, осветлението и помпите работят от слънчева енергия." },
    { icon: DollarSign, title: "Споделена Инвестиция", desc: "Разходът се разпределя между всички собственици. При 50 апартамента — всеки плаща само 500-1 000 €." },
    { icon: Building, title: "По-висока Стойност на Имотите", desc: "Блокове със соларни системи се оценяват 5-10% по-високо. Инвестиция, която увеличава стойността на всеки апартамент." },
    { icon: Shield, title: "Ремонт + Солар Наведнъж", desc: "Ако покривът на блока се нуждае от ремонт — правим го и монтираме панелите. Едно скеле, един разход, двойна полза." },
  ];

  const commonUses = [
    { title: "Асансьори", desc: "Асансьорите са най-големият консуматор в блока. Соларната система покрива до 80% от разхода им." },
    { title: "Осветление в общи части", desc: "Стълбища, входове, гаражи — всичко работи от слънчева енергия." },
    { title: "Водни помпи", desc: "Хидрофори и циркулационни помпи за топла вода. Намалете разхода за вода в общите части." },
    { title: "Домоуправление", desc: "Видеонаблюдение, домофони и други електрически системи за сигурност." },
  ];

  const packages = [
    { name: "МАЛЪК БЛОК", kw: "30 kW", price: "от 25 000 €", desc: "3-4 етажа, до 20 апартамента", perUnit: "~1 250 €/апартамент" },
    { name: "СРЕДЕН БЛОК", kw: "50 kW", price: "от 40 000 €", desc: "5-8 етажа, 30-50 апартамента", perUnit: "~800 €/апартамент" },
    { name: "ГОЛЯМ КОМПЛЕКС", kw: "100 kW", price: "от 70 000 €", desc: "8+ етажа или комплекс от блокове", perUnit: "~700 €/апартамент" },
  ];

  const faqs = [
    { q: "Как се взема решение за монтаж на блока?", a: "Необходимо е решение на Общото събрание на етажната собственост с мнозинство от 67% (2/3) от собствениците. Ние помагаме с подготовката на документацията и презентацията за собствениците." },
    { q: "Кой плаща за системата?", a: "Разходът се разпределя между собствениците по реда на Закона за управление на етажната собственост — обикновено пропорционално на идеалните части. При 50 апартамента, 50 kW система струва ~800 € на апартамент." },
    { q: "Подходящ ли е плоският покрив на блока?", a: "Да, плоските покриви са идеални за соларни панели — панелите се монтират на конструкции с оптимален ъгъл (30-35°) и не се нуждаят от специална адаптация. Ние проверяваме и ремонтираме хидроизолацията преди монтажа." },
    { q: "Какво се случва при ремонт на покрива?", a: "Това е нашето уникално предимство. Ако покривът се нуждае от ремонт — правим го ПРЕДИ монтажа. Избягвате скъп демонтаж в бъдеще. Една фирма за всичко." },
    { q: "Има ли субсидии за блокове?", a: "Да, Националният план за възстановяване предвижда финансиране за енергийна ефективност на жилищни сгради, включително соларни системи. Консултираме ви безплатно за актуалните програми." },
  ];

  return (
    <>
      <Helmet>
        <title>Соларни Системи за Блокове Варна – Намалете Таксите за Вход | от 25 000 €</title>
        <meta name="description" content="Фотоволтаични системи за етажна собственост – 30 до 100 kW. Намалете разходите за асансьори, осветление и общи части с до 60%. Покрив + солар от една фирма." />
        <meta property="og:title" content="Соларни Системи за Блокове – Намалете Таксите за Вход | Варна" />
        <meta property="og:url" content="https://www.remontnapokrivivarna.bg/bg/solarni-sistemi-za-blokove" />
        <link rel="canonical" href="https://www.remontnapokrivivarna.bg/bg/solarni-sistemi-za-blokove" />
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
            <span className="text-foreground font-medium">За Блокове</span>
          </nav>
        </div>
      </div>

      {/* HERO */}
      <section className="relative py-16 md:py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl">
            <span className="inline-flex items-center gap-1.5 bg-blue-500/20 text-blue-300 px-3 py-1.5 rounded-full text-sm font-medium border border-blue-500/30 mb-6">
              <Building className="w-4 h-4" /> За Етажна Собственост
            </span>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6">
              Соларни Системи за Блокове – По-ниски Такси за Общи Части
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-8 max-w-3xl">
              Намалете разходите за асансьори, осветление и помпи с до 60%. Фотоволтаична система за вашия блок — споделена инвестиция с бърза възвръщаемост.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-amber-500 hover:bg-amber-600 text-black font-bold text-lg px-8 py-6">
                <Link to={getPath('inspection')}>Безплатен Оглед <ArrowRight className="w-5 h-5 ml-2" /></Link>
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
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Защо Соларна Система за Блока?</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {advantages.map((adv, i) => (
              <Card key={i} className="border-border/50 hover:border-primary/30 transition-all">
                <CardContent className="pt-6">
                  <adv.icon className="w-10 h-10 text-primary mb-4" />
                  <h3 className="text-xl font-bold text-foreground mb-2">{adv.title}</h3>
                  <p className="text-muted-foreground">{adv.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Какво захранва */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Какво Захранва Системата</h2>
            <p className="text-lg text-muted-foreground">Всички общи части на блока работят от слънцето</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {commonUses.map((use, i) => (
              <Card key={i} className="text-center border-border/50">
                <CardContent className="pt-6">
                  <h3 className="text-lg font-bold text-foreground mb-2">{use.title}</h3>
                  <p className="text-sm text-muted-foreground">{use.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Ценови модели */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Ценови Модели за Блокове</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {packages.map((pkg, i) => (
              <Card key={i} className="border-border/50 hover:border-primary/30 transition-all">
                <CardHeader className="text-center">
                  <p className="text-sm font-medium text-primary">{pkg.name}</p>
                  <CardTitle className="text-3xl">{pkg.kw}</CardTitle>
                  <p className="text-3xl font-bold text-green-600 mt-2">{pkg.price}</p>
                  <p className="text-sm text-muted-foreground">{pkg.desc}</p>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-lg font-bold text-foreground mb-4">{pkg.perUnit}</p>
                  <Button asChild className="w-full">
                    <Link to={getPath('inspection')}>Заяви Оглед</Link>
                  </Button>
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
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Въпроси за Соларни Системи за Блокове</h2>
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Намалете Разходите за Вашия Блок</h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            Заявете безплатен оглед и ние ще подготвим оферта и презентация за Общото събрание.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-amber-500 hover:bg-amber-600 text-black font-bold text-lg px-8 py-6">
              <Link to={getPath('inspection')}>Безплатен Оглед <ArrowRight className="w-5 h-5 ml-2" /></Link>
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

export default SolarBuildingsPage;
