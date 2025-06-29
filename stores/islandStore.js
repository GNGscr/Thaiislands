import { create } from "zustand";
import useIslandData from "@/pages/hooks/useFetchIslandData";
// import useIslandData from "@/pages/hooks/useFetchIslandData";

export const useIslandStore = create((set, get) => ({
  data: {},             // { [islandId]: islandData }
  isLoading: {},        // { [islandId]: true/false }
  error: {},            // { [islandId]: errorMessage }

  loadIsland: async (id) => {
    // console.log(id);
    
    const { data } = get();
    // if (data[id]) return; // prevents reload

//     set((state) => ({
//       isLoading: { ...state.isLoading, [id]: true },
//       error: { ...state.error, [id]: null }
//     }));

    try {
      const islandData = await useIslandData(id);
      set((state) => ({
        data: { ...state.data, [id]: islandData }
      }));
    } catch (err) {
      set((state) => ({
        error: { ...state.error, [id]: err.message }
      }));
    } finally {
      set((state) => ({
        isLoading: { ...state.isLoading, [id]: false }
      }));
    }
  },

//   refetchIsland: async (id) => {
//     set((state) => ({
//       isLoading: { ...state.isLoading, [id]: true },
//       error: { ...state.error, [id]: null }
//     }));

//     try {
//       const islandData = await useIslandData(id);
//       set((state) => ({
//         data: { ...state.data, [id]: islandData }
//       }));
//     } catch (err) {
//       set((state) => ({
//         error: { ...state.error, [id]: err.message }
//       }));
//     } finally {
//       set((state) => ({
//         isLoading: { ...state.isLoading, [id]: false }
//       }));
//     }
//   }
}));
