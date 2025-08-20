'use client';
import { useState } from "react";
import dynamic from "next/dynamic";
// hooks
import { useLanguage } from "../hooks/useLanguage";
// layout components
import Navbar from "../components/layout/navbar/Navbar";
import Main from "../components/island/Main";
import SocialsSection from "../components/interactive/SocialsSection";
import SectionAnimation from "../components/common/SectionAnimation";
import NotFoundMessage from "../components/not-found/NotFound";
const StickyFooter = dynamic(() => import("../components/island/StickyFooter"));

export default function IslandPageLayout({ data, media, mapImage }) {
    const { language, toggleLanguage } = useLanguage();
    const [menuIsActive, setMenuIsActive] = useState(false);
    
    if (!data) return <NotFoundMessage message={'No Data found.'} />;

    const langText = data['language-text']?.[language] || {};
    const islandName = data["island-name"]?.[language] || "";

    return (
      <>
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
          title={islandName}
          mainImg={data.heroImage}
          mapImage={mapImage}
        />

        <div id="media">
          <SocialsSection
            data={data}
            lang={langText}
          />
        </div>

        <StickyFooter
          data={data}
          lang={langText}
        />

        <SectionAnimation
          menuIsActive={menuIsActive}
          title={islandName}
        />
      </>
    );
}