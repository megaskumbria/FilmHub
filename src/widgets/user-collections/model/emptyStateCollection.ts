import type { Icon as TablerIcon } from "@tabler/icons-react";
import { IconSkull, IconHeart, IconMask, IconClock } from "@tabler/icons-react";

export type EmptyStateCollectionPreview = {
  icon: TablerIcon;
  labelKey: "horrors" | "favourites" | "mysterious" | "rewatch";
  color: string;
  rotate: string;
  opacity: string;
  translateY: string;
  count: number;
};

export const EMPTY_STATE_COLLECTION_PREVIEWS: (EmptyStateCollectionPreview | null)[] = [
  {
    icon: IconSkull,
    labelKey: "horrors",
    color: "#6366f1",
    rotate: "-rotate-3",
    opacity: "opacity-40",
    translateY: "translate-y-3",
    count: 12,
  },
  {
    icon: IconHeart,
    labelKey: "favourites",
    color: "#ec4899",
    rotate: "-rotate-1",
    opacity: "opacity-65",
    translateY: "translate-y-1",
    count: 18,
  },
  null,
  {
    icon: IconMask,
    labelKey: "mysterious",
    color: "#f59e0b",
    rotate: "rotate-1",
    opacity: "opacity-65",
    translateY: "translate-y-1",
    count: 24,
  },
  {
    icon: IconClock,
    labelKey: "rewatch",
    color: "#10b981",
    rotate: "rotate-3",
    opacity: "opacity-40",
    translateY: "translate-y-3",
    count: 2,
  },
];
