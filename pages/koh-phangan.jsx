'use client';
import kohPhanganData from "./public/data/kohPhanganData.json";
import phanganMap from './public/images/phangan-map.png';
import { useGlobalSettings } from './components/GlobalSettings';
import IslandPageLayout from "./layouts/IslandPageLayout";

export default function KohPhangan() {
  const { currentMedia } = useGlobalSettings();
    
    return (
      <IslandPageLayout
        data={kohPhanganData}
        media={currentMedia}
        mapImage={phanganMap.src}
      />
    )
}
