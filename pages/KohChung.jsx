import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import SocialsSection from "./components/SocialsSection";
import StickyFooter from "./components/StickyFooter";
import SectionAnimation from "./components/SectionAnimation";
import mainData from "./public/data/data.json";
import { useGlobalSettings } from './components/GlobalSettings';

const he = "he";
const en = "en";
const HE_IL = 'he-IL';
const EN_US = 'en-US';

export default function KohChung() {
  const { language, setLanguage, currentMedia } = useGlobalSettings();
    let [menuIsActive, setMenuIsActive] = useState(false);
    const [ stateLanguage, setStateLanguage ] = useState("en");
    let globalLanguage = language;
    let mainHtml;
    useEffect(() => {
      mainHtml = document.querySelector('html');
      mainHtml.lang = mainHtml.lang === HE_IL ? HE_IL : EN_US;
    }, [stateLanguage]);

    const toggleLanguage = () => {
      if (mainHtml) mainHtml.lang = globalLanguage === he ? EN_US : HE_IL;

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
          data={mainData}
          lang={mainData['language-text'][stateLanguage] || "he"}
          toggleLanguage={toggleLanguage}
          activateMenuIsActive={(bool) => setMenuIsActive(bool)} 
          media={currentMedia}
          />
        <div id="home" />
        <Main
          activateMenuIsActive={(bool) => setMenuIsActive(bool)}
          data={mainData}
          lang={mainData['language-text'][stateLanguage] || "he"}
          media={currentMedia}
          title="Koh Chung"
           />
        <div id="media">
          <SocialsSection data={mainData} lang={mainData['language-text'][stateLanguage] || "he"} />
        </div>
        <StickyFooter data={mainData} lang={mainData['language-text'][stateLanguage] || "he"} />
        <SectionAnimation menuIsActive={menuIsActive} title="Koh Chung" />
      </>
    )
}