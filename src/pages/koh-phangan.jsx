'use client';
import Head from 'next/head';
import { useState, useEffect } from 'react';
// hooks
import useFetchIsland from '../hooks/useIslandFetcher';
import { useGlobalSettings } from '../components/global/GlobalSettings';
// assets & content
import phanganMap from '../public/images/phangan-map.png';
import { LANG } from '../constants/lang/en';
import { islandIdMap } from "@/lib/constants/privateData";
// layouts & conponents
import IslandPageLayout from "../layouts/IslandPageLayout";
import SectionAnimation from "../components/common/SectionAnimation";
import NotFoundMessage from '../components/not-found/NotFound';


export default function KohPhangan() {
  const { currentMedia } = useGlobalSettings();
  const [data, setData] = useState(); 
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const islandId = islandIdMap.kohPhanganDataId;
  const { THAIISLANDS, KOH_PHANGAN } = LANG;

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

    if (isLoading) return <SectionAnimation menuIsActive={isLoading} title={KOH_PHANGAN} />;
    if (error) return <NotFoundMessage message={error} />;

    const { _id, ...restData } = data;
    
    return (
      <>
        <Head>
          <title>{THAIISLANDS} - {KOH_PHANGAN}</title>
          <meta name="description" content={`${THAIISLANDS} - Information about the ${KOH_PHANGAN}.`} />
        </Head>
        <IslandPageLayout
          data={restData}
          media={currentMedia}
          mapImage={phanganMap.src}
        />
      </>
    )
}
