import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { useLocalizedPath } from "@/hooks/useLocalizedPath";

const About = () => {
  const { t } = useTranslation();
  const { getPath } = useLocalizedPath();
  const features = (t('about.features') as string).split(',');

  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              {t('about.title')}
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              {t('about.desc1')}
            </p>
            <p className="text-lg text-muted-foreground mb-8">
              {t('about.desc2')}
            </p>
            <div className="space-y-3">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-accent flex-shrink-0" />
                  <span className="text-foreground">{feature}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-4 mt-8">
              <Link to={getPath('about')}>
                <Button variant="outline">{t('about.learnMore')}</Button>
              </Link>
              <Link to={getPath('projects')}>
                <Button variant="ghost" className="text-primary">{t('about.seeProjects')}</Button>
              </Link>
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-primary/5 rounded-2xl p-8 border-2 border-primary/20">
              <div className="space-y-6">
                <div className="text-center p-6 bg-card rounded-xl border border-border">
                  <div className="text-5xl font-bold text-primary mb-2">500+</div>
                  <div className="text-muted-foreground">{t('about.completedProjects')}</div>
                </div>
                <div className="text-center p-6 bg-card rounded-xl border border-border">
                  <div className="text-5xl font-bold text-primary mb-2">15+</div>
                  <div className="text-muted-foreground">{t('about.yearsExperience')}</div>
                </div>
                <div className="text-center p-6 bg-card rounded-xl border border-border">
                  <div className="text-5xl font-bold text-primary mb-2">100%</div>
                  <div className="text-muted-foreground">{t('about.satisfaction')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
