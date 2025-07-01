'use client';
import { useState } from "react";
import Navbar from "../components/layout/navbar/Navbar";
import Main from "../components/landing/Main";
import SocialsSection from "../components/interactive/SocialsSection";
import StickyFooter from "../components/island/StickyFooter";
import SectionAnimation from "../components/common/SectionAnimation";
import { useGlobalSettings } from "../components/global/GlobalSettings";

export default function IslandPageLayout({ data, media, mapImage }) {
    const { language, toggleLanguage } = useGlobalSettings();
    let [menuIsActive, setMenuIsActive] = useState(false);
    
    if (!data) return;

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
        lang={data['language-text'][language]}
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