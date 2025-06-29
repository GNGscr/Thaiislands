'use client';
import { useState } from "react";
import Navbar from "../components/Navbar";
import Main from "../components/Main";
import SocialsSection from "../components/SocialsSection";
import StickyFooter from "../components/StickyFooter";
import SectionAnimation from "../components/SectionAnimation";
import { useGlobalSettings } from "../components/GlobalSettings";
import { useEffect } from "react";
import lang from "../public/data/en.json";

export default function IslandPageLayout({
  // filteredData,
    data,
    media,
    // language,
    // toggleLanguage,
    mapImage,
}) {
    // const [menuIsActive, setMenuIsActive] = useState(false);
    // if (!data.legnth) return;
    const { LANG } = lang;
    const { language, setLanguage, currentMedia } = useGlobalSettings();
    let [menuIsActive, setMenuIsActive] = useState(false);
    let mainHtml;
    useEffect(() => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      mainHtml = document.querySelector('html');
      if (mainHtml) mainHtml.setAttribute('lang', mainHtml.lang);
    }, [language].latest);

    const toggleLanguage = () => {
      if (mainHtml) mainHtml.setAttribute('lang', mainHtml.lang === LANG.HE_IL ? LANG.EN_US : LANG.HE_IL);
        language === en ? setLanguage(he) : setLanguage(en);
    };
    
    if (!data) return;
    
    const langText = data['language-text'][language];
    
    return <>
        <Navbar
          data={data}
          toggleLanguage={toggleLanguage}
          activateMenuIsActive={setMenuIsActive} 
          media={media}
          />
        <div id="home" />
        <Main
          activateMenuIsActive={setMenuIsActive}
          data={data}
          lang={langText}
          media={media}
          title={data["island-name"][language]}
          mainImg={data.heroImage}
          mapDrawing={mapImage} />
        <div id="media">
          <SocialsSection data={data} lang={data['language-text'][language]} />
        </div>
        <StickyFooter data={data} lang={data['language-text'][language]} />
        <SectionAnimation menuIsActive={menuIsActive} title={data["island-name"][language]} />
      </>
}