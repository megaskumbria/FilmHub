"use client";

import Image from "next/image";
import { cardBlocksMap } from "@/widgets/movie-card";
import { Button, Popover, PopoverContent, PopoverTrigger } from "@/shared/ui";
import Link from "next/link";
import { Plus } from "lucide-react";
import { IMovieCardData } from "@/shared/model/movies";
import { Fragment } from "react/jsx-runtime";
import { useRef, useState } from "react";
import { BlockPlacement } from "../model/cardBlocksMap";
import type { BlockOptions, Layout } from "@/shared/model/stores/movie-card-layout";
import { BlockKey } from "@/shared/types/movie-card-blocks";
import { AddFlagPopover } from "@/widgets";

export type PopoverMode = "add-flag" | "add-collection";

interface MovieCardProps {
  movie: IMovieCardData;
  layout: Layout;
  blockOptions: BlockOptions;
  shouldShowAddButton?: boolean;
  mode?: PopoverMode;
}

export const MovieCard = ({
  movie,
  layout,
  blockOptions,
  shouldShowAddButton = true,
  mode,
}: MovieCardProps) => {
  const [hoverHeight, setHoverHeight] = useState(0);
  const hoverContentRef = useRef<HTMLDivElement | null>(null);

  const { imgUrl, title } = movie;
  const { poster, body, hover } = layout;

  const hasHover = hover.length > 0;

  return (
    <article className="max-w-[290px] border border-border rounded-xl relative">
      <Link href={`/movies/${movie.id}`}>
        <div
          className="group relative aspect-2/3 cursor-pointer overflow-hidden rounded-xl"
          onMouseEnter={() => {
            const contentHeight = hoverContentRef.current?.clientHeight || 0;
            setHoverHeight(contentHeight);
          }}
          onMouseLeave={() => setHoverHeight(0)}
        >
          <Image
            src={imgUrl}
            alt={title}
            width={290}
            height={435}
            className="h-full object-cover rounded-xl transition-transform duration-300 ease-out group-hover:scale-110"
          />

          <div className="absolute inset-0 flex flex-col gap-1.5 justify-end p-3 z-20">
            {renderBlocks({
              keys: poster,
              movie,
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
                movie,
                hoverHeight,
                hasHover,
                placement: "hover",
                blockOptions,
              })}
            </div>
          </div>
        </div>
      </Link>

      {shouldShowAddButton && mode && (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="rounded"
              className="absolute top-2 right-2 size-8 text-foreground z-30"
            >
              <Plus className="size-4" />
            </Button>
          </PopoverTrigger>

          <PopoverContent>
            <AddFlagPopover mode={mode} />
          </PopoverContent>
        </Popover>
      )}

      {body.length > 0 && (
        <div className="p-3 flex flex-col gap-1.5">
          {renderBlocks({ keys: body, movie, blockOptions, placement: "body" })}
        </div>
      )}
    </article>
  );
};

interface RenderBlocksProps {
  keys: BlockKey[];
  movie: IMovieCardData;
  hoverHeight?: number;
  hasHover?: boolean;
  placement?: BlockPlacement;
  blockOptions?: BlockOptions;
}

const renderBlocks = ({
  keys,
  movie,
  hoverHeight,
  hasHover,
  placement,
  blockOptions,
}: RenderBlocksProps) => {
  return keys.map((key) => {
    const block = cardBlocksMap[key];

    const options = placement ? blockOptions?.[placement]?.[key] : undefined;

    return (
      <Fragment key={key}>
        {block({
          movie,
          hoverHeight,
          hasHover,
          placement,
          options,
        })}
      </Fragment>
    );
  });
};
