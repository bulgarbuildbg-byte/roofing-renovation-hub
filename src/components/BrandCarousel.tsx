import bramacLogo from "@/assets/brands/bramac.svg";
import tondachLogo from "@/assets/brands/tondach.svg";
import sikaLogo from "@/assets/brands/sika.svg";
import icopalLogo from "@/assets/brands/icopal.svg";
import veluxLogo from "@/assets/brands/velux.svg";
import rockwoolLogo from "@/assets/brands/rockwool.svg";
import technoNicolLogo from "@/assets/brands/technonicol.svg";
import bilkaLogo from "@/assets/brands/bilka.svg";
import kebeLogo from "@/assets/brands/kebe.svg";
import ceresitLogo from "@/assets/brands/ceresit.svg";
import austrothermLogo from "@/assets/brands/austrotherm.svg";
import fibranLogo from "@/assets/brands/fibran.svg";
import wienerbergerLogo from "@/assets/brands/wienerberger.svg";
import weberLogo from "@/assets/brands/weber.svg";

const allBrands = [
  { name: "VELUX", logo: veluxLogo, url: "https://www.velux.bg" },
  { name: "Icopal", logo: icopalLogo, url: "https://www.bmigroup.com/icopal" },
  { name: "Bramac", logo: bramacLogo, url: "https://www.bramac.bg" },
  { name: "Tondach", logo: tondachLogo, url: "https://www.wienerberger.bg/produkty/tondach.html" },
  { name: "Sika", logo: sikaLogo, url: "https://bul.sika.com" },
  { name: "Rockwool", logo: rockwoolLogo, url: "https://www.rockwool.com/bg" },
  { name: "TechnoNICOL", logo: technoNicolLogo, url: "https://www.technonicol.bg" },
  { name: "Bilka", logo: bilkaLogo, url: "https://www.bilka.bg" },
  { name: "Kebe", logo: kebeLogo, url: "https://www.kebe.gr" },
  { name: "Ceresit", logo: ceresitLogo, url: "https://www.ceresit.bg" },
  { name: "Austrotherm", logo: austrothermLogo, url: "https://www.austrotherm.bg" },
  { name: "Fibran", logo: fibranLogo, url: "https://www.fibran.bg" },
  { name: "Wienerberger", logo: wienerbergerLogo, url: "https://www.wienerberger.bg" },
  { name: "Weber", logo: weberLogo, url: "https://www.bg.weber" },
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
              <a
                key={`${brand.name}-${i}`}
                href={brand.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 px-6 md:px-10 flex items-center justify-center h-12 cursor-pointer"
              >
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="max-h-8 max-w-[80px] object-contain opacity-50 hover:opacity-80 transition-opacity"
                  loading="lazy"
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandCarousel;
