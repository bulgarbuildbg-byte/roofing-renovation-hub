import { useNavigate, useParams } from "react-router-dom";
import { MapPin, Check } from "lucide-react";
import { CITIES, ACTIVE_CITIES, COMING_SOON_CITIES, isCityKey, type CityKey } from "@/i18n/cities";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const CitySwitcher = () => {
  const navigate = useNavigate();
  const { lang, "*": rest } = useParams<{ lang?: string; "*"?: string }>();

  const currentLang = lang || "bg";
  // City lives in the first segment of the catch-all `*` param (route is /:lang/*)
  const firstSegment = (rest || "").split("/")[0];
  const currentCity: CityKey = isCityKey(firstSegment) ? (firstSegment as CityKey) : "varna";
  const currentData = CITIES[currentCity];

  const switchCity = (newCity: CityKey) => {
    if (newCity === currentCity) return;
    if (newCity === "varna") {
      // Varna is the legacy default — navigate to /:lang root (no /varna prefix)
      navigate(`/${currentLang}`);
    } else {
      // Other cities use explicit /:lang/:city/ pattern
      navigate(`/${currentLang}/${newCity}`);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-1.5 bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-all font-semibold px-3 py-2 rounded-full shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 min-h-0 h-auto border border-border">
        <MapPin className="w-4 h-4" />
        <span className="text-sm tracking-wide">{currentData.nameBg}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" sideOffset={8} className="w-56 z-[130] rounded-xl shadow-xl border border-border/50 backdrop-blur-sm p-1.5">
        <DropdownMenuLabel className="text-xs uppercase tracking-wide text-muted-foreground px-3 py-1.5">
          Изберете град
        </DropdownMenuLabel>
        {ACTIVE_CITIES.map((c) => (
          <DropdownMenuItem
            key={c}
            onClick={() => switchCity(c)}
            className={`cursor-pointer rounded-lg px-3 py-2.5 transition-all flex items-center justify-between ${
              c === currentCity
                ? "bg-primary text-primary-foreground font-bold"
                : "hover:bg-muted"
            }`}
          >
            <span className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              {CITIES[c].nameBg}
            </span>
            {c === currentCity && <Check className="w-4 h-4" />}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuLabel className="text-xs uppercase tracking-wide text-muted-foreground px-3 py-1.5">
          Скоро
        </DropdownMenuLabel>
        {COMING_SOON_CITIES.map((c) => (
          <DropdownMenuItem
            key={c.slug}
            disabled
            className="rounded-lg px-3 py-2.5 opacity-50 cursor-not-allowed"
          >
            <span className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              {c.nameBg}
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CitySwitcher;
