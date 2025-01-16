"use client";
import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent, useAnimate, useTransform } from "framer-motion";
import RevealLinks from "./RevealLinks";
import { usePathname } from 'next/navigation';
import { useGlobalSettings } from './GlobalSettings';

export default function Navbar({
  data,
  toggleLanguage,
  activateMenuIsActive
}) {

  const navButtonsPositionMedia = {
    "desktop": {
      "he": {
        "home": { right: 4, width: 84 },
        "map-img": { right: 102, width: 76 },
        // "gallery": { right: 184, width: 115 },
        "hotels": { right: 300, width: 108 },
        "cafes": { right: 300, width: 108 },
        "events": { right: 320, width: 108 },
        "media": { right: 416, width: 89.8125 },
      },
      "en": {
        "home": { left: 4, width: 88 },
        "map-img": { left: 102, width: 76.5 },
        // "gallery": { left: 190, width: 114 },
        "hotels": { left: 316, width: 104 },
        "cafes": { left: 316, width: 104 },
        "events": { left: 356, width: 104 },
        "media": { left: 432, width: 90.5 },
      },
    },
    "tablet": {
      "he": {
        "home": { right: 40, width: 80 },
        "map-img": { right: 44, width: 80 },
        "gallery": { right: 80, width: 87 },
        "hotels": { right: 140, width: 92 },
        "cafes": { right: 140, width: 92 },
        "events": { right: 140, width: 92 },
        "media": { right: 190, width: 83 },
      },
      "en": {
        "home": { right: 40, width: 100 },
        "map-img": { right: 44, width: 85 },
        "gallery": { right: 80, width: 120 },
        "hotels": { right: 140, width: 115 },
        "cafes": { right: 140, width: 115 },
        "events": { right: 140, width: 115 },
        "media": { right: 190, width: 102 },
      },
    },
    "mobile": {
      "he": {
        "home": { right: 4, width: 40 },
        "map-img": { right: 44, width: 40 },
        "gallery": { right: 80, width: 64 },
        "hotels": { right: 140, width: 50 },
        // "cafes": { right: 140, width: 50 },
        // "events": { right: 140, width: 50 },
        "media": { right: 190, width: 50 },
      },
      "en": {
        "home": { left: 4, width: 44 },
        "map-img": { left: 44, width: 40 },
        "gallery": { left: 80, width: 62 },
        "hotels": { left: 140, width: 56 },
        // "cafes": { left: 140, width: 56 },
        // "events": { left: 140, width: 56 },
        "media": { left: 190, width: 50 },
      },
    }
  };
  
  const directionToOffset = {
    "en": "left",
    "he": "right"
  };
  
  const { language, currentMedia, setCurrentMedia } = useGlobalSettings();
  const pathname = usePathname();

  const [position, setPosition] = useState({
    [directionToOffset[language]]: 
      navButtonsPositionMedia[currentMedia][language].home[directionToOffset[language]],
    width: navButtonsPositionMedia[currentMedia][language].home.width,
    opacity: 1,
  });

  const [currentButton, setCurrentButton] = useState();
  const [isNavbarVisible, setIsNavbarVisible] = useState(false);
  const [isNavToggleSvgVisible, setIsNavToggleSvgVisible] = useState(false);
  const [scope, animate] = useAnimate();
  const { scrollY } = useScroll();
  
  useEffect(() => {
    const resizeEvent = window.addEventListener('resize', () => {
      if (window.innerWidth < 680) {
        setCurrentMedia("mobile");
        localStorage.setItem("media", "mobile");
      } else if (window.innerWidth < 1080) {
        setCurrentMedia("tablet");
        localStorage.setItem("media", "tablet");
      } else {
        setCurrentMedia("desktop");
        localStorage.setItem("media", "desktop");
      }
    });
    return () => (window.removeEventListener('resize', resizeEvent));
  });

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
  
  useEffect(() => {
    const intersections =
      document.querySelectorAll([...data["navbar"][currentMedia][language].map((item) => item.intersectionId)]);
    const intersectionsIterator = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const intersectingEntry = entry.target.id.replace('#', '');
          setCurrentButton(intersectingEntry); // Saves the intersecting button
          setPosition({
            [directionToOffset[language]]:
              navButtonsPositionMedia[currentMedia][language][intersectingEntry][directionToOffset[language]],
            width: navButtonsPositionMedia[currentMedia][language][intersectingEntry].width,
            opacity: 1,
          });
        }
      });
    };
    
    const observer = new IntersectionObserver(intersectionsIterator);
    [...intersections].forEach(intersection => observer.observe(intersection));

    return () => observer.disconnect(); // Cleanup observer
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, language, currentMedia]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 0) {
      animate("#main", { y: "-155%" });
      setIsNavToggleSvgVisible(false);
    } else {
      animate("#main", { y: 0 });
      setIsNavToggleSvgVisible(true);
    }    
  });
  
  const mouseEnter = () => setIsNavToggleSvgVisible(true);
  
  const handleMouseLeave = () => {
    setPosition(prev => ({
      ...prev,
      opacity: 0,
    }));

    // Revert to the last intersected button if the user doesn't click
    const lastPosition =
      navButtonsPositionMedia[currentMedia][language][currentButton];
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

  const container = useRef();
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end start']
  });

  // Set the color to switch by toggle (ease fnc) between sections
  const color = useTransform(
    scrollYProgress,
    [0, 0.0825, 0.245, 0.2450000000001, 1],
    ["#fff", "#000", "#fff", "#000", "#000"],
    { ease: (t) => Math.round(t) }
  );
  useEffect(() => {
  }, [color]);

  if (!data || !currentMedia) return;
  return (
    <div ref={scope} className="fixed w-full flex align-center top-[0rem] left-0" style={{ zIndex: 4 }}>
      <motion.div id="main" variants={variants} className="relative w-full flex align-center top-[0.75rem]"
        initial="initial"
        whileHover="animate"
        onMouseEnter={mouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="inner-navbar w-screen flex align-space-between justify-center text-white">
          <div className={`social flex gap-4 ml-7 mt-1 ${pathname === '/about' || pathname === '/' ? 'invisible' : 'visible'}`}>
            <motion.a href="https://www.instagram.com/daniel__ehrlich/"
            style={{ color }}
             target="_blank" rel="noopener noreferrer">
              <svg data-name="instagram" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="cursor-pointer"
              style={{ width: '30px', marginTop: '0.35rem' }}>

                <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"></path>
              </svg>
            </motion.a>
            <motion.a href="https://facebook.com"
            style={{ color }} 
            target="_blank" rel="noopener noreferrer">
              <svg data-name="facebook" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 31.5 58" fill="currentColor" className="cursor-pointer" style={{ width: '22px', marginTop: '0px', transform: "scale(0.65)" }}>
                <path d="m20.72,22.16c2.77,0,5.55.02,8.32.03.4,0,.8.02,1.2.03.07.06.14.13.21.19-.28,1.58-.56,3.16-.83,4.75-.32,1.87-.64,3.74-.99,5.76-1.37.13-2.76-.07-4.14-.04-1.36.03-2.72,0-4.2,0-.13,8.38.12,16.72.11,25.11h-11.17v-24.91H0v-10.81h9.16c.04-.39.11-.71.11-1.02-.01-1.58-.05-3.17-.06-4.75-.01-1.62-.16-3.26.02-4.85.19-1.69.64-3.35,1.52-4.86,1.36-2.33,3.28-4.06,5.58-5.4,1.39-.81,2.94-1.25,4.52-1.3C24.28-.03,27.71.02,31.15,0c.07,0,.13.05.35.14.04,3.3-.29,6.66-.18,10.11-1.13,0-2.15.03-3.17,0-1.57-.07-3.15-.06-4.65.46-1.42.49-2.46,1.4-2.89,2.95-.3,1.08-.36,2.16-.34,3.25.04,1.69.13,3.38.2,5.07.08.06.16.13.24.19Z"></path>
              </svg>
            </motion.a>
          </div>
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
          <RevealLinks toggleLanguage={toggleLanguage} lang={language} />
        </div>
        <div onClick={() => setIsNavbarVisible(true)}
          className={`text-white absolute top-[2.85rem]
            flex justify-center h-[100%] w-full`}
          style={{ rotate: "180deg" }}>
          <svg
            id="toggle-svg"
            className="cursor-pointer"
            style={{ opacity: isNavToggleSvgVisible ? 0 : 1, stroke: '#aaa', transform: "scale(1.5)" }}
            xmlns="http://www.w3.org/2000/svg" width="14.002" height="6.5" viewBox="0 0 15.802 8.73">
              <path fill="#fff" data-name="angle-small-down" d="M18.71,8.21a1,1,0,0,0-1.42,0l-4.58,4.58a1,1,0,0,1-1.42,0L6.71,8.21A1,1,0,0,0,5.29,9.62l4.59,4.59a3,3,0,0,0,4.24,0l4.59-4.59A1,1,0,0,0,18.71,8.21Z" transform="translate(19.001 16.087) rotate(180)"></path>
          </svg>
        </div>
      </motion.div>
    </div>
  );
};

const SlideTabs = ({ setPosition, position, navbar, lang, onButtonClick, pathname, currentMedia, directionToOffset }) => {  
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
};

const Tab = ({ children, setPosition, lang, onClick, directionToOffset }) => {
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
      onClick={onClick} // Call onClick when tab is clicked
      className={`relative z-10 block cursor-pointer px-3 py-1.5 
        text-xs uppercase text-white mix-blend-difference md:px-5 
        md:py-3 md:text-base`}
    >
      {children}
    </li>
  );
};

const Cursor = ({ position, currentMedia }) => {
  return (
    <motion.li
      animate={{ ...position }}
      className="absolute z-0 h-7 rounded-full bg-black md:h-12"
      style={
        // currentMedia === 'mobile' ? { height: '2.35rem' }
        currentMedia === 'mobile' ? { height: '2.25rem' }
          : currentMedia === 'tablet' ? { height: '2.65rem' }
            : { height: '3rem' }
      }
    />
  );
};