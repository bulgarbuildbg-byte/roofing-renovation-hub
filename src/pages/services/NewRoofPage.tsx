import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCallButton from "@/components/FloatingCallButton";
import RelatedServices from "@/components/RelatedServices";
import LearnMoreLinks from "@/components/LearnMoreLinks";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { CheckCircle, Home, Shield, Phone, MapPin, Search, Layers, Ruler, HardHat } from "lucide-react";

// Process images - New roof construction
import roofPlanning from "@/assets/process/architect-planning.jpg";
import roofingMaterials from "@/assets/process/roof-tiles-stack.jpg";
import roofFrameConstruction from "@/assets/process/roof-frame-work.jpg";
import membraneBattens from "@/assets/process/roof-underlayment.jpg";
import tileInstallation from "@/assets/process/tile-roof-construction.jpg";
import roofInsulation from "@/assets/portfolio/family-house.jpg";

const relatedServices = [
  {
    title: "Метални Покриви",
    description: "Леки и издръжливи метални покриви с дълга гаранция.",
    href: "/метални-покриви"
  },
  {
    title: "Смяна на Керемиди",
    description: "Подмяна на стари керемиди с нови качествени материали.",
    href: "/смяна-на-керемиди"
  },
  {
    title: "Хидроизолация",
    description: "Професионална хидроизолация за дълготрайна защита.",
    href: "/хидроизолация"
  }
];

const learnMoreLinks = [
  { title: "Как да изберем правилните керемиди", href: "/блог/как-да-изберем-керемиди-за-нов-покрив" },
  { title: "Видове хидроизолация и кога да изберем всяка", href: "/блог/видове-хидроизолация-и-кога-да-изберем-всяка" }
];

