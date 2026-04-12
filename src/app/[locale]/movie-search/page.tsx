import { MovieCatalogToolbar, MovieGrid } from "@/widgets";
import axios from "axios";
import { API_URL } from "@/shared/constants/constants";
import { IMediaData } from "@/shared/model/stores/movie-catalog";

export default async function MovieSearchPage() {
  const response = await axios.get<IMediaData>(`${API_URL}/media?type=movie&page=1`);
  const mediaData = response.data.media;

  return (
    <div className="max-w-[1640px] w-full mx-auto p-4 pt-16">
      <MovieCatalogToolbar />
      <MovieGrid initialMedia={mediaData} />
    </div>
  );
}
