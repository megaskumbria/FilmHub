import { MovieCatalogToolbar, MovieGrid } from "@/widgets";
import axios from "axios";
import { API_URL } from "@/shared/constants/constants";
import { MediaData } from "@/shared/stores/movie-catalog";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

export default async function MovieSearchPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    // TODO thinking how to write cleanly
    queryKey: ["media", "all", "", "", "", "", ""],
    queryFn: async () => {
      const { data } = await axios.get<MediaData>(`${API_URL}/movies?type=movie&page=1`);
      return data;
    },
    initialPageParam: 1,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="max-w-[1640px] w-full mx-auto p-4 pt-16">
        <MovieCatalogToolbar />
        {/* <MovieGrid data={data ?? { page: 1, totalPages: 1, media: [] }} /> */}
        <MovieGrid />
      </div>
    </HydrationBoundary>
  );
}
