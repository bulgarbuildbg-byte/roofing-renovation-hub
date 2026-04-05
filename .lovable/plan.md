

## Add Second Google Ads Tag

The site already has one Google Ads tag (`AW-17872435541`) in `index.html`. The new tag (`AW-18066399675`) will be added alongside it. Since both tags share the same gtag.js loader, we only need to add one extra `gtag('config', ...)` line — no need to load the script twice.

### Changes

**`index.html`** — Add `gtag('config', 'AW-18066399675');` right after the existing `gtag('config', 'AW-17872435541');` line inside the existing gtag script block.

