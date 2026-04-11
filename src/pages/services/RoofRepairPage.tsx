import { Helmet } from "react-helmet";
import heroRoofRepair from "@/assets/hero-roof-repair.jpg";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCallButton from "@/components/FloatingCallButton";
import RelatedServices from "@/components/RelatedServices";
import LearnMoreLinks from "@/components/LearnMoreLinks";
import PriceCalculator from "@/components/PriceCalculator";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { CheckCircle, Wrench, Shield, Clock, Phone, MapPin, AlertTriangle, Search, Hammer, ClipboardCheck, Eye, FileText } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useTranslation } from "react-i18next";
import { useLocalizedPath } from "@/hooks/useLocalizedPath";

import roofInspection from "@/assets/process/roof-repair-attic-hatch-inspection-01.jpg";
import roofAssessment from "@/assets/process/roof-repair-diagnosis-inspection-01.jpg";
import roofScaffolding from "@/assets/process/roof-repair-structural-diagnosis-01.jpg";
import tileRemoval from "@/assets/process/roof-repair-insulation-removal-01.jpg";
import tileInstallation from "@/assets/process/roof-repair-tile-replacement-01.jpg";
import completedTileRoof from "@/assets/process/roof-repair-structural-damage-01.jpg";

const RoofRepairPage = () => {
  const { t } = useTranslation();
  const { getPath } = useLocalizedPath();

  const relatedServices = [
    { title: t('pages.roofRepair.related.0.title'), description: t('pages.roofRepair.related.0.desc'), href: getPath('leakRepair') },
    { title: t('pages.roofRepair.related.1.title'), description: t('pages.roofRepair.related.1.desc'), href: getPath('tileReplacement') },
    { title: t('pages.roofRepair.related.2.title'), description: t('pages.roofRepair.related.2.desc'), href: getPath('maintenance') },
  ];

  const learnMoreLinks = [
    { title: t('pages.roofRepair.learnMore.0'), href: `/${t('pages.roofRepair.blogSlug')}/5-признака-че-покривът-се-нуждае-от-ремонт` },
    { title: t('pages.roofRepair.learnMore.1'), href: `/${t('pages.roofRepair.blogSlug')}/най-честите-грешки-при-покривни-ремонти` },
  ];

  const services = Array.from({ length: 7 }, (_, i) => t(`pages.roofRepair.servicesList.${i}`));

  const benefits = [
    { icon: Shield, title: t('pages.roofRepair.benefits.0.title'), description: t('pages.roofRepair.benefits.0.desc') },
    { icon: Wrench, title: t('pages.roofRepair.benefits.1.title'), description: t('pages.roofRepair.benefits.1.desc') },
    { icon: Clock, title: t('pages.roofRepair.benefits.2.title'), description: t('pages.roofRepair.benefits.2.desc') },
  ];

  const priceRanges = Array.from({ length: 5 }, (_, i) => ({
    service: t(`pages.roofRepair.prices.${i}.service`),
    price: t(`pages.roofRepair.prices.${i}.price`),
  }));

  const commonProblems = Array.from({ length: 5 }, (_, i) => ({
    title: t(`pages.roofRepair.problems.${i}.title`),
    description: t(`pages.roofRepair.problems.${i}.desc`),
  }));

  const repairProcess = [
    { step: 1, image: roofInspection },
    { step: 2, image: roofAssessment },
    { step: 3, image: roofScaffolding },
    { step: 4, image: tileRemoval },
    { step: 5, image: tileInstallation },
    { step: 6, image: completedTileRoof },
  ].map((s, i) => ({
    ...s,
    title: t(`pages.roofRepair.process.${i}.title`),
    description: t(`pages.roofRepair.process.${i}.desc`),
    imageAlt: t(`pages.roofRepair.process.${i}.alt`),
  }));

  const materials = Array.from({ length: 4 }, (_, i) => ({
    title: t(`pages.roofRepair.materials.${i}.title`),
    description: t(`pages.roofRepair.materials.${i}.desc`),
  }));

  const serviceAreas = [
    { area: t('pages.roofRepair.areas.0.name'), neighborhoods: [t('pages.roofRepair.areas.0.n0'), t('pages.roofRepair.areas.0.n1'), t('pages.roofRepair.areas.0.n2')] },
    { area: t('pages.roofRepair.areas.1.name'), neighborhoods: Array.from({ length: 8 }, (_, i) => t(`pages.roofRepair.areas.1.n${i}`)) },
    { area: t('pages.roofRepair.areas.2.name'), neighborhoods: Array.from({ length: 7 }, (_, i) => t(`pages.roofRepair.areas.2.n${i}`)) },
  ];

  const faqs = Array.from({ length: 6 }, (_, i) => ({
    question: t(`pages.roofRepair.faqs.${i}.q`),
    answer: t(`pages.roofRepair.faqs.${i}.a`),
  }));

  const consequences = [
    { title: "По-големи щети", description: "Малък теч може да причини мокра изолация, гнили летви и повредена конструкция за месеци." },
    { title: "По-високи разходи", description: "Отложеният ремонт винаги излиза по-скъпо. Малка кръпка днес може да спести хиляди утре." },
    { title: "Риск за конструкцията", description: "Продължителната влага отслабва дървените елементи и компрометира носимоспособността на покрива." },
    { title: "Влага и мухъл в дома", description: "Течовете водят до мухъл по стени и тавани, което е вредно за здравето на цялото семейство." },
  ];

  const solutions = [
    { title: "Професионален оглед", description: "Откриваме точния източник на проблема с визуална и техническа инспекция." },
    { title: "Точна диагностика", description: "Определяме обхвата на повредите и необходимите ремонтни дейности." },
    { title: "Избор на решение", description: "Предлагаме оптималния вариант за ремонт според вашия бюджет и нужди." },
    { title: "Качествени материали", description: "Използваме само доказани материали от водещи европейски производители." },
  ];

  const quickProcess = [
    { icon: Phone, title: "Свързване", description: "Обадете се или изпратете запитване" },
    { icon: Search, title: "Оглед", description: "Безплатен оглед на място" },
    { icon: ClipboardCheck, title: "Оферта", description: "Детайлна оферта без задължение" },
    { icon: Hammer, title: "Изпълнение", description: "Качествен ремонт с гаранция" },
  ];

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": t('pages.roofRepair.schema.name'),
    "provider": {
      "@type": "RoofingContractor",
      "name": "RemontNaPokriviVarna",
      "telephone": "+359884997659",
      "email": "remontnapokrivivarna@abv.bg",
      "address": { "@type": "PostalAddress", "streetAddress": "ул. Уста Колю Фичето 25 А", "addressLocality": "Варна", "addressCountry": "BG" }
    },
    "areaServed": [
      { "@type": "City", "name": "Варна" },
      { "@type": "Place", "name": "Аксаково" },
      { "@type": "Place", "name": "Златни пясъци" },
      { "@type": "Place", "name": "Белослав" },
      { "@type": "Place", "name": "Девня" }
    ],
    "description": t('pages.roofRepair.schema.desc'),
    "offers": { "@type": "AggregateOffer", "lowPrice": "4", "highPrice": "28", "priceCurrency": "EUR", "offerCount": "5" }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({ "@type": "Question", "name": faq.question, "acceptedAnswer": { "@type": "Answer", "text": faq.answer } }))
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": t('pages.roofRepair.breadcrumb.home'), "item": "https://www.remontnapokrivivarna.bg" },
      { "@type": "ListItem", "position": 2, "name": t('pages.roofRepair.breadcrumb.services'), "item": "https://www.remontnapokrivivarna.bg/services" },
      { "@type": "ListItem", "position": 3, "name": t('pages.roofRepair.breadcrumb.current'), "item": "https://www.remontnapokrivivarna.bg/ремонт-на-покриви" }
    ]
  };

  return (
    <>
      <Helmet>
        <title>{t('pages.roofRepair.meta.title')}</title>
        <meta name="description" content={t('pages.roofRepair.meta.desc')} />
        <meta property="og:title" content={t('pages.roofRepair.meta.ogTitle')} />
        <meta property="og:description" content={t('pages.roofRepair.meta.desc')} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.remontnapokrivivarna.bg/bg/ремонт-на-покриви" />
        <meta property="og:image" content="https://www.remontnapokrivivarna.bg/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="bg_BG" />
        <meta property="og:site_name" content="Ремонт на Покриви Варна" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t('pages.roofRepair.meta.ogTitle')} />
        <meta name="twitter:description" content={t('pages.roofRepair.meta.desc')} />
        <meta name="twitter:image" content="https://www.remontnapokrivivarna.bg/og-image.jpg" />
        <meta name="keywords" content={t('pages.roofRepair.meta.keywords')} />
        <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <Header />
      
      <main className="pt-20">
        {/* 1. HERO */}
        <section className="relative bg-primary text-primary-foreground py-16 md:py-24 overflow-hidden">
          <img
            src={heroRoofRepair}
            alt="Ремонт на покриви Варна"
            className="absolute inset-0 w-full h-full object-cover"
            loading="eager"
            width={1920}
            height={1080}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/75 to-primary/60" />
          <div className="container mx-auto px-4 relative z-10">
            <nav className="text-sm mb-6 text-primary-foreground/70">
              <Link to={getPath('home')} className="hover:text-primary-foreground">{t('pages.roofRepair.breadcrumb.home')}</Link>
              <span className="mx-2">/</span>
              <Link to={getPath('services')} className="hover:text-primary-foreground">{t('pages.roofRepair.breadcrumb.services')}</Link>
              <span className="mx-2">/</span>
              <span className="text-primary-foreground">{t('pages.roofRepair.breadcrumb.current')}</span>
            </nav>
            <div className="max-w-4xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                {t('pages.roofRepair.hero.title')}
              </h1>
              <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-3xl mb-8">
                {t('pages.roofRepair.hero.subtitle')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8">
                  <Link to={getPath('contact')}>
                    <Eye className="w-5 h-5 mr-2" />
                    Заяви безплатен оглед
                  </Link>
                </Button>
                <Button asChild size="lg" className="bg-transparent border-2 border-white text-white hover:bg-white/20">
                  <a href="tel:0884997659">
                    <Phone className="w-5 h-5 mr-2" />
                    Обади се сега
                  </a>
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
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">{t('pages.roofRepair.problemsSection.title')}</h2>
              <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">{t('pages.roofRepair.problemsSection.subtitle')}</p>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {commonProblems.map((problem, index) => (
                  <Card key={index} className="border-border bg-card">
                    <CardContent className="p-6">
                      <AlertTriangle className="w-8 h-8 text-accent mb-3" />
                      <h3 className="text-lg font-semibold text-card-foreground mb-2">{problem.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{problem.description}</p>
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
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">
                Какво се случва, ако проблемът се отложи
              </h2>
              <p className="text-muted-foreground text-center mb-10 max-w-2xl mx-auto">
                Навременният ремонт предотвратява сериозни последствия
              </p>
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
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">
                Как решаваме проблема
              </h2>
              <p className="text-muted-foreground text-center mb-10 max-w-2xl mx-auto">
                Професионален подход за дълготраен резултат
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                {solutions.map((item, index) => (
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

        {/* 5. PROCESS (compact 4-step) */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">Как работим</h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">Прозрачен процес от първия контакт до завършения ремонт</p>
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
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Имате проблем с покрива?</h2>
            <p className="text-primary-foreground/90 mb-6 max-w-xl mx-auto">Не чакайте проблемът да се задълбочи. Свържете се с нас за безплатна консултация.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link to={getPath('contact')}>Заяви безплатен оглед</Link>
              </Button>
              <Button asChild size="lg" className="bg-transparent border-2 border-white text-white hover:bg-white/20">
                <a href="tel:0884997659">
                  <Phone className="w-5 h-5 mr-2" />
                  088 499 7659
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* 7. CALCULATOR */}
        <PriceCalculator />

        {/* 8. SERVICE DETAILS - Detailed Process with Images */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">{t('pages.roofRepair.processSection.title')}</h2>
              <p className="text-muted-foreground text-center mb-12 max-w-3xl mx-auto">{t('pages.roofRepair.processSection.subtitle')}</p>
              <div className="space-y-12">
                {repairProcess.map((step, index) => (
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
              <h2 className="text-3xl font-bold text-foreground mb-8 text-center">{t('pages.roofRepair.servicesSection.title')}</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {services.map((service, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 rounded-lg bg-card border border-border">
                    <CheckCircle className="w-6 h-6 text-accent flex-shrink-0 mt-0.5" />
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
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">{t('pages.roofRepair.materialsSection.title')}</h2>
              <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">{t('pages.roofRepair.materialsSection.subtitle')}</p>
              <div className="grid md:grid-cols-2 gap-6">
                {materials.map((material, index) => (
                  <Card key={index} className="border-border">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <Hammer className="w-8 h-8 text-primary flex-shrink-0" />
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

        {/* Pricing */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold text-foreground text-center mb-4">{t('pages.roofRepair.pricingSection.title')}</h2>
              <p className="text-muted-foreground text-center mb-8">{t('pages.roofRepair.pricingSection.subtitle')}</p>
              <div className="space-y-4">
                {priceRanges.map((item, index) => (
                  <div key={index} className="flex justify-between items-center p-4 rounded-lg bg-card border border-border">
                    <span className="text-foreground font-medium">{item.service}</span>
                    <span className="text-primary font-bold text-lg">{item.price}</span>
                  </div>
                ))}
              </div>
              <p className="text-muted-foreground text-center mt-6">{t('pages.roofRepair.pricingSection.note')}</p>
            </div>
          </div>
        </section>

        {/* 9. TRUST */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-4">Защо да изберете нас</h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">Доверете се на опита и професионализма</p>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
              {benefits.map((benefit, index) => (
                <Card key={index} className="border-border bg-card">
                  <CardContent className="p-6 text-center">
                    <benefit.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-card-foreground mb-2">{benefit.title}</h3>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              {["15+ години опит", "Работа по договор", "Реални обекти", "Член на КСБ"].map((item) => (
                <div key={item} className="flex items-center gap-2 justify-center p-3 bg-muted/30 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Service Areas */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">{t('pages.roofRepair.areasSection.title')}</h2>
              <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">{t('pages.roofRepair.areasSection.subtitle')}</p>
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
                  width="100%" height="400" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                  title={t('pages.roofRepair.areasSection.mapTitle')}
                />
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">{t('pages.roofRepair.faqSection.title')}</h2>
              <p className="text-muted-foreground text-center mb-12">{t('pages.roofRepair.faqSection.subtitle')}</p>
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
            <h2 className="text-3xl md:text-4xl font-bold mb-6">{t('pages.roofRepair.cta.title')}</h2>
            <p className="text-xl text-primary-foreground/90 mb-4 max-w-2xl mx-auto">{t('pages.roofRepair.cta.subtitle')}</p>
            <p className="text-2xl font-bold mb-8">☎ 088 499 7659</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8">
                <a href="tel:+359884997659">{t('pages.roofRepair.cta.callBtn')}</a>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
                <Link to={getPath('contact')}>{t('pages.roofRepair.cta.inquiryBtn')}</Link>
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

export default RoofRepairPage;
