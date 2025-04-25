import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ButtonLightningAnimation from "./ButtonLightningAnimation";

export default function OverlayCopy({
    subheading,
    heading,
    isCtaButton,
    isHeader,
    data,
    lang,
    activateMenuIsActive,
    title,
    media
  }) {
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