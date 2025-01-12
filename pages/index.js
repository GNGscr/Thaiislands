"use client";
import React, { useRef, useState, useEffect } from "react";
import { useGlobalSettings } from "./components/GlobalSettings";
import AboutUs from "./about";

export default function Home() {
  const { language, setLanguage, setCurrentMedia, currentMedia } = useGlobalSettings();
  const mainRef = useRef(null);
  // const SPREADSHEET_ID = '10dyZecjgALnOMPj_bKV5s5XNVR0Si4USZI2dn0XYGdU';
  // const API_KEY = 'AIzaSyDXh5hbQG0D8kTEWlmvbbwqDzjDd-48lms';
  // const RANGE = 'Sheet1!A1:D25'; // Adjust the range as needed

  const [ dimension, setDimension ] = useState({width: 0, height: 0});
  const updateDimension = () => {
      const { innerWidth, innerHeight } = window;
      setDimension({width: innerWidth, height: innerHeight });
  };
  
  useEffect(() => {
    updateDimension();
    window.addEventListener('resize', updateDimension);
    
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
    
    return () => (window.removeEventListener('resize', updateDimension));
    // fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language, dimension]);

  // const fetchData = async () => {
  //   try {
  //     const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}?key=${API_KEY}`);
  //     if (!response.ok) {
  //       throw new Error('Network response was not ok');
  //     }

  //     const result = await response.json();
  //     // let resData = {}
  //     // result.values.forEach(value => {
  //     //   // console.log('value: ', value);
  //     //   // resData.assign({})
  //     // });
      
  //     setData(result.values);
  //   } catch (err) {
  //     setError(err.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <div ref={mainRef}>
      <AboutUs media={currentMedia} />
    </div>
  );
}