import { apiClient } from "../api/api-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_URL } from "../api/config";
import { type FlagData } from "./useFlags";

export const useCreateFlagScale = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (scaleName: string) => {
      const { data } = await apiClient.post<FlagData>(`${API_URL}/scales/create-scale`, {
        scaleName,
      });
      return data;
    },

    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["flags"] });
    },
  });
};

export const useDeleteFlagScale = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (scaleId: string) => {
      const { data } = await apiClient.delete<FlagData>(
        `${API_URL}/scales/delete-scale/${scaleId}`,
      );
      return data;
    },

    onSuccess: () => void queryClient.invalidateQueries({ queryKey: ["flags"] }),
  });
};

interface RenameFlagScaleArgs {
  scaleId: string;
  scaleName: string;
}

export const useRenameFlagScale = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ scaleId, scaleName }: RenameFlagScaleArgs) => {
      const { data } = await apiClient.patch<FlagData>(
        `${API_URL}/scales/rename-scale/${scaleId}`,
        { scaleName },
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
