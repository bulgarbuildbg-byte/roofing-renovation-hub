import { Phone } from "lucide-react";

const FloatingCallButton = () => {
  return (
    <a
      href="tel:0892701176"
      className="hidden md:flex fixed bottom-6 right-6 z-50 items-center gap-3 bg-accent hover:bg-accent/90 text-accent-foreground rounded-full px-6 py-4 shadow-2xl animate-pulse-soft hover:scale-105 transition-transform duration-300 group"
      aria-label="Обадете се на 089 270 1176"
    >
      <Phone className="w-6 h-6" />
      <span className="font-bold text-lg">089 270 1176</span>
    </a>
  );
};

export default FloatingCallButton;
