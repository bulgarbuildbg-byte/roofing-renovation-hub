#!/usr/bin/env node
/**
 * Post-build full HTML prerender.
 *
 * For every public URL, this script:
 *   1. Serves the built `dist/` via a local HTTP server with SPA fallback.
 *   2. Uses Puppeteer to load the URL, wait for the app's own
 *      `data-prerender-ready="true"` signal, and validate the rendered DOM
 *      contains real SEO-critical content (H1, canonical, JSON-LD, body text).
 *   3. Writes the full rendered HTML to `dist/<route>/index.html`.
 *
 * Third-party analytics (GTM, Clarity, Google Ads, GA, DoubleClick) are
 * request-intercepted and ABORTED during prerender so they never block the
 * ready signal. Real users still get them normally at runtime.
 *
 * Fallbacks:
 *   - If Chromium cannot launch (missing binary in CI), the script falls
 *     back to meta-only HTML stubs (previous behavior) with a big warning
 *     and exits 0 so deploys aren't blocked by infrastructure gaps.
 *   - If an individual URL fails validation, we keep the meta-only stub as
 *     a fallback and record it in the report. If any CRITICAL_ROUTE fails,
 *     the script exits 1 so the deploy pipeline stops.
 *
 * A JSON report is written to `dist/prerender-report.json`.
 */
import { promises as fs } from "node:fs";
import { existsSync, createReadStream } from "node:fs";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DIST = path.join(ROOT, "dist");
const BASE_URL = "https://www.remontnapokrivivarna.bg";
const LOCAL_PORT = 4173;
const LOCAL_BASE = `http://127.0.0.1:${LOCAL_PORT}`;
const CONCURRENCY = 2;
const NAV_TIMEOUT_MS = 45_000;
const READY_TIMEOUT_MS = 35_000;

// ── Source data (mirrors src/i18n/cities.ts + src/data/cityServices.ts) ──────
const CITIES_BG = {
  varna:   { nameBg: "Варна",   slug: "varna"   },
  burgas:  { nameBg: "Бургас",  slug: "burgas"  },
  ruse:    { nameBg: "Русе",    slug: "ruse"    },
  dobrich: { nameBg: "Добрич",  slug: "dobrich" },
};

const SERVICES_BG = {
  "remont-na-pokrivi":            { titlePrefix: "Ремонт на Покриви",             metaTpl: "Професионален ремонт на покриви в {city} — спиране на течове, смяна на керемиди, ламарина, хидроизолация. Безплатен оглед 24ч. Гаранция 15 г." },
  "remont-na-techove-pokriv":     { titlePrefix: "Ремонт на Течове на Покрив",     metaTpl: "Спешен ремонт на течове на покрив в {city} — диагностика, локализиране и трайно отстраняване. Реакция същия ден. Гаранция 15 г." },
  "hidroizolacia-na-pokriv":      { titlePrefix: "Хидроизолация на Покрив",         metaTpl: "Професионална хидроизолация на покриви и тераси в {city} — PVC мембрани, битумни системи, течна хидроизолация. Гаранция 15 г." },
  "nov-pokriv":                   { titlePrefix: "Нов Покрив",                       metaTpl: "Изграждане на нови покриви в {city} — пълен цикъл: проектиране, конструкция, топло- и хидроизолация, покритие. Гаранция 15 г." },
  "remont-na-keremideni-pokrivi": { titlePrefix: "Смяна на Керемиди",                metaTpl: "Смяна и ремонт на керемидени покриви в {city} — Bramac, Tondach, Wienerberger. Частична или пълна подмяна. Гаранция 15 г." },
  "remont-na-ploski-pokrivi":     { titlePrefix: "Плоски Покриви",                   metaTpl: "Ремонт и хидроизолация на плоски покриви в {city} — PVC мембрани, битумни системи, топлоизолация. Гаранция 15 г." },
  "metalni-pokrivi":              { titlePrefix: "Метални Покриви",                  metaTpl: "Изграждане и ремонт на метални покриви в {city} — ламарина, фалцова ламарина, профилирани панели. Гаранция 15 г." },
  "poddruzhka-na-pokrivi":        { titlePrefix: "Поддръжка на Покриви",             metaTpl: "Профилактика и поддръжка на покриви в {city} — годишен оглед, почистване на улуци, превенция на течове. Абонаментни планове от €199/год." },
};

