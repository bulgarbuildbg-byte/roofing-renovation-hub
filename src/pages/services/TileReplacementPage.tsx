import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCallButton from "@/components/FloatingCallButton";
import CTASection from "@/components/CTASection";
import RelatedServices from "@/components/RelatedServices";
import LearnMoreLinks from "@/components/LearnMoreLinks";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, CheckCircle, Layers, Shield, Ruler, Palette, MapPin, Clock, Wrench, AlertTriangle, Home, Search } from "lucide-react";
import { Link } from "react-router-dom";

// Process images - Ceramic tile replacement
import roofInspection from "@/assets/process/roof-inspection-pro.jpg";
import tileSamples from "@/assets/process/roof-tiles-stack.jpg";
import roofScaffolding from "@/assets/process/roof-frame-work.jpg";
import tileRemoval from "@/assets/process/old-roof-removal.jpg";
import tileInstallation from "@/assets/process/tile-installation-worker.jpg";
import completedTileRoof from "@/assets/portfolio/villa-roof.jpg";

const relatedServices = [
  {
    title: "Ремонт на Покриви",
    description: "Цялостен ремонт на покривната конструкция и покритие.",
    href: "/ремонт-на-покриви"
  },
  {
    title: "Поддръжка на Покриви",
    description: "Редовна профилактика за предотвратяване на повреди.",
    href: "/поддръжка-на-покриви"
  },
  {
    title: "Изграждане на Нов Покрив",
    description: "Пълно изграждане на нов покрив с качествени материали.",
    href: "/изграждане-на-покрив"
  }
];

const learnMoreLinks = [
  { title: "Как да изберем правилните керемиди", href: "/блог/как-да-изберем-керемиди-за-нов-покрив" },
  { title: "5 признака, че покривът се нуждае от ремонт", href: "/блог/5-признака-че-покривът-се-нуждае-от-ремонт" }
];

