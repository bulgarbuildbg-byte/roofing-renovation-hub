import { Award, ShieldCheck, FileCheck, Search, CheckCircle, MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";

const icons = [Award, CheckCircle, ShieldCheck, FileCheck, Search, MapPin];
const keys = ["experience", "projects", "warranty", "licensed", "freeInspection", "area"];

const TrustIndicators = () => {
  const { t } = useTranslation();

  return (
    <section className="bg-primary py-4 md:py-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-6">
          {keys.map((key, index) => {
            const Icon = icons[index];
            return (
              <div 
                key={key} 
                className="flex items-center gap-2 md:gap-3 justify-center text-primary-foreground bg-primary-foreground/5 rounded-lg py-3 px-2 md:py-4 md:px-3 hover:bg-primary-foreground/10 transition-colors"
              >
                <Icon className="w-5 h-5 md:w-6 md:h-6 text-accent flex-shrink-0" />
                <span className="text-xs md:text-sm font-semibold">{t(`trust.${key}`)}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrustIndicators;
