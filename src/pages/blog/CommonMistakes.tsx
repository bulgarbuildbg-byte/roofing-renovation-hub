import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCallButton from "@/components/FloatingCallButton";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Calendar, Clock, ArrowLeft, Phone, Tag, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const CommonMistakes = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Най-честите грешки при покривни ремонти | Как да ги избегнете | Варна</title>
        <meta name="description" content="Избягвайте скъпите грешки при ремонт на покрив. Научете какви са най-честите проблеми и как професионалистите ги решават правилно." />
      </Helmet>

      <Header />
      
      <main className="pt-20">
        <section className="relative h-[50vh] min-h-[400px]">
          <img 
            src="https://images.unsplash.com/photo-1632759145389-a3afa99e5c57?w=1200&q=80"
            alt="Грешки при покривни ремонти"
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
                <span className="text-foreground">Чести грешки</span>
              </nav>
              <Badge className="mb-4">Ремонт</Badge>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                Най-честите грешки при покривни ремонти и как да ги избегнете
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  5 октомври 2024
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  9 мин четене
                </span>
              </div>
            </div>
          </div>
        </section>

        <article className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto prose prose-lg">
              <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                Покривните ремонти могат да бъдат скъпи, но грешките при изпълнението им могат да струват още повече. 
                В тази статия ще разгледаме най-честите грешки, които виждаме, и как да ги избегнете.
              </p>

              <div className="space-y-8 my-12">
                <Card className="border-destructive/50">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <XCircle className="w-8 h-8 text-destructive flex-shrink-0" />
                      <div>
                        <h3 className="text-xl font-bold text-foreground mb-2">
                          Грешка #1: Полагане на нова хидроизолация върху стара
                        </h3>
                        <p className="text-foreground/80 mb-4">
                          Много собственици опитват да спестят пари, като полагат нова хидроизолация директно върху 
                          старата. Това създава проблеми със залепването и може да доведе до балони и течове.
                        </p>
                        <p className="text-sm text-primary font-medium">
                          ✓ Правилният подход: Старата хидроизолация трябва да се отстрани или поне да се подготви 
                          правилно повърхността с грунд.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-destructive/50">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <XCircle className="w-8 h-8 text-destructive flex-shrink-0" />
                      <div>
                        <h3 className="text-xl font-bold text-foreground mb-2">
                          Грешка #2: Пренебрегване на детайлите
                        </h3>
                        <p className="text-foreground/80 mb-4">
                          Около 80% от течовете се случват на детайли - комини, вентилации, ръбове. 
                          Пренебрегването на тези критични места е рецепта за проблеми.
                        </p>
                        <p className="text-sm text-primary font-medium">
                          ✓ Правилният подход: Отделете специално внимание на всички детайли и използвайте 
                          качествени уплътнители.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-destructive/50">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <XCircle className="w-8 h-8 text-destructive flex-shrink-0" />
                      <div>
                        <h3 className="text-xl font-bold text-foreground mb-2">
                          Грешка #3: Използване на евтини материали
                        </h3>
                        <p className="text-foreground/80 mb-4">
                          Икономията от евтини материали бързо се изпарява, когато се наложи нов ремонт 
                          след 2-3 години. Качествените материали са инвестиция.
                        </p>
                        <p className="text-sm text-primary font-medium">
                          ✓ Правилният подход: Изберете материали от доказани производители с гаранция.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-destructive/50">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <XCircle className="w-8 h-8 text-destructive flex-shrink-0" />
                      <div>
                        <h3 className="text-xl font-bold text-foreground mb-2">
                          Грешка #4: Работа при неподходящи условия
                        </h3>
                        <p className="text-foreground/80 mb-4">
                          Полагането на хидроизолация при влажно време или твърде ниски температури 
                          компрометира качеството на работата.
                        </p>
                        <p className="text-sm text-primary font-medium">
                          ✓ Правилният подход: Планирайте ремонта за сухо време с температури над 5°C.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-destructive/50">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <XCircle className="w-8 h-8 text-destructive flex-shrink-0" />
                      <div>
                        <h3 className="text-xl font-bold text-foreground mb-2">
                          Грешка #5: Липса на вентилация
                        </h3>
                        <p className="text-foreground/80 mb-4">
                          Запечатването на всички отвори може да изглежда логично, но води до натрупване 
                          на влага и кондензация в подпокривното пространство.
                        </p>
                        <p className="text-sm text-primary font-medium">
                          ✓ Правилният подход: Осигурете правилна вентилация с входящи и изходящи отвори.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <h2 className="text-2xl font-bold text-foreground mt-12 mb-6">
                Как да изберете надежден изпълнител?
              </h2>
              <ul className="space-y-3 text-foreground/80 mb-6">
                <li>• Проверете референции и снимки от предишни проекти</li>
                <li>• Искайте писмен договор с ясни условия</li>
                <li>• Уверете се, че има застраховка</li>
                <li>• Избягвайте твърде ниски оферти</li>
                <li>• Търсете гаранция за извършената работа</li>
              </ul>

              <div className="bg-primary/10 rounded-xl p-8 my-12 text-center">
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  Търсите надежден екип за ремонт?
                </h3>
                <p className="text-foreground/80 mb-6">
                  С над 15 години опит, ние гарантираме качествено изпълнение без компромиси. 
                  Обадете се за безплатна консултация.
                </p>
                <a 
                  href="tel:+359884997659" 
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-lg font-bold text-lg hover:bg-primary/90 transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  Обадете се: 088 499 7659
                </a>
              </div>
              {/* Service Links */}
              <div className="bg-secondary/30 rounded-xl p-6 my-8 border border-border/30">
                <h4 className="font-bold text-foreground mb-4">🔧 Нашите услуги</h4>
                <div className="grid md:grid-cols-2 gap-3">
                  <Link to="/ремонт-на-покриви" className="text-primary hover:underline flex items-center gap-2">
                    → Ремонт на покриви
                  </Link>
                  <Link to="/хидроизолация" className="text-primary hover:underline flex items-center gap-2">
                    → Хидроизолация
                  </Link>
                </div>
              </div>
            </div>

            <div className="max-w-3xl mx-auto">
              {/* Related Articles */}
              <div className="py-8 border-t border-border mt-8">
                <h3 className="font-bold text-xl text-foreground mb-6">Свързани Статии</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <Link to="/блог/5-признака-че-покривът-се-нуждае-от-ремонт" className="group">
                    <div className="p-4 bg-secondary/20 rounded-lg hover:bg-secondary/40 transition-colors">
                      <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">5 признака, че покривът се нуждае от ремонт</h4>
                      <span className="text-sm text-muted-foreground">6 мин четене</span>
                    </div>
                  </Link>
                  <Link to="/блог/видове-хидроизолация-и-кога-да-изберем-всяка" className="group">
                    <div className="p-4 bg-secondary/20 rounded-lg hover:bg-secondary/40 transition-colors">
                      <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">Видове хидроизолация - пълно ръководство</h4>
                      <span className="text-sm text-muted-foreground">10 мин четене</span>
                    </div>
                  </Link>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-border">
                <span className="text-muted-foreground mr-2">Тагове:</span>
                {["грешки", "ремонт", "съвети"].map((tag) => (
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

export default CommonMistakes;
