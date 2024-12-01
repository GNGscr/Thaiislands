import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import SocialsSection from "./components/SocialsSection";
import StickyFooter from "./components/StickyFooter";
import SectionAnimation from "./components/SectionAnimation";
import kohSamuiData from "./public/data/kohSamuiData.json";
import { useGlobalSettings } from './components/GlobalSettings';
import samuiMap from './public/images/KohSamui.jpeg';

const he = "he";
const en = "en";
const HE_IL = 'he-IL';
const EN_US = 'en-US';

export default function KohSamui() {
  const { language, setLanguage, currentMedia } = useGlobalSettings();
    let [menuIsActive, setMenuIsActive] = useState(false);
    const [ stateLanguage, setStateLanguage ] = useState(en);
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
          data={kohSamuiData}
          lang={kohSamuiData['language-text'][stateLanguage]}
          toggleLanguage={toggleLanguage}
          activateMenuIsActive={(bool) => setMenuIsActive(bool)} 
          media={currentMedia}
          />
        <div id="home" />
        <Main
          activateMenuIsActive={(bool) => setMenuIsActive(bool)}
          data={kohSamuiData}
          lang={kohSamuiData['language-text'][globalLanguage]}
          media={currentMedia}
          title={kohSamuiData["island-name"][globalLanguage]}
          mainImg={kohSamuiData.heroImage}
          mapDrawing={samuiMap} />
        <div id="media">
          <SocialsSection data={kohSamuiData} lang={kohSamuiData['language-text'][globalLanguage]} />
        </div>
        <StickyFooter data={kohSamuiData} lang={kohSamuiData['language-text'][globalLanguage]} />
        <SectionAnimation menuIsActive={menuIsActive} title={kohSamuiData["island-name"][globalLanguage]} />
      </>
    )
}