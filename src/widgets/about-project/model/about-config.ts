import {
  IconChartBar,
  IconMessages,
  IconSparkles,
  IconTrophy,
  type Icon,
} from "@tabler/icons-react";
import pkg from "../../../../package.json";

export const APP_VERSION = pkg.version;
export const TELEGRAM_URL = "https://t.me/Film_Hub_channel";
export const SUPPORT_ANCHOR = "support";

export interface RoadmapItem {
  key: string;
  icon: Icon;
}

export const ROADMAP_ITEMS: RoadmapItem[] = [
  { key: "achievements", icon: IconTrophy },
  { key: "statistics", icon: IconChartBar },
  { key: "comments", icon: IconMessages },
  { key: "aiPicks", icon: IconSparkles },
];

export interface ExampleFlag {
  key: string;
  color: string;
}

export const EXAMPLE_FLAGS: ExampleFlag[] = [
  { key: "gore", color: "#ef4444" },
  { key: "finale", color: "#f59e0b" },
  { key: "twist", color: "#9b56f0" },
  { key: "cozy", color: "#10b981" },
];

export interface FlagShowcaseFilm {
  poster: string;
  flags: string[];
}

export const FLAG_SHOWCASE: FlagShowcaseFilm[] = [
  { poster: "/images/resident-evil-poster.webp", flags: ["gore", "twist"] },
  { poster: "/images/avengers-poster.webp", flags: ["finale"] },
];

export const FLAG_STEPS = ["what", "how", "result"] as const;
