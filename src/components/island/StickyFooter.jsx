"use client";
import Noise from '../common/Noise';
import React, { useRef, useEffect } from "react";
import { m, motion, steps, useScroll, useTransform } from 'framer-motion';

export default function StickyFooter({ data, lang }) {
    const container = useRef();
    const { scrollYProgress } = useScroll({
      target: container,
      offset: ['start start', 'end start']
    });
    
    // Set the display value to switch by toggle (ease fnc) between flex and none
    const isDisplayed = useTransform(
        scrollYProgress,
        [0, 0.15, 0.25, 0.99, 1],
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
            <div className="relative h-[300px] w-screen">
                <Noise data={data} lang={lang} />
            </div>
        </motion.div>
    )
}