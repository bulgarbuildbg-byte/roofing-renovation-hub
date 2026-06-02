// Multi-select service categories for contracts & project sites (CRM)
export const SERVICE_CATEGORIES: { value: string; label: string; group: string }[] = [
  // Roofing
  { value: "roof_repair", label: "Ремонт на покрив", group: "Покриви" },
  { value: "new_roof", label: "Нов покрив", group: "Покриви" },
  { value: "waterproofing", label: "Хидроизолация", group: "Покриви" },
  // Construction
  { value: "rough_construction", label: "Груб строеж", group: "Строителство" },
  { value: "formwork", label: "Кофраж", group: "Строителство" },
  { value: "rebar", label: "Арматура", group: "Строителство" },
  { value: "concrete", label: "Бетон", group: "Строителство" },
  // Finishing
  { value: "finishing", label: "Довършителни работи", group: "Довършителни" },
  { value: "facades", label: "Фасади и саниране", group: "Довършителни" },
  { value: "interior", label: "Вътрешни ремонти", group: "Довършителни" },
  // Infrastructure
  { value: "drainage", label: "Дренажи", group: "Инфраструктура" },
  { value: "fences", label: "Огради", group: "Инфраструктура" },
  { value: "concrete_pads", label: "Бетонови площадки и пътеки", group: "Инфраструктура" },
  // Other
  { value: "other", label: "Други", group: "Други" },
];

export const serviceCategoryLabel = (value: string) =>
  SERVICE_CATEGORIES.find((c) => c.value === value)?.label || value;

export const CONTRACT_WORKFLOW_LABELS: Record<string, string> = {
  prepared: "Договор подготвен",
  sent: "Договор изпратен",
  signed: "Договор подписан",
  rejected: "Договор отказан",
};

export const CONTRACT_WORKFLOW_COLORS: Record<string, { bg: string; text: string }> = {
  prepared: { bg: "hsl(215 80% 50% / 0.15)", text: "#3b82f6" },
  sent: { bg: "hsl(45 100% 50% / 0.15)", text: "#f59e0b" },
  signed: { bg: "hsl(150 60% 40% / 0.18)", text: "#22c55e" },
  rejected: { bg: "hsl(0 80% 50% / 0.15)", text: "#ef4444" },
};

export const PROJECT_SITE_STATUS_LABELS: Record<string, string> = {
  pending_start: "Предстои старт",
  active: "Активен обект",
  paused: "Временно спрян",
  completed: "Завършен",
  invoiced: "Приключен и фактуриран",
  problematic: "Проблемен обект",
};

export const PROJECT_DOC_CATEGORIES: { value: string; label: string }[] = [
  { value: "contracts", label: "Договори" },
  { value: "quotes", label: "Оферти" },
  { value: "invoices", label: "Фактури" },
  { value: "payments", label: "Плащания" },
  { value: "photos", label: "Снимки" },
  { value: "protocols", label: "Протоколи" },
  { value: "other", label: "Други" },
];

// =========================================================
// EXTENDED INQUIRY (LEAD) WORKFLOW
// Full lifecycle: inquiry -> quote -> contract -> project
// =========================================================

export type InquiryPhase = "inquiry" | "quote" | "contract" | "project" | "lost";

export const INQUIRY_STATUS_LABELS: Record<string, string> = {
  // Inquiry phase
  new: "Ново запитване",
  contacted: "Свързани с клиента",
  // Quote phase
  quote_prepared: "Оферта изготвена",
  quote_sent: "Оферта изпратена",
  accepted: "Оферта приета",
  // Contract phase
  contract_prepared: "Договор изготвен",
  contract_sent: "Договор изпратен",
  contract_signed: "Договор подписан",
  // Project phase
  project_active: "Обект активен",
  project_completed: "Обект завършен",
  invoiced: "Приключен / фактуриран",
  // Lost
  rejected: "Отказано",
  contract_rejected: "Договор отказан",
};

export const INQUIRY_STATUS_PHASE: Record<string, InquiryPhase> = {
  new: "inquiry",
  contacted: "inquiry",
  quote_prepared: "quote",
  quote_sent: "quote",
  accepted: "quote",
  contract_prepared: "contract",
  contract_sent: "contract",
  contract_signed: "contract",
  project_active: "project",
  project_completed: "project",
  invoiced: "project",
  rejected: "lost",
  contract_rejected: "lost",
};

export const PHASE_LABELS: Record<InquiryPhase, string> = {
  inquiry: "Запитване",
  quote: "Оферта",
  contract: "Договор",
  project: "Обект",
  lost: "Изгубено",
};

export const PHASE_COLORS: Record<InquiryPhase, { bg: string; text: string; glow: string }> = {
  inquiry: { bg: "hsl(215 80% 50% / 0.15)", text: "#3b82f6", glow: "0 0 8px hsl(215 80% 50% / 0.3)" },
  quote: { bg: "hsl(270 60% 55% / 0.15)", text: "#a78bfa", glow: "0 0 8px hsl(270 60% 55% / 0.25)" },
  contract: { bg: "hsl(150 60% 40% / 0.18)", text: "#22c55e", glow: "0 0 8px hsl(150 60% 40% / 0.3)" },
  project: { bg: "hsl(150 65% 35% / 0.22)", text: "#16a34a", glow: "0 0 10px hsl(150 65% 35% / 0.35)" },
  lost: { bg: "hsl(0 80% 50% / 0.15)", text: "#ef4444", glow: "0 0 8px hsl(0 80% 50% / 0.25)" },
};

export const inquiryStatusLabel = (status: string) =>
  INQUIRY_STATUS_LABELS[status] || status;

export const inquiryStatusPhase = (status: string): InquiryPhase =>
  INQUIRY_STATUS_PHASE[status] || "inquiry";

// Which inquiry statuses indicate that contract section should be active/visible
export const CONTRACT_RELEVANT_STATUSES = [
  "contract_prepared",
  "contract_sent",
  "contract_signed",
  "contract_rejected",
  "project_active",
  "project_completed",
  "invoiced",
];

// =========================================================
// Currency
// =========================================================
export const CURRENCIES = [
  { value: "EUR", label: "EUR (€)", symbol: "€" },
  { value: "BGN", label: "BGN (лв)", symbol: "лв" },
];

export const currencySymbol = (c?: string | null) =>
  CURRENCIES.find((x) => x.value === c)?.symbol || "€";

// =========================================================
// Contract file categories
// =========================================================
export const CONTRACT_FILE_CATEGORIES: { value: string; label: string }[] = [
  { value: "contract", label: "Договор" },
  { value: "annex", label: "Анекс" },
  { value: "scan", label: "Сканиран договор" },
  { value: "photo", label: "Снимка" },
  { value: "other", label: "Друго" },
];

export const contractFileCategoryLabel = (v: string) =>
  CONTRACT_FILE_CATEGORIES.find((c) => c.value === v)?.label || v;
