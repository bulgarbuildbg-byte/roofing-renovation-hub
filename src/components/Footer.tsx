import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useLocalizedPath } from "@/hooks/useLocalizedPath";
import logo from "@/assets/logo.png";
import type { RouteKey } from "@/i18n/routes";

const Footer = () => {
  const { t } = useTranslation();
  const { getPath } = useLocalizedPath();

  const serviceRoutes: { key: string; routeKey: RouteKey }[] = [
    { key: "roofRepair", routeKey: "roofRepair" },
    { key: "leakRepair", routeKey: "leakRepair" },
    { key: "waterproofing", routeKey: "waterproofing" },
    { key: "newRoof", routeKey: "newRoof" },
    { key: "tileReplacement", routeKey: "tileReplacement" },
    { key: "flatRoof", routeKey: "flatRoof" },
    { key: "metalRoof", routeKey: "metalRoof" },
    { key: "maintenance", routeKey: "maintenance" },
  ];

  const companyRoutes: { key: string; routeKey: RouteKey }[] = [
    { key: "about", routeKey: "about" },
    { key: "projects", routeKey: "projects" },
    { key: "reviews", routeKey: "reviews" },
    { key: "calculator", routeKey: "calculator" },
    { key: "blog", routeKey: "blog" },
    { key: "faq", routeKey: "faq" },
    { key: "contact", routeKey: "contact" },
  ];

  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <Link to={getPath('home')}>
              <img src={logo} alt="RemontNaPokriviVarna" className="h-24 w-auto mb-4 brightness-0 invert" />
            </Link>
            <p className="text-primary-foreground/80 mb-4">{t('footer.companyDesc')}</p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">{t('footer.servicesTitle')}</h4>
            <ul className="space-y-2">
              {serviceRoutes.map((s) => (
                <li key={s.routeKey}>
                  <Link to={getPath(s.routeKey)} className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                    {t(`nav.${s.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">{t('footer.companyTitle')}</h4>
            <ul className="space-y-2">
              {companyRoutes.map((c) => (
                <li key={c.routeKey}>
                  <Link to={getPath(c.routeKey)} className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                    {t(`nav.${c.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">{t('footer.contactTitle')}</h4>
            <ul className="space-y-3">
              <li>
                <a href="tel:+359884997659" className="flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  <Phone className="w-4 h-4" />
                  088 499 7659
                </a>
              </li>
              <li>
                <a href="mailto:remontnapokrivivarna@abv.bg" className="flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  <Mail className="w-4 h-4" />
                  remontnapokrivivarna@abv.bg
                </a>
              </li>
              <li className="flex items-start gap-2 text-primary-foreground/80">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                {t('contact.addressText')}
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-8 text-center space-y-3">
          <p className="text-primary-foreground/80">
            © {new Date().getFullYear()} {t('footer.copyright')}
          </p>
          <p className="text-primary-foreground/60 text-sm">
            {t('footer.parentCompany')}{" "}
            <a href="https://bulgarbuild.com/" className="text-primary-foreground/80 hover:text-primary-foreground underline">
              {t('footer.parentCompanyName')}
            </a>
            . {t('footer.companyInfo')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
