'use client';
import Head from "next/head";
import { useEffect, useState } from "react";
// hooks
import useFetchIsland from '../hooks/useIslandFetcher';
import { useGlobalSettings } from '../components/global/GlobalSettings';
// assets & content
import samuiMap from '../public/images/Beach-Map-Koh-Samui.jpg';
import { LANG } from "../constants/lang/en";
import { islandIdMap } from "@/lib/constants/privateData";
// layouts & conponents
import IslandPageLayout from "../layouts/IslandPageLayout";
import SectionAnimation from "../components/common/SectionAnimation";
import NotFoundMessage from "../components/not-found/NotFound";

export default function KohSamui() {
  const { currentMedia } = useGlobalSettings(); 
  const [data, setData] = useState();
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const islandId = islandIdMap.kohSamuiDataId;
  const { THAIISLANDS, KOH_SAMUI } = LANG;
  
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

    if (isLoading) return <SectionAnimation menuIsActive={isLoading} title={KOH_SAMUI} />;
    if (error) return <NotFoundMessage message={error} />;

    const { _id, ...restData } = data;

    return (
      <>
        <Head>
          <title>{THAIISLANDS} - {KOH_SAMUI}</title>
          <meta name="description" content={`${THAIISLANDS} - Information about the ${KOH_SAMUI}.`} />
        </Head>
        <IslandPageLayout
          data={restData}
          media={currentMedia}
          mapImage={samuiMap.src}
        />
      </>
    )
}