import { useInfiniteQuery } from "@tanstack/react-query";
import { apiClient } from "../api/api-client";
import { API_URL } from "../api/config";

interface Icon {
  id: string;
  iconName: string;
  style: "filled" | "outlined";
  svgContent: string;
  tags: string[];
  category: string | null;
}

interface DataIcons {
  data: Icon[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export const useInfiniteIcons = (limit: number, searchQuery?: string) => {
  return useInfiniteQuery({
    queryKey: ["icons", limit, searchQuery],

    queryFn: async ({ pageParam = 1, signal }) => {
      const { data } = await apiClient.get<DataIcons>(
        `${API_URL}/icons?page=${pageParam}&limit=${limit}&search=${searchQuery}`,
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
