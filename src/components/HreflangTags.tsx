import { Helmet } from "react-helmet";
import { useParams, useLocation } from "react-router-dom";
import { SUPPORTED_LANGUAGES, LANGUAGE_HTML_LANG, type SupportedLanguage } from "@/i18n/config";
import { localizedSlugs, findRouteKeyBySlug } from "@/i18n/routes";

const BASE_URL = "https://www.remontnapokrivivarna.bg";

const HreflangTags = () => {
  const { lang, '*': restPath } = useParams<{ lang: string; '*': string }>();
  const location = useLocation();
  const currentLang = (lang || 'bg') as SupportedLanguage;

  // Determine current route key from the path
  const slug = restPath || '';
  const routeKey = findRouteKeyBySlug(slug, currentLang);

  // Build alternate URLs for each language
  const alternates = SUPPORTED_LANGUAGES.map((l) => {
    let path = `/${l}`;
    if (routeKey && routeKey !== 'home') {
      const localSlug = localizedSlugs[l][routeKey];
      path = `/${l}/${localSlug}`;
    }
    return { lang: LANGUAGE_HTML_LANG[l], href: `${BASE_URL}${path}` };
  });

  const currentUrl = `${BASE_URL}${location.pathname}`;

  return (
    <Helmet>
      <link rel="canonical" href={currentUrl} />
      {alternates.map((alt) => (
        <link key={alt.lang} rel="alternate" hrefLang={alt.lang} href={alt.href} />
      ))}
      <link rel="alternate" hrefLang="x-default" href={`${BASE_URL}/bg`} />
    </Helmet>
  );
};

export default HreflangTags;
