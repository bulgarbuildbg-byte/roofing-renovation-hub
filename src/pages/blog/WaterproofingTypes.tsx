import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCallButton from "@/components/FloatingCallButton";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Calendar, Clock, ArrowLeft, Phone, Tag, Share2, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

// Import blog images
import waterproofingTypesImg from "@/assets/blog/waterproofing-types.jpg";
import waterproofingTorchImg from "@/assets/process/waterproofing-torch.jpg";
import pvcMembraneImg from "@/assets/process/pvc-membrane.jpg";
import liquidWaterproofingImg from "@/assets/process/liquid-waterproofing.jpg";

const WaterproofingTypes = () => {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "Видове хидроизолация и кога да изберем всяка от тях",
    "description": "Пълен наръчник за различните видове хидроизолационни материали - битумни, PVC мембрани, течна хидроизолация.",
    "image": waterproofingTypesImg,
    "datePublished": "2024-11-01",
    "author": { "@type": "Organization", "name": "RemontNaPokriviVarna" }
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Видове хидроизолация - Битумна, PVC, Течна | Ръководство | Варна</title>
        <meta name="description" content="Пълен наръчник за хидроизолационни материали. Научете коя хидроизолация е най-подходяща - битумна, PVC мембрана или течна хидроизолация." />
        <meta name="keywords" content="видове хидроизолация, битумна хидроизолация, PVC мембрана, течна хидроизолация, Варна" />
        <meta property="og:title" content="Видове хидроизолация: Битумна, PVC и Течна | Пълен Наръчник" />
        <meta property="og:description" content="Пълен наръчник за хидроизолационни материали. Научете коя хидроизолация е най-подходяща за вашия покрив." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://www.remontnapokrivivarna.bg/bg/блог/видове-хидроизолация-и-кога-да-изберем-всяка" />
        <meta property="og:image" content="https://www.remontnapokrivivarna.bg/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="bg_BG" />
        <meta property="og:site_name" content="Ремонт на Покриви Варна" />
        <meta property="article:published_time" content="2024-11-01" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Видове хидроизолация: Битумна, PVC и Течна | Наръчник" />
        <meta name="twitter:description" content="Научете коя хидроизолация е най-подходяща - битумна, PVC мембрана или течна хидроизолация." />
        <meta name="twitter:image" content="https://www.remontnapokrivivarna.bg/og-image.jpg" />
        <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
      </Helmet>

      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative h-[50vh] min-h-[400px]">
          <img 
            src={waterproofingTypesImg}
            alt="Полагане на хидроизолация на плосък покрив"
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
                <span className="text-foreground">Видове хидроизолация</span>
              </nav>
              <Badge className="mb-4">Хидроизолация</Badge>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                Видове хидроизолация и кога да изберем всяка от тях
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  1 ноември 2024
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  10 мин четене
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
                  Изборът на правилната хидроизолация е критичен за дълготрайността на покрива. Всеки тип материал има своите 
                  предимства и е подходящ за различни ситуации. В това ръководство ще разгледаме основните видове 
                  хидроизолационни системи и ще ви помогнем да направите правилния избор.
                </p>

                <h2 className="text-2xl font-bold text-foreground mt-12 mb-6">
                  1. Битумна хидроизолация (Модифициран битум)
                </h2>
                <img 
                  src={waterproofingTorchImg}
                  alt="Полагане на битумна хидроизолация с горелка"
                  className="w-full rounded-xl mb-6"
                />
                <p className="text-foreground/80 mb-4">
                  Битумната хидроизолация е най-разпространеният тип в България. Тя се състои от битумна маса, 
                  усилена с полиестерна или стъклотъканна основа и покрита с минерални гранули или фолио.
                </p>

                <div className="grid md:grid-cols-2 gap-6 my-8">
                  <Card className="border-green-500/50">
                    <CardHeader className="pb-2">
                      <h4 className="font-bold text-green-600">✓ Предимства</h4>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm text-foreground/80">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-1" />
                          Достъпна цена
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-1" />
                          Изпитана технология с дълга история
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-1" />
                          Лесен ремонт
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-1" />
                          Добра устойчивост на UV лъчи
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                  <Card className="border-red-500/50">
                    <CardHeader className="pb-2">
                      <h4 className="font-bold text-red-600">✗ Недостатъци</h4>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm text-foreground/80">
                        <li>• Изисква горелка за монтаж (пожароопасно)</li>
                        <li>• По-къс живот (10-15 години)</li>
                        <li>• Може да се напука при екстремни температури</li>
                        <li>• По-голямо тегло</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                <div className="bg-secondary/30 rounded-xl p-6 my-8">
                  <h4 className="font-bold text-foreground mb-3">🏠 Кога да изберете битумна хидроизолация:</h4>
                  <ul className="space-y-2 text-foreground/80">
                    <li>• Плоски покриви на жилищни сгради</li>
                    <li>• Ограничен бюджет</li>
                    <li>• Покриви с малък наклон</li>
                    <li>• Ремонт на съществуваща битумна хидроизолация</li>
                  </ul>
                </div>

                <h2 className="text-2xl font-bold text-foreground mt-12 mb-6">
                  2. PVC мембрани (Синтетични мембрани)
                </h2>
                <img 
                  src={pvcMembraneImg}
                  alt="PVC мембрана за хидроизолация на покрив"
                  className="w-full rounded-xl mb-6"
                />
                <p className="text-foreground/80 mb-4">
                  PVC мембраните са модерно решение, което набира популярност благодарение на отличните си характеристики. 
                  Те се състоят от пластмасова мембрана, която се заварява на местата на припокриване.
                </p>

                <div className="grid md:grid-cols-2 gap-6 my-8">
                  <Card className="border-green-500/50">
                    <CardHeader className="pb-2">
                      <h4 className="font-bold text-green-600">✓ Предимства</h4>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm text-foreground/80">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-1" />
                          Дълъг живот (20-30+ години)
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-1" />
                          Висока еластичност
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-1" />
                          Устойчивост на корени
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-1" />
                          Лек материал
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                  <Card className="border-red-500/50">
                    <CardHeader className="pb-2">
                      <h4 className="font-bold text-red-600">✗ Недостатъци</h4>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm text-foreground/80">
                        <li>• По-висока начална цена</li>
                        <li>• Изисква специализирано оборудване</li>
                        <li>• Не може да се ремонтира с битум</li>
                        <li>• Уязвима на механични повреди</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                <div className="bg-secondary/30 rounded-xl p-6 my-8">
                  <h4 className="font-bold text-foreground mb-3">🏢 Кога да изберете PVC мембрана:</h4>
                  <ul className="space-y-2 text-foreground/80">
                    <li>• Големи търговски и индустриални сгради</li>
                    <li>• Зелени покриви с растителност</li>
                    <li>• Когато търсите дългосрочна инвестиция</li>
                    <li>• Покриви с чести температурни колебания</li>
                  </ul>
                </div>

                <h2 className="text-2xl font-bold text-foreground mt-12 mb-6">
                  3. Течна хидроизолация (Полимерни покрития)
                </h2>
                <img 
                  src={liquidWaterproofingImg}
                  alt="Нанасяне на течна хидроизолация"
                  className="w-full rounded-xl mb-6"
                />
                <p className="text-foreground/80 mb-4">
                  Течната хидроизолация се нанася като боя и образува безшевно еластично покритие. 
                  Това я прави идеална за сложни форми и детайли.
                </p>

                <div className="grid md:grid-cols-2 gap-6 my-8">
                  <Card className="border-green-500/50">
                    <CardHeader className="pb-2">
                      <h4 className="font-bold text-green-600">✓ Предимства</h4>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm text-foreground/80">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-1" />
                          Безшевна защита
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-1" />
                          Идеална за сложни форми
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-1" />
                          Бързо нанасяне
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-1" />
                          Лесно обновяване
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                  <Card className="border-red-500/50">
                    <CardHeader className="pb-2">
                      <h4 className="font-bold text-red-600">✗ Недостатъци</h4>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm text-foreground/80">
                        <li>• Зависи от качеството на нанасяне</li>
                        <li>• Може да изисква повече слоеве</li>
                        <li>• Чувствителна към влага при нанасяне</li>
                        <li>• По-кратък живот при неправилна употреба</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                <div className="bg-secondary/30 rounded-xl p-6 my-8">
                  <h4 className="font-bold text-foreground mb-3">🏗️ Кога да изберете течна хидроизолация:</h4>
                  <ul className="space-y-2 text-foreground/80">
                    <li>• Балкони и тераси</li>
                    <li>• Покриви със сложни форми и много детайли</li>
                    <li>• Ремонт на стара хидроизолация</li>
                    <li>• Малки площи</li>
                  </ul>
                </div>

                <h2 className="text-2xl font-bold text-foreground mt-12 mb-6">
                  Сравнителна таблица
                </h2>
                <div className="overflow-x-auto my-8">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-secondary/50">
                        <th className="p-4 text-left font-bold">Характеристика</th>
                        <th className="p-4 text-left font-bold">Битумна</th>
                        <th className="p-4 text-left font-bold">PVC</th>
                        <th className="p-4 text-left font-bold">Течна</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border">
                        <td className="p-4">Цена</td>
                        <td className="p-4 text-green-600">Ниска</td>
                        <td className="p-4 text-amber-600">Средна-висока</td>
                        <td className="p-4 text-amber-600">Средна</td>
                      </tr>
                      <tr className="border-b border-border bg-secondary/20">
                        <td className="p-4">Живот</td>
                        <td className="p-4">10-15 години</td>
                        <td className="p-4 text-green-600">20-30 години</td>
                        <td className="p-4">10-20 години</td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="p-4">Монтаж</td>
                        <td className="p-4">Горелка</td>
                        <td className="p-4">Заваряване</td>
                        <td className="p-4 text-green-600">Боядисване</td>
                      </tr>
                      <tr className="border-b border-border bg-secondary/20">
                        <td className="p-4">Еластичност</td>
                        <td className="p-4">Средна</td>
                        <td className="p-4 text-green-600">Висока</td>
                        <td className="p-4 text-green-600">Висока</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h2 className="text-2xl font-bold text-foreground mt-12 mb-6">
                  Заключение: Как да изберете?
                </h2>
                <p className="text-foreground/80 mb-4">
                  Изборът на хидроизолация зависи от няколко фактора:
                </p>
                <ul className="space-y-2 text-foreground/80 mb-6">
                  <li>• <strong>Тип на покрива:</strong> Плосък, наклонен, тераса</li>
                  <li>• <strong>Бюджет:</strong> Начална инвестиция срещу дългосрочна стойност</li>
                  <li>• <strong>Предназначение:</strong> Достъпен покрив или не</li>
                  <li>• <strong>Климатични условия:</strong> Варна има специфични изисквания</li>
                </ul>

                <div className="bg-primary/10 rounded-xl p-8 my-12 text-center">
                  <h3 className="text-2xl font-bold text-foreground mb-4">
                    Нуждаете се от консултация?
                  </h3>
                  <p className="text-foreground/80 mb-6">
                    Нашият екип ще ви помогне да изберете най-подходящата хидроизолация за вашия покрив. 
                    Безплатна консултация и оглед.
                  </p>
                  <a 
                    href="tel:+359884997659" 
                    className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-lg font-bold text-lg hover:bg-primary/90 transition-colors"
                  >
                    <Phone className="w-5 h-5" />
                    Обадете се: 088 499 7659
                  </a>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-border">
                <span className="text-muted-foreground mr-2">Тагове:</span>
                {["хидроизолация", "материали", "PVC мембрана", "битум", "течна хидроизолация"].map((tag) => (
                  <Badge key={tag} variant="outline" className="flex items-center gap-1">
                    <Tag className="w-3 h-3" />
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Corporate context */}
              <p className="text-muted-foreground text-sm mt-8">
                Хидроизолацията е ключов елемент от строителните проекти на{" "}
                <a href="https://bulgarbuild.com/" className="text-accent hover:underline">BulgarBuild</a>
                {" "}— нашата компания-майка с пълен обхват от строителни услуги.
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

export default WaterproofingTypes;
