import { MovieCatalogToolbar, MovieGrid } from "@/widgets";
import axios from "axios";
import { API_URL } from "@/shared/constants/constants";
import { IMediaData } from "@/shared/model/stores/movie-catalog";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

export default async function MovieSearchPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: ["media", "movie", ""],
    queryFn: async () => {
      const { data } = await axios.get<IMediaData>(`${API_URL}/movies?type=movie&page=1`);
      return data;
    },
    initialPageParam: 1,
  });

  /*
   * prefetchInfiniteQuery - метод, который делает запросы на сервере и ложит в cache
   * queryKey: ["media", "movie"] - это переменная с ключём под которым лежит запрос
   * React Query хранит всё вот так:
   * {
   *   "media-movie": { data },
   *   "media-tv": { data },
   *   "media-cartoon": { data }
   * }
   * "movie" → один кеш
   * "tv" → другой кеш
   * "cartoon" → третий кеш
   * При попадании в квери запрос существующего квери ключа, данные будут взяты из кеша
   *
   * dehydrate(queryClient) - превращает кеш в JSON
   */

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="max-w-[1640px] w-full mx-auto p-4 pt-16">
        <MovieCatalogToolbar />
        <MovieGrid />
      </div>
    </HydrationBoundary>
  );
}
