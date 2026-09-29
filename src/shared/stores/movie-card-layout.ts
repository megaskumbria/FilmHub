import { create } from "zustand";
import { MOVIE_CARD_LAYOUT_KEY } from "@/shared/storages/storage-keys";
import { ZoneKey } from "@/widgets/movie-card-settings/lib/types";
import { persist } from "zustand/middleware";
import { BlockKey } from "@/shared/types/movie-card-block-key";

interface MovieCardLayoutStore {
  layout: Layout;
  setLayout: (layout: Layout) => void;
  hydrated: boolean;
  setHydrated: () => void;
  blockOptions: BlockOptions;
  setBlockOption: (zone: ZoneKey, blockId: BlockKey, optionKey: string, value: boolean) => void;
}

export type Layout = Record<ZoneKey, BlockKey[]>;

export type BlockOptions = Partial<
  Record<ZoneKey, Partial<Record<BlockKey, Record<string, boolean>>>>
>;

export const defaultLayout: Layout = {
  poster: ["rating", "flags"],
  hover: ["title", "description", "genres"],
  body: [],
};

const defaultBlockOptions: BlockOptions = {};

export const useMovieCardLayout = create<MovieCardLayoutStore>()(
  persist(
    (set) => ({
      layout: defaultLayout,
      blockOptions: defaultBlockOptions,

      hydrated: false,

      setLayout: (layout) => set({ layout }),

      setBlockOption: (zone, blockId, optionKey, value) =>
        set((state) => ({
          blockOptions: {
            ...state.blockOptions,
            [zone]: {
              ...state.blockOptions?.[zone],
              [blockId]: {
                ...state.blockOptions?.[zone]?.[blockId],
                [optionKey]: value,
              },
            },
          },
        })),

      setHydrated: () => set({ hydrated: true }),
    }),
    {
      name: MOVIE_CARD_LAYOUT_KEY,

      onRehydrateStorage: () => (state) => {
        state?.setHydrated();
      },
    },
  ),
);
