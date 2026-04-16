import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Calendar, Clock, ArrowLeft, Phone, Tag, AlertTriangle, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import roofRepairSignsImg from "@/assets/blog/roof-repair-signs.jpg";

const RoofRepairSigns = () => {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "5 признака, че покривът ви се нуждае от спешен ремонт — Пълен наръчник 2026",
    "description": "Течове, липсващи керемиди, провисване на конструкцията — разберете кога покривът ви се нуждае от спешен ремонт. Цени от 150 EUR, реални примери от Варна.",
    "image": "https://www.remontnapokrivivarna.bg/og-image.jpg",
    "datePublished": "2024-11-15",
    "dateModified": "2026-04-14",
    "author": { "@type": "Organization", "name": "RemontNaPokriviVarna" },
    "publisher": {
      "@type": "LocalBusiness",
      "name": "RemontNaPokriviVarna",
      "address": { "@type": "PostalAddress", "addressLocality": "Варна", "addressCountry": "BG" }
    },
    "mainEntityOfPage": "https://www.remontnapokrivivarna.bg/bg/blog/5-priznaka-remont-na-pokriv"
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": "Как да разбера, че покривът ми се нуждае от ремонт?", "acceptedAnswer": { "@type": "Answer", "text": "Основните признаци са: петна от влага на тавана, липсващи или счупени керемиди, провисване на покривната конструкция, мухъл и мос по повърхността, и необяснимо увеличени сметки за отопление. При наличие на поне един от тези признаци е необходим професионален оглед." } },
      { "@type": "Question", "name": "Колко струва спешен ремонт на покрив?", "acceptedAnswer": { "@type": "Answer", "text": "Спешен ремонт на единичен теч струва 150-400 EUR. Смяна на 10-20 счупени керемиди: 200-600 EUR. Ремонт на провиснала конструкция: 1,000-5,000 EUR в зависимост от обхвата. Пълна подмяна на хидроизолация: 15-25 EUR/м²." } },
      { "@type": "Question", "name": "Може ли теч от покрива да се поправи сам?", "acceptedAnswer": { "@type": "Answer", "text": "Временна мярка при активен теч е да поставите кофа и да покриете засегнатата зона с найлон отвън. Но постоянен ремонт изисква професионалист — неправилно уплътняване може да влоши проблема и да доведе до гниене на дървената конструкция." } },
      { "@type": "Question", "name": "Колко бързо трябва да реагирам при теч от покрива?", "acceptedAnswer": { "@type": "Answer", "text": "При активен теч реагирайте незабавно. Всеки ден забавяне увеличава щетите — водата може да повреди изолацията, електрическата инсталация и тавана. Ние предлагаме спешен оглед до 24 часа." } },
      { "@type": "Question", "name": "Какво причинява провисване на покрива?", "acceptedAnswer": { "@type": "Answer", "text": "Провисването се причинява от: дългогодишно натрупване на влага и гниене на гредите, прекомерно тегло от сняг, недостатъчно размерена конструкция, или термити и дървояди. Провиснал покрив е потенциално опасен и изисква незабавна реакция." } },
      { "@type": "Question", "name": "На колко години трябва да се ремонтира покрив?", "acceptedAnswer": { "@type": "Answer", "text": "Керемиден покрив издържа 40-60 години, но керемидите може да се нуждаят от частична смяна на 15-20 години. Битумна хидроизолация: 10-15 години. PVC мембрана: 20-30 години. Метален покрив: 30-50 години. Редовната поддръжка удължава значително тези срокове." } },
      { "@type": "Question", "name": "Давате ли гаранция за ремонта?", "acceptedAnswer": { "@type": "Answer", "text": "Да, предоставяме 15 години гаранция за всички покривни ремонти. Гаранцията покрива материали и труд. Използваме материали от Bramac, Tondach, Wienerberger, Sika и Ceresit." } }
    ]
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Начало", "item": "https://www.remontnapokrivivarna.bg/bg" },
      { "@type": "ListItem", "position": 2, "name": "Блог", "item": "https://www.remontnapokrivivarna.bg/bg/blog" },
      { "@type": "ListItem", "position": 3, "name": "5 признака за ремонт на покрив", "item": "https://www.remontnapokrivivarna.bg/bg/blog/5-priznaka-remont-na-pokriv" }
    ]
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>5 Признака, че Покривът се Нуждае от Спешен Ремонт | Варна 2026</title>
        <meta name="description" content="Течове, счупени керемиди, провисване — 5-те основни признака за спешен ремонт на покрив. Цени от 150 EUR, реални казуси от Варна и безплатен оглед до 24ч." />
        <meta property="og:title" content="5 Признака за Спешен Ремонт на Покрив | Варна 2026" />
        <meta property="og:description" content="Течове, счупени керемиди, провисване — 5-те основни признака за спешен ремонт на покрив. Цени от 150 EUR." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://www.remontnapokrivivarna.bg/bg/blog/5-priznaka-remont-na-pokriv" />
        <meta property="og:image" content="https://www.remontnapokrivivarna.bg/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="bg_BG" />
        <meta property="og:site_name" content="Ремонт на Покриви Варна" />
        <meta property="article:published_time" content="2024-11-15" />
        <meta property="article:modified_time" content="2026-04-14" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="5 Признака за Спешен Ремонт на Покрив | Варна 2026" />
        <meta name="twitter:description" content="Течове, счупени керемиди, провисване — 5-те основни признака. Цени от 150 EUR." />
        <meta name="twitter:image" content="https://www.remontnapokrivivarna.bg/og-image.jpg" />
        <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <Header />
      
      <main className="pt-20">
        {/* Hero */}
        <section className="relative h-[50vh] min-h-[400px]">
          <img src={roofRepairSignsImg} alt="Повреден покрив с липсващи керемиди — признаци за спешен ремонт" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="container mx-auto">
              <nav className="text-sm text-muted-foreground mb-4">
                <Link to="/bg" className="hover:text-primary">Начало</Link>
                <span className="mx-2">/</span>
                <Link to="/bg/blog" className="hover:text-primary">Блог</Link>
                <span className="mx-2">/</span>
                <span className="text-foreground">5 признака за ремонт</span>
              </nav>
              <Badge className="mb-4">Ремонт</Badge>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                5 признака, че покривът ви се нуждае от спешен ремонт
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />Обновена: 14 април 2026</span>
                <span className="flex items-center gap-1"><Clock className="w-4 h-4" />12 мин четене</span>
              </div>
            </div>
          </div>
        </section>

        <article className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="prose prose-lg max-w-none">
                
                {/* Въведение */}
                <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                  Покривът е най-важната защита на дома ви от природните стихии. Средната цена за спешен ремонт на покрив във Варна е между 150 и 5,000 EUR — но навременното реагиране може да ви спести до 80% от тази сума. В тази статия ще разгледаме 5-те основни признака, които показват, че покривът ви се нуждае от незабавно внимание, колко струва ремонтът при всеки случай и какви са реалните примери от практиката ни във Варна.
                </p>

                <p className="text-foreground/80 mb-6">
                  Статистиката показва, че 70% от сериозните покривни повреди можеха да бъдат предотвратени с навременна реакция при първите признаци. Всяка година над 40% от спешните ни обаждания във Варна идват от клиенти, които са забелязали проблема още преди месеци, но са отлагали ремонта. Резултатът — 2 до 3 пъти по-висока цена от тази, която щеше да бъде при навременна реакция.
                </p>

                <p className="text-foreground/80 mb-6">
                  Покривите в района на Варна и Черноморието са изложени на специфични натоварвания: солен въздух, силни североизточни ветрове, интензивни валежи и температурни амплитуди от -10°C до +40°C. Тези фактори ускоряват износването на покривните материали и правят редовната инспекция още по-важна.
                </p>

                <div className="bg-secondary/30 rounded-xl p-6 my-8">
                  <h3 className="text-xl font-bold text-foreground mb-4">Бърз преглед — 5-те признака:</h3>
                  <ol className="space-y-2 text-foreground/80">
                    <li><strong>1. Петна от влага и течове</strong> — Цена за ремонт: 150-800 EUR</li>
                    <li><strong>2. Липсващи или счупени керемиди</strong> — Цена: 200-1,200 EUR</li>
                    <li><strong>3. Провисване на конструкцията</strong> — Цена: 1,000-5,000+ EUR</li>
                    <li><strong>4. Мухъл и мос по покрива</strong> — Цена за почистване: 100-500 EUR</li>
                    <li><strong>5. Увеличени сметки за отопление</strong> — Цена за изолация: 500-3,000 EUR</li>
                  </ol>
                </div>

                {/* Признак 1 */}
                <h2 className="text-2xl font-bold text-foreground mt-12 mb-6">
                  Признак #1: Петна от влага и активни течове на тавана
                </h2>
                <p className="text-foreground/80 mb-4">
                  Петната от влага на тавана са най-очевидният и най-спешен признак за проблем с покрива. Те означават, че водата вече е проникнала през покривната конструкция и причинява активни щети на изолацията, дървените греди и вътрешното покритие.
                </p>
                <p className="text-foreground/80 mb-4">
                  <strong>Важно да знаете:</strong> Мястото на петното на тавана рядко съвпада с действителния източник на теча. Водата може да пътува по гредите и мембраните на разстояние от 2-5 метра преди да падне. Затова самодиагностиката без опит често е неефективна.
                </p>

                <div className="bg-destructive/10 border-l-4 border-destructive p-6 my-6">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-6 h-6 text-destructive flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-foreground font-medium"><strong>Спешност:</strong> Активен теч при дъжд изисква незабавна реакция. Всеки ден забавяне може да увеличи щетите с 20-30%.</p>
                    </div>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-foreground mt-8 mb-4">Какво да направите веднага:</h3>
                <ul className="space-y-2 text-foreground/80 mb-6">
                  <li>• Поставете кофа или тава под активния теч</li>
                  <li>• Маркирайте петното с дата и снимайте го</li>
                  <li>• Проверете тавана за разширяване на петното</li>
                  <li>• Обадете се на професионалист за оглед (ние предлагаме безплатен оглед до 24ч)</li>
                  <li>• НЕ опитвайте да запечатате теча отвътре — това само маскира проблема</li>
                </ul>

                <h3 className="text-xl font-bold text-foreground mt-8 mb-4">Цени за ремонт на течове:</h3>
                <div className="overflow-x-auto my-6">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-secondary/50">
                        <th className="border border-border p-3 text-left text-foreground">Вид ремонт</th>
                        <th className="border border-border p-3 text-left text-foreground">Цена (EUR)</th>
                        <th className="border border-border p-3 text-left text-foreground">Срок</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr><td className="border border-border p-3 text-foreground/80">Уплътняване на единичен теч</td><td className="border border-border p-3 text-foreground/80">150-300</td><td className="border border-border p-3 text-foreground/80">1 ден</td></tr>
                      <tr><td className="border border-border p-3 text-foreground/80">Ремонт на хидроизолация (до 10 м²)</td><td className="border border-border p-3 text-foreground/80">300-600</td><td className="border border-border p-3 text-foreground/80">1-2 дни</td></tr>
                      <tr><td className="border border-border p-3 text-foreground/80">Подмяна на обшивки около комин</td><td className="border border-border p-3 text-foreground/80">200-500</td><td className="border border-border p-3 text-foreground/80">1 ден</td></tr>
                      <tr><td className="border border-border p-3 text-foreground/80">Цялостен ремонт на засегнат участък</td><td className="border border-border p-3 text-foreground/80">500-1,500</td><td className="border border-border p-3 text-foreground/80">2-4 дни</td></tr>
                    </tbody>
                  </table>
                </div>

                <div className="bg-secondary/30 rounded-xl p-6 my-8">
                  <h4 className="font-bold text-foreground mb-3">📍 Реален пример — кв. Чайка, Варна</h4>
                  <p className="text-foreground/80">Клиент забеляза петно на тавана след есенните дъждове, но отложи обаждането с 3 месеца. Когато дойдохме за оглед, водата вече беше повредила 4 м² от дървената конструкция и изолацията. Крайна цена: 1,800 EUR вместо 350 EUR, ако беше реагирал навреме.</p>
                </div>

                {/* Признак 2 */}
                <h2 className="text-2xl font-bold text-foreground mt-12 mb-6">
                  Признак #2: Липсващи, счупени или изместени керемиди
                </h2>
                <p className="text-foreground/80 mb-4">
                  Керемидите са първата защитна бариера на покрива. Когато липсва дори една керемида, подпокривната мембрана и дървената конструкция са директно изложени на дъжд, вятър и UV лъчи. При типичен покрив от 100 м² има около 900-1,100 керемиди, като всяка от тях играе роля за цялостната защита.
                </p>

                <h3 className="text-xl font-bold text-foreground mt-8 mb-4">Най-чести причини за повреда:</h3>
                <ul className="space-y-2 text-foreground/80 mb-6">
                  <li>• <strong>Силни ветрове (над 80 км/ч):</strong> Във Варна североизточните ветрове достигат до 120 км/ч, което може да откъсне незакрепени керемиди</li>
                  <li>• <strong>Температурни цикли:</strong> Замръзване-размразяване напуква керемидите отвътре</li>
                  <li>• <strong>Падащи клони:</strong> Особено при покриви близо до дървета</li>
                  <li>• <strong>Естествено стареене:</strong> Глинените керемиди след 40+ години, бетонните след 25-30 години</li>
                  <li>• <strong>Неправилен монтаж:</strong> Керемиди, положени без правилно застъпване или без клипсове</li>
                </ul>

                <h3 className="text-xl font-bold text-foreground mt-8 mb-4">Цени за смяна на керемиди:</h3>
                <div className="overflow-x-auto my-6">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-secondary/50">
                        <th className="border border-border p-3 text-left text-foreground">Обхват</th>
                        <th className="border border-border p-3 text-left text-foreground">Цена (EUR)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr><td className="border border-border p-3 text-foreground/80">1-5 керемиди</td><td className="border border-border p-3 text-foreground/80">100-250</td></tr>
                      <tr><td className="border border-border p-3 text-foreground/80">5-20 керемиди</td><td className="border border-border p-3 text-foreground/80">200-600</td></tr>
                      <tr><td className="border border-border p-3 text-foreground/80">20-50 керемиди</td><td className="border border-border p-3 text-foreground/80">500-1,200</td></tr>
                      <tr><td className="border border-border p-3 text-foreground/80">Цялостна подмяна (100 м²)</td><td className="border border-border p-3 text-foreground/80">2,500-4,000</td></tr>
                    </tbody>
                  </table>
                </div>

                <p className="text-foreground/80 mb-6">
                  <strong>Съвет:</strong> При смяна на повече от 30% от керемидите, обмислете пълна подмяна — цената на м² е значително по-ниска при цялостен ремонт, а резултатът е хомогенен покрив с еднаква издръжливост. Вижте нашата страница за <Link to="/bg/remont-na-keremideni-pokrivi" className="text-primary hover:underline">смяна на керемиди</Link> за повече информация.
                </p>

                {/* Признак 3 */}
                <h2 className="text-2xl font-bold text-foreground mt-12 mb-6">
                  Признак #3: Провисване на покривната конструкция
                </h2>
                <p className="text-foreground/80 mb-4">
                  Провисването е най-сериозният от петте признака и изисква незабавна реакция. Видимо хлътване или вдлъбнатини в покривната линия означават структурни проблеми в носещата конструкция — мауерлат, столици или ребра.
                </p>

                <div className="bg-destructive/10 border-l-4 border-destructive p-6 my-6">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-6 h-6 text-destructive flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-foreground font-medium"><strong>ОПАСНОСТ:</strong> Провиснал покрив може да колабира. При забелязване на провисване, евакуирайте помещенията под засегнатия участък и незабавно се обадете на специалист.</p>
                    </div>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-foreground mt-8 mb-4">Причини за провисване:</h3>
                <ul className="space-y-2 text-foreground/80 mb-6">
                  <li>• <strong>Гниене от влага:</strong> Дългогодишни течове размекват дървените греди</li>
                  <li>• <strong>Прекомерно натоварване:</strong> Тежък сняг (особено мокър сняг — до 400 кг/м³)</li>
                  <li>• <strong>Недостатъчна конструкция:</strong> Греди с по-малко сечение от необходимото</li>
                  <li>• <strong>Термити и дървояди:</strong> Изяждат дървесината отвътре</li>
                  <li>• <strong>Възраст:</strong> Дървена конструкция над 50-60 години без поддръжка</li>
                </ul>

                <h3 className="text-xl font-bold text-foreground mt-8 mb-4">Цени за ремонт на конструкция:</h3>
                <div className="overflow-x-auto my-6">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-secondary/50">
                        <th className="border border-border p-3 text-left text-foreground">Вид работа</th>
                        <th className="border border-border p-3 text-left text-foreground">Цена (EUR)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr><td className="border border-border p-3 text-foreground/80">Подсилване на единична греда</td><td className="border border-border p-3 text-foreground/80">300-800</td></tr>
                      <tr><td className="border border-border p-3 text-foreground/80">Подмяна на 2-3 греди</td><td className="border border-border p-3 text-foreground/80">1,000-2,500</td></tr>
                      <tr><td className="border border-border p-3 text-foreground/80">Цялостна реконструкция (50-100 м²)</td><td className="border border-border p-3 text-foreground/80">3,000-8,000</td></tr>
                      <tr><td className="border border-border p-3 text-foreground/80">Нова дървена конструкция</td><td className="border border-border p-3 text-foreground/80">25-45 EUR/м²</td></tr>
                    </tbody>
                  </table>
                </div>

                <div className="bg-secondary/30 rounded-xl p-6 my-8">
                  <h4 className="font-bold text-foreground mb-3">📍 Реален пример — кв. Аспарухово, Варна</h4>
                  <p className="text-foreground/80">Тристайен апартамент на последен етаж с провиснал участък от 3 м². Причина: 15-годишен теч, който не е бил ремонтиран. Необходима подмяна на 4 греди + нова хидроизолация + керемиди. Обща цена: 4,200 EUR. Срок: 8 работни дни.</p>
                </div>

                {/* Признак 4 */}
                <h2 className="text-2xl font-bold text-foreground mt-12 mb-6">
                  Признак #4: Мухъл, мос и лишеи по покрива
                </h2>
                <p className="text-foreground/80 mb-4">
                  Наличието на мухъл, мос или лишеи показва задържане на влага по повърхността на покрива. Във Варна, поради високата влажност от морския климат (средна годишна влажност 72%), мосът е особено чест проблем — засяга около 35% от покривите на възраст над 15 години.
                </p>
                <p className="text-foreground/80 mb-4">
                  Мосът не е просто козметичен проблем. Той действа като гъба — задържа вода, която замръзява през зимата и буквално откъсва гранулите от керемидите. С течение на годините керемидите стават порьозни, крехки и започват да пропускат вода.
                </p>

                <h3 className="text-xl font-bold text-foreground mt-8 mb-4">Рискове от мос и мухъл:</h3>
                <ul className="space-y-2 text-foreground/80 mb-6">
                  <li>• <strong>Здравословни проблеми:</strong> Мухълът в подпокривното пространство причинява алергии и респираторни заболявания</li>
                  <li>• <strong>Разрушаване на керемидите:</strong> Мосът ускорява ерозията с 200-300%</li>
                  <li>• <strong>Запушване на улуци:</strong> Мосът пада в улуците и ги запушва</li>
                  <li>• <strong>Гниене на дървени елементи:</strong> Постоянната влажност разяжда дървената конструкция</li>
                </ul>

                <h3 className="text-xl font-bold text-foreground mt-8 mb-4">Цени за почистване и третиране:</h3>
                <div className="overflow-x-auto my-6">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-secondary/50">
                        <th className="border border-border p-3 text-left text-foreground">Услуга</th>
                        <th className="border border-border p-3 text-left text-foreground">Цена (EUR)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr><td className="border border-border p-3 text-foreground/80">Почистване на мос (до 50 м²)</td><td className="border border-border p-3 text-foreground/80">150-350</td></tr>
                      <tr><td className="border border-border p-3 text-foreground/80">Почистване на мос (50-100 м²)</td><td className="border border-border p-3 text-foreground/80">300-600</td></tr>
                      <tr><td className="border border-border p-3 text-foreground/80">Химическо третиране + почистване</td><td className="border border-border p-3 text-foreground/80">4-8 EUR/м²</td></tr>
                      <tr><td className="border border-border p-3 text-foreground/80">Хидрофобна импрегнация</td><td className="border border-border p-3 text-foreground/80">5-10 EUR/м²</td></tr>
                    </tbody>
                  </table>
                </div>

                {/* Признак 5 */}
                <h2 className="text-2xl font-bold text-foreground mt-12 mb-6">
                  Признак #5: Необяснимо увеличени сметки за отопление
                </h2>
                <p className="text-foreground/80 mb-4">
                  Ако сметките ви за отопление са скочили с 20-40% без промяна в навиците ви, причината може да е в покрива. Повредената изолация, пукнатините и липсващите керемиди позволяват на топлия въздух да избяга директно навън. Средно 25-30% от топлозагубите в една сграда са през покрива.
                </p>
                <p className="text-foreground/80 mb-4">
                  Добре изолираният покрив спестява между 200 и 600 EUR годишно от сметки за отопление за типична къща от 100-150 м². Инвестицията в добра покривна изолация се изплаща за 3-5 години.
                </p>

                <h3 className="text-xl font-bold text-foreground mt-8 mb-4">Признаци за проблеми с изолацията:</h3>
                <ul className="space-y-2 text-foreground/80 mb-6">
                  <li>• Студени зони на тавана или стените под покрива</li>
                  <li>• Кондензация по прозорците на горния етаж</li>
                  <li>• Бързо топене на снега само на вашия покрив (в сравнение със съседните)</li>
                  <li>• Неравномерна температура в стаите на последния етаж</li>
                  <li>• Горещина през лятото на последния етаж</li>
                </ul>

                <h3 className="text-xl font-bold text-foreground mt-8 mb-4">Цени за изолация на покрив:</h3>
                <div className="overflow-x-auto my-6">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-secondary/50">
                        <th className="border border-border p-3 text-left text-foreground">Тип изолация</th>
                        <th className="border border-border p-3 text-left text-foreground">Цена (EUR/м²)</th>
                        <th className="border border-border p-3 text-left text-foreground">R-стойност</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr><td className="border border-border p-3 text-foreground/80">Минерална вата (Rockwool) 15 см</td><td className="border border-border p-3 text-foreground/80">12-18</td><td className="border border-border p-3 text-foreground/80">3.75</td></tr>
                      <tr><td className="border border-border p-3 text-foreground/80">XPS плочи 10 см</td><td className="border border-border p-3 text-foreground/80">15-22</td><td className="border border-border p-3 text-foreground/80">3.50</td></tr>
                      <tr><td className="border border-border p-3 text-foreground/80">Полиуретанова пяна (PUR)</td><td className="border border-border p-3 text-foreground/80">18-28</td><td className="border border-border p-3 text-foreground/80">5.00</td></tr>
                      <tr><td className="border border-border p-3 text-foreground/80">EPS (стиропор) 10 см</td><td className="border border-border p-3 text-foreground/80">8-14</td><td className="border border-border p-3 text-foreground/80">2.60</td></tr>
                    </tbody>
                  </table>
                </div>

                <div className="bg-secondary/30 rounded-xl p-6 my-8">
                  <h4 className="font-bold text-foreground mb-3">📍 Реален пример — кв. Владиславово, Варна</h4>
                  <p className="text-foreground/80">Къща от 120 м² с неизолиран таван. Сметки за газ: 350 EUR/месец. След полагане на 20 см минерална вата (Rockwool) на тавана — сметките паднаха на 220 EUR/месец. Инвестиция: 2,400 EUR. Възвръщаемост: 1.5 години.</p>
                </div>

                {/* Кога проблемът е спешен */}
                <h2 className="text-2xl font-bold text-foreground mt-12 mb-6">
                  Кога проблемът е спешен и кога може да почака?
                </h2>
                <div className="grid md:grid-cols-2 gap-6 my-8">
                  <Card className="border-destructive/50">
                    <CardContent className="p-6">
                      <h3 className="font-bold text-destructive mb-3">🚨 Спешно (обадете се веднага):</h3>
                      <ul className="space-y-2 text-sm text-foreground/80">
                        <li>• Активни течове при дъжд</li>
                        <li>• Видимо провисване на покрива</li>
                        <li>• Липсващи големи участъци керемиди (5+)</li>
                        <li>• Повреда след буря или град</li>
                        <li>• Мухъл в жилищни помещения</li>
                      </ul>
                    </CardContent>
                  </Card>
                  <Card className="border-primary/50">
                    <CardContent className="p-6">
                      <h3 className="font-bold text-primary mb-3">📋 Планирайте (в рамките на 1-3 месеца):</h3>
                      <ul className="space-y-2 text-sm text-foreground/80">
                        <li>• Единични счупени керемиди</li>
                        <li>• Мос по северната страна</li>
                        <li>• Леко увеличени сметки</li>
                        <li>• Стареещи уплътнения</li>
                        <li>• Запушени улуци</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                {/* Вътрешни линкове */}
                <h2 className="text-2xl font-bold text-foreground mt-12 mb-6">
                  Свързани услуги
                </h2>
                <div className="bg-secondary/30 rounded-xl p-6 my-8 border border-border/30">
                  <div className="grid md:grid-cols-2 gap-3">
                    <Link to="/bg/remont-na-pokrivi" className="text-primary hover:underline flex items-center gap-2">→ Ремонт на покриви</Link>
                    <Link to="/bg/remont-na-techove-pokriv" className="text-primary hover:underline flex items-center gap-2">→ Ремонт на течове</Link>
                    <Link to="/bg/remont-na-keremideni-pokrivi" className="text-primary hover:underline flex items-center gap-2">→ Смяна на керемиди</Link>
                    <Link to="/bg/hidroizolacia-na-pokriv" className="text-primary hover:underline flex items-center gap-2">→ Хидроизолация на покрив</Link>
                    <Link to="/bg/poddruzhka-na-pokrivi" className="text-primary hover:underline flex items-center gap-2">→ Поддръжка на покриви</Link>
                    <Link to="/bg/bezplaten-ogled" className="text-primary hover:underline flex items-center gap-2">→ Безплатен оглед</Link>
                  </div>
                </div>

                {/* FAQ */}
                <h2 className="text-2xl font-bold text-foreground mt-12 mb-6">
                  Често задавани въпроси
                </h2>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="faq-1"><AccordionTrigger>Как да разбера, че покривът ми се нуждае от ремонт?</AccordionTrigger><AccordionContent>Основните признаци са: петна от влага на тавана, липсващи или счупени керемиди, провисване на покривната конструкция, мухъл и мос по повърхността, и необяснимо увеличени сметки за отопление. При наличие на поне един от тези признаци е необходим професионален оглед.</AccordionContent></AccordionItem>
                  <AccordionItem value="faq-2"><AccordionTrigger>Колко струва спешен ремонт на покрив?</AccordionTrigger><AccordionContent>Спешен ремонт на единичен теч струва 150-400 EUR. Смяна на 10-20 счупени керемиди: 200-600 EUR. Ремонт на провиснала конструкция: 1,000-5,000 EUR в зависимост от обхвата.</AccordionContent></AccordionItem>
                  <AccordionItem value="faq-3"><AccordionTrigger>Може ли теч от покрива да се поправи сам?</AccordionTrigger><AccordionContent>Временна мярка при активен теч е да поставите кофа и да покриете засегнатата зона с найлон отвън. Но постоянен ремонт изисква професионалист — неправилно уплътняване може да влоши проблема.</AccordionContent></AccordionItem>
                  <AccordionItem value="faq-4"><AccordionTrigger>Колко бързо трябва да реагирам при теч?</AccordionTrigger><AccordionContent>При активен теч реагирайте незабавно. Всеки ден забавяне увеличава щетите — водата може да повреди изолацията, електрическата инсталация и тавана. Ние предлагаме спешен оглед до 24 часа.</AccordionContent></AccordionItem>
                  <AccordionItem value="faq-5"><AccordionTrigger>Какво причинява провисване на покрива?</AccordionTrigger><AccordionContent>Провисването се причинява от: дългогодишно натрупване на влага и гниене на гредите, прекомерно тегло от сняг, недостатъчно размерена конструкция, или термити и дървояди. Провиснал покрив е потенциално опасен.</AccordionContent></AccordionItem>
                  <AccordionItem value="faq-6"><AccordionTrigger>На колко години трябва да се ремонтира покрив?</AccordionTrigger><AccordionContent>Керемиден покрив издържа 40-60 години, но керемидите може да се нуждаят от частична смяна на 15-20 години. Битумна хидроизолация: 10-15 години. PVC мембрана: 20-30 години. Метален покрив: 30-50 години.</AccordionContent></AccordionItem>
                  <AccordionItem value="faq-7"><AccordionTrigger>Давате ли гаранция за ремонта?</AccordionTrigger><AccordionContent>Да, предоставяме 15 години гаранция за всички покривни ремонти. Гаранцията покрива материали и труд. Използваме материали от Bramac, Tondach, Wienerberger, Sika и Ceresit.</AccordionContent></AccordionItem>
                </Accordion>

              </div>

              {/* CTA */}
              <div className="bg-primary/10 rounded-xl p-8 my-12 text-center">
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  Забелязахте някой от тези признаци?
                </h3>
                <p className="text-foreground/80 mb-6">
                  Не чакайте проблемът да се задълбочи. Заявете безплатен оглед до 24 часа и получете точна оценка и оферта за вашия покрив.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/bg/bezplaten-ogled">
                    <Button size="lg" className="w-full sm:w-auto text-lg px-8 py-6">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Заяви безплатен оглед
                    </Button>
                  </Link>
                  <a href="tel:+359884997659">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg px-8 py-6">
                      <Phone className="w-5 h-5 mr-2" />
                      Обади се: 088 499 7659
                    </Button>
                  </a>
                </div>
              </div>

              {/* Tags & Back */}
              <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-border">
                <span className="text-muted-foreground mr-2">Тагове:</span>
                {["ремонт на покрив", "течове", "керемиди", "диагностика", "Варна"].map((tag) => (
                  <Badge key={tag} variant="outline" className="flex items-center gap-1"><Tag className="w-3 h-3" />{tag}</Badge>
                ))}
              </div>
              <div className="mt-8">
                <Link to="/bg/blog" className="inline-flex items-center gap-2 text-primary hover:underline">
                  <ArrowLeft className="w-4 h-4" />Обратно към блога
                </Link>
              </div>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default RoofRepairSigns;
