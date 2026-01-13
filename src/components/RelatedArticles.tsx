import { Link } from "react-router-dom";
import { Clock } from "lucide-react";

export interface RelatedArticle {
  title: string;
  slug: string;
  image: string;
  readTime: string;
}

interface RelatedArticlesProps {
  articles: RelatedArticle[];
  title?: string;
}

const RelatedArticles = ({ articles, title = "Свързани Статии" }: RelatedArticlesProps) => {
  return (
    <section className="py-12 border-t border-border mt-12">
      <h3 className="font-bold text-xl md:text-2xl text-foreground mb-6">{title}</h3>
      <div className="grid md:grid-cols-2 gap-4">
        {articles.map((article) => (
          <Link to={`/блог/${article.slug}`} key={article.slug} className="group">
            <div className="flex gap-4 p-4 bg-secondary/30 rounded-xl hover:bg-secondary/50 transition-colors border border-border/30">
              <img 
                src={article.image} 
                alt={article.title} 
                className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
                loading="lazy"
              />
              <div className="flex flex-col justify-center min-w-0">
                <h4 className="font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">
                  {article.title}
                </h4>
                <span className="text-sm text-muted-foreground flex items-center gap-1 mt-2">
                  <Clock className="w-3 h-3" />
                  {article.readTime}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default RelatedArticles;
