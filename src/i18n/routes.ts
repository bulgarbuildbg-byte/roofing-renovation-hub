import { SupportedLanguage } from './config';

export type RouteKey =
  | 'home' | 'services' | 'roofRepair' | 'leakRepair' | 'waterproofing'
  | 'newRoof' | 'tileRoofRepair' | 'flatRoof' | 'metalRoof' | 'maintenance'
  | 'about' | 'projects' | 'reviews' | 'calculator' | 'blog' | 'faq' | 'contact' | 'inspection' | 'howWeWork' | 'pricing'
  | 'solarSystems' | 'solarHouse' | 'solarBuildings' | 'solarFarms'
  | 'financing' | 'cities';

export const localizedSlugs: Record<SupportedLanguage, Record<RouteKey, string>> = {
  bg: {
    home: '', services: 'services', roofRepair: 'remont-na-pokrivi', leakRepair: 'remont-na-techove-pokriv',
    waterproofing: 'hidroizolacia-na-pokriv',
    newRoof: 'nov-pokriv', tileRoofRepair: 'remont-na-keremideni-pokrivi',
    flatRoof: 'remont-na-ploski-pokrivi', metalRoof: 'metalni-pokrivi', maintenance: 'poddruzhka-na-pokrivi',
    about: 'za-nas', projects: 'proekti', reviews: 'otzyvi', calculator: 'kalkulator',
    blog: 'blog', faq: 'vaprosi', contact: 'kontakti', inspection: 'bezplaten-ogled', howWeWork: 'kak-rabotim',
    pricing: 'tseni-remont-pokriv',
    solarSystems: 'solarni-sistemi', solarHouse: 'solarni-sistemi-za-kashta', solarBuildings: 'solarni-sistemi-za-blokove', solarFarms: 'solarni-centrali',
    financing: 'finansirane-remont-na-pokriv',
  },
  en: {
    home: '', services: 'services', roofRepair: 'roof-repair-varna', leakRepair: 'roof-leak-repair',
    waterproofing: 'roof-waterproofing',
    newRoof: 'new-roof-construction', tileRoofRepair: 'tile-roof-repair-varna',
    flatRoof: 'flat-roof-repair', metalRoof: 'metal-roof-installation', maintenance: 'roof-maintenance',
    about: 'about', projects: 'projects', reviews: 'reviews', calculator: 'calculator',
    blog: 'blog', faq: 'faq', contact: 'contact', inspection: 'free-inspection', howWeWork: 'how-we-work',
    pricing: 'roof-repair-prices',
    solarSystems: 'solar-systems', solarHouse: 'solar-systems-for-homes', solarBuildings: 'solar-systems-for-buildings', solarFarms: 'solar-farms',
    financing: 'roof-repair-financing',
  },
  de: {
    home: '', services: 'dienstleistungen', roofRepair: 'dachreparatur-varna', leakRepair: 'leckage-reparatur-varna',
    waterproofing: 'abdichtung-varna',
    newRoof: 'neues-dach-varna', tileRoofRepair: 'ziegelreparatur-varna',
    flatRoof: 'flachdaecher-varna', metalRoof: 'metalldaecher-varna', maintenance: 'dachpflege-varna',
    about: 'ueber-uns', projects: 'projekte', reviews: 'bewertungen', calculator: 'kalkulator',
    blog: 'blog', faq: 'faq', contact: 'kontakt', inspection: 'kostenlose-inspektion', howWeWork: 'wie-wir-arbeiten',
    pricing: 'dachsanierung-preise',
    solarSystems: 'solaranlagen', solarHouse: 'solaranlagen-fuer-haeuser', solarBuildings: 'solaranlagen-fuer-gebaeude', solarFarms: 'solarkraftwerke',
    financing: 'dachsanierung-finanzierung',
  },
  fi: {
    home: '', services: 'palvelut', roofRepair: 'kattokorjaus-varna', leakRepair: 'vuotokorjaus-varna',
    waterproofing: 'vedeneristys-varna',
    newRoof: 'uusi-katto-varna', tileRoofRepair: 'tiilikattokorjaus-varna',
    flatRoof: 'tasakatot-varna', metalRoof: 'metallikatot-varna', maintenance: 'katon-huolto-varna',
    about: 'meista', projects: 'projektit', reviews: 'arvostelut', calculator: 'laskin',
    blog: 'blogi', faq: 'ukk', contact: 'yhteystiedot', inspection: 'ilmainen-tarkastus', howWeWork: 'miten-tyoskentelemme',
    pricing: 'kattokorjaus-hinnat',
    solarSystems: 'aurinkopaneelit', solarHouse: 'aurinkopaneelit-taloille', solarBuildings: 'aurinkopaneelit-rakennuksille', solarFarms: 'aurinkovoimalat',
    financing: 'kattoremontin-rahoitus',
  },
  sv: {
    home: '', services: 'tjanster', roofRepair: 'takreparation-varna', leakRepair: 'lackage-reparation-varna',
    waterproofing: 'tatning-varna',
    newRoof: 'nytt-tak-varna', tileRoofRepair: 'tegelreparation-varna',
    flatRoof: 'platta-tak-varna', metalRoof: 'metalltak-varna', maintenance: 'takunderhall-varna',
    about: 'om-oss', projects: 'projekt', reviews: 'omdomen', calculator: 'kalkylator',
    blog: 'blogg', faq: 'vanliga-fragor', contact: 'kontakt', inspection: 'gratis-inspektion', howWeWork: 'sa-arbetar-vi',
    pricing: 'takreparation-priser',
    solarSystems: 'solcellssystem', solarHouse: 'solceller-for-hus', solarBuildings: 'solceller-for-byggnader', solarFarms: 'solcellsparker',
    financing: 'takreparation-finansiering',
  },
  no: {
    home: '', services: 'tjenester', roofRepair: 'takreparasjon-varna', leakRepair: 'lekkasje-reparasjon-varna',
    waterproofing: 'vanntetting-varna',
    newRoof: 'nytt-tak-varna', tileRoofRepair: 'teglreparasjon-varna',
    flatRoof: 'flate-tak-varna', metalRoof: 'metalltak-varna', maintenance: 'takvedlikehold-varna',
    about: 'om-oss', projects: 'prosjekter', reviews: 'anmeldelser', calculator: 'kalkulator',
    blog: 'blogg', faq: 'vanlige-sporsmal', contact: 'kontakt', inspection: 'gratis-inspeksjon', howWeWork: 'slik-jobber-vi',
    pricing: 'takreparasjon-priser',
    solarSystems: 'solcellesystemer', solarHouse: 'solceller-for-boliger', solarBuildings: 'solceller-for-bygninger', solarFarms: 'solcelleparker',
    financing: 'takreparasjon-finansiering',
  },
  fr: {
    home: '', services: 'services', roofRepair: 'reparation-toiture-varna', leakRepair: 'reparation-fuite-varna',
    waterproofing: 'etancheite-varna',
    newRoof: 'nouvelle-toiture-varna', tileRoofRepair: 'reparation-tuiles-varna',
    flatRoof: 'toits-plats-varna', metalRoof: 'toits-metalliques-varna', maintenance: 'entretien-toiture-varna',
    about: 'a-propos', projects: 'projets', reviews: 'avis', calculator: 'calculateur',
    blog: 'blog', faq: 'faq', contact: 'contact', inspection: 'inspection-gratuite', howWeWork: 'comment-nous-travaillons',
    pricing: 'prix-reparation-toiture',
    solarSystems: 'panneaux-solaires', solarHouse: 'panneaux-solaires-maison', solarBuildings: 'panneaux-solaires-immeubles', solarFarms: 'centrales-solaires',
    financing: 'financement-reparation-toiture',
  },
  nl: {
    home: '', services: 'diensten', roofRepair: 'dakreparatie-varna', leakRepair: 'lekkage-reparatie-varna',
    waterproofing: 'waterdichting-varna',
    newRoof: 'nieuw-dak-varna', tileRoofRepair: 'dakpanreparatie-varna',
    flatRoof: 'platte-daken-varna', metalRoof: 'metalen-daken-varna', maintenance: 'dakonderhoud-varna',
    about: 'over-ons', projects: 'projecten', reviews: 'beoordelingen', calculator: 'calculator',
    blog: 'blog', faq: 'veelgestelde-vragen', contact: 'contact', inspection: 'gratis-inspectie', howWeWork: 'hoe-we-werken',
    pricing: 'dakreparatie-prijzen',
    solarSystems: 'zonnepanelen', solarHouse: 'zonnepanelen-voor-woningen', solarBuildings: 'zonnepanelen-voor-gebouwen', solarFarms: 'zonneparken',
    financing: 'dakreparatie-financiering',
  },
  ru: {
    home: '', services: 'uslugi', roofRepair: 'remont-kryshi-varna', leakRepair: 'remont-protechek-varna',
    waterproofing: 'gidroizolyatsiya-varna',
    newRoof: 'novaya-krysha-varna', tileRoofRepair: 'remont-cherepichnoj-kryshi-varna',
    flatRoof: 'ploskie-kryshi-varna', metalRoof: 'metallicheskie-kryshi-varna', maintenance: 'obsluzhivanie-kryshi-varna',
    about: 'o-nas', projects: 'proekty', reviews: 'otzyvy', calculator: 'kalkulyator',
    blog: 'blog', faq: 'voprosy', contact: 'kontakty', inspection: 'besplatnyj-osmotr', howWeWork: 'kak-my-rabotaem',
    pricing: 'tseny-remonta-kryshi',
    solarSystems: 'solnechnye-sistemy', solarHouse: 'solnechnye-sistemy-dlya-domov', solarBuildings: 'solnechnye-sistemy-dlya-zdanij', solarFarms: 'solnechnye-elektrostantsii',
    financing: 'finansirovanie-remonta-kryshi',
  },
  ua: {
    home: '', services: 'poslugy', roofRepair: 'remont-dahu-varna', leakRepair: 'remont-protikan-varna',
    waterproofing: 'gidroizolyatsiya-varna',
    newRoof: 'novyj-dah-varna', tileRoofRepair: 'remont-cherepychnogo-dahu-varna',
    flatRoof: 'ploski-dahy-varna', metalRoof: 'metalevi-dahy-varna', maintenance: 'obslugovuvannya-dahu-varna',
    about: 'pro-nas', projects: 'proekty', reviews: 'vidguky', calculator: 'kalkulyator',
    blog: 'blog', faq: 'pytannya', contact: 'kontakty', inspection: 'bezkoshtovnyj-ohlyad', howWeWork: 'yak-my-pratsyuyemo',
    pricing: 'tsiny-remontu-dahu',
    solarSystems: 'sonyachni-systemy', solarHouse: 'sonyachni-systemy-dlya-budynkiv', solarBuildings: 'sonyachni-systemy-dlya-budivel', solarFarms: 'sonyachni-elektrostantsii',
    financing: 'finansuvannya-remontu-dahu',
  },
};

