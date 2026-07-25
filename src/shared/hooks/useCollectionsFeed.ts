import { queryOptions, useQuery } from "@tanstack/react-query";
import { API_URL } from "../constants/constants";
import axios from "axios";
import { type QuantitySortOption, type SortOption } from "@/features/feed-filter";

interface OwnerCollection {
  userId: string;
  username: string;
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
  genre?: string;
  sort?: SortOption;
  quantity?: QuantitySortOption;
  searchQuery?: string;
}

export const collectionsFeedQuery = ({
  genre = "",
  sort = "",
  quantity = "",
  searchQuery = "",
}: CollectionsFeedArgs = {}) =>
  queryOptions({
    queryKey: ["collections-feed", genre, sort, quantity, searchQuery],
    queryFn: async ({ queryKey, signal }) => {
      const [, genre, sort, quantity, searchQuery] = queryKey;

      const { data } = await axios.get<CollectionFeedItem[]>(
        `${API_URL}/collections-feed?genre=${genre}&sort=${sort}&quantity=${quantity}&searchQuery=${searchQuery}`,
        { signal },
      );

      return data;
    },
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60,
  });

interface FeedGenresResponse {
  genre: string;
  quantity: number;
}

export const useFeedGenres = () => {
  return useQuery({
    queryKey: ["feed-genres"],
    queryFn: async () => {
      const { data } = await axios.get<FeedGenresResponse[]>(`${API_URL}/collections-feed/genres`);
      return data;
    },
    staleTime: 1000 * 60 * 60,
  });
};
