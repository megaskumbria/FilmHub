import { MovieCatalogToolbar, MovieGrid } from "@/widgets";
import axios from "axios";
import { API_URL } from "@/shared/constants/constants";

export interface IMovie {
  adult: boolean;
  backdrop_url: string;
  genres: string[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_url: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface IMovieData {
  page: number;
  total_pages: number;
  movies: IMovie[];
}

export default async function MovieSearchPage() {
  const response = await axios.get<IMovieData>(`${API_URL}/movies?page=1`);
  console.log(response.data);
  const movies = response.data.movies;

  return (
    <div className="max-w-[1640px] w-full mx-auto p-4 pt-16">
      <MovieCatalogToolbar />
      <MovieGrid initialMovies={movies} />
    </div>
  );
}
