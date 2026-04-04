

## Fix Analytics Tracking

### Root Causes

1. **Hostname filter too strict** — checks `=== "remontnapokrivivarna.bg"` but the primary domain is `www.remontnapokrivivarna.bg`. Visitors on the `www` subdomain (most traffic) are silently skipped.

2. **sendBeacon missing required headers** — The session duration beacon sends JSON to the Supabase REST API with only `apikey` as a query parameter. Supabase REST requires `apikey` in the `Authorization` or `apikey` header, plus `Content-Type: application/json` and `Prefer: return=minimal`. The `Blob` approach doesn't set these headers, so inserts fail with 401/400.

### Fix

**File: `src/components/AnalyticsTracker.tsx`**

1. Change hostname check from exact match to `.endsWith("remontnapokrivivarna.bg")` — this covers both `remontnapokrivivarna.bg` and `www.remontnapokrivivarna.bg`.

2. Replace `navigator.sendBeacon` with a proper fetch using `keepalive: true` (same reliability as sendBeacon but supports headers):

```typescript
fetch(url, {
  method: "POST",
  keepalive: true,
  headers: {
    "Content-Type": "application/json",
    "apikey": import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
    "Authorization": `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
    "Prefer": "return=minimal",
  },
  body: JSON.stringify({ ... }),
});
```

### Files Changed
- `src/components/AnalyticsTracker.tsx` — fix hostname check + fix sendBeacon

No database changes needed. No SEO impact. No visible UI changes.

