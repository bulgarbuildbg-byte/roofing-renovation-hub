import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCallButton from "@/components/FloatingCallButton";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Calendar, Clock, ArrowLeft, Phone, Tag, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import coverImg from "@/assets/blog/roof-repair-cost.jpg";

const RoofRepairCostVarna = () => {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "Цена за ремонт на покрив във Варна 2026 — Пълен ценови наръчник",
    "description": "Актуални цени за ремонт на покриви във Варна за 2026. Колко струва ремонт на керемиден, метален и плосък покрив. Ценова таблица по видове дейности.",
    "image": "https://www.remontnapokrivivarna.bg/og-image.jpg",
    "datePublished": "2026-04-14",
    "dateModified": "2026-04-14",
    "author": { "@type": "Organization", "name": "RemontNaPokriviVarna" },
    "publisher": {
      "@type": "LocalBusiness",
      "name": "RemontNaPokriviVarna",
      "address": { "@type": "PostalAddress", "addressLocality": "Варна", "addressCountry": "BG" }
    },
    "mainEntityOfPage": "https://www.remontnapokrivivarna.bg/bg/blog/tsena-remont-pokriv-varna-2026"
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": "Колко струва ремонт на покрив във Варна?", "acceptedAnswer": { "@type": "Answer", "text": "Средната цена за ремонт на покрив във Варна през 2026 е между 15 и 45 EUR/м², в зависимост от вида на покрива, обхвата на повредите и използваните материали. Частичен ремонт на течове започва от 150-300 EUR, докато пълна подмяна на покривното покритие за 100 м² може да стигне 3,000-5,000 EUR." } },
      { "@type": "Question", "name": "Какво включва цената за ремонт на покрив?", "acceptedAnswer": { "@type": "Answer", "text": "Цената включва: оглед и диагностика, демонтаж на старото покритие, ремонт на дървената конструкция при нужда, полагане на хидроизолация, монтаж на ново покритие (керемиди, ламарина и т.н.), почистване и извозване на отпадъците." } },
      { "@type": "Question", "name": "Колко време отнема ремонт на покрив?", "acceptedAnswer": { "@type": "Answer", "text": "Частичен ремонт (до 20 м²) се завършва за 1-2 дни. Пълна подмяна на покрив от 80-120 м² отнема 5-10 работни дни в зависимост от сложността на конструкцията и метеорологичните условия." } },
      { "@type": "Question", "name": "Кога е най-добрият сезон за ремонт на покрив?", "acceptedAnswer": { "@type": "Answer", "text": "Оптималният период е от април до октомври, когато валежите са по-малко и температурите позволяват качествено полагане на хидроизолация. Спешни ремонти при течове се извършват целогодишно." } },
      { "@type": "Question", "name": "Давате ли гаранция за ремонт на покрив?", "acceptedAnswer": { "@type": "Answer", "text": "Да, предоставяме 15 години гаранция за всички покривни ремонти. Гаранцията покрива както материалите, така и труда. При редовна поддръжка покривът може да издържи 30-50 години." } },
      { "@type": "Question", "name": "Правите ли безплатен оглед преди ремонта?", "acceptedAnswer": { "@type": "Answer", "text": "Да, извършваме безплатен оглед до 24 часа в рамките на Варна и региона. На място оценяваме състоянието на покрива и изготвяме детайлна оферта с точни цени." } },
      { "@type": "Question", "name": "Какви материали използвате?", "acceptedAnswer": { "@type": "Answer", "text": "Работим с материали от водещи европейски марки — Bramac, Tondach, Wienerberger за керемиди, Sika и Ceresit за хидроизолация, Rockwool за топлоизолация. Всички материали са сертифицирани и с дълъг експлоатационен живот." } },
      { "@type": "Question", "name": "Може ли да се ремонтира покрив през зимата?", "acceptedAnswer": { "@type": "Answer", "text": "Спешни ремонти (течове, повредени от буря керемиди) извършваме целогодишно, включително през зимата. Основни ремонти и пълни подмени се планират за по-топлите месеци (април-октомври) за оптимално качество." } }
    ]
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Начало", "item": "https://www.remontnapokrivivarna.bg/bg" },
      { "@type": "ListItem", "position": 2, "name": "Блог", "item": "https://www.remontnapokrivivarna.bg/bg/blog" },
      { "@type": "ListItem", "position": 3, "name": "Цена за ремонт на покрив Варна 2026", "item": "https://www.remontnapokrivivarna.bg/bg/blog/tsena-remont-pokriv-varna-2026" }
    ]
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Цена за ремонт на покрив Варна 2026 — Пълен ценови наръчник</title>
        <meta name="description" content="Актуални цени за ремонт на покриви във Варна 2026. Керемиден покрив: 20-35 €/м², плосък: 15-25 €/м², метален: 18-30 €/м². Безплатен оглед до 24ч." />
        <meta property="og:title" content="Цена за ремонт на покрив Варна 2026 — Пълен ценови наръчник" />
        <meta property="og:description" content="Актуални цени за ремонт на покриви във Варна 2026. Таблица с цени по видове дейности." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://www.remontnapokrivivarna.bg/bg/blog/tsena-remont-pokriv-varna-2026" />
        <meta property="og:locale" content="bg_BG" />
        <meta property="article:published_time" content="2026-04-14" />
        <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <Header />

      <main className="pt-20">
        {/* Hero */}
        <section className="relative h-[50vh] min-h-[400px]">
          <img src={coverImg} alt="Ремонт на покрив във Варна — цени 2026" className="w-full h-full object-cover" width={1200} height={630} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="container mx-auto">
              <nav className="text-sm text-white/80 mb-4">
                <Link to="/bg" className="hover:text-white">Начало</Link>
                <span className="mx-2">/</span>
                <Link to="/bg/blog" className="hover:text-white">Блог</Link>
                <span className="mx-2">/</span>
                <span className="text-white">Цена за ремонт на покрив</span>
              </nav>
              <div className="flex items-center gap-3 mb-4">
                <Badge className="bg-primary text-primary-foreground">Цени</Badge>
                <span className="text-white/80 flex items-center gap-1 text-sm"><Calendar className="w-4 h-4" /> 14 април 2026</span>
                <span className="text-white/80 flex items-center gap-1 text-sm"><Clock className="w-4 h-4" /> 15 мин четене</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-white max-w-4xl">
                Цена за ремонт на покрив във Варна 2026 — Пълен ценови наръчник
              </h1>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <article className="py-12">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="prose prose-lg max-w-none">

              {/* Въведение */}
              <section className="mb-12">
                <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                  Средната цена за ремонт на покрив във Варна през 2026 година е между <strong>15 и 45 EUR на квадратен метър</strong>, в зависимост от типа на покрива, степента на повредите и избраните материали. Тази статия предоставя актуални пазарни цени за всички видове покривни дейности — от запечатване на единичен теч до пълна подмяна на покривното покритие.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Покривът е най-важната защитна система на всяка сграда. Във Варна, където морският климат, силните ветрове и валежите от дъжд и сняг създават допълнително натоварване, навременният ремонт на покрива не е лукс, а необходимост. Всяка година стотици домакинства във Варна и региона се сблъскват с проблеми — от малки течове до сериозни повреди на дървената конструкция, причинени от пренебрегвана поддръжка.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Най-честият въпрос, който получаваме от клиентите ни, е: <strong>„Колко ще струва ремонтът на моя покрив?"</strong>. Отговорът зависи от няколко ключови фактора — площ, наклон, достъпност, вид на покритието, състояние на конструкцията и необходимост от допълнителна хидроизолация или топлоизолация. В тази статия ще разгледаме всеки от тези фактори и ще ви дадем конкретни ценови рамки, за да можете да планирате бюджета си информирано.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Нашата фирма има над 15 години опит в покривните ремонти във Варна и Североизточна България. Работим с над 500 завършени обекта и предоставяме 15 години гаранция за всяка извършена работа. Цените, които ще видите по-долу, са базирани на реални оферти и завършени проекти от 2025-2026 година.
                </p>
              </section>

              {/* Ценови фактори */}
              <section className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Какво определя цената за ремонт на покрив?</h2>
                
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Цената за ремонт на покрив зависи от 7 основни фактора. Разбирането им ще ви помогне да оцените офертите, които получавате, и да избегнете неприятни изненади.
                </p>

                <h3 className="text-xl font-bold text-foreground mb-4">1. Площ на покрива (м²)</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Площта е основният фактор при ценообразуването. Средно жилище във Варна има покривна площ между 80 и 150 м². Колкото по-голяма е площта, толкова по-ниска е единичната цена на квадратен метър, тъй като мобилизацията на екипа и скелетата е фиксиран разход. За покрив от 50 м² цената може да бъде 35-45 EUR/м², докато за покрив от 200 м² — 18-25 EUR/м².
                </p>

                <h3 className="text-xl font-bold text-foreground mb-4">2. Вид на покривното покритие</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Различните материали имат различна цена за доставка и монтаж:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-6">
                  <li><strong>Керемиди (глинени)</strong> — най-популярният материал за наклонени покриви. Цена: 20-35 EUR/м² с монтаж.</li>
                  <li><strong>Бетонни керемиди</strong> — по-евтина алтернатива на глинените. Цена: 18-28 EUR/м².</li>
                  <li><strong>Метална ламарина (профилирана)</strong> — бърз монтаж, лек материал. Цена: 18-30 EUR/м².</li>
                  <li><strong>Битумни керемиди (шингли)</strong> — подходящи за сложни форми. Цена: 15-25 EUR/м².</li>
                  <li><strong>PVC/TPO мембрана (плосък покрив)</strong> — за плоски покриви и тераси. Цена: 15-25 EUR/м².</li>
                  <li><strong>Битумна хидроизолация</strong> — класическо решение за плоски покриви. Цена: 12-20 EUR/м².</li>
                </ul>

                <h3 className="text-xl font-bold text-foreground mb-4">3. Наклон и сложност на конструкцията</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Покрив с голям наклон (над 35°) изисква допълнителни мерки за безопасност — скеле, обезопасителни въжета и по-бавна работа. Това увеличава цената с 15-25%. Многоскатни покриви с чатми, долини и комини също са по-скъпи поради сложните водоотвеждащи детайли, които изискват прецизна хидроизолация.
                </p>

                <h3 className="text-xl font-bold text-foreground mb-4">4. Състояние на дървената конструкция</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Ако ремонтът включва само подмяна на покривното покритие, цената е значително по-ниска. Но ако дървената конструкция (мертеци, столици, летви) е гнила или повредена от влага, необходимо е частично или пълно укрепване. Подмяна на мертек струва 30-50 EUR/бр., а пълна реконструкция на дървената конструкция — допълнителни 25-40 EUR/м².
                </p>

                <h3 className="text-xl font-bold text-foreground mb-4">5. Необходимост от хидроизолация</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Качествената хидроизолационна мембрана под покривното покритие е задължителна за дълготраен резултат. Добавянето на паропропусклива мембрана (напр. Tyvek или Icopal) увеличава цената с 3-6 EUR/м², но предпазва от конденз и удължава живота на конструкцията с 20+ години.
                </p>

                <h3 className="text-xl font-bold text-foreground mb-4">6. Достъпност на обекта</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Сгради в тесни улици (Стария град, кв. Левски) или на висок етаж изискват специално скеле или кран, което добавя 500-2,000 EUR към общата цена. Еднофамилни къщи с лесен достъп имат минимални допълнителни разходи.
                </p>

                <h3 className="text-xl font-bold text-foreground mb-4">7. Сезонност</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  През зимните месеци (ноември-февруари) цените за спешни ремонти могат да бъдат 10-20% по-високи поради ограничените работни часове и лошите метеорологични условия. Планирайте основни ремонти за пролетта (април-юни) за оптимално съотношение цена/качество.
                </p>
              </section>

              {/* Ценова таблица */}
              <section className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Ценова таблица за 2026 — Варна и региона</h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Следната таблица показва ориентировъчните цени за най-търсените покривни услуги във Варна. Цените включват материали и труд, но не включват скеле (ако е необходимо).
                </p>

                <div className="overflow-x-auto mb-8">
                  <table className="w-full border-collapse border border-border rounded-lg">
                    <thead>
                      <tr className="bg-muted">
                        <th className="border border-border p-4 text-left font-bold text-foreground">Вид дейност</th>
                        <th className="border border-border p-4 text-center font-bold text-foreground">Мерна единица</th>
                        <th className="border border-border p-4 text-center font-bold text-foreground">Цена (EUR)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ["Ремонт на керемиден покрив (частичен)", "м²", "20 – 35"],
                        ["Пълна подмяна на керемиди", "м²", "25 – 40"],
                        ["Ремонт на плосък покрив (хидроизолация)", "м²", "15 – 25"],
                        ["Ремонт на метален покрив", "м²", "18 – 30"],
                        ["Подмяна на улуци", "л.м.", "8 – 15"],
                        ["Ремонт около комин/чатма", "бр.", "150 – 400"],
                        ["Подмяна на летви", "м²", "6 – 10"],
                        ["Подмяна на мертек", "бр.", "30 – 50"],
                        ["Полагане на хидроизолационна мембрана", "м²", "8 – 14"],
                        ["Монтаж на снегозадържатели", "л.м.", "12 – 20"],
                        ["Топлоизолация на покрив (минерална вата)", "м²", "15 – 25"],
                        ["Изграждане на нов покрив (пълен пакет)", "м²", "45 – 75"],
                        ["Спешен ремонт при теч (до 24ч)", "бр.", "150 – 500"],
                        ["Безплатен оглед и оферта", "—", "0"],
                      ].map(([service, unit, price], i) => (
                        <tr key={i} className={i % 2 === 0 ? "bg-background" : "bg-muted/50"}>
                          <td className="border border-border p-4 text-muted-foreground">{service}</td>
                          <td className="border border-border p-4 text-center text-muted-foreground">{unit}</td>
                          <td className="border border-border p-4 text-center font-semibold text-foreground">{price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
                  <p className="text-green-800 font-medium">
                    💡 <strong>Важно:</strong> Цените са ориентировъчни и могат да варират в зависимост от конкретния обект. За точна оферта е необходим безплатен оглед на място. Обадете се на <a href="tel:0884997659" className="underline font-bold">088 499 7659</a> за уговаряне.
                  </p>
                </div>
              </section>

              {/* Ценови примери */}
              <section className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Реални примери с цени от Варна</h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  За да ви помогнем да разберете какво да очаквате като крайна сума, представяме три реални проекта, завършени от нашия екип през 2025-2026 г.
                </p>

                <Card className="mb-6">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-foreground mb-2">Пример 1: Частичен ремонт на керемиден покрив — кв. Бриз, Варна</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>📐 <strong>Площ:</strong> 35 м² (частичен ремонт на южен скат)</li>
                      <li>🔧 <strong>Дейности:</strong> Подмяна на 120 счупени керемиди, ремонт на 3 мертека, нова хидроизолационна мембрана, почистване на улуци</li>
                      <li>⏱️ <strong>Продължителност:</strong> 3 дни</li>
                      <li>💰 <strong>Крайна цена:</strong> 1,280 EUR (вкл. материали и труд)</li>
                      <li>📊 <strong>Цена на м²:</strong> 36.50 EUR</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="mb-6">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-foreground mb-2">Пример 2: Пълна подмяна на покрив — с. Константиново</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>📐 <strong>Площ:</strong> 110 м² (двускатен покрив, еднофамилна къща)</li>
                      <li>🔧 <strong>Дейности:</strong> Демонтаж на стари керемиди, подмяна на летви и мембрана, монтаж на нови бетонни керемиди Bramac, нови улуци, снегозадържатели</li>
                      <li>⏱️ <strong>Продължителност:</strong> 7 дни</li>
                      <li>💰 <strong>Крайна цена:</strong> 3,150 EUR</li>
                      <li>📊 <strong>Цена на м²:</strong> 28.60 EUR</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="mb-6">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-foreground mb-2">Пример 3: Хидроизолация на плосък покрив — жилищен блок, кв. Чайка</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>📐 <strong>Площ:</strong> 240 м² (4-етажен жилищен блок)</li>
                      <li>🔧 <strong>Дейности:</strong> Премахване на стара битумна изолация, грундиране, полагане на двупластова APP битумна мембрана, обработка на борд и отводнители</li>
                      <li>⏱️ <strong>Продължителност:</strong> 5 дни</li>
                      <li>💰 <strong>Крайна цена:</strong> 4,320 EUR</li>
                      <li>📊 <strong>Цена на м²:</strong> 18 EUR</li>
                    </ul>
                  </CardContent>
                </Card>
              </section>

              {/* Видове ремонти */}
              <section className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Цени по видове покривни ремонти</h2>

                <h3 className="text-xl font-bold text-foreground mb-4">Ремонт на керемиден покрив</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Керемиденият покрив е най-разпространеният в жилищните сгради във Варна и околността. Ремонтът му включва подмяна на счупени или изместени керемиди, проверка и укрепване на летвената решетка, обработка на долини и ребра, почистване и ремонт на комини. Средната цена за частичен ремонт е <strong>20-35 EUR/м²</strong>, а за пълна подмяна на покритието — <strong>25-40 EUR/м²</strong>. Глинените керемиди (Tondach, Wienerberger) са с 15-20% по-скъпи от бетонните (Bramac), но имат по-дълъг живот — до 80-100 години при правилна поддръжка.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  <Link to="/bg/remont-na-keremideni-pokrivi" className="text-primary hover:underline font-medium">→ Вижте повече за смяна на керемиди</Link>
                </p>

                <h3 className="text-xl font-bold text-foreground mb-4">Ремонт на плосък покрив</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Плоските покриви на жилищни блокове, гаражи и търговски сгради изискват специализирана хидроизолация. Най-честият проблем е остаряла битумна изолация, която се напуква и пропуска вода. Ремонтът включва отстраняване на старото покритие, грундиране, полагане на нова битумна или PVC мембрана. Цена: <strong>15-25 EUR/м²</strong> в зависимост от материала и състоянието на основата.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  <Link to="/bg/remont-na-ploski-pokrivi" className="text-primary hover:underline font-medium">→ Повече за ремонт на плоски покриви</Link>
                </p>

                <h3 className="text-xl font-bold text-foreground mb-4">Ремонт на метален покрив</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Металните покриви (профилирана ламарина, трапецовиден лист, метални керемиди) са популярни за промишлени сгради и нови жилищни проекти. Ремонтът включва подмяна на корозирали листове, уплътняване на крепежни елементи, обработка с антикорозионна боя. Цена: <strong>18-30 EUR/м²</strong>. При леки повреди е достатъчно само уплътняване и боядисване — 8-15 EUR/м².
                </p>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  <Link to="/bg/metalni-pokrivi" className="text-primary hover:underline font-medium">→ Повече за метални покриви</Link>
                </p>

                <h3 className="text-xl font-bold text-foreground mb-4">Спешен ремонт при теч</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  При активен теч от покрива е необходима бърза реакция, за да се предотвратят щети по тавани, стени и електрическата инсталация. Нашият екип реагира до 24 часа. Цената за спешен ремонт зависи от причината — от <strong>150 EUR</strong> за запечатване на единичен теч до <strong>500+ EUR</strong> при по-сериозни повреди. Спешният ремонт обикновено е временно решение, последвано от планиран основен ремонт.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  <Link to="/bg/remont-na-techove-pokriv" className="text-primary hover:underline font-medium">→ Повече за ремонт на течове</Link>
                </p>
              </section>

              {/* Как да спестим */}
              <section className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Как да спестите от ремонта на покрива?</h2>
                
                <div className="space-y-4 mb-6">
                  {[
                    { title: "Планирайте предварително", text: "Избягвайте спешни ремонти, които са 15-20% по-скъпи. Редовната инспекция (1-2 пъти годишно) открива проблеми рано." },
                    { title: "Изберете правилния сезон", text: "Април-юни е оптималният период — по-ниско търсене и стабилно време. Август-септември също е добър вариант." },
                    { title: "Инвестирайте в качествени материали", text: "По-евтините материали спестяват днес, но водят до по-чести ремонти. Керемиди от Bramac/Tondach имат 30-годишна гаранция." },
                    { title: "Направете всичко наведнъж", text: "Ако покривът има множество проблеми, пълният ремонт е по-изгоден от поредица частични интервенции." },
                    { title: "Поискайте няколко оферти", text: "Сравнете поне 2-3 оферти, но внимавайте с прекалено ниски цени — често означават компромис с качеството или скрити разходи." }
                  ].map((tip, i) => (
                    <div key={i} className="flex gap-3">
                      <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-bold text-foreground">{tip.title}</h3>
                        <p className="text-muted-foreground">{tip.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Процесът */}
              <section className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Как протича ремонтът на покрив — стъпка по стъпка</h2>
                
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Разбирането на процеса ви помага да планирате времето и бюджета си. Ето какво се случва от първото обаждане до завършения ремонт:
                </p>

                <div className="space-y-6 mb-6">
                  {[
                    { step: "1", title: "Безплатен оглед и оценка", desc: "Наш специалист идва на адреса в рамките на 24 часа. Оценява състоянието на покрива, идентифицира проблемите и заснема с дрон (при необходимост). Огледът е напълно безплатен и без задължение." },
                    { step: "2", title: "Детайлна оферта", desc: "В рамките на 1-2 дни получавате подробна оферта с описание на всички дейности, количества материали и крайна цена. Без скрити разходи — цената, която виждате, е цената, която плащате." },
                    { step: "3", title: "Подписване на договор", desc: "При одобрение подписваме договор с гаранция 15 години. Уточняваме начална дата, продължителност и етапи на плащане." },
                    { step: "4", title: "Изпълнение на ремонта", desc: "Нашият екип работи по график, спазвайки всички строителни норми. Ежедневно ви информираме за напредъка. При лоши метеорологични условия работата се преустановява безопасно." },
                    { step: "5", title: "Приемане и гаранция", desc: "След завършване на ремонта правим съвместна инспекция. Получавате 15-годишна гаранция за труд и материали, както и препоръки за бъдеща поддръжка." }
                  ].map((item) => (
                    <div key={item.step} className="flex gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">{item.step}</div>
                      <div>
                        <h3 className="font-bold text-foreground mb-1">{item.title}</h3>
                        <p className="text-muted-foreground">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <p className="text-muted-foreground leading-relaxed mb-6">
                  <Link to="/bg/kak-rabotim" className="text-primary hover:underline font-medium">→ Научете повече за нашия работен процес</Link>
                </p>
              </section>

              {/* Скрити разходи */}
              <section className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Внимание: Скрити разходи при покривни ремонти</h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Някои фирми привличат клиенти с ниски начални цени, но впоследствие добавят допълнителни разходи. Ето на какво да обърнете внимание:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-6">
                  <li><strong>Скеле:</strong> Някои оферти не включват скелето, което може да добави 500-2,000 EUR.</li>
                  <li><strong>Извозване на строителни отпадъци:</strong> Старите керемиди и материали трябва да се извозят. Цена: 100-300 EUR в зависимост от количеството.</li>
                  <li><strong>Дървена конструкция:</strong> Ако летвите или мертеците са повредени, подмяната им е допълнителен разход.</li>
                  <li><strong>Обшивки и ламаринени детайли:</strong> Водосточни казанчета, ветрови дъски и обшивки около комини — 150-500 EUR общо.</li>
                  <li><strong>ДДС:</strong> Проверете дали цената е с или без ДДС (20%).</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  <strong>Нашият подход:</strong> Ние включваме всички разходи в офертата — без изненади. Крайната цена, която виждате в нашата оферта, е цената, която плащате. Ако по време на ремонта открием допълнителни проблеми, ви информираме и съгласуваме преди да продължим.
                </p>
              </section>

              {/* Сравнение ремонт vs нов покрив */}
              <section className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Кога е по-изгодно да ремонтирам и кога да подменя целия покрив?</h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Това е ключов въпрос, който стои пред много собственици. Общото правило е: ако повредите засягат повече от 30-40% от покривната площ или дървената конструкция е компрометирана, пълната подмяна е по-икономична в дългосрочен план.
                </p>

                <div className="overflow-x-auto mb-6">
                  <table className="w-full border-collapse border border-border">
                    <thead>
                      <tr className="bg-muted">
                        <th className="border border-border p-4 text-left font-bold text-foreground">Критерий</th>
                        <th className="border border-border p-4 text-center font-bold text-foreground">Частичен ремонт</th>
                        <th className="border border-border p-4 text-center font-bold text-foreground">Пълна подмяна</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ["Повредена площ", "Под 30%", "Над 30%"],
                        ["Възраст на покрива", "Под 25 години", "Над 30 години"],
                        ["Дървена конструкция", "Здрава", "С повреди"],
                        ["Цена (за 100 м²)", "800 – 2,500 EUR", "2,500 – 5,000 EUR"],
                        ["Гаранция", "5-10 години", "15 години"],
                        ["Очакван живот", "+10-15 години", "+30-50 години"]
                      ].map(([criterion, partial, full], i) => (
                        <tr key={i} className={i % 2 === 0 ? "bg-background" : "bg-muted/50"}>
                          <td className="border border-border p-4 font-medium text-foreground">{criterion}</td>
                          <td className="border border-border p-4 text-center text-muted-foreground">{partial}</td>
                          <td className="border border-border p-4 text-center text-muted-foreground">{full}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <p className="text-muted-foreground leading-relaxed mb-6">
                  <Link to="/bg/nov-pokriv" className="text-primary hover:underline font-medium">→ Научете повече за изграждане на нов покрив</Link>
                </p>
              </section>

              {/* FAQ */}
              <section className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Често задавани въпроси за цени на покривни ремонти</h2>
                <Accordion type="single" collapsible className="w-full">
                  {faqSchema.mainEntity.map((faq, i) => (
                    <AccordionItem key={i} value={`faq-${i}`}>
                      <AccordionTrigger className="text-left font-medium text-foreground">{faq.name}</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground leading-relaxed">{faq.acceptedAnswer.text}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </section>

            </div>

            {/* CTA Section */}
            <section className="bg-slate-800 text-white rounded-2xl p-8 md:p-12 text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Искате точна цена за вашия покрив?</h2>
              <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
                Заявете безплатен оглед и получете детайлна оферта до 24 часа. Без задължение, без скрити разходи.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/bg/bezplaten-ogled">
                  <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 text-lg px-8">
                    Заяви безплатен оглед
                  </Button>
                </Link>
                <a href="tel:0884997659">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 text-lg px-8">
                    <Phone className="w-5 h-5 mr-2" /> 088 499 7659
                  </Button>
                </a>
              </div>
            </section>

            {/* Back */}
            <Link to="/bg/blog" className="inline-flex items-center gap-2 text-primary hover:underline font-medium">
              <ArrowLeft className="w-4 h-4" /> Обратно към блога
            </Link>
          </div>
        </article>
      </main>

      <Footer />
      <FloatingCallButton />
    </div>
  );
};

export default RoofRepairCostVarna;
