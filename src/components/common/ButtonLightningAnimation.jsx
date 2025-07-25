import React from "react";
import { motion } from "framer-motion";

export default function ButtonLightningAnimation({ text, activateMenuIsActive }) {
  const handleClick = (e) => {
    e.preventDefault(); // Prevent default anchor behavior

    activateMenuIsActive(true);
    // Scroll to the section after the animation completes
    setTimeout(() => {
      const target = document.getElementById("hotels");
      if (target) {
        const targetPosition = target.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      }
      activateMenuIsActive(false); // Reset the menu state after scrolling
    }, 500); // Match this duration with the sectionAnimation duration
  }
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0, skewX: -15 }}
      whileInView={{ opacity: 1, scale: 1, skewX: 0 }}
      transition={{ duration: 0.65, type: "tween", }}
      className={`button-lightning grid place-content-center
      p-4 text-3xl --font-space-grotesk`}>
      <div
        aria-label={`button`}
        role="button"
        tabIndex="0"
        onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') handleClick(e);
        }}
        onClick={handleClick}>
        <DrawOutlineButton>
          {text}
        </DrawOutlineButton>
      </div>
    </motion.div>
  );
};

const DrawOutlineButton = ({ children, ...rest }) => {
  return (
    <button
      aria-label="cta-btn"
      {...rest}
      className="group relative px-4 py-2 font-medium text-slate-100 transition-colors duration-[400ms] hover:text-white"
    >
      <span>{children}</span>

      {/* TOP */}
      <span className="absolute left-0 top-0 h-[2px] w-0 bg-white transition-all duration-100 group-hover:w-full" />

      {/* RIGHT */}
      <span className="absolute right-0 top-0 h-0 w-[2px] bg-white transition-all delay-100 duration-100 group-hover:h-full" />

      {/* BOTTOM */}
      <span className="absolute bottom-0 right-0 h-[2px] w-0 bg-white transition-all delay-200 duration-100 group-hover:w-full" />

      {/* LEFT */}
      <span className="absolute bottom-0 left-0 h-0 w-[2px] bg-white transition-all delay-300 duration-100 group-hover:h-full" />
    </button>
  );
};