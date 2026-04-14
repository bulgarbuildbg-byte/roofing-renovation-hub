import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCallButton from "@/components/FloatingCallButton";
import CTASection from "@/components/CTASection";
import RelatedServices from "@/components/RelatedServices";
import LearnMoreLinks from "@/components/LearnMoreLinks";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLocalizedPath } from "@/hooks/useLocalizedPath";
import {
  CheckCircle, Droplets, Shield, Phone, MapPin, Layers, HardHat,
  Clock, Banknote, Hammer, AlertTriangle, Thermometer, Ruler, Star
} from "lucide-react";

// Process images – Waterproofing
import surfacePrep from "@/assets/process/surface-prep-cleaning.jpg";
import primerApplication from "@/assets/process/primer-application.jpg";
import torchApply from "@/assets/process/torch-membrane-apply.jpg";
import waterproofingDetail from "@/assets/process/waterproofing-sealing-detail.jpg";
import secondLayer from "@/assets/process/waterproofing-second-layer.jpg";
import completedWaterproofing from "@/assets/process/completed-waterproofing.jpg";
import pvcMembrane from "@/assets/process/pvc-membrane.jpg";
import liquidWaterproofing from "@/assets/process/liquid-waterproofing.jpg";
import flatRoofOverview from "@/assets/process/flat-roof-overview.jpg";
import roofHero from "@/assets/process/waterproofing-hero.jpg";

const relatedServices = [
  {
    title: "Плоски Покриви",
    description: "Специализирани решения за плоски покриви с модерни хидроизолационни системи.",
    href: "/bg/плоски-покриви",
  },
  {
    title: "Ремонт на Течове",
    description: "Бързо локализиране и отстраняване на течове с писмена гаранция.",
    href: "/bg/ремонт-течове",
  },
  {
    title: "Поддръжка на Покриви",
    description: "Редовни инспекции и превантивни ремонти за по-дълъг живот на покрива.",
    href: "/bg/поддръжка-на-покриви",
  },
];

const learnMoreLinks = [
  {
    title: "Видове хидроизолация – пълно ръководство",
    href: "/bg/блог/видове-хидроизолация-и-кога-да-изберем-всяка",
  },
  {
    title: "Най-честите грешки при покривни ремонти",
    href: "/bg/блог/най-честите-грешки-при-покривни-ремонти",
  },
];

