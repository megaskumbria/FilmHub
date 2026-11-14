"use client";

import { memo, useState } from "react";
import { useCreationFlagStore } from "@/features/creation-flag/model/creation-flag-store";
import { useDebounce } from "@/shared/hooks";
import {
  Button,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/shared/ui";
import { IconChevronRight, IconX } from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import { SortBy } from "../model/types";
import { SidebarBody } from "./SidebarBody";

export const FlagScalesSidebar = memo(() => {
  const t = useTranslations("flags");
  const scaleName = useCreationFlagStore((state) => state.flag.scale.name);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortBy>("default");

  const debouncedSearch = useDebounce(searchQuery, 300);

  const bodyProps = {
    searchQuery,
    debouncedSearch,
    sortBy,
    onSearchChange: setSearchQuery,
    onSortChange: setSortBy,
  };

  return (
    <>
      <Drawer direction="bottom">
        <DrawerTrigger asChild>
          <Button
            variant="transparent"
            size="none"
            className="flex w-full items-center justify-between gap-3 rounded-xl border border-border/60 bg-surface-subtle px-4 py-3 text-left lg:hidden"
          >
            <span className="flex min-w-0 items-center gap-2">
              <span className="h-4 w-0.5 shrink-0 rounded-full bg-accent shadow-[0_0_6px_rgba(155,86,240,0.8)]" />
              <span className="text-sm font-semibold text-foreground">{t("scales.title")}</span>
            </span>

            <span className="flex min-w-0 items-center gap-1 text-sm text-zinc-muted">
              <span className="truncate">{scaleName || t("preview.notSelected")}</span>
              <IconChevronRight className="size-4 shrink-0" />
            </span>
          </Button>
        </DrawerTrigger>

        <DrawerContent
          aria-describedby={undefined}
          className="mt-0! h-dvh! max-h-dvh! gap-0 rounded-none! border-0! bg-surface-subtle p-0"
        >
          <DrawerTitle className="sr-only">{t("scales.title")}</DrawerTitle>
          <div className="flex h-full min-h-0 flex-col pt-2">
            <SidebarBody {...bodyProps} />
          </div>

          <DrawerClose className="absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:outline-hidden">
            <IconX className="size-4" />
          </DrawerClose>
        </DrawerContent>
      </Drawer>

      <aside className="sticky top-18 hidden h-165.25 w-full min-h-0 flex-col overflow-hidden rounded-xl border border-border/60 bg-surface-subtle lg:flex">
        <SidebarBody {...bodyProps} />
      </aside>
    </>
  );
});
