import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCallButton from "@/components/FloatingCallButton";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Calendar, Clock, ArrowLeft, Phone, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const SpringInspection = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Пролетна инспекция на покрива | Какво да проверите след зимата | Варна</title>
        <meta name="description" content="След тежката зима покривът ви може да е претърпял щети. Ето какво трябва да проверите и как да предотвратите скъпи ремонти." />
      </Helmet>

      <Header />
      
      <main className="pt-20">
        <section className="relative h-[50vh] min-h-[400px]">
          <img 
            src="https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?w=1200&q=80"
            alt="Пролетна инспекция на покрив"
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
                <span className="text-foreground">Пролетна инспекция</span>
              </nav>
              <Badge className="mb-4">Сезонна поддръжка</Badge>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                Пролетна инспекция на покрива: Какво да проверите след зимата
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  20 октомври 2024
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  7 мин четене
                </span>
              </div>
            </div>
          </div>
        </section>

        <article className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto prose prose-lg">
              <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                Зимата може да бъде безмилостна към покривите. Циклите на замръзване и размразяване, тежкият сняг и 
                силните ветрове оставят следи. С настъпването на пролетта е време да оцените щетите и да 
                предприемете необходимите мерки преди дъждовния сезон.
              </p>

              <h2 className="text-2xl font-bold text-foreground mt-12 mb-6">
                Защо пролетната инспекция е толкова важна?
              </h2>
              <p className="text-foreground/80 mb-6">
                Много собственици на имоти пропускат този критичен момент. Малките проблеми, възникнали през зимата, 
                могат бързо да се превърнат в сериозни щети с първите пролетни дъждове. Ранната инспекция ви позволява 
                да действате превантивно.
              </p>

              <h2 className="text-2xl font-bold text-foreground mt-12 mb-6">
                Чеклист за пролетна инспекция
              </h2>

              <h3 className="text-xl font-bold text-foreground mt-8 mb-4">1. Проверете керемидите и покритието</h3>
              <ul className="space-y-2 text-foreground/80 mb-6">
                <li>• Търсете счупени, липсващи или изместени керемиди</li>
                <li>• Проверете ръбовете и билото за повреди</li>
                <li>• Обърнете внимание на керемиди с променен цвят (признак за влага)</li>
              </ul>

              <h3 className="text-xl font-bold text-foreground mt-8 mb-4">2. Инспектирайте улуците</h3>
              <ul className="space-y-2 text-foreground/80 mb-6">
                <li>• Почистете натрупаните листа и отломки</li>
                <li>• Проверете за пукнатини и провисване</li>
                <li>• Уверете се, че водата се оттича правилно</li>
              </ul>

              <h3 className="text-xl font-bold text-foreground mt-8 mb-4">3. Проверете обшивките и уплътненията</h3>
              <ul className="space-y-2 text-foreground/80 mb-6">
                <li>• Инспектирайте около комини и вентилации</li>
                <li>• Търсете напукан или липсващ силикон</li>
                <li>• Проверете металните обшивки за ръжда</li>
              </ul>

              <h3 className="text-xl font-bold text-foreground mt-8 mb-4">4. Огледайте тавана отвътре</h3>
              <ul className="space-y-2 text-foreground/80 mb-6">
                <li>• Търсете петна от влага по гредите</li>
                <li>• Проверете за признаци на мухъл</li>
                <li>• Уверете се, че изолацията е суха</li>
              </ul>

              <h2 className="text-2xl font-bold text-foreground mt-12 mb-6">
                Типични щети след зимата във Варна
              </h2>
              <p className="text-foreground/80 mb-4">
                Климатът на Варна и Черноморския регион има специфични характеристики:
              </p>
              <ul className="space-y-2 text-foreground/80 mb-6">
                <li>• <strong>Силни ветрове:</strong> Могат да изместят керемиди</li>
                <li>• <strong>Влажност:</strong> Способства развитието на мос и мухъл</li>
                <li>• <strong>Солен въздух:</strong> Ускорява корозията на метални елементи</li>
                <li>• <strong>Температурни колебания:</strong> Причиняват напукване на уплътнения</li>
              </ul>

              <div className="bg-primary/10 rounded-xl p-8 my-12 text-center">
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  Нуждаете се от професионална пролетна инспекция?
                </h3>
                <p className="text-foreground/80 mb-6">
                  Нашият екип ще извърши пълен оглед на покрива ви и ще ви даде честна оценка на състоянието му.
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

            <div className="max-w-3xl mx-auto">
              <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-border">
                <span className="text-muted-foreground mr-2">Тагове:</span>
                {["пролет", "инспекция", "поддръжка"].map((tag) => (
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

export default SpringInspection;
