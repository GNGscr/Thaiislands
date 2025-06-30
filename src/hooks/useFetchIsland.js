
export default async function useFetchIsland({ islandId, sendLoading, sendData, sendError }) {
    sendLoading(true);
    try {
      const res = await fetch('/api/islands?' + new URLSearchParams({ id: islandId }).toString());
      if (!res.ok) throw new Error("Failed to fetch island data");
      const json = await res.json();
      return sendData(json);
    } catch (err) {
      return sendError(err.message);
    } finally {
      return sendLoading(false);
    }
}