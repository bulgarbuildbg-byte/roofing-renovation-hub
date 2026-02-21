import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCallButton from "@/components/FloatingCallButton";
import RelatedServices from "@/components/RelatedServices";
import LearnMoreLinks from "@/components/LearnMoreLinks";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { CheckCircle, Settings, Calendar, Phone, MapPin, Search, Leaf, Snowflake, Sun, CloudRain } from "lucide-react";

// Process images - Roof maintenance and inspection
import maintenanceHero from "@/assets/process/roof-maintenance-hero.jpg";
import groundInspection from "@/assets/process/ground-roof-inspection.jpg";
import roofWalkingInspection from "@/assets/process/roof-detail-inspection.jpg";
import gutterCleaning from "@/assets/process/gutter-cleaning-work.jpg";
import mossRemoval from "@/assets/process/moss-cleaning-roof.jpg";
import singleTileRepair from "@/assets/process/tile-repair-onsite.jpg";
import maintenanceReport from "@/assets/process/inspection-report-doc.jpg";

const relatedServices = [
  {
    title: "Ремонт на Покриви",
    description: "Професионален ремонт при открити проблеми по време на поддръжка.",
    href: "/ремонт-на-покриви"
  },
  {
    title: "Смяна на Керемиди",
    description: "Подмяна на повредени керемиди преди да причинят течове.",
    href: "/смяна-на-керемиди"
  },
  {
    title: "Хидроизолация",
    description: "Превантивна хидроизолация за защита на покрива.",
    href: "/хидроизолация"
  }
];

const learnMoreLinks = [
  { title: "Пролетна инспекция на покрива", href: "/блог/пролетна-инспекция-на-покрива" },
  { title: "Подготовка на покрива за зимата", href: "/блог/как-да-подготвим-покрива-за-зимата" }
];

