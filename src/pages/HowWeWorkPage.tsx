import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { ClipboardCheck, FileText, Hammer, Award, CheckCircle, Phone } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCallButton from "@/components/FloatingCallButton";
import MobileBottomBar from "@/components/MobileBottomBar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Link } from "react-router-dom";
import { useLocalizedPath } from "@/hooks/useLocalizedPath";

const HowWeWorkPage = () => {
  const { t } = useTranslation();
  const { getPath } = useLocalizedPath();
  const BASE_URL = "https://www.remontnapokrivivarna.bg";

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: t("nav.home", "Начало"), item: BASE_URL },
      { "@type": "ListItem", position: 2, name: t("howWeWork.pageTitle"), item: `${BASE_URL}/bg/как-работим` },
    ],
  };

  const steps = [
    {
      id: 1, icon: ClipboardCheck,
      title: t("howWeWork.step1Title"),
      text: t("howWeWork.step1Text"),
      details: t("howWeWork.step1Details"),
      bullets: (t("howWeWork.step1Bullets", { returnObjects: true }) as string[]),
    },
    {
      id: 2, icon: ClipboardCheck,
      title: t("howWeWork.step2Title"),
      text: t("howWeWork.step2Text"),
      details: t("howWeWork.step2Details"),
      bullets: (t("howWeWork.step2Bullets", { returnObjects: true }) as string[]),
    },
    {
      id: 3, icon: Hammer,
      title: t("howWeWork.step3Title"),
      text: t("howWeWork.step3Text"),
      details: t("howWeWork.step3Details"),
      bullets: (t("howWeWork.step3Bullets", { returnObjects: true }) as string[]),
    },
    {
      id: 4, icon: Shield,
      title: t("howWeWork.step4Title"),
      text: t("howWeWork.step4Text"),
      details: t("howWeWork.step4Details"),
      bullets: (t("howWeWork.step4Bullets", { returnObjects: true }) as string[]),
    },
  ];

  const faqs = t("howWeWork.faqs", { returnObjects: true }) as Array<{ q: string; a: string }>;

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>{t("howWeWork.metaTitle")}</title>
        <meta name="description" content={t("howWeWork.metaDesc")} />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={t("howWeWork.metaTitle")} />
        <meta property="og:description" content={t("howWeWork.metaDesc")} />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <Header />

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary/10 to-primary/5 py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            {t("howWeWork.pageTitle")}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            {t("howWeWork.pageSubtitle")}
          </p>
          <Button asChild size="lg">
            <Link to={getPath("inspection")}>{t("howWeWork.ctaButton")}</Link>
          </Button>
        </div>
      </section>

      {/* Detailed Steps */}
      <section className="py-16">
        <div className="container mx-auto px-4 space-y-16">
          {steps.map((step) => {
            const Icon = step.icon;
            const isEven = step.id % 2 === 0;
            return (
              <div
                key={step.id}
                className={`flex flex-col ${isEven ? "md:flex-row-reverse" : "md:flex-row"} gap-8 items-center`}
              >
                <div className="md:w-1/3 flex justify-center">
                  <div className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center relative">
                    <Icon className="w-16 h-16 text-primary" />
                    <span className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                      {step.id}
                    </span>
                  </div>
                </div>
                <div className="md:w-2/3">
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                    {t("howWeWork.stepLabel", { number: step.id })}: {step.title}
                  </h2>
                  <p className="text-muted-foreground mb-6 leading-relaxed">{step.details}</p>
                  <ul className="space-y-2">
                    {Array.isArray(step.bullets) && step.bullets.map((bullet, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-foreground">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-primary-foreground mb-4">{t("howWeWork.ctaTitle")}</h2>
          <p className="text-primary-foreground/80 mb-6 text-lg">{t("howWeWork.ctaSubtitle")}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" variant="secondary">
              <Link to={getPath("inspection")}>{t("howWeWork.ctaButton")}</Link>
            </Button>
            <Button asChild size="lg" className="bg-white text-primary border-2 border-white hover:bg-white/90 font-semibold">
              <a href="tel:+359884997659">
                <Phone className="w-4 h-4 mr-2" />
                088 499 7659
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold text-foreground text-center mb-8">{t("howWeWork.faqTitle")}</h2>
          <Accordion type="single" collapsible className="w-full">
            {Array.isArray(faqs) && faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger>{faq.q}</AccordionTrigger>
                <AccordionContent>{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <Footer />
      <FloatingCallButton />
      <MobileBottomBar />
      <div className="h-20 md:hidden" />
    </div>
  );
};

export default HowWeWorkPage;
