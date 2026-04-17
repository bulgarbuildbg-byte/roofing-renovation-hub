import { useParams } from "react-router-dom";
import { isCityKey } from "@/i18n/cities";
import BurgasHome from "@/pages/cities/BurgasHome";
import VarnaHome from "@/pages/cities/VarnaHome";
import NotFound from "@/pages/NotFound";

/**
 * Routes city-scoped pages: /:lang/:city/* 
 * 
 * Stage 1: Only home pages exist for each city.
 * Stage 2 will add /:lang/:city/[service] pages.
 */
const CityPageRouter = () => {
  const { city, "*": rest } = useParams<{ city: string; "*": string }>();

  if (!isCityKey(city)) {
    return <NotFound />;
  }

  // Home page (no sub-path)
  if (!rest) {
    if (city === "burgas") return <BurgasHome />;
    if (city === "varna") return <VarnaHome />;
  }

  // Future: service sub-pages will be wired here in Stage 2
  return <NotFound />;
};

export default CityPageRouter;
