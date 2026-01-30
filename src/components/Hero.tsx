import { Button } from "@/components/ui/button";
import { Phone, CheckCircle, Clock, Shield } from "lucide-react";
import heroImage from "@/assets/process/tile-roof-construction.jpg";

const Hero = () => {
  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-[85vh] md:min-h-screen flex items-center justify-center overflow-hidden pt-20 md:pt-24">
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-primary/80 to-primary/60" />
      </div>
      
      <div className="container mx-auto px-4 py-12 md:py-20 relative z-10">
        <div className="max-w-4xl">
          {/* Trust badges - Mobile optimized */}
          <div className="flex flex-wrap gap-2 md:gap-4 mb-6 md:mb-8">
            <span className="inline-flex items-center gap-1.5 bg-accent/20 backdrop-blur-sm text-accent px-3 py-1.5 rounded-full text-sm font-medium">
              <CheckCircle className="w-4 h-4" />
              15+ години опит
            </span>
            <span className="inline-flex items-center gap-1.5 bg-accent/20 backdrop-blur-sm text-accent px-3 py-1.5 rounded-full text-sm font-medium">
              <Shield className="w-4 h-4" />
              До 10г гаранция
            </span>
            <span className="inline-flex items-center gap-1.5 bg-accent/20 backdrop-blur-sm text-accent px-3 py-1.5 rounded-full text-sm font-medium">
              <Clock className="w-4 h-4" />
              Оглед до 24ч
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-4 md:mb-6 animate-fade-in leading-tight">
            Професионален Ремонт на Покриви във Варна
          </h1>
          
          <p className="text-lg md:text-xl lg:text-2xl text-primary-foreground/90 mb-6 md:mb-8 animate-fade-in max-w-2xl">
            Спрете течовете завинаги. Качествен ремонт и хидроизолация с писмена гаранция.
          </p>
          
          {/* CTA Buttons - Mobile first, stacked */}
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 animate-fade-in">
            <Button 
              onClick={scrollToContact}
              size="lg" 
              className="w-full sm:w-auto h-14 md:h-16 bg-accent hover:bg-accent/90 text-accent-foreground text-base md:text-lg font-bold px-6 md:px-8"
            >
              Заявете Безплатен Оглед
            </Button>
            <Button 
              asChild
              size="lg" 
              variant="outline"
              className="w-full sm:w-auto h-14 md:h-16 bg-transparent border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary text-base md:text-lg font-bold px-6 md:px-8"
            >
              <a href="tel:0884997659" className="flex items-center justify-center gap-2">
                <Phone className="w-5 h-5" />
                088 499 7659
              </a>
            </Button>
          </div>
          
          {/* Urgency text */}
          <p className="mt-6 text-primary-foreground/80 text-sm md:text-base">
            ⚡ Аварийни случаи: Реагираме в рамките на часове
          </p>
        </div>
      </div>
      
      {/* Bottom gradient for smooth transition */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
};

export default Hero;
