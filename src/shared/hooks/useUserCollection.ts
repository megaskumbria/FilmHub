import { queryOptions } from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "../constants/constants";
import { Collection } from "./useCollection";
import { type Media } from "../stores/movie-catalog";

export const useUserCollectionsQuery = (userId: string) =>
  queryOptions({
    queryKey: ["user-collections", userId],
    queryFn: async () => {
      const { data } = await axios.get<Collection[]>(`${API_URL}/user-collections/${userId}`);
      return data;
    },
  });

export const useUserCollectionMediaQuery = (collectionId: string, userId: string) =>
  queryOptions({
    queryKey: ["user-collections-items", collectionId, userId],
    queryFn: async () => {
      const { data } = await axios.get<Media[]>(
        `${API_URL}/user-collections/${userId}/items?collectionId=${collectionId}`,
      );
      return data;
    },
  });
