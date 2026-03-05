import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useLocalizedPath } from "@/hooks/useLocalizedPath";
import logo from "@/assets/logo.png";
import type { RouteKey } from "@/i18n/routes";

const serviceAreas = [
  "Варна", "Акsakovo", "Аспарухово", "Виница", "Галата",
  "Владиславово", "Кайсиева градина", "Левски", "Трошево",
  "Чайка", "Младост", "Долен Чифлик", "Провадия",
];

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
    <footer className="bg-primary text-primary-foreground">
      {/* Local SEO service areas strip */}
      <div className="border-b border-primary-foreground/10 py-4">
        <div className="container mx-auto px-4">
          <p className="text-primary-foreground/50 text-xs uppercase tracking-widest mb-2 font-semibold">
            Обслужваме — Покривни услуги в:
          </p>
          <div className="flex flex-wrap gap-x-3 gap-y-1">
            {serviceAreas.map((area) => (
              <span key={area} className="text-primary-foreground/70 text-sm hover:text-primary-foreground transition-colors">
                {area}
              </span>
            ))}
            <span className="text-primary-foreground/40 text-sm">и региона до 50 км</span>
          </div>
        </div>
      </div>

      {/* Main footer grid */}
      <div className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div>
              <Link to={getPath('home')}>
                <img src={logo} alt="RemontNaPokriviVarna — Ремонт на покриви Варна" className="h-24 w-auto mb-4 brightness-0 invert" />
              </Link>
              <p className="text-primary-foreground/80 mb-4 text-sm leading-relaxed">{t('footer.companyDesc')}</p>
              <div className="flex items-center gap-2 text-primary-foreground/60 text-xs">
                <Clock className="w-3 h-3 flex-shrink-0" />
                <span>Пон–Съб: 08:00–18:00 · Аварии 24/7</span>
              </div>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-semibold mb-4 text-sm uppercase tracking-wide">{t('footer.servicesTitle')}</h4>
              <ul className="space-y-2">
                {serviceRoutes.map((s) => (
                  <li key={s.routeKey}>
                    <Link
                      to={getPath(s.routeKey)}
                      className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm"
                    >
                      {t(`nav.${s.key}`)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-semibold mb-4 text-sm uppercase tracking-wide">{t('footer.companyTitle')}</h4>
              <ul className="space-y-2">
                {companyRoutes.map((c) => (
                  <li key={c.routeKey}>
                    <Link
                      to={getPath(c.routeKey)}
                      className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm"
                    >
                      {t(`nav.${c.key}`)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold mb-4 text-sm uppercase tracking-wide">{t('footer.contactTitle')}</h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="tel:+359884997659"
                    className="flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm"
                  >
                    <Phone className="w-4 h-4 flex-shrink-0" />
                    <span>+359 88 499 7659</span>
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:remontnapokrivivarna@abv.bg"
                    className="flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm"
                  >
                    <Mail className="w-4 h-4 flex-shrink-0" />
                    <span className="break-all">remontnapokrivivarna@abv.bg</span>
                  </a>
                </li>
                <li className="flex items-start gap-2 text-primary-foreground/80 text-sm">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <address className="not-italic leading-relaxed">
                    {t('contact.addressText')}
                  </address>
                </li>
              </ul>

              {/* Trust signals */}
              <div className="mt-5 pt-5 border-t border-primary-foreground/15 space-y-1">
                <p className="text-primary-foreground/60 text-xs">✓ Лицензирана компания</p>
                <p className="text-primary-foreground/60 text-xs">✓ Писмена гаранция до 10 год.</p>
                <p className="text-primary-foreground/60 text-xs">✓ Безплатен оглед 24ч</p>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-primary-foreground/20 pt-8 space-y-3">
            <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-sm">
              <p className="text-primary-foreground/80">
                © {new Date().getFullYear()} {t('footer.copyright')}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-primary-foreground/50 text-xs">
                <Link to={getPath('faq')} className="hover:text-primary-foreground/80 transition-colors">ЧЗВ</Link>
                <Link to={getPath('contact')} className="hover:text-primary-foreground/80 transition-colors">Контакти</Link>
                <Link to={getPath('reviews')} className="hover:text-primary-foreground/80 transition-colors">Отзиви</Link>
              </div>
            </div>
            <p className="text-primary-foreground/50 text-xs text-center">
              {t('footer.parentCompany')}{" "}
              <a
                href="https://bulgarbuild.com/"
                className="text-primary-foreground/70 hover:text-primary-foreground underline transition-colors"
                rel="noopener"
              >
                {t('footer.parentCompanyName')}
              </a>
              . {t('footer.companyInfo')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
