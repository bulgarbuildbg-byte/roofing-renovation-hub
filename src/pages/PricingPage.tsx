import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { useLocalizedPath } from "@/hooks/useLocalizedPath";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Phone, ArrowRight, CheckCircle } from "lucide-react";
import type { RouteKey } from "@/i18n/routes";

const pricingServices: { key: string; routeKey: RouteKey; price: string }[] = [
  { key: "roofRepair", routeKey: "roofRepair", price: "19 €/м²" },
  { key: "waterproofing", routeKey: "waterproofing", price: "9 €/м²" },
  { key: "newRoof", routeKey: "newRoof", price: "68 €/м²" },
  { key: "metalRoof", routeKey: "metalRoof", price: "18 €/м²" },
  { key: "leakRepair", routeKey: "leakRepair", price: "22 €" },
  { key: "tileReplacement", routeKey: "tileReplacement", price: "18 €/м²" },
  { key: "flatRoof", routeKey: "flatRoof", price: "9 €/м²" },
  { key: "maintenance", routeKey: "maintenance", price: "69 €/месец" },
];

const PricingPage = () => {
  const { t } = useTranslation();
  const { getPath, currentLang } = useLocalizedPath();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: t('pricing.title'),
    description: t('pricing.subtitle'),
    provider: {
      "@type": "LocalBusiness",
      name: "RemontNaPokriviVarna",
      address: { "@type": "PostalAddress", addressLocality: "Varna", addressCountry: "BG" },
    },
  };

  return (
    <>
      <Helmet>
        <html lang={currentLang} />
        <title>{t('pricing.title')} | RemontNaPokriviVarna</title>
        <meta name="description" content={t('pricing.subtitle')} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>
      <Header />

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-secondary pt-28 pb-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {t('pricing.title')}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            {t('pricing.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild size="lg" className="h-14 bg-accent hover:bg-accent/90 text-accent-foreground text-lg font-bold px-8">
              <Link to={getPath('inspection')}>{t('pricing.ctaInspection')}</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-14 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground text-lg font-bold px-8">
              <Link to={getPath('contact')}>{t('pricing.ctaQuote')}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 max-w-3xl">
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
            {t('pricing.intro')}
          </p>
        </div>
      </section>

      {/* Pricing Grid */}
      <section className="py-12 md:py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-10">
            {t('pricing.servicesTitle')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pricingServices.map((svc) => (
              <Link key={svc.key} to={getPath(svc.routeKey)} className="block group">
                <Card className="bg-background border-border hover:shadow-lg transition-shadow h-full">
                  <CardContent className="p-6 text-center">
                    <h3 className="text-lg font-bold text-foreground mb-3">
                      {t(`services.${svc.key}.title`)}
                    </h3>
                    <div className="inline-flex items-center bg-green-50 text-green-700 border border-green-200 font-extrabold text-xl px-4 py-2 rounded-full mb-3 group-hover:bg-green-100 transition-colors">
                      {t('services.startingFrom')} {svc.price}
                    </div>
                    <p className="text-muted-foreground text-sm">
                      {t(`pricing.serviceDesc.${svc.key}`)}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          <p className="text-center text-muted-foreground text-sm italic mt-6">
            {t('services.priceNote')}
          </p>
        </div>
      </section>

      {/* SEO Content */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
            {t('pricing.seoTitle')}
          </h2>
          <div className="space-y-4 text-muted-foreground text-base leading-relaxed">
            <p>{t('pricing.seoText1')}</p>
            <ul className="space-y-2 pl-4">
              {['seoFactor1', 'seoFactor2', 'seoFactor3', 'seoFactor4', 'seoFactor5'].map((key) => (
                <li key={key} className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>{t(`pricing.${key}`)}</span>
                </li>
              ))}
            </ul>
            <p>{t('pricing.seoText2')}</p>
          </div>
        </div>
      </section>

      {/* Internal Links */}
      <section className="py-12 bg-secondary">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-2xl font-bold text-foreground mb-6">{t('pricing.relatedTitle')}</h2>
          <div className="space-y-3">
            {[
              { routeKey: 'roofRepair' as const, label: t('services.roofRepair.title') },
              { routeKey: 'waterproofing' as const, label: t('services.waterproofing.title') },
              { routeKey: 'newRoof' as const, label: t('services.newRoof.title') },
            ].map((link) => (
              <Link key={link.routeKey} to={getPath(link.routeKey)} className="flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors">
                <ArrowRight className="w-4 h-4" />
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-16 bg-primary/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            {t('pricing.ctaTitle')}
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            {t('pricing.ctaDesc')}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild size="lg" className="h-14 bg-accent hover:bg-accent/90 text-accent-foreground text-lg font-bold px-8">
              <Link to={getPath('inspection')}>{t('pricing.ctaInspection')}</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-14 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground text-lg font-bold px-8">
              <a href="tel:0884997659" className="flex items-center justify-center gap-2">
                <Phone className="w-5 h-5" />
                {t('pricing.ctaCall')}
              </a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default PricingPage;
