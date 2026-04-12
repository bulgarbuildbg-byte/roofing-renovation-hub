import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/admin/ProtectedRoute";
import LanguageLayout from "@/components/LanguageLayout";
import LanguageRedirect from "@/components/LanguageRedirect";
import LocalizedPageRouter from "@/components/LocalizedPageRouter";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";
import AnalyticsTracker from "./components/AnalyticsTracker";

// Admin pages — lazy loaded (never needed by public visitors)
const AdminLoginPage = lazy(() => import("./pages/admin/AdminLoginPage"));
const AdminDashboardPage = lazy(() => import("./pages/admin/AdminDashboardPage"));
const InquiryListPage = lazy(() => import("./pages/admin/InquiryListPage"));
const InquiryDetailPage = lazy(() => import("./pages/admin/InquiryDetailPage"));
const QuoteEditorPage = lazy(() => import("./pages/admin/QuoteEditorPage"));
const QuoteListPage = lazy(() => import("./pages/admin/QuoteListPage"));
const StaffManagementPage = lazy(() => import("./pages/admin/StaffManagementPage"));
const ArticleListPage = lazy(() => import("./pages/admin/ArticleListPage"));
const ArticleEditorPage = lazy(() => import("./pages/admin/ArticleEditorPage"));
const ContractEditorPage = lazy(() => import("./pages/admin/ContractEditorPage"));
const AnalyticsPage = lazy(() => import("./pages/admin/AnalyticsPage"));
const CampaignListPage = lazy(() => import("./pages/admin/CampaignListPage"));
const CampaignEditorPage = lazy(() => import("./pages/admin/CampaignEditorPage"));
const CommentsModPage = lazy(() => import("./pages/admin/CommentsModPage"));
const LeadDatabasePage = lazy(() => import("./pages/admin/LeadDatabasePage"));
const BacklinksPage = lazy(() => import("./pages/admin/BacklinksPage"));
const EmailCampaignListPage = lazy(() => import("./pages/admin/EmailCampaignListPage"));
const EmailCampaignEditorPage = lazy(() => import("./pages/admin/EmailCampaignEditorPage"));
const TestimonialsManagementPage = lazy(() => import("./pages/admin/TestimonialsManagementPage"));
const CallLogPage = lazy(() => import("./pages/admin/CallLogPage"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <ScrollToTop />
          <AnalyticsTracker />
          <Routes>
            {/* Root: detect language and redirect */}
            <Route path="/" element={<LanguageRedirect />} />

            {/* Old bare URLs without /bg/ prefix — redirect to new Latin BG slugs */}
            <Route path="/services" element={<Navigate to="/bg/services" replace />} />
            <Route path="/за-нас" element={<Navigate to="/bg/za-nas" replace />} />
            <Route path="/проекти" element={<Navigate to="/bg/proekti" replace />} />
            <Route path="/въпроси" element={<Navigate to="/bg/vaprosi" replace />} />
            <Route path="/контакти" element={<Navigate to="/bg/kontakti" replace />} />
            <Route path="/отзиви" element={<Navigate to="/bg/otzyvi" replace />} />
            <Route path="/ремонт-на-покриви" element={<Navigate to="/bg/remont-na-pokrivi" replace />} />
            <Route path="/ремонт-течове" element={<Navigate to="/bg/remont-na-techove-pokriv" replace />} />
            <Route path="/хидроизолация" element={<Navigate to="/bg/hidroizolacia-na-pokriv" replace />} />
            <Route path="/хидроизолация-варна" element={<Navigate to="/bg/hidroizolacia-na-pokriv" replace />} />
            <Route path="/изграждане-на-покрив" element={<Navigate to="/bg/nov-pokriv" replace />} />
            <Route path="/смяна-керемиди" element={<Navigate to="/bg/remont-na-keremideni-pokrivi" replace />} />
            <Route path="/плоски-покриви" element={<Navigate to="/bg/remont-na-ploski-pokrivi" replace />} />
            <Route path="/метални-покриви" element={<Navigate to="/bg/metalni-pokrivi" replace />} />
            <Route path="/поддръжка-на-покриви" element={<Navigate to="/bg/poddruzhka-na-pokrivi" replace />} />
            <Route path="/блог" element={<Navigate to="/bg/blog" replace />} />
            <Route path="/блог/:slug" element={<Navigate to="/bg/blog" replace />} />
            <Route path="/калкулатор" element={<Navigate to="/bg/kalkulator" replace />} />
            <Route path="/безплатен-оглед" element={<Navigate to="/bg/bezplaten-ogled" replace />} />

            {/* Language-prefixed public routes */}
            <Route path="/:lang/*" element={<LanguageLayout />}>
              <Route path="*" element={<LocalizedPageRouter />} />
            </Route>

            {/* Admin routes (no language prefix) — all lazy loaded */}
            <Route path="/admin/login" element={<Suspense fallback={null}><AdminLoginPage /></Suspense>} />
            <Route path="/admin" element={<Suspense fallback={null}><ProtectedRoute><AdminDashboardPage /></ProtectedRoute></Suspense>}>
              <Route path="analytics" element={<Suspense fallback={null}><AnalyticsPage /></Suspense>} />
              <Route path="leads" element={<Suspense fallback={null}><LeadDatabasePage /></Suspense>} />
              <Route path="inquiries" element={<Suspense fallback={null}><InquiryListPage /></Suspense>} />
              <Route path="inquiries/:id" element={<Suspense fallback={null}><InquiryDetailPage /></Suspense>} />
              <Route path="inquiries/:id/quote" element={<Suspense fallback={null}><QuoteEditorPage /></Suspense>} />
              <Route path="inquiries/:id/contract" element={<Suspense fallback={null}><ContractEditorPage /></Suspense>} />
              <Route path="quotes" element={<Suspense fallback={null}><QuoteListPage /></Suspense>} />
              <Route path="campaigns" element={<Suspense fallback={null}><CampaignListPage /></Suspense>} />
              <Route path="campaigns/new" element={<Suspense fallback={null}><CampaignEditorPage /></Suspense>} />
              <Route path="campaigns/:id/edit" element={<Suspense fallback={null}><CampaignEditorPage /></Suspense>} />
              <Route path="articles" element={<Suspense fallback={null}><ArticleListPage /></Suspense>} />
              <Route path="articles/new" element={<Suspense fallback={null}><ArticleEditorPage /></Suspense>} />
              <Route path="articles/:id/edit" element={<Suspense fallback={null}><ArticleEditorPage /></Suspense>} />
              <Route path="comments" element={<Suspense fallback={null}><CommentsModPage /></Suspense>} />
              <Route path="backlinks" element={<Suspense fallback={null}><BacklinksPage /></Suspense>} />
              <Route path="testimonials" element={<Suspense fallback={null}><TestimonialsManagementPage /></Suspense>} />
              <Route path="email-campaigns" element={<Suspense fallback={null}><EmailCampaignListPage /></Suspense>} />
              <Route path="email-campaigns/new" element={<Suspense fallback={null}><EmailCampaignEditorPage /></Suspense>} />
              <Route path="email-campaigns/:id/edit" element={<Suspense fallback={null}><EmailCampaignEditorPage /></Suspense>} />
              <Route path="calls" element={<Suspense fallback={null}><CallLogPage /></Suspense>} />
              <Route path="staff" element={<Suspense fallback={null}><ProtectedRoute requireAdmin><StaffManagementPage /></ProtectedRoute></Suspense>} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
