import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TrustIndicators from "@/components/TrustIndicators";
import FloatingCallButton from "@/components/FloatingCallButton";
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

const Index = () => {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "RoofingContractor",
    "name": "Ремонт на Покриви Варна",
    "image": "https://remontnapokrivivarna.com/og-image.jpg",
    "description": "Професионален ремонт на покриви и хидроизолация във Варна. Над 15 години опит, безплатен оглед и писмена гаранция.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "ул. Уста Колю Фичето 25 А",
      "addressLocality": "Варна",
      "addressRegion": "Варна",
      "postalCode": "9000",
      "addressCountry": "BG"
    },
    "telephone": "+359892701176",
    "email": "remontnapokrivivarna@abv.bg",
    "url": "https://remontnapokrivivarna.com",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "08:00",
        "closes": "18:00"
      }
    ],
    "areaServed": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": 43.2141,
        "longitude": 27.9147
      },
      "geoRadius": "50000"
    },
    "priceRange": "$$",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "127"
    }
  };

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Ремонт на Покриви Варна | Професионална Хидроизолация | Безплатен Оглед</title>
        <meta name="description" content="Професионален ремонт на покриви и хидроизолация във Варна. ✓ Над 15 години опит ✓ Безплатен оглед ✓ До 10 години гаранция. Обадете се: 089 270 1176" />
        <meta name="keywords" content="ремонт на покриви Варна, хидроизолация Варна, покривни услуги, течове покрив, нов покрив Варна, керемиди Варна" />
        <meta property="og:title" content="Ремонт на Покриви Варна | Професионална Хидроизолация" />
        <meta property="og:description" content="Професионален ремонт на покриви и хидроизолация във Варна. Над 15 години опит, безплатен оглед и писмена гаранция." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://remontnapokrivivarna.com/" />
        <script type="application/ld+json">
          {JSON.stringify(localBusinessSchema)}
        </script>
      </Helmet>

      <Header />
      <Hero />
      <TrustIndicators />
      <Services />
      <CTASection 
        title="Нуждаете се от професионален оглед на покрива?"
        subtitle="Свържете се с нас за безплатна инспекция и честна оценка на състоянието."
      />
      <WhyChooseUs />
      <About />
      <Gallery />
      <BeforeAfterGallery />
      <Testimonials />
      <CTASection 
        variant="accent"
        title="Получете безплатна оферта днес"
        subtitle="Над 500 доволни клиенти във Варна. Присъединете се към тях!"
      />
      <HomeFAQ />
      <Contact />
      <CTASection 
        variant="emergency"
        title="Аварийно ремонт на покрив?"
        subtitle="При спешни случаи сме на разположение 24/7. Бърза реакция гарантирана."
      />
      <Footer />
      <FloatingCallButton />
    </div>
  );
};

export default Index;
