# Add Agent Integrations (MCP) to Remont Pokrivi Varna

Expose this app as an MCP (Model Context Protocol) server so external AI assistants (ChatGPT, Claude, Cursor, Lovable's own agent) can connect to it and use a curated set of tools that read/write data in the app's backend on behalf of the signed-in user.

## What the user gets

- A public MCP endpoint hosted as a Supabase Edge Function at `/functions/v1/mcp`.
- OAuth 2.1 sign-in via the app's existing Supabase Auth (admins/staff sign in with their normal account; RLS decides what each role can see).
- A "Connect to Claude / ChatGPT / Cursor" flow via the standard MCP consent page at `/.lovable/oauth/consent`.
- A first set of read-only tools focused on the CRM (safest starting surface), so an assistant can answer questions like *"How many new inquiries came in this week?"* or *"Show me the last 10 leads from Varna."*

## Initial tool set (read-only, admin/staff scoped by RLS)

1. `list_recent_inquiries` — last N inquiries (name, phone, city, service_type, status, created_at).
2. `get_inquiry` — full inquiry detail by id (incl. description, attribution).
3. `search_inquiries` — filter by status / city / service_type / date range.
4. `list_call_log` — recent entries from `call_log`.
5. `inquiry_stats` — counts by status and by day for the last 30 days.
6. `list_articles` — published/draft articles from the blog CMS (title, slug, status, views).

All tools call Supabase with the **user's** access token (forwarded from the MCP `ToolContext`), so RLS is enforced exactly as in the admin panel. Marketing users see what marketing sees; admins see everything. No service-role key is ever used.

No write/delete tools in this first pass — we add those in a follow-up once the read surface is verified.

## Auth model

- OAuth 2.1 authorization server = Supabase Auth (activated via `configure_oauth_server`).
- Resource server = the MCP edge function, verifying tokens issued by `https://vpsbqrxrjrwjmttnptfr.supabase.co/auth/v1`.
- Consent page = new route `/.lovable/oauth/consent` reusing the existing `AuthContext` / Supabase client. If the user isn't logged in, it redirects to `/admin/login?next=<consent-url>` and returns after sign-in.
- Only users that exist in `user_roles` will actually see data (RLS already enforces this).

## Files to add

```text
src/lib/mcp/index.ts                          # defineMcp entry (name, version, tools, OAuth)
src/lib/mcp/tools/list-recent-inquiries.ts
src/lib/mcp/tools/get-inquiry.ts
src/lib/mcp/tools/search-inquiries.ts
src/lib/mcp/tools/list-call-log.ts
src/lib/mcp/tools/inquiry-stats.ts
src/lib/mcp/tools/list-articles.ts
src/pages/OAuthConsent.tsx                    # /.lovable/oauth/consent page
```

## Files to modify

- `vite.config.ts` — add `mcpPlugin()` from `@lovable.dev/mcp-js/stacks/supabase/vite`.
- `src/App.tsx` — register the `/.lovable/oauth/consent` route.
- `src/pages/admin/AdminLoginPage.tsx` — honor `?next=` query param to return to the consent page after sign-in.
- `package.json` — add `@lovable.dev/mcp-js` and `zod` (zod already present, verify).

## Files auto-generated (do NOT hand-edit)

- `supabase/functions/mcp/index.ts` — emitted by the Vite plugin on build.
- `supabase/config.toml` — add `[functions.mcp] verify_jwt = false` (mcp-js does its own OAuth verification).
- `.lovable/mcp/manifest.json` — produced by `extract_mcp_manifest`.

## Steps

1. Install `@lovable.dev/mcp-js`.
2. Write the 6 tool files + `src/lib/mcp/index.ts` with `auth.oauth.issuer(...)` bound to the Supabase project issuer.
3. Add `mcpPlugin()` to `vite.config.ts`.
4. Add `verify_jwt = false` for the `mcp` function in `supabase/config.toml`.
5. Build the `OAuthConsent` page and route; wire `?next=` through `AdminLoginPage`.
6. Call `configure_oauth_server` to activate Supabase OAuth 2.1 + dynamic client registration.
7. Run `extract_mcp_manifest` and deploy the `mcp` edge function.
8. Verify: open the app's Agent integrations panel, connect from Claude/ChatGPT, call `list_recent_inquiries`, confirm RLS scoping works for both admin and marketing users.

## Open question (does not block the plan)

The initial toolset is **read-only CRM**. If you'd also like write tools in this first pass — e.g. "mark inquiry as contacted", "add a call log entry", "create draft article" — tell me which ones and I'll add them before implementation. Otherwise I'll ship read-only first and we add mutations in a follow-up.