const GLOBAL_BG = {
  "za-nas":                        { title: "За нас — Булгар Билд ЕООД | Ремонт на Покриви Варна",                       description: "Над 15 години опит в ремонт на покриви, хидроизолация и нови покриви. Сертифицирани специалисти, писмена гаранция 15 години. Базирани във Варна." },
  "kontakti":                      { title: "Контакти — Ремонт на Покриви Варна | 089 397 1873",                          description: "Свържете се с нас за безплатен оглед в рамките на 24ч. Телефон 089 397 1873. Работно време: Пон–Съб 08:00–18:00. Аварии 24/7." },
  "blog":                          { title: "Блог — Съвети за поддръжка и ремонт на покриви",                              description: "Експертни съвети за поддръжка, ремонт и хидроизолация на покриви. Реални цени, чести грешки, материали — от специалисти с 15+ години опит." },
  "vaprosi":                       { title: "Често задавани въпроси — Ремонт на покриви Варна",                             description: "Отговори на най-честите въпроси за цени, гаранции, материали, срокове и процес на ремонт на покрив. Над 15 години опит." },
  "kalkulator":                    { title: "Калкулатор за ремонт на покрив — Безплатна онлайн оферта",                     description: "Изчислете ориентировъчна цена за ремонт на покрив, хидроизолация или нов покрив онлайн. 6 стъпки, точна оценка за минута." },
  "bezplaten-ogled":               { title: "Безплатен оглед на покрив — 24ч във Варна и региона | 089 397 1873",          description: "Заявете безплатен оглед на покрива. Идваме на адреса в рамките на 24 часа. Подробен фотодоклад и точна оферта без ангажимент." },
  "kak-rabotim":                   { title: "Как работим — 5 стъпки от оглед до завършен ремонт",                           description: "Прозрачен процес в 5 стъпки: оглед, оферта, договор, изпълнение, гаранция. Писмена гаранция 15 години върху всеки ремонт." },
  "tseni-remont-pokriv":           { title: "Цени за ремонт на покрив 2026 — €4–€120/м² | Варна",                            description: "Реални пазарни цени за ремонт на покрив във Варна и региона 2026: ремонт от €4/м², хидроизолация от €12/м², нов покрив от €55/м²." },
  "proekti":                       { title: "Завършени проекти — Покривни ремонти Варна и регион",                          description: "Над 7 проверени проекта: жилищни сгради, офиси, ваканционни имоти. Снимки преди и след, описание на работата, реални резултати." },
  "otzyvi":                        { title: "Отзиви на клиенти — 4.9/5 от 127 ревюта",                                       description: "Реални отзиви на клиенти за нашите услуги — рейтинг 4.9/5 от 127 ревюта. Препоръки от собственици във Варна, Бургас, Русе, Добрич." },
  "services":                      { title: "Услуги — Ремонт, хидроизолация, нови покриви | Варна",                          description: "Пълен набор покривни услуги: ремонт, хидроизолация, нови покриви, смяна на керемиди, плоски и метални покриви, поддръжка, соларни системи." },
  "gradove":                       { title: "Градове, които обслужваме — Варна, Бургас, Русе, Добрич",                      description: "Покривни услуги във Варна, Бургас, Русе и Добрич. Бърз отговор, безплатен оглед в рамките на 24 часа, локален екип." },
  "zayavete-oferta":               { title: "Заявете оферта — Безплатна онлайн оферта за покрив",                            description: "Получете оферта за ремонт, хидроизолация или нов покрив. Безплатно, без ангажимент. Отговор в рамките на 24 часа." },
  "blagodarim-vi":                 { title: "Благодарим Ви — Получихме Вашата заявка",                                       description: "Благодарим, че се свързахте с нас. Ще се свържем с Вас в рамките на 24 часа за да насрочим безплатен оглед." },
  "finansirane-remont-na-pokriv":  { title: "Финансиране на ремонт на покрив — Гъвкави схеми на плащане",                    description: "Финансиране на ремонт на покрив с гъвкави условия. Стандартно разпределение 30/40/30, опция за разсрочено плащане. Без скрити такси." },
  "solarni-sistemi":               { title: "Соларни системи за дома и бизнеса — Варна и региона",                          description: "Проектиране и монтаж на соларни системи за къщи, блокове и индустриални обекти. Безплатна оценка, оптимална възвръщаемост." },
  "solarni-sistemi-za-kashta":     { title: "Соларни системи за къща — Енергийна независимост",                              description: "Соларни панели за еднофамилни къщи във Варна и региона. Безплатна оценка, бърз монтаж, държавно финансиране." },
  "solarni-sistemi-za-blokove":    { title: "Соларни системи за блокове и сгради — Колективни системи",                     description: "Колективни соларни системи за жилищни блокове и обществени сгради. Намаление на сметките за общи части." },
  "solarni-centrali":              { title: "Соларни централи — Индустриални и комерсиални проекти",                        description: "Изграждане на соларни централи за индустриални клиенти, ферми и парк-зони. Под ключ — от проект до експлоатация." },
};

