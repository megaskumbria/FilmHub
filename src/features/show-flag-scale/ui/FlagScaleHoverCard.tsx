"use client";

import { useRef, useState, type MouseEvent, type PointerEvent, type ReactNode } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/shared/ui";
import { flagScaleQueryOptions } from "../lib/useGetFlagsScale";
import { FlagScaleContent } from "./FlagScaleContent";

const PREFETCH_DELAY_MS = 200;
const OPEN_DELAY_MS = 400;
const CLOSE_DELAY_MS = 100;

interface Props {
  categoryId: string;
  categoryName: string;
  currentFlagId: string;
  children: ReactNode;
}

export const FlagScaleHoverCard = ({
  categoryId,
  categoryName,
  currentFlagId,
  children,
}: Props) => {
  const [open, setOpen] = useState<boolean>(false);

  const isHoveredRef = useRef<boolean>(false);
  const prefetchTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const queryClient = useQueryClient();

  const clearPrefetchTimer = () => {
    if (prefetchTimerRef.current) clearTimeout(prefetchTimerRef.current);
    prefetchTimerRef.current = null;
  };

  const handlePointerEnter = (e: PointerEvent<HTMLSpanElement>) => {
    if (e.pointerType === "touch") return;

    isHoveredRef.current = true;
    clearPrefetchTimer();

    prefetchTimerRef.current = setTimeout(() => {
      void queryClient.prefetchQuery(flagScaleQueryOptions(categoryId));
    }, PREFETCH_DELAY_MS);
  };

  const handlePointerLeave = () => {
    isHoveredRef.current = false;
    clearPrefetchTimer();
  };

  const handleOpenChange = async (nextOpen: boolean) => {
    if (!nextOpen) {
      setOpen(false);
      return;
    }

    try {
      await queryClient.ensureQueryData(flagScaleQueryOptions(categoryId));
    } catch {
      return;
    }

    if (isHoveredRef.current) setOpen(true);
  };

  const handleStopNavigation = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <HoverCard
      open={open}
      onOpenChange={(nextOpen) => void handleOpenChange(nextOpen)}
      openDelay={OPEN_DELAY_MS}
      closeDelay={CLOSE_DELAY_MS}
    >
      <HoverCardTrigger asChild>
        <span
          className="inline-flex"
          onPointerEnter={handlePointerEnter}
          onPointerLeave={handlePointerLeave}
        >
          {children}
        </span>
      </HoverCardTrigger>

      <HoverCardContent
        side="top"
        align="start"
        sideOffset={8}
        collisionPadding={12}
        onClick={handleStopNavigation}
        className="flex w-auto min-w-56 flex-col gap-2 border-border bg-surface-elevated p-3"
      >
        <FlagScaleContent
          categoryId={categoryId}
          categoryName={categoryName}
          currentFlagId={currentFlagId}
        />
      </HoverCardContent>
    </HoverCard>
  );
};
