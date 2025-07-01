import { motion } from "framer-motion";
import TiltComponent from "../common/TiltComponent";

const HighlightedTextBlock = ({ currentPara, isLogoSection, sidePara, lang, data }) => {
  const quoteVariants = {
    initial: {
      opacity: 0,
      x: lang === "he" ? "-100%" : "100%",
      skewX: 30
    },
    whileInView: { opacity: 1, x: "15%", skewX: 0 },
    transition:{ duration: 0.4, type: "tween", }
  };
  return (
    <div className={`section-content
      ${lang === "he"
        ? 'mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 pb-24 pt-12 md:grid-cols-12'
        : 'mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 pb-12 pt-24 md:grid-cols-12'
      }
      `}
      style={{ gap: "6rem" }}>
      <h2 className={`section-content-h col-span-1 text-3xl font-bold md:col-span-4 overflow-hidden`}>
        {sidePara && lang &&
  
          <div className="text-[2.7rem] relative right-[15%] text-[#aaa]">
            <motion.div
              className="quote"
              {...quoteVariants}
            >
              {sidePara[lang]}
            </motion.div>
          </div>
        }
      </h2>
      <div className="section-content-para col-span-1 md:col-span-8">
        <p className="section-content-para-1 mb-4 text-xl text-neutral-600 md:text-2xl">
          {currentPara}
        </p>
  
        <TiltComponent isLogoSection={isLogoSection} data={data} />
      </div>
    </div>
  )
};

  export default HighlightedTextBlock;