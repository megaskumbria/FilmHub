import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../api/api-client";
import { API_URL } from "../constants/constants";
import { Media } from "../stores/movie-catalog";
import { FlagData, FlagItem } from "./useFlags";
import { toast } from "sonner";

interface SetMediaFlagsArgs {
  mediaId: number;
  flag: FlagItem;
  categoryId: string;
  categoryName: string;
}

export const useSetMediaFlags = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ mediaId, flag }: SetMediaFlagsArgs) => {
      return apiClient.patch(`${API_URL}/media-flags/set`, { mediaId, flagId: flag.id });
    },

    onMutate: async ({ mediaId, flag, categoryId, categoryName }) => {
      await queryClient.cancelQueries({ queryKey: ["flags"] });
      await queryClient.cancelQueries({ queryKey: ["media-collection"] });

      const previousFlags = queryClient.getQueriesData<FlagData[]>({ queryKey: ["flags"] });
      const previousCollections = queryClient.getQueriesData<Media[]>({
        queryKey: ["media-collection"],
      });

      queryClient.setQueriesData<FlagData[]>({ queryKey: ["flags"] }, (old) =>
        old?.map((category) => {
          if (category.id !== categoryId) return category;

          return {
            ...category,
            flags: category.flags.map((f) =>
              f.id === flag.id ? { ...f, isUsed: !f.isUsed } : { ...f, isUsed: false },
            ),
          };
        }),
      );

      queryClient.setQueriesData<Media[]>({ queryKey: ["media-collection"] }, (old) =>
        old?.map((media) => {
          if (media.id !== mediaId) return media;

          const mediaFlags = media.mediaFlags ?? [];
          const isDeselect = mediaFlags
            .find((category) => category.id === categoryId)
            ?.flags.some((f) => f.id === flag.id);

          const withoutCategory = mediaFlags.filter((category) => category.id !== categoryId);

          if (isDeselect) return { ...media, mediaFlags: withoutCategory };

          const updatedCategory: FlagData = {
            id: categoryId,
            categoryName,
            position: 0,
            userId: flag.userId,
            createdAt: "",
            updatedAt: "",
            flags: [{ ...flag, isUsed: true }],
          };

          return { ...media, mediaFlags: [...withoutCategory, updatedCategory] };
        }),
      );

      return { previousFlags, previousCollections };
    },

    onError: (_err, _vars, context) => {
      context?.previousFlags.forEach(([key, data]) => queryClient.setQueryData(key, data));
      context?.previousCollections.forEach(([key, data]) => queryClient.setQueryData(key, data));

      toast.error("Failed to update flag", { position: "bottom-left" });
    },
  });
};
