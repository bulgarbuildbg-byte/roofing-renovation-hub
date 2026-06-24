#!/usr/bin/env node
/**
 * Post-build SEO prerender.
 *
 * Generates per-route static HTML stubs under dist/<route>/index.html with
 * route-specific <title>, meta description, canonical, og:* and twitter:*
 * tags. The body still bootstraps the SPA (same <div id="root"> + script tag
 * as dist/index.html) so users get the full React app — but link-preview
 * crawlers (Facebook, Messenger, Viber, LinkedIn, Slack) that don't run JS
 * now read accurate per-page metadata.
 *
 * Run automatically after `vite build` (see package.json `build` script).
 */
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DIST = path.join(ROOT, "dist");
const BASE_URL = "https://www.remontnapokrivivarna.bg";
const DEFAULT_OG_IMAGE = `${BASE_URL}/og-image.jpg`;

// ── Source data (mirrors src/i18n/cities.ts + src/data/cityServices.ts) ──────
const CITIES_BG = {
  varna:   { nameBg: "Варна",   slug: "varna"   },
  burgas:  { nameBg: "Бургас",  slug: "burgas"  },
  ruse:    { nameBg: "Русе",    slug: "ruse"    },
  dobrich: { nameBg: "Добрич",  slug: "dobrich" },
};

// service-slug → { titlePrefix, metaDescription (with {city}) }
const SERVICES_BG = {
  "remont-na-pokrivi": {
    titlePrefix: "Ремонт на Покриви",
    metaTpl: "Професионален ремонт на покриви в {city} — спиране на течове, смяна на керемиди, ламарина, хидроизолация. Безплатен оглед 24ч. Гаранция 15 г.",
  },
  "remont-na-techove-pokriv": {
    titlePrefix: "Ремонт на Течове на Покрив",
    metaTpl: "Спешен ремонт на течове на покрив в {city} — диагностика, локализиране и трайно отстраняване. Реакция същия ден. Гаранция 15 г.",
  },
  "hidroizolacia-na-pokriv": {
    titlePrefix: "Хидроизолация на Покрив",
    metaTpl: "Професионална хидроизолация на покриви и тераси в {city} — PVC мембрани, битумни системи, течна хидроизолация. Гаранция 15 г.",
  },
  "nov-pokriv": {
    titlePrefix: "Нов Покрив",
    metaTpl: "Изграждане на нови покриви в {city} — пълен цикъл: проектиране, конструкция, топло- и хидроизолация, покритие. Гаранция 15 г.",
  },
  "remont-na-keremideni-pokrivi": {
    titlePrefix: "Смяна на Керемиди",
    metaTpl: "Смяна и ремонт на керемидени покриви в {city} — Bramac, Tondach, Wienerberger. Частична или пълна подмяна. Гаранция 15 г.",
  },
  "remont-na-ploski-pokrivi": {
    titlePrefix: "Плоски Покриви",
    metaTpl: "Ремонт и хидроизолация на плоски покриви в {city} — PVC мембрани, битумни системи, топлоизолация. Гаранция 15 г.",
  },
  "metalni-pokrivi": {
    titlePrefix: "Метални Покриви",
    metaTpl: "Изграждане и ремонт на метални покриви в {city} — ламарина, фалцова ламарина, профилирани панели. Гаранция 15 г.",
  },
  "poddruzhka-na-pokrivi": {
    titlePrefix: "Поддръжка на Покриви",
    metaTpl: "Профилактика и поддръжка на покриви в {city} — годишен оглед, почистване на улуци, превенция на течове. Абонаментни планове от €199/год.",
  },
};

