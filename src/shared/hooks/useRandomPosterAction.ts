import { useRandomPoster } from "@/shared/hooks";
import { useRandomPosterStore } from "@/features";
import { toast } from "sonner";

export const useRandomPosterAction = () => {
  const { setMediaPreviewInfo } = useRandomPosterStore();
  const { mutate: getRandomPoster, isPending } = useRandomPoster();

  const handleGetRandomPoster = () => {
    getRandomPoster(undefined, {
      onSuccess: (media) => setMediaPreviewInfo(media),

      onError: () => {
        toast.error("Failed to get random poster", { position: "bottom-left" });
      },
    });
  };

  return {
    isPending,
    handleGetRandomPoster,
  };
};
