import type { SupportedLanguage } from "./config";

export type CityKey = "varna" | "burgas";

export interface CityData {
  slug: string;
  nameBg: string;
  nameLatin: string;
  nameLocative: string; // "във Варна" / "в Бургас"
  phone: string;
  phoneTel: string;
  email: string;
  workingHours: string;
  emergency: string;
  neighborhoods: string[];
  geo: { lat: number; lng: number };
  postalCode: string;
  region: string;
  defaultLang: SupportedLanguage;
  comingSoon?: boolean;
}

export const CITIES: Record<CityKey, CityData> = {
  varna: {
    slug: "varna",
    nameBg: "Варна",
    nameLatin: "Varna",
    nameLocative: "във Варна",
    phone: "088 499 7659",
    phoneTel: "0884997659",
    email: "remontnapokrivivarna@abv.bg",
    workingHours: "Пон–Съб 08:00–18:00",
    emergency: "Аварии 24/7",
    neighborhoods: [
      "Аспарухово", "Чайка", "Левски", "Владиславово", "Виница",
      "Галата", "Кайсиева градина", "Младост", "Възраждане", "Бриз",
    ],
    geo: { lat: 43.2141, lng: 27.9147 },
    postalCode: "9000",
    region: "Варна",
    defaultLang: "bg",
  },
  burgas: {
    slug: "burgas",
    nameBg: "Бургас",
    nameLatin: "Burgas",
    nameLocative: "в Бургас",
    phone: "088 499 7659",
    phoneTel: "0884997659",
    email: "remontnapokrivivarna@abv.bg",
    workingHours: "Пон–Съб 08:00–18:00",
    emergency: "Аварии 24/7",
    neighborhoods: [
      "Сарафово", "Лазур", "Изгрев", "Славейков", "Меден рудник",
      "Ветрен", "Братя Миладинови", "Горно Езерово", "Победа", "Крайморие",
    ],
    geo: { lat: 42.5048, lng: 27.4626 },
    postalCode: "8000",
    region: "Бургас",
    defaultLang: "bg",
  },
};

export const DEFAULT_CITY: CityKey = "varna";

export const ACTIVE_CITIES: CityKey[] = ["varna", "burgas"];

export const COMING_SOON_CITIES: { slug: string; nameBg: string }[] = [
  { slug: "ruse", nameBg: "Русе" },
  { slug: "plovdiv", nameBg: "Пловдив" },
  { slug: "sofia", nameBg: "София" },
];

export function isCityKey(value: string | undefined): value is CityKey {
  return value === "varna" || value === "burgas";
}

export function getCityFromSlug(slug: string | undefined): CityKey | null {
  if (!slug) return null;
  return isCityKey(slug) ? slug : null;
}
