import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCallButton from "@/components/FloatingCallButton";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Calendar, Clock, ArrowLeft, Phone, Tag, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import choosingTilesImg from "@/assets/blog/choosing-tiles.jpg";

const ChoosingTiles = () => {
  const schemaData = {
    "@context": "https://schema.org", "@type": "BlogPosting",
    "headline": "Избор на керемиди за нов покрив — Цени, видове и сравнение 2026",
    "description": "Глинени 25-40 €/м², бетонни 18-28 €/м², метални 15-25 €/м². Пълно сравнение на 4 вида керемиди с ценови таблици и реални примери от Варна.",
    "image": "https://www.remontnapokrivivarna.bg/og-image.jpg",
    "datePublished": "2024-09-18", "dateModified": "2026-04-14",
    "author": { "@type": "Organization", "name": "RemontNaPokriviVarna" },
    "publisher": { "@type": "LocalBusiness", "name": "RemontNaPokriviVarna", "address": { "@type": "PostalAddress", "addressLocality": "Варна", "addressCountry": "BG" } },
    "mainEntityOfPage": "https://www.remontnapokrivivarna.bg/bg/blog/izbor-na-keremidi-za-pokriv"
  };

  const faqSchema = {
    "@context": "https://schema.org", "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": "Кои са най-добрите керемиди за покрив?", "acceptedAnswer": { "@type": "Answer", "text": "Глинените (керамични) керемиди са най-издръжливи — 50-100+ години. Те са идеални за класически архитектурен стил и морски климат като Варна. Бетонните са добра алтернатива при ограничен бюджет (18-28 EUR/м²). Металните са най-леки и бързи за монтаж." } },
      { "@type": "Question", "name": "Колко струват керемиди за нов покрив?", "acceptedAnswer": { "@type": "Answer", "text": "Цени за 2026 с монтаж: глинени 25-40 EUR/м², бетонни 18-28 EUR/м², метални 15-25 EUR/м², композитни 30-50 EUR/м². За покрив от 100 м²: 1,500-5,000 EUR в зависимост от типа." } },
      { "@type": "Question", "name": "Колко керемиди са нужни за 100 м² покрив?", "acceptedAnswer": { "@type": "Answer", "text": "За 100 м² покрив са необходими: 900-1,100 стандартни керемиди (9-11 бр/м²), 600-800 едроразмерни (6-8 бр/м²), или 15-20 метални листа (5-7 м² на лист). Добавете 5-10% за загуби при рязане." } },
      { "@type": "Question", "name": "Какъв наклон е необходим за керемиден покрив?", "acceptedAnswer": { "@type": "Answer", "text": "Минималният наклон за стандартни керемиди е 22-25°. За едроразмерни керемиди: 15-20°. За метални покриви: минимум 7-10°. При по-нисък наклон се увеличава рискът от задържане на вода и течове." } },
      { "@type": "Question", "name": "Колко тежи керемиден покрив?", "acceptedAnswer": { "@type": "Answer", "text": "Глинени керемиди: 40-60 кг/м². Бетонни: 45-65 кг/м². Метални: 5-8 кг/м². Композитни: 7-12 кг/м². Дървената конструкция трябва да е оразмерена за съответното тегло плюс снегонатоварване." } },
      { "@type": "Question", "name": "Кога е най-добре да сменим керемидите?", "acceptedAnswer": { "@type": "Answer", "text": "Оптималният период е април-октомври при сухо време. Глинените керемиди издържат 50-100 години, но може да се нуждаят от частична смяна след 30-40 години. Бетонните — след 25-30 години." } },
      { "@type": "Question", "name": "Какви марки керемиди препоръчвате?", "acceptedAnswer": { "@type": "Answer", "text": "Работим с водещи европейски марки: Bramac и Tondach (глинени), Wienerberger (глинени и бетонни), Kebe (глинени). Всички са сертифицирани по EN 1304 с фабрична гаранция 30+ години." } }
    ]
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Начало", "item": "https://www.remontnapokrivivarna.bg/bg" },
      { "@type": "ListItem", "position": 2, "name": "Блог", "item": "https://www.remontnapokrivivarna.bg/bg/blog" },
      { "@type": "ListItem", "position": 3, "name": "Избор на керемиди", "item": "https://www.remontnapokrivivarna.bg/bg/blog/izbor-na-keremidi-za-pokriv" }
    ]
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Избор на Керемиди за Покрив — Цени и Сравнение 2026 | Варна</title>
        <meta name="description" content="Глинени 25-40 €/м², бетонни 18-28 €/м², метални 15-25 €/м². Пълно сравнение на 4 вида керемиди с ценови таблици и реални примери от Варна. Безплатен оглед." />
        <meta property="og:url" content="https://www.remontnapokrivivarna.bg/bg/blog/izbor-na-keremidi-za-pokriv" />
        <meta property="og:type" content="article" />
        <meta property="og:locale" content="bg_BG" />
        <meta property="og:site_name" content="Ремонт на Покриви Варна" />
        <meta property="og:image" content="https://www.remontnapokrivivarna.bg/og-image.jpg" />
        <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <Header />
      <main className="pt-20">
        <section className="relative h-[50vh] min-h-[400px]">
          <img src={choosingTilesImg} alt="Различни видове покривни керемиди за сравнение" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="container mx-auto">
              <nav className="text-sm text-muted-foreground mb-4">
                <Link to="/bg" className="hover:text-primary">Начало</Link><span className="mx-2">/</span>
                <Link to="/bg/blog" className="hover:text-primary">Блог</Link><span className="mx-2">/</span>
                <span className="text-foreground">Избор на керемиди</span>
              </nav>
              <Badge className="mb-4">Нов покрив</Badge>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">Как да изберем правилните керемиди за нов покрив — Наръчник 2026</h1>
              <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />Обновена: 14 април 2026</span>
                <span className="flex items-center gap-1"><Clock className="w-4 h-4" />13 мин четене</span>
              </div>
            </div>
          </div>
        </section>

        <article className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="prose prose-lg max-w-none">
                <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                  Изборът на керемиди определя не само визията на дома ви, но и колко дълго покривът ще ви служи без проблеми. Глинените керемиди издържат 50-100 години, бетонните — 30-50, а металните — 30-50 при правилна поддръжка. В тази статия сравняваме 4-те основни вида керемиди с актуални цени за 2026, обясняваме за кой климат и стил е подходящ всеки тип и споделяме реални примери от нашите проекти във Варна.
                </p>

                <p className="text-foreground/80 mb-6">
                  При средна площ на покрива от 100-150 м² за еднофамилна къща във Варна, разликата в цената между най-евтиния и най-скъпия вариант може да достигне 2,500-4,000 EUR. Но по-скъпите керемиди често са по-изгодни в дългосрочен план — глинена керемида от Bramac или Tondach може да издържи 80+ години, докато бетонна трябва да се сменя на 35-40 години.
                </p>

                <p className="text-foreground/80 mb-6">
                  Климатът на Варна изисква керемиди с висока устойчивост на влага, сол и UV лъчи. Морският въздух ускорява корозията на метални елементи, а честите температурни промени (от -10°C зимата до +40°C лятото) създават стрес в материалите. Тези фактори трябва да се имат предвид при избора.
                </p>

                <div className="bg-secondary/30 rounded-xl p-6 my-8">
                  <h3 className="text-xl font-bold text-foreground mb-4">Бърз преглед — цени за монтаж 2026:</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead><tr className="bg-secondary/50">
                        <th className="border border-border p-3 text-left text-foreground">Тип керемиди</th>
                        <th className="border border-border p-3 text-left text-foreground">Цена с монтаж (EUR/м²)</th>
                        <th className="border border-border p-3 text-left text-foreground">Издръжливост</th>
                        <th className="border border-border p-3 text-left text-foreground">Тегло</th>
                      </tr></thead>
                      <tbody>
                        <tr><td className="border border-border p-3 text-foreground/80">Глинени (керамични)</td><td className="border border-border p-3 text-foreground/80 font-medium">25-40</td><td className="border border-border p-3 text-foreground/80">50-100 г.</td><td className="border border-border p-3 text-foreground/80">40-60 кг/м²</td></tr>
                        <tr><td className="border border-border p-3 text-foreground/80">Бетонни</td><td className="border border-border p-3 text-foreground/80 font-medium">18-28</td><td className="border border-border p-3 text-foreground/80">30-50 г.</td><td className="border border-border p-3 text-foreground/80">45-65 кг/м²</td></tr>
                        <tr><td className="border border-border p-3 text-foreground/80">Метални</td><td className="border border-border p-3 text-foreground/80 font-medium">15-25</td><td className="border border-border p-3 text-foreground/80">30-50 г.</td><td className="border border-border p-3 text-foreground/80">5-8 кг/м²</td></tr>
                        <tr><td className="border border-border p-3 text-foreground/80">Композитни</td><td className="border border-border p-3 text-foreground/80 font-medium">30-50</td><td className="border border-border p-3 text-foreground/80">40-70 г.</td><td className="border border-border p-3 text-foreground/80">7-12 кг/м²</td></tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Тип 1 */}
                <h2 className="text-2xl font-bold text-foreground mt-12 mb-6">1. Глинени (керамични) керемиди</h2>
                <p className="text-foreground/80 mb-4">
                  Глинените керемиди са класическият и най-издръжлив избор за покрив. Произвеждат се от естествена глина, формоват се и се изпичат при 1,000-1,200°C. Тази технология се използва от хилядолетия и е доказала своята надеждност. В България глинените керемиди покриват около 55% от покривите на еднофамилни къщи.
                </p>
                <p className="text-foreground/80 mb-4">
                  За района на Варна глинените керемиди са отличен избор — те са устойчиви на солен въздух, не корозират и не избледняват с времето. Препоръчваме марки Bramac, Tondach и Kebe, които предлагат фабрична гаранция 30-50 години.
                </p>

                <h3 className="text-xl font-bold text-foreground mt-8 mb-4">Видове глинени керемиди:</h3>
                <ul className="space-y-2 text-foreground/80 mb-6">
                  <li>• <strong>Марсилска (Marseille):</strong> Класическа вълнообразна форма, 10-12 бр/м², 25-35 EUR/м²</li>
                  <li>• <strong>Романска:</strong> S-образна форма, традиционен българск вид, 12-14 бр/м², 28-38 EUR/м²</li>
                  <li>• <strong>Плоска (Bobrovka):</strong> Модерен минималистичен вид, 14-16 бр/м², 30-40 EUR/м²</li>
                  <li>• <strong>Холандска:</strong> Едроразмерна, бърз монтаж, 7-9 бр/м², 25-35 EUR/м²</li>
                </ul>

                <div className="grid md:grid-cols-2 gap-6 my-8">
                  <Card className="border-green-500/50"><CardHeader className="pb-2"><h4 className="font-bold text-green-600">✓ Предимства</h4></CardHeader><CardContent><ul className="space-y-2 text-sm text-foreground/80">
                    <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-1" />Изключителна дълготрайност (50-100+ години)</li>
                    <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-1" />Естетична красота, не избледнява</li>
                    <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-1" />Огнеустойчивост (клас A1)</li>
                    <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-1" />Отлична звукоизолация</li>
                    <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-1" />Екологичен натурален материал</li>
                    <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-1" />Устойчивост на солен въздух</li>
                  </ul></CardContent></Card>
                  <Card className="border-red-500/50"><CardHeader className="pb-2"><h4 className="font-bold text-red-600">✗ Недостатъци</h4></CardHeader><CardContent><ul className="space-y-2 text-sm text-foreground/80">
                    <li>• По-висока цена (25-40 EUR/м²)</li>
                    <li>• Голямо тегло (40-60 кг/м²) — изисква здрава конструкция</li>
                    <li>• Чупливост при неправилен монтаж или транспорт</li>
                    <li>• По-бавен монтаж (10-12 бр/м²)</li>
                    <li>• Може да развие мос (северна страна)</li>
                  </ul></CardContent></Card>
                </div>

                <div className="bg-secondary/30 rounded-xl p-6 my-8">
                  <h4 className="font-bold text-foreground mb-3">📍 Реален пример — кв. Виница, Варна</h4>
                  <p className="text-foreground/80">Нов покрив 135 м² за двуетажна къща. Керемиди Bramac Montero (керамични, марсилски тип). Материали: 3,780 EUR. Монтаж с летви и мембрана: 1,890 EUR. Обща цена: 5,670 EUR (42 EUR/м² с конструкция). Срок: 12 работни дни. Гаранция: 15 години (труд) + 33 години (материал от Bramac).</p>
                </div>

                {/* Тип 2 */}
                <h2 className="text-2xl font-bold text-foreground mt-12 mb-6">2. Бетонни керемиди</h2>
                <p className="text-foreground/80 mb-4">
                  Бетонните керемиди са популярна алтернатива на глинените — с 25-35% по-ниска цена и подобни характеристики. Произвеждат се от цимент, пясък и минерални пигменти чрез пресоване под високо налягане. Този процес ги прави здрави и устойчиви, макар и не толкова дълготрайни като керамичните.
                </p>
                <p className="text-foreground/80 mb-4">
                  За Варна бетонните керемиди са добър бюджетен избор, но имайте предвид, че цветът може да избледнее с 20-30% за 15-20 години поради UV лъчите. Качествените марки (Bramac, Wienerberger) имат по-добра UV защита и по-бавно избледняване.
                </p>

                <div className="grid md:grid-cols-2 gap-6 my-8">
                  <Card className="border-green-500/50"><CardHeader className="pb-2"><h4 className="font-bold text-green-600">✓ Предимства</h4></CardHeader><CardContent><ul className="space-y-2 text-sm text-foreground/80">
                    <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-1" />По-достъпна цена (18-28 EUR/м²)</li>
                    <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-1" />Голям избор от цветове и форми</li>
                    <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-1" />Добра издръжливост (30-50 години)</li>
                    <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-1" />Огнеустойчивост</li>
                  </ul></CardContent></Card>
                  <Card className="border-red-500/50"><CardHeader className="pb-2"><h4 className="font-bold text-red-600">✗ Недостатъци</h4></CardHeader><CardContent><ul className="space-y-2 text-sm text-foreground/80">
                    <li>• Избледняване на цвета с времето</li>
                    <li>• Най-голямо тегло (45-65 кг/м²)</li>
                    <li>• По-порьозни — могат да задържат влага</li>
                    <li>• По-склонни към развитие на мос</li>
                  </ul></CardContent></Card>
                </div>

                <div className="bg-secondary/30 rounded-xl p-6 my-8">
                  <h4 className="font-bold text-foreground mb-3">📍 Реален пример — с. Константиново (до Варна)</h4>
                  <p className="text-foreground/80">Нов покрив 110 м² за селска къща. Бетонни керемиди Bramac Classic. Обща цена с монтаж: 2,750 EUR (25 EUR/м²). Срок: 8 работни дни.</p>
                </div>

                {/* Тип 3 */}
                <h2 className="text-2xl font-bold text-foreground mt-12 mb-6">3. Метални покриви</h2>
                <p className="text-foreground/80 mb-4">
                  Металните покриви (от поцинкована стомана, алуминий или мед) стават все по-популярни благодарение на ниското си тегло, бързия монтаж и модерния вид. Те са 6-8 пъти по-леки от керемидните, което значително намалява натоварването на конструкцията и фундаментите.
                </p>
                <p className="text-foreground/80 mb-4">
                  Във Варна обаче трябва да се има предвид, че солният морски въздух ускорява корозията на стоманени елементи. Затова е критично да се избере метален покрив с висококачествено антикорозионно покритие (минимум 25 микрона полиестер или 35 микрона PVDF/Purall).
                </p>

                <div className="grid md:grid-cols-2 gap-6 my-8">
                  <Card className="border-green-500/50"><CardHeader className="pb-2"><h4 className="font-bold text-green-600">✓ Предимства</h4></CardHeader><CardContent><ul className="space-y-2 text-sm text-foreground/80">
                    <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-1" />Много лек (5-8 кг/м²)</li>
                    <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-1" />Бърз монтаж (2-3 пъти по-бързо)</li>
                    <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-1" />Дълъг живот с добро покритие (30-50 г.)</li>
                    <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-1" />Отлично отводняване</li>
                    <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-1" />Минимален наклон 7-10°</li>
                  </ul></CardContent></Card>
                  <Card className="border-red-500/50"><CardHeader className="pb-2"><h4 className="font-bold text-red-600">✗ Недостатъци</h4></CardHeader><CardContent><ul className="space-y-2 text-sm text-foreground/80">
                    <li>• По-шумни при дъжд (изисква звукоизолация)</li>
                    <li>• Корозия при лошо покритие + солен въздух</li>
                    <li>• Кондензация без пароизолация</li>
                    <li>• По-висока цена за качествени варианти</li>
                  </ul></CardContent></Card>
                </div>

                <div className="bg-secondary/30 rounded-xl p-6 my-8">
                  <h4 className="font-bold text-foreground mb-3">📍 Реален пример — кв. Галата, Варна</h4>
                  <p className="text-foreground/80">Покрив 95 м² за модерна къща. Метални керемиди с PVDF покритие. Обща цена с монтаж и пароизолация: 2,280 EUR (24 EUR/м²). Срок: 4 работни дни. Гаранция: 15 години (труд) + 40 години (покритие).</p>
                </div>

                {/* Тип 4 */}
                <h2 className="text-2xl font-bold text-foreground mt-12 mb-6">4. Композитни керемиди</h2>
                <p className="text-foreground/80 mb-4">
                  Композитните керемиди съчетават метална основа с каменни гранули — получавате леготата на метала и визията на естествена керемида. Те са премиум решение с цена 30-50 EUR/м², но предлагат уникална комбинация от характеристики: лек, тих, красив и издръжлив.
                </p>

                <h3 className="text-xl font-bold text-foreground mt-8 mb-4">Кога да изберете композитни:</h3>
                <ul className="space-y-2 text-foreground/80 mb-6">
                  <li>• Искате вид на керемиден покрив, но конструкцията не издържа теглото</li>
                  <li>• Центе тишина при дъжд (гранулите абсорбират звука)</li>
                  <li>• Покрив със сложна геометрия</li>
                  <li>• Морски климат (без корозия)</li>
                </ul>

                {/* Сравнителна таблица */}
                <h2 className="text-2xl font-bold text-foreground mt-12 mb-6">Как да изберете — 5 критерия</h2>
                <ul className="space-y-3 text-foreground/80 mb-6">
                  <li>• <strong>Бюджет:</strong> Бетонни (18-28 €/м²) за икономичен вариант, глинени (25-40 €/м²) за дългосрочна инвестиция</li>
                  <li>• <strong>Конструкция:</strong> Ако конструкцията е слаба — метални (5-8 кг/м²) или композитни (7-12 кг/м²)</li>
                  <li>• <strong>Климат Варна:</strong> Глинени или композитни — най-устойчиви на солен въздух</li>
                  <li>• <strong>Стил:</strong> Класически — глинени. Модерен — метални. Универсален — композитни</li>
                  <li>• <strong>Дългосрочна стойност:</strong> Глинени (0.35-0.50 €/м²/год.) са най-изгодни в дългосрочен план</li>
                </ul>

                {/* Вътрешни линкове */}
                <h2 className="text-2xl font-bold text-foreground mt-12 mb-6">Свързани услуги</h2>
                <div className="bg-secondary/30 rounded-xl p-6 my-8 border border-border/30">
                  <div className="grid md:grid-cols-2 gap-3">
                    <Link to="/bg/nov-pokriv" className="text-primary hover:underline flex items-center gap-2">→ Изграждане на нов покрив</Link>
                    <Link to="/bg/remont-na-keremideni-pokrivi" className="text-primary hover:underline flex items-center gap-2">→ Смяна на керемиди</Link>
                    <Link to="/bg/metalni-pokrivi" className="text-primary hover:underline flex items-center gap-2">→ Метални покриви</Link>
                    <Link to="/bg/remont-na-pokrivi" className="text-primary hover:underline flex items-center gap-2">→ Ремонт на покриви</Link>
                  </div>
                </div>

                {/* FAQ */}
                <h2 className="text-2xl font-bold text-foreground mt-12 mb-6">Често задавани въпроси</h2>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="faq-1"><AccordionTrigger>Кои са най-добрите керемиди за покрив?</AccordionTrigger><AccordionContent>Глинените (керамични) керемиди са най-издръжливи — 50-100+ години. За Варна са идеални поради устойчивостта им на солен въздух. Бетонните са добра бюджетна алтернатива (18-28 EUR/м²).</AccordionContent></AccordionItem>
                  <AccordionItem value="faq-2"><AccordionTrigger>Колко струват керемиди за нов покрив?</AccordionTrigger><AccordionContent>Цени за 2026 с монтаж: глинени 25-40 EUR/м², бетонни 18-28 EUR/м², метални 15-25 EUR/м², композитни 30-50 EUR/м². За 100 м² покрив: 1,500-5,000 EUR.</AccordionContent></AccordionItem>
                  <AccordionItem value="faq-3"><AccordionTrigger>Колко керемиди са нужни за 100 м²?</AccordionTrigger><AccordionContent>900-1,100 стандартни керемиди (9-11 бр/м²) или 600-800 едроразмерни (6-8 бр/м²). Добавете 5-10% за загуби при рязане.</AccordionContent></AccordionItem>
                  <AccordionItem value="faq-4"><AccordionTrigger>Какъв наклон е необходим?</AccordionTrigger><AccordionContent>Стандартни керемиди: 22-25°. Едроразмерни: 15-20°. Метални: 7-10°. По-нисък наклон увеличава риска от задържане на вода.</AccordionContent></AccordionItem>
                  <AccordionItem value="faq-5"><AccordionTrigger>Колко тежи керемиден покрив?</AccordionTrigger><AccordionContent>Глинени: 40-60 кг/м². Бетонни: 45-65 кг/м². Метални: 5-8 кг/м². Композитни: 7-12 кг/м². Конструкцията трябва да е оразмерена за теглото плюс снегонатоварване.</AccordionContent></AccordionItem>
                  <AccordionItem value="faq-6"><AccordionTrigger>Какви марки препоръчвате?</AccordionTrigger><AccordionContent>Bramac и Tondach (глинени), Wienerberger (глинени и бетонни), Kebe (глинени). Всички са сертифицирани по EN 1304 с 30+ години гаранция.</AccordionContent></AccordionItem>
                  <AccordionItem value="faq-7"><AccordionTrigger>Кога е най-добре да сменим керемидите?</AccordionTrigger><AccordionContent>Април-октомври при сухо време. Глинените издържат 50-100 г., бетонните 30-50 г. Частична смяна може да се прави и извън сезона при спешност.</AccordionContent></AccordionItem>
                </Accordion>
              </div>

              {/* CTA */}
              <div className="bg-primary/10 rounded-xl p-8 my-12 text-center">
                <h3 className="text-2xl font-bold text-foreground mb-4">Нуждаете се от съвет за избор на керемиди?</h3>
                <p className="text-foreground/80 mb-6">Безплатен оглед и консултация. Ще ви помогнем да изберете най-подходящите керемиди за вашия дом и бюджет.</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/bg/bezplaten-ogled"><Button size="lg" className="w-full sm:w-auto text-lg px-8 py-6"><CheckCircle className="w-5 h-5 mr-2" />Заяви безплатен оглед</Button></Link>
                  <a href="tel:+359884997659"><Button size="lg" variant="outline" className="w-full sm:w-auto text-lg px-8 py-6"><Phone className="w-5 h-5 mr-2" />Обади се: 088 499 7659</Button></a>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-border">
                <span className="text-muted-foreground mr-2">Тагове:</span>
                {["керемиди", "глинени", "бетонни", "метални", "цени", "Варна"].map((tag) => (
                  <Badge key={tag} variant="outline" className="flex items-center gap-1"><Tag className="w-3 h-3" />{tag}</Badge>
                ))}
              </div>
              <div className="mt-8">
                <Link to="/bg/blog" className="inline-flex items-center gap-2 text-primary hover:underline"><ArrowLeft className="w-4 h-4" />Обратно към блога</Link>
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

export default ChoosingTiles;
