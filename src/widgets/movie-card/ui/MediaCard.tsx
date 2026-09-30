"use client";

import Image from "next/image";
import { Checkbox, Popover, PopoverContent, PopoverTrigger, AddBookmarkButton } from "@/shared/ui";
import Link from "next/link";
import { useLocale } from "next-intl";
import { useRef, useState } from "react";
import type { BlockOptions, Layout } from "@/shared/stores/movie-card-layout";
import { type Media } from "@/shared/stores/movie-catalog";
import { renderBlocks } from "../lib/render-blocks";
import { AddMovieCollection, SetMediaFlags } from "@/features";
import { cn } from "@/shared/lib/utils";
import { useRequireAuth } from "@/features/auth";

export const POPOVER_MODE = {
  ADD_FLAG: "add-flag",
  ADD_COLLECTION: "add-collection",
  EDIT_COLLECTION: "edit-collection",
};
export type PopoverMode = (typeof POPOVER_MODE)[keyof typeof POPOVER_MODE];

interface Props {
  media: Media;
  layout: Layout;
  blockOptions: BlockOptions;

  shouldShowAddButton?: boolean;
  mode?: PopoverMode;
  cardWidth?: number;
  disableNavigation?: boolean;
  onCheckedChange?: (id: number, checked: boolean) => void;
  isChecked?: boolean;
  fillHeight?: boolean;
}

export const MediaCard = ({
  media,
  layout,
  blockOptions,
  shouldShowAddButton = true,
  mode,
  cardWidth = 290,
  disableNavigation = false,
  onCheckedChange,
  isChecked = false,
  fillHeight = false,
}: Props) => {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [hoverHeight, setHoverHeight] = useState(0);
  const hoverContentRef = useRef<HTMLDivElement | null>(null);

  const locale = useLocale();

  const {
    posterUrl,
    name,
    originalTitle,
    releaseDate,
    firstAirDate,
    id,
    mediaType,
    ratingImdb,
    voteAverage,
    originalName,
    title,
  } = media;

  const { poster, body, hover } = layout;

  const titleToDisplay = name || originalTitle || originalName || title || "Untitled";
  const yearOfRelease = new Date(releaseDate || firstAirDate).getFullYear();

  const mediaForBlocks = {
    ...media,
    titleToDisplay,
    yearOfRelease,
    ratingImdb,
    voteAverage,
  };

  const hasHover = hover.length > 0;

  const isEditMode = mode === POPOVER_MODE.EDIT_COLLECTION;

  const shouldAccessBorder = isEditMode && isChecked;
  const shouldShowAddPopover = shouldShowAddButton && mode && !isEditMode;

  const ensureAuth = useRequireAuth();

  const handleOpenChange = (open: boolean) => {
    if (open && !ensureAuth()) return;
    setPopoverOpen(open);
  };

  return (
    <article
      className={cn(
        "h-full w-full border rounded-xl relative transition-all duration-200 flex flex-col",
        shouldAccessBorder ? "border-accent/50 ring-2 ring-accent/30" : "border-border",
      )}
    >
      {isEditMode && (
        <Checkbox
          onCheckedChange={() => onCheckedChange?.(id, isChecked)}
          checked={isChecked}
          className="absolute size-5 top-2 left-2 z-10 border-border bg-surface transition-all duration-200 cursor-pointer"
        />
      )}

      <Link
        className={cn(fillHeight && "flex-1 min-h-0")}
        href={
          disableNavigation || isEditMode ? "" : `/${locale}/movies/${id}?mediaType=${mediaType}`
        }
      >
        <div
          className={cn(
            "group relative cursor-pointer overflow-hidden rounded-xl",
            fillHeight ? "h-full" : "aspect-2/3",
          )}
          onMouseEnter={() => {
            const contentHeight = hoverContentRef.current?.clientHeight || 0;
            setHoverHeight(contentHeight);
          }}
          onMouseLeave={() => setHoverHeight(0)}
        >
          {posterUrl && (
            <Image
              src={posterUrl}
              alt={titleToDisplay}
              width={cardWidth}
              height={435}
              className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-110"
            />
          )}

          <div className="absolute inset-0 flex flex-col gap-1.5 justify-end p-3 z-20">
            {renderBlocks({
              keys: poster,
              media: mediaForBlocks,
              hoverHeight,
              hasHover,
              placement: "poster",
              blockOptions,
            })}
          </div>

          <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div
              ref={hoverContentRef}
              className="flex flex-col gap-1.5 absolute bottom-0 left-0 right-0 p-3 pt-0 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 z-20"
            >
              {renderBlocks({
                keys: hover,
                media: mediaForBlocks,
                hoverHeight,
                hasHover,
                placement: "hover",
                blockOptions,
              })}
            </div>
          </div>
        </div>
      </Link>

      {shouldShowAddPopover && (
        <Popover open={popoverOpen} onOpenChange={handleOpenChange}>
          <PopoverTrigger asChild>
            <AddBookmarkButton />
          </PopoverTrigger>

          <PopoverContent
            side="bottom"
            className="bg-surface border-border/60 rounded-2xl shadow-popover p-0 w-full h-full"
          >
            {mode === POPOVER_MODE.ADD_FLAG && (
              <SetMediaFlags mediaId={id} popoverOpen={popoverOpen} />
            )}
            {mode === POPOVER_MODE.ADD_COLLECTION && (
              <AddMovieCollection popoverOpen={popoverOpen} mediaId={id} mediaType={mediaType} />
            )}
          </PopoverContent>
        </Popover>
      )}

      {isEditMode && (
        <div
          className="absolute inset-0 z-20 cursor-pointer rounded-xl"
          onClick={() => onCheckedChange?.(id, !isChecked)}
        />
      )}

      {body.length > 0 && (
        <div className="p-3 flex flex-col gap-1.5">
          {renderBlocks({
            keys: body,
            media: mediaForBlocks,
            blockOptions,
            placement: "body",
          })}
        </div>
      )}
    </article>
  );
};
