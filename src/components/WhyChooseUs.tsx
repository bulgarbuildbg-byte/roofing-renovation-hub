import { Users, Hammer, Wallet, Clock, FileText, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

const icons = [Users, Hammer, Wallet, Clock, FileText, MapPin];

const WhyChooseUs = () => {
  const { t } = useTranslation();

  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="py-12 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 md:mb-4">
            {t('whyChooseUs.title')}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('whyChooseUs.subtitle')}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto">
          {[1, 2, 3, 4, 5, 6].map((num, index) => {
            const Icon = icons[index];
            return (
              <div 
                key={num} 
                className="flex items-start gap-3 md:gap-4 p-4 md:p-6 rounded-xl bg-secondary hover:bg-secondary/80 transition-colors"
              >
                <div className="w-11 h-11 md:w-12 md:h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-1 text-base md:text-lg">{t(`whyChooseUs.reason${num}.title`)}</h3>
                  <p className="text-muted-foreground text-sm">{t(`whyChooseUs.reason${num}.desc`)}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-10 md:mt-12 text-center">
          <Button 
            onClick={scrollToContact}
            size="lg"
            className="h-14 bg-accent hover:bg-accent/90 text-accent-foreground text-lg font-bold px-8"
          >
            <Phone className="w-5 h-5 mr-2" />
            {t('whyChooseUs.cta')}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
