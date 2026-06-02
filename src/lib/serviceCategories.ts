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
