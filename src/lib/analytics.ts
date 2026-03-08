import { supabase } from "@/integrations/supabase/client";

const SESSION_KEY = "analytics_session_id";

export function getSessionId(): string {
  let id = sessionStorage.getItem(SESSION_KEY);
  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem(SESSION_KEY, id);
  }
  return id;
}

export function classifyReferrer(referrer: string): string {
  if (!referrer) return "direct";

  try {
    const url = new URL(referrer);
    const host = url.hostname.toLowerCase();

    // Email clients / marketing platforms
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

    // Organic search engines
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

    // Social networks
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

    // Any other referrer domain = referral
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
    await supabase.from("analytics_events" as any).insert({
      event_type: eventType,
      event_name: eventName,
      session_id: getSessionId(),
      page_path: extras?.page_path ?? window.location.pathname,
      duration_seconds: extras?.duration_seconds ?? null,
      referrer_source: extras?.referrer_source ?? null,
      referrer: extras?.referrer ?? null,
    });
  } catch {
    // silently fail - analytics should never break the app
  }
}
