/**
 * Marketing attribution helpers.
 *
 * Classifies every session into a channel (google_ads / meta_ads / tiktok_ads /
 * paid_other / organic / social_organic / referral / direct / email) using
 * URL params (UTM + click IDs) and the referrer. First-touch: the first
 * classified channel for a session is persisted in sessionStorage and reused
 * for every form/call sent afterwards, so an inquiry always carries the
 * channel that brought the visitor.
 *
 * Click IDs (gclid / fbclid / ttclid) additionally persist in localStorage
 * for 90 days so returning visitors are still attributed to the paid click.
 */

export type Channel =
  | "google_ads"
  | "meta_ads"
  | "tiktok_ads"
  | "paid_other"
  | "organic"
  | "social_organic"
  | "referral"
  | "email"
  | "direct";

export const CHANNEL_LABELS: Record<Channel, string> = {
  google_ads:     "Google Ads",
  meta_ads:       "Meta / Facebook Ads",
  tiktok_ads:     "TikTok Ads",
  paid_other:     "Друга реклама",
  organic:        "Органично търсене",
  social_organic: "Соц. мрежи (органично)",
  referral:       "Препращане",
  email:          "Имейл",
  direct:         "Директен",
};

export const CHANNEL_COLORS: Record<Channel, string> = {
  google_ads:     "#fbbc05", // Google yellow
  meta_ads:       "#1877f2", // Facebook blue
  tiktok_ads:     "#ff0050", // TikTok pink
  paid_other:     "#a855f7",
  organic:        "#22c55e",
  social_organic: "#8b5cf6",
  referral:       "#f59e0b",
  email:          "#06b6d4",
  direct:         "#64748b",
};

export const ALL_CHANNELS: Channel[] = [
  "google_ads", "meta_ads", "tiktok_ads", "paid_other",
  "organic", "social_organic", "referral", "email", "direct",
];

export interface Attribution {
  channel: Channel;
  referrer_source: string; // legacy short label (organic/social/direct/…)
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
  utm_term: string | null;
  gclid: string | null;
  fbclid: string | null;
  ttclid: string | null;
  landing_page: string | null;
  referrer: string | null;
}

const ATTR_KEY = "attribution_first_touch_v1";
const CLICKID_KEY = "attribution_click_ids_v1";
const CLICKID_TTL_MS = 90 * 24 * 60 * 60 * 1000; // 90 days

const isPaidMedium = (m?: string | null) =>
  !!m && /^(cpc|ppc|paid|paidsocial|paid-social|display|cpm|social-paid|ads)$/i.test(m);

const isMetaSource = (s?: string | null) =>
  !!s && /(facebook|instagram|fb|ig|meta)/i.test(s);

const isTiktokSource = (s?: string | null) =>
  !!s && /tiktok/i.test(s);

const isGoogleSource = (s?: string | null) =>
  !!s && /google/i.test(s);

