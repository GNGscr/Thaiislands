'use client';
import Head from "next/head";
import { useEffect, useState } from "react";
import kohTaoMap from '../public/images/kohTao.jpeg';
import { useGlobalSettings } from '../components/GlobalSettings';
import IslandPageLayout from "../layouts/IslandPageLayout";
import { islandIdMap } from "@/lib/constants/privateData";
import SectionAnimation from "../components/SectionAnimation";
import lang from "../public/data/en.json";
import NotFoundMessage from "../components/NotFound";
import useFetchIsland from '../hooks/useIslandFetcher';

export default function KohTao() {
  const { currentMedia } = useGlobalSettings();
  const [data, setData] = useState();
  const islandId = islandIdMap.kohTaoDataId;
  const { LANG } = lang;

  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    
    if (isLoading) return <SectionAnimation menuIsActive={isLoading} title={LANG.KOH_TAO} />;
    if (error) return <NotFoundMessage message={error} />;
    if (!data) return;

    return (
      <>
        <Head>
          <title>Thaiislands - Koh Tao</title>
          <meta name="description" content="Thaiislands - Information about the Koh Tao." />
        </Head>
        <IslandPageLayout
          data={data}
          media={currentMedia}
          mapImage={kohTaoMap.src}
        />
      </>
    )
}
