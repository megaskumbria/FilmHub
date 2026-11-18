import { infiniteQueryOptions, queryOptions, useQuery } from "@tanstack/react-query";
import { API_URL } from "../api/config";
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

export interface CollectionsFeedData {
  items: CollectionFeedItem[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

interface CollectionsFeedArgs {
  genreId?: string;
  sort?: string;
  quantity?: string;
  searchQuery?: string;
  token?: string;
  page?: number;
  limit?: number;
}

export const collectionsFeedQuery = ({
  genreId = "",
  sort = "",
  quantity = "",
  searchQuery = "",
  page = 1,
  limit = 20,
  token,
}: CollectionsFeedArgs = {}) =>
  queryOptions({
    queryKey: ["collections-feed", genreId, sort, quantity, searchQuery, page, limit],
    queryFn: async ({ queryKey, signal }) => {
      const [, genreId, sort, quantity, searchQuery, page, limit] = queryKey;

      const { data } = await apiClient.get<CollectionsFeedData>(
        `${API_URL}/collections-feed?genreId=${genreId}&sort=${sort}&quantity=${quantity}&searchQuery=${searchQuery}&page=${page}&limit=${limit}`,
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

export const infiniteCollectionsFeedQuery = ({
  genreId = "",
  sort = "",
  quantity = "",
  searchQuery = "",
  limit = 20,
  token,
}: CollectionsFeedArgs = {}) =>
  infiniteQueryOptions({
    queryKey: ["collections-feed", { genreId, sort, quantity, searchQuery, limit }],
    queryFn: async ({ pageParam, signal }) => {
      const { data } = await apiClient.get<CollectionsFeedData>(
        `${API_URL}/collections-feed?genreId=${genreId}&sort=${sort}&quantity=${quantity}&searchQuery=${searchQuery}&page=${pageParam}&limit=${limit}`,
        {
          signal,
          ...(token ? { headers: { Cookie: `accessToken=${token}` } } : {}),
        },
      );

      return data;
    },
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage;
      if (page >= totalPages) return undefined;
      return page + 1;
    },
    initialPageParam: 1,
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
