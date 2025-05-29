"use client";
import React from "react";
import { motion } from "framer-motion";

export default function Cursor({ position, currentMedia }) {
  const heightStyle =
    currentMedia === 'mobile'
      ? { height: '2.25rem' }
      : currentMedia === 'tablet'
        ? { height: '2.65rem' }
        : { height: '3rem' };

  return (
    <motion.li
      animate={{ ...position }}
      className="absolute z-0 rounded-full bg-black"
      style={heightStyle}
    />
  );
}
