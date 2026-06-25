import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { useLocalizedPath } from "@/hooks/useLocalizedPath";

const NotFound = () => {
  const location = useLocation();
  const { getPath } = useLocalizedPath();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  const title = `404 — ${t('notFound.title')}`;

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <Helmet>
        <html lang={i18n.language} />
        <title>{title}</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="prerender-status-code" content="404" />
        <meta property="og:title" content={title} />
        <meta name="description" content={t('notFound.desc')} />
      </Helmet>
      <div className="text-center px-4">
        <h1 className="mb-4 text-6xl font-bold text-foreground">404</h1>
        <p className="mb-2 text-2xl font-semibold text-foreground">{t('notFound.title')}</p>
        <p className="mb-6 text-muted-foreground max-w-md mx-auto">{t('notFound.desc')}</p>
        <a href={getPath('home')} className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
          {t('notFound.back')}
        </a>
      </div>
    </div>
  );
};

export default NotFound;
