"use client";

import { Rating, FlagGroup, Title, Genres, Description } from "@/widgets/movie-card";
import { IMedia } from "@/shared/model/stores/movie-catalog";

export type BlockPlacement = "poster" | "hover" | "body";

interface CardBlocksMapProps {
  media: IMedia;
  hoverHeight?: number;
  hasHover?: boolean;
  placement?: BlockPlacement;
  options?: Record<string, boolean>;
}

export const cardBlocksMap = {
  rating: ({ media }: CardBlocksMapProps) => (
    <Rating rating_imdb={media.rating_imdb} vote_average={media.vote_average} />
  ),

  flags: ({ hoverHeight, hasHover, placement, options }: CardBlocksMapProps) => {
    if (options?.showFlags === false) return null;

    return (
      <FlagGroup
        hoverHeight={hoverHeight}
        hasHover={hasHover}
        placement={placement}
        showCategories={options?.showCategories}
        isPreview={options?.isPreview}
      />
    );
  },

  title: ({ media, hoverHeight, hasHover, placement }: CardBlocksMapProps) => (
    <Title
      titleToDisplay={media.title}
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
