import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCallButton from "@/components/FloatingCallButton";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Calendar, Clock, ArrowLeft, Phone, Star, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import RelatedServices from "@/components/RelatedServices";
import RelatedArticles from "@/components/RelatedArticles";

import bramacTileImg from "@/assets/process/clay-tiles-closeup-install.jpg";
import tileInstallImg from "@/assets/process/tile-installation-worker.jpg";
import metalRoofImg from "@/assets/process/metal-roof-closeup.jpg";
import waterproofingImg from "@/assets/process/waterproofing-membrane.jpg";
import completedRoofImg from "@/assets/process/completed-tile-roof.jpg";

const GermanMaterialsQuality = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "Защо немските покривни материали издържат по-дълго — Ръководство за качество",
    "description": "Сравнителен анализ на немски и стандартни покривни материали. Разберете защо Bramac, Tondach, Bauder и Sika предлагат по-дълъг живот и по-добра защита.",
    "image": bramacTileImg,
    "datePublished": "2025-02-20",
    "dateModified": "2025-02-20",
    "author": { "@type": "Organization", "name": "RemontNaPokriviVarna" },
    "publisher": { "@type": "LocalBusiness", "name": "RemontNaPokriviVarna", "address": { "@type": "PostalAddress", "addressLocality": "Варна", "addressCountry": "BG" } },
    "mainEntityOfPage": "https://www.remontnapokrivivarna.bg/блог/немски-покривни-материали-качество",
  };

  const comparisons = [
    {
      category: "Бетонни и керамични керемиди",
      german: { brand: "Bramac / Tondach / Creaton", pros: ["Гаранция 30–50 години", "Замръзване до -40°C (клас F)", "Устойчивост на ветер над 120 км/ч", "Сертификат EN 490/491", "Константен цвят 25+ години"], life: "40–60 г." },
      standard: { origin: "Местен производител / Китай", cons: ["Гаранция 5–10 години", "По-ниска устойчивост на замръзване", "Цветове избледняват след 5–8 г.", "По-нисък клас на водонепропускливост"], life: "15–25 г." },
      img: bramacTileImg,
    },
    {
      category: "Хидроизолационни мембрани",
      german: { brand: "Bauder / Vedag / Sika", pros: ["Клас А1 огнеустойчивост", "Сертификат ETA (европейски)", "Елонгация 400–600% без скъсване", "Одобрени за плоски покриви +15°C до -25°C", "Устойчивост на корени (растения)"], life: "25–30 г." },
      standard: { origin: "Неизвестен произход / нестандартни", cons: ["Без ETA сертификат", "По-ниска еластичност", "Деградира по-бързо при UV", "Без гаранция за коренова защита"], life: "8–12 г." },
      img: waterproofingImg,
    },
    {
      category: "Паропропускливи мембрани",
      german: { brand: "Dörken Delta", pros: ["Паропропускливост Sd < 0.02 m", "Водоустойчивост > 2000 mm воден стълб", "Монтаж дори в студено/влажно", "UV-стабилизирани влакна", "Немски патент и производство"], life: "Живот на покрива" },
      standard: { origin: "Общи диффузионни фолия", cons: ["По-ниска паропропускливост", "По-малка водоустойчивост", "По-бързо стареене при UV", "Риск от кондензация в конструкцията"], life: "10–20 г." },
      img: tileInstallImg,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Защо немските покривни материали издържат по-дълго? | Качествено сравнение | Варна</title>
        <meta name="description" content="Сравнение на немски покривни материали Bramac, Tondach, Bauder срещу стандартни материали. Научете защо немските стандарти правят покривите по-дълготрайни." />
        <meta name="keywords" content="немски покривни материали, Bramac качество, Bauder мембрани, Tondach керемиди, качество покривни материали Варна" />
        <link rel="canonical" href="https://www.remontnapokrivivarna.bg/блог/немски-покривни-материали-качество" />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      <Header />
      <main>
        <div className="relative bg-primary py-16 md:py-24 overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <img src={bramacTileImg} alt="Немски покривни материали" className="w-full h-full object-cover" />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <Link to="/bg/блог" className="inline-flex items-center gap-2 text-primary-foreground/70 hover:text-primary-foreground mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Обратно към блога
            </Link>
            <div className="flex gap-2 mb-4">
              <span className="bg-accent text-accent-foreground text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">Материали</span>
              <span className="bg-primary-foreground/20 text-primary-foreground text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">Сравнение</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4 max-w-3xl">
              Защо немските покривни материали издържат по-дълго — Ръководство за качество
            </h1>
            <div className="flex flex-wrap gap-4 text-primary-foreground/70 text-sm">
              <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" />20 февруари 2025</span>
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" />9 мин. четене</span>
            </div>
          </div>
        </div>

        <article className="container mx-auto px-4 py-12 md:py-16 max-w-3xl">
          <p className="text-xl text-muted-foreground leading-relaxed mb-8">
            „По-евтините материали" изглеждат привлекателна идея при планирането на покривен ремонт. Но когато покривът трябва да издържи 30–50 години, разликата между немски сертифицирани продукти и стандартните материали може да струва хиляди левове допълнителни ремонти.
          </p>

          <img src={completedRoofImg} alt="Завършен покрив с немски керемиди" className="w-full rounded-2xl mb-10 shadow-lg" loading="lazy" />

          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Германия — световен стандарт в покривното производство</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Германия е дом на някои от най-старите и иновативни покривни производители в света. Компании като <strong>Braas (основана 1953 г.)</strong>, <strong>Creaton (1884 г.)</strong> и <strong>Bauder (1879 г.)</strong> имат над 100 години опит в разработката на покривни решения, тествани в екстремни европейски климатични условия.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-8">
            Немските производствени стандарти DIN EN са сред най-строгите в света. Всеки продукт преминава независими тестове за: водонепропускливост, устойчивост на замръзване, ветроустойчивост, огнеустойчивост и UV-стабилност. Резултатите са публично достъпни.
          </p>

          {comparisons.map((comp) => (
            <div key={comp.category} className="mb-14">
              <h2 className="text-xl md:text-2xl font-bold text-foreground mb-5 flex items-center gap-3">
                <span className="w-2 h-8 bg-accent rounded-full flex-shrink-0" />
                {comp.category}
              </h2>
              <img src={comp.img} alt={comp.category} className="w-full rounded-xl shadow-md mb-6" loading="lazy" />
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-accent/5 border border-accent/30 rounded-2xl p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Star className="w-5 h-5 text-accent fill-accent" />
                    <span className="font-bold text-foreground text-sm">Немски премиум</span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3 font-medium">{comp.german.brand}</p>
                  <ul className="space-y-2">
                    {comp.german.pros.map((pro) => (
                      <li key={pro} className="flex items-start gap-2 text-sm text-foreground">
                        <CheckCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                        {pro}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 pt-3 border-t border-accent/20">
                    <span className="text-xs text-muted-foreground">Среден живот: </span>
                    <span className="font-bold text-accent">{comp.german.life}</span>
                  </div>
                </div>
                <div className="bg-muted/50 border border-border rounded-2xl p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <XCircle className="w-5 h-5 text-muted-foreground" />
                    <span className="font-bold text-foreground text-sm">Стандартен материал</span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3 font-medium">{comp.standard.origin}</p>
                  <ul className="space-y-2">
                    {comp.standard.cons.map((con) => (
                      <li key={con} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <XCircle className="w-4 h-4 text-destructive/60 mt-0.5 flex-shrink-0" />
                        {con}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 pt-3 border-t border-border">
                    <span className="text-xs text-muted-foreground">Среден живот: </span>
                    <span className="font-bold text-muted-foreground">{comp.standard.life}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Дългосрочна икономическа логика</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Немските керемиди може да струват 20–40% повече от стандартните. Но ако евтиният покрив трябва да бъде ремонтиран или подменен след 15 години, а немският издържа 50 години — крайната сметка е категорична. Плюс факта, че добрите материали се поддържат по-лесно и не изискват чести ремонти.
          </p>
          <div className="bg-muted/30 border border-border rounded-2xl p-6 mb-8">
            <h3 className="font-bold text-foreground mb-4 text-center">Пример: Покрив 150 кв.м за 50 години</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-center">
              <div className="bg-accent/5 border border-accent/30 rounded-xl p-4">
                <p className="text-sm font-semibold text-foreground mb-1">Немски материали (Bramac)</p>
                <p className="text-2xl font-bold text-accent mb-1">8 500 лв.</p>
                <p className="text-xs text-muted-foreground">Монтаж 1 път + поддръжка</p>
                <p className="text-xs font-semibold text-accent mt-2">Живот: 50+ години</p>
              </div>
              <div className="bg-muted/50 border border-border rounded-xl p-4">
                <p className="text-sm font-semibold text-foreground mb-1">Стандартни материали</p>
                <p className="text-2xl font-bold text-destructive/70 mb-1">14 000+ лв.</p>
                <p className="text-xs text-muted-foreground">Монтаж 2–3 пъти + чести ремонти</p>
                <p className="text-xs font-semibold text-destructive/70 mt-2">Живот: 15–20 години</p>
              </div>
            </div>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Кои немски марки препоръчваме и защо?</h2>
          <div className="space-y-4 mb-8">
            {[
              { name: "Bramac", category: "Бетонни керемиди", desc: "Австрийска марка, производство в Европа, гаранция до 50 год. Широк асортимент от цветове и профили. Отличен за покриви с наклон 15°–90°." },
              { name: "Tondach", category: "Керамични керемиди", desc: "Австрийски производител на натурална керамика. Екологичен продукт — напълно рециклируем. Естетически неподправен вид в продължение на десетилетия." },
              { name: "Bauder", category: "Хидроизолация (плоски покриви)", desc: "Немска семейна компания от 1879 г. Специализация в плоски покриви и зелени покривни системи. ETA сертифицирани продукти за цяла Европа." },
              { name: "Sika", category: "Строителна химия и хидроизолация", desc: "Швейцарска мултинационална компания, стандарт в строителната химия. Течни хидроизолации, лепила и уплътнители с доказани резултати." },
              { name: "Dörken Delta", category: "Диффузионни мембрани", desc: "Немски лидер в производство на паропропускливи мембрани. Иновативни продукти за защита на покривната конструкция от вода и кондензация." },
            ].map((brand) => (
              <div key={brand.name} className="flex gap-4 bg-background border border-border rounded-xl p-4">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Star className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-foreground">{brand.name}</span>
                    <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full">{brand.category}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{brand.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-primary rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-primary-foreground mb-3">Получете оферта с немски материали</h3>
            <p className="text-primary-foreground/80 mb-6">Ние работим само с сертифицирани европейски и немски материали. Свържете се с нас за безплатен оглед и детайлна оферта.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold h-12">
                <a href="tel:0884997659" className="flex items-center gap-2"><Phone className="w-5 h-5" />088 499 7659</a>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-2 border-primary-foreground/50 text-primary-foreground hover:bg-primary-foreground/10 font-bold h-12">
                <Link to="/bg/смяна-керемиди">Смяна на керемиди →</Link>
              </Button>
            </div>
          </div>
        </article>

        <div className="container mx-auto px-4 pb-16 max-w-3xl">
          <RelatedServices services={[
            { title: "Смяна на керемиди", description: "Немски и европейски керемиди с гаранция", href: "/bg/смяна-керемиди" },
            { title: "Хидроизолация", description: "Bauder и Sika хидроизолационни системи", href: "/bg/хидроизолация" },
            { title: "Нов покрив", description: "Пълна реконструкция с премиум материали", href: "/bg/изграждане-на-покрив" },
          ]} />
          <RelatedArticles articles={[
            { title: "Кога трябва да смените покрива? 7 предупредителни знака", slug: "кога-да-смените-покрива", image: "", readTime: "8 мин." },
            { title: "Как се прави пълна реконструкция на покрив", slug: "пълна-реконструкция-на-покрива", image: "", readTime: "10 мин." },
          ]} />
        </div>
      </main>
      <Footer />
      <FloatingCallButton />
    </div>
  );
};

export default GermanMaterialsQuality;
