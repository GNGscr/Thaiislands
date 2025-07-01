"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import SelectInput from "../interactive/SelectInput";
import { useState, useEffect } from "react";
import filterIcon from "../../public/images/filter-icon.svg";
import AffiliatesRegion from "../hotels/AffiliatesRegion";
import HotelsTitle from "../hotels/HotelsTitle";

export default function HotelsSection({ data, lang, media }) {

  const [displayedRegions, setDisplayedRegions] = useState();
  const [isFiltering, setIsFiltering] = useState(false);
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  useEffect(() => {
    setDisplayedRegions(data.regions);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

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
          <HotelsTitle title={data["resorts-and-hotels-title"][lang]} />
        <div className="filter-section">
          <div className="tooltip"
            style={{ opacity: isTooltipVisible ? 1 : 0 }}>
            Filter by Region
          </div>

          <motion.div className="filter-icon"
            onMouseEnter={() => setIsTooltipVisible(true)}
            onMouseLeave={() => setIsTooltipVisible(false)}
            aria-label={`button`}
            role="button"
            tabIndex="0"
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ')
                  setIsFiltering(!isFiltering);
            }}
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
      {displayedRegions?.map((region, i) => (
        <AffiliatesRegion
          key={i}
          region={region}
          lang={lang}
          media={media}
        />
      ))}
      </div>
    </div>
  );
};











































// "use client";
// import Image from "next/image";
// import { motion } from "framer-motion";
// import FlipCard from "./FlipCard";
// import DefaultCard from "./DefaultCard";
// import SelectInput from "./SelectInput";
// import { useState } from "react";
// import filterIcon from "../public/images/filter-icon.svg";
// import RowCardsAnimation from "../public/data/rowCardsAnimation.json";
// import MobileRowCardsAnimationJson from "../public/data/mobileRowCardsAnimation.json";
// import MobileOneRowCardsAnimationJson from "../public/data/mobileOneRowCardsAnimation.json";
// import RegionsTitleAnimationJson from "../public/data/regionalTitleAnimation.json";

// export default function HotelsSection({ data, lang, media }) {

//   const [displayedRegions, setDisplayedRegions] = useState(data.regions);
//   const [isFiltering, setIsFiltering] = useState(false);
//   const [isTooltipVisible, setIsTooltipVisible] = useState(false);

//   const filterRegions = value => {
//     const target = document.getElementById("hotels");

//     // Currently set to filter using english
//     if (value !== "All Regions") {
//       setDisplayedRegions(data.regions.filter(r => r.regionName.en === value));
//     } else setDisplayedRegions(data.regions);

//     setIsFiltering(!isFiltering);
    
//     if (target) {
//       const targetPosition = target.getBoundingClientRect().top + window.scrollY;
//       window.scrollTo({ top: targetPosition, behavior: 'smooth' });
//     }
//   };

//   if (!data) return;
//   return (
//     <div className="relative h-fit" style={{ direction: 'rtl' }} id="hotels">
//       <div className={`hotels-title-wrapper sticky top-0 w-screen
//       flex flex-col justify-center align-center
//       bg-[#fff] p-[1rem] overflow-hidden`}
//         style={{ zIndex: 2 }}>

//         <motion.div
//           initial={{ opacity: 0, letterSpacing: '10px' }}
//           whileInView={{ opacity: 0.7, letterSpacing: '0px' }}
//           transition={{ duration: 0.5 }}
//           className="hotels-title">
//           {data["resorts-and-hotels-title"][lang]}
//         </motion.div>

//         <div className="filter-section">
//           <div className="tooltip"
//             style={{ opacity: isTooltipVisible ? 1 : 0 }}>
//             Filter by Region
//           </div>

//           <motion.div className="filter-icon"
//             onMouseEnter={() => setIsTooltipVisible(true)}
//             onMouseLeave={() => setIsTooltipVisible(false)}
//             onClick={() => setIsFiltering(!isFiltering)}
//             initial={{ display: 'block' }}
//             animate={{ display: isFiltering ? 'none' : 'block' }}
//             transition={{ duration: 0, delay: isFiltering ? 0 : 0.25 }}
//           >
//             <div className="filter-is-on"></div>
//             <Image src={filterIcon.src} alt="filter icon" width="15" height="15" />
//           </motion.div>
//           <SelectInput
//             regions={data.regions}
//             filterRegion={filterRegions}
//             isFiltering={isFiltering}
//           />
//         </div>
//       </div>
      
//       <div className="flex flex-col">
//         {displayedRegions ?
//           displayedRegions.map((region, i) => {
//             const { regionAffiliates } = region;
//             let regionAffiliatesArray = [];
//             regionAffiliates.map((affiliate, index) => {
//               let subArrayIndex = [];
//               // if media is mobile row is limited into two cards for the two cards row animation
//               // else limit each row into three cards per row with three the thee row animation
//               const rowCardsLength = 
//                 media === "mobile" ? 1 :
//                 media === "tablet" ? 2 : 3;
//               subArrayIndex = Math.floor(index / rowCardsLength);
//               if (!regionAffiliatesArray[subArrayIndex]) regionAffiliatesArray[subArrayIndex] = [];
//               regionAffiliatesArray[subArrayIndex].push(affiliate);
//             });
//             let currentRegionName;
//             if (region.regionName && lang) currentRegionName = region.regionName[lang];
//             return (
//               <div key={i} className="w-screen relative">
//                 <motion.div style={{ opacity: 0 }} {...RegionsTitleAnimationJson} className="region-title">
//                   {currentRegionName}
//                 </motion.div>
//                 <div className="flex flex-col pb-6">
//                   {
//                     regionAffiliatesArray.map((affiliatesRow, i) => {
//                       return (
//                         <div  
//                           key={i}
//                           viewport={{ once: false }}
//                           className="affiliates-row gap-8"
//                         >
//                           {
//                             affiliatesRow.map((affiliates, counter) => {
//                               let currentMediaRowCardsAnimation = media === "mobile"
//                                 ? MobileOneRowCardsAnimationJson[counter]
//                                 : media === "tablet"
//                                   ? MobileRowCardsAnimationJson[counter]
//                                   : RowCardsAnimation[counter];
//                               return (
//                                 <motion.div
//                                   key={counter}
//                                   className="affiliate-card"
//                                   style={{ opacity: 0 }}
//                                   {
//                                   ...currentMediaRowCardsAnimation
//                                   }
//                                 >
//                                   {
//                                     media === "desktop"
//                                       ?
//                                       <FlipCard
//                                         hotelName={affiliates.affiliateName}
//                                         numOfStars={affiliates.affiliateNumberOfStars}
//                                         content={affiliates.affiliateContent[lang]}
//                                         googleScore={affiliates.affiliateGoogleScore}
//                                         link={affiliates.affiliateLink}
//                                         image={affiliates.affiliateStyleImage}
//                                         lang={lang} />
//                                       :
//                                       <DefaultCard
//                                         hotelName={affiliates.affiliateName}
//                                         numOfStars={affiliates.affiliateNumberOfStars}
//                                         content={affiliates.affiliateContent[lang]}
//                                         googleScore={affiliates.affiliateGoogleScore}
//                                         link={affiliates.affiliateLink}
//                                         image={affiliates.affiliateStyleImage}
//                                         lang={lang}
//                                         media={media} />
//                                   }
//                                 </motion.div>
//                               )
//                             })
//                           }
//                         </div>
//                       )
//                     })
//                   }
//                 </div>
//               </div>
//             )
//           }) : ''
//         }
//       </div>
//     </div>
//   );
// };