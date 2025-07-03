"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import MapEmbed from "../interactive/MapEmbed";
import styles from '../styles/StickyImage.module.css';

const IMG_PADDING = 12;

export default function StickyImage({ imgUrl, isMapVisible, data, lang, media }) {
  const targetRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["end end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.02, 1], [1, 1, 0.85]);
  const opacity = useTransform(scrollYProgress, [0, 0.0275, 1], [1, 0, 0]);
  const opacityMobile = useTransform(scrollYProgress, [0, 0.05, 1], [0.3, 0.15, 0]);

  if (!imgUrl) return null;

  return (
    <motion.div
      ref={targetRef}
      style={{
        backgroundImage: `url(${imgUrl})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        height: `calc(100vh - ${IMG_PADDING * 2}px)`,
        top: IMG_PADDING,
        scale,
      }}
      className="sticky z-0 overflow-hidden rounded-3xl"
    >
      <motion.div
        className="absolute inset-0 bg-neutral-950/80"
        style={{ opacity: media === "mobile" ? opacityMobile : opacity }}
      />
      {isMapVisible && (
        <div id="map">
          <div className={styles.mapResponsive}>
            <MapEmbed
              link={data.googleMap.link}
              lang={data["island-name"][lang]}
            />
          </div>
        </div>
      )}
    </motion.div>
  );
}
