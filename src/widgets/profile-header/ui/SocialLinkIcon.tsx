"use client";

import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui";
import { TelegramIcon } from "@/shared/icons";
import { cn } from "@/shared/lib/utils";
import { getFaviconUrl, getLinkInitials, isTelegramUrl } from "../lib/getSocialLinkIcon";

interface Props {
  url: string;
  className?: string;
}

export const SocialLinkIcon = ({ url, className }: Props) => {
  const faviconUrl = getFaviconUrl(url);
  const initials = getLinkInitials(url);
  const [isReady, setIsReady] = useState(false);
  const isTelegram = isTelegramUrl(url);

  useEffect(() => {
    if (!faviconUrl || isTelegram) {
      setIsReady(false);
      return;
    }

    let cancelled = false;
    setIsReady(false);

    const img = new Image();

    img.onload = () => {
      if (cancelled) return;
      setIsReady(img.naturalWidth > 16);
    };

    img.onerror = () => {
      if (cancelled) return;
      setIsReady(false);
    };

    img.src = faviconUrl;

    return () => {
      cancelled = true;
    };
  }, [faviconUrl, isTelegram]);

  if (isTelegram) {
    return (
      <span
        className={cn(
          "flex size-8 items-center justify-center overflow-hidden rounded-lg",
          className,
        )}
      >
        <TelegramIcon className="size-full" />
      </span>
    );
  }

  return (
    <Avatar className={cn("size-8 rounded-lg", className)}>
      {isReady && faviconUrl && <AvatarImage src={faviconUrl} alt="" />}

      <AvatarFallback className="rounded-lg bg-background text-sm font-medium text-zinc-muted">
        {initials}
      </AvatarFallback>
    </Avatar>
  );
};
