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
  // Read city from the catch-all `*` param (first segment) since route is /:lang/*
  const { "*": rest } = useParams<{ "*": string }>();

  const value = useMemo<CityContextValue>(() => {
    const firstSegment = (rest || "").split("/")[0];
    const isCityRoute = isCityKey(firstSegment);
    const city: CityKey = isCityRoute ? (firstSegment as CityKey) : DEFAULT_CITY;
    return {
      city,
      cityData: CITIES[city],
      isCityRoute,
    };
  }, [rest]);

  return <CityContext.Provider value={value}>{children}</CityContext.Provider>;
};

export function useCity(): CityContextValue {
  const ctx = useContext(CityContext);
  if (!ctx) {
    return {
      city: DEFAULT_CITY,
      cityData: CITIES[DEFAULT_CITY],
      isCityRoute: false,
    };
  }
  return ctx;
}
