import { supabase } from "@/integrations/supabase/client";

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

export async function trackEvent(
  eventType: string,
  eventName: string,
  extras?: {
    page_path?: string;
    duration_seconds?: number;
    referrer_source?: string;
    referrer?: string;
  }
) {
  try {
    const botFlag = isBot();
    await supabase.from("analytics_events" as any).insert({
      event_type: eventType,
      event_name: eventName,
      session_id: getSessionId(),
      page_path: extras?.page_path ?? window.location.pathname,
      duration_seconds: extras?.duration_seconds ?? null,
      referrer_source: extras?.referrer_source ?? null,
      referrer: extras?.referrer ?? null,
      is_bot: botFlag,
    });
  } catch {
    // silently fail - analytics should never break the app
  }
}

/**
 * Log a phone call click: track analytics event + fire Google Ads conversion.
 * Called from the global tel: click interceptor in AnalyticsTracker.
 */
export function trackCallClick(phoneNumber: string) {
  // Track as analytics event (public insert allowed)
  trackEvent("button_click", "call_button", {
    page_path: window.location.pathname,
  });

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
