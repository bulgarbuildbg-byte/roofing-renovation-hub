import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/admin/ProtectedRoute";
import Index from "./pages/Index";
import ServicesPage from "./pages/ServicesPage";
import AboutPage from "./pages/AboutPage";
import ProjectsPage from "./pages/ProjectsPage";
import FAQPage from "./pages/FAQPage";
import ContactPage from "./pages/ContactPage";
import ReviewsPage from "./pages/ReviewsPage";
import RoofRepairPage from "./pages/services/RoofRepairPage";
import WaterproofingPage from "./pages/services/WaterproofingPage";
import NewRoofPage from "./pages/services/NewRoofPage";
import MaintenancePage from "./pages/services/MaintenancePage";
import RoofLeakRepairPage from "./pages/services/RoofLeakRepairPage";
import TileReplacementPage from "./pages/services/TileReplacementPage";
import FlatRoofPage from "./pages/services/FlatRoofPage";
import MetalRoofPage from "./pages/services/MetalRoofPage";
import BlogPage from "./pages/BlogPage";
import CalculatorPage from "./pages/CalculatorPage";
import BlogArticle from "./pages/blog/BlogArticle";
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
            {/* Public routes */}
            <Route path="/" element={<Index />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/за-нас" element={<AboutPage />} />
            <Route path="/проекти" element={<ProjectsPage />} />
            <Route path="/въпроси" element={<FAQPage />} />
            <Route path="/контакти" element={<ContactPage />} />
            <Route path="/отзиви" element={<ReviewsPage />} />
            <Route path="/ремонт-на-покриви" element={<RoofRepairPage />} />
            <Route path="/ремонт-течове" element={<RoofLeakRepairPage />} />
            <Route path="/хидроизолация" element={<WaterproofingPage />} />
            <Route path="/изграждане-на-покрив" element={<NewRoofPage />} />
            <Route path="/смяна-керемиди" element={<TileReplacementPage />} />
            <Route path="/плоски-покриви" element={<FlatRoofPage />} />
            <Route path="/метални-покриви" element={<MetalRoofPage />} />
            <Route path="/поддръжка-на-покриви" element={<MaintenancePage />} />
            <Route path="/блог" element={<BlogPage />} />
            <Route path="/блог/:slug" element={<BlogArticle />} />
            <Route path="/калкулатор" element={<CalculatorPage />} />

            {/* Admin routes */}
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
