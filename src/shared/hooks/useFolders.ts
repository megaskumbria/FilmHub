import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { API_URL } from "../constants/constants";
import { CreateFolderSchema } from "@/features/create-folder/model/create-folder-schema";
import { apiClient } from "../api/api-client";

export interface IFolder {
  id: string;
  folderName: string;
  iconName: string;
  colorHex: string;
  isVisible: boolean;
  posters: string[];

  position: number;

  userId: string;
  updatedAt: string;
  createdAt: string;
}

export const useFolders = (userId: string) => {
  return useQuery({
    queryKey: ["folders", userId],
    queryFn: async () => {
      const { data } = await apiClient.get<IFolder[]>(`${API_URL}/movie-folders`);
      return data;
    },
    staleTime: 1000 * 60 * 5,
    enabled: !!userId,
  });
};

export const useCreateFolder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateFolderSchema) => {
      const { data: response } = await apiClient.post<IFolder>(
        `${API_URL}/movie-folders/create`,
        data,
      );

      return response;
    },
    onSuccess: () => void queryClient.invalidateQueries({ queryKey: ["folders"] }),
  });
};

export const useEditFolder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: CreateFolderSchema }) => {
      const { data: response } = await apiClient.patch<IFolder>(
        `${API_URL}/movie-folders/edit/${id}`,
        data,
      );

      return response;
    },
    onSuccess: () => void queryClient.invalidateQueries({ queryKey: ["folders"] }),
  });
};

export const useDeleteFolder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { data: response } = await apiClient.delete<IFolder>(
        `${API_URL}/movie-folders/delete/${id}`,
      );

      return response;
    },
    onSuccess: () => void queryClient.invalidateQueries({ queryKey: ["folders"] }),
  });
};

/**
 * mutationFn - Это функция которая изменяет данные
 * invalidateQueries - Данные с ключом folders устарели, нужно заново их запросить
 * Когда я создаю новую папку, старый кеш уже неактуален поэтому invalidate запрашивает новые данные
 */

export const useAddMovieToFolder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ folderId, movieId }: { folderId: string; movieId: string }) => {
      const { data: response } = await apiClient.post<void>(
        `${API_URL}/movie-folders/add-movie-to-folder/${folderId}`,
        { movieId },
      );

      return response;
    },
    onSuccess: () => void queryClient.invalidateQueries({ queryKey: ["folders"] }),
  });
};
