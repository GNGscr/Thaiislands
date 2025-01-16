
import { motion, useTransform, useScroll } from "framer-motion";
import { useRef } from "react";
import mimiImg from "../public/images/cafe-mimi-1.jpg";
import puraVidaImg from "../public/images/pura-vida-img.jpg";
import houseOfSanskara from "../public/images/house-of-sanskara.jpg";
import locationSVG from "../public/images/location-sign-svgrepo-com.svg";

export default function HorizontalCarousel({ data, media }) {
  return (
    <div className="horizontal-scroll bg-white">
      <div className="flex h-24 items-center justify-center">
        <span className="horizontal-scroll-title">
          Cafe & Resutrnats
        </span>
      </div>
      <HorizontalScrollCarousel data={data} media={media} />
    </div>
  );
};

const HorizontalScrollCarousel = ({ data, media }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const deviceMedium = {
    "desktop": {
      "start": "2%",
      "end": "-83.5%",
    },
    "tablet": {
      "start": "1.05%",
      "end": "-84.25%",
    },
    "mobile": {
      "start": "0.25%",
      "end": "-86%",
    },
  };

  let x = useTransform(
    scrollYProgress,
    [0, 1],
    [media
      ? deviceMedium[media].start
      : '', media
      ? deviceMedium[media].end
      : '']
  );

  return (
    <section id="cafes" ref={targetRef} className={`relative h-[300vh] bg-white`}>
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-4">
          {data ?
            cards.map((card) => {
              return <Card card={card} media={media} key={card.id} />;
            }) : ''}
        </motion.div>
      </div>
    </section>
  );
};

const Card = ({ card, media }) => {
  return (
    <div
      key={card.id}
      className={`horizontal-scroll-group 
        relative h-[91.5${media === 'desktop' ? 'vh' : 'dvh'}] w-[97.5vw] overflow-hidden 
        bg-neutral-200 rounded-3xl`}>
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
        <a href={card.link} target="_blank" rel="noopener noreferrer">
          <img src={locationSVG.src} width="50" height="50" alt="location icon" />
        </a>
      </div>
      <div className="absolute inset-0 z-10 grid place-content-center">
        <p style={{ textAlign: 'center' }}
          className={`bg-gradient-to-br from-white/20 to-white/0 p-8 
          text-6xl font-black uppercase text-white backdrop-blur-lg`}>
          {card.title}
        </p>
      </div>
      <div className="rest-card-content"> {card.content ? card.content : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus vero cum deserunt vel voluptatum officiis nisi, ipsam totam fugiat? Facere voluptates dolor id nesciunt quod.'}</div>
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
    url: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/91619164.jpg?k=07420f2e635d454e7fb6f52dd7d47a2cd75c2ecad12518039544bba79ce00418&o=&hp=1",
    link: "https://mimi.koh-phangan.com",
    title: "Shiralea",
    content: "The Ultimate Hostel Experience. Nestled between jungle and beach on Thailand's tropical paradise island of Koh Phangan you can find Shiralea.",
    id: 4,
  },
  {
    url: puraVidaImg.src,
    link: "https://pura-vida.koh-phangan.com",
    title: "Pura Vida",
    content: "Pura Vida Cafe is a place that feels like home. everyone is nice and friendly, great service with a smile.",
    id: 5,
  },
  {
    url: houseOfSanskara.src,
    link: "https://mimi.koh-phangan.com",
    title: "House of Sanskara",
    content: "House of Sanskara is located on Haadrin beach and has.. a place that feels like home. everyone is nice and friendly, great service with a smile.",
    id: 6,
  },
  {
    url: mimiImg.src,
    link: "https://mimi.koh-phangan.com",
    title: "Cafe Mimi",
    content: "House of Sanskara is located on Haadrin beach and has.. a place that feels like home. everyone is nice and friendly, great service with a smile.",
    id: 7,
  }
];
