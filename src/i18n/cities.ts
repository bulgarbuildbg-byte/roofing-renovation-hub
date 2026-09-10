import type { SupportedLanguage } from "./config";

export type CityKey = "varna" | "burgas" | "ruse" | "dobrich" | "sofia" | "plovdiv";

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
    phone: "089 397 1873",
    phoneTel: "0893971873",
    email: "remontnapokrivivarna@gmail.com",
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
    phone: "089 397 1873",
    phoneTel: "0893971873",
    email: "remontnapokrivivarna@gmail.com",
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
    phone: "089 397 1873",
    phoneTel: "0893971873",
    email: "remontnapokrivivarna@gmail.com",
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
    phone: "089 397 1873",
    phoneTel: "0893971873",
    email: "remontnapokrivivarna@gmail.com",
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
  sofia: {
    slug: "sofia",
    nameBg: "София",
    nameLatin: "Sofia",
    nameLocative: "в София",
    phone: "089 397 1873",
    phoneTel: "0893971873",
    email: "remontnapokrivivarna@gmail.com",
    workingHours: "Пон–Съб 08:00–18:00",
    emergency: "Аварии 24/7",
    neighborhoods: [
      "Лозенец", "Младост", "Люлин", "Драгалевци", "Бояна",
      "Овча купел", "Витоша", "Надежда", "Изгрев", "Банишора",
    ],
    geo: { lat: 42.6977, lng: 23.3219 },
    postalCode: "1000",
    region: "София-град",
    defaultLang: "bg",
  },
  plovdiv: {
    slug: "plovdiv",
    nameBg: "Пловдив",
    nameLatin: "Plovdiv",
    nameLocative: "в Пловдив",
    phone: "089 397 1873",
    phoneTel: "0893971873",
    email: "remontnapokrivivarna@gmail.com",
    workingHours: "Пон–Съб 08:00–18:00",
    emergency: "Аварии 24/7",
    neighborhoods: [
      "Кючук Париж", "Тракия", "Каменица", "Смирненски", "Център",
      "Западен", "Остромила", "Коматево", "Гагарин", "Мараша",
    ],
    geo: { lat: 42.1354, lng: 24.7453 },
    postalCode: "4000",
    region: "Пловдив",
    defaultLang: "bg",
  },
};

export const DEFAULT_CITY: CityKey = "varna";

export const ACTIVE_CITIES: CityKey[] = ["varna", "burgas", "ruse", "dobrich", "sofia", "plovdiv"];

/** Градове с пълен набор подстраници за отделни услуги (/bg/:city/:service). */
export const SERVICE_PAGE_CITIES: CityKey[] = ["varna", "burgas", "ruse", "dobrich"];

export const COMING_SOON_CITIES: { slug: string; nameBg: string }[] = [];

export function isCityKey(value: string | undefined): value is CityKey {
  return (
    value === "varna" || value === "burgas" || value === "ruse" ||
    value === "dobrich" || value === "sofia" || value === "plovdiv"
  );
}

export function getCityFromSlug(slug: string | undefined): CityKey | null {
  if (!slug) return null;
  return isCityKey(slug) ? slug : null;
}
