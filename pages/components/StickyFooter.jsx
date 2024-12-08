"use client";
import Noise from './Noise';
import React, { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from 'framer-motion';

// [#c8bdb0]
export default function StickyFooter({ data, lang }) {
    const container = useRef();
    const { scrollYProgress } = useScroll({
      target: container,
      offset: ['start start', 'end start']
    });
      // Set the color to switch by toggle (ease fnc) between sections
  const isDisplayed = useTransform(
    scrollYProgress,
    [0, 0.15, 0.25, 0.7, 1],
    ["none", "none", "none", "flex", "flex"],
    { ease: (t) => Math.round(t) }
  );

  useEffect(() => {
  }, [isDisplayed]);

    return (
        <motion.div 
            className="footer fixed bottom-0 z-[-1] w-screen gap-4" 
            style={{ opacity: 0.85, display: isDisplayed  }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.85 }}
            transition={{ duration: 0.1 }}
        >
            <div className="relative h-[300px]">
                <Noise data={data} lang={lang} />
            </div>
        </motion.div>
    )
}