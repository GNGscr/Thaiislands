"use client";
import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent, useAnimate } from "framer-motion";
import Image from "next/image";
import InstagramLogo from '../public/images/insta.png';
import LinktreeLogo from '../public/images/linktree-no-text-logo.svg';
import RevealLinks from "./RevealLinks";

const navButtonsPosition = {
  "he": {
    "home": { right: 4, width: 88 },
    "map-img": { right: 102, width: 74.5 },
    "gallery": { right: 183.5, width: 113.5 },
    "hotels": { right: 300, width: 108 },
    "media": { right: 416, width: 89.8125 },
  },
  "en": {
    "home": { left: 4, width: 88 },
    "map-img": { left: 104, width: 74.5 },
    "gallery": { left: 191, width: 113.5 },
    "hotels": { left: 316, width: 104 },
    "media": { left: 432, width: 90.5 },
  },
};
const navButtonsPosition2 = {
  "media": {
    "desktop": {
      "he": {
        "home": { right: 4, width: 88 },
        "map-img": { right: 102, width: 74.5 },
        "gallery": { right: 183.5, width: 113.5 },
        "hotels": { right: 300, width: 108 },
        "media": { right: 416, width: 89.8125 },
      },
      "en": {
        "home": { left: 4, width: 88 },
        "map-img": { left: 104, width: 74.5 },
        "gallery": { left: 191, width: 113.5 },
        "hotels": { left: 316, width: 104 },
        "media": { left: 432, width: 90.5 },
      },
    },
    "mobile": {
      "he": {
        "home": { right: 4, width: 88 },
        "map-img": { right: 102, width: 74.5 },
        "gallery": { right: 183.5, width: 113.5 },
        "hotels": { right: 300, width: 108 },
        "media": { right: 416, width: 89.8125 },
      },
      "en": {
        "home": { left: 4, width: 88 },
        "map-img": { left: 104, width: 74.5 },
        "gallery": { left: 191, width: 113.5 },
        "hotels": { left: 316, width: 104 },
        "media": { left: 432, width: 90.5 },
      },
    },
  }
};

const directionToOffset = {
  "en": "left",
  "he": "right"
};

