import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Phone, MapPin, Shield, CheckCircle, Wrench, Droplets, Hammer, Ruler, ClipboardList, HardHat } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import heroImage from "@/assets/hero-tile-replacement.jpg";

const BASE_URL = "https://www.remontnapokrivivarna.bg";

/**
 * PlovdivHome — /bg/plovdiv
 * Основна SEO целева страница за Пловдив със собствено съдържание,
 * различно от страниците за София, Варна и останалите градове.
 */

const FAQ = [
  {
    q: "Имате ли екип, който живее в Пловдив?",
    a: "Не. Фирмата е базирана във Варна и Пловдив е обслужвана територия — приемаме обекти в града, а бригадата пътува за конкретния договор. Затова огледът се планира за предварително уговорена дата.",
  },
  {
    q: "Покривът ми тече само при силен дъжд с вятър. Може ли да се намери причината?",
    a: "Да, и това е типична картина. При коса дъжд водата влиза през фугите между керемидите или през детайл, който при спокоен дъжд остава сух. Търсим я по подредбата на керемидите, по обшивките и по състоянието на подпокривната мембрана.",
  },
  {
    q: "Как се определят количествата за офертата?",
    a: "Измерват се скатовете, дължините на билото, ръбовете, улуците и всички детайли. Керемидите се броят по площ и модел. Тези числа влизат в офертата, така че всяка позиция е проследима.",
  },
  {
    q: "Може ли да се смени само част от керемидите?",
    a: "Може, когато моделът все още се произвежда или има запазени резервни от същата партида. При спрян от производство модел частичната подмяна почти винаги личи и рядко е дълготрайно решение.",
  },
  {
    q: "След градушка какво се прави първо?",
    a: "Първо се спира влизането на вода — временно покриване на засегнатата зона. След това се прави пълен оглед за напукани керемиди, защото пукнатините от градушка често се виждат едва отблизо.",
  },
  {
    q: "Каква гаранция получавам?",
    a: "До 15 години писмена гаранция върху извършените работи. Обхватът и условията се описват в договора преди началото на изпълнението.",
  },
];

const SERVICES = [
  { to: "/bg/varna/remont-na-keremideni-pokrivi", label: "Подмяна и ремонт на керемиди", icon: Hammer },
  { to: "/bg/varna/remont-na-techove-pokriv", label: "Откриване и отстраняване на течове", icon: Droplets },
  { to: "/bg/varna/remont-na-pokrivi", label: "Частичен и цялостен ремонт на покрив", icon: Wrench },
  { to: "/bg/varna/nov-pokriv", label: "Изграждане на нов покрив", icon: Hammer },
  { to: "/bg/varna/hidroizolacia-na-pokriv", label: "Хидроизолация на покриви и тераси", icon: Droplets },
  { to: "/bg/varna/remont-na-ploski-pokrivi", label: "Ремонт на плоски покриви", icon: Wrench },
  { to: "/bg/varna/metalni-pokrivi", label: "Метални покриви и ламарина", icon: Hammer },
  { to: "/bg/varna/poddruzhka-na-pokrivi", label: "Поддръжка и профилактика", icon: Shield },
];

