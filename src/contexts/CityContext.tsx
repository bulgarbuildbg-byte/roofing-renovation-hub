import { createContext, useContext, useMemo, type ReactNode } from "react";
import { useParams } from "react-router-dom";
import { CITIES, DEFAULT_CITY, isCityKey, type CityKey, type CityData } from "@/i18n/cities";

interface CityContextValue {
  city: CityKey;
  cityData: CityData;
  isCityRoute: boolean;
}

const CityContext = createContext<CityContextValue | null>(null);

export const CityProvider = ({ children }: { children: ReactNode }) => {
  const { city: cityParam } = useParams<{ city?: string }>();

  const value = useMemo<CityContextValue>(() => {
    const isCityRoute = isCityKey(cityParam);
    const city: CityKey = isCityRoute ? (cityParam as CityKey) : DEFAULT_CITY;
    return {
      city,
      cityData: CITIES[city],
      isCityRoute,
    };
  }, [cityParam]);

  return <CityContext.Provider value={value}>{children}</CityContext.Provider>;
};

export function useCity(): CityContextValue {
  const ctx = useContext(CityContext);
  if (!ctx) {
    // Fallback for components rendered outside city-aware tree (legacy /bg/* pages)
    return {
      city: DEFAULT_CITY,
      cityData: CITIES[DEFAULT_CITY],
      isCityRoute: false,
    };
  }
  return ctx;
}
