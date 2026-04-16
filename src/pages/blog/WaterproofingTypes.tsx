import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Calendar, Clock, ArrowLeft, Phone, Tag, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import waterproofingTypesImg from "@/assets/blog/waterproofing-types.jpg";

const WaterproofingTypes = () => {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "Видове хидроизолация на покрив — Пълен наръчник с цени 2026",
    "description": "Битумна 8-15 €/м², PVC мембрана 15-25 €/м², течна 12-20 €/м², EPDM 18-30 €/м². Пълно сравнение на 4-те основни вида хидроизолация с ценови таблици.",
    "image": "https://www.remontnapokrivivarna.bg/og-image.jpg",
    "datePublished": "2024-11-01",
    "dateModified": "2026-04-14",
    "author": { "@type": "Organization", "name": "RemontNaPokriviVarna" },
    "publisher": {
      "@type": "LocalBusiness",
      "name": "RemontNaPokriviVarna",
      "address": { "@type": "PostalAddress", "addressLocality": "Варна", "addressCountry": "BG" }
    },
    "mainEntityOfPage": "https://www.remontnapokrivivarna.bg/bg/blog/vidove-hidroizolacia-narachnik"
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": "Коя хидроизолация е най-добра за плосък покрив?", "acceptedAnswer": { "@type": "Answer", "text": "За плоски покриви PVC мембраната е оптималният избор — издръжливост 20-30 години, устойчивост на UV и механични повреди. При ограничен бюджет, модифицираният битум (SBS) е надеждна алтернатива с 10-15 години живот." } },
      { "@type": "Question", "name": "Колко струва хидроизолация на покрив?", "acceptedAnswer": { "@type": "Answer", "text": "Цени за 2026: битумна хидроизолация 8-15 EUR/м², PVC мембрана 15-25 EUR/м², течна хидроизолация 12-20 EUR/м², EPDM 18-30 EUR/м². Цените включват материали и труд. За 100 м² покрив: 800-3,000 EUR." } },
      { "@type": "Question", "name": "Колко години издържа хидроизолацията?", "acceptedAnswer": { "@type": "Answer", "text": "Битумна: 10-15 години. PVC мембрана: 20-30 години. Течна полиуретанова: 15-20 години. EPDM каучукова: 25-40 години. Животът зависи от качеството на монтажа и редовната поддръжка." } },
      { "@type": "Question", "name": "Може ли новата хидроизолация да се положи върху старата?", "acceptedAnswer": { "@type": "Answer", "text": "Зависи от състоянието на старата. Ако е без балони и здраво залепена — да, като грунд слой. Ако е с балони, влага или отлепени участъци — задължително се отстранява. Полагането върху влажна или повредена стара изолация е най-честата грешка." } },
      { "@type": "Question", "name": "Каква хидроизолация да изберем за тераса?", "acceptedAnswer": { "@type": "Answer", "text": "За тераси течната полиуретанова хидроизолация е идеална — безшевна, еластична и може да се нанесе върху сложни форми. Цена: 12-20 EUR/м². За тераси с голямо натоварване — PVC мембрана с механично закрепване." } },
      { "@type": "Question", "name": "Кога е най-добрият сезон за хидроизолация?", "acceptedAnswer": { "@type": "Answer", "text": "Оптималният период е април-октомври при температури над 5°C и сухо време. Битумната изисква температура над 10°C. Течната хидроизолация може да се нанася при 5-35°C. Избягвайте работа при дъжд или очакван дъжд в рамките на 24 часа." } },
      { "@type": "Question", "name": "Давате ли гаранция за хидроизолацията?", "acceptedAnswer": { "@type": "Answer", "text": "Да, предоставяме 15 години гаранция за всички хидроизолационни работи. Използваме материали от Sika, Ceresit и Icopal с фабрична гаранция. Гаранцията покрива материали и труд." } }
    ]
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Начало", "item": "https://www.remontnapokrivivarna.bg/bg" },
      { "@type": "ListItem", "position": 2, "name": "Блог", "item": "https://www.remontnapokrivivarna.bg/bg/blog" },
      { "@type": "ListItem", "position": 3, "name": "Видове хидроизолация", "item": "https://www.remontnapokrivivarna.bg/bg/blog/vidove-hidroizolacia-narachnik" }
    ]
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Видове Хидроизолация на Покрив — Цени и Наръчник 2026 | Варна</title>
        <meta name="description" content="Битумна 8-15 €/м², PVC 15-25 €/м², течна 12-20 €/м². Пълно сравнение на 4 вида хидроизолация с ценови таблици, реални примери от Варна и експертни съвети." />
        <meta property="og:title" content="Видове Хидроизолация — Цени и Сравнение 2026 | Варна" />
        <meta property="og:description" content="Битумна 8-15 €/м², PVC 15-25 €/м², течна 12-20 €/м². Пълно сравнение с ценови таблици." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://www.remontnapokrivivarna.bg/bg/blog/vidove-hidroizolacia-narachnik" />
        <meta property="og:image" content="https://www.remontnapokrivivarna.bg/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="bg_BG" />
        <meta property="og:site_name" content="Ремонт на Покриви Варна" />
        <meta property="article:published_time" content="2024-11-01" />
        <meta property="article:modified_time" content="2026-04-14" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <Header />
      <main className="pt-20">
        <section className="relative h-[50vh] min-h-[400px]">
          <img src={waterproofingTypesImg} alt="Полагане на хидроизолация на плосък покрив във Варна" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="container mx-auto">
              <nav className="text-sm text-muted-foreground mb-4">
                <Link to="/bg" className="hover:text-primary">Начало</Link><span className="mx-2">/</span>
                <Link to="/bg/blog" className="hover:text-primary">Блог</Link><span className="mx-2">/</span>
                <span className="text-foreground">Видове хидроизолация</span>
              </nav>
              <Badge className="mb-4">Хидроизолация</Badge>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">Видове хидроизолация на покрив — Пълен наръчник с цени 2026</h1>
              <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />Обновена: 14 април 2026</span>
                <span className="flex items-center gap-1"><Clock className="w-4 h-4" />14 мин четене</span>
              </div>
            </div>
          </div>
        </section>

        <article className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="prose prose-lg max-w-none">

                <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                  Хидроизолацията е критичният слой, който стои между вашия дом и дъждовната вода. Правилният избор на хидроизолационен материал определя колко дълго покривът ви ще остане сух и без проблеми. В този наръчник сравняваме 4-те основни вида хидроизолация с актуални цени за 2026, обясняваме кога да изберете всеки тип и споделяме реални примери от нашата практика във Варна.
                </p>

                <p className="text-foreground/80 mb-6">
                  Във Варна и Черноморието хидроизолацията е изложена на специфични натоварвания: интензивни есенни и зимни валежи (средно 480 мм годишно), силни ветрове, солен морски въздух и температурни амплитуди от -10°C до +40°C. Тези фактори правят избора на правилна хидроизолация критично важен. Неправилно подбрана или некачествено положена хидроизолация може да се повреди за 3-5 години вместо очакваните 15-30.
                </p>

                <p className="text-foreground/80 mb-6">
                  Ние работим с хидроизолационни материали от Sika, Ceresit и Icopal — марки с доказано качество и фабрична гаранция. При всеки проект избираме материала според конкретните условия: тип покрив, наклон, натоварване и бюджет на клиента.
                </p>

                <div className="bg-secondary/30 rounded-xl p-6 my-8">
                  <h3 className="text-xl font-bold text-foreground mb-4">Бърз преглед — цени за 2026:</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead><tr className="bg-secondary/50">
                        <th className="border border-border p-3 text-left text-foreground">Тип</th>
                        <th className="border border-border p-3 text-left text-foreground">Цена (EUR/м²)</th>
                        <th className="border border-border p-3 text-left text-foreground">Издръжливост</th>
                      </tr></thead>
                      <tbody>
                        <tr><td className="border border-border p-3 text-foreground/80">Битумна (SBS/APP)</td><td className="border border-border p-3 text-foreground/80 font-medium">8-15</td><td className="border border-border p-3 text-foreground/80">10-15 години</td></tr>
                        <tr><td className="border border-border p-3 text-foreground/80">PVC мембрана</td><td className="border border-border p-3 text-foreground/80 font-medium">15-25</td><td className="border border-border p-3 text-foreground/80">20-30 години</td></tr>
                        <tr><td className="border border-border p-3 text-foreground/80">Течна (полиуретанова)</td><td className="border border-border p-3 text-foreground/80 font-medium">12-20</td><td className="border border-border p-3 text-foreground/80">15-20 години</td></tr>
                        <tr><td className="border border-border p-3 text-foreground/80">EPDM каучукова</td><td className="border border-border p-3 text-foreground/80 font-medium">18-30</td><td className="border border-border p-3 text-foreground/80">25-40 години</td></tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Тип 1: Битумна */}
                <h2 className="text-2xl font-bold text-foreground mt-12 mb-6">1. Битумна хидроизолация (Модифициран битум SBS/APP)</h2>
                <p className="text-foreground/80 mb-4">
                  Битумната хидроизолация е най-разпространеният тип в България и покрива около 65% от пазара. Тя се състои от битумна маса, модифицирана с SBS (стирен-бутадиен-стирен) или APP (атактичен полипропилен), усилена с полиестерна или стъклотъканна основа. SBS модификацията дава гъвкавост при ниски температури (до -25°C), което я прави предпочитана за нашия климат. APP е по-устойчива на UV, но по-крехка при студ.
                </p>

                <h3 className="text-xl font-bold text-foreground mt-8 mb-4">Технически характеристики:</h3>
                <ul className="space-y-2 text-foreground/80 mb-6">
                  <li>• <strong>Дебелина:</strong> 3-5 мм (един или два слоя)</li>
                  <li>• <strong>Тегло:</strong> 3-5 кг/м²</li>
                  <li>• <strong>Температурен диапазон:</strong> -25°C до +100°C (SBS)</li>
                  <li>• <strong>Метод на полагане:</strong> С горелка (flame-on) или самозалепваща</li>
                  <li>• <strong>Минимален наклон:</strong> 1-2%</li>
                </ul>

                <div className="grid md:grid-cols-2 gap-6 my-8">
                  <Card className="border-green-500/50"><CardHeader className="pb-2"><h4 className="font-bold text-green-600">✓ Предимства</h4></CardHeader><CardContent><ul className="space-y-2 text-sm text-foreground/80">
                    <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-1" />Най-достъпна цена (8-15 EUR/м²)</li>
                    <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-1" />Изпитана технология, познати материали</li>
                    <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-1" />Лесен частичен ремонт</li>
                    <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-1" />Добра устойчивост на UV (APP модификация)</li>
                    <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-1" />Широка мрежа от специалисти</li>
                  </ul></CardContent></Card>
                  <Card className="border-red-500/50"><CardHeader className="pb-2"><h4 className="font-bold text-red-600">✗ Недостатъци</h4></CardHeader><CardContent><ul className="space-y-2 text-sm text-foreground/80">
                    <li>• Изисква горелка за монтаж (пожароопасно)</li>
                    <li>• По-къс живот (10-15 години)</li>
                    <li>• Може да се напука при -15°C (APP тип)</li>
                    <li>• По-голямо тегло от алтернативите</li>
                    <li>• Неприятна миризма при монтаж</li>
                  </ul></CardContent></Card>
                </div>

                <div className="bg-secondary/30 rounded-xl p-6 my-8">
                  <h4 className="font-bold text-foreground mb-3">🏠 Кога да изберете битумна хидроизолация:</h4>
                  <ul className="space-y-2 text-foreground/80">
                    <li>• Плоски покриви на жилищни сгради и панелки</li>
                    <li>• Ограничен бюджет (най-евтиният вариант)</li>
                    <li>• Покриви с малък наклон (1-5%)</li>
                    <li>• Ремонт на съществуваща битумна изолация</li>
                    <li>• Гаражи, складове и помощни сгради</li>
                  </ul>
                </div>

                <div className="bg-secondary/30 rounded-xl p-6 my-8">
                  <h4 className="font-bold text-foreground mb-3">📍 Реален пример — Жилищен блок, кв. Младост, Варна</h4>
                  <p className="text-foreground/80">Плосък покрив 320 м² с 12-годишна битумна хидроизолация — множество течове. Решение: пълна подмяна с двуслойна SBS битумна мембрана Icopal. Цена: 3,840 EUR (12 EUR/м²). Срок: 5 работни дни. Гаранция: 15 години.</p>
                </div>

                {/* Тип 2: PVC */}
                <h2 className="text-2xl font-bold text-foreground mt-12 mb-6">2. PVC мембрани (Синтетични мембрани)</h2>
                <p className="text-foreground/80 mb-4">
                  PVC мембраните са модерното решение за хидроизолация, което набира бързо популярност в България. Те са изработени от поливинилхлорид, армиран с полиестерна мрежа, и се заваряват на местата на припокриване с горещ въздух. Това създава монолитен безшевен слой с живот 20-30+ години.
                </p>
                <p className="text-foreground/80 mb-4">
                  PVC мембраните са стандарт в Западна Европа и все повече навлизат и в България — особено за нови строежи и търговски сгради. Те са до 2 пъти по-скъпи от битумните, но издържат 2-3 пъти по-дълго, което ги прави по-изгодни в дългосрочен план.
                </p>

                <h3 className="text-xl font-bold text-foreground mt-8 mb-4">Технически характеристики:</h3>
                <ul className="space-y-2 text-foreground/80 mb-6">
                  <li>• <strong>Дебелина:</strong> 1.2-2.0 мм</li>
                  <li>• <strong>Тегло:</strong> 1.5-2.5 кг/м² (3x по-леки от битумните)</li>
                  <li>• <strong>Температурен диапазон:</strong> -30°C до +80°C</li>
                  <li>• <strong>Метод на полагане:</strong> Заваряване с горещ въздух</li>
                  <li>• <strong>Устойчивост на корени:</strong> Да (подходящи за зелени покриви)</li>
                </ul>

                <div className="grid md:grid-cols-2 gap-6 my-8">
                  <Card className="border-green-500/50"><CardHeader className="pb-2"><h4 className="font-bold text-green-600">✓ Предимства</h4></CardHeader><CardContent><ul className="space-y-2 text-sm text-foreground/80">
                    <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-1" />Дълъг живот (20-30+ години)</li>
                    <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-1" />Висока еластичност и гъвкавост</li>
                    <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-1" />Устойчивост на корени (зелени покриви)</li>
                    <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-1" />Лек материал (минимално натоварване)</li>
                    <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-1" />Без открит пламък при монтаж</li>
                  </ul></CardContent></Card>
                  <Card className="border-red-500/50"><CardHeader className="pb-2"><h4 className="font-bold text-red-600">✗ Недостатъци</h4></CardHeader><CardContent><ul className="space-y-2 text-sm text-foreground/80">
                    <li>• По-висока начална цена (15-25 EUR/м²)</li>
                    <li>• Изисква специализирано оборудване за заваряване</li>
                    <li>• Не може да се комбинира с битум</li>
                    <li>• По-чувствителна на механични пробиви</li>
                    <li>• По-малко специалисти в България</li>
                  </ul></CardContent></Card>
                </div>

                <div className="bg-secondary/30 rounded-xl p-6 my-8">
                  <h4 className="font-bold text-foreground mb-3">📍 Реален пример — Търговски обект, Бизнес Парк Варна</h4>
                  <p className="text-foreground/80">Плосък покрив 450 м² на търговска сграда. Монтаж на PVC мембрана Sika 1.5 мм с механично закрепване. Цена: 9,000 EUR (20 EUR/м²). Срок: 7 работни дни. Гаранция: 15 години (фабрична от Sika: 25 години).</p>
                </div>

                {/* Тип 3: Течна */}
                <h2 className="text-2xl font-bold text-foreground mt-12 mb-6">3. Течна хидроизолация (Полиуретанова / Акрилна)</h2>
                <p className="text-foreground/80 mb-4">
                  Течната хидроизолация се нанася с валяк или пистолет и образува безшевно еластично покритие. Тя е идеална за покриви със сложни форми, множество детайли и малки площи, където рулонните материали са трудни за приложение.
                </p>
                <p className="text-foreground/80 mb-4">
                  Полиуретановата течна хидроизолация е премиум вариантът — с отлична еластичност (до 800% удължение) и UV устойчивост. Акрилната е по-достъпна, но с по-къс живот и по-малка еластичност. За покриви препоръчваме полиуретановата.
                </p>

                <h3 className="text-xl font-bold text-foreground mt-8 mb-4">Технически характеристики:</h3>
                <ul className="space-y-2 text-foreground/80 mb-6">
                  <li>• <strong>Дебелина:</strong> 2-4 мм (2-3 слоя)</li>
                  <li>• <strong>Тегло:</strong> 2-4 кг/м²</li>
                  <li>• <strong>Еластичност:</strong> До 800% (полиуретанова)</li>
                  <li>• <strong>Метод на нанасяне:</strong> Валяк, четка или безвъздушен пистолет</li>
                  <li>• <strong>Подходяща за:</strong> Тераси, балкони, сложни форми</li>
                </ul>

                <div className="grid md:grid-cols-2 gap-6 my-8">
                  <Card className="border-green-500/50"><CardHeader className="pb-2"><h4 className="font-bold text-green-600">✓ Предимства</h4></CardHeader><CardContent><ul className="space-y-2 text-sm text-foreground/80">
                    <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-1" />Безшевна защита (без слаби точки)</li>
                    <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-1" />Идеална за сложни форми и детайли</li>
                    <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-1" />Бързо нанасяне (1 ден за 50 м²)</li>
                    <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-1" />Лесно обновяване (нов слой върху стария)</li>
                  </ul></CardContent></Card>
                  <Card className="border-red-500/50"><CardHeader className="pb-2"><h4 className="font-bold text-red-600">✗ Недостатъци</h4></CardHeader><CardContent><ul className="space-y-2 text-sm text-foreground/80">
                    <li>• Качеството зависи от нанасянето</li>
                    <li>• Изисква абсолютно суха повърхност</li>
                    <li>• 2-3 слоя за оптимален резултат</li>
                    <li>• Акрилните варианти имат по-къс живот</li>
                  </ul></CardContent></Card>
                </div>

                <div className="bg-secondary/30 rounded-xl p-6 my-8">
                  <h4 className="font-bold text-foreground mb-3">📍 Реален пример — Тераса 35 м², кв. Бриз, Варна</h4>
                  <p className="text-foreground/80">Тераса с множество ъгли и водосточни тръби. Нанасяне на полиуретанова хидроизолация Sika Liquid в 3 слоя. Цена: 560 EUR (16 EUR/м²). Срок: 2 дни (включително изсъхване). Гаранция: 15 години.</p>
                </div>

                {/* Тип 4: EPDM */}
                <h2 className="text-2xl font-bold text-foreground mt-12 mb-6">4. EPDM каучукова мембрана</h2>
                <p className="text-foreground/80 mb-4">
                  EPDM (етилен-пропилен-диенов мономер) е синтетичен каучук с изключителна издръжливост — 25-40+ години без поддръжка. Това е премиум решение с най-дълъг живот от всички видове хидроизолация. EPDM мембраните се използват масово в Северна Америка и Западна Европа за плоски покриви на търговски и индустриални сгради.
                </p>

                <h3 className="text-xl font-bold text-foreground mt-8 mb-4">Технически характеристики:</h3>
                <ul className="space-y-2 text-foreground/80 mb-6">
                  <li>• <strong>Дебелина:</strong> 1.1-2.3 мм</li>
                  <li>• <strong>Еластичност:</strong> До 300% удължение</li>
                  <li>• <strong>Температурен диапазон:</strong> -45°C до +130°C</li>
                  <li>• <strong>Живот:</strong> 25-40+ години</li>
                  <li>• <strong>Метод:</strong> Залепване или механично закрепване</li>
                </ul>

                <div className="bg-secondary/30 rounded-xl p-6 my-8">
                  <h4 className="font-bold text-foreground mb-3">📍 Реален пример — Индустриална сграда, Западна промишлена зона</h4>
                  <p className="text-foreground/80">Плосък покрив 800 м² на складова база. Монтаж на EPDM мембрана Firestone 1.5 мм с баластно закрепване. Цена: 20,000 EUR (25 EUR/м²). Срок: 10 работни дни. Очакван живот: 30+ години.</p>
                </div>

                {/* Сравнителна таблица */}
                <h2 className="text-2xl font-bold text-foreground mt-12 mb-6">Пълна сравнителна таблица</h2>
                <div className="overflow-x-auto my-8">
                  <table className="w-full border-collapse text-sm">
                    <thead><tr className="bg-secondary/50">
                      <th className="border border-border p-3 text-left text-foreground">Критерий</th>
                      <th className="border border-border p-3 text-left text-foreground">Битумна</th>
                      <th className="border border-border p-3 text-left text-foreground">PVC</th>
                      <th className="border border-border p-3 text-left text-foreground">Течна</th>
                      <th className="border border-border p-3 text-left text-foreground">EPDM</th>
                    </tr></thead>
                    <tbody>
                      <tr><td className="border border-border p-3 font-medium text-foreground">Цена (EUR/м²)</td><td className="border border-border p-3 text-foreground/80">8-15</td><td className="border border-border p-3 text-foreground/80">15-25</td><td className="border border-border p-3 text-foreground/80">12-20</td><td className="border border-border p-3 text-foreground/80">18-30</td></tr>
                      <tr><td className="border border-border p-3 font-medium text-foreground">Живот (години)</td><td className="border border-border p-3 text-foreground/80">10-15</td><td className="border border-border p-3 text-foreground/80">20-30</td><td className="border border-border p-3 text-foreground/80">15-20</td><td className="border border-border p-3 text-foreground/80">25-40</td></tr>
                      <tr><td className="border border-border p-3 font-medium text-foreground">Цена/година (EUR/м²)</td><td className="border border-border p-3 text-foreground/80 font-medium">0.67-1.00</td><td className="border border-border p-3 text-foreground/80 font-medium">0.63-0.83</td><td className="border border-border p-3 text-foreground/80 font-medium">0.70-1.00</td><td className="border border-border p-3 text-foreground/80 font-medium">0.56-0.75</td></tr>
                      <tr><td className="border border-border p-3 font-medium text-foreground">UV устойчивост</td><td className="border border-border p-3 text-foreground/80">Добра</td><td className="border border-border p-3 text-foreground/80">Много добра</td><td className="border border-border p-3 text-foreground/80">Отлична</td><td className="border border-border p-3 text-foreground/80">Отлична</td></tr>
                      <tr><td className="border border-border p-3 font-medium text-foreground">Еластичност</td><td className="border border-border p-3 text-foreground/80">Средна</td><td className="border border-border p-3 text-foreground/80">Висока</td><td className="border border-border p-3 text-foreground/80">Много висока</td><td className="border border-border p-3 text-foreground/80">Висока</td></tr>
                      <tr><td className="border border-border p-3 font-medium text-foreground">Зелен покрив</td><td className="border border-border p-3 text-foreground/80">Не</td><td className="border border-border p-3 text-foreground/80">Да</td><td className="border border-border p-3 text-foreground/80">Не</td><td className="border border-border p-3 text-foreground/80">Да</td></tr>
                    </tbody>
                  </table>
                </div>

                {/* Вътрешни линкове */}
                <h2 className="text-2xl font-bold text-foreground mt-12 mb-6">Свързани услуги</h2>
                <div className="bg-secondary/30 rounded-xl p-6 my-8 border border-border/30">
                  <div className="grid md:grid-cols-2 gap-3">
                    <Link to="/bg/hidroizolacia-na-pokriv" className="text-primary hover:underline flex items-center gap-2">→ Хидроизолация на покрив</Link>
                    <Link to="/bg/remont-na-ploski-pokrivi" className="text-primary hover:underline flex items-center gap-2">→ Ремонт на плоски покриви</Link>
                    <Link to="/bg/remont-na-pokrivi" className="text-primary hover:underline flex items-center gap-2">→ Ремонт на покриви</Link>
                    <Link to="/bg/remont-na-techove-pokriv" className="text-primary hover:underline flex items-center gap-2">→ Ремонт на течове</Link>
                  </div>
                </div>

                {/* FAQ */}
                <h2 className="text-2xl font-bold text-foreground mt-12 mb-6">Често задавани въпроси</h2>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="faq-1"><AccordionTrigger>Коя хидроизолация е най-добра за плосък покрив?</AccordionTrigger><AccordionContent>За плоски покриви PVC мембраната е оптималният избор — издръжливост 20-30 години, устойчивост на UV и механични повреди. При ограничен бюджет, модифицираният битум (SBS) е надеждна алтернатива с 10-15 години живот.</AccordionContent></AccordionItem>
                  <AccordionItem value="faq-2"><AccordionTrigger>Колко струва хидроизолация на покрив?</AccordionTrigger><AccordionContent>Цени за 2026: битумна 8-15 EUR/м², PVC мембрана 15-25 EUR/м², течна 12-20 EUR/м², EPDM 18-30 EUR/м². За 100 м² покрив: 800-3,000 EUR с материали и труд.</AccordionContent></AccordionItem>
                  <AccordionItem value="faq-3"><AccordionTrigger>Колко години издържа хидроизолацията?</AccordionTrigger><AccordionContent>Битумна: 10-15 години. PVC мембрана: 20-30 години. Течна полиуретанова: 15-20 години. EPDM каучукова: 25-40 години. Животът зависи от качеството на монтажа и поддръжката.</AccordionContent></AccordionItem>
                  <AccordionItem value="faq-4"><AccordionTrigger>Може ли новата хидроизолация да се положи върху старата?</AccordionTrigger><AccordionContent>Ако старата е без балони и здраво залепена — да, като грунд слой. Ако е с повреди — задължително се отстранява. Полагането върху влажна стара изолация е най-честата грешка при покривни ремонти.</AccordionContent></AccordionItem>
                  <AccordionItem value="faq-5"><AccordionTrigger>Каква хидроизолация за тераса?</AccordionTrigger><AccordionContent>Течната полиуретанова хидроизолация е идеална за тераси — безшевна, еластична и може да се нанесе върху сложни форми. Цена: 12-20 EUR/м².</AccordionContent></AccordionItem>
                  <AccordionItem value="faq-6"><AccordionTrigger>Кога е най-добрият сезон за хидроизолация?</AccordionTrigger><AccordionContent>Април-октомври при температури над 5°C и сухо време. Битумната изисква над 10°C. Избягвайте работа при дъжд или очакван дъжд в рамките на 24 часа.</AccordionContent></AccordionItem>
                  <AccordionItem value="faq-7"><AccordionTrigger>Давате ли гаранция?</AccordionTrigger><AccordionContent>Да, 15 години гаранция за всички хидроизолационни работи. Използваме материали от Sika, Ceresit и Icopal с фабрична гаранция.</AccordionContent></AccordionItem>
                </Accordion>
              </div>

              {/* CTA */}
              <div className="bg-primary/10 rounded-xl p-8 my-12 text-center">
                <h3 className="text-2xl font-bold text-foreground mb-4">Нуждаете се от хидроизолация?</h3>
                <p className="text-foreground/80 mb-6">Безплатен оглед до 24 часа. Точна оферта с детайлни цени за материали и труд.</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/bg/bezplaten-ogled"><Button size="lg" className="w-full sm:w-auto text-lg px-8 py-6"><CheckCircle className="w-5 h-5 mr-2" />Заяви безплатен оглед</Button></Link>
                  <a href="tel:+359884997659"><Button size="lg" variant="outline" className="w-full sm:w-auto text-lg px-8 py-6"><Phone className="w-5 h-5 mr-2" />Обади се: 088 499 7659</Button></a>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-border">
                <span className="text-muted-foreground mr-2">Тагове:</span>
                {["хидроизолация", "битумна", "PVC мембрана", "течна", "цени", "Варна"].map((tag) => (
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

export default WaterproofingTypes;
