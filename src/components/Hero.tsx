import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import heroImage from "@/assets/hero-roofing.jpg";

const Hero = () => {
  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/70 to-primary/50" />
      </div>
      
      <div className="container mx-auto px-4 py-32 relative z-10">
        <div className="max-w-4xl">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-6 animate-fade-in leading-tight">
            Професионален Ремонт на Покриви и Хидроизолация, на Които Можете да Разчитате
          </h1>
          <p className="text-xl md:text-2xl text-primary-foreground/90 mb-4 animate-fade-in">
            Качествен ремонт и монтаж на покриви във Варна и региона.
          </p>
          <p className="text-lg md:text-xl text-accent font-semibold mb-8 animate-fade-in">
            ✓ Над 15 години опит • ✓ Писмена гаранция • ✓ Безплатен оглед в рамките на 24 часа
          </p>
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in">
            <Button 
              onClick={scrollToContact}
              size="lg" 
              className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8 py-6"
            >
              Заявете Безплатна Инспекция
            </Button>
            <a href="tel:0892701176">
              <Button 
                size="lg" 
                variant="outline"
                className="w-full bg-transparent border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary text-lg px-8 py-6"
              >
                <Phone className="w-5 h-5 mr-2" />
                Обадете Се Сега
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
