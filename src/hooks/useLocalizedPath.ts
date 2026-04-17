import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { type SupportedLanguage } from "@/i18n/config";
import { localizedSlugs, type RouteKey, getLocalizedPath } from "@/i18n/routes";
import { isCityKey, type CityKey } from "@/i18n/cities";
import { CITY_SERVICES } from "@/data/cityServices";

export function useLocalizedPath() {
  const { i18n } = useTranslation();
  const { lang, "*": restPath } = useParams<{ lang: string; "*": string }>();
  const currentLang = (lang || i18n.language || "bg") as SupportedLanguage;

  // Detect active city from first segment of the path
  const firstSegment = (restPath || "").split("/")[0];
  const currentCity: CityKey | null = isCityKey(firstSegment) ? (firstSegment as CityKey) : null;

  const getPath = (routeKey: RouteKey): string => {
    // Inside a city context, prefer city-scoped URL when a service template exists for the route.
    // Non-service routes (contact, calculator, blog, etc.) fall back to legacy paths.
    if (currentCity && currentLang === "bg" && CITY_SERVICES[routeKey]) {
      const slug = localizedSlugs.bg[routeKey];
      return `/bg/${currentCity}/${slug}`;
    }
    return getLocalizedPath(routeKey, currentLang);
  };

  return { getPath, currentLang, currentCity };
}
