import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Calendar, Clock, ArrowLeft, Phone, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import coverImg from "@/assets/blog/roof-maintenance-guide.jpg";

const RoofMaintenanceGuide = () => {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "Поддръжка на покрив — Пълно ръководство за 2026",
    "description": "Как да поддържате покрива си за дълъг живот. Сезонен чеклист, цени за поддръжка, какво да проверявате и кога да извикате специалист.",
    "datePublished": "2026-04-14",
    "dateModified": "2026-04-14",
    "author": { "@type": "Organization", "name": "RemontNaPokriviVarna" },
    "publisher": { "@type": "LocalBusiness", "name": "RemontNaPokriviVarna", "address": { "@type": "PostalAddress", "addressLocality": "Варна", "addressCountry": "BG" } },
    "mainEntityOfPage": "https://www.remontnapokrivivarna.bg/bg/blog/poddruzhka-na-pokriv-rakovodstvo-2026"
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": "Колко често трябва да се проверява покривът?", "acceptedAnswer": { "@type": "Answer", "text": "Покривът трябва да се инспектира поне 2 пъти годишно — пролет (март-април) за проверка на зимни щети и есен (октомври-ноември) за подготовка за зимата. Допълнително се препоръчва проверка след всяка силна буря, градушка или продължителен дъжд." } },
      { "@type": "Question", "name": "Колко струва поддръжката на покрив?", "acceptedAnswer": { "@type": "Answer", "text": "Годишната поддръжка на покрив струва средно 100-300 EUR и включва: инспекция (безплатна при нас), почистване на улуци (50-150 EUR), подмяна на единични повредени керемиди (3-8 EUR/бр.) и малки уплътнявания. Тази инвестиция предотвратява скъпи ремонти за 2,000-10,000 EUR." } },
      { "@type": "Question", "name": "Мога ли сам да поддържам покрива?", "acceptedAnswer": { "@type": "Answer", "text": "Визуална инспекция от земята (с бинокъл) и почистване на достъпни улуци може да правите сами. НЕ се препоръчва да се качвате на покрива без професионално обезопасяване — ежегодно в България има десетки инциденти с падане от покриви." } },
      { "@type": "Question", "name": "Какво включва пролетната инспекция?", "acceptedAnswer": { "@type": "Answer", "text": "Пролетната инспекция включва: проверка за зимни щети (счупени керемиди от лед), състояние на хидроизолация, проверка на улуци и водосточни тръби, инспекция на обшивки около комини и чатми, проверка за мъх и растителност, оценка на дървена конструкция от тавана." } },
      { "@type": "Question", "name": "Кога трябва да извикам специалист вместо да правя сам?", "acceptedAnswer": { "@type": "Answer", "text": "Извикайте специалист при: видими течове или мокри петна, повече от 5 счупени/изместени керемиди, мъх или растителност на повече от 20% от покрива, провисване на конструкцията, странни миризми от тавана (мухъл), покрив на възраст над 20 години без инспекция." } },
      { "@type": "Question", "name": "Покривът ми е на 30 години — нужен ли е ремонт?", "acceptedAnswer": { "@type": "Answer", "text": "Не задължително, но е нужна професионална инспекция. Покрив на 30 години може да е в добро състояние при качествени материали и редовна поддръжка. Ще оценим дали е необходим ремонт, превантивна поддръжка или подмяна. Безплатен оглед — обадете се на 088 499 7659." } },
      { "@type": "Question", "name": "Как да почистя мъх от покрива?", "acceptedAnswer": { "@type": "Answer", "text": "Механично почистване с мека четка (НЕ металическа) е най-безопасният метод. Хербициди за мъх могат да се приложат, но трябва да бъдат биоразградими. НЕ използвайте водоструйка — тя може да повреди повърхността на керемидите. Антимъхово покритие след почистване предотвратява повторно обрастване." } }
    ]
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Начало", "item": "https://www.remontnapokrivivarna.bg/bg" },
      { "@type": "ListItem", "position": 2, "name": "Блог", "item": "https://www.remontnapokrivivarna.bg/bg/blog" },
      { "@type": "ListItem", "position": 3, "name": "Поддръжка на покрив", "item": "https://www.remontnapokrivivarna.bg/bg/blog/poddruzhka-na-pokriv-rakovodstvo-2026" }
    ]
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Поддръжка на покрив — Пълно ръководство 2026 | Варна</title>
        <meta name="description" content="Как да поддържате покрива си: сезонен чеклист, цени за поддръжка (100-300 €/год.), какво да проверявате. Предотвратете скъпи ремонти. Безплатен оглед." />
        <meta property="og:title" content="Поддръжка на покрив — Пълно ръководство 2026" />
        <meta property="og:description" content="Сезонен чеклист за поддръжка на покрив. Спестете хиляди евро с превантивна грижа." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://www.remontnapokrivivarna.bg/bg/blog/poddruzhka-na-pokriv-rakovodstvo-2026" />
        <meta property="og:locale" content="bg_BG" />
        <meta property="article:published_time" content="2026-04-14" />
        <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <Header />

      <main className="pt-20">
        <section className="relative h-[50vh] min-h-[400px]">
          <img src={coverImg} alt="Поддръжка на покрив — ръководство 2026" className="w-full h-full object-cover" width={1200} height={630} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="container mx-auto">
              <nav className="text-sm text-white/80 mb-4">
                <Link to="/bg" className="hover:text-white">Начало</Link><span className="mx-2">/</span>
                <Link to="/bg/blog" className="hover:text-white">Блог</Link><span className="mx-2">/</span>
                <span className="text-white">Поддръжка на покрив</span>
              </nav>
              <div className="flex items-center gap-3 mb-4">
                <Badge className="bg-primary text-primary-foreground">Поддръжка</Badge>
                <span className="text-white/80 flex items-center gap-1 text-sm"><Calendar className="w-4 h-4" /> 14 април 2026</span>
                <span className="text-white/80 flex items-center gap-1 text-sm"><Clock className="w-4 h-4" /> 12 мин четене</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-white max-w-4xl">
                Поддръжка на покрив — Пълно ръководство за 2026
              </h1>
            </div>
          </div>
        </section>

        <article className="py-12">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="prose prose-lg max-w-none">

              <section className="mb-12">
                <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                  Редовната поддръжка на покрива струва средно <strong>100-300 EUR годишно</strong> и удължава живота му с <strong>15-25 години</strong>. Без поддръжка, покрив, който може да издържи 50 години, се нуждае от подмяна след 25-30. Тази статия е пълно ръководство за поддръжка на всички видове покриви — с конкретни чеклисти, цени и съвети от нашия 15-годишен опит.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Повечето собственици на жилища мислят за покрива едва когато потече. Но точно както колата се нуждае от редовна смяна на масло, покривът изисква периодична инспекция и превантивна поддръжка. Разликата е, че пропуснатата смяна на масло може да повреди двигателя за 2,000-5,000 EUR, докато пропуснатата поддръжка на покрива може да причини щети за <strong>10,000-30,000 EUR</strong> — гнили конструкции, мухъл, повредена изолация и тавани.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Във Варна и по Черноморието покривите са подложени на по-интензивно натоварване от вътрешността на страната — соленият морски въздух ускорява корозията на метални елементи, силните ветрове изместват керемиди, а обилните дъждове тестват хидроизолацията. Затова редовната поддръжка тук е особено важна.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Какво включва поддръжката на покрив?</h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Поддръжката на покрив обхваща 6 основни области, всяка от които е важна за цялостната защита на сградата:
                </p>

                <h3 className="text-xl font-bold text-foreground mb-4">1. Инспекция на покривното покритие</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Проверка за счупени, напукани, изместени или липсващи керемиди (или листове при метален покрив). Дори една счупена керемида може да допусне вода, която за месеци може да повреди конструкцията. Честота: 2 пъти годишно + след всяка силна буря. Ние извършваме тази инспекция безплатно.
                </p>

                <h3 className="text-xl font-bold text-foreground mb-4">2. Почистване на улуци и водосточни тръби</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Запушените улуци са причина за 15% от всички течове. Листа, мръсотия и клони запушват улуците, водата прелива и навлиза под покривното покритие или по стените на сградата. Почистване: 2 пъти годишно (пролет и есен). Цена: <strong>50-150 EUR</strong> за еднофамилна къща.
                </p>

                <h3 className="text-xl font-bold text-foreground mb-4">3. Проверка на обшивки и уплътнения</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Ламаринените обшивки около комини, чатми, вентилационни тръби и стените са критични зони. Силиконовите фуги и уплътнения се износват за 5-10 години и трябва да се обновяват. Пропуснатата обшивка е втората най-честа причина за течове.
                </p>

                <h3 className="text-xl font-bold text-foreground mb-4">4. Контрол на мъх и растителност</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Мъхът задържа влага върху керемидите, ускорява тяхното разрушаване и може да повдигне керемиди от позицията им. Особено проблемен е на северни скатове и сенчести зони. Почистване с мека четка и прилагане на антимъхово покритие. Цена: <strong>3-6 EUR/м²</strong>.
                </p>

                <h3 className="text-xl font-bold text-foreground mb-4">5. Инспекция от вътрешната страна (таван)</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Проверка на таванското пространство разкрива проблеми, невидими отвън — мокри петна по мертеци, гнилост, следи от мухъл, повредена изолация, гнезда на птици или гризачи. Това е критично важна част от инспекцията, която мнозина пропускат.
                </p>

                <h3 className="text-xl font-bold text-foreground mb-4">6. Проверка на вентилация</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Правилната вентилация на таванското пространство предотвратява конденз и мухъл. Проверява се дали вентилационните решетки не са запушени и дали има достатъчен въздушен поток. Лошата вентилация е причина за 7% от „течовете", които всъщност са конденз.
                </p>
              </section>

              {/* Сезонен чеклист */}
              <section className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Сезонен чеклист за поддръжка</h2>

                <Card className="mb-6 border-green-200 bg-green-50/50">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-green-800 mb-4">🌸 Пролет (март-април)</h3>
                    <div className="space-y-2">
                      {[
                        "Проверете за зимни щети — счупени керемиди от лед, измръзнали улуци",
                        "Почистете улуците от натрупани листа и мръсотия",
                        "Проверете обшивки около комини и чатми",
                        "Инспектирайте тавана за следи от влага и мухъл",
                        "Подрежете надвисващи клони на дървета",
                        "Проверете за мъх и растителност, особено на северни скатове",
                        "Уверете се, че водосточните тръби отвеждат водата далеч от основите"
                      ].map((item, i) => (
                        <div key={i} className="flex gap-2 items-start">
                          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <p className="text-green-900">{item}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="mb-6 border-yellow-200 bg-yellow-50/50">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-yellow-800 mb-4">☀️ Лято (юли-август)</h3>
                    <div className="space-y-2">
                      {[
                        "Идеален период за планирани ремонти — стабилно време",
                        "Проверете за повреди от градушка (ако е имало)",
                        "Почистете мъх от горещите зони (слънцето помага за изсушаване)",
                        "Проверете състоянието на битумната изолация (плосък покрив) — мехури и пукнатини",
                        "Обновете силиконови уплътнения, ако са износени"
                      ].map((item, i) => (
                        <div key={i} className="flex gap-2 items-start">
                          <CheckCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                          <p className="text-yellow-900">{item}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="mb-6 border-orange-200 bg-orange-50/50">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-orange-800 mb-4">🍂 Есен (октомври-ноември)</h3>
                    <div className="space-y-2">
                      {[
                        "Последно почистване на улуци преди зимата — критично важно!",
                        "Проверете за изместени или хлабави керемиди — вятърът ги изтръгва лесно",
                        "Инспектирайте хидроизолацията и обшивките",
                        "Монтирайте снегозадържатели (ако липсват)",
                        "Проверете вентилационните решетки на тавана",
                        "Подрежете наново израснали клони",
                        "Направете последен оглед от тавана за следи от влага"
                      ].map((item, i) => (
                        <div key={i} className="flex gap-2 items-start">
                          <CheckCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                          <p className="text-orange-900">{item}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="mb-6 border-blue-200 bg-blue-50/50">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-blue-800 mb-4">❄️ Зима (декември-февруари)</h3>
                    <div className="space-y-2">
                      {[
                        "Наблюдавайте за натрупване на сняг (над 30 см е рисково за по-стари конструкции)",
                        "Проверявайте за ледени висулки — те показват проблем с изолацията или вентилацията",
                        "Реагирайте незабавно при течове — обадете се за спешен ремонт",
                        "НЕ се качвайте на покрива при лед и сняг",
                        "Проверявайте тавана за конденз и капеща вода"
                      ].map((item, i) => (
                        <div key={i} className="flex gap-2 items-start">
                          <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                          <p className="text-blue-900">{item}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Цени */}
              <section className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Цени за поддръжка на покрив — Варна 2026</h2>
                <div className="overflow-x-auto mb-8">
                  <table className="w-full border-collapse border border-border">
                    <thead>
                      <tr className="bg-muted">
                        <th className="border border-border p-4 text-left font-bold text-foreground">Услуга</th>
                        <th className="border border-border p-4 text-center font-bold text-foreground">Цена (EUR)</th>
                        <th className="border border-border p-4 text-center font-bold text-foreground">Честота</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ["Професионален оглед", "Безплатно", "2 пъти/год."],
                        ["Почистване на улуци", "50 – 150", "2 пъти/год."],
                        ["Подмяна на единични керемиди", "3 – 8/бр.", "При нужда"],
                        ["Обновяване на силиконови фуги", "50 – 200", "На 5-8 год."],
                        ["Почистване на мъх", "3 – 6/м²", "На 3-5 год."],
                        ["Антимъхово покритие", "2 – 4/м²", "На 3-5 год."],
                        ["Подмяна на обшивки (комин)", "200 – 500", "На 15-20 год."],
                        ["Проверка и ремонт на вентилация", "100 – 300", "При нужда"],
                      ].map(([service, price, freq], i) => (
                        <tr key={i} className={i % 2 === 0 ? "bg-background" : "bg-muted/50"}>
                          <td className="border border-border p-4 text-muted-foreground">{service}</td>
                          <td className="border border-border p-4 text-center font-semibold text-foreground">{price}</td>
                          <td className="border border-border p-4 text-center text-muted-foreground">{freq}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
                  <p className="text-green-800 font-medium">
                    💰 <strong>Математиката е ясна:</strong> 100-300 EUR годишно за поддръжка vs. 3,000-15,000 EUR за основен ремонт заради пренебрегване. Превантивната поддръжка се изплаща 10-50 пъти.
                  </p>
                </div>
              </section>

              {/* Специфики по вид покрив */}
              <section className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Поддръжка по вид покрив</h2>

                <h3 className="text-xl font-bold text-foreground mb-4">Керемиден покрив</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Керемидените покриви са най-разпространените и имат най-дълъг живот при правилна поддръжка — до 80-100 години за глинени керемиди. Основните задачи са: проверка за счупени/изместени керемиди, почистване от мъх (особено бетонни керемиди), проверка на летви и мембрана от тавана. Критични зони: долини, ребра, била, обшивки около комини.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  <Link to="/bg/remont-na-keremideni-pokrivi" className="text-primary hover:underline font-medium">→ Повече за ремонт на керемидени покриви</Link>
                </p>

                <h3 className="text-xl font-bold text-foreground mb-4">Плосък покрив</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Плоските покриви изискват по-честа поддръжка. Битумната хидроизолация трябва да се проверява за мехури, пукнатини и отлепяния. Отводнителите трябва да са чисти — задържането на вода върху плосък покрив е основната причина за течове. Животът на битумна изолация: 10-15 години, PVC мембрана: 20-30 години.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  <Link to="/bg/remont-na-ploski-pokrivi" className="text-primary hover:underline font-medium">→ Повече за ремонт на плоски покриви</Link>
                </p>

                <h3 className="text-xl font-bold text-foreground mb-4">Метален покрив</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Металните покриви са относително лесни за поддръжка. Основната грижа е антикорозионна защита — проверка за ръжда, особено около крепежните елементи и срезовете. При поява на ръжда — обработка с антикорозионен грунд и боя. Проверка на уплътнения на винтовете, тъй като гумените уплътнители се износват за 8-12 години.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  <Link to="/bg/metalni-pokrivi" className="text-primary hover:underline font-medium">→ Повече за метални покриви</Link>
                </p>
              </section>

              {/* Реални примери */}
              <section className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Реални примери: Поддръжка vs. Пренебрегване</h2>

                <Card className="mb-6 border-green-200">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-green-700 mb-2">✅ Къща с редовна поддръжка — кв. Бриз, Варна</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>🏠 <strong>Покрив:</strong> Глинени керемиди, 28 години</li>
                      <li>🔧 <strong>Поддръжка:</strong> Годишен оглед, почистване на улуци, подмяна на 5-10 керемиди на 3-4 години</li>
                      <li>💰 <strong>Общ разход за 28 години:</strong> ~4,500 EUR</li>
                      <li>📊 <strong>Състояние:</strong> Отлично, очакван остатъчен живот 30+ години</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="mb-6 border-red-200">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-red-700 mb-2">❌ Къща без поддръжка — кв. Владиславово, Варна</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>🏠 <strong>Покрив:</strong> Бетонни керемиди, 22 години</li>
                      <li>🔧 <strong>Поддръжка:</strong> Никаква за 22 години</li>
                      <li>💰 <strong>Резултат:</strong> Масово обрастване с мъх, 15% счупени керемиди, гнили летви, теч в 3 стаи, мухъл в тавана</li>
                      <li>💰 <strong>Разход за ремонт:</strong> 6,200 EUR (пълна подмяна на покритие + летви + мембрана)</li>
                      <li>📊 <strong>Спестени при поддръжка:</strong> ~3,500 EUR (ако се беше поддържал)</li>
                    </ul>
                  </CardContent>
                </Card>
              </section>

              {/* Кога да повикам специалист */}
              <section className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">5 сигнала, че е време да повикате специалист</h2>
                <div className="space-y-4 mb-6">
                  {[
                    { title: "Мокри петна на тавана или стените", desc: "Дори малко петно означава, че водата вече е навлязла. Не чакайте да стане по-голямо — колкото по-рано реагирате, толкова по-евтин е ремонтът." },
                    { title: "Видимо провисване на покрива", desc: "Провиснал участък означава проблем с носещата конструкция — мертеци, столици. Това е сериозен структурен проблем, който изисква спешна намеса." },
                    { title: "Мирис на мухъл от тавана", desc: "Мухълът е здравен риск и показва, че има хронична влага в таванското пространство. Причината трябва да се открие и отстрани." },
                    { title: "Покривът е на повече от 20 години без инспекция", desc: "Дори да изглежда добре отвън, може да има скрити проблеми — повредена мембрана, начална гнилост на летви, износени уплътнения." },
                    { title: "Рязко увеличение на сметките за отопление", desc: "Това може да означава повредена или намокрена изолация на покрива, което намалява драстично нейната ефективност." }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">{i + 1}</div>
                      <div>
                        <h3 className="font-bold text-foreground mb-1">{item.title}</h3>
                        <p className="text-muted-foreground">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Често задавани въпроси за поддръжка на покрив</h2>
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
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Заявете безплатен оглед на вашия покрив</h2>
              <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
                Нашите специалисти ще инспектират покрива ви безплатно и ще ви кажат точно какво е необходимо. Без задължение.
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

export default RoofMaintenanceGuide;
