"use client";
import React, { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent, useAnimate } from "framer-motion";
import RevealLinks from "./RevealLinks";
import { usePathname } from 'next/navigation';
import { useGlobalSettings } from './GlobalSettings';
import navButtonsPositionMedia from "../public/data/navButtonsPositionMedia.json";
import SlideTabs from "./navbar/SlideTabs";
import useNavbarMedia from "../hooks/useNavbarMedia";
import useNavbarIntersection from "../hooks/useNavbarIntersection";
import NavSocials from "./navbar/NavSocials";
import NavToggle from "./navbar/NavToggle";


export default function Navbar({ data, toggleLanguage, activateMenuIsActive }) {
  const pathname = usePathname();
  const { language, currentMedia, setCurrentMedia } = useGlobalSettings();
  const { scrollY } = useScroll();
  const [scope, animate] = useAnimate();
  const directionToOffset = { "en": "left", "he": "right" };

  const [position, setPosition] = useState({
    [directionToOffset[language]]: 
      navButtonsPositionMedia[currentMedia][language].home[directionToOffset[language]],
    width: navButtonsPositionMedia[currentMedia][language].home.width,
    opacity: 1,
  });
  const [currentButton, setCurrentButton] = useState();
  const [isNavbarVisible, setIsNavbarVisible] = useState(false);
  const [isNavToggleSvgVisible, setIsNavToggleSvgVisible] = useState(false);

  // Sets media (mobile/tablet/desktop) 
  useNavbarMedia(setCurrentMedia);

  useEffect(() => {
    let main = document.querySelector("#main");
    if (main) {
      animate("#main", { y: 0 });
      setIsNavToggleSvgVisible(true);
    }
    return () => {
      setIsNavToggleSvgVisible(false);
      setIsNavbarVisible(false);
    };
  }, [isNavbarVisible, animate]);

  // Handles updating nav button position via IntersectionObserver
  useNavbarIntersection({ data, language, currentMedia, setCurrentButton, setPosition, navButtonsPositionMedia, directionToOffset });
  
  // Scroll: hide/show navbar
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 0) {
      animate("#main", { y: "-155%" });
      setIsNavToggleSvgVisible(false);
    } else {
      animate("#main", { y: 0 });
      setIsNavToggleSvgVisible(true);
    }    
  });
  
  const handleMouseLeave = () => {
    setPosition(prev => ({ ...prev, opacity: 0 }));
    // Revert to the last intersected button if the user doesn't click
    const lastPosition = navButtonsPositionMedia[currentMedia][language][currentButton];
    if (lastPosition) {
      setPosition({
      [directionToOffset[language]]: lastPosition[directionToOffset[language]],
        width: lastPosition.width,
        opacity: 1,
      });
    }
  };

  const handleButtonClick = (e, button, sectionId) => {
    e.preventDefault(); // Prevent default anchor behavior
    activateMenuIsActive(true);
    setCurrentButton(button); // Set the clicked button as current
    const buttonPosition = navButtonsPositionMedia[currentMedia][language][button];
    if (buttonPosition) {
      setPosition({
        [directionToOffset[language]]: buttonPosition[directionToOffset[language]],
        width: buttonPosition.width,
        opacity: 1,
      });
    }
    setTimeout(() => { // Scroll to the section after the animation completes
        const target = document.getElementById(sectionId);
        if (target) {
          const targetPosition = target.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      }
        activateMenuIsActive(false); // Reset the menu state after scrolling
    }, 500); // Match this duration with the sectionAnimation duration
  };

  if (!data || !currentMedia) return;
  return (
    <div ref={scope} className="fixed w-full flex align-center top-[0rem] left-0" style={{ zIndex: 4 }}>
      <motion.div id="main" className="relative w-full flex align-center top-[0.75rem]"
        initial={{ y: "-155%" }}
        whileHover={{ y: 1, transition: { duration: .4 } }}
        onMouseEnter={() => setIsNavToggleSvgVisible(true)}
        onMouseLeave={handleMouseLeave}>
        <div className="inner-navbar w-screen flex align-space-between justify-center text-white">
          <NavSocials pathname={pathname} />
          <SlideTabs
            setPosition={setPosition}
            position={position}
            navbar={data["navbar"][currentMedia][language]}
            lang={language}
            onButtonClick={handleButtonClick}
            pathname={pathname}
            currentMedia={currentMedia}
            directionToOffset={directionToOffset}
          />
          <div style={{ visibility: "hidden" }}>
            <RevealLinks toggleLanguage={toggleLanguage} lang={language} />
          </div>
        </div>
        <NavToggle isVisible={isNavToggleSvgVisible} onClick={() => setIsNavbarVisible(true)} />
      </motion.div>
    </div>
  );
};
