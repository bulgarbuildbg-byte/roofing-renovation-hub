import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCallButton from "@/components/FloatingCallButton";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Calendar, Clock, ArrowLeft, Phone, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import RelatedServices from "@/components/RelatedServices";
import RelatedArticles from "@/components/RelatedArticles";

import roofFrameImg from "@/assets/process/roof-frame-construction-new.jpg";
import scaffoldingImg from "@/assets/process/roof-scaffolding-setup.jpg";
import oldTilesRemovalImg from "@/assets/process/old-tiles-removal.jpg";
import membraneImg from "@/assets/process/membrane-battens-install.jpg";
import tileLaying from "@/assets/process/tile-laying-new.jpg";
import warrantyImg from "@/assets/process/warranty-handover.jpg";
import tileSamplesImg from "@/assets/process/tile-samples.jpg";
import inspectionReportImg from "@/assets/process/inspection-report-doc.jpg";

const RoofRenovationStepByStep = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "Как се прави пълна реконструкция на покрив стъпка по стъпка",
    "description": "Пълно ръководство за процеса на реконструкция на покрив от оглед до гаранция, включително материали, стъпки и времеви рамки.",
    "image": roofFrameImg,
    "totalTime": "PT10D",
    "step": [
      { "@type": "HowToStep", "position": 1, "name": "Безплатен оглед и оценка", "text": "Специалист посещава обекта, оценява стария покрив и изготвя детайлна оферта." },
      { "@type": "HowToStep", "position": 2, "name": "Монтаж на скеле", "text": "Поставяне на работно скеле за безопасен достъп до всички части на покрива." },
      { "@type": "HowToStep", "position": 3, "name": "Демонтаж на стария покрив", "text": "Внимателно премахване на стари керемиди, мембрани и увредени материали." },
      { "@type": "HowToStep", "position": 4, "name": "Ремонт на дървената конструкция", "text": "Проверка и ремонт на покривната конструкция — замяна на гнили греди и летви." },
      { "@type": "HowToStep", "position": 5, "name": "Монтаж на хидро- и топлоизолация", "text": "Полагане на диффузионна мембрана Dörken Delta и топлоизолационни пластове." },
      { "@type": "HowToStep", "position": 6, "name": "Монтаж на ново покривно покритие", "text": "Полагане на нови керемиди или друго покривно покритие с прецизен монтаж." },
      { "@type": "HowToStep", "position": 7, "name": "Детайли и завършване", "text": "Монтаж на улеи, снегозадържатели, комини и всички детайли." },
      { "@type": "HowToStep", "position": 8, "name": "Финална инспекция и гаранция", "text": "Прецизна проверка на целия покрив и издаване на писмена гаранция." },
    ],
  };

  const steps = [
    {
      num: 1,
      title: "Безплатен оглед и детайлна оценка",
      body: "Всеки проект започва с безплатен оглед на покрива. Нашият специалист посещава обекта, проверява стария покрив, измерва площта и оценява степента на увреждане. Изготвя се детайлна оферта с точни материали, срокове и цени — без скрити такси.",
      img: inspectionReportImg,
      imgAlt: "Инспекционен доклад за покрив",
    },
    {
      num: 2,
      title: "Подготовка и монтаж на работно скеле",
      body: "Преди да се пристъпи към работа, се монтира сертифицирано работно скеле, осигуряващо безопасен достъп до всяка точка на покрива. Скелето защитава и фасадата на сградата от повреди по време на работа.",
      img: scaffoldingImg,
      imgAlt: "Работно скеле около покрив",
    },
    {
      num: 3,
      title: "Демонтаж на стария покрив",
      body: "Старите керемиди, мембрани и увредени материали се демонтират внимателно и се извозват. В процеса се прави детайлна проверка на дървената покривна конструкция — гредите, летвите и обшивките.",
      img: oldTilesRemovalImg,
      imgAlt: "Демонтаж на стари керемиди",
    },
    {
      num: 4,
      title: "Ремонт и укрепване на покривната конструкция",
      body: "Увредените или гнили греди и летви се заменят с нови дървесни материали. Ако е необходимо, се укрепва цялата конструкция. Само върху здрава основа може да се гарантира дълготрайност на новия покрив.",
      img: roofFrameImg,
      imgAlt: "Конструкция на нова покривна рамка",
    },
    {
      num: 5,
      title: "Полагане на хидро- и топлоизолационни слоеве",
      body: `Монтира се диффузионна мембрана — ние използваме Dörken Delta, немски лидер в производството на паропропускливи мембрани. Тя позволява на влагата да излиза от конструкцията, докато предотвратява проникването на дъждовна вода. Над мембраната се монтира топлоизолация.`,
      img: membraneImg,
      imgAlt: "Монтаж на хидроизолационна мембрана и летви",
    },
    {
      num: 6,
      title: "Избор и монтаж на ново покривно покритие",
      body: "Клиентът избира от широк каталог от сертифицирани немски и европейски материали. Предлагаме керамични и бетонни керемиди от Bramac, Tondach и Creaton, метални покрития и битумни шинели. Монтажът се извършва от обучени специалисти строго по технологичните изисквания на производителя.",
      img: tileLaying,
      imgAlt: "Полагане на нови керемиди",
    },
    {
      num: 7,
      title: "Детайли: улуци, комини, снегозадържатели",
      body: "Покривните детайли са критични за дълготрайността. Монтират се нови улеи и водостоци, уплътнения около комини и слухове, снегозадържатели и вентилационни елементи. Тези детайли са отговорни за голяма част от течовете при некачествен монтаж.",
      img: tileSamplesImg,
      imgAlt: "Покривни материали и детайли",
    },
    {
      num: 8,
      title: "Финална инспекция и писмена гаранция",
      body: "След завършването се прави прецизна финална инспекция на целия покрив. Почиства се строителната площадка и се извозват всички отпадъци. Клиентът получава писмена гаранция — до 10 години за материалите и монтажа.",
      img: warrantyImg,
      imgAlt: "Предаване на гаранционен документ",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Пълна реконструкция на покрив стъпка по стъпка | Процес и материали | Варна</title>
        <meta name="description" content="Как се прави пълна реконструкция на покрив? Разгледайте 8-те стъпки от огледа до гаранцията. Немски материали, сертифицирани специалисти, Варна." />
        <meta name="keywords" content="реконструкция на покрив, смяна на покрив процес, нов покрив стъпки, немски керемиди Варна, покривна реновация" />
        <link rel="canonical" href="https://www.remontnapokrivivarna.bg/блог/пълна-реконструкция-на-покрива" />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      <Header />
      <main>
        <div className="relative bg-primary py-16 md:py-24 overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <img src={roofFrameImg} alt="Реконструкция на покрив" className="w-full h-full object-cover" />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <Link to="/bg/блог" className="inline-flex items-center gap-2 text-primary-foreground/70 hover:text-primary-foreground mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Обратно към блога
            </Link>
            <div className="flex gap-2 mb-4">
              <span className="bg-accent text-accent-foreground text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">Ремонт</span>
              <span className="bg-primary-foreground/20 text-primary-foreground text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">Ръководство</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4 max-w-3xl">
              Как се прави пълна реконструкция на покрив — 8 стъпки от оглед до гаранция
            </h1>
            <div className="flex flex-wrap gap-4 text-primary-foreground/70 text-sm">
              <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" />10 февруари 2025</span>
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" />10 мин. четене</span>
            </div>
          </div>
        </div>

        <article className="container mx-auto px-4 py-12 md:py-16 max-w-3xl">
          <p className="text-xl text-muted-foreground leading-relaxed mb-8">
            Пълната реконструкция на покрив е сериозен проект, но с правилния изпълнител тя е предвидима, организирана и завършва с дълготраен резултат. В тази статия ще разгледаме целия процес — от първия оглед до издаването на гаранцията.
          </p>

          {/* Timeline */}
          <div className="bg-muted/30 rounded-2xl p-6 border border-border mb-10">
            <h3 className="font-bold text-foreground mb-4">Приблизително времетраене на проект</h3>
            <div className="grid sm:grid-cols-3 gap-4 text-center text-sm">
              {[
                { label: "Малка семейна къща (до 100 кв.м)", time: "3–5 дни" },
                { label: "Средна жилищна сграда (100–300 кв.м)", time: "1–2 седмици" },
                { label: "Голяма сграда / блок (300+ кв.м)", time: "2–4 седмици" },
              ].map((item) => (
                <div key={item.label} className="bg-background rounded-xl p-3 border border-border">
                  <p className="text-muted-foreground text-xs mb-1">{item.label}</p>
                  <p className="font-bold text-foreground text-lg">{item.time}</p>
                </div>
              ))}
            </div>
          </div>

          {steps.map((step) => (
            <div key={step.num} className="mb-12">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-primary-foreground font-bold text-lg flex-shrink-0">
                  {step.num}
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-foreground">{step.title}</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-4 ml-16" dangerouslySetInnerHTML={{ __html: step.body }} />
              {step.img && (
                <img src={step.img} alt={step.imgAlt} className="w-full rounded-xl shadow-md" loading="lazy" />
              )}
            </div>
          ))}

          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 mt-4">Защо немските материали правят разликата?</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Германия е световен лидер в производството на покривни материали. Немските стандарти за качество DIN EN са сред най-строгите в света и гарантират устойчивост при екстремни климатични условия.
          </p>
          <div className="grid sm:grid-cols-2 gap-3 mb-8">
            {[
              "Устойчивост на замръзване до -40°C",
              "Сертификати за ветроустойчивост до 120 км/ч",
              "UV-стабилни цветове без избледняване",
              "Гарантиран живот 30–50 години",
              "Строги тестове за водонепропускливост",
              "Екологично производство с нисък CO₂ отпечатък",
            ].map((item) => (
              <div key={item} className="flex items-start gap-2 bg-muted/40 rounded-lg p-3 border border-border">
                <CheckCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                <span className="text-sm text-muted-foreground">{item}</span>
              </div>
            ))}
          </div>

          <div className="bg-primary rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-primary-foreground mb-3">Готови сте да обновите покрива?</h3>
            <p className="text-primary-foreground/80 mb-6">Свържете се с нас за безплатен оглед. Ще изготвим детайлна оферта с немски материали и ще обясним всяка стъпка.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold h-12">
                <a href="tel:0884997659" className="flex items-center gap-2"><Phone className="w-5 h-5" />088 499 7659</a>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-2 border-primary-foreground/50 text-primary-foreground hover:bg-primary-foreground/10 font-bold h-12">
                <Link to="/bg/изграждане-на-покрив">Нов покрив →</Link>
              </Button>
            </div>
          </div>
        </article>

        <div className="container mx-auto px-4 pb-16 max-w-3xl">
          <RelatedServices services={[
            { title: "Нов покрив", description: "Изграждане на нов покрив с немски материали", href: "/bg/изграждане-на-покрив" },
            { title: "Смяна на керемиди", description: "Частична или пълна подмяна на керемиди", href: "/bg/смяна-керемиди" },
            { title: "Хидроизолация", description: "Мембранна и битумна хидроизолация", href: "/bg/хидроизолация" },
          ]} />
          <RelatedArticles articles={[
            { title: "Кога трябва да смените покрива? 7 предупредителни знака", slug: "кога-да-смените-покрива", image: "", readTime: "8 мин." },
            { title: "Защо немските материали издържат по-дълго", slug: "немски-покривни-материали-качество", image: "", readTime: "9 мин." },
          ]} />
        </div>
      </main>
      <Footer />
      <FloatingCallButton />
    </div>
  );
};

export default RoofRenovationStepByStep;
