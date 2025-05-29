'use client';
import { useState } from "react";
import Navbar from "../components/Navbar";
import Main from "../components/Main";
import SocialsSection from "../components/SocialsSection";
import StickyFooter from "../components/StickyFooter";
import SectionAnimation from "../components/SectionAnimation";

export default function IslandPageLayout({
    data,
    media,
    language,
    toggleLanguage,
    mapImage,
}) {
    const [menuIsActive, setMenuIsActive] = useState(false);
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