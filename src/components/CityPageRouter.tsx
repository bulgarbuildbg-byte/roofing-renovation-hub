import { useParams } from "react-router-dom";
import { isCityKey } from "@/i18n/cities";
import { findRouteKeyBySlug } from "@/i18n/routes";
import { CITY_SERVICES } from "@/data/cityServices";
import BurgasHome from "@/pages/cities/BurgasHome";
import VarnaHome from "@/pages/cities/VarnaHome";
import RuseHome from "@/pages/cities/RuseHome";
import CityServiceTemplate from "@/components/city/CityServiceTemplate";
import NotFound from "@/pages/NotFound";

/**
 * Routes city-scoped pages: /:lang/:city/*
 *
 * Stage 2: Dispatches city home pages and city service pages via CityServiceTemplate.
 *  - /:lang/:city           → city home page
 *  - /:lang/:city/:service  → CityServiceTemplate with service config
 */
const CityPageRouter = () => {
  const { "*": restPath } = useParams<{ "*": string }>();
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
  }

  // Service sub-page: resolve slug → routeKey → service config
  const routeKey = findRouteKeyBySlug(subPath, "bg");
  if (routeKey) {
    const service = CITY_SERVICES[routeKey];
    if (service) {
      return <CityServiceTemplate service={service} />;
    }
  }

  return <NotFound />;
};

export default CityPageRouter;
