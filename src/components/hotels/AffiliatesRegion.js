import { motion } from "framer-motion";
import RegionsTitleAnimationJson from "../../public/data/regionalTitleAnimation.json";
import RowCardsAnimation from "../../public/data/rowCardsAnimation.json";
import MobileRowCardsAnimationJson from "../../public/data/mobileRowCardsAnimation.json";
import MobileOneRowCardsAnimationJson from "../../public/data/mobileOneRowCardsAnimation.json";
import splitAffiliatesByMedia from "../../utils/splitAffiliatesByMedia";
import AffiliateCard from "./AffiliateCard";

export default function AffiliatesRegion({ region, lang, media }) {
  const { regionAffiliates, regionName } = region;
  const currentRegionName = regionName?.[lang] || "";
  const rowedAffiliates = splitAffiliatesByMedia(regionAffiliates, media);

  const getAnimation = (index) => {
    if (media === "mobile") return MobileOneRowCardsAnimationJson[index];
    if (media === "tablet") return MobileRowCardsAnimationJson[index];
    return RowCardsAnimation[index];
  };

  return (
    <div className="w-screen relative">
      <motion.div style={{ opacity: 0 }} {...RegionsTitleAnimationJson} className="region-title">
        {currentRegionName}
      </motion.div>

      <div className="flex flex-col pb-6">
        {rowedAffiliates.map((row, i) => (
          <div key={i} className="affiliates-row gap-8">
            {row.map((affiliate, index) => (
              <AffiliateCard
                key={index}
                affiliate={affiliate}
                lang={lang}
                media={media}
                animation={getAnimation(index)}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
