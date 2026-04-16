import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Calendar, Clock, ArrowRight, Tag } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";

// Import blog images
import winterPreparation from "@/assets/blog/winter-preparation.jpg";
import roofRepairSigns from "@/assets/blog/roof-repair-signs.jpg";
import waterproofingTypes from "@/assets/blog/waterproofing-types.jpg";
import springInspection from "@/assets/blog/spring-inspection.jpg";
import commonMistakes from "@/assets/blog/common-mistakes.jpg";
import choosingTiles from "@/assets/blog/choosing-tiles.jpg";
import roofRepairCost from "@/assets/blog/roof-repair-cost.jpg";
import tileReplacementGuide from "@/assets/blog/tile-replacement-guide.jpg";
import roofLeakCauses from "@/assets/blog/roof-leak-causes.jpg";
import roofMaintenanceGuide from "@/assets/blog/roof-maintenance-guide.jpg";

const blogPosts = [
  {
    id: "tsena-remont-pokriv-varna-2026",
    title: "Цена за ремонт на покрив във Варна 2026 — Пълен ценови наръчник",
    excerpt: "Актуални цени за ремонт на покриви: керемиден 20-35 €/м², плосък 15-25 €/м², метален 18-30 €/м². Ценова таблица, реални примери и съвети за спестяване.",
    image: roofRepairCost,
    date: "2026-04-14",
    readTime: "15 мин",
    category: "Цени",
    tags: ["цени", "ремонт", "Варна"]
  },
  {
    id: "smyana-na-keremidi-cena-i-narachnik",
    title: "Смяна на керемиди — Кога, как и колко струва през 2026",
    excerpt: "Глинени керемиди 25-40 €/м², бетонни 18-28 €/м². Кога да смените, видове керемиди, процес стъпка по стъпка и реални примери от Варна.",
    image: tileReplacementGuide,
    date: "2026-04-14",
    readTime: "14 мин",
    category: "Ремонт",
    tags: ["керемиди", "смяна", "цени"]
  },
  {
    id: "tech-ot-pokriva-prichini-i-reshenia",
    title: "Теч от покрива — Причини, решения и цени за ремонт",
    excerpt: "8 най-чести причини за течове и как да ги отстраните. Цени от 150 EUR. Спешна реакция до 24ч. Какво да направите веднага при теч.",
    image: roofLeakCauses,
    date: "2026-04-14",
    readTime: "13 мин",
    category: "Ремонт",
    tags: ["течове", "спешен ремонт", "диагностика"]
  },
  {
    id: "poddruzhka-na-pokriv-rakovodstvo-2026",
    title: "Поддръжка на покрив — Пълно ръководство за 2026",
    excerpt: "Сезонен чеклист за поддръжка: 100-300 €/год. спестяват 3,000-15,000 € ремонти. Какво, кога и как да проверявате.",
    image: roofMaintenanceGuide,
    date: "2026-04-14",
    readTime: "12 мин",
    category: "Сезонна поддръжка",
    tags: ["поддръжка", "чеклист", "превенция"]
  },
  {
    id: "podgotovka-pokriv-za-zimata",
    title: "Как да подготвим покрива за зимата: Пълно ръководство",
    excerpt: "Научете как да подготвите покрива си за студените месеци с нашите експертни съвети. От инспекция до превантивни мерки - всичко, което трябва да знаете.",
    image: winterPreparation,
    date: "2024-12-01",
    readTime: "8 мин",
    category: "Сезонна поддръжка",
    tags: ["зима", "поддръжка", "съвети"]
  },
  {
    id: "5-priznaka-remont-na-pokriv",
    title: "5 признака, че покривът ви се нуждае от спешен ремонт",
    excerpt: "Течове, липсващи керемиди, провисване — разберете кога покривът ви се нуждае от спешен ремонт. Цени от 150 EUR, реални примери от Варна.",
    image: roofRepairSigns,
    date: "2024-11-15",
    readTime: "12 мин",
    category: "Ремонт",
    tags: ["ремонт", "диагностика", "течове"]
  },
  {
    id: "vidove-hidroizolacia-narachnik",
    title: "Видове хидроизолация и кога да изберем всяка от тях",
    excerpt: "Битумна 8-15 €/м², PVC мембрана 15-25 €/м², течна 12-20 €/м². Пълно сравнение, ценови таблици и реални примери от Варна.",
    image: waterproofingTypes,
    date: "2024-11-01",
    readTime: "14 мин",
    category: "Хидроизолация",
    tags: ["хидроизолация", "материали", "технологии"]
  },
  {
    id: "proletna-inspekcia-na-pokriva",
    title: "Пролетна инспекция на покрива: Какво да проверите след зимата",
    excerpt: "Пълен чеклист с 12 точки за пролетна инспекция. Цена на професионален оглед 50-150 EUR. Какво да проверите и кога да повикате специалист.",
    image: springInspection,
    date: "2024-10-20",
    readTime: "12 мин",
    category: "Сезонна поддръжка",
    tags: ["пролет", "инспекция", "поддръжка"]
  },
  {
    id: "greshki-pri-remont-na-pokriv",
    title: "Най-честите грешки при покривни ремонти и как да ги избегнете",
    excerpt: "10 скъпи грешки, които виждаме всеки ден. Как да спестите 500-3,000 EUR и да получите качествен ремонт от първия път.",
    image: commonMistakes,
    date: "2024-10-05",
    readTime: "13 мин",
    category: "Ремонт",
    tags: ["грешки", "ремонт", "съвети"]
  },
  {
    id: "izbor-na-keremidi-za-pokriv",
    title: "Как да изберем правилните керемиди за нов покрив",
    excerpt: "Глинени 25-40 €/м², бетонни 18-28 €/м², метални 15-25 €/м². Пълно сравнение, плюсове и минуси, реални цени за монтаж във Варна.",
    image: choosingTiles,
    date: "2024-09-18",
    readTime: "13 мин",
    category: "Нов покрив",
    tags: ["керемиди", "материали", "нов покрив"]
  }
];

