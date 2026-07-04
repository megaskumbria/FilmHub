import { apiClient } from "../api/api-client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { API_URL } from "../constants/constants";
import { toast } from "sonner";
import { SortBy } from "@/widgets/flag-categories-sidebar";

export interface IFlagItem {
  id: string;
  flagName: string;
  color: string;
  bgOpacity: number;
  position: number;
  categoryId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  fontFamily: string;

  iconId?: string | null;
  iconName?: string | null;
  svgContent?: string | null;
}

export interface IFlagData {
  id: string;
  categoryName: string;
  flags: IFlagItem[];
  position: number;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export const useGetFlags = (searchQuery?: string, sortBy: SortBy = "default") => {
  return useQuery({
    queryKey: ["flags", searchQuery, sortBy],

    queryFn: async () => {
      const { data } = await apiClient.get<IFlagData[]>(
        `${API_URL}/flags?search=${searchQuery}&sortBy=${sortBy}`,
      );
      return data;
    },

    refetchOnWindowFocus: false,
  });
};

interface IUpdateFlagPositionArgs {
  categoryId: string;
  flagIds: string[];
}

export const useUpdateFlagPosition = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ categoryId, flagIds }: IUpdateFlagPositionArgs) => {
      const { data } = await apiClient.patch<IFlagData>(`${API_URL}/flags/reorder`, {
        categoryId,
        flagIds,
      });
      return data;
    },

    onSuccess: () => void queryClient.invalidateQueries({ queryKey: ["flags"] }),
  });
};

interface IEditFlagArgs {
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
    mutationFn: async ({ flagId, ...editFlagPayload }: IEditFlagArgs) => {
      const { data } = await apiClient.patch<IFlagItem>(`${API_URL}/flags/edit-flag/${flagId}`, {
        ...editFlagPayload,
      });
      return data;
    },

    onSuccess: () => void queryClient.invalidateQueries({ queryKey: ["flags"] }),
  });
};

interface ICreateFlagArgs {
  flagName: string;
  color: string;
  bgOpacity: number;
  fontFamily: string;
  iconId?: string | null;
  categoryId: string;
}

export const useCreateFlag = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (createFlagPayload: ICreateFlagArgs) => {
      const { data } = await apiClient.post<IFlagItem>(
        `${API_URL}/flags/create`,
        createFlagPayload,
      );
      return data;
    },

    onMutate: async (newFlag) => {
      await queryClient.cancelQueries({ queryKey: ["flags"] });

      const previousFlags = queryClient.getQueryData<IFlagData[]>(["flags"]);

      queryClient.setQueryData<IFlagData[]>(
        ["flags"],
        (old) =>
          old?.map((category) => {
            if (category.id !== newFlag.categoryId) return category;

            const optimisticFlag: IFlagItem = {
              ...newFlag,
              id: "__optimistic__",
              position: category.flags.length,
              userId: "",
              createdAt: "",
              updatedAt: "",
              iconId: newFlag.iconId ?? null,
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

    onSuccess: () => void queryClient.invalidateQueries({ queryKey: ["flags"] }),
  });
};

interface IDeleteFlagArgs {
  flagId: string;
  categoryId: string;
}

export const useDeleteFlag = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ flagId, categoryId }: IDeleteFlagArgs) => {
      const { data } = await apiClient.delete<IFlagItem>(`${API_URL}/flags/delete-flag`, {
        data: {
          categoryId,
          flagId,
        },
      });
      return data;
    },

    onMutate: async ({ flagId }) => {
      await queryClient.cancelQueries({ queryKey: ["flags"] });

      const previousFlags = queryClient.getQueryData<IFlagData[]>(["flags"]);

      queryClient.setQueryData<IFlagData[]>(["flags"], (old) =>
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

    onSuccess: () => void queryClient.invalidateQueries({ queryKey: ["flags"] }),
  });
};

export const useCreateFlagCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (categoryName: string) => {
      const { data } = await apiClient.post<IFlagData>(`${API_URL}/flags/create-category`, {
        categoryName,
      });
      return data;
    },

    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["flags"] });
    },
  });
};

export const useDeleteFlagCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (categoryId: string) => {
      const { data } = await apiClient.delete<IFlagData>(
        `${API_URL}/flags/delete-category/${categoryId}`,
      );
      return data;
    },

    onSuccess: () => void queryClient.invalidateQueries({ queryKey: ["flags"] }),
  });
};

interface IRenameFlagCategoryArgs {
  categoryId: string;
  categoryName: string;
}

export const useRenameFlagCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ categoryId, categoryName }: IRenameFlagCategoryArgs) => {
      const { data } = await apiClient.patch<IFlagData>(
        `${API_URL}/flags/rename-category/${categoryId}`,
        { categoryName },
      );
      return data;
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["flags"],
        refetchType: "active",
      });
    },
  });
};
