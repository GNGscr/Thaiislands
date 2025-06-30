import { useCallback } from 'react';

export default function useIslandFetcher() {
  const fetchIsland = useCallback(async (islandId) => {
    try {
      const res = await fetch('/api/islands?' + new URLSearchParams({ id: islandId }).toString());
      if (!res.ok) throw new Error("Failed to fetch island data");
      const json = await res.json();
      return { data: json, error: null };
    } catch (err) {
      return { data: null, error: err.message || "Unknown error" };
    }
  }, []);

  return fetchIsland;
}