const BLOG_BG = {
  "blog/priznazi-za-remont-na-pokriv":   { title: "7 признака, че покривът Ви се нуждае от ремонт",                  description: "Кога точно трябва да повикате специалист? Запознайте се с 7-те най-явни признака — от петна по тавана до изместени керемиди." },
  "blog/prichini-za-techove":            { title: "Най-чести причини за течове в покрива",                              description: "Локализиране и разбиране на най-честите причини за течове — повредени керемиди, стари обшивки, запушени улуци, спукана хидроизолация." },
  "blog/izbor-na-keremidi":              { title: "Как да изберете керемиди — Bramac, Tondach или Wienerberger",       description: "Сравнение на най-популярните марки керемиди в България. Издръжливост, цена, гаранция и подходящи приложения." },
  "blog/smyana-na-keremidi-rakavodstvo": { title: "Смяна на керемиди — Пълно ръководство стъпка по стъпка",            description: "Как се извършва смяна на керемиди — подготовка, инструменти, материали, цени и срокове. Когато е по-добре частична подмяна и кога пълна." },
  "blog/vidove-hidroizolacia":           { title: "Видове хидроизолация — PVC, битум, течна",                          description: "Сравнение на основните видове хидроизолация. Кога е най-добра PVC мембрана, кога битумна, кога течна хидроизолация." },
  "blog/podgotovka-na-pokriv-za-zima":   { title: "Подготовка на покрива за зима — 10 задължителни стъпки",            description: "Как да подготвите покрива си за зимата. Проверка на улуци, керемиди, обшивки и хидроизолация преди студения сезон." },
  "blog/proletni-prikladni-ogled":       { title: "Пролетен оглед на покрив — Какво да проверите",                     description: "След зимата покривът има нужда от детайлен оглед. Какви щети търсим и кога е време за ремонт." },
  "blog/podderzhka-rakavodstvo":         { title: "Поддръжка на покрив — Годишен план за дълготрайност",               description: "Превенцията струва 10 пъти по-малко от ремонта. Годишен план за поддръжка на покрив — почистване, оглед, дребни ремонти." },
  "blog/chesti-greshki":                 { title: "10 чести грешки при ремонт на покрив",                              description: "Грешки, които струват скъпо: неподходящи материали, пропуски в хидроизолацията, лоша вентилация. Как да ги избегнете." },
  "blog/cena-remont-pokriv-varna":       { title: "Цена за ремонт на покрив във Варна 2026 — Реални оферти",          description: "Колко струва ремонтът на покрив във Варна през 2026 г.? Реални цени по тип услуга, материали и обем." },
};

