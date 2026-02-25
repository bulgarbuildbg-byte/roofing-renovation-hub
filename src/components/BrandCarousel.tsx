import { useTranslation } from "react-i18next";
import { Layers, Droplets, Home, Wind, Shield, Wrench } from "lucide-react";
import bramacLogo from "@/assets/brands/bramac.svg";
import tondachLogo from "@/assets/brands/tondach.svg";
import creatonLogo from "@/assets/brands/creaton.svg";
import bmiLogo from "@/assets/brands/bmi.svg";
import bauderLogo from "@/assets/brands/bauder.svg";
import sikaLogo from "@/assets/brands/sika.svg";
import icopalLogo from "@/assets/brands/icopal.svg";
import vedagLogo from "@/assets/brands/vedag.svg";
import dorkenLogo from "@/assets/brands/dorken.svg";
import ondulineLogo from "@/assets/brands/onduline.svg";
import braasLogo from "@/assets/brands/braas.svg";
import fakroLogo from "@/assets/brands/fakro.svg";

const categories = [
  {
    icon: Home,
    labelBg: "Покривни Керемиди",
    labelEn: "Roof Tiles",
    brands: [
      { name: "Bramac", logo: bramacLogo, descBg: "Премиум австрийски керемиди", descEn: "Premium Austrian roof tiles" },
      { name: "Tondach", logo: tondachLogo, descBg: "Австрийски керамични керемиди", descEn: "Austrian ceramic roof tiles" },
      { name: "Creaton", logo: creatonLogo, descBg: "Немски производител на керемиди", descEn: "German roof tile manufacturer" },
      { name: "Braas", logo: braasLogo, descBg: "Водещ немски бранд за керемиди", descEn: "Leading German tile brand" },
    ],
  },
  {
    icon: Droplets,
    labelBg: "Хидроизолация",
    labelEn: "Waterproofing",
    brands: [
      { name: "Bauder", logo: bauderLogo, descBg: "Немски системи за хидроизолация", descEn: "German waterproofing systems" },
      { name: "Sika", logo: sikaLogo, descBg: "Строителна химия и хидроизолация", descEn: "Construction chemicals & waterproofing" },
      { name: "Icopal", logo: icopalLogo, descBg: "BMI Icopal хидроизолационни мембрани", descEn: "BMI Icopal waterproof membranes" },
      { name: "Vedag", logo: vedagLogo, descBg: "Немски битумни мембрани", descEn: "German bitumen membranes" },
    ],
  },
  {
    icon: Layers,
    labelBg: "Мембрани и Системи",
    labelEn: "Membranes & Systems",
    brands: [
      { name: "Dörken Delta", logo: dorkenLogo, descBg: "Немски диффузионни мембрани", descEn: "German diffusion membranes" },
      { name: "BMI Group", logo: bmiLogo, descBg: "Европейски покривни системи", descEn: "European roofing systems" },
      { name: "Onduline", logo: ondulineLogo, descBg: "Леки покривни покрития", descEn: "Lightweight roof coverings" },
      { name: "Fakro", logo: fakroLogo, descBg: "Покривни прозорци и люкове", descEn: "Roof windows and hatches" },
    ],
  },
];

// Flat list for the scrolling strip
const allBrands = categories.flatMap((c) => c.brands);

const BrandCarousel = () => {
  const { t, i18n } = useTranslation();
  const isBg = i18n.language === "bg" || i18n.language?.startsWith("bg");

  return (
    <section className="py-14 md:py-20 bg-muted/30 border-y border-border/40 overflow-hidden">
      <div className="container mx-auto px-4 mb-10 text-center">
        <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-semibold mb-4">
          <Shield className="w-4 h-4" />
          {isBg ? "Сертифицирани Немски и Европейски Материали" : "Certified German & European Materials"}
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
          {t('brands.title')}
        </h2>
        <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
          {t('brands.subtitle')}
        </p>
      </div>

      {/* Category grid */}
      <div className="container mx-auto px-4 mb-12">
        <div className="grid md:grid-cols-3 gap-6">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div key={cat.labelEn} className="bg-background rounded-2xl border border-border p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-bold text-foreground text-base">{isBg ? cat.labelBg : cat.labelEn}</h3>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {cat.brands.map((brand) => (
                    <div
                      key={brand.name}
                      className="group bg-muted/40 hover:bg-accent/5 border border-border/50 hover:border-accent/30 rounded-xl p-3 flex flex-col items-center gap-2 transition-all duration-200 hover:shadow-md cursor-default"
                    >
                      <div className="h-10 w-full flex items-center justify-center">
                        <img
                          src={brand.logo}
                          alt={`${brand.name} logo`}
                          className="max-h-full max-w-[90px] object-contain opacity-75 group-hover:opacity-100 transition-opacity duration-200 group-hover:scale-105 transform transition-transform"
                          loading="lazy"
                        />
                      </div>
                      <div className="text-center">
                        <p className="text-xs font-semibold text-foreground/80">{brand.name}</p>
                        <p className="text-[10px] text-muted-foreground leading-tight mt-0.5">
                          {isBg ? brand.descBg : brand.descEn}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Scrolling strip */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-muted/30 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-muted/30 to-transparent z-10 pointer-events-none" />
        <div className="flex animate-scroll-brands">
          {[...allBrands, ...allBrands].map((brand, i) => (
            <div key={`${brand.name}-${i}`} className="flex-shrink-0 px-6 md:px-10 flex flex-col items-center gap-1.5 group cursor-default">
              <div className="h-10 md:h-12 w-24 md:w-28 flex items-center justify-center">
                <img
                  src={brand.logo}
                  alt={`${brand.name} logo`}
                  className="max-h-full max-w-full object-contain opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300"
                  loading="lazy"
                />
              </div>
              <span className="text-[10px] md:text-xs font-semibold text-muted-foreground group-hover:text-primary transition-colors whitespace-nowrap">
                {brand.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandCarousel;
