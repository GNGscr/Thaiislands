import React, { useState } from "react";
import { motion } from "framer-motion";
import styles from '../styles/FlipLink.module.css';

const DURATION = 0.2;
const STAGGER = 0.02;

const FlipLink = ({ lang, toggleLanguage }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const oppositeCurrentLang = lang === "he" ? "en" : "he";

  return (
    <motion.div
      onTap={() => {
        toggleLanguage();
        setIsFlipped(prev => !prev); // Toggle the flip state on tap
      }}
      className={`${styles.lang} relative block overflow-hidden whitespace-nowrap text-1xl
        font-black uppercase sm:text-1xl md:text-1xl lg:text-1xl`}
      style={{
        lineHeight: 1,
      }}
    >
      <div>
        {oppositeCurrentLang.split("").map((l, i) => (
          <motion.span
            initial={{ y: 0 }}
            animate={isFlipped ? { y: "-100%" } : { y: 0 }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER * i,
            }}
            className="inline-block"
            key={i}
          >
            {l}
          </motion.span>
        ))}
      </div>
      <div className="absolute inset-0">
        {oppositeCurrentLang.split("").map((l, i) => (
          <motion.span
            initial={{ y: "100%" }}
            animate={isFlipped ? { y: 0 } : { y: "100%" }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER * i,
            }}
            className="inline-block"
            key={i}
          >
            {l}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
};

export default function RevealLinks({ toggleLanguage, lang }) {
  return (
    <section className="grid place-content-center text-white">
      <FlipLink lang={lang} toggleLanguage={toggleLanguage} />
    </section>
  );
}
