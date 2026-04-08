import { useTranslation } from "react-i18next";
import { Search, ClipboardCheck, Hammer, Shield } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLocalizedPath } from "@/hooks/useLocalizedPath";
import { Link } from "react-router-dom";

const HowWeWork = () => {
  const { t } = useTranslation();
  const { getPath } = useLocalizedPath();

  const steps = [
    { id: 1, icon: Search, titleKey: "howWeWork.step1Title", textKey: "howWeWork.step1Text" },
    { id: 2, icon: ClipboardCheck, titleKey: "howWeWork.step2Title", textKey: "howWeWork.step2Text" },
    { id: 3, icon: Hammer, titleKey: "howWeWork.step3Title", textKey: "howWeWork.step3Text" },
    { id: 4, icon: Shield, titleKey: "howWeWork.step4Title", textKey: "howWeWork.step4Text" },
  ];

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t("howWeWork.sectionTitle")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("howWeWork.sectionSubtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <Card key={step.id} className="relative overflow-hidden hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center flex flex-col items-center gap-4">
                  <div className="absolute top-3 left-3 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                    {step.id}
                  </div>
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mt-4">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">
                    {t(step.titleKey)}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {t(step.textKey)}
                  </p>
                  <Button asChild variant="outline" size="sm" className="mt-auto">
                    <Link to={getPath("howWeWork")}>
                      {t("howWeWork.learnMore")}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowWeWork;
