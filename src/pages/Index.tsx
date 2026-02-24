import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TrustIndicators from "@/components/TrustIndicators";
import BrandCarousel from "@/components/BrandCarousel";
import FloatingCallButton from "@/components/FloatingCallButton";
import MobileBottomBar from "@/components/MobileBottomBar";
import ChatBot from "@/components/ChatBot";
import Services from "@/components/Services";
import CTASection from "@/components/CTASection";
import WhyChooseUs from "@/components/WhyChooseUs";
import About from "@/components/About";
import Gallery from "@/components/Gallery";
import BeforeAfterGallery from "@/components/BeforeAfterGallery";
import Testimonials from "@/components/Testimonials";
import HomeFAQ from "@/components/HomeFAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import PriceCalculator from "@/components/PriceCalculator";

const Index = () => {
  const { t } = useTranslation();

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "RoofingContractor",
    "name": "Ремонт на Покриви Варна",
    "image": "https://www.remontnapokrivivarna.bg/og-image.jpg",
    "logo": "https://www.remontnapokrivivarna.bg/favicon.png",
    "description": "Професионален ремонт на покриви и хидроизолация във Варна.",
    "address": { "@type": "PostalAddress", "streetAddress": "ул. Уста Колю Фичето 25 А", "addressLocality": "Варна", "addressRegion": "Варна", "postalCode": "9000", "addressCountry": "BG" },
    "telephone": "+359884997659",
    "email": "remontnapokrivivarna@abv.bg",
    "url": "https://www.remontnapokrivivarna.bg",
    "openingHoursSpecification": [{ "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"], "opens": "08:00", "closes": "18:00" }],
    "areaServed": { "@type": "GeoCircle", "geoMidpoint": { "@type": "GeoCoordinates", "latitude": 43.2141, "longitude": 27.9147 }, "geoRadius": "50000" },
    "priceRange": "$$",
    "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "127" },
  };

  const websiteSchema = {
    "@context": "https://schema.org", "@type": "WebSite",
    "name": "Ремонт на Покриви Варна", "url": "https://www.remontnapokrivivarna.bg",
  };

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>{t('meta.homeTitle')}</title>
        <meta name="description" content={t('meta.homeDesc')} />
        <meta name="keywords" content={t('meta.homeKeywords')} />
        <meta property="og:title" content={t('meta.homeTitle')} />
        <meta property="og:description" content={t('meta.homeDesc')} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.remontnapokrivivarna.bg/" />
        <meta property="og:image" content="https://www.remontnapokrivivarna.bg/og-image.jpg" />
        <link rel="canonical" href="https://www.remontnapokrivivarna.bg/" />
        <script type="application/ld+json">{JSON.stringify(localBusinessSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(websiteSchema)}</script>
      </Helmet>

      <Header />
      <Hero />
      <TrustIndicators />
      <BrandCarousel />
      <Services />
      <PriceCalculator />
      <CTASection 
        title={t('cta.inspectionTitle')}
        subtitle={t('cta.inspectionSubtitle')}
      />
      <WhyChooseUs />
      <About />
      <Gallery />
      <BeforeAfterGallery />
      <Testimonials />
      <CTASection 
        variant="accent"
        title={t('cta.offerTitle')}
        subtitle={t('cta.offerSubtitle')}
      />
      <HomeFAQ />
      <Contact />
      <CTASection 
        variant="emergency"
        title={t('cta.emergencyTitle')}
        subtitle={t('cta.emergencySubtitle')}
      />
      <Footer />
      <FloatingCallButton />
      <MobileBottomBar />
      <ChatBot />
      <div className="h-20 md:hidden" />
    </div>
  );
};

export default Index;
