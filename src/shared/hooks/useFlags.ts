import { apiClient } from "../api/api-client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { API_URL } from "../constants/constants";

export interface IFlag {
  id: string;
  flagName: string;
  color: string;
  bgOpacity: number;
  fontFamily?: string;
  iconId?: string | null;
  position: number;
  categoryId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface IFlagData {
  id: string;
  categoryName: string;
  flags: IFlag[];
  position: number;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export const useFlags = () => {
  return useQuery({
    queryKey: ["flags"],

    queryFn: async () => {
      const { data } = await apiClient.get<IFlagData[]>(`${API_URL}/flags`);
      return data;
    },
  });
};

interface IUpdateFlagPositionArgs {
  categoryId: string;
  flagIds: string[];
}

export const useUpdateFlagPosition = () => {
  return useMutation({
    mutationFn: async ({ categoryId, flagIds }: IUpdateFlagPositionArgs) => {
      const { data } = await apiClient.patch<IFlagData>(`${API_URL}/flags/reorder`, {
        categoryId,
        flagIds,
      });
      return data;
    },
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
  return useMutation({
    mutationFn: async ({
      flagName,
      color,
      bgOpacity,
      fontFamily,
      iconId,
      categoryId,
    }: ICreateFlagArgs) => {
      const { data } = await apiClient.post<IFlag>(`${API_URL}/flags/create`, {
        flagName,
        color,
        bgOpacity,
        fontFamily,
        iconId,
        categoryId,
      });
      return data;
    },
  });
};
