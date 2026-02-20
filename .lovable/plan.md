
# Admin Analytics Dashboard

## Overview

Add a new "Analytics" page in the admin panel that tracks visitor counts, time spent on site, and button click events (offer requests, phone calls, and calculator usage). This requires both frontend tracking and backend storage.

## Architecture

### 1. Database: New `analytics_events` Table

Create a table to store all tracked events from the public website:

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| event_type | text | "page_view", "button_click", "session_duration" |
| event_name | text | Specific event: "visit", "offer_button", "call_button", "calculator_button", "session_end" |
| session_id | text | Anonymous browser session ID (UUID generated client-side) |
| page_path | text | URL path where event occurred |
| duration_seconds | integer | For session_duration events, time in seconds |
| created_at | timestamptz | When the event was recorded |

RLS policies:
- Public INSERT (anyone can submit events anonymously)
- SELECT restricted to admin/staff only
- No UPDATE or DELETE for public

### 2. Frontend Tracking Component

**New file:** `src/components/AnalyticsTracker.tsx`

A invisible component added to the main layout that:
- Generates a session ID (stored in sessionStorage)
- Sends a "page_view" event on each route change
- Tracks time spent using a heartbeat (records session duration on page unload via `navigator.sendBeacon`)
- Listens for specific button clicks via a global analytics helper

### 3. Analytics Helper

**New file:** `src/lib/analytics.ts`

Utility functions:
- `trackEvent(eventType, eventName, extras)` -- inserts a row into `analytics_events`
- `getSessionId()` -- creates or retrieves session ID from sessionStorage
- Called from button click handlers throughout the site

### 4. Button Click Tracking

Modify these existing components to add `trackEvent` calls:

| Component | Event Tracked |
|-----------|--------------|
| `src/components/Contact.tsx` | "offer_button" -- when the contact/inquiry form is submitted |
| `src/components/FloatingCallButton.tsx` | "call_button" -- when the phone link is clicked |
| `src/components/MobileBottomBar.tsx` | "call_button" and "offer_button" -- for the two mobile buttons |
| `src/components/PriceCalculator.tsx` | "calculator_button" -- when the calculator form is submitted |
| `src/components/MultiStepInquiryForm.tsx` | "offer_button" -- when multi-step form is submitted |

Each tracking call is a single line addition (e.g., `trackEvent("button_click", "call_button")`) -- no UI changes.

### 5. Admin Analytics Page

**New file:** `src/pages/admin/AnalyticsPage.tsx`

Dashboard with:

**Visitor Cards (top row):**
- Today's visitors (unique sessions)
- This week's visitors
- This month's visitors
- This year's visitors

**Time Spent Card:**
- Average session duration (in minutes)

**Button Click Cards (second row):**
- Total "Offer" button clicks (today / week / month / year)
- Total "Call" button clicks (today / week / month / year)
- Total "Calculator" button clicks (today / week / month / year)

Each card shows the count with a small label. Data fetched via Supabase queries with date filters using `date-fns`.

### 6. Route and Navigation

- Add route: `<Route path="analytics" element={<AnalyticsPage />} />` inside the admin layout in `App.tsx`
- Add nav item in `AdminDashboardPage.tsx` sidebar: "Аналитика" with a BarChart3 icon
- Redirect `/admin` to `/admin/analytics` instead of `/admin/inquiries` (analytics becomes the landing page)

### 7. Add Tracker to Layout

Add `<AnalyticsTracker />` component inside `App.tsx` so it runs on every public page. It will be placed alongside `<ScrollToTop />`.

---

## Files to Create

| File | Purpose |
|------|---------|
| `src/lib/analytics.ts` | trackEvent utility + session ID management |
| `src/components/AnalyticsTracker.tsx` | Automatic page view + session duration tracking |
| `src/pages/admin/AnalyticsPage.tsx` | Admin analytics dashboard UI |

## Files to Modify

| File | Change |
|------|--------|
| `src/App.tsx` | Add AnalyticsTracker, add analytics admin route |
| `src/pages/admin/AdminDashboardPage.tsx` | Add "Аналитика" nav item, change default redirect |
| `src/components/FloatingCallButton.tsx` | Add call_button tracking |
| `src/components/MobileBottomBar.tsx` | Add call_button + offer_button tracking |
| `src/components/Contact.tsx` | Add offer_button tracking on form submit |
| `src/components/PriceCalculator.tsx` | Add calculator_button tracking |
| `src/components/MultiStepInquiryForm.tsx` | Add offer_button tracking |

## Database Migration

One migration to create the `analytics_events` table with RLS policies (public insert, admin/staff select).
