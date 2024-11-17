import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import SocialsSection from "./components/SocialsSection";
import StickyFooter from "./components/StickyFooter";
import SectionAnimation from "./components/SectionAnimation";
import kohPhanganData from "./public/data/kohPhanganData.json";
import { getGlobalLanguage, setGlobalLanguage, getMedia } from "./config";
import phanganMap from './public/images/phangan-map.png';
import mainImg from '../pages/public/images/summer-luxury-beach-resort-and-spa.webp';

const he = "he";
const en = "en";
const HE_IL = 'he-IL';
const EN_US = 'en-US';

export default function KohPhangan() {
    let [menuIsActive, setMenuIsActive] = useState(false);
    const [ language, setLanguage ] = useState("en");
    let globalLanguage = getGlobalLanguage();
    let mainHtml;
    useEffect(() => {
      mainHtml = document.querySelector('html');
      mainHtml.lang = mainHtml.lang === HE_IL ? HE_IL : EN_US;
    }, [language]);

    const toggleLanguage = () => {
      if (mainHtml) mainHtml.lang = globalLanguage === he ? EN_US : HE_IL;

      if (globalLanguage === en) {
        setLanguage(he);
        setGlobalLanguage(he);
      } else { 
        setLanguage(en);
        setGlobalLanguage(en); 
      }
    }
    
    return (
      <>
        <Navbar
          data={kohPhanganData}
          lang={kohPhanganData['language-text'][globalLanguage]}
          toggleLanguage={toggleLanguage}
          activateMenuIsActive={(bool) => setMenuIsActive(bool)} 
          media={getMedia()}
          />
        <div id="home" />
        <Main
          activateMenuIsActive={(bool) => setMenuIsActive(bool)}
          data={kohPhanganData}
          lang={kohPhanganData['language-text'][globalLanguage]}
          media={getMedia()}
          title={kohPhanganData["island-name"][globalLanguage]}
          mainImg={mainImg}
          mapDrawing={phanganMap.src} />
        <div id="media">
          <SocialsSection data={kohPhanganData} lang={kohPhanganData['language-text'][globalLanguage]} />
        </div>
        <StickyFooter data={kohPhanganData} lang={kohPhanganData['language-text'][globalLanguage]} />
        <SectionAnimation menuIsActive={menuIsActive} title={kohPhanganData["island-name"][globalLanguage]} />
      </>
    )
}