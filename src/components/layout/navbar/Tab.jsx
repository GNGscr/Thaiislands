"use client";
import React, { useRef } from "react";

export default function Tab({ children, setPosition, lang, onClick, directionToOffset }) {
  const ref = useRef(null);
  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        if (!ref?.current) return;
        
        const { width, right, left } = ref.current.getBoundingClientRect();
        const grandparentRect =
          ref.current.parentElement.parentElement.getBoundingClientRect();
        const offset = lang === "he" 
          ? grandparentRect.right - right 
          : left - grandparentRect.left;
        
        setPosition({
          [directionToOffset[lang]]: offset,
          width,
          opacity: 1,
        });
      }}
      tabIndex={0}
      aria-label="Scroll to section"
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onClick(e);
      }}
      onClick={onClick} // Call onClick when tab is clicked
      className={`relative z-10 block cursor-pointer px-3 py-1.5 
        text-xs uppercase text-white mix-blend-difference md:px-5 
        md:py-3 md:text-base`}
    >
      {children}
    </li>
  );
}
