"use client";

import Image from "next/image";
import { blocksRegistry } from "@/widgets/movie-card";
import { Button } from "@/shared/ui";
import { Plus } from "lucide-react";
import { IMovieCardData } from "@/shared/model/movies";
import { Fragment } from "react/jsx-runtime";
import { useRef, useState } from "react";

type BlockKey = keyof typeof blocksRegistry;

type Layout = {
  poster: BlockKey[];
  body: BlockKey[];
  hover: BlockKey[];
};

interface MovieCardProps {
  movie: IMovieCardData;
  layout: Layout;
}

export const MovieCard = ({ movie, layout }: MovieCardProps) => {
  const [hoverHeight, setHoverHeight] = useState(0);
  const hoverContentRef = useRef<HTMLDivElement | null>(null);

  const { imgUrl, title } = movie;
  const { poster, body, hover } = layout;

  const hasHover = hover.length > 0;

  return (
    <article className="max-w-[290px] border border-border rounded-xl">
      <div
        className="group relative aspect-2/3 cursor-pointer overflow-hidden rounded-xl"
        onMouseEnter={() => {
          const contentHeight = hoverContentRef.current?.clientHeight || 0;
          setHoverHeight(contentHeight);
        }}
        onMouseLeave={() => {
          setHoverHeight(0);
        }}
      >
        <Image
          src={imgUrl}
          alt={title}
          width={290}
          height={435}
          className="h-full object-cover rounded-xl transition-transform duration-300 ease-out group-hover:scale-110"
        />

        {renderBlocks({ keys: poster, movie, hoverHeight, hasHover })}

        <div
          ref={hoverContentRef}
          className="absolute inset-0 bg-linear-to-t from-black/90 via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out pointer-events-none group-hover:pointer-events-auto"
        >
          <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 ease-out">
            {renderBlocks({ keys: hover, movie, hoverHeight })}
          </div>
        </div>

        <Button className="border border-border/60 absolute top-2 right-2 size-8 rounded-full bg-background/80 text-foreground hover:bg-accent shadow-md transition-colors z-20">
          <Plus className="size-4" />
        </Button>
      </div>

      {body.length > 0 && <div className="p-3">{renderBlocks({ keys: body, movie })}</div>}
    </article>
  );
};

interface RenderBlocksProps {
  keys: BlockKey[];
  movie: IMovieCardData;
  hoverHeight?: number;
  hasHover?: boolean;
}

const renderBlocks = ({ keys, movie, hoverHeight, hasHover }: RenderBlocksProps) => {
  return keys.map((key) => {
    const block = blocksRegistry[key];
    return <Fragment key={key}>{block({ movie, hoverHeight, hasHover })}</Fragment>;
  });
};
