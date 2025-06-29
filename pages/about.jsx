import Head from 'next/head';
import ShuffleHero from './components/ShuffleHero';
import data from './public/data/data.json';
import lang from "./public/data/en.json";

export default function About({ media }) {
    const { LANG } = lang;
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
                <h3 id="thaiislands"
                    className="about-us-title font-bold mt-[1rem] mb-[1rem]"
                    style={{ textAlign: 'center', fontSize: '2.65rem', color: 'white' }}>
                    {LANG.THAIISLANDS}
                </h3>
                <ShuffleHero />
            </div>
        </>
    )
}