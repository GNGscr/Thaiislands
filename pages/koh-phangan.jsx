import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import SocialsSection from "./components/SocialsSection";
import StickyFooter from "./components/StickyFooter";
import SectionAnimation from "./components/SectionAnimation";
import kohPhanganData from "./public/data/kohPhanganData.json";
import { useGlobalSettings } from "./components/GlobalSettings";
import phanganMap from './public/images/phangan-map.png';
import HorizontalCarousel from "./components/HorizontalCarousel";
import VerticalAccordion from "./components/VerticalAccordion";

const he = "he";
const en = "en";
const HE_IL = 'he-IL';
const EN_US = 'en-US';

export default function KohPhangan() {
  const { language, setLanguage, currentMedia } = useGlobalSettings();
    let [menuIsActive, setMenuIsActive] = useState(false);
    let mainHtml;
    useEffect(() => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      mainHtml = document.querySelector('html');
      if (mainHtml) mainHtml.setAttribute('lang', mainHtml.lang === HE_IL ? HE_IL : EN_US);

    }, [language].latest);

    const toggleLanguage = () => {
      if (mainHtml) mainHtml.setAttribute('lang', mainHtml.lang === HE_IL ? EN_US : HE_IL);
      language === en ? setLanguage(he) : setLanguage(en);
    }

  //   "desktop": {
  //     "he": {
  //         "home": {
  //             "right": 4,
  //             "width": 84
  //         },
  //         "map-img": {
  //             "right": 102,
  //             "width": 76
  //         },
  //         "gallery": {
  //             "right": 184,
  //             "width": 115
  //         },
  //         "hotels": {
  //             "right": 300,
  //             "width": 108
  //         },
  //         "media": {
  //             "right": 416,
  //             "width": 89.8125
  //         }
  //     },
  //     "en": {
  //         "home": {
  //             "left": 4,
  //             "width": 88
  //         },
  //         "map-img": {
  //             "left": 102,
  //             "width": 76.5
  //         },
  //         "gallery": {
  //             "left": 190,
  //             "width": 114
  //         },
  //         "hotels": {
  //             "left": 316,
  //             "width": 104
  //         },
  //         "media": {
  //             "left": 432,
  //             "width": 90.5
  //         }
  //     }
  // },
    
    return (
      <>
        <Navbar
          data={kohPhanganData}
          toggleLanguage={toggleLanguage}
          activateMenuIsActive={(bool) => setMenuIsActive(bool)} 
          media={currentMedia}
          />
        <div id="home" />
        <Main
          activateMenuIsActive={(bool) => setMenuIsActive(bool)}
          data={kohPhanganData}
          lang={kohPhanganData['language-text'][language]}
          media={currentMedia}
          title={kohPhanganData["island-name"][language]}
          mainImg={kohPhanganData.heroImage}
          mapDrawing={phanganMap.src} />
        
        {/* Horizontal Carousel */}
        {currentMedia === "desktop"
        ? <HorizontalCarousel data={kohPhanganData} media={currentMedia} />
        : ""}
        <VerticalAccordion />

        <div id="media">
          <SocialsSection data={kohPhanganData} lang={kohPhanganData['language-text'][language]} />
        </div>

        <StickyFooter data={kohPhanganData} lang={kohPhanganData['language-text'][language]} />
        <SectionAnimation menuIsActive={menuIsActive} title={kohPhanganData["island-name"][language]} />
      </>
    )
}