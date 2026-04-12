import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCallButton from "@/components/FloatingCallButton";
import CTASection from "@/components/CTASection";
import RelatedServices from "@/components/RelatedServices";
import HowWeWork from "@/components/HowWeWork";
import LearnMoreLinks from "@/components/LearnMoreLinks";
import PriceCalculator from "@/components/PriceCalculator";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, CheckCircle, Layers, Shield, Droplets, Sun, MapPin, Clock, Wrench, AlertTriangle, Home, Search, Eye, Hammer, ClipboardCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLocalizedPath } from "@/hooks/useLocalizedPath";
import heroFlatRoof from "@/assets/hero-flat-roof.jpeg";

import flatRoofInspection from "@/assets/process/flat-roof-inspection.jpg";
import roofPressureWashing from "@/assets/process/roof-pressure-washing.jpg";
import acUnitSealing from "@/assets/process/ac-unit-sealing.jpg";
import waterproofingTorch from "@/assets/process/bitumen-torch-application.jpg";
import pvcMembrane from "@/assets/process/pvc-membrane.jpg";
import completedApartmentRoof from "@/assets/process/completed-flat-roof.jpg";

const FlatRoofPage = () => {
  const { t } = useTranslation();
  const { getPath } = useLocalizedPath();

  const relatedServices = [
    { title: "Хидроизолация", description: "Професионална хидроизолация с PVC, TPO и битумни мембрани.", href: getPath('waterproofing') },
    { title: "Ремонт на Течове", description: "Спешно отстраняване на течове при плоски покриви.", href: getPath('leakRepair') },
    { title: "Поддръжка на Покриви", description: "Редовна инспекция и почистване на плоски покриви.", href: getPath('maintenance') }
  ];
  const learnMoreLinks = [
    { title: "Видове хидроизолация - кога да изберем всяка", href: "/блог/видове-хидроизолация-и-кога-да-изберем-всяка" },
    { title: "Пролетна инспекция на покрива", href: "/блог/пролетна-инспекция-на-покрива" }
  ];

  const services = ["Хидроизолация на плосък покрив", "Ремонт на течове и пукнатини", "Полагане на битумни мембрани", "PVC и TPO мембрани", "Течна хидроизолация", "Ремонт на тераси и балкони", "Топлоизолация на плосък покрив", "Отводняване и дренаж", "Ремонт на воронки и сифони", "Монтаж на парапети и ръбове"];

  const materials = [
    { name: "Битумни мембрани", icon: Layers, advantages: ["Доказана надеждност", "Икономично решение", "Лесен за ремонт", "Дълготрайност 15-25 години"], brands: ["IKO", "Icopal", "Siplast", "Katepal", "Tegola"], price: "от 14 €/кв.м" },
    { name: "PVC мембрани", icon: Shield, advantages: ["Дълъг живот 25-30+ години", "Устойчивост на химикали", "Еластичност", "Светла повърхност охлажда сградата"], brands: ["Sika Sarnafil", "Firestone", "Protan", "Renolit Alkorplan"], price: "от 23 €/кв.м" },
    { name: "Течна хидроизолация", icon: Droplets, advantages: ["Безшевно покритие", "Перфектно за детайли", "Бързо нанасяне", "Висока еластичност"], brands: ["Sika", "Mapei", "Hyperdesmo", "Alchimica"], price: "от 18 €/кв.м" },
    { name: "EPDM каучукови мембрани", icon: Sun, advantages: ["Живот 40+ години", "Издържа от -40°C до +120°C", "Минимална поддръжка", "Екологично чист"], brands: ["Firestone", "Carlisle", "GACO"], price: "от 26 €/кв.м" }
  ];

  const problems = [
    { title: "Течове и проникване на вода", description: "Плоските покриви са особено уязвими към течове поради минималния наклон.", signs: ["Мокри петна на тавана", "Локви на покрива", "Видими пукнатини"] },
    { title: "Надута и отлепена хидроизолация", description: "Балончета и подутини показват проникване на влага между слоевете.", signs: ["Видими балончета", "Меки участъци при ходене", "Звук на въздух при натиск"] },
    { title: "Запушени водоотводи и сифони", description: "Листа, отломки и мъх запушват водосточните воронки.", signs: ["Локви след дъжд", "Запушени воронки", "Бавно оттичане"] },
    { title: "Термични повреди от слънце", description: "Интензивното слънчево греене причинява ускорено стареене.", signs: ["Напукана повърхност", "Загуба на еластичност", "Промяна в цвета"] }
  ];

  const consequences = [
    { title: "По-големи и скъпи щети", description: "Малък теч може да причини мокра изолация, увредена мазилка и повредена конструкция за месеци." },
    { title: "Риск за конструкцията", description: "Застоялата вода натоварва конструкцията и ускорява корозията на армировката в бетона." },
    { title: "Мухъл и здравословни рискове", description: "Влажността създава идеални условия за мухъл — опасен за дихателната система." },
    { title: "Загуба на топлоизолация", description: "Мократа топлоизолация губи до 80% от ефективността си, увеличавайки сметките за отопление." },
  ];

  const solutionSteps = [
    { title: "Цялостна инспекция", description: "Проверяваме хидроизолацията, водоотводите, парапетите и примикванията." },
    { title: "Професионална подготовка", description: "Почистваме, ремонтираме основата и нанасяме грунд за адхезия." },
    { title: "Качествен монтаж", description: "Полагаме хидроизолация по избраната технология — битумна, PVC или течна." },
    { title: "Защита и гаранция", description: "Нанасяме защитен слой и предоставяме писмена гаранция 15 години." },
  ];


  const process = [
    { step: 1, title: "Инспекция и оценка", description: "Извършваме цялостен преглед на плоския покрив.", image: flatRoofInspection, imageAlt: "Инспекция на плосък покрив" },
    { step: 2, title: "Почистване и подготовка", description: "Почистваме покрива и подготвяме основата.", image: roofPressureWashing, imageAlt: "Подготовка на плосък покрив" },
    { step: 3, title: "Обработка на детайли", description: "Полагаме усилващи ленти около всички критични точки.", image: acUnitSealing, imageAlt: "Обработка на детайли" },
    { step: 4, title: "Полагане на хидроизолация", description: "Полагаме избрания тип хидроизолация.", image: waterproofingTorch, imageAlt: "Полагане на хидроизолация" },
    { step: 5, title: "Втори слой", description: "При двуслойна система полагаме втори слой перпендикулярно.", image: pvcMembrane, imageAlt: "Втори слой хидроизолация" },
    { step: 6, title: "Финализиране", description: "Нанасяме защитен слой и извършваме финална проверка.", image: completedApartmentRoof, imageAlt: "Завършен плосък покрив" }
  ];

  const benefits = [
    { icon: Shield, title: "15 години гаранция", description: "Дълготрайна гаранция за материали и труд." },
    { icon: Wrench, title: "Опитни специалисти", description: "Богат опит с плоски покриви на жилищни и търговски сгради." },
    { icon: Layers, title: "Качествени материали", description: "Работим само с доказани марки — Sika, IKO, Icopal, Firestone." },
    { icon: Clock, title: "Бързо изпълнение", description: "Изпълняваме проектите в кратки срокове без забавяния." }
  ];

  const roofTypes = [
    { title: "Жилищни сгради и блокове", description: "Препоръчваме двуслойна битумна хидроизолация или PVC мембрана.", price: "от 14 €/кв.м" },
    { title: "Търговски и офис сгради", description: "PVC или TPO мембрани за дълготрайност и минимална поддръжка.", price: "от 23 €/кв.м" },
    { title: "Тераси и балкони", description: "Течна полиуретанова хидроизолация или системи с финишно покритие.", price: "от 18 €/кв.м" },
    { title: "Индустриални халета", description: "EPDM мембрани или TPO за минимална поддръжка и дълъг живот.", price: "от 13 €/кв.м" }
  ];

  const priceRanges = [
    { service: "Ремонт на локален теч", price: "от 40 €", note: "Диагностика и кръпка" },
    { service: "Битумна хидроизолация (еднослойна)", price: "от 11 €/кв.м", note: "Материал и труд" },
    { service: "Битумна хидроизолация (двуслойна)", price: "от 14 €/кв.м", note: "Препоръчително" },
    { service: "PVC/TPO мембрана", price: "от 23 €/кв.м", note: "С топлоизолация" },
    { service: "Течна хидроизолация", price: "от 18 €/кв.м", note: "Идеална за детайли" },
    { service: "Топлоизолация на покрив", price: "от 9 €/кв.м", note: "XPS или минерална вата" }
  ];

  const serviceAreas = [
    { area: "Варна център", neighborhoods: ["Централен район", "Одесос", "Морска градина", "Гръцка махала", "Чаталджа"] },
    { area: "Варна квартали", neighborhoods: ["кв. Бриз", "кв. Чайка", "кв. Левски", "кв. Аспарухово", "кв. Владиславово", "кв. Младост", "кв. Възраждане", "кв. Трошево"] },
    { area: "Околни селища", neighborhoods: ["Аксаково", "Белослав", "Девня", "Суворово", "Златни пясъци", "Св. Константин", "Каменар"] }
  ];

  const faqs = [
    { question: "Какъв е животът на хидроизолацията на плосък покрив?", answer: "Битумната издържа 15-25 години, PVC 25-30 години, EPDM 40+ години." },
    { question: "Може ли да се полага хидроизолация върху старата?", answer: "Да, ако старата е здрава и добре залепена. Ако е надута или напукана, трябва да се премахне." },
    { question: "Каква е разликата между битумна и PVC хидроизолация?", answer: "Битумната е по-икономична (15-25г живот), PVC е по-модерна и дълготрайна (25-30+г)." },
    { question: "Колко време отнема хидроизолацията на 100 кв.м?", answer: "При добро време и подготвена основа — 1-2 работни дни. При демонтаж на стара — 3-4 дни." },
    { question: "Може ли да се работи през зимата?", answer: "Битумната изисква температури над 5°C. PVC може до -5°C. Аварийни ремонти правим целогодишно." },
    { question: "Колко струва хидроизолацията на покрив на блок 500 кв.м?", answer: "При двуслойна битумна — приблизително 7 000-9 000 €. При PVC мембрана — 11 500-14 000 €." }
  ];

  const schemaData = { "@context": "https://schema.org", "@type": "Service", "name": "Ремонт на плоски покриви Варна", "provider": { "@type": "RoofingContractor", "name": "RemontNaPokriviVarna", "telephone": "+359884997659", "email": "remontnapokrivivarna@abv.bg", "address": { "@type": "PostalAddress", "streetAddress": "ул. Уста Колю Фичето 25 А", "addressLocality": "Варна", "addressCountry": "BG" } }, "areaServed": [{ "@type": "City", "name": "Варна" }], "description": "Професионален ремонт и хидроизолация на плоски покриви във Варна.", "offers": { "@type": "AggregateOffer", "lowPrice": "11", "highPrice": "26", "priceCurrency": "EUR", "offerCount": "6" } };
  const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": faqs.map(faq => ({ "@type": "Question", "name": faq.question, "acceptedAnswer": { "@type": "Answer", "text": faq.answer } })) };
  const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "Начало", "item": "https://www.remontnapokrivivarna.bg" }, { "@type": "ListItem", "position": 2, "name": "Услуги", "item": "https://www.remontnapokrivivarna.bg/services" }, { "@type": "ListItem", "position": 3, "name": "Плоски покриви", "item": "https://www.remontnapokrivivarna.bg/плоски-покриви" }] };

  return (
    <>
      <Helmet>
        <title>Ремонт на Плоски Покриви Варна - от 11 €/кв.м | 15г Гаранция</title>
        <meta name="description" content="Хидроизолация на плоски покриви и тераси. Битумни и PVC мембрани. 15 години гаранция. ☎ 088 499 7659" />
        <meta property="og:title" content="Ремонт на Плоски Покриви Варна - от 11 €/кв.м | 15г Гаранция" />
        <meta property="og:description" content="Хидроизолация на плоски покриви и тераси. Битумни и PVC мембрани. 15 години гаранция." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.remontnapokrivivarna.bg/bg/плоски-покриви" />
        <meta property="og:image" content="https://www.remontnapokrivivarna.bg/og-image.jpg" />
        <meta property="og:locale" content="bg_BG" />
        <meta property="og:site_name" content="Ремонт на Покриви Варна" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="keywords" content="плосък покрив варна, хидроизолация плосък покрив, ремонт плосък покрив, битумна хидроизолация варна" />
        <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <Header />
      <main className="pt-20">
        {/* 1. HERO */}
        <section className="relative text-primary-foreground py-16 md:py-24 overflow-hidden">
          <img src={heroFlatRoof} alt="Плоски покриви и тераси Варна" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_20%,_rgba(15,23,42,0.55)_70%,_rgba(15,23,42,0.85)_100%)]" />
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#0f172a]/70 via-[#0f172a]/30 to-transparent" />
          <div className="container mx-auto px-4 relative z-10">
            <nav className="text-sm mb-6 text-primary-foreground/70">
              <Link to={getPath('home')} className="hover:text-primary-foreground">Начало</Link><span className="mx-2">/</span>
              <Link to={getPath('services')} className="hover:text-primary-foreground">Услуги</Link><span className="mx-2">/</span><span>Плоски покриви</span>
            </nav>
            <div className="max-w-4xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 [text-shadow:_0_3px_16px_rgba(0,0,0,0.9),_0_1px_4px_rgba(0,0,0,0.8)]">Плоски Покриви и Тераси във Варна</h1>
              <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl [text-shadow:_0_2px_8px_rgba(0,0,0,0.6)]">Специализирани решения за хидроизолация и ремонт на плоски покриви, тераси и балкони. 15 години гаранция.</p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8 shadow-lg"><Link to={getPath('contact')}><Eye className="w-5 h-5 mr-2" />Заяви безплатен оглед</Link></Button>
                <Button asChild size="lg" className="bg-primary/40 backdrop-blur-sm border-2 border-white/80 text-white hover:bg-white/20"><a href="tel:0884997659"><Phone className="w-5 h-5 mr-2" />Обади се сега</a></Button>
              </div>
              <div className="flex flex-nowrap gap-3 text-xs md:text-sm">
                {["Безплатен оглед", "Работа по договор", "Гаранция за изпълнение", "Реални снимки от обекти"].map((item) => (
                  <div key={item} className="flex items-center gap-2 bg-primary/70 backdrop-blur-sm px-3 py-1.5 rounded-full"><CheckCircle className="w-4 h-4 text-green-400" /><span className="text-primary-foreground/90">{item}</span></div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 2. PROBLEM */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">Най-честите проблеми с плоските покриви</h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">Разпознайте ги навреме, за да предотвратите скъпи последствия</p>
            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {problems.map((problem, index) => (
                <Card key={index} className="bg-card border-border"><CardContent className="p-6">
                  <AlertTriangle className="w-8 h-8 text-accent mb-3" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">{problem.title}</h3>
                  <p className="text-muted-foreground text-sm mb-3">{problem.description}</p>
                  <ul className="space-y-1">{problem.signs.map((sign, idx) => (<li key={idx} className="text-sm text-muted-foreground flex items-center gap-2"><Droplets className="w-4 h-4 text-accent" />{sign}</li>))}</ul>
                </CardContent></Card>
              ))}
            </div>
          </div>
        </section>

        {/* 3. CONSEQUENCES */}
        <section className="py-16 bg-destructive/5 border-y border-destructive/20">
          <div className="container mx-auto px-4"><div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">Какво се случва, ако проблемът се отложи</h2>
            <p className="text-muted-foreground text-center mb-10 max-w-2xl mx-auto">Навременният ремонт предотвратява сериозни последствия</p>
            <div className="grid md:grid-cols-2 gap-6">
              {consequences.map((item, index) => (
                <div key={index} className="flex items-start gap-4 p-5 bg-background rounded-xl border border-destructive/20">
                  <AlertTriangle className="w-6 h-6 text-destructive flex-shrink-0 mt-0.5" />
                  <div><h3 className="font-semibold text-foreground mb-1">{item.title}</h3><p className="text-muted-foreground text-sm">{item.description}</p></div>
                </div>
              ))}
            </div>
          </div></div>
        </section>

        {/* 4. SOLUTION */}
        <section className="py-16 bg-primary/5 border-b border-primary/20">
          <div className="container mx-auto px-4"><div className="max-w-4xl mx-auto">
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
          </div></div>
        </section>

        {/* 5. PROCESS */}
        <HowWeWork />

        {/* 6. MID CTA */}
        <section className="py-12 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Имате проблем с плоския покрив?</h2>
            <p className="text-primary-foreground/90 mb-6 max-w-xl mx-auto">Не чакайте да се задълбочи. Свържете се за безплатна консултация.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground"><Link to={getPath('contact')}>Заяви безплатен оглед</Link></Button>
              <Button asChild size="lg" className="bg-transparent border-2 border-white text-white hover:bg-white/20"><a href="tel:0884997659"><Phone className="w-5 h-5 mr-2" />088 499 7659</a></Button>
            </div>
          </div>
        </section>

        {/* 7. CALCULATOR */}
        <PriceCalculator />

        {/* 8. SERVICE DETAILS */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">Материали и Технологии</h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">Работим с всички съвременни хидроизолационни материали</p>
            <div className="space-y-6 max-w-5xl mx-auto">
              {materials.map((material, index) => (
                <Card key={index} className="bg-card overflow-hidden border-border"><CardContent className="p-6">
                  <div className="grid lg:grid-cols-4 gap-6">
                    <div className="lg:col-span-3">
                      <h3 className="text-xl font-semibold text-foreground mb-3 flex items-center gap-3"><material.icon className="w-8 h-8 text-primary" />{material.name}</h3>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div><h4 className="font-medium text-foreground mb-2">Предимства:</h4><ul className="space-y-1">{material.advantages.map((adv, idx) => (<li key={idx} className="text-sm text-muted-foreground flex items-center gap-2"><CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />{adv}</li>))}</ul></div>
                        <div><h4 className="font-medium text-foreground mb-2">Марки:</h4><p className="text-sm text-muted-foreground">{material.brands.join(", ")}</p></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-center lg:border-l lg:border-border lg:pl-6"><div className="text-center"><span className="text-2xl font-bold text-primary">{material.price}</span><p className="text-muted-foreground text-sm mt-1">с материал и труд</p></div></div>
                  </div>
                </CardContent></Card>
              ))}
            </div>
          </div>
        </section>

        {/* Detailed Process */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">Процес на Работа</h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">Стъпка по стъпка за качествен резултат</p>
            <div className="space-y-12 max-w-5xl mx-auto">
              {process.map((item, index) => (
                <div key={index} className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 items-center`}>
                  <div className="lg:w-1/2"><img src={item.image} alt={item.imageAlt} className="rounded-lg shadow-lg w-full h-64 object-cover" /></div>
                  <div className="lg:w-1/2">
                    <div className="flex items-center gap-4 mb-4"><div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold">{item.step}</div><h3 className="text-xl font-semibold text-foreground">{item.title}</h3></div>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Roof Types */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">Типове Плоски Покриви</h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">Специализирани решения за различни типове сгради</p>
            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {roofTypes.map((type, index) => (
                <Card key={index} className="bg-card border-border"><CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3"><h3 className="text-xl font-semibold text-foreground flex items-center gap-3"><Home className="w-6 h-6 text-primary" />{type.title}</h3><span className="text-primary font-bold">{type.price}</span></div>
                  <p className="text-muted-foreground">{type.description}</p>
                </CardContent></Card>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">Цени за Плоски Покриви</h2>
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
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">Защо Да Изберете Нас</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto mb-12">
              {benefits.map((benefit, index) => (
                <Card key={index} className="bg-card border-border"><CardContent className="p-6 text-center">
                  <benefit.icon className="w-12 h-12 text-primary mx-auto mb-4" /><h3 className="font-semibold text-foreground mb-2">{benefit.title}</h3><p className="text-muted-foreground text-sm">{benefit.description}</p>
                </CardContent></Card>
              ))}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              {["15+ години опит", "Работа по договор", "Реални обекти", "Член на КСБ"].map((item) => (
                <div key={item} className="flex items-center gap-2 justify-center p-3 bg-background rounded-lg border border-border"><CheckCircle className="w-5 h-5 text-primary flex-shrink-0" /><span className="text-foreground text-sm font-medium">{item}</span></div>
              ))}
            </div>
          </div>
        </section>

        {/* Service Areas */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">Райони, Които Обслужваме</h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">Извършваме хидроизолация на плоски покриви в цяла Варна</p>
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
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">Често Задавани Въпроси</h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">Отговори на най-честите въпроси</p>
            <div className="max-w-3xl mx-auto space-y-6">
              {faqs.map((faq, index) => (<div key={index} className="bg-background rounded-lg p-6 border border-border"><h3 className="font-semibold text-foreground mb-3 text-lg">{faq.question}</h3><p className="text-muted-foreground">{faq.answer}</p></div>))}
            </div>
          </div>
        </section>

        {/* 11. FINAL CTA */}
        <CTASection title="Нуждаете се от Ремонт на Плосък Покрив?" subtitle="Получете безплатен оглед и честна оферта без задължение" />
        <div className="container mx-auto px-4 py-12"><LearnMoreLinks links={learnMoreLinks} /></div>
        <RelatedServices services={relatedServices} />
      </main>
      <Footer />
      <FloatingCallButton />
    </>
  );
};

export default FlatRoofPage;
