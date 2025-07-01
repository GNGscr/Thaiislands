import DefaultCard from "../common/DefaultCard";
import { motion } from "framer-motion";
import FlipCard from "../island/FlipCard";

export default function AffiliateCard({ affiliate, lang, media, animation }) {
  const props = {
    hotelName: affiliate.affiliateName,
    numOfStars: affiliate.affiliateNumberOfStars,
    content: affiliate.affiliateContent[lang],
    googleScore: affiliate.affiliateGoogleScore,
    link: affiliate.affiliateLink,
    image: affiliate.affiliateStyleImage,
    lang,
  };

  return (
    <motion.div className="affiliate-card" style={{ opacity: 0 }} {...animation}>
      {media === "desktop"
        ? <FlipCard {...props} />
        : <DefaultCard {...props} media={media} />}
    </motion.div>
  );
}
