import { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import {
  Inbox, FileText, Users, LogOut, Menu, X, Newspaper, ExternalLink,
  BarChart3, Megaphone, MessageSquare, Database, Link2, Mail, Star,
  PhoneCall, FolderOpen, Contact, ChevronRight, Shield, Bell,
  Command,
} from "lucide-react";

const navSections = [
  {
    label: "Основни",
    items: [
      { to: "/admin/analytics", label: "Аналитика", icon: BarChart3 },
      { to: "/admin/leads", label: "CRM Лийдове", icon: Database },
      { to: "/admin/contacts", label: "Контактна база", icon: Contact },
      { to: "/admin/inquiries", label: "Запитвания", icon: Inbox, badge: true },
      { to: "/admin/quotes", label: "Оферти", icon: FileText },
    ],
  },
  {
    label: "Маркетинг",
    items: [
      { to: "/admin/campaigns", label: "Кампании", icon: Megaphone },
      { to: "/admin/email-campaigns", label: "Имейл маркетинг", icon: Mail },
      { to: "/admin/backlinks", label: "SEO & Бекликове", icon: Link2 },
    ],
  },
  {
    label: "Съдържание",
    items: [
      { to: "/admin/articles", label: "Статии", icon: Newspaper },
      { to: "/admin/comments", label: "Дискусии", icon: MessageSquare },
      { to: "/admin/testimonials", label: "Отзиви", icon: Star },
      { to: "/admin/projects", label: "Проекти", icon: FolderOpen },
    ],
  },
  {
    label: "Управление",
    items: [
      { to: "/admin/calls", label: "Обаждания", icon: PhoneCall },
    ],
  },
];

const AdminDashboardPage = () => {
  const { user, isAdmin, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [newInquiriesCount, setNewInquiriesCount] = useState(0);
  const [collapsed, setCollapsed] = useState(false);

  const staffItem = { to: "/admin/staff", label: "Екип", icon: Users };
  const isActive = (path: string) => location.pathname.startsWith(path);

  const handleSignOut = async () => {
    await signOut();
    navigate("/admin/login");
  };

  useEffect(() => {
    if (location.pathname === "/admin" || location.pathname === "/admin/") {
      navigate("/admin/analytics", { replace: true });
    }
  }, [location.pathname, navigate]);

  // Fetch new inquiries count for badge
  useEffect(() => {
    const fetchCount = async () => {
      const { count } = await supabase
        .from("inquiries")
        .select("*", { count: "exact", head: true })
        .eq("status", "new");
      setNewInquiriesCount(count || 0);
    };
    fetchCount();
    const interval = setInterval(fetchCount, 60000);
    return () => clearInterval(interval);
  }, []);

  const sidebarWidth = collapsed ? "w-[68px]" : "w-64";

  return (
    <div className="admin-dark min-h-screen flex" style={{ background: "hsl(220 25% 6%)" }}>
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50 ${sidebarWidth}
        transform transition-all duration-300 lg:transform-none
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `} style={{ background: "hsl(220 25% 8%)", borderRight: "1px solid hsl(220 15% 15%)" }}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 flex items-center justify-between" style={{ borderBottom: "1px solid hsl(220 15% 15%)" }}>
            <Link to="/admin/analytics" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: "linear-gradient(135deg, hsl(215 80% 50%), hsl(260 60% 45%))" }}>
                <Shield className="h-5 w-5" style={{ color: "white" }} />
              </div>
              {!collapsed && (
                <div className="overflow-hidden">
                  <span className="font-bold text-sm block" style={{ color: "hsl(210 20% 95%)" }}>Покриви Варна</span>
                  <span className="text-[10px] font-medium tracking-widest" style={{ color: "hsl(215 80% 55%)" }}>CRM ПАНЕЛ</span>
                </div>
              )}
            </Link>
            <button className="lg:hidden" onClick={() => setSidebarOpen(false)} style={{ color: "hsl(215 15% 55%)" }}>
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Nav */}
          <nav className="flex-1 p-3 space-y-4 overflow-y-auto">
            {navSections.map((section) => (
              <div key={section.label}>
                {!collapsed && (
                  <p className="text-[10px] font-bold uppercase tracking-widest px-3 mb-1.5"
                    style={{ color: "hsl(215 15% 40%)" }}>
                    {section.label}
                  </p>
                )}
                <div className="space-y-0.5">
                  {section.items.map((item) => {
                    const active = isActive(item.to);
                    return (
                      <Link
                        key={item.to}
                        to={item.to}
                        onClick={() => setSidebarOpen(false)}
                        className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium transition-all duration-200 group relative
                          ${collapsed ? "justify-center" : ""}`}
                        style={{
                          background: active ? "linear-gradient(135deg, hsl(215 80% 50% / 0.15), hsl(260 60% 50% / 0.08))" : "transparent",
                          color: active ? "hsl(215 80% 65%)" : "hsl(215 15% 55%)",
                          borderLeft: active ? "2px solid hsl(215 80% 55%)" : "2px solid transparent",
                        }}
                        onMouseEnter={(e) => {
                          if (!active) {
                            e.currentTarget.style.background = "hsl(220 20% 14%)";
                            e.currentTarget.style.color = "hsl(210 20% 88%)";
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!active) {
                            e.currentTarget.style.background = "transparent";
                            e.currentTarget.style.color = "hsl(215 15% 55%)";
                          }
                        }}
                      >
                        <item.icon className="h-4 w-4 shrink-0" style={active ? { filter: "drop-shadow(0 0 6px hsl(215 80% 55% / 0.5))" } : {}} />
                        {!collapsed && <span>{item.label}</span>}
                        {"badge" in item && item.badge && newInquiriesCount > 0 && (
                          <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full text-[10px] font-bold animate-pulse"
                            style={{ background: "hsl(0 84% 55%)", color: "white" }}>
                            {newInquiriesCount}
                          </span>
                        )}
                        {active && !collapsed && <ChevronRight className="h-3 w-3 ml-auto" />}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}

            {isAdmin && (
              <div>
                {!collapsed && (
                  <p className="text-[10px] font-bold uppercase tracking-widest px-3 mb-1.5"
                    style={{ color: "hsl(215 15% 40%)" }}>
                    Администратор
                  </p>
                )}
                <Link
                  to={staffItem.to}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium transition-all duration-200
                    ${collapsed ? "justify-center" : ""}`}
                  style={{
                    background: isActive(staffItem.to) ? "linear-gradient(135deg, hsl(215 80% 50% / 0.15), hsl(260 60% 50% / 0.08))" : "transparent",
                    color: isActive(staffItem.to) ? "hsl(215 80% 65%)" : "hsl(215 15% 55%)",
                    borderLeft: isActive(staffItem.to) ? "2px solid hsl(215 80% 55%)" : "2px solid transparent",
                  }}
                >
                  <staffItem.icon className="h-4 w-4 shrink-0" />
                  {!collapsed && <span>{staffItem.label}</span>}
                </Link>
              </div>
            )}
          </nav>

          {/* Footer */}
          <div className="p-3 space-y-1" style={{ borderTop: "1px solid hsl(220 15% 15%)" }}>
            <Link
              to="/"
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] transition-colors"
              style={{ color: "hsl(215 15% 55%)" }}
            >
              <ExternalLink className="h-4 w-4" />
              {!collapsed && "Към сайта"}
            </Link>
            {!collapsed && (
              <div className="px-3 py-1">
                <p className="text-[11px] truncate" style={{ color: "hsl(215 15% 40%)" }}>{user?.email}</p>
              </div>
            )}
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-[13px] transition-colors"
              style={{ color: "hsl(215 15% 55%)" }}
            >
              <LogOut className="h-4 w-4" />
              {!collapsed && "Изход"}
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="px-4 py-3 flex items-center gap-3 lg:justify-end"
          style={{ background: "hsl(220 25% 8%)", borderBottom: "1px solid hsl(220 15% 15%)" }}>
          <button className="lg:hidden" onClick={() => setSidebarOpen(true)} style={{ color: "hsl(215 15% 55%)" }}>
            <Menu className="h-5 w-5" />
          </button>
          <span className="lg:hidden ml-1 font-semibold flex-1" style={{ color: "hsl(210 20% 92%)" }}>Админ панел</span>

          {/* Collapse toggle - desktop */}
          <button
            className="hidden lg:flex items-center justify-center w-8 h-8 rounded-lg transition-colors mr-auto"
            onClick={() => setCollapsed(!collapsed)}
            style={{ color: "hsl(215 15% 55%)", background: "hsl(220 20% 12%)" }}
          >
            <Menu className="h-4 w-4" />
          </button>

          {/* Notification bell */}
          {newInquiriesCount > 0 && (
            <Link to="/admin/inquiries" className="relative p-2 rounded-lg transition-colors"
              style={{ color: "hsl(215 15% 55%)", background: "hsl(220 20% 12%)" }}>
              <Bell className="h-4 w-4" />
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold animate-pulse"
                style={{ background: "hsl(0 84% 55%)", color: "white" }}>
                {newInquiriesCount}
              </span>
            </Link>
          )}

          <Link to="/" className="p-2 rounded-lg transition-colors hidden lg:flex"
            style={{ color: "hsl(215 15% 55%)", background: "hsl(220 20% 12%)" }}>
            <ExternalLink className="h-4 w-4" />
          </Link>
        </header>

        <main className="flex-1 p-4 md:p-6 overflow-auto" style={{ background: "hsl(220 25% 6%)" }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
