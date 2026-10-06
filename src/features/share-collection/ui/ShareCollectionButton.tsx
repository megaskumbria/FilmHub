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
import { useTranslations } from "next-intl";

interface Props {
  collectionId: string;
  userId: string;
}

export const ShareCollectionButton = ({ collectionId, userId }: Props) => {
  const t = useTranslations("collections.share");
  const [copied, setCopied] = useState<boolean>(false);

  const { mutate: shareCollection } = useShareCollection();

  useEffect(() => {
    if (!copied) return;
    const timeout = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timeout);
  }, [copied]);

  const shareUrl = getCollectionShareUrl({ userId, collectionId });

  const handleCopy = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);

      toast.success(t("copied"), { position: "bottom-left" });

      shareCollection(collectionId);
    } catch {
      toast.error(t("copyFailed"), { position: "bottom-left" });
    }
  };

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
          <PopoverTitle className="text-sm text-foreground">{t("title")}</PopoverTitle>

          <PopoverDescription className="text-xs text-zinc-muted">{t("hint")}</PopoverDescription>
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
      </PopoverContent>
    </Popover>
  );
};
