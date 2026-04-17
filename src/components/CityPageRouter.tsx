import { useParams } from "react-router-dom";
import { isCityKey } from "@/i18n/cities";
import { findRouteKeyBySlug } from "@/i18n/routes";
import { SUPPORTED_LANGUAGES, type SupportedLanguage } from "@/i18n/config";
import { CITY_SERVICES } from "@/data/cityServices";
import BurgasHome from "@/pages/cities/BurgasHome";
import VarnaHome from "@/pages/cities/VarnaHome";
import RuseHome from "@/pages/cities/RuseHome";
import DobrichHome from "@/pages/cities/DobrichHome";
import CityServiceTemplate from "@/components/city/CityServiceTemplate";
import NotFound from "@/pages/NotFound";

/**
 * Routes city-scoped pages: /:lang/:city/*
 *
 * Works across all supported languages — resolves the service slug
 * in the active language, then renders the BG service template.
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
  }

  // Service sub-page: resolve slug → routeKey using the ACTIVE language
  const routeKey = findRouteKeyBySlug(subPath, currentLang);
  if (routeKey) {
    const service = CITY_SERVICES[routeKey];
    if (service) {
      return <CityServiceTemplate service={service} />;
    }
  }

  return <NotFound />;
};

export default CityPageRouter;
