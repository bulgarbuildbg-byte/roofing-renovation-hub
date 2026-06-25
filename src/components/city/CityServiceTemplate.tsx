import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import { Phone, Eye, CheckCircle, MapPin, Clock, Shield, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useCity } from "@/contexts/CityContext";
import { useLocalizedPath } from "@/hooks/useLocalizedPath";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TrustIndicators from "@/components/TrustIndicators";
import CertificationsBar from "@/components/CertificationsBar";
import HowWeWork from "@/components/HowWeWork";
import Testimonials from "@/components/Testimonials";
import PriceCalculator from "@/components/PriceCalculator";
import CalculatorDialog from "@/components/CalculatorDialog";
import type { CityServiceContent } from "@/data/cityServices";
import { localizedSlugs } from "@/i18n/routes";
import { LANGUAGE_OG_LOCALE, type SupportedLanguage, SUPPORTED_LANGUAGES } from "@/i18n/config";
import { getServiceMeta, getLangSiteSuffix, getLangTitleSuffix } from "@/data/cityServiceMeta";

const BASE_URL = "https://www.remontnapokrivivarna.bg";

/** Visible UI strings — translated inline so a single source of truth lives next to the template. */
const UI: Record<SupportedLanguage, {
  breadcrumbHome: string;
  whyChoose: (svc: string, city: string) => string;
  yearsExp: (city: string) => string;
  ctaTitle: (svc: string, city: string) => string;
  ctaSubtitle: string;
  requestInspection: string;
  faqTitle: string;
  faqSubtitle: (svc: string, city: string) => string;
  neighborhoodsTitle: (city: string) => string;
  neighborhoodsSubtitle: string;
  contactTitle: (city: string) => string;
  contactSubtitle: string;
  warrantyShort: string;
  getQuote: string;
  callNow: string;
  servesAll: (city: string) => string;
  freeInspection24: string;
  warranty15: string;
  contractWork: string;
}> = {
  bg: {
    breadcrumbHome: "Начало",
    whyChoose: (s, c) => `Защо да изберете нас за ${s.toLowerCase()} в ${c}`,
    yearsExp: (c) => `Над 15 години опит на покриви в ${c} и региона`,
    ctaTitle: (s, c) => `Имате нужда от ${s.toLowerCase()} в ${c}?`,
    ctaSubtitle: "Безплатен оглед на място. Точна оферта без скрити разходи.",
    requestInspection: "Заяви безплатен оглед",
    faqTitle: "Често задавани въпроси",
    faqSubtitle: (s, c) => `Отговори на най-честите въпроси за ${s.toLowerCase()} в ${c}`,
    neighborhoodsTitle: (c) => `Обслужваме всички квартали на ${c}`,
    neighborhoodsSubtitle: "Бърза реакция в целия град и региона",
    contactTitle: (c) => `Свържете се с нас в ${c}`,
    contactSubtitle: "Безплатен оглед, точна оферта, писмена гаранция 15 години.",
    warrantyShort: "Гаранция 15 г.",
    getQuote: "Получи оферта",
    callNow: "Обади се сега",
    servesAll: (c) => `Обслужваме цял ${c}`,
    freeInspection24: "Безплатен оглед 24ч",
    warranty15: "Гаранция 15 години",
    contractWork: "Работа по договор",
  },
  en: {
    breadcrumbHome: "Home",
    whyChoose: (s, c) => `Why choose us for ${s.toLowerCase()} in ${c}`,
    yearsExp: (c) => `Over 15 years of roofing experience in ${c} and the region`,
    ctaTitle: (s, c) => `Need ${s.toLowerCase()} in ${c}?`,
    ctaSubtitle: "Free on-site inspection. Accurate quote with no hidden costs.",
    requestInspection: "Request free inspection",
    faqTitle: "Frequently Asked Questions",
    faqSubtitle: (s, c) => `Answers to the most common questions about ${s.toLowerCase()} in ${c}`,
    neighborhoodsTitle: (c) => `We serve all districts of ${c}`,
    neighborhoodsSubtitle: "Fast response across the whole city and region",
    contactTitle: (c) => `Contact us in ${c}`,
    contactSubtitle: "Free inspection, accurate quote, 15-year written warranty.",
    warrantyShort: "15-yr warranty",
    getQuote: "Get a quote",
    callNow: "Call now",
    servesAll: (c) => `Serving all of ${c}`,
    freeInspection24: "Free inspection 24h",
    warranty15: "15-year warranty",
    contractWork: "Contract work",
  },
  de: {
    breadcrumbHome: "Startseite",
    whyChoose: (s, c) => `Warum uns für ${s.toLowerCase()} in ${c} wählen`,
    yearsExp: (c) => `Über 15 Jahre Erfahrung mit Dächern in ${c} und der Region`,
    ctaTitle: (s, c) => `Benötigen Sie ${s.toLowerCase()} in ${c}?`,
    ctaSubtitle: "Kostenlose Vor-Ort-Inspektion. Genaues Angebot ohne versteckte Kosten.",
    requestInspection: "Kostenlose Inspektion anfordern",
    faqTitle: "Häufig gestellte Fragen",
    faqSubtitle: (s, c) => `Antworten auf die häufigsten Fragen zu ${s.toLowerCase()} in ${c}`,
    neighborhoodsTitle: (c) => `Wir bedienen alle Bezirke von ${c}`,
    neighborhoodsSubtitle: "Schnelle Reaktion in der ganzen Stadt und Region",
    contactTitle: (c) => `Kontaktieren Sie uns in ${c}`,
    contactSubtitle: "Kostenlose Inspektion, genaues Angebot, 15 Jahre schriftliche Garantie.",
    warrantyShort: "15 J. Garantie",
    getQuote: "Angebot erhalten",
    callNow: "Jetzt anrufen",
    servesAll: (c) => `Wir bedienen ganz ${c}`,
    freeInspection24: "Kostenlose Inspektion 24h",
    warranty15: "15 Jahre Garantie",
    contractWork: "Vertragsarbeit",
  },
  fi: {
    breadcrumbHome: "Etusivu", whyChoose: (s, c) => `Miksi valita meidät – ${s.toLowerCase()} ${c}`, yearsExp: (c) => `Yli 15 vuoden kokemus katoista alueella ${c}`,
    ctaTitle: (s, c) => `Tarvitsetko ${s.toLowerCase()} ${c}?`, ctaSubtitle: "Ilmainen paikan päällä tehtävä tarkastus. Tarkka tarjous ilman piilokuluja.",
    requestInspection: "Pyydä ilmainen tarkastus", faqTitle: "Usein kysytyt kysymykset", faqSubtitle: (s, c) => `Vastauksia yleisimpiin kysymyksiin: ${s.toLowerCase()} ${c}`,
    neighborhoodsTitle: (c) => `Palvelemme kaikkia kaupunginosia: ${c}`, neighborhoodsSubtitle: "Nopea vastaus koko kaupungissa ja alueella",
    contactTitle: (c) => `Ota yhteyttä – ${c}`, contactSubtitle: "Ilmainen tarkastus, tarkka tarjous, 15 vuoden kirjallinen takuu.",
    warrantyShort: "15 v. takuu", getQuote: "Pyydä tarjous", callNow: "Soita nyt", servesAll: (c) => `Palvelemme koko aluetta: ${c}`, freeInspection24: "Ilmainen tarkastus 24h", warranty15: "15 vuoden takuu", contractWork: "Sopimustyö",
  },
  sv: {
    breadcrumbHome: "Hem", whyChoose: (s, c) => `Varför välja oss för ${s.toLowerCase()} i ${c}`, yearsExp: (c) => `Över 15 års erfarenhet av tak i ${c} och regionen`,
    ctaTitle: (s, c) => `Behöver du ${s.toLowerCase()} i ${c}?`, ctaSubtitle: "Gratis inspektion på plats. Exakt offert utan dolda kostnader.",
    requestInspection: "Begär gratis inspektion", faqTitle: "Vanliga frågor", faqSubtitle: (s, c) => `Svar på de vanligaste frågorna om ${s.toLowerCase()} i ${c}`,
    neighborhoodsTitle: (c) => `Vi betjänar alla stadsdelar i ${c}`, neighborhoodsSubtitle: "Snabb respons i hela staden och regionen",
    contactTitle: (c) => `Kontakta oss i ${c}`, contactSubtitle: "Gratis inspektion, exakt offert, 15 års skriftlig garanti.",
    warrantyShort: "15 års garanti", getQuote: "Få offert", callNow: "Ring nu", servesAll: (c) => `Vi betjänar hela ${c}`, freeInspection24: "Gratis inspektion 24h", warranty15: "15 års garanti", contractWork: "Avtalsarbete",
  },
  no: {
    breadcrumbHome: "Hjem", whyChoose: (s, c) => `Hvorfor velge oss for ${s.toLowerCase()} i ${c}`, yearsExp: (c) => `Over 15 års erfaring med tak i ${c} og regionen`,
    ctaTitle: (s, c) => `Trenger du ${s.toLowerCase()} i ${c}?`, ctaSubtitle: "Gratis inspeksjon på stedet. Nøyaktig tilbud uten skjulte kostnader.",
    requestInspection: "Be om gratis inspeksjon", faqTitle: "Ofte stilte spørsmål", faqSubtitle: (s, c) => `Svar på de vanligste spørsmålene om ${s.toLowerCase()} i ${c}`,
    neighborhoodsTitle: (c) => `Vi betjener alle bydeler i ${c}`, neighborhoodsSubtitle: "Rask respons i hele byen og regionen",
    contactTitle: (c) => `Kontakt oss i ${c}`, contactSubtitle: "Gratis inspeksjon, nøyaktig tilbud, 15 års skriftlig garanti.",
    warrantyShort: "15 års garanti", getQuote: "Få tilbud", callNow: "Ring nå", servesAll: (c) => `Vi betjener hele ${c}`, freeInspection24: "Gratis inspeksjon 24t", warranty15: "15 års garanti", contractWork: "Kontraktarbeid",
  },
  fr: {
    breadcrumbHome: "Accueil", whyChoose: (s, c) => `Pourquoi nous choisir pour ${s.toLowerCase()} à ${c}`, yearsExp: (c) => `Plus de 15 ans d'expérience en toitures à ${c} et région`,
    ctaTitle: (s, c) => `Besoin de ${s.toLowerCase()} à ${c} ?`, ctaSubtitle: "Inspection gratuite sur place. Devis précis sans coûts cachés.",
    requestInspection: "Demander une inspection gratuite", faqTitle: "Questions fréquentes", faqSubtitle: (s, c) => `Réponses aux questions les plus fréquentes sur ${s.toLowerCase()} à ${c}`,
    neighborhoodsTitle: (c) => `Nous desservons tous les quartiers de ${c}`, neighborhoodsSubtitle: "Intervention rapide dans toute la ville et la région",
    contactTitle: (c) => `Contactez-nous à ${c}`, contactSubtitle: "Inspection gratuite, devis précis, garantie écrite 15 ans.",
    warrantyShort: "Garantie 15 ans", getQuote: "Obtenir un devis", callNow: "Appelez maintenant", servesAll: (c) => `Nous desservons tout ${c}`, freeInspection24: "Inspection gratuite 24h", warranty15: "Garantie 15 ans", contractWork: "Travail sous contrat",
  },
  nl: {
    breadcrumbHome: "Home", whyChoose: (s, c) => `Waarom ons kiezen voor ${s.toLowerCase()} in ${c}`, yearsExp: (c) => `Meer dan 15 jaar dakervaring in ${c} en regio`,
    ctaTitle: (s, c) => `Nodig ${s.toLowerCase()} in ${c}?`, ctaSubtitle: "Gratis inspectie ter plaatse. Nauwkeurige offerte zonder verborgen kosten.",
    requestInspection: "Gratis inspectie aanvragen", faqTitle: "Veelgestelde vragen", faqSubtitle: (s, c) => `Antwoorden op de meest gestelde vragen over ${s.toLowerCase()} in ${c}`,
    neighborhoodsTitle: (c) => `Wij bedienen alle wijken van ${c}`, neighborhoodsSubtitle: "Snelle reactie in de hele stad en regio",
    contactTitle: (c) => `Neem contact met ons op in ${c}`, contactSubtitle: "Gratis inspectie, nauwkeurige offerte, 15 jaar schriftelijke garantie.",
    warrantyShort: "15 jr garantie", getQuote: "Offerte aanvragen", callNow: "Bel nu", servesAll: (c) => `Wij bedienen heel ${c}`, freeInspection24: "Gratis inspectie 24u", warranty15: "15 jaar garantie", contractWork: "Werk onder contract",
  },
  ru: {
    breadcrumbHome: "Главная", whyChoose: (s, c) => `Почему выбрать нас для ${s.toLowerCase()} в ${c}`, yearsExp: (c) => `Более 15 лет опыта работы с крышами в ${c} и регионе`,
    ctaTitle: (s, c) => `Нужен ${s.toLowerCase()} в ${c}?`, ctaSubtitle: "Бесплатный осмотр на месте. Точная смета без скрытых расходов.",
    requestInspection: "Запросить бесплатный осмотр", faqTitle: "Часто задаваемые вопросы", faqSubtitle: (s, c) => `Ответы на самые частые вопросы о ${s.toLowerCase()} в ${c}`,
    neighborhoodsTitle: (c) => `Обслуживаем все районы ${c}`, neighborhoodsSubtitle: "Быстрая реакция по всему городу и региону",
    contactTitle: (c) => `Свяжитесь с нами в ${c}`, contactSubtitle: "Бесплатный осмотр, точная смета, письменная гарантия 15 лет.",
    warrantyShort: "Гарантия 15 лет", getQuote: "Получить смету", callNow: "Позвонить сейчас", servesAll: (c) => `Обслуживаем весь ${c}`, freeInspection24: "Бесплатный осмотр 24ч", warranty15: "Гарантия 15 лет", contractWork: "Работа по договору",
  },
  ua: {
    breadcrumbHome: "Головна", whyChoose: (s, c) => `Чому обрати нас для ${s.toLowerCase()} у ${c}`, yearsExp: (c) => `Понад 15 років досвіду роботи з дахами у ${c} та регіоні`,
    ctaTitle: (s, c) => `Потрібен ${s.toLowerCase()} у ${c}?`, ctaSubtitle: "Безкоштовний огляд на місці. Точний кошторис без прихованих витрат.",
    requestInspection: "Замовити безкоштовний огляд", faqTitle: "Часті запитання", faqSubtitle: (s, c) => `Відповіді на найчастіші запитання про ${s.toLowerCase()} у ${c}`,
    neighborhoodsTitle: (c) => `Обслуговуємо всі райони ${c}`, neighborhoodsSubtitle: "Швидка реакція по всьому місту та регіону",
    contactTitle: (c) => `Зв'яжіться з нами у ${c}`, contactSubtitle: "Безкоштовний огляд, точний кошторис, письмова гарантія 15 років.",
    warrantyShort: "Гарантія 15 р.", getQuote: "Отримати кошторис", callNow: "Зателефонувати зараз", servesAll: (c) => `Обслуговуємо весь ${c}`, freeInspection24: "Безкоштовний огляд 24год", warranty15: "Гарантія 15 років", contractWork: "Робота за договором",
  },
};

