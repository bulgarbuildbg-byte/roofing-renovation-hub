import { lazy, Suspense } from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TrustIndicators from "@/components/TrustIndicators";
import CertificationsBar from "@/components/CertificationsBar";
import BrandCarousel from "@/components/BrandCarousel";
import Services from "@/components/Services";
import CTASection from "@/components/CTASection";
import WhyChooseUs from "@/components/WhyChooseUs";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import FloatingCallButton from "@/components/FloatingCallButton";
import MobileBottomBar from "@/components/MobileBottomBar";

// Below-the-fold sections — lazy loaded to keep initial bundle small
const Gallery = lazy(() => import("@/components/Gallery"));
const BeforeAfterGallery = lazy(() => import("@/components/BeforeAfterGallery"));
const PriceCalculator = lazy(() => import("@/components/PriceCalculator"));
const HomeFAQ = lazy(() => import("@/components/HomeFAQ"));
const ChatBot = lazy(() => import("@/components/ChatBot"));

const Index = () => {
  const { t } = useTranslation();

  const BASE_URL = "https://www.remontnapokrivivarna.bg";

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "RoofingContractor",
    "name": "Ремонт на Покриви Варна",
    "legalName": "България Билд ЕООД",
    "image": `${BASE_URL}/og-image.jpg`,
    "logo": { "@type": "ImageObject", "url": `${BASE_URL}/favicon.png` },
    "description": "Професионален ремонт на покриви, хидроизолация и изграждане на нови покриви във Варна и региона. Над 15 години опит, писмена гаранция до 10 години.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "ул. Уста Колю Фичето 25 А",
      "addressLocality": "Варна",
      "addressRegion": "Варна",
      "postalCode": "9000",
      "addressCountry": "BG"
    },
    "geo": { "@type": "GeoCoordinates", "latitude": 43.2141, "longitude": 27.9147 },
    "telephone": "+359884997659",
    "email": "remontnapokrivivarna@abv.bg",
    "url": BASE_URL,
    "sameAs": ["https://bulgarbuild.com/"],
    "openingHoursSpecification": [
      { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"], "opens": "08:00", "closes": "18:00" }
    ],
    "areaServed": [
      { "@type": "City", "name": "Варна" },
      { "@type": "City", "name": "Аксаково" },
      { "@type": "City", "name": "Долен Чифлик" },
      { "@type": "City", "name": "Провадия" }
    ],
    "priceRange": "$$",
    "currenciesAccepted": "BGN",
    "paymentAccepted": "Cash, Bank Transfer",
    "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "127" },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Покривни Услуги",
      "itemListElement": [
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Ремонт на покриви Варна" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Хидроизолация Варна" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Изграждане на покриви Варна" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Метални покриви Варна" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Плоски покриви Варна" } }
      ]
    }
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Ремонт на Покриви Варна",
    "url": BASE_URL,
    "potentialAction": {
      "@type": "SearchAction",
      "target": { "@type": "EntryPoint", "urlTemplate": `${BASE_URL}/bg/блог?q={search_term_string}` },
      "query-input": "required name=search_term_string"
    }
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "България Билд ЕООД",
    "alternateName": "Ремонт на Покриви Варна",
    "url": BASE_URL,
    "logo": `${BASE_URL}/favicon.png`,
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+359-88-499-7659",
      "contactType": "customer service",
      "areaServed": "BG",
      "availableLanguage": ["Bulgarian", "Russian", "English"]
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Начало", "item": BASE_URL }
    ]
  };

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>{t('meta.homeTitle')}</title>
        <meta name="description" content={t('meta.homeDesc')} />
        <meta name="keywords" content={t('meta.homeKeywords')} />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <meta property="og:title" content={t('meta.homeTitle')} />
        <meta property="og:description" content={t('meta.homeDesc')} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${BASE_URL}/bg`} />
        <meta property="og:image" content={`${BASE_URL}/og-image.jpg`} />
        <meta property="og:image:width" content="1920" />
        <meta property="og:image:height" content="1080" />
        <meta property="og:locale" content="bg_BG" />
        <meta property="og:site_name" content="Ремонт на Покриви Варна" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t('meta.homeTitle')} />
        <meta name="twitter:description" content={t('meta.homeDesc')} />
        <meta name="twitter:image" content={`${BASE_URL}/og-image.jpg`} />
        <script type="application/ld+json">{JSON.stringify(localBusinessSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(websiteSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(organizationSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <Header />
      <Hero />
      <TrustIndicators />
      <CertificationsBar />
      <BrandCarousel />
      <Services />
      <Testimonials />

      {/* Below-the-fold — lazy loaded */}
      <Suspense fallback={<div className="h-96" />}>
        <PriceCalculator />
      </Suspense>
      <CTASection 
        title={t('cta.inspectionTitle')}
        subtitle={t('cta.inspectionSubtitle')}
      />
      <WhyChooseUs />
      <About />
      <Suspense fallback={<div className="h-96" />}>
        <Gallery />
      </Suspense>
      <Suspense fallback={<div className="h-96" />}>
        <BeforeAfterGallery />
      </Suspense>
      <CTASection 
        variant="accent"
        title={t('cta.offerTitle')}
        subtitle={t('cta.offerSubtitle')}
      />
      <Suspense fallback={<div className="h-64" />}>
        <HomeFAQ />
      </Suspense>
      <Contact />
      <CTASection 
        variant="emergency"
        title={t('cta.emergencyTitle')}
        subtitle={t('cta.emergencySubtitle')}
      />
      <Footer />
      <FloatingCallButton />
      <MobileBottomBar />
      <Suspense fallback={null}>
        <ChatBot />
      </Suspense>
      <div className="h-20 md:hidden" />
    </div>
  );
};

export default Index;
