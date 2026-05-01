import { Helmet } from "react-helmet";
import heroWaterproofing from "@/assets/hero-waterproofing.jpeg";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CompletedProjects from "@/components/CompletedProjects";
import Testimonials from "@/components/Testimonials";
import PriceCalculator from "@/components/PriceCalculator";
import CalculatorDialog from "@/components/CalculatorDialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { CheckCircle, Droplets, Shield, Clock, Phone, AlertTriangle, Layers, Thermometer, Eye, Award, Building, FileCheck, Wrench, SprayCan, PaintBucket, CircleDot, Hammer } from "lucide-react";
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

  const waterproofingServices = [
    { icon: Layers, title: "Битумна хидроизолация", description: "Полагаме битумна хидроизолация за дълготрайна защита на плоски и скатни покриви." },
    { icon: SprayCan, title: "Течна хидроизолация", description: "Изпълняваме течна хидроизолация при сложни детайли, фуги и труднодостъпни зони." },
    { icon: Shield, title: "PVC мембрана", description: "Работим с PVC мембрани за надеждна защита на големи плоски покриви и тераси." },
    { icon: Wrench, title: "Локален ремонт на течове", description: "Откриваме проблемните участъци и правим частичен ремонт при течове и компрометирани зони." },
    { icon: PaintBucket, title: "Цялостна хидроизолация", description: "Изграждаме цялостна система, когато старият слой е амортизиран или компрометиран." },
    { icon: CircleDot, title: "Хидроизолация на плоски покриви и тераси", description: "Изпълняваме системи за плоски покриви, тераси и покривни плочи с правилно отводняване." },
  ];

  const types = [
    { title: "Битумна хидроизолация", description: "Традиционно решение с доказана надеждност. Подходяща за повечето видове покриви.", price: "от 14 €/м²" },
    { title: "Течна хидроизолация", description: "Перфектна за труднодостъпни места, около комини и детайли.", price: "от 16 €/м²" },
    { title: "PVC мембрана", description: "Модерно и дълготрайно решение. Идеална за плоски покриви и търговски сгради.", price: "от 20 €/м²" },
  ];

  const whyChooseUs = [
    { icon: Shield, title: "Работа по ясна технология", description: "Спазваме стриктно технологичните изисквания за всеки вид хидроизолация." },
    { icon: Award, title: "Качествени материали", description: "Работим с доказани марки — IKO, Icopal, Sika, Firestone." },
    { icon: Eye, title: "Безплатен оглед до 24 часа", description: "Посещаваме обекта и даваме конкретна оценка без ангажимент." },
    { icon: FileCheck, title: "Писмена гаранция", description: "Предоставяме 15 години писмена гаранция за изпълнението." },
    { icon: Building, title: "Реални снимки от обекти", description: "Показваме реални проекти от нашата работа — без stock снимки." },
    { icon: Hammer, title: "Опит с различни видове покриви", description: "Плоски, скатни, тераси, промишлени — имаме решение за всеки тип." },
  ];

  const processSteps = [
    { step: "01", title: "Свързвате се с нас", description: "Обаждате се или изпращате запитване от формата за контакт." },
    { step: "02", title: "Правим оглед", description: "Посещаваме обекта и проверяваме откъде идва проблемът." },
    { step: "03", title: "Даваме конкретна оферта", description: "Получавате ясно предложение с обхват на работа и цена." },
    { step: "04", title: "Изпълняваме хидроизолацията", description: "Работим по договор, по технология и с качествени материали." },
    { step: "05", title: "Предаваме обекта с гаранция", description: "След завършване получавате писмена гаранция." },
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

  const faqs = [
    { question: "Колко струва хидроизолация на покрив?", answer: "Цената зависи от избрания тип материал, квадратурата и състоянието на основата. Ориентировъчните цени: битумна — от 14 €/м², течна — от 16 €/м², PVC мембрана — от 20 €/м²." },
    { question: "Колко дълго издържа хидроизолацията?", answer: "Битумната хидроизолация издържа средно 15–25 години. PVC мембраните имат живот от 25–35 години. EPDM каучуковите мембрани могат да издържат 40–50+ години." },
    { question: "Може ли да се полага нова хидроизолация върху старата?", answer: "Да, в редица случаи е възможно, ако старата хидроизолация е добре залепена към основата, без надутини или разслоявания." },
    { question: "Коя хидроизолация е най-подходяща?", answer: "Зависи от типа на покрива и бюджета. За плоски покриви — битумна или PVC мембрана. За сложни форми и детайли — течна. За максимална дълготрайност — EPDM." },
    { question: "Може ли да се полага хидроизолация при студено време?", answer: "Битумната хидроизолация изисква минимум +5°C. PVC мембраните технически могат да се заваряват до -5°C." },
    { question: "Давате ли гаранция?", answer: "Да, за всеки обект подписваме договор и издаваме данъчна фактура. Предоставяме 15 години писмена гаранция." },
    { question: "Работите ли при течащ покрив?", answer: "Да, при спешни случаи реагираме бързо. Правим локален ремонт на течове, а при необходимост — цялостна подмяна на хидроизолацията." },
    { question: "Подходяща ли е течната хидроизолация за тераса?", answer: "Да, течната хидроизолация е отлично решение за тераси — създава безшевно покритие и може да се оцвети." },
  ];

  const schemaData = {
    "@context": "https://schema.org", "@type": "Service",
    "name": "Хидроизолация на покриви Варна",
    "provider": { "@type": "RoofingContractor", "name": "RemontNaPokriviVarna", "telephone": "+359884997659", "email": "remontnapokrivivarna@abv.bg", "address": { "@type": "PostalAddress", "streetAddress": "ул. Уста Колю Фичето 25 А", "addressLocality": "Варна", "addressCountry": "BG" } },
    "areaServed": [{ "@type": "City", "name": "Варна" }, { "@type": "Place", "name": "Аксаково" }, { "@type": "Place", "name": "Златни пясъци" }, { "@type": "Place", "name": "Белослав" }],
    "description": "Професионална хидроизолация на покриви във Варна - битумна, PVC мембрана, течна хидроизолация. 15 години гаранция.",
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
        <title>Хидроизолация на Покриви Варна | Битумна, Течна, PVC | 15г Гаранция</title>
        <meta name="description" content="Професионална хидроизолация на покриви във Варна. Битумна, течна и PVC хидроизолация. Безплатен оглед до 24 часа. Писмена гаранция. ☎ 088 499 7659" />
        <meta property="og:title" content="Хидроизолация на Покриви Варна | 15г Гаранция" />
        <meta property="og:description" content="Професионална хидроизолация на покриви във Варна. Битумна, течна и PVC. 15 години гаранция. Безплатен оглед." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.remontnapokrivivarna.bg/bg/hidroizolacia-na-pokriv" />
        <meta property="og:image" content="https://www.remontnapokrivivarna.bg/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="bg_BG" />
        <meta property="og:site_name" content="Ремонт на Покриви Варна" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Хидроизолация на Покриви Варна | 15г Гаранция" />
        <meta name="twitter:description" content="Професионална хидроизолация на покриви. Битумна, течна, PVC. 15 години гаранция." />
        <meta name="twitter:image" content="https://www.remontnapokrivivarna.bg/og-image.jpg" />
        <meta name="keywords" content="хидроизолация покрив варна, хидроизолация цена, битумна хидроизолация, PVC мембрана покрив, течна хидроизолация, ремонт на теч от покрив" />
        <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <Header />
      <main className="pt-20">
        {/* 1. HERO */}
        <section className="relative text-primary-foreground py-16 md:py-24 overflow-hidden">
          <img src={heroWaterproofing} alt="Хидроизолация на покрив във Варна" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_20%,_rgba(15,23,42,0.55)_70%,_rgba(15,23,42,0.85)_100%)]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/70 via-[#0f172a]/30 to-transparent" />
          <div className="container mx-auto px-4 relative z-10">
            <nav className="text-sm mb-6 text-primary-foreground/70">
              <Link to={getPath('home')} className="hover:text-primary-foreground">Начало</Link>
              <span className="mx-2">/</span>
              <Link to={getPath('services')} className="hover:text-primary-foreground">Услуги</Link>
              <span className="mx-2">/</span>
              <span className="text-primary-foreground">Хидроизолация</span>
            </nav>
            <div className="max-w-4xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 [text-shadow:_0_3px_16px_rgba(0,0,0,0.9),_0_1px_4px_rgba(0,0,0,0.8)]">
                Хидроизолация на покриви във Варна
              </h1>
              <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-3xl mb-8 [text-shadow:_0_2px_8px_rgba(0,0,0,0.6)]">
                Битумна, течна и PVC хидроизолация за плоски и скатни покриви. Безплатен оглед до 24 часа и писмена гаранция.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8 shadow-lg">
                  <Link to={getPath('inspection')}><Eye className="w-5 h-5 mr-2" />Вземи оферта</Link>
                </Button>
                <Button asChild size="lg" className="bg-primary/40 backdrop-blur-sm border-2 border-white/80 text-white hover:bg-white/20">
                  <a href="tel:0884997659"><Phone className="w-5 h-5 mr-2" />Обади се: 088 499 7659</a>
                </Button>
              </div>
              <CalculatorDialog type="roof" />
              <div className="flex flex-wrap gap-3 text-xs md:text-sm">
                {["15+ години опит", "Гаранция за изпълнение", "Реални обекти", "Работа по договор"].map((item) => (
                  <div key={item} className="flex items-center gap-2 bg-primary/70 backdrop-blur-sm px-3 py-1.5 rounded-full">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-primary-foreground/90">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 2. КАКВИ УСЛУГИ ПРЕДЛАГАМЕ */}
        <section className="py-16 md:py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">
                Какви услуги предлагаме при хидроизолация на покрив
              </h2>
              <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
                Предлагаме всички видове хидроизолация за жилищни и търговски сгради
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {waterproofingServices.map((service, index) => {
                  const Icon = service.icon;
                  return (
                    <Card key={index} className="border-border bg-card hover:shadow-lg transition-shadow duration-300">
                      <CardContent className="p-6">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <h3 className="text-lg font-semibold text-card-foreground mb-2">{service.title}</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
                <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground px-8">
                  <Link to={getPath('inspection')}><Eye className="w-5 h-5 mr-2" />Вземи оферта</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8">
                  <a href="tel:0884997659"><Phone className="w-5 h-5 mr-2" />Обади се: 088 499 7659</a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* 3. ПОРТФОЛИО */}
        <CompletedProjects />
        <div className="flex flex-col sm:flex-row gap-4 justify-center py-8 bg-muted/30">
          <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground px-8">
            <Link to={getPath('inspection')}><Eye className="w-5 h-5 mr-2" />Искам подобен резултат</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8">
            <a href="tel:0884997659"><Phone className="w-5 h-5 mr-2" />Обади се</a>
          </Button>
        </div>

        {/* 4. ВИДОВЕ ХИДРОИЗОЛАЦИЯ */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">Видове хидроизолация</h2>
              <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">Различните ситуации изискват различен подход — ето кога коя система е подходяща</p>
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="border-border">
                  <CardContent className="p-6">
                    <Layers className="w-8 h-8 text-primary mb-3" />
                    <h3 className="text-xl font-semibold text-card-foreground mb-2">Битумна хидроизолация</h3>
                    <p className="text-muted-foreground text-sm">Подходяща за плоски покриви, покривни плочи и стари покривни системи. Доказана надеждност и достъпна цена.</p>
                  </CardContent>
                </Card>
                <Card className="border-border">
                  <CardContent className="p-6">
                    <SprayCan className="w-8 h-8 text-primary mb-3" />
                    <h3 className="text-xl font-semibold text-card-foreground mb-2">Течна хидроизолация</h3>
                    <p className="text-muted-foreground text-sm">Подходяща при сложни форми, детайли, връзки и труднодостъпни места. Създава безшевно покритие.</p>
                  </CardContent>
                </Card>
                <Card className="border-border">
                  <CardContent className="p-6">
                    <Shield className="w-8 h-8 text-primary mb-3" />
                    <h3 className="text-xl font-semibold text-card-foreground mb-2">PVC мембрана</h3>
                    <p className="text-muted-foreground text-sm">Подходяща за по-големи площи, индустриални обекти и съвременни плоски покриви. Максимална дълготрайност.</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* 5. КАК РАБОТИМ */}
        <section className="py-16 md:py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">Как работим</h2>
              <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">Ясен процес от първото обаждане до предаването на обекта</p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
                {processSteps.map((step, index) => (
                  <div key={index} className="text-center">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-primary/80 text-primary-foreground flex items-center justify-center font-bold text-xl mx-auto mb-4 shadow-lg">
                      {step.step}
                    </div>
                    <h3 className="font-semibold text-foreground mb-2 text-sm">{step.title}</h3>
                    <p className="text-muted-foreground text-xs leading-relaxed">{step.description}</p>
                  </div>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
                <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground px-8">
                  <Link to={getPath('inspection')}><Eye className="w-5 h-5 mr-2" />Безплатен оглед</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8">
                  <a href="tel:0884997659"><Phone className="w-5 h-5 mr-2" />Обади се</a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* 6. CTA ЛЕНТА */}
        <section className="py-10 bg-slate-800 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Имате теч от покрива?</h2>
            <p className="text-white/80 mb-6 max-w-xl mx-auto">Не чакайте проблемът да се задълбочи. Свържете се с нас за безплатен оглед и конкретно решение.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link to={getPath('inspection')}><Eye className="w-5 h-5 mr-2" />Вземи оферта</Link>
              </Button>
              <Button asChild size="lg" className="bg-transparent border-2 border-white text-white hover:bg-white/10">
                <a href="tel:0884997659"><Phone className="w-5 h-5 mr-2" />088 499 7659</a>
              </Button>
            </div>
          </div>
        </section>

        {/* 7. ЦЕНИ */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-4">Ориентировъчни цени за хидроизолация</h2>
              <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">Цените включват материал и труд. Крайната цена зависи от площта, основата, достъпа и състоянието на покрива.</p>
              <div className="grid md:grid-cols-3 gap-6">
                {types.map((type, index) => (
                  <Card key={index} className="border-border bg-card hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold text-card-foreground mb-3">{type.title}</h3>
                      <p className="text-muted-foreground text-sm mb-4">{type.description}</p>
                      <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-50 border border-green-200">
                        <span className="text-lg font-bold text-green-700">{type.price}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <p className="text-muted-foreground text-center mt-6 text-sm">* Цените са ориентировъчни без ДДС. Точната стойност се определя след безплатен оглед.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground px-8">
                  <Link to={getPath('inspection')}><Eye className="w-5 h-5 mr-2" />Получи точна цена</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8">
                  <a href="tel:0884997659"><Phone className="w-5 h-5 mr-2" />Обади се</a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* 8. ОТЗИВИ */}
        <Testimonials />

        {/* 9. CTA ЛЕНТА */}
        <section className="py-10 bg-slate-800 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Нуждаете се от хидроизолация?</h2>
            <p className="text-white/80 mb-6 max-w-xl mx-auto">Оставете запитване или се обадете. Ще направим оглед и ще ви дадем конкретно решение за вашия покрив.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link to={getPath('inspection')}><Eye className="w-5 h-5 mr-2" />Заяви безплатен оглед</Link>
              </Button>
              <Button asChild size="lg" className="bg-transparent border-2 border-white text-white hover:bg-white/10">
                <a href="tel:0884997659"><Phone className="w-5 h-5 mr-2" />088 499 7659</a>
              </Button>
            </div>
          </div>
        </section>

        {/* 10. КАЛКУЛАТОР */}
        <PriceCalculator />

        {/* 11. ДЕТАЙЛЕН ПРОЦЕС */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">Процес на хидроизолация — детайлно</h2>
              <p className="text-muted-foreground text-center mb-12 max-w-3xl mx-auto">Качествената хидроизолация изисква спазване на технология и внимание към детайлите</p>
              <div className="space-y-12">
                {waterproofingProcess.map((step, index) => (
                  <div key={index} className={`flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 items-center`}>
                    <div className="w-full md:w-1/2">
                      <img src={step.image} alt={step.imageAlt} className="w-full h-64 md:h-80 object-cover rounded-xl shadow-lg" loading="lazy" />
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

        {/* 12. ВИДОВЕ ХИДРОИЗОЛАЦИЯ ПО ТИПОВЕ ПОКРИВИ */}
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

        {/* 13. ПРОБЛЕМИ + ПОСЛЕДСТВИЯ */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">Какво се случва без хидроизолация</h2>
              <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">Липсата или лошото състояние на хидроизолацията води до сериозни проблеми</p>
              <div className="grid md:grid-cols-2 gap-6 mb-12">
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

              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4 text-center">Кога е време за нова хидроизолация</h3>
              <p className="text-muted-foreground text-center mb-10 max-w-2xl mx-auto">Навременната хидроизолация предотвратява сериозни последствия</p>
              <div className="grid md:grid-cols-2 gap-6">
                {consequences.map((item, index) => (
                  <div key={index} className="flex items-start gap-4 p-5 bg-muted/50 rounded-xl border border-destructive/20">
                    <AlertTriangle className="w-6 h-6 text-destructive flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">{item.title}</h4>
                      <p className="text-muted-foreground text-sm">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 14. МАТЕРИАЛИ */}
        <section className="py-16 bg-muted/30">
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

        {/* 15. ФАКТИ И ДОВЕРИЕ */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">Защо да изберете нас</h2>
              <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">Доверете се на опита и професионализма</p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {whyChooseUs.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div key={index} className="flex items-start gap-4 p-5 bg-muted/30 rounded-xl border border-border">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                        <p className="text-muted-foreground text-sm">{item.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10 max-w-3xl mx-auto">
                {["15+ години опит", "Писмена гаранция", "Член на КСБ", "Качествени материали"].map((item) => (
                  <div key={item} className="flex items-center gap-2 justify-center p-3 bg-primary/5 rounded-lg border border-primary/20">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-foreground text-sm font-medium">{item}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
                <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground px-8">
                  <Link to={getPath('inspection')}><Eye className="w-5 h-5 mr-2" />Вземи оферта</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8">
                  <a href="tel:0884997659"><Phone className="w-5 h-5 mr-2" />Обади се</a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* 16. FAQ */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">Често задавани въпроси</h2>
              <p className="text-muted-foreground text-center mb-12">Отговори на най-честите въпроси за хидроизолация на покриви</p>
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

        {/* 17. ФИНАЛЕН CTA */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Нуждаете се от хидроизолация на покрив?</h2>
            <p className="text-xl text-primary-foreground/90 mb-4 max-w-2xl mx-auto">Оставете запитване или се обадете. Ще направим оглед и ще ви дадем конкретно решение за вашия покрив.</p>
            <p className="text-2xl font-bold mb-8">☎ 088 499 7659</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8">
                <Link to={getPath('inspection')}>Вземи оферта</Link>
              </Button>
              <Button asChild size="lg" className="bg-transparent border-2 border-white text-white hover:bg-white/10">
                <a href="tel:0884997659"><Phone className="w-5 h-5 mr-2" />Обадете се сега</a>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default WaterproofingPage;
