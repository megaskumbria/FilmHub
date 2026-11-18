import { cn } from "@/shared/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui";
import { IconStarFilled, IconEye, IconHeartFilled } from "@tabler/icons-react";
import { getAvatarColor } from "@/shared/lib";
import type { CollectionFeedItem } from "@/shared/hooks";

const CARD_W = 220;

interface Props {
  collection: CollectionFeedItem;
  hovered: boolean;
}

export const CollectionDeckFooter = ({ collection, hovered }: Props) => {
  const { collectionName, genres, rating, viewsCount, likesCount, owner } = collection;

  const { nickname, userId, avatarUrl } = owner;

  const normalizedGenres = genres.slice(0, 3).join(" · ");
  const firstAvatarLetter = nickname.charAt(0).toUpperCase();

  return (
    <footer className="mt-3 mx-auto" style={{ width: CARD_W }}>
      <div className="flex items-center justify-between gap-2">
        <div className="flex min-w-0 flex-1 flex-col">
          <p
            className={cn(
              "truncate text-base font-semibold leading-tight transition-colors duration-300",
              hovered ? "text-accent" : "text-foreground",
            )}
          >
            {collectionName}
          </p>

          <p className="mt-1 truncate text-sm text-zinc-muted">{normalizedGenres}</p>
        </div>

        <Avatar className="size-8 shrink-0">
          {avatarUrl && (
            <AvatarImage
              className="rounded-full"
              src={avatarUrl}
              alt={nickname}
              referrerPolicy="no-referrer"
            />
          )}

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
  );
};
