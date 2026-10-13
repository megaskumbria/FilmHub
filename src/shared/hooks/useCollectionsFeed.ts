import { queryOptions, useQuery } from "@tanstack/react-query";
import { API_URL } from "../api/config";
import { type QuantitySortOption, type SortOption } from "@/features/feed-filter";
import { apiClient } from "../api/api-client";

interface OwnerCollection {
  userId: string;
  nickname: string;
  avatarUrl: string | null;
}

export interface CollectionFeedItem {
  id: string;
  collectionName: string;
  moviesCount: number;
  viewsCount: number;
  likesCount: number;
  rating: number;
  genres: string[];
  previewPosters: string[];
  owner: OwnerCollection;
}

interface CollectionsFeedArgs {
  genreId?: string;
  sort?: SortOption;
  quantity?: QuantitySortOption;
  searchQuery?: string;
  token?: string;
}

export const collectionsFeedQuery = ({
  genreId = "",
  sort = "",
  quantity = "",
  searchQuery = "",
  token,
}: CollectionsFeedArgs = {}) =>
  queryOptions({
    queryKey: ["collections-feed", genreId, sort, quantity, searchQuery],
    queryFn: async ({ queryKey, signal }) => {
      const [, genreId, sort, quantity, searchQuery] = queryKey;

      const { data } = await apiClient.get<CollectionFeedItem[]>(
        `${API_URL}/collections-feed?genreId=${genreId}&sort=${sort}&quantity=${quantity}&searchQuery=${searchQuery}`,
        {
          signal,
          ...(token ? { headers: { Cookie: `accessToken=${token}` } } : {}),
        },
      );

      return data;
    },
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60,
  });

interface FeedGenresResponse {
  genre: string;
  quantity: number;
  id: string;
}

export const useFeedGenres = () => {
  return useQuery({
    queryKey: ["feed-genres"],
    queryFn: async () => {
      const { data } = await apiClient.get<FeedGenresResponse[]>(
        `${API_URL}/collections-feed/genres`,
      );
      return data;
    },
    staleTime: 1000 * 60 * 60,
  });
};
