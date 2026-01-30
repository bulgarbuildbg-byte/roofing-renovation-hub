import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCallButton from "@/components/FloatingCallButton";
import RelatedServices from "@/components/RelatedServices";
import LearnMoreLinks from "@/components/LearnMoreLinks";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { CheckCircle, Wrench, Shield, Clock, Phone, MapPin, AlertTriangle, Search, Hammer, ClipboardCheck } from "lucide-react";

// Process images - Ceramic tile roof repair
import roofInspection from "@/assets/process/roof-measuring.jpg";
import roofAssessment from "@/assets/process/cost-calculation.jpg";
import roofScaffolding from "@/assets/process/roof-frame-work.jpg";
import tileRemoval from "@/assets/process/old-roof-removal.jpg";
import tileInstallation from "@/assets/process/tile-roof-construction.jpg";
import completedTileRoof from "@/assets/portfolio/residential-tile-roof.jpg";

const relatedServices = [
  {
    title: "Ремонт на Течове",
    description: "Спешно отстраняване на течове с гаранция. Диагностика с термокамера.",
    href: "/ремонт-течове"
  },
  {
    title: "Смяна на Керемиди",
    description: "Подмяна на счупени или износени керемиди с качествени материали.",
    href: "/смяна-на-керемиди"
  },
  {
    title: "Поддръжка на Покриви",
    description: "Редовна профилактика за удължаване живота на покрива.",
    href: "/поддръжка-на-покриви"
  }
];

const learnMoreLinks = [
  { title: "5 признака, че покривът се нуждае от ремонт", href: "/блог/5-признака-че-покривът-се-нуждае-от-ремонт" },
  { title: "Най-честите грешки при покривни ремонти", href: "/блог/най-честите-грешки-при-покривни-ремонти" }
];

