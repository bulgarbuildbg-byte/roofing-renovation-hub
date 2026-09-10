import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Phone, MapPin, Shield, CheckCircle, Wrench, Droplets, Hammer, Search, FileText, CalendarCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import heroImage from "@/assets/hero-roof-repair.jpg";

const BASE_URL = "https://www.remontnapokrivivarna.bg";

/**
 * SofiaHome — /bg/sofia
 * Основна SEO целева страница за София. Съдържанието е самостоятелно
 * написано и не преизползва текстовете на другите градски страници.
 */

const FAQ = [
  {
    q: "Работите ли в София, след като фирмата е базирана във Варна?",
    a: "Да. Булгар Билд ЕООД е базирана във Варна и приема покривни обекти и в София. Нямаме офис и постоянно базиран екип в София — екипът пътува до обекта, затова огледът се уговаря предварително за конкретен ден и час.",
  },
  {
    q: "Как се установява откъде тече покривът?",
    a: "Оглед на покривната повърхност и на всички детайли — комини, бордове, воронки, обшивки. Проверяваме и от вътрешната страна, в подпокривното пространство, защото петното на тавана рядко е точно под мястото на теча. При плоски покриви правим и водна проба на съмнителните участъци.",
  },
  {
    q: "Кога е достатъчен частичен ремонт на покрив?",
    a: "Когато конструкцията е здрава и повредата е локална — счупени керемиди, скъсана обшивка около комин, спукана хидроизолация в един участък. Тогава ремонтираме само проблемната зона.",
  },
  {
    q: "Колко време отнема изготвянето на офертата?",
    a: "Количествата се снемат на място по време на огледа. След това получавате писмена оферта с разбивка по позиции — материали, труд, достъп и допълнителни детайли.",
  },
  {
    q: "Какво покрива гаранцията?",
    a: "Върху извършените покривни работи даваме до 15 години писмена гаранция. Условията се вписват в договора преди старта на работата.",
  },
  {
    q: "Може ли да се работи по покрив на панелен блок?",
    a: "Да. При жилищни блокове най-често става дума за хидроизолация на плоския покрив, ремонт на воронки и бордове. Организацията минава през домоуправителя или упълномощено лице.",
  },
];

const SERVICES = [
  { to: "/bg/varna/remont-na-techove-pokriv", label: "Откриване и отстраняване на течове", icon: Droplets },
  { to: "/bg/varna/remont-na-pokrivi", label: "Частичен и цялостен ремонт на покрив", icon: Wrench },
  { to: "/bg/varna/remont-na-keremideni-pokrivi", label: "Демонтаж и подмяна на керемиди", icon: Hammer },
  { to: "/bg/varna/hidroizolacia-na-pokriv", label: "Хидроизолация на покриви и тераси", icon: Droplets },
  { to: "/bg/varna/remont-na-ploski-pokrivi", label: "Ремонт на плоски покриви", icon: Wrench },
  { to: "/bg/varna/metalni-pokrivi", label: "Метални покриви и ламарина", icon: Hammer },
  { to: "/bg/varna/nov-pokriv", label: "Изграждане на нов покрив", icon: Hammer },
  { to: "/bg/varna/poddruzhka-na-pokrivi", label: "Поддръжка и профилактика", icon: Shield },
];

