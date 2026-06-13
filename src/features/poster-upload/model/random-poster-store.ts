import { IMedia } from "@/shared/stores/movie-catalog";
import { create } from "zustand";
import { MOVIE_CARD_PREVIEW_KEY } from "@/shared/storages/storage-keys";
import { persist } from "zustand/middleware";
import { toast } from "sonner";

interface RandomPosterStore {
  mediaPreviewInfo: IMedia | null;
  setMediaPreviewInfo: (media: IMedia | null) => void;
  resetPosterPreview: () => void;
}

// Add hydration state!!!!!!
export const useRandomPosterStore = create<RandomPosterStore>()(
  persist(
    (set) => ({
      mediaPreviewInfo: null,
      setMediaPreviewInfo: (mediaPreviewInfo) => set({ mediaPreviewInfo }),

      resetPosterPreview: () => {
        set({ mediaPreviewInfo: null });
        useRandomPosterStore.persist.clearStorage();
        toast.success("Poster preview reset", { position: "bottom-left" });
      },
    }),
    {
      name: MOVIE_CARD_PREVIEW_KEY,
    },
  ),
);
