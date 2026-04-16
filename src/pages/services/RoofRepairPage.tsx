import { Helmet } from "react-helmet";
import heroRoofRepair from "@/assets/hero-roof-repair.jpg";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCallButton from "@/components/FloatingCallButton";
import PriceCalculator from "@/components/PriceCalculator";
import CalculatorDialog from "@/components/CalculatorDialog";
import TrustIndicators from "@/components/TrustIndicators";
import CertificationsBar from "@/components/CertificationsBar";
import Services from "@/components/Services";
import HowWeWork from "@/components/HowWeWork";
import CompletedProjects from "@/components/CompletedProjects";
import Testimonials from "@/components/Testimonials";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { CheckCircle, Wrench, Shield, Clock, Phone, MapPin, AlertTriangle, Eye, FileText, Hammer, Award, Users, Calendar } from "lucide-react";
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

  const benefits = [
    { icon: Shield, title: t('pages.roofRepair.benefits.0.title'), description: t('pages.roofRepair.benefits.0.desc') },
    { icon: Wrench, title: t('pages.roofRepair.benefits.1.title'), description: t('pages.roofRepair.benefits.1.desc') },
    { icon: Clock, title: t('pages.roofRepair.benefits.2.title'), description: t('pages.roofRepair.benefits.2.desc') },
  ];

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

  const consequences = [
    { title: "По-големи щети", description: "Малък теч може да причини мокра изолация, гнили летви и повредена конструкция за месеци." },
    { title: "По-високи разходи", description: "Отложеният ремонт винаги излиза по-скъпо. Малка кръпка днес може да спести хиляди утре." },
    { title: "Риск за конструкцията", description: "Продължителната влага отслабва дървените елементи и компрометира носимоспособността на покрива." },
    { title: "Влага и мухъл в дома", description: "Течовете водят до мухъл по стени и тавани, което е вредно за здравето на цялото семейство." },
  ];

  const faqs = Array.from({ length: 6 }, (_, i) => ({
    question: t(`pages.roofRepair.faqs.${i}.q`),
    answer: t(`pages.roofRepair.faqs.${i}.a`),
  }));

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
        <meta property="og:url" content="https://www.remontnapokrivivarna.bg/bg/remont-na-pokrivi" />
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
        <section className="relative bg-black text-white py-16 md:py-24 overflow-hidden">
          <img
            src={heroRoofRepair}
            alt="Ремонт на покриви Варна"
            className="absolute inset-0 w-full h-full object-cover"
            loading="eager"
            width={1920}
            height={1080}
          />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_20%,_rgba(15,23,42,0.55)_70%,_rgba(15,23,42,0.85)_100%)]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/70 via-[#0f172a]/30 to-transparent" />
          <div className="container mx-auto px-4 relative z-10">
            <nav className="text-sm mb-6 text-white/70">
              <Link to={getPath('home')} className="hover:text-white">{t('pages.roofRepair.breadcrumb.home')}</Link>
              <span className="mx-2">/</span>
              <Link to={getPath('services')} className="hover:text-white">{t('pages.roofRepair.breadcrumb.services')}</Link>
              <span className="mx-2">/</span>
              <span className="text-white">{t('pages.roofRepair.breadcrumb.current')}</span>
            </nav>
            <div className="max-w-4xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 [text-shadow:_0_3px_16px_rgba(0,0,0,0.9),_0_1px_4px_rgba(0,0,0,0.8)]">
                {t('pages.roofRepair.hero.title')}
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-3xl mb-8 [text-shadow:_0_2px_8px_rgba(0,0,0,0.6)]">
                {t('pages.roofRepair.hero.subtitle')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8 shadow-lg">
                  <Link to={getPath('contact')}>
                    <Eye className="w-5 h-5 mr-2" />
                    Заяви безплатен оглед
                  </Link>
                </Button>
                <Button asChild size="lg" className="bg-primary/40 backdrop-blur-sm border-2 border-white/80 text-white hover:bg-white/20">
                  <a href="tel:0884997659">
                    <Phone className="w-5 h-5 mr-2" />
                    Обади се сега
                  </a>
                </Button>
              </div>
              <CalculatorDialog type="roof" />
              <div className="flex flex-wrap gap-4 text-sm">
                {["Безплатен оглед", "Работа по договор", "Гаранция 15 години", "Реални снимки от обекти"].map((item) => (
                  <div key={item} className="flex items-center gap-2 bg-primary/70 backdrop-blur-sm px-3 py-1.5 rounded-full">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-white/90">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 2. TRUST INDICATORS */}
        <TrustIndicators />

        {/* 3. CERTIFICATIONS BAR */}
        <CertificationsBar />

        {/* 4. SERVICES CAROUSEL (с цени в картичките) */}
        <Services />
        
        {/* Двоен CTA след услугите */}
        <div className="bg-background py-8">
          <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8">
              <Link to={getPath('contact')}>
                <Eye className="w-5 h-5 mr-2" />
                Заяви безплатен оглед
              </Link>
            </Button>
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8">
              <a href="tel:0884997659">
                <Phone className="w-5 h-5 mr-2" />
                088 499 7659
              </a>
            </Button>
          </div>
        </div>

        {/* 5. ПОРТФОЛИО */}
        <CompletedProjects />

        {/* Двоен CTA след портфолио */}
        <div className="bg-background py-8">
          <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8">
              <Link to={getPath('contact')}>
                <FileText className="w-5 h-5 mr-2" />
                Получи оферта
              </Link>
            </Button>
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8">
              <a href="tel:0884997659">
                <Phone className="w-5 h-5 mr-2" />
                Обади се сега
              </a>
            </Button>
          </div>
        </div>

        {/* 6. КАК РАБОТИМ */}
        <HowWeWork />

        {/* CTA РАЗДЕЛИТЕЛНА ЛЕНТА 1 */}
        <section className="py-10 bg-slate-800 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Имате проблем с покрива? Не чакайте да стане по-лошо.</h2>
            <p className="text-white/80 mb-6 max-w-xl mx-auto">Свържете се с нас за безплатна консултация и оглед на място.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8">
                <Link to={getPath('contact')}>
                  <Eye className="w-5 h-5 mr-2" />
                  Заяви безплатен оглед
                </Link>
              </Button>
              <Button asChild size="lg" className="bg-transparent border-2 border-white text-white hover:bg-white/20 text-lg px-8">
                <a href="tel:0884997659">
                  <Phone className="w-5 h-5 mr-2" />
                  Обади се сега
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* 7. ЗАЩО ДА ИЗБЕРЕТЕ НАС */}
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
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-foreground text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 8. ПОЛУЧЕТЕ ТОЧНА ЦЕНА */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Получете точна цена за вашия ремонт</h2>
              <p className="text-muted-foreground text-lg mb-3">
                Всеки покрив е различен. Свържете се с нас за безплатен оглед и ще получите точна оферта, съобразена с вашия конкретен случай.
              </p>
              <p className="text-muted-foreground mb-8">
                Без скрити разходи. Без ангажимент. Само ясна цена.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8">
                  <Link to={getPath('contact')}>
                    <Eye className="w-5 h-5 mr-2" />
                    Заяви безплатен оглед
                  </Link>
                </Button>
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8">
                  <a href="tel:0884997659">
                    <Phone className="w-5 h-5 mr-2" />
                    088 499 7659
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* 9. ОТЗИВИ */}
        <Testimonials />

        {/* 10. КАЛКУЛАТОР */}
        <PriceCalculator />

        {/* CTA РАЗДЕЛИТЕЛНА ЛЕНТА 2 */}
        <section className="py-10 bg-slate-800 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Нуждаете се от професионален ремонт на покрива?</h2>
            <p className="text-white/80 mb-6 max-w-xl mx-auto">Нашият екип е готов да помогне. Обадете се или заявете оглед онлайн.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8">
                <Link to={getPath('contact')}>
                  <FileText className="w-5 h-5 mr-2" />
                  Получи оферта
                </Link>
              </Button>
              <Button asChild size="lg" className="bg-transparent border-2 border-white text-white hover:bg-white/20 text-lg px-8">
                <a href="tel:0884997659">
                  <Phone className="w-5 h-5 mr-2" />
                  Обади се сега
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* 11. ПОДРОБЕН ПРОЦЕС (образователно) */}
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

        {/* 12. ПРОБЛЕМИ + ПОСЛЕДСТВИЯ (образователно) */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">{t('pages.roofRepair.problemsSection.title')}</h2>
              <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">{t('pages.roofRepair.problemsSection.subtitle')}</p>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
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

              {/* Последствия */}
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

        {/* 13. МАТЕРИАЛИ (образователно) */}
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

        {/* 14. ФАКТИ И ДОВЕРИЕ */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Факти и доверие</h2>
              <p className="text-muted-foreground mb-10 max-w-2xl mx-auto">Числата говорят сами за себе си</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
                {[
                  { icon: Calendar, label: "15+ години опит", desc: "В покривните ремонти" },
                  { icon: Shield, label: "Гаранция до 15 г.", desc: "На труд и материали" },
                  { icon: Users, label: "500+ обекта", desc: "Завършени проекти" },
                  { icon: Award, label: "Член на КСБ", desc: "Камара на строителите" },
                ].map((item, index) => (
                  <div key={index} className="flex flex-col items-center gap-3 p-5 bg-background rounded-xl border border-border">
                    <item.icon className="w-10 h-10 text-primary" />
                    <span className="font-bold text-foreground text-sm">{item.label}</span>
                    <span className="text-muted-foreground text-xs">{item.desc}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8">
                  <Link to={getPath('contact')}>
                    <Eye className="w-5 h-5 mr-2" />
                    Заяви безплатен оглед
                  </Link>
                </Button>
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8">
                  <a href="tel:0884997659">
                    <Phone className="w-5 h-5 mr-2" />
                    Обади се сега
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* 15. FAQ */}
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

        {/* 16. ФИНАЛЕН CTA */}
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
      </main>

      <Footer />
      <FloatingCallButton />
    </>
  );
};

export default RoofRepairPage;
