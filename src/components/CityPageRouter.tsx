import { useParams, Navigate } from "react-router-dom";
import { isCityKey, SERVICE_PAGE_CITIES, type CityKey } from "@/i18n/cities";
import { findRouteKeyBySlug, localizedSlugs } from "@/i18n/routes";
import { SUPPORTED_LANGUAGES, type SupportedLanguage } from "@/i18n/config";
import { CITY_SERVICES } from "@/data/cityServices";
import BurgasHome from "@/pages/cities/BurgasHome";
import VarnaHome from "@/pages/cities/VarnaHome";
import RuseHome from "@/pages/cities/RuseHome";
import DobrichHome from "@/pages/cities/DobrichHome";
import SofiaHome from "@/pages/cities/SofiaHome";
import PlovdivHome from "@/pages/cities/PlovdivHome";
import CityServiceTemplate from "@/components/city/CityServiceTemplate";
import NotFound from "@/pages/NotFound";

/**
 * Routes city-scoped pages: /:lang/:city/*
 *
 * Resolves the service slug in the active language. If a slug from a
 * different language is requested (e.g. BG slug under /en/), 301-redirect
 * to the correct localized slug for the current language — fixes soft 404s.
 */
const CityPageRouter = () => {
  const { lang, "*": restPath } = useParams<{ lang: string; "*": string }>();
  const currentLang: SupportedLanguage = (
    SUPPORTED_LANGUAGES.includes(lang as SupportedLanguage) ? lang : "bg"
  ) as SupportedLanguage;

  const segments = (restPath || "").split("/").filter(Boolean);
  const city = segments[0];
  const subPath = segments.slice(1).join("/");

  if (!isCityKey(city)) {
    return <NotFound />;
  }

  // Home page (no sub-path)
  if (!subPath) {
    if (city === "burgas") return <BurgasHome />;
    if (city === "varna") return <VarnaHome />;
    if (city === "ruse") return <RuseHome />;
    if (city === "dobrich") return <DobrichHome />;
    if (city === "sofia") return <SofiaHome />;
    if (city === "plovdiv") return <PlovdivHome />;
  }

  // Cities without dedicated service sub-pages: send any sub-path to the city home
  if (!SERVICE_PAGE_CITIES.includes(city as CityKey)) {
    return <Navigate to={`/${currentLang}/${city}`} replace />;
  }

  // Service sub-page: try the current language first
  const routeKey = findRouteKeyBySlug(subPath, currentLang);
  if (routeKey) {
    const service = CITY_SERVICES[routeKey];
    if (service) {
      return <CityServiceTemplate service={service} />;
    }
  }

  // Cross-language slug: e.g. /en/varna/hidroizolacia-na-pokriv (BG slug under EN).
  // Resolve through any other language, then 301 to the current-language slug.
  for (const otherLang of SUPPORTED_LANGUAGES) {
    if (otherLang === currentLang) continue;
    const altKey = findRouteKeyBySlug(subPath, otherLang);
    if (altKey && CITY_SERVICES[altKey]) {
      const correctSlug = localizedSlugs[currentLang][altKey];
      return <Navigate to={`/${currentLang}/${city}/${correctSlug}`} replace />;
    }
  }

  return <NotFound />;
};

export default CityPageRouter;
