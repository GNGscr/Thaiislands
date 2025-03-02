"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import SwipeCarousel from "./SwipeCarousel";
import ButtonLightningAnimation from "./ButtonLightningAnimation";
import HotelsSection from "./HotelsSection";
import TiltComponent from "./TiltComponent";

// :: TODOs :: 
// OverAll - 
// Check how to fetch everything from outside source including gallery photos all dynamic text and values !!!
// Add cookies for crawlers 
// Connect google analytics (using Goldi) to check for data and have control


export default function Main({ data, lang, media, activateMenuIsActive, title, mainImg, mapDrawing }) {
  if (!data) return;
  // console.log('card limit en: ', 285);
  // console.log('card limit he: ', 225);
  // console.log('card limit en recommended: ', 255);
  // console.log('card limit he recommended: ', 205);
  
  return (
    <div className="bg-white main">
      <TextParallaxContentComponent
        isMapVisible={false}
        imgUrl={mainImg}
        subheading={data['heroPara'][lang]}
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
        <ExampleContent
          currentPara={data["article-main-paragraph"][lang].a}
          isLogoSection={true}
          sidePara={data.sideParagraphs.sidePara1}
          lang={lang}
        />

      </TextParallaxContentComponent>

      <TextParallaxContentComponent
        isMapVisible={true}
        imgUrl={mapDrawing}
        isCtaButton={false}
        isHeader={false}
        isHotels={false}
        subheading=""
        heading={data["map-title"][lang][media]}
        data={data}
        lang={lang}
        activateMenuIsActive={activateMenuIsActive}
        title={title}
        media={media}
      >
        <ExampleContent
          currentPara={data["article-main-paragraph"][lang].b}
          isLogoSection={false}
          sidePara={data.sideParagraphs.sidePara2}
          lang={lang}
          data={data}
        />

      </TextParallaxContentComponent>

      <div className={`relative h-[${media === 'desktop' ? '120' : '60'}${media === 'desktop' ? 'vh' : 'lvh'}]`
      }>
        <div className="sticky top-0">
          <SwipeCarousel data={data} lang={lang} media={media} />
        </div>
      </div>

      <div className="decleration-wrapper">
        <motion.div
          className="decleration"
          initial={{ opacity: 0, y: "120%", }}
          whileInView={{ opacity: 1, y: 0, }}
          transition={{ duration: 0.75, type: "spring" }}
        >
          <span className="text-7xl text-[#ccc] relative top-[-0.75rem]"></span>
          {data["article-second-paragraph"][lang]}
          <div
            className={`blink-emoji text-[2.25rem] absolute bottom-[-0.5rem]
              ${lang === 'he' ? 'left-80' : 'right-60'} pl-9`}>
            😉
          </div>
          <span className="text-7xl text-[#ccc]" style={{ transform: "rotateZ(180deg)" }}></span>
        </motion.div>
      </div>
      <HotelsSection data={data} lang={lang} media={media} />
    </div>
  );
};

const IMG_PADDING = 12;

const TextParallaxContentComponent = ({
  imgUrl,
  subheading,
  heading,
  children,
  isMapVisible,
  isCtaButton,
  isHeader,
  data,
  lang,
  activateMenuIsActive,
  title,
  media,
  router
}) => {
  return (
    <div
      style={{
        paddingLeft: IMG_PADDING,
        paddingRight: IMG_PADDING,
      }}
    >
      <div className={`relative h-[150vh]`} id={`${isMapVisible ? 'map-img' : ''}`}>
        <StickyImage imgUrl={imgUrl} isMapVisible={isMapVisible} data={data} media={media} router={router} />
        <OverlayCopy
          heading={heading}
          subheading={subheading}
          isCtaButton={isCtaButton}
          isHeader={isHeader}
          data={data}
          lang={lang}
          activateMenuIsActive={activateMenuIsActive}
          title={title}
          media={media}
        />
      </div>
      {children}
    </div>
  );
};

