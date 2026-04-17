import { useEffect, lazy, Suspense } from "react";
import { Outlet, useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { SUPPORTED_LANGUAGES, LANGUAGE_HTML_LANG, type SupportedLanguage } from "@/i18n/config";
import { isCityKey } from "@/i18n/cities";
import { CityProvider } from "@/contexts/CityContext";
import HreflangTags from "./HreflangTags";
import FloatingCallButton from "./FloatingCallButton";
import MobileBottomBar from "./MobileBottomBar";

const ChatBot = lazy(() => import("./ChatBot"));

const CityAwareLayout = () => {
  const { lang, city } = useParams<{ lang: string; city: string }>();
  const { i18n } = useTranslation();
  const navigate = useNavigate();

  const currentLang = (SUPPORTED_LANGUAGES.includes(lang as SupportedLanguage) ? lang : 'bg') as SupportedLanguage;

  useEffect(() => {
    if (!SUPPORTED_LANGUAGES.includes(lang as SupportedLanguage)) {
      navigate(`/bg`, { replace: true });
      return;
    }
    if (!isCityKey(city)) {
      // Unknown city — redirect to language root (legacy Varna)
      navigate(`/${currentLang}`, { replace: true });
      return;
    }
    if (i18n.language !== currentLang) {
      i18n.changeLanguage(currentLang);
    }
    document.documentElement.lang = LANGUAGE_HTML_LANG[currentLang];
    document.cookie = `i18next=${currentLang};path=/;max-age=31536000;SameSite=Lax`;
  }, [currentLang, i18n, lang, city, navigate]);

  return (
    <CityProvider>
      <HreflangTags />
      <Outlet />
      <FloatingCallButton />
      <MobileBottomBar />
      <Suspense fallback={null}>
        <ChatBot />
      </Suspense>
      <div className="h-20 md:hidden" />
    </CityProvider>
  );
};

export default CityAwareLayout;
