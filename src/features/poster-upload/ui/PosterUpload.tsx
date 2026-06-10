import { DragOverlay, MovieCardPlaceholder } from "@/widgets/movie-card-settings";
import { MediaCard } from "@/widgets/movie-card";
import { BlockOptions, useMovieCardLayout } from "@/shared/stores/movie-card-layout";
import { useWindowFileDrag } from "@/shared/hooks";
import { RefObject, ChangeEvent, DragEvent } from "react";
import { plugMedia } from "../model/plugMedia";

interface Props {
  fileInputRef: RefObject<HTMLInputElement | null>;
  preview: string | null;
  handleFileInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleDrop: (e: DragEvent<HTMLDivElement>) => void;
  flagPreview?: boolean;
  disableNavigation?: boolean;
}

export const PosterUpload = ({
  fileInputRef,
  preview,
  handleFileInputChange,
  handleDrop,
  flagPreview = false,
  disableNavigation = false,
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

  const media = preview ? { ...plugMedia, posterUrl: preview } : null;

  const hasPreview = Boolean(preview);

  return (
    <article
      className="flex flex-col group cursor-pointer w-full shrink-0"
      onClick={() => fileInputRef.current?.click()}
    >
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        className="hidden"
        onChange={handleFileInputChange}
      />

      {hasPreview && media && (
        <div
          className="relative rounded-xl"
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          <MediaCard
            layout={layout}
            blockOptions={activeBlockOptions}
            shouldShowAddButton={false}
            disableNavigation={disableNavigation}
            media={media}
            key={media.id}
          />

          <DragOverlay visible={isWindowDragOver} />
        </div>
      )}

      {!hasPreview && (
        <div className="relative w-full" onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}>
          <MovieCardPlaceholder />
          <DragOverlay visible={isWindowDragOver} />
        </div>
      )}
    </article>
  );
};
