import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, Mail, Shield } from "lucide-react";

const AdminLoginPage = () => {
  const { signIn, user, isStaff } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [titleText, setTitleText] = useState("");
  const fullTitle = "CRM Панел";

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setTitleText(fullTitle.slice(0, i + 1));
      i++;
      if (i >= fullTitle.length) clearInterval(interval);
    }, 80);
    return () => clearInterval(interval);
  }, []);

  if (user && isStaff) {
    navigate("/admin", { replace: true });
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const { error } = await signIn(email, password);
    if (error) {
      setError("Невалиден имейл или парола");
    } else {
      navigate("/admin");
    }
    setLoading(false);
  };

  return (
    <div className="admin-dark min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ background: "hsl(220 25% 6%)" }}>
      {/* Animated gradient orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full opacity-20 animate-float"
        style={{ background: "radial-gradient(circle, hsl(215 80% 50% / 0.4), transparent 70%)" }} />
      <div className="absolute bottom-1/4 -right-32 w-80 h-80 rounded-full opacity-15 animate-float"
        style={{ background: "radial-gradient(circle, hsl(260 60% 50% / 0.3), transparent 70%)", animationDelay: "3s" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10"
        style={{ background: "radial-gradient(circle, hsl(215 70% 45% / 0.2), transparent 60%)" }} />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: "linear-gradient(hsl(215 80% 55% / 0.3) 1px, transparent 1px), linear-gradient(90deg, hsl(215 80% 55% / 0.3) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

      <div className="w-full max-w-md px-4 relative z-10">
        <div className="admin-glass rounded-2xl p-8 gradient-border admin-glow">
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
              style={{ background: "linear-gradient(135deg, hsl(215 80% 50%), hsl(260 60% 45%))" }}>
              <Shield className="h-8 w-8" style={{ color: "hsl(0 0% 100%)" }} />
            </div>
            <h1 className="text-2xl font-bold" style={{ color: "hsl(210 20% 95%)" }}>
              {titleText}
              <span className="animate-pulse">|</span>
            </h1>
            <p className="text-sm mt-1" style={{ color: "hsl(215 15% 55%)" }}>
              Влезте в акаунта си
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label style={{ color: "hsl(215 15% 65%)" }}>Имейл</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: "hsl(215 15% 45%)" }} />
                <Input
                  type="email"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="pl-10 h-12 border-0 focus-visible:ring-1"
                  style={{
                    background: "hsl(220 25% 12%)",
                    color: "hsl(210 20% 92%)",
                    borderColor: "hsl(220 15% 20%)",
                  }}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label style={{ color: "hsl(215 15% 65%)" }}>Парола</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: "hsl(215 15% 45%)" }} />
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pl-10 h-12 border-0 focus-visible:ring-1"
                  style={{
                    background: "hsl(220 25% 12%)",
                    color: "hsl(210 20% 92%)",
                    borderColor: "hsl(220 15% 20%)",
                  }}
                />
              </div>
            </div>

            {error && (
              <p className="text-sm text-center" style={{ color: "hsl(0 84% 60%)" }}>{error}</p>
            )}

            <Button
              type="submit"
              className="w-full h-12 text-base font-semibold border-0"
              disabled={loading}
              style={{
                background: "linear-gradient(135deg, hsl(215 80% 50%), hsl(260 60% 45%))",
                color: "hsl(0 0% 100%)",
              }}
            >
              {loading ? "Влизане..." : "Вход"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
