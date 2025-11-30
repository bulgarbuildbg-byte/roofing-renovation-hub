import { Phone } from "lucide-react";

const FloatingCallButton = () => {
  return (
    <a
      href="tel:0892701176"
      className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-accent hover:bg-accent/90 text-accent-foreground rounded-full flex items-center justify-center shadow-lg animate-pulse-soft hover:scale-110 transition-transform duration-300"
      aria-label="Обадете се"
    >
      <Phone className="w-7 h-7" />
    </a>
  );
};

export default FloatingCallButton;
