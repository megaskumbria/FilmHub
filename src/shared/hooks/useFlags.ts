import { apiClient } from "../api/api-client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { API_URL } from "../api/config";
import { toast } from "sonner";
import { SortBy } from "@/widgets/flag-categories-sidebar";

const FLAG_SCALE_QUERY_KEY = "flag-scale";

export interface Icon {
  svgContent: string | null;
  iconName: string | null;
  iconId: string;
}

export interface FlagItem {
  id: string;
  flagName: string;
  color: string;
  bgOpacity: number;
  position: number;
  categoryId: string;
  userId: string;
  fontFamily: string;

  isUsed: boolean | null;

  icon: Icon | null;
}

export interface FlagData {
  id: string;
  categoryName: string;
  flagsCount: number;

  flags: FlagItem[];
}

interface GetFlagsArgs {
  sortBy: SortBy;

  searchQuery?: string;
  mediaId?: number;
}

export const useGetFlags = ({ searchQuery, sortBy = "default", mediaId }: GetFlagsArgs) => {
  return useQuery({
    queryKey: ["flags", searchQuery, sortBy, mediaId],

    queryFn: async () => {
      const { data } = await apiClient.get<FlagData[]>(
        `${API_URL}/flags?search=${searchQuery}&sortBy=${sortBy}&mediaId=${mediaId}`,
      );
      return data;
    },

    refetchOnWindowFocus: false,
  });
};

interface UpdateFlagPositionArgs {
  categoryId: string;
  flagIds: string[];
}

export const useUpdateFlagPosition = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ categoryId, flagIds }: UpdateFlagPositionArgs) => {
      const { data } = await apiClient.patch<FlagData>(`${API_URL}/flags/reorder`, {
        categoryId,
        flagIds,
      });
      return data;
    },

    onMutate: async ({ categoryId, flagIds }) => {
      await queryClient.cancelQueries({ queryKey: ["flags"] });

      const previousFlags = queryClient.getQueriesData<FlagData[]>({ queryKey: ["flags"] });

      queryClient.setQueriesData<FlagData[]>({ queryKey: ["flags"] }, (old) =>
        old?.map((category) => {
          if (category.id !== categoryId) return category;

          const flagMap = new Map(category.flags.map((f) => [f.id, f]));
          const reorderedFlags = flagIds

            .map((id, index) => {
              const flag = flagMap.get(id);
              return flag ? { ...flag, position: index } : null;
            })
            .filter(Boolean) as FlagItem[];

          return { ...category, flags: reorderedFlags };
        }),
      );
      return { previousFlags };
    },

    onError: (_err, _vars, context) => {
      context?.previousFlags.forEach(([queryKey, data]) => {
        queryClient.setQueryData(queryKey, data);
      });
      toast.error("Failed to reorder flags", { position: "bottom-left" });
    },

    onSuccess: () => void queryClient.invalidateQueries({ queryKey: [FLAG_SCALE_QUERY_KEY] }),
  });
};

interface EditFlagArgs {
  flagId: string;
  flagName: string;
  color: string;
  bgOpacity: number;
  fontFamily: string;
  iconId?: string | null;
  categoryId: string;
}

export const useEditFlag = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ flagId, ...editFlagPayload }: EditFlagArgs) => {
      const { data } = await apiClient.patch<FlagItem>(`${API_URL}/flags/edit-flag/${flagId}`, {
        ...editFlagPayload,
      });
      return data;
    },

    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["flags"] });
      void queryClient.invalidateQueries({ queryKey: [FLAG_SCALE_QUERY_KEY] });
    },
  });
};

interface CreateFlagArgs {
  flagName: string;
  color: string;
  bgOpacity: number;
  fontFamily: string;
  icon?: Icon | null;
  categoryId: string;
}

export const useCreateFlag = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ icon, ...createFlagPayload }: CreateFlagArgs) => {
      const { data } = await apiClient.post<FlagItem>(`${API_URL}/flags/create`, {
        ...createFlagPayload,
        iconId: icon?.iconId ?? null,
      });
      return data;
    },

    onMutate: async (newFlag) => {
      await queryClient.cancelQueries({ queryKey: ["flags"] });

      const previousFlags = queryClient.getQueryData<FlagData[]>(["flags"]);

      queryClient.setQueryData<FlagData[]>(
        ["flags"],
        (old) =>
          old?.map((category) => {
            if (category.id !== newFlag.categoryId) return category;

            const optimisticFlag: FlagItem = {
              ...newFlag,
              id: "__optimistic__",
              isUsed: null,
              position: category.flags.length,
              userId: "",
              icon: newFlag.icon ?? null,
            };

            return { ...category, flags: [...category.flags, optimisticFlag] };
          }) ?? [],
      );
      return { previousFlags };
    },

    onError: (_err, _vars, context) => {
      queryClient.setQueryData(["flags"], context?.previousFlags);
      toast.error("Failed to create flag", { position: "bottom-left" });
    },

    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["flags"] });
      void queryClient.invalidateQueries({ queryKey: [FLAG_SCALE_QUERY_KEY] });
    },
  });
};

interface DeleteFlagArgs {
  flagId: string;
  categoryId: string;
}

export const useDeleteFlag = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ flagId, categoryId }: DeleteFlagArgs) => {
      const { data } = await apiClient.delete<FlagItem>(`${API_URL}/flags/delete-flag`, {
        data: {
          categoryId,
          flagId,
        },
      });
      return data;
    },

    onMutate: async ({ flagId }) => {
      await queryClient.cancelQueries({ queryKey: ["flags"] });

      const previousFlags = queryClient.getQueryData<FlagData[]>(["flags"]);

      queryClient.setQueryData<FlagData[]>(["flags"], (old) =>
        old?.map((category) => ({
          ...category,
          flags: category.flags.filter((flag) => flag.id !== flagId),
        })),
      );

      return { previousFlags };
    },

    onError: (_err, _vars, context) => {
      queryClient.setQueryData(["flags"], context?.previousFlags);
      toast.error("Failed to delete flag", { position: "bottom-left" });
    },

    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["flags"] });
      void queryClient.invalidateQueries({ queryKey: [FLAG_SCALE_QUERY_KEY] });
    },
  });
};
