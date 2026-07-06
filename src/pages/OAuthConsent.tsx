import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Shield, Loader2 } from "lucide-react";

// Beta @supabase/supabase-js oauth namespace — narrow local typing.
type OAuthApi = {
  getAuthorizationDetails: (id: string) => Promise<{ data: any; error: any }>;
  approveAuthorization: (id: string) => Promise<{ data: any; error: any }>;
  denyAuthorization: (id: string) => Promise<{ data: any; error: any }>;
};
const oauth = (supabase.auth as unknown as { oauth: OAuthApi }).oauth;

export default function OAuthConsent() {
  const [params] = useSearchParams();
  const authorizationId = params.get("authorization_id") ?? "";
  const [details, setDetails] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let active = true;
    (async () => {
      if (!authorizationId) return setError("Missing authorization_id");
      const { data: sess } = await supabase.auth.getSession();
      if (!sess.session) {
        const next = window.location.pathname + window.location.search;
        window.location.href = "/admin/login?next=" + encodeURIComponent(next);
        return;
      }
      if (!oauth?.getAuthorizationDetails) {
        setError("OAuth server is not configured for this project.");
        return;
      }
      const { data, error } = await oauth.getAuthorizationDetails(authorizationId);
      if (!active) return;
      if (error) return setError(error.message);
      const immediate = data?.redirect_url ?? data?.redirect_to;
      if (immediate && !data?.client) {
        window.location.href = immediate;
        return;
      }
      setDetails(data);
    })();
    return () => {
      active = false;
    };
  }, [authorizationId]);

  async function decide(approve: boolean) {
    setBusy(true);
    const { data, error } = approve
      ? await oauth.approveAuthorization(authorizationId)
      : await oauth.denyAuthorization(authorizationId);
    if (error) {
      setBusy(false);
      return setError(error.message);
    }
    const target = data?.redirect_url ?? data?.redirect_to;
    if (!target) {
      setBusy(false);
      return setError("No redirect returned by the authorization server.");
    }
    window.location.href = target;
  }

  if (error) {
    return (
      <main className="min-h-screen flex items-center justify-center p-6 bg-slate-950 text-slate-100">
        <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-xl p-6">
          <h1 className="text-lg font-semibold mb-2">Не може да се обработи заявката</h1>
          <p className="text-sm text-slate-400">{error}</p>
        </div>
      </main>
    );
  }
  if (!details) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-300">
        <Loader2 className="w-6 h-6 animate-spin" />
      </main>
    );
  }

  const clientName = details.client?.name ?? details.client?.client_name ?? "външно приложение";
  const redirectUri = details.client?.redirect_uris?.[0] ?? details.redirect_url ?? "";

  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-slate-950 text-slate-100">
      <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
            <Shield className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-lg font-semibold">Свържи {clientName} с този акаунт</h1>
            <p className="text-xs text-slate-400">Достъп до CRM инструменти от името на потребителя.</p>
          </div>
        </div>

        <div className="text-sm text-slate-300 space-y-2">
          <p>
            {clientName} ще може да извиква активираните инструменти на този CRM, докато сте вписан(а).
            Данните са ограничени според вашата роля (RLS).
          </p>
          {redirectUri && (
            <p className="text-xs text-slate-500 break-all">Redirect: {redirectUri}</p>
          )}
        </div>

        <div className="flex gap-2 justify-end">
          <Button variant="outline" disabled={busy} onClick={() => decide(false)}>
            Откажи
          </Button>
          <Button disabled={busy} onClick={() => decide(true)}>
            {busy ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
            Разреши
          </Button>
        </div>
      </div>
    </main>
  );
}
