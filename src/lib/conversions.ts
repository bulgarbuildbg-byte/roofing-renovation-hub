/**
 * Centralized conversion firing to Google Ads (both accounts),
 * Meta Pixel and TikTok Pixel. Includes Enhanced Conversions for Google:
 * hashed email + phone are attached before the conversion event so Google
 * can match the lead back to a click and improve reporting.
 *
 * Safe to call from anywhere in the browser — every call is guarded, so a
 * missing pixel or a blocked network request never breaks the app.
 *
 * IMPORTANT: Do not send GA4 generate_lead here. If imported into Google Ads
 * as a Primary conversion, it duplicates the direct Google Ads quote_submit
 * conversion for the same submitted form.
 */
import { getAttribution } from "./attribution";

const GOOGLE_ADS_ACCOUNTS = ["AW-17872435541", "AW-18066399675"] as const;

// Conversion action labels configured in the Google Ads accounts.
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

  // --- Google Ads Enhanced Conversions -------------------------------------
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

      const userData: Record<string, unknown> = {};
      if (emailHash) userData.sha256_email_address = emailHash;
      if (phoneHash) userData.sha256_phone_number = phoneHash;
      const address: Record<string, unknown> = {};
      if (fnHash) address.sha256_first_name = fnHash;
      if (lnHash) address.sha256_last_name = lnHash;
      if (payload.city) address.city = payload.city;
      if (Object.keys(address).length) userData.address = address;
      if (Object.keys(userData).length) w.gtag("set", "user_data", userData);

      const label = LABELS[kind];
      for (const account of GOOGLE_ADS_ACCOUNTS) {
        w.gtag("event", "conversion", {
          send_to: `${account}/${label}`,
          value,
          currency,
          transaction_id: attr.gclid || `${kind}-${Date.now()}`,
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