const PlovdivHome = () => {
  const canonical = `${BASE_URL}/bg/plovdiv`;
  const title = "Ремонт на покриви Пловдив | Покривни услуги";
  const description =
    "Покривни услуги в Пловдив — ремонт на керемиден покрив, спиране на течове, дървена конструкция, хидроизолация и нов покрив. Оглед на място, количества и писмена оферта.";

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Ремонт на покриви",
    "name": "Ремонт на покриви Пловдив",
    "description": description,
    "provider": { "@type": "Organization", "name": "Булгар Билд ЕООД", "url": `${BASE_URL}/bg/za-nas` },
    "areaServed": { "@type": "City", "name": "Пловдив" },
    "url": canonical,
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Покривни услуги в Пловдив",
      "itemListElement": SERVICES.map((s) => ({
        "@type": "Offer",
        "itemOffered": { "@type": "Service", "name": s.label },
      })),
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Начало", "item": `${BASE_URL}/bg/varna` },
      { "@type": "ListItem", "position": 2, "name": "Градове", "item": `${BASE_URL}/bg/gradove` },
      { "@type": "ListItem", "position": 3, "name": "Пловдив", "item": canonical },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": FAQ.map((f) => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": { "@type": "Answer", "text": f.a },
    })),
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <meta property="og:title" content="Ремонт на покриви в Пловдив — керемиди, течове, конструкция" />
        <meta
          property="og:description"
          content="Приемаме покривни обекти в Пловдив: керемиден покрив, спиране на течове, дървена конструкция, хидроизолация. Оглед, количества и писмена оферта."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content={`${BASE_URL}/og-image.jpg`} />
        <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative min-h-[70vh] flex items-center overflow-hidden pt-20 md:pt-24">
          <div className="absolute inset-0 z-0">
            <img
              src={heroImage}
              alt="Подмяна на керемиди върху скатен покрив на еднофамилна къща"
              fetchPriority="high"
              decoding="sync"
              width={1920}
              height={1080}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_20%,_rgba(15,23,42,0.6)_70%,_rgba(15,23,42,0.9)_100%)]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/75 via-[#0f172a]/35 to-transparent" />
          </div>

          <div className="container mx-auto px-4 py-12 md:py-20 relative z-10">
            <nav aria-label="breadcrumb" className="mb-5 text-sm text-primary-foreground/80">
              <Link to="/bg/varna" className="hover:text-primary-foreground transition-colors">Начало</Link>
              <span className="mx-2">›</span>
              <Link to="/bg/gradove" className="hover:text-primary-foreground transition-colors">Градове</Link>
              <span className="mx-2">›</span>
              <span className="text-primary-foreground">Пловдив</span>
            </nav>

            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-1.5 bg-primary/70 backdrop-blur-sm text-primary-foreground/90 px-3 py-1.5 rounded-full text-sm font-medium mb-5">
                <MapPin className="w-4 h-4 text-green-400" />
                Обслужвана територия: Пловдив и околността
              </span>

              <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-5 leading-tight [text-shadow:_0_3px_16px_rgba(0,0,0,0.9)]">
                Ремонт на покриви в Пловдив
              </h1>

              <p className="text-lg md:text-xl text-primary-foreground/90 mb-8 [text-shadow:_0_2px_8px_rgba(0,0,0,0.6)]">
                Керемиден покрив, който тече след всяка буря, уморена дървена конструкция или напукана хидроизолация — работим по обекти в Пловдив с оглед на място и оферта, изградена върху измерени количества.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button asChild size="lg" className="h-14 bg-accent hover:bg-accent/90 text-accent-foreground text-base font-bold px-7">
                  <Link to="/bg/zayavete-oferta">Заявете оферта за Пловдив</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="h-14 bg-primary/40 backdrop-blur-sm border-2 border-white/80 text-primary-foreground hover:bg-primary-foreground hover:text-primary text-base font-bold px-7">
                  <a href="tel:0893971873" className="flex items-center justify-center gap-2">
                    <Phone className="w-5 h-5" />
                    089 397 1873
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Представяне */}
        <section className="py-14 md:py-20 bg-background">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-6">
              Как обслужваме обекти в Пловдив
            </h2>
            <div className="space-y-4 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>
                Сайтът се поддържа от <strong className="text-foreground">Булгар Билд ЕООД</strong> — покривна фирма със седалище във Варна. Пловдив не е наша база и нямаме офис в града; приемаме обекти там и изпращаме бригада за конкретния договор.
              </p>
              <p>
                Затова подхождаме различно от местна фирма, която може да „намине пак другата седмица“. Огледът, измерването и уточняването на детайлите се правят наведнъж, а изпълнението върви в непрекъснат график до предаване на обекта.
              </p>
              <p>
                Работим по еднофамилни къщи с керемиден покрив, по стари сгради с дървена конструкция и по плоски покриви и тераси на жилищни и стопански сгради.
              </p>
            </div>
          </div>
        </section>

        {/* Какви ремонти извършваме */}
        <section className="py-14 md:py-20 bg-muted/30">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-8">
              Какви покривни ремонти извършваме
            </h2>
            <div className="grid md:grid-cols-2 gap-5">
              {[
                { t: "Демонтаж на стари и монтаж на нови керемиди", d: "С почистване на основата и правилно застъпване, а не само подмяна на счупените парчета." },
                { t: "Ремонт или подмяна на дървената конструкция", d: "Ребра, столици и обшивка — там, където дървото е поело влага или е нападнато от насекоми." },
                { t: "Подпокривна мембрана, летви и контралетви", d: "Слоят, който поема водата, минала под керемидите при коса дъжд и вятър." },
                { t: "Обшивки около комини и ремонт на комини", d: "Възстановяване на детайла, който най-често пропуска вода при стар покрив." },
                { t: "Топлоизолация на покрив", d: "Полага се заедно с покривните работи, когато таванското пространство се обитава." },
                { t: "Улуци и водосточни тръби", d: "Подмяна и корекция на наклона, за да не се задържа вода по ръба на покрива." },
              ].map((item) => (
                <div key={item.t} className="bg-background border border-border rounded-xl p-6">
                  <h3 className="text-lg font-bold text-foreground mb-2 flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    {item.t}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">{item.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Чести проблеми */}
        <section className="py-14 md:py-20 bg-background">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-6">
              Чести проблеми при покривите в Пловдив
            </h2>
            <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>
                <strong className="text-foreground">Летни горещини и температурни удари.</strong> Дългите горещи дни изтощават битумните покрития по плоските покриви — материалът се втвърдява, а после се напуква при първото рязко застудяване.
              </p>
              <p>
                <strong className="text-foreground">Внезапни бури и градушка.</strong> Керемидите се напукват на косъм и повредата не се вижда от земята. Течът се появява няколко седмици по-късно, когато дъждът намери пътя си.
              </p>
              <p>
                <strong className="text-foreground">Стари дървени конструкции.</strong> При къщи с десетилетия зад гърба си влагата е работила бавно. Смяната само на покритието върху уморена конструкция е загубени пари.
              </p>
              <p>
                <strong className="text-foreground">Запушени улуци.</strong> Листа и прах се събират през сухите месеци; при първия силен дъжд водата прелива по фасадата и намокря стената при основата на покрива.
              </p>
            </div>
          </div>
        </section>

        {/* Частичен vs цялостен */}
        <section className="py-14 md:py-20 bg-muted/30">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-8">
              Кога е достатъчен частичен ремонт и кога не
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-background border-t-4 border-primary rounded-xl p-6 shadow-sm">
                <h3 className="text-xl font-bold text-foreground mb-3">Частичен ремонт</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>Счупени керемиди в ограничен участък след буря.</li>
                  <li>Един проблемен детайл — комин, борд или воронка.</li>
                  <li>Здрава и суха конструкция под покритието.</li>
                  <li>Наличен същия модел керемида за подмяна.</li>
                </ul>
              </div>
              <div className="bg-background border-t-4 border-accent rounded-xl p-6 shadow-sm">
                <h3 className="text-xl font-bold text-foreground mb-3">Цялостен ремонт</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>Течове на различни места по един и същи скат.</li>
                  <li>Пропаднали или влажни елементи от конструкцията.</li>
                  <li>Липсваща или разпадаща се подпокривна мембрана.</li>
                  <li>Керемиди с изтекъл живот и масови микропукнатини.</li>
                </ul>
              </div>
            </div>
            <p className="mt-6 text-muted-foreground">
              Ако огледът покаже, че локална намеса решава проблема, предлагаме нея — цялостна подмяна се препоръчва само когато е технически оправдана.
            </p>
          </div>
        </section>

        {/* Услуги */}
        <section className="py-14 md:py-20 bg-background">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-3">
              Покривни услуги в Пловдив
            </h2>
            <p className="text-muted-foreground mb-8">
              Отворете съответната страница за подробности по материали, слоеве и изпълнение.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {SERVICES.map((s) => (
                <Link
                  key={s.to + s.label}
                  to={s.to}
                  className="flex items-start gap-3 bg-muted/30 border border-border rounded-xl p-5 hover:border-primary transition-colors"
                >
                  <s.icon className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="font-semibold text-foreground">{s.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Как протича работата */}
        <section className="py-14 md:py-20 bg-muted/30">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-8">
              Как протича работата по обект в Пловдив
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { icon: Phone, t: "1. Описание на случая", d: "Питаме откога тече, при какъв дъжд, какъв е покривът и правено ли е нещо досега. Оттам се вижда какъв оглед е нужен." },
                { icon: Ruler, t: "2. Оглед и измерване", d: "На място се проверяват покритието, детайлите и конструкцията, а скатовете и дължините се измерват за оферта." },
                { icon: ClipboardList, t: "3. Оферта по позиции", d: "Всяка позиция е с количество и описание — виждате какво точно се плаща и защо." },
                { icon: HardHat, t: "4. Договор и изпълнение", d: "Подписва се договор с гаранционни условия, организира се достъпът и работата върви по график до предаване." },
              ].map((s) => (
                <div key={s.t} className="bg-background border border-border rounded-xl p-6">
                  <s.icon className="w-6 h-6 text-primary mb-3" />
                  <h3 className="text-lg font-bold text-foreground mb-2">{s.t}</h3>
                  <p className="text-muted-foreground leading-relaxed">{s.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Защо нас */}
        <section className="py-14 md:py-20 bg-background">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-8">
              Защо да изберете нас за покрива си
            </h2>
            <ul className="grid sm:grid-cols-2 gap-4">
              {[
                "Причината се доказва при огледа, преди да се говори за решение",
                "Оферта с измерени количества и описани материали",
                "До 15 години писмена гаранция върху извършените работи",
                "Регистрирана фирма и договор преди началото на работата",
                "Пълен обхват — конструкция, покритие, детайли и улуци",
                "Изпълнение в непрекъснат график, без разтягане на обекта",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 bg-muted/30 border border-border rounded-lg p-4">
                  <Shield className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-14 md:py-20 bg-muted/30">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-8">
              Често задавани въпроси за Пловдив
            </h2>
            <Accordion type="single" collapsible className="w-full">
              {FAQ.map((f, i) => (
                <AccordionItem key={f.q} value={`item-${i}`}>
                  <AccordionTrigger className="text-left text-base md:text-lg font-semibold">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed text-base">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Финална CTA */}
        <section className="py-14 md:py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <h2 className="text-2xl md:text-4xl font-bold mb-4">
              Организирайте оглед на покрива в Пловдив
            </h2>
            <p className="text-lg text-primary-foreground/90 mb-8">
              Напишете какво се случва с покрива и ще се свържем, за да уговорим ден за оглед и измерване.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild size="lg" className="h-14 bg-accent hover:bg-accent/90 text-accent-foreground text-base font-bold px-8">
                <Link to="/bg/zayavete-oferta">Изпратете запитване</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-14 bg-transparent border-2 border-primary-foreground/80 text-primary-foreground hover:bg-primary-foreground hover:text-primary text-base font-bold px-8">
                <a href="tel:0893971873" className="flex items-center justify-center gap-2">
                  <Phone className="w-5 h-5" />
                  089 397 1873
                </a>
              </Button>
            </div>
            <p className="mt-8 text-sm text-primary-foreground/70">
              Обслужваме и{" "}
              <Link to="/bg/sofia" className="underline hover:text-primary-foreground">София</Link>,{" "}
              <Link to="/bg/varna" className="underline hover:text-primary-foreground">Варна</Link> и{" "}
              <Link to="/bg/gradove" className="underline hover:text-primary-foreground">други градове</Link>.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default PlovdivHome;
