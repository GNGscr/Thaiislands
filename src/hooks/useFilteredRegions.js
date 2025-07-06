import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export function useFilteredRegions(regions) {
  const [displayedRegions, setDisplayedRegions] = useState([]);
  const [isFiltering, setIsFiltering] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();

  const currentRegion = searchParams.get("region") || "";
  const [region, setRegion] = useState(currentRegion);

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
    setRegion(value);

    // Preserve existing search params (like lang)
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== "All Regions") {
      params.set("region", value);
    } else {
      params.delete("region");
    }

    const newUrl = `?${params.toString()}#hotels`;
    router.push(newUrl);

    requestAnimationFrame(() => {
      const target = document.getElementById("hotels");
      if (target) {
        const targetPosition =
          target.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({ top: targetPosition, behavior: "smooth" });
      }
    });
  };

  const toggleFiltering = () => setIsFiltering((prev) => !prev);

  return {
    displayedRegions,
    isFiltering,
    filterRegion,
    toggleFiltering,
  };
}
