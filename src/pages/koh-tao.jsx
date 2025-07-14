'use client';
import Head from "next/head";
import { useEffect, useState } from "react";
import kohTaoMap from '../public/images/kohTao.jpeg';
import { useGlobalSettings } from '../components/global/GlobalSettings';
import IslandPageLayout from "../layouts/IslandPageLayout";
import { islandIdMap } from "@/lib/constants/privateData";
import SectionAnimation from "../components/common/SectionAnimation";
import { LANG } from "../constants/lang/en";
import NotFoundMessage from "../components/not-found/NotFound";
import useFetchIsland from '../hooks/useIslandFetcher';

export default function KohTao() {
  const { currentMedia } = useGlobalSettings() || {};
  const [data, setData] = useState();
  const islandId = islandIdMap.kohTaoDataId;
  const { THAIISLANDS, KOH_TAO } = LANG;

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
    
    if (isLoading) return <SectionAnimation menuIsActive={isLoading} title={KOH_TAO} />;
    if (error) return <NotFoundMessage message={error} />;

    const { _id, ...restData } = data;

    return (
      <>
        <Head>
          <title>{THAIISLANDS} - {KOH_TAO}</title>
          <meta name="description" content={`${THAIISLANDS} - Information about the ${KOH_TAO}.`} />
        </Head>
        <IslandPageLayout
          data={restData}
          media={currentMedia}
          mapImage={kohTaoMap.src}
        />
      </>
    )
}
