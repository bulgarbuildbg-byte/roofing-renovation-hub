import { Phone, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";
import { useTranslation } from "react-i18next";

const MobileBottomBar = () => {
  const { t } = useTranslation();

  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-background/95 backdrop-blur-md border-t border-border safe-area-bottom">
      <div className="flex gap-2 p-3">
        <Button asChild className="flex-1 h-14 bg-accent hover:bg-accent/90 text-accent-foreground text-base font-bold shadow-lg">
          <a href="tel:0884997659" onClick={() => trackEvent("button_click", "call_button")} className="flex items-center justify-center gap-2">
            <Phone className="w-5 h-5" />
            <span>{t('mobile.call')}</span>
          </a>
        </Button>
        <Button onClick={() => { trackEvent("button_click", "offer_button"); scrollToContact(); }} className="flex-1 h-14 bg-primary hover:bg-primary/90 text-primary-foreground text-base font-bold shadow-lg">
          <MessageSquare className="w-5 h-5" />
          <span>{t('mobile.freeInspection')}</span>
        </Button>
      </div>
    </div>
  );
};

export default MobileBottomBar;
