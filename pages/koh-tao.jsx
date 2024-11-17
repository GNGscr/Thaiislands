import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import SocialsSection from "./components/SocialsSection";
import StickyFooter from "./components/StickyFooter";
import SectionAnimation from "./components/SectionAnimation";
import kohTaoData from "./public/data/kohTaoData.json";
import mainImg from '../pages/public/images/KohTaoMainImg.jpeg';
import { getGlobalLanguage, setGlobalLanguage, getMedia } from "./config";

const he = "he";
const en = "en";
const HE_IL = 'he-IL';
const EN_US = 'en-US';

export default function KohTao() {
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
          data={kohTaoData}
          lang={kohTaoData['language-text'][language] || "he"}
          toggleLanguage={toggleLanguage}
          activateMenuIsActive={(bool) => setMenuIsActive(bool)} 
          media={getMedia()}
          />
        <div id="home" />
        <Main
          activateMenuIsActive={(bool) => setMenuIsActive(bool)}
          data={kohTaoData}
          lang={kohTaoData['language-text'][language] || "he"}
          media={getMedia()}
          title="Koh Tao"
          mainImg={mainImg} />
        <div id="media">
          <SocialsSection data={kohTaoData} lang={kohTaoData['language-text'][language] || "he"} />
        </div>
        <StickyFooter data={kohTaoData} lang={kohTaoData['language-text'][language] || "he"} />
        <SectionAnimation menuIsActive={menuIsActive} title={kohTaoData["island-name"][globalLanguage]} />
      </>
    )
}