"use client";
import React from "react";
import Tab from "./Tab";
import Cursor from "./Cursor";

export default function SlideTabs({
  setPosition,
  position,
  navbar,
  lang,
  onButtonClick,
  pathname,
  currentMedia,
  directionToOffset
}) {
  return (
    <ul
      onMouseLeave={() => {
        setPosition((pv) => ({
          ...pv,
          opacity: 0,
        }));
      }}
      className={`navbar-ul mx-auto rounded-full gap-3 p-1
        ${pathname === '/about' || pathname === '/' ? 'invisible' : 'visible'}`}
    >
      { navbar ?
        navbar.map(({ href, label }) => {
          return (
            <a 
              href={href}  // Set current button on click
              onClick={(e) => onButtonClick(e, label, href.replace('#', ''))}
              key={label}>
              <Tab
                lang={lang}
                setPosition={setPosition}
                directionToOffset={directionToOffset}
              >
                {label}
              </Tab>
            </a>
          );
        }) : ''
      }
      <Cursor position={position} currentMedia={currentMedia} />
    </ul>
  );
}
