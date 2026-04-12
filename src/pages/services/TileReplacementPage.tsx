import { Helmet } from "react-helmet";
import heroTileReplacement from "@/assets/hero-tile-replacement.jpg";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCallButton from "@/components/FloatingCallButton";
import HowWeWork from "@/components/HowWeWork";
import CTASection from "@/components/CTASection";
import RelatedServices from "@/components/RelatedServices";
import LearnMoreLinks from "@/components/LearnMoreLinks";
import PriceCalculator from "@/components/PriceCalculator";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, CheckCircle, Layers, Shield, Ruler, Palette, MapPin, Clock, Wrench, AlertTriangle, Search, Eye, Hammer, ClipboardCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLocalizedPath } from "@/hooks/useLocalizedPath";

import roofInspection from "@/assets/process/tile-replacement-before-after-01.jpg";
import tileSamples from "@/assets/process/tile-replacement-ceramic-01.jpg";
import roofScaffolding from "@/assets/process/tile-replacement-preparation-01.jpg";
import tileRemoval from "@/assets/process/tile-replacement-partial-01.jpg";
import tileInstallation from "@/assets/process/tile-replacement-full-02.jpg";
import completedTileRoof from "@/assets/process/tile-replacement-full-01.jpg";

const TileReplacementPage = () => {
  const { t } = useTranslation();
  const { getPath } = useLocalizedPath();

  const relatedServices = [
    { title: "Ремонт на Покриви", description: "Цялостен ремонт на покривната конструкция и покритие.", href: getPath('roofRepair') },
    { title: "Поддръжка на Покриви", description: "Редовна профилактика за предотвратяване на повреди.", href: getPath('maintenance') },
    { title: "Изграждане на Нов Покрив", description: "Пълно изграждане на нов покрив с качествени материали.", href: getPath('newRoof') }
  ];
  const learnMoreLinks = [
    { title: "Как да изберем правилните керемиди", href: "/блог/как-да-изберем-керемиди-за-нов-покрив" },
    { title: "5 признака, че покривът се нуждае от ремонт", href: "/блог/5-признака-че-покривът-се-нуждае-от-ремонт" }
  ];

  const services = ["Смяна на единични счупени керемиди", "Частична подмяна на покривното покритие", "Пълна смяна на всички керемиди", "Подмяна на ламарина и капаци", "Ремонт на билото и ръбовете", "Смяна на снегозадържатели", "Подмяна на подпокривна мембрана", "Монтаж на вентилационни керемиди"];

  const tileTypes = [
    { name: "Бетонни керемиди", description: "Отлично съотношение цена-качество. Устойчиви на удар и градушка.", brands: ["Bramac", "Creaton", "Benders"], lifespan: "30-50 години", advantages: ["По-ниска цена от керамичните", "Устойчиви на удар и градушка", "Голямо разнообразие от цветове", "По-тежки - по-добра устойчивост на вятър"], price: "от 0.60 €/бр" },
    { name: "Керамични (глинени) керемиди", description: "Традиционният избор с изключителна дълготрайност.", brands: ["Tondach", "Roben", "Wienerberger"], lifespan: "80-100+ години", advantages: ["Изключително дълъг живот", "Естествен материал - 'диша'", "Не избледняват с времето", "Повишават стойността на имота"], price: "от 1.30 €/бр" },
    { name: "Керемиди тип Марсилски", description: "Класическият избор за българските покриви.", brands: ["Bramac", "Tondach", "Creaton"], lifespan: "40-80 години", advantages: ["Традиционен естетичен вид", "Отлична водоплътност", "Лесен монтаж и подмяна", "Широко достъпни резервни части"], price: "от 0.75 €/бр" },
    { name: "Плоски керемиди (бобровка)", description: "Елегантен и изчистен вид на покрива.", brands: ["Tondach", "Roben", "Creaton"], lifespan: "50-100 години", advantages: ["Елегантен минималистичен вид", "Подходящи за стръмни покриви", "Лесна подмяна на единични керемиди", "Автентичен български стил"], price: "от 0.90 €/бр" }
  ];

  const reasons = [
    { title: "Механични повреди", description: "Градушка, паднали клони, ходене по покрива могат да причинят счупване на керемидите.", signs: ["Видимо счупени керемиди", "Отломки в улуците", "Течове след буря"] },
    { title: "Износване от времето", description: "С годините керемидите се износват под въздействието на климатичните условия.", signs: ["Ерозирала повърхност", "Избледняване на цвета", "Развит мъх"] },
    { title: "Неправилен монтаж", description: "Неправилно монтирани керемиди се изместват и счупват по-бързо.", signs: ["Изместени керемиди", "Видими летви", "Течове при слаб дъжд"] },
    { title: "Проблеми с подложката", description: "Повредена мембрана или летви изискват цялостна подмяна.", signs: ["Провиснали участъци", "Мокра изолация", "Миризма на мухъл"] }
  ];

  const consequences = [
    { title: "Проникване на вода в конструкцията", description: "Една счупена керемида е достатъчна за теч, който повреди изолацията и конструкцията." },
    { title: "Гниене на дървените летви", description: "Влагата причинява гниене на летвите и носещите греди, компрометирайки целия покрив." },
    { title: "Многократно по-скъп ремонт", description: "Навременната подмяна на няколко керемиди струва 10 пъти по-малко от пълен ремонт." },
    { title: "Мухъл и влага в дома", description: "Течовете водят до мухъл по стени и тавани — вреден за здравето на семейството." },
  ];

  const solutionSteps = [
    { title: "Детайлен оглед", description: "Оценяваме състоянието на керемидите, летвите и подпокривната мембрана." },
    { title: "Подбор на керемиди", description: "Намираме максимално близки по размер, профил и цвят керемиди." },
    { title: "Прецизен монтаж", description: "Спазваме всички технологични изисквания на производителите." },
    { title: "Финална проверка", description: "Проверяваме монтажа и предоставяме писмена гаранция." },
  ];


  const process = [
    { step: 1, title: "Оглед и оценка на състоянието", description: "Нашият специалист извършва детайлен оглед на покрива - визуална инспекция отвън и отвътре.", image: roofInspection, imageAlt: "Оглед на покрив за оценка състоянието на керемиди" },
    { step: 2, title: "Подбор на подходящи керемиди", description: "При частична подмяна търсим керемиди, максимално близки до съществуващите. При пълна подмяна ви консултираме.", image: tileSamples, imageAlt: "Подбор на керемиди за подмяна" },
    { step: 3, title: "Подготовка на работната зона", description: "Осигуряваме безопасен достъп до покрива. Покриваме градината за защита от отпадъци.", image: roofScaffolding, imageAlt: "Подготовка за смяна на керемиди" },
    { step: 4, title: "Демонтаж на старите керемиди", description: "Внимателно демонтираме старите керемиди. Проверяваме състоянието на летвите и мембраната.", image: tileRemoval, imageAlt: "Демонтаж на стари керемиди" },
    { step: 5, title: "Монтаж на новите керемиди", description: "Полагаме новите керемиди, като спазваме правилното застъпване и позициониране.", image: tileInstallation, imageAlt: "Монтаж на нови керемиди" },
    { step: 6, title: "Финални проверки и почистване", description: "Извършваме цялостна проверка. Монтираме капаците. Почистваме работната зона.", image: completedTileRoof, imageAlt: "Завършена смяна на керемиди" }
  ];

  const benefits = [
    { icon: Palette, title: "Широк Избор", description: "Работим с всички популярни марки и типове керемиди." },
    { icon: Ruler, title: "Прецизен Монтаж", description: "Нашите майстори имат богат опит с керемидени покриви." },
    { icon: Shield, title: "15 години гаранция", description: "Предоставяме писмена гаранция за монтажа." },
    { icon: Clock, title: "Бързо Изпълнение", description: "Подменяме керемиди бързо и качествено." }
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
    { question: "Кога е необходима смяна на керемидите?", answer: "Смяна е необходима при: видимо счупени или напукани керемиди, течове въпреки ремонтите, силно износени керемиди (30+ години), масови повреди след буря или градушка." },
    { question: "Може ли да се подменят само част от керемидите?", answer: "Да, частичната подмяна е възможна и често е достатъчна при локални повреди." },
    { question: "Колко време отнема смяната на керемидите?", answer: "Подмяна на няколко керемиди отнема 2-4 часа. Пълна подмяна на 100-150 кв.м - 4-7 дни." },
    { question: "Какъв тип керемиди са най-подходящи за Варна?", answer: "Препоръчваме керемиди, устойчиви на морска влага — качествени бетонни (Bramac) или керамични (Tondach)." },
    { question: "Колко струва смяната на керемиди на 100 кв.м покрив?", answer: "При пълна подмяна с качествени бетонни керемиди бюджетът е приблизително 1800-2300 €." },
    { question: "Работите ли през зимата?", answer: "Да, при подходящи условия — сухо време и температури над 0°C." }
  ];

  const schemaData = { "@context": "https://schema.org", "@type": "Service", "name": "Ремонт на керемидени покриви Варна", "provider": { "@type": "RoofingContractor", "name": "RemontNaPokriviVarna", "telephone": "+359884997659", "email": "remontnapokrivivarna@abv.bg", "address": { "@type": "PostalAddress", "streetAddress": "ул. Уста Колю Фичето 25 А", "addressLocality": "Варна", "addressCountry": "BG" } }, "areaServed": [{ "@type": "City", "name": "Варна" }, { "@type": "Place", "name": "Аксаково" }, { "@type": "Place", "name": "Златни пясъци" }], "description": "Професионален ремонт на керемидени покриви във Варна - бетонни, керамични, марсилски. Частична или пълна подмяна с 15 години гаранция.", "offers": { "@type": "AggregateOffer", "lowPrice": "4", "highPrice": "23", "priceCurrency": "EUR", "offerCount": "6" } };
  const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": faqs.map(faq => ({ "@type": "Question", "name": faq.question, "acceptedAnswer": { "@type": "Answer", "text": faq.answer } })) };
  const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "Начало", "item": "https://www.remontnapokrivivarna.bg" }, { "@type": "ListItem", "position": 2, "name": "Услуги", "item": "https://www.remontnapokrivivarna.bg/services" }, { "@type": "ListItem", "position": 3, "name": "Смяна на керемиди", "item": "https://www.remontnapokrivivarna.bg/смяна-керемиди" }] };

  return (
    <>
      <Helmet>
        <title>Смяна Керемиди Варна - от 4 €/бр | 5г Гаранция</title>
        <meta name="description" content="Професионална подмяна на керемиди. Бетонни, керамични, марсилски. Бърз монтаж, 5г гаранция. ☎ 088 499 7659" />
        <meta property="og:title" content="Смяна на Керемиди Варна - от 4 €/бр | 5г Гаранция" />
        <meta property="og:description" content="Професионална подмяна на керемиди. Бетонни, керамични, марсилски. Бърз монтаж, 5г гаранция." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.remontnapokrivivarna.bg/bg/смяна-керемиди" />
        <meta property="og:image" content="https://www.remontnapokrivivarna.bg/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="bg_BG" />
        <meta property="og:site_name" content="Ремонт на Покриви Варна" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Смяна на Керемиди Варна - от 4 €/бр | 5г Гаранция" />
        <meta name="twitter:description" content="Професионална подмяна на керемиди. Бетонни, керамични, марсилски. Бърз монтаж, 5г гаранция." />
        <meta name="twitter:image" content="https://www.remontnapokrivivarna.bg/og-image.jpg" />
        <meta name="keywords" content="смяна керемиди варна, подмяна керемиди варна, керемиди цена варна, ремонт керемиден покрив" />
        <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <Header />
      <main className="pt-20">
        {/* 1. HERO */}
        <section className="relative text-primary-foreground py-16 md:py-24 overflow-hidden">
          <img src={heroTileReplacement} alt="Смяна на керемиди – реален обект" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_20%,_rgba(15,23,42,0.55)_70%,_rgba(15,23,42,0.85)_100%)]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/70 via-[#0f172a]/30 to-transparent" />
          <div className="container mx-auto px-4 relative z-10">
            <nav className="text-sm mb-6 text-primary-foreground/70">
              <Link to={getPath('home')} className="hover:text-primary-foreground">Начало</Link><span className="mx-2">/</span>
              <Link to={getPath('services')} className="hover:text-primary-foreground">Услуги</Link><span className="mx-2">/</span>
              <span>Смяна на керемиди</span>
            </nav>
            <div className="max-w-4xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 [text-shadow:_0_3px_16px_rgba(0,0,0,0.9),_0_1px_4px_rgba(0,0,0,0.8)]">Смяна на Керемиди Варна</h1>
              <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl [text-shadow:_0_2px_8px_rgba(0,0,0,0.6)]">Професионална подмяна на счупени, стари или повредени керемиди. Работим с всички видове — бетонни, керамични, марсилски.</p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8 shadow-lg">
                  <Link to={getPath('contact')}><Eye className="w-5 h-5 mr-2" />Заяви безплатен оглед</Link>
                </Button>
                <Button asChild size="lg" className="bg-primary/40 backdrop-blur-sm border-2 border-white/80 text-white hover:bg-white/20">
                  <a href="tel:0884997659"><Phone className="w-5 h-5 mr-2" />Обади се сега</a>
                </Button>
              </div>
              <div className="flex flex-nowrap gap-3 text-xs md:text-sm">
                {["Безплатен оглед", "Работа по договор", "Гаранция за изпълнение", "Реални снимки от обекти"].map((item) => (
                  <div key={item} className="flex items-center gap-2 bg-primary/70 backdrop-blur-sm px-3 py-1.5 rounded-full">
                    <CheckCircle className="w-4 h-4 text-green-400" /><span className="text-primary-foreground/90">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 2. PROBLEM */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">Кога е Необходима Смяна на Керемиди?</h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">Разпознайте признаците, че вашият покрив се нуждае от подмяна</p>
            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {reasons.map((reason, index) => (
                <Card key={index} className="bg-card border-border">
                  <CardContent className="p-6">
                    <AlertTriangle className="w-8 h-8 text-accent mb-3" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">{reason.title}</h3>
                    <p className="text-muted-foreground text-sm mb-3">{reason.description}</p>
                    <ul className="space-y-1">{reason.signs.map((sign, idx) => (<li key={idx} className="text-sm text-muted-foreground flex items-center gap-2"><Search className="w-4 h-4 text-primary" />{sign}</li>))}</ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* 3. CONSEQUENCES */}
        <section className="py-16 bg-destructive/5 border-y border-destructive/20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">Какво се случва, ако проблемът се отложи</h2>
              <p className="text-muted-foreground text-center mb-10 max-w-2xl mx-auto">Навременната подмяна предотвратява сериозни последствия</p>
              <div className="grid md:grid-cols-2 gap-6">
                {consequences.map((item, index) => (
                  <div key={index} className="flex items-start gap-4 p-5 bg-background rounded-xl border border-destructive/20">
                    <AlertTriangle className="w-6 h-6 text-destructive flex-shrink-0 mt-0.5" />
                    <div><h3 className="font-semibold text-foreground mb-1">{item.title}</h3><p className="text-muted-foreground text-sm">{item.description}</p></div>
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
                    <div><h3 className="font-semibold text-foreground mb-1">{item.title}</h3><p className="text-muted-foreground text-sm">{item.description}</p></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 5. PROCESS */}
        <HowWeWork />

        {/* 6. MID CTA */}
        <section className="py-12 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Имате счупени или стари керемиди?</h2>
            <p className="text-primary-foreground/90 mb-6 max-w-xl mx-auto">Не чакайте проблемът да се задълбочи. Свържете се за безплатна консултация.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground"><Link to={getPath('contact')}>Заяви безплатен оглед</Link></Button>
              <Button asChild size="lg" className="bg-transparent border-2 border-white text-white hover:bg-white/20"><a href="tel:0884997659"><Phone className="w-5 h-5 mr-2" />088 499 7659</a></Button>
            </div>
          </div>
        </section>

        {/* 7. CALCULATOR */}
        <PriceCalculator />

        {/* 8. SERVICE DETAILS */}
        {/* Tile Types */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">Видове Керемиди, с Които Работим</h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">Предлагаме подмяна с всички популярни типове керемиди</p>
            <div className="space-y-8 max-w-5xl mx-auto">
              {tileTypes.map((tile, index) => (
                <Card key={index} className="bg-card overflow-hidden border-border">
                  <CardContent className="p-6">
                    <div className="grid lg:grid-cols-3 gap-6">
                      <div className="lg:col-span-2">
                        <h3 className="text-xl font-semibold text-foreground mb-3 flex items-center gap-3"><Layers className="w-6 h-6 text-primary" />{tile.name}</h3>
                        <p className="text-muted-foreground mb-4">{tile.description}</p>
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-medium text-foreground mb-2">Предимства:</h4>
                            <ul className="space-y-1">{tile.advantages.map((adv, idx) => (<li key={idx} className="text-sm text-muted-foreground flex items-center gap-2"><CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />{adv}</li>))}</ul>
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
                        <div className="text-center"><span className="text-3xl font-bold text-primary">{tile.price}</span><p className="text-muted-foreground text-sm mt-1">ориентировъчна цена</p></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Detailed Process */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">Процес на Смяна на Керемиди</h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">Професионален подход стъпка по стъпка</p>
            <div className="space-y-12 max-w-5xl mx-auto">
              {process.map((item, index) => (
                <div key={index} className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 items-center`}>
                  <div className="lg:w-1/2"><img src={item.image} alt={item.imageAlt} className="rounded-lg shadow-lg w-full h-64 object-cover" /></div>
                  <div className="lg:w-1/2">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold">{item.step}</div>
                      <h3 className="text-xl font-semibold text-foreground">{item.title}</h3>
                    </div>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">Цени за Смяна на Керемиди</h2>
            <p className="text-muted-foreground text-center mb-8 max-w-2xl mx-auto">Прозрачно ценообразуване. Точната цена се определя след оглед.</p>
            <div className="max-w-3xl mx-auto">
              <div className="bg-card rounded-lg overflow-hidden border border-border">
                {priceRanges.map((item, index) => (
                  <div key={index} className={`flex flex-col md:flex-row md:items-center justify-between p-4 ${index !== priceRanges.length - 1 ? 'border-b border-border' : ''}`}>
                    <div className="mb-2 md:mb-0"><span className="font-semibold text-foreground">{item.service}</span><span className="text-muted-foreground text-sm block md:inline md:ml-2">({item.note})</span></div>
                    <span className="text-primary font-bold text-lg">{item.price}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 9. TRUST */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">Защо Да Изберете Нас</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto mb-12">
              {benefits.map((benefit, index) => (
                <Card key={index} className="bg-card border-border"><CardContent className="p-6 text-center">
                  <benefit.icon className="w-14 h-14 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold text-foreground mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground text-sm">{benefit.description}</p>
                </CardContent></Card>
              ))}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              {["15+ години опит", "Работа по договор", "Реални обекти", "Член на КСБ"].map((item) => (
                <div key={item} className="flex items-center gap-2 justify-center p-3 bg-muted/30 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" /><span className="text-foreground text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Service Areas */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">Райони, Които Обслужваме</h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">Извършваме смяна на керемиди в цяла Варна и околните места</p>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12">
              {serviceAreas.map((area, index) => (
                <div key={index}><h3 className="font-semibold text-foreground mb-4 flex items-center gap-2"><MapPin className="w-5 h-5 text-primary" />{area.area}</h3>
                <ul className="space-y-2">{area.neighborhoods.map((n, idx) => (<li key={idx} className="text-muted-foreground text-sm flex items-center gap-2"><CheckCircle className="w-4 h-4 text-primary" />{n}</li>))}</ul></div>
              ))}
            </div>
            <div className="max-w-4xl mx-auto"><div className="rounded-lg overflow-hidden shadow-lg">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d93422.83869498367!2d27.8261!3d43.2141!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40a4538baaf3f891%3A0x5765ae67f35e9f47!2z0JLQsNGA0L3QsA!5e0!3m2!1sbg!2sbg!4v1699524000000!5m2!1sbg!2sbg" width="100%" height="300" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Карта на Варна" />
            </div></div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">Често Задавани Въпроси</h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">Отговори на най-честите въпроси</p>
            <div className="max-w-3xl mx-auto space-y-6">
              {faqs.map((faq, index) => (<div key={index} className="bg-muted/30 rounded-lg p-6"><h3 className="font-semibold text-foreground mb-3 text-lg">{faq.question}</h3><p className="text-muted-foreground">{faq.answer}</p></div>))}
            </div>
          </div>
        </section>

        {/* 11. FINAL CTA */}
        <CTASection title="Нуждаете се от Смяна на Керемиди?" subtitle="Получете безплатен оглед и честна оферта без задължение" />
        <div className="container mx-auto px-4 py-12"><LearnMoreLinks links={learnMoreLinks} /></div>
        <RelatedServices services={relatedServices} />
      </main>
      <Footer />
      <FloatingCallButton />
    </>
  );
};

export default TileReplacementPage;
