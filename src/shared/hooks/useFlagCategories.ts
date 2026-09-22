import { apiClient } from "../api/api-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_URL } from "../api/config";
import { type FlagData } from "./useFlags";

export const useCreateFlagCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (categoryName: string) => {
      const { data } = await apiClient.post<FlagData>(`${API_URL}/flags/create-category`, {
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
      const { data } = await apiClient.delete<FlagData>(
        `${API_URL}/flags/delete-category/${categoryId}`,
      );
      return data;
    },

    onSuccess: () => void queryClient.invalidateQueries({ queryKey: ["flags"] }),
  });
};

interface RenameFlagCategoryArgs {
  categoryId: string;
  categoryName: string;
}

export const useRenameFlagCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ categoryId, categoryName }: RenameFlagCategoryArgs) => {
      const { data } = await apiClient.patch<FlagData>(
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
