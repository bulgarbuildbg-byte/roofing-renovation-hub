import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCallButton from "@/components/FloatingCallButton";
import TrustIndicators from "@/components/TrustIndicators";
import SolarCalculator from "@/components/SolarCalculator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CalculatorDialog from "@/components/CalculatorDialog";
import { Link } from "react-router-dom";
import { Sun, Shield, Phone, ArrowRight, CheckCircle, Zap, Home, Battery, Wrench, Award, Clock, TrendingUp } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useLocalizedPath } from "@/hooks/useLocalizedPath";

const SolarHousePage = () => {
  const { getPath } = useLocalizedPath();

  const schemaData = {
    "@context": "https://schema.org", "@type": "Service",
    "name": "Соларна система за къща Варна",
    "provider": { "@type": "RoofingContractor", "name": "RemontNaPokriviVarna", "telephone": "+359884997659" },
    "areaServed": { "@type": "City", "name": "Варна" },
    "description": "Фотоволтаични системи за еднофамилни къщи – 5 до 12 kW. До 80% по-ниски сметки за ток.",
    "offers": { "@type": "AggregateOffer", "lowPrice": "5500", "highPrice": "18000", "priceCurrency": "EUR" }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Начало", "item": "https://www.remontnapokrivivarna.bg/bg" },
      { "@type": "ListItem", "position": 2, "name": "Соларни Системи", "item": "https://www.remontnapokrivivarna.bg/bg/solarni-sistemi" },
      { "@type": "ListItem", "position": 3, "name": "За Къщи", "item": "https://www.remontnapokrivivarna.bg/bg/solarni-sistemi-za-kashta" },
    ]
  };

  const packages = [
    { name: "СТАНДАРТ", kw: "5 kW", price: "5 500", desc: "За домакинства с месечна сметка до 150 лв", production: "~6 000 kWh/год", panels: "10 панела", inverter: "5 kW мрежов", battery: "Без батерия", payback: "~5 години", highlight: false },
    { name: "ОПТИМАЛ", kw: "8 kW", price: "8 800", desc: "Най-популярен — за средно домакинство", production: "~10 000 kWh/год", panels: "16 панела", inverter: "8 kW хибриден", battery: "Опция +3 500 €", payback: "~5-6 години", highlight: true },
    { name: "ПРЕМИУМ", kw: "12 kW", price: "14 500", desc: "За голяма къща или с климатици/басейн", production: "~15 000 kWh/год", panels: "24 панела", inverter: "12 kW хибриден", battery: "10 kWh включена", payback: "~6-7 години", highlight: false },
  ];

  const processSteps = [
    { step: "1", title: "Запитване", desc: "Изпратете запитване онлайн или се обадете. Отговаряме до 24 часа." },
    { step: "2", title: "Консултация и Оглед", desc: "Безплатно посещаваме имота ви. Оценяваме покрива, ориентацията и потреблението." },
    { step: "3", title: "Индивидуална Оферта", desc: "Изготвяме детайлна оферта с точна цена, мощност и очаквано спестяване." },
    { step: "4", title: "Доставка", desc: "Доставяме Tier 1 панели, инвертор и всички компоненти до вашия адрес." },
    { step: "5", title: "Монтаж", desc: "Монтираме системата за 2-3 дни. При нужда — ремонтираме покрива първо." },
    { step: "6", title: "Пускане в Експлоатация", desc: "Свързваме към мрежата, регистрираме в ЕРП и настройваме мониторинга." },
  ];

  const faqs = [
    { q: "Подходящ ли е покривът ми за соларна система?", a: "Повечето покриви са подходящи — скатни (с керемиди или метал) и плоски. Идеалната ориентация е юг, но югоизток и югозапад също работят добре. При огледа оценяваме наклона, засенчването и носимоспособността. Ако покривът се нуждае от ремонт — правим го преди монтажа." },
    { q: "Колко спестявам месечно с 8 kW система?", a: "При средна сметка от 200 лв, 8 kW система намалява реалните разходи с 60-80%, т.е. спестявате 120-160 лв на месец или 1 440-1 920 лв годишно. С батерия спестяванията са още по-големи." },
    { q: "Какво става, ако покривът ми е стар?", a: "Това е нашето уникално предимство. Като специалисти по покриви, ние първо ремонтираме или заменяме покривното покритие и едва тогава монтираме панелите. Така избягвате скъп демонтаж след 2-3 години." },
    { q: "Мога ли да продавам излишъка ток?", a: "Да. В България можете да продавате излишната енергия на мрежата чрез нетно отчитане (net metering). Произведеното, но неизразходвано електричество се компенсира от следващата ви сметка." },
    { q: "Има ли субсидии или програми за соларни системи?", a: "Да, периодично има национални и европейски програми за финансиране. Консултираме ви безплатно за актуалните възможности при огледа." },
  ];

  return (
    <>
      <Helmet>
        <title>Соларна Система за Къща Варна – До 80% По-ниски Сметки | от 5 500 €</title>
        <meta name="description" content="Фотоволтаична система за еднофамилна къща – 5, 8 или 12 kW. Покрив + солар от една фирма. Безплатен оглед и точна оферта. Изчислете спестяването с калкулатора." />
        <meta property="og:title" content="Соларна Система за Къща – До 80% По-ниски Сметки | Варна" />
        <meta property="og:url" content="https://www.remontnapokrivivarna.bg/bg/solarni-sistemi-za-kashta" />
        <link rel="canonical" href="https://www.remontnapokrivivarna.bg/bg/solarni-sistemi-za-kashta" />
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
            <span className="text-foreground font-medium">За Къщи</span>
          </nav>
        </div>
      </div>

      {/* HERO */}
      <section className="relative py-16 md:py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl">
            <span className="inline-flex items-center gap-1.5 bg-amber-500/20 text-amber-300 px-3 py-1.5 rounded-full text-sm font-medium border border-amber-500/30 mb-6">
              <Home className="w-4 h-4" /> За Еднофамилни Къщи
            </span>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6">
              Соларна Система за Къща – До 80% По-ниски Сметки
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-8 max-w-3xl">
              Спрете да плащате скъп ток. С фотоволтаична система от 5 до 12 kW, вашата къща произвежда собствена електроенергия и спестява хиляди левове годишно. А ние гарантираме, че покривът ви е в перфектно състояние за монтажа.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-amber-500 hover:bg-amber-600 text-black font-bold text-lg px-8 py-6">
                <Link to={getPath('inspection')}>
                  Безплатен Оглед <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 text-lg px-8 py-6">
                <a href="tel:0884997659"><Phone className="w-5 h-5 mr-2" /> 088 499 7659</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <TrustIndicators />

      {/* Проблем → Решение */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            <Card className="border-red-200 bg-red-50/50 dark:bg-red-950/20">
              <CardContent className="pt-6">
                <h3 className="text-2xl font-bold text-red-700 dark:text-red-400 mb-4">❌ Проблемът</h3>
                <ul className="space-y-3">
                  {["Сметката за ток расте всяка година", "Нямате контрол върху цените на енергията", "Плащате 200-500 лв/месец без да получавате нищо в замяна", "Клиенти от съседните улици вече спестяват – а вие не"].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-muted-foreground"><span className="text-red-500 mt-1">•</span>{item}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card className="border-green-200 bg-green-50/50 dark:bg-green-950/20">
              <CardContent className="pt-6">
                <h3 className="text-2xl font-bold text-green-700 dark:text-green-400 mb-4">✅ Решението</h3>
                <ul className="space-y-3">
                  {["Произвеждайте собствена електроенергия от слънцето", "Намалете сметката с до 80%", "Инвестиция, която се изплаща за 4-7 години", "Покрив + солар от една фирма = 0 риск"].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-muted-foreground"><CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />{item}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Конкретен продукт: 8 kW */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Най-популярният Избор: 8 kW Система</h2>
            <p className="text-lg text-muted-foreground">Идеална за домакинство с месечна сметка 150-350 лв</p>
          </div>
          <div className="max-w-4xl mx-auto">
            <Card className="border-primary/30">
              <CardContent className="pt-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-foreground">Спецификации</h3>
                    {[
                      { label: "Мощност", value: "8 kW (8 000 W)" },
                      { label: "Панели", value: "16 × 500W Tier 1 монокристални" },
                      { label: "Инвертор", value: "8 kW хибриден (Huawei/GoodWe)" },
                      { label: "Батерия", value: "Опция: 5-10 kWh литиево-желязна" },
                      { label: "Годишно производство", value: "~10 000 kWh" },
                      { label: "Покривна площ", value: "~40 м²" },
                      { label: "Монтаж", value: "2-3 работни дни" },
                    ].map((spec, i) => (
                      <div key={i} className="flex justify-between border-b border-border pb-2">
                        <span className="text-muted-foreground">{spec.label}</span>
                        <span className="font-medium text-foreground">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col justify-center items-center text-center">
                    <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <Sun className="w-12 h-12 text-primary" />
                    </div>
                    <p className="text-5xl font-bold text-green-600 mb-2">8 800 €</p>
                    <p className="text-muted-foreground mb-1">без батерия</p>
                    <p className="text-sm text-muted-foreground mb-6">с батерия: от 12 300 €</p>
                    <Button asChild size="lg" className="w-full">
                      <Link to={getPath('inspection')}>Заяви Безплатен Оглед</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Покрив + Солар */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 border-y border-amber-200/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Комбинираме Ремонт на Покрив + Монтаж на Соларна Система
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto">
              Като покривни специалисти с 15+ години опит, ние гарантираме, че вашият покрив е готов да носи соларни панели за следващите 25+ години.
            </p>
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <Card>
                <CardContent className="pt-6">
                  <Wrench className="w-10 h-10 text-amber-600 mb-4" />
                  <h3 className="text-xl font-bold text-foreground mb-2">Ако покривът е стар</h3>
                  <p className="text-muted-foreground">Ремонтираме го или заменяме покритието. Подсилваме конструкцията ако е необходимо. Едва тогава монтираме панелите — за 25+ години без проблеми.</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <Shield className="w-10 h-10 text-green-600 mb-4" />
                  <h3 className="text-xl font-bold text-foreground mb-2">Ако покривът е нов</h3>
                  <p className="text-muted-foreground">Защитаваме хидроизолацията около крепежните елементи. Гарантираме, че монтажът не компрометира водоплътността. Всичко наведнъж — спестявате пари и скеле.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Ценови пакети */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Ценови Пакети за Къщи</h2>
            <p className="text-lg text-muted-foreground">Изберете мощността, която отговаря на вашето потребление</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {packages.map((pkg, i) => (
              <Card key={i} className={`relative ${pkg.highlight ? 'border-primary shadow-xl scale-105' : 'border-border/50'}`}>
                {pkg.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-bold">
                    Най-популярен
                  </div>
                )}
                <CardHeader className="text-center pb-2">
                  <p className="text-sm font-medium text-primary">{pkg.name}</p>
                  <CardTitle className="text-3xl">{pkg.kw}</CardTitle>
                  <p className="text-4xl font-bold text-green-600 mt-2">{pkg.price} €</p>
                  <p className="text-sm text-muted-foreground">{pkg.desc}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-6">
                    {[
                      { label: "Производство", value: pkg.production },
                      { label: "Панели", value: pkg.panels },
                      { label: "Инвертор", value: pkg.inverter },
                      { label: "Батерия", value: pkg.battery },
                      { label: "Изплащане", value: pkg.payback },
                    ].map((item, j) => (
                      <div key={j} className="flex justify-between text-sm border-b border-border/50 pb-1">
                        <span className="text-muted-foreground">{item.label}</span>
                        <span className="font-medium text-foreground">{item.value}</span>
                      </div>
                    ))}
                  </div>
                  <Button asChild className={`w-full ${pkg.highlight ? '' : 'variant-outline'}`} variant={pkg.highlight ? 'default' : 'outline'}>
                    <Link to={getPath('inspection')}>Заяви Оглед</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          <p className="text-center text-sm text-muted-foreground mt-8">* Цените са ориентировъчни и включват доставка и монтаж. Точната цена се определя след безплатен оглед.</p>
        </div>
      </section>

      {/* Процес */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Процесът от А до Я</h2>
            <p className="text-lg text-muted-foreground">6 стъпки до работеща соларна система на вашия покрив</p>
          </div>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {processSteps.map((step, i) => (
              <Card key={i} className="border-border/50">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <span className="text-xl font-bold text-primary">{step.step}</span>
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Solar Calculator */}
      <SolarCalculator />

      {/* Гаранции */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Тройна Гаранция</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { icon: Sun, years: "25", title: "Соларни Панели", desc: "Производствена гаранция. Минимум 80% мощност след 25 години." },
              { icon: Zap, years: "10", title: "Инвертор", desc: "Пълна гаранция на инвертора от производителя." },
              { icon: Shield, years: "15", title: "Монтаж и Покрив", desc: "Писмена гаранция на монтажа и покривната конструкция." },
            ].map((g, i) => (
              <Card key={i} className="text-center border-green-200 bg-green-50/30 dark:bg-green-950/10">
                <CardContent className="pt-8">
                  <g.icon className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <p className="text-5xl font-bold text-green-600 mb-1">{g.years}</p>
                  <p className="text-sm text-muted-foreground mb-2">години</p>
                  <h3 className="text-lg font-bold text-foreground mb-2">{g.title}</h3>
                  <p className="text-sm text-muted-foreground">{g.desc}</p>
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
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Въпроси за Соларни Системи за Къщи</h2>
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Готови ли сте за по-ниски сметки?</h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            Заявете безплатен оглед и получете точна оферта за соларна система за вашата къща.
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
      <FloatingCallButton />
    </>
  );
};

export default SolarHousePage;
