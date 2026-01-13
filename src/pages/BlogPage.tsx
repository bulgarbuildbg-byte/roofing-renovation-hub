import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCallButton from "@/components/FloatingCallButton";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Calendar, Clock, ArrowRight, Tag } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const blogPosts = [
  {
    id: "как-да-подготвим-покрива-за-зимата",
    title: "Как да подготвим покрива за зимата: Пълно ръководство",
    excerpt: "Научете как да подготвите покрива си за студените месеци с нашите експертни съвети. От инспекция до превантивни мерки - всичко, което трябва да знаете.",
    image: "https://images.unsplash.com/photo-1547393429-098dd122fd78?w=600&q=80",
    date: "2024-12-01",
    readTime: "8 мин",
    category: "Сезонна поддръжка",
    tags: ["зима", "поддръжка", "съвети"]
  },
  {
    id: "5-признака-че-покривът-се-нуждае-от-ремонт",
    title: "5 признака, че покривът ви се нуждае от спешен ремонт",
    excerpt: "Разберете кои са най-честите признаци за проблеми с покрива и кога е време да се обадите на специалист. Не пропускайте тези важни сигнали!",
    image: "https://images.unsplash.com/photo-1632759145389-a3afa99e5c57?w=600&q=80",
    date: "2024-11-15",
    readTime: "6 мин",
    category: "Ремонт",
    tags: ["ремонт", "диагностика", "течове"]
  },
  {
    id: "видове-хидроизолация-и-кога-да-изберем-всяка",
    title: "Видове хидроизолация и кога да изберем всяка от тях",
    excerpt: "Пълен наръчник за различните видове хидроизолационни материали - битумни, PVC мембрани, течна хидроизолация. Научете коя е най-подходяща за вашия покрив.",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&q=80",
    date: "2024-11-01",
    readTime: "10 мин",
    category: "Хидроизолация",
    tags: ["хидроизолация", "материали", "технологии"]
  },
  {
    id: "пролетна-инспекция-на-покрива",
    title: "Пролетна инспекция на покрива: Какво да проверите след зимата",
    excerpt: "След тежката зима покривът ви може да е претърпял щети. Ето какво трябва да проверите и как да предотвратите скъпи ремонти.",
    image: "https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?w=600&q=80",
    date: "2024-10-20",
    readTime: "7 мин",
    category: "Сезонна поддръжка",
    tags: ["пролет", "инспекция", "поддръжка"]
  },
  {
    id: "най-честите-грешки-при-покривни-ремонти",
    title: "Най-честите грешки при покривни ремонти и как да ги избегнете",
    excerpt: "Избягвайте скъпите грешки при ремонт на покрив. Научете какви са най-честите проблеми и как професионалистите ги решават правилно.",
    image: "https://images.unsplash.com/photo-1632759145389-a3afa99e5c57?w=600&q=80",
    date: "2024-10-05",
    readTime: "9 мин",
    category: "Ремонт",
    tags: ["грешки", "ремонт", "съвети"]
  },
  {
    id: "избор-на-керемиди-за-нов-покрив",
    title: "Как да изберем правилните керемиди за нов покрив",
    excerpt: "Керамични, бетонни или метални керемиди? Разгледайте предимствата и недостатъците на всеки тип и направете правилния избор за вашия дом.",
    image: "https://images.unsplash.com/photo-1628624747186-a941c476b7ef?w=600&q=80",
    date: "2024-09-18",
    readTime: "11 мин",
    category: "Нов покрив",
    tags: ["керемиди", "материали", "нов покрив"]
  }
];

const categories = ["Всички", "Сезонна поддръжка", "Ремонт", "Хидроизолация", "Нов покрив"];

