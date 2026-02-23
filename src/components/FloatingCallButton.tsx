import { Phone } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { useTranslation } from "react-i18next";

const FloatingCallButton = () => {
  const { t } = useTranslation();

  return (
    <a
      href="tel:0884997659"
      onClick={() => trackEvent("button_click", "call_button")}
      className="hidden lg:flex fixed bottom-6 right-6 z-50 items-center gap-3 bg-accent hover:bg-accent/90 text-accent-foreground rounded-full px-6 py-4 shadow-2xl animate-pulse-soft hover:scale-105 transition-transform duration-300 group"
      aria-label={t('mobile.call')}
    >
      <Phone className="w-6 h-6" />
      <span className="font-bold text-lg">088 499 7659</span>
    </a>
  );
};

export default FloatingCallButton;