// Global (non-city) BG routes
const GLOBAL_BG = {
  "za-nas":                    { title: "За нас — Булгар Билд ЕООД | Ремонт на Покриви Варна",                       description: "Над 15 години опит в ремонт на покриви, хидроизолация и нови покриви. Сертифицирани специалисти, писмена гаранция 15 години. Базирани във Варна." },
  "kontakti":                  { title: "Контакти — Ремонт на Покриви Варна | 089 397 1873",                          description: "Свържете се с нас за безплатен оглед в рамките на 24ч. Телефон 089 397 1873. Работно време: Пон–Съб 08:00–18:00. Аварии 24/7." },
  "blog":                      { title: "Блог — Съвети за поддръжка и ремонт на покриви",                              description: "Експертни съвети за поддръжка, ремонт и хидроизолация на покриви. Реални цени, чести грешки, материали — от специалисти с 15+ години опит." },
  "vaprosi":                   { title: "Често задавани въпроси — Ремонт на покриви Варна",                             description: "Отговори на най-честите въпроси за цени, гаранции, материали, срокове и процес на ремонт на покрив. Над 15 години опит." },
  "kalkulator":                { title: "Калкулатор за ремонт на покрив — Безплатна онлайн оферта",                     description: "Изчислете ориентировъчна цена за ремонт на покрив, хидроизолация или нов покрив онлайн. 6 стъпки, точна оценка за минута." },
  "bezplaten-ogled":           { title: "Безплатен оглед на покрив — 24ч във Варна и региона | 089 397 1873",          description: "Заявете безплатен оглед на покрива. Идваме на адреса в рамките на 24 часа. Подробен фотодоклад и точна оферта без ангажимент." },
  "kak-rabotim":               { title: "Как работим — 5 стъпки от оглед до завършен ремонт",                           description: "Прозрачен процес в 5 стъпки: оглед, оферта, договор, изпълнение, гаранция. Писмена гаранция 15 години върху всеки ремонт." },
  "tseni-remont-pokriv":       { title: "Цени за ремонт на покрив 2026 — €4–€120/м² | Варна",                            description: "Реални пазарни цени за ремонт на покрив във Варна и региона 2026: ремонт от €4/м², хидроизолация от €12/м², нов покрив от €55/м²." },
  "proekti":                   { title: "Завършени проекти — Покривни ремонти Варна и регион",                          description: "Над 7 проверени проекта: жилищни сгради, офиси, ваканционни имоти. Снимки преди и след, описание на работата, реални резултати." },
  "otzyvi":                    { title: "Отзиви на клиенти — 4.9/5 от 127 ревюта",                                       description: "Реални отзиви на клиенти за нашите услуги — рейтинг 4.9/5 от 127 ревюта. Препоръки от собственици във Варна, Бургас, Русе, Добрич." },
  "services":                  { title: "Услуги — Ремонт, хидроизолация, нови покриви | Варна",                          description: "Пълен набор покривни услуги: ремонт, хидроизолация, нови покриви, смяна на керемиди, плоски и метални покриви, поддръжка, соларни системи." },
  "gradove":                   { title: "Градове, които обслужваме — Варна, Бургас, Русе, Добрич",                      description: "Покривни услуги във Варна, Бургас, Русе и Добрич. Бърз отговор, безплатен оглед в рамките на 24 часа, локален екип." },
  "zayavete-oferta":           { title: "Заявете оферта — Безплатна онлайн оферта за покрив",                            description: "Получете оферта за ремонт, хидроизолация или нов покрив. Безплатно, без ангажимент. Отговор в рамките на 24 часа." },
  "blagodarim-vi":             { title: "Благодарим Ви — Получихме Вашата заявка",                                       description: "Благодарим, че се свързахте с нас. Ще се свържем с Вас в рамките на 24 часа за да насрочим безплатен оглед." },
  "finansirane-remont-na-pokriv": { title: "Финансиране на ремонт на покрив — Гъвкави схеми на плащане",                  description: "Финансиране на ремонт на покрив с гъвкави условия. Стандартно разпределение 30/40/30, опция за разсрочено плащане. Без скрити такси." },
  "solarni-sistemi":           { title: "Соларни системи за дома и бизнеса — Варна и региона",                          description: "Проектиране и монтаж на соларни системи за къщи, блокове и индустриални обекти. Тинков софлуч, оптимална възвръщаемост." },
  "solarni-sistemi-za-kashta": { title: "Соларни системи за къща — Енергийна независимост",                              description: "Соларни панели за еднофамилни къщи във Варна и региона. Безплатна оценка, бърз монтаж, държавно финансиране." },
  "solarni-sistemi-za-blokove":{ title: "Соларни системи за блокове и сгради — Колективни системи",                      description: "Колективни соларни системи за жилищни блокове и обществени сгради. Намаление на сметките за общи части." },
  "solarni-centrali":          { title: "Соларни централи — Индустриални и комерсиални проекти",                         description: "Изграждане на соларни централи за индустриални клиенти, ферми и парк-зони. Под ключ — от проект до експлоатация." },
};

