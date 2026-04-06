"use client";

import { useState, useMemo, ReactNode } from "react";
import { Users, Search, X, BookOpen, UserCheck } from "lucide-react";
import { motion } from "framer-motion";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetClose,
  Button,
  Avatar,
  AvatarFallback,
  Input,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/shared/ui";
import { mockFollowers, mockFollowing, type FollowUser } from "../model/mockFollowers";
import Link from "next/link";

type TabValue = "followers" | "following";

interface FollowersSheetProps {
  children: ReactNode;
  defaultTab?: TabValue;
}

const TABS: { value: TabValue; label: string }[] = [
  { value: "followers", label: "Followers" },
  { value: "following", label: "Following" },
];

function UserRow({ user }: { user: FollowUser }) {
  const [following, setFollowing] = useState(user.isFollowing);

  return (
    <li>
      <Link href={`/user-collections/${user.id}`} className="flex items-center gap-3 py-2.5 px-1">
        <Avatar className="size-9 shrink-0">
          <AvatarFallback
            className="text-xs font-semibold text-white"
            style={{ backgroundColor: user.color }}
          >
            {user.initials}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-foreground truncate">{user.name}</p>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="text-sm text-zinc-muted truncate">{user.handle}</span>
            <span className="text-zinc-muted/40">·</span>
            <BookOpen className="size-3 text-zinc-muted shrink-0" />
            <span className="text-sm text-zinc-muted tabular-nums">{user.collectionsCount}</span>
          </div>
        </div>

        <Button
          onClick={() => setFollowing((prev) => !prev)}
          className="shrink-0 h-8 w-28 justify-center px-2 rounded-lg text-sm border border-border text-primary hover:text-foreground transition-colors"
          variant={following ? "accent" : undefined}
        >
          <span>{following ? "Unfollow" : "Follow"}</span>
        </Button>
      </Link>
    </li>
  );
}

export function FollowersSheet({ children, defaultTab = "followers" }: FollowersSheetProps) {
  const [activeTab, setActiveTab] = useState<TabValue>(defaultTab);
  const [search, setSearch] = useState("");

  const list = activeTab === "followers" ? mockFollowers : mockFollowing;

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return list;
    return list.filter(
      (u) => u.name.toLowerCase().includes(q) || u.handle.toLowerCase().includes(q),
    );
  }, [list, search]);

  return (
    <Sheet>
      <SheetTitle className="sr-only" />
      {children}

      <SheetContent
        aria-describedby={undefined}
        side="right"
        showCloseButton={false}
        className="flex flex-col p-0 gap-0 w-[420px] sm:max-w-[420px] bg-surface border-l border-border"
      >
        <SheetTitle className="sr-only" />

        {/* Header */}
        <header className="flex items-center justify-between gap-2 px-5 py-3.5 border-b border-border shrink-0">
          <div className="flex items-center gap-2">
            <Users className="size-4 text-zinc-muted shrink-0" />
            <span className="font-semibold text-foreground text-sm">People</span>
          </div>

          <div className="flex items-center gap-2">
            <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as TabValue)}>
              <TabsList className="rounded-lg border border-border relative items-center justify-center bg-graphite p-0.5 h-9 gap-0.5">
                {TABS.map((tab) => (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className="cursor-pointer relative z-10 rounded-md px-4 py-3 text-sm font-medium transition-colors duration-200 data-[state=active]:text-accent-foreground data-[state=inactive]:text-zinc-muted hover:text-foreground"
                  >
                    {activeTab === tab.value && (
                      <motion.div
                        layoutId="followersActiveTab"
                        className="absolute inset-0 rounded-md bg-linear-to-br from-accent to-accent/80 shadow-md shadow-accent/20"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{tab.label}</span>
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

        {/* Search */}
        <div className="px-5 py-3 border-b border-border shrink-0">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-zinc-muted pointer-events-none" />
            <Input
              variant="neutral"
              placeholder="Search by name or @handle…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-9 text-sm"
            />
          </div>
        </div>

        {/* List */}
        <Tabs
          value={activeTab}
          onValueChange={(v) => setActiveTab(v as TabValue)}
          className="flex-1 overflow-hidden"
        >
          {TABS.map((tab) => (
            <TabsContent key={tab.value} value={tab.value} className="h-full m-0">
              <div className="drawer-scroll h-full overflow-y-auto px-5 py-2">
                {filtered.length === 0 ?
                  <div className="flex flex-col items-center justify-center py-20 gap-3 text-center">
                    <UserCheck className="size-10 text-zinc-muted opacity-30" />
                    <p className="text-sm text-zinc-muted">No results</p>
                  </div>
                : <ul className="divide-y divide-border/40">
                    {filtered.map((user) => (
                      <UserRow key={user.id} user={user} />
                    ))}
                  </ul>
                }
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </SheetContent>
    </Sheet>
  );
}
