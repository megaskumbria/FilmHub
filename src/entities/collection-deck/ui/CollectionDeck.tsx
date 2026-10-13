"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/shared/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui";
import { IconStarFilled, IconEye, IconHeartFilled } from "@tabler/icons-react";
import { motion } from "framer-motion";
import { StackPoster } from "@/widgets";
import { CollectionFeedItem } from "@/shared/hooks/useCollectionsFeed";
import { getAvatarColor } from "@/shared/lib";

const CARD_W = 220;
const CARD_H = Math.round(CARD_W * (3 / 2));

const STACK_RESERVE_X = 28;
const STACK_RESERVE_Y = 24;
const TOP_REVEAL_BACK = 10;
const TOP_REVEAL_MID = 6;

const restingPositions = [
  { x: 0, y: 0, rotate: 0 },
  { x: -6, y: -TOP_REVEAL_MID, rotate: -1.5 },
  { x: 6, y: -TOP_REVEAL_BACK, rotate: 3 },
];

const hoveredPositions = [
  { x: 0, y: -10, rotate: 0 },
  { x: 42, y: 8, rotate: 8 },
  { x: -36, y: 12, rotate: -8 },
];

interface Props {
  collection: CollectionFeedItem;
}

export const CollectionDeck = ({ collection }: Props) => {
  const [hovered, setHovered] = useState(false);

  const {
    collectionName,
    genres,
    rating,
    viewsCount,
    likesCount,
    previewPosters,
    moviesCount,
    id,
  } = collection;
  const { nickname, avatarUrl, userId } = collection.owner;

  const positions = hovered ? hoveredPositions : restingPositions;

  const stageWidth = CARD_W + STACK_RESERVE_X * 2;
  const stageHeight = CARD_H + STACK_RESERVE_Y;

  const normalizedGenres = genres.slice(0, 3).join(" · ");
  const firstAvatarLetter = nickname?.charAt(0).toUpperCase();

  return (
    <Link href={`/collections/${userId}?collectionId=${id}`} className="block">
      <article
        className="group cursor-pointer select-none"
        style={{ width: stageWidth }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div
          className="relative"
          style={{
            height: stageHeight,
            perspective: "1200px",
          }}
        >
          <div
            className="absolute left-1/2 top-2"
            style={{
              width: CARD_W,
              transform: "translateX(-50%)",
              transformStyle: "preserve-3d",
            }}
          >
            {[...previewPosters].reverse().map((poster, ri) => {
              const idx = previewPosters.length - 1 - ri;
              const { x, y, rotate } = positions[idx];
              const isTop = idx === 0;

              return (
                <motion.div
                  key={poster}
                  className="absolute top-0 left-0"
                  style={{
                    width: CARD_W,
                    zIndex:
                      idx === 0 ? 30
                      : idx === 1 ? 20
                      : 10,
                    transformOrigin: "50% 90%",
                  }}
                  animate={{ x, y, rotate }}
                  transition={{
                    type: "spring",
                    stiffness: 240,
                    damping: 22,
                    mass: 0.6,
                  }}
                >
                  <StackPoster
                    poster={poster}
                    isTop={isTop}
                    filmsCount={moviesCount}
                    rating={rating}
                    hovered={hovered}
                  />
                </motion.div>
              );
            })}
          </div>

          <motion.div
            aria-hidden
            className="absolute left-1/2 bottom-1 -translate-x-1/2 rounded-full bg-black blur-2xl"
            style={{ zIndex: 1 }}
            animate={{
              width: hovered ? CARD_W * 1.1 : CARD_W * 0.78,
              height: hovered ? 24 : 16,
              opacity: hovered ? 0.55 : 0.45,
            }}
            transition={{ duration: 0.35 }}
          />

          <motion.div
            aria-hidden
            className="absolute left-1/2 -translate-x-1/2 rounded-full bg-accent blur-3xl pointer-events-none"
            style={{ top: "30%", width: CARD_W * 0.9, height: CARD_H * 0.4, zIndex: 0 }}
            animate={{ opacity: hovered ? 0.18 : 0 }}
            transition={{ duration: 0.4 }}
          />
        </div>

        <footer className="mt-3 mx-auto" style={{ width: CARD_W }}>
          <div className="flex items-center justify-between gap-2">
            <div className="flex-col gap-2">
              <p
                className={cn(
                  "min-w-0 flex-1 truncate text-base font-semibold leading-tight transition-colors duration-300",
                  hovered ? "text-accent" : "text-foreground",
                )}
              >
                {collectionName}
              </p>

              <p className="mt-1 truncate text-sm text-zinc-muted">{normalizedGenres}</p>
            </div>

            <Avatar className="size-8">
              {avatarUrl && <AvatarImage className="rounded-full" src={avatarUrl} alt={nickname} />}

              <AvatarFallback
                style={{ backgroundColor: getAvatarColor(userId) }}
                className="text-primary font-medium text-sm"
              >
                {firstAvatarLetter}
              </AvatarFallback>
            </Avatar>
          </div>

          <div className="mt-2.5 flex items-center gap-3.5">
            <span className="flex items-center gap-1 text-sm font-semibold text-gold">
              <IconStarFilled className="size-3.5 text-gold" />
              {rating.toFixed(1)}
            </span>

            <span className="flex items-center gap-1 text-sm text-zinc-muted">
              <IconEye className="size-3.5" />
              {viewsCount}
            </span>

            <span className="flex items-center gap-1 text-sm text-zinc-muted">
              <IconHeartFilled className="size-3.5" />
              {likesCount}
            </span>
          </div>
        </footer>
      </article>
    </Link>
  );
};
