"use client";
import { motion } from "framer-motion";
import SwipeCarousel from "./SwipeCarousel";
import HotelsSection from "./HotelsSection";
import { usePathname } from 'next/navigation';
import emojiLocation  from '../../public/data/emoji-location.json';
import TextParallaxSection from "./TextParallaxSection";
import HighlightedTextBlock from "./HighlightedTextBlock";
import NotFoundMessage from "../not-found/NotFound";
import styles from '../styles/Main.module.css';
import emojiStyles from '../styles/BlinkEmoji.module.css';
import declerationVariants from '../styles/animations/declerationVariants.json';

export default function Main({
  data,
  lang,
  media,
  activateMenuIsActive,
  title,
  mainImg,
  mapImage
}) {

  const pathname = usePathname();

  if (!data) return <NotFoundMessage message={"Data not found"} />;

  function getContent(data, lang, media, pathname) {
    return {
      paraA: data["article-main-paragraph"][lang].a,
      paraB: data["article-main-paragraph"][lang].b,
      secondPara: data["article-second-paragraph"][lang],
      heading: data["map-title"][lang][media],
      subheading: data['heroPara'][lang],
      sidePara1: data.sideParagraphs.sidePara1,
      sidePara2: data.sideParagraphs.sidePara2,
      emojiLocationPathName: emojiLocation[pathname]
    };
  };

  const content = getContent(data, lang, media, pathname);
  
  return (
    <div className={`bg-white ${styles.main}`}>
      <TextParallaxSection
        isMapVisible={false}
        imgUrl={mainImg}
        subheading={content.subheading}
        heading="Koh Phangan"
        isCtaButton={true}
        isHeader={true}
        isHotels={false}
        data={data}
        lang={lang}
        activateMenuIsActive={activateMenuIsActive}
        title={title}
        media={media}
      >
        <HighlightedTextBlock
          currentPara={content.paraA}
          isLogoSection={true}
          sidePara={content.sidePara1}
          lang={lang}
        />

      </TextParallaxSection>

      <TextParallaxSection
        isMapVisible={true}
        imgUrl={mapImage}
        isCtaButton={false}
        isHeader={false}
        isHotels={false}
        subheading=""
        heading={content.heading}
        data={data}
        lang={lang}
        activateMenuIsActive={activateMenuIsActive}
        title={title}
        media={media}
      >
        <HighlightedTextBlock
          currentPara={content.paraB}
          isLogoSection={false}
          sidePara={content.sidePara2}
          lang={lang}
          data={data}
        />

      </TextParallaxSection>

      <div className={`relative ${media === 'desktop' ? 'h-[120vh]' : 'h-[60lvh]'}`}>
        <div className="sticky top-0">
          <SwipeCarousel data={data} lang={lang} media={media} />
        </div>
      </div>

      <div className={styles.declerationWrapper}>
        <motion.div
          className={styles.decleration}
          initial={declerationVariants.initial}
          whileInView={declerationVariants.whileInView}
          transition={declerationVariants.transition}
        >
          <span className="text-7xl text-[#ccc] relative top-[-0.75rem]"></span>
          {content.secondPara}
          <div
            className={`${emojiStyles.blinkEmoji} text-[2.25rem] absolute bottom-[-0.5rem] pl-9 
            ${lang === 'he' ? emojiStyles.he : emojiStyles.en}
              ${content.emojiLocationPathName}`}>
            😉
          </div>
          <span className="text-7xl text-[#ccc]" style={{ transform: "rotateZ(180deg)" }}></span>
        </motion.div>
      </div>
      <HotelsSection data={data} lang={lang} media={media} />
    </div>
  );
}