"use client";

import { motion } from "framer-motion";
import { Tabs, TabsList, TabsTrigger } from "@/shared/ui";
import { MediaCategory, useMediaCatalog } from "@/shared/stores/movie-catalog";
import { useTranslations } from "next-intl";

const TABS = ["all", "movie", "tv"] as const;

export const CategoryTabs = () => {
  const t = useTranslations("catalog");
  const { category, setCategory } = useMediaCatalog();

  return (
    <Tabs
      value={category}
      onValueChange={(value) => {
        setCategory(value as MediaCategory);
      }}
    >
      <TabsList className="relative items-center justify-center rounded-lg bg-graphite p-1 h-10 border border-border/40 gap-0.5">
        {TABS.map((value) => (
          <TabsTrigger
            key={value}
            value={value}
            className="cursor-pointer relative z-10 rounded-md px-4 py-3 text-sm font-medium transition-colors duration-200 data-[state=active]:text-accent-foreground data-[state=inactive]:text-zinc-muted hover:text-foreground"
          >
            {category === value && (
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

            <span className="relative z-10">{t(value)}</span>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};
