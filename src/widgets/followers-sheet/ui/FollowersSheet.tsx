"use client";

import { useState, ReactNode } from "react";
import { useTranslations } from "next-intl";
import { Users, Search, X, UserCheck } from "lucide-react";
import { motion } from "framer-motion";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetClose,
  Button,
  Input,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/shared/ui";
import { UserRow } from "./UserRow";
import { useInfiniteFollows, useDebounce, useIntersectionObserver } from "@/shared/hooks";
import { TabValue, TABS } from "../model/followerSheetTabs";

const LIMIT = 20;

interface Props {
  children: ReactNode;
  userId: string;
}

export const FollowersSheet = ({ children, userId }: Props) => {
  const t = useTranslations("collections.profile");

  const [activeTab, setActiveTab] = useState<TabValue>(TABS[0]);
  const [search, setSearch] = useState<string>("");

  const debouncedSearch = useDebounce(search, 300);

  const {
    data: follows,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteFollows({
    userId: userId,
    type: activeTab,
    limit: LIMIT,
    searchQuery: debouncedSearch,
  });

  const ref = useIntersectionObserver(
    () => {
      if (hasNextPage && !isFetchingNextPage) void fetchNextPage();
    },
    { rootMargin: "100px" },
  );

  return (
    <Sheet>
      <SheetTitle className="sr-only" />
      {children}

      <SheetContent
        aria-describedby={undefined}
        side="right"
        showCloseButton={false}
        className="flex flex-col p-0 gap-0 w-105 sm:max-w-105 bg-surface border-l border-border"
      >
        <SheetTitle className="sr-only" />

        <header className="flex items-center justify-between gap-2 px-5 py-3.5 border-b border-border shrink-0">
          <div className="flex items-center gap-2">
            <Users className="size-4 text-zinc-muted shrink-0" />
            <span className="font-semibold text-foreground text-sm">{t("people")}</span>
          </div>

          <div className="flex items-center gap-2">
            <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as TabValue)}>
              <TabsList className="rounded-lg border border-border relative items-center justify-center bg-graphite p-0.5 h-9 gap-0.5">
                {TABS.map((tab) => (
                  <TabsTrigger
                    key={tab}
                    value={tab}
                    className="cursor-pointer relative z-10 rounded-md px-4 py-3 text-sm font-medium transition-colors duration-200 data-[state=active]:text-accent-foreground data-[state=inactive]:text-zinc-muted hover:text-foreground"
                  >
                    {activeTab === tab && (
                      <motion.div
                        layoutId="followersActiveTab"
                        className="absolute inset-0 rounded-md bg-linear-to-br from-accent to-accent/80 shadow-md shadow-accent/20"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{t(`tabs.${tab}`)}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            <SheetClose asChild>
              <Button className="flex items-center justify-center size-9 p-0 rounded-lg border border-border text-zinc-muted hover:text-foreground hover:border-zinc-muted transition-colors">
                <X className="size-4" />
              </Button>
            </SheetClose>
          </div>
        </header>

        <div className="px-5 py-3 border-b border-border shrink-0">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-zinc-muted pointer-events-none" />
            <Input
              variant="neutral"
              placeholder={t("searchPeople")}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-9 text-sm"
            />
          </div>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={(v) => setActiveTab(v as TabValue)}
          className="flex-1 overflow-hidden"
        >
          {TABS.map((tab) => (
            <TabsContent key={tab} value={tab} className="h-full m-0">
              <div className="drawer-scroll h-full overflow-y-auto px-5 py-2">
                {follows?.length === 0 ?
                  <div className="flex flex-col items-center justify-center py-20 gap-3 text-center">
                    <UserCheck className="size-10 text-zinc-muted opacity-30" />
                    <p className="text-sm text-zinc-muted">
                      {t(`empty.${debouncedSearch ? "search" : activeTab}`)}
                    </p>
                  </div>
                : <ul className="divide-y divide-border/40">
                    {follows?.map((user) => (
                      <UserRow key={user.userId} user={user} />
                    ))}
                  </ul>
                }
                <div ref={ref} style={{ height: 1 }} />
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </SheetContent>
    </Sheet>
  );
};
