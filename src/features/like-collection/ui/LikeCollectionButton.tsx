"use client";

import { motion } from "framer-motion";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui";
import { IconHeart, IconHeartFilled } from "@tabler/icons-react";
import { useToggleLikeCollection, type Collection } from "@/shared/hooks";
import { useRequireAuth } from "@/features/auth";

interface Props {
  collection: Collection;
}

export const LikeCollectionButton = ({ collection }: Props) => {
  const ensureAuth = useRequireAuth();
  const { mutate: toggleLikeCollection } = useToggleLikeCollection();

  const { id: collectionId, isLiked, likesCount = 0 } = collection;

  const handleToggleLike = () => {
    if (!ensureAuth()) return;
    toggleLikeCollection(collectionId);
  };

  return (
    <Button
      type="button"
      onClick={handleToggleLike}
      className={cn(
        "group h-11 gap-2 rounded-full border px-4 transition-colors duration-200",
        isLiked ?
          "border-rose-400/30 bg-rose-400/10 text-rose-400"
        : "border-border/40 bg-graphite text-zinc-muted hover:border-rose-400/30 hover:text-rose-400",
      )}
    >
      <motion.span
        key={String(isLiked)}
        initial={{ scale: isLiked ? 0.6 : 1 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 500, damping: 15 }}
        className="flex"
      >
        {isLiked ?
          <IconHeartFilled className="size-4.5" />
        : <IconHeart className="size-4.5" />}
      </motion.span>

      <span className="text-sm font-medium tabular-nums">{likesCount}</span>
    </Button>
  );
};
