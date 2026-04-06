"use client";

import { ThumbsUp, ThumbsDown, CornerDownRight } from "lucide-react";
import { Button } from "@/shared/ui";
import { cn } from "@/shared/lib/utils";
import { useState } from "react";

type Vote = "up" | "down";

interface CommentVoteButtonsProps {
  id: number;
  likes: number;
  dislikes: number;
  setReplyingTo: (id: number | null) => void;
  isReplying: boolean;
  setReplyText: (text: string) => void;
}

export const CommentVoteButtons = ({
  id,
  likes,
  dislikes,
  setReplyingTo,
  isReplying,
  setReplyText,
}: CommentVoteButtonsProps) => {
  const [votes, setVotes] = useState<Record<number, Vote>>({});

  const toggleVote = (id: number, direction: Vote) => {
    setVotes((prev) => {
      if (prev[id] === direction) {
        const next = { ...prev };
        delete next[id];
        return next;
      }
      return { ...prev, [id]: direction };
    });
  };

  const userVote = votes[id];

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center">
        <Button
          onClick={() => toggleVote(id, "up")}
          className={cn(
            "w-7 h-7 p-0 flex items-center justify-center rounded-full hover:bg-zinc-muted transition-colors",
            userVote === "up" ? "text-emerald-accent" : "text-zinc-muted hover:text-foreground ",
          )}
        >
          <ThumbsUp className="size-4" />
        </Button>

        <span
          className={cn(
            "text-xs tabular-nums",
            userVote === "up" ? "text-emerald-accent" : "text-zinc-muted",
          )}
        >
          {likes + (userVote === "up" ? 1 : 0)}
        </span>
      </div>

      <div className="flex items-center">
        <Button
          onClick={() => toggleVote(id, "down")}
          className={cn(
            "size-7 h-7 p-0 flex items-center justify-center rounded-full hover:bg-zinc-muted transition-colors",
            userVote === "down" ? "text-destructive" : "text-zinc-muted hover:text-foreground",
          )}
        >
          <ThumbsDown className="size-4" />
        </Button>

        <span
          className={cn(
            "text-xs tabular-nums hover:bg-zinc-muted",
            userVote === "down" ? "text-destructive" : "text-zinc-muted",
          )}
        >
          {dislikes + (userVote === "down" ? 1 : 0)}
        </span>
      </div>

      <Button
        onClick={() => {
          setReplyingTo(isReplying ? null : id);
          if (!isReplying) setReplyText("");
        }}
        className={cn(
          "h-6 px-2 rounded-md text-xs gap-1 transition-colors",
          isReplying ? "text-accent bg-accent/10" : "text-zinc-muted hover:text-foreground",
        )}
      >
        <CornerDownRight className="size-3" />
        <span>Reply</span>
      </Button>
    </div>
  );
};
