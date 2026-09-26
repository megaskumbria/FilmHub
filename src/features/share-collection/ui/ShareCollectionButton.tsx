"use client";

import { useEffect, useState } from "react";
import { Check, Copy, Share2 } from "lucide-react";
import { toast } from "sonner";
import {
  Button,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverHeader,
  PopoverTitle,
  PopoverDescription,
} from "@/shared/ui";
import { cn } from "@/shared/lib/utils";
import { getCollectionShareUrl } from "../lib/getCollectionShareUrl";
import { useShareCollection } from "@/shared/hooks";

interface Props {
  collectionId: string;
  userId: string;
}

export const ShareCollectionButton = ({ collectionId, userId }: Props) => {
  const [copied, setCopied] = useState<boolean>(false);

  const { mutate: shareCollection } = useShareCollection();

  // useEffect(() => {
  //   setCanNativeShare(typeof navigator !== "undefined" && typeof navigator.share === "function");
  // }, []);

  useEffect(() => {
    if (!copied) return;
    const timeout = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timeout);
  }, [copied]);

  const shareUrl = getCollectionShareUrl({ userId, collectionId });

  // const telegramShareUrl = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}${
  //   collectionName ? `&text=${encodeURIComponent(collectionName)}` : ""
  // }`;

  const handleCopy = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);

      toast.success("Link copied to clipboard", { position: "bottom-left" });

      shareCollection(collectionId);
    } catch {
      toast.error("Failed to copy link", { position: "bottom-left" });
    }
  };

  // const handleNativeShare = async (): Promise<void> => {
  //   await navigator.share({ title: collectionName, url: shareUrl });
  // };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          size="sm"
          className="transition-colors rounded-lg h-9 p-0 bg-transparent border border-border text-zinc-muted hover:text-foreground hover:border-zinc-muted"
        >
          <Share2 className="size-4" />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        onOpenAutoFocus={(event) => event.preventDefault()}
        className="w-80 rounded-xl border-border bg-surface"
      >
        <PopoverHeader className="mb-3">
          <PopoverTitle className="text-sm text-foreground">Share collection</PopoverTitle>

          <PopoverDescription className="text-xs text-zinc-muted">
            Anyone with the link can view this collection
          </PopoverDescription>
        </PopoverHeader>

        <div className="flex items-center gap-2">
          <Input
            readOnly
            variant="neutral"
            value={shareUrl}
            className="h-9 text-sm rounded-lg border-border bg-background text-zinc-muted"
          />

          <Button
            size="icon-sm"
            onClick={() => void handleCopy()}
            className={cn(
              "shrink-0 rounded-lg border transition-colors duration-200",
              copied ?
                "border-success/30 bg-success/10 text-success"
              : "border-border text-zinc-muted hover:text-foreground hover:border-zinc-muted",
            )}
          >
            {copied ?
              <Check className="size-4" />
            : <Copy className="size-4" />}
          </Button>
        </div>

        {/* <div className="my-3 flex items-center gap-2">
          <Separator className="flex-1 bg-border" />
          <span className="text-xs text-zinc-muted">or share via</span>
          <Separator className="flex-1 bg-border" />
        </div>

        <div className="flex items-center gap-2">
          <a
            href={telegramShareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 items-center justify-center gap-2 h-9 rounded-lg border border-border text-zinc-muted hover:text-foreground hover:border-zinc-muted transition-colors duration-200"
          >
            <TelegramIcon className="size-4" />
            <span className="text-sm">Telegram</span>
          </a>

          {canNativeShare && (
            <Button
              size="sm"
              onClick={() => void handleNativeShare()}
              className="flex-1 justify-center gap-2 h-9 rounded-lg border border-border text-zinc-muted hover:text-foreground hover:border-zinc-muted transition-colors duration-200"
            >
              <Share2 className="size-4" />
              <span className="text-sm">More</span>
            </Button>
          )}
        </div> */}
      </PopoverContent>
    </Popover>
  );
};
