import { Button } from "@/components/ui/button";
import { Menu, Phone, ChevronDown, X, LogIn } from "lucide-react";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import logo from "@/assets/logo-horizontal.jpeg";
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
    <div className="lg:hidden">
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

          <div className="h-px bg-border my-3" />

          <div className="mb-3">
            <LanguageSwitcher />
          </div>

          <Link to={getPath('about')} className="text-foreground hover:text-primary transition-colors py-3 text-lg" onClick={onClose}>{t('nav.about')}</Link>
          <Link to={getPath('projects')} className="text-foreground hover:text-primary transition-colors py-3 text-lg" onClick={onClose}>{t('nav.projects')}</Link>
          <Link to={getPath('reviews')} className="text-foreground hover:text-primary transition-colors py-3 text-lg" onClick={onClose}>{t('nav.reviews')}</Link>
          <Link to={getPath('pricing')} className="text-foreground hover:text-primary transition-colors py-3 text-lg" onClick={onClose}>{t('nav.pricing')}</Link>
          <Link to={getPath('howWeWork')} className="text-foreground hover:text-primary transition-colors py-3 text-lg" onClick={onClose}>{t('nav.howWeWork')}</Link>
          <Link to={getPath('calculator')} className="text-foreground hover:text-primary transition-colors py-3 text-lg" onClick={onClose}>{t('nav.calculator')}</Link>
          <Link to={getPath('blog')} className="text-foreground hover:text-primary transition-colors py-3 text-lg" onClick={onClose}>{t('nav.blog')}</Link>
          <Link to={getPath('faq')} className="text-foreground hover:text-primary transition-colors py-3 text-lg" onClick={onClose}>{t('nav.faq')}</Link>
          <Link to={getPath('contact')} className="text-foreground hover:text-primary transition-colors py-3 text-lg" onClick={onClose}>{t('nav.contact')}</Link>

          <div className="h-px bg-border my-4" />

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
            <Button asChild className="w-full h-14 bg-primary hover:bg-primary/90 text-primary-foreground text-lg font-bold">
              <Link to={getPath('inspection')} onClick={onClose}>
                {t('nav.freeInspection')}
              </Link>
            </Button>
          </div>
        </nav>
      </div>
    </div>,
    document.body
  );
};

interface FullMenuPanelProps {
  isOpen: boolean;
  onClose: () => void;
  serviceLinks: ServiceLink[];
  t: (key: string) => string;
  getPath: (key: RouteKey) => string;
  currentLang: string;
}

