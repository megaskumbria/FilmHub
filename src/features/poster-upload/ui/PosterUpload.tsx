import { MovieCardPlaceholder } from "@/widgets/movie-card-settings";
import { MediaCard } from "@/widgets";
import { BlockOptions, useMovieCardLayout } from "@/shared/stores/movie-card-layout";
import { Media } from "@/shared/stores/movie-catalog";

interface Props {
  disableNavigation?: boolean;
  media: Media | null;
  flagPreview?: boolean;
}

export const PosterUpload = ({ flagPreview = false, disableNavigation = false, media }: Props) => {
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

  const shouldShowPreview = Boolean(media);

  return (
    <article className="flex flex-col w-full h-full">
      {shouldShowPreview && (
        <div className="h-full">
          <MediaCard
            layout={layout}
            blockOptions={activeBlockOptions}
            shouldShowAddButton={false}
            disableNavigation={disableNavigation}
            media={media!}
            key={media!.id}
            fillHeight
          />
        </div>
      )}

      {!shouldShowPreview && (
        <div className="relative w-full">
          <MovieCardPlaceholder />
        </div>
      )}
    </article>
  );
};
