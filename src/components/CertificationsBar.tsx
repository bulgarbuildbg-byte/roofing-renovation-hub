import { Building2, ShieldCheck, ExternalLink } from "lucide-react";
import { useTranslation } from "react-i18next";

const CertificationsBar = () => {
  const { t } = useTranslation();

  return (
    <section className="bg-accent/10 border-y border-accent/20 py-4">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-6">
          {/* Part of Bulgaria Build */}
          <a
            href="https://bulgarbuild.com/"
            target="_blank"
            rel="noopener"
            className="flex items-center gap-3 justify-center rounded-lg py-3 px-4 hover:bg-accent/10 transition-colors group"
          >
            <Building2 className="w-6 h-6 text-accent flex-shrink-0" />
            <span className="text-sm font-semibold text-foreground">
              {t('certifications.partOf')}
            </span>
            <ExternalLink className="w-3.5 h-3.5 text-muted-foreground group-hover:text-accent transition-colors flex-shrink-0" />
          </a>

          {/* Member of KSB */}
          <div className="flex items-center gap-3 justify-center rounded-lg py-3 px-4">
            <ShieldCheck className="w-6 h-6 text-accent flex-shrink-0" />
            <span className="text-sm font-semibold text-foreground">
              {t('certifications.ksbMember')}
            </span>
          </div>

          {/* Certified Company */}
          <div className="flex items-center gap-3 justify-center rounded-lg py-3 px-4">
            <ShieldCheck className="w-6 h-6 text-accent flex-shrink-0" />
            <span className="text-sm font-semibold text-foreground">
              {t('certifications.certified')}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CertificationsBar;
