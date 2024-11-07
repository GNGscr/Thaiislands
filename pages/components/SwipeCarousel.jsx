

import React, { useEffect, useState } from "react";
import { motion, useMotionValue } from "framer-motion";
import ScreenFitText from "./ScreenFitText";

const imgs = [
  "https://images.unsplash.com/photo-1484600899469-230e8d1d59c0?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1446776709462-d6b525c57bd3?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1494022299300-899b96e49893?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1494022299300-899b96e49893?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1494022299300-899b96e49893?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
  let ourVacationGallery = data["vacation-photos-title"][lang];
  let ourVacationGalleryArray = ourVacationGallery.split("");
  return (
    <div className="flex flex-col">
      <ScreenFitText className="relative mb-[10rem]" isOnCarousal={true}/>
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