const LANG_META = {
  bg: { locale: "bg_BG", htmlLang: "bg",    title: "Ремонт на Покриви Варна — Безплатен Оглед 24ч | 089 397 1873", desc: "Професионален ремонт, хидроизолация и монтаж на покриви във Варна. 15+ години опит, до 15г писмена гаранция, безплатен оглед до 24ч. ☎ 089 397 1873" },
  en: { locale: "en_GB", htmlLang: "en",    title: "Roof Repair Varna Bulgaria — Free 24h Inspection | +359 89 397 1873", desc: "Professional roof repair, waterproofing and new roof installation in Varna, Bulgaria. 15+ years experience, 15-year written warranty, free inspection within 24h." },
  de: { locale: "de_DE", htmlLang: "de",    title: "Dachreparatur Varna Bulgarien — Kostenlose 24h Inspektion", desc: "Professionelle Dachreparatur, Abdichtung und Neueindeckung in Varna, Bulgarien. 15+ Jahre Erfahrung, 15 Jahre schriftliche Garantie, kostenlose Inspektion innerhalb 24h." },
  fr: { locale: "fr_FR", htmlLang: "fr",    title: "Réparation Toiture Varna Bulgarie — Inspection gratuite 24h", desc: "Réparation professionnelle de toiture, étanchéité et nouvelle toiture à Varna, Bulgarie. 15+ ans d'expérience, garantie écrite 15 ans, inspection gratuite sous 24h." },
  nl: { locale: "nl_NL", htmlLang: "nl",    title: "Dakreparatie Varna Bulgarije — Gratis inspectie binnen 24u", desc: "Professionele dakreparatie, waterdichting en nieuwbouw in Varna, Bulgarije. 15+ jaar ervaring, 15 jaar schriftelijke garantie, gratis inspectie binnen 24u." },
  fi: { locale: "fi_FI", htmlLang: "fi",    title: "Kattokorjaus Varna Bulgaria — Ilmainen tarkastus 24h", desc: "Ammattimainen kattokorjaus, vedeneristys ja uudisrakentaminen Varnassa, Bulgariassa. 15+ vuoden kokemus, 15 vuoden kirjallinen takuu, ilmainen tarkastus 24h." },
  sv: { locale: "sv_SE", htmlLang: "sv",    title: "Takreparation Varna Bulgarien — Gratis inspektion inom 24h", desc: "Professionell takreparation, tätning och nybyggnation i Varna, Bulgarien. 15+ års erfarenhet, 15 års skriftlig garanti, gratis inspektion inom 24h." },
  no: { locale: "nb_NO", htmlLang: "no",    title: "Takreparasjon Varna Bulgaria — Gratis inspeksjon innen 24t", desc: "Profesjonell takreparasjon, vanntetting og nybygg i Varna, Bulgaria. 15+ års erfaring, 15 års skriftlig garanti, gratis inspeksjon innen 24t." },
  ru: { locale: "ru_RU", htmlLang: "ru",    title: "Ремонт крыши Варна Болгария — Бесплатный осмотр 24ч", desc: "Профессиональный ремонт крыш, гидроизоляция и монтаж новых крыш в Варне, Болгария. 15+ лет опыта, письменная гарантия 15 лет, бесплатный осмотр в течение 24ч." },
  ua: { locale: "uk_UA", htmlLang: "uk",    title: "Ремонт даху Варна Болгарія — Безкоштовний огляд 24год", desc: "Професійний ремонт дахів, гідроізоляція та монтаж нових дахів у Варні, Болгарія. 15+ років досвіду, письмова гарантія 15 років, безкоштовний огляд 24год." },
};