const SofiaHome = () => {
  const canonical = `${BASE_URL}/bg/sofia`;
  const title = "Ремонт на покриви София | Покривни услуги";
  const description =
    "Ремонт на покриви в София — отстраняване на течове, подмяна на керемиди, хидроизолация на тераси и плоски покриви, нов покрив. Оглед, писмена оферта и до 15 години гаранция.";

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Ремонт на покриви",
    "name": "Ремонт на покриви София",
    "description": description,
    "provider": { "@type": "Organization", "name": "Булгар Билд ЕООД", "url": `${BASE_URL}/bg/za-nas` },
    "areaServed": { "@type": "City", "name": "София" },
    "url": canonical,
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Покривни услуги в София",
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
      { "@type": "ListItem", "position": 3, "name": "София", "item": canonical },
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
        <link rel="canonical" href={canonical} />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <meta property="og:title" content="Ремонт на покриви в София — течове, керемиди, хидроизолация" />
        <meta
          property="og:description"
          content="Приемаме покривни обекти в София: локализиране на течове, частичен и цялостен ремонт, хидроизолация, нов покрив. Оглед на място и писмена оферта."
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
              alt="Покривен специалист работи по ремонт на скатен покрив"
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
              <span className="text-primary-foreground">София</span>
            </nav>

            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-1.5 bg-primary/70 backdrop-blur-sm text-primary-foreground/90 px-3 py-1.5 rounded-full text-sm font-medium mb-5">
                <MapPin className="w-4 h-4 text-green-400" />
                Обслужвана територия: София и близките райони
              </span>

              <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-5 leading-tight [text-shadow:_0_3px_16px_rgba(0,0,0,0.9)]">
                Ремонт на покриви в София
              </h1>

              <p className="text-lg md:text-xl text-primary-foreground/90 mb-8 [text-shadow:_0_2px_8px_rgba(0,0,0,0.6)]">
                Спираме течове, подменяме керемиди и възстановяваме хидроизолация по покриви и тераси в столицата. Оглед на място, ясни количества и писмена оферта, преди да започне каквато и да е работа.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button asChild size="lg" className="h-14 bg-accent hover:bg-accent/90 text-accent-foreground text-base font-bold px-7">
                  <Link to="/bg/zayavete-oferta">Заявете оферта за София</Link>
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

        {/* Кои сме и как обслужваме София */}
        <section className="py-14 md:py-20 bg-background">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-6">
              Кои сме и как работим в столицата
            </h2>
            <div className="space-y-4 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>
                Зад сайта стои <strong className="text-foreground">Булгар Билд ЕООД</strong> — покривна фирма със седалище във Варна. В София нямаме офис и постоянно базиран екип; градът е обслужвана територия, в която приемаме покривни обекти и изпращаме бригада за конкретния договор.
              </p>
              <p>
                На практика това означава по-малко импровизация: огледът се планира за уговорен ден, количествата се снемат наведнъж, а изпълнението се организира в непрекъснат график, без разтегляне на обекта през седмици. За клиента остава същото — писмена оферта, договор и до 15 години гаранция върху извършените работи.
              </p>
              <p>
                Работим както по еднофамилни къщи в районите около Витоша, така и по тераси и плоски покриви на жилищни сгради в централните и панелните квартали.
              </p>
            </div>
          </div>
        </section>

        {/* Какви покривни ремонти извършваме */}
        <section className="py-14 md:py-20 bg-muted/30">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-8">
              Какви покривни ремонти извършваме
            </h2>
            <div className="grid md:grid-cols-2 gap-5">
              {[
                { t: "Локализиране и спиране на теч", d: "Проследяване на пътя на водата от петното на тавана до реалното входно място по покрива." },
                { t: "Ремонт на дървената конструкция", d: "Подмяна на изгнили ребра, столици и обшивка там, където дървото е поело влага дълго време." },
                { t: "Подпокривна мембрана, летви и контралетви", d: "Възстановяване на слоевете под керемидите — без тях покривът тече отново след първата коса дъжд и вятър." },
                { t: "Обшивки около комини и ремонт на комини", d: "Най-честият източник на течове при скатен покрив в стара сграда." },
                { t: "Хидроизолация на тераси и плоски покриви", d: "Битумни системи, PVC мембрани или течна хидроизолация според основата и достъпа." },
                { t: "Улуци и водосточни тръби", d: "Подмяна, преоразмеряване и коригиране на наклона, когато водата се задържа или прелива." },
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
              Чести проблеми при покривите в София
            </h2>
            <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>
                <strong className="text-foreground">Стари сгради с многократно кърпен покрив.</strong> В централните части се среща покрив, по който през годините са минали няколко различни бригади. Слоевете не са съвместими, а всяко ново кърпене държи по един сезон.
              </p>
              <p>
                <strong className="text-foreground">Тераси над жилищни помещения.</strong> Хидроизолацията около воронките и бордовете се уморява първа. Водата не се вижда навън — появява се като петно в стаята под терасата.
              </p>
              <p>
                <strong className="text-foreground">Задържан сняг и лед.</strong> По-дългият студен сезон в столицата натоварва улуците и ръба на покрива; замръзналата вода се качва под керемидите и влиза навътре.
              </p>
              <p>
                <strong className="text-foreground">Комини и вентилационни изводи.</strong> Пукнатата или смачкана обшивка около комина е причина за голяма част от течовете, които собственикът приписва на самите керемиди.
              </p>
            </div>
          </div>
        </section>

        {/* Частичен vs цялостен */}
        <section className="py-14 md:py-20 bg-muted/30">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-8">
              Частичен или цялостен ремонт
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-background border-t-4 border-primary rounded-xl p-6 shadow-sm">
                <h3 className="text-xl font-bold text-foreground mb-3">Кога стига частичен ремонт</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>Конструкцията е суха и здрава.</li>
                  <li>Повредата е в един ясно ограничен участък.</li>
                  <li>Керемидите са в добро състояние и има налични резервни.</li>
                  <li>Хидроизолацията е скъсана локално, а не изчерпана по цялата площ.</li>
                </ul>
              </div>
              <div className="bg-background border-t-4 border-accent rounded-xl p-6 shadow-sm">
                <h3 className="text-xl font-bold text-foreground mb-3">Кога се налага цялостен ремонт</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>Течовете се появяват на няколко различни места.</li>
                  <li>Дървото по ребрата е меко, потъмняло или пропаднало.</li>
                  <li>Липсва подпокривна мембрана или тя се рони при допир.</li>
                  <li>Покритието е към края на живота си и всяко кърпене е временно.</li>
                </ul>
              </div>
            </div>
            <p className="mt-6 text-muted-foreground">
              Решението се взема след огледа, а не по телефона. Ако е достатъчен частичен ремонт, го казваме — по-скъпата оферта не е по-добрата.
            </p>
          </div>
        </section>

        {/* Услуги с връзки */}
        <section className="py-14 md:py-20 bg-background">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-3">
              Покривни услуги в София
            </h2>
            <p className="text-muted-foreground mb-8">
              Всяка услуга има подробна страница с описание на материалите и на процеса.
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
              Как протича работата
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { icon: Phone, t: "1. Разговор и уговорка", d: "Описвате какво се случва — къде тече, откога, какво е правено досега. Уговаряме ден за оглед в София." },
                { icon: Search, t: "2. Оглед и диагностика", d: "Проверяваме покрива отгоре и подпокривното пространство отвътре, снимаме детайлите и намираме реалната причина." },
                { icon: FileText, t: "3. Количества и оферта", d: "Площите и детайлите се измерват на място. Получавате писмена оферта с разбивка по позиции." },
                { icon: CalendarCheck, t: "4. Договор и изпълнение", d: "След съгласуване се подписва договор с гаранционни условия и се фиксира график за изпълнението." },
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
              Защо да изберете нас
            </h2>
            <ul className="grid sm:grid-cols-2 gap-4">
              {[
                "Писмена оферта с количества, а не устна прогноза по телефона",
                "До 15 години писмена гаранция върху извършените работи",
                "Диагностика на причината, преди да се предложи решение",
                "Един изпълнител за целия обект — от конструкция до улуци",
                "Фирма с ЕИК и договор, а не бригада без документи",
                "Ясна комуникация за срок и организация на достъпа",
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
              Често задавани въпроси за София
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
              Заявете оглед на покрив в София
            </h2>
            <p className="text-lg text-primary-foreground/90 mb-8">
              Опишете накратко проблема и ще уговорим ден за оглед. Офертата идва писмено, след като са снети количествата.
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
              Работим и в{" "}
              <Link to="/bg/plovdiv" className="underline hover:text-primary-foreground">Пловдив</Link>,{" "}
              <Link to="/bg/varna" className="underline hover:text-primary-foreground">Варна</Link> и{" "}
              <Link to="/bg/gradove" className="underline hover:text-primary-foreground">още градове</Link>.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default SofiaHome;
