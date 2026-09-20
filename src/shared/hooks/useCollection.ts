import { queryOptions, useMutation, useQueryClient } from "@tanstack/react-query";
import { API_URL } from "../constants/constants";
import type { CreateCollectionSchema } from "@/features/create-folder/model/create-collection-schema";
import { apiClient } from "../api/api-client";
import { type Media, type MediaType } from "../stores/movie-catalog";
import axios from "axios";

export interface Collection {
  id: string;
  collectionName: string;
  iconName: string;
  colorHex: string;
  isVisible: boolean;
  viewsCount: number;
  likesCount: number;
  posters: string[];

  hasMedia: boolean;
  isLiked: boolean;

  moviesCount: number;
  position: number;

  userId: string;
  updatedAt: string;
  createdAt: string;
}

interface CollectionQueryOptions {
  userId: string;
  isMyCollection: boolean;
  mediaId?: number;
  collectionId?: string;
  token?: string;
}

export const collectionQueryOptions = ({
  userId,
  isMyCollection,
  mediaId,
  collectionId,
  token,
}: CollectionQueryOptions) =>
  queryOptions({
    queryKey: ["collection", userId, isMyCollection, collectionId, mediaId],
    queryFn: async () => {
      const { data } = await apiClient.get<Collection[]>(
        `${API_URL}/collection/${userId}?mediaId=${mediaId}&is-my-collection=${isMyCollection}`,
        token ? { headers: { Cookie: `accessToken=${token}` } } : {},
      );
      return data;
    },
    staleTime: 1000 * 60 * 5,
  });

interface CollectionMediaQueryOptions {
  collectionId: string;
  userId: string;
  token?: string;
  searchQuery?: string;
}

export const collectionMediaQueryOptions = ({
  collectionId,
  userId,
  token,
  searchQuery,
}: CollectionMediaQueryOptions) =>
  queryOptions({
    queryKey: ["media-collection", userId, collectionId, searchQuery],
    queryFn: async () => {
      const { data: response } = await apiClient.get<Media[]>(
        `${API_URL}/collection/items/${userId}?collection-id=${collectionId}&search=${searchQuery}`,
        token ? { headers: { Cookie: `accessToken=${token}` } } : {},
      );
      return response;
    },
    staleTime: 1000 * 60 * 5,
  });

export const useCreateCollection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateCollectionSchema) => {
      const { data: response } = await apiClient.post<Collection>(
        `${API_URL}/collection/create`,
        data,
      );

      return response;
    },

    onSuccess: (newCollection) => {
      queryClient.setQueriesData<Collection[]>(
        { queryKey: ["collection", newCollection.userId] },
        (old) => [...(old ?? []), newCollection],
      );
      void queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
};

export const useEditCollection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: CreateCollectionSchema }) => {
      const { data: response } = await apiClient.patch<Collection>(
        `${API_URL}/collection/edit/${id}`,
        data,
      );

      return response;
    },

    onSuccess: (updatedCollection) => {
      queryClient.setQueriesData<Collection[]>(
        { queryKey: ["collection", updatedCollection.userId] },
        (old) => old?.map((c) => (c.id === updatedCollection.id ? updatedCollection : c)),
      );
    },
  });
};

export const useDeleteCollection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { data: response } = await apiClient.delete<Collection>(
        `${API_URL}/collection/delete/${id}`,
      );

      return response;
    },

    onSuccess: (_, id: string) => {
      queryClient.removeQueries({ queryKey: ["media-collection", id] });
      void queryClient.invalidateQueries({ queryKey: ["collection"] });
      void queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
};

interface AddMediaToCollectionArgs {
  collectionIds: string[];
  mediaId: number;
  mediaType: MediaType;
}

export const useAddMediaToCollection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ collectionIds, mediaId, mediaType }: AddMediaToCollectionArgs) => {
      return await apiClient.post(`${API_URL}/collection/add-item`, {
        mediaId,
        mediaType,
        collectionIds,
      });
    },

    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["media-collection"] });
      void queryClient.invalidateQueries({ queryKey: ["collection"] });
      void queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
};

interface DeleteMediaFromCollectionArgs {
  mediaIds: number[];
  collectionId: string;
}

export const useDeleteMediaFromCollection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ mediaIds, collectionId }: DeleteMediaFromCollectionArgs) => {
      return await apiClient.delete(`${API_URL}/collection/delete-item`, {
        data: { mediaIds, collectionId },
      });
    },

    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["media-collection"] });
      void queryClient.invalidateQueries({ queryKey: ["collection"] });
      void queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
};

interface ToggleVisibilityCollectionArgs {
  id: string;
  isVisible: boolean;
}

export const useToggleVisibilityCollection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, isVisible }: ToggleVisibilityCollectionArgs) => {
      return await apiClient.patch(`${API_URL}/collection/toggle-visibility/${id}`, {
        isVisible,
      });
    },

    onSuccess: (_, { id, isVisible }) => {
      queryClient.setQueriesData<Collection[]>({ queryKey: ["collection"] }, (old) =>
        old?.map((c) => (c.id === id ? { ...c, isVisible } : c)),
      );
    },
  });
};

export const useRecordCollectionView = () => {
  return useMutation({
    mutationFn: async (collectionId: string) => {
      return await axios.post(
        `${API_URL}/collection/record-view/${collectionId}`,
        {},
        { withCredentials: true },
      );
    },
  });
};

export const useToggleLikeCollection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (collectionId: string) => {
      return await apiClient.post(`${API_URL}/collection/toggle-like/${collectionId}`);
    },

    onMutate: async (collectionId: string) => {
      await queryClient.cancelQueries({ queryKey: ["collection"] });
      const previous = queryClient.getQueriesData<Collection[]>({ queryKey: ["collection"] });

      queryClient.setQueriesData<Collection[]>({ queryKey: ["collection"] }, (old) =>
        old?.map((c) =>
          c.id === collectionId ?
            { ...c, isLiked: !c.isLiked, likesCount: c.likesCount + (c.isLiked ? -1 : 1) }
          : c,
        ),
      );

      return { previous };
    },
  });
};
