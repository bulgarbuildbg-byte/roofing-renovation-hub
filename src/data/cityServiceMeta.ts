import type { RouteKey } from "@/i18n/routes";
import type { SupportedLanguage } from "@/i18n/config";

/**
 * Per-language SEO metadata for city × service pages.
 *
 * The visible BG copy stays in `cityServices.ts` (single source of truth for
 * benefits, FAQs, hero images). This file ONLY localizes the strings that
 * crawlers and OG previews read: title prefix + meta description.
 *
 * Final title = `${titlePrefix} ${cityName}${titleSuffix}`.
 * `{city}` in description is replaced with the localized city name at render.
 */

export interface ServiceMeta {
  titlePrefix: string;
  description: string;
  h1Prefix?: string;
  heroSubtitle?: string;
}

export interface LangMeta {
  titleSuffix: string;
  /** Used as og:site_name and breadcrumb root. */
  siteNameSuffix: string;
  services: Partial<Record<RouteKey, ServiceMeta>>;
}

const PHONE = "089 397 1873";

/** Service-level meta per language. BG entries are used only as comments;
 *  at runtime the BG path keeps reading directly from `cityServices.ts`. */
export const CITY_SERVICE_META: Record<SupportedLanguage, LangMeta> = {
  bg: {
    titleSuffix: ` — Безплатен Оглед 24ч | ${PHONE}`,
    siteNameSuffix: "Ремонт на Покриви",
    services: {},
  },
  en: {
    titleSuffix: ` — Free Inspection 24h | ${PHONE}`,
    siteNameSuffix: "Roof Repair",
    services: {
      roofRepair: { titlePrefix: "Roof Repair", h1Prefix: "Roof Repair", description: "Professional roof repair in {city} — leak stopping, tile replacement, sheet metal, waterproofing. Free inspection 24h. 15-year written warranty.", heroSubtitle: "We stop leaks, replace damaged tiles, repair gutters and flashings. Contract work with 15-year written warranty." },
      leakRepair: { titlePrefix: "Roof Leak Repair", h1Prefix: "Roof Leak Repair", description: "Emergency roof leak repair in {city} — diagnostics, localization and lasting fix. Same-day response. 15-year warranty.", heroSubtitle: "Fast same-day response, thermal-camera diagnostics, lasting repairs with written warranty." },
      waterproofing: { titlePrefix: "Roof Waterproofing", h1Prefix: "Roof Waterproofing", description: "Professional waterproofing in {city} — bitumen, PVC membrane, liquid coatings. 15-year written warranty. Free inspection 24h.", heroSubtitle: "Bitumen, PVC membrane and liquid waterproofing systems with a 15-year written warranty." },
      newRoof: { titlePrefix: "New Roof Construction", h1Prefix: "New Roof Construction", description: "Building new roofs in {city} — wooden structure, insulation, waterproofing, tiles or sheet metal. 15-year warranty.", heroSubtitle: "Full new-roof projects: timber structure, insulation, waterproofing and roof covering." },
      tileRoofRepair: { titlePrefix: "Tile Roof Repair", h1Prefix: "Tile Roof Repair", description: "Tile replacement and repair in {city} — ceramic and concrete tiles. From €4/tile. 15-year warranty.", heroSubtitle: "Fast replacement of broken or shifted tiles using certified ceramic and concrete brands." },
      flatRoof: { titlePrefix: "Flat Roof Repair", h1Prefix: "Flat Roof Repair", description: "Flat roof and terrace waterproofing in {city}. PVC membrane, bitumen and liquid systems. 15-year warranty.", heroSubtitle: "Specialist repair and waterproofing for flat roofs, terraces and balconies." },
      metalRoof: { titlePrefix: "Metal Roof Installation", h1Prefix: "Metal Roof Installation", description: "Sheet-metal roofing in {city} — galvanized and polymer coated. Up to 50-year warranty. Free inspection.", heroSubtitle: "Galvanized and polymer-coated sheet metal roofs with up to 50-year corrosion warranty." },
      maintenance: { titlePrefix: "Roof Maintenance", h1Prefix: "Roof Maintenance", description: "Annual roof maintenance plans in {city} — inspections, cleaning, preventive repairs. From €30.", heroSubtitle: "Annual maintenance plans that extend roof life by up to 50%." },
    },
  },
  de: {
    titleSuffix: ` — Kostenlose Inspektion 24h | ${PHONE}`,
    siteNameSuffix: "Dachreparatur",
    services: {
      roofRepair: { titlePrefix: "Dachreparatur", h1Prefix: "Dachreparatur", description: "Professionelle Dachreparatur in {city} — Leckabdichtung, Ziegelaustausch, Bleche, Abdichtung. Kostenlose Inspektion 24h. 15 Jahre schriftliche Garantie.", heroSubtitle: "Wir beheben Lecks, ersetzen Ziegel, reparieren Dachrinnen und Verblechungen. Vertragsarbeit mit 15 Jahren Garantie." },
      leakRepair: { titlePrefix: "Leckage-Reparatur", h1Prefix: "Leckage-Reparatur", description: "Notfall-Leckreparatur am Dach in {city} — Diagnose, Lokalisierung und dauerhafte Behebung. Reaktion am selben Tag. 15 Jahre Garantie.", heroSubtitle: "Schnelle Reaktion am selben Tag, Wärmebildkamera-Diagnose, dauerhafte Reparatur mit Garantie." },
      waterproofing: { titlePrefix: "Dachabdichtung", h1Prefix: "Dachabdichtung", description: "Professionelle Dachabdichtung in {city} — Bitumen, PVC-Membran, Flüssigabdichtung. 15 Jahre schriftliche Garantie.", heroSubtitle: "Bitumen-, PVC-Membran- und Flüssigabdichtungssysteme mit 15 Jahren schriftlicher Garantie." },
      newRoof: { titlePrefix: "Neubau Dach", h1Prefix: "Neues Dach", description: "Neubau von Dächern in {city} — Holzkonstruktion, Dämmung, Abdichtung, Ziegel oder Blech. 15 Jahre Garantie.", heroSubtitle: "Komplette Neudach-Projekte: Holzkonstruktion, Dämmung, Abdichtung und Dacheindeckung." },
      tileRoofRepair: { titlePrefix: "Ziegelreparatur", h1Prefix: "Ziegelreparatur", description: "Ziegelaustausch und -reparatur in {city} — Keramik- und Betonziegel. Ab €4/Stück. 15 Jahre Garantie.", heroSubtitle: "Schneller Austausch beschädigter oder verschobener Ziegel mit zertifizierten Marken." },
      flatRoof: { titlePrefix: "Flachdach-Reparatur", h1Prefix: "Flachdach-Reparatur", description: "Flachdach- und Terrassenabdichtung in {city}. PVC-Membran, Bitumen und Flüssigsysteme. 15 Jahre Garantie.", heroSubtitle: "Spezialisierte Reparatur und Abdichtung für Flachdächer, Terrassen und Balkone." },
      metalRoof: { titlePrefix: "Metalldächer", h1Prefix: "Metalldächer", description: "Blechdächer in {city} — verzinkt und polymerbeschichtet. Bis zu 50 Jahre Garantie. Kostenlose Inspektion.", heroSubtitle: "Verzinkte und polymerbeschichtete Metalldächer mit bis zu 50 Jahren Korrosionsgarantie." },
      maintenance: { titlePrefix: "Dachpflege", h1Prefix: "Dachpflege", description: "Jährliche Dachpflegepläne in {city} — Inspektion, Reinigung, vorbeugende Reparaturen. Ab €30.", heroSubtitle: "Jährliche Wartungspläne, die die Dachlebensdauer um bis zu 50% verlängern." },
    },
  },
  fi: {
    titleSuffix: ` — Ilmainen Tarkastus 24h | ${PHONE}`,
    siteNameSuffix: "Kattokorjaus",
    services: {
      roofRepair: { titlePrefix: "Kattokorjaus", h1Prefix: "Kattokorjaus", description: "Ammattimainen kattokorjaus {city} — vuotojen tukkiminen, tiilien vaihto, pellitykset, vedeneristys. Ilmainen tarkastus 24h. 15 vuoden takuu.", heroSubtitle: "Tukimme vuodot, vaihdamme tiilet ja korjaamme pellitykset. Sopimustyö 15 vuoden takuulla." },
      leakRepair: { titlePrefix: "Vuotokorjaus", h1Prefix: "Katon vuotokorjaus", description: "Hätävuotokorjaus {city} — diagnostiikka, paikannus ja kestävä korjaus. Vastaus saman päivän aikana. 15 vuoden takuu.", heroSubtitle: "Nopea vastaus saman päivän aikana, lämpökameradiagnostiikka, kestävät korjaukset takuulla." },
      waterproofing: { titlePrefix: "Vedeneristys", h1Prefix: "Katon vedeneristys", description: "Ammattimainen vedeneristys {city} — bitumi, PVC-kalvo, nestesovellutukset. 15 vuoden kirjallinen takuu.", heroSubtitle: "Bitumi-, PVC-kalvo- ja nestevedeneristysjärjestelmät 15 vuoden takuulla." },
      newRoof: { titlePrefix: "Uusi katto", h1Prefix: "Uuden katon rakentaminen", description: "Uusien kattojen rakentaminen {city} — puurakenne, eristys, vedeneristys, tiili tai pelti. 15 vuoden takuu.", heroSubtitle: "Täydet uudet kattoprojektit: puurakenne, eristys, vedeneristys ja katemateriaali." },
      tileRoofRepair: { titlePrefix: "Tiilikattokorjaus", h1Prefix: "Tiilikattokorjaus", description: "Tiilien vaihto ja korjaus {city} — keraamiset ja betonitiilet. Alkaen €4/kpl. 15 vuoden takuu.", heroSubtitle: "Nopea rikkoutuneiden tiilien vaihto sertifioidulla brändeillä." },
      flatRoof: { titlePrefix: "Tasakattojen korjaus", h1Prefix: "Tasakattojen korjaus", description: "Tasakattojen ja terassien vedeneristys {city}. PVC-kalvo, bitumi ja nestejärjestelmät. 15 vuoden takuu.", heroSubtitle: "Erikoiskorjaus ja vedeneristys tasakatoille, terasseille ja parvekkeille." },
      metalRoof: { titlePrefix: "Metallikatot", h1Prefix: "Metallikatot", description: "Peltikatot {city} — galvanoidut ja polymeeripinnoitetut. Jopa 50 vuoden takuu. Ilmainen tarkastus.", heroSubtitle: "Galvanoidut ja polymeeripinnoitetut metallikatot jopa 50 vuoden korroosiotakuulla." },
      maintenance: { titlePrefix: "Katon huolto", h1Prefix: "Katon huolto", description: "Vuosittaiset katon huoltosuunnitelmat {city} — tarkastukset, puhdistus, ennaltaehkäisevät korjaukset. Alkaen €30.", heroSubtitle: "Vuosittaiset huoltosuunnitelmat pidentävät katon käyttöikää jopa 50 %." },
    },
  },
  sv: {
    titleSuffix: ` — Gratis Inspektion 24h | ${PHONE}`,
    siteNameSuffix: "Takreparation",
    services: {
      roofRepair: { titlePrefix: "Takreparation", h1Prefix: "Takreparation", description: "Professionell takreparation i {city} — läckagestopp, tegelbyte, plåt, tätskikt. Gratis inspektion 24h. 15 års skriftlig garanti.", heroSubtitle: "Vi stoppar läckor, byter tegel och reparerar hängrännor. Avtalsarbete med 15 års garanti." },
      leakRepair: { titlePrefix: "Läckage-reparation", h1Prefix: "Takläckage-reparation", description: "Akut takläckage-reparation i {city} — diagnos, lokalisering och varaktig åtgärd. Svar samma dag. 15 års garanti.", heroSubtitle: "Snabbt svar samma dag, värmekamera-diagnos, varaktiga reparationer med garanti." },
      waterproofing: { titlePrefix: "Taktätning", h1Prefix: "Taktätning", description: "Professionell taktätning i {city} — bitumen, PVC-membran, flytande system. 15 års skriftlig garanti.", heroSubtitle: "Bitumen-, PVC-membran- och flytande tätskiktssystem med 15 års skriftlig garanti." },
      newRoof: { titlePrefix: "Nytt tak", h1Prefix: "Bygga nytt tak", description: "Bygga nya tak i {city} — träkonstruktion, isolering, tätning, tegel eller plåt. 15 års garanti.", heroSubtitle: "Kompletta nybyggnadsprojekt: träkonstruktion, isolering, tätskikt och takbeläggning." },
      tileRoofRepair: { titlePrefix: "Tegelreparation", h1Prefix: "Tegelreparation", description: "Tegelbyte och reparation i {city} — keramik och betong. Från €4/st. 15 års garanti.", heroSubtitle: "Snabbt byte av trasiga eller förskjutna tegelpannor med certifierade märken." },
      flatRoof: { titlePrefix: "Platta tak reparation", h1Prefix: "Reparation av platta tak", description: "Tätning av platta tak och terrasser i {city}. PVC-membran, bitumen och flytande system. 15 års garanti.", heroSubtitle: "Specialiserad reparation och tätning för platta tak, terrasser och balkonger." },
      metalRoof: { titlePrefix: "Metalltak", h1Prefix: "Metalltak", description: "Plåttak i {city} — galvaniserade och polymerbelagda. Upp till 50 års garanti. Gratis inspektion.", heroSubtitle: "Galvaniserade och polymerbelagda plåttak med upp till 50 års korrosionsgaranti." },
      maintenance: { titlePrefix: "Takunderhåll", h1Prefix: "Takunderhåll", description: "Årliga takunderhållsplaner i {city} — inspektioner, rengöring, förebyggande reparationer. Från €30.", heroSubtitle: "Årliga underhållsplaner som förlänger takets livslängd med upp till 50 %." },
    },
  },
  no: {
    titleSuffix: ` — Gratis Inspeksjon 24t | ${PHONE}`,
    siteNameSuffix: "Takreparasjon",
    services: {
      roofRepair: { titlePrefix: "Takreparasjon", h1Prefix: "Takreparasjon", description: "Profesjonell takreparasjon i {city} — lekkasjestopp, takstein bytte, beslag, tetting. Gratis inspeksjon 24t. 15 års skriftlig garanti.", heroSubtitle: "Vi stopper lekkasjer, bytter takstein og reparerer renner. Kontraktarbeid med 15 års garanti." },
      leakRepair: { titlePrefix: "Lekkasje-reparasjon", h1Prefix: "Taklekkasje-reparasjon", description: "Akutt taklekkasje-reparasjon i {city} — diagnose, lokalisering og varig løsning. Respons samme dag. 15 års garanti.", heroSubtitle: "Rask respons samme dag, varmekameradiagnose, varige reparasjoner med garanti." },
      waterproofing: { titlePrefix: "Vanntetting", h1Prefix: "Taktetting", description: "Profesjonell vanntetting i {city} — bitumen, PVC-membran, flytende systemer. 15 års skriftlig garanti.", heroSubtitle: "Bitumen-, PVC-membran- og flytende tetningssystemer med 15 års skriftlig garanti." },
      newRoof: { titlePrefix: "Nytt tak", h1Prefix: "Bygging av nytt tak", description: "Bygging av nye tak i {city} — trekonstruksjon, isolasjon, tetting, takstein eller plate. 15 års garanti.", heroSubtitle: "Komplette nye takprosjekter: trekonstruksjon, isolasjon, tetting og taktekking." },
      tileRoofRepair: { titlePrefix: "Teglreparasjon", h1Prefix: "Teglreparasjon", description: "Bytte og reparasjon av takstein i {city} — keramikk og betong. Fra €4/stk. 15 års garanti.", heroSubtitle: "Rask bytte av ødelagte takstein med sertifiserte merker." },
      flatRoof: { titlePrefix: "Flate tak reparasjon", h1Prefix: "Reparasjon av flate tak", description: "Tetting av flate tak og terrasser i {city}. PVC-membran, bitumen og flytende systemer. 15 års garanti.", heroSubtitle: "Spesialisert reparasjon og tetting for flate tak, terrasser og balkonger." },
      metalRoof: { titlePrefix: "Metalltak", h1Prefix: "Metalltak", description: "Platetak i {city} — galvaniserte og polymerbelagte. Opptil 50 års garanti. Gratis inspeksjon.", heroSubtitle: "Galvaniserte og polymerbelagte metalltak med opptil 50 års korrosjonsgaranti." },
      maintenance: { titlePrefix: "Takvedlikehold", h1Prefix: "Takvedlikehold", description: "Årlige takvedlikeholdsplaner i {city} — inspeksjoner, rengjøring, forebyggende reparasjoner. Fra €30.", heroSubtitle: "Årlige vedlikeholdsplaner som forlenger takets levetid med opptil 50 %." },
    },
  },
  fr: {
    titleSuffix: ` — Inspection Gratuite 24h | ${PHONE}`,
    siteNameSuffix: "Réparation Toiture",
    services: {
      roofRepair: { titlePrefix: "Réparation Toiture", h1Prefix: "Réparation de Toiture", description: "Réparation professionnelle de toiture à {city} — étanchéité, remplacement de tuiles, zinguerie. Inspection gratuite 24h. Garantie écrite 15 ans.", heroSubtitle: "Nous stoppons les fuites, remplaçons les tuiles et réparons gouttières et solins. Travaux sous contrat avec garantie 15 ans." },
      leakRepair: { titlePrefix: "Réparation Fuite Toiture", h1Prefix: "Réparation de Fuite de Toiture", description: "Réparation d'urgence de fuite de toit à {city} — diagnostic, localisation et réparation durable. Réponse le jour même. Garantie 15 ans.", heroSubtitle: "Intervention rapide le jour même, diagnostic par caméra thermique, réparations durables sous garantie." },
      waterproofing: { titlePrefix: "Étanchéité Toiture", h1Prefix: "Étanchéité de Toiture", description: "Étanchéité professionnelle à {city} — bitume, membrane PVC, systèmes liquides. Garantie écrite 15 ans.", heroSubtitle: "Systèmes d'étanchéité bitume, membrane PVC et liquide avec garantie écrite de 15 ans." },
      newRoof: { titlePrefix: "Nouvelle Toiture", h1Prefix: "Construction de Nouvelle Toiture", description: "Construction de nouvelles toitures à {city} — charpente bois, isolation, étanchéité, tuiles ou bac acier. Garantie 15 ans.", heroSubtitle: "Projets complets de nouvelle toiture : charpente, isolation, étanchéité et couverture." },
      tileRoofRepair: { titlePrefix: "Réparation Tuiles", h1Prefix: "Remplacement de Tuiles", description: "Remplacement et réparation de tuiles à {city} — céramique et béton. À partir de 4€/pièce. Garantie 15 ans.", heroSubtitle: "Remplacement rapide de tuiles cassées avec des marques certifiées." },
      flatRoof: { titlePrefix: "Toits Plats", h1Prefix: "Réparation de Toits Plats", description: "Étanchéité de toits plats et terrasses à {city}. Membrane PVC, bitume et systèmes liquides. Garantie 15 ans.", heroSubtitle: "Réparation et étanchéité spécialisées pour toits plats, terrasses et balcons." },
      metalRoof: { titlePrefix: "Toits Métalliques", h1Prefix: "Installation de Toits Métalliques", description: "Toits en bac acier à {city} — galvanisés et thermolaqués. Jusqu'à 50 ans de garantie. Inspection gratuite.", heroSubtitle: "Toits métalliques galvanisés et thermolaqués avec jusqu'à 50 ans de garantie anti-corrosion." },
      maintenance: { titlePrefix: "Entretien Toiture", h1Prefix: "Entretien de Toiture", description: "Plans d'entretien annuel de toiture à {city} — inspections, nettoyage, réparations préventives. À partir de 30€.", heroSubtitle: "Plans d'entretien annuels qui prolongent la durée de vie du toit jusqu'à 50 %." },
    },
  },
  nl: {
    titleSuffix: ` — Gratis Inspectie 24u | ${PHONE}`,
    siteNameSuffix: "Dakreparatie",
    services: {
      roofRepair: { titlePrefix: "Dakreparatie", h1Prefix: "Dakreparatie", description: "Professionele dakreparatie in {city} — lekkages, dakpanvervanging, zinkwerk, waterdichting. Gratis inspectie 24u. 15 jaar schriftelijke garantie.", heroSubtitle: "Wij stoppen lekkages, vervangen dakpannen en repareren goten. Werk onder contract met 15 jaar garantie." },
      leakRepair: { titlePrefix: "Lekkage Reparatie", h1Prefix: "Dak Lekkage Reparatie", description: "Spoedreparatie van daklekkage in {city} — diagnose, lokalisatie en duurzame oplossing. Reactie dezelfde dag. 15 jaar garantie.", heroSubtitle: "Snelle reactie dezelfde dag, warmtebeeldcamera-diagnose, duurzame reparaties met garantie." },
      waterproofing: { titlePrefix: "Dakwaterdichting", h1Prefix: "Dakwaterdichting", description: "Professionele waterdichting in {city} — bitumen, PVC membraan, vloeibare systemen. 15 jaar schriftelijke garantie.", heroSubtitle: "Bitumen-, PVC-membraan- en vloeibare waterdichtingssystemen met 15 jaar schriftelijke garantie." },
      newRoof: { titlePrefix: "Nieuw Dak", h1Prefix: "Bouw Nieuw Dak", description: "Bouw van nieuwe daken in {city} — houtconstructie, isolatie, waterdichting, dakpannen of plaatmateriaal. 15 jaar garantie.", heroSubtitle: "Complete nieuwe-dakprojecten: houtconstructie, isolatie, waterdichting en dakbedekking." },
      tileRoofRepair: { titlePrefix: "Dakpanreparatie", h1Prefix: "Dakpan Vervanging", description: "Dakpanvervanging en reparatie in {city} — keramisch en beton. Vanaf €4/stuk. 15 jaar garantie.", heroSubtitle: "Snelle vervanging van gebroken dakpannen met gecertificeerde merken." },
      flatRoof: { titlePrefix: "Platte Daken Reparatie", h1Prefix: "Reparatie Platte Daken", description: "Waterdichting van platte daken en terrassen in {city}. PVC-membraan, bitumen en vloeibare systemen. 15 jaar garantie.", heroSubtitle: "Gespecialiseerde reparatie en waterdichting voor platte daken, terrassen en balkons." },
      metalRoof: { titlePrefix: "Metalen Daken", h1Prefix: "Metalen Daken Installatie", description: "Metalen daken in {city} — verzinkt en gecoat. Tot 50 jaar garantie. Gratis inspectie.", heroSubtitle: "Verzinkte en gecoate metalen daken met tot 50 jaar corrosiegarantie." },
      maintenance: { titlePrefix: "Dakonderhoud", h1Prefix: "Dakonderhoud", description: "Jaarlijkse dakonderhoudsplannen in {city} — inspecties, reiniging, preventief onderhoud. Vanaf €30.", heroSubtitle: "Jaarlijkse onderhoudsplannen die de levensduur van het dak met tot 50% verlengen." },
    },
  },
  ru: {
    titleSuffix: ` — Бесплатный Осмотр 24ч | ${PHONE}`,
    siteNameSuffix: "Ремонт Крыш",
    services: {
      roofRepair: { titlePrefix: "Ремонт Крыш", h1Prefix: "Ремонт Крыш", description: "Профессиональный ремонт крыш в {city} — устранение течей, замена черепицы, кровельный металл, гидроизоляция. Бесплатный осмотр 24ч. Гарантия 15 лет.", heroSubtitle: "Устраняем течи, заменяем черепицу, ремонтируем водостоки. Договорные работы с гарантией 15 лет." },
      leakRepair: { titlePrefix: "Ремонт Течей Крыши", h1Prefix: "Ремонт Течей Крыши", description: "Срочный ремонт течей крыши в {city} — диагностика, локализация и долговременное устранение. Реакция в тот же день. Гарантия 15 лет.", heroSubtitle: "Быстрая реакция в тот же день, тепловизионная диагностика, долговременный ремонт с гарантией." },
      waterproofing: { titlePrefix: "Гидроизоляция Крыши", h1Prefix: "Гидроизоляция Крыши", description: "Профессиональная гидроизоляция в {city} — битум, ПВХ-мембрана, жидкие составы. Письменная гарантия 15 лет.", heroSubtitle: "Битумные, ПВХ-мембранные и жидкие системы гидроизоляции с письменной гарантией 15 лет." },
      newRoof: { titlePrefix: "Новая Крыша", h1Prefix: "Строительство Новой Крыши", description: "Строительство новых крыш в {city} — деревянная конструкция, утепление, гидроизоляция, черепица или металл. Гарантия 15 лет.", heroSubtitle: "Полные проекты новых крыш: конструкция, утепление, гидроизоляция и покрытие." },
      tileRoofRepair: { titlePrefix: "Замена Черепицы", h1Prefix: "Замена Черепицы", description: "Замена и ремонт черепицы в {city} — керамика и бетон. От €4/шт. Гарантия 15 лет.", heroSubtitle: "Быстрая замена сломанной черепицы сертифицированных марок." },
      flatRoof: { titlePrefix: "Ремонт Плоских Крыш", h1Prefix: "Ремонт Плоских Крыш", description: "Гидроизоляция плоских крыш и террас в {city}. ПВХ-мембрана, битум, жидкие системы. Гарантия 15 лет.", heroSubtitle: "Специализированный ремонт и гидроизоляция плоских крыш, террас и балконов." },
      metalRoof: { titlePrefix: "Металлические Крыши", h1Prefix: "Установка Металлических Крыш", description: "Металлические крыши в {city} — оцинкованные и с полимерным покрытием. Гарантия до 50 лет. Бесплатный осмотр.", heroSubtitle: "Оцинкованные и с полимерным покрытием металлические крыши с гарантией до 50 лет." },
      maintenance: { titlePrefix: "Обслуживание Крыш", h1Prefix: "Обслуживание Крыш", description: "Годовые планы обслуживания крыш в {city} — осмотры, чистка, профилактический ремонт. От €30.", heroSubtitle: "Годовые планы обслуживания продлевают срок службы крыши до 50%." },
    },
  },
  ua: {
    titleSuffix: ` — Безкоштовний Огляд 24год | ${PHONE}`,
    siteNameSuffix: "Ремонт Дахів",
    services: {
      roofRepair: { titlePrefix: "Ремонт Дахів", h1Prefix: "Ремонт Дахів", description: "Професійний ремонт дахів у {city} — усунення протікань, заміна черепиці, бляха, гідроізоляція. Безкоштовний огляд 24год. Гарантія 15 років.", heroSubtitle: "Усуваємо протікання, замінюємо черепицю, ремонтуємо водостоки. Договірні роботи з гарантією 15 років." },
      leakRepair: { titlePrefix: "Ремонт Протікань", h1Prefix: "Ремонт Протікань Даху", description: "Терміновий ремонт протікань даху у {city} — діагностика, локалізація та довготривале усунення. Реакція того ж дня. Гарантія 15 років.", heroSubtitle: "Швидка реакція того ж дня, тепловізійна діагностика, довготривалий ремонт із гарантією." },
      waterproofing: { titlePrefix: "Гідроізоляція Даху", h1Prefix: "Гідроізоляція Даху", description: "Професійна гідроізоляція у {city} — бітум, ПВХ-мембрана, рідкі системи. Письмова гарантія 15 років.", heroSubtitle: "Бітумні, ПВХ-мембранні та рідкі системи гідроізоляції з письмовою гарантією 15 років." },
      newRoof: { titlePrefix: "Новий Дах", h1Prefix: "Будівництво Нового Даху", description: "Будівництво нових дахів у {city} — дерев'яна конструкція, утеплення, гідроізоляція, черепиця або бляха. Гарантія 15 років.", heroSubtitle: "Повні проєкти нових дахів: конструкція, утеплення, гідроізоляція та покриття." },
      tileRoofRepair: { titlePrefix: "Заміна Черепиці", h1Prefix: "Заміна Черепиці", description: "Заміна та ремонт черепиці у {city} — кераміка та бетон. Від €4/шт. Гарантія 15 років.", heroSubtitle: "Швидка заміна пошкодженої черепиці сертифікованих марок." },
      flatRoof: { titlePrefix: "Ремонт Плоских Дахів", h1Prefix: "Ремонт Плоских Дахів", description: "Гідроізоляція плоских дахів і терас у {city}. ПВХ-мембрана, бітум, рідкі системи. Гарантія 15 років.", heroSubtitle: "Спеціалізований ремонт і гідроізоляція плоских дахів, терас і балконів." },
      metalRoof: { titlePrefix: "Металеві Дахи", h1Prefix: "Встановлення Металевих Дахів", description: "Металеві дахи у {city} — оцинковані та з полімерним покриттям. Гарантія до 50 років. Безкоштовний огляд.", heroSubtitle: "Оцинковані та з полімерним покриттям металеві дахи з гарантією до 50 років." },
      maintenance: { titlePrefix: "Обслуговування Дахів", h1Prefix: "Обслуговування Дахів", description: "Річні плани обслуговування дахів у {city} — огляди, чищення, профілактичний ремонт. Від €30.", heroSubtitle: "Річні плани обслуговування подовжують термін служби даху до 50%." },
    },
  },
};

export function getServiceMeta(
  lang: SupportedLanguage,
  routeKey: RouteKey,
): ServiceMeta | null {
  return CITY_SERVICE_META[lang]?.services?.[routeKey] ?? null;
}

export function getLangSiteSuffix(lang: SupportedLanguage): string {
  return CITY_SERVICE_META[lang]?.siteNameSuffix ?? CITY_SERVICE_META.bg.siteNameSuffix;
}

export function getLangTitleSuffix(lang: SupportedLanguage): string {
  return CITY_SERVICE_META[lang]?.titleSuffix ?? CITY_SERVICE_META.bg.titleSuffix;
}
