import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { API_URL } from "../constants/constants";
import { CreateFolderSchema } from "@/features/create-folder/model/create-folder-schema";
import { apiClient } from "../api/api-client";

export interface IFolder {
  id: number;
  name: string;
  icon: string;
  color: string;
}

export const useFolders = (userId: string) => {
  return useQuery({
    queryKey: ["folders", userId],
    queryFn: async () => {
      const { data } = await apiClient.get<IFolder[]>(`${API_URL}/movie-folders/${userId}`);
      return data;
    },
    staleTime: 1000 * 60 * 5,
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

/**
 * mutationFn - Это функция которая изменяет данные
 * invalidateQueries - Данные с ключом folders устарели, нужно заново их запросить
 * Когда я создаю новую папку, старый кеш уже неактуален поэтому invalidate запрашивает новые данные
 */
