import { queryOptions } from "@tanstack/react-query";
import { API_URL } from "../constants/constants";
import axios from "axios";

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

export const collectionsFeedQuery = queryOptions({
  queryKey: ["collections-feed"],
  queryFn: async () => {
    const { data } = await axios.get<CollectionFeedItem[]>(`${API_URL}/collections-feed`);
    return data;
  },
  refetchOnWindowFocus: false,
  staleTime: 1000 * 60 * 60, // 1 hour
});
