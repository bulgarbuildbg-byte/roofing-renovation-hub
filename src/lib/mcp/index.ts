import { auth, defineMcp } from "@lovable.dev/mcp-js";
import listRecentInquiries from "./tools/list-recent-inquiries";
import getInquiry from "./tools/get-inquiry";
import searchInquiries from "./tools/search-inquiries";
import listCallLog from "./tools/list-call-log";
import inquiryStats from "./tools/inquiry-stats";
import listArticles from "./tools/list-articles";

// OAuth issuer must be the direct Supabase host, derived from the project ref
// (Vite inlines VITE_SUPABASE_PROJECT_ID as a build-time literal).
const projectRef = import.meta.env.VITE_SUPABASE_PROJECT_ID ?? "project-ref-unset";

export default defineMcp({
  name: "remont-pokrivi-varna-mcp",
  title: "Ремонт на покриви Варна — CRM",
  version: "0.1.0",
  instructions:
    "Read-only CRM tools for the Remont Pokrivi Varna app. Use these to query customer inquiries (leads), call log entries, and blog articles. All queries run under the signed-in user's row-level permissions.",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [listRecentInquiries, getInquiry, searchInquiries, listCallLog, inquiryStats, listArticles],
});
