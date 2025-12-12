import { Button } from "@/components/ui/button";
import { Menu, Phone, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const scrollToSection = (id: string) => {
    if (!isHomePage) {
      window.location.href = `/#${id}`;
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        setIsMenuOpen(false);
      }
    }
  };

  const serviceLinks = [
    { label: "Всички услуги", href: "/services" },
    { label: "Ремонт на покриви", href: "/ремонт-на-покриви" },
    { label: "Хидроизолация", href: "/хидроизолация" },
    { label: "Нов покрив", href: "/изграждане-на-покрив" },
    { label: "Поддръжка", href: "/поддръжка-на-покриви" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-primary">RemontNaPokriviVarna</Link>
          
          <nav className="hidden md:flex items-center gap-6">
            {/* Services Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-foreground hover:text-primary transition-colors">
                Услуги
                <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                {serviceLinks.map((link) => (
                  <DropdownMenuItem key={link.href} asChild>
                    <Link to={link.href} className="w-full cursor-pointer">
                      {link.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Link to="/за-нас" className="text-foreground hover:text-primary transition-colors">
              За нас
            </Link>
            <Link to="/проекти" className="text-foreground hover:text-primary transition-colors">
              Проекти
            </Link>
            <Link to="/блог" className="text-foreground hover:text-primary transition-colors">
              Блог
            </Link>
            <Link to="/въпроси" className="text-foreground hover:text-primary transition-colors">
              Въпроси
            </Link>
            <Link to="/контакти" className="text-foreground hover:text-primary transition-colors">
              Контакти
            </Link>
            <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground" size="lg">
              <a href="tel:+359892701176">
                <Phone className="w-4 h-4" />
                Обадете се
              </a>
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
            <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Услуги</p>
            {serviceLinks.map((link) => (
              <Link 
                key={link.href}
                to={link.href} 
                className="text-left text-foreground hover:text-primary transition-colors pl-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="h-px bg-border my-2" />
            <Link to="/за-нас" className="text-left text-foreground hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>
              За нас
            </Link>
            <Link to="/проекти" className="text-left text-foreground hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>
              Проекти
            </Link>
            <Link to="/блог" className="text-left text-foreground hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>
              Блог
            </Link>
            <Link to="/въпроси" className="text-left text-foreground hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>
              Въпроси
            </Link>
            <Link to="/контакти" className="text-left text-foreground hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>
              Контакти
            </Link>
            <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground w-full">
              <a href="tel:+359892701176">
                <Phone className="w-4 h-4" />
                Обадете се
              </a>
            </Button>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
