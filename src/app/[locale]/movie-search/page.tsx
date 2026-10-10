import { MovieCatalogToolbar, MovieGrid } from "@/widgets";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { infiniteMediaQueryOptions } from "@/shared/hooks";

export default async function MovieSearchPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery(
    infiniteMediaQueryOptions({
      category: "all",
      searchQuery: "",
      selectedGenre: "",
      selectedSort: "",
      selectedYear: "",
      selectedCountry: "",
    }),
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="max-w-410 w-full mx-auto p-4 pt-16">
        <MovieCatalogToolbar />
        <MovieGrid />
      </div>
    </HydrationBoundary>
  );
}
