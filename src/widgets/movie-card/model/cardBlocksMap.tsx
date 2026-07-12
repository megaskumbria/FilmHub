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

    return (
      <FlagGroup
        hoverHeight={hoverHeight}
        hasHover={hasHover}
        placement={placement}
        showCategories={options?.showCategories}
        isPreview={options?.isPreview}
        flagsData={media.mediaFlags ?? []}
      />
    );
  },

  title: ({ media, hoverHeight, hasHover, placement }: CardBlocksMapProps) => (
    <Title
      titleToDisplay={media.titleToDisplay}
      yearOfRelease={media.yearOfRelease}
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