// Blog posts (BG)
const BLOG_BG = {
  "blog/priznazi-za-remont-na-pokriv":          { title: "7 признака, че покривът Ви се нуждае от ремонт",                  description: "Кога точно трябва да повикате специалист? Запознайте се с 7-те най-явни признака — от петна по тавана до изместени керемиди." },
  "blog/prichini-za-techove":                   { title: "Най-чести причини за течове в покрива",                              description: "Локализиране и разбиране на най-честите причини за течове — повредени керемиди, стари обшивки, запушени улуци, спукана хидроизолация." },
  "blog/izbor-na-keremidi":                     { title: "Как да изберете керемиди — Bramac, Tondach или Wienerberger",       description: "Сравнение на най-популярните марки керемиди в България. Издръжливост, цена, гаранция и подходящи приложения." },
  "blog/smyana-na-keremidi-rakavodstvo":        { title: "Смяна на керемиди — Пълно ръководство стъпка по стъпка",            description: "Как се извършва смяна на керемиди — подготовка, инструменти, материали, цени и срокове. Когато е по-добре частична подмяна и кога пълна." },
  "blog/vidove-hidroizolacia":                  { title: "Видове хидроизолация — PVC, битум, течна",                          description: "Сравнение на основните видове хидроизолация. Кога е най-добра PVC мембрана, кога битумна, кога течна хидроизолация." },
  "blog/podgotovka-na-pokriv-za-zima":          { title: "Подготовка на покрива за зима — 10 задължителни стъпки",            description: "Как да подготвите покрива си за зимата. Проверка на улуци, керемиди, обшивки и хидроизолация преди студения сезон." },
  "blog/proletni-prikladni-ogled":              { title: "Пролетен оглед на покрив — Какво да проверите",                     description: "След зимата покривът има нужда от детайлен оглед. Какви щети търсим и кога е време за ремонт." },
  "blog/podderzhka-rakavodstvo":                { title: "Поддръжка на покрив — Годишен план за дълготрайност",               description: "Превенцията струва 10 пъти по-малко от ремонта. Годишен план за поддръжка на покрив — почистване, оглед, дребни ремонти." },
  "blog/chesti-greshki":                        { title: "10 чести грешки при ремонт на покрив",                              description: "Грешки, които струват скъпо: неподходящи материали, пропуски в хидроизолацията, лоша вентилация. Как да ги избегнете." },
  "blog/cena-remont-pokriv-varna":              { title: "Цена за ремонт на покрив във Варна 2026 — Реални оферти",          description: "Колко струва ремонтът на покрив във Варна през 2026 г.? Реални цени по тип услуга, материали и обем." },
};

