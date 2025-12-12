import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCallButton from "@/components/FloatingCallButton";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Calendar, Clock, ArrowLeft, Phone, Tag, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const ChoosingTiles = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Как да изберем керемиди за нов покрив | Ръководство | Варна</title>
        <meta name="description" content="Керамични, бетонни или метални керемиди? Разгледайте предимствата и недостатъците на всеки тип и направете правилния избор за вашия дом." />
      </Helmet>

      <Header />
      
      <main className="pt-20">
        <section className="relative h-[50vh] min-h-[400px]">
          <img 
            src="https://images.unsplash.com/photo-1513880989635-6eb491ce7f5b?w=1200&q=80"
            alt="Различни видове покривни керемиди"
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
                <span className="text-foreground">Избор на керемиди</span>
              </nav>
              <Badge className="mb-4">Нов покрив</Badge>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                Как да изберем правилните керемиди за нов покрив
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  18 септември 2024
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  11 мин четене
                </span>
              </div>
            </div>
          </div>
        </section>

        <article className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto prose prose-lg">
              <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                Изборът на керемиди е едно от най-важните решения при изграждането на нов покрив. 
                Правилният избор ще определи не само външния вид на дома ви, но и дълготрайността 
                и енергийната ефективност на покрива.
              </p>

              <h2 className="text-2xl font-bold text-foreground mt-12 mb-6">
                1. Керамични (глинени) керемиди
              </h2>
              <img 
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80"
                alt="Керамични глинени керемиди"
                className="w-full rounded-xl mb-6"
              />
              <p className="text-foreground/80 mb-4">
                Керамичните керемиди са класически избор с вековна история. Произвеждат се от естествена 
                глина и се изпичат при висока температура.
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
                        Дълъг живот (50-100+ години)
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-1" />
                        Естетична красота
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-1" />
                        Огнеустойчивост
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-1" />
                        Екологичност
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
                      <li>• По-висока цена</li>
                      <li>• Голямо тегло (изисква здрава конструкция)</li>
                      <li>• Чупливост при неправилен монтаж</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <h2 className="text-2xl font-bold text-foreground mt-12 mb-6">
                2. Бетонни керемиди
              </h2>
              <p className="text-foreground/80 mb-4">
                Бетонните керемиди са популярна алтернатива на керамичните. Произвеждат се от цимент, 
                пясък и пигменти, което ги прави по-достъпни.
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
                        По-достъпна цена
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-1" />
                        Голям избор от цветове
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-1" />
                        Добра издръжливост (30-50 години)
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
                      <li>• Избледняване на цвета с времето</li>
                      <li>• По-голямо тегло от керамичните</li>
                      <li>• По-порьозни (могат да задържат влага)</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <h2 className="text-2xl font-bold text-foreground mt-12 mb-6">
                3. Метални покриви
              </h2>
              <p className="text-foreground/80 mb-4">
                Металните покриви (от стомана, алуминий или мед) стават все по-популярни благодарение 
                на модерния си вид и практичност.
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
                        Много лек материал
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-1" />
                        Бърз монтаж
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-1" />
                        Дълъг живот (40-70 години)
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-1" />
                        Отлично отводняване
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
                      <li>• По-шумни при дъжд (без изолация)</li>
                      <li>• Могат да ръждясат при лошо покритие</li>
                      <li>• По-висока цена за качествени варианти</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <h2 className="text-2xl font-bold text-foreground mt-12 mb-6">
                Как да изберете правилните керемиди?
              </h2>
              <p className="text-foreground/80 mb-4">
                При избора на керемиди помислете за:
              </p>
              <ul className="space-y-3 text-foreground/80 mb-6">
                <li>• <strong>Бюджет:</strong> Включете не само материалите, но и монтажа</li>
                <li>• <strong>Конструкция:</strong> Проверете дали покривната конструкция издържа теглото</li>
                <li>• <strong>Климат:</strong> Варна има специфичен морски климат</li>
                <li>• <strong>Стил на сградата:</strong> Керемидите трябва да хармонират с архитектурата</li>
                <li>• <strong>Дългосрочна стойност:</strong> По-скъпите керемиди може да са по-изгодни в дългосрочен план</li>
              </ul>

              <div className="bg-primary/10 rounded-xl p-8 my-12 text-center">
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  Нуждаете се от съвет за избор на керемиди?
                </h3>
                <p className="text-foreground/80 mb-6">
                  Нашият екип ще ви помогне да изберете най-подходящите керемиди за вашия дом 
                  и бюджет. Безплатна консултация и оглед.
                </p>
                <a 
                  href="tel:+359892701176" 
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-lg font-bold text-lg hover:bg-primary/90 transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  Обадете се: 089 270 1176
                </a>
              </div>
            </div>

            <div className="max-w-3xl mx-auto">
              <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-border">
                <span className="text-muted-foreground mr-2">Тагове:</span>
                {["керемиди", "материали", "нов покрив"].map((tag) => (
                  <Badge key={tag} variant="outline" className="flex items-center gap-1">
                    <Tag className="w-3 h-3" />
                    {tag}
                  </Badge>
                ))}
              </div>

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

export default ChoosingTiles;
