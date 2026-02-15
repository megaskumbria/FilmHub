import { IMovieCardData } from "@/shared/model/movies";
import { Rating, Flags, Title, Genres, Description } from "@/widgets/movie-card";

interface BlocksRegistryProps {
  movie: IMovieCardData;
  hoverHeight?: number;
  hasHover?: boolean;
}

export const blocksRegistry = {
  rating: ({ movie }: BlocksRegistryProps) => <Rating rating={movie.rating} />,
  flags: ({ hoverHeight, hasHover }: BlocksRegistryProps) => (
    <Flags hoverHeight={hoverHeight} hasHover={hasHover} />
  ),
  title: ({ movie }: BlocksRegistryProps) => (
    <Title title={movie.title} yearOfRelease={movie.yearOfRelease} />
  ),
  genres: ({ movie }: BlocksRegistryProps) => <Genres genres={movie.genres} />,
  description: ({ movie }: BlocksRegistryProps) => <Description description={movie.description} />,
};
