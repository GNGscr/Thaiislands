
import { motion, useTransform, useScroll } from "framer-motion";
import { useRef } from "react";
import mimiImg from "../public/images/cafe-mimi-1.jpg";
import puraVidaImg from "../public/images/pura-vida-img.jpg";
import houseOfSanskara from "../public/images/house-of-sanskara.jpg";
import deviceMedium from "../public/data/deviceMedium.json";
import Card from "./Card";

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

export default function HorizontalCarousel({ data, media }) {

  const cafeAndResutrants = "Cafe & Resutrants";

  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: targetRef });

  const setMediaRange = () => {

  };

  let x = useTransform(
    scrollYProgress,
    [0, 1],
    [media
      ? deviceMedium[media].start : '',
      media
        ? deviceMedium[media].end : '']
  );
  return (
    <div className="horizontal-scroll bg-white">
      <div className="flex h-24 items-center justify-center">
        <span className="horizontal-scroll-title">
          {cafeAndResutrants}
        </span>
      </div>
      
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

    </div>
  );
};