const TileReplacementPage = () => {
  const services = [
    "Смяна на единични счупени керемиди",
    "Частична подмяна на покривното покритие",
    "Пълна смяна на всички керемиди",
    "Подмяна на ламарина и капаци",
    "Ремонт на билото и ръбовете",
    "Смяна на снегозадържатели",
    "Подмяна на подпокривна мембрана",
    "Монтаж на вентилационни керемиди"
  ];

  const tileTypes = [
    {
      name: "Бетонни керемиди",
      description: "Бетонните керемиди са едни от най-популярните в България благодарение на отличното съотношение цена-качество. Изработват се от смес от пясък, цимент и пигменти, което им придава здравина и устойчивост на атмосферни влияния.",
      brands: ["Bramac", "Creaton", "Benders"],
      lifespan: "30-50 години",
      advantages: ["По-ниска цена от керамичните", "Устойчиви на удар и градушка", "Голямо разнообразие от цветове", "По-тежки - по-добра устойчивост на вятър"],
      price: "от 0.60 €/бр"
    },
    {
      name: "Керамични (глинени) керемиди",
      description: "Керамичните керемиди са традиционният избор за покриви с вековна история. Изработват се от естествена глина, изпечена при високи температури. Предлагат изключителна дълготрайност и естествена красота, която се подобрява с времето.",
      brands: ["Tondach", "Roben", "Wienerberger"],
      lifespan: "80-100+ години",
      advantages: ["Изключително дълъг живот", "Естествен материал - 'диша'", "Не избледняват с времето", "Повишават стойността на имота"],
      price: "от 1.30 €/бр"
    },
    {
      name: "Керемиди тип Марсилски",
      description: "Марсилските керемиди са класическият избор за българските покриви. Характеризират се с характерната S-образна форма, която осигурява отлично оттичане на водата. Произвеждат се както в бетонен, така и в керамичен вариант.",
      brands: ["Bramac", "Tondach", "Creaton"],
      lifespan: "40-80 години",
      advantages: ["Традиционен естетичен вид", "Отлична водоплътност", "Лесен монтаж и подмяна", "Широко достъпни резервни части"],
      price: "от 0.75 €/бр"
    },
    {
      name: "Плоски керемиди (бобровка)",
      description: "Плоските керемиди, известни още като 'бобровки', създават елегантен и изчистен вид на покрива. Характерни са за традиционната българска архитектура и модерните минималистични проекти. Изискват по-голям наклон на покрива.",
      brands: ["Tondach", "Roben", "Creaton"],
      lifespan: "50-100 години",
      advantages: ["Елегантен минималистичен вид", "Подходящи за стръмни покриви", "Лесна подмяна на единични керемиди", "Автентичен български стил"],
      price: "от 0.90 €/бр"
    }
  ];

  const reasons = [
    {
      title: "Механични повреди",
      description: "Градушка, паднали клони, ходене по покрива при ремонтни дейности или монтаж на антени и климатици могат да причинят счупване или напукване на керемидите. Дори малка пукнатина е път за водата.",
      signs: ["Видимо счупени или напукани керемиди", "Отломки от керемиди в улуците", "Течове след буря или градушка"]
    },
    {
      title: "Износване от времето",
      description: "С годините керемидите се износват под въздействието на слънце, дъжд, скреж и температурни промени. Глазурата се изтрива, порите се отварят и керемидите стават по-крехки и водопропускливи.",
      signs: ["Ерозирала повърхност", "Избледняване на цвета", "Развит мъх и лишеи", "Керемиди на 30+ години"]
    },
    {
      title: "Неправилен монтаж",
      description: "Керемидите, монтирани неправилно - с грешно застъпване, без закрепване или върху неподходящи летви - се изместват и счупват много по-бързо. Това е често срещан проблем при по-стари покриви.",
      signs: ["Изместени керемиди", "Видими летви отдолу", "Течове при слаб дъжд"]
    },
    {
      title: "Проблеми с подложката",
      description: "Дори здравите керемиди не могат да защитят покрива, ако подпокривната мембрана или летвите са повредени. Гнила дървесина, скъсана мембрана или неправилен наклон изискват цялостна подмяна.",
      signs: ["Провиснали участъци", "Мокра изолация в тавана", "Миризма на мухъл"]
    }
  ];

  const process = [
    {
      step: 1,
      title: "Оглед и оценка на състоянието",
      description: "Нашият специалист извършва детайлен оглед на покрива - визуална инспекция отвън и отвътре (при достъпен таван). Оценяваме състоянието на керемидите, подпокривната конструкция, летвите и мембраната. Документираме всички проблемни зони с фотоснимки.",
      image: roofInspection,
      imageAlt: "Оглед на покрив за оценка състоянието на керемиди - професионална инспекция Варна"
    },
    {
      step: 2,
      title: "Подбор на подходящи керемиди",
      description: "При частична подмяна се стремим да намерим керемиди, максимално близки до съществуващите по размер, профил и цвят. При пълна подмяна ви консултираме за най-подходящия тип според конструкцията, климата и бюджета. Осигуряваме мостри за сравнение.",
      image: tileSamples,
      imageAlt: "Подбор на керемиди за подмяна - сравнение на видове и цветове"
    },
    {
      step: 3,
      title: "Подготовка на работната зона",
      description: "Осигуряваме безопасен достъп до покрива чрез скеле или стълби. Покриваме градината и околните площи за защита от отпадъци. Организираме системата за спускане на старите керемиди и качване на новите, минимизирайки риска от повреди.",
      image: roofScaffolding,
      imageAlt: "Подготовка за смяна на керемиди - монтаж на скеле и защитни покривала"
    },
    {
      step: 4,
      title: "Демонтаж на старите керемиди",
      description: "Внимателно демонтираме старите керемиди, като избягваме повреди на околните здрави елементи. Проверяваме състоянието на летвите и подпокривната мембрана. При необходимост подменяме повредени летви или участъци от мембраната.",
      image: tileRemoval,
      imageAlt: "Демонтаж на стари керемиди - премахване на повредено покривно покритие"
    },
    {
      step: 5,
      title: "Монтаж на новите керемиди",
      description: "Полагаме новите керемиди, като спазваме правилното застъпване и позициониране според типа. Закрепваме керемидите с куки или винтове на критичните места - ръбове, било, около комини. Обръщаме специално внимание на обшивките и примикванията.",
      image: tileInstallation,
      imageAlt: "Монтаж на нови керемиди - професионално полагане на покривно покритие Варна"
    },
    {
      step: 6,
      title: "Финални проверки и почистване",
      description: "След монтажа извършваме цялостна проверка - визуална и при възможност с вода. Монтираме капаците на билото и ръбовете. Почистваме работната зона от всички отпадъци и отломки. Предоставяме гаранционна карта и препоръки за поддръжка.",
      image: completedTileRoof,
      imageAlt: "Завършена смяна на керемиди - финална проверка и почистване"
    }
  ];

  const benefits = [
    { icon: Palette, title: "Широк Избор", description: "Работим с всички популярни марки и типове керемиди. Помагаме ви да изберете оптималния вариант според стила на дома и бюджета." },
    { icon: Ruler, title: "Прецизен Монтаж", description: "Нашите майстори имат богат опит с керемидени покриви. Спазваме всички технологични изисквания за дълготраен резултат." },
    { icon: Shield, title: "Гаранция до 5 години", description: "Предоставяме писмена гаранция за монтажа. Производителите дават допълнителна гаранция за материалите - до 30 години." },
    { icon: Clock, title: "Бързо Изпълнение", description: "Благодарение на опитния ни екип и добрата организация, подменяме керемиди бързо и качествено, без излишни забавяния." }
  ];

  const priceRanges = [
    { service: "Подмяна на единична керемида", price: "от 4 €/бр", note: "Включва материал и труд" },
    { service: "Частична подмяна (до 20 кв.м)", price: "от 13 €/кв.м", note: "Материали + монтаж" },
    { service: "Пълна подмяна на керемиди", price: "от 18 €/кв.м", note: "Демонтаж, материали, монтаж" },
    { service: "Подмяна с нови летви", price: "от 23 €/кв.м", note: "Включва летви и мембрана" },
    { service: "Ремонт на било и ръбове", price: "от 8 €/м", note: "Капаци и уплътнение" },
    { service: "Монтаж на снегозадържатели", price: "от 13 €/м", note: "Материал и монтаж" }
  ];

  const serviceAreas = [
    { area: "Варна център", neighborhoods: ["Централен район", "Одесос", "Морска градина", "Гръцка махала", "Чаталджа"] },
    { area: "Варна квартали", neighborhoods: ["кв. Бриз", "кв. Чайка", "кв. Левски", "кв. Аспарухово", "кв. Владиславово", "кв. Младост", "кв. Възраждане", "кв. Трошево", "кв. Галата", "кв. Виница"] },
    { area: "Околни селища", neighborhoods: ["Аксаково", "Белослав", "Девня", "Суворово", "Долни чифлик", "Златни пясъци", "Св. Константин", "Каменар", "Тополи"] }
  ];

  const faqs = [
    {
      question: "Кога е необходима смяна на керемидите?",
      answer: "Смяна е необходима при: видимо счупени или напукани керемиди, течове въпреки ремонтите, силно износени керемиди (30+ години), масови повреди след буря или градушка, или при реновация на покрива. При съмнение предлагаме безплатен оглед."
    },
    {
      question: "Може ли да се подменят само част от керемидите?",
      answer: "Да, частичната подмяна е възможна и често е достатъчна при локални повреди. Стремим се да намерим керемиди, максимално близки до съществуващите. При много стари или редки керемиди може да се наложи компромис или пълна подмяна."
    },
    {
      question: "Колко време отнема смяната на керемидите?",
      answer: "Зависи от обема на работа. Подмяна на няколко керемиди отнема 2-4 часа. Частична подмяна на 20-30 кв.м - 1-2 дни. Пълна подмяна на покрив 100-150 кв.м - 4-7 дни. Времето може да се удължи при лошо време."
    },
    {
      question: "Трябва ли да се сменят и летвите при смяна на керемидите?",
      answer: "Не винаги. Ако летвите са здрави и правилно монтирани, могат да се запазят. При пълна подмяна на стар покрив обикновено препоръчваме и нови летви за гарантиран резултат. Оценяваме състоянието при огледа."
    },
    {
      question: "Какъв тип керемиди са най-подходящи за Варна?",
      answer: "Във Варна препоръчваме керемиди, устойчиви на морска влага и соли - качествени бетонни (Bramac) или керамични (Tondach). Важно е керемидите да имат добра UV защита заради силното слънце. Помагаме с избора при огледа."
    },
    {
      question: "Колко струва смяната на керемиди на 100 кв.м покрив?",
      answer: "При пълна подмяна с качествени бетонни керемиди бюджетът е приблизително 1800-2300 € (материали и труд). При керамични керемиди е 2550-3600 €. Цената зависи от сложността на покрива и избраните материали."
    },
    {
      question: "Работите ли през зимата?",
      answer: "Да, при подходящи условия - сухо време и температури над 0°C. Избягваме работа при сняг, лед или силен вятър заради безопасност и качество. При необходимост от спешен ремонт през зимата се обадете и ще оценим възможностите."
    }
  ];

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Смяна на керемиди Варна",
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
    "description": "Професионална смяна на керемиди във Варна - бетонни, керамични, марсилски. Частична или пълна подмяна с гаранция до 5 години.",
    "offers": {
      "@type": "AggregateOffer",
      "lowPrice": "8",
      "highPrice": "45",
      "priceCurrency": "BGN",
      "offerCount": "6"
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
      { "@type": "ListItem", "position": 1, "name": "Начало", "item": "https://www.remontnapokrivivarna.bg" },
      { "@type": "ListItem", "position": 2, "name": "Услуги", "item": "https://www.remontnapokrivivarna.bg/services" },
      { "@type": "ListItem", "position": 3, "name": "Смяна на керемиди", "item": "https://www.remontnapokrivivarna.bg/смяна-керемиди" }
    ]
  };

  return (
    <>
      <Helmet>
        <title>Смяна Керемиди Варна - от 8лв/бр | 5г Гаранция</title>
        <meta name="description" content="Професионална подмяна на керемиди. Бетонни, керамични, марсилски. Бърз монтаж, 5г гаранция. ☎ 088 499 7659" />
        <meta name="keywords" content="смяна керемиди варна, подмяна керемиди варна, керемиди цена варна, ремонт керемиден покрив, счупени керемиди" />
        <link rel="canonical" href="https://www.remontnapokrivivarna.bg/смяна-керемиди" />
        <meta property="og:title" content="Смяна Керемиди Варна - от 8лв/бр" />
        <meta property="og:description" content="Бетонни, керамични, марсилски. Гаранция до 5 години." />
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
              <span>Смяна на керемиди</span>
            </nav>
            
            <div className="max-w-4xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Смяна на Керемиди Варна - Професионална Услуга
              </h1>
              
              <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl">
                Професионална подмяна на счупени, стари или повредени керемиди. 
                Работим с всички видове керемиди - бетонни, керамични, марсилски. 
                Гарантираме качествен монтаж с дълготрайна гаранция.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8">
                  <a href="tel:0884997659">
                    <Phone className="w-5 h-5 mr-2" />
                    Обадете се
                  </a>
                </Button>
                <Button asChild size="lg" className="bg-transparent border-2 border-white text-white hover:bg-white/20">
                  <Link to="/контакти">Безплатна Оферта</Link>
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-accent" />
                  <span>Безплатен оглед</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-accent" />
                  <span>До 5г гаранция</span>
                </div>
                <div className="flex items-center gap-2">
                  <Layers className="w-5 h-5 text-accent" />
                  <span>Всички видове керемиди</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Професионална Смяна на Керемиди във Варна и Региона
              </h2>
              <div className="prose prose-lg text-muted-foreground space-y-4">
                <p>
                  Керемидите са най-разпространеното покривно покритие в България и със сигурност най-естетичното. 
                  Независимо дали имате класически керемиден покрив с марсилски керемиди, модерен с бетонни керемиди 
                  или автентичен с керамични, качеството на покритието е от ключово значение за защитата на дома ви.
                </p>
                <p>
                  С времето керемидите се износват, напукват или счупват под въздействието на атмосферните условия - 
                  силното черноморско слънце, честите бури, градушки и температурните промени. Една единствена повредена 
                  керемида може да стане причина за теч, който да доведе до сериозни щети на покривната конструкция и 
                  интериора на дома.
                </p>
                <p>
                  Нашият екип предлага професионална смяна на керемиди - от единични повредени до пълна подмяна на 
                  покривното покритие. Работим с всички популярни марки и типове керемиди, като помагаме на клиентите 
                  да изберат оптималния вариант. Гарантираме прецизен монтаж според технологичните изисквания на 
                  производителите и предоставяме писмена гаранция за извършената работа.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Tile Types */}
        <section className="py-16 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Видове Керемиди, с Които Работим
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Предлагаме подмяна с всички популярни типове керемиди от водещи производители
              </p>
            </div>
            
            <div className="space-y-8">
              {tileTypes.map((tile, index) => (
                <Card key={index} className="bg-background overflow-hidden">
                  <CardContent className="p-6">
                    <div className="grid lg:grid-cols-3 gap-6">
                      <div className="lg:col-span-2">
                        <h3 className="text-xl font-semibold text-foreground mb-3 flex items-center gap-3">
                          <Layers className="w-6 h-6 text-primary" />
                          {tile.name}
                        </h3>
                        <p className="text-muted-foreground mb-4">{tile.description}</p>
                        
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-medium text-foreground mb-2">Предимства:</h4>
                            <ul className="space-y-1">
                              {tile.advantages.map((adv, idx) => (
                                <li key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                                  <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                                  {adv}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-medium text-foreground mb-2">Марки:</h4>
                            <p className="text-sm text-muted-foreground">{tile.brands.join(", ")}</p>
                            
                            <h4 className="font-medium text-foreground mb-2 mt-4">Живот:</h4>
                            <p className="text-sm text-muted-foreground">{tile.lifespan}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-center lg:border-l lg:border-border lg:pl-6">
                        <div className="text-center">
                          <span className="text-3xl font-bold text-primary">{tile.price}</span>
                          <p className="text-muted-foreground text-sm mt-1">ориентировъчна цена</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Reasons for Replacement */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Кога е Необходима Смяна на Керемиди?
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Разпознайте признаците, че вашият покрив се нуждае от подмяна на керемиди
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {reasons.map((reason, index) => (
                <Card key={index} className="bg-secondary">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-foreground mb-3 flex items-center gap-3">
                      <AlertTriangle className="w-6 h-6 text-accent" />
                      {reason.title}
                    </h3>
                    <p className="text-muted-foreground mb-4">{reason.description}</p>
                    <div>
                      <h4 className="font-medium text-foreground mb-2">Признаци:</h4>
                      <ul className="space-y-1">
                        {reason.signs.map((sign, idx) => (
                          <li key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                            <Search className="w-4 h-4 text-primary" />
                            {sign}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-16 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Процес на Смяна на Керемиди
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Професионален подход стъпка по стъпка за качествен резултат
              </p>
            </div>
            
            <div className="space-y-12">
              {process.map((item, index) => (
                <div key={index} className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 items-center`}>
                  <div className="lg:w-1/2">
                    <img 
                      src={item.image} 
                      alt={item.imageAlt}
                      className="rounded-lg shadow-lg w-full h-64 object-cover"
                    />
                  </div>
                  <div className="lg:w-1/2">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold">
                        {item.step}
                      </div>
                      <h3 className="text-xl font-semibold text-foreground">{item.title}</h3>
                    </div>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
              Услуги за Смяна на Керемиди
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

        {/* Benefits */}
        <section className="py-16 bg-secondary">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
              Защо Да Изберете Нас
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {benefits.map((benefit, index) => (
                <Card key={index} className="bg-background">
                  <CardContent className="p-6 text-center">
                    <benefit.icon className="w-14 h-14 text-primary mx-auto mb-4" />
                    <h3 className="font-semibold text-foreground mb-2">{benefit.title}</h3>
                    <p className="text-muted-foreground text-sm">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Цени за Смяна на Керемиди
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Прозрачно ценообразуване. Точната цена се определя след безплатен оглед.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <div className="bg-secondary rounded-lg overflow-hidden">
                {priceRanges.map((item, index) => (
                  <div key={index} className={`flex flex-col md:flex-row md:items-center justify-between p-4 ${index !== priceRanges.length - 1 ? 'border-b border-border' : ''}`}>
                    <div className="mb-2 md:mb-0">
                      <span className="font-semibold text-foreground">{item.service}</span>
                      <span className="text-muted-foreground text-sm block md:inline md:ml-2">({item.note})</span>
                    </div>
                    <span className="text-primary font-bold text-lg">{item.price}</span>
                  </div>
                ))}
              </div>
              <p className="text-center text-muted-foreground mt-4 text-sm">
                * Цените са ориентировъчни и могат да варират в зависимост от типа керемиди и сложността на покрива
              </p>
            </div>
          </div>
        </section>

        {/* Service Areas */}
        <section className="py-16 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Райони, Които Обслужваме
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Извършваме смяна на керемиди в цяла Варна и околните населени места
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12">
              {serviceAreas.map((area, index) => (
                <div key={index}>
                  <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-primary" />
                    {area.area}
                  </h3>
                  <ul className="space-y-2">
                    {area.neighborhoods.map((neighborhood, idx) => (
                      <li key={idx} className="text-muted-foreground text-sm flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-primary" />
                        {neighborhood}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            
            <div className="max-w-4xl mx-auto">
              <div className="rounded-lg overflow-hidden shadow-lg">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d93422.83869498367!2d27.8261!3d43.2141!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40a4538baaf3f891%3A0x5765ae67f35e9f47!2z0JLQsNGA0L3QsA!5e0!3m2!1sbg!2sbg!4v1699524000000!5m2!1sbg!2sbg"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Карта на Варна - райони за смяна на керемиди"
                />
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Често Задавани Въпроси за Смяна на Керемиди
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Отговори на най-честите въпроси относно подмяната на керемиди
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-secondary rounded-lg p-6">
                  <h3 className="font-semibold text-foreground mb-3 text-lg">{faq.question}</h3>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <CTASection 
          title="Нуждаете се от Смяна на Керемиди?"
          subtitle="Получете безплатен оглед и честна оферта без задължение"
        />
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

export default TileReplacementPage;
