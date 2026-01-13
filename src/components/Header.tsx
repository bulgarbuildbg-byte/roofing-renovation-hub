import { Button } from "@/components/ui/button";
import { Menu, Phone, ChevronDown, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/logo.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

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
    { label: "Ремонт на течове", href: "/ремонт-течове" },
    { label: "Хидроизолация", href: "/хидроизолация" },
    { label: "Нов покрив", href: "/изграждане-на-покрив" },
    { label: "Смяна на керемиди", href: "/смяна-керемиди" },
    { label: "Плоски покриви", href: "/плоски-покриви" },
    { label: "Метални покриви", href: "/метални-покриви" },
    { label: "Поддръжка", href: "/поддръжка-на-покриви" },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-[60] bg-background/95 backdrop-blur-md border-b border-border transition-all duration-300 ${isScrolled ? 'py-2' : 'py-3 md:py-4'}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src={logo} 
              alt="RemontNaPokriviVarna - Ремонт на покриви Варна" 
              className={`w-auto transition-all duration-300 ${isScrolled ? 'h-12 md:h-16' : 'h-14 md:h-20'}`}
            />
          </Link>
          
          {/* Mobile: Phone button + Menu toggle */}
          <div className="flex items-center gap-2 md:hidden">
            <Button asChild size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground h-10 px-3">
              <a href="tel:0892701176" className="flex items-center gap-1">
                <Phone className="w-4 h-4" />
                <span className="text-sm font-bold">Обадете се</span>
              </a>
            </Button>
            <button 
              className="text-foreground p-2 min-w-[48px] min-h-[48px] flex items-center justify-center rounded-md hover:bg-muted transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Затвори меню" : "Отвори меню"}
              aria-expanded={isMenuOpen}
              type="button"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-5 lg:gap-6">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-foreground hover:text-primary transition-colors font-medium">
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

            <Link to="/за-нас" className="text-foreground hover:text-primary transition-colors font-medium">
              За нас
            </Link>
            <Link to="/проекти" className="text-foreground hover:text-primary transition-colors font-medium">
              Проекти
            </Link>
            <Link to="/отзиви" className="text-foreground hover:text-primary transition-colors font-medium">
              Отзиви
            </Link>
            <Link to="/калкулатор" className="text-foreground hover:text-primary transition-colors font-medium">
              Калкулатор
            </Link>
            <Link to="/блог" className="text-foreground hover:text-primary transition-colors font-medium">
              Блог
            </Link>
            <Link to="/въпроси" className="text-foreground hover:text-primary transition-colors font-medium">
              Въпроси
            </Link>
            <Link to="/контакти" className="text-foreground hover:text-primary transition-colors font-medium">
              Контакти
            </Link>
            <Button 
              onClick={() => {
                const element = document.getElementById("contact");
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                } else {
                  window.location.href = "/#contact";
                }
              }}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold" 
              size="lg"
            >
              Безплатен оглед
            </Button>
            <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold" size="lg">
              <a href="tel:0892701176" className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                089 270 1176
              </a>
            </Button>
          </nav>
        </div>
      </div>

      {/* Mobile Menu - OUTSIDE container for proper full-screen positioning */}
      {isMenuOpen && (
        <>
          {/* Backdrop overlay for click-outside-to-close */}
          <div 
            className="md:hidden fixed inset-0 bg-black/20 z-[65]"
            onClick={() => setIsMenuOpen(false)}
            aria-hidden="true"
          />
          {/* Menu content - higher z-index than header */}
          <div 
            className="md:hidden fixed inset-x-0 bottom-0 bg-background z-[70] overflow-y-auto border-t shadow-2xl"
            style={{ top: isScrolled ? '60px' : '72px' }}
          >
            <nav className="flex flex-col p-6 pb-32">
              <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">Услуги</p>
              {serviceLinks.map((link) => (
                <Link 
                  key={link.href}
                  to={link.href} 
                  className="text-foreground hover:text-primary transition-colors py-3 text-lg border-b border-border"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              
              <div className="h-px bg-border my-4" />
              
              <Link to="/за-нас" className="text-foreground hover:text-primary transition-colors py-3 text-lg" onClick={() => setIsMenuOpen(false)}>
                За нас
              </Link>
              <Link to="/проекти" className="text-foreground hover:text-primary transition-colors py-3 text-lg" onClick={() => setIsMenuOpen(false)}>
                Проекти
              </Link>
              <Link to="/отзиви" className="text-foreground hover:text-primary transition-colors py-3 text-lg" onClick={() => setIsMenuOpen(false)}>
                Отзиви
              </Link>
              <Link to="/калкулатор" className="text-foreground hover:text-primary transition-colors py-3 text-lg" onClick={() => setIsMenuOpen(false)}>
                Калкулатор
              </Link>
              <Link to="/блог" className="text-foreground hover:text-primary transition-colors py-3 text-lg" onClick={() => setIsMenuOpen(false)}>
                Блог
              </Link>
              <Link to="/въпроси" className="text-foreground hover:text-primary transition-colors py-3 text-lg" onClick={() => setIsMenuOpen(false)}>
                Въпроси
              </Link>
              <Link to="/контакти" className="text-foreground hover:text-primary transition-colors py-3 text-lg" onClick={() => setIsMenuOpen(false)}>
                Контакти
              </Link>

              <div className="mt-6 space-y-3">
                <Button asChild className="w-full h-14 bg-accent hover:bg-accent/90 text-accent-foreground text-lg font-bold">
                  <a href="tel:0892701176" className="flex items-center justify-center gap-2">
                    <Phone className="w-5 h-5" />
                    089 270 1176
                  </a>
                </Button>
                <Button 
                  onClick={() => {
                    setIsMenuOpen(false);
                    scrollToSection('contact');
                  }}
                  className="w-full h-14 bg-primary hover:bg-primary/90 text-primary-foreground text-lg font-bold"
                >
                  Заявете безплатен оглед
                </Button>
              </div>
            </nav>
          </div>
        </>
      )}
    </header>
  );
};

export default Header;
