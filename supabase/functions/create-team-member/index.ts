import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const json = (status: number, body: Record<string, unknown>) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

const ALLOWED_ROLES = new Set(["admin", "staff", "editor", "marketing", "support", "seo"]);

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      console.error("[create-team-member] Missing Authorization header");
      return json(401, { error: "Липсва авторизация. Моля, влезте отново." });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY");

    if (!supabaseUrl || !serviceRoleKey || !anonKey) {
      console.error("[create-team-member] Missing env vars", {
        hasUrl: !!supabaseUrl,
        hasServiceKey: !!serviceRoleKey,
        hasAnonKey: !!anonKey,
      });
      return json(500, { error: "Сървърна конфигурационна грешка (липсват environment ключове)." });
    }

    // Verify caller
    const callerClient = createClient(supabaseUrl, anonKey, {
      global: { headers: { Authorization: authHeader } },
    });
    const { data: userData, error: userErr } = await callerClient.auth.getUser();
    if (userErr || !userData?.user) {
      console.error("[create-team-member] getUser failed:", userErr?.message);
      return json(401, { error: "Невалидна сесия. Моля, влезте отново." });
    }
    const caller = userData.user;

    const adminClient = createClient(supabaseUrl, serviceRoleKey);
    const { data: roles, error: rolesErr } = await adminClient
      .from("user_roles")
      .select("role")
      .eq("user_id", caller.id);

    if (rolesErr) {
      console.error("[create-team-member] roles lookup failed:", rolesErr.message);
      return json(500, { error: `Грешка при проверка на роли: ${rolesErr.message}` });
    }

    const isAdmin = roles?.some((r: any) => r.role === "admin");
    if (!isAdmin) {
      console.warn("[create-team-member] Non-admin attempted:", caller.id);
      return json(403, { error: "Само администратори могат да добавят членове." });
    }

    let payload: any;
    try {
      payload = await req.json();
    } catch (e) {
      return json(400, { error: "Невалидно тяло на заявката (не е JSON)." });
    }

    const { email, password, role, full_name } = payload || {};
    console.log("[create-team-member] Request:", { email, role, full_name, hasPassword: !!password });

    if (!email || typeof email !== "string") return json(400, { error: "Липсва имейл." });
    if (!password || typeof password !== "string" || password.length < 6)
      return json(400, { error: "Паролата трябва да е поне 6 символа." });
    if (!role || !ALLOWED_ROLES.has(role))
      return json(400, { error: `Невалидна роля: "${role}". Допустими: ${[...ALLOWED_ROLES].join(", ")}` });

    // Create the auth user
    const { data: newUser, error: createError } = await adminClient.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { full_name: full_name || "" },
    });

    if (createError || !newUser?.user) {
      const msg = createError?.message || "Неуспешно създаване на потребител";
      console.error("[create-team-member] createUser failed:", msg);
      // Friendlier messages for common cases
      let friendly = msg;
      if (/already registered|already exists|duplicate/i.test(msg)) {
        friendly = "Този имейл вече е регистриран в системата.";
      } else if (/password/i.test(msg)) {
        friendly = `Проблем с паролата: ${msg}`;
      }
      return json(400, { error: friendly });
    }

    // Assign role
    const { error: roleError } = await adminClient.from("user_roles").insert({
      user_id: newUser.user.id,
      role,
    });

    if (roleError) {
      console.error("[create-team-member] role insert failed:", roleError.message);
      // Rollback: delete the just-created user so admin can retry cleanly
      await adminClient.auth.admin.deleteUser(newUser.user.id).catch((e) =>
        console.error("[create-team-member] rollback deleteUser failed:", e?.message)
      );
      return json(400, { error: `Грешка при задаване на роля: ${roleError.message}` });
    }

    console.log("[create-team-member] Success:", { user_id: newUser.user.id, role });
    return json(200, { success: true, user_id: newUser.user.id });
  } catch (error: any) {
    console.error("[create-team-member] Unhandled error:", error?.message, error?.stack);
    return json(500, { error: error?.message || "Вътрешна грешка на сървъра." });
  }
});
