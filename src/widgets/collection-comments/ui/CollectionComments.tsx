"use client";

import { useState } from "react";
import { MessageSquare, ThumbsUp, ThumbsDown, CornerDownRight, Send, X } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  Button,
  Avatar,
  AvatarFallback,
} from "@/shared/ui";
import { Textarea } from "@/shared/ui/textarea";
import { cn } from "@/shared/lib/utils";
import { mockComments, type Comment } from "../model/mockComments";

const MAX_TEXT_LENGTH = 200;

type SortMode = "new" | "old" | "popular";

const SORT_LABELS: Record<SortMode, string> = {
  new: "Новые",
  old: "Старые",
  popular: "Популярные",
};

function sortComments(comments: Comment[], mode: SortMode): Comment[] {
  if (mode === "popular") return [...comments].sort((a, b) => b.likes - a.likes);
  if (mode === "old") return [...comments];
  return [...comments].reverse();
}

export function CollectionComments() {
  const [comments, setComments] = useState<Comment[]>(mockComments);
  const [sortMode, setSortMode] = useState<SortMode>("new");
  const [votes, setVotes] = useState<Record<number, "up" | "down">>({});
  const [expandedIds, setExpandedIds] = useState<Set<number>>(new Set());
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyText, setReplyText] = useState("");
  const [newComment, setNewComment] = useState("");

  const totalCount = comments.reduce((acc, c) => acc + 1 + c.replies.length, 0);
  const sorted = sortComments(comments, sortMode);

  function toggleVote(id: number, dir: "up" | "down") {
    setVotes((prev) => {
      if (prev[id] === dir) {
        const next = { ...prev };
        delete next[id];
        return next;
      }
      return { ...prev, [id]: dir };
    });
  }

  function toggleExpand(id: number) {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  function submitComment() {
    if (!newComment.trim()) return;
    setComments((prev) => [
      {
        id: Date.now(),
        author: { name: "Pavel Ivanov", handle: "@pavel_films", initials: "PI", color: "#9b56f0" },
        text: newComment.trim(),
        timestamp: "только что",
        likes: 0,
        dislikes: 0,
        replies: [],
      },
      ...prev,
    ]);
    setNewComment("");
  }

  function submitReply(commentId: number) {
    if (!replyText.trim()) return;
    setComments((prev) =>
      prev.map((c) =>
        c.id === commentId ?
          {
            ...c,
            replies: [
              ...c.replies,
              {
                id: Date.now(),
                author: {
                  name: "Pavel Ivanov",
                  handle: "@pavel_films",
                  initials: "PI",
                  color: "#9b56f0",
                },
                text: replyText.trim(),
                timestamp: "только что",
                likes: 0,
                dislikes: 0,
              },
            ],
          }
        : c,
      ),
    );
    setReplyText("");
    setReplyingTo(null);
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size="sm"
          className="rounded-lg gap-1.5 h-9 px-3 border border-border text-zinc-muted hover:text-foreground hover:border-zinc-muted transition-colors"
        >
          <MessageSquare className="size-4 shrink-0" />
          <span className="text-sm tabular-nums">{totalCount}</span>
        </Button>
      </SheetTrigger>

      <SheetContent
        side="right"
        showCloseButton={false}
        className="flex flex-col p-0 gap-0 w-[40vw] sm:max-w-[40vw] bg-surface border-l border-border"
      >
        {/* ── Header ──────────────────────────────────── */}
        <div className="flex items-center gap-2 px-5 py-3.5 border-b border-border shrink-0">
          <MessageSquare className="size-4 text-zinc-muted shrink-0" />
          <span className="font-semibold text-foreground text-sm">Комментарии</span>
          <span className="text-sm text-zinc-muted tabular-nums">({totalCount})</span>

          <div className="ml-auto flex items-center gap-2 shrink-0">
            <div className="flex items-center rounded-lg border border-border overflow-hidden">
              {(["new", "old", "popular"] as SortMode[]).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setSortMode(mode)}
                  className={cn(
                    "text-xs px-2.5 py-1.5 transition-colors cursor-pointer",
                    sortMode === mode ?
                      "bg-accent/15 text-accent"
                    : "text-zinc-muted hover:text-foreground hover:bg-white/5",
                  )}
                >
                  {SORT_LABELS[mode]}
                </button>
              ))}
            </div>

            <SheetClose asChild>
              <Button className="size-8 p-0 rounded-lg border border-border text-zinc-muted hover:text-foreground hover:border-zinc-muted transition-colors">
                <X className="size-4" />
              </Button>
            </SheetClose>
          </div>
        </div>

        {/* ── Comments list ────────────────────────────── */}
        <div className="drawer-scroll flex-1 overflow-y-auto px-5 py-4 space-y-6">
          {sorted.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 gap-3 text-center">
              <MessageSquare className="size-10 text-zinc-muted opacity-30" />
              <p className="text-sm text-zinc-muted">Будьте первым, кто оставит комментарий</p>
            </div>
          )}

          {sorted.map((comment, index) => {
            const isLast = index === sorted.length - 1;
            const isExpanded = expandedIds.has(comment.id);
            const isLong = comment.text.length > MAX_TEXT_LENGTH;
            const displayText =
              isLong && !isExpanded ? comment.text.slice(0, MAX_TEXT_LENGTH) + "…" : comment.text;
            const userVote = votes[comment.id];
            const isReplying = replyingTo === comment.id;

            return (
              <article key={comment.id}>
                {/* Main comment */}
                <div className="flex gap-3">
                  <Avatar className="size-8 shrink-0 mt-0.5">
                    <AvatarFallback
                      className="text-xs font-semibold text-white"
                      style={{ backgroundColor: comment.author.color }}
                    >
                      {comment.author.initials}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0 space-y-1.5">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-sm font-semibold text-foreground leading-none">
                        {comment.author.name}
                      </span>
                      <span className="text-xs text-zinc-muted leading-none">
                        {comment.author.handle}
                      </span>
                      <span className="text-zinc-muted text-xs opacity-40">·</span>
                      <span className="text-xs text-zinc-muted leading-none">
                        {comment.timestamp}
                      </span>
                    </div>

                    <p className="text-sm text-foreground/90 leading-relaxed">
                      {displayText}
                      {isLong && (
                        <button
                          onClick={() => toggleExpand(comment.id)}
                          className="ml-1 text-accent text-xs hover:underline cursor-pointer"
                        >
                          {isExpanded ? "Свернуть" : "Читать далее"}
                        </button>
                      )}
                    </p>

                    {/* Actions */}
                    <div className="flex items-center gap-3 pt-0.5">
                      <div className="flex items-center gap-1">
                        <Button
                          onClick={() => toggleVote(comment.id, "up")}
                          className={cn(
                            "size-6 p-0 rounded-md transition-colors",
                            userVote === "up" ? "text-emerald-accent" : (
                              "text-zinc-muted hover:text-foreground"
                            ),
                          )}
                        >
                          <ThumbsUp className="size-3.5" />
                        </Button>
                        <span
                          className={cn(
                            "text-xs tabular-nums",
                            userVote === "up" ? "text-emerald-accent" : "text-zinc-muted",
                          )}
                        >
                          {comment.likes + (userVote === "up" ? 1 : 0)}
                        </span>
                      </div>

                      <div className="flex items-center gap-1">
                        <Button
                          onClick={() => toggleVote(comment.id, "down")}
                          className={cn(
                            "size-6 p-0 rounded-md transition-colors",
                            userVote === "down" ? "text-destructive" : (
                              "text-zinc-muted hover:text-foreground"
                            ),
                          )}
                        >
                          <ThumbsDown className="size-3.5" />
                        </Button>
                        <span
                          className={cn(
                            "text-xs tabular-nums",
                            userVote === "down" ? "text-destructive" : "text-zinc-muted",
                          )}
                        >
                          {comment.dislikes + (userVote === "down" ? 1 : 0)}
                        </span>
                      </div>

                      <Button
                        onClick={() => {
                          setReplyingTo(isReplying ? null : comment.id);
                          if (!isReplying) setReplyText("");
                        }}
                        className={cn(
                          "h-6 px-2 rounded-md text-xs gap-1 transition-colors",
                          isReplying ?
                            "text-accent bg-accent/10"
                          : "text-zinc-muted hover:text-foreground",
                        )}
                      >
                        <CornerDownRight className="size-3" />
                        <span>Ответить</span>
                      </Button>
                    </div>

                    {/* Reply input */}
                    {isReplying && (
                      <div className="flex gap-2.5 pt-2">
                        <Avatar className="size-6 shrink-0 mt-1">
                          <AvatarFallback
                            className="text-xs font-semibold text-white"
                            style={{ backgroundColor: "#9b56f0" }}
                          >
                            PI
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-2">
                          <Textarea
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            placeholder={`Ответить ${comment.author.handle}…`}
                            className="min-h-[68px] text-sm bg-background border-border resize-none"
                            autoFocus
                          />
                          <div className="flex justify-end gap-2">
                            <Button
                              onClick={() => {
                                setReplyingTo(null);
                                setReplyText("");
                              }}
                              className="h-7 px-3 rounded-lg text-xs border border-border text-zinc-muted hover:text-foreground transition-colors"
                            >
                              <span>Отмена</span>
                            </Button>
                            <Button
                              variant="accent"
                              onClick={() => submitReply(comment.id)}
                              disabled={!replyText.trim()}
                              className="h-7 px-3 rounded-lg text-xs gap-1.5"
                            >
                              <Send className="size-3" />
                              <span>Ответить</span>
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Replies */}
                {comment.replies.length > 0 && (
                  <div className="ml-11 mt-3 space-y-3 border-l-2 border-border/50 pl-3">
                    {comment.replies.map((reply) => {
                      const replyVote = votes[reply.id];
                      const isReplyLong = reply.text.length > MAX_TEXT_LENGTH;
                      const isReplyExpanded = expandedIds.has(reply.id);
                      const replyDisplayText =
                        isReplyLong && !isReplyExpanded ?
                          reply.text.slice(0, MAX_TEXT_LENGTH) + "…"
                        : reply.text;

                      return (
                        <div key={reply.id} className="flex gap-2.5">
                          <Avatar className="size-6 shrink-0 mt-0.5">
                            <AvatarFallback
                              className="text-xs font-semibold text-white"
                              style={{ backgroundColor: reply.author.color }}
                            >
                              {reply.author.initials}
                            </AvatarFallback>
                          </Avatar>

                          <div className="flex-1 min-w-0 space-y-1.5">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className="text-xs font-semibold text-foreground leading-none">
                                {reply.author.name}
                              </span>
                              <span className="text-xs text-zinc-muted leading-none">
                                {reply.author.handle}
                              </span>
                              <span className="text-zinc-muted text-xs opacity-40">·</span>
                              <span className="text-xs text-zinc-muted leading-none">
                                {reply.timestamp}
                              </span>
                            </div>

                            <p className="text-sm text-foreground/90 leading-relaxed">
                              {replyDisplayText}
                              {isReplyLong && (
                                <button
                                  onClick={() => toggleExpand(reply.id)}
                                  className="ml-1 text-accent text-xs hover:underline cursor-pointer"
                                >
                                  {isReplyExpanded ? "Свернуть" : "Читать далее"}
                                </button>
                              )}
                            </p>

                            <div className="flex items-center gap-3">
                              <div className="flex items-center gap-1">
                                <Button
                                  onClick={() => toggleVote(reply.id, "up")}
                                  className={cn(
                                    "size-5 p-0 rounded-md transition-colors",
                                    replyVote === "up" ? "text-emerald-accent" : (
                                      "text-zinc-muted hover:text-foreground"
                                    ),
                                  )}
                                >
                                  <ThumbsUp className="size-3" />
                                </Button>
                                <span
                                  className={cn(
                                    "text-xs tabular-nums",
                                    replyVote === "up" ? "text-emerald-accent" : "text-zinc-muted",
                                  )}
                                >
                                  {reply.likes + (replyVote === "up" ? 1 : 0)}
                                </span>
                              </div>

                              <div className="flex items-center gap-1">
                                <Button
                                  onClick={() => toggleVote(reply.id, "down")}
                                  className={cn(
                                    "size-5 p-0 rounded-md transition-colors",
                                    replyVote === "down" ? "text-destructive" : (
                                      "text-zinc-muted hover:text-foreground"
                                    ),
                                  )}
                                >
                                  <ThumbsDown className="size-3" />
                                </Button>
                                <span
                                  className={cn(
                                    "text-xs tabular-nums",
                                    replyVote === "down" ? "text-destructive" : "text-zinc-muted",
                                  )}
                                >
                                  {reply.dislikes + (replyVote === "down" ? 1 : 0)}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {!isLast && <div className="mt-6 border-b border-border/30" />}
              </article>
            );
          })}
        </div>

        {/* ── Footer — new comment ─────────────────────── */}
        <div className="border-t border-border px-5 py-4 shrink-0 space-y-3 bg-surface">
          <div className="flex gap-3">
            <Avatar className="size-8 shrink-0 mt-1">
              <AvatarFallback
                className="text-xs font-semibold text-white"
                style={{ backgroundColor: "#9b56f0" }}
              >
                PI
              </AvatarFallback>
            </Avatar>
            <Textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Написать комментарий…"
              className="flex-1 min-h-[72px] text-sm bg-background border-border resize-none"
            />
          </div>
          <div className="flex justify-end">
            <Button
              variant="accent"
              size="sm"
              onClick={submitComment}
              disabled={!newComment.trim()}
              className="rounded-lg gap-2 px-4"
            >
              <Send className="size-3.5" />
              <span className="text-sm">Отправить</span>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
