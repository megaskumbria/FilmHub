"use client";

import { Button, Input, Tooltip, TooltipTrigger, TooltipContent, Accordion } from "@/shared/ui";
import Link from "next/link";
import { IconFlag3, IconHelpCircle, IconPlus, IconSearch, IconFlagOff } from "@tabler/icons-react";
import { useState, useEffect, useRef } from "react";
import { type FlagItem, useDebounce, useGetFlags, useSetMediaFlags } from "@/shared/hooks";
import { useTranslations } from "next-intl";
import { cn } from "@/shared/lib/utils";
import { FlagScaleItem } from "./FlagScaleItem";
import { FlagsLimitNotice } from "./FlagsLimitNotice";
import { FlagQuotaMeter } from "./FlagQuotaMeter";
import { SelectedFlagsTray } from "./SelectedFlagsTray";
import { MAX_LIMIT_PER_MEDIA } from "../model/constants";

interface Props {
  mediaId: number;
  popoverOpen: boolean;
}

export const SetMediaFlags = ({ mediaId, popoverOpen }: Props) => {
  const t = useTranslations("movie.flags");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFlags, setSelectedFlags] = useState<Record<string, FlagItem>>({});

  const initializedRef = useRef(false);

  const debouncedSearch = useDebounce(searchQuery, 300);

  const { data: flagsData = [] } = useGetFlags({
    searchQuery: debouncedSearch,
    sortBy: "default",
    mediaId,
  });

  const { mutate: setMediaFlags } = useSetMediaFlags();

  const handleSelectFlag = (
    scaleName: string,
    flag: FlagItem,
    mediaId: number,
    scaleId: string,
  ) => {
    setSelectedFlags((prev) => {
      if (prev[scaleName]?.id === flag.id) {
        const next = { ...prev };
        delete next[scaleName];
        return next;
      }

      return { ...prev, [scaleName]: flag };
    });

    setMediaFlags({ mediaId, flag, scaleId, scaleName });
  };

  const handleRemoveFlag = (scaleName: string, flag: FlagItem) => {
    handleSelectFlag(scaleName, flag, mediaId, flag.scaleId);
  };

  useEffect(() => {
    if (!popoverOpen) {
      initializedRef.current = false;
      return;
    }

    if (initializedRef.current || flagsData.length === 0) return;

    const initialSelectedFlags = flagsData.reduce<Record<string, FlagItem>>(
      (acc, { scaleName, flags }) => {
        const usedFlag = flags.find((f) => f.isUsed);

        if (usedFlag) acc[scaleName] = usedFlag;

        return acc;
      },
      {},
    );

    setSelectedFlags(initialSelectedFlags);
    initializedRef.current = true;
  }, [popoverOpen, flagsData]);

  const selectedList = Object.values(selectedFlags);
  const isLimitFlags = selectedList.length >= MAX_LIMIT_PER_MEDIA;

  return (
    <section className="relative flex flex-col w-96 overflow-hidden">
      <span
        aria-hidden
        className="pointer-events-none absolute -top-28 -right-16 size-60 rounded-full bg-accent/20 blur-3xl"
      />

      <header className="relative flex flex-col gap-3 px-4 pt-4 pb-3">
        <div className="flex items-center gap-3">
          <span className="relative flex size-10 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-accent to-accent/50 text-white  ring-1 ring-white/10">
            <IconFlag3 className="size-5" stroke={2} />
          </span>

          <div className="flex flex-col min-w-0 flex-1">
            <h2 className="text-base font-semibold text-foreground leading-tight tracking-wide">
              {t("title")}
            </h2>

            <span
              className={cn(
                "text-sm leading-tight mt-0.5 tabular-nums transition-colors",
                isLimitFlags ? "text-accent" : "text-zinc-muted",
              )}
            >
              {t("selected", { current: selectedList.length, max: MAX_LIMIT_PER_MEDIA })}
            </span>
          </div>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button className="size-8 rounded-lg text-zinc-muted hover:text-foreground hover:bg-white/6 transition-colors">
                <IconHelpCircle className="size-5" />
              </Button>
            </TooltipTrigger>

            <TooltipContent>
              <p>{t("onePerScale")}</p>
            </TooltipContent>
          </Tooltip>
        </div>

        <FlagQuotaMeter flags={selectedList} />
      </header>

      <div className="relative flex flex-col gap-2.5 px-3 pb-3">
        <SelectedFlagsTray selectedFlags={selectedFlags} onRemove={handleRemoveFlag} />

        <div role="search" className="relative">
          <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-zinc-muted pointer-events-none" />
          <Input
            variant="neutral"
            placeholder={t("search")}
            className="pl-9 pr-3 text-sm h-10 rounded-xl"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="relative overflow-y-auto max-h-80 px-3 drawer-scroll border-t border-border/40 pt-3">
        {flagsData.length === 0 ?
          <div className="flex flex-col items-center gap-2 py-8 text-center">
            <span className="flex size-10 items-center justify-center rounded-full bg-white/4 text-zinc-muted">
              <IconFlagOff className="size-5" />
            </span>
            <p className="text-sm text-zinc-muted">{t("empty")}</p>
          </div>
        : <Accordion type="multiple" className="flex flex-col gap-2 pb-3">
            {flagsData.map(({ id, scaleName, flags }) => (
              <FlagScaleItem
                key={id}
                flags={flags}
                scaleName={scaleName}
                handleSelectFlag={handleSelectFlag}
                selectedFlags={selectedFlags}
                isLimitFlags={isLimitFlags}
                mediaId={mediaId}
                scaleId={id}
              />
            ))}
          </Accordion>
        }

        {isLimitFlags && <FlagsLimitNotice />}
      </div>

      <footer className="relative px-3 py-3 border-t border-border/40">
        <Button
          asChild
          className="w-full h-10 gap-2 rounded-xl border border-dashed border-border/70 text-zinc-muted hover:text-accent hover:border-accent/50 hover:bg-accent/8 transition-all"
        >
          <Link href="/creation-flag">
            <IconPlus className="size-4 shrink-0" />
            <span className="text-sm font-medium">{t("create")}</span>
          </Link>
        </Button>
      </footer>
    </section>
  );
};
