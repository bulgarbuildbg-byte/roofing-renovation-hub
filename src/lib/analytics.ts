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

export async function trackEvent(
  eventType: string,
  eventName: string,
  extras?: { page_path?: string; duration_seconds?: number }
) {
  try {
    await supabase.from("analytics_events" as any).insert({
      event_type: eventType,
      event_name: eventName,
      session_id: getSessionId(),
      page_path: extras?.page_path ?? window.location.pathname,
      duration_seconds: extras?.duration_seconds ?? null,
    });
  } catch {
    // silently fail - analytics should never break the app
  }
}