const NewRoofPage = () => {
  const services = [
    "Проектиране на покривна конструкция",
    "Изграждане на дървена конструкция",
    "Монтаж на керемиди",
    "Монтаж на метални покриви",
    "Изграждане на плоски покриви",
    "Монтаж на капандури и прозорци",
    "Топло и хидроизолация"
  ];

  const roofTypes = [
    {
      title: "Керемиден покрив",
      description: "Класическо и естетично решение с дълъг живот. Подходящ за къщи и вили.",
      price: "от 46 €/кв.м"
    },
    {
      title: "Метален покрив",
      description: "Икономично и издръжливо решение. Идеално за промишлени и селскостопански сгради.",
      price: "от 26 €/кв.м"
    },
    {
      title: "Плосък покрив",
      description: "Модерно решение за съвременни сгради. Възможност за зелен покрив или тераса.",
      price: "от 33 €/кв.м"
    }
  ];

  const roofConstructions = [
    {
      title: "Скатни покриви - предимства и видове",
      description: "Скатните покриви са традиционното решение за жилищни сгради в България. Наклонът осигурява естествено оттичане на дъждовна вода и сняг. Предлагаме едноскатни, двускатни, четирискатни и комбинирани покриви. Наклонът може да варира от 15° до 45° в зависимост от климатичните условия и архитектурния стил.",
      features: ["Отлично оттичане на вода", "Естетичен външен вид", "Възможност за мансарден етаж", "Дълъг живот на покритието"]
    },
    {
      title: "Плоски покриви - модерни решения",
      description: "Плоските покриви са предпочитано решение за съвременни жилищни сгради, търговски и индустриални обекти. Въпреки името си, те имат минимален наклон от 1-3% за оттичане на водата. Предлагат възможност за изграждане на зелен покрив, тераса или инсталиране на соларни панели.",
      features: ["Допълнително използваемо пространство", "Подходящ за соларни системи", "По-ниска цена за изграждане", "Лесен достъп за поддръжка"]
    },
    {
      title: "Мансардни покриви",
      description: "Мансардният покрив съчетава предимствата на скатния покрив с допълнително жилищно пространство. Характеризира се с по-стръмен наклон в долната част и по-полегат в горната. Идеален избор за тези, които искат да увеличат жилищната площ без да строят нов етаж.",
      features: ["Максимално използване на пространството", "Уникален архитектурен облик", "Добра топлоизолация", "Повишаване стойността на имота"]
    }
  ];

  const buildProcess = [
    {
      step: 1,
      title: "Проектиране и изчисления",
      description: "Всеки нов покрив започва с внимателно проектиране. Нашите специалисти изготвят детайлни чертежи на покривната конструкция, изчисляват натоварванията (собствено тегло, сняг, вятър) и определят необходимите сечения на носещите елементи. Съгласуваме проекта с архитекта и клиента.",
      image: roofPlanning,
      imageAlt: "Проектиране на покривна конструкция - архитектурни чертежи и изчисления за нов покрив Варна"
    },
    {
      step: 2,
      title: "Избор и доставка на материали",
      description: "След одобрение на проекта подбираме качествени материали - конструктивна дървесина (смърч или ела) с необходимата влажност и обработка, подпокривни мембрани, топлоизолация и покривно покритие. Организираме доставката на място и съхранението на материалите.",
      image: roofingMaterials,
      imageAlt: "Доставка на материали за нов покрив - качествена дървесина и покривни материали Варна"
    },
    {
      step: 3,
      title: "Изграждане на носещата конструкция",
      description: "Монтираме мауерлата (основната греда върху стените), след което изграждаме системата от ребра, столици и контрарезе. Използваме метални съединители и анкери за здрава връзка между елементите. Контролираме геометрията и нивелацията на всеки етап.",
      image: roofFrameConstruction,
      imageAlt: "Изграждане на дървена покривна конструкция - монтаж на ребра и столици Варна"
    },
    {
      step: 4,
      title: "Полагане на летви и мембрана",
      description: "Върху конструкцията полагаме дифузионна мембрана, която предпазва от влага отвън, но позволява изпарението отвътре. След това монтираме контралетвите и летвите, върху които ще се поставят керемидите. Разстоянието между летвите се определя от типа керемиди.",
      image: membraneBattens,
      imageAlt: "Полагане на подпокривна мембрана и летви за керемиди - подготовка за покривно покритие"
    },
    {
      step: 5,
      title: "Монтаж на покривното покритие",
      description: "Полагаме керемидите, метални панели или друго избрано покритие, като спазваме технологичните изисквания на производителя. Обръщаме специално внимание на деталите - връзки със стени, комини, капандури. Монтираме снегозадържащи елементи и водосточна система.",
      image: tileInstallation,
      imageAlt: "Монтаж на керемиди на нов покрив - професионално полагане на покривно покритие Варна"
    },
    {
      step: 6,
      title: "Топлоизолация и вътрешни работи",
      description: "При жилищни подпокривни пространства полагаме топлоизолация между ребрата и под тях. Монтираме пароизолация от вътрешната страна. Извършваме вътрешно обшиване с гипсокартон или дървена ламперия. Финализираме всички детайли и предаваме обекта.",
      image: roofInsulation,
      imageAlt: "Топлоизолация на таван под покрив - полагане на минерална вата между ребрата"
    }
  ];

  const materials = [
    {
      title: "Керемиди - бетонни vs керамични",
      description: "Бетонните керемиди (Bramac, Creaton) са по-икономични, издръжливи на удар и предлагат голямо разнообразие от цветове. Керамичните керемиди (Tondach, Roben) имат по-дълъг живот (100+ години), по-добра паропропускливост и класическа естетика. И двата вида предлагаме с 30 години гаранция от производителя."
    },
    {
      title: "Метални покриви",
      description: "Работим с метални панели от поцинкована стомана с полимерно покритие (полиестер, пурал, пластизол). Металните покриви са леки, бързи за монтаж и напълно водоустойчиви. Предлагаме както трапецовидни профили за промишлени сгради, така и метални керемиди за жилищни."
    },
    {
      title: "Конструктивна дървесина",
      description: "Използваме камерно сушен дървен материал с влажност под 18% - смърч или ела с II-ри качествен клас. Целият дървен материал се импрегнира със защитен препарат против гниене и дървояди. При поискване работим и с КВХ (конструктивно залепена дървесина) за по-големи отвори."
    },
    {
      title: "Подпокривни материали",
      description: "Подпокривната система включва дифузионна мембрана за защита от вятър и влага, топлоизолация (минерална вата или XPS), пароизолация от вътрешната страна. Използваме продукти от Dorken, Jutadach, Rockwool и Isover с доказано качество."
    }
  ];

  const serviceAreas = [
    { area: "Варна център", neighborhoods: ["Централен район", "Одесос", "Морска градина"] },
    { area: "Варна квартали", neighborhoods: ["кв. Бриз", "кв. Чайка", "кв. Левски", "кв. Аспарухово", "кв. Владиславово", "кв. Младост"] },
    { area: "Околни селища", neighborhoods: ["Аксаково", "Белослав", "Девня", "Златни пясъци", "Св. Константин", "Виница", "Галата"] }
  ];

  const faqs = [
    {
      question: "Колко време отнема изграждането на нов покрив?",
      answer: "Продължителността зависи от размера и сложността. За стандартна къща с покрив около 150-200 кв.м, строителството отнема обикновено 2-3 седмици. По-големи или сложни проекти могат да отнемат 4-6 седмици."
    },
    {
      question: "Какъв тип покрив е най-подходящ за моя дом?",
      answer: "Изборът зависи от архитектурния стил, климата, бюджета и личните предпочитания. Керемиденият покрив е класически избор за къщи, металният е идеален за стопански сгради, а плоският - за модерни архитектурни решения. При безплатна консултация ще ви помогнем да изберете."
    },
    {
      question: "Каква гаранция давате за нов покрив?",
      answer: "Предлагаме 10 години гаранция за конструкцията и монтажа. Допълнително, производителите на материали дават собствени гаранции - до 30 години за керемиди, до 50 години за метални покриви."
    },
    {
      question: "Трябва ли разрешително за строеж на нов покрив?",
      answer: "При ново строителство разрешителното е задължително. При подмяна на съществуващ покрив със същите параметри обикновено не се изисква. Ако се променя формата, наклонът или височината, се изисква одобрен проект. Ще ви консултираме за конкретния случай."
    },
    {
      question: "Колко струва нов покрив за къща от 100 кв.м?",
      answer: "За керемиден покрив на къща с покрив 100 кв.м бюджетът е приблизително 4600-6100 € (конструкция, изолация, покритие, водосточна система). За метален покрив е около 2600-3600 €. Точната цена се определя след оглед и проектиране."
    }
  ];

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Изграждане на нов покрив Варна",
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
    "description": "Професионално изграждане на нови покриви във Варна - керемидени, метални, плоски. 10 години гаранция.",
    "offers": {
      "@type": "AggregateOffer",
      "lowPrice": "26",
      "highPrice": "46",
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
      { "@type": "ListItem", "position": 3, "name": "Изграждане на нов покрив", "item": "https://www.remontnapokrivivarna.bg/изграждане-на-покрив" }
    ]
  };

  return (
    <>
      <Helmet>
        <title>Нов Покрив Варна - Изграждане от 33 €/кв.м</title>
        <meta name="description" content="Изграждане на нови покриви - керемидни, метални, плоски. Пълен проект и монтаж с 10г гаранция. ☎ 088 499 7659" />
        <meta name="keywords" content="нов покрив варна, изграждане покрив варна, покривна конструкция варна, керемиден покрив цена, метален покрив варна" />
        <link rel="canonical" href="https://www.remontnapokrivivarna.bg/изграждане-на-покрив" />
        <meta property="og:title" content="Нов Покрив Варна - Изграждане от 33 €/кв.м" />
        <meta property="og:description" content="Нови покриви с 10г гаранция. Керемидени, метални, плоски." />
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
              <span className="text-primary-foreground">Изграждане на нов покрив</span>
            </nav>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-center">
              Нов Покрив Варна - Изграждане и Монтаж
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-4xl mx-auto text-center mb-8">
              Професионално проектиране и изграждане на покривни конструкции с качествени материали и 10 години гаранция.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8">
                <a href="tel:0884997659">
                  <Phone className="w-5 h-5 mr-2" />
                  Обадете се: 088 499 7659
                </a>
              </Button>
              <Button asChild size="lg" className="bg-transparent border-2 border-white text-white hover:bg-white/20">
                <Link to="/контакти">Безплатна консултация</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Hero Image */}
        <section className="relative h-[400px] md:h-[500px]">
          <img 
            src={roofFrameConstruction} 
            alt="Изграждане на нов керемиден покрив във Варна - професионален монтаж на покривна конструкция"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
          <div className="absolute bottom-8 left-0 right-0 text-center">
            <p className="text-foreground text-lg font-medium">Изграждаме покриви с внимание към детайла и дългогодишна гаранция</p>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto prose prose-lg">
              <h2 className="text-3xl font-bold text-foreground mb-6">Професионално изграждане на нови покриви</h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                Покривът е една от най-важните части на всяка сграда. Той защитава дома ви от атмосферните влияния, осигурява топлоизолация и определя архитектурния облик на сградата. Изборът на правилна покривна конструкция и качествено изпълнение са от критично значение за комфорта и безопасността на живеещите.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                <strong className="text-foreground">RemontNaPokriviVarna</strong> предлага цялостни решения за изграждане на нови покриви - от първоначалното проектиране до финалното приемане. Нашият опитен екип от дърводелци, покривачи и изолатори работи синхронно, за да осигури бързо и качествено изпълнение на всеки проект.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Специализирани сме в керемидени, метални и плоски покриви за жилищни, търговски и промишлени сгради. Използваме материали от водещи производители с дългогодишна гаранция. Предлагаме безплатен оглед, проектиране и детайлна оферта без скрити разходи.
              </p>
            </div>
          </div>
        </section>

        {/* Roof Constructions */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">Видове покривни конструкции</h2>
              <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
                Всеки тип покривна конструкция има своите предимства и е подходящ за различни архитектурни решения
              </p>
              <div className="space-y-8">
                {roofConstructions.map((construction, index) => (
                  <Card key={index} className="border-border overflow-hidden">
                    <CardContent className="p-6 md:p-8">
                      <div className="flex items-start gap-4 mb-4">
                        <Home className="w-10 h-10 text-primary flex-shrink-0" />
                        <div>
                          <h3 className="text-2xl font-semibold text-card-foreground mb-3">{construction.title}</h3>
                          <p className="text-muted-foreground leading-relaxed mb-4">{construction.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {construction.features.map((feature, i) => (
                              <span key={i} className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
                                <CheckCircle className="w-4 h-4" />
                                {feature}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
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
                Процес на изграждане на нов покрив
              </h2>
              <p className="text-muted-foreground text-center mb-12 max-w-3xl mx-auto">
                Прозрачен и организиран процес на всеки етап от строителството
              </p>
              <div className="space-y-12">
                {buildProcess.map((step, index) => (
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
              <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Какво включва услугата?</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {services.map((service, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 rounded-lg bg-card border border-border">
                    <Home className="w-6 h-6 text-accent flex-shrink-0 mt-0.5" />
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
                Материали за нови покриви
              </h2>
              <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
                Работим само с качествени материали от доказани производители с дългогодишна гаранция
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                {materials.map((material, index) => (
                  <Card key={index} className="border-border">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <Layers className="w-8 h-8 text-primary flex-shrink-0" />
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

        {/* Roof Types & Pricing */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-foreground text-center mb-4">Видове покриви и ориентировъчни цени</h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              Цените включват материали и труд. Точната стойност се определя след проектиране.
            </p>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {roofTypes.map((type, index) => (
                <Card key={index} className="border-border bg-card">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-card-foreground mb-3">{type.title}</h3>
                    <p className="text-muted-foreground mb-4">{type.description}</p>
                    <p className="text-2xl font-bold text-primary">{type.price}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Service Areas */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">
                Район на обслужване
              </h2>
              <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
                Изграждаме нови покриви в цялата Варненска област
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
                  title="Карта на Варна - район на обслужване за изграждане на нови покриви"
                />
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">
                Често задавани въпроси
              </h2>
              <p className="text-muted-foreground text-center mb-12">
                Отговори на най-честите въпроси за изграждане на нов покрив
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
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Планирате нов покрив?</h2>
            <p className="text-xl text-primary-foreground/90 mb-4 max-w-2xl mx-auto">
              Обадете се за безплатна консултация и оглед. Ще ви помогнем да изберете най-доброто решение за вашия дом.
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

export default NewRoofPage;