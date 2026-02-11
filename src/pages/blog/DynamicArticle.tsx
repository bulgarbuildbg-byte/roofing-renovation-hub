import { useEffect, useState } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCallButton from "@/components/FloatingCallButton";
import ReactMarkdown from "react-markdown";
import { Calendar, Clock, ArrowLeft, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const DynamicArticle = () => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;
    supabase
      .from("articles")
      .select("*")
      .eq("slug", slug)
      .eq("published", true)
      .single()
      .then(({ data, error }) => {
        if (error || !data) setNotFound(true);
        else setArticle(data);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex justify-center py-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        </div>
        <Footer />
      </div>
    );
  }

  if (notFound) return null; // Let BlogArticle handle fallback

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.excerpt || "",
    datePublished: article.published_at || article.created_at,
    image: article.cover_image_url || "",
    url: `https://www.remontnapokrivivarna.bg/блог/${article.slug}`,
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{article.title} | Ремонт на Покриви Варна</title>
        <meta name="description" content={article.excerpt || article.title} />
        <link rel="canonical" href={`https://www.remontnapokrivivarna.bg/блог/${article.slug}`} />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.excerpt || ""} />
        {article.cover_image_url && <meta property="og:image" content={article.cover_image_url} />}
        <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
      </Helmet>

      <Header />

      <main className="pt-20">
        <article className="container mx-auto px-4 py-12 max-w-3xl">
          <nav className="text-sm text-muted-foreground mb-6">
            <Link to="/" className="hover:text-primary">Начало</Link>
            <span className="mx-2">/</span>
            <Link to="/блог" className="hover:text-primary">Блог</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">{article.title}</span>
          </nav>

          <Link to="/блог" className="inline-flex items-center gap-2 text-primary hover:underline mb-6">
            <ArrowLeft className="h-4 w-4" /> Обратно към блога
          </Link>

          {article.cover_image_url && (
            <img
              src={article.cover_image_url}
              alt={article.title}
              className="w-full h-64 md:h-96 object-cover rounded-xl mb-8"
            />
          )}

          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {new Date(article.published_at || article.created_at).toLocaleDateString("bg-BG", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
            <Badge variant="outline">{article.category}</Badge>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">{article.title}</h1>

          <div className="prose prose-lg max-w-none">
            <ReactMarkdown>{article.content}</ReactMarkdown>
          </div>

          {article.tags && article.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-border">
              {article.tags.map((tag: string) => (
                <span key={tag} className="text-xs text-muted-foreground flex items-center gap-1">
                  <Tag className="w-3 h-3" /> {tag}
                </span>
              ))}
            </div>
          )}
        </article>
      </main>

      <Footer />
      <FloatingCallButton />
    </div>
  );
};

export default DynamicArticle;
