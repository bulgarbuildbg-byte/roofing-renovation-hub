## Integrate Microsoft Clarity (Project ID: `xcjo8jfv0v`)

The Clarity tracker is already implemented in `src/components/ClarityTracker.tsx`, but it requires the `VITE_CLARITY_PROJECT_ID` env var, which isn't set. I'll hardcode the provided project ID as the default so it works immediately without env configuration.

### Changes

1. **`src/components/ClarityTracker.tsx`**
   - Set `xcjo8jfv0v` as default project ID (fallback when `VITE_CLARITY_PROJECT_ID` is missing).
   - Keep env var override so prod/dev can be switched later if needed.

2. **Verify**
   - Confirm `ClarityTracker` is mounted in `App.tsx` (already done in prior step).
   - After build, Clarity script loads on every page → recordings + heatmaps start flowing.
   - Custom tags (`session_id`, `device_type`, `inquiry_id`) already wired into form submissions.

### Out of scope
- No DB or form changes — those were completed previously.
- No new admin UI — `BehaviorPage` and `DeviceAnalyticsPage` already deep-link to Clarity.