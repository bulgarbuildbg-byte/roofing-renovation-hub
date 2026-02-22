import { Button } from "@/components/ui/button";
import { Menu, Phone, ChevronDown, X, LogIn } from "lucide-react";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import logo from "@/assets/logo.png";
import { useLocalizedPath } from "@/hooks/useLocalizedPath";
import LanguageSwitcher from "./LanguageSwitcher";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { RouteKey } from "@/i18n/routes";

interface ServiceLink {
  label: string;
  routeKey: RouteKey;
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  isScrolled: boolean;
  serviceLinks: ServiceLink[];
  scrollToSection: (id: string) => void;
  t: (key: string) => string;
  getPath: (key: RouteKey) => string;
}

const MobileMenu = ({ isOpen, onClose, isScrolled, serviceLinks, scrollToSection, t, getPath }: MobileMenuProps) => {
  if (!isOpen) return null;

  return createPortal(
    <div className="md:hidden">
      <div 
        className="fixed inset-0 bg-black/30 z-[100]"
        onClick={onClose}
        aria-hidden="true"
      />
      <div 
        className="fixed inset-x-0 bottom-0 bg-background z-[110] overflow-y-auto border-t shadow-2xl animate-in fade-in-0 duration-200"
        style={{ top: isScrolled ? '60px' : '72px' }}
      >
        <nav className="flex flex-col p-6 pb-32">
          <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">{t('nav.services')}</p>
          {serviceLinks.map((link) => (
            <Link 
              key={link.routeKey}
              to={getPath(link.routeKey)} 
              className="text-foreground hover:text-primary transition-colors py-3 text-lg border-b border-border"
              onClick={onClose}
            >
              {link.label}
            </Link>
          ))}
          
          <div className="h-px bg-border my-4" />
          
          <Link to={getPath('about')} className="text-foreground hover:text-primary transition-colors py-3 text-lg" onClick={onClose}>{t('nav.about')}</Link>
          <Link to={getPath('projects')} className="text-foreground hover:text-primary transition-colors py-3 text-lg" onClick={onClose}>{t('nav.projects')}</Link>
          <Link to={getPath('reviews')} className="text-foreground hover:text-primary transition-colors py-3 text-lg" onClick={onClose}>{t('nav.reviews')}</Link>
          <Link to={getPath('calculator')} className="text-foreground hover:text-primary transition-colors py-3 text-lg" onClick={onClose}>{t('nav.calculator')}</Link>
          <Link to={getPath('blog')} className="text-foreground hover:text-primary transition-colors py-3 text-lg" onClick={onClose}>{t('nav.blog')}</Link>
          <Link to={getPath('faq')} className="text-foreground hover:text-primary transition-colors py-3 text-lg" onClick={onClose}>{t('nav.faq')}</Link>
          <Link to={getPath('contact')} className="text-foreground hover:text-primary transition-colors py-3 text-lg" onClick={onClose}>{t('nav.contact')}</Link>

          <div className="h-px bg-border my-4" />

          <div className="mb-4">
            <LanguageSwitcher />
          </div>

          <Link to="/admin/login" className="text-muted-foreground hover:text-primary transition-colors py-3 text-sm flex items-center gap-2" onClick={onClose}>
            <LogIn className="w-4 h-4" />
            {t('nav.teamLogin')}
          </Link>

          <div className="mt-6 space-y-3">
            <Button asChild className="w-full h-14 bg-accent hover:bg-accent/90 text-accent-foreground text-lg font-bold">
              <a href="tel:0884997659" className="flex items-center justify-center gap-2">
                <Phone className="w-5 h-5" />
                088 499 7659
              </a>
            </Button>
            <Button 
              onClick={() => {
                onClose();
                scrollToSection('contact');
              }}
              className="w-full h-14 bg-primary hover:bg-primary/90 text-primary-foreground text-lg font-bold"
            >
              {t('nav.freeInspection')}
            </Button>
          </div>
        </nav>
      </div>
    </div>,
    document.body
  );
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { t } = useTranslation();
  const { getPath, currentLang } = useLocalizedPath();
  const isHomePage = location.pathname === `/${currentLang}` || location.pathname === `/${currentLang}/`;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setIsMenuOpen(false); }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  const scrollToSection = (id: string) => {
    if (!isHomePage) {
      window.location.href = `/${currentLang}#${id}`;
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        setIsMenuOpen(false);
      }
    }
  };

  const serviceLinks: ServiceLink[] = [
    { label: t('nav.allServices'), routeKey: 'services' },
    { label: t('nav.roofRepair'), routeKey: 'roofRepair' },
    { label: t('nav.leakRepair'), routeKey: 'leakRepair' },
    { label: t('nav.waterproofing'), routeKey: 'waterproofing' },
    { label: t('nav.newRoof'), routeKey: 'newRoof' },
    { label: t('nav.tileReplacement'), routeKey: 'tileReplacement' },
    { label: t('nav.flatRoof'), routeKey: 'flatRoof' },
    { label: t('nav.metalRoof'), routeKey: 'metalRoof' },
    { label: t('nav.maintenance'), routeKey: 'maintenance' },
  ];

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-[60] bg-background/95 backdrop-blur-md border-b border-border transition-all duration-300 ${isScrolled ? 'py-2' : 'py-3 md:py-4'}`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <Link to={getPath('home')} className="flex items-center">
              <img 
                src={logo} 
                alt="RemontNaPokriviVarna - Ремонт на покриви Варна" 
                className={`w-auto transition-all duration-300 ${isScrolled ? 'h-12 md:h-16' : 'h-14 md:h-20'}`}
              />
            </Link>
            
            <div className="flex items-center gap-2 md:hidden">
              <Button asChild size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground h-10 px-3">
                <a href="tel:0884997659" className="flex items-center gap-1">
                  <Phone className="w-4 h-4" />
                  <span className="text-sm font-bold">{t('nav.callUs')}</span>
                </a>
              </Button>
              <button 
                className="text-foreground p-2 min-w-[48px] min-h-[48px] flex items-center justify-center rounded-md hover:bg-muted transition-colors relative z-[120]"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMenuOpen}
                type="button"
              >
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>

            <nav className="hidden md:flex items-center gap-5 lg:gap-6">
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1 text-foreground hover:text-primary transition-colors font-medium">
                  {t('nav.services')}
                  <ChevronDown className="w-4 h-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" sideOffset={8} className="w-48 z-[70]">
                  {serviceLinks.map((link) => (
                    <DropdownMenuItem key={link.routeKey} asChild>
                      <Link to={getPath(link.routeKey)} className="w-full cursor-pointer">
                        {link.label}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <Link to={getPath('about')} className="text-foreground hover:text-primary transition-colors font-medium">{t('nav.about')}</Link>
              <Link to={getPath('projects')} className="text-foreground hover:text-primary transition-colors font-medium">{t('nav.projects')}</Link>
              <Link to={getPath('reviews')} className="text-foreground hover:text-primary transition-colors font-medium">{t('nav.reviews')}</Link>
              <Link to={getPath('calculator')} className="text-foreground hover:text-primary transition-colors font-medium">{t('nav.calculator')}</Link>
              <Link to={getPath('blog')} className="text-foreground hover:text-primary transition-colors font-medium">{t('nav.blog')}</Link>
              <Link to={getPath('faq')} className="text-foreground hover:text-primary transition-colors font-medium">{t('nav.faq')}</Link>
              <Link to={getPath('contact')} className="text-foreground hover:text-primary transition-colors font-medium">{t('nav.contact')}</Link>
              <Button 
                onClick={() => {
                  const element = document.getElementById("contact");
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                  } else {
                    window.location.href = `/${currentLang}#contact`;
                  }
                }}
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold" 
                size="lg"
              >
                {t('nav.freeInspection')}
              </Button>
              <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold" size="lg">
                <a href="tel:0884997659" className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  088 499 7659
                </a>
              </Button>
              <LanguageSwitcher />
              <Link to="/admin/login" className="text-muted-foreground hover:text-muted-foreground/70 transition-colors" title={t('nav.teamLogin')}>
                <LogIn className="w-5 h-5" />
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <MobileMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        isScrolled={isScrolled}
        serviceLinks={serviceLinks}
        scrollToSection={scrollToSection}
        t={t}
        getPath={getPath}
      />
    </>
  );
};

export default Header;
