import { Button } from "@/components/ui/button";
import { Phone, CheckCircle, Clock, Shield } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useLocalizedPath } from "@/hooks/useLocalizedPath";
import heroImage from "@/assets/hero-homepage.jpg";

const Hero = () => {
  const { t } = useTranslation();
  const { getPath } = useLocalizedPath();

  return (
    <section className="relative min-h-[85vh] md:min-h-screen flex items-center justify-center overflow-hidden pt-20 md:pt-24">
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Ремонт на покриви Варна"
          fetchPriority="high"
          decoding="sync"
          className="absolute inset-0 w-full h-full object-cover"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_20%,_rgba(15,23,42,0.55)_70%,_rgba(15,23,42,0.85)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/70 via-[#0f172a]/30 to-transparent" />
      </div>
      
      <div className="container mx-auto px-4 py-12 md:py-20 relative z-10">
        <div className="max-w-4xl">
          <div className="flex flex-wrap gap-2 md:gap-4 mb-6 md:mb-8">
            <span className="inline-flex items-center gap-1.5 bg-primary/70 backdrop-blur-sm text-white/90 px-3 py-1.5 rounded-full text-sm font-medium">
              <CheckCircle className="w-4 h-4 text-green-400" />
              {t('hero.badge1')}
            </span>
            <span className="inline-flex items-center gap-1.5 bg-primary/70 backdrop-blur-sm text-white/90 px-3 py-1.5 rounded-full text-sm font-medium">
              <Shield className="w-4 h-4 text-green-400" />
              {t('hero.badge2')}
            </span>
            <span className="inline-flex items-center gap-1.5 bg-primary/70 backdrop-blur-sm text-white/90 px-3 py-1.5 rounded-full text-sm font-medium">
              <Clock className="w-4 h-4 text-green-400" />
              {t('hero.badge3')}
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-4 md:mb-6 animate-fade-in leading-tight [text-shadow:_0_3px_16px_rgba(0,0,0,0.9),_0_1px_4px_rgba(0,0,0,0.8)]">
            {t('hero.title')}
          </h1>
          
          <p className="text-lg md:text-xl lg:text-2xl text-primary-foreground/90 mb-6 md:mb-8 animate-fade-in max-w-2xl [text-shadow:_0_2px_8px_rgba(0,0,0,0.6)]">
            {t('hero.subtitle')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 animate-fade-in">
            <Button 
              asChild
              size="lg" 
              className="w-full sm:w-auto h-14 md:h-16 bg-accent hover:bg-accent/90 text-accent-foreground text-base md:text-lg font-bold px-6 md:px-8 shadow-lg"
            >
              <Link to={getPath('inspection')}>
                {t('hero.ctaPrimary')}
              </Link>
            </Button>
            <Button 
              asChild
              size="lg" 
              variant="outline"
              className="w-full sm:w-auto h-14 md:h-16 bg-primary/40 backdrop-blur-sm border-2 border-white/80 text-primary-foreground hover:bg-primary-foreground hover:text-primary text-base md:text-lg font-bold px-6 md:px-8"
            >
              <a href="tel:0884997659" className="flex items-center justify-center gap-2">
                <Phone className="w-5 h-5" />
                {t('hero.ctaPhone')}
              </a>
            </Button>
          </div>
          
          <p className="mt-6 text-primary-foreground/80 text-sm md:text-base">
            {t('hero.urgency')}
          </p>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
};

export default Hero;
