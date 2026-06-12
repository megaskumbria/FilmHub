import { IMedia } from "@/shared/stores/movie-catalog";
import { create } from "zustand";
import { MOVIE_CARD_PREVIEW_KEY } from "@/shared/storages/storage-keys";

interface RandomPosterStore {
  mediaPreviewInfo: IMedia | null;
  setMediaPreviewInfo: (media: IMedia | null) => void;
  resetPosterPreview: () => void;
}

export const useRandomPosterStore = create<RandomPosterStore>((set) => ({
  mediaPreviewInfo: null,
  setMediaPreviewInfo: (mediaPreviewInfo: IMedia | null) => set({ mediaPreviewInfo }),

  resetPosterPreview: () => {
    set({ mediaPreviewInfo: null });
    localStorage.removeItem(MOVIE_CARD_PREVIEW_KEY);
  },
}));
