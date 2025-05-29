'use client';
import kohSamuiData from "./public/data/kohSamuiData.json";
import samuiMap from './public/images/Beach-Map-Koh-Samui.jpg';
import { useGlobalSettings } from './components/GlobalSettings';
import { useLanguageToggle } from "./hooks/useLanguageToggle";
import IslandPageLayout from "./layouts/IslandPageLayout";

export default function KohSamui() {
  const { currentMedia } = useGlobalSettings();
  const { language, toggleLanguage } = useLanguageToggle();    
    return (
      <IslandPageLayout
        data={kohSamuiData}
        media={currentMedia}
        language={language}
        toggleLanguage={toggleLanguage}
        mapImage={samuiMap.src}
      />
    )
}