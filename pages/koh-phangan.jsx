'use client';
import { useState, useEffect } from 'react';
import phanganMap from './public/images/phangan-map.png';
import { useGlobalSettings } from './components/GlobalSettings';
import IslandPageLayout from "./layouts/IslandPageLayout";
import { islandIdMap } from "@/lib/constants/privateData";
import SectionAnimation from "./components/SectionAnimation";
import { LANG } from "./public/data/en.json";


export default function KohPhangan() {
  const { currentMedia } = useGlobalSettings();
  const [data, setData] = useState(); 
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const islandId = islandIdMap.kohPhanganDataId;

    useEffect(() => {
    fetchIsland();
  }, []);

  const fetchIsland = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/islands?' + new URLSearchParams({ id: islandId }).toString());
        if (!res.ok) throw new Error("Failed to fetch island data");
        const json = await res.json();
        setData(json);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (isLoading) return <SectionAnimation menuIsActive={isLoading} title={LANG.KOH_PHANGAN} />;
    if (error) return <p>שגיאה: {error}</p>;

    const { _id, cafesAndResturants, ...dataNoId } = data;
    
    if(!Object.keys(dataNoId).length) return;
    
    return (
      <IslandPageLayout
        data={dataNoId}
        media={currentMedia}
        mapImage={phanganMap.src}
      />
    )
}