/** Read persisted click IDs (with TTL). */
const readClickIds = (): { gclid?: string; fbclid?: string; ttclid?: string } => {
  try {
    const raw = localStorage.getItem(CLICKID_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    if (!parsed?.ts || Date.now() - parsed.ts > CLICKID_TTL_MS) return {};
    return { gclid: parsed.gclid, fbclid: parsed.fbclid, ttclid: parsed.ttclid };
  } catch { return {}; }
};

const persistClickIds = (patch: { gclid?: string; fbclid?: string; ttclid?: string }) => {
  try {
    const cur = readClickIds();
    const next = {
      gclid:  patch.gclid  ?? cur.gclid,
      fbclid: patch.fbclid ?? cur.fbclid,
      ttclid: patch.ttclid ?? cur.ttclid,
      ts: Date.now(),
    };
    if (next.gclid || next.fbclid || next.ttclid) {
      localStorage.setItem(CLICKID_KEY, JSON.stringify(next));
    }
  } catch { /* ignore */ }
};

const classifyChannel = (opts: {
  gclid?: string | null;
  fbclid?: string | null;
  ttclid?: string | null;
  utm_source?: string | null;
  utm_medium?: string | null;
  referrer?: string | null;
}): { channel: Channel; referrer_source: string } => {
  const { gclid, fbclid, ttclid, utm_source, utm_medium, referrer } = opts;

  if (gclid || (isGoogleSource(utm_source) && isPaidMedium(utm_medium)))
    return { channel: "google_ads", referrer_source: "google_ads" };
  if (ttclid || (isTiktokSource(utm_source) && (isPaidMedium(utm_medium) || !utm_medium)))
    return { channel: "tiktok_ads", referrer_source: "tiktok_ads" };
  if (fbclid || (isMetaSource(utm_source) && isPaidMedium(utm_medium)))
    return { channel: "meta_ads", referrer_source: "meta_ads" };
  if (isPaidMedium(utm_medium))
    return { channel: "paid_other", referrer_source: "paid_other" };
  if (utm_medium && /email|newsletter/i.test(utm_medium))
    return { channel: "email", referrer_source: "email" };

  // No paid signal — classify by referrer host
  if (referrer) {
    try {
      const host = new URL(referrer).hostname.toLowerCase();
      if (/(google|bing|yahoo|duckduckgo|yandex|baidu|ecosia|startpage)\./.test(host))
        return { channel: "organic", referrer_source: "organic" };
      if (/(facebook|instagram|fb\.com|tiktok|linkedin|twitter|x\.com|t\.co|pinterest|youtube|youtu\.be|vk\.com|ok\.ru)/.test(host))
        return { channel: "social_organic", referrer_source: "social" };
      if (/mail\.|mailchimp|sendinblue|brevo|mailerlite|klaviyo|hubspot/.test(host))
        return { channel: "email", referrer_source: "email" };
      return { channel: "referral", referrer_source: "referral" };
    } catch { /* fall through */ }
  }
  return { channel: "direct", referrer_source: "direct" };
};

/**
 * Compute + persist first-touch attribution for this session. Safe to call
 * on every page view — it only writes to storage the first time.
 */
export const captureAttribution = (): Attribution => {
  const existing = readAttribution();
  if (existing) return existing;

  const params = new URLSearchParams(typeof window === "undefined" ? "" : window.location.search);
  const gclidNew  = params.get("gclid");
  const fbclidNew = params.get("fbclid");
  const ttclidNew = params.get("ttclid");
  if (gclidNew || fbclidNew || ttclidNew) {
    persistClickIds({
      gclid:  gclidNew  ?? undefined,
      fbclid: fbclidNew ?? undefined,
      ttclid: ttclidNew ?? undefined,
    });
  }
  const stored = readClickIds();

  const utm_source   = params.get("utm_source");
  const utm_medium   = params.get("utm_medium");
  const utm_campaign = params.get("utm_campaign");
  const utm_content  = params.get("utm_content");
  const utm_term     = params.get("utm_term");

  const referrer = typeof document !== "undefined" ? document.referrer || null : null;

  const { channel, referrer_source } = classifyChannel({
    gclid:  gclidNew  ?? stored.gclid  ?? null,
    fbclid: fbclidNew ?? stored.fbclid ?? null,
    ttclid: ttclidNew ?? stored.ttclid ?? null,
    utm_source, utm_medium, referrer,
  });

  const attr: Attribution = {
    channel, referrer_source,
    utm_source, utm_medium, utm_campaign, utm_content, utm_term,
    gclid:  gclidNew  ?? stored.gclid  ?? null,
    fbclid: fbclidNew ?? stored.fbclid ?? null,
    ttclid: ttclidNew ?? stored.ttclid ?? null,
    landing_page: typeof window !== "undefined" ? window.location.pathname : null,
    referrer,
  };

  try { sessionStorage.setItem(ATTR_KEY, JSON.stringify(attr)); } catch { /* ignore */ }
  return attr;
};

/** Read the persisted first-touch attribution, or null if none captured yet. */
export const readAttribution = (): Attribution | null => {
  try {
    const raw = sessionStorage.getItem(ATTR_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as Attribution;
  } catch { return null; }
};

/**
 * Always return an attribution — captures on demand if not present.
 * Use this in form submit handlers.
 */
export const getAttribution = (): Attribution => readAttribution() ?? captureAttribution();

/** Convenient payload for DB inserts. Only keys with values are set (no undefined). */
export const attributionPayload = () => {
  const a = getAttribution();
  return {
    channel: a.channel,
    referrer_source: a.referrer_source,
    utm_source: a.utm_source,
    utm_medium: a.utm_medium,
    utm_campaign: a.utm_campaign,
    utm_content: a.utm_content,
    utm_term: a.utm_term,
    gclid: a.gclid,
    fbclid: a.fbclid,
    ttclid: a.ttclid,
    landing_page: a.landing_page,
  };
};
