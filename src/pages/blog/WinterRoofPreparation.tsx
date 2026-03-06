import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCallButton from "@/components/FloatingCallButton";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Calendar, Clock, ArrowLeft, Phone, Tag, Share2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// Import blog images
import winterPreparationImg from "@/assets/blog/winter-preparation.jpg";
import roofInspectionImg from "@/assets/process/roof-inspection.jpg";
import gutterCleaningImg from "@/assets/process/gutter-cleaning.jpg";
import snowGuardsImg from "@/assets/process/snow-guards.jpg";

const WinterRoofPreparation = () => {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "Как да подготвим покрива за зимата: Пълно ръководство",
    "description": "Научете как да подготвите покрива си за студените месеци с нашите експертни съвети. От инспекция до превантивни мерки.",
    "image": winterPreparationImg,
    "datePublished": "2024-12-01",
    "dateModified": "2024-12-01",
    "author": {
      "@type": "Organization",
      "name": "RemontNaPokriviVarna"
    },
    "publisher": {
      "@type": "LocalBusiness",
      "name": "RemontNaPokriviVarna",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Варна",
        "addressCountry": "BG"
      }
    },
    "mainEntityOfPage": "https://www.remontnapokrivivarna.bg/блог/как-да-подготвим-покрива-за-зимата"
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Начало", "item": "https://www.remontnapokrivivarna.bg" },
      { "@type": "ListItem", "position": 2, "name": "Блог", "item": "https://www.remontnapokrivivarna.bg/блог" },
      { "@type": "ListItem", "position": 3, "name": "Подготовка на покрива за зимата", "item": "https://www.remontnapokrivivarna.bg/блог/как-да-подготвим-покрива-за-зимата" }
    ]
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Как да подготвим покрива за зимата | Пълно ръководство | Варна</title>
        <meta name="description" content="Научете как да подготвите покрива си за студените месеци. Експертни съвети за инспекция, почистване на улуци, проверка за течове и превантивни мерки." />
        <meta name="keywords" content="подготовка покрив зима, зимна поддръжка покрив, почистване улуци, предотвратяване течове, Варна" />
        <meta property="og:title" content="Как да подготвим покрива за зимата: Пълно ръководство | Варна" />
        <meta property="og:description" content="Научете как да подготвите покрива си за студените месеци с нашите експертни съвети. От инспекция до превантивни мерки." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://www.remontnapokrivivarna.bg/bg/блог/как-да-подготвим-покрива-за-зимата" />
        <meta property="og:image" content="https://www.remontnapokrivivarna.bg/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="bg_BG" />
        <meta property="og:site_name" content="Ремонт на Покриви Варна" />
        <meta property="article:published_time" content="2024-12-01" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Как да подготвим покрива за зимата: Пълно ръководство" />
        <meta name="twitter:description" content="Научете как да подготвите покрива си за студените месеци с нашите експертни съвети." />
        <meta name="twitter:image" content="https://www.remontnapokrivivarna.bg/og-image.jpg" />
        <link rel="canonical" href="https://www.remontnapokrivivarna.bg/bg/блог/как-да-подготвим-покрива-за-зимата" />
        <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative h-[50vh] min-h-[400px]">
          <img 
            src={winterPreparationImg}
            alt="Покрив покрит със сняг - подготовка за зимата"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="container mx-auto">
              <nav className="text-sm text-muted-foreground mb-4">
                <Link to="/" className="hover:text-primary">Начало</Link>
                <span className="mx-2">/</span>
                <Link to="/блог" className="hover:text-primary">Блог</Link>
                <span className="mx-2">/</span>
                <span className="text-foreground">Подготовка за зимата</span>
              </nav>
              <Badge className="mb-4">Сезонна поддръжка</Badge>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                Как да подготвим покрива за зимата: Пълно ръководство
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  1 декември 2024
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  8 мин четене
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <article className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              
              <div className="prose prose-lg max-w-none">
                <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                  Зимата в България, особено във Варна и Черноморския регион, може да бъде непредсказуема. 
                  От силни ветрове и проливни дъждове до снегонавявания - вашият покрив е първата линия на защита срещу стихиите. 
                  Правилната подготовка преди настъпването на студените месеци може да ви спести хиляди левове в ремонти и да осигури 
                  спокойствие през цялата зима.
                </p>

                <h2 className="text-2xl font-bold text-foreground mt-12 mb-6">
                  Защо зимната подготовка на покрива е толкова важна?
                </h2>
                <p className="text-foreground/80 mb-6">
                  Много собственици на имоти подценяват въздействието на зимата върху покривите. Циклите на замръзване и размразяване 
                  създават уникални предизвикателства: водата прониква в малки пукнатини, замръзва, разширява се и причинява още по-големи щети. 
                  Натрупаният сняг добавя допълнително тегло, а ледените висулки могат да повредят улуците и ръбовете на покрива.
                </p>

                <div className="bg-secondary/30 rounded-xl p-6 my-8">
                  <h3 className="text-xl font-bold text-foreground mb-4">Статистика за зимните щети по покривите:</h3>
                  <ul className="space-y-2 text-foreground/80">
                    <li>• 40% от всички течове се откриват след първите зимни бури</li>
                    <li>• Средната цена на спешен зимен ремонт е 2-3 пъти по-висока от превантивната поддръжка</li>
                    <li>• 70% от щетите можеха да бъдат предотвратени с правилна есенна подготовка</li>
                  </ul>
                </div>

                <h2 className="text-2xl font-bold text-foreground mt-12 mb-6">
                  Стъпка 1: Визуална инспекция на покрива
                </h2>
                <img 
                  src={roofInspectionImg}
                  alt="Инспекция на покрив преди зимата - проверка за повреди"
                  className="w-full rounded-xl mb-6"
                />
                <p className="text-foreground/80 mb-4">
                  Преди да започнете каквито и да е ремонтни дейности, е важно да направите пълна визуална инспекция. 
                  Ако се чувствате удобно да се качите на покрива (и разполагате с необходимото оборудване за безопасност), 
                  проверете следното:
                </p>
                <ul className="space-y-3 text-foreground/80 mb-6">
                  <li><strong>Керемиди и плочки:</strong> Търсете липсващи, пукнати или хлътнали елементи. Проверете ръбовете и билото за разместени керемиди.</li>
                  <li><strong>Обшивки и уплътнения:</strong> Проверете металните обшивки около комини, вентилации и прозорци за корозия или разместване.</li>
                  <li><strong>Хидроизолация:</strong> При плоски покриви проверете за балони, пукнатини или отлепена мембрана.</li>
                  <li><strong>Улуци и водосточни тръби:</strong> Търсете натрупани листа, пукнатини или провисване.</li>
                </ul>

                <div className="bg-accent/10 border-l-4 border-accent p-6 my-8">
                  <p className="text-foreground font-medium">
                    💡 <strong>Съвет от експерта:</strong> Ако не сте сигурни или покривът е стръмен, 
                    винаги е по-добре да се обадите на професионалист. Безплатният оглед струва много по-малко от 
                    медицинска сметка или пропуснат проблем.
                  </p>
                </div>

                <h2 className="text-2xl font-bold text-foreground mt-12 mb-6">
                  Стъпка 2: Почистване на улуците и водосточните тръби
                </h2>
                <img 
                  src={gutterCleaningImg}
                  alt="Почистване на улуци от листа - есенна поддръжка"
                  className="w-full rounded-xl mb-6"
                />
                <p className="text-foreground/80 mb-4">
                  Запушените улуци са една от най-честите причини за зимни щети по покривите. Когато водата не може да се оттича правилно:
                </p>
                <ul className="space-y-2 text-foreground/80 mb-6">
                  <li>• Тя се задържа и замръзва, създавайки ледени язове</li>
                  <li>• Ледът се натрупва под керемидите и ги повдига</li>
                  <li>• Водата прониква в подпокривното пространство</li>
                  <li>• Улуците могат да се огънат или откъснат от теглото на леда</li>
                </ul>

                <h3 className="text-xl font-bold text-foreground mt-8 mb-4">Как да почистите улуците правилно:</h3>
                <ol className="space-y-3 text-foreground/80 mb-6 list-decimal list-inside">
                  <li>Използвайте здрава стълба и я поставете на стабилна основа</li>
                  <li>Носете ръкавици за защита от остри предмети и мръсотия</li>
                  <li>Започнете от водосточната тръба и работете към обратната посока</li>
                  <li>Отстранете ръчно големите отпадъци (листа, клони)</li>
                  <li>Използвайте маркуч за промиване на останалата мръсотия</li>
                  <li>Проверете дали водата се оттича свободно през водосточните тръби</li>
                </ol>

                <h2 className="text-2xl font-bold text-foreground mt-12 mb-6">
                  Стъпка 3: Проверка и ремонт на уплътненията
                </h2>
                <p className="text-foreground/80 mb-4">
                  Уплътненията около комини, вентилационни тръби и покривни прозорци са критични точки. 
                  След години на излагане на слънце и температурни промени, силиконът и другите уплътнители се втвърдяват и напукват.
                </p>

                <div className="grid md:grid-cols-2 gap-6 my-8">
                  <Card>
                    <CardContent className="p-6">
                      <h4 className="font-bold text-foreground mb-3">Признаци за износени уплътнения:</h4>
                      <ul className="space-y-2 text-sm text-foreground/80">
                        <li>• Видими пукнатини в силикона</li>
                        <li>• Отлепени ръбове</li>
                        <li>• Промяна в цвета (потъмняване)</li>
                        <li>• Липсващи участъци</li>
                      </ul>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <h4 className="font-bold text-foreground mb-3">Необходими материали:</h4>
                      <ul className="space-y-2 text-sm text-foreground/80">
                        <li>• Силикон за покриви (устойчив на UV)</li>
                        <li>• Обезмаслител</li>
                        <li>• Шпакла за отстраняване на стар силикон</li>
                        <li>• Пистолет за силикон</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                <h2 className="text-2xl font-bold text-foreground mt-12 mb-6">
                  Стъпка 4: Инспекция на таванското пространство
                </h2>
                <p className="text-foreground/80 mb-4">
                  Много проблеми с покрива могат да бъдат открити отвътре, преди да станат видими отвън. 
                  Качете се на тавана с фенерче и проверете:
                </p>
                <ul className="space-y-3 text-foreground/80 mb-6">
                  <li><strong>Петна от влага:</strong> Тъмни петна по дървените греди или изолацията показват течове.</li>
                  <li><strong>Светлина:</strong> Ако виждате слънчева светлина през покрива, това означава пролуки.</li>
                  <li><strong>Мухъл:</strong> Зелени или черни петна показват продължителна влага.</li>
                  <li><strong>Изолация:</strong> Проверете дали изолацията е суха и добре разпределена.</li>
                </ul>

                <h2 className="text-2xl font-bold text-foreground mt-12 mb-6">
                  Стъпка 5: Подрязване на надвиснали клони
                </h2>
                <img 
                  src={snowGuardsImg}
                  alt="Подрязване на дървета близо до покрив - превантивна поддръжка"
                  className="w-full rounded-xl mb-6"
                />
                <p className="text-foreground/80 mb-4">
                  Клоните, които докосват или са близо до покрива, представляват сериозен риск през зимата:
                </p>
                <ul className="space-y-2 text-foreground/80 mb-6">
                  <li>• При натоварване със сняг могат да се счупят и да паднат върху покрива</li>
                  <li>• Листата запушват улуците</li>
                  <li>• Те търкат покритието и повреждат керемидите</li>
                  <li>• Предоставят достъп на гризачи до тавана</li>
                </ul>

                <h2 className="text-2xl font-bold text-foreground mt-12 mb-6">
                  Стъпка 6: Проверка на вентилацията
                </h2>
                <p className="text-foreground/80 mb-4">
                  Правилната вентилация на покрива е критична през зимата. Тя предотвратява образуването на ледени язове и 
                  кондензация в таванското пространство. Проверете:
                </p>
                <ul className="space-y-2 text-foreground/80 mb-6">
                  <li>• Дали вентилационните отвори не са блокирани от птичи гнезда или отпадъци</li>
                  <li>• Дали софитните отвори позволяват свободно циркулиране на въздух</li>
                  <li>• Дали билните вентилатори функционират правилно</li>
                </ul>

                <h2 className="text-2xl font-bold text-foreground mt-12 mb-6">
                  Кога да се обадите на професионалист?
                </h2>
                <p className="text-foreground/80 mb-4">
                  Докато много от тези стъпки могат да бъдат извършени самостоятелно, има ситуации, в които е по-добре да 
                  потърсите професионална помощ:
                </p>
                <ul className="space-y-2 text-foreground/80 mb-6">
                  <li>✓ Покривът е стръмен или труднодостъпен</li>
                  <li>✓ Забелязвате значителни щети</li>
                  <li>✓ Имате течове в интериора</li>
                  <li>✓ Покривът е на повече от 15-20 години</li>
                  <li>✓ Нямате необходимото оборудване за безопасна работа</li>
                </ul>

                <div className="bg-primary/10 rounded-xl p-8 my-12 text-center">
                  <h3 className="text-2xl font-bold text-foreground mb-4">
                    Нуждаете се от професионална инспекция?
                  </h3>
                  <p className="text-foreground/80 mb-6">
                    Нашият екип предлага безплатен оглед на покрива ви във Варна и региона. 
                    Ще идентифицираме потенциални проблеми и ще ви дадем честна оценка преди зимата.
                  </p>
                  <a 
                    href="tel:+359884997659" 
                    className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-lg font-bold text-lg hover:bg-primary/90 transition-colors"
                  >
                    <Phone className="w-5 h-5" />
                    Обадете се: 088 499 7659
                  </a>
                </div>

                <h2 className="text-2xl font-bold text-foreground mt-12 mb-6">
                  Чеклист за зимна подготовка на покрива
                </h2>
                <div className="bg-secondary/30 rounded-xl p-6 my-8">
                  <ul className="space-y-3 text-foreground/80">
                    <li className="flex items-start gap-3">
                      <span className="text-primary font-bold">☐</span>
                      Направете визуална инспекция на покрива
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary font-bold">☐</span>
                      Почистете улуците и водосточните тръби
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary font-bold">☐</span>
                      Проверете и поправете уплътненията
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary font-bold">☐</span>
                      Инспектирайте тавана отвътре
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary font-bold">☐</span>
                      Подрежете надвисналите клони
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary font-bold">☐</span>
                      Проверете вентилацията
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary font-bold">☐</span>
                      Поправете счупени или липсващи керемиди
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary font-bold">☐</span>
                      Запишете телефона на доверен майстор за спешни случаи
                    </li>
                  </ul>
                </div>

              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-border">
                <span className="text-muted-foreground mr-2">Тагове:</span>
                {["зима", "поддръжка", "съвети", "инспекция", "улуци"].map((tag) => (
                  <Badge key={tag} variant="outline" className="flex items-center gap-1">
                    <Tag className="w-3 h-3" />
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Share */}
              <div className="flex items-center gap-4 mt-8">
                <span className="text-muted-foreground">Сподели:</span>
                <Button variant="outline" size="sm">
                  <Share2 className="w-4 h-4 mr-2" />
                  Facebook
                </Button>
              </div>

              {/* Corporate context */}
              <p className="text-muted-foreground text-sm mt-8">
                Покривните услуги са част от цялостните строителни решения, предлагани от{" "}
                <a href="https://bulgarbuild.com/" className="text-accent hover:underline">BulgarBuild</a>.
              </p>

              {/* Back to Blog */}
              <div className="mt-12">
                <Link to="/блог" className="inline-flex items-center gap-2 text-primary hover:underline">
                  <ArrowLeft className="w-4 h-4" />
                  Обратно към блога
                </Link>
              </div>
            </div>
          </div>
        </article>
      </main>

      <Footer />
      <FloatingCallButton />
    </div>
  );
};

export default WinterRoofPreparation;
