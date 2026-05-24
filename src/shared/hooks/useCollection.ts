import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { API_URL } from "../constants/constants";
import { CreateCollectionSchema } from "@/features/create-folder/model/create-collection-schema";
import { apiClient } from "../api/api-client";
import { IMedia } from "../stores/movie-catalog";

export interface ICollection {
  id: string;
  collectionName: string;
  iconName: string;
  colorHex: string;
  isVisible: boolean;
  posters: string[];

  position: number;

  userId: string;
  updatedAt: string;
  createdAt: string;
}

// export interface IMovie {
//   tmdbId: number;
//   title: string;
//   originalTitle: string;
//   posterPath: string;
//   backdropPath: string | null;
//   overview: string;
//   releaseYear: number;
//   ratingTmdb: number;
//   ratingImdb: number;
//   imdbId: string | null;
//   popularity: number;
//   voteCount: number;
//   originalLanguage: string;
//   durationMinutes: number | null;
//   mediaType: string;
//   genres: string[];

//   tmdbId          Int     @id @map("tmdb_id")
// title           String
// originalTitle   String  @map("original_title")
// posterPath      String  @map("poster_path")
// backdropPath    String? @map("backdrop_path")
// overview        String
// releaseYear     Int     @map("release_year")
// ratingTmdb      Float   @map("rating_tmdb")
// ratingImdb      Float   @map("rating_imdb")
// imdbId          String? @map("imdb_id")
// popularity      Float   @default(0) @map("popularity")
// voteCount       Int     @default(0) @map("vote_count")
// originalLanguage String @map("original_language")
// durationMinutes Int?    @map("duration_minutes")
// mediaType       String  @map("media_type")
// genres          String[]
// }

export const useCollection = (userId: string) => {
  return useQuery({
    queryKey: ["collection", userId],
    queryFn: async () => {
      const { data } = await apiClient.get<ICollection[]>(`${API_URL}/collection`);
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
    onSuccess: () => void queryClient.invalidateQueries({ queryKey: ["collection"] }),
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
    onSuccess: () => void queryClient.invalidateQueries({ queryKey: ["collection"] }),
  });
};

/**
 * mutationFn - Это функция которая изменяет данные
 * invalidateQueries - Данные с ключом collections устарели, нужно заново их запросить
 * Когда я создаю новую коллекцию, старый кеш уже неактуален поэтому invalidate запрашивает новые данные
 */

export const useAddMediaToCollection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ collectionId, mediaId }: { collectionId: string; mediaId: number }) => {
      const { data: response } = await apiClient.post<void>(
        `${API_URL}/collection/add-item/${collectionId}`,
        { mediaId },
      );

      return response;
    },
    onSuccess: () => void queryClient.invalidateQueries({ queryKey: ["collection"] }),
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
  });
};
