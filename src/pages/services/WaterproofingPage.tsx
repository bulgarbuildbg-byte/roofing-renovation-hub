import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCallButton from "@/components/FloatingCallButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { CheckCircle, Droplets, Shield, Clock, Phone, MapPin, AlertTriangle, Search, Layers, Thermometer } from "lucide-react";

const WaterproofingPage = () => {
  const services = [
    "Битумна хидроизолация",
    "PVC мембрани",
    "Течна хидроизолация",
    "Хидроизолация на плоски покриви",
    "Хидроизолация на скатни покриви",
    "Хидроизолация на тераси и балкони",
    "Ремонт на стара хидроизолация"
  ];

  const types = [
    {
      title: "Битумна хидроизолация",
      description: "Традиционно решение с доказана надеждност. Подходяща за повечето видове покриви.",
      price: "от 14 €/кв.м"
    },
    {
      title: "PVC мембрана",
      description: "Модерно и дълготрайно решение. Идеална за плоски покриви и търговски сгради.",
      price: "от 20 €/кв.м"
    },
    {
      title: "Течна хидроизолация",
      description: "Перфектна за труднодостъпни места, около комини и детайли.",
      price: "от 16 €/кв.м"
    }
  ];

  const whyWaterproofing = [
    {
      title: "Щети от влага и течове",
      description: "Проникването на вода в сградата причинява мокри петна, рушене на мазилка, повреда на електрически инсталации и мебели. Един незабелязан теч може да причини щети за хиляди левове."
    },
    {
      title: "Мухъл и здравословни рискове",
      description: "Влажните среди са идеални за развитие на мухъл и плесени, които отделят спори, вредни за здравето. Особено опасни са за деца, възрастни хора и хора с респираторни проблеми."
    },
    {
      title: "Увреждане на конструкцията",
      description: "Продължителното въздействие на влагата причинява корозия на армировката в бетона, гниене на дървени елементи и разрушаване на строителните материали, компрометирайки безопасността на сградата."
    },
    {
      title: "Намалена енергийна ефективност",
      description: "Мократа изолация губи своите топлоизолационни свойства, което води до по-високи сметки за отопление и охлаждане. Добрата хидроизолация пази и топлоизолацията."
    }
  ];

  const waterproofingProcess = [
    {
      step: 1,
      title: "Подготовка на повърхността",
      description: "Първата и може би най-важната стъпка е правилната подготовка на основата. Почистваме повърхността от прах, мръсотия, мъхове и стара разрушена хидроизолация. Запълваме пукнатини и неравности със специална смес. При бетонни покриви третираме повърхността с антипраймер.",
      image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
      imageAlt: "Подготовка на покривна повърхност за хидроизолация във Варна - почистване и грундиране"
    },
    {
      step: 2,
      title: "Нанасяне на грунд",
      description: "Грундът е критичен за адхезията на хидроизолацията към основата. Използваме битумен праймер или специализиран грунд в зависимост от типа хидроизолация. Нанасяме равномерно с валяк или четка, като осигуряваме пълно покритие. Изчакваме пълно изсъхване преди следващата стъпка.",
      image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800&q=80",
      imageAlt: "Нанасяне на битумен грунд върху покрив преди хидроизолация - професионална работа Варна"
    },
    {
      step: 3,
      title: "Полагане на първи слой хидроизолация",
      description: "При битумна хидроизолация полагаме първия слой с газова горелка, като загряваме ролката и я разточваме върху повърхността. Осигуряваме минимално застъпване от 10 см между платна. При PVC мембрана използваме топъл въздух за заваряване на шевовете.",
      image: "https://images.unsplash.com/photo-1635424710928-0544e8512eae?w=800&q=80",
      imageAlt: "Полагане на битумна хидроизолация с горелка - първи слой на плосък покрив Варна"
    },
    {
      step: 4,
      title: "Обработка на детайли и примиквания",
      description: "Детайлите са критични точки за течове. Обработваме внимателно всички връзки с вертикални стени, около комини, водосточни фунии и вентилации. Използваме допълнителни усилващи ленти и течна хидроизолация за максимална защита.",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
      imageAlt: "Обработка на детайли при хидроизолация - примикване към комин и вертикална стена"
    },
    {
      step: 5,
      title: "Полагане на втори слой (при двуслойна система)",
      description: "За максимална защита препоръчваме двуслойна хидроизолация. Вторият слой се полага перпендикулярно на първия, като шевовете не се застъпват. Това осигурява двойна защита срещу проникване на вода дори при локално увреждане.",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
      imageAlt: "Полагане на втори слой хидроизолация на плосък покрив - двуслойна система Варна"
    },
    {
      step: 6,
      title: "Финална проверка и защитен слой",
      description: "След полагане извършваме визуална проверка на всички шевове и детайли. При необходимост провеждаме воден тест за проверка на водонепропускливостта. Нанасяме защитно покритие (UV защита за битумна изолация или топ-лак за PVC) за удължаване живота на хидроизолацията.",
      image: "https://images.unsplash.com/photo-1632759145351-1d592919f522?w=800&q=80",
      imageAlt: "Завършена хидроизолация на покрив във Варна - финална проверка и защитно покритие"
    }
  ];

  const materials = [
    {
      title: "Модифициран битум (APP и SBS)",
      description: "Най-популярният материал за хидроизолация в България. APP (атактичен полипропилен) е подходящ за топъл климат, издържа на високи температури и UV лъчение. SBS (стирен-бутадиен-стирен) е по-еластичен и подходящ за студен климат. Работим с марки като IKO, Icopal, Siplast и Katepal.",
      features: ["Живот 15-25 години", "Отлична устойчивост на UV", "Икономично решение", "Лесен за ремонт"]
    },
    {
      title: "PVC мембрани",
      description: "Модерно и високотехнологично решение за хидроизолация. PVC мембраните са изключително еластични, устойчиви на химикали и UV лъчение. Заваряват се с горещ въздух, създавайки монолитно покритие без слаби точки. Идеални за търговски и индустриални сгради.",
      features: ["Живот 25-30+ години", "Отлична химическа устойчивост", "Екологично решение", "Възможност за зелен покрив"]
    },
    {
      title: "Течна хидроизолация (полиуретанова)",
      description: "Иновативно безшевно решение, особено подходящо за сложни форми и труднодостъпни места. Нанася се с четка, валяк или пръскане, създавайки еластичен водонепропусклив филм. Перфектна за тераси, балкони и детайли около проходки.",
      features: ["Безшевно покритие", "Висока еластичност", "Бързо приложение", "Възможност за оцветяване"]
    },
    {
      title: "EPDM каучукови мембрани",
      description: "Синтетичен каучук с изключителна дълготрайност и устойчивост на екстремни температури. EPDM мембраните са идеални за плоски покриви с голяма площ. Лесни за инсталиране и практически не изискват поддръжка.",
      features: ["Живот 40+ години", "Устойчивост от -40°C до +120°C", "Екологично чист", "Минимална поддръжка"]
    }
  ];

  const roofTypes = [
    {
      title: "Плоски покриви на жилищни сгради",
      description: "Плоските покриви на панелни блокове и жилищни сгради изискват специално внимание. Препоръчваме двуслойна битумна хидроизолация с минимална дебелина 4+4 мм или еднослойна PVC мембрана с дебелина минимум 1.5 мм. Важно е да се осигури правилен наклон за оттичане на водата."
    },
    {
      title: "Покриви на търговски обекти",
      description: "За търговски и индустриални сгради препоръчваме PVC или TPO мембрани поради тяхната дълготрайност и минимална поддръжка. При наличие на отоплително/охладително оборудване на покрива, мембраните осигуряват по-добра устойчивост на механични натоварвания."
    },
    {
      title: "Тераси и балкони",
      description: "Терасите и балконите изискват специална хидроизолация, която да издържа на пешеходен трафик. Използваме течна полиуретанова хидроизолация или специализирани системи с финишно покритие от плочки или декинг. Осигуряваме правилни наклони и водоотвеждане."
    },
    {
      title: "Мазета и основи",
      description: "Хидроизолацията на подземни части предпазва от проникване на подпочвени води и капилярна влага. Използваме комбинация от битумна хидроизолация, бентонитови мати и дренажни системи в зависимост от хидрогеоложките условия."
    }
  ];

  const serviceAreas = [
    { area: "Варна център", neighborhoods: ["Централен район", "Одесос", "Морска градина"] },
    { area: "Варна квартали", neighborhoods: ["кв. Бриз", "кв. Чайка", "кв. Левски", "кв. Аспарухово", "кв. Владиславово", "кв. Младост", "кв. Възраждане"] },
    { area: "Околни селища", neighborhoods: ["Аксаково", "Белослав", "Девня", "Златни пясъци", "Св. Константин", "Виница"] }
  ];

  const faqs = [
    {
      question: "Колко време издържа хидроизолацията?",
      answer: "Продължителността зависи от типа материал и условията. Битумната хидроизолация издържа 15-25 години, PVC мембраните 25-30 години, а EPDM може да достигне 40+ години при правилна инсталация и минимална поддръжка."
    },
    {
      question: "Може ли да се полага хидроизолация през зимата?",
      answer: "Битумната хидроизолация може да се полага при температури над 5°C. При по-ниски температури битумът става крехък и не се залепва правилно. PVC мембраните могат да се заваряват до -5°C, но препоръчваме работа при по-високи температури за оптимален резултат."
    },
    {
      question: "Трябва ли да премахна старата хидроизолация?",
      answer: "Зависи от състоянието ѝ. Ако старата изолация е здрава и добре залепена, новата може да се положи отгоре. Ако е надута, напукана или отлепена, трябва да се премахне. При съмнение винаги е по-добре да се премахне старият слой."
    },
    {
      question: "Каква е разликата между еднослойна и двуслойна хидроизолация?",
      answer: "Двуслойната система осигурява двойна защита - ако единият слой се повреди, другият продължава да предпазва от течове. Препоръчва се за плоски покриви, където водата се задържа по-дълго. Еднослойна изолация е достатъчна за скатни покриви с добър наклон."
    },
    {
      question: "Колко струва хидроизолацията на 100 кв.м покрив?",
      answer: "При битумна хидроизолация цената е около 1400-1800 € за 100 кв.м (материал и труд). За PVC мембрана бюджетът е 2000-2500 €. Цената зависи от състоянието на основата, достъпността и сложността на детайлите."
    }
  ];

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Хидроизолация на покриви Варна",
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
      { "@type": "Place", "name": "Белослав" }
    ],
    "description": "Професионална хидроизолация на покриви във Варна - битумна, PVC мембрана, течна хидроизолация. 5 години гаранция.",
    "offers": {
      "@type": "AggregateOffer",
      "lowPrice": "14",
      "highPrice": "20",
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
      { "@type": "ListItem", "position": 1, "name": "Начало", "item": "https://remontnapokrivivarna.com" },
      { "@type": "ListItem", "position": 2, "name": "Услуги", "item": "https://remontnapokrivivarna.com/услуги" },
      { "@type": "ListItem", "position": 3, "name": "Хидроизолация", "item": "https://remontnapokrivivarna.com/хидроизолация" }
    ]
  };

  return (
    <>
      <Helmet>
        <title>Хидроизолация Покрив Варна - от 28лв | 10г</title>
        <meta name="description" content="Професионална хидроизолация. Битумна, PVC мембрана, течна. До 10 години гаранция. Безплатен оглед. ☎ 089 270 1176" />
        <meta name="keywords" content="хидроизолация покрив варна, хидроизолация цена варна, битумна хидроизолация варна, PVC мембрана покрив, течна хидроизолация" />
        <link rel="canonical" href="https://remontnapokrivivarna.com/хидроизолация" />
        <meta property="og:title" content="Хидроизолация Покрив Варна - от 28лв" />
        <meta property="og:description" content="Битумна, PVC, течна хидроизолация. 10г гаранция." />
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
              <span className="text-primary-foreground">Хидроизолация</span>
            </nav>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-center">
              Хидроизолация на покриви Варна
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-4xl mx-auto text-center mb-8">
              Професионална хидроизолация с качествени материали и 5 години гаранция. Защитете покрива си от влага, течове и атмосферни влияния.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8">
                <a href="tel:+359892701176">
                  <Phone className="w-5 h-5 mr-2" />
                  Обадете се: 089 270 1176
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
                <Link to="/контакти">Безплатен оглед</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Hero Image */}
        <section className="relative h-[400px] md:h-[500px]">
          <img 
            src="https://images.unsplash.com/photo-1635424710928-0544e8512eae?w=1920&q=80" 
            alt="Професионално полагане на хидроизолация на плосък покрив във Варна - работник с газова горелка"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
          <div className="absolute bottom-8 left-0 right-0 text-center">
            <p className="text-foreground text-lg font-medium">Качествена хидроизолация с материали от водещи европейски производители</p>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto prose prose-lg">
              <h2 className="text-3xl font-bold text-foreground mb-6">Какво е хидроизолация и защо е важна?</h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                Хидроизолацията е защитен слой, който предотвратява проникването на вода в покривната конструкция и сградата. Във Варна, с нейния влажен морски климат, интензивни валежи и силни ветрове, качествената хидроизолация е абсолютно необходима за всяка сграда.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                <strong className="text-foreground">RemontNaPokriviVarna</strong> предлага професионални хидроизолационни услуги за всички видове покриви - плоски, скатни, тераси и балкони. Нашият екип има дългогодишен опит в работата с различни хидроизолационни системи и материали.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Използваме само качествени материали от доказани производители като IKO, Icopal, Sika и Firestone. Всеки проект започва с безплатен оглед и детайлна оферта. Предлагаме 5 години гаранция за извършената работа, защото вярваме в качеството на нашите услуги.
              </p>
            </div>
          </div>
        </section>

        {/* Why Waterproofing */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">Защо е необходима хидроизолация?</h2>
              <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
                Липсата или лошото състояние на хидроизолацията води до сериозни проблеми за сградата и живеещите в нея
              </p>
              <div className="space-y-8">
                {whyWaterproofing.map((item, index) => (
                  <div key={index} className="bg-card rounded-xl p-6 shadow-sm border border-border">
                    <div className="flex items-start gap-4">
                      <AlertTriangle className="w-8 h-8 text-accent flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="text-xl font-semibold text-card-foreground mb-2">{item.title}</h3>
                        <p className="text-muted-foreground leading-relaxed">{item.description}</p>
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
                Процес на хидроизолация - Детайлно описание
              </h2>
              <p className="text-muted-foreground text-center mb-12 max-w-3xl mx-auto">
                Качествената хидроизолация изисква спазване на технология и внимание към детайлите на всеки етап
              </p>
              <div className="space-y-12">
                {waterproofingProcess.map((step, index) => (
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
              <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Видове хидроизолация</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {services.map((service, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 rounded-lg bg-card border border-border">
                    <Droplets className="w-6 h-6 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-card-foreground">{service}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Materials Authority Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">
                Видове хидроизолационни материали
              </h2>
              <p className="text-muted-foreground text-center mb-12 max-w-3xl mx-auto">
                Изборът на правилния материал е ключов за дълготрайността на хидроизолацията. Ето подробна информация за материалите, с които работим.
              </p>
              <div className="space-y-8">
                {materials.map((material, index) => (
                  <Card key={index} className="border-border overflow-hidden">
                    <CardContent className="p-6 md:p-8">
                      <div className="flex items-start gap-4 mb-4">
                        <Layers className="w-10 h-10 text-primary flex-shrink-0" />
                        <div>
                          <h3 className="text-2xl font-semibold text-card-foreground mb-3">{material.title}</h3>
                          <p className="text-muted-foreground leading-relaxed mb-4">{material.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {material.features.map((feature, i) => (
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

        {/* Roof Types */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">
                Хидроизолация по типове покриви
              </h2>
              <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
                Различните типове покриви изискват специфичен подход и материали
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                {roofTypes.map((type, index) => (
                  <Card key={index} className="border-border">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <Thermometer className="w-8 h-8 text-primary flex-shrink-0" />
                        <div>
                          <h3 className="text-xl font-semibold text-card-foreground mb-2">{type.title}</h3>
                          <p className="text-muted-foreground">{type.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Types & Pricing */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-foreground text-center mb-4">Методи и цени за хидроизолация</h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              Цените включват материал и труд. Точната стойност се определя след безплатен оглед.
            </p>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {types.map((type, index) => (
                <Card key={index} className="border-border bg-card">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-card-foreground mb-3">{type.title}</h3>
                    <p className="text-muted-foreground mb-4">{type.description}</p>
                    <p className="text-2xl font-bold text-primary">{type.price}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <p className="text-muted-foreground text-center mt-8">
              * Цените са ориентировъчни и могат да варират в зависимост от състоянието на покрива
            </p>
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
                Извършваме хидроизолация на покриви в целия град Варна и населените места в региона
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
                  title="Карта на Варна - район на обслужване за хидроизолация на покриви"
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
                Често задавани въпроси за хидроизолация
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
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Нуждаете се от хидроизолация?</h2>
            <p className="text-xl text-primary-foreground/90 mb-4 max-w-2xl mx-auto">
              Не чакайте да се появят течове. Обадете се за безплатен оглед и професионална консултация.
            </p>
            <p className="text-2xl font-bold mb-8">
              ☎ 089 270 1176
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8">
                <a href="tel:+359892701176">Обадете се сега</a>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
                <Link to="/контакти">Изпратете запитване</Link>
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

export default WaterproofingPage;