import { useEffect } from "react";
import { startPrerenderBroker } from "@/lib/prerender-signal";

/**
 * Mounted once at the app root. Kicks off the readiness poller that sets
 * `data-prerender-ready` on <html> for Puppeteer to observe.
 */
const PrerenderReadyBroker = () => {
  useEffect(() => {
    startPrerenderBroker();
  }, []);
  return null;
};

export default PrerenderReadyBroker;