interface CityServiceTemplateProps {
  service: CityServiceContent;
}

const interpolate = (text: string, city: string) => text.replace(/\{city\}/g, city);

const CityServiceTemplate = ({ service }: CityServiceTemplateProps) => {
  const { cityData } = useCity();
  const { getPath } = useLocalizedPath();
  const { lang } = useParams<{ lang: string }>();
  const currentLang: SupportedLanguage = (SUPPORTED_LANGUAGES.includes(lang as SupportedLanguage) ? lang : 'bg') as SupportedLanguage;
  const cityName = cityData.nameBg;
  const citySlug = cityData.slug;
  const serviceSlug = localizedSlugs[currentLang][service.routeKey];
  const ogLocale = LANGUAGE_OG_LOCALE[currentLang];
  const ui = UI[currentLang] ?? UI.bg;
  const localizedMeta = getServiceMeta(currentLang, service.routeKey);

  const titlePrefix = localizedMeta?.titlePrefix ?? service.titlePrefix;
  const h1Prefix = localizedMeta?.h1Prefix ?? service.h1Prefix;
  const heroSubtitle = localizedMeta?.heroSubtitle ?? service.heroSubtitle;
  const h1 = `${h1Prefix} ${cityName}`;
  const title = `${titlePrefix} ${cityName}${getLangTitleSuffix(currentLang)}`;
  const description = interpolate(
    localizedMeta?.description ?? service.metaDescription,
    cityName,
  );
  const canonical = `${BASE_URL}/${currentLang}/${citySlug}/${serviceSlug}`;
  const ogImage = `${BASE_URL}/og-image.jpg`;
  const siteName = `${getLangSiteSuffix(currentLang)} ${cityName}`;

  const benefits = service.benefits.map((b) => interpolate(b, cityName));
  const faqs = service.faqs.map((f) => ({
    q: interpolate(f.q, cityName),
    a: interpolate(f.a, cityName),
  }));

  // JSON-LD: Service with city-specific provider + AggregateRating
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": h1,
    "description": interpolate(service.schemaDescription, cityName),
    "areaServed": {
      "@type": "City",
      "name": cityName,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": cityName,
        "postalCode": cityData.postalCode,
        "addressCountry": "BG",
      },
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "127",
      "bestRating": "5",
      "worstRating": "1",
    },
    "provider": {
      "@type": "RoofingContractor",
      "name": siteName,
      "legalName": "Булгар Билд ЕООД",
      "telephone": `+359${cityData.phoneTel.substring(1)}`,
      "email": cityData.email,
      "url": canonical,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": cityName,
        "postalCode": cityData.postalCode,
        "addressRegion": cityData.region,
        "addressCountry": "BG",
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": cityData.geo.lat,
        "longitude": cityData.geo.lng,
      },
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((f) => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": { "@type": "Answer", "text": f.a },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": ui.breadcrumbHome, "item": `${BASE_URL}/${currentLang}` },
      { "@type": "ListItem", "position": 2, "name": cityName, "item": `${BASE_URL}/${currentLang}/${citySlug}` },
      { "@type": "ListItem", "position": 3, "name": titlePrefix, "item": canonical },
    ],
  };

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonical} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={ogImage} />
        <meta property="og:locale" content={ogLocale} />
        <meta property="og:site_name" content={siteName} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />
        <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>


      <Header />

      <main className="pt-20">
        {/* HERO */}
        <section className="relative bg-black text-white py-16 md:py-24 overflow-hidden">
          <img
            src={service.heroImage}
            alt={`${h1} — ${titlePrefix}`}
            className="absolute inset-0 w-full h-full object-cover"
            loading="eager"
            width={1920}
            height={1080}
          />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_20%,_rgba(15,23,42,0.6)_70%,_rgba(15,23,42,0.9)_100%)]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/75 via-[#0f172a]/35 to-transparent" />
          <div className="container mx-auto px-4 relative z-10">
            <nav className="text-sm mb-6 text-white/70">
              <Link to={getPath("home")} className="hover:text-white">{ui.breadcrumbHome}</Link>
              <span className="mx-2">/</span>
              <Link to={`/${currentLang}/${citySlug}`} className="hover:text-white">{cityName}</Link>
              <span className="mx-2">/</span>
              <span className="text-white">{titlePrefix}</span>
            </nav>
            <div className="max-w-4xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 [text-shadow:_0_3px_16px_rgba(0,0,0,0.9)]">
                {h1}
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-3xl mb-6 [text-shadow:_0_2px_8px_rgba(0,0,0,0.6)]">
                {heroSubtitle}
              </p>
              {service.priceHint && (
                <div className="inline-block bg-green-500/20 border border-green-400/40 backdrop-blur-sm px-4 py-2 rounded-lg mb-6">
                  <span className="text-green-300 font-semibold">{service.priceHint}</span>
                </div>
              )}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8 shadow-lg">
                  <Link to={getPath("contact")}>
                    <Eye className="w-5 h-5 mr-2" />
                    {ui.requestInspection}
                  </Link>
                </Button>
                <Button asChild size="lg" className="bg-primary/40 backdrop-blur-sm border-2 border-white/80 text-white hover:bg-white/20">
                  <a href={`tel:${cityData.phoneTel}`}>
                    <Phone className="w-5 h-5 mr-2" />
                    {cityData.phone}
                  </a>
                </Button>
              </div>
              <CalculatorDialog type="roof" />
              <div className="flex flex-wrap gap-3 text-sm mt-6">
                {[
                  ui.servesAll(cityName),
                  ui.freeInspection24,
                  ui.warranty15,
                  ui.contractWork,
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 bg-primary/70 backdrop-blur-sm px-3 py-1.5 rounded-full">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-white/90">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <TrustIndicators />
        <CertificationsBar />

        {/* BENEFITS */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-4">
              {ui.whyChoose(titlePrefix, cityName)}
            </h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              {ui.yearsExp(cityName)}
            </p>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {benefits.map((benefit, idx) => (
                <Card key={idx} className="border-border bg-card">
                  <CardContent className="p-6 flex gap-4">
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <p className="text-card-foreground">{benefit}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* PACKAGES (only for maintenance) — moved up right after BENEFITS */}
        {service.packages && (
          <section id="packages" className="py-16 bg-secondary">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-4">
                Абонаментни пакети за поддръжка в {cityName}
              </h2>
              <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
                Изберете пакет, който отговаря на вашите нужди — превенцията струва 10 пъти по-малко от ремонта
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                {service.packages.map((pkg, index) => (
                  <Card key={index} className={`border-border bg-card ${pkg.popular ? 'ring-2 ring-primary relative' : ''}`}>
                    <CardContent className="p-6 flex flex-col h-full">
                      {pkg.popular && (
                        <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 text-xs font-semibold text-primary-foreground bg-primary rounded-full">
                          Най-предпочитан
                        </span>
                      )}
                      <h3 className="text-xl font-bold text-card-foreground mb-2">{pkg.title}</h3>
                      <p className="text-2xl font-bold text-primary mb-3">{pkg.price}</p>
                      <div className="bg-muted/40 rounded-lg p-3 mb-4">
                        <p className="text-xs font-semibold text-foreground mb-1">Подходящ за:</p>
                        <p className="text-xs text-muted-foreground">{pkg.suitableFor}</p>
                      </div>
                      <ul className="space-y-2 mb-6 flex-grow">
                        {pkg.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <CheckCircle className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <Button asChild className="w-full mt-auto" variant={pkg.popular ? "default" : "outline"}>
                        <Link to={getPath('contact')}>Заявете оферта</Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA BAND 1 */}
        <section className="py-10 bg-slate-800 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              {ui.ctaTitle(titlePrefix, cityName)}
            </h2>
            <p className="text-white/80 mb-6 max-w-xl mx-auto">
              {ui.ctaSubtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8">
                <Link to={getPath("contact")}>
                  <Eye className="w-5 h-5 mr-2" />
                  {ui.requestInspection}
                </Link>
              </Button>
              <Button asChild size="lg" className="bg-transparent border-2 border-white text-white hover:bg-white/20 text-lg px-8">
                <a href={`tel:${cityData.phoneTel}`}>
                  <Phone className="w-5 h-5 mr-2" />
                  {cityData.phone}
                </a>
              </Button>
            </div>
          </div>
        </section>

        <HowWeWork />

        {/* NEIGHBORHOODS */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              Обслужваме всички квартали на {cityName}
            </h2>
            <p className="text-muted-foreground mb-8">Бърза реакция в целия град и региона</p>
            <div className="flex flex-wrap gap-2 justify-center max-w-4xl mx-auto">
              {cityData.neighborhoods.map((n) => (
                <div key={n} className="flex items-center gap-1.5 bg-background border border-border px-3 py-1.5 rounded-full text-sm">
                  <MapPin className="w-3.5 h-3.5 text-primary" />
                  <span className="text-foreground">{n}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Testimonials />
        <PriceCalculator />

        {/* FAQ */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-4">
              Често задавани въпроси
            </h2>
            <p className="text-muted-foreground text-center mb-12">
              Отговори на най-честите въпроси за {service.titlePrefix.toLowerCase()} в {cityName}
            </p>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, idx) => (
                <AccordionItem key={idx} value={`item-${idx}`}>
                  <AccordionTrigger className="text-left text-lg">{faq.q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* CONTACT BAND */}
        <section className="py-16 bg-slate-900 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Свържете се с нас в {cityName}
              </h2>
              <p className="text-white/80 mb-8 text-lg">
                Безплатен оглед, точна оферта, писмена гаранция 15 години.
              </p>
              <div className="grid sm:grid-cols-3 gap-6 mb-8">
                <div className="flex flex-col items-center gap-2">
                  <Phone className="w-6 h-6 text-accent" />
                  <a href={`tel:${cityData.phoneTel}`} className="text-white hover:text-accent font-semibold">
                    {cityData.phone}
                  </a>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Clock className="w-6 h-6 text-accent" />
                  <span className="text-white/90 text-sm text-center">
                    {cityData.workingHours}<br />
                    {cityData.emergency}
                  </span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Shield className="w-6 h-6 text-accent" />
                  <span className="text-white/90 text-sm">Гаранция 15 г.</span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8">
                  <Link to={getPath("contact")}>
                    <FileText className="w-5 h-5 mr-2" />
                    Получи оферта
                  </Link>
                </Button>
                <Button asChild size="lg" className="bg-transparent border-2 border-white text-white hover:bg-white/20 text-lg px-8">
                  <a href={`tel:${cityData.phoneTel}`}>
                    <Phone className="w-5 h-5 mr-2" />
                    Обади се сега
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default CityServiceTemplate;
