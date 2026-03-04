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
  return (
    <section className="py-6 bg-muted/20 border-y border-border/40">
      <div className="container mx-auto px-4">
        <p className="text-center text-xs uppercase tracking-widest text-muted-foreground/60 mb-5 font-medium">
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
    </section>
  );
};

export default BrandCarousel;
