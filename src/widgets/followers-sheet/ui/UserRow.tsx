"use client";

import { useTranslations } from "next-intl";
import { type FollowUser, useFollowProfile } from "@/shared/hooks";
import { getAvatarColor } from "@/shared/lib";
import { Avatar, AvatarFallback, AvatarImage, Button } from "@/shared/ui";
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
      <div className="flex items-center gap-3 rounded-2xl px-2 py-2.5 transition-colors hover:bg-surface-elevated">
        <Link
          href={`/collections/${userId}`}
          className="flex min-w-0 flex-1 items-center gap-3 rounded-xl outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <Avatar className="size-12 overflow-hidden rounded-2xl">
            {avatarUrl && (
              <AvatarImage
                className="object-cover"
                src={avatarUrl}
                alt=""
                referrerPolicy="no-referrer"
              />
            )}
            <AvatarFallback
              className="rounded-2xl font-unbounded text-base font-semibold text-white"
              style={{ backgroundColor: getAvatarColor(userId) }}
            >
              {nickname.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div className="min-w-0">
            <p className="truncate text-[15px] leading-tight font-semibold text-foreground">
              {nickname}
            </p>

            <p className="mt-0.5 truncate text-sm text-zinc-muted">@{tag}</p>

            <p className="mt-1 text-xs text-zinc-muted/80">
              <span className="tabular-nums">{collectionsCount}</span>{" "}
              <span className="lowercase">{t("collections", { count: collectionsCount })}</span>
            </p>
          </div>
        </Link>

        {isMe ?
          <span className="inline-flex h-8 shrink-0 items-center px-1 text-xs font-medium text-zinc-muted sm:h-9 sm:text-sm">
            {t("you")}
          </span>
        : <Button
            type="button"
            size="sm"
            variant={isFollowing ? "subtle" : "accent"}
            onClick={handleFollowProfile}
            className={`h-8 shrink-0 rounded-full px-3.5 text-xs font-medium whitespace-nowrap shadow-none sm:h-9 sm:px-4 sm:text-sm${isFollowing ? "" : " border border-transparent"}`}
          >
            <span>{isFollowing ? t("unfollow") : t("follow")}</span>
          </Button>
        }
      </div>
    </li>
  );
};
