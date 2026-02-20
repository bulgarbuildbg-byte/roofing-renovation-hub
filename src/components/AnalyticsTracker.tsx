import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { trackEvent, getSessionId } from "@/lib/analytics";
import { supabase } from "@/integrations/supabase/client";

const AnalyticsTracker = () => {
  const location = useLocation();
  const startTime = useRef(Date.now());

  // Track page views on route change
  useEffect(() => {
    // Don't track admin pages
    if (location.pathname.startsWith("/admin")) return;
    trackEvent("page_view", "visit", { page_path: location.pathname });
  }, [location.pathname]);

  // Track session duration on unload
  useEffect(() => {
    const handleUnload = () => {
      const seconds = Math.round((Date.now() - startTime.current) / 1000);
      if (seconds < 2) return;

      const body = JSON.stringify({
        event_type: "session_duration",
        event_name: "session_end",
        session_id: getSessionId(),
        page_path: window.location.pathname,
        duration_seconds: seconds,
      });

      const url = `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/analytics_events`;
      navigator.sendBeacon(
        url + `?apikey=${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        new Blob([body], { type: "application/json" })
      );
    };

    window.addEventListener("beforeunload", handleUnload);
    return () => window.removeEventListener("beforeunload", handleUnload);
  }, []);

  return null;
};

export default AnalyticsTracker;
