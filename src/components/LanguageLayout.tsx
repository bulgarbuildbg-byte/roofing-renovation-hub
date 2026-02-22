import { useEffect } from "react";
import { Outlet, useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { SUPPORTED_LANGUAGES, LANGUAGE_HTML_LANG, type SupportedLanguage } from "@/i18n/config";
import HreflangTags from "./HreflangTags";

const LanguageLayout = () => {
  const { lang } = useParams<{ lang: string }>();
  const { i18n } = useTranslation();
  const navigate = useNavigate();

  const currentLang = (SUPPORTED_LANGUAGES.includes(lang as SupportedLanguage) ? lang : 'bg') as SupportedLanguage;

  useEffect(() => {
    if (!SUPPORTED_LANGUAGES.includes(lang as SupportedLanguage)) {
      navigate(`/bg`, { replace: true });
      return;
    }
    if (i18n.language !== currentLang) {
      i18n.changeLanguage(currentLang);
    }
    document.documentElement.lang = LANGUAGE_HTML_LANG[currentLang];
    // Store preference in cookie
    document.cookie = `i18next=${currentLang};path=/;max-age=31536000;SameSite=Lax`;
  }, [currentLang, i18n, lang, navigate]);

  return (
    <>
      <HreflangTags />
      <Outlet />
    </>
  );
};

export default LanguageLayout;
