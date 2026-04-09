import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCallButton from "@/components/FloatingCallButton";
import RelatedServices from "@/components/RelatedServices";
import LearnMoreLinks from "@/components/LearnMoreLinks";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLocalizedPath } from "@/hooks/useLocalizedPath";
import { CheckCircle, Settings, Calendar, Phone, MapPin, Search, Leaf, Snowflake, Sun, CloudRain, AlertTriangle, ShieldCheck, FileText, CreditCard } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

// Process images
import groundInspection from "@/assets/process/maintenance-inspection-attic-01.jpg";
import roofWalkingInspection from "@/assets/process/maintenance-inspection-attic-02.jpg";
import gutterCleaning from "@/assets/process/gutter-cleaning.jpg";
import mossRemoval from "@/assets/process/moss-removal.jpg";
import singleTileRepair from "@/assets/process/single-tile-repair.jpg";
import maintenanceReport from "@/assets/process/maintenance-report.jpg";

const MaintenancePage = () => {
  const { t } = useTranslation();
  const { getPath } = useLocalizedPath();

  const relatedServices = [
    { title: "Ремонт на Покриви", description: "Професионален ремонт при открити проблеми по време на поддръжка.", href: getPath('roofRepair') },
    { title: "Смяна на Керемиди", description: "Подмяна на повредени керемиди преди да причинят течове.", href: getPath('tileReplacement') },
    { title: "Хидроизолация", description: "Превантивна хидроизолация за защита на покрива.", href: getPath('waterproofing') }
  ];

  const learnMoreLinks = [
    { title: "Пролетна инспекция на покрива", href: "/блог/пролетна-инспекция-на-покрива" },
    { title: "Подготовка на покрива за зимата", href: "/блог/как-да-подготвим-покрива-за-зимата" }
  ];

  const packages = [
    {
      title: "BASIC",
      price: "199 €/година",
      popular: false,
      color: "green",
      features: [
        "1 оглед годишно",
        "Проверка на керемиди, било, обшивки, комини, улуци",
        "Кратък доклад със снимки",
        "Препоръки за поддръжка"
      ],
      suitableFor: "Собственици, които искат превантивен преглед и ранно откриване на проблеми."
    },
    {
      title: "STANDARD",
      price: "399 €/година",
      popular: true,
      color: "yellow",
      features: [
        "2 огледа годишно",
        "Почистване на улуци",
        "Леко почистване на покрив",
        "Подмяна до 10 керемиди",
        "Дребни ремонти",
        "Годишен технически доклад",
        "Прогноза за следващи ремонти",
        "Бюджетна рамка"
      ],
      suitableFor: "Собственици, които искат пълна грижа — знаете какво ви чака и колко ще струва."
    },
    {
      title: "PREMIUM",
      price: "799 €/година",
      popular: false,
      color: "red",
      features: [
        "2–3 огледа годишно",
        "Почистване на покрив (2 пъти)",
        "Включени дребни ремонти",
        "Безплатно посещение при проблем",
        "Приоритетно обслужване",
        "Разширен детайлен доклад",
        "План за 1–3 години",
        "10–15% отстъпка от ремонт"
      ],
      suitableFor: "За максимално спокойствие — вили, ваканционни имоти и инвеститори."
    },
    {
      title: "СЕЗОННА ПОДДРЪЖКА",
      price: "149 €",
      popular: false,
      color: "blue",
      features: [
        "Еднократен оглед",
        "Почистване на улуци",
        "Кратък доклад"
      ],
      suitableFor: "Идеално за нови клиенти, които искат да проверят покрива си веднъж."
    }
  ];

  const problems = [
    { icon: AlertTriangle, text: "Разместени керемиди" },
    { icon: CloudRain, text: "Запушени улуци" },
    { icon: Search, text: "Скрити течове" },
    { icon: Settings, text: "Износени обшивки" }
  ];

  const solutions = [
    "Откриваме проблемите навреме",
    "Предотвратяваме течове",
    "Удължаваме живота на покрива",
    "Планираме бъдещи ремонти"
  ];

  const services = [
    "Почистване на покриви от мъх и лишеи",
    "Почистване на улуци и водосточни тръби",
    "Профилактичен преглед на покрива",
    "Почистване на сняг през зимата",
    "Смяна на счупени керемиди",
    "Подмяна на уплътнения и фугиране",
    "Боядисване и защитни покрития"
  ];

  const benefits = [
    "Удължава живота на покрива с до 50%",
    "Предотвратява скъпи аварийни ремонти",
    "Запазва гаранцията на покривните материали",
    "Подобрява енергийната ефективност",
    "Поддържа добрия външен вид на сградата",
    "Спестява пари в дългосрочен план"
  ];

  const warningSignals = [
    { title: "Мокри петна по тавана", description: "Най-очевидният признак за проблем с покрива. Мокрите петна показват, че водата вече прониква в сградата." },
    { title: "Натрупване на мъх и лишеи", description: "Мъхът задържа влага директно върху покривното покритие, ускорявайки износването." },
    { title: "Запушени или провиснали улуци", description: "Водата, която прелива от улуците, може да проникне под покривното покритие или да уврежда фасадата." },
    { title: "Видимо износени или счупени керемиди", description: "Керемиди с напукана глазура, счупени ъгли или липсващи елементи са входна точка за водата." },
    { title: "Ръжда по метални елементи", description: "Ръждясали обшивки, капаци или улуци са компрометирани и не осигуряват надеждна защита." },
    { title: "Увеличени сметки за отопление", description: "Проблемът може да е в топлоизолацията на покрива. Проверката може да разкрие влага или повредена изолация." }
  ];

  const seasonalMaintenance = [
    {
      season: "Пролет", icon: Sun, title: "Пролетна проверка и почистване",
      description: "След зимата е важно да се направи цялостен преглед на покрива.",
      tasks: ["Инспекция за повреди от зимата", "Почистване на улуци от листа и клони", "Проверка на обшивки около комини", "Отстраняване на мъх и лишеи", "Проверка на хидроизолацията"]
    },
    {
      season: "Лято", icon: Sun, title: "Летни превантивни мерки",
      description: "Лятото е най-подходящият сезон за планови ремонти и подобрения.",
      tasks: ["Полагане на хидроизолация", "Боядисване на метални елементи", "Подмяна на износени уплътнения", "Монтаж на снегозадържатели", "Проверка на вентилацията"]
    },
    {
      season: "Есен", icon: Leaf, title: "Есенно почистване преди зимата",
      description: "Есента е критичен период за подготовка на покрива за зимните месеци.",
      tasks: ["Интензивно почистване на улуци", "Проверка на водоотвеждането", "Фиксиране на разхлабени керемиди", "Уплътняване на проблемни зони", "Подрязване на близки клони"]
    },
    {
      season: "Зима", icon: Snowflake, title: "Зимна поддръжка и почистване на сняг",
      description: "През зимата основната грижа е контрол на снежното натоварване.",
      tasks: ["Почистване на сняг при нужда", "Премахване на ледени висулки", "Контрол на натоварването", "Проверка за ледени язове", "Аварийни интервенции при течове"]
    }
  ];

  const maintenanceProcess = [
    { step: 1, title: "Визуална инспекция от земята", description: "Нашият специалист започва с оглед от земята, използвайки бинокъл или дрон за първоначална оценка.", image: groundInspection, imageAlt: "Визуална инспекция на покрив от земята" },
    { step: 2, title: "Детайлен оглед на покрива", description: "При необходимост се качваме на покрива за по-детайлна инспекция. Проверяваме керемидите, обшивките, улуците и комините.", image: roofWalkingInspection, imageAlt: "Детайлен оглед на покрив от близо" },
    { step: 3, title: "Почистване на улуци и водостоци", description: "Ръчно премахваме натрупаните листа, клони и отломки. Промиваме водосточните тръби с вода под налягане.", image: gutterCleaning, imageAlt: "Почистване на улуци от листа и отломки" },
    { step: 4, title: "Отстраняване на мъх и лишеи", description: "Използваме специализирани препарати и четки за внимателно отстраняване, без да повредим покритието.", image: mossRemoval, imageAlt: "Отстраняване на мъх от керемиден покрив" },
    { step: 5, title: "Дребни ремонти на място", description: "При констатиране на дребни проблеми ги отстраняваме веднага — счупена керемида, разхлабена обшивка, липсващо уплътнение.", image: singleTileRepair, imageAlt: "Дребен ремонт на покрив" },
    { step: 6, title: "Доклад и препоръки", description: "Предоставяме подробен доклад за състоянието на покрива, извършените дейности и препоръки за бъдещи действия.", image: maintenanceReport, imageAlt: "Изготвяне на доклад за състоянието на покрива" }
  ];

  const serviceAreas = [
    { area: "Варна център", neighborhoods: ["Централен район", "Одесос", "Морска градина"] },
    { area: "Варна квартали", neighborhoods: ["кв. Бриз", "кв. Чайка", "кв. Левски", "кв. Аспарухово", "кв. Владиславово", "кв. Младост"] },
    { area: "Околни селища", neighborhoods: ["Аксаково", "Белослав", "Девня", "Златни пясъци", "Св. Константин", "Виница"] }
  ];

  const faqs = [
    { question: "Колко често трябва да се прави поддръжка на покрива?", answer: "Препоръчваме минимум два пълни прегледа годишно — един напролет след зимния сезон и един наесен преди началото на дъждовния период. При по-стари покриви (над 20 години) препоръчваме допълнителни проверки." },
    { question: "Колко струва поддръжката на покрива?", answer: "Сезонна поддръжка от 149 €. Годишен BASIC пакет от 199 €. STANDARD с доклад и ремонти от 399 €. PREMIUM с приоритетно обслужване от 799 €. Всички цени включват доклад и препоръки." },
    { question: "Мога ли сам да почистя покрива си?", answer: "Технически е възможно, но не е препоръчително. Работата на покрив крие сериозни рискове. Професионалните екипи разполагат с лично предпазно оборудване и опит да забележат потенциални проблеми." },
    { question: "Какво включва годишният пакет за поддръжка?", answer: "STANDARD пакетът включва: два пълни прегледа, почистване на улуци, подмяна до 10 керемиди, дребни ремонти и годишен технически доклад с прогноза и бюджетна рамка." },
    { question: "Как да разбера, че покривът ми има нужда от поддръжка?", answer: "Признаци: запушени или провиснали улуци; видим мъх по керемидите; счупени или липсващи керемиди; ръжда по ламаринените елементи; петна от влага по тавана; увеличени сметки за отопление." },
    { question: "Почиствате ли сняг от покриви?", answer: "Да, предлагаме услуга за снегопочистване. Натрупването над 30–40 см може да натовари конструкцията опасно. Извършваме услугата безопасно с подходящо оборудване." },
    { question: "Работите ли в цяла Варна и областта?", answer: "Да, обслужваме целия град Варна и Област Варна — Аксаково, Белослав, Девня, Златни пясъци, Св. Константин и др. При годишни договори транспортните разходи са включени." },
    { question: "Може ли поддръжката да продължи живота на покрива?", answer: "Категорично да. Редовната поддръжка удължава живота на покрива с 30–50%. Покривите с редовна поддръжка издържат с 10–15 години по-дълго." }
  ];

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Поддръжка на покриви Варна",
    "provider": {
      "@type": "RoofingContractor",
      "name": "RemontNaPokriviVarna",
      "telephone": "+359884997659",
      "email": "remontnapokrivivarna@abv.bg",
      "address": { "@type": "PostalAddress", "streetAddress": "ул. Уста Колю Фичето 25 А", "addressLocality": "Варна", "addressCountry": "BG" }
    },
    "areaServed": [
      { "@type": "City", "name": "Варна" },
      { "@type": "Place", "name": "Аксаково" },
      { "@type": "Place", "name": "Златни пясъци" }
    ],
    "description": "Професионална поддръжка на покриви във Варна - годишни пакети от 149 до 799 €.",
    "offers": { "@type": "AggregateOffer", "lowPrice": "149", "highPrice": "799", "priceCurrency": "EUR", "offerCount": "4" }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({ "@type": "Question", "name": faq.question, "acceptedAnswer": { "@type": "Answer", "text": faq.answer } }))
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Начало", "item": "https://www.remontnapokrivivarna.bg" },
      { "@type": "ListItem", "position": 2, "name": "Услуги", "item": "https://www.remontnapokrivivarna.bg/services" },
      { "@type": "ListItem", "position": 3, "name": "Поддръжка на покриви", "item": "https://www.remontnapokrivivarna.bg/поддръжка-на-покриви" }
    ]
  };

  return (
    <>
      <Helmet>
        <title>Поддръжка Покриви Варна – от 149 € | Годишни пакети</title>
        <meta name="description" content="Поддръжка на покриви във Варна – годишни пакети от 149 до 799 €. Предотвратете скъпи ремонти. ☎ 088 499 7659" />
        <meta property="og:title" content="Поддръжка на Покриви Варна – от 149 € | Годишни пакети" />
        <meta property="og:description" content="Редовната поддръжка предотвратява скъпи ремонти. Годишни пакети от 149 до 799 €." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.remontnapokrivivarna.bg/bg/поддръжка-на-покриви" />
        <meta property="og:locale" content="bg_BG" />
        <meta property="og:site_name" content="Ремонт на Покриви Варна" />
        <meta name="keywords" content="поддръжка покриви варна, почистване улуци варна, годишна поддръжка покрив, профилактика покрив варна" />
        <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <Header />
      
      <main className="pt-20">
        {/* 1. Hero */}
        <section className="relative bg-primary text-primary-foreground py-16 md:py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary/80" />
          <div className="container mx-auto px-4 relative z-10">
            <nav className="text-sm mb-6 text-primary-foreground/70">
              <Link to={getPath('home')} className="hover:text-primary-foreground">Начало</Link>
              <span className="mx-2">/</span>
              <Link to={getPath('services')} className="hover:text-primary-foreground">Услуги</Link>
              <span className="mx-2">/</span>
              <span className="text-primary-foreground">Поддръжка на покриви</span>
            </nav>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-center">
              Поддръжка на покриви във Варна
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-4xl mx-auto text-center mb-4">
              Защита за вашия дом през цялата година
            </p>
            <p className="text-lg text-primary-foreground/70 text-center mb-8">
              Редовната поддръжка предотвратява скъпи ремонти. Ние следим състоянието на вашия покрив и ви даваме ясен план за бъдещи действия.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8">
                <a href="#packages">Избери пакет</a>
              </Button>
              <Button asChild size="lg" className="bg-transparent border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground/20">
                <a href="tel:0884997659">
                  <Phone className="w-5 h-5 mr-2" />
                  Обади се
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* 2. Problem Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  ⚠️ Повечето покриви се ремонтират едва когато започнат да текат
                </h2>
                <p className="text-xl text-muted-foreground">
                  Малките проблеми обаче се превръщат в големи разходи:
                </p>
              </div>
              <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                {problems.map((problem, index) => (
                  <div key={index} className="flex flex-col items-center text-center p-5 bg-card rounded-xl border border-border">
                    <problem.icon className="w-10 h-10 text-destructive mb-3" />
                    <span className="font-semibold text-foreground">{problem.text}</span>
                  </div>
                ))}
              </div>
              <p className="text-center text-lg font-semibold text-foreground">
                👉 Без поддръжка тези проблеми се натрупват.
              </p>
            </div>
          </div>
        </section>

        {/* 3. Solution Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-8">
                ✅ С нашата услуга за поддръжка:
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {solutions.map((solution, index) => (
                  <div key={index} className="flex items-center gap-3 p-4 bg-card rounded-lg border border-border">
                    <ShieldCheck className="w-6 h-6 text-primary flex-shrink-0" />
                    <span className="text-foreground font-medium">{solution}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 4. Packages */}
        <section id="packages" className="py-16 bg-secondary">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-4">Пакети за поддръжка</h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              Изберете пакет, който отговаря на вашите нужди
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
              {packages.map((pkg, index) => (
                <Card key={index} className={`border-border bg-card ${pkg.popular ? 'ring-2 ring-primary relative' : ''}`}>
                  <CardContent className="p-6 flex flex-col h-full">
                    {pkg.popular && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 text-xs font-semibold text-primary-foreground bg-primary rounded-full">
                        Най-предпочитан
                      </span>
                    )}
                    <h3 className="text-xl font-bold text-card-foreground mb-2">{pkg.title}</h3>
                    <p className="text-2xl font-bold text-primary mb-3">{pkg.price}</p>
                    <div className="bg-muted/40 rounded-lg p-3 mb-4">
                      <p className="text-xs font-semibold text-foreground mb-1">Подходящ за:</p>
                      <p className="text-xs text-muted-foreground">{pkg.suitableFor}</p>
                    </div>
                    <ul className="space-y-2 mb-6 flex-grow">
                      {pkg.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button asChild className="w-full mt-auto" variant={pkg.popular ? "default" : "outline"}>
                      <Link to={getPath('contact')}>Заявете оферта</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Terms */}
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold text-foreground text-center mb-8">
                <CreditCard className="w-6 h-6 inline-block mr-2 text-primary" />
                Условия
              </h2>
              <div className="grid sm:grid-cols-3 gap-6">
                <div className="text-center p-5 bg-card rounded-xl border border-border">
                  <FileText className="w-8 h-8 text-primary mx-auto mb-2" />
                  <p className="font-semibold text-foreground">100% авансово плащане</p>
                </div>
                <div className="text-center p-5 bg-card rounded-xl border border-border">
                  <Calendar className="w-8 h-8 text-primary mx-auto mb-2" />
                  <p className="font-semibold text-foreground">Валидност 12 месеца</p>
                </div>
                <div className="text-center p-5 bg-card rounded-xl border border-border">
                  <CheckCircle className="w-8 h-8 text-primary mx-auto mb-2" />
                  <p className="font-semibold text-foreground">Всички огледи се документират</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Warning Signals */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">
                Какъв проблем решава поддръжката?
              </h2>
              <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
                Разпознаването на тези сигнали навреме може да ви спести хиляди левове
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {warningSignals.map((signal, index) => (
                  <Card key={index} className="border-border">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-3">
                        <CloudRain className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                        <div>
                          <h3 className="text-lg font-semibold text-card-foreground mb-2">{signal.title}</h3>
                          <p className="text-muted-foreground text-sm">{signal.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 7. Benefits */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Ползи от редовната поддръжка</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 bg-card rounded-lg border border-border">
                    <CheckCircle className="w-6 h-6 text-accent flex-shrink-0" />
                    <span className="text-card-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 8. Hero Image */}
        <section className="relative h-[400px] md:h-[500px]">
          <img src={gutterCleaning} alt="Професионална поддръжка на покрив във Варна" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
          <div className="absolute bottom-8 left-0 right-0 text-center">
            <p className="text-foreground text-lg font-medium">Превантивната поддръжка спестява хиляди левове за бъдещи ремонти</p>
          </div>
        </section>

        {/* 9. Step-by-Step Process */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">Процес на професионална инспекция</h2>
              <p className="text-muted-foreground text-center mb-12 max-w-3xl mx-auto">Нашият систематичен подход гарантира, че нищо не остава незабелязано</p>
              <div className="space-y-12">
                {maintenanceProcess.map((step, index) => (
                  <div key={index} className={`flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 items-center`}>
                    <div className="w-full md:w-1/2">
                      <img src={step.image} alt={step.imageAlt} className="w-full h-64 md:h-80 object-cover rounded-xl shadow-lg" />
                    </div>
                    <div className="w-full md:w-1/2">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl">{step.step}</div>
                        <h3 className="text-2xl font-semibold text-foreground">{step.title}</h3>
                      </div>
                      <p className="text-muted-foreground leading-relaxed text-lg">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 10. SEO Text */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto prose prose-lg">
              <h2 className="text-3xl font-bold text-foreground mb-6">Защо редовната поддръжка на покрива е важна?</h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                Покривът е първата защита на вашия дом срещу атмосферните условия. Във Варна, с нейните специфични климатични особености - морски въздух, интензивни валежи, силни ветрове и горещо лято - покривите са подложени на значително натоварване. Редовната поддръжка е ключът към дългия живот на покривната конструкция.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                <strong className="text-foreground">Статистиката показва</strong>, че покривите с редовна поддръжка издържат с 40-50% по-дълго от тези без грижа. Малките проблеми, открити навреме, се решават лесно и евтино.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                <strong className="text-foreground">RemontNaPokriviVarna</strong> предлага цялостни услуги по поддръжка на покриви - от профилактични прегледи до почистване на улуци и сняг. Нашите годишни пакети осигуряват спокойствие и защита на вашата инвестиция целогодишно.
              </p>
            </div>
          </div>
        </section>

        {/* 11. Seasonal Maintenance */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">Сезонна поддръжка на покрива</h2>
              <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">Всеки сезон поставя различни предизвикателства пред покрива.</p>
              <div className="grid md:grid-cols-2 gap-8">
                {seasonalMaintenance.map((season, index) => (
                  <Card key={index} className="border-border overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <season.icon className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <span className="text-sm text-muted-foreground">{season.season}</span>
                          <h3 className="text-xl font-semibold text-card-foreground">{season.title}</h3>
                        </div>
                      </div>
                      <p className="text-muted-foreground mb-4">{season.description}</p>
                      <ul className="space-y-2">
                        {season.tasks.map((task, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                            {task}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 12. Services List */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Услуги по поддръжка</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {services.map((service, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 rounded-lg bg-card border border-border">
                    <Settings className="w-6 h-6 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{service}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 13. Service Areas */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">Район на обслужване</h2>
              <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">Извършваме поддръжка на покриви в цялата Варненска област</p>
              <div className="grid md:grid-cols-3 gap-6 mb-12">
                {serviceAreas.map((area, index) => (
                  <Card key={index} className="border-border">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <MapPin className="w-5 h-5 text-primary" />
                        <h3 className="text-lg font-semibold text-card-foreground">{area.area}</h3>
                      </div>
                      <ul className="space-y-2">
                        {area.neighborhoods.map((n, i) => (
                          <li key={i} className="text-muted-foreground text-sm">{n}</li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="rounded-xl overflow-hidden shadow-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d186237.48652949!2d27.769646!3d43.2140504!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40a4538baaf3f2cd%3A0x5765bc39bc4f4c!2z0JLQsNGA0L3QsCwg0JHRitC70LPQsNGA0LjRjw!5e0!3m2!1sbg!2sbg!4v1702300000000!5m2!1sbg!2sbg"
                  width="100%" height="400" style={{ border: 0 }} allowFullScreen loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade" title="Карта на Варна - район на обслужване"
                />
              </div>
            </div>
          </div>
        </section>

        {/* 14. FAQ */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">Често задавани въпроси</h2>
              <p className="text-muted-foreground text-center mb-12">Отговори на най-честите въпроси за поддръжка на покриви</p>
              <Accordion type="single" collapsible className="space-y-3">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`faq-${index}`} className="bg-card border border-border rounded-xl px-6">
                    <AccordionTrigger className="text-left text-base font-semibold text-card-foreground hover:text-primary hover:no-underline py-5">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-5 text-sm leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* 15. Final CTA */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <Calendar className="w-16 h-16 mx-auto mb-6 opacity-80" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Запази поддръжка за вашия покрив още днес</h2>
            <p className="text-xl text-primary-foreground/90 mb-4 max-w-2xl mx-auto">
              Не чакайте покривът да потече. Изберете пакет и се погрижете за дома си сега.
            </p>
            <p className="text-2xl font-bold mb-8">☎ 088 499 7659</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8">
                <a href="tel:+359884997659">Обадете се</a>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
                <Link to={getPath('contact')}>Изпратете запитване</Link>
              </Button>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-12">
          <LearnMoreLinks links={learnMoreLinks} />
        </div>
        <RelatedServices services={relatedServices} />
      </main>

      <Footer />
      <FloatingCallButton />
    </>
  );
};

export default MaintenancePage;
