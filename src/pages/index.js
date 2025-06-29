"use client";
import Head from "next/head";
import React, { useRef, useState, useEffect } from "react";
import { useGlobalSettings } from "../components/GlobalSettings";
import AboutUs from "./about";

export default function Home() {
  console.log("globalSettings client", useGlobalSettings());
  const { language, setLanguage, setCurrentMedia, currentMedia } = useGlobalSettings();
  
  const mainRef = useRef(null);

  const [ dimension, setDimension ] = useState({width: 0, height: 0});
  const updateDimension = () => {
      const { innerWidth, innerHeight } = window;
      setDimension({width: innerWidth, height: innerHeight });
  };

  useEffect(() => {
    const { innerWidth } = window;
  
    if (innerWidth < 680 && currentMedia !== "mobile") {
      setCurrentMedia("mobile");
      localStorage.setItem("media", "mobile");
    } else if (innerWidth < 1080 && currentMedia !== "tablet") {
      setCurrentMedia("tablet");
      localStorage.setItem("media", "tablet");
    } else if (innerWidth >= 1080 && currentMedia !== "desktop") {
      setCurrentMedia("desktop");
      localStorage.setItem("media", "desktop");
    }
  }, [currentMedia, setCurrentMedia]);

  useEffect(() => {
    const updateDimension = () => {
      setDimension({ width: window.innerWidth, height: window.innerHeight });
    };
  
    updateDimension();
    window.addEventListener('resize', updateDimension);
    return () => window.removeEventListener('resize', updateDimension);
  }, []); // ← רץ פעם אחת בלבד
  
  
  // useEffect(() => {
  //   updateDimension();
  //   window.addEventListener('resize', updateDimension);
    
  //   if (window.innerWidth < 680) {
  //     setCurrentMedia("mobile");
  //     localStorage.setItem("media", "mobile");
  //   } else if (window.innerWidth < 1080) {
  //     setCurrentMedia("tablet");
  //     localStorage.setItem("media", "tablet");
  //   } else {
  //     setCurrentMedia("desktop");
  //     localStorage.setItem("media", "desktop");
  //   }
    
  //   return () => (window.removeEventListener('resize', updateDimension));
  //   // fetchData();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [language, dimension]);

  return (
    <div ref={mainRef}>
            <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <AboutUs media={currentMedia} />
    </div>
  );
}