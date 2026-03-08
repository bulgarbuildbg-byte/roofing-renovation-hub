import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import bg from './locales/bg';

export const SUPPORTED_LANGUAGES = ['bg', 'en', 'de', 'fi', 'sv', 'no', 'fr', 'nl', 'ru', 'ua'] as const;
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

export const LANGUAGE_NAMES: Record<SupportedLanguage, string> = {
  bg: 'Български', en: 'English', de: 'Deutsch', fi: 'Suomi',
  sv: 'Svenska', no: 'Norsk', fr: 'Français', nl: 'Nederlands',
  ru: 'Русский', ua: 'Українська',
};

export const LANGUAGE_FLAGS: Record<SupportedLanguage, string> = {
  bg: '🇧🇬', en: '🇬🇧', de: '🇩🇪', fi: '🇫🇮',
  sv: '🇸🇪', no: '🇳🇴', fr: '🇫🇷', nl: '🇳🇱',
  ru: '🇷🇺', ua: '🇺🇦',
};

export const LANGUAGE_HTML_LANG: Record<SupportedLanguage, string> = {
  bg: 'bg', en: 'en', de: 'de', fi: 'fi',
  sv: 'sv', no: 'no', fr: 'fr', nl: 'nl',
  ru: 'ru', ua: 'uk',
};

export const LANGUAGE_OG_LOCALE: Record<SupportedLanguage, string> = {
  bg: 'bg_BG', en: 'en_GB', de: 'de_DE', fi: 'fi_FI',
  sv: 'sv_SE', no: 'nb_NO', fr: 'fr_FR', nl: 'nl_NL',
  ru: 'ru_RU', ua: 'uk_UA',
};

// Map browser language codes to our supported languages
export const BROWSER_LANG_MAP: Record<string, SupportedLanguage> = {
  bg: 'bg', en: 'en', de: 'de', fi: 'fi', sv: 'sv',
  no: 'no', nb: 'no', nn: 'no', fr: 'fr', nl: 'nl',
  ru: 'ru', uk: 'ua', ua: 'ua',
};

// Map country codes to languages (for geo-detection)
export const COUNTRY_LANG_MAP: Record<string, SupportedLanguage> = {
  BG: 'bg', GB: 'en', US: 'en', AU: 'en', CA: 'en', IE: 'en',
  DE: 'de', AT: 'de', CH: 'de', FI: 'fi', SE: 'sv',
  NO: 'no', FR: 'fr', BE: 'fr', NL: 'nl', RU: 'ru', UA: 'ua',
};

// Dynamic locale loaders — only imported when language is actually requested
const localeLoaders: Record<Exclude<SupportedLanguage, 'bg'>, () => Promise<{ default: Record<string, unknown> }>> = {
  en: () => import('./locales/en'),
  de: () => import('./locales/de'),
  fi: () => import('./locales/fi'),
  sv: () => import('./locales/sv'),
  no: () => import('./locales/no'),
  fr: () => import('./locales/fr'),
  nl: () => import('./locales/nl'),
  ru: () => import('./locales/ru'),
  ua: () => import('./locales/ua'),
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      bg: { translation: bg },
    },
    fallbackLng: 'bg',
    interpolation: { escapeValue: false },
    detection: {
      order: ['cookie', 'path', 'navigator'],
      lookupCookie: 'i18next',
      lookupFromPathIndex: 0,
      caches: ['cookie'],
      cookieMinutes: 525600, // 1 year
    },
  });

// Helper to ensure a locale bundle is loaded before switching
async function ensureLocaleLoaded(lng: string): Promise<void> {
  if (lng !== 'bg' && lng in localeLoaders && !i18n.hasResourceBundle(lng, 'translation')) {
    try {
      const mod = await localeLoaders[lng as Exclude<SupportedLanguage, 'bg'>]();
      i18n.addResourceBundle(lng, 'translation', mod.default, true, true);
    } catch (e) {
      console.warn(`Failed to load locale: ${lng}`, e);
    }
  }
}

// Patch changeLanguage to lazy-load locale bundles on demand
const originalChangeLanguage = i18n.changeLanguage.bind(i18n);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(i18n as any).changeLanguage = async (lng?: string, callback?: Parameters<typeof originalChangeLanguage>[1]) => {
  if (lng) await ensureLocaleLoaded(lng);
  return originalChangeLanguage(lng, callback);
};

// Pre-load locale for the current detected language (if non-bg)
const detectedLang = i18n.language?.split('-')[0] as SupportedLanguage;
if (detectedLang && detectedLang !== 'bg' && detectedLang in localeLoaders) {
  i18n.changeLanguage(detectedLang);
}

export default i18n;
