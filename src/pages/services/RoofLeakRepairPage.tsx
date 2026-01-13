import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCallButton from "@/components/FloatingCallButton";
import CTASection from "@/components/CTASection";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, CheckCircle, AlertTriangle, Droplets, Clock, Shield, Wrench, MapPin, Search, ThermometerSun, Home, Hammer } from "lucide-react";
import { Link } from "react-router-dom";

const RoofLeakRepairPage = () => {
  const services = [
    "Спешен ремонт на течове 24/7",
    "Диагностика с термокамера",
    "Локализиране на скрити течове",
    "Ремонт на течове около комини",
    "Ремонт на течове при капандури",
    "Течове при водосточни елементи",
    "Временна аварийна защита",
    "Траен ремонт с гаранция"
  ];

  const signs = [
    {
      title: "Петна по тавана или стените",
      description: "Кафеникави или жълтеникави петна по тавана са класически признак за проникване на вода. Петната могат да се появят далеч от самия теч, тъй като водата тече по наклона на конструкцията."
    },
    {
      title: "Капеща вода при дъжд",
      description: "Ако виждате или чувате капеща вода по време на дъжд, течът вече е сериозен. Колкото по-бързо реагирате, толкова по-малки ще са щетите по конструкцията и обзавеждането."
    },
    {
      title: "Влага и мухъл в тавана",
      description: "Постоянната влажност създава идеални условия за развитие на мухъл. Освен че е вреден за здравето, мухълът показва хроничен проблем с влагата, който изисква професионална намеса."
    },
    {
      title: "Подути или напукани мазилки",
      description: "Когато водата прониква в стените, мазилката започва да се подува и напуква. Това е сигурен знак, че течът съществува от известно време и е причинил вътрешни повреди."
    },
    {
      title: "Мокри петна около комини",
      description: "Комините са една от най-честите причини за течове. Остарелите обшивки и уплътнения позволяват на водата да прониква между комина и покривното покритие."
    },
    {
      title: "Вода в таванското помещение",
      description: "Ако имате достъп до тавана, проверете за признаци на влага - мокра изолация, петна по гредите, капки вода или локви. Често проблемът може да се открие преди да стане видим отдолу."
    }
  ];

  const causes = [
    {
      title: "Повредени или липсващи керемиди",
      description: "Счупени, напукани или изместени керемиди са директен път за водата. Една единствена повредена керемида може да причини сериозен теч, особено при проливен дъжд или топящ се сняг. Причините включват възраст, градушка, паднали клони или некачествен монтаж.",
      solution: "Подменяме повредените керемиди с нови, като осигуряваме правилното им позициониране и закрепване. При масови повреди може да се наложи частична или пълна подмяна на покривното покритие."
    },
    {
      title: "Компрометирана хидроизолация",
      description: "Хидроизолацията има ограничен живот - обикновено 15-25 години. С времето тя се напуква, става крехка и губи еластичността си. UV лъчите, температурните промени и механичните натоварвания ускоряват износването.",
      solution: "При локални повреди можем да направим точков ремонт с течна хидроизолация или кръпки. При сериозно износване препоръчваме пълна подмяна на хидроизолационния слой."
    },
    {
      title: "Проблеми с обшивки и примиквания",
      description: "Обшивките около комини, вентилации, антени и капандури са критични точки. С времето уплътненията се втвърдяват, металът корозира, а силиконът губи еластичността си, създавайки пътища за водата.",
      solution: "Демонтираме старите обшивки, почистваме и подготвяме повърхностите, след което монтираме нови обшивки от качествена ламарина с надеждно уплътнение."
    },
    {
      title: "Запушени улуци и водостоци",
      description: "Когато улуците са запушени с листа, мъх или отломки, водата прелива и може да проникне под покривното покритие. Запушените водосточни тръби също причиняват преливане и щети по фасадата.",
      solution: "Почистваме улуците и водостоците, проверяваме наклона за правилно оттичане и при необходимост монтираме предпазни мрежи против запушване."
    },
    {
      title: "Ледени язове през зимата",
      description: "Когато топлината от дома топи снега на покрива, водата тече надолу и замръзва при студения ръб, образувайки ледени язове. Задържаната зад тях вода може да проникне под керемидите.",
      solution: "Подобряваме топлоизолацията и вентилацията на тавана, за да предотвратим топенето на снега. При необходимост монтираме нагревателни кабели по ръба на покрива."
    },
    {
      title: "Кондензация в подпокривното пространство",
      description: "При недостатъчна вентилация топлият влажен въздух от дома кондензира в студеното подпокривно пространство. С времето това причинява влага, мухъл и повреди на дървената конструкция.",
      solution: "Осигуряваме правилна вентилация чрез монтаж на вентилационни елементи на покрива. Проверяваме и подобряваме пароизолацията от вътрешната страна."
    }
  ];

  const process = [
    {
      step: 1,
      title: "Спешен оглед и диагностика",
      description: "При обаждане за теч реагираме възможно най-бързо - обикновено в рамките на часове. Нашият специалист извършва първоначална оценка на ситуацията, определя сериозността на течa и необходимостта от незабавни мерки. Използваме термокамера за локализиране на скрити течове без разрушителни методи.",
      image: "https://images.unsplash.com/photo-1632759145351-1d592919f522?w=800&q=80",
      imageAlt: "Спешен оглед на покрив за откриване на теч - професионална диагностика Варна"
    },
    {
      step: 2,
      title: "Временна защита (при нужда)",
      description: "Ако времето не позволява незабавен ремонт или течът изисква по-мащабна интервенция, поставяме временна защита. Това може да включва водоустойчиво покривало, временна хидроизолация или друга мярка, която да предпази сградата до окончателния ремонт.",
      image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
      imageAlt: "Временна защита на покрив от теч - аварийни мерки за спиране на водата"
    },
    {
      step: 3,
      title: "Подробна инспекция и оферта",
      description: "След овладяване на непосредствената ситуация правим детайлен оглед за определяне на пълния обхват на проблема. Идентифицираме всички причини за теча и изготвяме подробна оферта с ясни цени. Обясняваме различните варианти и препоръчваме оптималното решение.",
      image: "https://images.unsplash.com/photo-454165804606-c3d57bc86b40?w=800&q=80",
      imageAlt: "Изготвяне на оферта за ремонт на теч - подробна калкулация и консултация"
    },
    {
      step: 4,
      title: "Отстраняване на причината",
      description: "Пристъпваме към същинския ремонт - подмяна на повредени керемиди, полагане на нова хидроизолация, подмяна на обшивки, ремонт на примиквания. Използваме само качествени материали от доказани производители. Работим прецизно, за да гарантираме дълготраен резултат.",
      image: "https://images.unsplash.com/photo-635424710928-0544e8512eae?w=800&q=80",
      imageAlt: "Ремонт на течащ покрив - подмяна на повредени материали и хидроизолация Варна"
    },
    {
      step: 5,
      title: "Тестване и финализиране",
      description: "След ремонта извършваме тестване на водонепропускливостта - при възможност с вода или изчакваме следващия дъжд. Почистваме работната зона и извеждаме всички отпадъци. Документираме извършената работа с фотоснимки.",
      image: "https://images.unsplash.com/photo-558618666-fcd25c85cd64?w=800&q=80",
      imageAlt: "Тестване на покрив след ремонт на теч - проверка на водонепропускливост"
    },
    {
      step: 6,
      title: "Гаранция и препоръки",
      description: "Предоставяме писмена гаранция за извършения ремонт - до 5 години в зависимост от типа работа. Даваме препоръки за поддръжка на покрива, за да предотвратите бъдещи проблеми. При желание можем да ви включим в програмата ни за годишна профилактика.",
      image: "https://images.unsplash.com/photo-600585154340-be6161a56a0c?w=800&q=80",
      imageAlt: "Предоставяне на гаранция за ремонт на покрив - документация и препоръки"
    }
  ];

  const benefits = [
    { icon: Clock, title: "Бърза реакция 24/7", description: "Разбираме спешността при течове. Нашият екип реагира в рамките на часове, дори през почивните дни. При аварийни ситуации сме на линия денонощно." },
    { icon: Search, title: "Точна диагностика", description: "Използваме съвременни методи за локализиране на течове, включително термокамера. Откриваме истинската причина, а не само симптомите, за да гарантираме траен ремонт." },
    { icon: Wrench, title: "Професионален ремонт", description: "Нашите майстори имат богат опит с всички видове покриви и течове. Използваме качествени материали и доказани технологии за надежден резултат." },
    { icon: Shield, title: "Писмена гаранция", description: "Предоставяме до 5 години гаранция за извършения ремонт. Ако проблемът се повтори в гаранционния срок, го отстраняваме безплатно." }
  ];

  const priceRanges = [
    { service: "Локализиране и диагностика на теч", price: "от 25 €", note: "Безплатно при последващ ремонт" },
    { service: "Ремонт на точков теч (керемида)", price: "от 40 €", note: "Включва материали и труд" },
    { service: "Ремонт на теч около комин", price: "от 75 €", note: "В зависимост от размера" },
    { service: "Подмяна на обшивка/примикване", price: "от 13 €/м", note: "Материал и монтаж" },
    { service: "Ремонт на хидроизолация (кръпка)", price: "от 18 €/кв.м", note: "При локални повреди" },
    { service: "Временна защита при аварии", price: "от 50 €", note: "В зависимост от площта" }
  ];

  const serviceAreas = [
    { area: "Варна център", neighborhoods: ["Централен район", "Одесос", "Морска градина", "Гръцка махала", "Чаталджа"] },
    { area: "Варна квартали", neighborhoods: ["кв. Бриз", "кв. Чайка", "кв. Левски", "кв. Аспарухово", "кв. Владиславово", "кв. Младост", "кв. Възраждане", "кв. Трошево", "кв. Галата", "кв. Виница"] },
    { area: "Околни селища", neighborhoods: ["Аксаково", "Белослав", "Девня", "Суворово", "Долни чифлик", "Златни пясъци", "Св. Константин", "Каменар", "Тополи"] }
  ];

  const faqs = [
    {
      question: "Колко бързо можете да дойдете при спешен теч?",
      answer: "При аварийни течове се стараем да реагираме в рамките на 2-4 часа за Варна и близките квартали. За по-отдалечени населени места времето може да е малко по-дълго. Обадете се и ще ви дадем реалистична оценка."
    },
    {
      question: "Можете ли да откриете теч, който не е видим?",
      answer: "Да, разполагаме с термокамера, която открива скритите течове чрез разликата в температурата на мократа и сухата повърхност. Този метод е неразрушителен и много точен за локализиране на течове в покриви, стени и подове."
    },
    {
      question: "Ремонтирате ли течове през зимата?",
      answer: "Да, извършваме аварийни ремонти целогодишно. При планови ремонти обаче препоръчваме работа при температури над 5°C за оптимални резултати, особено при полагане на хидроизолация. Зимата можем да поставим временна защита."
    },
    {
      question: "Какво да правя преди да дойдете?",
      answer: "Ако е възможно, поставете съдове под капещата вода, за да ограничите щетите. Преместете ценни вещи от засегнатата зона. Не се опитвайте да се качвате на покрива сами - това е опасно, особено при мокри условия."
    },
    {
      question: "Покрива ли застраховката щетите от теч?",
      answer: "Повечето имуществени застраховки покриват щети от течове, причинени от буря или градушка. За течове от износване или липса на поддръжка покритието е различно. Препоръчваме да се свържете със застрахователя си. Ние можем да предоставим документация за ремонта."
    },
    {
      question: "Колко струва ремонтът на теч от покрива?",
      answer: "Цената зависи от причината и обхвата на повредата. Прост ремонт на единична керемида може да е 80-150 лв, докато сериозен ремонт на хидроизолация около комин може да достигне 300-500 лв. След безплатен оглед ще ви дадем точна оферта."
    },
    {
      question: "Давате ли гаранция за ремонт на течове?",
      answer: "Да, предоставяме писмена гаранция за всеки ремонт - от 1 до 5 години в зависимост от типа работа и материалите. Ако течът се появи отново в гаранционния срок, го отстраняваме безплатно."
    }
  ];

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Ремонт на течове от покрив Варна",
    "provider": {
      "@type": "RoofingContractor",
      "name": "RemontNaPokriviVarna",
      "telephone": "+359892701176",
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
    "description": "Спешен ремонт на течове от покрив във Варна. Бърза реакция 24/7, точна диагностика, траен ремонт с гаранция до 5 години.",
    "offers": {
      "@type": "AggregateOffer",
      "lowPrice": "50",
      "highPrice": "500",
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
      { "@type": "ListItem", "position": 1, "name": "Начало", "item": "https://remontnapokrivivarna.com" },
      { "@type": "ListItem", "position": 2, "name": "Услуги", "item": "https://remontnapokrivivarna.com/услуги" },
      { "@type": "ListItem", "position": 3, "name": "Ремонт на течове", "item": "https://remontnapokrivivarna.com/ремонт-течове" }
    ]
  };

  return (
    <>
      <Helmet>
        <title>Ремонт Течове Покрив Варна - 24/7 | от 40 €</title>
        <meta name="description" content="Спешен ремонт на течове от покрив. Бърза реакция 24/7, диагностика с термокамера, 5г гаранция. ☎ 089 270 1176" />
        <meta name="keywords" content="ремонт теч покрив варна, теч покрив спешен ремонт, течове покрив варна, ремонт течове комин, аварийни ремонти покрив" />
        <link rel="canonical" href="https://remontnapokrivivarna.com/ремонт-течове" />
        <meta property="og:title" content="Ремонт Течове Покрив Варна - 24/7 | от 40 €" />
        <meta property="og:description" content="Спешен ремонт. Бърза реакция, гаранция до 5 години." />
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
              <span>Ремонт на течове</span>
            </nav>
            
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 bg-accent/20 text-accent-foreground px-4 py-2 rounded-full mb-6">
                <AlertTriangle className="w-5 h-5" />
                <span className="font-medium">Спешен Ремонт 24/7</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Ремонт Течове от Покрив Варна - Спешна Услуга
              </h1>
              
              <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl">
                Течът от покрива причинява щети всяка минута. Не чакайте проблемът да стане по-голям - 
                нашият екип реагира в рамките на часове при аварийни течове във Варна и региона.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8">
                  <a href="tel:+359892701176">
                    <Phone className="w-5 h-5 mr-2" />
                    Обадете се СЕГА
                  </a>
                </Button>
                <Button asChild size="lg" className="bg-transparent border-2 border-white text-white hover:bg-white/20">
                  <Link to="/контакти">Безплатен Оглед</Link>
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-accent" />
                  <span>Реакция до 2-4 часа</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-accent" />
                  <span>До 5г гаранция</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-accent" />
                  <span>Безплатна диагностика</span>
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
                Професионален Ремонт на Течове от Покрив във Варна
              </h2>
              <div className="prose prose-lg text-muted-foreground space-y-4">
                <p>
                  Течът от покрива е един от най-стресиращите проблеми за всеки собственик на имот. Водата, 
                  проникваща в дома, не само причинява незабавни неудобства, но и води до сериозни дългосрочни 
                  щети - от повредени мебели и електроуреди до компрометирана строителна конструкция и развитие 
                  на мухъл, вреден за здравето.
                </p>
                <p>
                  Във Варна и Черноморското крайбрежие покривите са изложени на специфични условия - високата 
                  влажност на въздуха, солените морски аерозоли, честите бури и интензивните дъждове ускоряват 
                  износването на покривните материали. Затова навременната реакция при първите признаци на теч 
                  е от критично значение.
                </p>
                <p>
                  Нашият екип от опитни специалисти предлага бързо и ефективно решение на проблема с течовете. 
                  Използваме съвременна диагностична техника, включително термокамера за откриване на скрити течове, 
                  и работим с качествени материали от водещи производители. Гарантираме траен резултат с писмена 
                  гаранция до 5 години.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Signs of Leak */}
        <section className="py-16 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Признаци за Теч от Покрива
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Ранното откриване на теч може да спести хиляди левове за ремонти. Обърнете внимание на тези сигнали:
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {signs.map((sign, index) => (
                <Card key={index} className="bg-background">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Droplets className="w-8 h-8 text-accent flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">{sign.title}</h3>
                        <p className="text-muted-foreground text-sm">{sign.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Causes and Solutions */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Причини за Течове и Как Ги Отстраняваме
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Всеки теч има причина. Нашата задача е да я открием и отстраним трайно.
              </p>
            </div>
            
            <div className="space-y-8 max-w-4xl mx-auto">
              {causes.map((cause, index) => (
                <div key={index} className="bg-secondary rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-3 flex items-center gap-3">
                    <AlertTriangle className="w-6 h-6 text-accent" />
                    {cause.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">{cause.description}</p>
                  <div className="bg-background rounded-lg p-4">
                    <p className="text-foreground">
                      <span className="font-semibold text-primary">Нашето решение: </span>
                      {cause.solution}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-16 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Как Работим при Течове от Покрив
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Нашият процес е оптимизиран за бързина и ефективност, без компромис с качеството
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
              Услуги за Ремонт на Течове
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
              Защо Да Изберете Нас за Ремонт на Течове
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {benefits.map((benefit, index) => (
                <Card key={index} className="bg-background">
                  <CardContent className="p-6 text-center">
                    <benefit.icon className="w-12 h-12 text-primary mx-auto mb-4" />
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
                Ориентировъчни Цени за Ремонт на Течове
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Точната цена се определя след безплатен оглед. Предоставяме подробна оферта без скрити разходи.
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
                * Цените са ориентировъчни и могат да варират в зависимост от конкретния случай
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
                Предлагаме спешен ремонт на течове в цяла Варна и околните населени места
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
                  title="Карта на Варна - райони за ремонт на течове"
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
                Често Задавани Въпроси за Ремонт на Течове
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Отговори на най-честите въпроси относно ремонта на течове от покриви
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
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <AlertTriangle className="w-16 h-16 mx-auto mb-6 text-accent" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Имате Теч от Покрива?
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              Не чакайте проблемът да стане по-голям. Обадете се сега за бърза помощ!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8">
                <a href="tel:+359892701176">
                  <Phone className="w-5 h-5 mr-2" />
                  089 270 1176
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
                <Link to="/контакти">Заявете Безплатен Оглед</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
      <FloatingCallButton />
    </>
  );
};

export default RoofLeakRepairPage;