const categories = ["Всички", "Сезонна поддръжка", "Ремонт", "Хидроизолация", "Нов покрив", "Цени"];

const BlogPage = () => {
  const [dynamicPosts, setDynamicPosts] = useState<any[]>([]);

  useEffect(() => {
    supabase
      .from("articles")
      .select("*")
      .eq("published", true)
      .order("published_at", { ascending: false })
      .then(({ data }) => {
        if (data) {
          setDynamicPosts(
            data.map((a) => ({
              id: a.slug,
              title: a.title,
              excerpt: a.excerpt || "",
              image: a.cover_image_url || "",
              date: a.published_at || a.created_at,
              readTime: `${Math.max(3, Math.ceil((a.content?.length || 0) / 1000))} мин`,
              category: a.category,
              tags: a.tags || [],
            }))
          );
        }
      });
  }, []);

  const allPosts = [...blogPosts, ...dynamicPosts];

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Блог за покриви и хидроизолация - RemontNaPokriviVarna",
    "description": "Експертни статии, съвети и ръководства за ремонт на покриви, хидроизолация и поддръжка от професионалисти във Варна",
    "url": "https://www.remontnapokrivivarna.bg/bg/blog",
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
    "blogPost": allPosts.map(post => ({
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.excerpt,
      "datePublished": post.date,
      "url": `https://www.remontnapokrivivarna.bg/bg/blog/${post.id}`
    }))
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Начало", "item": "https://www.remontnapokrivivarna.bg/bg" },
      { "@type": "ListItem", "position": 2, "name": "Блог", "item": "https://www.remontnapokrivivarna.bg/bg/blog" }
    ]
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Блог за Покриви Варна - Съвети и Ръководства | 2026</title>
        <meta name="description" content="Полезни статии за поддръжка, ремонт и хидроизолация на покриви. Експертни съвети, ценови наръчници и ръководства от професионалисти във Варна." />
        <meta name="keywords" content="блог покриви, съвети за покриви, ремонт покрив, хидроизолация съвети, поддръжка на покрив, Варна" />
        <meta property="og:title" content="Блог за Покриви Варна - Съвети и Ръководства" />
        <meta property="og:description" content="Полезни статии за поддръжка, ремонт и хидроизолация на покриви." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.remontnapokrivivarna.bg/bg/blog" />
        <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/20 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <nav className="text-sm text-muted-foreground mb-6">
              <Link to="/bg" className="hover:text-primary">Начало</Link>
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
            
            <Link to={`/bg/blog/${allPosts[0].id}`} className="block">
              <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="relative h-64 md:h-auto">
                    <img 
                      src={allPosts[0].image} 
                      alt={allPosts[0].title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
                      {allPosts[0].category}
                    </Badge>
                  </div>
                  <CardContent className="p-8 flex flex-col justify-center">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(allPosts[0].date).toLocaleDateString('bg-BG', { 
                          day: 'numeric', 
                          month: 'long', 
                          year: 'numeric' 
                        })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {allPosts[0].readTime}
                      </span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                      {allPosts[0].title}
                    </h3>
                    <p className="text-muted-foreground mb-6">{allPosts[0].excerpt}</p>
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
              {allPosts.slice(1).map((post) => (
                <Link key={post.id} to={`/bg/blog/${post.id}`}>
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
              href="tel:0884997659" 
              className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-8 py-4 rounded-lg font-bold text-lg hover:bg-accent/90 transition-colors"
            >
              Обадете се сега: 088 499 7659
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPage;
