import { apiClient } from "../api/api-client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { API_URL } from "../api/config";

export interface PresetFlagItem {
  id: string;
  flagName: string;
  color: string;
  bgOpacity: number;
  fontFamily: string;

  iconId: string | null;
  iconName: string | null;
  svgContent: string;

  position: number;

  packId: string;
}

export interface PresetPack {
  id: string;
  title: string;
  categoryName: string;
  description: string;
  usageCount: number;
  flags: PresetFlagItem[];

  isAdded: boolean;
}

export const useGetPresetPacks = () => {
  return useQuery({
    queryKey: ["preset-packs"],
    queryFn: async () => {
      const { data } = await apiClient.get<PresetPack[]>(`${API_URL}/flags/preset-packs`);
      return data;
    },

    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  });
};

export const useAddPresetPack = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (packId: string) => {
      const { data } = await apiClient.post<PresetPack>(`${API_URL}/flags/preset-packs/${packId}`);
      return data;
    },

    onSuccess: (_data, packId) => {
      queryClient.setQueryData<PresetPack[]>(["preset-packs"], (old) =>
        old?.map((pack) => (pack.id === packId ? { ...pack, isAdded: true } : pack)),
      );
      void queryClient.invalidateQueries({ queryKey: ["flags"] });
    },
  });
};