const SERVICE_SLUGS_BY_LANG = {
  bg: { roofRepair: "remont-na-pokrivi", leakRepair: "remont-na-techove-pokriv", waterproofing: "hidroizolacia-na-pokriv", newRoof: "nov-pokriv", tileRoofRepair: "remont-na-keremideni-pokrivi", flatRoof: "remont-na-ploski-pokrivi", metalRoof: "metalni-pokrivi", maintenance: "poddruzhka-na-pokrivi" },
  en: { roofRepair: "roof-repair-varna", leakRepair: "roof-leak-repair", waterproofing: "roof-waterproofing", newRoof: "new-roof-construction", tileRoofRepair: "tile-roof-repair-varna", flatRoof: "flat-roof-repair", metalRoof: "metal-roof-installation", maintenance: "roof-maintenance" },
  de: { roofRepair: "dachreparatur-varna", leakRepair: "leckage-reparatur-varna", waterproofing: "abdichtung-varna", newRoof: "neues-dach-varna", tileRoofRepair: "ziegelreparatur-varna", flatRoof: "flachdaecher-varna", metalRoof: "metalldaecher-varna", maintenance: "dachpflege-varna" },
  fr: { roofRepair: "reparation-toiture-varna", leakRepair: "reparation-fuite-varna", waterproofing: "etancheite-varna", newRoof: "nouvelle-toiture-varna", tileRoofRepair: "reparation-tuiles-varna", flatRoof: "toits-plats-varna", metalRoof: "toits-metalliques-varna", maintenance: "entretien-toiture-varna" },
  nl: { roofRepair: "dakreparatie-varna", leakRepair: "lekkage-reparatie-varna", waterproofing: "waterdichting-varna", newRoof: "nieuw-dak-varna", tileRoofRepair: "dakpanreparatie-varna", flatRoof: "platte-daken-varna", metalRoof: "metalen-daken-varna", maintenance: "dakonderhoud-varna" },
  fi: { roofRepair: "kattokorjaus-varna", leakRepair: "vuotokorjaus-varna", waterproofing: "vedeneristys-varna", newRoof: "uusi-katto-varna", tileRoofRepair: "tiilikattokorjaus-varna", flatRoof: "tasakatot-varna", metalRoof: "metallikatot-varna", maintenance: "katon-huolto-varna" },
  sv: { roofRepair: "takreparation-varna", leakRepair: "lackage-reparation-varna", waterproofing: "tatning-varna", newRoof: "nytt-tak-varna", tileRoofRepair: "tegelreparation-varna", flatRoof: "platta-tak-varna", metalRoof: "metalltak-varna", maintenance: "takunderhall-varna" },
  no: { roofRepair: "takreparasjon-varna", leakRepair: "lekkasje-reparasjon-varna", waterproofing: "vanntetting-varna", newRoof: "nytt-tak-varna", tileRoofRepair: "teglreparasjon-varna", flatRoof: "flate-tak-varna", metalRoof: "metalltak-varna", maintenance: "takvedlikehold-varna" },
  ru: { roofRepair: "remont-kryshi-varna", leakRepair: "remont-protechek-varna", waterproofing: "gidroizolyatsiya-varna", newRoof: "novaya-krysha-varna", tileRoofRepair: "remont-cherepichnoj-kryshi-varna", flatRoof: "ploskie-kryshi-varna", metalRoof: "metallicheskie-kryshi-varna", maintenance: "obsluzhivanie-kryshi-varna" },
  ua: { roofRepair: "remont-dahu-varna", leakRepair: "remont-protikan-varna", waterproofing: "gidroizolyatsiya-varna", newRoof: "novyj-dah-varna", tileRoofRepair: "remont-cherepychnogo-dahu-varna", flatRoof: "ploski-dahy-varna", metalRoof: "metalevi-dahy-varna", maintenance: "obslugovuvannya-dahu-varna" },
};

const escapeHtml = (s) =>
  s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// ── Route enumeration ───────────────────────────────────────────────────────
function buildRoutes() {
  /** @type {{ urlPath: string; title: string; description: string; locale: string; htmlLang: string; critical: boolean; kind: string }[]} */
  const routes = [];

  // BG — full coverage
  routes.push({ urlPath: "/bg", title: LANG_META.bg.title, description: LANG_META.bg.desc, locale: LANG_META.bg.locale, htmlLang: "bg", critical: true, kind: "home" });

  for (const [, city] of Object.entries(CITIES_BG)) {
    const cityCritical = city.slug === "varna";
    routes.push({
      urlPath: `/bg/${city.slug}`,
      title: `Ремонт на Покриви ${city.nameBg} — Безплатен Оглед 24ч | 089 397 1873`,
      description: `Професионален ремонт на покриви в ${city.nameBg} — хидроизолация, нови покриви, ремонт на течове. Безплатен оглед, 15 години писмена гаранция. Тел: 089 397 1873.`,
      locale: LANG_META.bg.locale, htmlLang: "bg", critical: cityCritical, kind: "city-home",
    });
    for (const [serviceSlug, svc] of Object.entries(SERVICES_BG)) {
      routes.push({
        urlPath: `/bg/${city.slug}/${serviceSlug}`,
        title: `${svc.titlePrefix} ${city.nameBg} — Безплатен Оглед 24ч | 089 397 1873`,
        description: svc.metaTpl.replace(/\{city\}/g, city.nameBg),
        locale: LANG_META.bg.locale, htmlLang: "bg", critical: cityCritical, kind: "city-service",
      });
    }
  }

  // Cities served without dedicated service sub-pages (city landing page only)
  routes.push({
    urlPath: "/bg/sofia",
    title: "Ремонт на покриви София | Покривни услуги",
    description: "Ремонт на покриви в София — отстраняване на течове, подмяна на керемиди, хидроизолация на тераси и плоски покриви, нов покрив. Оглед, писмена оферта и до 15 години гаранция.",
    locale: LANG_META.bg.locale, htmlLang: "bg", critical: true, kind: "city-home",
  });
  routes.push({
    urlPath: "/bg/plovdiv",
    title: "Ремонт на покриви Пловдив | Покривни услуги",
    description: "Покривни услуги в Пловдив — ремонт на керемиден покрив, спиране на течове, дървена конструкция, хидроизолация и нов покрив. Оглед на място, количества и писмена оферта.",
    locale: LANG_META.bg.locale, htmlLang: "bg", critical: true, kind: "city-home",
  });

  for (const [slug, meta] of Object.entries(GLOBAL_BG)) {
    routes.push({ urlPath: `/bg/${slug}`, title: meta.title, description: meta.description, locale: LANG_META.bg.locale, htmlLang: "bg", critical: false, kind: "global" });
  }
  for (const [slug, meta] of Object.entries(BLOG_BG)) {
    routes.push({ urlPath: `/bg/${slug}`, title: meta.title, description: meta.description, locale: LANG_META.bg.locale, htmlLang: "bg", critical: false, kind: "blog" });
  }

  // Other languages — homepage + varna home + all 8 services in varna
  for (const [lng, m] of Object.entries(LANG_META)) {
    if (lng === "bg") continue;
    routes.push({ urlPath: `/${lng}`, title: m.title, description: m.desc, locale: m.locale, htmlLang: m.htmlLang, critical: false, kind: "home" });
    routes.push({ urlPath: `/${lng}/varna`, title: m.title, description: m.desc, locale: m.locale, htmlLang: m.htmlLang, critical: false, kind: "city-home" });
    const slugs = SERVICE_SLUGS_BY_LANG[lng] || {};
    for (const svc of Object.keys(slugs)) {
      routes.push({
        urlPath: `/${lng}/varna/${slugs[svc]}`,
        title: m.title,
        description: m.desc,
        locale: m.locale, htmlLang: m.htmlLang, critical: false, kind: "city-service",
      });
    }
  }

  return routes;
}

