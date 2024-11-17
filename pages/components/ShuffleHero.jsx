
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
// import imgSrc from '../../pages/public/images/summer-luxury-beach-resort-and-spa.webp';
import kohPhanganData from "../public/data/kohPhanganData.json";
import { getGlobalLanguage, setGlobalLanguage, getMedia } from "../config";
import Navbar from "./Navbar";

const he = "he";
const en = "en";
const HE_IL = 'he-IL';
const EN_US = 'en-US';

export default function ShuffleHero({  }) {
  let [menuIsActive, setMenuIsActive] = useState(false);
  const [ language, setLanguage ] = useState("en");
  let globalLanguage = getGlobalLanguage();
  let mainHtml;
  useEffect(() => {
    mainHtml = document.querySelector('html');
    mainHtml.lang = mainHtml.lang === HE_IL ? HE_IL : EN_US;
  }, [language]);

  const toggleLanguage = () => {
    if (mainHtml) mainHtml.lang = globalLanguage === he ? EN_US : HE_IL;

    if (globalLanguage === en) {
      setLanguage(he);
      setGlobalLanguage(he);
    } else { 
      setLanguage(en);
      setGlobalLanguage(en); 
    }
  }
  
  return (
    <section className={`w-full mt-[-1.25rem] px-8 py-12 grid grid-cols-1 md:grid-cols-2
        items-center gap-[7.5rem] max-w-6xl mx-auto text-white`}
        style={{ textAlign: globalLanguage === en ? 'left' : 'right'}}>
      <Navbar
        data={kohPhanganData}
        lang={kohPhanganData['language-text'][globalLanguage]}
        toggleLanguage={toggleLanguage}
        activateMenuIsActive={(bool) => setMenuIsActive(bool)} 
        media={getMedia()}
      />
      <div className="about-us">
        <h3 className={`text-1xl md:text-[2rem] font-semibold about-us-title`}>
          {kohPhanganData.aboutUsPage.header[globalLanguage]}
        {/* 😉 */}
        </h3>
        <p className={`text-base md:text-3xl text-slate-700 my-4 md:my-6 about-us-title text-white`}>
          {kohPhanganData.aboutUsPage.subHeader[globalLanguage]}
        </p>
        <div className="flex justify-between mt-[7.5rem] w-[96%] z-5 page-btns-wrp">
          {
            kohPhanganData.aboutUsPage.pages.map((page, index) => {
              return (
                <motion.a
                  key={index}
                  href={page.link}
                  className={`w-[32%] page-btn font-medium w-[100%]
                      py-3 px-4 rounded transition-all active:scale-95`}
                    initial={{ skew: 0, rotateX: 0 }}
                    whileHover={{ skew: 6.5, rotateX: 360 }}
                    transition={{ duration: .2, delay: 0.15 }}>
                    {page.label[globalLanguage]}
                </motion.a>
              )
            })}
        </div>
      </div>
      <ShuffleGrid />
    </section>
  );
};

const shuffle = (array) => {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

const squareData = [
  {
    id: 1,
    src: "https://pix8.agoda.net/hotelImages/6361579/-1/ceb6fd59eeaa5ac5818fd085fb590183.jpg?ca=9&ce=1&s=1024x",
  },
  {
    id: 2,
    src: "https://q-xx.bstatic.com/xdata/images/hotel/max1024x768/518472395.jpg?k=363cd4b3eba3d3331c5813fb147aac64a0b15e9e66ca401dc9c42664c04cdc67&o=&s=600x",
  },
  {
    id: 3,
    src: "https://pix8.agoda.net/hotelImages/1076675/-1/6ad3788b021595c5b7b97da30b71281e.jpg?ce=0&s=600x",
  },
  {
    id: 4,
    src: "https://pix8.agoda.net/hotelImages/248099/-1/13446a580a17ed6ed5cd9b25ff430428.jpg?ce=0&s=1024x",
  },
  {
    id: 5,
    src: "https://pix8.agoda.net/hotelImages/281786/-1/91b569d25172cb7afc157ae5f01e64cf.jpg?ca=21&ce=0&s=1024x",
  },
  {
    id: 6,
    src: "https://pix8.agoda.net/hotelImages/1076675/-1/6ad3788b021595c5b7b97da30b71281e.jpg?ce=0&s=600x",
  },
  {
    id: 7,
    src: "https://q-xx.bstatic.com/xdata/images/hotel/max1024x768/107139232.jpg?k=7e8a35317bf27c353f184c168cd01a64093b553a6ad5639c9144480866752dca&o=&s=600x",
  },
  {
    id: 8,
    src: "https://pix8.agoda.net/hotelImages/6361579/-1/ceb6fd59eeaa5ac5818fd085fb590183.jpg?ca=9&ce=1&s=1024x",
  },
  {
    id: 9,
    src: "https://q-xx.bstatic.com/xdata/images/hotel/max1024x768/518472395.jpg?k=363cd4b3eba3d3331c5813fb147aac64a0b15e9e66ca401dc9c42664c04cdc67&o=&s=600x",
  },
  {
    id: 10,
    src: "https://pix8.agoda.net/hotelImages/281786/-1/91b569d25172cb7afc157ae5f01e64cf.jpg?ca=21&ce=0&s=1024x",
  },
  {
    id: 11,
    src: "https://pix8.agoda.net/hotelImages/248099/-1/13446a580a17ed6ed5cd9b25ff430428.jpg?ce=0&s=1024x",
  },
  {
    id: 12,
    src: "https://pix8.agoda.net/hotelImages/1076675/-1/6ad3788b021595c5b7b97da30b71281e.jpg?ce=0&s=600x",
  },
  {
    id: 13,
    src: "https://q-xx.bstatic.com/xdata/images/hotel/max1024x768/107139232.jpg?k=7e8a35317bf27c353f184c168cd01a64093b553a6ad5639c9144480866752dca&o=&s=600x",
  },
  {
    id: 14,
    src: "https://pix8.agoda.net/hotelImages/248099/-1/13446a580a17ed6ed5cd9b25ff430428.jpg?ce=0&s=1024x",
  },
  {
    id: 15,
    src: "https://pix8.agoda.net/hotelImages/6361579/-1/ceb6fd59eeaa5ac5818fd085fb590183.jpg?ca=9&ce=1&s=1024x",
  },
  {
    id: 16,
    src: "https://pix8.agoda.net/hotelImages/281786/-1/91b569d25172cb7afc157ae5f01e64cf.jpg?ca=21&ce=0&s=1024x",
  },
];

const generateSquares = () => {
  return shuffle(squareData).map((sq) => (
    <motion.div
      key={sq.id}
      layout
      transition={{ duration: 1.5, type: "spring" }}
      className="w-full h-full"
      style={{
        backgroundImage: `url(${sq.src})`,
        backgroundSize: "cover",
      }}
    ></motion.div>
  ));
};

const ShuffleGrid = () => {
  const timeoutRef = useRef(null);
  const [squares, setSquares] = useState(generateSquares());

  useEffect(() => {
    shuffleSquares();

    return () => clearTimeout(timeoutRef.current);
  }, []);

  const shuffleSquares = () => {
    setSquares(generateSquares());

    timeoutRef.current = setTimeout(shuffleSquares, 4500);
  };

  return (
    <div className="grid grid-cols-4 grid-rows-4 h-[450px] gap-1">
      {squares.map((sq) => sq)}
    </div>
  );
};
