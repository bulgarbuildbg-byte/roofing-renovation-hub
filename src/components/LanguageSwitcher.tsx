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
      <DropdownMenuTrigger className="flex items-center gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90 transition-all font-semibold px-3 py-2 rounded-full shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 min-h-0 min-w-0 h-auto">
        <Globe className="w-4 h-4" />
        <span className="text-sm tracking-wide">{LANGUAGE_FLAGS[currentLang]} {currentLang.toUpperCase()}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" sideOffset={8} className="w-52 z-[130] rounded-xl shadow-xl border border-border/50 backdrop-blur-sm p-1.5">
        {SUPPORTED_LANGUAGES.map((l) => (
          <DropdownMenuItem
            key={l}
            onClick={() => switchLanguage(l)}
            className={`cursor-pointer rounded-lg px-3 py-2.5 transition-all ${
              l === currentLang
                ? 'bg-primary text-primary-foreground font-bold shadow-sm'
                : 'hover:bg-muted'
            }`}
          >
            <span className="mr-2.5 text-base">{LANGUAGE_FLAGS[l]}</span>
            <span className="flex-1">{LANGUAGE_NAMES[l]}</span>
            <span className={`text-xs font-mono ${l === currentLang ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
              {l.toUpperCase()}
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
