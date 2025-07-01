import { motion, useScroll, useTransform } from "framer-motion";
import React, { useRef } from "react";


export default function StickyImage({ imgUrl, isMapVisible, data, lang, media }) {

    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
      target: targetRef,
      offset: ["end end", "end start"],
    });

    const scale = useTransform(scrollYProgress, [0, 0.02, 1], [1, 1, 0.85]);
    const opacity = useTransform(scrollYProgress, [0, 0.0275, 1], [1, 0, 0]);
    const opacityMobile = useTransform(scrollYProgress, [0, 0.05, 1], [0.3, 0.15, 0]);    
    
    if (!imgUrl) return;

    const islandName = data["island-name"][lang];
    const googleMapLink = data.googleMap.link;
  
    return (
      <motion.div
        style={{
          backgroundImage: `url(${imgUrl})`,
          backgroundSize: "cover",
          backgroundRepeat: 'no-repeat',
          backgroundPosition: "center",
          height: `calc(100vh - ${12 * 2}px)`,
          top: 12,
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
            ?? <div id="map">
              <div className="map-responsive">
                <iframe src={googleMapLink}
                  width={islandName === "Koh Phangan" ? "600" : "100%"}
                  height="450"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Responsive Google Map">
                </iframe>
              </div>
            </div>
        }
      </motion.div>
    );
  };