// ── Meta-only stub fallback (previous behavior) ────────────────────────────
function rewriteHead(html, { urlPath, title, description, locale, htmlLang }) {
  const canonical = `${BASE_URL}${urlPath}`;
  const ogTitle = title.replace(/ \| 089 397 1873$/, "");
  if (htmlLang) html = html.replace(/<html\s+lang="[^"]*"/i, `<html lang="${htmlLang}"`);
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(title)}</title>`);
  html = html.replace(/<meta\s+name="description"[^>]*\/?>/i, `<meta name="description" content="${escapeHtml(description)}" />`);
  html = html.replace(/<meta\s+property="og:title"[^>]*\/?>/i, `<meta property="og:title" content="${escapeHtml(ogTitle)}" />`);
  html = html.replace(/<meta\s+property="og:description"[^>]*\/?>/i, `<meta property="og:description" content="${escapeHtml(description)}" />`);
  if (locale) html = html.replace(/<meta\s+property="og:locale"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:locale" content="${locale}" />`);
  html = html.replace(/<meta\s+name="twitter:title"[^>]*\/?>/i, `<meta name="twitter:title" content="${escapeHtml(ogTitle)}" />`);
  html = html.replace(/<meta\s+name="twitter:description"[^>]*\/?>/i, `<meta name="twitter:description" content="${escapeHtml(description)}" />`);
  const inject =
    `    <link rel="canonical" href="${canonical}" />\n` +
    `    <meta property="og:url" content="${canonical}" />\n`;
  html = html.replace(/<\/head>/i, `${inject}  </head>`);
  return html;
}

// ── Static file server with SPA fallback ────────────────────────────────────
const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js":   "application/javascript; charset=utf-8",
  ".mjs":  "application/javascript; charset=utf-8",
  ".css":  "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg":  "image/svg+xml",
  ".png":  "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg",
  ".webp": "image/webp", ".ico": "image/x-icon",
  ".woff": "font/woff", ".woff2": "font/woff2",
  ".map":  "application/json",
  ".txt":  "text/plain; charset=utf-8",
  ".xml":  "application/xml; charset=utf-8",
};

