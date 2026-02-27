import { useTranslation } from "react-i18next";
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

const brands = [
  { name: "Bramac", category: "Roof Tiles", logo: bramacLogo },
  { name: "Tondach", category: "Roof Tiles", logo: tondachLogo },
  { name: "Creaton", category: "Roof Tiles", logo: creatonLogo },
  { name: "BMI Group", category: "Roofing Systems", logo: bmiLogo },
  { name: "Bauder", category: "Waterproofing", logo: bauderLogo },
  { name: "Sika", category: "Construction Chemicals", logo: sikaLogo },
  { name: "Icopal", category: "Waterproofing", logo: icopalLogo },
  { name: "Vedag", category: "Waterproofing", logo: vedagLogo },
  { name: "Dörken Delta", category: "Membranes", logo: dorkenLogo },
  { name: "Onduline", category: "Roofing", logo: ondulineLogo },
  { name: "Braas", category: "Roof Tiles", logo: braasLogo },
  { name: "Fakro", category: "Roof Windows", logo: fakroLogo },
];

const BrandLogo = ({ name, category, logo }: { name: string; category: string; logo: string }) => (
  <div className="flex-shrink-0 group cursor-default px-6 md:px-10">
    <div className="flex flex-col items-center gap-2 transition-transform duration-300 group-hover:scale-110">
      <div className="h-12 md:h-16 w-28 md:w-36 flex items-center justify-center">
        <img
          src={logo}
          alt={`${name} logo`}
          className="max-h-full max-w-full object-contain transition-opacity duration-300 group-hover:opacity-100 opacity-75"
          loading="lazy"
        />
      </div>
      <div className="flex flex-col items-center gap-0.5">
        <span className="text-sm md:text-base font-semibold tracking-tight text-foreground/80 group-hover:text-primary transition-colors duration-300 whitespace-nowrap">
          {name}
        </span>
        <span className="text-[9px] md:text-[10px] uppercase tracking-[0.15em] text-muted-foreground/60 font-medium">
          {category}
        </span>
      </div>
    </div>
  </div>
);

const BrandCarousel = () => {
  const { t } = useTranslation();

  return (
    <section className="py-10 md:py-14 bg-muted/30 border-y border-border/40 overflow-hidden">
      <div className="container mx-auto px-4 mb-8 text-center">
        <h2 className="text-xl md:text-2xl font-bold text-foreground mb-2">
          {t('brands.title')}
        </h2>
        <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
          {t('brands.subtitle')}
        </p>
      </div>

      {/* Scrolling strip */}
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-muted/30 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-muted/30 to-transparent z-10 pointer-events-none" />

        <div className="flex animate-scroll-brands">
          {[...brands, ...brands].map((brand, i) => (
            <BrandLogo key={`${brand.name}-${i}`} name={brand.name} category={brand.category} logo={brand.logo} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandCarousel;
