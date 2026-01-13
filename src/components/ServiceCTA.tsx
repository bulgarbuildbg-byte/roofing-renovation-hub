import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface ServiceCTAProps {
  title: string;
  description: string;
  href: string;
  variant?: "default" | "highlight";
}

const ServiceCTA = ({ title, description, href, variant = "default" }: ServiceCTAProps) => {
  const baseClasses = "rounded-xl p-6 my-8 border transition-colors";
  const variantClasses = variant === "highlight" 
    ? "bg-primary/5 border-primary/20 hover:bg-primary/10" 
    : "bg-secondary/30 border-border/30 hover:bg-secondary/50";

  return (
    <div className={`${baseClasses} ${variantClasses}`}>
      <h4 className="font-bold text-foreground mb-3">{title}</h4>
      <p className="text-muted-foreground mb-4">{description}</p>
      <Link 
        to={href} 
        className="text-primary font-medium hover:underline inline-flex items-center gap-1"
      >
        Научете повече
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
};

export default ServiceCTA;
