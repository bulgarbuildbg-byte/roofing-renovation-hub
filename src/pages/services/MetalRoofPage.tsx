import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCallButton from "@/components/FloatingCallButton";
import CTASection from "@/components/CTASection";
import RelatedServices from "@/components/RelatedServices";
import LearnMoreLinks from "@/components/LearnMoreLinks";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, CheckCircle, Shield, Zap, Clock, Palette, Layers, Wind, MapPin, Wrench, Home, AlertTriangle, ThermometerSun } from "lucide-react";
import { Link } from "react-router-dom";

// Process images - Metal roof installation
import metalRoofSurvey from "@/assets/process/metal-roof-measuring.jpg";
import membraneBattens from "@/assets/process/metal-structure-prep.jpg";
import metalDelivery from "@/assets/process/metal-sheets-delivery.jpg";
import metalInstallation from "@/assets/process/metal-panel-fastening.jpg";
import metalRidgeCap from "@/assets/process/metal-ridge-install.jpg";
import gutterInstallation from "@/assets/process/metal-gutter-system.jpg";

const relatedServices = [
  {
    title: "Изграждане на Нов Покрив",
    description: "Пълно проектиране и изграждане на нова покривна конструкция.",
    href: "/изграждане-на-покрив"
  },
  {
    title: "Ремонт на Покриви",
    description: "Професионален ремонт на всички видове покриви.",
    href: "/ремонт-на-покриви"
  },
  {
    title: "Поддръжка на Покриви",
    description: "Редовна поддръжка за дълъг живот на металния покрив.",
    href: "/поддръжка-на-покриви"
  }
];

const learnMoreLinks = [
  { title: "Как да изберем правилните керемиди", href: "/блог/как-да-изберем-керемиди-за-нов-покрив" },
  { title: "Подготовка на покрива за зимата", href: "/блог/как-да-подготвим-покрива-за-зимата" }
];

