import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-primary">RemontNaPokriviVarna</h1>
          
          <nav className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollToSection("services")} className="text-foreground hover:text-primary transition-colors">
              Услуги
            </button>
            <button onClick={() => scrollToSection("about")} className="text-foreground hover:text-primary transition-colors">
              За нас
            </button>
            <button onClick={() => scrollToSection("gallery")} className="text-foreground hover:text-primary transition-colors">
              Галерия
            </button>
            <button onClick={() => scrollToSection("contact")} className="text-foreground hover:text-primary transition-colors">
              Контакти
            </button>
            <Button onClick={() => scrollToSection("contact")} variant="default" size="lg">
              Заявка
            </Button>
          </nav>

          <button 
            className="md:hidden text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu size={24} />
          </button>
        </div>

        {isMenuOpen && (
          <nav className="md:hidden mt-4 flex flex-col gap-4 pb-4">
            <button onClick={() => scrollToSection("services")} className="text-left text-foreground hover:text-primary transition-colors">
              Услуги
            </button>
            <button onClick={() => scrollToSection("about")} className="text-left text-foreground hover:text-primary transition-colors">
              За нас
            </button>
            <button onClick={() => scrollToSection("gallery")} className="text-left text-foreground hover:text-primary transition-colors">
              Галерия
            </button>
            <button onClick={() => scrollToSection("contact")} className="text-left text-foreground hover:text-primary transition-colors">
              Контакти
            </button>
            <Button onClick={() => scrollToSection("contact")} variant="default" className="w-full">
              Заявка
            </Button>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
