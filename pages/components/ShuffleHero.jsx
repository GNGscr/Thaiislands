"use client";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { islandIdMap } from "@/lib/constants/privateData";
import { useGlobalSettings } from './GlobalSettings';
import SectionAnimation from "./SectionAnimation";
import RevealLinks from "./RevealLinks";
import { LANG } from "../public/data/en.json";  
import SquareData from "../public/data/squareData.json";


export default function ShuffleHero() {
  const { language, setLanguage } = useGlobalSettings();
  const [data, setData] = useState({}); 
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { HE_IL, EN_US, he, en } = LANG;
  const islandId = islandIdMap.kohPhanganDataId;

  let mainHtml;
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    mainHtml = document.querySelector('html');
    if (mainHtml) mainHtml.setAttribute('lang', mainHtml.lang === HE_IL ? HE_IL : EN_US);

  }, [language].latest);

  const toggleLanguage = () => {
    if (mainHtml) mainHtml.setAttribute('lang', mainHtml.lang === HE_IL ? EN_US : HE_IL);
    language === en ? setLanguage(he) : setLanguage(en);
  }

  useEffect(() => {
    fetchIsland();
  }, []);

  const fetchIsland = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/islands?' + new URLSearchParams({ id: islandId }).toString());
        if (!res.ok) throw new Error("Failed to fetch island data");
        const json = await res.json();
        setData(json);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (isLoading) return <SectionAnimation menuIsActive={isLoading} title={LANG.THAIISLANDS} />;
    if (error) return <p>שגיאה: {error}</p>;

    const { _id, cafesAndResturants, ...dataNoId } = data;
    
    if(!Object.keys(dataNoId).length) return;
  
  return (
    <section className={`w-full mt-[-1.25rem] px-8 py-12 grid grid-cols-1 md:grid-cols-2
        items-center gap-[7.5rem] max-w-6xl mx-auto text-white`}
        style={{ textAlign: language === en ? 'left' : 'right'}}>
      <div className={`about-nav flex justify-end w-full h-[60px] fixed top-[1rem] right-0`}>
        <RevealLinks toggleLanguage={toggleLanguage} lang={language} />
      </div>
      <div className="about-us">
        <h3 className={`text-1xl md:text-[2rem] font-semibold about-us-title`}>
          {dataNoId.aboutUsPage.header[language]}
        {/* 😉 */}
        </h3>
        <p className={`text-base md:text-2xl text-slate-700 my-4 md:my-6 about-us-title text-white`}>
          {dataNoId.aboutUsPage.subHeader[language]}
        </p>
        <div className="flex justify-between mt-[10rem] w-[96%] z-5 page-btns-wrp">
          {
            dataNoId.aboutUsPage.pages.map((page, index) => {
              return (
                <motion.a
                  key={index}
                  href={page.link}
                  className={`w-[32%] page-btn font-medium w-[100%]
                      py-3 px-4 rounded transition-all active:scale-95`}
                    initial={{ color: "#000", backgroundColor: "#fff", rotateX: 0 }}
                    whileHover={{
                      fontWeight: 600,
                      letterSpacing: "0.005rem",
                      color: "#fff",
                      backgroundColor: "#000",
                      rotateX: 360
                    }}
                    transition={{ duration: .1, delay: 0.065 }}>
                    {page.label[language]}
                </motion.a>
              )
            })}
        </div>
      </div>
      <ShuffleGrid language={language} />
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

const generateSquares = () => {
  if (!SquareData) return;
  return shuffle(SquareData).map((sq) => (
    <a
      key={sq.id}
      href={sq.link}
      target="_blank"
      rel="noopener noreferrer"
      className="shuffle-square"
      >
      <motion.div     
        layout
        transition={{ duration: 1.5, type: "spring" }}
        className="w-full h-full"
        style={{
          backgroundImage: `url(${sq.src})`,
          backgroundSize: "cover",
        }}
      ></motion.div>
    </a>
  ));
};

const ShuffleGrid = ({language}) => {
  const timeoutRef = useRef(null);
  const [squares, setSquares] = useState(generateSquares());

  const shuffleTitle = {
    "en": "Try the Blind Selection - (click randomly on one of the options)",
    "he": "תנסו את הבחירה העיוורת - (ליחצו רנדומלית על אחת האופציות)",
  };

  useEffect(() => {
    shuffleSquares();
    return () => clearTimeout(timeoutRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const shuffleSquares = () => {
    setSquares(generateSquares());

    timeoutRef.current = setTimeout(shuffleSquares, 4500);
  };

  return (
    <div className="shuffle-grid-wrapper">
      <div className="shuffle-title">{shuffleTitle[language]} </div>
      <div className="shuffle grid grid-cols-4 grid-rows-4 h-[450px] gap-1">
        {squares.map((sq) => sq)}
      </div>
    </div>
  );
};
