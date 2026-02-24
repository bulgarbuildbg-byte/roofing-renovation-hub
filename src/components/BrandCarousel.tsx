import { useTranslation } from "react-i18next";

const brands = [
  { name: "Bramac", category: "Roof Tiles" },
  { name: "Tondach", category: "Roof Tiles" },
  { name: "Creaton", category: "Roof Tiles" },
  { name: "BMI Group", category: "Roofing Systems" },
  { name: "Bauder", category: "Waterproofing" },
  { name: "Sika", category: "Construction Chemicals" },
  { name: "Icopal", category: "Waterproofing" },
  { name: "Vedag", category: "Waterproofing" },
  { name: "Dörken Delta", category: "Membranes" },
  { name: "Onduline", category: "Roofing" },
  { name: "Braas", category: "Roof Tiles" },
  { name: "Fakro", category: "Roof Windows" },
];

const BrandLogo = ({ name, category }: { name: string; category: string }) => (
  <div className="flex-shrink-0 group cursor-default px-6 md:px-10">
    <div className="flex flex-col items-center gap-1.5 transition-transform duration-300 group-hover:scale-110">
      <span className="text-lg md:text-xl font-bold tracking-tight text-foreground/70 group-hover:text-primary transition-colors duration-300 whitespace-nowrap">
        {name}
      </span>
      <span className="text-[10px] md:text-xs uppercase tracking-[0.15em] text-muted-foreground/60 font-medium">
        {category}
      </span>
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
          {/* Double the brands for seamless loop */}
          {[...brands, ...brands].map((brand, i) => (
            <BrandLogo key={`${brand.name}-${i}`} name={brand.name} category={brand.category} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandCarousel;
