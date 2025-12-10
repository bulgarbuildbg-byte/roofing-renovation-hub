import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ServicesPage from "./pages/ServicesPage";
import AboutPage from "./pages/AboutPage";
import ProjectsPage from "./pages/ProjectsPage";
import FAQPage from "./pages/FAQPage";
import ContactPage from "./pages/ContactPage";
import RoofRepairPage from "./pages/services/RoofRepairPage";
import WaterproofingPage from "./pages/services/WaterproofingPage";
import NewRoofPage from "./pages/services/NewRoofPage";
import MaintenancePage from "./pages/services/MaintenancePage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/за-нас" element={<AboutPage />} />
          <Route path="/проекти" element={<ProjectsPage />} />
          <Route path="/въпроси" element={<FAQPage />} />
          <Route path="/контакти" element={<ContactPage />} />
          <Route path="/ремонт-на-покриви" element={<RoofRepairPage />} />
          <Route path="/хидроизолация" element={<WaterproofingPage />} />
          <Route path="/изграждане-на-покрив" element={<NewRoofPage />} />
          <Route path="/поддръжка-на-покриви" element={<MaintenancePage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
