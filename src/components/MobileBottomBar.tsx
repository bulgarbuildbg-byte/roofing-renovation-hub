import { Phone, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import LanguageSwitcher from "./LanguageSwitcher";

const MobileBottomBar = () => {
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-background/95 backdrop-blur-md border-t border-border safe-area-bottom">
      <div className="flex gap-1.5 px-2 py-2 items-center">
        {!isScrolled && (
          <div className="flex-shrink-0">
            <LanguageSwitcher />
          </div>
        )}
        <Button
          asChild
          className="flex-1 h-12 bg-accent hover:bg-accent/90 text-accent-foreground font-bold shadow-lg text-[13px] px-2"
        >
          <a
            href="tel:0884997659"
            onClick={() => trackEvent("button_click", "call_button")}
            className="flex items-center justify-center gap-1"
          >
            <Phone className="w-4 h-4 flex-shrink-0" />
            <span className="whitespace-nowrap">{t('mobile.call')}</span>
          </a>
        </Button>
        <Button
          onClick={() => { trackEvent("button_click", "offer_button"); scrollToContact(); }}
          className="flex-1 h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-lg text-[13px] px-2"
        >
          <MessageSquare className="w-4 h-4 flex-shrink-0" />
          <span className="whitespace-nowrap">{t('mobile.freeInspection')}</span>
        </Button>
      </div>
    </div>
  );
};

export default MobileBottomBar;
