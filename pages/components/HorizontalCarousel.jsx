
import { motion, useTransform, useScroll } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
// /Users/de/Desktop/Thaiislands/pages/public/images/koh-phangan-rasta-1.jpg
import img1 from "../public/images/koh-phangan-rasta-1.jpg";
import mimiImg from "../public/images/IMG_7608.PNG";
import puraVidaImg from "../public/images/pura-vida-img.jpg";
import houseOfSanskara from "../public/images/house-of-sanskara.jpg";
import locationSVG from "../public/images/location-sign-svgrepo-com.svg";

export default function HorizontalCarousel({ data }) {
  return (
    <div id="cafes" className="horizontal-scroll bg-white">
      <div className="flex h-24 items-center justify-center">
        <span className="horizontal-scroll-title">
          Cafe & Resutrnats
        </span>
      </div>
      <HorizontalScrollCarousel data={data} />
      {/* <div className="flex h-48 items-center justify-center">
        <span className="font-semibold uppercase text-neutral-500">
          Recommended Locations
        </span>
      </div> */}
    </div>
  );
};

const HorizontalScrollCarousel = ({ data }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0.2%", "-85.65%"]);

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-white">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-4">
          {data ? 
            cards.map((card) => {
              return <Card card={card} key={card.id} />;
          }) : ''}
        </motion.div>
      </div>
    </section>
  );
};

const Card = ({ card }) => {
  console.log(card.url);
  
  return (
    <div
      key={card.id}
      className={`horizontal-scroll-group 
        relative h-[91.5vh] w-[97.5vw] overflow-hidden 
        bg-neutral-200 rounded-3xl`}>
                        {/* <div className="item" style={{"--position": "1"}}><img src={ require("./images/1.jpeg")} alt=""></img></div> */}

          {/* <img src={`./public/images/${card.url}`} alt="" /> */}
          {/* <Image src={card.url} width="16" hei="16" alt="instagram icon" /> */}
      <div
        style={{
          backgroundImage: `url(${[card.url]})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center"
        }}
        className="absolute inset-0 z-0 transition-transform duration-300 group-hover:scale-110"
      ></div>
      <div className="rest-link">
        <img src={locationSVG.src} width="50" height="50" alt="location icon" />
      </div>
      <div className="absolute inset-0 z-10 grid place-content-center">
        <p style={{ textAlign: 'center'}}
          className={`bg-gradient-to-br from-white/20 to-white/0 p-8 
          text-6xl font-black uppercase text-white backdrop-blur-lg`}>
          {card.title}
        </p>
      </div>
        <div className="rest-card-content"> {card.content? card.content : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus vero cum deserunt vel voluptatum officiis nisi, ipsam totam fugiat? Facere voluptates dolor id nesciunt quod.'}</div>
    </div>
  );
};

const cards = [
  {
    url: mimiImg.src,
    link: "https://mimi.koh-phangan.com",
    title: "Cafe Mimi",
    content: "Mimi Cafe is a place that feels like home. everyone is nice and friendly, great service with a smile.",
    id: 1,
  },
  {
    url: puraVidaImg.src,
    link: "https://pura-vida.koh-phangan.com",
    title: "Pura Vida",
    content: "Pura Vida Cafe is a place that feels like home. everyone is nice and friendly, great service with a smile.",
    id: 2,
  },
  {
    url: houseOfSanskara.src,
    link: "https://mimi.koh-phangan.com",
    title: "House of Sanskara",
    content: "House of Sanskara is located on Haadrin beach and has.. a place that feels like home. everyone is nice and friendly, great service with a smile.",
    id: 3,
  },
  {
    url: img1.src,
    link: "https://mimi.koh-phangan.com",
    title: "Cafe #4",
    content: "Cafe is a place that feels like home. everyone is nice and friendly, great service with a smile.",
    id: 4,
  },
  {
    url: img1.src,
    link: "https://mimi.koh-phangan.com",
    title: "Cafe #5",
    content: "Cafe is a place that feels like home. everyone is nice and friendly, great service with a smile.",
    id: 5,
  },
  {
    url: img1.src,
    link: "https://mimi.koh-phangan.com",
    title: "Cafe #6",
    content: "Cafe is a place that feels like home. everyone is nice and friendly, great service with a smile.",
    id: 6,
  },
  {
    url: img1.src,
    link: "https://mimi.koh-phangan.com",
    title: "Cafe #7",
    content: "Cafe is a place that feels like home. everyone is nice and friendly, great service with a smile.",
    id: 7,
  },
];
