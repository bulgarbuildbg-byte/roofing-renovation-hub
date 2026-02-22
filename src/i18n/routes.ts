import { SupportedLanguage } from './config';

export type RouteKey =
  | 'home' | 'services' | 'roofRepair' | 'leakRepair' | 'waterproofing'
  | 'newRoof' | 'tileReplacement' | 'flatRoof' | 'metalRoof' | 'maintenance'
  | 'about' | 'projects' | 'reviews' | 'calculator' | 'blog' | 'faq' | 'contact';

export const localizedSlugs: Record<SupportedLanguage, Record<RouteKey, string>> = {
  bg: {
    home: '', services: 'services', roofRepair: 'ремонт-на-покриви', leakRepair: 'ремонт-течове',
    waterproofing: 'хидроизолация', newRoof: 'изграждане-на-покрив', tileReplacement: 'смяна-керемиди',
    flatRoof: 'плоски-покриви', metalRoof: 'метални-покриви', maintenance: 'поддръжка-на-покриви',
    about: 'за-нас', projects: 'проекти', reviews: 'отзиви', calculator: 'калкулатор',
    blog: 'блог', faq: 'въпроси', contact: 'контакти',
  },
  en: {
    home: '', services: 'services', roofRepair: 'roof-repair-varna', leakRepair: 'leak-repair-varna',
    waterproofing: 'waterproofing-varna', newRoof: 'new-roof-varna', tileReplacement: 'tile-replacement-varna',
    flatRoof: 'flat-roofs-varna', metalRoof: 'metal-roofs-varna', maintenance: 'roof-maintenance-varna',
    about: 'about', projects: 'projects', reviews: 'reviews', calculator: 'calculator',
    blog: 'blog', faq: 'faq', contact: 'contact',
  },
  de: {
    home: '', services: 'dienstleistungen', roofRepair: 'dachreparatur-varna', leakRepair: 'leckage-reparatur-varna',
    waterproofing: 'abdichtung-varna', newRoof: 'neues-dach-varna', tileReplacement: 'ziegelaustausch-varna',
    flatRoof: 'flachdaecher-varna', metalRoof: 'metalldaecher-varna', maintenance: 'dachpflege-varna',
    about: 'ueber-uns', projects: 'projekte', reviews: 'bewertungen', calculator: 'kalkulator',
    blog: 'blog', faq: 'faq', contact: 'kontakt',
  },
  fi: {
    home: '', services: 'palvelut', roofRepair: 'kattokorjaus-varna', leakRepair: 'vuotokorjaus-varna',
    waterproofing: 'vedeneristys-varna', newRoof: 'uusi-katto-varna', tileReplacement: 'tiilien-vaihto-varna',
    flatRoof: 'tasakatot-varna', metalRoof: 'metallikatot-varna', maintenance: 'katon-huolto-varna',
    about: 'meista', projects: 'projektit', reviews: 'arvostelut', calculator: 'laskin',
    blog: 'blogi', faq: 'ukk', contact: 'yhteystiedot',
  },
  sv: {
    home: '', services: 'tjanster', roofRepair: 'takreparation-varna', leakRepair: 'lackage-reparation-varna',
    waterproofing: 'tatning-varna', newRoof: 'nytt-tak-varna', tileReplacement: 'tegelbyte-varna',
    flatRoof: 'platta-tak-varna', metalRoof: 'metalltak-varna', maintenance: 'takunderhall-varna',
    about: 'om-oss', projects: 'projekt', reviews: 'omdomen', calculator: 'kalkylator',
    blog: 'blogg', faq: 'vanliga-fragor', contact: 'kontakt',
  },
  no: {
    home: '', services: 'tjenester', roofRepair: 'takreparasjon-varna', leakRepair: 'lekkasje-reparasjon-varna',
    waterproofing: 'vanntetting-varna', newRoof: 'nytt-tak-varna', tileReplacement: 'teglstein-bytte-varna',
    flatRoof: 'flate-tak-varna', metalRoof: 'metalltak-varna', maintenance: 'takvedlikehold-varna',
    about: 'om-oss', projects: 'prosjekter', reviews: 'anmeldelser', calculator: 'kalkulator',
    blog: 'blogg', faq: 'vanlige-sporsmal', contact: 'kontakt',
  },
  fr: {
    home: '', services: 'services', roofRepair: 'reparation-toiture-varna', leakRepair: 'reparation-fuite-varna',
    waterproofing: 'etancheite-varna', newRoof: 'nouvelle-toiture-varna', tileReplacement: 'remplacement-tuiles-varna',
    flatRoof: 'toits-plats-varna', metalRoof: 'toits-metalliques-varna', maintenance: 'entretien-toiture-varna',
    about: 'a-propos', projects: 'projets', reviews: 'avis', calculator: 'calculateur',
    blog: 'blog', faq: 'faq', contact: 'contact',
  },
  nl: {
    home: '', services: 'diensten', roofRepair: 'dakreparatie-varna', leakRepair: 'lekkage-reparatie-varna',
    waterproofing: 'waterdichting-varna', newRoof: 'nieuw-dak-varna', tileReplacement: 'dakpannen-vervangen-varna',
    flatRoof: 'platte-daken-varna', metalRoof: 'metalen-daken-varna', maintenance: 'dakonderhoud-varna',
    about: 'over-ons', projects: 'projecten', reviews: 'beoordelingen', calculator: 'calculator',
    blog: 'blog', faq: 'veelgestelde-vragen', contact: 'contact',
  },
  ru: {
    home: '', services: 'uslugi', roofRepair: 'remont-kryshi-varna', leakRepair: 'remont-protechek-varna',
    waterproofing: 'gidroizolyatsiya-varna', newRoof: 'novaya-krysha-varna', tileReplacement: 'zamena-cherepitsy-varna',
    flatRoof: 'ploskie-kryshi-varna', metalRoof: 'metallicheskie-kryshi-varna', maintenance: 'obsluzhivanie-kryshi-varna',
    about: 'o-nas', projects: 'proekty', reviews: 'otzyvy', calculator: 'kalkulyator',
    blog: 'blog', faq: 'voprosy', contact: 'kontakty',
  },
  ua: {
    home: '', services: 'poslugy', roofRepair: 'remont-dahu-varna', leakRepair: 'remont-protikan-varna',
    waterproofing: 'gidroizolyatsiya-varna', newRoof: 'novyj-dah-varna', tileReplacement: 'zamina-cherepytsi-varna',
    flatRoof: 'ploski-dahy-varna', metalRoof: 'metalevi-dahy-varna', maintenance: 'obslugovuvannya-dahu-varna',
    about: 'pro-nas', projects: 'proekty', reviews: 'vidguky', calculator: 'kalkulyator',
    blog: 'blog', faq: 'pytannya', contact: 'kontakty',
  },
};

/**
 * Find the route key that matches a given slug for any language
 */
export function findRouteKeyBySlug(slug: string, lang: SupportedLanguage): RouteKey | null {
  const slugs = localizedSlugs[lang];
  for (const [key, value] of Object.entries(slugs)) {
    if (value === slug) return key as RouteKey;
  }
  return null;
}

/**
 * Find which language and route key matches a slug (searches all languages)
 */
export function findRouteBySlug(slug: string): { lang: SupportedLanguage; routeKey: RouteKey } | null {
  for (const [lang, slugs] of Object.entries(localizedSlugs)) {
    for (const [key, value] of Object.entries(slugs)) {
      if (value === slug) return { lang: lang as SupportedLanguage, routeKey: key as RouteKey };
    }
  }
  return null;
}

/**
 * Get a localized path for a given route key and language
 */
export function getLocalizedPath(routeKey: RouteKey, lang: SupportedLanguage): string {
  const slug = localizedSlugs[lang][routeKey];
  if (routeKey === 'home') return `/${lang}`;
  return `/${lang}/${slug}`;
}
