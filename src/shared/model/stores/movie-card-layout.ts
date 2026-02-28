import { create } from "zustand";
import { MOVIE_CARD_LAYOUT_KEY } from "@/shared/storages/storage-keys";
import { ZoneKey } from "@/widgets/movie-card-settings/lib/types";
import { persist } from "zustand/middleware";
import { BlockKey } from "@/shared/types/movie-card-blocks";

interface MovieCardLayoutStore {
  layout: Layout;
  setLayout: (layout: Layout) => void;
  hydrated: boolean;
  setHydrated: () => void;
}

export type Layout = Record<ZoneKey, BlockKey[]>;

const defaultLayout: Layout = {
  poster: [],
  hover: [],
  body: [],
};

export const useMovieCardLayout = create<MovieCardLayoutStore>()(
  persist(
    (set) => ({
      layout: defaultLayout,
      hydrated: false,

      setLayout: (layout: Layout) => set({ layout }),
      setHydrated: () => set({ hydrated: true }),
    }),
    {
      name: MOVIE_CARD_LAYOUT_KEY,
      onRehydrateStorage: () => (state) => {
        (state as MovieCardLayoutStore)?.setHydrated();
      },
    },
  ),
);