// ── Helpers ──────────────────────────────────────────────────────────────────
const escapeHtml = (s) =>
  s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function buildRoutes() {
  /** @type {{ urlPath: string; title: string; description: string }[]} */
  const routes = [];

  // /bg root → same as homepage
  routes.push({
    urlPath: "/bg",
    title: "Ремонт на Покриви Варна — Безплатен Оглед 24ч | 089 397 1873",
    description: "Професионален ремонт, хидроизолация и монтаж на покриви във Варна. 15+ години опит, до 15г писмена гаранция, безплатен оглед до 24ч. ☎ 089 397 1873",
  });

  // City homes + city × service
  for (const [, city] of Object.entries(CITIES_BG)) {
    routes.push({
      urlPath: `/bg/${city.slug}`,
      title: `Ремонт на Покриви ${city.nameBg} — Безплатен Оглед 24ч | 089 397 1873`,
      description: `Професионален ремонт на покриви в ${city.nameBg} — хидроизолация, нови покриви, ремонт на течове. Безплатен оглед, 15 години писмена гаранция. Тел: 089 397 1873.`,
    });
    for (const [serviceSlug, svc] of Object.entries(SERVICES_BG)) {
      routes.push({
        urlPath: `/bg/${city.slug}/${serviceSlug}`,
        title: `${svc.titlePrefix} ${city.nameBg} — Безплатен Оглед 24ч | 089 397 1873`,
        description: svc.metaTpl.replace(/\{city\}/g, city.nameBg),
      });
    }
  }

  // Global BG pages
  for (const [slug, meta] of Object.entries(GLOBAL_BG)) {
    routes.push({ urlPath: `/bg/${slug}`, title: meta.title, description: meta.description });
  }

  // Blog posts
  for (const [slug, meta] of Object.entries(BLOG_BG)) {
    routes.push({ urlPath: `/bg/${slug}`, title: meta.title, description: meta.description });
  }

  return routes;
}

function rewriteHead(html, { urlPath, title, description }) {
  const canonical = `${BASE_URL}${urlPath}`;
  const ogTitle = title.replace(/ \| 089 397 1873$/, ""); // trim phone tail for social cards

  // Replace <title>
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(title)}</title>`);

  // Replace name="description"
  html = html.replace(
    /<meta\s+name="description"[^>]*\/?>/i,
    `<meta name="description" content="${escapeHtml(description)}" />`
  );

  // Replace og:title / og:description / og:url
  html = html.replace(
    /<meta\s+property="og:title"[^>]*\/?>/i,
    `<meta property="og:title" content="${escapeHtml(ogTitle)}" />`
  );
  html = html.replace(
    /<meta\s+property="og:description"[^>]*\/?>/i,
    `<meta property="og:description" content="${escapeHtml(description)}" />`
  );

  // Twitter
  html = html.replace(
    /<meta\s+name="twitter:title"[^>]*\/?>/i,
    `<meta name="twitter:title" content="${escapeHtml(ogTitle)}" />`
  );
  html = html.replace(
    /<meta\s+name="twitter:description"[^>]*\/?>/i,
    `<meta name="twitter:description" content="${escapeHtml(description)}" />`
  );

  // Insert canonical + og:url right before </head> (no existing canonical in index.html)
  const inject =
    `    <link rel="canonical" href="${canonical}" />\n` +
    `    <meta property="og:url" content="${canonical}" />\n`;
  html = html.replace(/<\/head>/i, `${inject}  </head>`);

  return html;
}

async function main() {
  const indexPath = path.join(DIST, "index.html");
  let template;
  try {
    template = await fs.readFile(indexPath, "utf8");
  } catch (err) {
    console.error(`[prerender-seo] cannot read ${indexPath}: ${err.message}`);
    process.exit(1);
  }

  const routes = buildRoutes();
  let written = 0;
  for (const route of routes) {
    const html = rewriteHead(template, route);
    const outDir = path.join(DIST, route.urlPath.replace(/^\//, ""));
    await fs.mkdir(outDir, { recursive: true });
    await fs.writeFile(path.join(outDir, "index.html"), html, "utf8");
    written++;
  }
  console.log(`[prerender-seo] wrote ${written} per-route HTML stubs.`);
}

main().catch((err) => {
  console.error("[prerender-seo] failed:", err);
  process.exit(1);
});
