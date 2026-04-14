import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCallButton from "@/components/FloatingCallButton";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Calendar, Clock, ArrowLeft, Phone, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import coverImg from "@/assets/blog/tile-replacement-guide.jpg";

const TileReplacementGuide = () => {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "Смяна на керемиди — Кога, как и колко струва през 2026",
    "description": "Пълно ръководство за смяна на керемиди. Кога е необходима подмяна, видове керемиди, цени и процес. Реални примери от Варна.",
    "datePublished": "2026-04-14",
    "dateModified": "2026-04-14",
    "author": { "@type": "Organization", "name": "RemontNaPokriviVarna" },
    "publisher": { "@type": "LocalBusiness", "name": "RemontNaPokriviVarna", "address": { "@type": "PostalAddress", "addressLocality": "Варна", "addressCountry": "BG" } },
    "mainEntityOfPage": "https://www.remontnapokrivivarna.bg/bg/blog/smyana-na-keremidi-cena-i-narachnik"
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": "Колко струва смяна на керемиди?", "acceptedAnswer": { "@type": "Answer", "text": "Смяната на единични счупени керемиди струва 3-8 EUR на брой (с монтаж). Пълна подмяна на покривното покритие с нови керемиди струва 25-40 EUR/м² за глинени (Tondach, Wienerberger) и 18-28 EUR/м² за бетонни керемиди (Bramac). Цената включва демонтаж, нови летви, мембрана и монтаж." } },
      { "@type": "Question", "name": "Кога трябва да сменя керемидите на покрива?", "acceptedAnswer": { "@type": "Answer", "text": "Смяна на керемиди е необходима при: повече от 10% счупени/напукани керемиди, видимо изместване и хлабаво прилягане, порьозност и влагопоглъщане (керемидата се напива с вода), мъх и биологично разрушаване, течове въпреки частични ремонти, възраст над 40-50 години за бетонни и над 60-80 за глинени." } },
      { "@type": "Question", "name": "Глинени или бетонни керемиди — кои са по-добри?", "acceptedAnswer": { "@type": "Answer", "text": "Глинените керемиди са по-издръжливи (80-100 години), по-леки и по-устойчиви на мраз, но са 20-30% по-скъпи. Бетонните керемиди са по-достъпни (30-годишна гаранция), но по-тежки и склонни към обрастване с мъх. За морски климат като Варна глинените са препоръчителни заради по-добрата устойчивост на солена влага." } },
      { "@type": "Question", "name": "Колко дни отнема смяната на керемиди?", "acceptedAnswer": { "@type": "Answer", "text": "Частична смяна (до 30 м²) отнема 1-2 дни. Пълна подмяна на покривно покритие за стандартна къща (100-120 м²) отнема 5-8 работни дни, включително демонтаж, подмяна на летви и мембрана, и монтаж на новите керемиди." } },
      { "@type": "Question", "name": "Трябва ли да сменя и летвите при подмяна на керемиди?", "acceptedAnswer": { "@type": "Answer", "text": "В повечето случаи — да. При покрив на възраст 25+ години летвите обикновено са деформирани или повредени от влага. Подмяната им е относително евтина (6-10 EUR/м²) и гарантира равномерно прилягане на новите керемиди и по-дълъг живот на покрива." } },
      { "@type": "Question", "name": "Мога ли да сменя само счупените керемиди?", "acceptedAnswer": { "@type": "Answer", "text": "Да, при единични повреди (до 10% от покрива) е напълно достатъчно да замените само счупените керемиди. Важно е новите керемиди да бъдат от същия тип и размер за правилно прилягане. При по-стари покриви може да е трудно да се намерят идентични керемиди." } },
      { "@type": "Question", "name": "Какви марки керемиди препоръчвате?", "acceptedAnswer": { "@type": "Answer", "text": "Препоръчваме Tondach (Австрия) и Wienerberger за глинени керемиди — 30-годишна гаранция и морозоустойчивост. За бетонни керемиди — Bramac — отлично съотношение цена/качество с 30-годишна гаранция. За метални керемиди — Bilka и Kebe." } }
    ]
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Начало", "item": "https://www.remontnapokrivivarna.bg/bg" },
      { "@type": "ListItem", "position": 2, "name": "Блог", "item": "https://www.remontnapokrivivarna.bg/bg/blog" },
      { "@type": "ListItem", "position": 3, "name": "Смяна на керемиди", "item": "https://www.remontnapokrivivarna.bg/bg/blog/smyana-na-keremidi-cena-i-narachnik" }
    ]
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Смяна на керемиди — Цена, видове и ръководство 2026 | Варна</title>
        <meta name="description" content="Смяна на керемиди: глинени 25-40 €/м², бетонни 18-28 €/м². Кога да смените, какви керемиди да изберете и колко ще струва. Реални примери от Варна." />
        <meta property="og:title" content="Смяна на керемиди — Цена, видове и ръководство 2026 | Варна" />
        <meta property="og:description" content="Пълно ръководство за смяна на керемиди. Цени, видове, процес и реални примери." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://www.remontnapokrivivarna.bg/bg/blog/smyana-na-keremidi-cena-i-narachnik" />
        <meta property="og:locale" content="bg_BG" />
        <meta property="article:published_time" content="2026-04-14" />
        <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <Header />

      <main className="pt-20">
        <section className="relative h-[50vh] min-h-[400px]">
          <img src={coverImg} alt="Смяна на керемиди — ръководство" className="w-full h-full object-cover" width={1200} height={630} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="container mx-auto">
              <nav className="text-sm text-white/80 mb-4">
                <Link to="/bg" className="hover:text-white">Начало</Link><span className="mx-2">/</span>
                <Link to="/bg/blog" className="hover:text-white">Блог</Link><span className="mx-2">/</span>
                <span className="text-white">Смяна на керемиди</span>
              </nav>
              <div className="flex items-center gap-3 mb-4">
                <Badge className="bg-primary text-primary-foreground">Ремонт</Badge>
                <span className="text-white/80 flex items-center gap-1 text-sm"><Calendar className="w-4 h-4" /> 14 април 2026</span>
                <span className="text-white/80 flex items-center gap-1 text-sm"><Clock className="w-4 h-4" /> 14 мин четене</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-white max-w-4xl">
                Смяна на керемиди — Кога, как и колко струва през 2026
              </h1>
            </div>
          </div>
        </section>

        <article className="py-12">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="prose prose-lg max-w-none">

              <section className="mb-12">
                <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                  Смяната на керемиди е най-честата покривна услуга в България. Средната цена за подмяна на единични керемиди е <strong>3-8 EUR на брой</strong>, а пълната подмяна на покривно покритие струва <strong>25-40 EUR/м²</strong> за глинени и <strong>18-28 EUR/м²</strong> за бетонни керемиди. Тази статия обяснява кога е необходима смяна, какви керемиди да изберете и как протича процесът.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Керемидените покриви са основата на жилищното строителство в България и конкретно във Варна и региона. Над 75% от еднофамилните къщи имат покрив с глинени или бетонни керемиди. С течение на времето — обикновено след 25-40 години — керемидите започват да се напукват, изместват или стават порьозни. Когато това се случи, собствениците стоят пред решението: да ремонтират частично или да подменят цялото покритие.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Правилното решение зависи от няколко фактора — възраст на покрива, процент на повредени керемиди, състояние на подконструкцията (летви, мертеци, хидроизолация) и бюджет. В тази подробна статия ще разгледаме всички тези аспекти, ще сравним видовете керемиди и ще дадем конкретни цени от реални обекти във Варна.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Кога е необходима смяна на керемиди?</h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Не всяка повреда на покрива изисква пълна подмяна. Ето как да разпознаете кога е нужна частична и кога пълна смяна:
                </p>

                <h3 className="text-xl font-bold text-foreground mb-4">Признаци за частична смяна (до 10% от покрива)</h3>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-6">
                  <li>Единични счупени или напукани керемиди — обикновено от градушка, паднали клони или стъпване</li>
                  <li>Изместени керемиди след силен вятър — керемидите се връщат на място или се заменят с нови</li>
                  <li>Течове от конкретна точка — обикновено около комин, чатма или долина</li>
                  <li>Покривът е на възраст под 25 години и като цяло е в добро състояние</li>
                </ul>

                <h3 className="text-xl font-bold text-foreground mb-4">Признаци за пълна подмяна</h3>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-6">
                  <li><strong>Масови напуквания:</strong> Повече от 10-15% от керемидите имат видими пукнатини или липси</li>
                  <li><strong>Порьозност:</strong> Керемидите се напиват с вода (тест: излейте вода върху керемида — ако се попива за секунди, е порьозна)</li>
                  <li><strong>Обрастване с мъх:</strong> Масово обрастване означава задържане на влага и ускорено разрушаване</li>
                  <li><strong>Деформация:</strong> Керемидите не прилягат равномерно, има хлабини и процепи</li>
                  <li><strong>Възраст:</strong> Над 40 години за бетонни, над 60-80 за глинени (зависи от качеството)</li>
                  <li><strong>Системни течове:</strong> Течове на множество места въпреки предишни частични ремонти</li>
                </ul>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Видове керемиди — сравнение за 2026</h2>

                <div className="overflow-x-auto mb-8">
                  <table className="w-full border-collapse border border-border">
                    <thead>
                      <tr className="bg-muted">
                        <th className="border border-border p-4 text-left font-bold text-foreground">Характеристика</th>
                        <th className="border border-border p-4 text-center font-bold text-foreground">Глинени</th>
                        <th className="border border-border p-4 text-center font-bold text-foreground">Бетонни</th>
                        <th className="border border-border p-4 text-center font-bold text-foreground">Метални</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ["Цена (EUR/м²)", "25 – 40", "18 – 28", "18 – 30"],
                        ["Тегло (кг/м²)", "38 – 45", "42 – 55", "4 – 7"],
                        ["Живот (години)", "80 – 100", "30 – 50", "25 – 40"],
                        ["Гаранция (производител)", "30 год.", "30 год.", "20 – 30 год."],
                        ["Морозоустойчивост", "Отлична", "Добра", "Отлична"],
                        ["Шумоизолация", "Много добра", "Много добра", "Средна"],
                        ["Поддръжка", "Минимална", "Почистване от мъх", "Антикорозия"],
                        ["Подходящ за", "Всякакви покриви", "Бюджетни проекти", "Леки конструкции"],
                        ["Популярни марки", "Tondach, Wienerberger", "Bramac", "Bilka, Kebe"],
                      ].map(([char, clay, concrete, metal], i) => (
                        <tr key={i} className={i % 2 === 0 ? "bg-background" : "bg-muted/50"}>
                          <td className="border border-border p-4 font-medium text-foreground">{char}</td>
                          <td className="border border-border p-4 text-center text-muted-foreground">{clay}</td>
                          <td className="border border-border p-4 text-center text-muted-foreground">{concrete}</td>
                          <td className="border border-border p-4 text-center text-muted-foreground">{metal}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <h3 className="text-xl font-bold text-foreground mb-4">Глинени керемиди — премиум избор</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Глинените керемиди са златният стандарт в покривните покрития. Произвеждат се чрез изпичане на глина при над 1000°C, което ги прави изключително здрави и устойчиви на атмосферни влияния. Tondach и Wienerberger са водещите марки на българския пазар. За морския климат на Варна, където соленият въздух и влагата ускоряват корозията на по-евтините материали, глинените керемиди са оптималният избор — не кородират, не поглъщат влага и запазват цвета си десетилетия. Средна цена с монтаж: <strong>25-40 EUR/м²</strong>.
                </p>

                <h3 className="text-xl font-bold text-foreground mb-4">Бетонни керемиди — най-доброто за бюджета</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Бетонните керемиди Bramac са най-продаваните в България. Предлагат отлично съотношение цена-качество с 30-годишна гаранция. Основният им недостатък е по-голямото тегло (42-55 кг/м²), което изисква по-здрава дървена конструкция, и склонността към обрастване с мъх в сенчести зони. Средна цена с монтаж: <strong>18-28 EUR/м²</strong>.
                </p>

                <h3 className="text-xl font-bold text-foreground mb-4">Метални керемиди — леки и бързи за монтаж</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Металните керемиди (стоманен лист с полимерно покритие) са изключително леки — само 4-7 кг/м². Монтажът е по-бърз от глинените, а визуално наподобяват класическа керемида. Подходящи за нови конструкции и сгради с по-слаба носимоспособност. Недостатък е по-високият шум при дъжд. Марки: Bilka, Kebe. Цена: <strong>18-30 EUR/м²</strong>.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  <Link to="/bg/remont-na-keremideni-pokrivi" className="text-primary hover:underline font-medium">→ Вижте нашата услуга за смяна на керемиди</Link>
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Как протича смяната на керемиди — стъпка по стъпка</h2>
                
                <div className="space-y-6 mb-6">
                  {[
                    { step: "1", title: "Оглед и оценка", desc: "Нашият специалист инспектира покрива — проверява процента повредени керемиди, състоянието на летвите и мембраната, здравината на дървената конструкция. При покриви над 8м височина използваме дрон за безопасна инспекция." },
                    { step: "2", title: "Детайлна оферта", desc: "Въз основа на огледа изготвяме оферта с точни количества — брой керемиди, линейни метри летви, площ мембрана, допълнителни елементи (ребра, била, начални керемиди). Всичко е с фиксирана крайна цена." },
                    { step: "3", title: "Демонтаж на старото покритие", desc: "Старите керемиди се свалят внимателно, за да не се повреди конструкцията. Проверяват се летвите и мертеците за гнилост и повреди. Старите материали се извозват и рециклират." },
                    { step: "4", title: "Ремонт на подконструкцията", desc: "Повредени летви и мертеци се подменят. Полага се нова паропропусклива хидроизолационна мембрана (Icopal, Tyvek), която предпазва от конденз и вятър. Нови импрегнирани летви се набиват на правилно разстояние за избраните керемиди." },
                    { step: "5", title: "Монтаж на нови керемиди", desc: "Керемидите се полагат от долу нагоре, от дясно наляво. Всяка керемида се закрепва с кукички или скоби при наклон над 35°. Особено внимание се обръща на долините, ребрата, билото и зоните около комини и чатми." },
                    { step: "6", title: "Довършителни работи и почистване", desc: "Монтират се снегозадържатели, водосточни казанчета и ветрови дъски. Покривът се почиства и проверява за плътност. Клиентът получава 15-годишна гаранция." }
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

              <section className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Реални примери от Варна</h2>

                <Card className="mb-6">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-foreground mb-2">Пример 1: Частична смяна — кв. Виница</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>📐 <strong>Обхват:</strong> 45 счупени керемиди на южен скат (след градушка)</li>
                      <li>🔧 <strong>Дейности:</strong> Подмяна на 45 глинени керемиди Tondach, проверка на летви</li>
                      <li>⏱️ <strong>Продължителност:</strong> 1 ден</li>
                      <li>💰 <strong>Цена:</strong> 320 EUR</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="mb-6">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-foreground mb-2">Пример 2: Пълна подмяна — кв. Галата</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>📐 <strong>Площ:</strong> 95 м² (четирискатен покрив, 2-етажна къща)</li>
                      <li>🔧 <strong>Дейности:</strong> Демонтаж на стари бетонни керемиди, нови летви, Icopal мембрана, монтаж на Bramac Montero керемиди, нови улуци</li>
                      <li>⏱️ <strong>Продължителност:</strong> 6 дни</li>
                      <li>💰 <strong>Цена:</strong> 2,470 EUR (26 EUR/м²)</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="mb-6">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-foreground mb-2">Пример 3: Премиум подмяна с глинени керемиди — Евксиноград</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>📐 <strong>Площ:</strong> 160 м² (многоскатен покрив, луксозна вила)</li>
                      <li>🔧 <strong>Дейности:</strong> Пълен демонтаж, укрепване на 4 мертека, нова мембрана Tyvek, глинени керемиди Tondach Figaro, медни улуци, снегозадържатели</li>
                      <li>⏱️ <strong>Продължителност:</strong> 12 дни</li>
                      <li>💰 <strong>Цена:</strong> 5,920 EUR (37 EUR/м²)</li>
                    </ul>
                  </CardContent>
                </Card>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Грешки при смяна на керемиди, които да избягвате</h2>
                <div className="space-y-4 mb-6">
                  {[
                    { title: "Смяна само на керемидите, без проверка на летвите", text: "Старите летви могат да са деформирани или гнили. Нови керемиди върху стари летви не прилягат равномерно и бързо се напукват." },
                    { title: "Пропускане на хидроизолационна мембрана", text: "Мембраната под керемидите е втората линия на защита. Без нея конденз и вятърен дъжд достигат до дървената конструкция." },
                    { title: "Смесване на керемиди от различни производители", text: "Различните керемиди имат различни размери и профил. Смесването води до неплътно прилягане и течове." },
                    { title: "Избор на най-евтината оферта", text: "Прекалено ниска цена обикновено означава: липса на мембрана, стари летви, некачествени керемиди или липса на гаранция." },
                    { title: "Ремонт в неподходящ сезон", text: "Подмяната на керемиди при минусови температури или обилни валежи компрометира качеството на полагане и хидроизолация." }
                  ].map((tip, i) => (
                    <div key={i} className="flex gap-3">
                      <span className="text-red-500 flex-shrink-0 text-lg font-bold">✗</span>
                      <div>
                        <h3 className="font-bold text-foreground">{tip.title}</h3>
                        <p className="text-muted-foreground">{tip.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  <Link to="/bg/blog/най-честите-грешки-при-покривни-ремонти" className="text-primary hover:underline font-medium">→ Прочетете повече за грешките при покривни ремонти</Link>
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Поддръжка на керемиден покрив след смяната</h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  За да удължите максимално живота на новите керемиди, спазвайте следните препоръки:
                </p>
                <div className="space-y-3 mb-6">
                  {[
                    "Инспектирайте покрива 2 пъти годишно — пролет (март-април) и есен (октомври-ноември)",
                    "Почиствайте улуците от листа и замърсявания поне 2 пъти годишно",
                    "Проверявайте за изместени или напукани керемиди след силни бури и градушки",
                    "Отстранявайте мъх и растителност, ако се появят (особено на северни скатове)",
                    "Подрязвайте дървета, чиито клони надвисват над покрива",
                    "Не стъпвайте директно върху керемидите — използвайте дъски за разпределяне на теглото"
                  ].map((tip, i) => (
                    <div key={i} className="flex gap-3 items-start">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <p className="text-muted-foreground">{tip}</p>
                    </div>
                  ))}
                </div>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  <Link to="/bg/poddruzhka-na-pokrivi" className="text-primary hover:underline font-medium">→ Повече за поддръжка на покриви</Link>
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Често задавани въпроси за смяна на керемиди</h2>
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
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Нужна ви е смяна на керемиди?</h2>
              <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
                Заявете безплатен оглед и получете точна оферта за вашия покрив. Работим с Tondach, Bramac и Wienerberger. 15 години гаранция.
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
      <FloatingCallButton />
    </div>
  );
};

export default TileReplacementGuide;
