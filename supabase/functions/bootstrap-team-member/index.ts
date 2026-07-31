import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-bootstrap-token",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const json = (status: number, body: Record<string, unknown>) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

const ALLOWED_ROLES = new Set(["admin", "staff", "editor", "marketing", "support", "seo"]);

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  const expected = Deno.env.get("BOOTSTRAP_TEAM_TOKEN");
  const provided = req.headers.get("x-bootstrap-token");
  if (!expected || provided !== expected) return json(401, { error: "Unauthorized" });

  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const admin = createClient(supabaseUrl, serviceRoleKey);

  let payload: any;
  try {
    payload = await req.json();
  } catch {
    return json(400, { error: "Invalid JSON" });
  }

  const { email, password, role, full_name } = payload || {};
  if (!email || typeof email !== "string") return json(400, { error: "Missing email" });
  if (!password || typeof password !== "string" || password.length < 6)
    return json(400, { error: "Password too short" });
  if (!role || !ALLOWED_ROLES.has(role)) return json(400, { error: "Invalid role" });

  // Look up existing user first
  const { data: list } = await admin.auth.admin.listUsers({ page: 1, perPage: 1000 });
  let userId = list?.users?.find((u) => u.email?.toLowerCase() === email.toLowerCase())?.id;

  if (userId) {
    const { error: updErr } = await admin.auth.admin.updateUserById(userId, {
      password,
      email_confirm: true,
      user_metadata: { full_name: full_name || "" },
    });
    if (updErr) return json(400, { error: `update: ${updErr.message}` });
  } else {
    const { data: created, error: createError } = await admin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { full_name: full_name || "" },
    });
    if (createError || !created?.user) return json(400, { error: createError?.message || "create failed" });
    userId = created.user.id;
  }


  const { error: roleError } = await admin
    .from("user_roles")
    .upsert({ user_id: userId, role }, { onConflict: "user_id,role" });
  if (roleError) return json(400, { error: roleError.message });

  await admin
    .from("profiles")
    .upsert({ id: userId, email, full_name: full_name || "" }, { onConflict: "id" });

  return json(200, { success: true, user_id: userId, role });
});
