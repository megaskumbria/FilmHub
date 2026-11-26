"use client";

import { useTranslations } from "next-intl";
import { type FollowUser, useFollowProfile } from "@/shared/hooks";
import { getAvatarColor } from "@/shared/lib";
import { Avatar, AvatarFallback, AvatarImage, Button } from "@/shared/ui";
import { BookOpen } from "lucide-react";
import Link from "next/link";
import { useRequireAuth } from "@/features/auth";

interface Props {
  user: FollowUser;
}

export const UserRow = ({ user }: Props) => {
  const t = useTranslations("collections.profile");

  const { mutate: followProfile } = useFollowProfile();
  const ensureAuth = useRequireAuth();

  const { nickname, tag, collectionsCount, userId, isFollowing, isMe, avatarUrl } = user;

  const handleFollowProfile = (): void => {
    if (!ensureAuth()) return;
    followProfile(userId);
  };

  return (
    <li>
      <div className="flex cursor-pointer items-center justify-between gap-2 rounded-2xl px-1 py-2.5 transition-colors hover:bg-background/30 sm:gap-3">
        <Link
          href={`/collections/${userId}`}
          className="flex min-w-0 flex-1 items-center gap-2.5 sm:gap-3"
        >
          <Avatar className="size-9 shrink-0">
            {avatarUrl ?
              <AvatarImage
                className="rounded-full"
                src={avatarUrl}
                alt="user avatar"
                referrerPolicy="no-referrer"
              />
            : null}
            <AvatarFallback
              className="text-xs font-semibold text-white"
              style={{ backgroundColor: getAvatarColor(userId) }}
            >
              {nickname.charAt(0)}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-foreground truncate">{nickname}</p>

            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-sm text-zinc-muted truncate">{tag}</span>
              <span className="text-zinc-muted/40">·</span>
              <BookOpen className="size-3 text-zinc-muted shrink-0" />
              <span className="text-sm text-zinc-muted tabular-nums">{collectionsCount}</span>
            </div>
          </div>
        </Link>

        {isMe ?
          <span className="inline-flex h-8 shrink-0 items-center justify-center rounded-lg bg-accent/10 px-3 text-xs font-medium text-accent sm:w-36 sm:px-2 sm:text-sm">
            {t("you")}
          </span>
        : <Button
            onClick={handleFollowProfile}
            className="h-8 shrink-0 justify-center rounded-lg border border-border px-3 text-xs text-primary transition-colors hover:text-foreground sm:w-36 sm:px-2 sm:text-sm"
            variant={isFollowing ? undefined : "accent"}
          >
            <span>{isFollowing ? t("unfollow") : t("follow")}</span>
          </Button>
        }
      </div>
    </li>
  );
};
