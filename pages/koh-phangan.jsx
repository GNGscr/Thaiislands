import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import SocialsSection from "./components/SocialsSection";
import StickyFooter from "./components/StickyFooter";
import SectionAnimation from "./components/SectionAnimation";
import kohPhanganData from "./public/data/kohPhanganData.json";
import { useGlobalSettings } from "./components/GlobalSettings";
import phanganMap from './public/images/phangan-map.png';

const he = "he";
const en = "en";
const HE_IL = 'he-IL';
const EN_US = 'en-US';

export default function KohPhangan() {
  const { language, setLanguage, currentMedia } = useGlobalSettings();
    let [menuIsActive, setMenuIsActive] = useState(false);
    let mainHtml;
    useEffect(() => {
      mainHtml = document.querySelector('html');
      if (mainHtml) mainHtml.setAttribute('lang', mainHtml.lang === HE_IL ? HE_IL : EN_US);

    }, [language].latest);

    const toggleLanguage = () => {
      if (mainHtml) mainHtml.setAttribute('lang', mainHtml.lang === HE_IL ? EN_US : HE_IL);

      if (language === en) {
        setLanguage(he);
      } else {
        setLanguage(en); 
      }
    }
    
    return (
      <>
        <Navbar
          data={kohPhanganData}
          lang={kohPhanganData['language-text'][language]}
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
        <div id="media">
          <SocialsSection data={kohPhanganData} lang={kohPhanganData['language-text'][language]} />
        </div>
        <StickyFooter data={kohPhanganData} lang={kohPhanganData['language-text'][language]} />
        <SectionAnimation menuIsActive={menuIsActive} title={kohPhanganData["island-name"][language]} />
      </>
    )
}