import { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Inbox, FileText, Users, LogOut, Menu, X, Newspaper, ExternalLink,
  BarChart3, Megaphone, MessageSquare, Database, Link2, Mail, Star,
  PhoneCall, FolderOpen, Contact, ChevronRight,
} from "lucide-react";
import logo from "@/assets/logo-horizontal.jpeg";

const navSections = [
  {
    label: "Основни",
    items: [
      { to: "/admin/analytics", label: "Аналитика", icon: BarChart3 },
      { to: "/admin/leads", label: "CRM Лийдове", icon: Database },
      { to: "/admin/contacts", label: "Контактна база", icon: Contact },
      { to: "/admin/inquiries", label: "Запитвания", icon: Inbox },
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

  const allNavItems = navSections.flatMap(s => s.items);
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

  return (
    <div className="min-h-screen bg-muted/40 flex">
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 bg-card border-r border-border
        transform transition-transform lg:transform-none
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}>
        <div className="flex flex-col h-full">
          {/* Header with gradient */}
          <div className="bg-gradient-to-br from-primary to-primary/80 p-4 flex items-center justify-between">
            <Link to="/admin/analytics" className="flex items-center gap-2">
              <img src={logo} alt="Logo" className="h-8 rounded" />
              <div>
                <span className="font-bold text-primary-foreground text-sm">Покриви Варна</span>
                <span className="block text-[10px] text-primary-foreground/70 font-medium tracking-wider">CRM ПАНЕЛ</span>
              </div>
            </Link>
            <button className="lg:hidden text-primary-foreground" onClick={() => setSidebarOpen(false)}>
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="flex-1 p-3 space-y-4 overflow-y-auto">
            {navSections.map((section) => (
              <div key={section.label}>
                <p className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest px-3 mb-1.5">
                  {section.label}
                </p>
                <div className="space-y-0.5">
                  {section.items.map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium transition-all duration-200
                        ${isActive(item.to)
                          ? "bg-gradient-to-r from-primary/15 to-primary/5 text-primary border-l-2 border-primary"
                          : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                        }`}
                    >
                      <item.icon className="h-4 w-4 shrink-0" />
                      {item.label}
                      {isActive(item.to) && <ChevronRight className="h-3 w-3 ml-auto" />}
                    </Link>
                  ))}
                </div>
              </div>
            ))}

            {isAdmin && (
              <div>
                <p className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest px-3 mb-1.5">
                  Администратор
                </p>
                <Link
                  to={staffItem.to}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium transition-all duration-200
                    ${isActive(staffItem.to)
                      ? "bg-gradient-to-r from-primary/15 to-primary/5 text-primary border-l-2 border-primary"
                      : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                    }`}
                >
                  <staffItem.icon className="h-4 w-4 shrink-0" />
                  {staffItem.label}
                </Link>
              </div>
            )}
          </nav>

          <div className="p-3 border-t border-border bg-muted/30 space-y-1">
            <Link
              to="/"
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
              Към сайта
            </Link>
            <div className="px-3 py-1">
              <p className="text-[11px] text-muted-foreground/70 truncate">{user?.email}</p>
            </div>
            <Button variant="ghost" className="w-full justify-start text-[13px] h-9" onClick={handleSignOut}>
              <LogOut className="h-4 w-4 mr-2" />
              Изход
            </Button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-card border-b border-border px-4 py-3 flex items-center lg:hidden">
          <button onClick={() => setSidebarOpen(true)}>
            <Menu className="h-5 w-5" />
          </button>
          <span className="ml-3 font-semibold text-foreground flex-1">Админ панел</span>
          <Link to="/" className="text-muted-foreground hover:text-foreground">
            <ExternalLink className="h-5 w-5" />
          </Link>
        </header>

        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
