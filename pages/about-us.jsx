import imgSrc from '../pages/public/images/samutra-residences.webp';
import mainImg from '../pages/public/images/KohPhanganMainImg.jpeg';
import ShuffleHero from './components/ShuffleHero';

export default function AboutUs() {
    const pages = [
        {label: 'Koh Phangan', link: '/koh-phangan', img: imgSrc.src},
        {label: 'Koh Samui', link: '/koh-samui', img: imgSrc.src},
        {label: 'Koh Tao', link: '/koh-tao', img: imgSrc.src},
    ];
    return (
        <div className="about-us flex flex-col justify-center h-[96.5vh] relative"
            style={{
                margin: '0.75rem',
                borderRadius: '1.85rem',
                backgroundImage: `url(${mainImg.src})`,
                backgroundSize: "cover",
                backgroundRepeat: 'no-repeat',
                // backgroundColor: 'black'
            }}>
            <h3
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