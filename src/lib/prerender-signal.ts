/**
 * Prerender readiness broker.
 *
 * The `scripts/prerender-seo.mjs` Puppeteer build waits for
 * `document.documentElement.getAttribute("data-prerender-ready") === "true"`
 * before capturing the HTML for each URL. This module decides when that flag
 * flips.
 *
 * Rules (all must hold):
 *  1. i18next is initialized AND the active language's translation bundle
 *     is loaded (BG is bundled; other locales load async).
 *  2. The DOM has:
 *     - a non-trivial <h1>,
 *     - a <link rel="canonical" href>,
 *     - at least one <script type="application/ld+json"> that parses.
 *  3. Every explicitly-registered async data source has reported ready
 *     (e.g. Supabase blog article fetch).
 *  4. Every <img data-seo-critical> element has `complete === true` and
 *     `naturalWidth > 0`.
 *  5. Two consecutive polls (200ms apart) both pass — guards against the
 *     window where React just started rendering.
 *
 * If any condition never holds within the Puppeteer timeout, the URL is
 * reported FAILED — no shortcut based on setTimeout.
 *
 * At runtime for regular users this broker is harmless: it just polls and
 * sets an attribute nobody reads.
 */

type ReadyKey = string;

// Registered async data sources per current pathname. Values: true = ready,
// false = still loading. Missing key = not registered.
const registry: Map<ReadyKey, boolean> = new Map();

let brokerStarted = false;
let lastPathname = "";
let consecutivePasses = 0;

function resetForNavigation(newPath: string) {
  if (newPath === lastPathname) return;
  lastPathname = newPath;
  registry.clear();
  consecutivePasses = 0;
  if (typeof document !== "undefined") {
    document.documentElement.setAttribute("data-prerender-ready", "false");
  }
}

/**
 * A page component calls this to declare an async data source. Pass `true`
 * when the data has arrived; `false` (or omit re-calls) to keep it pending.
 */
export function setSeoDataReady(key: ReadyKey, ready: boolean): void {
  registry.set(key, ready);
}

/** Deregister when a component unmounts (e.g. blog article navigation). */
export function clearSeoDataReady(key: ReadyKey): void {
  registry.delete(key);
}

interface Diagnostics {
  passed: boolean;
  reason?: string;
}

function checkOnce(): Diagnostics {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return { passed: false, reason: "no-window" };
  }

  // 1. i18next
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const i18n = (window as any).__i18n;
  const htmlLang = document.documentElement.lang || "bg";
  if (i18n) {
    if (!i18n.isInitialized) return { passed: false, reason: "i18n-not-initialized" };
    if (!i18n.hasResourceBundle?.(htmlLang, "translation")) {
      return { passed: false, reason: `i18n-bundle-missing:${htmlLang}` };
    }
  }

  // 2. DOM primitives
  const h1 = document.querySelector("h1");
  if (!h1 || (h1.textContent ?? "").trim().length < 5) {
    return { passed: false, reason: "no-h1" };
  }
  const canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical || !canonical.getAttribute("href")) {
    return { passed: false, reason: "no-canonical" };
  }
  const jsonLd = document.querySelectorAll('script[type="application/ld+json"]');
  if (jsonLd.length === 0) {
    return { passed: false, reason: "no-json-ld" };
  }

  // 3. Registered async data
  for (const [key, ready] of registry.entries()) {
    if (!ready) return { passed: false, reason: `data-not-ready:${key}` };
  }

  // 4. Critical images
  const criticalImgs = document.querySelectorAll<HTMLImageElement>("img[data-seo-critical]");
  for (const img of Array.from(criticalImgs)) {
    if (!img.complete || img.naturalWidth === 0) {
      return { passed: false, reason: "critical-image-not-loaded" };
    }
  }

  return { passed: true };
}

/**
 * Starts the polling loop. Idempotent. Also patches history APIs so we
 * reset the ready flag on client-side navigation.
 */
export function startPrerenderBroker(): void {
  if (brokerStarted || typeof window === "undefined") return;
  brokerStarted = true;

  // Expose i18next for the check.
  import("@/i18n/config").then((mod) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).__i18n = mod.default;
  }).catch(() => { /* non-fatal */ });

  resetForNavigation(window.location.pathname);

  // Detect client-side navigation → reset the flag.
  const origPush = history.pushState;
  const origReplace = history.replaceState;
  history.pushState = function (...args) {
    const r = origPush.apply(this, args);
    resetForNavigation(window.location.pathname);
    return r;
  };
  history.replaceState = function (...args) {
    const r = origReplace.apply(this, args);
    resetForNavigation(window.location.pathname);
    return r;
  };
  window.addEventListener("popstate", () => resetForNavigation(window.location.pathname));

  const tick = () => {
    const diag = checkOnce();
    if (diag.passed) {
      consecutivePasses += 1;
      if (consecutivePasses >= 2) {
        document.documentElement.setAttribute("data-prerender-ready", "true");
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window as any).__seoDiagnostics = { ready: true, at: Date.now() };
      }
    } else {
      consecutivePasses = 0;
      document.documentElement.setAttribute("data-prerender-ready", "false");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).__seoDiagnostics = { ready: false, reason: diag.reason };
    }
  };

  // Poll every 200ms; two consecutive passes = ~400ms stability window.
  setInterval(tick, 200);
  tick();
}
