import { useTranslation } from "react-i18next";
import { Layers, Droplets, Wind, Home, Shield, Sun } from "lucide-react";
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

const brandCategories = [
  {
    id: "tiles",
    label: "Покривни плочки и керемиди",
    icon: Home,
    description: "Немски и европейски производители на висококачествени керамични и бетонни керемиди",
    brands: [
      { name: "Bramac", logo: bramacLogo, origin: "Германия / Австрия", desc: "Бетонни керемиди с 50г. гаранция" },
      { name: "Tondach", logo: tondachLogo, origin: "Австрия", desc: "Премиум керамични керемиди" },
      { name: "Creaton", logo: creatonLogo, origin: "Германия", desc: "Иновативни покривни системи" },
      { name: "Braas", logo: braasLogo, origin: "Германия", desc: "Лидер в керемидените покриви" },
    ],
  },
  {
    id: "waterproofing",
    label: "Хидроизолационни системи",
    icon: Droplets,
    description: "Водещи марки за надеждна хидроизолация на плоски и скатни покриви",
    brands: [
      { name: "Bauder", logo: bauderLogo, origin: "Германия", desc: "Системи за плоски покриви" },
      { name: "Sika", logo: sikaLogo, origin: "Швейцария", desc: "PVC мембрани и течна изолация" },
      { name: "Icopal", logo: icopalLogo, origin: "Германия / BMI Group", desc: "Битумни хидроизолационни мембрани" },
      { name: "Vedag", logo: vedagLogo, origin: "Германия", desc: "Хидроизолация за плоски покриви" },
    ],
  },
  {
    id: "membranes",
    label: "Подпокривни мембрани",
    icon: Layers,
    description: "Пароизолационни и дифузионни мембрани за дълготрайна защита на покривната конструкция",
    brands: [
      { name: "Dörken Delta", logo: dorkenLogo, origin: "Германия", desc: "Дифузионни мембрани Delta" },
      { name: "BMI Group", logo: bmiLogo, origin: "Великобритания", desc: "Комплексни покривни системи" },
      { name: "Onduline", logo: ondulineLogo, origin: "Франция", desc: "Леки покривни системи" },
      { name: "Fakro", logo: fakroLogo, origin: "Полша", desc: "Покривни прозорци и аксесоари" },
    ],
  },
];

// Scrolling strip: flat list for infinite scroll
const allBrands = [
  { name: "Bramac", logo: bramacLogo },
  { name: "Tondach", logo: tondachLogo },
  { name: "Creaton", logo: creatonLogo },
  { name: "BMI Group", logo: bmiLogo },
  { name: "Bauder", logo: bauderLogo },
  { name: "Sika", logo: sikaLogo },
  { name: "Icopal", logo: icopalLogo },
  { name: "Vedag", logo: vedagLogo },
  { name: "Dörken Delta", logo: dorkenLogo },
  { name: "Onduline", logo: ondulineLogo },
  { name: "Braas", logo: braasLogo },
  { name: "Fakro", logo: fakroLogo },
];

const BrandCarousel = () => {
  const { t } = useTranslation();

  return (
    <section className="py-14 md:py-20 bg-muted/20 border-y border-border/40">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/8 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4 border border-primary/15">
            <Shield className="w-4 h-4" />
            Сертифицирани материали
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
            {t('brands.title')}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base">
            {t('brands.subtitle')}
          </p>
        </div>

        {/* Category Sections */}
        <div className="space-y-10 mb-14">
          {brandCategories.map((category) => {
            const Icon = category.icon;
            return (
              <div key={category.id}>
                {/* Category header */}
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground text-base md:text-lg">{category.label}</h3>
                    <p className="text-xs text-muted-foreground hidden md:block">{category.description}</p>
                  </div>
                </div>

                {/* Brand cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                  {category.brands.map((brand) => (
                    <div
                      key={brand.name}
                      className="bg-background border border-border rounded-xl p-4 flex flex-col items-center gap-3 hover:border-primary/30 hover:shadow-md transition-all duration-200 group"
                    >
                      <div className="h-12 w-full flex items-center justify-center">
                        <img
                          src={brand.logo}
                          alt={`${brand.name} logo`}
                          className="max-h-full max-w-[120px] object-contain opacity-75 group-hover:opacity-100 transition-opacity"
                          loading="lazy"
                        />
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-semibold text-foreground">{brand.name}</p>
                        <p className="text-[11px] text-muted-foreground leading-snug mt-0.5">{brand.desc}</p>
                        <span className="inline-block mt-1.5 text-[10px] bg-muted text-muted-foreground px-2 py-0.5 rounded-full">
                          {brand.origin}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Infinite scroll strip */}
        <div className="border-t border-border/40 pt-10">
          <p className="text-center text-xs uppercase tracking-widest text-muted-foreground/60 mb-6 font-medium">
            Работим с водещи световни производители
          </p>
          <div className="relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-muted/20 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-muted/20 to-transparent z-10 pointer-events-none" />
            <div className="flex animate-scroll-brands">
              {[...allBrands, ...allBrands].map((brand, i) => (
                <div key={`${brand.name}-${i}`} className="flex-shrink-0 px-6 md:px-10 flex items-center justify-center h-12">
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="max-h-8 max-w-[80px] object-contain opacity-50 hover:opacity-80 transition-opacity"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandCarousel;
