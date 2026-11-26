"use client";

import { useId } from "react";
import { useTranslations } from "next-intl";
import { IconUsers, IconX } from "@tabler/icons-react";
import { motion } from "framer-motion";
import { Button, SheetClose, TabsList, TabsTrigger } from "@/shared/ui";
import { TabValue, TABS } from "../model/followerSheetTabs";

interface Props {
  activeTab: TabValue;
  followersCount: number;
  followsCount: number;
}

export const FollowersSheetHeader = ({ activeTab, followersCount, followsCount }: Props) => {
  const t = useTranslations("collections.profile");
  const underlineId = useId();

  const counts: Record<TabValue, number> = {
    followers: followersCount,
    following: followsCount,
  };

  return (
    <header className="flex shrink-0 flex-col gap-3 border-b border-border px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-2 sm:px-5 sm:py-3.5">
      <div className="flex items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2">
          <IconUsers className="size-4 shrink-0 text-zinc-muted" stroke={1.75} />
          <span className="truncate text-sm font-semibold text-foreground">{t("people")}</span>
        </div>

        <SheetClose asChild>
          <Button
            type="button"
            className="flex size-9 items-center justify-center rounded-lg border border-border p-0 text-zinc-muted transition-colors hover:border-zinc-muted hover:text-foreground sm:hidden"
          >
            <IconX className="size-4" stroke={1.75} />
          </Button>
        </SheetClose>
      </div>

      <div className="flex min-w-0 items-center gap-2">
        <TabsList className="relative h-9 w-full items-center justify-center gap-0.5 rounded-lg border border-border bg-graphite p-0.5 sm:w-auto">
          {TABS.map((tab) => (
            <TabsTrigger
              key={tab}
              value={tab}
              className="relative z-10 h-auto flex-1 cursor-pointer rounded-md border-0 bg-transparent px-3 py-1 text-sm font-medium text-zinc-muted shadow-none transition-colors duration-200 after:hidden hover:text-foreground focus-visible:ring-0 data-[state=active]:text-accent-foreground data-[state=inactive]:text-zinc-muted sm:flex-none sm:px-4 dark:text-zinc-muted dark:hover:text-foreground dark:data-[state=active]:text-accent-foreground"
            >
              {activeTab === tab && (
                <motion.span
                  layoutId={underlineId}
                  aria-hidden
                  className="absolute inset-0 rounded-md bg-linear-to-br from-accent to-accent/80 shadow-md shadow-accent/20"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}

              <span className="relative z-10 inline-flex items-center gap-1.5">
                {t(`tabs.${tab}`)}
                <span className="text-xs font-medium tabular-nums">{counts[tab]}</span>
              </span>
            </TabsTrigger>
          ))}
        </TabsList>

        <SheetClose asChild>
          <Button
            type="button"
            className="hidden size-9 items-center justify-center rounded-lg border border-border p-0 text-zinc-muted transition-colors hover:border-zinc-muted hover:text-foreground sm:flex"
          >
            <IconX className="size-4" stroke={1.75} />
          </Button>
        </SheetClose>
      </div>
    </header>
  );
};
