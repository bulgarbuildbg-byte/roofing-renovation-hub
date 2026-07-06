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
  name: "inquiry_stats",
  title: "Inquiry statistics",
  description: "Counts of inquiries in the last N days, aggregated by status and by day.",
  inputSchema: { days: z.number().int().min(1).max(365).optional().describe("Window size, default 30.") },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ days }, ctx) => {
    if (!ctx.isAuthenticated()) return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    const windowDays = days ?? 30;
    const since = new Date(Date.now() - windowDays * 86400_000).toISOString();
    const { data, error } = await userClient(ctx)
      .from("inquiries")
      .select("status, created_at")
      .gte("created_at", since);
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    const byStatus: Record<string, number> = {};
    const byDay: Record<string, number> = {};
    for (const row of data ?? []) {
      byStatus[row.status ?? "unknown"] = (byStatus[row.status ?? "unknown"] ?? 0) + 1;
      const day = (row.created_at as string).slice(0, 10);
      byDay[day] = (byDay[day] ?? 0) + 1;
    }
    const summary = { windowDays, total: data?.length ?? 0, byStatus, byDay };
    return { content: [{ type: "text", text: JSON.stringify(summary, null, 2) }], structuredContent: summary };
  },
});
