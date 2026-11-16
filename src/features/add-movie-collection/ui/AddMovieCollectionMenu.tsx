"use client";

import { ReactNode } from "react";
import { useTranslations } from "next-intl";
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/ui";
import { useIsMobile } from "@/shared/hooks";
import { MediaType } from "@/shared/stores/movie-catalog";
import { AddMovieCollection } from "./AddMovieCollection";

interface Props {
  mediaId: number;
  mediaType: MediaType;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
}

export const AddMovieCollectionMenu = ({
  mediaId,
  mediaType,
  open,
  onOpenChange,
  children,
}: Props) => {
  const t = useTranslations("movie.collections");
  const isMobile = useIsMobile();

  const panel = <AddMovieCollection mediaId={mediaId} mediaType={mediaType} popoverOpen={open} />;

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerTrigger asChild>{children}</DrawerTrigger>

        <DrawerContent
          aria-describedby={undefined}
          className="gap-0 overflow-hidden rounded-t-2xl border-border/60 bg-surface p-0"
        >
          <div className="mx-auto mt-2.5 h-1 w-10 shrink-0 rounded-full bg-white/20" aria-hidden />
          <DrawerTitle className="sr-only">{t("title")}</DrawerTitle>
          {panel}
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>

      <PopoverContent
        collisionPadding={12}
        className="w-[min(22rem,calc(100vw-1rem))] overflow-hidden rounded-2xl border-border/60 bg-surface p-0 shadow-popover"
      >
        {panel}
      </PopoverContent>
    </Popover>
  );
};
