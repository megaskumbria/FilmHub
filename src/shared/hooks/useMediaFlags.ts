import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../api/api-client";
import { API_URL } from "../api/config";
import { Media } from "../stores/movie-catalog";
import { FlagData, FlagItem } from "./useFlags";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

interface SetMediaFlagsArgs {
  mediaId: number;
  flag: FlagItem;
  scaleId: string;
  scaleName: string;
}

export const useSetMediaFlags = () => {
  const t = useTranslations("flags.toasts");
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ mediaId, flag }: SetMediaFlagsArgs) => {
      return apiClient.patch(`${API_URL}/media-flags/set`, { mediaId, flagId: flag.id });
    },

    onMutate: async ({ mediaId, flag, scaleId, scaleName }) => {
      await queryClient.cancelQueries({ queryKey: ["flags"] });
      await queryClient.cancelQueries({ queryKey: ["media-collection"] });

      const previousFlags = queryClient.getQueriesData<FlagData[]>({ queryKey: ["flags"] });
      const previousCollections = queryClient.getQueriesData<Media[]>({
        queryKey: ["media-collection"],
      });

      queryClient.setQueriesData<FlagData[]>({ queryKey: ["flags"] }, (old) =>
        old?.map((scale) => {
          if (scale.id !== scaleId) return scale;

          return {
            ...scale,
            flags: scale.flags.map((f) =>
              f.id === flag.id ? { ...f, isUsed: !f.isUsed } : { ...f, isUsed: false },
            ),
          };
        }),
      );

      const cachedScale = previousFlags
        .flatMap(([, data]) => data ?? [])
        .find((scale) => scale.id === scaleId);

      const flagsCount = cachedScale?.flagsCount ?? cachedScale?.flags.length ?? 0;

      queryClient.setQueriesData<Media[]>({ queryKey: ["media-collection"] }, (old) =>
        old?.map((media) => {
          if (media.id !== mediaId) return media;

          const mediaFlags = media.mediaFlags ?? [];
          const isDeselect = mediaFlags
            .find((scale) => scale.id === scaleId)
            ?.flags.some((f) => f.id === flag.id);

          const withoutScale = mediaFlags.filter((scale) => scale.id !== scaleId);

          if (isDeselect) return { ...media, mediaFlags: withoutScale };

          const updatedScale: FlagData = {
            id: scaleId,
            scaleName,
            flagsCount,
            flags: [{ ...flag, isUsed: true }],
          };

          return { ...media, mediaFlags: [...withoutScale, updatedScale] };
        }),
      );

      return { previousFlags, previousCollections };
    },

    onError: (_err, _vars, context) => {
      context?.previousFlags.forEach(([key, data]) => queryClient.setQueryData(key, data));
      context?.previousCollections.forEach(([key, data]) => queryClient.setQueryData(key, data));

      toast.error(t("updateFailed"), { position: "bottom-left" });
    },
  });
};
