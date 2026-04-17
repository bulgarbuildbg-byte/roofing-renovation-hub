import { Helmet } from "react-helmet";
import { useParams, useLocation } from "react-router-dom";
import { SUPPORTED_LANGUAGES, LANGUAGE_HTML_LANG, type SupportedLanguage } from "@/i18n/config";
import { localizedSlugs, findRouteKeyBySlug, isCityScopedRoute } from "@/i18n/routes";
import { isCityKey, DEFAULT_CITY } from "@/i18n/cities";

const BASE_URL = "https://www.remontnapokrivivarna.bg";

const HreflangTags = () => {
  const { lang, '*': restPath } = useParams<{ lang: string; '*': string }>();
  const location = useLocation();
  const currentLang = (lang || 'bg') as SupportedLanguage;

  const slug = restPath || '';
  const firstSegment = slug.split('/')[0];
  const isCityPage = isCityKey(firstSegment);

  let alternates: { lang: string; href: string }[];
  let canonicalPath: string = location.pathname;

  if (isCityPage) {
    // City-scoped pages: /:lang/:city/[:slug]
    // For each language, translate the service slug while keeping the city slug.
    const city = firstSegment;
    const subPath = slug.split('/').slice(1).join('/');
    const routeKey = subPath ? findRouteKeyBySlug(subPath, currentLang) : 'home';

    alternates = SUPPORTED_LANGUAGES.map((l) => {
      let path = `/${l}/${city}`;
      if (routeKey && routeKey !== 'home') {
        const localSlug = localizedSlugs[l][routeKey];
        path = `/${l}/${city}/${localSlug}`;
      }
      return { lang: LANGUAGE_HTML_LANG[l], href: `${BASE_URL}${path}` };
    });
    // Canonical = current URL (already in /:lang/:city/ form)
    canonicalPath = location.pathname.replace(/\/$/, '') || `/${currentLang}/${city}`;
  } else {
    // Non-city URL — could be a global page OR a legacy city-scoped slug being redirected.
    const routeKey = findRouteKeyBySlug(slug, currentLang);

    if (routeKey && isCityScopedRoute(routeKey)) {
      // City-scoped route accessed without city prefix → canonical points to /varna/
      alternates = SUPPORTED_LANGUAGES.map((l) => {
        let path = `/${l}/${DEFAULT_CITY}`;
        if (routeKey !== 'home') {
          const localSlug = localizedSlugs[l][routeKey];
          path = `/${l}/${DEFAULT_CITY}/${localSlug}`;
        }
        return { lang: LANGUAGE_HTML_LANG[l], href: `${BASE_URL}${path}` };
      });
      canonicalPath = routeKey === 'home'
        ? `/${currentLang}/${DEFAULT_CITY}`
        : `/${currentLang}/${DEFAULT_CITY}/${localizedSlugs[currentLang][routeKey]}`;
    } else {
      // Truly global page (about, blog, contact, calculator, ...)
      alternates = SUPPORTED_LANGUAGES.map((l) => {
        let path = `/${l}`;
        if (routeKey && routeKey !== 'home') {
          const localSlug = localizedSlugs[l][routeKey];
          path = `/${l}/${localSlug}`;
        }
        return { lang: LANGUAGE_HTML_LANG[l], href: `${BASE_URL}${path}` };
      });
    }
  }

  const currentUrl = `${BASE_URL}${canonicalPath}`;
  const ogUrl = currentUrl;

  return (
    <Helmet>
      <link rel="canonical" href={currentUrl} />
      <meta property="og:url" content={ogUrl} />
      <meta property="og:locale" content={LANGUAGE_HTML_LANG[currentLang].replace('-', '_')} />
      {alternates.map((alt) => (
        <link key={alt.lang} rel="alternate" hrefLang={alt.lang} href={alt.href} />
      ))}
      <link rel="alternate" hrefLang="x-default" href={`${BASE_URL}/`} />
    </Helmet>
  );
};

export default HreflangTags;
