import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCallButton from "@/components/FloatingCallButton";
import CTASection from "@/components/CTASection";
import { Star, Quote, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const reviews = [
  {
    text: "Бърза реакция, ясни цени и отлично качество. Покривът вече не тече и получих 5 години гаранция. Горещо препоръчвам на всички!",
    author: "Иван Димитров",
    location: "Варна, кв. Чайка",
    rating: 5,
    service: "Ремонт на покрив"
  },
  {
    text: "Много съм доволен от работата им. Направиха хидроизолация на терасата и вече нямам проблеми с влага. Професионален екип!",
    author: "Петър Стоянов",
    location: "Варна, кв. Аспарухово",
    rating: 5,
    service: "Хидроизолация"
  },
  {
    text: "Професионална работа от начало до край. Спазиха срока и цената беше точно както в офертата. Ще ги препоръчам на приятели.",
    author: "Мария Костова",
    location: "Варна, кв. Левски",
    rating: 5,
    service: "Нов покрив"
  },
  {
    text: "Отличен екип! Реагираха веднага при аварийно течение. Качествена работа и коректни цени. Благодаря ви!",
    author: "Георги Петров",
    location: "Варна, център",
    rating: 5,
    service: "Аварийно течение"
  },
  {
    text: "Смениха целия покрив на къщата ни за седмица. Много качествени материали и прецизна работа. Доволни сме изключително!",
    author: "Елена Николова",
    location: "с. Константиново",
    rating: 5,
    service: "Нов покрив"
  },
  {
    text: "Направиха безплатен оглед и дадоха честна оферта. Ремонтираха течовете бързо и качествено. Препоръчвам ги!",
    author: "Николай Иванов",
    location: "Варна, кв. Владислав Варненчик",
    rating: 5,
    service: "Ремонт на течове"
  },
  {
    text: "Втори път ги наемам и отново съм впечатлен. Този път за поддръжка на покрива. Работят бързо и чисто.",
    author: "Стефан Георгиев",
    location: "Варна, кв. Младост",
    rating: 5,
    service: "Поддръжка"
  },
  {
    text: "Изключително коректни и професионални. Обясниха всичко подробно и работата беше перфектна. 100% препоръчвам!",
    author: "Десислава Тодорова",
    location: "Варна, кв. Бриз",
    rating: 5,
    service: "Хидроизолация"
  }
];

const stats = [
  { value: "500+", label: "Завършени проекти" },
  { value: "4.9", label: "Средна оценка" },
  { value: "15+", label: "Години опит" },
  { value: "100%", label: "Доволни клиенти" }
];

const ReviewsPage = () => {
  const aggregateRating = 4.9;
  const totalReviews = 127;

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Отзиви за Покриви Варна - 4.9/5 Оценка | 127+</title>
        <meta name="description" content="127+ положителни отзива от клиенти. Прочетете реални мнения за нашите покривни услуги във Варна." />
        <meta name="keywords" content="отзиви ремонт покриви варна, мнения покривни услуги, рейтинг покриви варна" />
        <link rel="canonical" href="https://remontnapokrivivarna.com/отзиви" />
        <meta property="og:title" content="Отзиви за Покриви Варна - 4.9/5 Оценка" />
        <meta property="og:description" content="127+ положителни отзива от клиенти за нашите покривни услуги." />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Ремонт на Покриви Варна",
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": aggregateRating,
              "reviewCount": totalReviews,
              "bestRating": 5,
              "worstRating": 1
            }
          })}
        </script>
      </Helmet>
      
      <Header />
      
      <main className="pt-24">
        {/* Hero Section */}
        <section className="bg-primary py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
              Отзиви за Ремонт на Покриви Варна
            </h1>
            <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto mb-8">
              Над {totalReviews} доволни клиенти ни се довериха за техните покриви
            </p>
            
            {/* Aggregate Rating */}
            <div className="inline-flex items-center gap-4 bg-background/10 backdrop-blur-sm rounded-2xl px-8 py-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-8 h-8 fill-accent text-accent" />
                ))}
              </div>
              <div className="text-left">
                <p className="text-3xl font-bold text-primary-foreground">{aggregateRating}/5</p>
                <p className="text-primary-foreground/80 text-sm">от {totalReviews} отзива</p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <p className="text-4xl md:text-5xl font-bold text-primary mb-2">{stat.value}</p>
                  <p className="text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Reviews Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reviews.map((review, index) => (
                <Card key={index} className="bg-card hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <Quote className="w-10 h-10 text-primary/20 mb-4" />
                    
                    <div className="flex gap-1 mb-4">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                      ))}
                    </div>
                    
                    <p className="text-foreground mb-4 leading-relaxed">
                      "{review.text}"
                    </p>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <div>
                        <p className="font-semibold text-foreground">{review.author}</p>
                        <p className="text-sm text-muted-foreground">{review.location}</p>
                      </div>
                      <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full">
                        {review.service}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Trust Badges */}
        <section className="py-16 bg-secondary">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-foreground mb-12">
              Защо Избират Нас за Покривни Услуги
            </h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <CheckCircle className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-foreground mb-2">Гарантирано Качество</h3>
                <p className="text-muted-foreground">До 10 години писмена гаранция на всички работи</p>
              </div>
              <div className="text-center">
                <CheckCircle className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-foreground mb-2">Прозрачни Цени</h3>
                <p className="text-muted-foreground">Без скрити такси, офертата е финална</p>
              </div>
              <div className="text-center">
                <CheckCircle className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-foreground mb-2">Бърза Реакция</h3>
                <p className="text-muted-foreground">Безплатен оглед в рамките на 24 часа</p>
              </div>
            </div>
          </div>
        </section>

        <CTASection 
          title="Станете и Вие Доволен Клиент"
          subtitle="Заявете безплатен оглед и получете честна оферта"
        />
      </main>
      
      <Footer />
      <FloatingCallButton />
    </div>
  );
};

export default ReviewsPage;
