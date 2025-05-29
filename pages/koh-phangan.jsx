'use client';
import kohPhanganData from "./public/data/kohPhanganData.json";
import phanganMap from './public/images/phangan-map.png';
import { useGlobalSettings } from './components/GlobalSettings';
import { useLanguageToggle } from "./hooks/useLanguageToggle";
import IslandPageLayout from "./layouts/IslandPageLayout";

export default function KohPhangan() {
  const { currentMedia } = useGlobalSettings();
  const { language, toggleLanguage } = useLanguageToggle();  
    
    return (
      <IslandPageLayout
        data={kohPhanganData}
        media={currentMedia}
        language={language}
        toggleLanguage={toggleLanguage}
        mapImage={phanganMap.src}
      />
    )
}