// Old Cyrillic BG slugs for redirect matching
export const OLD_BG_SLUGS: Record<string, string> = {
  'ремонт-на-покриви': 'remont-na-pokrivi',
  'ремонт-течове': 'remont-na-techove-pokriv',
  'хидроизолация': 'hidroizolacia-na-pokriv',
  'хидроизолация-варна': 'hidroizolacia-na-pokriv',
  'изграждане-на-покрив': 'nov-pokriv',
  'смяна-керемиди': 'remont-na-keremideni-pokrivi',
  'плоски-покриви': 'remont-na-ploski-pokrivi',
  'метални-покриви': 'metalni-pokrivi',
  'поддръжка-на-покриви': 'poddruzhka-na-pokrivi',
  'за-нас': 'za-nas',
  'проекти': 'proekti',
  'отзиви': 'otzyvi',
  'въпроси': 'vaprosi',
  'контакти': 'kontakti',
  'калкулатор': 'kalkulator',
  'блог': 'blog',
  'безплатен-оглед': 'bezplaten-ogled',
  'как-работим': 'kak-rabotim',
  'цени-ремонт-покрив': 'tseni-remont-pokriv',
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
 * City-scoped routes — these always carry a city prefix (e.g., /bg/varna/remont-na-pokrivi).
 * All other routes remain global (e.g., /bg/za-nas, /en/about).
 */
export const CITY_SCOPED_ROUTES: RouteKey[] = [
  'home', 'roofRepair', 'leakRepair', 'waterproofing',
  'newRoof', 'tileRoofRepair', 'flatRoof', 'metalRoof', 'maintenance',
];

export function isCityScopedRoute(key: RouteKey): boolean {
  return CITY_SCOPED_ROUTES.includes(key);
}

/**
 * Get a localized path for a given route key and language.
 * For city-scoped routes, automatically inserts the default city (varna) prefix.
 */
export function getLocalizedPath(routeKey: RouteKey, lang: SupportedLanguage): string {
  const slug = localizedSlugs[lang][routeKey];
  if (isCityScopedRoute(routeKey)) {
    if (routeKey === 'home') return `/${lang}/varna`;
    return `/${lang}/varna/${slug}`;
  }
  if (routeKey === 'home') return `/${lang}`;
  return `/${lang}/${slug}`;
}

/**
 * Get a city-scoped path for a given route key, language and city.
 */
export function getCityScopedPath(routeKey: RouteKey, lang: SupportedLanguage, city: string): string {
  const slug = localizedSlugs[lang][routeKey];
  if (routeKey === 'home') return `/${lang}/${city}`;
  return `/${lang}/${city}/${slug}`;
}
