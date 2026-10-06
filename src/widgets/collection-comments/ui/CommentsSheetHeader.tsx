"use client";

import { MessageSquare, X } from "lucide-react";
import { Button, SheetClose, Tabs, TabsList, TabsTrigger } from "@/shared/ui";
import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export type SortMode = "new" | "old" | "popular";

const TABS: SortMode[] = ["new", "old", "popular"];

interface CommentsSheetHeaderProps {
  totalCount: number;
}

export const CommentsSheetHeader = ({ totalCount }: CommentsSheetHeaderProps) => {
  const t = useTranslations("collections.comments");
  const [activeTab, setActiveTab] = useState<SortMode>("new");

  return (
    <header className="flex items-center justify-between gap-2 px-5 py-3.5 border-b border-border shrink-0">
      <div className="flex items-center gap-2">
        <MessageSquare className="size-4 text-zinc-muted shrink-0" />
        <span className="font-semibold text-foreground text-sm">{t("title")}</span>
        <span className="text-sm text-zinc-muted tabular-nums">({totalCount})</span>
      </div>

      <div className="flex gap-x-2 items-center">
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as SortMode)}>
          <TabsList className="rounded-lg border border-border relative items-center justify-center bg-graphite p-0.5 h-9 gap-0.5">
            {TABS.map((value) => (
              <TabsTrigger
                key={value}
                value={value}
                className="cursor-pointer relative z-10 rounded-md px-4 py-3 text-sm font-medium transition-colors duration-200 data-[state=active]:text-accent-foreground data-[state=inactive]:text-zinc-muted hover:text-foreground"
              >
                {activeTab === value && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 rounded-md bg-linear-to-br from-accent to-accent/80 shadow-md shadow-accent/20"
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 30,
                    }}
                  />
                )}
                <span className="relative z-10">
                  {value === "new" ?
                    t("newest")
                  : value === "old" ?
                    t("oldest")
                  : t("popular")}
                </span>
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
  );
};
