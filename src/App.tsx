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
import AdminLoginPage from "./pages/admin/AdminLoginPage";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import InquiryListPage from "./pages/admin/InquiryListPage";
import InquiryDetailPage from "./pages/admin/InquiryDetailPage";
import QuoteEditorPage from "./pages/admin/QuoteEditorPage";
import QuoteListPage from "./pages/admin/QuoteListPage";
import StaffManagementPage from "./pages/admin/StaffManagementPage";
import ArticleListPage from "./pages/admin/ArticleListPage";
import ArticleEditorPage from "./pages/admin/ArticleEditorPage";
import ContractEditorPage from "./pages/admin/ContractEditorPage";
import AnalyticsPage from "./pages/admin/AnalyticsPage";
import CampaignListPage from "./pages/admin/CampaignListPage";
import CampaignEditorPage from "./pages/admin/CampaignEditorPage";
import CommentsModPage from "./pages/admin/CommentsModPage";
import LeadDatabasePage from "./pages/admin/LeadDatabasePage";
import BacklinksPage from "./pages/admin/BacklinksPage";
import EmailCampaignListPage from "./pages/admin/EmailCampaignListPage";
import EmailCampaignEditorPage from "./pages/admin/EmailCampaignEditorPage";
import TestimonialsManagementPage from "./pages/admin/TestimonialsManagementPage";

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

            {/* Old Bulgarian URLs: redirect to /bg/... for backward compat */}
            <Route path="/services" element={<Navigate to="/bg/services" replace />} />
            <Route path="/за-нас" element={<Navigate to="/bg/за-нас" replace />} />
            <Route path="/проекти" element={<Navigate to="/bg/проекти" replace />} />
            <Route path="/въпроси" element={<Navigate to="/bg/въпроси" replace />} />
            <Route path="/контакти" element={<Navigate to="/bg/контакти" replace />} />
            <Route path="/отзиви" element={<Navigate to="/bg/отзиви" replace />} />
            <Route path="/ремонт-на-покриви" element={<Navigate to="/bg/ремонт-на-покриви" replace />} />
            <Route path="/ремонт-течове" element={<Navigate to="/bg/ремонт-течове" replace />} />
            <Route path="/хидроизолация" element={<Navigate to="/bg/хидроизолация" replace />} />
            <Route path="/изграждане-на-покрив" element={<Navigate to="/bg/изграждане-на-покрив" replace />} />
            <Route path="/смяна-керемиди" element={<Navigate to="/bg/смяна-керемиди" replace />} />
            <Route path="/плоски-покриви" element={<Navigate to="/bg/плоски-покриви" replace />} />
            <Route path="/метални-покриви" element={<Navigate to="/bg/метални-покриви" replace />} />
            <Route path="/поддръжка-на-покриви" element={<Navigate to="/bg/поддръжка-на-покриви" replace />} />
            <Route path="/блог" element={<Navigate to="/bg/блог" replace />} />
            <Route path="/блог/:slug" element={<Navigate to="/bg/блог" replace />} />
            <Route path="/калкулатор" element={<Navigate to="/bg/калкулатор" replace />} />

            {/* Language-prefixed public routes */}
            <Route path="/:lang/*" element={<LanguageLayout />}>
              <Route path="*" element={<LocalizedPageRouter />} />
            </Route>

            {/* Admin routes (no language prefix) */}
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route path="/admin" element={<ProtectedRoute><AdminDashboardPage /></ProtectedRoute>}>
              <Route path="analytics" element={<AnalyticsPage />} />
              <Route path="leads" element={<LeadDatabasePage />} />
              <Route path="inquiries" element={<InquiryListPage />} />
              <Route path="inquiries/:id" element={<InquiryDetailPage />} />
              <Route path="inquiries/:id/quote" element={<QuoteEditorPage />} />
              <Route path="inquiries/:id/contract" element={<ContractEditorPage />} />
              <Route path="quotes" element={<QuoteListPage />} />
              <Route path="campaigns" element={<CampaignListPage />} />
              <Route path="campaigns/new" element={<CampaignEditorPage />} />
              <Route path="campaigns/:id/edit" element={<CampaignEditorPage />} />
              <Route path="articles" element={<ArticleListPage />} />
              <Route path="articles/new" element={<ArticleEditorPage />} />
              <Route path="articles/:id/edit" element={<ArticleEditorPage />} />
              <Route path="comments" element={<CommentsModPage />} />
              <Route path="backlinks" element={<BacklinksPage />} />
              <Route path="testimonials" element={<TestimonialsManagementPage />} />
              <Route path="email-campaigns" element={<EmailCampaignListPage />} />
              <Route path="email-campaigns/new" element={<EmailCampaignEditorPage />} />
              <Route path="email-campaigns/:id/edit" element={<EmailCampaignEditorPage />} />
              <Route path="staff" element={<ProtectedRoute requireAdmin><StaffManagementPage /></ProtectedRoute>} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
