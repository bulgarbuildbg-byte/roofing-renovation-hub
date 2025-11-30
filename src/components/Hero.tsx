import { Button } from "@/components/ui/button";
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
        <div className="max-w-3xl">
          <h2 className="text-5xl md:text-7xl font-bold text-primary-foreground mb-6 animate-fade-in">
            Професионални Покривни Услуги във Варна
          </h2>
          <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 animate-fade-in">
            Качествен ремонт и монтаж на покриви. Опит, надеждност и гаранция за всеки проект.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in">
            <Button 
              onClick={scrollToContact}
              size="lg" 
              variant="default"
              className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8 py-6"
            >
              Безплатна Оценка
            </Button>
            <Button 
              onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}
              size="lg" 
              variant="outline"
              className="bg-transparent border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary text-lg px-8 py-6"
            >
              Нашите Услуги
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