const RoofRepairPage = () => {
  const services = [
    "Подмяна на счупени или липсващи керемиди",
    "Ремонт на течове и пукнатини",
    "Поправка на повредени комини",
    "Ремонт на ламаринени покриви",
    "Подмяна на обшивки и капаци",
    "Ремонт след буря или градушка",
    "Аварийни ремонти 24/7"
  ];

  const benefits = [
    { icon: Shield, title: "5 години гаранция", description: "За всички извършени ремонти" },
    { icon: Wrench, title: "Качествени материали", description: "Използваме само доказани марки" },
    { icon: Clock, title: "Бърза реакция", description: "Оглед до 24 часа" },
  ];

  const priceRanges = [
    { service: "Ремонт на течове", price: "от 40 €" },
    { service: "Подмяна на керемиди", price: "от 4 €/бр" },
    { service: "Ремонт на комин", price: "от 100 €" },
    { service: "Частичен ремонт на покрив", price: "от 13 €/кв.м" },
    { service: "Цялостен ремонт", price: "от 28 €/кв.м" },
  ];

  const commonProblems = [
    {
      title: "Липсващи или счупени керемиди",
      description: "Една от най-честите причини за течове е повредена или липсваща керемида. Силните ветрове, градушки и естественото износване могат да причинят счупване или изместване на керемидите. При липса на керемида, водата прониква директно в подпокривното пространство, причинявайки щети на дървената конструкция и изолацията."
    },
    {
      title: "Течове около комини и вентилации",
      description: "Обшивките около комини, вентилационни тръби и капандури са критични точки, където най-често възникват течове. С времето уплътненията се втвърдяват и пукат, позволявайки на водата да прониква в сградата. Правилната хидроизолация и подмяна на обшивки е от съществено значение."
    },
    {
      title: "Повреди от буря и градушка",
      description: "Екстремните метеорологични условия могат да причинят сериозни щети на покрива за кратко време. Градушката може да счупи керемиди, да повреди ламарина и да наруши хидроизолацията. След всяка силна буря препоръчваме професионален оглед."
    },
    {
      title: "Износена хидроизолация",
      description: "Хидроизолационният слой има ограничен живот, обикновено между 15-25 години в зависимост от качеството и условията. Когато започне да се разпада, течовете стават неизбежни. Навременната подмяна спестява значителни разходи за по-сериозни ремонти."
    },
    {
      title: "Запушени улуци и водостоци",
      description: "Когато улуците са запушени с листа и отломки, водата преливоточно и може да проникне под покривното покритие. Редовното почистване на улуците е важна превантивна мярка за защита на покрива."
    }
  ];

  const repairProcess = [
    {
      step: 1,
      title: "Първоначална инспекция и диагностика",
      description: "Нашият експерт извършва подробен оглед на покрива, като използва професионално оборудване за откриване на течове и скрити повреди. Инспектираме както външната повърхност, така и подпокривното пространство. Правим снимки и документираме всички проблемни зони.",
      image: roofInspection,
      imageAlt: "Професионална диагностика на покрив във Варна - специалист инспектира керемиди за течове и повреди"
    },
    {
      step: 2,
      title: "Оценка на щетите и изготвяне на оферта",
      description: "След инспекцията изготвяме подробен доклад за състоянието на покрива и необходимите ремонтни дейности. Предоставяме прозрачна оферта с фиксирани цени, без скрити разходи. Обсъждаме различните варианти и препоръчваме оптималното решение за вашия бюджет.",
      image: roofAssessment,
      imageAlt: "Изготвяне на оферта за ремонт на покрив - подробна калкулация на цени и материали"
    },
    {
      step: 3,
      title: "Подготовка на работната зона",
      description: "Преди започване на ремонта осигуряваме безопасен достъп до покрива чрез професионални скелета или подемна техника. Покриваме градината и околните площи за защита от отпадъци. Организираме логистиката за доставка на материали.",
      image: roofScaffolding,
      imageAlt: "Подготовка за ремонт на покрив Варна - монтаж на скеле и защитни покривала"
    },
    {
      step: 4,
      title: "Премахване на повредени материали",
      description: "Внимателно премахваме повредените керемиди, износената хидроизолация или други компрометирани елементи. Разкриваме подлежащата конструкция за проверка на дървените греди за гниене или повреди от влага. При необходимост третираме дървесината с антисептик.",
      image: tileRemoval,
      imageAlt: "Демонтаж на повредени керемиди при ремонт на покрив - професионално премахване на стари материали"
    },
    {
      step: 5,
      title: "Монтаж на нови материали",
      description: "Полагаме нова подпокривна мембрана или хидроизолация според нуждите. Монтираме нови керемиди, като се уверяваме в правилното им позициониране и закрепване. При работа с ламаринени покриви използваме качествени винтове с уплътнение против течове.",
      image: tileInstallation,
      imageAlt: "Монтаж на нови керемиди при ремонт на покрив Варна - професионално полагане на покривни материали"
    },
    {
      step: 6,
      title: "Финална инспекция и почистване",
      description: "След завършване на ремонта извършваме цялостна проверка на качеството. Тестваме водонепропускливостта при възможност. Почистваме работната зона от всички отпадъци и материали. Предоставяме гаранционна карта и препоръки за поддръжка.",
      image: completedTileRoof,
      imageAlt: "Завършен ремонт на покрив - финална инспекция и почистване на работната площадка"
    }
  ];

  const materials = [
    {
      title: "Керемиди - бетонни и керамични",
      description: "Използваме керемиди от водещи европейски производители като Bramac, Tondach и Creaton. Бетонните керемиди са по-икономични и издръжливи на удар, докато керамичните предлагат по-дълъг живот и по-добра естетика. Подбираме цвета и модела според съществуващото покритие за перфектно съвпадение."
    },
    {
      title: "Подпокривни мембрани",
      description: "Работим с висококачествени дифузионни мембрани от Dorken Delta, Bramac и Jutadach. Те осигуряват надеждна защита от влага, като същевременно позволяват на конструкцията да 'диша'. Правилният избор на мембрана е критичен за дълготрайността на ремонта."
    },
    {
      title: "Уплътнители и лепила",
      description: "За уплътняване около комини и детайли използваме професионални продукти като Sika, Henkel Ceresit и Bostik. Тези материали са устойчиви на UV лъчение, температурни промени и осигуряват дълготрайна еластичност."
    },
    {
      title: "Ламаринени елементи",
      description: "При ремонт на ламаринени покриви и обшивки работим с поцинкована стомана с полимерно покритие. Използваме материали с дебелина минимум 0.5мм и гаранция против корозия минимум 25 години."
    }
  ];

  const serviceAreas = [
    { area: "Варна център", neighborhoods: ["Централен район", "Одесос", "Морска градина"] },
    { area: "Варна квартали", neighborhoods: ["кв. Бриз", "кв. Чайка", "кв. Левски", "кв. Аспарухово", "кв. Владиславово", "кв. Младост", "кв. Възраждане", "кв. Трошево"] },
    { area: "Околни селища", neighborhoods: ["Аксаково", "Белослав", "Девня", "Златни пясъци", "Св. Константин", "Виница", "Галата"] }
  ];

  const faqs = [
    {
      question: "Колко време отнема ремонтът на покрив?",
      answer: "Продължителността зависи от обема на работата. Малък ремонт (подмяна на няколко керемиди) може да се извърши за 1-2 часа. Цялостен ремонт на покрив от 100 кв.м отнема обикновено 3-5 работни дни."
    },
    {
      question: "Работите ли през зимата?",
      answer: "Да, извършваме аварийни ремонти целогодишно. При планови ремонти обаче препоръчваме работа при температури над 5°C за оптимални резултати, особено при полагане на хидроизолация."
    },
    {
      question: "Какво включва гаранцията?",
      answer: "Нашата 5-годишна гаранция покрива всички дефекти, възникнали в резултат на некачествена работа или материали. При констатиране на проблем, отстраняваме го безплатно в рамките на гаранционния срок."
    },
    {
      question: "Предлагате ли безплатен оглед?",
      answer: "Да, първоначалният оглед е напълно безплатен за клиенти от Варна и околностите. След огледа получавате подробна оферта без задължение."
    },
    {
      question: "Колко струва ремонтът на течащ покрив?",
      answer: "Цената зависи от причината за теча и обема на повредата. Минималната цена за отстраняване на теч е 40 €. След безплатен оглед ще ви дадем точна оферта."
    }
  ];

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Ремонт на покриви Варна",
    "provider": {
      "@type": "RoofingContractor",
      "name": "RemontNaPokriviVarna",
      "telephone": "+359884997659",
      "email": "remontnapokrivivarna@abv.bg",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "ул. Уста Колю Фичето 25 А",
        "addressLocality": "Варна",
        "addressCountry": "BG"
      }
    },
    "areaServed": [
      { "@type": "City", "name": "Варна" },
      { "@type": "Place", "name": "Аксаково" },
      { "@type": "Place", "name": "Златни пясъци" },
      { "@type": "Place", "name": "Белослав" },
      { "@type": "Place", "name": "Девня" }
    ],
    "description": "Професионален ремонт на покриви във Варна - течове, керемиди, комини. 5 години гаранция.",
    "offers": {
      "@type": "AggregateOffer",
      "lowPrice": "4",
      "highPrice": "28",
      "priceCurrency": "EUR",
      "offerCount": "5"
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Начало", "item": "https://remontnapokrivivarna.com" },
      { "@type": "ListItem", "position": 2, "name": "Услуги", "item": "https://remontnapokrivivarna.com/услуги" },
      { "@type": "ListItem", "position": 3, "name": "Ремонт на покриви", "item": "https://remontnapokrivivarna.com/ремонт-на-покриви" }
    ]
  };

  return (
    <>
      <Helmet>
        <title>Ремонт на Покриви Варна - от 13 €/кв.м | 5г</title>
        <meta name="description" content="Професионален ремонт на покриви. Отстраняване на течове, подмяна на керемиди, 5г гаранция. Безплатен оглед 24ч. ☎ 088 499 7659" />
        <meta name="keywords" content="ремонт на покриви варна, ремонт покрив цена варна, течове покрив варна, подмяна керемиди варна, аварийни ремонти покриви" />
        <link rel="canonical" href="https://remontnapokrivivarna.com/ремонт-на-покриви" />
        <meta property="og:title" content="Ремонт на Покриви Варна - от 13 €/кв.м" />
        <meta property="og:description" content="Професионален ремонт. Течове, керемиди, комини. 5г гаранция." />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="bg_BG" />
        <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative bg-primary text-primary-foreground py-16 md:py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary/80" />
          <div className="container mx-auto px-4 relative z-10">
            <nav className="text-sm mb-6 text-primary-foreground/70">
              <Link to="/" className="hover:text-primary-foreground">Начало</Link>
              <span className="mx-2">/</span>
              <Link to="/услуги" className="hover:text-primary-foreground">Услуги</Link>
              <span className="mx-2">/</span>
              <span className="text-primary-foreground">Ремонт на покриви</span>
            </nav>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-center">
              Ремонт на Покриви Варна - Професионална Услуга
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-4xl mx-auto text-center mb-8">
              Професионален ремонт на всички видове покриви с 5 години гаранция. Отстраняваме течове, подменяме керемиди, ремонтираме комини и обшивки.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8">
                <a href="tel:+359892701176">
                  <Phone className="w-5 h-5 mr-2" />
                  Обадете се: 089 270 1176
                </a>
              </Button>
              <Button asChild size="lg" className="bg-transparent border-2 border-white text-white hover:bg-white/20">
                <Link to="/контакти">Безплатен оглед</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Hero Image */}
        <section className="relative h-[400px] md:h-[500px]">
          <img 
            src={roofInspection} 
            alt="Професионален ремонт на керемиден покрив във Варна - майстор подменя повредени керемиди"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
          <div className="absolute bottom-8 left-0 right-0 text-center">
            <p className="text-foreground text-lg font-medium">Над 15 години опит в ремонта на покриви във Варна и региона</p>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto prose prose-lg">
              <h2 className="text-3xl font-bold text-foreground mb-6">Защо да изберете нашите услуги за ремонт на покриви?</h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                Покривът е първата линия на защита на вашия дом или бизнес от атмосферните условия. Във Варна, където морският климат създава специфични предизвикателства - силни ветрове, висока влажност и солени аерозоли - редовната поддръжка и навременният ремонт на покрива са от критично значение.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                <strong className="text-foreground">RemontNaPokriviVarna</strong> е вашият надежден партньор за всички покривни услуги във Варна и региона. С над 15 години опит, ние предлагаме професионални решения за керемидени, ламаринени и плоски покриви. Нашият екип от квалифицирани майстори използва само качествени материали от доказани производители.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Независимо дали имате спешен теч, планирате превантивен ремонт или се нуждаете от цялостна реконструкция на покрива, ние можем да помогнем. Предлагаме безплатен оглед и консултация, прозрачни цени без скрити разходи и 5 години гаранция за всички извършени дейности.
              </p>
            </div>
          </div>
        </section>

        {/* Common Problems */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">Видове покривни проблеми</h2>
              <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
                Познаването на типичните проблеми с покривите ви помага да ги откриете навреме и да предотвратите по-сериозни щети
              </p>
              <div className="space-y-8">
                {commonProblems.map((problem, index) => (
                  <div key={index} className="bg-card rounded-xl p-6 shadow-sm border border-border">
                    <div className="flex items-start gap-4">
                      <AlertTriangle className="w-8 h-8 text-accent flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="text-xl font-semibold text-card-foreground mb-2">{problem.title}</h3>
                        <p className="text-muted-foreground leading-relaxed">{problem.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Step-by-Step Process */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">
                Процес на ремонт на покриви - Стъпка по стъпка
              </h2>
              <p className="text-muted-foreground text-center mb-12 max-w-3xl mx-auto">
                Нашият систематичен подход гарантира качествен резултат и пълна прозрачност на всеки етап от ремонта
              </p>
              <div className="space-y-12">
                {repairProcess.map((step, index) => (
                  <div key={index} className={`flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 items-center`}>
                    <div className="w-full md:w-1/2">
                      <img 
                        src={step.image} 
                        alt={step.imageAlt}
                        className="w-full h-64 md:h-80 object-cover rounded-xl shadow-lg"
                      />
                    </div>
                    <div className="w-full md:w-1/2">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl">
                          {step.step}
                        </div>
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

        {/* Services List */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Какво включва услугата за ремонт на покриви?</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {services.map((service, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 rounded-lg bg-card border border-border">
                    <CheckCircle className="w-6 h-6 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-card-foreground">{service}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Materials Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">
                Материали за ремонт на покриви
              </h2>
              <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
                Качеството на материалите е ключово за дълготрайността на ремонта. Работим само с доказани марки.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                {materials.map((material, index) => (
                  <Card key={index} className="border-border">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <Hammer className="w-8 h-8 text-primary flex-shrink-0" />
                        <div>
                          <h3 className="text-xl font-semibold text-card-foreground mb-2">{material.title}</h3>
                          <p className="text-muted-foreground">{material.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-foreground text-center mb-12">Защо да изберете нас?</h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {benefits.map((benefit, index) => (
                <Card key={index} className="border-border bg-card">
                  <CardContent className="p-6 text-center">
                    <benefit.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-card-foreground mb-2">{benefit.title}</h3>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold text-foreground text-center mb-4">Ориентировъчни цени за ремонт на покриви</h2>
              <p className="text-muted-foreground text-center mb-8">Цените са ориентировъчни и могат да варират в зависимост от сложността на работата</p>
              <div className="space-y-4">
                {priceRanges.map((item, index) => (
                  <div key={index} className="flex justify-between items-center p-4 rounded-lg bg-muted/30 border border-border">
                    <span className="text-foreground font-medium">{item.service}</span>
                    <span className="text-primary font-bold text-lg">{item.price}</span>
                  </div>
                ))}
              </div>
              <p className="text-muted-foreground text-center mt-6">
                * Точната цена се определя след безплатен оглед на място
              </p>
            </div>
          </div>
        </section>

        {/* Service Areas */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">
                Район на обслужване - Варна и околностите
              </h2>
              <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
                Извършваме ремонт на покриви в целия град Варна и населените места в радиус от 50 км
              </p>
              <div className="grid md:grid-cols-3 gap-6 mb-12">
                {serviceAreas.map((area, index) => (
                  <Card key={index} className="border-border">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <MapPin className="w-5 h-5 text-primary" />
                        <h3 className="text-lg font-semibold text-card-foreground">{area.area}</h3>
                      </div>
                      <ul className="space-y-2">
                        {area.neighborhoods.map((neighborhood, i) => (
                          <li key={i} className="text-muted-foreground text-sm">{neighborhood}</li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
              {/* Google Map Embed */}
              <div className="rounded-xl overflow-hidden shadow-lg">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d186237.48652949!2d27.769646!3d43.2140504!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40a4538baaf3f2cd%3A0x5765bc39bc4f4c!2z0JLQsNGA0L3QsCwg0JHRitC70LPQsNGA0LjRjw!5e0!3m2!1sbg!2sbg!4v1702300000000!5m2!1sbg!2sbg"
                  width="100%" 
                  height="400" 
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Карта на Варна - район на обслужване за ремонт на покриви"
                />
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">
                Често задавани въпроси за ремонт на покриви
              </h2>
              <p className="text-muted-foreground text-center mb-12">
                Отговори на най-честите въпроси от нашите клиенти
              </p>
              <div className="space-y-6">
                {faqs.map((faq, index) => (
                  <div key={index} className="bg-card rounded-lg p-6 border border-border">
                    <h3 className="text-lg font-semibold text-card-foreground mb-3 flex items-start gap-2">
                      <Search className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                      {faq.question}
                    </h3>
                    <p className="text-muted-foreground pl-7">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Имате нужда от ремонт на покрив?</h2>
            <p className="text-xl text-primary-foreground/90 mb-4 max-w-2xl mx-auto">
              Не чакайте малкият проблем да стане голям. Обадете се още днес за безплатна консултация и оглед на място.
            </p>
            <p className="text-2xl font-bold mb-8">
              ☎ 088 499 7659
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8">
                <a href="tel:+359884997659">Обадете се сега</a>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
                <Link to="/контакти">Изпратете запитване</Link>
              </Button>
            </div>
          </div>
        </section>
        {/* Learn More Links */}
        <div className="container mx-auto px-4 py-12">
          <LearnMoreLinks links={learnMoreLinks} />
        </div>

        {/* Related Services */}
        <RelatedServices services={relatedServices} />
      </main>

      <Footer />
      <FloatingCallButton />
    </>
  );
};

export default RoofRepairPage;