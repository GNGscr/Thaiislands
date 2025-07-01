"use client";
import React from "react";

export default function NavToggle({ isVisible, onClick }) {
  return (
    <div
      role="button"
      aria-label="Toggle"
      tabIndex="0"
      onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') onClick();
      }}
      onClick={onClick}
      className="text-white absolute top-[2.85rem] flex justify-center h-full w-full"
      style={{ rotate: "180deg" }}
    >
      <svg
        id="toggle-svg"
        className="cursor-pointer"
        style={{
          opacity: isVisible ? 0 : 1,
          stroke: "#aaa",
          transform: "scale(1.5)"
        }}
        xmlns="http://www.w3.org/2000/svg"
        width="14.002"
        height="6.5"
        viewBox="0 0 15.802 8.73"
      >
        <path
          fill="#fff"
          data-name="angle-small-down"
          d="M18.71,8.21a1,1,0,0,0-1.42,0l-4.58,4.58a1,1,0,0,1-1.42,0L6.71,8.21A1,1,0,0,0,5.29,9.62l4.59,4.59a3,3,0,0,0,4.24,0l4.59-4.59A1,1,0,0,0,18.71,8.21Z"
          transform="translate(19.001 16.087) rotate(180)"
        ></path>
      </svg>
    </div>
  );
}
