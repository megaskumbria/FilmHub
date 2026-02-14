import { IMovieCardData } from "@/shared/model/movies";
import { Rating, Flags, Title, Genres, Description } from "@/widgets/movie-card";

interface BlocksRegistryProps {
  movie: IMovieCardData;
  hoverHeight?: number;
}

export const blocksRegistry = {
  rating: ({ movie }: BlocksRegistryProps) => <Rating rating={movie.rating} />,
  flags: ({ hoverHeight }: BlocksRegistryProps) => <Flags hoverHeight={hoverHeight} />,
  title: ({ movie }: BlocksRegistryProps) => (
    <Title title={movie.title} yearOfRelease={movie.yearOfRelease} />
  ),
  genres: ({ movie }: BlocksRegistryProps) => <Genres genres={movie.genres} />,
  description: ({ movie }: BlocksRegistryProps) => <Description description={movie.description} />,
};
