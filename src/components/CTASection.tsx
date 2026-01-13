import { Button } from "@/components/ui/button";
import { Phone, ArrowRight } from "lucide-react";

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
    <section className={`py-12 md:py-16 ${bgClasses[variant]}`}>
      <div className="container mx-auto px-4 text-center">
        <h2 className={`text-2xl md:text-3xl lg:text-4xl font-bold ${textClasses[variant]} mb-3 md:mb-4`}>
          {title}
        </h2>
        {subtitle && (
          <p className={`text-base md:text-lg ${textClasses[variant]}/90 mb-6 md:mb-8 max-w-2xl mx-auto`}>
            {subtitle}
          </p>
        )}
        
        {/* Urgency indicator */}
        <p className={`text-sm ${textClasses[variant]}/80 mb-6`}>
          ⏰ Отговаряме в рамките на 24 часа
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center max-w-lg mx-auto">
          {showPhone && (
            <Button 
              asChild
              size="lg" 
              className={`w-full sm:w-auto h-14 md:h-16 ${variant === "primary" ? "bg-accent hover:bg-accent/90 text-accent-foreground" : "bg-primary hover:bg-primary/90 text-primary-foreground"} text-base md:text-lg font-bold px-6 md:px-8`}
            >
              <a href="tel:0892701176" className="flex items-center justify-center gap-2">
                <Phone className="w-5 h-5" />
                089 270 1176
              </a>
            </Button>
          )}
          {showContact && (
            <Button 
              onClick={scrollToContact}
              size="lg" 
              variant="ghost"
              className="w-full sm:w-auto h-14 md:h-16 !border-2 !border-white !text-white !bg-transparent hover:!bg-white/20 text-base md:text-lg font-bold px-6 md:px-8"
            >
              Изпратете запитване
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};

export default CTASection;
