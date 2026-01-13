import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCallButton from "@/components/FloatingCallButton";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Calendar, Clock, ArrowLeft, Phone, Tag, Share2, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const RoofRepairSigns = () => {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "5 признака, че покривът ви се нуждае от спешен ремонт",
    "description": "Разберете кои са най-честите признаци за проблеми с покрива и кога е време да се обадите на специалист.",
    "image": "https://images.unsplash.com/photo-1632759145889-a3afa99e5c57?w=1200&q=80",
    "datePublished": "2024-11-15",
    "author": { "@type": "Organization", "name": "RemontNaPokriviVarna" },
    "publisher": { "@type": "LocalBusiness", "name": "RemontNaPokriviVarna" }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Начало", "item": "https://remontnapokrivivarna.com" },
      { "@type": "ListItem", "position": 2, "name": "Блог", "item": "https://remontnapokrivivarna.com/блог" },
      { "@type": "ListItem", "position": 3, "name": "Признаци за ремонт", "item": "https://remontnapokrivivarna.com/блог/5-признака-че-покривът-се-нуждае-от-ремонт" }
    ]
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>5 признака, че покривът се нуждае от ремонт | Експертни съвети | Варна</title>
        <meta name="description" content="Разберете кои са най-честите признаци за проблеми с покрива - течове, липсващи керемиди, провисване. Кога е време за спешен ремонт?" />
        <meta name="keywords" content="признаци ремонт покрив, течове покрив, счупени керемиди, проблеми покрив, Варна" />
        <link rel="canonical" href="https://remontnapokrivivarna.com/блог/5-признака-че-покривът-се-нуждае-от-ремонт" />
        <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative h-[50vh] min-h-[400px]">
          <img 
            src="https://images.unsplash.com/photo-1632759145889-a3afa99e5c57?w=1200&q=80"
            alt="Повреден покрив, нуждаещ се от ремонт"
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
                <span className="text-foreground">Признаци за ремонт</span>
              </nav>
              <Badge className="mb-4">Ремонт</Badge>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                5 признака, че покривът ви се нуждае от спешен ремонт
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  15 ноември 2024
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  6 мин четене
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
                  Покривът е една от най-важните части на всяка сграда, но често остава незабелязан, докато не възникне сериозен проблем. 
                  Ранното разпознаване на признаците за проблеми може да ви спести хиляди левове и да предотврати по-сериозни щети. 
                  Ето петте най-важни сигнала, че покривът ви се нуждае от незабавно внимание.
                </p>

                {/* Sign 1 */}
                <div className="bg-destructive/10 border-l-4 border-destructive rounded-r-xl p-6 my-8">
                  <div className="flex items-start gap-4">
                    <div className="bg-destructive text-destructive-foreground rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl flex-shrink-0">
                      1
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-foreground mb-3">
                        Петна от влага и течове на тавана
                      </h2>
                      <p className="text-foreground/80">
                        Това е най-очевидният признак, че имате проблем с покрива. Тъмни петна, мехури в боята или 
                        активно капеща вода означават, че влагата е проникнала през покривната конструкция.
                      </p>
                    </div>
                  </div>
                </div>
                <img 
                  src="https://images.unsplash.com/photo-1585128792020-803d29415281?w=800&q=80"
                  alt="Петна от влага на таван - признак за течове в покрива"
                  className="w-full rounded-xl mb-6"
                />
                <p className="text-foreground/80 mb-4">
                  <strong>Какво да направите:</strong> Дори малко петно може да означава голям проблем. Водата може да 
                  пътува по гредите преди да падне, така че източникът на теча може да е далеч от петното. 
                  Маркирайте петното с дата и следете дали се разраства.
                </p>

                {/* Sign 2 */}
                <div className="bg-destructive/10 border-l-4 border-destructive rounded-r-xl p-6 my-8">
                  <div className="flex items-start gap-4">
                    <div className="bg-destructive text-destructive-foreground rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl flex-shrink-0">
                      2
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-foreground mb-3">
                        Липсващи, счупени или изкривени керемиди
                      </h2>
                      <p className="text-foreground/80">
                        Керемидите са първата линия на защита на покрива. Когато липсват или са повредени, 
                        подпокривната конструкция е изложена на дъжд, вятър и слънце.
                      </p>
                    </div>
                  </div>
                </div>
                <img 
                  src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80"
                  alt="Липсващи и повредени керемиди на покрив"
                  className="w-full rounded-xl mb-6"
                />
                <p className="text-foreground/80 mb-4">
                  <strong>Причини за повреда на керемидите:</strong>
                </p>
                <ul className="space-y-2 text-foreground/80 mb-6">
                  <li>• Силни ветрове и бури</li>
                  <li>• Температурни промени (замръзване/размразяване)</li>
                  <li>• Падащи клони и отломки</li>
                  <li>• Естествено стареене на материала</li>
                  <li>• Неправилен първоначален монтаж</li>
                </ul>

                {/* Sign 3 */}
                <div className="bg-destructive/10 border-l-4 border-destructive rounded-r-xl p-6 my-8">
                  <div className="flex items-start gap-4">
                    <div className="bg-destructive text-destructive-foreground rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl flex-shrink-0">
                      3
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-foreground mb-3">
                        Провисване на покривната конструкция
                      </h2>
                      <p className="text-foreground/80">
                        Ако забележите, че покривът ви има видимо хлътване или вдлъбнатини, това е сериозен признак 
                        за структурни проблеми, които изискват незабавно внимание.
                      </p>
                    </div>
                  </div>
                </div>
                <p className="text-foreground/80 mb-4">
                  <strong>Възможни причини:</strong>
                </p>
                <ul className="space-y-2 text-foreground/80 mb-6">
                  <li>• Дългогодишно натрупване на влага, което е отслабило дървените греди</li>
                  <li>• Прекомерно тегло от натрупан сняг (особено при плоски покриви)</li>
                  <li>• Гниене на носещата конструкция</li>
                  <li>• Недостатъчно измерена първоначална конструкция</li>
                </ul>

                <div className="bg-accent/10 border-l-4 border-accent p-6 my-8">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                    <p className="text-foreground font-medium">
                      <strong>Внимание:</strong> Провисналият покрив е потенциално опасен и може да колабира. 
                      При забелязване на провисване, незабавно се обадете на професионалист и евакуирайте 
                      помещенията под засегнатия участък.
                    </p>
                  </div>
                </div>

                {/* Sign 4 */}
                <div className="bg-destructive/10 border-l-4 border-destructive rounded-r-xl p-6 my-8">
                  <div className="flex items-start gap-4">
                    <div className="bg-destructive text-destructive-foreground rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl flex-shrink-0">
                      4
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-foreground mb-3">
                        Мухъл и мос по покрива или в тавана
                      </h2>
                      <p className="text-foreground/80">
                        Наличието на мухъл, мос или лишеи е признак за задържане на влага. Макар че мосът може 
                        да изглежда безобидно, той задържа вода и ускорява разрушаването на покривните материали.
                      </p>
                    </div>
                  </div>
                </div>
                <img 
                  src="https://images.unsplash.com/photo-1598449356475-b9f71db7d847?w=800&q=80"
                  alt="Мос и лишеи по покривни керемиди"
                  className="w-full rounded-xl mb-6"
                />
                <p className="text-foreground/80 mb-4">
                  <strong>Рискове от мос и мухъл:</strong>
                </p>
                <ul className="space-y-2 text-foreground/80 mb-6">
                  <li>• Здравословни проблеми за обитателите (алергии, респираторни заболявания)</li>
                  <li>• Разрушаване на покривното покритие</li>
                  <li>• Запушване на улуците</li>
                  <li>• Подпомагане на гниенето на дървени елементи</li>
                </ul>

                {/* Sign 5 */}
                <div className="bg-destructive/10 border-l-4 border-destructive rounded-r-xl p-6 my-8">
                  <div className="flex items-start gap-4">
                    <div className="bg-destructive text-destructive-foreground rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl flex-shrink-0">
                      5
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-foreground mb-3">
                        Увеличени сметки за отопление или охлаждане
                      </h2>
                      <p className="text-foreground/80">
                        Ако сметките ви за енергия са се увеличили необяснимо, причината може да е в покрива. 
                        Повредената изолация или пукнатините позволяват на топлия въздух да избяга през зимата.
                      </p>
                    </div>
                  </div>
                </div>
                <p className="text-foreground/80 mb-6">
                  Добре изолираният и поддържан покрив е ключов за енергийната ефективност на дома. 
                  Ако забележите скок в сметките, помислете за инспекция на тавана и покрива.
                </p>

                {/* When to Call a Professional */}
                <h2 className="text-2xl font-bold text-foreground mt-12 mb-6">
                  Кога проблемът е спешен?
                </h2>
                <div className="grid md:grid-cols-2 gap-6 my-8">
                  <Card className="border-destructive">
                    <CardContent className="p-6">
                      <h3 className="font-bold text-destructive mb-3">🚨 Спешно (обадете се веднага):</h3>
                      <ul className="space-y-2 text-sm text-foreground/80">
                        <li>• Активни течове при дъжд</li>
                        <li>• Видимо провисване на покрива</li>
                        <li>• Липсващи големи участъци керемиди</li>
                        <li>• Повреда след буря</li>
                      </ul>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-bold text-foreground mb-3">⏳ Планиран ремонт:</h3>
                      <ul className="space-y-2 text-sm text-foreground/80">
                        <li>• Единични счупени керемиди</li>
                        <li>• Мос и лишеи</li>
                        <li>• Стари петна без разрастване</li>
                        <li>• Износени уплътнения</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                <div className="bg-primary/10 rounded-xl p-8 my-12 text-center">
                  <h3 className="text-2xl font-bold text-foreground mb-4">
                    Забелязахте някой от тези признаци?
                  </h3>
                  <p className="text-foreground/80 mb-6">
                    Не чакайте малкият проблем да стане голям. Свържете се с нас за безплатна консултация 
                    и професионална оценка на състоянието на покрива ви.
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
                {["ремонт", "диагностика", "течове", "керемиди", "спешен ремонт"].map((tag) => (
                  <Badge key={tag} variant="outline" className="flex items-center gap-1">
                    <Tag className="w-3 h-3" />
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Share */}
              <div className="flex items-center gap-4 mt-8">
                <span className="text-muted-foreground">Сподели:</span>
                <Button variant="outline" size="sm">
                  <Share2 className="w-4 h-4 mr-2" />
                  Facebook
                </Button>
              </div>

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

export default RoofRepairSigns;
