import { useRandomPoster } from "@/shared/hooks";
import { useRandomPosterStore } from "@/features";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

export const useRandomPosterAction = () => {
  const t = useTranslations("flags.toasts");
  const { setMediaPreviewInfo } = useRandomPosterStore();
  const { mutate: getRandomPoster, isPending } = useRandomPoster();

  const handleGetRandomPoster = () => {
    getRandomPoster(undefined, {
      onSuccess: (media) => setMediaPreviewInfo(media),

      onError: () => {
        toast.error(t("posterFailed"), { position: "bottom-left" });
      },
    });
  };

  return {
    isPending,
    handleGetRandomPoster,
  };
};
