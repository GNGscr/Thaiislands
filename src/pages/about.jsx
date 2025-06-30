import Head from 'next/head';
import ShuffleHero from '../components/ShuffleHero';
import { islandIdMap } from '@/lib/constants/privateData';
import lang from "../public/data/en.json";
import { useState, useEffect } from 'react';
import SectionAnimation from '../components/SectionAnimation';
import NotFoundMessage from '../components/NotFound';

export default function About() {
    const { LANG } = lang;
    const [data, setData] = useState({}); 
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const islandId = islandIdMap.kohPhanganDataId;
    
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
        
    useEffect(() => {
        fetchIsland();
    }, []);

    if (isLoading) return <SectionAnimation menuIsActive={isLoading} title={LANG.THAIISLANDS} />;
    if (error) return <NotFoundMessage message={error} />;

    return (
        <>
            <Head>
                <title>Thaiislands</title>
                <meta name="description" content="Information about the Thai islands." />
            </Head>
            <div className={`about-us flex flex-col justify-center h-[96.5vh] relative`}
                style={{
                    margin: '0.75rem',
                    borderRadius: '1.85rem',
                    backgroundImage: `url(${data["heroImage"]})`,
                    backgroundSize: "cover",
                    backgroundRepeat: 'no-repeat'
                }}>
                {}
                <h3 id="thaiislands"
                    className="about-us-title font-bold mt-[1rem] mb-[1rem]"
                    style={{ textAlign: 'center', fontSize: '2.65rem', color: 'white' }}>
                    {LANG.THAIISLANDS}
                </h3>
                <ShuffleHero data={data} />
            </div>
        </>
    )
}