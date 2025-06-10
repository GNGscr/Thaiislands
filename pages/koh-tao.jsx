'use client';
import { useEffect, useState } from "react";
import kohTaoMap from './public/images/kohTao.jpeg';
import { useGlobalSettings } from './components/GlobalSettings';
import IslandPageLayout from "./layouts/IslandPageLayout";
import { islandIdMap } from "@/lib/constants/privateData";
import SectionAnimation from "./components/SectionAnimation";
import { LANG } from "./public/data/en.json";

export default function KohTao() {
  const { currentMedia } = useGlobalSettings();
  const [data, setData] = useState();
  const islandId = islandIdMap.kohTaoDataId;

  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    
    if (isLoading) return <SectionAnimation menuIsActive={isLoading} title={LANG.KOH_TAO} />;
    if (error) return <p>שגיאה: {error}</p>;
    if (!data) return;

    return (
      <IslandPageLayout
        data={data}
        media={currentMedia}
        mapImage={kohTaoMap.src}
      />
    )
}
