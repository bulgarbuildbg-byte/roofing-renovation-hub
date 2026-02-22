import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import bg from './locales/bg';
import en from './locales/en';
import de from './locales/de';
import fi from './locales/fi';
import sv from './locales/sv';
import no from './locales/no';
import fr from './locales/fr';
import nl from './locales/nl';
import ru from './locales/ru';
import ua from './locales/ua';

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

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      bg: { translation: bg }, en: { translation: en }, de: { translation: de },
      fi: { translation: fi }, sv: { translation: sv }, no: { translation: no },
      fr: { translation: fr }, nl: { translation: nl }, ru: { translation: ru },
      ua: { translation: ua },
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

export default i18n;
