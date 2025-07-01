'use client';
import Head from "next/head";
import { useEffect, useState } from "react";
import samuiMap from '../public/images/Beach-Map-Koh-Samui.jpg';
import { useGlobalSettings } from '../components/global/GlobalSettings';
import IslandPageLayout from "../layouts/IslandPageLayout";
import { islandIdMap } from "@/lib/constants/privateData";
import SectionAnimation from "../components/common/SectionAnimation";
import lang from "../public/data/en.json";
import NotFoundMessage from "../components/not-found/NotFound";
import useFetchIsland from '../hooks/useIslandFetcher';

export default function KohSamui() {
  const { currentMedia } = useGlobalSettings(); 
  const [data, setData] = useState();
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const islandId = islandIdMap.kohSamuiDataId;
  const { LANG } = lang;
  
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