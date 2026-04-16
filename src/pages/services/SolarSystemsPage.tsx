import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCallButton from "@/components/FloatingCallButton";
import TrustIndicators from "@/components/TrustIndicators";
import HowWeWork from "@/components/HowWeWork";
import CompletedProjects from "@/components/CompletedProjects";
import Testimonials from "@/components/Testimonials";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Sun, Zap, Shield, Home, Building, TrendingUp, Wrench, CheckCircle, Phone, ArrowRight, Lightbulb, Battery, Leaf, DollarSign, Clock, Award } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useLocalizedPath } from "@/hooks/useLocalizedPath";

const SolarSystemsPage = () => {
  const { getPath } = useLocalizedPath();

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Соларни системи Варна – Фотоволтаични системи за дома и бизнеса",
    "provider": {
      "@type": "RoofingContractor",
      "name": "RemontNaPokriviVarna",
      "telephone": "+359884997659",
      "email": "remontnapokrivivarna@abv.bg",
      "address": { "@type": "PostalAddress", "streetAddress": "ул. Уста Колю Фичето 25 А", "addressLocality": "Варна", "addressCountry": "BG" }
    },
    "areaServed": [
      { "@type": "City", "name": "Варна" },
      { "@type": "Place", "name": "Аксаково" },
      { "@type": "Place", "name": "Златни пясъци" }
    ],
    "description": "Проектиране, доставка и монтаж на соларни (фотоволтаични) системи за къщи, сгради и инвестиции. Покрив + солар от една фирма – без риск от течове.",
    "offers": { "@type": "AggregateOffer", "lowPrice": "4500", "highPrice": "80000", "priceCurrency": "EUR" }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": "Какво е соларна (фотоволтаична) система?", "acceptedAnswer": { "@type": "Answer", "text": "Соларната система, известна също като фотоволтаична система (ФВС), е технология, която преобразува слънчевата светлина в електрическа енергия чрез соларни панели. Двете понятия означават едно и също – система за производство на електричество от слънцето." } },
      { "@type": "Question", "name": "Колко струва соларна система за къща?", "acceptedAnswer": { "@type": "Answer", "text": "Цената зависи от мощността. Стандартна 8 kW система за еднофамилна къща струва между 8 000 – 12 000 € с монтаж. Системи с батерия (хибридни) са от 12 000 до 18 000 €." } },
      { "@type": "Question", "name": "За колко години се изплаща фотоволтаична система?", "acceptedAnswer": { "@type": "Answer", "text": "Средният срок за изплащане е 4-7 години в зависимост от потреблението и мощността. След това системата генерира чиста печалба 20+ години." } },
      { "@type": "Question", "name": "Защо е важно покривът да е в добро състояние?", "acceptedAnswer": { "@type": "Answer", "text": "Соларните панели се монтират за 25+ години. Ако покривът има проблеми, ще трябва да демонтирате панелите за ремонт, което е скъпо. Нашето предимство е, че ремонтираме покрива и монтираме панелите наведнъж." } },
      { "@type": "Question", "name": "Колко електричество произвежда соларна система?", "acceptedAnswer": { "@type": "Answer", "text": "В България 1 kW инсталирана мощност произвежда средно 1 200–1 400 kWh годишно. 8 kW система произвежда ~10 000 kWh – достатъчно за средно домакинство." } },
      { "@type": "Question", "name": "Трябва ли ми батерия за соларната система?", "acceptedAnswer": { "@type": "Answer", "text": "Не е задължително. Без батерия продавате излишъка на мрежата. С батерия съхранявате енергия за нощта и при спиране на тока. Хибридните системи с батерия са по-скъпи, но осигуряват енергийна независимост." } },
      { "@type": "Question", "name": "Каква гаранция давате?", "acceptedAnswer": { "@type": "Answer", "text": "25 години производствена гаранция на панелите, 10 години на инвертора, 15 години писмена гаранция на монтажа и покривната конструкция." } },
      { "@type": "Question", "name": "Работите ли само във Варна?", "acceptedAnswer": { "@type": "Answer", "text": "Обслужваме Варна и региона в радиус от 50 км – включително Аксаково, Златни пясъци, Белослав, Девня и околните села." } },
    ]
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Начало", "item": "https://www.remontnapokrivivarna.bg/bg" },
      { "@type": "ListItem", "position": 2, "name": "Услуги", "item": "https://www.remontnapokrivivarna.bg/bg/services" },
      { "@type": "ListItem", "position": 3, "name": "Соларни Системи", "item": "https://www.remontnapokrivivarna.bg/bg/solarni-sistemi" },
    ]
  };

  const offerings = [
    { icon: Lightbulb, title: "Проектиране", desc: "Индивидуален проект, съобразен с вашия покрив, потребление и бюджет. Анализираме ориентацията, наклона и засенчването." },
    { icon: Sun, title: "Доставка", desc: "Работим с водещи европейски производители – Tier 1 панели, сертифицирани инвертори и надеждни батерии." },
    { icon: Wrench, title: "Монтаж", desc: "Професионален монтаж от сертифицирани техници. Проверяваме и подготвяме покрива преди инсталацията." },
    { icon: Zap, title: "Пускане", desc: "Свързване към мрежата, регистрация в ЕРП, настройка на мониторинг и обучение за работа със системата." },
  ];

  const solutions = [
    { icon: Home, title: "За Къщи", desc: "5–12 kW системи за еднофамилни къщи. До 80% по-ниски сметки за ток.", link: getPath('solarHouse'), price: "от 5 500 €" },
    { icon: Building, title: "За Блокове", desc: "30–100 kW системи за етажна собственост. Намалете разходите за общи части и асансьори.", link: getPath('solarBuildings'), price: "от 25 000 €" },
    { icon: TrendingUp, title: "За Централи", desc: "100 kW – 1 MW+ инвестиционни проекти. ROI 15-20% годишно.", link: getPath('solarFarms'), price: "от 80 000 €" },
  ];

  const advantages = [
    { icon: DollarSign, title: "По-ниски Сметки", desc: "Намалете сметката за ток с до 80%. Произвеждайте собствена електроенергия и спестете хиляди левове годишно." },
    { icon: Shield, title: "Енергийна Независимост", desc: "Спрете да зависите от поскъпванията на тока. С батерия имате ток дори при спиране на захранването." },
    { icon: TrendingUp, title: "Умна Инвестиция", desc: "Средна възвръщаемост 15-20% годишно. Системата се изплаща за 4-7 години и работи 25+ години." },
    { icon: Leaf, title: "Екологично Чиста Енергия", desc: "Намалете въглеродния си отпечатък. Всеки kW инсталирана мощност спестява ~1.5 тона CO₂ годишно." },
    { icon: Home, title: "По-висока Стойност на Имота", desc: "Имотите със соларни системи се продават с 5-10% по-скъпо. Инвестиция, която увеличава стойността." },
    { icon: Clock, title: "Бърза Възвръщаемост", desc: "С нарастващите цени на тока, срокът за изплащане непрекъснато намалява. Днес е най-добрият момент." },
  ];

  const faqs = [
    { q: "Какво е соларна (фотоволтаична) система?", a: "Соларната система, известна също като фотоволтаична система (ФВС), е технология за производство на електричество от слънчева светлина. Двете понятия – „соларна система" и „фотоволтаична система" – означават абсолютно едно и също. Системата се състои от соларни панели (фотоволтаични модули), инвертор, кабели и монтажна конструкция. Панелите преобразуват слънчевата светлина директно в електрически ток, който инверторът превръща в стандартно 220V захранване за вашия дом или бизнес." },
    { q: "Колко струва соларна система за къща?", a: "Цената зависи от мощността на системата. За стандартна еднофамилна къща с месечно потребление 200-400 лв: система от 5 kW струва около 5 500–7 000 €, 8 kW система (най-популярна) – 8 000–11 000 €, а 12 kW система с батерия – 14 000–18 000 €. Цените включват панели, инвертор, монтажна конструкция, кабели, монтаж, свързване и регистрация." },
    { q: "За колко години се изплаща фотоволтаична система?", a: "При средна месечна сметка от 200 лв и 8 kW система, срокът за изплащане е приблизително 5-6 години. При по-високо потребление – 3-4 години. След изплащането системата генерира чиста печалба в продължение на 20+ години. С нарастващите цени на тока, реалната възвръщаемост е дори по-бърза." },
    { q: "Защо е важно покривът да е в добро състояние преди монтаж?", a: "Соларните панели се монтират за 25-30 години. Ако покривът има скрити проблеми (течове, износени керемиди, слаба конструкция), ще се наложи да демонтирате панелите за ремонт – което е скъпо и рисково. Затова нашата услуга е уникална: като специалисти по покриви, първо проверяваме и при нужда ремонтираме покрива, а след това монтираме соларната система. Така гарантираме съвместимост, дълъг живот и нулев риск от течове." },
    { q: "Колко електричество произвежда соларна система в България?", a: "В Южна България (включително Варна) 1 kW инсталирана мощност произвежда средно 1 200–1 400 kWh годишно. Това означава, че 8 kW система произвежда около 10 000–11 000 kWh на година – достатъчно за средно домакинство с потребление 300-400 лв/месец." },
    { q: "Трябва ли ми батерия (хибридна система)?", a: "Не е задължително, но е препоръчително. Без батерия: произведената и неизразходвана енергия се продава на мрежата на ниска цена. С батерия: съхранявате излишъка за вечерта/нощта, имате резервно захранване при спиране на тока и максимизирате самопотреблението. Хибридните системи са по-скъпи с 3 000–5 000 €, но осигуряват пълна енергийна независимост." },
    { q: "Каква гаранция давате за соларни системи?", a: "Предоставяме тройна гаранция: 25 години производствена гаранция на соларните панели, 10 години гаранция на инвертора и 15 години писмена гаранция на монтажа и покривната конструкция. Допълнително, панелите запазват минимум 80% от мощността си дори след 25 години работа." },
    { q: "Какъв е процесът от запитване до работеща система?", a: "Процесът включва 6 стъпки: 1) Изпращате запитване или се обаждате; 2) Правим безплатна консултация и оглед на покрива; 3) Изготвяме индивидуална оферта с точна цена; 4) Доставяме оборудването; 5) Монтираме системата (2-3 дни за къща); 6) Свързваме към мрежата, регистрираме в ЕРП и пускаме в експлоатация. Целият процес отнема 2-4 седмици." },
  ];

  return (
    <>
      <Helmet>
        <title>Соларни Системи Варна – Фотоволтаични Системи за Дома | от 5 500 € | 25г Гаранция</title>
        <meta name="description" content="Проектиране, доставка и монтаж на соларни (фотоволтаични) системи за къщи, блокове и инвестиции във Варна. Покрив + солар от една фирма. Безплатен оглед. Изчислете спестяването." />
        <meta property="og:title" content="Соларни Системи Варна – Фотоволтаични Системи | от 5 500 €" />
        <meta property="og:description" content="Проектиране и монтаж на соларни системи от покривни специалисти. Покрив + солар = всичко от една фирма. 25г гаранция на панелите." />
        <meta property="og:url" content="https://www.remontnapokrivivarna.bg/bg/solarni-sistemi" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://www.remontnapokrivivarna.bg/bg/solarni-sistemi" />
        <meta name="robots" content="index, follow" />
        <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <Header />

      {/* Breadcrumb */}
      <div className="bg-secondary border-b border-border">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center text-sm text-muted-foreground">
            <Link to={getPath('home')} className="hover:text-primary transition-colors">Начало</Link>
            <span className="mx-2">/</span>
            <Link to={getPath('services')} className="hover:text-primary transition-colors">Услуги</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground font-medium">Соларни Системи</span>
          </nav>
        </div>
      </div>

      {/* HERO */}
      <section className="relative py-16 md:py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl">
            <div className="flex flex-wrap gap-3 mb-6">
              <span className="inline-flex items-center gap-1.5 bg-amber-500/20 text-amber-300 px-3 py-1.5 rounded-full text-sm font-medium border border-amber-500/30">
                <Sun className="w-4 h-4" /> Соларни & Фотоволтаични Системи
              </span>
              <span className="inline-flex items-center gap-1.5 bg-green-500/20 text-green-300 px-3 py-1.5 rounded-full text-sm font-medium border border-green-500/30">
                <Shield className="w-4 h-4" /> 25 години гаранция на панелите
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Соларни Системи за Къщи, Сгради и Инвестиции
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-4 max-w-3xl">
              Проектиране, доставка и монтаж на фотоволтаични системи във Варна и региона. Намалете сметките с до 80% и произвеждайте собствена електроенергия.
            </p>
            <p className="text-base text-white/60 mb-8 max-w-3xl">
              Соларна система и фотоволтаична система означават едно и също — система за производство на електричество от слънцето. Ние използваме и двете понятия, за да бъдем максимално ясни.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-amber-500 hover:bg-amber-600 text-black font-bold text-lg px-8 py-6">
                <a href="#solar-calculator">
                  <Sun className="w-5 h-5 mr-2" /> Изчисли Цена
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 text-lg px-8 py-6">
                <a href="tel:0884997659">
                  <Phone className="w-5 h-5 mr-2" /> 088 499 7659
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <TrustIndicators />

      {/* Какво предлагаме */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Какво Предлагаме</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Пълен цикъл от услуги — от първоначалното проектиране до работеща фотоволтаична система
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {offerings.map((item, i) => (
              <Card key={i} className="border-border/50 hover:border-primary/30 transition-all hover:shadow-lg">
                <CardContent className="pt-6">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <item.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* КЛЮЧОВ DIFFERENTIATOR: Покрив + Солар */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 border-y border-amber-200/30">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-amber-500/10 text-amber-700 dark:text-amber-400 px-4 py-2 rounded-full text-sm font-bold mb-4 border border-amber-500/20">
                ⭐ Уникално Предимство
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                Покрив + Соларна Система = Всичко от Една Фирма
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Защо това е най-важното решение, което ще вземете за вашия дом?
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-foreground">Ние сме специалисти по покриви</h3>
                <p className="text-muted-foreground leading-relaxed">
                  С над 15 години опит в ремонта и изграждането на покриви, ние знаем всяка деталия на покривната конструкция. Когато монтираме соларна система, първо се уверяваме, че покривът е в перфектно състояние.
                </p>
                <div className="space-y-3">
                  {[
                    "Ремонтираме или изграждаме покрива преди монтажа",
                    "Гарантираме съвместимост между покрив и панели",
                    "Нулев риск от течове или грешен монтаж",
                    "Една фирма = една гаранция = нула главоболия",
                    "Спестявате пари и време с комбинирана услуга",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-foreground font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-foreground">Какво означава това за вас?</h3>
                <Card className="border-red-200 bg-red-50/50 dark:bg-red-950/20">
                  <CardContent className="pt-6">
                    <h4 className="font-bold text-red-700 dark:text-red-400 mb-2">❌ Рискът при други фирми:</h4>
                    <p className="text-muted-foreground text-sm">
                      Монтажът на панели върху стар или повреден покрив води до течове, корозия на конструкцията и скъп демонтаж след 2-3 години. Средната цена за демонтаж + ремонт + повторен монтаж е над 5 000 €.
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-green-200 bg-green-50/50 dark:bg-green-950/20">
                  <CardContent className="pt-6">
                    <h4 className="font-bold text-green-700 dark:text-green-400 mb-2">✅ Нашият подход:</h4>
                    <p className="text-muted-foreground text-sm">
                      Проверяваме покрива → ремонтираме при нужда → монтираме панелите → давяме единна 15-годишна гаранция на всичко. Вие получавате покрив + соларна система, които работят перфектно заедно за 25+ години.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Типа решения */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Изберете Вашето Решение</h2>
            <p className="text-lg text-muted-foreground">Предлагаме соларни системи за всеки тип имот и бюджет</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {solutions.map((sol, i) => (
              <Card key={i} className="border-border/50 hover:border-primary/50 transition-all hover:shadow-xl group">
                <CardContent className="pt-8 pb-6 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                    <sol.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-3">{sol.title}</h3>
                  <p className="text-muted-foreground mb-4">{sol.desc}</p>
                  <p className="text-2xl font-bold text-green-600 mb-6">{sol.price}</p>
                  <Button asChild className="w-full">
                    <Link to={sol.link}>
                      Научи Повече <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Как работи системата */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Как Работи Соларната Система</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Простичко обяснение на технологията, която намалява сметките ви с до 80%
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { icon: Sun, step: "1", title: "Слънчева светлина", desc: "Соларните панели улавят слънчевата светлина и я преобразуват в постоянен ток (DC)." },
                { icon: Zap, step: "2", title: "Инвертор", desc: "Инверторът преобразува постоянния ток в променлив (AC) – стандартното захранване за дома." },
                { icon: Home, step: "3", title: "Вашият Дом", desc: "Електричеството захранва уредите ви. Излишъкът се съхранява в батерия или продава на мрежата." },
                { icon: Battery, step: "4", title: "Батерия / Мрежа", desc: "С батерия: ток и през нощта. Без батерия: излишъкът се компенсира от сметката ви." },
              ].map((item, i) => (
                <div key={i} className="text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 relative">
                    <item.icon className="w-8 h-8 text-primary" />
                    <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center">{item.step}</span>
                  </div>
                  <h3 className="font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Предимства */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">6 Причини да Инвестирате в Соларна Система</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Фотоволтаичните системи са най-бързо растящата енергийна технология в света. Ето защо.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {advantages.map((adv, i) => (
              <Card key={i} className="border-border/50 hover:border-primary/30 transition-all">
                <CardContent className="pt-6">
                  <adv.icon className="w-10 h-10 text-primary mb-4" />
                  <h3 className="text-xl font-bold text-foreground mb-2">{adv.title}</h3>
                  <p className="text-muted-foreground">{adv.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <HowWeWork />
      <CompletedProjects />
      <Testimonials />

      {/* FAQ */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Често Задавани Въпроси за Соларни Системи</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Всичко, което трябва да знаете за фотоволтаичните системи
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="bg-card border border-border rounded-lg px-6">
                  <AccordionTrigger className="text-left font-semibold text-foreground py-4">{faq.q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-4 leading-relaxed">{faq.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <Sun className="w-16 h-16 text-amber-400 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Готови ли сте да спестявате от днес?</h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            Заявете безплатен оглед и получете индивидуална оферта за соларна система, съобразена с вашия покрив и потребление.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-amber-500 hover:bg-amber-600 text-black font-bold text-lg px-8 py-6">
              <Link to={getPath('inspection')}>
                Безплатен Оглед <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 text-lg px-8 py-6">
              <a href="tel:0884997659">
                <Phone className="w-5 h-5 mr-2" /> 088 499 7659
              </a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingCallButton />
    </>
  );
};

export default SolarSystemsPage;
