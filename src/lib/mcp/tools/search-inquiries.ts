declare const process: { env: Record<string, string | undefined> };
import { createClient } from "@supabase/supabase-js";
import { defineTool, type ToolContext } from "@lovable.dev/mcp-js";
import { z } from "zod";

function userClient(ctx: ToolContext) {
  return createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_PUBLISHABLE_KEY!, {
    global: { headers: { Authorization: `Bearer ${ctx.getToken()}` } },
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export default defineTool({
  name: "search_inquiries",
  title: "Search inquiries",
  description: "Filter inquiries by status, city substring, service type, and/or date range.",
  inputSchema: {
    status: z.string().optional().describe("Exact status value, e.g. 'new', 'contacted'."),
    city: z.string().optional().describe("Case-insensitive substring match on address."),
    service_type: z.string().optional().describe("Exact service_type value."),
    since: z.string().optional().describe("ISO date/datetime, inclusive lower bound on created_at."),
    until: z.string().optional().describe("ISO date/datetime, inclusive upper bound on created_at."),
    limit: z.number().int().min(1).max(200).optional(),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ status, city, service_type, since, until, limit }, ctx) => {
    if (!ctx.isAuthenticated()) return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    let q = userClient(ctx)
      .from("inquiries")
      .select("id, name, phone, email, address, service_type, status, created_at")
      .order("created_at", { ascending: false })
      .limit(limit ?? 50);
    if (status) q = q.eq("status", status);
    if (service_type) q = q.eq("service_type", service_type as any);
    if (city) q = q.ilike("address", `%${city}%`);
    if (since) q = q.gte("created_at", since);
    if (until) q = q.lte("created_at", until);
    const { data, error } = await q;
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    return {
      content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
      structuredContent: { inquiries: data ?? [], count: data?.length ?? 0 },
    };
  },
});
