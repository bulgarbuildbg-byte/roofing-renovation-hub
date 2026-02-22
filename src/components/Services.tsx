import { Phone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLocalizedPath } from "@/hooks/useLocalizedPath";

import roofRepairImg from "@/assets/services/roof-repair.jpg";
import leakRepairImg from "@/assets/services/leak-repair.jpg";
import waterproofingImg from "@/assets/services/waterproofing.jpg";
import newRoofImg from "@/assets/services/new-roof.jpg";
import tileReplacementImg from "@/assets/services/tile-replacement.jpg";
import flatRoofImg from "@/assets/services/flat-roof.jpg";
import metalRoofImg from "@/assets/services/metal-roof.jpg";
import maintenanceImg from "@/assets/services/maintenance.jpg";
import type { RouteKey } from "@/i18n/routes";

const serviceKeys: { image: string; key: string; routeKey: RouteKey }[] = [
  { image: roofRepairImg, key: "roofRepair", routeKey: "roofRepair" },
  { image: leakRepairImg, key: "leakRepair", routeKey: "leakRepair" },
  { image: waterproofingImg, key: "waterproofing", routeKey: "waterproofing" },
  { image: newRoofImg, key: "newRoof", routeKey: "newRoof" },
  { image: tileReplacementImg, key: "tileReplacement", routeKey: "tileReplacement" },
  { image: flatRoofImg, key: "flatRoof", routeKey: "flatRoof" },
  { image: metalRoofImg, key: "metalRoof", routeKey: "metalRoof" },
  { image: maintenanceImg, key: "maintenance", routeKey: "maintenance" },
];

const Services = () => {
  const { t } = useTranslation();
  const { getPath } = useLocalizedPath();

  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="services" className="py-12 md:py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 md:mb-4">
            {t('services.title')}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('services.subtitle')}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {serviceKeys.map((service, index) => (
            <Card 
              key={index} 
              className="bg-background hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-border flex flex-col overflow-hidden"
            >
              <div className="relative h-40 md:h-44 overflow-hidden">
                <img
                  src={service.image}
                  alt={t(`services.${service.key}.title`)}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
              <CardContent className="p-4 md:p-6 flex flex-col flex-grow">
                <h3 className="text-lg md:text-xl font-bold text-foreground mb-2">
                  {t(`services.${service.key}.title`)}
                </h3>
                <p className="text-accent font-medium text-sm mb-3">
                  {t(`services.${service.key}.problem`)}
                </p>
                <ul className="text-muted-foreground text-sm mb-4 space-y-1">
                  {(t(`services.${service.key}.includes`) as string).split(',').slice(0, 3).map((item: string, i: number) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="text-foreground text-sm font-medium mb-4 mt-auto">
                  ✓ {t(`services.${service.key}.benefits`)}
                </p>
                <Link to={getPath(service.routeKey)} className="block">
                  <Button 
                    className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
                  >
                    {t('services.freeQuote')}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-10 md:mt-12 text-center bg-primary/5 rounded-2xl p-6 md:p-10">
          <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3">
            {t('services.notSure')}
          </h3>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            {t('services.notSureDesc')}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button 
              asChild
              size="lg"
              className="h-14 bg-accent hover:bg-accent/90 text-accent-foreground text-lg font-bold px-8"
            >
              <a href="tel:0884997659" className="flex items-center justify-center gap-2">
                <Phone className="w-5 h-5" />
                088 499 7659
              </a>
            </Button>
            <Button 
              onClick={scrollToContact}
              size="lg"
              variant="outline"
              className="h-14 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground text-lg font-bold px-8"
            >
              {t('services.requestInspection')}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
