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
    setCurrentButton(button);
    const buttonPosition = navButtonsPositionMedia[currentMedia][language][button];
    if (buttonPosition) {
      setPosition({
        [directionToOffset[language]]: buttonPosition[directionToOffset[language]],
        width: buttonPosition.width,
        opacity: 1,
      });
    }
    // Scroll to the section after the animation completes
    setTimeout(() => {
        const target = document.getElementById(sectionId);
        if (target) {
          const targetPosition = target.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      }
        activateMenuIsActive(false);
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
          <div className="reveal-links-wrapper">
            <RevealLinks toggleLanguage={toggleLanguage} lang={language} />
          </div>
        </div>
        <NavToggle isVisible={isNavToggleSvgVisible} onClick={() => setIsNavbarVisible(true)} />
      </motion.div>
    </div>
  );
};

// {
//   "desktop": {
//       "he": {
//           "home": {
//               "right": 4,
//               "width": 84
//           },
//           "map-img": {
//               "right": 102,
//               "width": 76
//           },
//           "gallery": {
//               "right": 184,
//               "width": 115
//           },
//           "hotels": {
//               "right": 300,
//               "width": 108
//           },
//           "cafes": {
//               "right": 300,
//               "width": 108
//           },
//           "events": {
//               "right": 320,
//               "width": 108
//           },
//           "media": {
//               "right": 416,
//               "width": 89.8125
//           }
//       },
//       "en": {
//           "home": {
//               "left": 4,
//               "width": 88
//           },
//           "map-img": {
//               "left": 102,
//               "width": 76.5
//           },
//           "gallery": {
//               "left": 190,
//               "width": 114
//           },
//           "hotels": {
//               "left": 316,
//               "width": 104
//           },
//           "cafes": {
//               "left": 316,
//               "width": 104
//           },
//           "events": {
//               "left": 356,
//               "width": 104
//           },
//           "media": {
//               "left": 432,
//               "width": 90.5
//           }
//       }
//   },
//   "tablet": {
//       "he": {
//           "home": {
//               "right": 40,
//               "width": 80
//           },
//           "map-img": {
//               "right": 44,
//               "width": 80
//           },
//           "gallery": {
//               "right": 80,
//               "width": 87
//           },
//           "hotels": {
//               "right": 140,
//               "width": 92
//           },
//           "cafes": {
//               "right": 140,
//               "width": 92
//           },
//           "events": {
//               "right": 140,
//               "width": 92
//           },
//           "media": {
//               "right": 190,
//               "width": 83
//           }
//       },
//       "en": {
//           "home": {
//               "right": 40,
//               "width": 100
//           },
//           "map-img": {
//               "right": 44,
//               "width": 85
//           },
//           "gallery": {
//               "right": 80,
//               "width": 120
//           },
//           "hotels": {
//               "right": 140,
//               "width": 115
//           },
//           "cafes": {
//               "right": 140,
//               "width": 115
//           },
//           "events": {
//               "right": 140,
//               "width": 115
//           },
//           "media": {
//               "right": 190,
//               "width": 102
//           }
//       }
//   },
//   "mobile": {
//       "he": {
//           "home": {
//               "right": 4,
//               "width": 40
//           },
//           "map-img": {
//               "right": 44,
//               "width": 40
//           },
//           "gallery": {
//               "right": 80,
//               "width": 64
//           },
//           "hotels": {
//               "right": 140,
//               "width": 50
//           },
//           "media": {
//               "right": 190,
//               "width": 50
//           }
//       },
//       "en": {
//           "home": {
//               "left": 4,
//               "width": 44
//           },
//           "map-img": {
//               "left": 44,
//               "width": 40
//           },
//           "gallery": {
//               "left": 80,
//               "width": 62
//           },
//           "hotels": {
//               "left": 140,
//               "width": 56
//           },
//           "media": {
//               "left": 190,
//               "width": 50
//           }
//       }
//   }
// }