const MetalRoofPage = () => {
  const services = [
    "Монтаж на метални керемиди",
    "Монтаж на ламаринени покриви",
    "Монтаж на трапецовидна ламарина",
    "Монтаж на стоящ фалц",
    "Монтаж на сандвич панели",
    "Ремонт на метални покриви",
    "Боядисване и антикорозионна защита",
    "Монтаж на водосточни системи",
    "Подмяна на износени панели",
    "Уплътняване на фуги и винтове"
  ];

  const metalTypes = [
    {
      name: "Метални керемиди",
      description: "Металните керемиди имитират външния вид на традиционните керемиди, но са значително по-леки и по-издръжливи. Изработват се от поцинкована стомана с полимерно покритие в различни цветове. Перфектни за жилищни сгради, които желаят класически вид с модерни характеристики.",
      advantages: ["Автентичен вид на керемиди", "Много по-леки от бетонни/керамични", "Богат избор на цветове", "Бърз монтаж"],
      specs: { weight: "4-6 кг/кв.м", warranty: "до 50 години", slope: "от 14°" },
      price: "от 9 €/кв.м"
    },
    {
      name: "Трапецовидна ламарина",
      description: "Икономичното решение за промишлени сгради, халета, гаражи и селскостопански постройки. Трапецовидният профил осигурява висока носимоспособност при минимално тегло. Предлага се в различни височини на профила за различни нужди.",
      advantages: ["Най-икономичен вариант", "Много бърз монтаж", "Голяма носимоспособност", "Идеален за големи площи"],
      specs: { weight: "3-5 кг/кв.м", warranty: "до 30 години", slope: "от 7°" },
      price: "от 6 €/кв.м"
    },
    {
      name: "Стоящ фалц",
      description: "Премиум решение за модерни архитектурни проекти. Характеризира се с елегантни вертикални линии и напълно скрит монтаж без видими винтове. Осигурява изключителна водоустойчивост благодарение на специалните фалцови съединения.",
      advantages: ["Елегантен модерен вид", "Без видими крепежи", "Изключителна водоустойчивост", "Подходящ за нисък наклон"],
      specs: { weight: "5-7 кг/кв.м", warranty: "до 50 години", slope: "от 3°" },
      price: "от 18 €/кв.м"
    },
    {
      name: "Сандвич панели",
      description: "Комплексно решение, комбиниращо покривно покритие, топлоизолация и вътрешна облицовка в едно. Идеални за бързо строителство на халета, складове и производствени сгради. Осигуряват отлични термични характеристики.",
      advantages: ["Покритие + изолация в едно", "Най-бърз монтаж", "Отлична топлоизолация", "Икономия на време и труд"],
      specs: { weight: "10-15 кг/кв.м", warranty: "до 25 години", slope: "от 5°" },
      price: "от 14 €/кв.м"
    }
  ];

  const benefits = [
    { icon: Clock, title: "Дълъг живот", description: "Металните покриви издържат 40-50+ години при правилна инсталация и минимална поддръжка. Много по-дълго от традиционните материали." },
    { icon: Zap, title: "Леки конструкции", description: "Теглото е 5-10 пъти по-малко от керемидите, което намалява натоварването върху конструкцията и фундаментите." },
    { icon: Shield, title: "Издръжливи", description: "Устойчиви на силен вятър (до 200 км/ч), градушка, сняг и огън. Не гният, не се напукват и не се чупят." },
    { icon: Palette, title: "Богат избор", description: "Предлагаме над 30 цвята и различни профили, за да паснат на всеки архитектурен стил - от класически до ултрамодерен." },
    { icon: Wind, title: "Бърз монтаж", description: "Благодарение на големите размери на панелите, монтажът е 2-3 пъти по-бърз от керемиден покрив, което намалява разходите за труд." },
    { icon: Layers, title: "Икономични", description: "Отлично съотношение цена-качество. По-ниска начална инвестиция и минимални разходи за поддръжка през годините." }
  ];

  const problems = [
    {
      title: "Корозия и ръжда",
      description: "Въпреки защитните покрития, с времето металните покриви могат да развият корозия, особено в морски климат като Варна. Солените аерозоли и влагата ускоряват процеса. Критичните точки са около винтовете, на местата на нарязване и там, където покритието е повредено.",
      solution: "Почистваме засегнатите места, нанасяме антикорозионен грунд и специална боя за метал. При сериозни повреди подменяме засегнатите панели. Препоръчваме превантивна обработка на всеки 10-15 години."
    },
    {
      title: "Течове при винтовете",
      description: "С времето уплътнителните шайби на винтовете се втвърдяват и губят еластичността си, позволявайки на водата да прониква. Това е една от най-честите причини за течове при метални покриви.",
      solution: "Проверяваме и затягаме разхлабените винтове. Подменяме износените уплътнителни шайби или целите винтове. При необходимост нанасяме допълнително уплътнение."
    },
    {
      title: "Кондензация и влага",
      description: "Металът провежда топлината много добре, което може да доведе до кондензация от вътрешната страна при липса на правилна изолация и вентилация. Кондензацията причинява влага, корозия и повреда на изолацията.",
      solution: "Монтираме антикондензно фолио под металните панели. Осигуряваме правилна вентилация на подпокривното пространство. При съществуващи покриви подобряваме изолацията и вентилацията."
    },
    {
      title: "Деформации от температура",
      description: "Металът се разширява и свива при промяна на температурата. Неправилният монтаж, който не отчита термичните движения, може да доведе до надигане на панелите, разхлабване на винтовете и течове.",
      solution: "При ремонт коригираме крепежните елементи, позволявайки термично движение. При нов монтаж спазваме всички изисквания за компенсационни фуги и правилно закрепване."
    }
  ];

  const process = [
    {
      step: 1,
      title: "Оглед и проектиране",
      description: "Нашият специалист извършва детайлен оглед на покрива, измерва площите и наклоните, оценява състоянието на носещата конструкция. Изготвяме проект с точно количество материали и препоръки за оптималния тип метален покрив за вашите нужди.",
      image: metalRoofSurvey,
      imageAlt: "Проектиране на метален покрив - измервания и калкулации Варна"
    },
    {
      step: 2,
      title: "Подготовка на конструкцията",
      description: "Проверяваме и при необходимост укрепваме носещата конструкция. Монтираме летви или обрешетка с правилните разстояния за избрания тип покритие. Полагаме подпокривна мембрана за защита от кондензация и допълнителна водоустойчивост.",
      image: membraneBattens,
      imageAlt: "Подготовка на покривна конструкция за монтаж на метален покрив"
    },
    {
      step: 3,
      title: "Доставка и подреждане на материали",
      description: "Организираме доставката на металните панели, които обикновено се произвеждат по поръчка в точните размери. Внимателно разтоварваме и подреждаме материалите на обекта, за да минимизираме вътрешнообектовия транспорт и риска от повреди.",
      image: metalDelivery,
      imageAlt: "Доставка на метални панели за покрив - разтоварване и подреждане"
    },
    {
      step: 4,
      title: "Монтаж на покривните панели",
      description: "Полагаме металните панели, започвайки от ръба на покрива и работейки нагоре. Осигуряваме правилното застъпване между панелите. Закрепваме с качествени саморези с EPDM уплътнение. Специално внимание отделяме на билото, ръбовете и примикванията.",
      image: metalInstallation,
      imageAlt: "Монтаж на метални панели на покрив - закрепване със саморези"
    },
    {
      step: 5,
      title: "Монтаж на аксесоари",
      description: "Монтираме всички допълнителни елементи - билни капаци, ветробранни ленти, снегозадържатели, вентилационни елементи. Изпълняваме примикванията към стени, комини и други проходки с качествени обшивки и уплътнения.",
      image: metalRidgeCap,
      imageAlt: "Монтаж на аксесоари за метален покрив - снегозадържатели и капаци"
    },
    {
      step: 6,
      title: "Водосточна система и финализиране",
      description: "Монтираме водосточната система - улуци, водосточни тръби, воронки. Извършваме финална проверка на всички елементи и крепежи. Почистваме работната зона и предоставяме гаранционна документация с препоръки за поддръжка.",
      image: gutterInstallation,
      imageAlt: "Монтаж на водосточна система за метален покрив - улуци и водосточни тръби"
    }
  ];

  const priceRanges = [
    { service: "Метални керемиди (монтаж)", price: "от 9 €/кв.м", note: "Без материал" },
    { service: "Трапецовидна ламарина", price: "от 6 €/кв.м", note: "Без материал" },
    { service: "Стоящ фалц", price: "от 18 €/кв.м", note: "Без материал" },
    { service: "Сандвич панели", price: "от 14 €/кв.м", note: "Без материал" },
    { service: "Ремонт/боядисване", price: "от 4 €/кв.м", note: "Почистване + боя" },
    { service: "Водосточна система", price: "от 9 €/м", note: "Улук + тръба + монтаж" }
  ];

  const serviceAreas = [
    { area: "Варна център", neighborhoods: ["Централен район", "Одесос", "Морска градина", "Гръцка махала", "Чаталджа"] },
    { area: "Варна квартали", neighborhoods: ["кв. Бриз", "кв. Чайка", "кв. Левски", "кв. Аспарухово", "кв. Владиславово", "кв. Младост", "кв. Възраждане", "кв. Трошево", "кв. Галата"] },
    { area: "Околни селища", neighborhoods: ["Аксаково", "Белослав", "Девня", "Суворово", "Долни чифлик", "Златни пясъци", "Каменар", "Тополи"] }
  ];

  const faqs = [
    {
      question: "Колко дълго издържа металният покрив?",
      answer: "Качественият метален покрив с полимерно покритие издържа 40-50+ години. Гаранцията на производителите обикновено е 25-30 години за покритието и 10-15 години срещу корозия. Реалният живот често надвишава гаранционния период."
    },
    {
      question: "Шумен ли е металният покрив при дъжд?",
      answer: "При правилен монтаж с подпокривна изолация, шумът е минимален - не по-голям от традиционен покрив. Изолацията поглъща звука. При неизолиран метален покрив (гараж, навес) шумът може да е по-осезаем, но това не е проблем за повечето приложения."
    },
    {
      question: "Безопасен ли е металният покрив при мълнии?",
      answer: "Да, металният покрив е напълно безопасен и дори по-добър от други материали. Металът не гори и равномерно разпределя електричеството. Препоръчително е да има заземяване, но рискът от удар не е по-голям, а последиците са по-малки."
    },
    {
      question: "Може ли да се монтира метален покрив върху стар керемиден?",
      answer: "В много случаи да, ако старата конструкция е в добро състояние. Това спестява разходите за демонтаж и изхвърляне на старите керемиди. Преценяваме възможността при огледа - зависи от състоянието на летвите и носимоспособността."
    },
    {
      question: "Какъв наклон е необходим за метален покрив?",
      answer: "Зависи от типа: трапецовидна ламарина - от 7°, метални керемиди - от 14°, стоящ фалц - от 3°. По-стръмни наклони са възможни за всички типове. Консултираме за оптималния избор според вашия покрив."
    },
    {
      question: "Колко струва метален покрив за къща 120 кв.м?",
      answer: "За метални керемиди с качествено покритие, включително материали, монтаж и водосточна система, бюджетът е приблизително 2300-3300 €. За трапецовидна ламарина е 1500-2000 €. Точната цена се определя след оглед."
    },
    {
      question: "Какво покритие е най-подходящо за морски климат?",
      answer: "За Варна и крайбрежието препоръчваме покрития с повишена устойчивост на корозия - Pural, PVDF или полиестер с висока UV защита. Тези покрития издържат на солените аерозоли и влажния въздух значително по-добре от стандартните."
    }
  ];

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Метални покриви Варна",
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
    "description": "Професионален монтаж и ремонт на метални покриви във Варна. Метални керемиди, ламаринени покриви, трапецовидна ламарина. Гаранция до 50 години.",
    "offers": {
      "@type": "AggregateOffer",
      "lowPrice": "12",
      "highPrice": "35",
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
      { "@type": "ListItem", "position": 3, "name": "Метални покриви", "item": "https://www.remontnapokrivivarna.bg/метални-покриви" }
    ]
  };

  return (
    <>
      <Helmet>
        <title>Метални Покриви Варна - от 6 €/кв.м | 50г</title>
        <meta name="description" content="Монтаж на метални покриви - керемиди, ламарина, стоящ фалц. До 50 години гаранция. ☎ 088 499 7659" />
        <meta name="keywords" content="метални покриви варна, метални керемиди варна, ламаринен покрив, трапецовидна ламарина варна, монтаж метален покрив" />
        <link rel="canonical" href="https://www.remontnapokrivivarna.bg/метални-покриви" />
        <meta property="og:title" content="Метални Покриви Варна - от 6 €/кв.м" />
        <meta property="og:description" content="Керемиди, ламарина, стоящ фалц. До 50г гаранция." />
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
              <span>Метални покриви</span>
            </nav>
            
            <div className="max-w-4xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Метални Покриви Варна - Монтаж и Ремонт
              </h1>
              
              <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl">
                Модерни и издръжливи метални покривни решения с гаранция до 50 години. 
                Метални керемиди, трапецовидна ламарина, стоящ фалц, сандвич панели. 
                Идеални за жилищни, търговски и промишлени сгради.
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
                  <span>До 50г гаранция</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-accent" />
                  <span>Бърз монтаж</span>
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
                Специалисти по Метални Покриви във Варна и Региона
              </h2>
              <div className="prose prose-lg text-muted-foreground space-y-4">
                <p>
                  Металните покриви са съвременното решение за собственици, които търсят комбинация от 
                  дълготрайност, естетика и икономичност. Със срок на експлоатация до 50+ години и 
                  минимална поддръжка, металните покриви се превръщат във все по-популярен избор както 
                  за жилищни, така и за търговски и промишлени сгради.
                </p>
                <p>
                  Във Варна и Черноморското крайбрежие металните покриви изискват специално внимание 
                  към избора на покритие заради морската влага и солените аерозоли. Работим само с 
                  материали с повишена антикорозионна защита, подходящи за морски климат - Pural, PVDF 
                  и полиестер с UV защита от водещи европейски производители.
                </p>
                <p>
                  Нашият екип има богат опит с всички видове метални покриви - от елегантните метални 
                  керемиди за къщи и вили, през икономичната трапецовидна ламарина за стопански сгради, 
                  до премиум решенията със стоящ фалц за модерни архитектурни проекти. Предлагаме 
                  пълен пакет услуги - от консултация и проектиране до монтаж и гаранционно обслужване.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Metal Types */}
        <section className="py-16 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Видове Метални Покриви
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Предлагаме пълната гама метални покривни решения за всякакви нужди и бюджети
              </p>
            </div>
            
            <div className="space-y-6">
              {metalTypes.map((type, index) => (
                <Card key={index} className="bg-background overflow-hidden">
                  <CardContent className="p-6">
                    <div className="grid lg:grid-cols-4 gap-6">
                      <div className="lg:col-span-3">
                        <h3 className="text-xl font-semibold text-foreground mb-3 flex items-center gap-3">
                          <Layers className="w-6 h-6 text-primary" />
                          {type.name}
                        </h3>
                        <p className="text-muted-foreground mb-4">{type.description}</p>
                        
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-medium text-foreground mb-2">Предимства:</h4>
                            <ul className="space-y-1">
                              {type.advantages.map((adv, idx) => (
                                <li key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                                  <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                                  {adv}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-medium text-foreground mb-2">Спецификации:</h4>
                            <ul className="space-y-1 text-sm text-muted-foreground">
                              <li>Тегло: {type.specs.weight}</li>
                              <li>Гаранция: {type.specs.warranty}</li>
                              <li>Мин. наклон: {type.specs.slope}</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-center lg:border-l lg:border-border lg:pl-6">
                        <div className="text-center">
                          <span className="text-2xl font-bold text-primary">{type.price}</span>
                          <p className="text-muted-foreground text-sm mt-1">само монтаж</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Предимства на Металните Покриви
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Защо все повече собственици избират метални покриви
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {benefits.map((benefit, index) => (
                <Card key={index} className="bg-secondary">
                  <CardContent className="p-6">
                    <benefit.icon className="w-12 h-12 text-primary mb-4" />
                    <h3 className="font-semibold text-foreground mb-2">{benefit.title}</h3>
                    <p className="text-muted-foreground text-sm">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Common Problems */}
        <section className="py-16 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Проблеми с Метални Покриви и Решения
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Дори най-издръжливите покриви могат да имат проблеми - ние знаем как да ги решим
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {problems.map((problem, index) => (
                <Card key={index} className="bg-background">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-foreground mb-3 flex items-center gap-3">
                      <AlertTriangle className="w-6 h-6 text-accent" />
                      {problem.title}
                    </h3>
                    <p className="text-muted-foreground mb-4">{problem.description}</p>
                    <div className="bg-secondary rounded-lg p-4">
                      <p className="text-foreground">
                        <span className="font-semibold text-primary">Решение: </span>
                        {problem.solution}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Процес на Монтаж на Метален Покрив
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Професионален подход стъпка по стъпка за качествен и дълготраен резултат
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
        <section className="py-16 bg-secondary">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
              Нашите Услуги за Метални Покриви
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4 max-w-6xl mx-auto">
              {services.map((service, index) => (
                <div key={index} className="flex items-center gap-3 bg-background p-4 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground text-sm">{service}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Цени за Метални Покриви
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
                * Цените са ориентировъчни за монтаж. Материалите се калкулират отделно според избора.
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
                Монтираме метални покриви в цяла Варна и околните населени места
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
                  title="Карта на Варна - райони за монтаж на метални покриви"
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
                Често Задавани Въпроси за Метални Покриви
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Отговори на най-честите въпроси относно металните покриви
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
          title="Интересувате се от Метален Покрив?"
          subtitle="Получете безплатна консултация и оферта без задължение"
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

export default MetalRoofPage;
