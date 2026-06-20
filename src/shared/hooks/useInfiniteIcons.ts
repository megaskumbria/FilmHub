import { useInfiniteQuery } from "@tanstack/react-query";
import { apiClient } from "../api/api-client";
import { API_URL } from "../constants/constants";

interface IIcon {
  id: string;
  iconName: string;
  style: "filled" | "outlined";
  svgContent: string;
  tags: string[];
  category: string | null;
}

interface IDataIcons {
  data: IIcon[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export const useInfiniteIcons = (limit: number) => {
  return useInfiniteQuery({
    queryKey: ["icons", limit],

    queryFn: async ({ pageParam = 1, signal }) => {
      const { data } = await apiClient.get<IDataIcons>(
        `${API_URL}/icons?page=${pageParam}&limit=${limit}`,
        { signal },
      );
      return data;
    },

    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage;
      if (page >= totalPages) return undefined;
      return page + 1;
    },
    initialPageParam: 1,
  });
};
