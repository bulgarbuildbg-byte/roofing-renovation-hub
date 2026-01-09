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
import PriceCalculator from "@/components/PriceCalculator";

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
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Покривни услуги",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Ремонт на покриви",
            "description": "Професионален ремонт на всички видове покриви - скатни, плоски и мансардни.",
            "url": "https://remontnapokrivivarna.com/ремонт-на-покриви"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Хидроизолация",
            "description": "Качествена хидроизолация с гаранция до 10 години.",
            "url": "https://remontnapokrivivarna.com/хидроизолация"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Ремонт на течове",
            "description": "Бързо и ефективно отстраняване на течове по покрива.",
            "url": "https://remontnapokrivivarna.com/ремонт-течове"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Изграждане на нов покрив",
            "description": "Пълно изграждане на нови покриви с модерни материали.",
            "url": "https://remontnapokrivivarna.com/изграждане-на-покрив"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Смяна на керемиди",
            "description": "Подмяна на счупени или износени керемиди.",
            "url": "https://remontnapokrivivarna.com/смяна-керемиди"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Плоски покриви",
            "description": "Специализирани услуги за плоски покриви и тераси.",
            "url": "https://remontnapokrivivarna.com/плоски-покриви"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Метални покриви",
            "description": "Монтаж и ремонт на метални покриви.",
            "url": "https://remontnapokrivivarna.com/метални-покриви"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Поддръжка на покриви",
            "description": "Редовна поддръжка и профилактика на покривни конструкции.",
            "url": "https://remontnapokrivivarna.com/поддръжка-на-покриви"
          }
        }
      ]
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Колко струва ремонт на покрив?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Цената зависи от вида на ремонта, материалите и площта. Средната цена е между 15-35 лв/кв.м за стандартен ремонт. Предлагаме безплатен оглед и точна оферта."
        }
      },
      {
        "@type": "Question",
        "name": "Предлагате ли гаранция за извършената работа?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Да, предлагаме писмена гаранция до 10 години в зависимост от вида на услугата и използваните материали."
        }
      },
      {
        "@type": "Question",
        "name": "Работите ли при лошо време?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "При екстремни условия (силен дъжд, буря) не работим заради безопасност. При спешни течове обаче можем да направим временна защита."
        }
      },
      {
        "@type": "Question",
        "name": "Колко време отнема ремонтът на покрив?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Зависи от обхвата - малки ремонти се извършват за 1-2 дни, а цялостна подмяна на покрив може да отнеме 1-2 седмици."
        }
      }
    ]
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
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>

      <Header />
      <Hero />
      <TrustIndicators />
      <Services />
      <PriceCalculator />
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