function startServer() {
  const server = http.createServer(async (req, res) => {
    try {
      const url = new URL(req.url, LOCAL_BASE);
      let filePath = path.join(DIST, decodeURIComponent(url.pathname));
      // Directory → index.html
      try {
        const stat = await fs.stat(filePath);
        if (stat.isDirectory()) filePath = path.join(filePath, "index.html");
      } catch { /* not found → SPA fallback below */ }

      // SPA fallback: any missing HTML-like path serves dist/index.html
      if (!existsSync(filePath)) {
        const isAssetLike = /\.[a-z0-9]{2,5}$/i.test(url.pathname);
        if (isAssetLike && !url.pathname.endsWith(".html")) {
          res.writeHead(404); res.end("not found"); return;
        }
        filePath = path.join(DIST, "index.html");
      }
      const ext = path.extname(filePath).toLowerCase();
      res.writeHead(200, { "Content-Type": MIME[ext] || "application/octet-stream" });
      createReadStream(filePath).pipe(res);
    } catch (err) {
      res.writeHead(500); res.end(String(err));
    }
  });
  return new Promise((resolve, reject) => {
    server.on("error", reject);
    server.listen(LOCAL_PORT, "127.0.0.1", () => resolve(server));
  });
}

// ── Puppeteer render for one URL ───────────────────────────────────────────
async function renderOne(browser, route) {
  const url = `${LOCAL_BASE}${route.urlPath}`;
  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(NAV_TIMEOUT_MS);

  // Block third-party analytics — they should never delay prerender.
  const blockPatterns = [
    "googletagmanager.com", "google-analytics.com", "clarity.ms",
    "doubleclick.net", "googleadservices.com", "google.com/ads",
    "connect.facebook.net", "hotjar.com",
  ];
  await page.setRequestInterception(true);
  page.on("request", (r) => {
    const u = r.url();
    if (blockPatterns.some((p) => u.includes(p))) return r.abort();
    return r.continue();
  });

  try {
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: NAV_TIMEOUT_MS });

    // Wait for the app's explicit readiness signal.
    await page.waitForFunction(
      () => document.documentElement.getAttribute("data-prerender-ready") === "true",
      { timeout: READY_TIMEOUT_MS, polling: 100 },
    );

    // Validate DOM content.
    const audit = await page.evaluate(() => {
      const q = (sel) => document.querySelector(sel);
      const qAll = (sel) => document.querySelectorAll(sel);
      const h1 = q("h1");
      const canonical = q('link[rel="canonical"]');
      const hreflang = qAll('link[rel="alternate"][hreflang]');
      const jsonLd = qAll('script[type="application/ld+json"]');
      const main = q("main") || q("article") || document.body;
      const bodyText = (main.innerText || "").replace(/\s+/g, " ").trim();
      const internalLinks = (main.querySelectorAll ? main.querySelectorAll('a[href^="/"]') : qAll('main a[href^="/"]'));
      const imagesInMain = Array.from(main.querySelectorAll ? main.querySelectorAll("img") : qAll("main img"));
      const brokenImg = imagesInMain.find(
        (i) => !i.getAttribute("src") || !i.getAttribute("alt"),
      );
      let jsonLdParseOk = true;
      jsonLd.forEach((s) => {
        try { JSON.parse(s.textContent || ""); } catch { jsonLdParseOk = false; }
      });
      return {
        h1Text: h1 ? (h1.textContent || "").trim() : "",
        canonicalHref: canonical ? canonical.getAttribute("href") : null,
        hreflangCount: hreflang.length,
        jsonLdCount: jsonLd.length,
        jsonLdParseOk,
        bodyLength: bodyText.length,
        internalLinkCount: internalLinks.length,
        brokenImgSrc: brokenImg ? (brokenImg.outerHTML.slice(0, 100)) : null,
      };
    });

    const failures = [];
    if (!audit.h1Text || audit.h1Text.length < 10) failures.push("no-h1");
    if (!audit.canonicalHref) failures.push("no-canonical");
    if (audit.hreflangCount < 5) failures.push(`weak-hreflang(${audit.hreflangCount})`);
    if (audit.jsonLdCount < 1) failures.push("no-json-ld");
    if (!audit.jsonLdParseOk) failures.push("json-ld-parse-error");
    if (audit.bodyLength < 800) failures.push(`thin-body(${audit.bodyLength})`);
    if (audit.internalLinkCount < 5) failures.push(`few-links(${audit.internalLinkCount})`);
    if (audit.brokenImgSrc) failures.push("broken-image");

    if (failures.length) {
      return { ok: false, route, audit, reason: failures.join(",") };
    }

    const html = await page.content();
    return { ok: true, route, audit, html };
  } catch (err) {
    return { ok: false, route, reason: err.message || String(err) };
  } finally {
    try { await page.close(); } catch { /* ignore */ }
  }
}

