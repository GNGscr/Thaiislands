import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from 'next/navigation';

export function useFilteredRegions(regions) {
  
  const [displayedRegions, setDisplayedRegions] = useState([]);
  const [isFiltering, setIsFiltering] = useState(false);
  
  useEffect(() => {
    setDisplayedRegions(regions);
  }, [regions]);

  const searchParams = useSearchParams();
  const router = useRouter();

  const currentRegion = searchParams.get('region') || '';
  const [region, setRegion] = useState(currentRegion);
  
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (region) {
      params.set('region', region);
    } else {
      params.delete('region');
    }
    const newUrl = `?${params.toString()}`;
    router.push(newUrl);
  }, [region]);

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
    setRegion(value);
  };

  const toggleFiltering = () => setIsFiltering((prev) => !prev);

  return {
    displayedRegions,
    isFiltering,
    filterRegion,
    toggleFiltering,
  };
}
