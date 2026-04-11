"use client";

import { IMovie } from "@/app/[locale]/movie-search/page";
import { Rating, FlagGroup, Title, Genres, Description } from "@/widgets/movie-card";

export type BlockPlacement = "poster" | "hover" | "body";

interface CardBlocksMapProps {
  movie: IMovie;
  hoverHeight?: number;
  hasHover?: boolean;
  placement?: BlockPlacement;
  options?: Record<string, boolean>;
}

export const cardBlocksMap = {
  rating: ({ movie }: CardBlocksMapProps) => <Rating rating={movie.vote_average} />,

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
      yearOfRelease={new Date(movie.release_date).getFullYear()}
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
      description={movie.overview}
      hoverHeight={hoverHeight}
      hasHover={hasHover}
      placement={placement}
    />
  ),
};
