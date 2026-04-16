import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Calendar, Clock, ArrowLeft, Phone, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import coverImg from "@/assets/blog/roof-leak-causes.jpg";

const RoofLeakCauses = () => {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "Теч от покрива — Причини, решения и цени за ремонт 2026",
    "description": "Защо тече покривът? 8 най-чести причини за течове и как да ги отстраните. Цени за ремонт на течове, спешна реакция до 24ч. Варна.",
    "datePublished": "2026-04-14",
    "dateModified": "2026-04-14",
    "author": { "@type": "Organization", "name": "RemontNaPokriviVarna" },
    "publisher": { "@type": "LocalBusiness", "name": "RemontNaPokriviVarna", "address": { "@type": "PostalAddress", "addressLocality": "Варна", "addressCountry": "BG" } },
    "mainEntityOfPage": "https://www.remontnapokrivivarna.bg/bg/blog/tech-ot-pokriva-prichini-i-reshenia"
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": "Защо тече покривът ми?", "acceptedAnswer": { "@type": "Answer", "text": "Най-честите причини за теч от покрива са: счупени или изместени керемиди (35% от случаите), износена хидроизолация (25%), запушени или повредени улуци (15%), проблеми около комин или чатма (10%), лоша или липсваща обшивка (8%), конденз от лоша вентилация (7%). За точна диагностика е нужен професионален оглед." } },
      { "@type": "Question", "name": "Колко струва ремонт на теч от покрива?", "acceptedAnswer": { "@type": "Answer", "text": "Цената зависи от причината: запечатване на единичен теч — 150-300 EUR, подмяна на счупени керемиди — 3-8 EUR/бр., ремонт около комин — 200-500 EUR, нова хидроизолация — 15-25 EUR/м². Спешен ремонт (до 24ч) може да е с 15-20% надценка. Безплатен оглед и оценка." } },
      { "@type": "Question", "name": "Може ли теч от покрива да се ремонтира сам?", "acceptedAnswer": { "@type": "Answer", "text": "Малки течове (една счупена керемида) технически могат да бъдат ремонтирани от домашен майстор, но не е препоръчително. Работата на покрив е опасна без професионално обезопасяване. Освен това, видимият теч може да бъде само симптом на по-голям проблем, който непрофесионалист може да пропусне." } },
      { "@type": "Question", "name": "Колко бързо трябва да реагирам при теч?", "acceptedAnswer": { "@type": "Answer", "text": "Незабавно. Всеки ден забавяне увеличава щетите — водата уврежда дървената конструкция, изолацията, таваните и стените. След 48-72 часа непрекъснато навлизане на вода може да започне развитие на мухъл, което е здравен риск. Обадете се на 088 499 7659 за спешна реакция до 24ч." } },
      { "@type": "Question", "name": "Покривът тече само при силен дъжд — сериозно ли е?", "acceptedAnswer": { "@type": "Answer", "text": "Да. Теч при силен дъжд означава, че има компрометирана точка в покрива, която се активира при повишено количество вода. С времето тази точка ще се разшири и ще тече и при по-слаб дъжд. По-добре е да се отстрани проблемът навреме — обикновено е прост и евтин ремонт (150-400 EUR)." } },
      { "@type": "Question", "name": "Как да намеря откъде точно тече?", "acceptedAnswer": { "@type": "Answer", "text": "Локализирането на теч е трудно, защото водата може да пътува по мертеци и летви преди да капне на тавана. Мокрото петно на тавана НЕ е непременно под точката на теча. Ние използваме термална камера и визуална инспекция от вътрешната страна на покрива (тавана) и от външната за точна диагностика." } },
      { "@type": "Question", "name": "Покрива ми тече около комина — какво да правя?", "acceptedAnswer": { "@type": "Answer", "text": "Течовете около комина са едни от най-честите. Причината е износена или лошо положена ламаринена обшивка (опорна ламарина), която уплътнява връзката между комина и покрива. Решението е подмяна на обшивката с нова, оловна или алуминиева, с правилно уплътняване. Цена: 200-500 EUR." } },
      { "@type": "Question", "name": "Давате ли гаранция за ремонт на течове?", "acceptedAnswer": { "@type": "Answer", "text": "Да, за всеки ремонт на теч даваме гаранция от 15 години. Ако течът се възобнови в рамките на гаранционния период, отстраняваме проблема безплатно." } }
    ]
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Начало", "item": "https://www.remontnapokrivivarna.bg/bg" },
      { "@type": "ListItem", "position": 2, "name": "Блог", "item": "https://www.remontnapokrivivarna.bg/bg/blog" },
      { "@type": "ListItem", "position": 3, "name": "Теч от покрива", "item": "https://www.remontnapokrivivarna.bg/bg/blog/tech-ot-pokriva-prichini-i-reshenia" }
    ]
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Теч от покрива — 8 причини и решения | Цени за ремонт 2026 Варна</title>
        <meta name="description" content="Защо тече покривът? 8 най-чести причини за течове от покрива и цени за ремонт. Спешна реакция до 24ч. Безплатен оглед. ☎ 088 499 7659 Варна." />
        <meta property="og:title" content="Теч от покрива — Причини, решения и цени за ремонт 2026" />
        <meta property="og:description" content="8 причини за теч от покрива и как да ги отстраните. Цени за ремонт от 150 EUR." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://www.remontnapokrivivarna.bg/bg/blog/tech-ot-pokriva-prichini-i-reshenia" />
        <meta property="og:locale" content="bg_BG" />
        <meta property="article:published_time" content="2026-04-14" />
        <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <Header />

      <main className="pt-20">
        <section className="relative h-[50vh] min-h-[400px]">
          <img src={coverImg} alt="Теч от покрива — причини и решения" className="w-full h-full object-cover" width={1200} height={630} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="container mx-auto">
              <nav className="text-sm text-white/80 mb-4">
                <Link to="/bg" className="hover:text-white">Начало</Link><span className="mx-2">/</span>
                <Link to="/bg/blog" className="hover:text-white">Блог</Link><span className="mx-2">/</span>
                <span className="text-white">Теч от покрива</span>
              </nav>
              <div className="flex items-center gap-3 mb-4">
                <Badge className="bg-red-600 text-white">Течове</Badge>
                <span className="text-white/80 flex items-center gap-1 text-sm"><Calendar className="w-4 h-4" /> 14 април 2026</span>
                <span className="text-white/80 flex items-center gap-1 text-sm"><Clock className="w-4 h-4" /> 13 мин четене</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-white max-w-4xl">
                Теч от покрива — Причини, решения и цени за ремонт
              </h1>
            </div>
          </div>
        </section>

        <article className="py-12">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="prose prose-lg max-w-none">

              {/* Urgent notice */}
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8 flex gap-4">
                <AlertTriangle className="w-8 h-8 text-red-600 flex-shrink-0" />
                <div>
                  <p className="font-bold text-red-800 mb-1">Имате активен теч от покрива?</p>
                  <p className="text-red-700">Не чакайте — всеки ден забавяне увеличава щетите. Обадете се на <a href="tel:0884997659" className="font-bold underline">088 499 7659</a> за спешна реакция до 24 часа. Безплатен оглед.</p>
                </div>
              </div>

              <section className="mb-12">
                <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                  Течът от покрива е най-спешният покривен проблем, с който се сблъскват собствениците на жилища. Средната цена за ремонт на теч е <strong>150-500 EUR</strong>, но ако се пренебрегне, последствията могат да достигнат <strong>5,000-15,000 EUR</strong> — мухъл, повредени тавани, компрометирана електрическа инсталация и гнила дървена конструкция.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Течовете от покриви са особено чести във Варна и по Черноморието, където комбинацията от солен морски въздух, силни ветрове и обилни сезонни валежи ускорява износването на покривните материали. Нашият екип обслужва средно 40-50 спешни случая на течове месечно, и в тази статия споделяме нашия опит — защо текат покривите, как да разпознаете причината и колко ще ви струва ремонтът.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Важно е да разберете: мокрото петно на тавана <strong>НЕ</strong> показва точно къде тече покривът. Водата може да пътува по мертеци, летви и мембрани на разстояние до 3-5 метра, преди да намери точка, от която да капне. Затова е критично важно да се направи професионален оглед, а не просто да се „запуши" видимото петно.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">8 най-чести причини за теч от покрива</h2>

                <h3 className="text-xl font-bold text-foreground mb-4">1. Счупени или изместени керемиди (35% от случаите)</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Най-честата причина за теч. Керемидите се чупят от градушка, паднали клони, стъпване при антенен монтаж или просто от възраст. Изместените керемиди (след силен вятър) оставят процеп, през който водата навлиза. Решение: подмяна на повредените керемиди. Цена: <strong>3-8 EUR/бр.</strong> Ако е засегната по-голяма площ (над 20 керемиди): <strong>200-600 EUR</strong>.
                </p>

                <h3 className="text-xl font-bold text-foreground mb-4">2. Износена хидроизолация (25%)</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  При плоски покриви битумната хидроизолация се износва за 10-15 години — напуква се, образуват се мехури и процепи. При наклонени покриви паропропускливата мембрана може да се разкъса или изгние. Решение: полагане на нова хидроизолация. Цена: <strong>15-25 EUR/м²</strong> за плосък покрив, <strong>8-14 EUR/м²</strong> за мембрана под керемиди.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  <Link to="/bg/hidroizolacia-na-pokriv" className="text-primary hover:underline font-medium">→ Повече за хидроизолация на покриви</Link>
                </p>

                <h3 className="text-xl font-bold text-foreground mb-4">3. Запушени или повредени улуци (15%)</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Запушените улуци карат водата да прелива и да навлиза под покривното покритие или по стените. Повредени улуци (дупки, разхлабени връзки) създават водопади по фасадата и основите. Решение: почистване 2 пъти годишно, подмяна на повредени секции. Цена: <strong>8-15 EUR/л.м.</strong> за подмяна, <strong>50-150 EUR</strong> за почистване.
                </p>

                <h3 className="text-xl font-bold text-foreground mb-4">4. Теч около комин (10%)</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Комините са „слабо звено" — зоната, където покривното покритие среща вертикална повърхност. Износената ламаринена обшивка (опорна ламарина), напуканият шев от силикон или лошо положена мембрана са обичайните причини. Решение: нова обшивка с оловен или алуминиев фартук, правилно уплътняване. Цена: <strong>200-500 EUR</strong>.
                </p>

                <h3 className="text-xl font-bold text-foreground mb-4">5. Повредени долини и ребра (8%)</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Долините (вътрешните ъгли на покрива, където два ската се срещат) са зони с концентриран воден поток. Ако ламаринената подложка е корозирала или керемидите около нея не прилягат, водата навлиза. Решение: подмяна на долинната ламарина и правилно подреждане на керемидите. Цена: <strong>150-400 EUR</strong> на долина.
                </p>

                <h3 className="text-xl font-bold text-foreground mb-4">6. Конденз от лоша вентилация (7%)</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Много собственици бъркат конденза с теч. Ако таванското пространство не е правилно вентилирано, топлият влажен въздух от жилището се кондензира от вътрешната страна на покрива и капе надолу. Решение: монтаж на вентилационни решетки и осигуряване на въздушен поток. Цена: <strong>200-600 EUR</strong>.
                </p>

                <h3 className="text-xl font-bold text-foreground mb-4">7. Повреди от буря или градушка</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Силни бури и градушки могат да причинят масови повреди — счупени керемиди, откъснати ламарини, разместени капаци. При такива случаи е необходим спешен ремонт, за да се предотвратят вторични щети. Цена: <strong>300-2,000 EUR</strong> в зависимост от обхвата на повредите.
                </p>

                <h3 className="text-xl font-bold text-foreground mb-4">8. Лош предишен ремонт</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  За съжаление, немалка част от течовете, които ремонтираме, са резултат от некачествен предишен ремонт — неправилно положени керемиди, липсваща мембрана, лошо направена обшивка. Затова е важно да изберете фирма с доказан опит и реална гаранция.
                </p>
              </section>

              {/* Последствия */}
              <section className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Какво се случва, ако не ремонтирате теча?</h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Всеки нелекуван теч се влошава прогресивно. Ето какво се случва във времето:
                </p>
                <div className="overflow-x-auto mb-6">
                  <table className="w-full border-collapse border border-border">
                    <thead>
                      <tr className="bg-muted">
                        <th className="border border-border p-4 text-left font-bold text-foreground">Период</th>
                        <th className="border border-border p-4 text-left font-bold text-foreground">Последствия</th>
                        <th className="border border-border p-4 text-center font-bold text-foreground">Ориент. цена за ремонт</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ["Ден 1-7", "Мокро петно на тавана, козметични щети", "150 – 300 EUR"],
                        ["1-4 седмици", "Подуване и ронене на мазилка, повредена боя", "300 – 800 EUR"],
                        ["1-3 месеца", "Навлажняване на изолация, начало на мухъл", "800 – 2,000 EUR"],
                        ["3-6 месеца", "Гниене на летви и мертеци, разрастване на мухъл", "2,000 – 5,000 EUR"],
                        ["6-12 месеца", "Компрометирана носеща конструкция, здравен риск от мухъл", "5,000 – 15,000 EUR"],
                        ["Над 1 година", "Риск от срутване на покрива, тотална реконструкция", "10,000 – 30,000 EUR"]
                      ].map(([period, damage, cost], i) => (
                        <tr key={i} className={i % 2 === 0 ? "bg-background" : "bg-muted/50"}>
                          <td className="border border-border p-4 font-medium text-foreground">{period}</td>
                          <td className="border border-border p-4 text-muted-foreground">{damage}</td>
                          <td className="border border-border p-4 text-center font-semibold text-foreground">{cost}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  <strong>Извод:</strong> Ремонт на теч за 150-300 EUR днес може да ви спести 5,000-15,000 EUR утре. Не отлагайте.
                </p>
              </section>

              {/* Ценова таблица */}
              <section className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Цени за ремонт на течове — Варна 2026</h2>
                <div className="overflow-x-auto mb-8">
                  <table className="w-full border-collapse border border-border">
                    <thead>
                      <tr className="bg-muted">
                        <th className="border border-border p-4 text-left font-bold text-foreground">Вид ремонт</th>
                        <th className="border border-border p-4 text-center font-bold text-foreground">Цена (EUR)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ["Запечатване на единичен теч (керемиди)", "150 – 300"],
                        ["Подмяна на счупени керемиди (до 20 бр.)", "100 – 250"],
                        ["Ремонт около комин/чатма", "200 – 500"],
                        ["Подмяна на долинна ламарина", "150 – 400"],
                        ["Ремонт на плосък покрив (хидроизолация)", "15 – 25 EUR/м²"],
                        ["Подмяна на улуци", "8 – 15 EUR/л.м."],
                        ["Спешен ремонт (до 24 часа)", "+15-20% надценка"],
                        ["Безплатен оглед и диагностика", "0 EUR"],
                      ].map(([service, price], i) => (
                        <tr key={i} className={i % 2 === 0 ? "bg-background" : "bg-muted/50"}>
                          <td className="border border-border p-4 text-muted-foreground">{service}</td>
                          <td className="border border-border p-4 text-center font-semibold text-foreground">{price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  <Link to="/bg/remont-na-techove-pokriv" className="text-primary hover:underline font-medium">→ Повече за нашата услуга за ремонт на течове</Link>
                </p>
              </section>

              {/* Реални примери */}
              <section className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Реални примери от Варна</h2>

                <Card className="mb-6">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-foreground mb-2">Пример 1: Теч от комин — кв. Аспарухово</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>🔍 <strong>Проблем:</strong> Теч при всеки дъжд около комина, мокро петно на тавана 1.5м от комина</li>
                      <li>🔧 <strong>Причина:</strong> Изгнила опорна ламарина и липса на мембрана около комина</li>
                      <li>✅ <strong>Решение:</strong> Нова алуминиева обшивка с оловен фартук, подмяна на 8 керемиди, полагане на мембрана</li>
                      <li>⏱️ <strong>Продължителност:</strong> 1 ден</li>
                      <li>💰 <strong>Цена:</strong> 380 EUR</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="mb-6">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-foreground mb-2">Пример 2: Множество течове от плосък покрив — жил. блок, кв. Владиславово</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>🔍 <strong>Проблем:</strong> Течове в 4 апартамента на последния етаж, стара битумна изолация на 18 години</li>
                      <li>🔧 <strong>Причина:</strong> Напукана и разслоена битумна мембрана, задържане на вода в ниски зони</li>
                      <li>✅ <strong>Решение:</strong> Пълно подмяна на хидроизолацията — 180 м² двупластова APP мембрана с обработка на бордове</li>
                      <li>⏱️ <strong>Продължителност:</strong> 4 дни</li>
                      <li>💰 <strong>Цена:</strong> 3,240 EUR (18 EUR/м²)</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="mb-6">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-foreground mb-2">Пример 3: Спешен ремонт след буря — кв. Трошево</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>🔍 <strong>Проблем:</strong> Силна буря отнесе 15 м² ламарина от покрива, активен теч</li>
                      <li>🔧 <strong>Причина:</strong> Откъсната метална ламарина от вятър, повредени крепежни елементи</li>
                      <li>✅ <strong>Решение:</strong> Временно покриване (същия ден), на следващия ден — нова профилирана ламарина с усилени крепежи</li>
                      <li>⏱️ <strong>Продължителност:</strong> 2 дни</li>
                      <li>💰 <strong>Цена:</strong> 650 EUR</li>
                    </ul>
                  </CardContent>
                </Card>
              </section>

              {/* Какво да направите при теч */}
              <section className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Какво да направите веднага при теч от покрива</h2>
                <div className="space-y-4 mb-6">
                  {[
                    { step: "1", title: "Поставете съд под капещата вода", desc: "Предотвратете щети по пода и мебелите. Сложете голям леген или кофа и подстелете найлон." },
                    { step: "2", title: "Отдалечете ценни вещи и електроника", desc: "Махнете от зоната на теча електрически уреди, компютри, книги и ценности." },
                    { step: "3", title: "НЕ пробивайте тавана", desc: "Може да изглежда, че подутият таван ще се счупи, но пробиването може да влоши ситуацията и да разпръсне водата на по-голяма площ." },
                    { step: "4", title: "Обадете се на професионалист", desc: "Обадете се на 088 499 7659 за спешна реакция до 24 часа. Не се опитвайте да се качвате на покрива сами, особено при мокра или ветровита погода." },
                    { step: "5", title: "Документирайте щетите", desc: "Направете снимки на петното, течащата вода и повредите. Те ще ви трябват за застрахователна претенция, ако имате покритие." }
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
              </section>

              {/* Превенция */}
              <section className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Как да предотвратите течове от покрива</h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Превенцията винаги е по-евтина от ремонта. Ето 6 прости стъпки, които ще намалят драстично риска от течове:
                </p>
                <ul className="list-disc pl-6 space-y-3 text-muted-foreground mb-6">
                  <li><strong>Професионален оглед 1-2 пъти годишно</strong> — пролет (след зимата) и есен (преди зимата). Цена: безплатно при договор с нас.</li>
                  <li><strong>Почистване на улуци</strong> — поне 2 пъти годишно. Запушените улуци са причина за 15% от течовете.</li>
                  <li><strong>Подрязване на дървета</strong> — клони, надвисващи над покрива, могат да счупят керемиди при вятър.</li>
                  <li><strong>Проверка след буря</strong> — визуална инспекция отдолу (таван) и отвън след всяка силна буря.</li>
                  <li><strong>Не отлагайте малки ремонти</strong> — една счупена керемида днес = теч утре. Подмяната струва 3-8 EUR.</li>
                  <li><strong>Изберете качествени материали</strong> — евтината хидроизолация издържа 5-8 години, качествената — 20-30 години.</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  <Link to="/bg/poddruzhka-na-pokrivi" className="text-primary hover:underline font-medium">→ Повече за поддръжка на покриви</Link>
                </p>
              </section>

              {/* FAQ */}
              <section className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Често задавани въпроси за течове от покрива</h2>
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

            <section className="bg-slate-800 text-white rounded-2xl p-8 md:p-12 text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Покривът ви тече? Не чакайте!</h2>
              <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
                Спешна реакция до 24 часа. Безплатен оглед и точна оферта. 15 години гаранция за всеки ремонт.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/bg/bezplaten-ogled">
                  <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 text-lg px-8">Заяви безплатен оглед</Button>
                </Link>
                <a href="tel:0884997659">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 text-lg px-8">
                    <Phone className="w-5 h-5 mr-2" /> 088 499 7659
                  </Button>
                </a>
              </div>
            </section>

            <Link to="/bg/blog" className="inline-flex items-center gap-2 text-primary hover:underline font-medium">
              <ArrowLeft className="w-4 h-4" /> Обратно към блога
            </Link>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default RoofLeakCauses;
