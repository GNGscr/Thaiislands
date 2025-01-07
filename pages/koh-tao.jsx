import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import SocialsSection from "./components/SocialsSection";
import StickyFooter from "./components/StickyFooter";
import SectionAnimation from "./components/SectionAnimation";
import kohTaoData from "./public/data/kohTaoData.json";
import { useGlobalSettings } from './components/GlobalSettings';
import kohTaoMap from './public/images/kohTao.jpeg';

const he = "he";
const en = "en";
const HE_IL = 'he-IL';
const EN_US = 'en-US';

export default function KohTao() {
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
          data={kohTaoData}
          toggleLanguage={toggleLanguage}
          activateMenuIsActive={(bool) => setMenuIsActive(bool)} 
          media={currentMedia}
          />
        <div id="home" />
        <Main
          activateMenuIsActive={(bool) => setMenuIsActive(bool)}
          data={kohTaoData}
          lang={kohTaoData['language-text'][language] || "he"}
          media={currentMedia}
          title="Koh Tao"
          mainImg={kohTaoData.heroImage}
          mapDrawing={kohTaoMap.src} />
        <div id="media">
          <SocialsSection data={kohTaoData} lang={kohTaoData['language-text'][language] || "he"} />
        </div>
        <StickyFooter data={kohTaoData} lang={kohTaoData['language-text'][language] || "he"} />
        <SectionAnimation menuIsActive={menuIsActive} title={kohTaoData["island-name"][language]} />
      </>
    )
}