const WaterproofingVarnaPage = () => {
  const { t } = useTranslation();
  const { getPath } = useLocalizedPath();
  // ── JSON-LD ───────────────────────────────────────────────
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Хидроизолация Варна",
    provider: {
      "@type": "RoofingContractor",
      name: "RemontNaPokriviVarna",
      telephone: "+359884997659",
      email: "remontnapokrivivarna@abv.bg",
      address: {
        "@type": "PostalAddress",
        streetAddress: "ул. Уста Колю Фичето 25 А",
        addressLocality: "Варна",
        addressCountry: "BG",
      },
    },
    areaServed: [
      { "@type": "City", name: "Варна" },
      { "@type": "AdministrativeArea", name: "Област Варна" },
      { "@type": "Place", name: "Североизточна България" },
    ],
    description:
      "Професионална хидроизолация на покриви, тераси и плоски покриви във Варна и региона. Битумни мембрани, PVC мембрани, течна хидроизолация. Над 15 години опит, писмена гаранция до 10 г.",
    offers: {
      "@type": "AggregateOffer",
      lowPrice: "14",
      highPrice: "35",
      priceCurrency: "EUR",
      offerCount: "6",
    },
  };

  const faqData = [
    {
      question: "Колко струва хидроизолацията на покрив във Варна?",
      answer:
        "Цената на хидроизолацията зависи от типа материал, квадратурата и състоянието на основата. Ориентировъчните цени за труд и материали: битумна еднослойна хидроизолация — от 14 €/кв.м; двуслойна битумна система — 18–22 €/кв.м; PVC мембрана — 23–28 €/кв.м; течна полиуретанова хидроизолация — 18–24 €/кв.м. За блок от 500 кв.м двуслойна битумна хидроизолация излиза приблизително 9 000–11 000 €. За 100 кв.м жилищен покрив — 1 400–2 800 € в зависимост от избрания материал. Крайната цена се определя след безплатен оглед на място.",
    },
    {
      question: "Колко дълго издържа хидроизолацията?",
      answer:
        "Продължителността зависи от типа материал, качеството на монтажа и климатичните условия. Битумна хидроизолация с APP или SBS модификация — средно 15–25 години. PVC мембрани — 25–35 години при правилен монтаж. EPDM каучукови мембрани — 40–50+ години. Варненският климат с морска влага и интензивно UV облъчване може да ускори стареенето на нискокачествените материали, затова ние работим само с продукти от утвърдени европейски производители.",
    },
    {
      question: "Може ли да се полага нова хидроизолация върху старата?",
      answer:
        "В определени случаи е допустимо — ако старата хидроизолация е здрава, без мехури и разслоявания, и е само един слой. В повечето случаи обаче препоръчваме пълно премахване на старата хидроизолация. Причините са: трудно се постига добра адхезия върху стара повърхност; невидимите влажни зони под старата изолация продължават да причиняват проблеми; новият слой добавя тегло. При огледа нашите специалисти правят точна оценка дали е подходящо полагане върху старото или е необходимо демонтиране.",
    },
    {
      question: "Как разбирам, че хидроизолацията ми е изчерпана?",
      answer:
        "Основните признаци за изхабена хидроизолация са: видими мокри петна или теч вътре в сградата при дъжд; пукнатини, мехури или отлепвания на покривното покритие; подути места на повърхността; ръжда по металните елементи; мухъл или плесен по тавана на горния етаж. Ако хидроизолацията е на повече от 15 години, препоръчваме профилактичен оглед дори без видими симптоми.",
    },
    {
      question: "Каква е разликата между битумна и PVC хидроизолация?",
      answer:
        "Битумната хидроизолация е традиционно и проверено решение, полагано с горелка. Тя е по-достъпна по цена, лесна за ремонт и с дълъг опит в приложението. PVC мембраната е по-технологично решение: по-лека, по-гъвкава и с по-дълъг живот (25–35 г.). Шевовете се заваряват с горещ въздух, което осигурява монолитно, безшевно покритие. За тежко натоварени покриви, зелени покриви и индустриални сгради PVC е предпочитан избор, докато за стандартни жилищни покриви двуслойната битумна хидроизолация е отлично решение с добро съотношение цена–качество.",
    },
    {
      question: "Работите ли при дъжд или студено?",
      answer:
        "Нанасянето на хидроизолация изисква суха и относително топла повърхност. При дъжд или при температури под +5°C работим само при спешни аварийни случаи с временни защитни мерки. Полагането на битумни мембрани с горелка е технически невъзможно при дъжд — рискът от некачествена адхезия е висок. Планираме работата спрямо прогнозата за времето и ви информираме своевременно при необходимост от пренасрочване.",
    },
    {
      question: "Давате ли гаранция на хидроизолацията?",
      answer:
        "Да, даваме писмена гаранция за всяко изпълнено хидроизолационно покритие. Гаранционният срок е между 5 и 10 години в зависимост от типа система и използваните материали. Гаранцията покрива водонепропускливост и целостта на монтажа при нормални условия на експлоатация. Отделно от това, самите материали имат производствена гаранция. Условията са подробно описани в договора, подписван преди началото на работата.",
    },
    {
      question: "Правите ли хидроизолация на тераси и балкони?",
      answer:
        "Да, хидроизолацията на тераси и балкони е специфична дейност, в която имаме богат опит. Използваме течна полиуретанова хидроизолация или специализирани системи с финишно покритие, устойчиво на пешеходен трафик. Правилното изпълнение на наклоните, детайлите около перилата и водоотвеждането е критично за дълготрайния резултат. Извършваме и хидроизолация на подземни части — мазета и основи.",
    },
    {
      question: "Колко дни отнема хидроизолацията?",
      answer:
        "Времетраенето зависи от площта и комплексността на обекта. Хидроизолацията на стандартен жилищен покрив от 100–150 кв.м отнема 2–4 работни дни, включително подготовка, полагане на два слоя и обработка на детайли. За по-голям покрив на жилищен блок (400–600 кв.м) процесът отнема обикновено 5–10 дни. Понякога се налага да изчакаме изсъхване на грунда или слоевете, което се отразява на срока, но гарантира качеството на крайния резултат.",
    },
    {
      question: "Работите ли в цяла Варна и региона?",
      answer:
        "Да, покриваме целия град Варна и всички прилежащи квартали — Бриз, Чайка, Аспарухово, Владиславово, Левски, Младост, Приморски. Редовно работим и в Аксаково, Белослав, Девня, Провадия, Долни чифлик, Бяла, Балчик, Каварна и в курортните комплекси Златни пясъци, Свети Константин и Елена, Камчия. За обекти извън Варна се начисляват реални транспортни разходи, уточнявани предварително в офертата.",
    },
    {
      question: "Нужно ли е жителите да напускат сградата по време на работа?",
      answer:
        "При хидроизолация на покрив от покривния терен обитателите обикновено не е нужно да напускат апартаментите. Работата се извършва от покрива. При хидроизолация с горелка обаче е важно да се осигури добра вентилация на подпокривното пространство и да се информират жителите на горния етаж за временната миризма от битума. При хидроизолация на мазе или подземен етаж може да е необходимо временно отстъпване на помещенията.",
    },
    {
      question: "Какви са рисковете от некачествена хидроизолация?",
      answer:
        "Некачествената хидроизолация може да причини сериозни щети: активни течове, унищожаване на вътрешна мазилка и декорация, корозия на армировката, разпадане на топлоизолацията, поява на мухъл и плесени с рискове за здравето. В случай на блок — масови рекламации от наематели и скъпи съдебни спорове. Всички тези последствия многократно надвишават разходите за качествена хидроизолация. Нашият съвет: не гони най-евтиното предложение — гони доказания изпълнител с гаранция.",
    },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqData.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Начало", item: "https://www.remontnapokrivivarna.bg" },
      { "@type": "ListItem", position: 2, name: "Услуги", item: "https://www.remontnapokrivivarna.bg/bg/services" },
      {
        "@type": "ListItem",
        position: 3,
        name: "Хидроизолация Варна",
        item: "https://www.remontnapokrivivarna.bg/bg/хидроизолация-варна",
      },
    ],
  };

  const pricingRows = [
    { system: "Битумна еднослойна хидроизолация", thickness: "3–4 мм", lifespan: "12–18 г.", priceMin: "14 €", priceMax: "17 €/кв.м" },
    { system: "Битумна двуслойна хидроизолация (4+4 мм)", thickness: "8 мм", lifespan: "20–25 г.", priceMin: "18 €", priceMax: "22 €/кв.м" },
    { system: "PVC мембрана (1.5 мм)", thickness: "1.5 мм", lifespan: "25–35 г.", priceMin: "23 €", priceMax: "28 €/кв.м" },
    { system: "EPDM каучукова мембрана", thickness: "1.2–1.5 мм", lifespan: "40–50+ г.", priceMin: "28 €", priceMax: "35 €/кв.м" },
    { system: "Течна полиуретанова хидроизолация", thickness: "2–3 мм", lifespan: "15–20 г.", priceMin: "18 €", priceMax: "24 €/кв.м" },
    { system: "Хидроизолация на тераса/балкон", thickness: "2–4 мм", lifespan: "10–15 г.", priceMin: "20 €", priceMax: "30 €/кв.м" },
  ];

  const processSteps = [
    {
      step: 1,
      title: "Безплатен оглед и техническа оценка",
      description:
        "Нашите специалисти посещават обекта ви и правят подробна техническа оценка. Проверяват се: вид и дебелина на съществуващата хидроизолация, наличие на мехури и разслоявания, стойност на влажността на основата, наклони за оттичане на водата и детайли около комини, вентилации и бордове. На базата на огледа изготвяме индивидуална оферта с подробна спецификация.",
      image: flatRoofOverview,
      imageAlt: "Безплатен оглед на покрив за хидроизолация във Варна – оценка на теч",
    },
    {
      step: 2,
      title: "Подготовка на повърхността",
      description:
        "Правилната подготовка е ключова за дълготрайността на хидроизолацията. Премахваме изцяло старата хидроизолация (ако е необходимо), почистваме основата от прах, мъх, плесен и мазнини. Запълваме пукнатини с ремонтна смес. Ако повърхността е влажна, прилагаме специален осушаващ грунд или изчакваме оптимални условия.",
      image: surfacePrep,
      imageAlt: "Почистване и подготовка на покрив преди хидроизолация Варна",
    },
    {
      step: 3,
      title: "Нанасяне на битумен грунд (праймер)",
      description:
        "Грундът осигурява отличната адхезия между основата и хидроизолационния материал. Нанасяме битумен праймер равномерно с валяк или четка, покривайки 100% от повърхността, включително ъглите и детайлите. Изчакваме пълно изсъхване — обикновено 2–4 часа при добри условия — преди следващия етап.",
      image: primerApplication,
      imageAlt: "Нанасяне на битумен праймер на покрив преди хидроизолация Варна",
    },
    {
      step: 4,
      title: "Полагане на първи слой хидроизолация",
      description:
        "При битумна хидроизолация загряваме ролката с газова горелка и я разточваме плавно, постигайки пълна адхезия. Осигуряваме минимум 10 см застъпване между лентите и минимум 15 cm нагоре по вертикалните стени. При PVC мембрана заваряваме шевовете с горещ въздух при точно зададена температура за монолитно покритие.",
      image: torchApply,
      imageAlt: "Полагане на битумна хидроизолация с горелка на покрив Варна – първи слой",
    },
    {
      step: 5,
      title: "Обработка на критичните детайли",
      description:
        "Детайлите са най-честият източник на течове. Обработваме всички примиквания към вертикали — комини, парапети, вентилационни тела, кабели. Полагаме допълнителни усилващи ленти и течна хидроизолация в ъглите и около проходките. Внимателното изпълнение на детайлите е разликата между хидроизолация за 5 и за 25 години.",
      image: waterproofingDetail,
      imageAlt: "Хидроизолация на детайли около комин – примикване и усилване Варна",
    },
    {
      step: 6,
      title: "Полагане на втори слой (двуслойна система)",
      description:
        "При двуслойни системи полагаме втория слой перпендикулярно на първия, като шевовете не се застъпват. Това осигурява двойна защита дори при евентуално локално увреждане. Двуслойната система е задължителна стандартна за плоски покриви на жилищни и многоетажни сгради.",
      image: secondLayer,
      imageAlt: "Полагане на втори слой хидроизолация на плосък покрив Варна",
    },
    {
      step: 7,
      title: "Финален контрол и воден тест",
      description:
        "След завършване на монтажа извършваме внимателна визуална проверка на всички шевове, детайли и примиквания. При необходимост провеждаме воден тест (задържаме вода върху покрива за 24–48 ч) за проверка на абсолютна водонепропускливост. Подписваме приемо-предавателен протокол и издаваме писмена гаранция.",
      image: completedWaterproofing,
      imageAlt: "Завършена хидроизолация на покрив Варна – финален контрол и гаранция",
    },
  ];

  const serviceAreas = [
    { area: "Варна център", spots: ["Централен район", "Одесос", "Приморски"] },
    { area: "Квартали на Варна", spots: ["кв. Бриз", "кв. Чайка", "кв. Левски", "кв. Аспарухово", "кв. Владиславово", "кв. Младост", "кв. Възраждане"] },
    { area: "Околни градове и курорти", spots: ["Аксаково", "Белослав", "Девня", "Провадия", "Бяла", "Балчик", "Каварна", "Златни пясъци", "Св. Константин"] },
  ];

  // ── JSX ──────────────────────────────────────────────────
  return (
    <>
      <Helmet>
        <title>Хидроизолация Варна | Битумна, PVC, Течна – Цени и Гаранция</title>
        <meta
          name="description"
          content="Хидроизолация на покриви, тераси и плоски покриви във Варна. Битумни мембрани, PVC, течна хидроизолация. Цени от 14 €/кв.м. Над 15г опит. Писмена гаранция. Безплатен оглед: 088 499 7659"
        />
        <meta name="keywords" content="хидроизолация варна, хидроизолация на покрив, битумна хидроизолация, PVC мембрана, цена хидроизолация, течна хидроизолация, хидроизолация плосък покрив варна" />
        <meta property="og:title" content="Хидроизолация Варна | Битумна, PVC, Течна – Цени от 14 €/кв.м" />
        <meta property="og:description" content="Професионална хидроизолация на покриви и тераси. Битумни мембрани, PVC, течна хидроизолация. Над 15г опит. Безплатен оглед: 088 499 7659" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.remontnapokrivivarna.bg/bg/hidroizolacia-na-pokriv" />
        <meta property="og:image" content="https://www.remontnapokrivivarna.bg/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="bg_BG" />
        <meta property="og:site_name" content="Ремонт на Покриви Варна" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Хидроизолация Варна | Битумна, PVC, Течна – Цени от 14 €/кв.м" />
        <meta name="twitter:description" content="Хидроизолация на покриви и тераси. Битумни, PVC, течна. Над 15г опит. Безплатен оглед." />
        <meta name="twitter:image" content="https://www.remontnapokrivivarna.bg/og-image.jpg" />
        <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <Header />

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative bg-slate-900 text-white py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={roofHero}
            alt="Хидроизолация на покрив Варна – битумни мембрани и PVC"
            className="w-full h-full object-cover opacity-25"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent" />
        </div>

        <div className="container relative z-10 px-4 mx-auto">
          {/* Breadcrumb */}
          <nav className="text-slate-400 text-sm mb-6 flex items-center gap-2" aria-label="breadcrumb">
            <Link to="/bg" className="hover:text-white transition-colors">Начало</Link>
            <span>/</span>
            <Link to="/bg/хидроизолация" className="hover:text-white transition-colors">Хидроизолация</Link>
            <span>/</span>
            <span className="text-slate-200">Хидроизолация Варна</span>
          </nav>

          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Хидроизолация Варна – Битумна, PVC и Течна с Гаранция
            </h1>
            <p className="text-lg md:text-xl text-slate-200 mb-8 max-w-3xl mx-auto leading-relaxed">
              Спрете течовете завинаги. Лицензирана строителна компания с над 15 години опит в хидроизолацията на покриви, тераси и плоски покриви в Северен регион на България. Цени от 14 €/кв.м, писмена гаранция до 10 години.
            </p>

            <div className="flex flex-wrap justify-center gap-3 mb-10 text-sm md:text-base">
              {[
                { icon: <CheckCircle className="w-4 h-4 text-accent" />, text: "15+ години опит" },
                { icon: <Shield className="w-4 h-4 text-accent" />, text: "Гаранция до 10 г." },
                { icon: <Clock className="w-4 h-4 text-accent" />, text: "Безплатен оглед до 24ч" },
                { icon: <HardHat className="w-4 h-4 text-accent" />, text: "Сертифицирани екипи" },
              ].map(({ icon, text }) => (
                <div key={text} className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm border border-white/20">
                  {icon}
                  <span>{text}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-accent hover:bg-accent/90 text-white font-bold px-8 py-6 text-lg h-auto"
              >
                <a href="tel:0884997659" className="flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  Безплатен оглед: 088 499 7659
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 font-bold px-8 py-6 text-lg h-auto bg-transparent"
              >
                <Link to="/bg/контакти">Изпратете запитване</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ── EXPERT INTRO ─────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8 border-l-4 border-accent pl-4">
              Хидроизолацията – най-важната инвестиция в дълготрайността на покрива
            </h2>

            <div className="prose prose-lg max-w-none text-slate-700 space-y-6">
              <p>
                <strong>Хидроизолацията на покрив</strong> е фундаментална строителна дейност, която определя дали вашият дом ще остане сух и защитен за следващите 20–30 години, или ще се превърне в непрекъснат разход за ремонти. Варненският климат поставя специфични предизвикателства: морска влага и сол, повишена UV интензивност, летни температури, надвишаващи 35°C, и есенно-зимни дъждове. Всички тези фактори ускоряват стареенето на некачествените материали и неправилно изпълнените хидроизолационни системи.
              </p>

              <p>
                Проблемите от лошата хидроизолация рядко се ограничават само до мокро петно по тавана. Водата, проникнала в конструкцията, бавно но сигурно разрушава топлоизолацията, превръщайки я в безполезна маса; корозира армировката на бетонните плочи, намалявайки носимоспособността на конструкцията; причинява гниене на дървените елементи на таванския кат; и създава идеална среда за мухъл и плесени, опасни за здравето на живущите.
              </p>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 my-6">
                <h3 className="text-lg font-bold text-amber-900 mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-600" />
                  Кога е необходима спешна хидроизолация?
                </h3>
                <ul className="space-y-2 text-amber-800">
                  {[
                    "Видим теч или мокри петна по тавана при дъжд",
                    "Мехури, пукнатини или отлепвания на покривната хидроизолация",
                    "Хидроизолацията е на повече от 15–20 години",
                    "Мухъл или влага по стените на горния етаж",
                    "Вода, влизаща в мазето или подземния паркинг",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <p>
                Нашата компания изпълнява хидроизолации на всякакъв тип обекти в Варна и Североизточна България: от еднофамилни къщи и малки тераси до панелни блокове, хотели и търговски центрове. Работим с водещи европейски материали — <strong>Icopal</strong>, <strong>Sika Sarnafil</strong>, <strong>IKO</strong>, <strong>Bauder</strong>, <strong>Siplast</strong> — чиято устойчивост е доказана в морски условия. Всяка система, която монтираме, е съобразена с конкретния обект, натоварванията и изискванията на клиента.
              </p>

              <p>
                Ние не правим компромис с качеството на материалите или изпълнението. Убедени сме, че правилно изпълнената <strong>хидроизолация на покрив</strong> с качествени материали е значително по-евтина от многократните ремонти на евтина изолация. Затова всеки проект приключва с подписан приемо-предавателен протокол и писмена гаранция — на хартия, не само с думи.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── TYPES OF WATERPROOFING ───────────────────────── */}
      <section className="py-16 bg-slate-50">
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Видове хидроизолационни системи
            </h2>
            <p className="text-lg text-slate-600">
              Изберете системата, подходяща за вашия обект и бюджет
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Bitumen */}
            <Card className="border-t-4 border-t-accent shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Droplets className="w-6 h-6 text-accent" />
                  Битумна хидроизолация
                </h3>
                <div className="space-y-4 text-slate-700">
                  <p>
                    Битумните хидроизолационни мембрани са проверено и широко приложено решение в България. Изработени от модифициран битум (APP или SBS), те се полагат с газова горелка, осигурявайки отлична адхезия и водонепропускливост. Препоръчваме <strong>двуслойна битумна хидроизолация 4+4 мм</strong> за плоски покриви на жилищни сгради като стандарт за дълготрайна защита.
                  </p>
                  <img
                    src={torchApply}
                    alt="Битумна хидроизолация с горелка – полагане на покрив Варна"
                    className="w-full h-48 object-cover rounded-lg"
                    loading="lazy"
                  />
                  <div className="grid grid-cols-2 gap-2 mt-3">
                    {["Живот 15–25 г.", "Лесен за ремонт", "Добро съотношение цена/качество", "Подходяща за всички климати"].map((f) => (
                      <span key={f} className="flex items-center gap-1.5 text-sm">
                        <CheckCircle className="w-3.5 h-3.5 text-accent flex-shrink-0" />{f}
                      </span>
                    ))}
                  </div>
                  <div className="border-t pt-4">
                    <p className="text-sm text-slate-500">Ориентировъчна цена (труд + материали):</p>
                    <p className="text-xl font-bold text-accent">от 14 €/кв.м (1 слой) · от 18 €/кв.м (2 слоя)</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* PVC */}
            <Card className="border-t-4 border-t-blue-500 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Layers className="w-6 h-6 text-blue-500" />
                  PVC мембрана
                </h3>
                <div className="space-y-4 text-slate-700">
                  <p>
                    <strong>PVC мембраните</strong> представляват висококачествено и дълготрайно решение за хидроизолация. Полагат се механично или с лепило, а шевовете се заваряват с горещ въздух, създавайки монолитно, безшевно покритие. Идеални за търговски и индустриални сгради, зелени покриви и обекти с повишени изисквания. В Европа PVC е предпочитан стандарт за нови сгради.
                  </p>
                  <img
                    src={pvcMembrane}
                    alt="PVC мембрана за хидроизолация на плосък покрив Варна"
                    className="w-full h-48 object-cover rounded-lg"
                    loading="lazy"
                  />
                  <div className="grid grid-cols-2 gap-2 mt-3">
                    {["Живот 25–35 г.", "Монолитни заварени шевове", "Химическа устойчивост", "Зелени покриви"].map((f) => (
                      <span key={f} className="flex items-center gap-1.5 text-sm">
                        <CheckCircle className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />{f}
                      </span>
                    ))}
                  </div>
                  <div className="border-t pt-4">
                    <p className="text-sm text-slate-500">Ориентировъчна цена (труд + материали):</p>
                    <p className="text-xl font-bold text-blue-600">от 23 €/кв.м</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Liquid */}
            <Card className="border-t-4 border-t-emerald-500 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Droplets className="w-6 h-6 text-emerald-500" />
                  Течна хидроизолация
                </h3>
                <div className="space-y-4 text-slate-700">
                  <p>
                    Течната полиуретанова хидроизолация е иновативно безшевно решение, особено подходящо за тераси, балкони и сложни геометрии. Нанася се с четка или валяк, запълвайки перфектно всички неравности и ъгли. Крайният резултат е еластичен, водонепропусклив филм, устойчив на UV, температурни промени и механично натоварване при пешеходен трафик.
                  </p>
                  <img
                    src={liquidWaterproofing}
                    alt="Течна хидроизолация на тераса – Варна"
                    className="w-full h-48 object-cover rounded-lg"
                    loading="lazy"
                  />
                  <div className="grid grid-cols-2 gap-2 mt-3">
                    {["Безшевно покритие", "Тераси и балкони", "Висока еластичност", "Бързо нанасяне"].map((f) => (
                      <span key={f} className="flex items-center gap-1.5 text-sm">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />{f}
                      </span>
                    ))}
                  </div>
                  <div className="border-t pt-4">
                    <p className="text-sm text-slate-500">Ориентировъчна цена (труд + материали):</p>
                    <p className="text-xl font-bold text-emerald-600">от 18 €/кв.м</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* EPDM */}
            <Card className="border-t-4 border-t-slate-500 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Shield className="w-6 h-6 text-slate-600" />
                  EPDM каучукова мембрана
                </h3>
                <div className="space-y-4 text-slate-700">
                  <p>
                    EPDM (етилен-пропилен-диен каучук) е синтетична каучукова мембрана с изключителна дълготрайност. Устойчива на UV, озон и температури от −40°C до +120°C, тя е предпочитана за плоски покриви с голяма площ. Почти не изисква поддръжка и може да се монтира на единично парче без шевове дори на покриви над 1000 кв.м.
                  </p>
                  <div className="bg-slate-50 p-4 rounded-lg mt-3">
                    <h4 className="font-semibold text-slate-900 mb-2 text-sm">Подходяща за:</h4>
                    <p className="text-sm text-slate-600">Индустриални халета, търговски центрове, логистични центрове, сгради с изисквания за минимална поддръжка.</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-3">
                    {["Живот 40–50+ г.", "Минимална поддръжка", "Температурна устойчивост", "Екологично чист"].map((f) => (
                      <span key={f} className="flex items-center gap-1.5 text-sm">
                        <CheckCircle className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />{f}
                      </span>
                    ))}
                  </div>
                  <div className="border-t pt-4">
                    <p className="text-sm text-slate-500">Ориентировъчна цена (труд + материали):</p>
                    <p className="text-xl font-bold text-slate-600">от 28 €/кв.м</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ── PROCESS ──────────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Как изпълняваме хидроизолацията – стъпка по стъпка
            </h2>
            <p className="text-lg text-slate-600">
              Проверен процес за максимална дълготрайност и водонепропускливост
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-12">
            {processSteps.map((step, idx) => (
              <div key={step.step} className={`flex flex-col md:flex-row gap-8 items-center ${idx % 2 === 1 ? "md:flex-row-reverse" : ""}`}>
                <div className="w-full md:w-1/2">
                  <img
                    src={step.image}
                    alt={step.imageAlt}
                    className="w-full h-64 object-cover rounded-2xl shadow-md"
                    loading="lazy"
                  />
                </div>
                <div className="w-full md:w-1/2">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="w-10 h-10 rounded-full bg-accent text-white font-bold flex items-center justify-center text-lg flex-shrink-0">
                      {step.step}
                    </span>
                    <h3 className="text-xl font-bold text-slate-900">{step.title}</h3>
                  </div>
                  <p className="text-slate-700 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING TABLE ────────────────────────────────── */}
      <section className="py-16 bg-slate-50">
        <div className="container px-4 mx-auto">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 text-center">
              Цени на хидроизолация Варна
            </h2>
            <p className="text-lg text-slate-600 text-center mb-8 max-w-2xl mx-auto">
              Ориентировъчни цени за труд и материали. Точната оферта се изготвя след безплатен оглед на обекта.
            </p>

            <div className="rounded-xl overflow-hidden border border-slate-200 shadow-md">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-900 hover:bg-slate-900">
                    <TableHead className="text-white font-bold">Система</TableHead>
                    <TableHead className="text-white font-bold text-center">Дебелина</TableHead>
                    <TableHead className="text-white font-bold text-center">Живот</TableHead>
                    <TableHead className="text-white font-bold text-center">Цена от</TableHead>
                    <TableHead className="text-white font-bold text-center">Цена до</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pricingRows.map((row, idx) => (
                    <TableRow key={row.system} className={idx % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                      <TableCell className="font-medium text-slate-900">{row.system}</TableCell>
                      <TableCell className="text-center text-slate-600">{row.thickness}</TableCell>
                      <TableCell className="text-center text-slate-600">{row.lifespan}</TableCell>
                      <TableCell className="text-center font-bold text-accent">{row.priceMin}</TableCell>
                      <TableCell className="text-center font-bold text-accent">{row.priceMax}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-5 text-sm text-blue-800">
              <p className="font-semibold mb-2">💡 Важно за ценообразуването:</p>
              <ul className="space-y-1 list-disc list-inside">
                <li>Цените са без ДДС, за труд и основни материали.</li>
                <li>Демонтаж на стара хидроизолация — допълнително 3–5 €/кв.м.</li>
                <li>Ремонт на бетонна основа (пукнатини, неравности) — по заявка.</li>
                <li>Минимален обект — 50 кв.м или фиксирана минимална стойност.</li>
                <li>Транспорт за обекти извън гр. Варна — по реален разход.</li>
              </ul>
            </div>

            <div className="mt-6 text-center">
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-white font-bold px-8">
                <a href="tel:0884997659" className="flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  Получете точна оферта: 088 499 7659
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Защо да изберете нас за хидроизолация във Варна?
            </h2>
            <p className="text-lg text-slate-600">Повече от 15 години ние изграждаме доверие с качествена работа</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                icon: <Ruler className="w-6 h-6 text-accent" />,
                title: "Безплатен оглед и точна диагностика",
                desc: "Пристигаме в рамките на 24 часа, измерваме и оценяваме обективно. Не ви продаваме повече, отколкото ви трябва.",
              },
              {
                icon: <HardHat className="w-6 h-6 text-accent" />,
                title: "Обучени и сертифицирани екипи",
                desc: "Нашите майстори са обучени от производителите на материалите и изпълняват хидроизолации по всички технологични изисквания.",
              },
              {
                icon: <Shield className="w-6 h-6 text-accent" />,
                title: "Писмена гаранция до 10 години",
                desc: "Даваме гаранция в официален договор, не само с думи. Покрива водонепропускливост и целостта на монтажа.",
              },
              {
                icon: <Star className="w-6 h-6 text-accent" />,
                title: "Само качествени европейски материали",
                desc: "Работим изключително с Icopal, Sika Sarnafil, IKO, Bauder — марки с доказана устойчивост в морски климат.",
              },
              {
                icon: <Clock className="w-6 h-6 text-accent" />,
                title: "Навременно изпълнение",
                desc: "Изготвяме реалистичен график и го спазваме. Информираме ви предварително при всяко евентуално забавяне.",
              },
              {
                icon: <Banknote className="w-6 h-6 text-accent" />,
                title: "Прозрачно ценообразуване",
                desc: "Детайлна оферта с разбивка по позиции. Без скрити такси. Фактура и договор за всеки обект.",
              },
            ].map(({ icon, title, desc }) => (
              <Card key={title} className="border-border/40 hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                    {icon}
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">{title}</h3>
                  <p className="text-slate-600 text-sm">{desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICE AREAS ────────────────────────────────── */}
      <section className="py-16 bg-slate-50">
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8 flex items-center gap-3">
              <MapPin className="w-8 h-8 text-accent" />
              Хидроизолация в Варна и региона
            </h2>

            <div className="prose prose-lg max-w-none text-slate-700 space-y-4 mb-8">
              <p>
                Ние изпълняваме <strong>хидроизолации на покриви</strong> в цял град Варна, включително всички квартали и покрайнини, и в широк регион около него. Мобилността ни е осигурена с собствен транспорт и достъп до материали от регионален склад, което ни позволява да реагираме бързо дори при аварийни ситуации.
              </p>
              <p>
                Варненският регион е специфично предизвикателство за хидроизолационните системи. Близостта до морето означава постоянна солена влага, повишена агресивност на въздуха и интензивно UV облъчване. Ние избираме материали и системи, сертифицирани за работа в крайбрежен климат, с доказана устойчивост в сходни условия в Западна Европа.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {serviceAreas.map((area) => (
                <div key={area.area} className="bg-white rounded-xl p-5 border border-slate-200">
                  <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-accent" />
                    {area.area}
                  </h3>
                  <ul className="space-y-1">
                    {area.spots.map((spot) => (
                      <li key={spot} className="text-sm text-slate-600 flex items-center gap-1.5">
                        <CheckCircle className="w-3.5 h-3.5 text-accent flex-shrink-0" />
                        {spot}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 text-center">
              Често задавани въпроси за хидроизолация Варна
            </h2>
            <p className="text-lg text-slate-600 text-center mb-10">
              Отговори на най-честите въпроси от наши клиенти
            </p>

            <Accordion type="single" collapsible className="space-y-3">
              {faqData.map((faq, idx) => (
                <AccordionItem
                  key={idx}
                  value={`faq-${idx}`}
                  className="border border-slate-200 rounded-xl px-6 shadow-sm data-[state=open]:border-accent/40"
                >
                  <AccordionTrigger className="text-left font-semibold text-slate-900 hover:no-underline py-5">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-700 leading-relaxed pb-5">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* ── LEARN MORE LINKS ─────────────────────────────── */}
      <section className="py-8 bg-slate-50">
        <div className="container px-4 mx-auto max-w-4xl">
          <LearnMoreLinks links={learnMoreLinks} />
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <CTASection
        title="Нуждаете се от хидроизолация в Варна?"
        subtitle="Обадете се за безплатен оглед и получете точна оферта в рамките на 24 часа. Над 15 години опит, писмена гаранция."
      />

      {/* ── RELATED SERVICES ─────────────────────────────── */}
      <RelatedServices services={relatedServices} />

      <Footer />
      <FloatingCallButton />
    </>
  );
};

export default WaterproofingVarnaPage;
