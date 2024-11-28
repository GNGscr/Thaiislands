

import React, { useEffect, useState } from "react";
import { motion, useMotionValue } from "framer-motion";
import ScreenFitText from "./ScreenFitText";

const imgs = [
  "https://pix8.agoda.net/hotelImages/6361579/-1/ceb6fd59eeaa5ac5818fd085fb590183.jpg?ca=9&ce=1&s=1024x",
  "https://pix8.agoda.net/hotelImages/1076675/-1/6ad3788b021595c5b7b97da30b71281e.jpg?ce=0&s=600x",
  "https://pix8.agoda.net/hotelImages/281786/-1/91b569d25172cb7afc157ae5f01e64cf.jpg?ca=21&ce=0&s=1024x",
  "https://pix8.agoda.net/hotelImages/248099/-1/13446a580a17ed6ed5cd9b25ff430428.jpg?ce=0&s=1024x",
  "https://q-xx.bstatic.com/xdata/images/hotel/max1024x768/518472395.jpg?k=363cd4b3eba3d3331c5813fb147aac64a0b15e9e66ca401dc9c42664c04cdc67&o=&s=600x",
  "https://q-xx.bstatic.com/xdata/images/hotel/max1024x768/107139232.jpg?k=7e8a35317bf27c353f184c168cd01a64093b553a6ad5639c9144480866752dca&o=&s=600x",
  "https://pix8.agoda.net/hotelImages/248099/-1/13446a580a17ed6ed5cd9b25ff430428.jpg?ce=0&s=1024x",
];

const ONE_SECOND = 1000;
const AUTO_DELAY = ONE_SECOND * 10;
const DRAG_BUFFER = 50;

const SPRING_OPTIONS = {
  type: "spring",
  mass: 3,
  stiffness: 400,
  damping: 50,
};

const spacingIndex = {
  "en": { first: 3, second: 12 },
  "he": { first: 7, second: 14 },
};

export default function SwipeCarousel({data, lang}) {

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
  }, []);

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
          style={{ fontFamily: "--font-space-grotesk", opacity: 0.7, }}>
          { 
            ourVacationGalleryArray.map((letter, i) => {
              let counter = i + 1;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: "120%", skewX: "15deg" }}
                  whileInView={{ opacity: 1, y: 0, skewX: 0 }}
                  transition={{ duration: 0.35, type: "spring", delay: i * 0.03, }}
                  className={`${counter === spacingIndex[lang].first || counter === spacingIndex[lang].second ? 'mr-[1rem]' : ''}`}
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
        
        <Dots imgIndex={imgIndex} setImgIndex={setImgIndex} />
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
            animate={{
              scale: imgIndex === idx ? 0.95 : 0.85,
            }}
            transition={SPRING_OPTIONS}
            className="aspect-video h-[40vw] w-[100vw] shrink-0 rounded-xl object-cover"
          />
        );
      })}
    </>
  );
};

const Dots = ({ imgIndex, setImgIndex }) => {
  return (
    <div className="flex w-full justify-center gap-2 mt-[15px] mb-[5vh]">
      {imgs.map((_, idx) => {
        return (
          <button
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