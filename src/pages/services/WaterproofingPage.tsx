import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCallButton from "@/components/FloatingCallButton";
import RelatedServices from "@/components/RelatedServices";
import LearnMoreLinks from "@/components/LearnMoreLinks";
import PriceCalculator from "@/components/PriceCalculator";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { CheckCircle, Droplets, Shield, Clock, Phone, MapPin, AlertTriangle, Search, Layers, Thermometer, Eye, Hammer, ClipboardCheck } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useTranslation } from "react-i18next";
import { useLocalizedPath } from "@/hooks/useLocalizedPath";

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
    "Битумна хидроизолация", "PVC мембрани", "Течна хидроизолация",
    "Хидроизолация на плоски покриви", "Хидроизолация на скатни покриви",
    "Хидроизолация на тераси и балкони", "Ремонт на стара хидроизолация"
  ];

  const types = [
    { title: "Битумна хидроизолация", description: "Традиционно решение с доказана надеждност. Подходяща за повечето видове покриви.", price: "от 14 €/кв.м" },
    { title: "PVC мембрана", description: "Модерно и дълготрайно решение. Идеална за плоски покриви и търговски сгради.", price: "от 20 €/кв.м" },
    { title: "Течна хидроизолация", description: "Перфектна за труднодостъпни места, около комини и детайли.", price: "от 16 €/кв.м" }
  ];

  const whyWaterproofing = [
    { title: "Щети от влага и течове", description: "Проникването на вода в сградата причинява мокри петна, рушене на мазилка, повреда на електрически инсталации и мебели." },
    { title: "Мухъл и здравословни рискове", description: "Влажните среди са идеални за развитие на мухъл и плесени, които отделят спори, вредни за здравето." },
    { title: "Увреждане на конструкцията", description: "Продължителното въздействие на влагата причинява корозия на армировката и гниене на дървени елементи." },
    { title: "Намалена енергийна ефективност", description: "Мократа изолация губи своите топлоизолационни свойства, което води до по-високи сметки." }
  ];

  const consequences = [
    { title: "По-големи и скъпи щети", description: "Малък теч днес може да стане наводнение утре — мократа изолация и гнилите конструкции струват многократно повече." },
    { title: "Риск за конструкцията на сградата", description: "Продължителната влага корозира арматурата в бетона и разрушава дървените елементи на покрива." },
    { title: "Мухъл и здравословни проблеми", description: "Влажната среда е идеална за мухъл и плесени — вредни за дихателната система, особено за деца и възрастни." },
    { title: "Загуба на енергийна ефективност", description: "Мократа топлоизолация губи до 80% от ефективността си, увеличавайки значително сметките за отопление." },
  ];

  const solutionSteps = [
    { title: "Детайлна инспекция", description: "Откриваме точните проблемни зони с визуален и технически оглед." },
    { title: "Професионална подготовка", description: "Почистваме и подготвяме основата за максимална адхезия на материалите." },
    { title: "Качествени материали", description: "Работим само с доказани марки — IKO, Icopal, Sika, Firestone." },
    { title: "Прецизен монтаж", description: "Спазваме всички технологични изисквания за дълготраен и надежден резултат." },
  ];

  const quickProcess = [
    { icon: Phone, title: "Свързване", description: "Обадете се или изпратете запитване" },
    { icon: Search, title: "Оглед", description: "Безплатен оглед на място" },
    { icon: ClipboardCheck, title: "Оферта", description: "Детайлна оферта без задължение" },
    { icon: Hammer, title: "Изпълнение", description: "Качествен монтаж с гаранция" },
  ];

  const waterproofingProcess = [
    { step: 1, title: "Подготовка на повърхността", description: "Първата и може би най-важната стъпка е правилната подготовка на основата. Почистваме повърхността от прах, мръсотия, мъхове и стара разрушена хидроизолация.", image: roofSurfacePrep, imageAlt: "Подготовка на покривна повърхност за хидроизолация във Варна" },
    { step: 2, title: "Нанасяне на грунд", description: "Грундът е критичен за адхезията на хидроизолацията към основата. Използваме битумен праймер или специализиран грунд.", image: waterproofingPrimer, imageAlt: "Нанасяне на битумен грунд върху покрив преди хидроизолация" },
    { step: 3, title: "Полагане на първи слой хидроизолация", description: "При битумна хидроизолация полагаме първия слой с газова горелка. Осигуряваме минимално застъпване от 10 см между платна.", image: waterproofingTorch, imageAlt: "Полагане на битумна хидроизолация с горелка" },
    { step: 4, title: "Обработка на детайли и примиквания", description: "Детайлите са критични точки за течове. Обработваме внимателно всички връзки с вертикални стени, около комини и вентилации.", image: waterproofingDetail, imageAlt: "Обработка на детайли при хидроизолация" },
    { step: 5, title: "Полагане на втори слой", description: "За максимална защита препоръчваме двуслойна хидроизолация. Вторият слой се полага перпендикулярно на първия.", image: waterproofingSecondLayer, imageAlt: "Полагане на втори слой хидроизолация" },
    { step: 6, title: "Финална проверка и защитен слой", description: "След полагане извършваме визуална проверка на всички шевове и детайли. При необходимост провеждаме воден тест.", image: completedFlatRoof, imageAlt: "Завършена хидроизолация на покрив във Варна" }
  ];

  const materials = [
    { title: "Модифициран битум (APP и SBS)", description: "Най-популярният материал за хидроизолация в България. Работим с марки като IKO, Icopal, Siplast и Katepal.", features: ["Живот 15-25 години", "Отлична устойчивост на UV", "Икономично решение", "Лесен за ремонт"] },
    { title: "PVC мембрани", description: "Модерно и високотехнологично решение. Заваряват се с горещ въздух, създавайки монолитно покритие.", features: ["Живот 25-30+ години", "Отлична химическа устойчивост", "Екологично решение", "Възможност за зелен покрив"] },
    { title: "Течна хидроизолация (полиуретанова)", description: "Иновативно безшевно решение, особено подходящо за сложни форми и труднодостъпни места.", features: ["Безшевно покритие", "Висока еластичност", "Бързо приложение", "Възможност за оцветяване"] },
    { title: "EPDM каучукови мембрани", description: "Синтетичен каучук с изключителна дълготрайност и устойчивост на екстремни температури.", features: ["Живот 40+ години", "Устойчивост от -40°C до +120°C", "Екологично чист", "Минимална поддръжка"] }
  ];

  const roofTypes = [
    { title: "Плоски покриви на жилищни сгради", description: "Препоръчваме двуслойна битумна хидроизолация с минимална дебелина 4+4 мм или еднослойна PVC мембрана с дебелина минимум 1.5 мм." },
    { title: "Покриви на търговски обекти", description: "За търговски и индустриални сгради препоръчваме PVC или TPO мембрани поради тяхната дълготрайност и минимална поддръжка." },
    { title: "Тераси и балкони", description: "Терасите и балконите изискват специална хидроизолация, която да издържа на пешеходен трафик." },
    { title: "Мазета и основи", description: "Хидроизолацията на подземни части предпазва от проникване на подпочвени води и капилярна влага." }
  ];

  const serviceAreas = [
    { area: "Варна център", neighborhoods: ["Централен район", "Одесос", "Морска градина"] },
    { area: "Варна квартали", neighborhoods: ["кв. Бриз", "кв. Чайка", "кв. Левски", "кв. Аспарухово", "кв. Владиславово", "кв. Младост", "кв. Възраждане"] },
    { area: "Околни селища", neighborhoods: ["Аксаково", "Белослав", "Девня", "Златни пясъци", "Св. Константин", "Виница"] }
  ];

  const faqs = [
    { question: "Колко струва хидроизолацията на покрив?", answer: "Цената зависи от избрания тип материал, квадратурата и състоянието на основата. Ориентировъчните цени: битумна еднослойна — от 14 €/кв.м, двуслойна битумна — от 18–22 €/кв.м, PVC мембрана — от 23–28 €/кв.м." },
    { question: "Колко дълго издържа хидроизолацията?", answer: "Битумната хидроизолация издържа средно 15–25 години. PVC мембраните имат живот от 25–35 години. EPDM каучуковите мембрани могат да издържат 40–50+ години." },
    { question: "Може ли да се полага нова хидроизолация върху старата?", answer: "Да, в редица случаи е възможно, ако старата хидроизолация е добре залепена към основата, без надутини или разслоявания." },
    { question: "Каква е разликата между еднослойна и двуслойна хидроизолация?", answer: "Двуслойната система осигурява двойна защита. Тя е задължителен стандарт за плоски покриви на жилищни и търговски сгради." },
    { question: "Може ли да се полага хидроизолация при студено време?", answer: "Битумната хидроизолация изисква минимум +5°C. PVC мембраните технически могат да се заваряват до -5°C." },
    { question: "Нужна ли е топлоизолация заедно с хидроизолацията?", answer: "При плоски покриви е силно препоръчително да се изпълняват заедно, тъй като мократа топлоизолация губи 70–80% от своята ефективност." },
    { question: "Издавате ли гаранция и договор?", answer: "Да, за всеки обект подписваме договор и издаваме данъчна фактура. Стандартната ни гаранция е 5 години, а при премиум системи — до 10 години." },
    { question: "Работите ли в цяла Варна и областта?", answer: "Да, покриваме целия град Варна и Област Варна — Аксаково, Белослав, Девня, Златни пясъци и др." }
  ];

  const schemaData = {
    "@context": "https://schema.org", "@type": "Service",
    "name": "Хидроизолация на покриви Варна",
    "provider": { "@type": "RoofingContractor", "name": "RemontNaPokriviVarna", "telephone": "+359884997659", "email": "remontnapokrivivarna@abv.bg", "address": { "@type": "PostalAddress", "streetAddress": "ул. Уста Колю Фичето 25 А", "addressLocality": "Варна", "addressCountry": "BG" } },
    "areaServed": [{ "@type": "City", "name": "Варна" }, { "@type": "Place", "name": "Аксаково" }, { "@type": "Place", "name": "Златни пясъци" }, { "@type": "Place", "name": "Белослав" }],
    "description": "Професионална хидроизолация на покриви във Варна - битумна, PVC мембрана, течна хидроизолация. 5 години гаранция.",
    "offers": { "@type": "AggregateOffer", "lowPrice": "14", "highPrice": "20", "priceCurrency": "EUR", "offerCount": "3" }
  };
  const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": faqs.map(faq => ({ "@type": "Question", "name": faq.question, "acceptedAnswer": { "@type": "Answer", "text": faq.answer } })) };
  const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Начало", "item": "https://www.remontnapokrivivarna.bg" },
    { "@type": "ListItem", "position": 2, "name": "Услуги", "item": "https://www.remontnapokrivivarna.bg/services" },
    { "@type": "ListItem", "position": 3, "name": "Хидроизолация", "item": "https://www.remontnapokrivivarna.bg/хидроизолация" }
  ]};

  return (
    <>
      <Helmet>
        <title>{t('pages.waterproofing.meta.title')}</title>
        <meta name="description" content="Професионална хидроизолация. Битумна, PVC мембрана, течна. До 10 години гаранция. Безплатен оглед. ☎ 088 499 7659" />
        <meta property="og:title" content="Хидроизолация Покрив Варна - от 28лв/кв.м | 10г Гаранция" />
        <meta property="og:description" content="Професионална хидроизолация. Битумна, PVC мембрана, течна. До 10 години гаранция. Безплатен оглед." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.remontnapokrivivarna.bg/bg/хидроизолация" />
        <meta property="og:image" content="https://www.remontnapokrivivarna.bg/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="bg_BG" />
        <meta property="og:site_name" content="Ремонт на Покриви Варна" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Хидроизолация Покрив Варна - от 28лв/кв.м | 10г Гаранция" />
        <meta name="twitter:description" content="Професионална хидроизолация. Битумна, PVC мембрана, течна. До 10 години гаранция." />
        <meta name="twitter:image" content="https://www.remontnapokrivivarna.bg/og-image.jpg" />
        <meta name="keywords" content="хидроизолация покрив варна, хидроизолация цена варна, битумна хидроизолация варна, PVC мембрана покрив, течна хидроизолация" />
        <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <Header />
      <main className="pt-20">
        {/* 1. HERO */}
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
            <div className="max-w-4xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">{t('pages.waterproofing.hero.title')}</h1>
              <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-3xl mb-8">{t('pages.waterproofing.hero.subtitle')}</p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8">
                  <Link to={getPath('contact')}><Eye className="w-5 h-5 mr-2" />Заяви безплатен оглед</Link>
                </Button>
                <Button asChild size="lg" className="bg-transparent border-2 border-white text-white hover:bg-white/20">
                  <a href="tel:0884997659"><Phone className="w-5 h-5 mr-2" />Обади се сега</a>
                </Button>
              </div>
              <div className="flex flex-wrap gap-4 text-sm">
                {["Безплатен оглед", "Работа по договор", "Гаранция за изпълнение", "Реални снимки от обекти"].map((item) => (
                  <div key={item} className="flex items-center gap-2 bg-primary-foreground/10 px-3 py-1.5 rounded-full">
                    <CheckCircle className="w-4 h-4 text-accent" />
                    <span className="text-primary-foreground/90">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 2. PROBLEM */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">Защо е необходима хидроизолация?</h2>
              <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">Липсата или лошото състояние на хидроизолацията води до сериозни проблеми</p>
              <div className="grid md:grid-cols-2 gap-6">
                {whyWaterproofing.map((item, index) => (
                  <Card key={index} className="border-border bg-card">
                    <CardContent className="p-6">
                      <AlertTriangle className="w-8 h-8 text-accent mb-3" />
                      <h3 className="text-lg font-semibold text-card-foreground mb-2">{item.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 3. CONSEQUENCES */}
        <section className="py-16 bg-destructive/5 border-y border-destructive/20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">Какво се случва, ако проблемът се отложи</h2>
              <p className="text-muted-foreground text-center mb-10 max-w-2xl mx-auto">Навременната хидроизолация предотвратява сериозни последствия</p>
              <div className="grid md:grid-cols-2 gap-6">
                {consequences.map((item, index) => (
                  <div key={index} className="flex items-start gap-4 p-5 bg-background rounded-xl border border-destructive/20">
                    <AlertTriangle className="w-6 h-6 text-destructive flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                      <p className="text-muted-foreground text-sm">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 4. SOLUTION */}
        <section className="py-16 bg-primary/5 border-b border-primary/20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">Как решаваме проблема</h2>
              <p className="text-muted-foreground text-center mb-10 max-w-2xl mx-auto">Професионален подход за дълготраен резултат</p>
              <div className="grid md:grid-cols-2 gap-6">
                {solutionSteps.map((item, index) => (
                  <div key={index} className="flex items-start gap-4 p-5 bg-background rounded-xl border border-primary/20">
                    <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                      <p className="text-muted-foreground text-sm">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 5. PROCESS */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">Как работим</h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">Прозрачен процес от първия контакт до завършения проект</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {quickProcess.map((step, index) => (
                <div key={index} className="text-center">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-primary/80 text-primary-foreground flex items-center justify-center mx-auto mb-4">
                    <step.icon className="w-6 h-6" />
                  </div>
                  <div className="text-sm font-bold text-muted-foreground mb-1">Стъпка {index + 1}</div>
                  <h3 className="font-semibold text-foreground mb-1">{step.title}</h3>
                  <p className="text-muted-foreground text-sm">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. MID CTA */}
        <section className="py-12 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Нуждаете се от хидроизолация?</h2>
            <p className="text-primary-foreground/90 mb-6 max-w-xl mx-auto">Не чакайте да се появят течове. Свържете се за безплатен оглед.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link to={getPath('contact')}>Заяви безплатен оглед</Link>
              </Button>
              <Button asChild size="lg" className="bg-transparent border-2 border-white text-white hover:bg-white/20">
                <a href="tel:0884997659"><Phone className="w-5 h-5 mr-2" />088 499 7659</a>
              </Button>
            </div>
          </div>
        </section>

        {/* 7. CALCULATOR */}
        <PriceCalculator />

        {/* 8. SERVICE DETAILS */}
        {/* Detailed Process */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">Процес на хидроизолация - Детайлно описание</h2>
              <p className="text-muted-foreground text-center mb-12 max-w-3xl mx-auto">Качествената хидроизолация изисква спазване на технология и внимание към детайлите</p>
              <div className="space-y-12">
                {waterproofingProcess.map((step, index) => (
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

        {/* Materials */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">Видове хидроизолационни материали</h2>
              <p className="text-muted-foreground text-center mb-12 max-w-3xl mx-auto">Изборът на правилния материал е ключов за дълготрайността на хидроизолацията</p>
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
                                <CheckCircle className="w-4 h-4" />{feature}
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
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">Хидроизолация по типове покриви</h2>
              <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">Различните типове покриви изискват специфичен подход</p>
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
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">Цените включват материал и труд. Точната стойност се определя след безплатен оглед.</p>
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
            <p className="text-muted-foreground text-center mt-8">* Цените са ориентировъчни и могат да варират</p>
          </div>
        </section>

        {/* 9. TRUST */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-4">Защо да изберете нас</h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">Доверете се на опита и професионализма</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              {["15+ години опит", "Работа по договор", "Реални обекти", "Член на КСБ"].map((item) => (
                <div key={item} className="flex items-center gap-2 justify-center p-3 bg-background rounded-lg border border-border">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Service Areas */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">Район на обслужване</h2>
              <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">Извършваме хидроизолация на покриви в целия град Варна и региона</p>
              <div className="grid md:grid-cols-3 gap-6 mb-12">
                {serviceAreas.map((area, index) => (
                  <Card key={index} className="border-border">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <MapPin className="w-5 h-5 text-primary" />
                        <h3 className="text-lg font-semibold text-card-foreground">{area.area}</h3>
                      </div>
                      <ul className="space-y-2">
                        {area.neighborhoods.map((n, i) => (<li key={i} className="text-muted-foreground text-sm">{n}</li>))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="rounded-xl overflow-hidden shadow-lg">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d186237.48652949!2d27.769646!3d43.2140504!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40a4538baaf3f2cd%3A0x5765bc39bc4f4c!2z0JLQsNGA0L3QsCwg0JHRitC70LPQsNGA0LjRjw!5e0!3m2!1sbg!2sbg!4v1702300000000!5m2!1sbg!2sbg" width="100%" height="400" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Карта на Варна - район на обслужване" />
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">Често задавани въпроси</h2>
              <p className="text-muted-foreground text-center mb-12">Отговори на най-честите въпроси от нашите клиенти</p>
              <Accordion type="single" collapsible className="space-y-3">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`faq-${index}`} className="bg-card border border-border rounded-xl px-6">
                    <AccordionTrigger className="text-left text-base font-semibold text-card-foreground hover:text-primary hover:no-underline py-5">{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-5 text-sm leading-relaxed">{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* 11. FINAL CTA */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Нуждаете се от хидроизолация?</h2>
            <p className="text-xl text-primary-foreground/90 mb-4 max-w-2xl mx-auto">Не чакайте да се появят течове. Обадете се за безплатен оглед.</p>
            <p className="text-2xl font-bold mb-8">☎ 088 499 7659</p>
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

export default WaterproofingPage;
