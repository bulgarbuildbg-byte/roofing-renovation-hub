import { useParams } from "react-router-dom";
import { findRouteKeyBySlug, type RouteKey } from "@/i18n/routes";
import { SUPPORTED_LANGUAGES, type SupportedLanguage } from "@/i18n/config";
import Index from "@/pages/Index";
import ServicesPage from "@/pages/ServicesPage";
import AboutPage from "@/pages/AboutPage";
import ProjectsPage from "@/pages/ProjectsPage";
import FAQPage from "@/pages/FAQPage";
import ContactPage from "@/pages/ContactPage";
import ReviewsPage from "@/pages/ReviewsPage";
import RoofRepairPage from "@/pages/services/RoofRepairPage";
import RoofLeakRepairPage from "@/pages/services/RoofLeakRepairPage";
import WaterproofingPage from "@/pages/services/WaterproofingPage";
import NewRoofPage from "@/pages/services/NewRoofPage";
import TileReplacementPage from "@/pages/services/TileReplacementPage";
import FlatRoofPage from "@/pages/services/FlatRoofPage";
import MetalRoofPage from "@/pages/services/MetalRoofPage";
import MaintenancePage from "@/pages/services/MaintenancePage";
import BlogPage from "@/pages/BlogPage";
import BlogArticle from "@/pages/blog/BlogArticle";
import CalculatorPage from "@/pages/CalculatorPage";
import NotFound from "@/pages/NotFound";

const PAGE_MAP: Record<RouteKey, React.ComponentType> = {
  home: Index,
  services: ServicesPage,
  about: AboutPage,
  projects: ProjectsPage,
  faq: FAQPage,
  contact: ContactPage,
  reviews: ReviewsPage,
  roofRepair: RoofRepairPage,
  leakRepair: RoofLeakRepairPage,
  waterproofing: WaterproofingPage,
  newRoof: NewRoofPage,
  tileReplacement: TileReplacementPage,
  flatRoof: FlatRoofPage,
  metalRoof: MetalRoofPage,
  maintenance: MaintenancePage,
  blog: BlogPage,
  calculator: CalculatorPage,
};

const LocalizedPageRouter = () => {
  const { lang, '*': restPath } = useParams<{ lang: string; '*': string }>();
  const currentLang = (SUPPORTED_LANGUAGES.includes(lang as SupportedLanguage) ? lang : 'bg') as SupportedLanguage;
  const slug = restPath || '';

  // No slug = home page
  if (!slug) return <Index />;

  // Check if it's a blog article (blog-slug/article-slug pattern)
  const blogSlugParts = slug.split('/');
  if (blogSlugParts.length === 2) {
    const parentKey = findRouteKeyBySlug(blogSlugParts[0], currentLang);
    if (parentKey === 'blog') {
      return <BlogArticle />;
    }
  }

  const routeKey = findRouteKeyBySlug(slug, currentLang);
  if (routeKey && PAGE_MAP[routeKey]) {
    const PageComponent = PAGE_MAP[routeKey];
    return <PageComponent />;
  }

  return <NotFound />;
};

export default LocalizedPageRouter;
