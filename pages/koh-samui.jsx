import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import SocialsSection from "./components/SocialsSection";
import StickyFooter from "./components/StickyFooter";
import SectionAnimation from "./components/SectionAnimation";
import kohSamuiData from "./public/data/kohSamuiData.json";
import { useGlobalSettings } from './components/GlobalSettings';
import samuiMap from './public/images/Beach-Map-Koh-Samui.jpg';

const he = "he";
const en = "en";
const HE_IL = 'he-IL';
const EN_US = 'en-US';

export default function KohSamui() {
  const { language, setLanguage, currentMedia } = useGlobalSettings();
    let [menuIsActive, setMenuIsActive] = useState(false);
    let mainHtml;
    useEffect(() => {
      mainHtml = document.querySelector('html');
      if (mainHtml) mainHtml.setAttribute('lang', mainHtml.lang === HE_IL ? HE_IL : EN_US);

    }, [language].latest);

    const toggleLanguage = () => {
      if (mainHtml) mainHtml.setAttribute('lang', mainHtml.lang === HE_IL ? EN_US : HE_IL);
      language === en ? setLanguage(he) : setLanguage(en);
    }
    
    return (
      <>
        <Navbar
          data={kohSamuiData}
          lang={kohSamuiData['language-text'][language]}
          toggleLanguage={toggleLanguage}
          activateMenuIsActive={(bool) => setMenuIsActive(bool)} 
          media={currentMedia}
          />
        <div id="home" />
        <Main
          activateMenuIsActive={(bool) => setMenuIsActive(bool)}
          data={kohSamuiData}
          lang={kohSamuiData['language-text'][language]}
          media={currentMedia}
          title={kohSamuiData["island-name"][language]}
          mainImg={kohSamuiData.heroImage}
          mapDrawing={samuiMap.src} />
        <div id="media">
          <SocialsSection data={kohSamuiData} lang={kohSamuiData['language-text'][language]} />
        </div>
        <StickyFooter data={kohSamuiData} lang={kohSamuiData['language-text'][language]} />
        <SectionAnimation menuIsActive={menuIsActive} title={kohSamuiData["island-name"][language]} />
      </>
    )
}