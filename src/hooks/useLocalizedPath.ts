import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { type SupportedLanguage } from "@/i18n/config";
import { localizedSlugs, type RouteKey, getLocalizedPath, isCityScopedRoute } from "@/i18n/routes";
import { isCityKey, type CityKey, DEFAULT_CITY } from "@/i18n/cities";

export function useLocalizedPath() {
  const { i18n } = useTranslation();
  const { lang, "*": restPath } = useParams<{ lang: string; "*": string }>();
  const currentLang = (lang || i18n.language || "bg") as SupportedLanguage;

  // Detect active city from first segment of the path
  const firstSegment = (restPath || "").split("/")[0];
  const currentCity: CityKey | null = isCityKey(firstSegment) ? (firstSegment as CityKey) : null;

  const getPath = (routeKey: RouteKey): string => {
    // City-scoped routes ALWAYS carry a city prefix (default = varna).
    // If user is browsing within a city context, preserve that city.
    if (isCityScopedRoute(routeKey)) {
      const city = currentCity || DEFAULT_CITY;
      const slug = localizedSlugs[currentLang][routeKey];
      if (routeKey === "home") return `/${currentLang}/${city}`;
      return `/${currentLang}/${city}/${slug}`;
    }
    // Global routes (about, contact, blog, etc.) — never city-prefixed.
    return getLocalizedPath(routeKey, currentLang);
  };

  return { getPath, currentLang, currentCity };
}
