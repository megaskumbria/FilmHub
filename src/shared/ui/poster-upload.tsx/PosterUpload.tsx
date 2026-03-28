import { DragOverlay, MovieCardPlaceholder } from "@/widgets/movie-card-settings";
import { MovieCard } from "@/widgets/movie-card";
import { BlockOptions, useMovieCardLayout } from "@/shared/model/stores/movie-card-layout";
import { mockMovies } from "@/shared/model/movies";
import { useWindowFileDrag } from "@/shared/hooks";
import { RefObject, ChangeEvent, DragEvent } from "react";

interface Props {
  fileInputRef: RefObject<HTMLInputElement | null>;
  preview: string | null;
  handleFileInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleDrop: (e: DragEvent<HTMLDivElement>) => void;
  flagPreview?: boolean;
}

export const PosterUpload = ({
  fileInputRef,
  preview,
  handleFileInputChange,
  handleDrop,
  flagPreview = false,
}: Props) => {
  const isWindowDragOver = useWindowFileDrag();

  const { layout, blockOptions } = useMovieCardLayout();

  // Do cleanup
  const activeBlockOptions: BlockOptions =
    flagPreview ?
      {
        ...blockOptions,
        poster: {
          ...blockOptions?.poster,
          flags: { ...blockOptions?.poster?.flags, isPreview: true },
        },
        hover: {
          ...blockOptions?.hover,
          flags: { ...blockOptions?.hover?.flags, isPreview: true },
        },
        body: {
          ...blockOptions?.body,
          flags: { ...blockOptions?.body?.flags, isPreview: true },
        },
      }
    : blockOptions;

  return (
    <article
      className="flex flex-col group cursor-pointer w-full"
      onClick={() => fileInputRef.current?.click()}
    >
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        className="hidden"
        onChange={handleFileInputChange}
      />

      {preview && (
        <div
          className="relative rounded-xl"
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          <MovieCard
            key={mockMovies[0].id}
            movie={{ ...mockMovies[0], imgUrl: preview }}
            layout={layout}
            blockOptions={activeBlockOptions}
            shouldShowAddButton={false}
          />

          <DragOverlay visible={isWindowDragOver} />
        </div>
      )}

      {!preview && (
        <div className="relative" onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}>
          <MovieCardPlaceholder />
          <DragOverlay visible={isWindowDragOver} />
        </div>
      )}
    </article>
  );
};
