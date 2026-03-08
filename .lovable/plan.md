
## Plan: Traffic Source Breakdown in Analytics Dashboard

### Overview
3 parts: (1) add a `referrer_source` column to the database, (2) capture & classify `document.referrer` on every page_view event, (3) display a "Трафик по източници" card in the Analytics dashboard.

---

### Part 1 — Database Migration
Add a `referrer_source` text column (nullable) to `analytics_events`. Also add a `referrer` text column to store the raw referrer URL for debugging. No existing data is broken — both columns default to NULL.

```sql
ALTER TABLE public.analytics_events
  ADD COLUMN IF NOT EXISTS referrer_source text,
  ADD COLUMN IF NOT EXISTS referrer        text;
```

---

### Part 2 — Source Classification Logic

A pure function `classifyReferrer(referrer: string): string` maps `document.referrer` to one of 5 categories:

```text
"organic"  — Google, Bing, Yahoo, DuckDuckGo, Yandex, Baidu
"social"   — Facebook, Instagram, YouTube, TikTok, LinkedIn, Twitter/X
"referral" — any other non-empty referrer domain
"direct"   — empty referrer (typed URL, bookmarks, dark social)
"email"    — Mailchimp, Sendinblue, email client fingerprints
```

**Files changed:**
- `src/lib/analytics.ts` — add `classifyReferrer()`, extend `trackEvent()` extras to accept `referrer_source` + `referrer`, and pass them in the insert payload
- `src/components/AnalyticsTracker.tsx` — on `page_view` events, read `document.referrer`, classify it, and pass both raw + classified values to `trackEvent()`
- `src/integrations/supabase/types.ts` is auto-generated so the `as any` cast already in use avoids needing a types update

---

### Part 3 — Dashboard UI Card

A new "Трафик по източници" (Traffic Sources) card added to `AnalyticsPage.tsx` between "Топ страници" and "Конверсии".

It shows:
- A horizontal bar chart (Recharts `BarChart` horizontal layout) with source labels on the Y-axis and session counts on the X-axis
- A legend row below with icons and exact numbers + percentage of total

The data is derived client-side from `currentEvents` filtered to `event_type === "page_view"`, de-duped by `session_id` per source (first-touch attribution per session).

The `fetchEvents` query is extended to also `select` the new `referrer_source` column.

Sources shown with colors:
```text
organic  → hsl(var(--primary))   — green/brand color
direct   → hsl(var(--muted))
referral → #f59e0b (amber)
social   → #8b5cf6 (purple)
email    → #06b6d4 (cyan)
```

Labels in Bulgarian:
- Органично търсене
- Директен достъп
- Препращане (Referral)
- Социални мрежи
- Имейл

---

### Files Changed

```text
supabase/migrations/         — ADD COLUMN referrer_source, referrer
src/lib/analytics.ts         — classifyReferrer() + pass source to insert
src/components/AnalyticsTracker.tsx — capture document.referrer on page_view
src/pages/admin/AnalyticsPage.tsx   — new Traffic Sources card + select referrer_source
```

No new packages. No SEO impact. No visible change to the public-facing site.
