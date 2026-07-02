import { supabase } from "@/integrations/supabase/client";
import { captureAttribution, getAttribution, attributionPayload } from "@/lib/attribution";

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

const SESSION_KEY = "analytics_session_id";
const REFERRER_KEY = "analytics_first_referrer_source";

const BOT_PATTERNS = [
  /bot/i, /crawl/i, /spider/i, /slurp/i, /mediapartners/i,
  /googlebot/i, /bingbot/i, /yandex/i, /baiduspider/i,
  /facebookexternalhit/i, /twitterbot/i, /linkedinbot/i,
  /whatsapp/i, /telegrambot/i, /discordbot/i,
  /semrushbot/i, /ahrefsbot/i, /dotbot/i, /mj12bot/i,
  /petalbot/i, /bytespider/i, /gptbot/i, /applebot/i,
];

export function isBot(): boolean {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent || "";
  if ((navigator as any).webdriver) return true;
  return BOT_PATTERNS.some((p) => p.test(ua));
}

export function getSessionId(): string {
  let id = sessionStorage.getItem(SESSION_KEY);
  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem(SESSION_KEY, id);
  }
  return id;
}

/** Store first-touch referrer source for the session (used by inquiry form) */
export function setFirstReferrerSource(source: string) {
  if (!sessionStorage.getItem(REFERRER_KEY)) {
    sessionStorage.setItem(REFERRER_KEY, source);
  }
}

export function getFirstReferrerSource(): string {
  return sessionStorage.getItem(REFERRER_KEY) || "direct";
}

export function classifyReferrer(referrer: string): string {
  if (!referrer) return "direct";

  try {
    const url = new URL(referrer);
    const host = url.hostname.toLowerCase();

    if (
      host.includes("mail.") ||
      host.includes("mailchimp") ||
      host.includes("sendinblue") ||
      host.includes("brevo") ||
      host.includes("mailerlite") ||
      host.includes("klaviyo") ||
      host.includes("hubspot") ||
      referrer.includes("utm_medium=email")
    ) return "email";

    if (
      host.includes("google.") ||
      host.includes("bing.com") ||
      host.includes("yahoo.com") ||
      host.includes("duckduckgo.com") ||
      host.includes("yandex.") ||
      host.includes("baidu.com") ||
      host.includes("search.") ||
      host.includes("ecosia.org") ||
      host.includes("startpage.com")
    ) return "organic";

    if (
      host.includes("facebook.com") ||
      host.includes("fb.com") ||
      host.includes("instagram.com") ||
      host.includes("youtube.com") ||
      host.includes("youtu.be") ||
      host.includes("tiktok.com") ||
      host.includes("linkedin.com") ||
      host.includes("twitter.com") ||
      host.includes("x.com") ||
      host.includes("t.co") ||
      host.includes("pinterest.com") ||
      host.includes("vk.com") ||
      host.includes("ok.ru")
    ) return "social";

    return "referral";
  } catch {
    return "direct";
  }
}

export type DeviceType = "mobile" | "tablet" | "desktop";

export function getDeviceType(): DeviceType {
  if (typeof window === "undefined") return "desktop";
  const w = window.innerWidth;
  if (w < 768) return "mobile";
  if (w < 1024) return "tablet";
  return "desktop";
}

export function getUtmParams() {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  return {
    utm_source: params.get("utm_source") || undefined,
    utm_medium: params.get("utm_medium") || undefined,
    utm_campaign: params.get("utm_campaign") || undefined,
  };
}

export async function trackEvent(
  eventType: string,
  eventName: string,
  extras?: {
    page_path?: string;
    duration_seconds?: number;
    referrer_source?: string;
    referrer?: string | null;
    device_type?: DeviceType;
    viewport_w?: number;
    viewport_h?: number;
    time_on_page_ms?: number;
    is_exit?: boolean;
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
  }
) {
  try {
    const botFlag = isBot();
    const attr = attributionPayload();
    await supabase.from("analytics_events" as any).insert({
      event_type: eventType,
      event_name: eventName,
      session_id: getSessionId(),
      page_path: extras?.page_path ?? window.location.pathname,
      duration_seconds: extras?.duration_seconds ?? null,
      referrer: extras?.referrer ?? null,
      device_type: extras?.device_type ?? getDeviceType(),
      viewport_w: extras?.viewport_w ?? window.innerWidth,
      viewport_h: extras?.viewport_h ?? window.innerHeight,
      time_on_page_ms: extras?.time_on_page_ms ?? null,
      is_exit: extras?.is_exit ?? false,
      is_bot: botFlag,
      // First-touch attribution (overridable by explicit extras for backwards compat)
      channel: attr.channel,
      referrer_source: extras?.referrer_source ?? attr.referrer_source,
      utm_source: extras?.utm_source ?? attr.utm_source,
      utm_medium: extras?.utm_medium ?? attr.utm_medium,
      utm_campaign: extras?.utm_campaign ?? attr.utm_campaign,
      utm_content: attr.utm_content,
      utm_term: attr.utm_term,
      gclid: attr.gclid,
      fbclid: attr.fbclid,
      ttclid: attr.ttclid,
      landing_page: attr.landing_page,
    });
  } catch {
    // silently fail - analytics should never break the app
  }
}

/**
 * Track calculator funnel events (start, step, complete).
 */
export function trackCalculatorEvent(
  step: string,
  selections?: Record<string, string>
) {
  trackEvent("calculator", step, {
    page_path: window.location.pathname,
  });
  // If there are selections, log them as a separate detail event
  if (selections && Object.keys(selections).length > 0) {
    trackEvent("calculator_detail", step, {
      page_path: window.location.pathname,
    });
  }
}

/**
 * Log a phone call click: analytics event + Google Ads conversion +
 * anonymous row in `call_log` so admins can see the marketing channel
 * that produced the call.
 */
export function trackCallClick(phoneNumber: string) {
  // Track as analytics event (public insert allowed)
  trackEvent("button_click", "call_button", {
    page_path: window.location.pathname,
  });

  // Log the call itself with its attribution so admins can attribute revenue
  try {
    const attr = getAttribution();
    supabase.from("call_log" as any).insert({
      client_name: "Уеб посетител",
      client_phone: phoneNumber,
      call_direction: "inbound",
      source: "web_click",
      session_id: getSessionId(),
      page_path: window.location.pathname,
      channel: attr.channel,
      referrer_source: attr.referrer_source,
      utm_source: attr.utm_source,
      utm_medium: attr.utm_medium,
      utm_campaign: attr.utm_campaign,
      notes: "Автоматично уловено обаждане от бутона за телефон.",
    }).then(() => {}, () => {});
  } catch { /* never break the app */ }

  // Fire Google Ads conversion for both accounts
  if (window.gtag) {
    window.gtag("event", "conversion", {
      send_to: "AW-17872435541/call_click",
      value: 1.0,
      currency: "BGN",
    });
    window.gtag("event", "conversion", {
      send_to: "AW-18066399675/call_click",
      value: 1.0,
      currency: "BGN",
    });
  }
}

// Ensure attribution is captured as soon as this module loads.
if (typeof window !== "undefined") {
  try { captureAttribution(); } catch { /* ignore */ }
}

