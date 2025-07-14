"use client";
import Head from "next/head";
import React, { useState, useEffect } from "react";
import { useGlobalSettings } from "../components/global/GlobalSettings";
import AboutUs from "./about";

export default function Home() {

  const { setCurrentMedia, currentMedia } = useGlobalSettings() || {};
  const [ setDimension ] = useState({width: 0, height: 0});

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
  }, []);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <AboutUs media={currentMedia} />
    </>
  );
}