"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ButtonLightningAnimation from "../common/ButtonLightningAnimation";
import MapEmbed from "../interactive/MapEmbed";

const IMG_PADDING = 12;

export default function TextParallaxSection({
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
  }) {
    
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
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        height: `calc(100vh - ${IMG_PADDING * 2}px)`,
        top: IMG_PADDING,
        scale,
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
                <MapEmbed link={data.googleMap.link} lang={data["island-name"][lang]} />
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
          dir={lang === 'he' ? 'rtl' : 'ltr'}
          className="main-header mb-2 text-center text-xl md:mb-4 md:text-4xl text-bold">
          {subheading}
        </motion.div>
        {isCtaButton && <ButtonLightningAnimation text={data.ctaText[lang]} activateMenuIsActive={activateMenuIsActive} />}
      </motion.div>
    );
  };



// "use client";
// import StickyImage from "./StickyImage";
// import OverlayCopy from "../common/OverlayOpacity";

// const IMG_PADDING = 12;

// export default function TextParallaxSection({
//     imgUrl,
//     subheading,
//     heading,
//     children,
//     isMapVisible,
//     isCtaButton,
//     isHeader,
//     data,
//     lang,
//     activateMenuIsActive,
//     title,
//     media,
//     router
//   }) {
    
//     return (
//       <div
//         style={{
//           paddingLeft: IMG_PADDING,
//           paddingRight: IMG_PADDING,
//         }}
//       >
//         <div className={`relative h-[150vh]`} id={`${isMapVisible ? 'map-img' : ''}`}>
//           <StickyImage imgUrl={imgUrl} isMapVisible={isMapVisible} data={data} media={media} router={router} />
//           <OverlayCopy
//             heading={heading}
//             subheading={subheading}
//             isCtaButton={isCtaButton}
//             isHeader={isHeader}
//             data={data}
//             lang={lang}
//             activateMenuIsActive={activateMenuIsActive}
//             title={title}
//             media={media}
//           />
//         </div>
//         {children}
//       </div>
//     );
//   };