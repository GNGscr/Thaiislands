'use client';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import phanganMap from '../public/images/phangan-map.png';
import { useGlobalSettings } from '../components/GlobalSettings';
import IslandPageLayout from "../layouts/IslandPageLayout";
import { islandIdMap } from "@/lib/constants/privateData";
import SectionAnimation from "../components/SectionAnimation";
import lang from "../public/data/en.json";
import NotFoundMessage from '../components/NotFound';
import useFetchIsland from '../hooks/useIslandFetcher';

const { LANG } = lang;

export default function KohPhangan() {
  const { currentMedia } = useGlobalSettings();
  const [data, setData] = useState(); 
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const islandId = islandIdMap.kohPhanganDataId;

  const fetchIslandData = useFetchIsland();
  
  const fetchIsland = async () => {
    setLoading(true);
    const { data, error } = await fetchIslandData(islandId);
    setData(data);
    setError(error);
    setLoading(false);
  };

  useEffect(() => {
    if (!islandId) return;
    fetchIsland();
  }, []);

    if (isLoading) return <SectionAnimation menuIsActive={isLoading} title={LANG.KOH_PHANGAN} />;
    if (error) return <NotFoundMessage message={error} />;

    const { _id, cafesAndResturants, ...dataNoId } = data;
    
    if(!Object.keys(dataNoId).length) return;
    
    return (
      <>
        <Head>
          <title>Thaiislands - Koh Phangan</title>
          <meta name="description" content="Thaiislands - Information about the Koh Phangan." />
        </Head>
        <IslandPageLayout
          data={dataNoId}
          media={currentMedia}
          mapImage={phanganMap.src}
        />
      </>
    )
}
