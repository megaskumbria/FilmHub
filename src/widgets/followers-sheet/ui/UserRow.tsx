"use client";

import { type FollowUser, useFollowProfile } from "@/shared/hooks";
import { getAvatarColor } from "@/shared/lib";
import { Avatar, AvatarFallback, Button } from "@/shared/ui";
import { BookOpen } from "lucide-react";
import Link from "next/link";
import { useRequireAuth } from "@/features/auth";

interface Props {
  user: FollowUser;
}

export const UserRow = ({ user }: Props) => {
  const { mutate: followProfile } = useFollowProfile();
  const ensureAuth = useRequireAuth();

  const { nickname, tag, collectionsCount, userId, isFollowing, isMe } = user;

  const handleFollowProfile = (): void => {
    if (!ensureAuth()) return;
    followProfile(userId);
  };

  return (
    <li>
      <div className="flex items-center justify-between cursor-pointer gap-3 py-2.5 px-1 hover:bg-background/30 rounded-2xl transition-colors">
        <Link href={`/collections/${userId}`} className="flex items-center gap-3">
          <Avatar className="size-9 shrink-0">
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
          <span className="shrink-0 inline-flex h-8 w-28 items-center justify-center rounded-lg bg-accent/10 text-sm font-medium text-accent">
            You
          </span>
        : <Button
            onClick={handleFollowProfile}
            className="shrink-0 h-8 w-28 justify-center px-2 rounded-lg text-sm border border-border text-primary hover:text-foreground transition-colors"
            variant={isFollowing ? undefined : "accent"}
          >
            <span>{isFollowing ? "Unfollow" : "Follow"}</span>
          </Button>
        }
      </div>
    </li>
  );
};
