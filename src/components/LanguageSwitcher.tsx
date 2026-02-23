import { useTranslation } from "react-i18next";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { SUPPORTED_LANGUAGES, LANGUAGE_NAMES, LANGUAGE_FLAGS, type SupportedLanguage } from "@/i18n/config";
import { localizedSlugs, findRouteKeyBySlug } from "@/i18n/routes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe } from "lucide-react";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const { lang, '*': restPath } = useParams<{ lang: string; '*': string }>();
  const navigate = useNavigate();
  const currentLang = (lang || i18n.language || 'bg') as SupportedLanguage;

  const switchLanguage = (newLang: SupportedLanguage) => {
    if (newLang === currentLang) return;

    // Find the current route key so we can map to the equivalent slug in the new language
    const slug = restPath || '';
    const routeKey = findRouteKeyBySlug(slug, currentLang);

    let newPath = `/${newLang}`;
    if (routeKey && routeKey !== 'home') {
      const newSlug = localizedSlugs[newLang][routeKey];
      newPath = `/${newLang}/${newSlug}`;
    }

    i18n.changeLanguage(newLang);
    document.cookie = `i18next=${newLang};path=/;max-age=31536000;SameSite=Lax`;
    navigate(newPath);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-1.5 text-foreground hover:text-primary transition-colors font-medium px-2 py-1 rounded-md hover:bg-muted">
        <Globe className="w-4 h-4" />
        <span className="text-sm">{LANGUAGE_FLAGS[currentLang]} {currentLang.toUpperCase()}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" sideOffset={8} className="w-48 z-[130]">
        {SUPPORTED_LANGUAGES.map((l) => (
          <DropdownMenuItem
            key={l}
            onClick={() => switchLanguage(l)}
            className={`cursor-pointer ${l === currentLang ? 'bg-muted font-bold' : ''}`}
          >
            <span className="mr-2">{LANGUAGE_FLAGS[l]}</span>
            {LANGUAGE_NAMES[l]}
            <span className="ml-auto text-xs text-muted-foreground">{l.toUpperCase()}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
