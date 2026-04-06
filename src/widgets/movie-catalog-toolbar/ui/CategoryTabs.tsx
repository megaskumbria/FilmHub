"use client";

import { motion } from "framer-motion";
import { Tabs, TabsList, TabsTrigger } from "@/shared/ui";
import { useState } from "react";

const tabs = [
  {
    label: "New",
    value: "newest",
  },
  {
    label: "Movies",
    value: "movies",
  },
  {
    label: "Series",
    value: "series",
  },
  {
    label: "Animation",
    value: "cartoons",
  },
];

export const CategoryTabs = () => {
  const [activeTab, setActiveTab] = useState("newest");

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-fit">
      <TabsList className="relative items-center justify-center rounded-lg bg-graphite p-1 h-10 border border-border/40 gap-0.5">
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className="cursor-pointer relative z-10 rounded-md px-4 py-3 text-sm font-medium transition-colors duration-200 data-[state=active]:text-accent-foreground data-[state=inactive]:text-zinc-muted hover:text-foreground"
          >
            {activeTab === tab.value && (
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
            <span className="relative z-10">{tab.label}</span>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};
