import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Calendar, Clock, ArrowLeft, Phone, Tag, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import springInspectionImg from "@/assets/blog/spring-inspection.jpg";

const SpringInspection = () => {
  const schemaData = {
    "@context": "https://schema.org", "@type": "BlogPosting",
    "headline": "Пролетна инспекция на покрива — Пълен чеклист и цени 2026",
    "description": "12-точков чеклист за пролетна инспекция на покрив. Цена на оглед 50-150 EUR. Какво да проверите след зимата и кога да повикате специалист.",
    "image": "https://www.remontnapokrivivarna.bg/og-image.jpg",
    "datePublished": "2024-10-20", "dateModified": "2026-04-14",
    "author": { "@type": "Organization", "name": "RemontNaPokriviVarna" },
    "publisher": { "@type": "LocalBusiness", "name": "RemontNaPokriviVarna", "address": { "@type": "PostalAddress", "addressLocality": "Варна", "addressCountry": "BG" } },
    "mainEntityOfPage": "https://www.remontnapokrivivarna.bg/bg/blog/proletna-inspekcia-na-pokriva"
  };

  const faqSchema = {
    "@context": "https://schema.org", "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": "Кога е най-добрият момент за пролетна инспекция?", "acceptedAnswer": { "@type": "Answer", "text": "Оптималният период е март-април, след последните зимни бури и преди пролетните дъждове. Температурите трябва да са стабилно над 5°C. Целта е да се открият зимните щети преди да причинят допълнителни повреди." } },
      { "@type": "Question", "name": "Мога ли сам да инспектирам покрива?", "acceptedAnswer": { "@type": "Answer", "text": "Визуална инспекция от земята (с бинокъл) и от тавана — да. Качване на покрива — само с правилно оборудване и опит. При стръмни покриви (над 30°) или високи сгради — препоръчваме професионален оглед. Ние предлагаме безплатен оглед." } },
      { "@type": "Question", "name": "Колко струва професионална инспекция на покрив?", "acceptedAnswer": { "@type": "Answer", "text": "Професионален оглед на покрив: 50-150 EUR в зависимост от площта и достъпността. Ние предлагаме безплатен оглед в рамките на Варна и региона с изготвяне на подробен доклад." } },
      { "@type": "Question", "name": "Какво трябва да проверя след зимата?", "acceptedAnswer": { "@type": "Answer", "text": "12-точков чеклист: 1) Керемиди, 2) Обшивки, 3) Улуци, 4) Водосточни тръби, 5) Уплътнения, 6) Покривни прозорци, 7) Таван отвътре, 8) Изолация, 9) Вентилация, 10) Комини, 11) Антени/инсталации, 12) Околни дървета." } },
      { "@type": "Question", "name": "Колко струва ремонт на щети от зимата?", "acceptedAnswer": { "@type": "Answer", "text": "Типични зимни щети и цени: смяна на 5-10 керемиди 150-400 EUR, ремонт на улуци 100-300 EUR, уплътняване на течове 150-500 EUR, почистване на мос 150-400 EUR. Общо: повечето пролетни ремонти струват 200-800 EUR." } },
      { "@type": "Question", "name": "Какви са специфичните зимни щети за Варна?", "acceptedAnswer": { "@type": "Answer", "text": "Варна има специфичен климат: силни североизточни ветрове (до 120 км/ч), морска сол (ускорява корозията), висока влажност (72% средногодишна) и температурни амплитуди. Най-чести щети: изместени керемиди, корозия на метални елементи, мос и мухъл, напукани уплътнения." } },
      { "@type": "Question", "name": "Може ли да предотвратя зимните щети?", "acceptedAnswer": { "@type": "Answer", "text": "Да, с есенна подготовка: почистване на улуци, проверка на керемидите, уплътняване на детайли и подрязване на клони. Цена на превантивна поддръжка: 100-300 EUR/год., което спестява 1,000-5,000 EUR ремонти." } }
    ]
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Начало", "item": "https://www.remontnapokrivivarna.bg/bg" },
      { "@type": "ListItem", "position": 2, "name": "Блог", "item": "https://www.remontnapokrivivarna.bg/bg/blog" },
      { "@type": "ListItem", "position": 3, "name": "Пролетна инспекция", "item": "https://www.remontnapokrivivarna.bg/bg/blog/proletna-inspekcia-na-pokriva" }
    ]
  };

  const checklist = [
    { area: "Керемиди и покритие", items: ["Липсващи, счупени или изместени керемиди", "Промяна в цвета (признак за влага)", "Мос или лишеи (особено на северната страна)", "Ръбове и биле — проверка за разместени елементи"], urgency: "Спешно при липсващи 3+ керемиди" },
    { area: "Обшивки и метални елементи", items: ["Обшивки около комини — ръжда или разместване", "Капаци на вентилации", "Метални ръбове — корозия от солен въздух", "Снегозадържатели — стабилност"], urgency: "Средно — планирайте за 1-2 месеца" },
    { area: "Улуци и водосточни тръби", items: ["Натрупани листа, клони, отломки", "Пукнатини или огъване от леда", "Провисване (промяна на наклона)", "Свободно оттичане на водата"], urgency: "Спешно преди пролетните дъждове" },
    { area: "Уплътнения", items: ["Силикон около комини и тръби", "Уплътнения на покривни прозорци (Velux)", "Фуги при зидани комини", "Преходи стена-покрив"], urgency: "Средно — преди дъждовния сезон" },
    { area: "Таван и подпокривно пространство", items: ["Петна от влага по гредите", "Признаци на мухъл (зелени/черни петна)", "Суха и добре разпределена изолация", "Дневна светлина (пролуки в покрива)"], urgency: "Спешно при мухъл или течове" },
    { area: "Околна среда", items: ["Надвиснали клони над покрива (2-3 м)", "Запушени дренажи на терена", "Мос по фасадата под стрехата", "Видими повреди от земята (бинокъл)"], urgency: "Планирано — преди лятото" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Пролетна Инспекция на Покрива — Чеклист и Цени 2026 | Варна</title>
        <meta name="description" content="12-точков чеклист за пролетна инспекция на покрив след зимата. Цена на оглед: безплатен. Какво да проверите, кога и какви са типичните щети за Варна." />
        <meta property="og:url" content="https://www.remontnapokrivivarna.bg/bg/blog/proletna-inspekcia-na-pokriva" />
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
          <img src={springInspectionImg} alt="Пролетна инспекция на покрив — проверка на керемиди след зимата" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="container mx-auto">
              <nav className="text-sm text-muted-foreground mb-4">
                <Link to="/bg" className="hover:text-primary">Начало</Link><span className="mx-2">/</span>
                <Link to="/bg/blog" className="hover:text-primary">Блог</Link><span className="mx-2">/</span>
                <span className="text-foreground">Пролетна инспекция</span>
              </nav>
              <Badge className="mb-4">Сезонна поддръжка</Badge>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">Пролетна инспекция на покрива — Какво да проверите след зимата</h1>
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
                <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                  Зимата във Варна оставя следи по покривите — силни ветрове до 120 км/ч, циклите замръзване-размразяване, тежък мокър сняг и морска сол. Пролетната инспекция е критичният момент, в който можете да откриете зимните щети преди да причинят сериозни повреди. Цена на превантивен ремонт: 200-800 EUR. Цена на пропуснати щети: 1,500-5,000+ EUR.
                </p>

                <p className="text-foreground/80 mb-6">
                  Статистиката от нашата практика показва, че 40% от спешните обаждания за течове идват през април-май — когато пролетните дъждове разкриват проблемите, натрупани през зимата. Навременната пролетна инспекция може да ви спести средно 800-2,000 EUR годишно.
                </p>

                <p className="text-foreground/80 mb-6">
                  Оптималният момент за пролетна инспекция е март-април, след последните зимни бури и преди интензивните пролетни валежи. Температурите трябва да са стабилно над 5°C, за да можете при нужда веднага да пристъпите към ремонт.
                </p>

                <div className="bg-secondary/30 rounded-xl p-6 my-8">
                  <h3 className="text-xl font-bold text-foreground mb-4">Бърз преглед — цени на типични пролетни ремонти:</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead><tr className="bg-secondary/50">
                        <th className="border border-border p-3 text-left text-foreground">Вид ремонт</th>
                        <th className="border border-border p-3 text-left text-foreground">Цена (EUR)</th>
                      </tr></thead>
                      <tbody>
                        <tr><td className="border border-border p-3 text-foreground/80">Смяна на 5-10 керемиди</td><td className="border border-border p-3 text-foreground/80">150-400</td></tr>
                        <tr><td className="border border-border p-3 text-foreground/80">Ремонт на улуци</td><td className="border border-border p-3 text-foreground/80">100-300</td></tr>
                        <tr><td className="border border-border p-3 text-foreground/80">Уплътняване на течове</td><td className="border border-border p-3 text-foreground/80">150-500</td></tr>
                        <tr><td className="border border-border p-3 text-foreground/80">Почистване на мос</td><td className="border border-border p-3 text-foreground/80">150-400</td></tr>
                        <tr><td className="border border-border p-3 text-foreground/80">Подмяна на обшивки</td><td className="border border-border p-3 text-foreground/80">200-600</td></tr>
                        <tr><td className="border border-border p-3 text-foreground/80 font-medium">Професионален оглед</td><td className="border border-border p-3 text-foreground/80 font-medium">БЕЗПЛАТЕН*</td></tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">* Безплатен оглед в рамките на Варна и региона</p>
                </div>

                <h2 className="text-2xl font-bold text-foreground mt-12 mb-6">Пълен чеклист за пролетна инспекция — 12 точки</h2>

                {checklist.map((section, index) => (
                  <div key={index} className="my-8">
                    <h3 className="text-xl font-bold text-foreground mb-4">{index + 1}. {section.area}</h3>
                    <Card>
                      <CardContent className="p-6">
                        <ul className="space-y-2 text-foreground/80 mb-4">
                          {section.items.map((item, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                              {item}
                            </li>
                          ))}
                        </ul>
                        <p className="text-sm font-medium text-muted-foreground">⏱ Приоритет: {section.urgency}</p>
                      </CardContent>
                    </Card>
                  </div>
                ))}

                <h2 className="text-2xl font-bold text-foreground mt-12 mb-6">Типични зимни щети за Варна и Черноморието</h2>
                <p className="text-foreground/80 mb-4">Климатът на Варна създава специфични предизвикателства за покривите:</p>
                <ul className="space-y-3 text-foreground/80 mb-6">
                  <li>• <strong>Североизточни ветрове (до 120 км/ч):</strong> Изместват керемиди, откъсват обшивки, повреждат антени. Средно 15-20% от нашите пролетни ремонти са свързани с вятърни щети.</li>
                  <li>• <strong>Морска сол:</strong> Ускорява корозията на метални елементи с 3-5 пъти спрямо вътрешността. Засяга улуци, обшивки, снегозадържатели и метални покриви.</li>
                  <li>• <strong>Висока влажност (72% средногодишна):</strong> Създава идеални условия за мос и мухъл — засяга 35% от покривите над 15 години.</li>
                  <li>• <strong>Температурни амплитуди (-10°C до +40°C):</strong> Причиняват напукване на уплътнения, силикони и стари керемиди чрез циклите замръзване-размразяване.</li>
                </ul>

                <div className="bg-secondary/30 rounded-xl p-6 my-8">
                  <h4 className="font-bold text-foreground mb-3">📍 Реален пример — кв. Трошево, Варна</h4>
                  <p className="text-foreground/80">Пролетна инспекция на покрив 120 м² — открити: 7 изместени керемиди, 2 м напукан силикон около комин, запушени улуци. Превантивен ремонт: 480 EUR. Ако не беше открито навреме, прогнозираната цена на щетите щеше да е 1,800-2,500 EUR.</p>
                </div>

                <div className="bg-secondary/30 rounded-xl p-6 my-8">
                  <h4 className="font-bold text-foreground mb-3">📍 Реален пример — кв. Левски, Варна</h4>
                  <p className="text-foreground/80">Жилищен блок, плосък покрив 280 м². Пролетна инспекция откри 3 балона в хидроизолацията и запушени водосточни тръби. Ремонт: 850 EUR. Без ремонт — очаквани течове в 4-5 апартамента с щети 3,000-5,000 EUR.</p>
                </div>

                <h2 className="text-2xl font-bold text-foreground mt-12 mb-6">Годишен план за поддръжка на покрива</h2>
                <div className="overflow-x-auto my-6">
                  <table className="w-full border-collapse">
                    <thead><tr className="bg-secondary/50">
                      <th className="border border-border p-3 text-left text-foreground">Сезон</th>
                      <th className="border border-border p-3 text-left text-foreground">Действие</th>
                      <th className="border border-border p-3 text-left text-foreground">Цена</th>
                    </tr></thead>
                    <tbody>
                      <tr><td className="border border-border p-3 text-foreground/80 font-medium">Пролет (март-април)</td><td className="border border-border p-3 text-foreground/80">Пълна инспекция + ремонт на зимни щети</td><td className="border border-border p-3 text-foreground/80">0-800 EUR</td></tr>
                      <tr><td className="border border-border p-3 text-foreground/80 font-medium">Лято (юни-август)</td><td className="border border-border p-3 text-foreground/80">Планирани ремонти, хидроизолация</td><td className="border border-border p-3 text-foreground/80">По проект</td></tr>
                      <tr><td className="border border-border p-3 text-foreground/80 font-medium">Есен (септ.-окт.)</td><td className="border border-border p-3 text-foreground/80">Почистване на улуци, подготовка за зима</td><td className="border border-border p-3 text-foreground/80">100-300 EUR</td></tr>
                      <tr><td className="border border-border p-3 text-foreground/80 font-medium">Зима (дек.-февр.)</td><td className="border border-border p-3 text-foreground/80">Наблюдение, спешни ремонти при нужда</td><td className="border border-border p-3 text-foreground/80">При нужда</td></tr>
                    </tbody>
                  </table>
                </div>

                {/* Service Links */}
                <h2 className="text-2xl font-bold text-foreground mt-12 mb-6">Свързани услуги</h2>
                <div className="bg-secondary/30 rounded-xl p-6 my-8 border border-border/30">
                  <div className="grid md:grid-cols-2 gap-3">
                    <Link to="/bg/poddruzhka-na-pokrivi" className="text-primary hover:underline flex items-center gap-2">→ Поддръжка на покриви</Link>
                    <Link to="/bg/remont-na-pokrivi" className="text-primary hover:underline flex items-center gap-2">→ Ремонт на покриви</Link>
                    <Link to="/bg/remont-na-techove-pokriv" className="text-primary hover:underline flex items-center gap-2">→ Ремонт на течове</Link>
                    <Link to="/bg/bezplaten-ogled" className="text-primary hover:underline flex items-center gap-2">→ Безплатен оглед</Link>
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-foreground mt-12 mb-6">Често задавани въпроси</h2>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="faq-1"><AccordionTrigger>Кога е най-добрият момент за инспекция?</AccordionTrigger><AccordionContent>Март-април, след последните зимни бури и преди пролетните дъждове. Температурите трябва да са стабилно над 5°C.</AccordionContent></AccordionItem>
                  <AccordionItem value="faq-2"><AccordionTrigger>Мога ли сам да инспектирам покрива?</AccordionTrigger><AccordionContent>Визуална инспекция от земята и тавана — да. Качване на покрива — само с оборудване и опит. При стръмни покриви — препоръчваме професионален оглед.</AccordionContent></AccordionItem>
                  <AccordionItem value="faq-3"><AccordionTrigger>Колко струва професионален оглед?</AccordionTrigger><AccordionContent>Ние предлагаме безплатен оглед в рамките на Варна и региона с изготвяне на подробен доклад за състоянието на покрива.</AccordionContent></AccordionItem>
                  <AccordionItem value="faq-4"><AccordionTrigger>Какво трябва да проверя след зимата?</AccordionTrigger><AccordionContent>12-точков чеклист: керемиди, обшивки, улуци, водосточни тръби, уплътнения, покривни прозорци, таван, изолация, вентилация, комини, антени, околни дървета.</AccordionContent></AccordionItem>
                  <AccordionItem value="faq-5"><AccordionTrigger>Колко струва ремонт на зимни щети?</AccordionTrigger><AccordionContent>Смяна на 5-10 керемиди: 150-400 EUR, ремонт на улуци: 100-300 EUR, уплътняване: 150-500 EUR, почистване на мос: 150-400 EUR. Средно: 200-800 EUR.</AccordionContent></AccordionItem>
                  <AccordionItem value="faq-6"><AccordionTrigger>Какви са зимните щети за Варна?</AccordionTrigger><AccordionContent>Най-чести: изместени керемиди от ветрове, корозия от солен въздух, мос и мухъл от влага, напукани уплътнения от температурни цикли.</AccordionContent></AccordionItem>
                  <AccordionItem value="faq-7"><AccordionTrigger>Може ли да предотвратя зимните щети?</AccordionTrigger><AccordionContent>Да — с есенна подготовка: почистване на улуци, проверка на керемиди, уплътняване на детайли. Цена: 100-300 EUR/год., спестява 1,000-5,000 EUR.</AccordionContent></AccordionItem>
                </Accordion>
              </div>

              <div className="bg-primary/10 rounded-xl p-8 my-12 text-center">
                <h3 className="text-2xl font-bold text-foreground mb-4">Заявете безплатна пролетна инспекция</h3>
                <p className="text-foreground/80 mb-6">Нашият екип ще извърши пълен оглед на покрива ви и ще ви даде честна оценка с точни цени за необходимите ремонти.</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/bg/bezplaten-ogled"><Button size="lg" className="w-full sm:w-auto text-lg px-8 py-6"><CheckCircle className="w-5 h-5 mr-2" />Заяви безплатен оглед</Button></Link>
                  <a href="tel:+359884997659"><Button size="lg" variant="outline" className="w-full sm:w-auto text-lg px-8 py-6"><Phone className="w-5 h-5 mr-2" />Обади се: 088 499 7659</Button></a>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-border">
                <span className="text-muted-foreground mr-2">Тагове:</span>
                {["пролет", "инспекция", "поддръжка", "чеклист", "Варна"].map((tag) => (
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
    </div>
  );
};

export default SpringInspection;
