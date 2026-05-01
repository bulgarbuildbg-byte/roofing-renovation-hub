import type { SupportedLanguage } from "./config";

export type CityKey = "varna" | "burgas" | "ruse" | "dobrich";

export interface CityData {
  slug: string;
  nameBg: string;
  nameLatin: string;
  nameLocative: string; // "във Варна" / "в Бургас" / "в Русе" / "в Добрич"
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
    email: "office@bulgarbuild.com",
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
    email: "office@bulgarbuild.com",
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
  ruse: {
    slug: "ruse",
    nameBg: "Русе",
    nameLatin: "Ruse",
    nameLocative: "в Русе",
    phone: "088 499 7659",
    phoneTel: "0884997659",
    email: "office@bulgarbuild.com",
    workingHours: "Пон–Съб 08:00–18:00",
    emergency: "Аварии 24/7",
    neighborhoods: [
      "Възраждане", "Здравец", "Чародейка", "Дружба", "Изгрев",
      "Централен Юг", "Родина", "Цветница", "Мальовица", "Здравец Изток",
    ],
    geo: { lat: 43.8564, lng: 25.9707 },
    postalCode: "7000",
    region: "Русе",
    defaultLang: "bg",
  },
  dobrich: {
    slug: "dobrich",
    nameBg: "Добрич",
    nameLatin: "Dobrich",
    nameLocative: "в Добрич",
    phone: "088 499 7659",
    phoneTel: "0884997659",
    email: "office@bulgarbuild.com",
    workingHours: "Пон–Съб 08:00–18:00",
    emergency: "Аварии 24/7",
    neighborhoods: [
      "Балик", "Дружба", "Изгрев", "Рилци", "Запад",
      "Север", "Център", "Добротица", "Хр. Ботев", "Русе",
    ],
    geo: { lat: 43.5667, lng: 27.8333 },
    postalCode: "9300",
    region: "Добрич",
    defaultLang: "bg",
  },
};

export const DEFAULT_CITY: CityKey = "varna";

export const ACTIVE_CITIES: CityKey[] = ["varna", "burgas", "ruse", "dobrich"];

export const COMING_SOON_CITIES: { slug: string; nameBg: string }[] = [
  { slug: "plovdiv", nameBg: "Пловдив" },
  { slug: "sofia", nameBg: "София" },
];

export function isCityKey(value: string | undefined): value is CityKey {
  return value === "varna" || value === "burgas" || value === "ruse" || value === "dobrich";
}

export function getCityFromSlug(slug: string | undefined): CityKey | null {
  if (!slug) return null;
  return isCityKey(slug) ? slug : null;
}
