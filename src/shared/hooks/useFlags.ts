import { apiClient } from "../api/api-client";
import { useQuery } from "@tanstack/react-query";
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
