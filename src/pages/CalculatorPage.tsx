import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
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
          "text": "Цената за ремонт на покрив варира от 8 до 18 €/кв.м в зависимост от вида на ремонта и състоянието на покрива. За точна оценка предлагаме безплатен оглед."
        }
      },
      {
        "@type": "Question",
        "name": "Колко струва хидроизолация на покрив?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Хидроизолацията на покрив струва между 13 и 26 €/кв.м, в зависимост от типа на изолацията и сложността на покрива."
        }
      },
      {
        "@type": "Question",
        "name": "Колко струва нов покрив?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Изграждането на нов покрив струва между 40 и 90 €/кв.м, включително материали и труд. Цената зависи от типа покрив и материалите."
        }
      }
    ]
  };

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Калкулатор Цена Покрив Варна — Онлайн Оценка за 60 секунди</title>
        <meta name="description" content="Безплатен онлайн калкулатор за ремонт, хидроизолация и нов покрив във Варна. Получете ориентировъчна цена в евро за 60 секунди. ☎ 088 499 7659" />
        <meta name="keywords" content="цена ремонт покрив Варна, калкулатор покрив, колко струва нов покрив, цена хидроизолация, ремонт покрив цени" />
        <meta property="og:title" content="Калкулатор Цена Покрив Варна - Онлайн" />
        <meta property="og:description" content="Изчислете ориентировъчна цена за ремонт на покрив онлайн. Безплатен калкулатор." />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>

      <Header />
      <div className="pt-20">
        <section className="bg-gradient-to-br from-primary/10 via-background to-secondary py-10 md:py-14">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3">
              Калкулатор Цена Покрив Варна
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              Получете ориентировъчна цена за ремонт, хидроизолация или нов покрив за по-малко от 60 секунди.
            </p>
          </div>
        </section>
        <PriceCalculator />
        <CTASection
          title="Искате точна оферта?"
          subtitle="Свържете се с нас за безплатен оглед на място и детайлна ценова оферта."
        />
        <Contact />
      </div>
      <Footer />
    </div>
  );
};

export default CalculatorPage;
