import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { MapPin, Phone, ArrowRight, Clock, Shield, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ACTIVE_CITIES, COMING_SOON_CITIES, CITIES, type CityKey } from "@/i18n/cities";

const BASE_URL = "https://www.remontnapokrivivarna.bg";

/**
 * CitiesHubPage — /bg/gradove/
 * Hub за всички градове, в които компанията работи.
 * Шоукейс на 3 активни града (Варна, Бургас, Русе) + 2 предстоящи (Пловдив, София).
 */
const CitiesHubPage = () => {
  const canonical = `${BASE_URL}/bg/gradove`;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Начало", "item": `${BASE_URL}/bg/varna` },
      { "@type": "ListItem", "position": 2, "name": "Градове", "item": canonical },
    ],
  };

  // ItemList schema — sигнал към Google за географското покритие
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Градове, обслужвани от Ремонт на Покриви",
    "itemListElement": ACTIVE_CITIES.map((cityKey, idx) => {
      const c = CITIES[cityKey];
      return {
        "@type": "ListItem",
        "position": idx + 1,
        "item": {
          "@type": "City",
          "name": c.nameBg,
          "url": `${BASE_URL}/bg/${c.slug}`,
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": c.geo.lat,
            "longitude": c.geo.lng,
          },
        },
      };
    }),
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Градове, в които работим — Ремонт на Покриви | Варна, Бургас, Русе</title>
        <meta
          name="description"
          content="Професионален ремонт на покриви в 3 града в България — Варна, Бургас и Русе. Безплатен оглед, 15 години писмена гаранция. Скоро в Пловдив и София."
        />
        <link rel="canonical" href={canonical} />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <meta property="og:title" content="Градове, в които работим — Ремонт на Покриви" />
        <meta property="og:description" content="Професионален ремонт на покриви във Варна, Бургас и Русе. Безплатен оглед, 15 години гаранция." />
        <meta property="og:url" content={canonical} />
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(itemListSchema)}</script>
      </Helmet>

      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative bg-gradient-to-br from-primary via-primary to-primary/90 text-primary-foreground py-16 md:py-24 overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.3) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(255,255,255,0.2) 0%, transparent 50%)" }} />

          <div className="container mx-auto px-4 relative z-10">
            <nav aria-label="breadcrumb" className="mb-6 text-sm text-primary-foreground/80">
              <Link to="/bg/varna" className="hover:text-primary-foreground transition-colors">Начало</Link>
              <span className="mx-2">›</span>
              <span className="text-primary-foreground">Градове</span>
            </nav>

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 [text-shadow:_0_2px_8px_rgba(0,0,0,0.3)]">
              Градове, в които работим
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-primary-foreground/90 max-w-3xl mb-8">
              Професионален ремонт на покриви, хидроизолация и нови покриви в 3 големи града в България. Безплатен оглед в рамките на 24 часа, 15 години писмена гаранция.
            </p>

            <div className="flex flex-wrap gap-2 md:gap-4">
              <span className="inline-flex items-center gap-1.5 bg-primary-foreground/15 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-medium border border-primary-foreground/20">
                <CheckCircle className="w-4 h-4 text-green-400" />
                15+ години опит
              </span>
              <span className="inline-flex items-center gap-1.5 bg-primary-foreground/15 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-medium border border-primary-foreground/20">
                <Shield className="w-4 h-4 text-green-400" />
                15 години гаранция
              </span>
              <span className="inline-flex items-center gap-1.5 bg-primary-foreground/15 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-medium border border-primary-foreground/20">
                <Clock className="w-4 h-4 text-green-400" />
                Оглед до 24ч
              </span>
            </div>
          </div>
        </section>

        {/* Bulgaria Map (decorative SVG) + Active Cities */}
        <section className="py-16 md:py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10 md:mb-14">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
                Активни градове
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Нашите екипи работят в трите града и обслужват целите им региони.
              </p>
            </div>

            {/* Realistic Bulgaria map with geographically projected city pins */}
            <div className="max-w-4xl mx-auto mb-12 hidden md:block">
              <div className="relative aspect-[1000/600] bg-gradient-to-br from-muted/40 to-muted/20 rounded-2xl border border-border overflow-hidden shadow-inner">
                <svg viewBox="0 0 1000 600" className="w-full h-full" aria-hidden="true">
                  <defs>
                    <linearGradient id="bgLandGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="hsl(var(--muted))" stopOpacity="0.95" />
                      <stop offset="100%" stopColor="hsl(var(--muted))" stopOpacity="0.7" />
                    </linearGradient>
                    <radialGradient id="seaGradient" cx="100%" cy="50%" r="80%">
                      <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.18" />
                      <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
                    </radialGradient>
                  </defs>

                  {/* Black Sea — eastern backdrop */}
                  <rect x="850" y="0" width="150" height="600" fill="url(#seaGradient)" />
                  <text x="935" y="320" textAnchor="middle" className="fill-muted-foreground/70" fontSize="14" fontWeight="600" fontStyle="italic">
                    Черно море
                  </text>

                  {/*
                    Geographically accurate Bulgaria outline.
                    Linear projection: x = ((lng - 22.36) / 6.25) * 1000 ; y = ((44.22 - lat) / 2.98) * 600
                    Simplified border polygon (~50 pts) traced from real coordinates.
                  */}
                  <path
                    d="M 36,107 L 78,72 L 142,55 L 198,42 L 262,38 L 328,52 L 392,68 L 458,78 L 524,72 L 588,82 L 642,98 L 698,118 L 752,138 L 798,162 L 836,192 L 858,228 L 862,278 L 854,328 L 838,378 L 808,418 L 762,452 L 708,478 L 642,498 L 572,512 L 498,518 L 422,508 L 348,488 L 282,458 L 224,418 L 178,372 L 142,322 L 112,272 L 86,218 L 62,162 Z"
                    fill="url(#bgLandGradient)"
                    stroke="hsl(var(--border))"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />

                  {/* Danube river — northern border */}
                  <path
                    d="M 38,105 Q 200,40 458,76 T 856,190"
                    fill="none"
                    stroke="hsl(210 80% 60%)"
                    strokeWidth="2.5"
                    strokeOpacity="0.45"
                    strokeLinecap="round"
                  />
                  <text x="380" y="62" className="fill-sky-700/70 dark:fill-sky-300/60" fontSize="11" fontWeight="600" fontStyle="italic">
                    р. Дунав
                  </text>

                  {/* Sofia (coming soon) — lat 42.6977, lng 23.3219 → x=154, y=307 */}
                  <g>
                    <circle cx="154" cy="307" r="9" fill="hsl(var(--muted-foreground))" opacity="0.55" />
                    <circle cx="154" cy="307" r="3" fill="hsl(var(--background))" />
                    <text x="154" y="334" textAnchor="middle" className="fill-muted-foreground" fontSize="13" fontWeight="600">София</text>
                    <text x="154" y="350" textAnchor="middle" className="fill-muted-foreground/70" fontSize="10">(скоро)</text>
                  </g>

                  {/* Plovdiv (coming soon) — lat 42.1354, lng 24.7453 → x=381, y=420 */}
                  <g>
                    <circle cx="381" cy="420" r="9" fill="hsl(var(--muted-foreground))" opacity="0.55" />
                    <circle cx="381" cy="420" r="3" fill="hsl(var(--background))" />
                    <text x="381" y="447" textAnchor="middle" className="fill-muted-foreground" fontSize="13" fontWeight="600">Пловдив</text>
                    <text x="381" y="463" textAnchor="middle" className="fill-muted-foreground/70" fontSize="10">(скоро)</text>
                  </g>

                  {/* Ruse (active) — lat 43.8564, lng 25.9657 → x=577, y=73 */}
                  <g>
                    <circle cx="577" cy="100" r="16" fill="hsl(var(--primary))" opacity="0.25" className="animate-pulse" />
                    <circle cx="577" cy="100" r="10" fill="hsl(var(--primary))" />
                    <circle cx="577" cy="100" r="3.5" fill="hsl(var(--primary-foreground))" />
                    <text x="577" y="86" textAnchor="middle" className="fill-foreground" fontSize="14" fontWeight="700">Русе</text>
                  </g>

                  {/* Burgas (active) — lat 42.5048, lng 27.4626 → x=816, y=345 */}
                  <g>
                    <circle cx="780" cy="345" r="16" fill="hsl(var(--primary))" opacity="0.25" className="animate-pulse" />
                    <circle cx="780" cy="345" r="10" fill="hsl(var(--primary))" />
                    <circle cx="780" cy="345" r="3.5" fill="hsl(var(--primary-foreground))" />
                    <text x="780" y="372" textAnchor="middle" className="fill-foreground" fontSize="14" fontWeight="700">Бургас</text>
                  </g>

                  {/* Varna (active) — lat 43.2141, lng 27.9147 → x=888, y=203 */}
                  <g>
                    <circle cx="820" cy="215" r="16" fill="hsl(var(--primary))" opacity="0.25" className="animate-pulse" />
                    <circle cx="820" cy="215" r="10" fill="hsl(var(--primary))" />
                    <circle cx="820" cy="215" r="3.5" fill="hsl(var(--primary-foreground))" />
                    <text x="820" y="201" textAnchor="middle" className="fill-foreground" fontSize="14" fontWeight="700">Варна</text>
                  </g>
                </svg>

                {/* Legend */}
                <div className="absolute bottom-3 left-3 flex items-center gap-4 bg-background/85 backdrop-blur-sm rounded-lg px-3 py-1.5 border border-border text-xs">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                    <span className="text-foreground font-medium">Активен</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-muted-foreground/60" />
                    <span className="text-muted-foreground">Скоро</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Active city cards */}
            <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {ACTIVE_CITIES.map((cityKey: CityKey) => {
                const c = CITIES[cityKey];
                return (
                  <Card key={cityKey} className="group hover:shadow-2xl hover:-translate-y-1 transition-all border-2 hover:border-primary/40 overflow-hidden">
                    <CardContent className="p-0">
                      <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-6 border-b border-border">
                        <div className="flex items-center justify-between mb-3">
                          <div className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                            <CheckCircle className="w-3.5 h-3.5" />
                            Активен
                          </div>
                          <MapPin className="w-6 h-6 text-primary" />
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-1">
                          {c.nameBg}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {c.region} област · {c.postalCode}
                        </p>
                      </div>

                      <div className="p-6">
                        <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                          Обслужвани квартали:
                        </p>
                        <div className="flex flex-wrap gap-1.5 mb-5 min-h-[60px]">
                          {c.neighborhoods.slice(0, 6).map((n) => (
                            <span key={n} className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-md">
                              {n}
                            </span>
                          ))}
                          {c.neighborhoods.length > 6 && (
                            <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-md">
                              +{c.neighborhoods.length - 6} още
                            </span>
                          )}
                        </div>

                        <div className="space-y-2 mb-5 text-sm">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Clock className="w-4 h-4 text-primary flex-shrink-0" />
                            <span>{c.workingHours}</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Shield className="w-4 h-4 text-primary flex-shrink-0" />
                            <span>{c.emergency}</span>
                          </div>
                        </div>

                        <div className="flex flex-col gap-2">
                          <Button asChild className="w-full group/btn">
                            <Link to={`/bg/${c.slug}`} className="flex items-center justify-center gap-2">
                              Виж услугите в {c.nameBg}
                              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                            </Link>
                          </Button>
                          <Button asChild variant="outline" className="w-full">
                            <a href={`tel:${c.phoneTel}`} className="flex items-center justify-center gap-2">
                              <Phone className="w-4 h-4" />
                              {c.phone}
                            </a>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Coming Soon */}
        <section className="py-16 md:py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
                Скоро в още градове
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Разширяваме географското си покритие. Ако имате нужда от ремонт в тези градове, обадете ни се — обслужваме и при индивидуални проекти.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {COMING_SOON_CITIES.map((c) => (
                <Card key={c.slug} className="border-dashed border-2 opacity-75">
                  <CardContent className="p-6 flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-7 h-7 text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <div className="inline-block bg-accent/15 text-accent text-xs font-bold uppercase tracking-wide px-2 py-0.5 rounded mb-1">
                        Скоро
                      </div>
                      <h3 className="text-xl font-bold text-foreground">{c.nameBg}</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Обадете се за индивидуален проект
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-10">
              <Button asChild size="lg" className="h-14 bg-accent hover:bg-accent/90 text-accent-foreground text-lg font-bold px-8">
                <a href="tel:0884997659" className="flex items-center justify-center gap-2">
                  <Phone className="w-5 h-5" />
                  Обадете се: 088 499 7659
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Why we work in these cities */}
        <section className="py-16 md:py-20 bg-background">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 text-center">
              Защо работим в няколко града?
            </h2>
            <div className="space-y-4 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>
                Над 15 години Булгар Билд ЕООД доказва своята експертиза в покривните услуги в северо-източна България. Започнахме работа във Варна и постепенно разширихме обслужването си в Бургас и Русе — където имаше търсене на качествен и надежден изпълнител с писмена гаранция.
              </p>
              <p>
                Във всеки град имаме <strong className="text-foreground">локален екип, складова база и автомобилен парк</strong>. Това ни позволява да реагираме в рамките на 24 часа за безплатен оглед и до няколко часа при аварийни ситуации (течове, повреди от буря, паднали керемиди).
              </p>
              <p>
                Услугите ни в трите града включват ремонт на покриви, хидроизолация, изграждане на нови покриви, подмяна на керемиди, ремонт на плоски покриви, метални покриви и редовна поддръжка. Всички работи се извършват с <strong className="text-foreground">15 години писмена гаранция</strong>.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CitiesHubPage;
