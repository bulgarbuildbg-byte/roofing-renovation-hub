import Index from "@/pages/Index";

/**
 * VarnaHome — wrapper for /bg/varna/ explicit URL.
 * Reuses the existing single-city Index page (Varna is the legacy default).
 * In Stage 2, this can become a fully separate Varna-specific page.
 */
const VarnaHome = () => {
  return <Index />;
};

export default VarnaHome;
