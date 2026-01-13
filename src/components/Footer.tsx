import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";
import logo from "@/assets/logo.png";

const Footer = () => {
  const serviceLinks = [
    { label: "Ремонт на покриви", href: "/ремонт-на-покриви" },
    { label: "Ремонт на течове", href: "/ремонт-течове" },
    { label: "Хидроизолация", href: "/хидроизолация" },
    { label: "Нов покрив", href: "/изграждане-на-покрив" },
    { label: "Смяна на керемиди", href: "/смяна-керемиди" },
    { label: "Плоски покриви", href: "/плоски-покриви" },
    { label: "Метални покриви", href: "/метални-покриви" },
    { label: "Поддръжка", href: "/поддръжка-на-покриви" },
  ];

  const companyLinks = [
    { label: "За нас", href: "/за-нас" },
    { label: "Проекти", href: "/проекти" },
    { label: "Отзиви", href: "/отзиви" },
    { label: "Калкулатор", href: "/калкулатор" },
    { label: "Блог", href: "/блог" },
    { label: "Въпроси", href: "/въпроси" },
    { label: "Контакти", href: "/контакти" },
  ];

  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <Link to="/">
              <img src={logo} alt="RemontNaPokriviVarna - Ремонт на покриви Варна" className="h-24 w-auto mb-4 brightness-0 invert" />
            </Link>
            <p className="text-primary-foreground/80 mb-4">
              Професионални покривни услуги във Варна и региона. Над 15 години опит.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">Услуги</h4>
            <ul className="space-y-2">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    to={link.href} 
                    className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold mb-4">Компания</h4>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    to={link.href} 
                    className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Контакти</h4>
            <ul className="space-y-3">
              <li>
                <a 
                  href="tel:+359884997659" 
                  className="flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  088 499 7659
                </a>
              </li>
              <li>
                <a 
                  href="mailto:remontnapokrivivarna@abv.bg" 
                  className="flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  remontnapokrivivarna@abv.bg
                </a>
              </li>
              <li className="flex items-start gap-2 text-primary-foreground/80">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                ул. Уста Колю Фичето 25 А, Варна
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-8 text-center">
          <p className="text-primary-foreground/80">
            © {new Date().getFullYear()} RemontNaPokriviVarna. Всички права запазени.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
