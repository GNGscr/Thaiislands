"use client";
import React from "react";
import { motion } from "framer-motion";

export default function Cursor({ position, currentMedia }) {
  const heightStyle = {
    height: currentMedia === 'mobile'
      ? '2.5rem'
      : currentMedia === 'tablet'
        ? '2.65rem'
        : '3rem'
  };
    

  return (
    <motion.li
      animate={{ ...position }}
      className="absolute z-0 rounded-full bg-black"
      style={heightStyle}
    />
  );
}
