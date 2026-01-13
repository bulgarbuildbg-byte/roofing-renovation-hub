import { Link } from "react-router-dom";
import { BookOpen, ArrowRight } from "lucide-react";

interface LearnMoreLink {
  title: string;
  href: string;
}

interface LearnMoreLinksProps {
  links: LearnMoreLink[];
  title?: string;
}

const LearnMoreLinks = ({ links, title = "📚 Научете повече" }: LearnMoreLinksProps) => {
  return (
    <div className="bg-muted/30 rounded-xl p-6 my-8 border border-border/30">
      <h4 className="font-bold text-foreground mb-4 flex items-center gap-2">
        <BookOpen className="w-5 h-5 text-primary" />
        {title}
      </h4>
      <ul className="space-y-3">
        {links.map((link, index) => (
          <li key={index}>
            <Link 
              to={link.href} 
              className="text-primary hover:underline flex items-center gap-2 group"
            >
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              {link.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LearnMoreLinks;
