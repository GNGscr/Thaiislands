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
import LANG from "./public/data/en.json";

const he = "he";
const en = "en";

export default function KohPhangan() {
  const { language, setLanguage, currentMedia } = useGlobalSettings();
    let [menuIsActive, setMenuIsActive] = useState(false);
    let mainHtml;
    useEffect(() => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      mainHtml = document.querySelector('html');
      if (mainHtml) mainHtml.setAttribute('lang', mainHtml.lang);
    }, [language].latest);

    const toggleLanguage = () => {
      if (mainHtml) mainHtml.setAttribute('lang', mainHtml.lang === LANG.HE_IL ? LANG.EN_US : LANG.HE_IL);
        language === en ? setLanguage(he) : setLanguage(en);
    };
          console.log(currentMedia);
          
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
        {currentMedia === "desktop" ?? <HorizontalCarousel data={kohPhanganData} media={currentMedia} /> }
        <VerticalAccordion />

        <div id="media">
          <SocialsSection data={kohPhanganData} lang={kohPhanganData['language-text'][language]} />
        </div>

        <StickyFooter data={kohPhanganData} lang={kohPhanganData['language-text'][language]} />
        <SectionAnimation menuIsActive={menuIsActive} title={kohPhanganData["island-name"][language]} />
      </>
    )
}