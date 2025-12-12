import { useParams, Navigate } from "react-router-dom";
import WinterRoofPreparation from "./WinterRoofPreparation";
import RoofRepairSigns from "./RoofRepairSigns";
import WaterproofingTypes from "./WaterproofingTypes";
import SpringInspection from "./SpringInspection";
import CommonMistakes from "./CommonMistakes";
import ChoosingTiles from "./ChoosingTiles";

const articleComponents: Record<string, React.ComponentType> = {
  "как-да-подготвим-покрива-за-зимата": WinterRoofPreparation,
  "5-признака-че-покривът-се-нуждае-от-ремонт": RoofRepairSigns,
  "видове-хидроизолация-и-кога-да-изберем-всяка": WaterproofingTypes,
  "пролетна-инспекция-на-покрива": SpringInspection,
  "най-честите-грешки-при-покривни-ремонти": CommonMistakes,
  "избор-на-керемиди-за-нов-покрив": ChoosingTiles,
};

const BlogArticle = () => {
  const { slug } = useParams<{ slug: string }>();
  
  if (!slug || !articleComponents[slug]) {
    return <Navigate to="/блог" replace />;
  }
  
  const ArticleComponent = articleComponents[slug];
  return <ArticleComponent />;
};

export default BlogArticle;
