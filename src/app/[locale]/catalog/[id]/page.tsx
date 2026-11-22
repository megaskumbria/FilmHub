import { MotionConfig } from "framer-motion";
import { MovieDetails } from "@/widgets";
import { MoviePageClient } from "./MoviePageClient";
import { MediaType } from "@/shared/stores/movie-catalog";
import { movieQueryOptions } from "@/shared/hooks/useMedia";
import { QueryClient } from "@tanstack/react-query";

interface Params {
  locale: string;
  id: string;
}

interface SearchParams {
  mediaType: MediaType;
}

interface Props {
  params: Promise<Params>;
  searchParams: Promise<SearchParams>;
}

export default async function MoviePage({ params, searchParams }: Props) {
  const { id, locale } = await params;
  const { mediaType } = await searchParams;

  const queryClient = new QueryClient();
  const movie = await queryClient.fetchQuery(movieQueryOptions(Number(id), mediaType, locale));

  if (!movie) return null;

  return (
    <MotionConfig reducedMotion="user">
      <main>
        <MoviePageClient movie={movie} />
        <MovieDetails movie={movie} />
      </main>
    </MotionConfig>
  );
}
