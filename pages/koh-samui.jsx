import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import SocialsSection from "./components/SocialsSection";
import StickyFooter from "./components/StickyFooter";
import SectionAnimation from "./components/SectionAnimation";
import kohSamuiData from "./public/data/kohSamuiData.json";
import { getGlobalLanguage, setGlobalLanguage, getMedia } from "./config";
import samuiMap from './public/images/KohSamuiNew.jpg';

const he = "he";
const en = "en";
const HE_IL = 'he-IL';
const EN_US = 'en-US';

console.log(' FF: ', kohSamuiData);

export default function KohSamui() {
    let [menuIsActive, setMenuIsActive] = useState(false);
    const [ language, setLanguage ] = useState(en);
    let globalLanguage = getGlobalLanguage();
    let mainHtml;
    useEffect(() => {
      mainHtml = document.querySelector('html');
      mainHtml.lang = mainHtml.lang === HE_IL ? HE_IL : EN_US;
    }, [language]);
    // debugger;

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
          data={kohSamuiData}
          lang={kohSamuiData['language-text'][globalLanguage]}
          toggleLanguage={toggleLanguage}
          activateMenuIsActive={(bool) => setMenuIsActive(bool)} 
          media={getMedia()}
          />
        <div id="home" />
        <Main
          activateMenuIsActive={(bool) => setMenuIsActive(bool)}
          data={kohSamuiData}
          lang={kohSamuiData['language-text'][globalLanguage]}
          media={getMedia()}
          title={kohSamuiData["island-name"][globalLanguage]}
          mainImg={kohSamuiData.heroImage}
          mapDrawing={samuiMap.src} />
        <div id="media">
          <SocialsSection data={kohSamuiData} lang={kohSamuiData['language-text'][globalLanguage]} />
        </div>
        <StickyFooter data={kohSamuiData} lang={kohSamuiData['language-text'][globalLanguage]} />
        <SectionAnimation menuIsActive={menuIsActive} title={kohSamuiData["island-name"][globalLanguage]} />
      </>
    )
}