// ── Concurrency pool ───────────────────────────────────────────────────────
async function runPool(items, worker, concurrency) {
  const results = [];
  let idx = 0;
  async function next() {
    while (idx < items.length) {
      const my = idx++;
      results[my] = await worker(items[my], my);
    }
  }
  const workers = Array.from({ length: concurrency }, () => next());
  await Promise.all(workers);
  return results;
}

// ── Write output for one route ─────────────────────────────────────────────
async function writeRouteOutput(route, html) {
  const outDir = path.join(DIST, route.urlPath.replace(/^\//, ""));
  await fs.mkdir(outDir, { recursive: true });
  await fs.writeFile(path.join(outDir, "index.html"), html, "utf8");
}

// ── Main ───────────────────────────────────────────────────────────────────
async function main() {
  const indexPath = path.join(DIST, "index.html");
  const template = await fs.readFile(indexPath, "utf8");
  const routes = buildRoutes();

  console.log(`[prerender] ${routes.length} routes; base=${BASE_URL}`);

  // Try to load puppeteer + Chromium. If missing → fallback to meta stubs only.
  let puppeteer;
  let browser;
  try {
    puppeteer = (await import("puppeteer")).default;
    browser = await puppeteer.launch({
      headless: "new",
      args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"],
    });
  } catch (err) {
    console.warn(
      "\n[prerender] ⚠  Chromium not available — falling back to META-ONLY stubs.\n" +
      `           Reason: ${err.message}\n` +
      "           Run `bunx puppeteer browsers install chrome` and rebuild.\n"
    );
    let written = 0;
    for (const route of routes) {
      await writeRouteOutput(route, rewriteHead(template, route));
      written++;
    }
    await fs.writeFile(
      path.join(DIST, "prerender-report.json"),
      JSON.stringify({ mode: "meta-stub-fallback", written, chromiumError: err.message }, null, 2),
    );
    console.log(`[prerender] Wrote ${written} meta-only stubs (fallback).`);
    return;
  }

  const server = await startServer();
  console.log(`[prerender] Local server on ${LOCAL_BASE}, launching ${CONCURRENCY} pages…`);

  const t0 = Date.now();
  const results = await runPool(routes, (route) => renderOne(browser, route), CONCURRENCY);
  const durationMs = Date.now() - t0;

  await browser.close();
  server.close();

  // Write outputs — success → full HTML; failure → meta-only fallback stub.
  const succeeded = [];
  const failed = [];
  for (const r of results) {
    if (r.ok) {
      await writeRouteOutput(r.route, r.html);
      succeeded.push({ url: r.route.urlPath, kind: r.route.kind, bodyLength: r.audit.bodyLength });
    } else {
      await writeRouteOutput(r.route, rewriteHead(template, r.route));
      failed.push({ url: r.route.urlPath, kind: r.route.kind, critical: r.route.critical, reason: r.reason });
    }
  }

  const criticalFailed = failed.filter((f) => f.critical);

  const report = {
    generatedAt: new Date().toISOString(),
    baseUrl: BASE_URL,
    total: routes.length,
    succeeded: succeeded.length,
    failed: failed.length,
    criticalFailed: criticalFailed.length,
    durationMs,
    failures: failed,
  };
  await fs.writeFile(
    path.join(DIST, "prerender-report.json"),
    JSON.stringify(report, null, 2),
  );

  console.log(`\n[prerender] Report ─────────────────────────`);
  console.log(`  Total:            ${report.total}`);
  console.log(`  Prerendered OK:   ${report.succeeded}`);
  console.log(`  Failed:           ${report.failed}`);
  console.log(`  Critical failed:  ${report.criticalFailed}`);
  console.log(`  Duration:         ${(durationMs / 1000).toFixed(1)}s`);

  if (failed.length) {
    console.log("\n  Failed URLs:");
    for (const f of failed.slice(0, 20)) {
      console.log(`    ${f.critical ? "‼" : "·"} ${f.url}  — ${f.reason}`);
    }
    if (failed.length > 20) console.log(`    … +${failed.length - 20} more (see prerender-report.json)`);
  }

  if (criticalFailed.length > 0) {
    console.error(
      `\n[prerender] ✗ ${criticalFailed.length} CRITICAL route(s) failed to prerender.\n` +
      `            Aborting build.\n`,
    );
    process.exit(1);
  }

  console.log(`\n[prerender] ✓ Done.\n`);
}

main().catch((err) => {
  console.error("[prerender] fatal:", err);
  process.exit(1);
});
