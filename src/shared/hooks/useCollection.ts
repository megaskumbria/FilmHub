import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { API_URL } from "../constants/constants";
import { CreateCollectionSchema } from "@/features/create-folder/model/create-collection-schema";
import { apiClient } from "../api/api-client";
import { Media, MediaType } from "../stores/movie-catalog";

export interface Collection {
  id: string;
  collectionName: string;
  iconName: string;
  colorHex: string;
  isVisible: boolean;
  posters: string[];

  hasMedia: boolean;
  mediaCount: number;
  position: number;

  userId: string;
  updatedAt: string;
  createdAt: string;
}

export const useCollection = (userId: string, mediaId?: number) => {
  return useQuery({
    queryKey: ["collection", userId, mediaId],

    queryFn: async () => {
      const { data } = await apiClient.get<Collection[]>(
        `${API_URL}/collection?mediaId=${mediaId}`,
      );
      return data;
    },

    staleTime: 1000 * 60 * 5,
    enabled: !!userId,
  });
};

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

    onSuccess: (_, { collectionIds }) => {
      collectionIds.forEach(
        (id) => void queryClient.invalidateQueries({ queryKey: ["media-collection", id] }),
      );
      void queryClient.invalidateQueries({ queryKey: ["collection"] });
    },
  });
};

export const useGetMediaCollection = (collectionId: string) => {
  return useQuery({
    queryKey: ["media-collection", collectionId],

    queryFn: async () => {
      const { data: response } = await apiClient.get<Media[]>(
        `${API_URL}/collection/items/${collectionId}`,
      );
      return response;
    },

    staleTime: 1000 * 60 * 5,
    enabled: !!collectionId,
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

    onSuccess: (_, { collectionId, mediaIds }) => {
      queryClient.setQueryData<Media[]>(["media-collection", collectionId], (old) =>
        old?.filter((o) => !mediaIds.includes(o.id)),
      );
      void queryClient.invalidateQueries({ queryKey: ["collection"] });
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
