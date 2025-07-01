"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import SelectInput from "../interactive/SelectInput";
import { useState } from "react";
import filterIcon from "../../public/images/filter-icon.svg";
import AffiliatesRegion from "../hotels/AffiliatesRegion.jsx";
import HotelsTitle from "../hotels/HotelsTitle";
import { useFilteredRegions } from "@/src/hooks/useFilteredRegions";
import { LANG } from "@/src/constants/lang/en";
import NotFoundMessage from "../not-found/NotFound";

export default function HotelsSection({ data, lang, media }) {

  const {
    displayedRegions,
    isFiltering,
    filterRegion,
    toggleFiltering,
  } = useFilteredRegions(data.regions);
  
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const { FILTER_BY_REGION } = LANG;

  if (!data) return <NotFoundMessage message={"No Hotels"} />;

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
            {FILTER_BY_REGION}
          </div>

          <motion.div className="filter-icon"
            onMouseEnter={() => setIsTooltipVisible(true)}
            onMouseLeave={() => setIsTooltipVisible(false)}
            aria-label={`button`}
            role="button"
            tabIndex="0"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ')
                toggleFiltering();
            }}
            onClick={toggleFiltering}
            initial={{ display: 'block' }}
            animate={{ opacity: isFiltering ? 0 : 1, pointerEvents: isFiltering ? 'none' : 'auto' }}
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