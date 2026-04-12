"use client";

import { IMovie } from "@/app/[locale]/movie-search/page";
import { Rating, FlagGroup, Title, Genres, Description } from "@/widgets/movie-card";
import { ISeries } from "@/widgets/movie-catalog-toolbar/ui/CategoryTabs";

export type BlockPlacement = "poster" | "hover" | "body";

interface CardBlocksMapProps {
  media: IMovie | ISeries;
  hoverHeight?: number;
  hasHover?: boolean;
  placement?: BlockPlacement;
  options?: Record<string, boolean>;
}

export const cardBlocksMap = {
  rating: ({ media }: CardBlocksMapProps) => <Rating rating={media.vote_average} />,

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
      title={media.title}
      yearOfRelease={new Date(media.release_date).getFullYear()}
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
