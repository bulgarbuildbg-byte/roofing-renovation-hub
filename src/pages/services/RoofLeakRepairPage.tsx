import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCallButton from "@/components/FloatingCallButton";
import CTASection from "@/components/CTASection";
import RelatedServices from "@/components/RelatedServices";
import LearnMoreLinks from "@/components/LearnMoreLinks";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, CheckCircle, AlertTriangle, Droplets, Clock, Shield, Wrench, MapPin, Search, ThermometerSun, Home, Hammer } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLocalizedPath } from "@/hooks/useLocalizedPath";

// Process images - Leak repair
import leakInspection from "@/assets/process/roof-repair-leak-diagnosis-attic-01.jpg";
import emergencyTarp from "@/assets/process/roof-repair-structural-damage-01.jpg";
import thermalInspection from "@/assets/process/thermal-inspection.jpg";
import leakPatching from "@/assets/process/leak-patching.jpg";
import leakTesting from "@/assets/process/leak-testing.jpg";
import warrantyHandover from "@/assets/process/warranty-handover.jpg";

const RoofLeakRepairPage = () => {
  const { t } = useTranslation();
  const { getPath } = useLocalizedPath();

  const relatedServices = [
    { title: t('pages.leakRepair.related.0.title'), description: t('pages.leakRepair.related.0.desc'), href: getPath('waterproofing') },
    { title: t('pages.leakRepair.related.1.title'), description: t('pages.leakRepair.related.1.desc'), href: getPath('roofRepair') },
    { title: t('pages.leakRepair.related.2.title'), description: t('pages.leakRepair.related.2.desc'), href: getPath('flatRoof') },
  ];

  const learnMoreLinks = [
    { title: t('pages.leakRepair.learnMore.0'), href: `/${t('pages.leakRepair.blogSlug')}/5-признака-че-покривът-се-нуждае-от-ремонт` },
    { title: t('pages.leakRepair.learnMore.1'), href: `/${t('pages.leakRepair.blogSlug')}/видове-хидроизолация-и-кога-да-изберем-всяка` },
  ];

  const services = Array.from({ length: 8 }, (_, i) => t(`pages.leakRepair.servicesList.${i}`));

  const signs = Array.from({ length: 6 }, (_, i) => ({
    title: t(`pages.leakRepair.signs.${i}.title`),
    description: t(`pages.leakRepair.signs.${i}.desc`),
  }));

  const causes = Array.from({ length: 6 }, (_, i) => ({
    title: t(`pages.leakRepair.causes.${i}.title`),
    description: t(`pages.leakRepair.causes.${i}.desc`),
    solution: t(`pages.leakRepair.causes.${i}.solution`),
  }));

  const process = [
    { step: 1, image: leakInspection },
    { step: 2, image: emergencyTarp },
    { step: 3, image: thermalInspection },
    { step: 4, image: leakPatching },
    { step: 5, image: leakTesting },
    { step: 6, image: warrantyHandover },
  ].map((s, i) => ({
    ...s,
    title: t(`pages.leakRepair.process.${i}.title`),
    description: t(`pages.leakRepair.process.${i}.desc`),
    imageAlt: t(`pages.leakRepair.process.${i}.alt`),
  }));

  const benefits = [
    { icon: Clock, title: t('pages.leakRepair.benefits.0.title'), description: t('pages.leakRepair.benefits.0.desc') },
    { icon: Search, title: t('pages.leakRepair.benefits.1.title'), description: t('pages.leakRepair.benefits.1.desc') },
    { icon: Wrench, title: t('pages.leakRepair.benefits.2.title'), description: t('pages.leakRepair.benefits.2.desc') },
    { icon: Shield, title: t('pages.leakRepair.benefits.3.title'), description: t('pages.leakRepair.benefits.3.desc') },
  ];

  const priceRanges = Array.from({ length: 6 }, (_, i) => ({
    service: t(`pages.leakRepair.prices.${i}.service`),
    price: t(`pages.leakRepair.prices.${i}.price`),
    note: t(`pages.leakRepair.prices.${i}.note`),
  }));

  const serviceAreas = [
    { area: t('pages.leakRepair.areas.0.name'), neighborhoods: Array.from({ length: 5 }, (_, i) => t(`pages.leakRepair.areas.0.n${i}`)) },
    { area: t('pages.leakRepair.areas.1.name'), neighborhoods: Array.from({ length: 10 }, (_, i) => t(`pages.leakRepair.areas.1.n${i}`)) },
    { area: t('pages.leakRepair.areas.2.name'), neighborhoods: Array.from({ length: 9 }, (_, i) => t(`pages.leakRepair.areas.2.n${i}`)) },
  ];

  const faqs = Array.from({ length: 6 }, (_, i) => ({
    question: t(`pages.leakRepair.faqs.${i}.q`),
    answer: t(`pages.leakRepair.faqs.${i}.a`),
  }));

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": t('pages.leakRepair.schema.name'),
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
    "description": t('pages.leakRepair.schema.desc'),
    "offers": { "@type": "AggregateOffer", "lowPrice": "50", "highPrice": "500", "priceCurrency": "BGN", "offerCount": "6" }
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
      { "@type": "ListItem", "position": 1, "name": t('pages.leakRepair.breadcrumb.home'), "item": "https://www.remontnapokrivivarna.bg" },
      { "@type": "ListItem", "position": 2, "name": t('pages.leakRepair.breadcrumb.services'), "item": "https://www.remontnapokrivivarna.bg/services" },
      { "@type": "ListItem", "position": 3, "name": t('pages.leakRepair.breadcrumb.current'), "item": "https://www.remontnapokrivivarna.bg/ремонт-течове" }
    ]
  };

  return (
    <>
      <Helmet>
        <title>{t('pages.leakRepair.meta.title')}</title>
        <meta name="description" content={t('pages.leakRepair.meta.desc')} />
        <meta property="og:title" content={t('pages.leakRepair.meta.ogTitle')} />
        <meta property="og:description" content={t('pages.leakRepair.meta.desc')} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.remontnapokrivivarna.bg/bg/ремонт-течове" />
        <meta property="og:image" content="https://www.remontnapokrivivarna.bg/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="bg_BG" />
        <meta property="og:site_name" content="Ремонт на Покриви Варна" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t('pages.leakRepair.meta.ogTitle')} />
        <meta name="twitter:description" content={t('pages.leakRepair.meta.desc')} />
        <meta name="twitter:image" content="https://www.remontnapokrivivarna.bg/og-image.jpg" />
        <meta name="keywords" content={t('pages.leakRepair.meta.keywords')} />
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
              <Link to={getPath('home')} className="hover:text-primary-foreground">{t('pages.leakRepair.breadcrumb.home')}</Link>
              <span className="mx-2">/</span>
              <Link to={getPath('services')} className="hover:text-primary-foreground">{t('pages.leakRepair.breadcrumb.services')}</Link>
              <span className="mx-2">/</span>
              <span>{t('pages.leakRepair.breadcrumb.current')}</span>
            </nav>
            
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 bg-accent/20 text-accent-foreground px-4 py-2 rounded-full mb-6">
                <AlertTriangle className="w-5 h-5" />
                <span className="font-medium">{t('pages.leakRepair.hero.badge')}</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">{t('pages.leakRepair.hero.title')}</h1>
              <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl">{t('pages.leakRepair.hero.subtitle')}</p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8">
                  <a href="tel:0884997659">
                    <Phone className="w-5 h-5 mr-2" />
                    {t('pages.leakRepair.hero.callBtn')}
                  </a>
                </Button>
                <Button asChild size="lg" className="bg-transparent border-2 border-white text-white hover:bg-white/20">
                  <Link to={getPath('contact')}>{t('pages.leakRepair.hero.inspectionBtn')}</Link>
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-accent" />
                  <span>{t('pages.leakRepair.hero.responseTime')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-accent" />
                  <span>{t('pages.leakRepair.hero.warranty')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-accent" />
                  <span>{t('pages.leakRepair.hero.freeDiag')}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">{t('pages.leakRepair.intro.title')}</h2>
              <div className="prose prose-lg text-muted-foreground space-y-4">
                <p>{t('pages.leakRepair.intro.p1')}</p>
                <p>{t('pages.leakRepair.intro.p2')}</p>
                <p>{t('pages.leakRepair.intro.p3')}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Signs of Leak */}
        <section className="py-16 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{t('pages.leakRepair.signsSection.title')}</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">{t('pages.leakRepair.signsSection.subtitle')}</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {signs.map((sign, index) => (
                <Card key={index} className="bg-background">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Droplets className="w-8 h-8 text-accent flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">{sign.title}</h3>
                        <p className="text-muted-foreground text-sm">{sign.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Causes and Solutions */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{t('pages.leakRepair.causesSection.title')}</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">{t('pages.leakRepair.causesSection.subtitle')}</p>
            </div>
            <div className="space-y-8 max-w-4xl mx-auto">
              {causes.map((cause, index) => (
                <div key={index} className="bg-secondary rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-3 flex items-center gap-3">
                    <AlertTriangle className="w-6 h-6 text-accent" />
                    {cause.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">{cause.description}</p>
                  <div className="bg-background rounded-lg p-4">
                    <p className="text-foreground">
                      <span className="font-semibold text-primary">{t('pages.leakRepair.causesSection.solutionLabel')} </span>
                      {cause.solution}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-16 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{t('pages.leakRepair.processSection.title')}</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">{t('pages.leakRepair.processSection.subtitle')}</p>
            </div>
            <div className="space-y-12">
              {process.map((item, index) => (
                <div key={index} className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 items-center`}>
                  <div className="lg:w-1/2">
                    <img src={item.image} alt={item.imageAlt} className="rounded-lg shadow-lg w-full h-64 object-cover" />
                  </div>
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

        {/* Services */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">{t('pages.leakRepair.servicesSection.title')}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
              {services.map((service, index) => (
                <div key={index} className="flex items-center gap-3 bg-secondary p-4 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0" />
                  <span className="text-foreground">{service}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16 bg-secondary">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">{t('pages.leakRepair.benefitsSection.title')}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {benefits.map((benefit, index) => (
                <Card key={index} className="bg-background">
                  <CardContent className="p-6 text-center">
                    <benefit.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h3 className="font-semibold text-foreground mb-2">{benefit.title}</h3>
                    <p className="text-muted-foreground text-sm">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{t('pages.leakRepair.pricingSection.title')}</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">{t('pages.leakRepair.pricingSection.subtitle')}</p>
            </div>
            <div className="max-w-3xl mx-auto">
              <div className="bg-secondary rounded-lg overflow-hidden">
                {priceRanges.map((item, index) => (
                  <div key={index} className={`flex flex-col md:flex-row md:items-center justify-between p-4 ${index !== priceRanges.length - 1 ? 'border-b border-border' : ''}`}>
                    <div className="mb-2 md:mb-0">
                      <span className="font-semibold text-foreground">{item.service}</span>
                      <span className="text-muted-foreground text-sm block md:inline md:ml-2">({item.note})</span>
                    </div>
                    <span className="text-primary font-bold text-lg">{item.price}</span>
                  </div>
                ))}
              </div>
              <p className="text-center text-muted-foreground mt-4 text-sm">{t('pages.leakRepair.pricingSection.note')}</p>
            </div>
          </div>
        </section>

        {/* Service Areas */}
        <section className="py-16 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{t('pages.leakRepair.areasSection.title')}</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">{t('pages.leakRepair.areasSection.subtitle')}</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12">
              {serviceAreas.map((area, index) => (
                <div key={index}>
                  <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-primary" />
                    {area.area}
                  </h3>
                  <ul className="space-y-2">
                    {area.neighborhoods.map((neighborhood, idx) => (
                      <li key={idx} className="text-muted-foreground text-sm flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-primary" />
                        {neighborhood}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="max-w-4xl mx-auto">
              <div className="rounded-lg overflow-hidden shadow-lg">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d93422.83869498367!2d27.8261!3d43.2141!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40a4538baaf3f891%3A0x5765ae67f35e9f47!2z0JLQsNGA0L3QsA!5e0!3m2!1sbg!2sbg!4v1699524000000!5m2!1sbg!2sbg"
                  width="100%" height="300" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                  title={t('pages.leakRepair.areasSection.mapTitle')}
                />
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{t('pages.leakRepair.faqSection.title')}</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">{t('pages.leakRepair.faqSection.subtitle')}</p>
            </div>
            <div className="max-w-3xl mx-auto space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-secondary rounded-lg p-6">
                  <h3 className="font-semibold text-foreground mb-3 text-lg">{faq.question}</h3>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <AlertTriangle className="w-16 h-16 mx-auto mb-6 text-accent" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('pages.leakRepair.cta.title')}</h2>
            <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">{t('pages.leakRepair.cta.subtitle')}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8">
                <a href="tel:+359884997659">
                  <Phone className="w-5 h-5 mr-2" />
                  088 499 7659
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
                <Link to={getPath('contact')}>{t('pages.leakRepair.cta.inspectionBtn')}</Link>
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

export default RoofLeakRepairPage;
