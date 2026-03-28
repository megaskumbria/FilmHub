"use client";

import { IMovieCardData } from "@/shared/model/movies";
import { Rating, FlagGroup, Title, Genres, Description } from "@/widgets/movie-card";

export type BlockPlacement = "poster" | "hover" | "body";

interface CardBlocksMapProps {
  movie: IMovieCardData;
  hoverHeight?: number;
  hasHover?: boolean;
  placement?: BlockPlacement;
  options?: Record<string, boolean>;
}

export const cardBlocksMap = {
  rating: ({ movie }: CardBlocksMapProps) => <Rating rating={movie.rating} />,

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

  title: ({ movie, hoverHeight, hasHover, placement }: CardBlocksMapProps) => (
    <Title
      title={movie.title}
      yearOfRelease={movie.yearOfRelease}
      hoverHeight={hoverHeight}
      hasHover={hasHover}
      placement={placement}
    />
  ),

  genres: ({ movie, hoverHeight, hasHover, placement }: CardBlocksMapProps) => (
    <Genres
      genres={movie.genres}
      hoverHeight={hoverHeight}
      hasHover={hasHover}
      placement={placement}
    />
  ),

  description: ({ movie, hoverHeight, hasHover, placement }: CardBlocksMapProps) => (
    <Description
      description={movie.description}
      hoverHeight={hoverHeight}
      hasHover={hasHover}
      placement={placement}
    />
  ),
};
