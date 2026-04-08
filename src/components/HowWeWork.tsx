import { useTranslation } from "react-i18next";
import { ClipboardCheck, FileText, Hammer, Award, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLocalizedPath } from "@/hooks/useLocalizedPath";
import { Link } from "react-router-dom";

const HowWeWork = () => {
  const { t } = useTranslation();
  const { getPath } = useLocalizedPath();

  const steps = [
    {
      id: 1, icon: ClipboardCheck,
      titleKey: "howWeWork.step1Title",
      textKey: "howWeWork.step1Text",
      benefits: ["howWeWork.step1Benefit1", "howWeWork.step1Benefit2", "howWeWork.step1Benefit3"],
    },
    {
      id: 2, icon: FileText,
      titleKey: "howWeWork.step2Title",
      textKey: "howWeWork.step2Text",
      benefits: ["howWeWork.step2Benefit1", "howWeWork.step2Benefit2", "howWeWork.step2Benefit3"],
    },
    {
      id: 3, icon: Hammer,
      titleKey: "howWeWork.step3Title",
      textKey: "howWeWork.step3Text",
      benefits: ["howWeWork.step3Benefit1", "howWeWork.step3Benefit2", "howWeWork.step3Benefit3"],
    },
    {
      id: 4, icon: Award,
      titleKey: "howWeWork.step4Title",
      textKey: "howWeWork.step4Text",
      benefits: ["howWeWork.step4Benefit1", "howWeWork.step4Benefit2", "howWeWork.step4Benefit3"],
    },
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
              <Card key={step.id} className="relative overflow-hidden hover:shadow-lg transition-shadow border-t-4 border-primary">
                <CardContent className="p-6 text-center flex flex-col items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-primary/80 text-primary-foreground flex items-center justify-center text-2xl font-bold shadow-lg">
                    {step.id}
                  </div>
                  <div className="w-20 h-20 rounded-full bg-primary/15 flex items-center justify-center">
                    <Icon className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">
                    {t(step.titleKey)}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {t(step.textKey)}
                  </p>
                  <div className="space-y-1.5 w-full text-left">
                    {step.benefits.map((bKey, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                        <span className="text-sm text-foreground font-medium">{t(bKey)}</span>
                      </div>
                    ))}
                  </div>
                  <Button asChild size="sm" className="mt-auto">
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
