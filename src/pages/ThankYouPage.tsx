import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import { CheckCircle, Phone, Home } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HreflangTags from "@/components/HreflangTags";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";

const ThankYouPage = () => {
  const { lang } = useParams<{ lang: string }>();
  const currentLang = lang || "bg";

  useEffect(() => {
    // Internal analytics only. Google Ads conversions are fired once by the
    // submitting form through fireLeadConversion, not by the thank-you page.
    trackEvent("conversion", "quote_request_submitted");
  }, []);


  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Благодарим Ви! Запитването е получено | Ремонт на покриви Варна</title>
        <meta name="description" content="Благодарим Ви за запитването. Наш представител ще се свърже с Вас в най-кратък срок." />
        <meta name="robots" content="noindex, follow" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Благодарим Ви",
          "url": `https://www.remontnapokrivivarna.bg/${currentLang}/blagodarim-vi`,
        })}</script>
      </Helmet>
      <HreflangTags />

      <Header />

      <section className="pt-32 pb-20 min-h-[70vh] flex items-center">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>

          <h1 className="text-3xl md:text-5xl font-bold mb-4">Благодарим Ви!</h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            Вашето запитване е получено успешно. Наш представител ще се свърже с Вас в рамките на 24 часа за уточнение и при нужда насрочване на оглед.
          </p>

          <div className="bg-card border border-border rounded-2xl p-6 mb-8">
            <p className="text-muted-foreground mb-3">Спешен случай или искате да говорите веднага?</p>
            <a
              href="tel:0893971873"
              className="inline-flex items-center gap-2 text-2xl font-bold text-accent hover:text-accent/80 transition-colors"
            >
              <Phone className="w-6 h-6" /> 089 397 1873
            </a>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild variant="outline" className="h-12">
              <Link to={`/${currentLang}`}>
                <Home className="w-4 h-4 mr-2" /> Към началната страница
              </Link>
            </Button>
            <Button asChild className="h-12 bg-primary hover:bg-primary/90">
              <Link to={`/${currentLang}/proekti`}>Вижте наши проекти</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ThankYouPage;
