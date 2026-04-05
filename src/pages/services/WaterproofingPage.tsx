import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCallButton from "@/components/FloatingCallButton";
import RelatedServices from "@/components/RelatedServices";
import LearnMoreLinks from "@/components/LearnMoreLinks";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { CheckCircle, Droplets, Shield, Clock, Phone, MapPin, AlertTriangle, Search, Layers, Thermometer } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useTranslation } from "react-i18next";
import { useLocalizedPath } from "@/hooks/useLocalizedPath";

// Process images - Bituminous waterproofing
import roofSurfacePrep from "@/assets/process/waterproofing-bitumen-membrane-roll-01.jpg";
import waterproofingPrimer from "@/assets/process/waterproofing-bitumen-torch-closeup-01.jpg";
import waterproofingTorch from "@/assets/process/waterproofing-bitumen-torch-terrace-01.jpg";
import waterproofingDetail from "@/assets/process/waterproofing-bitumen-torch-welding-01.jpg";
import waterproofingSecondLayer from "@/assets/process/waterproofing-bitumen-torch-winter-01.jpg";
import completedFlatRoof from "@/assets/process/waterproofing-membrane-rolls-terrace-01.jpg";

const WaterproofingPage = () => {
  const { t } = useTranslation();
  const { getPath } = useLocalizedPath();

  const relatedServices = [
    { title: t('nav.flatRoof'), description: t('services.flatRoof.problem'), href: getPath('flatRoof') },
    { title: t('nav.leakRepair'), description: t('services.leakRepair.problem'), href: getPath('leakRepair') },
    { title: t('nav.maintenance'), description: t('services.maintenance.problem'), href: getPath('maintenance') },
  ];

  const learnMoreLinks = [
    { title: "Видове хидроизолация - пълно ръководство", href: `${getPath('blog' as any)}/видове-хидроизолация-и-кога-да-изберем-всяка` },
    { title: "Най-честите грешки при покривни ремонти", href: `${getPath('blog' as any)}/най-честите-грешки-при-покривни-ремонти` },
  ];
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
      image: roofSurfacePrep,
      imageAlt: "Подготовка на покривна повърхност за хидроизолация във Варна - почистване и грундиране"
    },
    {
      step: 2,
      title: "Нанасяне на грунд",
      description: "Грундът е критичен за адхезията на хидроизолацията към основата. Използваме битумен праймер или специализиран грунд в зависимост от типа хидроизолация. Нанасяме равномерно с валяк или четка, като осигуряваме пълно покритие. Изчакваме пълно изсъхване преди следващата стъпка.",
      image: waterproofingPrimer,
      imageAlt: "Нанасяне на битумен грунд върху покрив преди хидроизолация - професионална работа Варна"
    },
    {
      step: 3,
      title: "Полагане на първи слой хидроизолация",
      description: "При битумна хидроизолация полагаме първия слой с газова горелка, като загряваме ролката и я разточваме върху повърхността. Осигуряваме минимално застъпване от 10 см между платна. При PVC мембрана използваме топъл въздух за заваряване на шевовете.",
      image: waterproofingTorch,
      imageAlt: "Полагане на битумна хидроизолация с горелка - първи слой на плосък покрив Варна"
    },
    {
      step: 4,
      title: "Обработка на детайли и примиквания",
      description: "Детайлите са критични точки за течове. Обработваме внимателно всички връзки с вертикални стени, около комини, водосточни фунии и вентилации. Използваме допълнителни усилващи ленти и течна хидроизолация за максимална защита.",
      image: waterproofingDetail,
      imageAlt: "Обработка на детайли при хидроизолация - примикване към комин и вертикална стена"
    },
    {
      step: 5,
      title: "Полагане на втори слой (при двуслойна система)",
      description: "За максимална защита препоръчваме двуслойна хидроизолация. Вторият слой се полага перпендикулярно на първия, като шевовете не се застъпват. Това осигурява двойна защита срещу проникване на вода дори при локално увреждане.",
      image: waterproofingSecondLayer,
      imageAlt: "Полагане на втори слой хидроизолация на плосък покрив - двуслойна система Варна"
    },
    {
      step: 6,
      title: "Финална проверка и защитен слой",
      description: "След полагане извършваме визуална проверка на всички шевове и детайли. При необходимост провеждаме воден тест за проверка на водонепропускливостта. Нанасяме защитно покритие (UV защита за битумна изолация или топ-лак за PVC) за удължаване живота на хидроизолацията.",
      image: completedFlatRoof,
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
      question: "Колко струва хидроизолацията на покрив?",
      answer: "Цената зависи от избрания тип материал, квадратурата и състоянието на основата. Ориентировъчните цени за труд и материали: битумна еднослойна хидроизолация — от 14 €/кв.м, двуслойна битумна — от 18–22 €/кв.м, PVC мембрана — от 23–28 €/кв.м, течна полиуретанова хидроизолация — от 18–24 €/кв.м. При покрив на блок от 500 кв.м двуслойна битумна хидроизолация излиза приблизително 9 000–11 000 €. При 100 кв.м жилищен покрив — 1 400–2 500 € в зависимост от материала. Препоръчваме да не избирате по цена на парче — некачествената хидроизолация коства многократно повече за ремонт след 5 години."
    },
    {
      question: "Колко дълго издържа хидроизолацията?",
      answer: "Продължителността зависи от типа материал, качеството на монтажа и климатичните условия. Битумната хидроизолация с APP или SBS модификация издържа средно 15–25 години. PVC мембраните имат живот от 25–35 години при правилен монтаж. EPDM каучуковите мембрани са сред най-дълготрайните и могат да издържат 40–50+ години. Варненският климат с морска влага и силно UV облъчване може да ускори стареенето на нискокачествените материали. Затова ние работим само с продукти от утвърдени европейски производители — Icopal, Sika Sarnafil, IKO — с доказана издръжливост в морски условия."
    },
    {
      question: "Може ли да се полага нова хидроизолация върху старата?",
      answer: "Да, в редица случаи е възможно и технически допустимо полагането на нов хидроизолационен слой директно върху съществуващия. Условието е старата хидроизолация да е добре залепена към основата, без надутини, отлепвания или разслоявания. Ако старата мембрана е компрометирана — с балончета, пукнатини по цялото платно или е напълно загубила еластичността си — задължително трябва да се демонтира. Полагането върху некачествена основа е честа причина за неуспешна хидроизолация. При нашите огледи оценяваме точно дали е необходим демонтаж или може да се работи върху съществуващото."
    },
    {
      question: "Каква е разликата между еднослойна и двуслойна хидроизолация?",
      answer: "Двуслойната битумна система осигурява двойна защита — дори ако горният слой получи локална повреда, долният продължава да предпазва покрива от течове. Тя е задължителен стандарт за плоски покриви на жилищни и търговски сгради, където водата се задържа по-дълго. Еднослойната хидроизолация може да е достатъчна за скатни покриви с добър наклон над 15° или при PVC мембрани, чиято технология осигурява монолитно покритие без слаби точки. За повечето плоски покриви и тераси ние препоръчваме двуслойна система за максимална надеждност и по-дълъг гаранционен срок."
    },
    {
      question: "Може ли да се полага хидроизолация при студено или влажно време?",
      answer: "Битумната хидроизолация изисква минимум +5°C за правилно залягане и адхезия. При по-ниски температури битумът не омеква достатъчно и се получават лоши съединения. PVC мембраните технически могат да се заваряват до -5°C, но и при тях препоръчваме работа в по-благоприятни условия. Влажното или дъждовно време е абсолютно неподходящо за хидроизолационни работи — водата под мембраната причинява надутини и загуба на адхезия. Затова планираме хидроизолационни обекти в подходящи метеорологични прозорци, а при аварии поставяме временна защита до настъпване на добри условия."
    },
    {
      question: "Нужна ли е топлоизолация заедно с хидроизолацията?",
      answer: "Хидроизолацията и топлоизолацията са две различни, но взаимосвързани системи. Хидроизолацията предпазва от вода, а топлоизолацията — от загуба на топлина. При плоски покриви е силно препоръчително да се изпълняват заедно, тъй като мократа топлоизолация губи 70–80% от своята ефективност. Ако топлоизолацията е вече намокрена от течове, тя трябва задължително да се подмени преди или едновременно с новата хидроизолация. Ние предлагаме цялостни решения, включващи паробариер, топлоизолация и хидроизолация в единна система."
    },
    {
      question: "Издавате ли гаранция и договор за хидроизолацията?",
      answer: "Да, за всеки извършен хидроизолационен обект подписваме договор и издаваме данъчна фактура. В договора са описани подробно видовете работи, вложените материали с техните технически характеристики, срок на изпълнение, крайна цена и гаранционни условия. Стандартната ни гаранция е 5 години, а при премиум системи с PVC или EPDM — до 10 години. Производителите на материалите (Sika, Icopal, Firestone) издават отделни гаранционни сертификати за продукта, което допълнително защитава вашата инвестиция."
    },
    {
      question: "Работите ли в цяла Варна и областта?",
      answer: "Да, покриваме целия град Варна и Область Варна. Изпълняваме хидроизолационни обекти в Аксаково, Белослав, Девня, Провадия, Долни чифлик, Бяла и курортните комплекси Златни пясъци, Св. Константин и Камчия. Разполагаме с квалифицирани екипи и собствена техника, което ни позволява да приемаме обекти в целия регион на Североизточна България. За по-отдалечени места може да се начисли минимален транспортен разход, уточнен предварително в офертата."
    }
  ];

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Хидроизолация на покриви Варна",
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
      { "@type": "ListItem", "position": 1, "name": "Начало", "item": "https://www.remontnapokrivivarna.bg" },
      { "@type": "ListItem", "position": 2, "name": "Услуги", "item": "https://www.remontnapokrivivarna.bg/services" },
      { "@type": "ListItem", "position": 3, "name": "Хидроизолация", "item": "https://www.remontnapokrivivarna.bg/хидроизолация" }
    ]
  };

  return (
    <>
      <Helmet>
        <title>{t('pages.waterproofing.meta.title')}</title>
        <meta name="description" content="Професионална хидроизолация. Битумна, PVC мембрана, течна. До 10 години гаранция. Безплатен оглед. ☎ 088 499 7659" />
        <meta property="og:title" content="Хидроизолация Покрив Варна - от 28лв/кв.м | 10г Гаранция" />
        <meta property="og:description" content="Професионална хидроизолация. Битумна, PVC мембрана, течна. До 10 години гаранция. Безплатен оглед. ☎ 088 499 7659" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.remontnapokrivivarna.bg/bg/хидроизолация" />
        <meta property="og:image" content="https://www.remontnapokrivivarna.bg/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="bg_BG" />
        <meta property="og:site_name" content="Ремонт на Покриви Варна" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Хидроизолация Покрив Варна - от 28лв/кв.м | 10г Гаранция" />
        <meta name="twitter:description" content="Професионална хидроизолация. Битумна, PVC мембрана, течна. До 10 години гаранция. Безплатен оглед." />
        <meta name="twitter:image" content="https://www.remontnapokrivivarna.bg/og-image.jpg" />
        <meta name="keywords" content="хидроизолация покрив варна, хидроизолация цена варна, битумна хидроизолация варна, PVC мембрана покрив, течна хидроизолация" />
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
              <Link to={getPath('home')} className="hover:text-primary-foreground">{t('pages.waterproofing.breadcrumb.home')}</Link>
              <span className="mx-2">/</span>
              <Link to={getPath('services')} className="hover:text-primary-foreground">{t('pages.waterproofing.breadcrumb.services')}</Link>
              <span className="mx-2">/</span>
              <span className="text-primary-foreground">{t('pages.waterproofing.breadcrumb.current')}</span>
            </nav>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-center">
              {t('pages.waterproofing.hero.title')}
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-4xl mx-auto text-center mb-8">
              {t('pages.waterproofing.hero.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8">
                <a href="tel:0884997659">
                  <Phone className="w-5 h-5 mr-2" />
                  {t('pages.waterproofing.hero.callBtn')}
                </a>
              </Button>
              <Button asChild size="lg" className="bg-transparent border-2 border-white text-white hover:bg-white/20">
                <Link to={getPath('contact')}>{t('pages.waterproofing.hero.inspectionBtn')}</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Hero Image */}
        <section className="relative h-[400px] md:h-[500px]">
          <img 
            src={waterproofingTorch} 
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
              <h2 className="text-3xl font-bold text-foreground mb-6">{t('pages.waterproofing.intro.title')}</h2>
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
              <Accordion type="single" collapsible className="space-y-3">
                {faqs.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`faq-${index}`}
                    className="bg-card border border-border rounded-xl px-6"
                  >
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

        {/* CTA */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Нуждаете се от хидроизолация?</h2>
            <p className="text-xl text-primary-foreground/90 mb-4 max-w-2xl mx-auto">
              Не чакайте да се появят течове. Обадете се за безплатен оглед и професионална консултация.
            </p>
            <p className="text-2xl font-bold mb-8">
              ☎ 088 499 7659
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8">
                <a href="tel:+359884997659">Обадете се сега</a>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
                <Link to={getPath('contact')}>{t('pages.waterproofing.cta.inquiryBtn')}</Link>
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

export default WaterproofingPage;