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
  const { language, setLanguage, currentMedia, setCurrentMedia } = useGlobalSettings();
    let [menuIsActive, setMenuIsActive] = useState(false);
    const [ stateLanguage, setStateLanguage ] = useState("en");
    let globalLanguage = language;
    let mainHtml;
    useEffect(() => {
      mainHtml = document.querySelector('html');
      if (mainHtml) mainHtml.setAttribute('lang', mainHtml.lang === HE_IL ? HE_IL : EN_US);

    }, [stateLanguage]);

    const toggleLanguage = () => {
      if (mainHtml) mainHtml.setAttribute('lang', mainHtml.lang === HE_IL ? EN_US : HE_IL);

      if (globalLanguage === en) {
        setStateLanguage(he);
        setLanguage(he);
      } else { 
        setStateLanguage(en);
        setLanguage(en); 
      }
    }
    
    return (
      <>
        <Navbar
          data={kohPhanganData}
          lang={kohPhanganData['language-text'][globalLanguage]}
          toggleLanguage={toggleLanguage}
          activateMenuIsActive={(bool) => setMenuIsActive(bool)} 
          media={currentMedia}
          />
        <div id="home" />
        <Main
          activateMenuIsActive={(bool) => setMenuIsActive(bool)}
          data={kohPhanganData}
          lang={kohPhanganData['language-text'][globalLanguage]}
          media={currentMedia}
          title={kohPhanganData["island-name"][globalLanguage]}
          mainImg={kohPhanganData.heroImage}
          mapDrawing={phanganMap.src} />
        <div id="media">
          <SocialsSection data={kohPhanganData} lang={kohPhanganData['language-text'][globalLanguage]} />
        </div>
        <StickyFooter data={kohPhanganData} lang={kohPhanganData['language-text'][globalLanguage]} />
        <SectionAnimation menuIsActive={menuIsActive} title={kohPhanganData["island-name"][globalLanguage]} />
      </>
    )
}