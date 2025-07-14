"use client";
import React from "react";
import { motion } from "framer-motion";

export default function Cursor({ position, currentMedia }) {
  let currentHeight = '3rem';
  switch (currentMedia) {
    case 'mobile':
      currentHeight = '2.55rem';
      break;
    case 'tablet':
      currentHeight = '2.65rem';
      break;
    default:
      currentHeight = '3rem';
  }
  const heightStyle = currentHeight ? { height: currentHeight } : {};
    

  return (
    <motion.li
      animate={{ ...position }}
      className="absolute z-0 rounded-full bg-black"
      style={heightStyle}
    />
  );
}
