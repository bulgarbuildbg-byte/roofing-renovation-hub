/**
 * Centralized conversion firing.
 *
 * Rules (see .lovable/plan.md):
 *  - EXACTLY ONE real Google Ads Conversion per lead action, sent to a single
 *    Ads account (AW-18066399675). The second account (AW-17872435541) stays
 *    active in index.html for page views / remarketing audiences only — it
 *    never receives a `conversion` event from the app.
 *  - Enhanced Conversions: hashed email/phone/name are attached with
 *    `gtag("set", "user_data", ...)` BEFORE the conversion event, so Google
 *    reads them as part of the same conversion, not as a separate event.
 *  - GA4-only helper events (`generate_lead`, `lead_engagement`) are fired
 *    WITHOUT `send_to`, so Google Ads cannot import them as Primary
 *    conversions. Use them for GA4 reporting and remarketing audiences only.
 *  - Meta Pixel + TikTok Pixel fire once per action.
 */
import { getAttribution } from "./attribution";

// Single Google Ads account that receives real conversion events.
const PRIMARY_ADS_ACCOUNT = "AW-18066399675";

// GA4 Measurement ID (e.g. "G-XXXXXXX"). When set, helper events
// (`generate_lead`, `lead_engagement`) are routed exclusively to GA4 via
// `send_to`, so they cannot be picked up by any AW-* Google Ads account.
// When null, helper events are DISABLED entirely to avoid leaking into
// Ads accounts configured in index.html.
const GA4_MEASUREMENT_ID: string | null = null;

// Conversion action labels configured in the primary Google Ads account.
const LABELS: Record<LeadKind, string> = {
  form:       "quote_submit",
  calculator: "quote_submit",
  chatbot:    "quote_submit",
  call:       "call_click",
  inspection: "inspection_form",
};

export type LeadKind = "form" | "calculator" | "chatbot" | "call" | "inspection";

export interface LeadPayload {
  email?: string | null;
  phone?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  city?: string | null;
  value?: number;    // BGN, default 50
  currency?: string; // default BGN
}

async function sha256(input: string): Promise<string | null> {
  try {
    if (typeof window === "undefined" || !window.crypto?.subtle) return null;
    const clean = input.trim().toLowerCase();
    if (!clean) return null;
    const buf = await window.crypto.subtle.digest("SHA-256", new TextEncoder().encode(clean));
    return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, "0")).join("");
  } catch {
    return null;
  }
}

// Normalize BG phone to E.164 for Enhanced Conversions.
function normalizePhone(raw?: string | null): string | null {
  if (!raw) return null;
  let p = raw.replace(/[^\d+]/g, "");
  if (p.startsWith("00")) p = "+" + p.slice(2);
  if (p.startsWith("0")) p = "+359" + p.slice(1);
  if (!p.startsWith("+")) p = "+" + p;
  return p.length >= 9 ? p : null;
}

export async function fireLeadConversion(kind: LeadKind, payload: LeadPayload = {}): Promise<void> {
  if (typeof window === "undefined") return;
  const w = window as any;
  const attr = getAttribution();
  const value = payload.value ?? 50;
  const currency = payload.currency ?? "BGN";

  // --- Google Ads: 1 real conversion + Enhanced Conversions -----------------
  if (w.gtag) {
    try {
      const emailNorm = payload.email?.trim().toLowerCase() || null;
      const phoneNorm = normalizePhone(payload.phone);
      const [emailHash, phoneHash, fnHash, lnHash] = await Promise.all([
        emailNorm ? sha256(emailNorm) : Promise.resolve(null),
        phoneNorm ? sha256(phoneNorm) : Promise.resolve(null),
        payload.firstName ? sha256(payload.firstName) : Promise.resolve(null),
        payload.lastName ? sha256(payload.lastName) : Promise.resolve(null),
      ]);

      // Enhanced Conversions — attached to the SAME conversion, not a separate event.
      const userData: Record<string, unknown> = {};
      if (emailHash) userData.sha256_email_address = emailHash;
      if (phoneHash) userData.sha256_phone_number = phoneHash;
      const address: Record<string, unknown> = {};
      if (fnHash) address.sha256_first_name = fnHash;
      if (lnHash) address.sha256_last_name = lnHash;
      if (payload.city) address.city = payload.city;
      if (Object.keys(address).length) userData.address = address;
      if (Object.keys(userData).length) w.gtag("set", "user_data", userData);

      // Single real Google Ads Conversion — one account only.
      const label = LABELS[kind];
      w.gtag("event", "conversion", {
        send_to: `${PRIMARY_ADS_ACCOUNT}/${label}`,
        value,
        currency,
        transaction_id: attr.gclid || `${kind}-${Date.now()}`,
      });

      // --- GA4-only helper events --------------------------------------------
      // Only fire when a GA4 property is configured. `send_to` is scoped to
      // the GA4 Measurement ID so no AW-* Ads account can receive them.
      if (GA4_MEASUREMENT_ID) {
        if (kind !== "call") {
          w.gtag("event", "generate_lead", {
            send_to: GA4_MEASUREMENT_ID,
            value,
            currency,
            lead_source: kind,
          });
        }
        w.gtag("event", "lead_engagement", {
          send_to: GA4_MEASUREMENT_ID,
          lead_source: kind,
        });
      }
    } catch { /* never break UX */ }
  }

  // --- Meta Pixel ----------------------------------------------------------
  if (typeof w.fbq === "function") {
    try { w.fbq("track", "Lead", { value, currency, content_name: kind }); } catch {}
  }

  // --- TikTok Pixel --------------------------------------------------------
  if (w.ttq && typeof w.ttq.track === "function") {
    try { w.ttq.track(kind === "call" ? "ClickButton" : "SubmitForm", { value, currency, content_type: kind }); } catch {}
  }
}

