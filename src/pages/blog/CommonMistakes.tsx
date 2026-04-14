import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCallButton from "@/components/FloatingCallButton";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Calendar, Clock, ArrowLeft, Phone, Tag, XCircle, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import commonMistakesImg from "@/assets/blog/common-mistakes.jpg";

const CommonMistakes = () => {
  const schemaData = {
    "@context": "https://schema.org", "@type": "BlogPosting",
    "headline": "10 грешки при ремонт на покрив — Как да ги избегнете и спестите 500-3,000 EUR",
    "description": "10 скъпи грешки при покривни ремонти и как да ги избегнете. Реални примери от Варна, ценови последици и професионални съвети.",
    "image": "https://www.remontnapokrivivarna.bg/og-image.jpg",
    "datePublished": "2024-10-05", "dateModified": "2026-04-14",
    "author": { "@type": "Organization", "name": "RemontNaPokriviVarna" },
    "publisher": { "@type": "LocalBusiness", "name": "RemontNaPokriviVarna", "address": { "@type": "PostalAddress", "addressLocality": "Варна", "addressCountry": "BG" } },
    "mainEntityOfPage": "https://www.remontnapokrivivarna.bg/bg/blog/greshki-pri-remont-na-pokriv"
  };

  const faqSchema = {
    "@context": "https://schema.org", "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": "Каква е най-честата грешка при ремонт на покрив?", "acceptedAnswer": { "@type": "Answer", "text": "Най-честата грешка е полагане на нова хидроизолация върху стара без подготовка. Това води до балони, лошо залепване и повторни течове в рамките на 1-3 години. Правилният подход е отстраняване или грундиране на старата повърхност." } },
      { "@type": "Question", "name": "Колко по-скъпо излиза грешен ремонт?", "acceptedAnswer": { "@type": "Answer", "text": "Грешният ремонт обикновено струва 2-3 пъти повече от правилния. Например: некачествена хидроизолация за 500 EUR + повторен ремонт за 800 EUR = 1,300 EUR, вместо еднократен качествен ремонт за 700 EUR." } },
      { "@type": "Question", "name": "Как да избера надежден майстор за покрив?", "acceptedAnswer": { "@type": "Answer", "text": "Проверете: 1) Портфолио от минимум 20 проекта, 2) Писмен договор с ясни условия, 3) Застраховка, 4) Гаранция минимум 5 години, 5) Реални отзиви от клиенти. Избягвайте оферти, които са 30%+ по-ниски от средните." } },
      { "@type": "Question", "name": "Може ли да се ремонтира покрив при дъжд?", "acceptedAnswer": { "@type": "Answer", "text": "Спешни мерки (временно покриване с найлон) могат да се предприемат при дъжд. Но качествен ремонт — полагане на хидроизолация, смяна на керемиди — изисква сухо време и температура над 5°C. Работа при влага компрометира залепването." } },
      { "@type": "Question", "name": "Трябва ли договор за ремонт на покрив?", "acceptedAnswer": { "@type": "Answer", "text": "Абсолютно да. Договорът трябва да съдържа: обхват на работата, материали с марки и количества, цена (фиксирана или максимална), срок за изпълнение, гаранционни условия, условия за плащане." } },
      { "@type": "Question", "name": "Какви материали да НЕ купувам за покрив?", "acceptedAnswer": { "@type": "Answer", "text": "Избягвайте: хидроизолация без марка или с неизвестен производител, керемиди от нерегламентирани вносители, най-евтините силикони и лепила. Спестените 100-200 EUR от евтини материали водят до 500-2,000 EUR допълнителни разходи за повторен ремонт." } },
      { "@type": "Question", "name": "Колко струва ремонт на покрив във Варна?", "acceptedAnswer": { "@type": "Answer", "text": "Средни цени за 2026: частичен ремонт 150-800 EUR, подмяна на керемиди 20-35 EUR/м², хидроизолация 8-25 EUR/м², пълна подмяна на покрив 25-50 EUR/м². Безплатен оглед и точна оферта — обадете се на 088 499 7659." } }
    ]
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Начало", "item": "https://www.remontnapokrivivarna.bg/bg" },
      { "@type": "ListItem", "position": 2, "name": "Блог", "item": "https://www.remontnapokrivivarna.bg/bg/blog" },
      { "@type": "ListItem", "position": 3, "name": "Грешки при ремонт", "item": "https://www.remontnapokrivivarna.bg/bg/blog/greshki-pri-remont-na-pokriv" }
    ]
  };

  const mistakes = [
    { title: "Полагане на нова хидроизолация върху стара без подготовка", problem: "Много собственици и дори някои майстори полагат нова хидроизолация директно върху стара повредена мембрана. Резултатът: балони, лошо залепване и повторни течове за 1-3 години. Старата влажна мембрана задържа вода между слоевете.", fix: "Старата хидроизолация се отстранява или поне се подготвя с грунд. Повърхността трябва да е суха, чиста и равна.", cost: "Допълнителни 300-800 EUR за повторен ремонт" },
    { title: "Пренебрегване на детайлите (комини, вентилации, ръбове)", problem: "80% от течовете се случват на детайли — около комини, вентилационни тръби, покривни прозорци и ръбове. Много майстори бързат с тези критични точки или ги правят формално.", fix: "Специално внимание на всички детайли с качествени уплътнители. Използване на формовани елементи и двойно уплътняване.", cost: "Теч от детайл: 200-600 EUR за ремонт" },
    { title: "Използване на евтини материали без марка", problem: "Икономията от евтини материали е илюзорна. Хидроизолация без марка може да се повреди за 2-3 години. Евтин силикон се свива и напуква за 1-2 години. Евтини керемиди се чупят при замръзване.", fix: "Изберете материали от доказани производители: Sika, Ceresit за хидроизолация; Bramac, Tondach за керемиди; Rockwool за изолация.", cost: "Спестени 100-200 EUR → допълнителни 500-2,000 EUR" },
    { title: "Работа при неподходящо време (дъжд, студ)", problem: "Полагане на хидроизолация при влажна повърхност или под 5°C компрометира залепването. Битумната мембрана не залепва правилно при студ. Течната хидроизолация не полимеризира при влага.", fix: "Планирайте ремонта за сухо време с температури над 5°C (за битум — над 10°C). Проверете прогнозата за 48 часа напред.", cost: "Повторен ремонт: 400-1,200 EUR" },
    { title: "Липса на вентилация в подпокривното пространство", problem: "Запечатване на всички отвори може да изглежда логично, но води до натрупване на кондензация. Влагата гние дървената конструкция отвътре — невидимо, докато не стане твърде късно.", fix: "Осигурете правилна вентилация с входящи отвори (при стрехата) и изходящи (при билото). Минимум 1/300 от площта на покрива.", cost: "Ремонт на изгнила конструкция: 1,000-5,000 EUR" },
    { title: "Неправилен наклон при плоски покриви", problem: "Плоските покриви трябва да имат минимален наклон 1-2% за отводняване. При нулев наклон водата се задържа, образува локви и ускорява разрушаването на хидроизолацията.", fix: "При ремонт на плосък покрив винаги проверете и коригирайте наклона с лека бетонна замазка (минимум 1.5%).", cost: "Корекция на наклон: 8-15 EUR/м²" },
    { title: "Пропускане на пароизолацията", problem: "Пароизолацията предпазва топлоизолацията от влага отвътре. Без нея топлият влажен въздух от помещенията прониква в изолацията, кондензира и я намокря — изолацията губи 50-70% от ефективността си.", fix: "Винаги поставяйте пароизолационно фолио от топлата страна (вътрешната) на изолацията. Залепете всички преходи и пробиви.", cost: "Подмяна на намокрена изолация: 15-25 EUR/м²" },
    { title: "Избор на майстор само по цена", problem: "Най-евтината оферта рядко означава най-добрата стойност. Нискобюджетни екипи често спестяват от материали, пропускат детайли и не предоставят реална гаранция.", fix: "Сравнявайте не само цени, а и: опит (години + портфолио), материали (марки), гаранция (в писмен договор), отзиви от клиенти.", cost: "Повторен ремонт след лош: 500-3,000 EUR" },
    { title: 'Ремонт "на парче" вместо цялостно решение', problem: "Постоянното кръпене на отделни течове без адресиране на основния проблем е скъпо и неефективно. Ако покривът има 3+ течове на различни места, вероятно хидроизолацията е изчерпала ресурса си.", fix: "При множество течове направете пълна оценка. Ако хидроизолацията е над 12-15 години — планирайте пълна подмяна.", cost: "3-4 частични ремонта = 1,200-2,000 EUR vs. пълна подмяна 800-1,500 EUR" },
    { title: "Липса на писмен договор и гаранция", problem: "Устните договорки нямат правна сила. Без писмен договор нямате защита при дефекти, забавяне или промяна на цената. Без писмена гаранция не можете да рекламирате дефектна работа.", fix: "Винаги изисквайте писмен договор с: обхват, материали, цена, срок, гаранция, условия за плащане (не повече от 30% аванс).", cost: "Загуба при спор без договор: потенциално цялата сума" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>10 Грешки при Ремонт на Покрив — Как да ги Избегнете | Варна 2026</title>
        <meta name="description" content="10 скъпи грешки при покривни ремонти и как да ги избегнете. Спестете 500-3,000 EUR с правилен подход. Реални примери от Варна и професионални съвети." />
        <meta property="og:url" content="https://www.remontnapokrivivarna.bg/bg/blog/greshki-pri-remont-na-pokriv" />
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
          <img src={commonMistakesImg} alt="Грешки при покривни ремонти — неправилно положена хидроизолация" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="container mx-auto">
              <nav className="text-sm text-muted-foreground mb-4">
                <Link to="/bg" className="hover:text-primary">Начало</Link><span className="mx-2">/</span>
                <Link to="/bg/blog" className="hover:text-primary">Блог</Link><span className="mx-2">/</span>
                <span className="text-foreground">Грешки при ремонт</span>
              </nav>
              <Badge className="mb-4">Ремонт</Badge>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">10 грешки при ремонт на покрив и как да ги избегнете</h1>
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
                  Покривните ремонти могат да бъдат скъпи, но грешките при тях струват 2-3 пъти повече. В нашата практика от над 15 години във Варна сме видели стотици случаи на некачествени ремонти, които са причинили повече щети, отколкото са поправили. В тази статия споделяме 10-те най-чести грешки — всяка с реално описание, ценови последици и правилно решение.
                </p>

                <p className="text-foreground/80 mb-6">
                  Средната цена за ремонт на покрив във Варна е 15-45 EUR/м². Но ако ремонтът е направен неправилно, повторният ще струва 2-3 пъти повече — защото трябва първо да се отстрани некачествената работа, а после да се направи наново. Статистиката ни показва, че 30% от нашите клиенти идват след неуспешен ремонт от друг изпълнител.
                </p>

                <div className="space-y-8 my-12">
                  {mistakes.map((mistake, index) => (
                    <Card key={index} className="border-destructive/30">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="bg-destructive text-destructive-foreground rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg flex-shrink-0">
                            {index + 1}
                          </div>
                          <div>
                            <h2 className="text-xl font-bold text-foreground mb-3">Грешка #{index + 1}: {mistake.title}</h2>
                            <p className="text-foreground/80 mb-3">{mistake.problem}</p>
                            <p className="text-sm text-primary font-medium mb-2">✓ Правилният подход: {mistake.fix}</p>
                            <p className="text-sm text-destructive font-medium">💸 Цена на грешката: {mistake.cost}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <h2 className="text-2xl font-bold text-foreground mt-12 mb-6">Как да изберете надежден изпълнител — 7 критерия</h2>
                <ul className="space-y-3 text-foreground/80 mb-6">
                  <li>• <strong>Портфолио:</strong> Минимум 20 завършени проекта с реални снимки</li>
                  <li>• <strong>Договор:</strong> Писмен, с ясен обхват, цена и гаранция</li>
                  <li>• <strong>Застраховка:</strong> Гражданска отговорност и трудова злополука</li>
                  <li>• <strong>Гаранция:</strong> Минимум 5 години, в писмена форма</li>
                  <li>• <strong>Материали:</strong> Работа с марки (Sika, Bramac, Rockwool), не с „евтини аналози"</li>
                  <li>• <strong>Отзиви:</strong> Реални отзиви от клиенти (Google, Facebook)</li>
                  <li>• <strong>Цена:</strong> Избягвайте оферти 30%+ под средното — спестеното сега ще се плати двойно</li>
                </ul>

                {/* Service Links */}
                <h2 className="text-2xl font-bold text-foreground mt-12 mb-6">Свързани услуги</h2>
                <div className="bg-secondary/30 rounded-xl p-6 my-8 border border-border/30">
                  <div className="grid md:grid-cols-2 gap-3">
                    <Link to="/bg/remont-na-pokrivi" className="text-primary hover:underline flex items-center gap-2">→ Ремонт на покриви</Link>
                    <Link to="/bg/hidroizolacia-na-pokriv" className="text-primary hover:underline flex items-center gap-2">→ Хидроизолация</Link>
                    <Link to="/bg/remont-na-techove-pokriv" className="text-primary hover:underline flex items-center gap-2">→ Ремонт на течове</Link>
                    <Link to="/bg/remont-na-keremideni-pokrivi" className="text-primary hover:underline flex items-center gap-2">→ Смяна на керемиди</Link>
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-foreground mt-12 mb-6">Често задавани въпроси</h2>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="faq-1"><AccordionTrigger>Каква е най-честата грешка при ремонт на покрив?</AccordionTrigger><AccordionContent>Полагане на нова хидроизолация върху стара без подготовка. Води до балони, лошо залепване и повторни течове за 1-3 години.</AccordionContent></AccordionItem>
                  <AccordionItem value="faq-2"><AccordionTrigger>Колко по-скъпо излиза грешен ремонт?</AccordionTrigger><AccordionContent>Обикновено 2-3 пъти повече. Некачествен ремонт за 500 EUR + повторен за 800 EUR = 1,300 EUR, вместо еднократен качествен за 700 EUR.</AccordionContent></AccordionItem>
                  <AccordionItem value="faq-3"><AccordionTrigger>Как да избера надежден майстор?</AccordionTrigger><AccordionContent>Проверете: портфолио от 20+ проекта, писмен договор, застраховка, гаранция 5+ години, реални отзиви. Избягвайте оферти 30%+ под средното.</AccordionContent></AccordionItem>
                  <AccordionItem value="faq-4"><AccordionTrigger>Може ли да се ремонтира покрив при дъжд?</AccordionTrigger><AccordionContent>Спешни мерки — да. Качествен ремонт — не. Хидроизолацията изисква суха повърхност и температура над 5°C за правилно залепване.</AccordionContent></AccordionItem>
                  <AccordionItem value="faq-5"><AccordionTrigger>Трябва ли договор?</AccordionTrigger><AccordionContent>Абсолютно. Договорът трябва да съдържа: обхват, материали, цена, срок, гаранция, условия за плащане (не повече от 30% аванс).</AccordionContent></AccordionItem>
                  <AccordionItem value="faq-6"><AccordionTrigger>Какви материали да НЕ купувам?</AccordionTrigger><AccordionContent>Избягвайте хидроизолация без марка, керемиди от неизвестни вносители, най-евтините силикони. Спестените 100-200 EUR водят до 500-2,000 EUR повече.</AccordionContent></AccordionItem>
                  <AccordionItem value="faq-7"><AccordionTrigger>Колко струва ремонт на покрив във Варна?</AccordionTrigger><AccordionContent>Частичен ремонт: 150-800 EUR. Подмяна на керемиди: 20-35 EUR/м². Хидроизолация: 8-25 EUR/м². Пълна подмяна: 25-50 EUR/м².</AccordionContent></AccordionItem>
                </Accordion>
              </div>

              <div className="bg-primary/10 rounded-xl p-8 my-12 text-center">
                <h3 className="text-2xl font-bold text-foreground mb-4">Търсите надежден екип за ремонт?</h3>
                <p className="text-foreground/80 mb-6">Над 15 години опит, 15 години гаранция, безплатен оглед до 24 часа. Без компромиси с качеството.</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/bg/bezplaten-ogled"><Button size="lg" className="w-full sm:w-auto text-lg px-8 py-6"><CheckCircle className="w-5 h-5 mr-2" />Заяви безплатен оглед</Button></Link>
                  <a href="tel:+359884997659"><Button size="lg" variant="outline" className="w-full sm:w-auto text-lg px-8 py-6"><Phone className="w-5 h-5 mr-2" />Обади се: 088 499 7659</Button></a>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-border">
                <span className="text-muted-foreground mr-2">Тагове:</span>
                {["грешки", "ремонт", "съвети", "хидроизолация", "Варна"].map((tag) => (
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

export default CommonMistakes;
