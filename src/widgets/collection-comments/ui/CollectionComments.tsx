"use client";

import { useState } from "react";
import { MessageSquare, Send } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  Button,
  Avatar,
  AvatarFallback,
  SheetTitle,
} from "@/shared/ui";
import { Textarea } from "@/shared/ui/textarea";
import { useMockComments, type Comment } from "../model/mockComments";
import { useTranslations } from "next-intl";
import {
  CommentByline,
  CommentVoteButtons,
  CommentsSheetFooter,
  CommentsSheetHeader,
} from "@/widgets/collection-comments";

const MAX_TEXT_LENGTH = 200;

export function CollectionComments() {
  const t = useTranslations("collections.comments");
  const initialComments = useMockComments();
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [expandedIds, setExpandedIds] = useState<Set<number>>(new Set());
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyText, setReplyText] = useState("");

  const totalCount = comments.reduce((acc, c) => acc + 1 + c.replies.length, 0);

  function toggleExpand(id: number) {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
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
                timestamp: "just now",
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
        aria-describedby={undefined}
        side="right"
        showCloseButton={false}
        className="flex flex-col p-0 gap-0 w-[40vw] sm:max-w-[40vw] bg-surface border-l border-border"
      >
        <SheetTitle className="sr-only" />

        <CommentsSheetHeader totalCount={totalCount} />

        <div className="drawer-scroll flex-1 overflow-y-auto px-5 py-4 space-y-6">
          {comments.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 gap-3 text-center">
              <MessageSquare className="size-10 text-zinc-muted opacity-30" />
              <p className="text-sm text-zinc-muted">{t("empty")}</p>
            </div>
          )}

          {comments.map((comment, index) => {
            const { id, author, timestamp, likes, dislikes } = comment;
            const { name, handle, initials, color } = author;

            const isLast = index === comments.length - 1;
            const isExpanded = expandedIds.has(comment.id);
            const isLong = comment.text.length > MAX_TEXT_LENGTH;
            const displayText =
              isLong && !isExpanded ? comment.text.slice(0, MAX_TEXT_LENGTH) + "…" : comment.text;
            const isReplying = replyingTo === comment.id;

            return (
              <article key={comment.id}>
                <div className="flex gap-3">
                  <Avatar className="size-8 shrink-0 mt-0.5">
                    <AvatarFallback
                      className="text-xs font-semibold text-white"
                      style={{ backgroundColor: color }}
                    >
                      {initials}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0 space-y-1.5">
                    <CommentByline author={name} handle={handle} timestamp={timestamp} />

                    <p className="text-sm text-foreground/90 leading-relaxed">
                      {displayText}
                      {isLong && (
                        <button
                          onClick={() => toggleExpand(comment.id)}
                          className="ml-1 text-accent text-xs hover:underline cursor-pointer"
                        >
                          {isExpanded ? t("showLess") : t("readMore")}
                        </button>
                      )}
                    </p>

                    <CommentVoteButtons
                      id={id}
                      likes={likes}
                      dislikes={dislikes}
                      setReplyingTo={setReplyingTo}
                      isReplying={isReplying}
                      setReplyText={setReplyText}
                    />

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
                            placeholder={t("replyTo", { handle: comment.author.handle })}
                            className="min-h-17 text-sm bg-background border-border resize-none"
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
                              <span>{t("cancel")}</span>
                            </Button>
                            <Button
                              variant="accent"
                              onClick={() => submitReply(comment.id)}
                              disabled={!replyText.trim()}
                              className="h-7 px-3 rounded-lg text-xs gap-1.5"
                            >
                              <Send className="size-3" />
                              <span>{t("reply")}</span>
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {comment.replies.length > 0 && (
                  <div className="ml-11 mt-3 space-y-3 border-l-2 border-border/50 pl-3">
                    {comment.replies.map((reply) => {
                      const { id, author, text, timestamp, likes, dislikes } = reply;
                      const { name, handle, initials, color } = author;

                      const isReplyLong = text.length > MAX_TEXT_LENGTH;
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
                              style={{ backgroundColor: color }}
                            >
                              {initials}
                            </AvatarFallback>
                          </Avatar>

                          <div className="flex-1 min-w-0 space-y-1.5">
                            <CommentByline author={name} handle={handle} timestamp={timestamp} />

                            <p className="text-sm text-foreground/90 leading-relaxed">
                              {replyDisplayText}
                              {isReplyLong && (
                                <Button
                                  onClick={() => toggleExpand(reply.id)}
                                  className="ml-1 text-accent text-xs hover:underline cursor-pointer"
                                >
                                  {isReplyExpanded ? t("showLess") : t("readMore")}
                                </Button>
                              )}
                            </p>

                            <CommentVoteButtons
                              id={id}
                              likes={likes}
                              dislikes={dislikes}
                              setReplyingTo={setReplyingTo}
                              isReplying={isReplying}
                              setReplyText={setReplyText}
                            />
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

        <CommentsSheetFooter />
      </SheetContent>
    </Sheet>
  );
}
