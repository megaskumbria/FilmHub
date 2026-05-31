import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { API_URL } from "../constants/constants";
import { CreateCollectionSchema } from "@/features/create-folder/model/create-collection-schema";
import { apiClient } from "../api/api-client";
import { IMedia, MediaType } from "../stores/movie-catalog";

export interface ICollection {
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
      const { data } = await apiClient.get<ICollection[]>(
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
      const { data: response } = await apiClient.post<ICollection>(
        `${API_URL}/collection/create`,
        data,
      );

      return response;
    },
    onSuccess: (newCollection) => {
      queryClient.setQueriesData<ICollection[]>(
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
      const { data: response } = await apiClient.patch<ICollection>(
        `${API_URL}/collection/edit/${id}`,
        data,
      );

      return response;
    },
    onSuccess: () => void queryClient.invalidateQueries({ queryKey: ["collection"] }),
  });
};

export const useDeleteCollection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { data: response } = await apiClient.delete<ICollection>(
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

interface AddMediaToCollectionParams {
  collectionIds: string[];
  mediaId: number;
  mediaType: MediaType;
}

export const useAddMediaToCollection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ collectionIds, mediaId, mediaType }: AddMediaToCollectionParams) => {
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
      const { data: response } = await apiClient.get<IMedia[]>(
        `${API_URL}/collection/items/${collectionId}`,
      );
      return response;
    },
    staleTime: 1000 * 60 * 5,
    enabled: !!collectionId,
  });
};

interface DeleteMediaFromCollectionParams {
  mediaIds: number[];
  collectionId: string;
}

export const useDeleteMediaFromCollection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ mediaIds, collectionId }: DeleteMediaFromCollectionParams) => {
      return await apiClient.delete(`${API_URL}/collection/delete-item`, {
        data: { mediaIds, collectionId },
      });
    },

    onSuccess: (_, { collectionId, mediaIds }) => {
      queryClient.setQueryData<IMedia[]>(["media-collection", collectionId], (old) =>
        old?.filter((o) => !mediaIds.includes(o.id)),
      );
      void queryClient.invalidateQueries({ queryKey: ["collection"] });
    },
  });
};
