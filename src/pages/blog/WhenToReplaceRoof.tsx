import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCallButton from "@/components/FloatingCallButton";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Calendar, Clock, ArrowLeft, Phone, CheckCircle, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import RelatedServices from "@/components/RelatedServices";
import RelatedArticles from "@/components/RelatedArticles";

import roofRepairSignsImg from "@/assets/blog/roof-repair-signs.jpg";
import tileInspectionImg from "@/assets/process/tile-inspection-check.jpg";
import roofLeakDamageImg from "@/assets/process/roof-leak-damage.jpg";
import roofDetailInspectionImg from "@/assets/process/roof-detail-inspection.jpg";
import mossRemovalImg from "@/assets/process/moss-removal.jpg";

const WhenToReplaceRoof = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "Кога трябва да смените покрива? Предупредителни знаци, които всеки собственик трябва да знае",
    "description": "Научете кога е необходима подмяна на покрива. Разпознайте 7-те основни предупредителни признака, преди малкият проблем да стане скъп ремонт.",
    "image": roofRepairSignsImg,
    "datePublished": "2025-02-01",
    "dateModified": "2025-02-01",
    "author": { "@type": "Organization", "name": "RemontNaPokriviVarna" },
    "publisher": { "@type": "LocalBusiness", "name": "RemontNaPokriviVarna", "address": { "@type": "PostalAddress", "addressLocality": "Варна", "addressCountry": "BG" } },
    "mainEntityOfPage": "https://www.remontnapokrivivarna.bg/блог/кога-да-смените-покрива",
  };

  const breadcrumb = {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Начало", "item": "https://www.remontnapokrivivarna.bg" },
      { "@type": "ListItem", "position": 2, "name": "Блог", "item": "https://www.remontnapokrivivarna.bg/блог" },
      { "@type": "ListItem", "position": 3, "name": "Кога да смените покрива", "item": "https://www.remontnapokrivivarna.bg/блог/кога-да-смените-покрива" },
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Кога трябва да смените покрива? 7 Предупредителни знака | Варна</title>
        <meta name="description" content="Разпознайте 7-те основни предупредителни признака, че покривът ви се нуждае от подмяна. Научете кога ремонтът вече не е достатъчен и е нужна пълна реконструкция." />
        <meta name="keywords" content="подмяна на покрив, признаци повреден покрив, когда да сменим покрива, ремонт или смяна покрив, Варна" />
        <link rel="canonical" href="https://www.remontnapokrivivarna.bg/блог/кога-да-смените-покрива" />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumb)}</script>
      </Helmet>

      <Header />
      <main>
        {/* Hero */}
        <div className="relative bg-primary py-16 md:py-24 overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <img src={roofRepairSignsImg} alt="Повреден покрив" className="w-full h-full object-cover" />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <Link to="/bg/блог" className="inline-flex items-center gap-2 text-primary-foreground/70 hover:text-primary-foreground mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Обратно към блога
            </Link>
            <div className="flex gap-2 mb-4">
              <span className="bg-accent text-accent-foreground text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">Поддръжка</span>
              <span className="bg-primary-foreground/20 text-primary-foreground text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">Съвети</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4 max-w-3xl">
              Кога трябва да смените покрива? 7 Предупредителни знака, които всеки собственик трябва да знае
            </h1>
            <div className="flex flex-wrap gap-4 text-primary-foreground/70 text-sm">
              <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" />01 февруари 2025</span>
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" />8 мин. четене</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <article className="container mx-auto px-4 py-12 md:py-16 max-w-3xl">
          <p className="text-xl text-muted-foreground leading-relaxed mb-8">
            Покривът е един от най-важните елементи на вашия дом — той защитава всичко под него от дъжд, вятър, сняг и ултравиолетово лъчение. Но колко дълго издържа един покрив и как да разберете кога е дошло времето за подмяна?
          </p>

          <img src={roofRepairSignsImg} alt="Инспекция на покрив - признаци за повреда" className="w-full rounded-2xl mb-10 shadow-lg" loading="lazy" />

          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Колко дълго издържа един покрив?</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Средният живот на покрива зависи силно от материала и качеството на монтажа. Керамичните и бетонните керемиди от водещи немски марки като <strong>Bramac, Tondach и Creaton</strong> могат да издържат 40–60 години при правилна поддръжка. Битумните покрития трябват подмяна след 20–25 години, а металните покриви — след 30–50 години.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-8">
            В района на Варна климатът е сравнително мек, но силните летни бури, морският въздух с висока соленост и зимните студове ускоряват износването на покривните материали. Редовната инспекция е ключова за ранното установяване на проблеми.
          </p>

          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">7 Предупредителни знака, че покривът се нуждае от подмяна</h2>

          {[
            {
              num: 1,
              title: "Покривът е на повече от 25–30 години",
              body: "Дори добре поддържан покрив достига своя край. Ако покривът ви е стар и никога не е бил цялостно подменян, вероятно е време за пълна реконструкция. Старите материали губят своите хидроизолационни качества с времето.",
              img: tileInspectionImg,
              imgAlt: "Инспекция на стари керемиди",
              severity: "warning",
            },
            {
              num: 2,
              title: "Повредени, счупени или липсващи керемиди",
              body: "Малко счупени керемиди могат да бъдат подменени локално. Но ако проблемът е масов — на много места по покрива — това е признак за системна повреда или изтичане на живота на материала. Отделни повредени керемиди пропускат вода, която уврежда дървената конструкция.",
              img: roofDetailInspectionImg,
              imgAlt: "Повредени керемиди на покрив",
              severity: "critical",
            },
            {
              num: 3,
              title: "Постоянни течове след дъжд",
              body: "Еднократен теч може да бъде причинен от счупена керемида или повреден улей. Но ако забелязвате влага по тавана след всеки дъжд, особено на различни места, хидроизолацията вероятно е компрометирана на много места. Посетете нашата страница за <a href='/bg/ремонт-течове' class='text-primary underline'>ремонт на течове</a> за повече информация.",
              severity: "critical",
            },
            {
              num: 4,
              title: "Забелязваме слънчева светлина в тавана",
              body: "Ако от тавана можете да видите слънчева светлина, това означава, че има директни отвори в покривното покритие. Там, където влиза светлина, ще влиза и дъжд, сняг и студ.",
              severity: "critical",
            },
            {
              num: 5,
              title: "Провиснал или деформиран покрив",
              body: "Провисналите участъци от покрива са сериозен признак за структурни проблеми — може би гнила дървена конструкция, повредени греди или претоварване от натрупана вода. Това изисква незабавна намеса от специалист.",
              img: roofLeakDamageImg,
              imgAlt: "Щети от вода под покрива",
              severity: "critical",
            },
            {
              num: 6,
              title: "Мъх, мухъл и зелени отлагания",
              body: "Наличието на мъх или мухъл по керемидите означава постоянна влага. Мъхът задържа вода и ускорява разрушаването на материала. Може да се почисти, но ако е широко разпространен, покривът трябва да бъде прегледан за скрити увреждания.",
              img: mossRemovalImg,
              imgAlt: "Мъх и зелени отлагания по керемиди",
              severity: "warning",
            },
            {
              num: 7,
              title: "Покачени сметки за отопление/охлаждане",
              body: "Стар или повреден покрив губи топлинна изолация. Ако сметките за ток са се увеличили значително без очевидна причина, покривната изолация може да е компрометирана. Нов покрив с модерна термоизолация може да намали разходите за енергия с до 30%.",
              severity: "warning",
            },
          ].map((sign) => (
            <div key={sign.num} className="mb-8">
              <div className={`flex items-start gap-3 p-4 rounded-xl mb-3 ${sign.severity === "critical" ? "bg-destructive/5 border border-destructive/20" : "bg-accent/5 border border-accent/20"}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm ${sign.severity === "critical" ? "bg-destructive text-destructive-foreground" : "bg-accent text-accent-foreground"}`}>
                  {sign.num}
                </div>
                <div>
                  <h3 className="font-bold text-foreground text-lg mb-1">{sign.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm" dangerouslySetInnerHTML={{ __html: sign.body }} />
                </div>
              </div>
              {sign.img && (
                <img src={sign.img} alt={sign.imgAlt} className="w-full rounded-xl shadow-md" loading="lazy" />
              )}
            </div>
          ))}

          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 mt-10">Ремонт или пълна подмяна — как да решите?</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Ако проблемите са локализирани — само на 1–2 места — ремонтът е правилният избор. Но ако покривът е стар, материалите са широко компрометирани и ремонтите се повтарят всяка година, инвестицията в нов покрив е по-изгодна в дългосрочен план.
          </p>
          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            <div className="bg-muted/50 rounded-xl p-5 border border-border">
              <h4 className="font-bold text-foreground mb-3 flex items-center gap-2"><CheckCircle className="w-5 h-5 text-accent" />Препоръчваме ремонт ако:</h4>
              <ul className="space-y-1.5 text-sm text-muted-foreground">
                <li>• Покривът е под 15 години</li>
                <li>• Проблемите са локализирани (под 20% от площта)</li>
                <li>• Основната конструкция е здрава</li>
                <li>• Последният ремонт е бил ефективен</li>
              </ul>
            </div>
            <div className="bg-destructive/5 rounded-xl p-5 border border-destructive/20">
              <h4 className="font-bold text-foreground mb-3 flex items-center gap-2"><AlertTriangle className="w-5 h-5 text-destructive" />Препоръчваме подмяна ако:</h4>
              <ul className="space-y-1.5 text-sm text-muted-foreground">
                <li>• Покривът е над 25–30 години</li>
                <li>• Ремонтите са чести и повтарящи се</li>
                <li>• Дървената конструкция е компрометирана</li>
                <li>• Стойността на ремонта надвишава 50% от нов покрив</li>
              </ul>
            </div>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Защо да изберем немски материали за новия покрив?</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            При подмяна на покрива инвестицията в качествени немски материали се изплаща многократно. Марки като <strong>Bramac и Tondach</strong> предлагат 30–50 годишни гаранции на своите керемиди. Германските стандарти за производство (DIN EN) гарантират устойчивост на замръзване, UV радиация и атмосферно замърсяване.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-8">
            За <Link to="/bg/хидроизолация" className="text-primary underline">хидроизолационни системи</Link> препоръчваме марки Bauder, Sika и Vedag — световни лидери в защитата от влага с доказани резултати в хиляди проекти в цяла Европа.
          </p>

          {/* CTA */}
          <div className="bg-primary rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-primary-foreground mb-3">Не сте сигурни в състоянието на покрива?</h3>
            <p className="text-primary-foreground/80 mb-6">Обадете ни се за безплатен оглед. Нашите специалисти ще дадат честна оценка и препоръка.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold h-12">
                <a href="tel:0884997659" className="flex items-center gap-2"><Phone className="w-5 h-5" />088 499 7659</a>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-2 border-primary-foreground/50 text-primary-foreground hover:bg-primary-foreground/10 font-bold h-12">
                <Link to="/bg/ремонт-на-покриви">Ремонт на покриви →</Link>
              </Button>
            </div>
          </div>
        </article>

        <div className="container mx-auto px-4 pb-16 max-w-3xl">
        <RelatedServices services={[
            { title: "Ремонт на покриви", description: "Бърза диагностика и ремонт на всякакъв тип покриви", href: "/bg/ремонт-на-покриви" },
            { title: "Смяна на керемиди", description: "Частична или пълна подмяна на керемиди", href: "/bg/смяна-керемиди" },
            { title: "Нов покрив", description: "Пълна реконструкция с немски материали", href: "/bg/изграждане-на-покрив" },
          ]} />
          <RelatedArticles articles={[
            { title: "Как се прави пълна реконструкция на покрив", slug: "пълна-реконструкция-на-покрива", image: "", readTime: "10 мин." },
            { title: "Защо немските материали издържат по-дълго", slug: "немски-покривни-материали-качество", image: "", readTime: "9 мин." },
          ]} />
        </div>
      </main>
      <Footer />
      <FloatingCallButton />
    </div>
  );
};

export default WhenToReplaceRoof;