const StickyImage = ({ imgUrl, isMapVisible, data, lang, media }) => {

  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["end end", "end start"],
  });
  
  const scale = useTransform(scrollYProgress, [0, 0.02, 1], [1, 1, 0.85]);
  const opacity = useTransform(scrollYProgress, [0, 0.0275, 1], [1, 0, 0]);
  const opacityMobile = useTransform(scrollYProgress, [0, 0.05, 1], [0.3, 0.15, 0]);
  
  if (!imgUrl) return '';

  else return (
    <motion.div
      style={{
        backgroundImage: `url(${imgUrl})`,
        backgroundSize: "cover",
        backgroundRepeat: 'no-repeat',
        backgroundPosition: "center",
        height: `calc(100vh - ${IMG_PADDING * 2}px)`,
        top: IMG_PADDING,
        scale
      }}
      ref={targetRef}
      className="sticky z-0 overflow-hidden rounded-3xl"
    >
      <motion.div
        className="absolute inset-0 bg-neutral-950/80"
        style={{ opacity: media === "mobile" ? opacityMobile : opacity }}
      />

      {
        isMapVisible
          ? <div id="map">
            <div className="map-responsive">
              <iframe src={data.googleMap.link}
                width={data["island-name"][lang] === "Koh Phangan" ? "600" : "100%"}
                height="450"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Responsive Google Map">
              </iframe>
            </div>
          </div>
          : ''
      }
    </motion.div>
  );
};

const OverlayCopy = ({
  subheading,
  heading,
  isCtaButton,
  isHeader,
  data,
  lang,
  activateMenuIsActive,
  title,
  media
}) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [250, -250]);
  const opacity = useTransform(scrollYProgress, [0.25, 0.5, 0.75], [0, 1, 0]);
  const opacityMobile = useTransform(scrollYProgress, [0.25, 0.5, 0.75], [1, 1, 0]);
  return (
    <motion.div
      style={{ y, opacity: media === "mobile" ? opacityMobile : opacity }}
      ref={targetRef}
      className={`hero-content absolute ${isCtaButton ? 'pt-32' : ''} left-0 top-0 flex
      ${isCtaButton ? 'h-screen' : 'h-[45%]'} w-full flex-col items-center
      ${isCtaButton ? 'justify-center' : 'justify-end'} text-white pl-[25%] pr-[25%] rtl`}
    >
      <div className="hover-the-map-txt text-center text-4xl font-bold md:text-7xl">
        {
          isHeader
            ? <h3 className="mt-[-3rem]">{title}</h3>
            : <div className="hover-map">{heading}</div>
        }
      </div>
      <motion.div
        initial={{ opacity: 0, y: "75%" }}
        whileInView={{ opacity: 1, y: 0, }}
        transition={{ duration: 0.5, type: "tween", }}
        className="main-header mb-2 text-center text-xl md:mb-4 md:text-4xl text-bold">
        {subheading}
      </motion.div>
      {isCtaButton && <ButtonLightningAnimation text={data.ctaText[lang]} activateMenuIsActive={activateMenuIsActive} />}
    </motion.div>
  );
};

const ExampleContent = ({ currentPara, isLogoSection, sidePara, lang, data }) => (
  <div className={`section-content
    ${lang === "he"
      ? 'mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 pb-24 pt-12 md:grid-cols-12'
      : 'mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 pb-12 pt-24 md:grid-cols-12 md:grid-cols-reverse'
    }
    `}>
    <h2 className={`section-content-h col-span-1 text-3xl font-bold md:col-span-4 overflow-hidden`}>
      {sidePara && lang &&

        <div className="text-[2.7rem] relative right-[15%] text-[#aaa]">
          <motion.div
            className="quote"
            initial={{
              opacity: 0,
              x: lang === "he" ? "-100%" : "100%",
              skewX: "30deg"
            }}
            whileInView={{ opacity: 1, x: "15%", skewX: 0 }}
            transition={{ duration: 0.4, type: "tween", }}
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
);