const FullMenuPanel = ({ isOpen, onClose, serviceLinks, t, getPath }: FullMenuPanelProps) => {
  if (!isOpen) return null;

  return createPortal(
    <>
      <div className="fixed inset-0 bg-black/40 z-[80]" onClick={onClose} aria-hidden="true" />
      <div className="fixed top-0 right-0 bottom-0 w-80 bg-background z-[90] shadow-2xl overflow-y-auto animate-in slide-in-from-right duration-200">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <span className="font-bold text-lg text-foreground">Меню</span>
          <button onClick={onClose} className="p-2 rounded-md hover:bg-muted transition-colors" aria-label="Close menu">
            <X size={22} />
          </button>
        </div>
        <nav className="flex flex-col p-6 gap-1">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">{t('nav.services')}</p>
          {serviceLinks.map((link) => (
            <Link
              key={link.routeKey}
              to={getPath(link.routeKey)}
              className="text-foreground hover:text-primary transition-colors py-2.5 text-base border-b border-border/50"
              onClick={onClose}
            >
              {link.label}
            </Link>
          ))}

          <div className="h-px bg-border my-4" />

          <Link to={getPath('about')} className="text-foreground hover:text-primary transition-colors py-2.5 text-base" onClick={onClose}>{t('nav.about')}</Link>
          <Link to={getPath('projects')} className="text-foreground hover:text-primary transition-colors py-2.5 text-base" onClick={onClose}>{t('nav.projects')}</Link>
          <Link to={getPath('reviews')} className="text-foreground hover:text-primary transition-colors py-2.5 text-base" onClick={onClose}>{t('nav.reviews')}</Link>
          <Link to={getPath('pricing')} className="text-foreground hover:text-primary transition-colors py-2.5 text-base" onClick={onClose}>{t('nav.pricing')}</Link>
          <Link to={getPath('howWeWork')} className="text-foreground hover:text-primary transition-colors py-2.5 text-base" onClick={onClose}>{t('nav.howWeWork')}</Link>
          <Link to={getPath('calculator')} className="text-foreground hover:text-primary transition-colors py-2.5 text-base" onClick={onClose}>{t('nav.calculator')}</Link>
          <Link to={getPath('blog')} className="text-foreground hover:text-primary transition-colors py-2.5 text-base" onClick={onClose}>{t('nav.blog')}</Link>
          <Link to={getPath('faq')} className="text-foreground hover:text-primary transition-colors py-2.5 text-base" onClick={onClose}>{t('nav.faq')}</Link>
          <Link to={getPath('contact')} className="text-foreground hover:text-primary transition-colors py-2.5 text-base" onClick={onClose}>{t('nav.contact')}</Link>

          <div className="h-px bg-border my-4" />

          <Link to="/admin/login" className="text-muted-foreground hover:text-primary transition-colors py-2.5 text-sm flex items-center gap-2" onClick={onClose}>
            <LogIn className="w-4 h-4" />
            {t('nav.teamLogin')}
          </Link>
        </nav>
      </div>
    </>,
    document.body
  );
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFullMenuOpen, setIsFullMenuOpen] = useState(false);
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

  useEffect(() => { setIsMenuOpen(false); setIsFullMenuOpen(false); }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = (isMenuOpen || isFullMenuOpen) ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen, isFullMenuOpen]);

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
    { label: t('nav.tileRoofRepair'), routeKey: 'tileRoofRepair' },
    { label: t('nav.flatRoof'), routeKey: 'flatRoof' },
    { label: t('nav.metalRoof'), routeKey: 'metalRoof' },
    { label: t('nav.maintenance'), routeKey: 'maintenance' },
    { label: t('nav.solarSystems'), routeKey: 'solarSystems' },
  ];

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-[60] bg-background/95 backdrop-blur-md border-b border-border transition-all duration-300 ${isScrolled ? 'py-2' : 'py-3 md:py-4'}`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between gap-4">

            {/* Logo */}
            <Link to={getPath('home')} className="flex items-center flex-shrink-0">
              <img
                src={logo}
                alt="RemontNaPokriviVarna - Ремонт на покриви Варна"
                className={`w-auto transition-all duration-300 ${isScrolled ? 'h-12 md:h-16' : 'h-14 md:h-20'}`}
              />
            </Link>

            {/* Mobile: phone number as tap-to-call + hamburger */}
            <div className="flex items-center gap-2 lg:hidden">
              <a
                href="tel:0884997659"
                className="flex items-center gap-1.5 bg-accent/10 hover:bg-accent/20 text-accent border border-accent/30 rounded-lg px-3 h-10 font-bold text-sm transition-colors"
              >
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span>088 499 7659</span>
              </a>
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

            {/* Desktop nav — simplified, all items vertically centered at same height */}
            <nav className="hidden lg:flex items-center gap-3 xl:gap-4">
              {/* Services dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1 text-foreground hover:text-primary transition-colors font-medium h-11">
                  {t('nav.services')}
                  <ChevronDown className="w-4 h-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" sideOffset={8} className="w-64 z-[70]">
                  {serviceLinks.map((link) => (
                    <DropdownMenuItem key={link.routeKey} asChild>
                      <Link to={getPath(link.routeKey)} className="w-full cursor-pointer">
                        {link.label}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Contact link */}
              <Link
                to={getPath('contact')}
                className="flex items-center text-foreground hover:text-primary transition-colors font-medium h-11"
              >
                {t('nav.contact')}
              </Link>

              <div className="w-px h-6 bg-border mx-1" />

              {/* Phone button */}
              <Button
                asChild
                className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold h-11 px-5"
              >
                <a href="tel:0884997659" className="flex items-center gap-2">
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  <span>088 499 7659</span>
                </a>
              </Button>

              {/* Free Inspection button */}
              <Button
                asChild
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold h-11 px-5"
              >
                <Link to={getPath('inspection')}>
                  {t('nav.freeInspection')}
                </Link>
              </Button>

              {/* Language switcher */}
              <LanguageSwitcher />

              {/* Hamburger for full panel */}
              <button
                className="p-2 h-11 w-11 rounded-md hover:bg-muted transition-colors text-foreground flex items-center justify-center relative z-[120]"
                onClick={() => setIsFullMenuOpen(!isFullMenuOpen)}
                aria-label="Open full menu"
                type="button"
              >
                {isFullMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Mobile slide-up menu */}
      <MobileMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        isScrolled={isScrolled}
        serviceLinks={serviceLinks}
        scrollToSection={scrollToSection}
        t={t}
        getPath={getPath}
      />

      {/* Desktop slide-in panel */}
      <FullMenuPanel
        isOpen={isFullMenuOpen}
        onClose={() => setIsFullMenuOpen(false)}
        serviceLinks={serviceLinks}
        t={t}
        getPath={getPath}
        currentLang={currentLang}
      />
    </>
  );
};

export default Header;
