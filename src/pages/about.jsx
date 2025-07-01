import Head from 'next/head';
import { useState, useEffect } from 'react';
// hooks
import useFetchIsland from '../hooks/useIslandFetcher';
// assets & content
import { LANG } from '../constants/lang/en';
import { islandIdMap } from '@/lib/constants/privateData';
// layouts & conponents
import ShuffleHero from '../components/island/ShuffleHero';
import SectionAnimation from '../components/common/SectionAnimation';
import NotFoundMessage from '../components/not-found/NotFound';

export default function About() {
    const { THAIISLANDS, THAI_ISLANDS } = LANG;
    const [data, setData] = useState({}); 
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

    if (isLoading) return <SectionAnimation menuIsActive={isLoading} title={THAIISLANDS} />;
    if (error) return <NotFoundMessage message={error} />;
    const { _id, ...restData } = data;

    return (
        <>
            <Head>
                <title>{THAIISLANDS}</title>
                <meta name="description" content={`Information about the ${THAI_ISLANDS}.`} />
            </Head>
            <div className={`about-us flex flex-col justify-center h-[96.5vh] relative`}
                style={{
                    margin: '0.75rem',
                    borderRadius: '1.85rem',
                    backgroundImage: `url(${restData["heroImage"]})`,
                    backgroundSize: "cover",
                    backgroundRepeat: 'no-repeat'
                }}>
                {}
                <h3 id="thaiislands"
                    className="about-us-title font-bold mt-[1rem] mb-[1rem]"
                    style={{ textAlign: 'center', fontSize: '2.65rem', color: 'white', zIndex: 1 }}>
                    {THAIISLANDS}
                </h3>
                <ShuffleHero data={restData} />
            </div>
        </>
    )
}