const BlogPage = () => {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Блог за покриви и хидроизолация - RemontNaPokriviVarna",
    "description": "Експертни статии, съвети и ръководства за ремонт на покриви, хидроизолация и поддръжка от професионалисти във Варна",
    "url": "https://remontnapokrivivarna.com/блог",
    "publisher": {
      "@type": "LocalBusiness",
      "name": "RemontNaPokriviVarna",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "ул. Уста Колю Фичето 25 А",
        "addressLocality": "Варна",
        "addressCountry": "BG"
      }
    },
    "blogPost": blogPosts.map(post => ({
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.excerpt,
      "datePublished": post.date,
      "url": `https://remontnapokrivivarna.com/блог/${post.id}`
    }))
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Начало", "item": "https://remontnapokrivivarna.com" },
      { "@type": "ListItem", "position": 2, "name": "Блог", "item": "https://remontnapokrivivarna.com/блог" }
    ]
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Блог за Покриви Варна - Съвети и Ръководства</title>
        <meta name="description" content="Полезни статии за поддръжка, ремонт и хидроизолация на покриви. Експертни съвети от професионалисти." />
        <meta name="keywords" content="блог покриви, съвети за покриви, ремонт покрив, хидроизолация съвети, поддръжка на покрив, Варна" />
        <link rel="canonical" href="https://remontnapokrivivarna.com/блог" />
        <meta property="og:title" content="Блог за Покриви Варна - Съвети и Ръководства" />
        <meta property="og:description" content="Полезни статии за поддръжка, ремонт и хидроизолация на покриви." />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/20 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <nav className="text-sm text-muted-foreground mb-6">
              <Link to="/" className="hover:text-primary">Начало</Link>
              <span className="mx-2">/</span>
              <span className="text-foreground">Блог</span>
            </nav>
            
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Блог за Покриви Варна - Съвети и Новини
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl">
              Експертни съвети, ръководства и новини от света на покривните ремонти. 
              Научете как да поддържате покрива си в отлично състояние и кога да потърсите професионална помощ.
            </p>
          </div>
        </section>

        {/* Categories */}
        <section className="py-8 border-b border-border">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <Badge 
                  key={category}
                  variant={category === "Всички" ? "default" : "outline"}
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors px-4 py-2 text-sm"
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Article */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-foreground mb-8">Препоръчана Статия за Покриви</h2>
            
            <Link to={`/блог/${blogPosts[0].id}`} className="block">
              <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="relative h-64 md:h-auto">
                    <img 
                      src={blogPosts[0].image} 
                      alt={blogPosts[0].title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
                      {blogPosts[0].category}
                    </Badge>
                  </div>
                  <CardContent className="p-8 flex flex-col justify-center">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(blogPosts[0].date).toLocaleDateString('bg-BG', { 
                          day: 'numeric', 
                          month: 'long', 
                          year: 'numeric' 
                        })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {blogPosts[0].readTime}
                      </span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                      {blogPosts[0].title}
                    </h3>
                    <p className="text-muted-foreground mb-6">{blogPosts[0].excerpt}</p>
                    <div className="flex items-center text-primary font-medium">
                      Прочети повече <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                    </div>
                  </CardContent>
                </div>
              </Card>
            </Link>
          </div>
        </section>

        {/* All Articles */}
        <section className="py-12 bg-secondary/20">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-foreground mb-8">Статии за Ремонт и Поддръжка на Покриви</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.slice(1).map((post) => (
                <Link key={post.id} to={`/блог/${post.id}`}>
                  <Card className="h-full overflow-hidden hover:shadow-lg transition-all duration-300 group">
                    <div className="relative h-48">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <Badge className="absolute top-4 left-4 bg-background/90 text-foreground">
                        {post.category}
                      </Badge>
                    </div>
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-4 text-xs text-muted-foreground mb-2">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(post.date).toLocaleDateString('bg-BG', { 
                            day: 'numeric', 
                            month: 'short', 
                            year: 'numeric' 
                          })}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {post.readTime}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-sm text-muted-foreground line-clamp-3">{post.excerpt}</p>
                      <div className="flex flex-wrap gap-2 mt-4">
                        {post.tags.map((tag) => (
                          <span key={tag} className="text-xs text-muted-foreground flex items-center gap-1">
                            <Tag className="w-3 h-3" />
                            {tag}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Имате въпроси за вашия покрив?</h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Свържете се с нас за безплатна консултация и оглед. Нашите експерти ще ви помогнат да намерите най-доброто решение.
            </p>
            <a 
              href="tel:+359892701176" 
              className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-8 py-4 rounded-lg font-bold text-lg hover:bg-accent/90 transition-colors"
            >
              Обадете се сега: 089 270 1176
            </a>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingCallButton />
    </div>
  );
};

export default BlogPage;
