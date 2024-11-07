import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import SocialsSection from "./components/SocialsSection";
import StickyFooter from "./components/StickyFooter";
import SectionAnimation from "./components/SectionAnimation";
import mainData from "./public/data/data.json";
import { getGlobalLanguage, setGlobalLanguage, getMedia } from "./config";

const he = "he";
const en = "en";
const HE_IL = 'he-IL';
const EN_US = 'en-US';

export default function KohChung() {
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
          data={mainData}
          lang={mainData['language-text'][language] || "he"}
          toggleLanguage={toggleLanguage}
          activateMenuIsActive={(bool) => setMenuIsActive(bool)} 
          media={getMedia()}
          />
        <div id="home" />
        <Main
          activateMenuIsActive={(bool) => setMenuIsActive(bool)}
          data={mainData}
          lang={mainData['language-text'][language] || "he"}
          media={getMedia()}
          title="Koh Chung"
           />
        <div id="media">
          <SocialsSection data={mainData} lang={mainData['language-text'][language] || "he"} />
        </div>
        <StickyFooter data={mainData} lang={mainData['language-text'][language] || "he"} />
        <SectionAnimation menuIsActive={menuIsActive} title="Koh Chung" />
      </>
    )
}