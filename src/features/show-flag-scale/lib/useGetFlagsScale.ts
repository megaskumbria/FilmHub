import { useQuery, queryOptions } from "@tanstack/react-query";
import { apiClient } from "@/shared/api/api-client";
import { API_URL } from "@/shared/api/config";
import type { FlagData, FlagItem } from "@/shared/hooks";

export const FLAG_SCALE_QUERY_KEY = "flag-scale";

export const flagScaleQueryOptions = (scaleId: string) =>
  queryOptions({
    queryKey: [FLAG_SCALE_QUERY_KEY, scaleId],

    queryFn: async (): Promise<FlagItem[]> => {
      const { data } = await apiClient.get<FlagData>(`${API_URL}/scales/${scaleId}`);

      return data?.flags ?? [];
    },

    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

export const useGetFlagsScale = (scaleId: string) => useQuery(flagScaleQueryOptions(scaleId));
