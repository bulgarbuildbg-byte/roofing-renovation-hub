import { useParams, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import WinterRoofPreparation from "./WinterRoofPreparation";
import RoofRepairSigns from "./RoofRepairSigns";
import WaterproofingTypes from "./WaterproofingTypes";
import SpringInspection from "./SpringInspection";
import CommonMistakes from "./CommonMistakes";
import ChoosingTiles from "./ChoosingTiles";
import RoofRepairCostVarna from "./RoofRepairCostVarna";
import TileReplacementGuide from "./TileReplacementGuide";
import RoofLeakCauses from "./RoofLeakCauses";
import RoofMaintenanceGuide from "./RoofMaintenanceGuide";
import DynamicArticle from "./DynamicArticle";

const staticArticles: Record<string, React.ComponentType> = {
  // New Latin slugs
  "podgotovka-pokriv-za-zimata": WinterRoofPreparation,
  "5-priznaka-remont-na-pokriv": RoofRepairSigns,
  "vidove-hidroizolacia-narachnik": WaterproofingTypes,
  "proletna-inspekcia-na-pokriva": SpringInspection,
  "greshki-pri-remont-na-pokriv": CommonMistakes,
  "izbor-na-keremidi-za-pokriv": ChoosingTiles,
  "tsena-remont-pokriv-varna-2026": RoofRepairCostVarna,
  "smyana-na-keremidi-cena-i-narachnik": TileReplacementGuide,
  "tech-ot-pokriva-prichini-i-reshenia": RoofLeakCauses,
  "poddruzhka-na-pokriv-rakovodstvo-2026": RoofMaintenanceGuide,
  // Old Cyrillic slugs (backward compat)
  "как-да-подготвим-покрива-за-зимата": WinterRoofPreparation,
  "5-признака-че-покривът-се-нуждае-от-ремонт": RoofRepairSigns,
  "видове-хидроизолация-и-кога-да-изберем-всяка": WaterproofingTypes,
  "пролетна-инспекция-на-покрива": SpringInspection,
  "най-честите-грешки-при-покривни-ремонти": CommonMistakes,
  "избор-на-керемиди-за-нов-покрив": ChoosingTiles,
};

const BlogArticle = () => {
  const { '*': restPath } = useParams();
  const slug = restPath?.split('/').pop() || "";
  const [isDynamic, setIsDynamic] = useState<boolean | null>(null);

  useEffect(() => {
    if (!slug) return;
    if (staticArticles[slug]) {
      setIsDynamic(false);
    } else {
      supabase
        .from("articles")
        .select("id")
        .eq("slug", slug)
        .eq("published", true)
        .single()
        .then(({ data }) => {
          setIsDynamic(!!data);
        });
    }
  }, [slug]);

  if (!slug) return <Navigate to="/bg/blog" replace />;

  // Static article
  if (isDynamic === false && staticArticles[slug]) {
    const Component = staticArticles[slug];
    return <Component />;
  }

  // Dynamic article
  if (isDynamic === true) {
    return <DynamicArticle />;
  }

  // Loading
  if (isDynamic === null) {
    return <div className="flex justify-center py-32"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" /></div>;
  }

  return <Navigate to="/bg/blog" replace />;
};

export default BlogArticle;
