/**
 * Microsoft Clarity project ID + deep-link helpers.
 * Hardcoded fallback so CRM links work without env vars.
 */
export const CLARITY_PROJECT_ID =
  (import.meta.env.VITE_CLARITY_PROJECT_ID as string | undefined) || "xcjo8jfv0v";

export const clarityImpressionUrl = (sessionId: string) =>
  `https://clarity.microsoft.com/projects/view/${CLARITY_PROJECT_ID}/impressions?filter=CustomSessionId%3A%3A${encodeURIComponent(sessionId)}`;

export const clarityDashboardUrl = () =>
  `https://clarity.microsoft.com/projects/view/${CLARITY_PROJECT_ID}/dashboard`;
