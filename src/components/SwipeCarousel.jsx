

import React, { useEffect, useState } from "react";
import { motion, useMotionValue } from "framer-motion";
import ScreenFitText from "./ScreenFitText";
import rinbeach from '../public/images/koh-phangan-rin-beach.PNG';
import phangandownhill from '../public/images/koh-phangan-downhill-view.jpg';
import phanganChilling from '../public/images/koh-phangan-chilling.jpg';
import phanganParties from '../public/images/koh-phangan-party.jpg';
import jambar1 from '../public/images/koh-phangan-jambar-1.jpg';
import jambar2 from '../public/images/koh-phangan-jambar-2.jpg';
import jambar3 from '../public/images/koh-phangan-jambar-3.jpg';

import samuiMall from '../public/images/koh-samui-mall.jpg';
import samuiTraffic1 from '../public/images/koh-samui-traffic-1.jpg';
import samuiTraffic2 from '../public/images/koh-samui-traffic-2.jpg';
import samuiBand1 from '../public/images/koh-samui-band-1.jpg';
import samuiPig from '../public/images/koh-samui-pig.jpg';
import samuiDrunkGirls from '../public/images/koh-samui-girls.jpg';
import lang from "../public/data/en.json";

let imgs = [];
const { LANG } = lang;

const phanganImgs = [
  phangandownhill.src,
  jambar1.src,
  jambar3.src,
  jambar2.src,
  phanganParties.src,
  phanganChilling.src,
  rinbeach.src,
];
const samuiImgs = [
  samuiMall.src,
  samuiTraffic1.src,
  samuiTraffic2.src,
  samuiBand1.src,
  samuiPig.src,
  samuiDrunkGirls.src,
];
const taoImgs = [
  samuiMall.src,
  samuiTraffic1.src,
  samuiTraffic2.src,
  samuiBand1.src,
  samuiPig.src,
  samuiDrunkGirls.src,
];

const ONE_SECOND = 1000;
const AUTO_DELAY = ONE_SECOND * 10;
const DRAG_BUFFER = 50;

const SPRING_OPTIONS = {
  type: "spring",
  mass: 3,
  stiffness: 400,
  damping: DRAG_BUFFER,
};

const spacingIndex = {
  "en": { first: 8, second: 16 },
  "he": { first: 7, second: 16 },
};

export default function SwipeCarousel({ data, lang, media }) {

  if (data) {
    imgs = data["island-name"].en === LANG.KOH_PHANGAN
      ? phanganImgs
      : data["island-name"].en === LANG.KOH_SAMUI
        ? samuiImgs
        : taoImgs;
  }

  const [imgIndex, setImgIndex] = useState(0);
  
  const dragX = useMotionValue(0);

  useEffect(() => {
    const intervalRef = setInterval(() => {
      const x = dragX.get();

      if (x === 0) {
        setImgIndex((pv) => {
          if (pv === imgs.length - 1) {
            return 0;
          }
          return pv + 1;
        });
      }
    }, AUTO_DELAY);

    return () => clearInterval(intervalRef);
  });

  const onDragEnd = () => {
    const x = dragX.get();

    if (x <= -DRAG_BUFFER && imgIndex < imgs.length - 1) {
      setImgIndex((pv) => pv + 1);
    } else if (x >= DRAG_BUFFER && imgIndex > 0) {
      setImgIndex((pv) => pv - 1);
    }
  };
  if (!data) return;
  let ourVacationGallery = data["vacation-photos-title"][lang];
  let ourVacationGalleryArray = ourVacationGallery.split("");
  return (
    <div className="flex flex-col">
      <ScreenFitText className="relative mb-[10rem]" isOnCarousal={true} text={data["island-name"]["en"]} />
      <div className="vacation-gallery-wrapper relative overflow-hidden rounded-xl mt-[5rem]" id="gallery">
        <div 
          className="vacation-gallery w-full flex align-center justify-center text-[3rem] mb-[5px]"
          style={{ fontFamily: "--font-space-grotesk", opacity: 0.7 }}>
          { // this is a loop to build split words
            ourVacationGalleryArray.map((letter, i) => {
              let counter = i + 1;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: "120%", skewX: 15 }}
                  whileInView={{ opacity: 1, y: 0, skewX: 0 }}
                  transition={{ duration: 0.35, type: "spring", delay: i * 0.03, }}
                  className={
                    `${counter === spacingIndex[lang].first
                      || counter === spacingIndex[lang].second ? 'mr-[1rem]' : ''}`
                  }
                >
                  {letter}
                </motion.div>
              )
            })
          }
        </div>
        <motion.div
          drag="x"
          dragConstraints={{
            left: 0,
            right: 0,
          }}
          style={{
            x: dragX,
          }}
          animate={{
            translateX: `-${imgIndex * 100}vw`,
          }}
          transition={SPRING_OPTIONS}
          onDragEnd={onDragEnd}
          className="gallery-img flex cursor-grab items-center active:cursor-grabbing"
        >
          <Images imgIndex={imgIndex} />
        </motion.div>
        
        <Dots imgIndex={imgIndex} setImgIndex={setImgIndex} media={media} />
      </div>
    </div>
  );
};

const Images = ({ imgIndex }) => {
  return (
    <>
      {imgs.map((imgSrc, idx) => {
        return (
          <motion.div
            key={idx}
            style={{
              backgroundImage: `url(${imgSrc})`,
              backgroundSize: "cover",
              backgroundSize: "75vw",
              backgroundRepeat: 'no-repeat',
              backgroundPosition: "center",
            }}
            animate={{  scale: imgIndex === idx ? 0.95 : 0.85 }}
            transition={SPRING_OPTIONS}
            className="aspect-video h-[40vw] w-[100vw] shrink-0 rounded-xl object-cover"
          />
        );
      })}
    </>
  );
};

const Dots = ({ imgIndex, setImgIndex, media }) => {
  return (
    <div className={`flex w-full justify-center gap-2 mt-[15px] mb-[5${media === 'desktop' ?'vh' : 'lvh'}]`}>
      {imgs.map((_, idx) => {
        return (
          <button
            aria-label="dots-btn"
            key={idx}
            onClick={() => setImgIndex(idx)}
            className={`h-3 w-3 rounded-full transition-colors ${
              idx === imgIndex ? "bg-[#ec4e39]" : "bg-neutral-300"
            }`}
          />
        );
      })}
    </div>
  );
};