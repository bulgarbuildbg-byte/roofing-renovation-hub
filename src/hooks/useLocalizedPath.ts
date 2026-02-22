import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { type SupportedLanguage } from "@/i18n/config";
import { localizedSlugs, type RouteKey, getLocalizedPath } from "@/i18n/routes";

export function useLocalizedPath() {
  const { i18n } = useTranslation();
  const { lang } = useParams<{ lang: string }>();
  const currentLang = (lang || i18n.language || 'bg') as SupportedLanguage;

  const getPath = (routeKey: RouteKey): string => {
    return getLocalizedPath(routeKey, currentLang);
  };

  return { getPath, currentLang };
}
