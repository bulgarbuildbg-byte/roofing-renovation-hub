import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { trackEvent, getSessionId, classifyReferrer, isBot, setFirstReferrerSource, trackCallClick } from "@/lib/analytics";

const AnalyticsTracker = () => {
  const location = useLocation();
  const startTime = useRef(Date.now());

  // Track page views on route change, including referrer classification
  useEffect(() => {
    // Only track on the real production domain
    if (!window.location.hostname.endsWith("remontnapokrivivarna.bg")) return;
    // Don't track admin pages
    if (location.pathname.startsWith("/admin")) return;

    const referrer = document.referrer || "";
    const source = classifyReferrer(referrer);

    // Store first-touch source for conversion tracking
    setFirstReferrerSource(source);

    trackEvent("page_view", "visit", {
      page_path: location.pathname,
      referrer_source: source,
      referrer: referrer || null,
    });
  }, [location.pathname]);

  // Track session duration on unload
  useEffect(() => {
    // Only track on the real production domain
    if (!window.location.hostname.endsWith("remontnapokrivivarna.bg")) return;

    const handleUnload = () => {
      const seconds = Math.round((Date.now() - startTime.current) / 1000);
      if (seconds < 2) return;

      const url = `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/analytics_events`;
      const body = JSON.stringify({
        event_type: "session_duration",
        event_name: "session_end",
        session_id: getSessionId(),
        page_path: window.location.pathname,
        duration_seconds: seconds,
        is_bot: isBot(),
      });

      fetch(url, {
        method: "POST",
        keepalive: true,
        headers: {
          "Content-Type": "application/json",
          "apikey": import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
          "Authorization": `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          "Prefer": "return=minimal",
        },
        body,
      }).catch(() => {});
    };

    window.addEventListener("beforeunload", handleUnload);
    return () => window.removeEventListener("beforeunload", handleUnload);
  }, []);

  return null;
};

export default AnalyticsTracker;
