import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Phone, Eye, CheckCircle, MapPin, Clock, Shield, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useCity } from "@/contexts/CityContext";
import { useLocalizedPath } from "@/hooks/useLocalizedPath";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TrustIndicators from "@/components/TrustIndicators";
import CertificationsBar from "@/components/CertificationsBar";
import HowWeWork from "@/components/HowWeWork";
import Testimonials from "@/components/Testimonials";
import PriceCalculator from "@/components/PriceCalculator";
import CalculatorDialog from "@/components/CalculatorDialog";
import type { CityServiceContent } from "@/data/cityServices";
import { localizedSlugs } from "@/i18n/routes";

const BASE_URL = "https://www.remontnapokrivivarna.bg";

interface CityServiceTemplateProps {
  service: CityServiceContent;
}

const interpolate = (text: string, city: string) => text.replace(/\{city\}/g, city);

const CityServiceTemplate = ({ service }: CityServiceTemplateProps) => {
  const { cityData } = useCity();
  const { getPath } = useLocalizedPath();
  const cityName = cityData.nameBg;
  const citySlug = cityData.slug;
  const serviceSlug = localizedSlugs.bg[service.routeKey];

  const h1 = `${service.h1Prefix} ${cityName}`;
  const title = `${service.titlePrefix} ${cityName} — Безплатен Оглед 24ч | 088 499 7659`;
  const description = interpolate(service.metaDescription, cityName);
  const canonical = `${BASE_URL}/bg/${citySlug}/${serviceSlug}`;
  const ogImage = `${BASE_URL}/og-image.jpg`;

  const benefits = service.benefits.map((b) => interpolate(b, cityName));
  const faqs = service.faqs.map((f) => ({
    q: interpolate(f.q, cityName),
    a: interpolate(f.a, cityName),
  }));

  // JSON-LD: Service with city-specific provider
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": h1,
    "description": interpolate(service.schemaDescription, cityName),
    "areaServed": {
      "@type": "City",
      "name": cityName,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": cityName,
        "postalCode": cityData.postalCode,
        "addressCountry": "BG",
      },
    },
    "provider": {
      "@type": "RoofingContractor",
      "name": `Ремонт на Покриви ${cityName}`,
      "legalName": "Булгар Билд ЕООД",
      "telephone": `+359${cityData.phoneTel.substring(1)}`,
      "email": cityData.email,
      "url": canonical,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": cityName,
        "postalCode": cityData.postalCode,
        "addressRegion": cityData.region,
        "addressCountry": "BG",
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": cityData.geo.lat,
        "longitude": cityData.geo.lng,
      },
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((f) => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": { "@type": "Answer", "text": f.a },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Начало", "item": `${BASE_URL}/bg` },
      { "@type": "ListItem", "position": 2, "name": cityName, "item": `${BASE_URL}/bg/${citySlug}` },
      { "@type": "ListItem", "position": 3, "name": h1, "item": canonical },
    ],
  };

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:locale" content="bg_BG" />
        <meta property="og:site_name" content={`Ремонт на Покриви ${cityName}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />
        <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <Header />

      <main className="pt-20">
        {/* HERO */}
        <section className="relative bg-black text-white py-16 md:py-24 overflow-hidden">
          <img
            src={service.heroImage}
            alt={`${h1} — професионални услуги`}
            className="absolute inset-0 w-full h-full object-cover"
            loading="eager"
            width={1920}
            height={1080}
          />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_20%,_rgba(15,23,42,0.6)_70%,_rgba(15,23,42,0.9)_100%)]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/75 via-[#0f172a]/35 to-transparent" />
          <div className="container mx-auto px-4 relative z-10">
            <nav className="text-sm mb-6 text-white/70">
              <Link to={getPath("home")} className="hover:text-white">Начало</Link>
              <span className="mx-2">/</span>
              <Link to={`/bg/${citySlug}`} className="hover:text-white">{cityName}</Link>
              <span className="mx-2">/</span>
              <span className="text-white">{service.titlePrefix}</span>
            </nav>
            <div className="max-w-4xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 [text-shadow:_0_3px_16px_rgba(0,0,0,0.9)]">
                {h1}
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-3xl mb-6 [text-shadow:_0_2px_8px_rgba(0,0,0,0.6)]">
                {service.heroSubtitle}
              </p>
              {service.priceHint && (
                <div className="inline-block bg-green-500/20 border border-green-400/40 backdrop-blur-sm px-4 py-2 rounded-lg mb-6">
                  <span className="text-green-300 font-semibold">{service.priceHint}</span>
                </div>
              )}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8 shadow-lg">
                  <Link to={getPath("contact")}>
                    <Eye className="w-5 h-5 mr-2" />
                    Заяви безплатен оглед
                  </Link>
                </Button>
                <Button asChild size="lg" className="bg-primary/40 backdrop-blur-sm border-2 border-white/80 text-white hover:bg-white/20">
                  <a href={`tel:${cityData.phoneTel}`}>
                    <Phone className="w-5 h-5 mr-2" />
                    {cityData.phone}
                  </a>
                </Button>
              </div>
              <CalculatorDialog type="roof" />
              <div className="flex flex-wrap gap-3 text-sm mt-6">
                {[
                  `Обслужваме цял ${cityName}`,
                  "Безплатен оглед 24ч",
                  "Гаранция 15 години",
                  "Работа по договор",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 bg-primary/70 backdrop-blur-sm px-3 py-1.5 rounded-full">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-white/90">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <TrustIndicators />
        <CertificationsBar />

        {/* BENEFITS */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-4">
              Защо да изберете нас за {service.titlePrefix.toLowerCase()} в {cityName}
            </h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              Над 15 години опит на покриви в {cityName} и региона
            </p>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {benefits.map((benefit, idx) => (
                <Card key={idx} className="border-border bg-card">
                  <CardContent className="p-6 flex gap-4">
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <p className="text-card-foreground">{benefit}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA BAND 1 */}
        <section className="py-10 bg-slate-800 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              Имате нужда от {service.titlePrefix.toLowerCase()} в {cityName}?
            </h2>
            <p className="text-white/80 mb-6 max-w-xl mx-auto">
              Безплатен оглед на място. Точна оферта без скрити разходи.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8">
                <Link to={getPath("contact")}>
                  <Eye className="w-5 h-5 mr-2" />
                  Заяви безплатен оглед
                </Link>
              </Button>
              <Button asChild size="lg" className="bg-transparent border-2 border-white text-white hover:bg-white/20 text-lg px-8">
                <a href={`tel:${cityData.phoneTel}`}>
                  <Phone className="w-5 h-5 mr-2" />
                  {cityData.phone}
                </a>
              </Button>
            </div>
          </div>
        </section>

        <HowWeWork />

        {/* NEIGHBORHOODS */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              Обслужваме всички квартали на {cityName}
            </h2>
            <p className="text-muted-foreground mb-8">Бърза реакция в целия град и региона</p>
            <div className="flex flex-wrap gap-2 justify-center max-w-4xl mx-auto">
              {cityData.neighborhoods.map((n) => (
                <div key={n} className="flex items-center gap-1.5 bg-background border border-border px-3 py-1.5 rounded-full text-sm">
                  <MapPin className="w-3.5 h-3.5 text-primary" />
                  <span className="text-foreground">{n}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Testimonials />
        <PriceCalculator />

        {/* PACKAGES (only for maintenance) */}
        {service.packages && (
          <section id="packages" className="py-16 bg-secondary">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-4">
                Абонаментни пакети за поддръжка в {cityName}
              </h2>
              <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
                Изберете пакет, който отговаря на вашите нужди — превенцията струва 10 пъти по-малко от ремонта
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                {service.packages.map((pkg, index) => (
                  <Card key={index} className={`border-border bg-card ${pkg.popular ? 'ring-2 ring-primary relative' : ''}`}>
                    <CardContent className="p-6 flex flex-col h-full">
                      {pkg.popular && (
                        <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 text-xs font-semibold text-primary-foreground bg-primary rounded-full">
                          Най-предпочитан
                        </span>
                      )}
                      <h3 className="text-xl font-bold text-card-foreground mb-2">{pkg.title}</h3>
                      <p className="text-2xl font-bold text-primary mb-3">{pkg.price}</p>
                      <div className="bg-muted/40 rounded-lg p-3 mb-4">
                        <p className="text-xs font-semibold text-foreground mb-1">Подходящ за:</p>
                        <p className="text-xs text-muted-foreground">{pkg.suitableFor}</p>
                      </div>
                      <ul className="space-y-2 mb-6 flex-grow">
                        {pkg.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <CheckCircle className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <Button asChild className="w-full mt-auto" variant={pkg.popular ? "default" : "outline"}>
                        <Link to={getPath('contact')}>Заявете оферта</Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* FAQ */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-4">
              Често задавани въпроси
            </h2>
            <p className="text-muted-foreground text-center mb-12">
              Отговори на най-честите въпроси за {service.titlePrefix.toLowerCase()} в {cityName}
            </p>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, idx) => (
                <AccordionItem key={idx} value={`item-${idx}`}>
                  <AccordionTrigger className="text-left text-lg">{faq.q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* CONTACT BAND */}
        <section className="py-16 bg-slate-900 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Свържете се с нас в {cityName}
              </h2>
              <p className="text-white/80 mb-8 text-lg">
                Безплатен оглед, точна оферта, писмена гаранция 15 години.
              </p>
              <div className="grid sm:grid-cols-3 gap-6 mb-8">
                <div className="flex flex-col items-center gap-2">
                  <Phone className="w-6 h-6 text-accent" />
                  <a href={`tel:${cityData.phoneTel}`} className="text-white hover:text-accent font-semibold">
                    {cityData.phone}
                  </a>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Clock className="w-6 h-6 text-accent" />
                  <span className="text-white/90 text-sm text-center">
                    {cityData.workingHours}<br />
                    {cityData.emergency}
                  </span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Shield className="w-6 h-6 text-accent" />
                  <span className="text-white/90 text-sm">Гаранция 15 г.</span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8">
                  <Link to={getPath("contact")}>
                    <FileText className="w-5 h-5 mr-2" />
                    Получи оферта
                  </Link>
                </Button>
                <Button asChild size="lg" className="bg-transparent border-2 border-white text-white hover:bg-white/20 text-lg px-8">
                  <a href={`tel:${cityData.phoneTel}`}>
                    <Phone className="w-5 h-5 mr-2" />
                    Обади се сега
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default CityServiceTemplate;
