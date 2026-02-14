import { IMovieCardData } from "@/shared/model/movies";
import { Rating, Flags, Title, Genres, Description } from "@/widgets/movie-card";

export const blocksRegistry = {
  rating: (movie: IMovieCardData) => <Rating rating={movie.rating} />,
  flags: () => <Flags />,
  title: (movie: IMovieCardData) => (
    <Title title={movie.title} yearOfRelease={movie.yearOfRelease} />
  ),
  genres: (movie: IMovieCardData) => <Genres genres={movie.genres} />,
  description: (movie: IMovieCardData) => <Description description={movie.description} />,
};
