import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import {
  trackEvent,
  getSessionId,
  classifyReferrer,
  isBot,
  setFirstReferrerSource,
  trackCallClick,
  getDeviceType,
  getUtmParams,
} from "@/lib/analytics";

const AnalyticsTracker = () => {
  const location = useLocation();
  const pageStart = useRef(Date.now());
  const sessionStart = useRef(Date.now());
  const lastPath = useRef<string | null>(null);

  // Track page views + time spent on the previous page
  useEffect(() => {
    if (!window.location.hostname.endsWith("remontnapokrivivarna.bg")) return;
    if (location.pathname.startsWith("/admin")) return;

    const referrer = document.referrer || "";
    const source = classifyReferrer(referrer);
    setFirstReferrerSource(source);

    // Send "time on page" for the page we are leaving
    if (lastPath.current && lastPath.current !== location.pathname) {
      const ms = Date.now() - pageStart.current;
      if (ms >= 1000) {
        trackEvent("time_on_page", "navigate_away", {
          page_path: lastPath.current,
          time_on_page_ms: ms,
        });
      }
    }
    pageStart.current = Date.now();
    lastPath.current = location.pathname;

    const utm = getUtmParams();
    trackEvent("page_view", "visit", {
      page_path: location.pathname,
      referrer_source: source,
      referrer: referrer || null,
      device_type: getDeviceType(),
      viewport_w: window.innerWidth,
      viewport_h: window.innerHeight,
      utm_source: utm.utm_source,
      utm_medium: utm.utm_medium,
      utm_campaign: utm.utm_campaign,
    });
  }, [location.pathname]);

  // Track session duration + exit page on unload
  useEffect(() => {
    if (!window.location.hostname.endsWith("remontnapokrivivarna.bg")) return;

    const handleUnload = () => {
      const seconds = Math.round((Date.now() - sessionStart.current) / 1000);
      const pageMs = Date.now() - pageStart.current;
      if (seconds < 2) return;

      const url = `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/analytics_events`;
      const body = JSON.stringify({
        event_type: "session_duration",
        event_name: "session_end",
        session_id: getSessionId(),
        page_path: window.location.pathname,
        duration_seconds: seconds,
        time_on_page_ms: pageMs,
        is_exit: true,
        device_type: getDeviceType(),
        viewport_w: window.innerWidth,
        viewport_h: window.innerHeight,
        is_bot: isBot(),
      });

      fetch(url, {
        method: "POST",
        keepalive: true,
        headers: {
          "Content-Type": "application/json",
          apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          Prefer: "return=minimal",
        },
        body,
      }).catch(() => {});
    };

    window.addEventListener("beforeunload", handleUnload);
    return () => window.removeEventListener("beforeunload", handleUnload);
  }, []);

  // Global tel: click interceptor
  useEffect(() => {
    if (!window.location.hostname.endsWith("remontnapokrivivarna.bg")) return;

    const handleClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest?.("a[href^='tel:']");
      if (!anchor) return;
      const phone = (anchor as HTMLAnchorElement).href.replace("tel:", "");
      trackCallClick(phone);
    };

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, []);

  return null;
};

export default AnalyticsTracker;
