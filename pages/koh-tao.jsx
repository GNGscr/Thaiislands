'use client';
import kohTaoData from "./public/data/kohTaoData.json";
import kohTaoMap from './public/images/kohTao.jpeg';
import { useGlobalSettings } from './components/GlobalSettings';
import { useLanguageToggle } from "./hooks/useLanguageToggle";
import IslandPageLayout from "./layouts/IslandPageLayout";

export default function KohTao() {
  const { currentMedia } = useGlobalSettings();
  const { language, toggleLanguage } = useLanguageToggle();    
    return (
      <IslandPageLayout
        data={kohTaoData}
        media={currentMedia}
        language={language}
        toggleLanguage={toggleLanguage}
        mapImage={kohTaoMap.src}
      />
    )
}
