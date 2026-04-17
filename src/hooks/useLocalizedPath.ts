import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { type SupportedLanguage } from "@/i18n/config";
import { localizedSlugs, type RouteKey, getLocalizedPath } from "@/i18n/routes";
import { isCityKey, type CityKey } from "@/i18n/cities";

export function useLocalizedPath() {
  const { i18n } = useTranslation();
  const { lang, "*": restPath } = useParams<{ lang: string; "*": string }>();
  const currentLang = (lang || i18n.language || 'bg') as SupportedLanguage;

  // Detect active city from first segment of the path
  const firstSegment = (restPath || "").split("/")[0];
  const currentCity: CityKey | null = isCityKey(firstSegment) ? (firstSegment as CityKey) : null;

  const getPath = (routeKey: RouteKey): string => {
    // Stage 1: City service pages don't exist yet — always use legacy paths.
    // Stage 2 will add: if (currentCity) return `/${currentLang}/${currentCity}/${slug}`;
    return getLocalizedPath(routeKey, currentLang);
  };

  return { getPath, currentLang, currentCity };
}
