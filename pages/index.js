"use client";
import React, { useRef, useState, useEffect } from "react";
import KohPhangan from "./KohPhangan";
// import vid from '../public/images/khoPhanganView.mp4';
// import ReactPlayer from 'react-player';
import { getGlobalLanguage, setGlobalLanguage, setMedia } from "./config";

const HE_IL = 'he-IL';
const EN_US = 'en-US';

export default function Home() {
  const mainRef = useRef(null);
  
  // const SPREADSHEET_ID = '10dyZecjgALnOMPj_bKV5s5XNVR0Si4USZI2dn0XYGdU';
  // const API_KEY = 'AIzaSyDXh5hbQG0D8kTEWlmvbbwqDzjDd-48lms';
  // const RANGE = 'Sheet1!A1:D25'; // Adjust the range as needed

  useEffect(() => {
    const { width } = mainRef.current.getBoundingClientRect();
    let userLang = document.querySelector('html').lang === HE_IL ? HE_IL : EN_US;
  
    setGlobalLanguage(userLang === HE_IL ? "he" : "en");
    setMedia(width < 680 ? "mobile" : "desktop");
    
    // fetch data
    // fetchData();
  }, [getGlobalLanguage()]);

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
      <KohPhangan />
    </div>
  );
}










// {/* <video width="600" controls autoPlay loop muted={true}>
//   <source src={vid} type="video/mp4" />
// </video> */}
//       {/* <ReactPlayer
//   url="../public/images/koh-phangan.mp4" // Replace with your video URL
//   width="600px"
//   height="400px"
//   controls
// /> */}