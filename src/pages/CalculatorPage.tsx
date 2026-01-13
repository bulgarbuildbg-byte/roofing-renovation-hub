import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCallButton from "@/components/FloatingCallButton";
import PriceCalculator from "@/components/PriceCalculator";
import CTASection from "@/components/CTASection";
import Contact from "@/components/Contact";

const CalculatorPage = () => {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Колко струва ремонт на покрив във Варна?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Цената за ремонт на покрив варира от 15 до 35 лв/кв.м в зависимост от вида на ремонта и състоянието на покрива. За точна оценка предлагаме безплатен оглед."
        }
      },
      {
        "@type": "Question",
        "name": "Колко струва хидроизолация на покрив?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Хидроизолацията на покрив струва между 25 и 50 лв/кв.м, в зависимост от типа на изолацията и сложността на покрива."
        }
      },
      {
        "@type": "Question",
        "name": "Колко струва нов покрив?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Изграждането на нов покрив струва между 80 и 180 лв/кв.м, включително материали и труд. Цената зависи от типа покрив и материалите."
        }
      }
    ]
  };

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Калкулатор Цена Покрив Варна - Онлайн</title>
        <meta name="description" content="Изчислете ориентировъчна цена за ремонт на покрив онлайн. Безплатен калкулатор с мигновен резултат." />
        <meta name="keywords" content="цена ремонт покрив Варна, калкулатор покрив, колко струва нов покрив, цена хидроизолация, ремонт покрив цени" />
        <meta property="og:title" content="Калкулатор Цена Покрив Варна - Онлайн" />
        <meta property="og:description" content="Изчислете ориентировъчна цена за ремонт на покрив онлайн. Безплатен калкулатор." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://remontnapokrivivarna.com/калкулатор" />
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>

      <Header />
      <div className="pt-20">
        <PriceCalculator />
        <CTASection
          title="Искате точна оферта?"
          subtitle="Свържете се с нас за безплатен оглед на място и детайлна ценова оферта."
        />
        <Contact />
      </div>
      <Footer />
      <FloatingCallButton />
    </div>
  );
};

export default CalculatorPage;
