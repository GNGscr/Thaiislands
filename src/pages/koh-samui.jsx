'use client';
import Head from "next/head";
import { useEffect, useState } from "react";
import samuiMap from '../public/images/Beach-Map-Koh-Samui.jpg';
import { useGlobalSettings } from '../components/GlobalSettings';
import IslandPageLayout from "../layouts/IslandPageLayout";
import { islandIdMap } from "@/lib/constants/privateData";
import SectionAnimation from "../components/SectionAnimation";
import lang from "../public/data/en.json";
import NotFoundMessage from "../components/NotFound";

export default function KohSamui() {
  const { currentMedia } = useGlobalSettings(); 
  const [data, setData] = useState();
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const islandId = islandIdMap.kohSamuiDataId;
  const { LANG } = lang;
  
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

    if (isLoading) return <SectionAnimation menuIsActive={isLoading} title={LANG.KOH_SAMUI} />;
    if (error) return <NotFoundMessage message={error} />;
    if (!data) return;

    return (
      <>
        <Head>
          <title>Thaiislands - Koh Samui</title>
          <meta name="description" content="Thaiislands - Information about the Koh Samui." />
        </Head>
        <IslandPageLayout
          data={data}
          media={currentMedia}
          mapImage={samuiMap.src}
        />
      </>
    )
}