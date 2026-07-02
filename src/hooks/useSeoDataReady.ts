import { useEffect } from "react";
import { clearSeoDataReady, setSeoDataReady } from "@/lib/prerender-signal";

/**
 * Register an async data source with the prerender broker.
 * Call with `ready = true` once the data used to render SEO-critical
 * markup (H1, main text, JSON-LD, etc.) has arrived.
 *
 * Automatically clears the registration on unmount so a stale pending
 * source doesn't block the next route.
 */
export function useSeoDataReady(key: string, ready: boolean): void {
  useEffect(() => {
    setSeoDataReady(key, ready);
  }, [key, ready]);

  useEffect(() => {
    return () => {
      clearSeoDataReady(key);
    };
  }, [key]);
}
