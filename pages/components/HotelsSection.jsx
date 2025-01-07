"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import FlipCard from "./FlipCard";
import DefaultCard from "./DefaultCard";
import SelectInput from "./SelectInput";
import { useState, useEffect } from "react";
import filterIcon from "../public/images/filter-icon.svg";

export default function HotelsSection({ data, lang, media }) {

  const [ displayedRegions, setDisplayedRegions ] = useState();
  const [ isFiltering, setIsFiltering ] = useState(false);
  const [ isTooltipVisible, setIsTooltipVisible ] = useState(false);

  useEffect(() => {
    setDisplayedRegions(data.regions);
  }, []);

  const rowCardsAnimation = {
      0: {
        variants: {
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
          slideStart: { x: [0, "100px"], opacity: [0, 0] },
          slideEnd: { x: ["100px", 0], opacity: [0, 1] },
        },
        initial: ["hidden", "slideStart"],
        whileInView: ["visible", "slideEnd"],
        exit: ["visible", "slideStart"],
        viewport: { amount: 0.4 },
        transition: { type: "spring", duration: 1, bounce: 0.55, stiffness: 150 },
      },
      1: {
        variants: {
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
          slideStart: { y: [0, "25px"], opacity: [0, 0] },
          slideEnd: { y: ["25px", 0], opacity: [0, 1] }
        },
        initial: ["hidden", "slideStart"],
        whileInView: ["visible", "slideEnd"],
        exit: ["visible", "slideStart"],
        viewport: { amount: 0.4
        },
        transition: { type: "spring", duration: 1, bounce: 0.5, stiffness: 145 }
      },
      2: {
        variants: {
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
          slideStart: { x: [0, "-100px"], opacity: [0, 0] },
          slideEnd: { x: ["-100px", 0], opacity: [0, 1] }
        },
        initial: ["hidden", "slideStart"],
        whileInView: ["visible", "slideEnd"],
        exit: ["visible", "slideStart"],
        viewport: { amount: 0.4 },
        transition: { type: "spring", duration: 1, bounce: 0.55, stiffness: 150 }
      },
  };
  const mobileRowCardsAnimation = {
      0: {
        variants: {
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
          slideStart: { x: [0, "25px"], opacity: [0, 0] },
          slideEnd: { x: ["25px", 0], opacity: [0, 1] },
        },
        initial: ["hidden", "slideStart"],
        whileInView: ["visible", "slideEnd"],
        exit: ["visible", "slideStart"],
        viewport: { amount: 0.4 },
        transition: { type: "tween", duration: 0.4, bounce: 0.15, stiffness: 75, },
      },
      1: {
        variants: {
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
          slideStart: { x: [0, "-25px"], opacity: [0, 0] },
          slideEnd: { x: ["-25px", 0], opacity: [0, 1] }
        },
        initial: ["hidden", "slideStart"],
        whileInView: ["visible", "slideEnd"],
        exit: ["visible", "slideStart"],
        viewport: { amount: 0.4 },
        transition: { type: "tween", duration: 0.4, bounce: 0.15, stiffness: 75, }
      }
  };
  const mobileOneRowCardsAnimation = {
      0: {
        variants: {
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
          slideStart: { y: [0, "50px"], opacity: [0, 0] },
          slideEnd: { y: ["50px", 0], opacity: [0, 1] },
        },
        initial: ["hidden", "slideStart"],
        whileInView: ["visible", "slideEnd"],
        exit: ["visible", "slideStart"],
        viewport: { amount: 0.4 },
        transition: { type: "tween", duration: 0.4, bounce: 0.15, stiffness: 75, },
      }
  };

const regionsTitleAnimation = {
    variants: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
      slideStart: { y: ["15px", 0], opacity: [0, 1] },
      slideEnd: { y: [0, "15px"], opacity: [1, 0] }
    },
    initial: ["hidden"],
    whileInView: ["hidden", "slideStart"],
    exit: ["visible", "slideEnd"],
    viewport: { amount: 0.4 },
    transition: { type: "spring", duration: 1, bounce: 0 }
};

  const filterRegion = value => {
    const target = document.getElementById("hotels");
    setDisplayedRegions(
      value === "All Regions" ? data.regions
      : data.regions.filter(r => r.regionName.en === value)
    );
    setIsFiltering(!isFiltering);
    if (target) {
      const targetPosition = target.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: targetPosition, behavior: 'smooth' });
    }
  };

  if (!data) return;
  return (
    <div className="relative h-fit" style={{ direction: 'rtl' }} id="hotels">
    <div className={`hotels-title-wrapper sticky top-0 w-screen
      flex flex-col justify-center align-center
      bg-[#fff] p-[1rem] overflow-hidden`} 
      style={{ zIndex: 2 }}>

      <motion.div 
        initial={{ opacity: 0, letterSpacing: '10px' }}
        whileInView={{ opacity: 0.7, letterSpacing: '0px' }}
        transition={{ duration: 0.5 }}
        className="hotels-title">
        {data["resorts-and-hotels-title"][lang]}
      </motion.div>

      <div className="filter-section">
        <div
          className="tooltip"
          style={{ opacity: isTooltipVisible ? 1 : 0 }}>
            Filter by Region
        </div>

        <motion.div className="filter-icon"
          onMouseEnter={() => setIsTooltipVisible(true)}
          onMouseLeave={() => setIsTooltipVisible(false)}
          onClick={() => setIsFiltering(!isFiltering)}
          initial={{ display: 'block' }}
          animate={{ display: isFiltering ? 'none' : 'block' }}
          transition={{ duration: 0, delay: isFiltering ? 0 : 0.25 }}
        >
          <div className="filter-is-on"></div>
          <Image src={filterIcon.src} alt="filter icon" width="15" height="15" />
        </motion.div>
        <SelectInput
          regions={data.regions}
          filterRegion={filterRegion}
          isFiltering={isFiltering} 
        />
      </div>
    </div>
    <div className="flex flex-col">
      {displayedRegions ? 
        displayedRegions.map((region, i) => {
          const { regionAffiliates } = region;
          let regionAffiliatesArray = [];
          regionAffiliates.map((affiliate, index) => {
            let subArrayIndex = [];
            // if media is mobile row is limited into two cards for the two cards row animation
            // else limit each row into three cards per row with three the thee row animation
            subArrayIndex = Math.floor(index / (media === "mobile" ? 1 : media === "tablet" ? 2 : 3));
            if (!regionAffiliatesArray[subArrayIndex]) regionAffiliatesArray[subArrayIndex] = [];
            regionAffiliatesArray[subArrayIndex].push(affiliate);
          });
          let currentRegionName;
          if (region.regionName && lang) currentRegionName = region.regionName[lang];          
          return (
            <div key={i} className="w-screen relative">
              <motion.div style={{ opacity: 0 }} {...regionsTitleAnimation} className="region-title">
                {currentRegionName}
              </motion.div>
              <div className="flex flex-col pb-6"> 
                {
                  regionAffiliatesArray.map((affiliatesRow, i) => {
                    return (
                      <div 
                        key={i} 
                        viewport={{once: false}}
                        className="affiliates-row gap-8"
                      >
                        {
                          affiliatesRow.map((affiliates, counter) => {
                            let currentMediaRowCardsAnimation = media === "mobile"
                              ? mobileOneRowCardsAnimation[counter]
                              : media === "tablet"
                              ? mobileRowCardsAnimation[counter]
                              : rowCardsAnimation[counter];
                            return (
                              <motion.div
                                key={counter} 
                                className="affiliate-card" 
                                style={{ opacity: 0 }}
                              {
                                ...currentMediaRowCardsAnimation
                              }
                              >
                                {
                                  media === "desktop"
                                  ?
                                    <FlipCard
                                      hotelName={affiliates.affiliateName}
                                      numOfStars={affiliates.affiliateNumberOfStars}
                                      content={affiliates.affiliateContent[lang]}
                                      googleScore={affiliates.affiliateGoogleScore}
                                      link={affiliates.affiliateLink}
                                      image={affiliates.affiliateStyleImage}
                                      lang={lang} />
                                  :
                                    <DefaultCard 
                                      hotelName={affiliates.affiliateName}
                                      numOfStars={affiliates.affiliateNumberOfStars}
                                      content={affiliates.affiliateContent[lang]}
                                      googleScore={affiliates.affiliateGoogleScore}
                                      link={affiliates.affiliateLink}
                                      image={affiliates.affiliateStyleImage}
                                      lang={lang}
                                      media={media} />
                                }
                              </motion.div>
                            )
                          })
                        }
                      </div>
                    )
                  })
                }
              </div>
            </div>
          )
        }) : ''
      }
    </div>
  </div>
  );
};