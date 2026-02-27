import { useParams, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import WinterRoofPreparation from "./WinterRoofPreparation";
import RoofRepairSigns from "./RoofRepairSigns";
import WaterproofingTypes from "./WaterproofingTypes";
import SpringInspection from "./SpringInspection";
import CommonMistakes from "./CommonMistakes";
import ChoosingTiles from "./ChoosingTiles";
import DynamicArticle from "./DynamicArticle";

const staticArticles: Record<string, React.ComponentType> = {
  "как-да-подготвим-покрива-за-зимата": WinterRoofPreparation,
  "5-признака-че-покривът-се-нуждае-от-ремонт": RoofRepairSigns,
  "видове-хидроизолация-и-кога-да-изберем-всяка": WaterproofingTypes,
  "пролетна-инспекция-на-покрива": SpringInspection,
  "най-честите-грешки-при-покривни-ремонти": CommonMistakes,
  "избор-на-керемиди-за-нов-покрив": ChoosingTiles,
};

const BlogArticle = () => {
  const { slug } = useParams<{ slug: string }>();
  const [isDynamic, setIsDynamic] = useState<boolean | null>(null);

  useEffect(() => {
    if (!slug) return;
    if (staticArticles[slug]) {
      setIsDynamic(false);
    } else {
      // Check if it's a dynamic article
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

  if (!slug) return <Navigate to="/блог" replace />;

  // Static article
  if (isDynamic === false && staticArticles[slug]) {
    const Component = staticArticles[slug];
    return <Component />;
  }

  // Dynamic article
  if (isDynamic === true) {
    return <DynamicArticle />;
  }

  // Loading or not found
  if (isDynamic === null) {
    return <div className="flex justify-center py-32"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" /></div>;
  }

  return <Navigate to="/блог" replace />;
};

export default BlogArticle;
