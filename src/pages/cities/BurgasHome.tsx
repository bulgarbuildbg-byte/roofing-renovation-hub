import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Phone, MapPin, Clock, Shield, CheckCircle, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCity } from "@/contexts/CityContext";
import Header from "@/components/Header";
import TrustIndicators from "@/components/TrustIndicators";
import CertificationsBar from "@/components/CertificationsBar";
import BrandCarousel from "@/components/BrandCarousel";
import Services from "@/components/Services";
import HowWeWork from "@/components/HowWeWork";
import CTASection from "@/components/CTASection";
import WhyChooseUs from "@/components/WhyChooseUs";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import CalculatorDialog from "@/components/CalculatorDialog";
import heroImage from "@/assets/hero-homepage.jpg";

const BASE_URL = "https://www.remontnapokrivivarna.bg";

/**
 * BurgasHome — main page for /bg/burgas/
 * 
 * SEO targets:
 * - H1: "Ремонт на Покриви Бургас"
 * - Title: "Ремонт на Покриви Бургас — Безплатен Оглед 24ч | 088 499 7659"
 * - Canonical: /bg/burgas/
 * - JSON-LD RoofingContractor with areaServed: Бургас
 */
const BurgasHome = () => {
  const { cityData } = useCity();
  const canonical = `${BASE_URL}/bg/burgas/`;

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "RoofingContractor",
    "name": `Ремонт на Покриви ${cityData.nameBg}`,
    "legalName": "Булгар Билд ЕООД",
    "vatID": "BG207210238",
    "taxID": "207210238",
    "image": `${BASE_URL}/og-image.jpg`,
    "logo": { "@type": "ImageObject", "url": `${BASE_URL}/favicon.png` },
    "description": `Професионален ремонт на покриви, хидроизолация и изграждане на нови покриви в ${cityData.nameBg} и региона. Над 15 години опит, писмена гаранция 15 години.`,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": cityData.nameBg,
      "addressRegion": cityData.region,
      "postalCode": cityData.postalCode,
      "addressCountry": "BG",
    },
    "geo": { "@type": "GeoCoordinates", "latitude": cityData.geo.lat, "longitude": cityData.geo.lng },
    "telephone": `+359${cityData.phoneTel.substring(1)}`,
    "email": cityData.email,
    "url": canonical,
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "08:00",
        "closes": "18:00",
      },
    ],
    "areaServed": [
      { "@type": "City", "name": cityData.nameBg },
      ...cityData.neighborhoods.map((n) => ({ "@type": "Place", "name": `${n}, ${cityData.nameBg}` })),
    ],
    "priceRange": "$$",
    "currenciesAccepted": "BGN",
    "paymentAccepted": "Cash, Bank Transfer",
    "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "127" },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Начало", "item": `${BASE_URL}/bg` },
      { "@type": "ListItem", "position": 2, "name": cityData.nameBg, "item": canonical },
    ],
  };

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Ремонт на Покриви Бургас — Безплатен Оглед 24ч | 088 499 7659</title>
        <meta
          name="description"
          content="Професионален ремонт на покриви в Бургас — хидроизолация, нови покриви, ремонт на течове. Безплатен оглед, 15 години писмена гаранция. Тел: 088 499 7659."
        />
        <meta name="keywords" content="ремонт на покриви Бургас, хидроизолация Бургас, нов покрив Бургас, покривни услуги Бургас" />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <meta property="og:title" content="Ремонт на Покриви Бургас — Безплатен Оглед 24ч" />
        <meta property="og:description" content="Професионален ремонт на покриви в Бургас. 15 години гаранция. Тел: 088 499 7659." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={`${BASE_URL}/og-image.jpg`} />
        <script type="application/ld+json">{JSON.stringify(localBusinessSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <Header />

      {/* City-specific Hero */}
      <section className="relative min-h-[85vh] md:min-h-screen flex items-center justify-center overflow-hidden pt-20 md:pt-24">
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt={`Ремонт на покриви ${cityData.nameBg}`}
            fetchPriority="high"
            decoding="sync"
            className="absolute inset-0 w-full h-full object-cover"
            width={1920}
            height={1080}
          />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_20%,_rgba(15,23,42,0.55)_70%,_rgba(15,23,42,0.85)_100%)]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/70 via-[#0f172a]/30 to-transparent" />
        </div>

        <div className="container mx-auto px-4 py-12 md:py-20 relative z-10">
          <div className="max-w-4xl">
            <div className="flex flex-wrap gap-2 md:gap-4 mb-6 md:mb-8">
              <span className="inline-flex items-center gap-1.5 bg-primary/70 backdrop-blur-sm text-white/90 px-3 py-1.5 rounded-full text-sm font-medium">
                <CheckCircle className="w-4 h-4 text-green-400" />
                15+ години опит
              </span>
              <span className="inline-flex items-center gap-1.5 bg-primary/70 backdrop-blur-sm text-white/90 px-3 py-1.5 rounded-full text-sm font-medium">
                <Shield className="w-4 h-4 text-green-400" />
                15 години писмена гаранция
              </span>
              <span className="inline-flex items-center gap-1.5 bg-primary/70 backdrop-blur-sm text-white/90 px-3 py-1.5 rounded-full text-sm font-medium">
                <MapPin className="w-4 h-4 text-green-400" />
                Цял регион Бургас
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-4 md:mb-6 leading-tight [text-shadow:_0_3px_16px_rgba(0,0,0,0.9),_0_1px_4px_rgba(0,0,0,0.8)]">
              Ремонт на Покриви Бургас
            </h1>

            <p className="text-lg md:text-xl lg:text-2xl text-primary-foreground/90 mb-6 md:mb-8 max-w-2xl [text-shadow:_0_2px_8px_rgba(0,0,0,0.6)]">
              Професионален ремонт на покриви, хидроизолация и нови покриви в Бургас. Безплатен оглед в рамките на 24 часа.
            </p>

            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                <Button asChild size="lg" className="w-full sm:w-auto h-12 md:h-16 bg-accent hover:bg-accent/90 text-accent-foreground text-base md:text-lg font-bold px-5 md:px-8 shadow-lg whitespace-nowrap">
                  <Link to="/bg/bezplaten-ogled">Безплатен оглед в Бургас</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="w-full sm:w-auto h-12 md:h-16 bg-primary/40 backdrop-blur-sm border-2 border-white/80 text-primary-foreground hover:bg-primary-foreground hover:text-primary text-base md:text-lg font-bold px-4 md:px-8">
                  <a href={`tel:${cityData.phoneTel}`} className="flex items-center justify-center gap-2">
                    <Phone className="w-5 h-5" />
                    {cityData.phone}
                  </a>
                </Button>
              </div>
              <div className="flex justify-center lg:justify-end">
                <CalculatorDialog type="roof" />
              </div>
            </div>

            <p className="mt-6 text-primary-foreground/80 text-sm md:text-base">
              ⚡ Аварийни ремонти 24/7 — звъннете още сега
            </p>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent z-10" />
      </section>

      <TrustIndicators />
      <CertificationsBar />
      <BrandCarousel />
      <Services />
      <HowWeWork />

      {/* Neighborhoods served — city-specific */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Обслужваме всички квартали в Бургас
            </h2>
            <p className="text-lg text-muted-foreground">
              Нашият екип работи в целия град и околностите. Без значение в кой квартал се намирате — ние идваме на адреса Ви за безплатен оглед.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 max-w-4xl mx-auto">
            {cityData.neighborhoods.map((n) => (
              <div
                key={n}
                className="flex items-center gap-2 bg-background border border-border rounded-lg px-4 py-3 hover:border-primary transition-colors"
              >
                <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-sm font-medium text-foreground">{n}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />

      <CTASection
        title="Поискайте безплатен оглед в Бургас"
        subtitle="Нашият екип ще дойде на адреса Ви в рамките на 24 часа — без ангажимент."
      />

      <WhyChooseUs />
      <About />

      {/* City-specific contact block */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
              Контакти за Бургас
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <a
                href={`tel:${cityData.phoneTel}`}
                className="flex items-start gap-4 p-6 bg-muted/30 rounded-lg border border-border hover:border-primary transition-colors"
              >
                <Phone className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Телефон</p>
                  <p className="text-xl font-bold text-foreground">{cityData.phone}</p>
                  <p className="text-sm text-accent mt-1">Аварии 24/7</p>
                </div>
              </a>
              <div className="flex items-start gap-4 p-6 bg-muted/30 rounded-lg border border-border">
                <Clock className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Работно време</p>
                  <p className="text-lg font-bold text-foreground">Пон–Съб 08:00–18:00</p>
                  <p className="text-sm text-muted-foreground mt-1">Аварии 24/7</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Contact />
      <Footer />
    </div>
  );
};

export default BurgasHome;
