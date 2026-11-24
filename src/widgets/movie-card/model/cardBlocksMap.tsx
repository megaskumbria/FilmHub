"use client";

import { Rating, FlagGroup, Title, Genres, Description } from "@/widgets/movie-card";
import { Media } from "@/shared/stores/movie-catalog";

export type BlockPlacement = "poster" | "hover" | "body";

interface CardBlocksMapProps {
  media: Media;
  hoverHeight?: number;
  hasHover?: boolean;
  placement?: BlockPlacement;
  options?: Record<string, boolean>;
}

export const cardBlocksMap = {
  rating: ({ media }: CardBlocksMapProps) => (
    <Rating ratingImdb={media.ratingImdb} voteAverage={media.voteAverage} />
  ),

  flags: ({ media, hoverHeight, hasHover, placement, options }: CardBlocksMapProps) => {
    if (options?.showFlags === false) return null;

    const flagsData = media.mediaFlags ?? [];
    const hasFlags = flagsData.some((scale) => scale.flags.length > 0);

    if (!options?.isPreview && !hasFlags) return null;

    return (
      <FlagGroup
        hoverHeight={hoverHeight}
        hasHover={hasHover}
        placement={placement}
        showScales={options?.showScales}
        showLevelDots={options?.showLevelDots}
        isPreview={options?.isPreview}
        flagsData={flagsData}
      />
    );
  },

  title: ({ media, hoverHeight, hasHover, placement }: CardBlocksMapProps) => (
    <Title
      titleToDisplay={media.titleToDisplay ?? ""}
      yearOfRelease={media.yearOfRelease ?? Number.NaN}
      hoverHeight={hoverHeight}
      hasHover={hasHover}
      placement={placement}
    />
  ),

  genres: ({ media, hoverHeight, hasHover, placement }: CardBlocksMapProps) => (
    <Genres
      genres={media.genres}
      hoverHeight={hoverHeight}
      hasHover={hasHover}
      placement={placement}
    />
  ),

  description: ({ media, hoverHeight, hasHover, placement }: CardBlocksMapProps) => (
    <Description
      description={media.overview}
      hoverHeight={hoverHeight}
      hasHover={hasHover}
      placement={placement}
    />
  ),
};
