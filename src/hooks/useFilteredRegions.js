import { useEffect, useState } from "react";

export function useFilteredRegions(regions) {
  const [displayedRegions, setDisplayedRegions] = useState([]);
  const [isFiltering, setIsFiltering] = useState(false);

  useEffect(() => {
    setDisplayedRegions(regions);
  }, [regions]);

  const filterRegion = (value) => {
    const filtered =
      value === "All Regions"
        ? regions
        : regions.filter((r) => r.regionName.en === value);

    setDisplayedRegions(filtered);
    setIsFiltering(false);

    const target = document.getElementById("hotels");
    if (target) {
      const targetPosition = target.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: targetPosition, behavior: "smooth" });
    }
  };

  useEffect(() => {
    console.log("isFiltering changed:", isFiltering);
  }, [isFiltering]);

  const toggleFiltering = () => setIsFiltering((prev) => !prev);

  return {
    displayedRegions,
    isFiltering,
    filterRegion,
    toggleFiltering,
  };
}
