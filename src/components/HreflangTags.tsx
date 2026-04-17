import { Helmet } from "react-helmet";
import { useParams, useLocation } from "react-router-dom";
import { SUPPORTED_LANGUAGES, LANGUAGE_HTML_LANG, type SupportedLanguage } from "@/i18n/config";
import { localizedSlugs, findRouteKeyBySlug } from "@/i18n/routes";
import { isCityKey } from "@/i18n/cities";

const BASE_URL = "https://www.remontnapokrivivarna.bg";

const HreflangTags = () => {
  const { lang, '*': restPath } = useParams<{ lang: string; '*': string }>();
  const location = useLocation();
  const currentLang = (lang || 'bg') as SupportedLanguage;

  const slug = restPath || '';
  const firstSegment = slug.split('/')[0];
  const isCityPage = isCityKey(firstSegment);

  let alternates: { lang: string; href: string }[];

  if (isCityPage) {
    // City pages: same URL for all language alternates (city slug stays the same)
    alternates = SUPPORTED_LANGUAGES.map((l) => ({
      lang: LANGUAGE_HTML_LANG[l],
      href: `${BASE_URL}/${l}/${slug}`,
    }));
  } else {
    // Regular pages: map by route key
    const routeKey = findRouteKeyBySlug(slug, currentLang);
    alternates = SUPPORTED_LANGUAGES.map((l) => {
      let path = `/${l}`;
      if (routeKey && routeKey !== 'home') {
        const localSlug = localizedSlugs[l][routeKey];
        path = `/${l}/${localSlug}`;
      }
      return { lang: LANGUAGE_HTML_LANG[l], href: `${BASE_URL}${path}` };
    });
  }

  const currentUrl = `${BASE_URL}${location.pathname}`;
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
