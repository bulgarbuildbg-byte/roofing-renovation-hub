import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getSessionId, getFirstReferrerSource, isBot } from "@/lib/analytics";

/**
 * Microsoft Clarity loader + custom tags for CRM deep-linking.
 *
 * Loads only on the production domain (not preview / not /admin / not bots).
 * Tags every session with our own session_id so we can deep-link from CRM:
 *   https://clarity.microsoft.com/projects/view/<PROJECT_ID>/impressions?CustomSessionId=<session_id>
 */

declare global {
  interface Window {
    clarity?: (...args: any[]) => void;
  }
}

const PROJECT_ID = import.meta.env.VITE_CLARITY_PROJECT_ID as string | undefined;

const getDeviceType = (): "mobile" | "tablet" | "desktop" => {
  const w = window.innerWidth;
  if (w < 768) return "mobile";
  if (w < 1024) return "tablet";
  return "desktop";
};

const ClarityTracker = () => {
  const location = useLocation();

  // Inject the Clarity script once
  useEffect(() => {
    if (!PROJECT_ID) return;
    if (typeof window === "undefined") return;
    if (!window.location.hostname.endsWith("remontnapokrivivarna.bg")) return;
    if (window.location.pathname.startsWith("/admin")) return;
    if (isBot()) return;
    if (window.clarity) return;

    (function (c: any, l: Document, a: string, r: string, i: string) {
      c[a] =
        c[a] ||
        function (...args: any[]) {
          (c[a].q = c[a].q || []).push(args);
        };
      const t = l.createElement(r) as HTMLScriptElement;
      t.async = true;
      t.src = "https://www.clarity.ms/tag/" + i;
      const y = l.getElementsByTagName(r)[0];
      y.parentNode?.insertBefore(t, y);
    })(window, document, "clarity", "script", PROJECT_ID);
  }, []);

  // Set custom tags + identify on every route change
  useEffect(() => {
    if (!PROJECT_ID) return;
    if (!window.clarity) return;
    if (window.location.pathname.startsWith("/admin")) return;

    const sid = getSessionId();
    try {
      // Identify lets us search Clarity by our session id
      window.clarity("identify", sid);
      window.clarity("set", "session_id", sid);
      window.clarity("set", "referrer_source", getFirstReferrerSource());
      window.clarity("set", "device_type", getDeviceType());
      window.clarity("set", "lang", document.documentElement.lang || "bg");
      window.clarity("set", "page", location.pathname);
    } catch {
      // never break the app
    }
  }, [location.pathname]);

  return null;
};

export default ClarityTracker;

/** Public helper: tag the current Clarity session with the new inquiry id. */
export const tagClarityInquiry = (inquiryId: string) => {
  try {
    window.clarity?.("set", "inquiry_id", inquiryId);
    window.clarity?.("event", "form_submit");
  } catch {
    /* ignore */
  }
};