const MaintenancePage = () => {
  const services = [
    "Почистване на покриви от мъх и лишеи",
    "Почистване на улуци и водосточни тръби",
    "Профилактичен преглед на покрива",
    "Почистване на сняг през зимата",
    "Смяна на счупени керемиди",
    "Подмяна на уплътнения и фугиране",
    "Боядисване и защитни покрития"
  ];

  const packages = [
    {
      title: "Базов преглед",
      description: "Визуален преглед на покрива и доклад за състоянието",
      price: "от 30 €",
      features: ["Визуална инспекция", "Доклад за състоянието", "Препоръки за поддръжка"]
    },
    {
      title: "Почистване на улуци",
      description: "Пълно почистване на улуци и водосточни тръби",
      price: "от 3 €/м",
      features: ["Почистване от листа", "Промиване с вода", "Проверка за течове"]
    },
    {
      title: "Годишна поддръжка",
      description: "Пълен пакет за целогодишна грижа за покрива",
      price: "от 128 €/год",
      features: ["2 прегледа годишно", "Почистване на улуци", "Дребни ремонти", "Приоритетно обслужване"]
    }
  ];

  const benefits = [
    "Удължава живота на покрива с до 50%",
    "Предотвратява скъпи аварийни ремонти",
    "Запазва гаранцията на покривните материали",
    "Подобрява енергийната ефективност",
    "Поддържа добрия външен вид на сградата",
    "Спестява пари в дългосрочен план"
  ];

  const seasonalMaintenance = [
    {
      season: "Пролет",
      icon: Sun,
      title: "Пролетна проверка и почистване",
      description: "След зимата е важно да се направи цялостен преглед на покрива. Зимните условия - сняг, лед и температурни промени - могат да причинят скрити повреди. Пролетта е идеалното време за отстраняване на натрупани отломки и проверка за течове.",
      tasks: [
        "Инспекция за повреди от зимата",
        "Почистване на улуци от листа и клони",
        "Проверка на обшивки около комини",
        "Отстраняване на мъх и лишеи",
        "Проверка на хидроизолацията"
      ]
    },
    {
      season: "Лято",
      icon: Sun,
      title: "Летни превантивни мерки",
      description: "Лятото е най-подходящият сезон за планови ремонти и подобрения. Сухото и топло време позволява извършването на хидроизолационни работи и боядисване. Също така е време за подготовка за есенните дъждове.",
      tasks: [
        "Полагане на хидроизолация",
        "Боядисване на метални елементи",
        "Подмяна на износени уплътнения",
        "Монтаж на снегозадържатели",
        "Проверка на вентилацията"
      ]
    },
    {
      season: "Есен",
      icon: Leaf,
      title: "Есенно почистване преди зимата",
      description: "Есента е критичен период за подготовка на покрива за зимните месеци. Опадалите листа могат да запушат улуците и да предизвикат течове. Важно е да се направи финална проверка преди студовете.",
      tasks: [
        "Интензивно почистване на улуци",
        "Проверка на водоотвеждането",
        "Фиксиране на разхлабени керемиди",
        "Уплътняване на проблемни зони",
        "Подрязване на близки клони"
      ]
    },
    {
      season: "Зима",
      icon: Snowflake,
      title: "Зимна поддръжка и почистване на сняг",
      description: "През зимата основната грижа е контрол на снежното натоварване и премахване на ледени висулки. Тежкият сняг може да повреди покривната конструкция, а ледените висулки са опасни за минувачите.",
      tasks: [
        "Почистване на сняг при нужда",
        "Премахване на ледени висулки",
        "Контрол на натоварването",
        "Проверка за ледени язове",
        "Аварийни интервенции при течове"
      ]
    }
  ];

  const maintenanceProcess = [
    {
      step: 1,
      title: "Визуална инспекция от земята",
      description: "Нашият специалист започва с оглед от земята, използвайки бинокъл или дрон за първоначална оценка. Това позволява да се идентифицират очевидни проблеми като липсващи керемиди, видими повреди или натрупани отломки без риск за покрива.",
      image: groundInspection,
      imageAlt: "Визуална инспекция на покрив от земята - професионален оглед на състоянието Варна"
    },
    {
      step: 2,
      title: "Детайлен оглед на покрива",
      description: "При необходимост се качваме на покрива за по-детайлна инспекция. Проверяваме състоянието на керемидите, обшивките, улуците, комините и всички критични точки. Правим снимки за документация.",
      image: roofWalkingInspection,
      imageAlt: "Детайлен оглед на покрив от близо - проверка на керемиди и обшивки"
    },
    {
      step: 3,
      title: "Почистване на улуци и водостоци",
      description: "Ръчно премахваме натрупаните листа, клони и отломки от улуците. Промиваме водосточните тръби с вода под налягане, за да се уверим, че няма запушвания. Проверяваме наклона и закрепването.",
      image: gutterCleaning,
      imageAlt: "Почистване на улуци от листа и отломки - поддръжка на водосточна система Варна"
    },
    {
      step: 4,
      title: "Отстраняване на мъх и лишеи",
      description: "Мъхът и лишеите задържат влага, която уврежда керемидите. Използваме специализирани препарати и четки за внимателно отстраняване, без да повредим покритието. При необходимост нанасяме превантивен препарат.",
      image: mossRemoval,
      imageAlt: "Отстраняване на мъх от керемиден покрив - почистване и импрегниране"
    },
    {
      step: 5,
      title: "Дребни ремонти на място",
      description: "При констатиране на дребни проблеми - счупена керемида, разхлабена обшивка, липсващо уплътнение - ги отстраняваме веднага. Това предотвратява развитието на по-сериозни повреди.",
      image: singleTileRepair,
      imageAlt: "Дребен ремонт на покрив - подмяна на счупена керемида при поддръжка"
    },
    {
      step: 6,
      title: "Доклад и препоръки",
      description: "След приключване на поддръжката предоставяме подробен доклад за състоянието на покрива, извършените дейности и препоръки за бъдещи действия. Планираме следващата проверка.",
      image: maintenanceReport,
      imageAlt: "Изготвяне на доклад за състоянието на покрива - препоръки за поддръжка"
    }
  ];

  const warningSignals = [
    {
      title: "Мокри петна по тавана",
      description: "Най-очевидният признак за проблем с покрива. Мокрите петна показват, че водата вече прониква в сградата. Необходимо е незабавно действие за локализиране и отстраняване на теча."
    },
    {
      title: "Натрупване на мъх и лишеи",
      description: "Мъхът задържа влага директно върху покривното покритие, ускорявайки износването. Ако покривът е позеленял, е време за почистване и импрегниране."
    },
    {
      title: "Запушени или провиснали улуци",
      description: "Водата, която прелива от улуците, може да проникне под покривното покритие или да уврежда фасадата. Провиснали улуци показват проблем със закрепването."
    },
    {
      title: "Видимо износени или счупени керемиди",
      description: "Керемиди с напукана глазура, счупени ъгли или липсващи елементи са входна точка за водата. Дори една счупена керемида може да причини теч."
    },
    {
      title: "Ръжда по метални елементи",
      description: "Ръждясали обшивки, капаци или улуци са компрометирани и не осигуряват надеждна защита. Необходима е подмяна или обработка."
    },
    {
      title: "Увеличени сметки за отопление",
      description: "Ако сметките за отопление растат без видима причина, проблемът може да е в топлоизолацията на покрива. Проверката може да разкрие влага или повредена изолация."
    }
  ];

  const serviceAreas = [
    { area: "Варна център", neighborhoods: ["Централен район", "Одесос", "Морска градина"] },
    { area: "Варна квартали", neighborhoods: ["кв. Бриз", "кв. Чайка", "кв. Левски", "кв. Аспарухово", "кв. Владиславово", "кв. Младост"] },
    { area: "Околни селища", neighborhoods: ["Аксаково", "Белослав", "Девня", "Златни пясъци", "Св. Константин", "Виница"] }
  ];

  const faqs = [
    {
      question: "Колко често трябва да се прави поддръжка на покрива?",
      answer: "Препоръчваме минимум два прегледа годишно - през пролетта след зимата и през есента преди дъждовния сезон. Почистването на улуците трябва да се прави по-често, особено ако наблизо има дървета."
    },
    {
      question: "Мога ли сам да почистя покрива си?",
      answer: "За безопасност препоръчваме да използвате професионални услуги. Работата на височина е рискована без подходящо оборудване и опит. Освен това можете неволно да повредите керемидите или хидроизолацията."
    },
    {
      question: "Какво включва годишният пакет за поддръжка?",
      answer: "Годишният пакет включва два пълни прегледа (пролет и есен), почистване на улуци два пъти годишно, дребни ремонти до 2 часа работа и приоритетно обслужване при спешни случаи."
    },
    {
      question: "Как да разбера, че покривът ми има нужда от поддръжка?",
      answer: "Признаци за нужда от поддръжка включват: запушени улуци, видим мъх, счупени керемиди, ръжда по метални части, петна по тавана или увеличени сметки за отопление. При всеки от тези признаци се обадете за преглед."
    },
    {
      question: "Почиствате ли сняг от покриви?",
      answer: "Да, предлагаме услуга за почистване на сняг при необходимост. При натрупване над 30-40 см или образуване на ледени висулки, почистването е препоръчително за безопасност на сградата и минувачите."
    }
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
      { "@type": "Place", "name": "Златни пясъци" }
    ],
    "description": "Професионална поддръжка на покриви във Варна - почистване, инспекции, превантивни ремонти.",
    "offers": {
      "@type": "AggregateOffer",
      "lowPrice": "3",
      "highPrice": "128",
      "priceCurrency": "EUR",
      "offerCount": "3"
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
      { "@type": "ListItem", "position": 3, "name": "Поддръжка на покриви", "item": "https://www.remontnapokrivivarna.bg/поддръжка-на-покриви" }
    ]
  };

  return (
    <>
      <Helmet>
        <title>Поддръжка Покриви Варна - от 30 € | Годишни</title>
        <meta name="description" content="Профилактика и почистване на покриви. Предотвратете скъпи ремонти с редовна поддръжка. ☎ 088 499 7659" />
        <meta name="keywords" content="поддръжка покриви варна, почистване улуци варна, почистване покрив мъх, профилактика покрив, почистване сняг покрив" />
        <link rel="canonical" href="https://www.remontnapokrivivarna.bg/поддръжка-на-покриви" />
        <meta property="og:title" content="Поддръжка Покриви Варна - от 30 €" />
        <meta property="og:description" content="Почистване на улуци и покриви. Годишни пакети." />
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
              <span className="text-primary-foreground">Поддръжка на покриви</span>
            </nav>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-center">
              Поддръжка на Покриви Варна - Професионална
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-4xl mx-auto text-center mb-8">
              Редовната поддръжка удължава живота на покрива с до 50% и предотвратява скъпи аварийни ремонти.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8">
                <a href="tel:0884997659">
                  <Phone className="w-5 h-5 mr-2" />
                  Обадете се: 088 499 7659
                </a>
              </Button>
              <Button asChild size="lg" className="bg-transparent border-2 border-white text-white hover:bg-white/20">
                <Link to="/контакти">Заявете преглед</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Hero Image */}
        <section className="relative h-[400px] md:h-[500px]">
          <img 
            src={maintenanceHero} 
            alt="Професионална поддръжка на покрив във Варна - почистване на улуци и керемиди"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
          <div className="absolute bottom-8 left-0 right-0 text-center">
            <p className="text-foreground text-lg font-medium">Превантивната поддръжка спестява хиляди левове за бъдещи ремонти</p>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto prose prose-lg">
              <h2 className="text-3xl font-bold text-foreground mb-6">Защо редовната поддръжка на покрива е важна?</h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                Покривът е първата защита на вашия дом срещу атмосферните условия. Във Варна, с нейните специфични климатични особености - морски въздух, интензивни валежи, силни ветрове и горещо лято - покривите са подложени на значително натоварване. Редовната поддръжка е ключът към дългия живот на покривната конструкция.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                <strong className="text-foreground">Статистиката показва</strong>, че покривите с редовна поддръжка издържат с 40-50% по-дълго от тези без грижа. Малките проблеми, открити навреме, се решават лесно и евтино. Игнорирани, те се превръщат в сериозни повреди, изискващи скъпоструващи ремонти.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                <strong className="text-foreground">RemontNaPokriviVarna</strong> предлага цялостни услуги по поддръжка на покриви - от профилактични прегледи до почистване на улуци и сняг. Нашите годишни пакети осигуряват спокойствие и защита на вашата инвестиция целогодишно.
              </p>
            </div>
          </div>
        </section>

        {/* Seasonal Maintenance */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">Сезонна поддръжка на покрива</h2>
              <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
                Всеки сезон поставя различни предизвикателства пред покрива. Ето какви дейности препоръчваме през годината.
              </p>
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

        {/* Step-by-Step Process */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">
                Процес на професионална инспекция
              </h2>
              <p className="text-muted-foreground text-center mb-12 max-w-3xl mx-auto">
                Нашият систематичен подход гарантира, че нищо не остава незабелязано
              </p>
              <div className="space-y-12">
                {maintenanceProcess.map((step, index) => (
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

        {/* Warning Signals */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">
                Признаци, че покривът ви се нуждае от внимание
              </h2>
              <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
                Разпознаването на тези сигнали навреме може да ви спести сериозни проблеми
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

        {/* Services List */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Услуги по поддръжка</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {services.map((service, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 rounded-lg bg-muted/30 border border-border">
                    <Settings className="w-6 h-6 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{service}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16 bg-muted/30">
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

        {/* Packages */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-foreground text-center mb-4">Пакети за поддръжка</h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              Изберете пакет, който отговаря на вашите нужди
            </p>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {packages.map((pkg, index) => (
                <Card key={index} className={`border-border bg-card ${index === 2 ? 'ring-2 ring-primary' : ''}`}>
                  <CardContent className="p-6">
                    {index === 2 && (
                      <span className="inline-block px-3 py-1 text-xs font-semibold text-primary-foreground bg-primary rounded-full mb-4">
                        Препоръчан
                      </span>
                    )}
                    <h3 className="text-xl font-semibold text-card-foreground mb-2">{pkg.title}</h3>
                    <p className="text-muted-foreground mb-4">{pkg.description}</p>
                    <p className="text-2xl font-bold text-primary mb-4">{pkg.price}</p>
                    <ul className="space-y-2">
                      {pkg.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CheckCircle className="w-4 h-4 text-accent" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Service Areas */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">
                Район на обслужване
              </h2>
              <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
                Извършваме поддръжка на покриви в цялата Варненска област
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
              <div className="rounded-xl overflow-hidden shadow-lg">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d186237.48652949!2d27.769646!3d43.2140504!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40a4538baaf3f2cd%3A0x5765bc39bc4f4c!2z0JLQsNGA0L3QsCwg0JHRitC70LPQsNGA0LjRjw!5e0!3m2!1sbg!2sbg!4v1702300000000!5m2!1sbg!2sbg"
                  width="100%" 
                  height="400" 
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Карта на Варна - район на обслужване за поддръжка на покриви"
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
                Често задавани въпроси
              </h2>
              <p className="text-muted-foreground text-center mb-12">
                Отговори на най-честите въпроси за поддръжка на покриви
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

        {/* Schedule CTA */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <Calendar className="w-16 h-16 mx-auto mb-6 opacity-80" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Кога сте правили последния преглед на покрива?</h2>
            <p className="text-xl text-primary-foreground/90 mb-4 max-w-2xl mx-auto">
              Препоръчваме преглед на покрива поне два пъти годишно. Обадете се за безплатна консултация.
            </p>
            <p className="text-2xl font-bold mb-8">
              ☎ 088 499 7659
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8">
                <a href="tel:+359884997659">Заявете преглед</a>
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

export default MaintenancePage;