import ShuffleHero from './components/ShuffleHero';
import data from '../pages/public/data/data.json';

export default function AboutUs() {
    const pages = [
        {label: 'Koh Phangan', link: '/koh-phangan', img: ''},
        {label: 'Koh Samui', link: '/koh-samui', img: ''},
        {label: 'Koh Tao', link: '/koh-tao', img: ''},
    ];
    return (
        <div className="about-us flex flex-col justify-center h-[96.5vh] relative"
            style={{
                margin: '0.75rem',
                borderRadius: '1.85rem',
                backgroundImage: `url(${data["heroImage"]})`,
                backgroundSize: "cover",
                backgroundRepeat: 'no-repeat',
                // backgroundColor: 'black'
            }}>
            <h3 id="thaiislands"
                className="about-us-title font-bold mt-[1rem] mb-[1rem]"
                style={{ textAlign: 'center', fontSize: '2.65rem', color: 'white' }}
            >
                ThaiIslands
            </h3>
            <ShuffleHero />
                {/* <div className="about-us-mask" style={{zIndex: 2}}></div> */}
        </div>
    )
}