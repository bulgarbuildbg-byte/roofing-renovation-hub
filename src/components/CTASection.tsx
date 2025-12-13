import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";

interface CTASectionProps {
  variant?: "primary" | "accent" | "emergency";
  title: string;
  subtitle?: string;
  showPhone?: boolean;
  showContact?: boolean;
}

const CTASection = ({ 
  variant = "primary", 
  title, 
  subtitle, 
  showPhone = true, 
  showContact = true 
}: CTASectionProps) => {
  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const bgClasses = {
    primary: "bg-primary",
    accent: "bg-accent",
    emergency: "bg-destructive"
  };

  const textClasses = {
    primary: "text-primary-foreground",
    accent: "text-accent-foreground",
    emergency: "text-destructive-foreground"
  };

  return (
    <section className={`py-16 ${bgClasses[variant]}`}>
      <div className="container mx-auto px-4 text-center">
        <h2 className={`text-3xl md:text-4xl font-bold ${textClasses[variant]} mb-4`}>
          {title}
        </h2>
        {subtitle && (
          <p className={`text-lg ${textClasses[variant]}/90 mb-8 max-w-2xl mx-auto`}>
            {subtitle}
          </p>
        )}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {showPhone && (
            <a href="tel:0892701176">
              <Button 
                size="lg" 
                className={`${variant === "primary" ? "bg-accent hover:bg-accent/90 text-accent-foreground" : "bg-primary hover:bg-primary/90 text-primary-foreground"} text-lg px-8 py-6`}
              >
                <Phone className="w-5 h-5 mr-2" />
                089 270 1176
              </Button>
            </a>
          )}
          {showContact && (
            <Button 
              onClick={scrollToContact}
              size="lg" 
              variant="outline"
              className={`border-2 ${textClasses[variant]} border-current bg-transparent hover:bg-background/10 text-lg px-8 py-6`}
            >
              Изпратете запитване
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};

export default CTASection;
