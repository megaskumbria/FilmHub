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
      <TabsList
        aria-label={t("categories")}
        className="h-auto items-end gap-x-5 gap-y-2 flex-wrap justify-start rounded-none bg-transparent p-0 sm:gap-x-8"
      >
        {TABS.map((value) => (
          <TabsTrigger
            key={value}
            value={value}
            className="group cursor-pointer relative h-auto flex-none rounded-none border-0 px-0 pb-3 pt-0 font-unbounded text-xl font-semibold tracking-tight transition-colors duration-300 sm:text-4xl data-[state=active]:text-foreground data-[state=inactive]:text-zinc-muted/50 hover:text-zinc-light focus-visible:ring-0 focus-visible:outline-none focus-visible:text-foreground"
          >
            <span className="relative z-10">{t(value)}</span>

            {category === value && (
              <motion.span
                layoutId="activeCategory"
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-1 rounded-full bg-linear-to-r from-accent to-accent/40 shadow-[0_0_16px_var(--accent)]"
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
              />
            )}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};