export default function Navbar({ data, lang, toggleLanguage, activateMenuIsActive, media }) {
  const [position, setPosition] = useState({
    [directionToOffset[lang]]: navButtonsPosition[lang].home[directionToOffset[lang]],
    width: navButtonsPosition[lang].home.width,
    opacity: 1,
  });

  const [currentButton, setCurrentButton] = useState("home");
  const [isNavbarVisible, setIsNavbarVisible] = useState(false);
  const [isNavToggleSvgVisible, setIsNavToggleSvgVisible] = useState(false);
  const [scope, animate] = useAnimate();
  // const [previousButton, setPreviousButton] = useState("home");
  const { scrollY } = useScroll();


  // Set menu main div to be y position 0 visible and toggleSvg bool value on initial load
  useEffect(() => {
    let main = document.querySelector("#main");
    // animate(scope.current.children.main, { y: 0 });
    if (main) {
      animate("#main", { y: 0 });
      setIsNavToggleSvgVisible(true);
    }
    // Cleanup function to reset the menu main div after initial load for further animations
    return () => {
      if (main) {
        animate("#main", { y: "-155%" });
      }
      // animate(scope.current.children.main, {y: "-155%" });
      setIsNavToggleSvgVisible(false);
      setIsNavbarVisible(false);
    };
  }, [isNavbarVisible]);
  
  useEffect(() => {
    const intersections = document.querySelectorAll([...data["navbar"][lang].map((item) => item.intersectionId)]);
    const intersectionsIterator = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const intersectingEntry = entry.target.id.replace('#', '');
          setCurrentButton(intersectingEntry); // Save the intersecting button
          setPosition({
            [directionToOffset[lang]]: navButtonsPosition[lang][intersectingEntry][directionToOffset[lang]],
            width: navButtonsPosition[lang][intersectingEntry].width,
            opacity: 1,
          });
        }
      });
    };
    
    const observer = new IntersectionObserver(intersectionsIterator);
    [...intersections].forEach(intersection => observer.observe(intersection));

    return () => observer.disconnect(); // Cleanup observer
  }, [data, lang]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 0) {
      animate("#main", { y: "-155%" });
      setIsNavToggleSvgVisible(false);
      // animate("#toggle-svg", { opacity: 1, transition: { duration: .4 } });
    } else {
      animate("#main", { y: 0 });
      setIsNavToggleSvgVisible(true);
      // animate("#toggle-svg", { opacity: 0, transition: { duration: .4 } });
    }
  });

  const mouseEnter = () => setIsNavToggleSvgVisible(true);
  
  const handleMouseLeave = () => {
    setPosition(prev => ({
      ...prev,
      opacity: 0,
    }));
    // Revert to the last intersected button if the user doesn't click
    const lastPosition = navButtonsPosition[lang][currentButton];
    if (lastPosition) {
      setPosition({
        [directionToOffset[lang]]: lastPosition[directionToOffset[lang]],
        width: lastPosition.width,
        opacity: 1,
      });
    }
  };

  const handleButtonClick = (e, button, sectionId) => {
    e.preventDefault(); // Prevent default anchor behavior
    activateMenuIsActive(true);
    
    setCurrentButton(button); // Set the clicked button as current
    const buttonPosition = navButtonsPosition[lang][button];
    if (buttonPosition) {
      setPosition({
        [directionToOffset[lang]]: buttonPosition[directionToOffset[lang]],
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
        activateMenuIsActive(false); // Reset the menu state after scrolling
    }, 500); // Match this duration with the sectionAnimation duration
  };

  const variants = {
    initial: { y: "-155%" },
    animate: { y: 1, transition: { duration: .4 } }
  };

  return (
    <div ref={scope} className="fixed w-full flex align-center top-[0rem]" style={{ zIndex: '9' }}>
      <motion.div id="main" variants={variants} className="relative w-full flex align-center top-[0.75rem]"
        initial="initial"
        whileHover="animate"
        onMouseEnter={mouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="inner-navbar w-screen flex align-space-between justify-center text-white">
          <div className="social flex gap-3 ml-7 mt-1">
            <a href="https://www.instagram.com/idobagdi/"><Image className="cursor-pointer" src={InstagramLogo} style={{ width: '40px' }} alt="instagram logo" /></a>
            <a href="https://linktr.ee/bagditravel"><Image id="linktree" className="cursor-pointer" src={LinktreeLogo} style={{ width: '22px', marginTop: '7.5px', transform: "scale(0.85)" }} alt="linktree logo" /></a>
          </div>
          <SlideTabs
            setPosition={setPosition}
            position={position}
            navbar={data["navbar"][lang]}
            lang={lang}
            onButtonClick={handleButtonClick}
          />
          <RevealLinks toggleLanguage={toggleLanguage} lang={lang} />
        </div>
        <div onClick={() => setIsNavbarVisible(true)} className="text-white absolute top-[2.85rem] flex justify-center h-[100%] w-full" style={{ rotate: "180deg" }}>
          <svg id="toggle-svg" className="cursor-pointer" style={{ opacity: isNavToggleSvgVisible ? 0 : 1, stroke: '#aaa', transform: "scale(1.5)" }} xmlns="http://www.w3.org/2000/svg" width="14.002" height="6.5" viewBox="0 0 15.802 8.73"><path fill="#fff" data-name="angle-small-down" d="M18.71,8.21a1,1,0,0,0-1.42,0l-4.58,4.58a1,1,0,0,1-1.42,0L6.71,8.21A1,1,0,0,0,5.29,9.62l4.59,4.59a3,3,0,0,0,4.24,0l4.59-4.59A1,1,0,0,0,18.71,8.21Z" transform="translate(19.001 16.087) rotate(180)"></path></svg>
        </div>
      </motion.div>
    </div>
  );
};

const SlideTabs = ({ setPosition, position, navbar, lang, onButtonClick }) => {
  return (
    <ul
      onMouseLeave={() => {
        setPosition((pv) => ({
          ...pv,
          opacity: 0,
        }));
      }}
      className="navbar-ul mx-auto rounded-full gap-3 p-1"
    >
      {
        navbar.map(({ href, label }) => {
          return (
            <a 
              href={href} 
                onClick={(e) => onButtonClick(e, label, href.replace('#', ''))} // Set current button on click
              key={label}>
              <Tab
                lang={lang}
                setPosition={setPosition}
              >
                {label}
              </Tab>
            </a>
          );
        })
      }
      <Cursor position={position} />
    </ul>
  );
};

const Tab = ({ children, setPosition, lang, onClick }) => {
  const ref = useRef(null);
  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        if (!ref?.current) return;
        
        const { width, right } = ref.current.getBoundingClientRect();
        const grandparentRect = ref.current.parentElement.parentElement.getBoundingClientRect();
        const offset = lang === "he" 
          ? grandparentRect.right - ref.current.getBoundingClientRect().right 
          : ref.current.getBoundingClientRect().left - grandparentRect.left;
        
        setPosition({
          [directionToOffset[lang]]: offset,
          width,
          opacity: 1,
        });
      }}
      onClick={onClick} // Call onClick when tab is clicked
      className={`relative z-10 block cursor-pointer px-3 py-1.5 
        text-xs uppercase text-white mix-blend-difference md:px-5 
        md:py-3 md:text-base`}
    >
      {children}
    </li>
  );
};

const Cursor = ({ position }) => {
  return (
    <motion.li
      animate={{
        ...position,
      }}
      className="absolute z-0 h-7 rounded-full bg-black md:h-12"
    />
  );
};