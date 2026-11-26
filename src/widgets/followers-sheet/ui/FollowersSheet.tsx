"use client";

import { useRef, useState, type ReactNode } from "react";
import { useTranslations } from "next-intl";
import { IconSearch, IconUsers } from "@tabler/icons-react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  Input,
  SearchClearButton,
  Tabs,
  TabsContent,
} from "@/shared/ui";
import { UserRow } from "./UserRow";
import { useInfiniteFollows, useDebounce, useIntersectionObserver } from "@/shared/hooks";
import { TabValue, TABS } from "../model/followerSheetTabs";
import { PeopleSkeleton } from "./PeopleSkeleton";
import { FollowersSheetHeader } from "./FollowersSheetHeader";

const LIMIT = 20;

interface Props {
  children: ReactNode;
  userId: string | null;
  followersCount: number;
  followsCount: number;
}

export const FollowersSheet = ({ children, userId, followersCount, followsCount }: Props) => {
  const t = useTranslations("collections.profile");

  const listRef = useRef<HTMLDivElement>(null);

  const [activeTab, setActiveTab] = useState<TabValue>(TABS[0]);
  const [search, setSearch] = useState<string>("");

  const debouncedSearch = useDebounce(search, 300);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isPending } = useInfiniteFollows({
    userId: userId ?? "",
    type: activeTab,
    limit: LIMIT,
    searchQuery: debouncedSearch,
  });

  const users = data?.users ?? [];

  const sentinelRef = useIntersectionObserver(
    () => {
      if (hasNextPage && !isFetchingNextPage) void fetchNextPage();
    },
    { rootMargin: "100px" },
  );

  return (
    <Sheet>
      {children}

      <SheetContent
        aria-describedby={undefined}
        side="right"
        showCloseButton={false}
        className="flex h-full w-full max-w-105 flex-col gap-0 overflow-hidden border-l border-border bg-popover p-0 shadow-2xl sm:w-120 sm:max-w-120"
      >
        <SheetTitle className="sr-only">{t(`tabs.${activeTab}`)}</SheetTitle>

        <Tabs
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as TabValue)}
          className="min-h-0 flex-1 gap-0"
        >
          <FollowersSheetHeader
            activeTab={activeTab}
            followersCount={followersCount}
            followsCount={followsCount}
          />

          <div className="shrink-0 px-4 py-3 sm:px-5">
            <div className="relative">
              <IconSearch
                className="pointer-events-none absolute top-1/2 left-0 size-4 -translate-y-1/2 text-zinc-muted"
                stroke={1.75}
              />

              <Input
                variant="underline"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder={t("searchPeople")}
                autoComplete="off"
                autoCorrect="off"
                spellCheck={false}
                className="h-11 pr-12 pl-7 text-sm"
              />

              <SearchClearButton show={search.length > 0} onClear={() => setSearch("")} size={6} />
            </div>
          </div>

          <TabsContent
            value={activeTab}
            className="mt-0 flex min-h-0 flex-col overflow-hidden outline-none"
          >
            <div
              ref={listRef}
              className="drawer-scroll flex min-h-0 flex-1 flex-col overflow-y-auto px-3 pt-2 pb-8 sm:px-4"
            >
              {isPending ?
                <PeopleSkeleton />
              : users.length === 0 ?
                <div className="flex flex-1 flex-col items-center justify-center px-8 pb-16 text-center">
                  <div className="flex size-14 items-center justify-center rounded-2xl bg-foreground/12 text-zinc-muted">
                    {debouncedSearch ?
                      <IconSearch className="size-6" stroke={1.75} />
                    : <IconUsers className="size-6" stroke={1.75} />}
                  </div>

                  <p className="mt-4 max-w-52 text-sm leading-relaxed text-zinc-muted">
                    {t(`empty.${debouncedSearch ? "search" : activeTab}`)}
                  </p>
                </div>
              : <ul>
                  {users.map((user) => (
                    <UserRow key={user.userId} user={user} />
                  ))}

                  {isFetchingNextPage && <PeopleSkeleton />}
                </ul>
              }
              <div ref={sentinelRef} className="h-px" />
            </div>
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
};
