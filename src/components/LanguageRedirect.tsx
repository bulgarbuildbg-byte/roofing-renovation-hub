import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SUPPORTED_LANGUAGES, BROWSER_LANG_MAP, type SupportedLanguage } from "@/i18n/config";

function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? match[2] : null;
}

function detectLanguage(): SupportedLanguage {
  // 1. Check cookie
  const cookieLang = getCookie('i18next');
  if (cookieLang && SUPPORTED_LANGUAGES.includes(cookieLang as SupportedLanguage)) {
    return cookieLang as SupportedLanguage;
  }

  // 2. Check browser language
  const browserLangs = navigator.languages || [navigator.language];
  for (const bl of browserLangs) {
    const code = bl.split('-')[0].toLowerCase();
    if (BROWSER_LANG_MAP[code]) return BROWSER_LANG_MAP[code];
  }

  // 3. Default to Bulgarian
  return 'bg';
}

const LanguageRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const lang = detectLanguage();
    navigate(`/${lang}`, { replace: true });
  }, [navigate]);

  return null;
};

export default LanguageRedirect;
